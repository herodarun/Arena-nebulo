'use strict';

const RUN_ABILITY_BINDINGS_STORAGE_KEY = 'nebulaDrift.activeAbilityBindings.v1';
const RUN_ABILITY_ACTIONS = Object.freeze(['shockwave', 'phaseDash']);
const RUN_ABILITY_DEFAULT_BINDINGS = Object.freeze({ shockwave: 'KeyQ', phaseDash: 'KeyE' });
const RUN_ABILITY_LABELS = Object.freeze({
    shockwave: { title: 'УДАРНАЯ ВОЛНА', button: 'shockwaveAbilityButton', status: 'shockwaveAbilityStatus', key: 'shockwaveAbilityKey' },
    phaseDash: { title: 'ФАЗОВЫЙ РЫВОК', button: 'phaseDashAbilityButton', status: 'phaseDashAbilityStatus', key: 'phaseDashAbilityKey' }
});

let runAbilityBindings = loadRunAbilityBindings();
let listeningForAbilityBinding = null;
let runAbilityState = createRunAbilityState();

function createRunAbilityState() {
    return {
        shockwaveCooldown: 0,
        shockwaveCenter: null,
        shockwaveRadius: 0,
        shockwavePreviousRadius: 0,
        shockwaveMaxRadius: 0,
        shockwaveFrames: 0,
        shockwaveDuration: 0,
        shockwaveHit: new Set(),
        phaseDashCooldown: 0,
        phaseDashFrames: 0,
        phaseDashSpeed: 0,
        phaseDashAngle: 0,
        dashGhosts: [],
        orbiters: [],
        frame: 0,
        hudRefreshFrame: 0,
        ironWillUsed: false,
        debugOpen: false,
        debugGodMode: false
    };
}

function loadRunAbilityBindings() {
    let saved = {};
    try {
        saved = JSON.parse(window.localStorage.getItem(RUN_ABILITY_BINDINGS_STORAGE_KEY) || '{}');
    } catch (error) {
        saved = {};
    }

    const bindings = { ...RUN_ABILITY_DEFAULT_BINDINGS };
    RUN_ABILITY_ACTIONS.forEach((action) => {
        const code = saved && typeof saved[action] === 'string' ? saved[action] : '';
        if (isBindableAbilityCode(code)) bindings[action] = code;
    });
    if (bindings.shockwave === bindings.phaseDash) return { ...RUN_ABILITY_DEFAULT_BINDINGS };
    return bindings;
}

function saveRunAbilityBindings() {
    try {
        window.localStorage.setItem(RUN_ABILITY_BINDINGS_STORAGE_KEY, JSON.stringify(runAbilityBindings));
    } catch (error) {
        // The current session remains usable when storage is unavailable.
    }
}

function isBindableAbilityCode(code) {
    return !['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(code) &&
        /^(Key[A-Z]|Digit[0-9]|Numpad[0-9]|F(?:[1-9]|1[0-2]))$/.test(code);
}

function isCampaignAbilityRun() {
    return typeof campaignActive !== 'undefined' && campaignActive && gameMode === '1P';
}

function getRunAbilityRank(id) {
    if (!isCampaignAbilityRun() || typeof upgradeLevels === 'undefined') return 0;
    return Math.max(0, Math.floor(Number(upgradeLevels[id]) || 0));
}

function getRunAbilityPlayer() {
    return typeof players !== 'undefined' && players.length ? players[0] : null;
}

function canActivateRunAbility() {
    return isCampaignAbilityRun() && gameState === STATE.PLAYING &&
        !upgradeChoiceOpen && !networkUpgradePaused;
}

function getRunAbilityCooldownFrames(action, rank) {
    if (action === 'shockwave') return Math.max(300, 540 - rank * 42);
    return Math.max(270, 450 - rank * 45);
}

function tryActivateRunAbility(action) {
    if (!canActivateRunAbility()) return false;
    const rank = getRunAbilityRank(action);
    const player = getRunAbilityPlayer();
    if (!rank || !player || !player.active || player.downed) return false;

    const cooldownKey = action === 'shockwave' ? 'shockwaveCooldown' : 'phaseDashCooldown';
    if (runAbilityState[cooldownKey] > 0) return false;

    if (action === 'shockwave') {
        runAbilityState.shockwaveCooldown = getRunAbilityCooldownFrames(action, rank);
        runAbilityState.shockwaveCenter = { x: player.x, y: player.y };
        runAbilityState.shockwaveRadius = 0;
        runAbilityState.shockwavePreviousRadius = 0;
        runAbilityState.shockwaveMaxRadius = 245 + rank * 43;
        runAbilityState.shockwaveFrames = 0;
        runAbilityState.shockwaveDuration = 22;
        runAbilityState.shockwaveHit = new Set();
        if (typeof spawnParticles === 'function') spawnParticles(player.x, player.y, '#67e9ff', 24, 5, 22);
    } else if (action === 'phaseDash') {
        const angle = Number.isFinite(player.angle)
            ? player.angle
            : Math.atan2(player.vy || 0, player.vx || 0);
        runAbilityState.phaseDashCooldown = getRunAbilityCooldownFrames(action, rank);
        runAbilityState.phaseDashFrames = 11 + rank * 2;
        runAbilityState.phaseDashSpeed = 18 + rank * 2.6;
        runAbilityState.phaseDashAngle = angle;
        player.invincible = Math.max(player.invincible || 0, 18 + rank * 4);
        runAbilityState.dashGhosts.length = 0;
    } else {
        return false;
    }

    refreshRunAbilityHud();
    return true;
}

function resetRunAbilityState() {
    runAbilityState = createRunAbilityState();
    listeningForAbilityBinding = null;
    setActiveBindingsOverlay(false);
    setDebugPanelOpen(false);
    refreshRunAbilityHud();
}

function refreshRunAbilityHud() {
    const hud = document.getElementById('runAbilityHud');
    const shockwaveButton = document.getElementById('shockwaveAbilityButton');
    const dashButton = document.getElementById('phaseDashAbilityButton');
    if (!hud || !shockwaveButton || !dashButton) return;

    const runIsVisible = isCampaignAbilityRun() &&
        (gameState === STATE.PLAYING || gameState === STATE.PAUSED);
    const shockwaveRank = getRunAbilityRank('shockwave');
    const dashRank = getRunAbilityRank('phaseDash');
    const hasAbility = shockwaveRank > 0 || dashRank > 0;
    hud.classList.toggle('hidden', !runIsVisible || !hasAbility);
    const bindingsButton = document.getElementById('activeBindingsBtn');
    if (bindingsButton) bindingsButton.classList.toggle('hidden', !isCampaignAbilityRun());
    updateRunAbilitySlot('shockwave', shockwaveRank, runAbilityState.shockwaveCooldown);
    updateRunAbilitySlot('phaseDash', dashRank, runAbilityState.phaseDashCooldown);
    updateDebugActionButtons();
}

function updateRunAbilitySlot(action, rank, cooldown) {
    const labels = RUN_ABILITY_LABELS[action];
    const button = document.getElementById(labels.button);
    const status = document.getElementById(labels.status);
    const key = document.getElementById(labels.key);
    if (!button || !status || !key) return;

    const unlocked = rank > 0 && isCampaignAbilityRun();
    button.classList.toggle('hidden', !unlocked);
    const seconds = Math.ceil(Math.max(0, cooldown) / 60);
    status.textContent = cooldown <= 0 ? 'ГОТОВО' : `ЗАРЯД · ${seconds}с`;
    key.textContent = displayAbilityCode(runAbilityBindings[action]);
    button.disabled = !unlocked || cooldown > 0 || gameState !== STATE.PLAYING;
    button.setAttribute('aria-label', `${labels.title} · ${displayAbilityCode(runAbilityBindings[action])}`);
    button.classList.toggle('is-ready', unlocked && cooldown <= 0 && gameState === STATE.PLAYING);
}

function updateRunAbilityEntities(delta = 1) {
    if (!isCampaignAbilityRun() || gameState !== STATE.PLAYING) return;

    const step = Math.max(0, Math.min(2, Number(delta) || 1));
    runAbilityState.frame += step;
    runAbilityState.shockwaveCooldown = Math.max(0, runAbilityState.shockwaveCooldown - step);
    runAbilityState.phaseDashCooldown = Math.max(0, runAbilityState.phaseDashCooldown - step);

    updateShockwave(step);
    updatePhaseDash(step);
    updateOrbitingAsteroids(step);
    updateDashGhosts(step);

    if (runAbilityState.frame - runAbilityState.hudRefreshFrame >= 6) {
        runAbilityState.hudRefreshFrame = runAbilityState.frame;
        refreshRunAbilityHud();
    }
}

function updateShockwave(step) {
    if (!runAbilityState.shockwaveCenter || runAbilityState.shockwaveFrames >= runAbilityState.shockwaveDuration) return;

    runAbilityState.shockwavePreviousRadius = runAbilityState.shockwaveRadius;
    runAbilityState.shockwaveFrames += step;
    runAbilityState.shockwaveRadius = Math.min(
        runAbilityState.shockwaveMaxRadius,
        runAbilityState.shockwaveMaxRadius * runAbilityState.shockwaveFrames / runAbilityState.shockwaveDuration
    );

    const center = runAbilityState.shockwaveCenter;
    const targets = [...asteroids, ...enemies];
    targets.forEach((target) => {
        if (!target || target.enemyProjectile || runAbilityState.shockwaveHit.has(target)) return;
        const dx = target.x - center.x;
        const dy = target.y - center.y;
        const distance = Math.hypot(dx, dy);
        if (distance > runAbilityState.shockwaveRadius || distance < runAbilityState.shockwavePreviousRadius) return;

        runAbilityState.shockwaveHit.add(target);
        const directionX = distance > 0.001 ? dx / distance : 1;
        const directionY = distance > 0.001 ? dy / distance : 0;
        const isAsteroid = asteroids.includes(target);
        const force = isAsteroid ? 10.5 : 8 + getRunAbilityRank('shockwave') * 1.5;
        target.vx = (target.vx || 0) + directionX * force;
        target.vy = (target.vy || 0) + directionY * force;
        if (typeof spawnParticles === 'function') {
            spawnParticles(target.x, target.y, isAsteroid ? '#9aeaff' : '#74ddff', 5, 2.1, 14);
        }
    });

    if (runAbilityState.shockwaveFrames >= runAbilityState.shockwaveDuration) {
        runAbilityState.shockwaveCenter = null;
        runAbilityState.shockwaveHit.clear();
    }
}

function updatePhaseDash(step) {
    if (runAbilityState.phaseDashFrames <= 0) return;
    const player = getRunAbilityPlayer();
    if (!player || player.downed || !player.active) {
        runAbilityState.phaseDashFrames = 0;
        return;
    }

    const movementFrames = Math.min(step, runAbilityState.phaseDashFrames);
    const previous = { x: player.x, y: player.y };
    const dx = Math.cos(runAbilityState.phaseDashAngle) * runAbilityState.phaseDashSpeed * movementFrames;
    const dy = Math.sin(runAbilityState.phaseDashAngle) * runAbilityState.phaseDashSpeed * movementFrames;
    player.x += dx;
    player.y += dy;
    player.vx = Math.cos(runAbilityState.phaseDashAngle) * runAbilityState.phaseDashSpeed;
    player.vy = Math.sin(runAbilityState.phaseDashAngle) * runAbilityState.phaseDashSpeed;
    player.speed = Math.hypot(player.vx, player.vy);

    runAbilityState.dashGhosts.push({ x: previous.x, y: previous.y, life: 11, maxLife: 11 });
    if (typeof constrainPlayerToWorld === 'function') constrainPlayerToWorld(player);
    else if (typeof wrapScreen === 'function') wrapScreen(player);
    runAbilityState.phaseDashFrames = Math.max(0, runAbilityState.phaseDashFrames - movementFrames);
}

function updateDashGhosts(step) {
    runAbilityState.dashGhosts.forEach((ghost) => { ghost.life -= step; });
    runAbilityState.dashGhosts = runAbilityState.dashGhosts.filter((ghost) => ghost.life > 0);
}

function updateOrbitingAsteroids(step) {
    const rank = getRunAbilityRank('orbitalDefense');
    const player = getRunAbilityPlayer();
    if (!rank || !player || !player.active || player.downed) {
        runAbilityState.orbiters.length = 0;
        return;
    }

    while (runAbilityState.orbiters.length < rank) {
        const index = runAbilityState.orbiters.length;
        runAbilityState.orbiters.push({ angle: index / rank * Math.PI * 2, nextHitFrame: 0 });
    }
    if (runAbilityState.orbiters.length > rank) runAbilityState.orbiters.length = rank;

    runAbilityState.orbiters.forEach((orbiter, index) => {
        orbiter.angle += 0.043 * step;
        orbiter.radius = 37 + (index % 3) * 7 + Math.floor(index / 3) * 1.5;
        orbiter.x = player.x + Math.cos(orbiter.angle) * orbiter.radius;
        orbiter.y = player.y + Math.sin(orbiter.angle) * orbiter.radius;
        orbiter.rotation = orbiter.angle * 1.7;

        if (runAbilityState.frame < orbiter.nextHitFrame) return;
        const enemy = enemies.find((candidate) => candidate && !candidate.enemyProjectile &&
            !candidate.bossHazard && dist(orbiter, candidate) < 12 + (candidate.radius || 0) * 0.52);
        if (enemy) {
            const dx = enemy.x - orbiter.x;
            const dy = enemy.y - orbiter.y;
            const distance = Math.hypot(dx, dy) || 1;
            enemy.vx = (enemy.vx || 0) + dx / distance * 3.1;
            enemy.vy = (enemy.vy || 0) + dy / distance * 3.1;
            enemy.hp -= 0.8;
            orbiter.nextHitFrame = runAbilityState.frame + 18;
            if (enemy.hp <= 0) destroyOrbitHitEnemy(enemy);
            return;
        }

        const asteroid = asteroids.find((candidate) => candidate && dist(orbiter, candidate) < 12 + (candidate.radius || 0) * 0.52);
        if (asteroid) {
            const dx = asteroid.x - orbiter.x;
            const dy = asteroid.y - orbiter.y;
            const distance = Math.hypot(dx, dy) || 1;
            asteroid.vx = (asteroid.vx || 0) + dx / distance * 2.2;
            asteroid.vy = (asteroid.vy || 0) + dy / distance * 2.2;
            orbiter.nextHitFrame = runAbilityState.frame + 12;
        }
    });
}

function destroyOrbitHitEnemy(enemy) {
    const index = enemies.indexOf(enemy);
    if (index < 0) return;
    enemies.splice(index, 1);
    if (typeof spawnExplosion === 'function') spawnExplosion(enemy.x, enemy.y, Math.max(18, (enemy.radius || 15) * 1.5));
    if (typeof showFloatingText === 'function') showFloatingText(enemy.x, enemy.y - 18, 'ОРБИТАЛЬНЫЙ УДАР', '#92ebff');
    score += 35 * combo;
    kills += 1;
    if (typeof awardExperience === 'function') awardExperience(18);
}

function drawRunAbilityEffects() {
    if (!isCampaignAbilityRun()) return;
    const quality = typeof getGraphicsPreset === 'function' ? getGraphicsPreset() : {};

    if (runAbilityState.shockwaveCenter) {
        const progress = Math.min(1, runAbilityState.shockwaveFrames / Math.max(1, runAbilityState.shockwaveDuration));
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - progress * 0.72);
        ctx.strokeStyle = quality.laserGlow ? '#7deeff' : '#a4eaff';
        ctx.lineWidth = quality.laserGlow ? 4 : 2.5;
        if (quality.laserGlow) {
            ctx.shadowColor = '#45dfff';
            ctx.shadowBlur = 18;
        }
        ctx.beginPath();
        ctx.arc(runAbilityState.shockwaveCenter.x, runAbilityState.shockwaveCenter.y,
            Math.max(2, runAbilityState.shockwaveRadius), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    const player = getRunAbilityPlayer();
    if (player && runAbilityState.orbiters.length) {
        ctx.save();
        ctx.globalAlpha = quality.laserGlow ? 0.35 : 0.23;
        ctx.strokeStyle = '#8eeaff';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 7]);
        ctx.beginPath();
        ctx.arc(player.x, player.y, 41, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        runAbilityState.orbiters.forEach((orbiter, index) => {
            ctx.save();
            ctx.translate(orbiter.x, orbiter.y);
            ctx.rotate(orbiter.rotation || 0);
            ctx.fillStyle = quality.gradientMaterials ? '#9eb4c9' : '#798b9b';
            ctx.strokeStyle = quality.laserGlow ? '#c2f3ff' : 'rgba(224, 238, 248, 0.72)';
            ctx.lineWidth = quality.laserGlow ? 1.7 : 1.1;
            if (quality.laserGlow) {
                ctx.shadowColor = '#71deff';
                ctx.shadowBlur = 8;
            }
            ctx.beginPath();
            ctx.moveTo(11, -2);
            ctx.lineTo(5, -8);
            ctx.lineTo(-3, -7);
            ctx.lineTo(-9, -2);
            ctx.lineTo(-7, 6);
            ctx.lineTo(2, 8);
            ctx.lineTo(9, 4);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            if (quality.surfaceDetail) {
                ctx.beginPath();
                ctx.ellipse(-2, -2, 2.4, 1.5, -0.3, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(31, 44, 61, 0.78)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        });
    }

    runAbilityState.dashGhosts.forEach((ghost) => {
        const alpha = Math.max(0, ghost.life / ghost.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha * 0.52;
        ctx.strokeStyle = '#9aeeff';
        ctx.lineWidth = 2 + alpha * 2;
        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y, 12 + (1 - alpha) * 13, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    });
}

function displayAbilityCode(code) {
    if (/^Key[A-Z]$/.test(code)) return code.slice(3);
    if (/^Digit[0-9]$/.test(code)) return code.slice(5);
    if (/^Numpad[0-9]$/.test(code)) return `NUM ${code.slice(6)}`;
    return code;
}

function setActiveBindingsOverlay(open) {
    const overlay = document.getElementById('activeBindingsOverlay');
    if (!overlay) return;
    overlay.classList.toggle('hidden', !open);
    overlay.setAttribute('aria-hidden', String(!open));
    if (!open) {
        listeningForAbilityBinding = null;
        document.querySelectorAll('[data-active-bind]').forEach((button) => button.classList.remove('is-listening'));
    }
}

function openActiveBindingsMenu() {
    setActiveBindingsOverlay(true);
    refreshAbilityBindingLabels();
    const status = document.getElementById('activeBindingsStatus');
    if (status) status.textContent = 'Выбери действие и нажми подходящую клавишу.';
    const firstButton = document.querySelector('[data-active-bind="shockwave"]');
    if (firstButton) firstButton.focus();
}

function closeActiveBindingsMenu() {
    setActiveBindingsOverlay(false);
    const trigger = document.getElementById('activeBindingsBtn');
    if (trigger) trigger.focus();
}

function refreshAbilityBindingLabels() {
    document.querySelectorAll('[data-active-bind]').forEach((button) => {
        const action = button.dataset.activeBind;
        button.textContent = displayAbilityCode(runAbilityBindings[action]);
    });
    refreshRunAbilityHud();
}

function captureActiveAbilityBinding(event) {
    const action = listeningForAbilityBinding;
    if (!action) return false;

    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.key === 'Escape') {
        listeningForAbilityBinding = null;
        document.querySelectorAll('[data-active-bind]').forEach((button) => button.classList.remove('is-listening'));
        const status = document.getElementById('activeBindingsStatus');
        if (status) status.textContent = 'Назначение отменено.';
        return true;
    }

    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || !isBindableAbilityCode(event.code)) {
        const status = document.getElementById('activeBindingsStatus');
        if (status) status.textContent = 'Выбери букву, цифру или F-клавишу без модификаторов.';
        return true;
    }

    const otherAction = RUN_ABILITY_ACTIONS.find((candidate) => candidate !== action && runAbilityBindings[candidate] === event.code);
    const previousCode = runAbilityBindings[action];
    runAbilityBindings[action] = event.code;
    if (otherAction) runAbilityBindings[otherAction] = previousCode;
    saveRunAbilityBindings();
    listeningForAbilityBinding = null;
    document.querySelectorAll('[data-active-bind]').forEach((button) => button.classList.remove('is-listening'));
    refreshAbilityBindingLabels();
    const status = document.getElementById('activeBindingsStatus');
    if (status) status.textContent = 'Назначение сохранено.';
    return true;
}

function setDebugPanelOpen(open) {
    const panel = document.getElementById('debugPanel');
    if (!panel) return;
    runAbilityState.debugOpen = Boolean(open);
    panel.classList.toggle('hidden', !runAbilityState.debugOpen);
    panel.setAttribute('aria-hidden', String(!runAbilityState.debugOpen));
    if (!runAbilityState.debugOpen) runAbilityState.debugGodMode = false;
    updateDebugActionButtons();
}

function updateDebugActionButtons() {
    const campaignRun = isCampaignAbilityRun() && gameState !== STATE.GAME_OVER;
    const gameplay = campaignRun && gameState === STATE.PLAYING;
    document.querySelectorAll('[data-debug-action]').forEach((button) => {
        const action = button.dataset.debugAction;
        button.disabled = action === 'god' ? !campaignRun : !gameplay;
        if (action === 'god') {
            button.textContent = runAbilityState.debugGodMode ? 'НЕУЯЗВИМОСТЬ: ВКЛ' : 'НЕУЯЗВИМОСТЬ: ВЫКЛ';
            button.classList.toggle('is-enabled', runAbilityState.debugGodMode);
        }
    });
}

function runDebugAction(action) {
    if (!runAbilityState.debugOpen || !isCampaignAbilityRun()) return;
    if (action === 'god') {
        if (gameState === STATE.GAME_OVER) return;
        runAbilityState.debugGodMode = !runAbilityState.debugGodMode;
        updateDebugActionButtons();
        return;
    }
    if (gameState !== STATE.PLAYING) return;

    if (action === 'xp') {
        awardExperience(1000);
    } else if (action === 'boss') {
        if (!boss && typeof spawnBoss === 'function') spawnBoss();
    } else if (action === 'clear') {
        for (let index = enemies.length - 1; index >= 0; index -= 1) {
            if (!enemies[index].bossHazard) enemies.splice(index, 1);
        }
    }
}

function isAbilityTextInput(target) {
    return Boolean(target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]'));
}

function handleRunAbilityKeydown(event) {
    if (listeningForAbilityBinding) {
        captureActiveAbilityBinding(event);
        return;
    }

    if (event.key === 'Escape' && !document.getElementById('activeBindingsOverlay').classList.contains('hidden')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeActiveBindingsMenu();
        return;
    }

    if (event.key === 'Escape' && runAbilityState.debugOpen) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setDebugPanelOpen(false);
        return;
    }

    const isDebugShortcut = event.shiftKey && (event.code === 'Backquote' || event.key === 'Ё' || event.key === 'ё');
    if (isDebugShortcut) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (isCampaignAbilityRun() && gameState !== STATE.GAME_OVER) setDebugPanelOpen(!runAbilityState.debugOpen);
        return;
    }

    if (isAbilityTextInput(event.target)) return;
    const action = RUN_ABILITY_ACTIONS.find((candidate) => runAbilityBindings[candidate] === event.code);
    if (!action || getRunAbilityRank(action) <= 0) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    if (!event.repeat) tryActivateRunAbility(action);
}

function bindRunAbilityUi() {
    const mouseControls = document.querySelectorAll('.run-ability-slot, [data-active-bind], [data-debug-action], #activeBindingsBtn');
    mouseControls.forEach((button) => {
        button.addEventListener('mousedown', (event) => event.stopPropagation());
    });

    const openBindingsButton = document.getElementById('activeBindingsBtn');
    if (openBindingsButton) openBindingsButton.addEventListener('click', openActiveBindingsMenu);
    const closeButtons = [
        document.getElementById('closeActiveBindingsBtn'),
        document.getElementById('doneActiveBindingsBtn')
    ];
    closeButtons.forEach((button) => button && button.addEventListener('click', closeActiveBindingsMenu));

    const bindingsOverlay = document.getElementById('activeBindingsOverlay');
    if (bindingsOverlay) {
        bindingsOverlay.addEventListener('click', (event) => {
            if (event.target === bindingsOverlay) closeActiveBindingsMenu();
        });
    }

    document.querySelectorAll('[data-active-bind]').forEach((button) => {
        button.addEventListener('click', () => {
            listeningForAbilityBinding = button.dataset.activeBind;
            document.querySelectorAll('[data-active-bind]').forEach((candidate) => candidate.classList.remove('is-listening'));
            button.classList.add('is-listening');
            const status = document.getElementById('activeBindingsStatus');
            if (status) status.textContent = 'Нажми клавишу без модификаторов.';
        });
    });

    Object.entries(RUN_ABILITY_LABELS).forEach(([action, labels]) => {
        const button = document.getElementById(labels.button);
        if (button) button.addEventListener('click', () => tryActivateRunAbility(action));
    });

    const debugClose = document.getElementById('closeDebugPanelBtn');
    if (debugClose) debugClose.addEventListener('click', () => setDebugPanelOpen(false));
    document.querySelectorAll('[data-debug-action]').forEach((button) => {
        button.addEventListener('click', () => runDebugAction(button.dataset.debugAction));
    });

    refreshAbilityBindingLabels();
    refreshRunAbilityHud();
}

const RUN_ABILITIES_LEGACY_START_GAME = window.startGame;
if (typeof RUN_ABILITIES_LEGACY_START_GAME === 'function') {
    window.startGame = function () {
        const result = RUN_ABILITIES_LEGACY_START_GAME.apply(this, arguments);
        refreshRunAbilityHud();
        return result;
    };
}

const RUN_ABILITIES_LEGACY_UPDATE_PLAYERS = window.updatePlayers;
if (typeof RUN_ABILITIES_LEGACY_UPDATE_PLAYERS === 'function') {
    window.updatePlayers = function () {
        const campaignRun = isCampaignAbilityRun();
        if (campaignRun && players[0]) {
            const maneuverRank = getRunAbilityRank('maneuvering');
            players[0].friction = Math.max(0.9, 0.99 - maneuverRank * 0.018);
        } else if (players && players.length) {
            players.forEach((player) => { player.friction = 0.97; });
        }

        const firstNewLaser = typeof lasers !== 'undefined' ? lasers.length : 0;
        const result = RUN_ABILITIES_LEGACY_UPDATE_PLAYERS.apply(this, arguments);
        const spreadRank = getRunAbilityRank('spreadshot');
        if (!campaignRun || spreadRank <= 0 || typeof lasers === 'undefined') return result;

        const newShots = lasers.slice(firstNewLaser).filter((laser) => laser && laser.owner === 1 && !laser.runAbilitySpread);
        const angleStep = 0.16;
        newShots.forEach((laser) => {
            const baseAngle = Math.atan2(laser.vy, laser.vx);
            const speed = Math.hypot(laser.vx, laser.vy) || 1;
            laser.damageMultiplier = 0.5;
            laser.runAbilitySpread = true;
            for (let spread = 1; spread <= spreadRank; spread += 1) {
                [-1, 1].forEach((direction) => {
                    const angle = baseAngle + direction * angleStep * spread;
                    lasers.push({
                        ...laser,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        damageMultiplier: 0.5,
                        runAbilitySpread: true
                    });
                });
            }
        });
        return result;
    };
}

const RUN_ABILITIES_LEGACY_UPDATE_ENEMIES = window.updateEnemyEntities;
if (typeof RUN_ABILITIES_LEGACY_UPDATE_ENEMIES === 'function') {
    window.updateEnemyEntities = function (delta) {
        const result = RUN_ABILITIES_LEGACY_UPDATE_ENEMIES.apply(this, arguments);
        updateRunAbilityEntities(delta);
        return result;
    };
}

const RUN_ABILITIES_LEGACY_HIT_PLAYER = window.hitPlayer;
if (typeof RUN_ABILITIES_LEGACY_HIT_PLAYER === 'function') {
    window.hitPlayer = function (player) {
        if (isCampaignAbilityRun() && runAbilityState.debugGodMode && player === getRunAbilityPlayer()) return;
        if (!player || player.downed || player.invincible > 0) {
            return RUN_ABILITIES_LEGACY_HIT_PLAYER.apply(this, arguments);
        }

        const triggerIronWill = isCampaignAbilityRun() && player === getRunAbilityPlayer() &&
            getRunAbilityRank('ironWill') > 0 && !runAbilityState.ironWillUsed && shields <= 0;
        if (triggerIronWill) shields = 1;
        const result = RUN_ABILITIES_LEGACY_HIT_PLAYER.apply(this, arguments);

        if (triggerIronWill && gameState !== STATE.GAME_OVER) {
            runAbilityState.ironWillUsed = true;
            shields = Math.max(1, shields);
            player.invincible = Math.max(player.invincible || 0, 180);
            if (typeof showFloatingText === 'function') showFloatingText(player.x, player.y - 28, 'ЖЕЛЕЗНАЯ ВОЛЯ!', '#ffe08a');
            if (typeof spawnParticles === 'function') spawnParticles(player.x, player.y, '#ffe08a', 28, 4, 32);
            refreshRunAbilityHud();
        }
        return result;
    };
}

const RUN_ABILITIES_LEGACY_GAME_OVER = window.gameOver;
if (typeof RUN_ABILITIES_LEGACY_GAME_OVER === 'function') {
    window.gameOver = function () {
        setDebugPanelOpen(false);
        return RUN_ABILITIES_LEGACY_GAME_OVER.apply(this, arguments);
    };
}

document.addEventListener('keydown', handleRunAbilityKeydown, true);
bindRunAbilityUi();

window.NebulaRunAbilities = Object.freeze({
    activate: tryActivateRunAbility,
    getBindings: () => ({ ...runAbilityBindings }),
    refreshHud: refreshRunAbilityHud
});
