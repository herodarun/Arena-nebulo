'use strict';

// The local run is now a sequence of long, self-contained waves. Online games
// keep their existing host-driven wave loop for compatibility.
const WAVE_DIFFICULTY_PROFILES = Object.freeze({
    easy: Object.freeze({
        id: 'easy', label: 'ЛЁГКАЯ', weight: 10,
        worldScale: 0.76, spawnRate: 0.84, enemySpeed: 0.82,
        enemyHealth: 0.86, attackRate: 0.86, bossHealth: 0.84,
        color: '#8de3b4'
    }),
    normal: Object.freeze({
        id: 'normal', label: 'ОБЫЧНАЯ', weight: 70,
        worldScale: 1, spawnRate: 1, enemySpeed: 1,
        enemyHealth: 1, attackRate: 1, bossHealth: 1,
        color: '#77dfff'
    }),
    hard: Object.freeze({
        id: 'hard', label: 'СЛОЖНАЯ', weight: 15,
        worldScale: 1.34, spawnRate: 1.18, enemySpeed: 1.2,
        enemyHealth: 1.22, attackRate: 1.2, bossHealth: 1.3,
        color: '#ffca74'
    }),
    impossible: Object.freeze({
        id: 'impossible', label: 'НЕВОЗМОЖНАЯ', weight: 5,
        worldScale: 1.78, spawnRate: 1.4, enemySpeed: 1.42,
        enemyHealth: 1.48, attackRate: 1.42, bossHealth: 1.62,
        color: '#ff8191'
    })
});

const WAVE_DIFFICULTY_ORDER = Object.freeze(['easy', 'normal', 'hard', 'impossible']);
const WAVE_MAX_ENEMIES = 18;
const WAVE_MAX_ASTEROIDS = 16;
const CHARGER_MAX_ACTIVE = 2;
const CHARGER_HIT_POINTS = 3;
const CHARGER_DASH_SPEED = 42;
const CHARGER_DODGE_WINDOW_FRAMES = 60;
const CHARGER_COOLDOWN_FRAMES = 180;
const CHARGER_RAGE_COOLDOWN_FRAMES = 60;
const CHARGER_RAGE_TURN_RADIANS = 5 * Math.PI / 180;
const CAREER_XP_STORAGE_KEY = 'nebulaDriftCareerXP';
const MAX_WAVE_STORAGE_KEY = 'nebulaDriftMaxWave';

let campaignActive = false;
let campaignPhase = 'menu';
let campaignDifficulty = WAVE_DIFFICULTY_PROFILES.normal;
let campaignWaveExperience = 0;
let campaignWaveKillsAtStart = 0;
let campaignMaxWave = readCampaignNumber(MAX_WAVE_STORAGE_KEY);
let campaignCareerExperience = readCampaignNumber(CAREER_XP_STORAGE_KEY);
let rouletteOutcome = null;
let rouletteIsSpinning = false;
let rouletteLaunchTimer = null;

const CAMPAIGN_LEGACY_START_GAME = window.startGame;
const CAMPAIGN_LEGACY_SPAWN_WAVE_LOGIC = window.spawnWaveLogic;
const CAMPAIGN_LEGACY_SPAWN_ENEMY = window.spawnEnemy;
const CAMPAIGN_LEGACY_AWARD_EXPERIENCE = window.awardExperience;
const CAMPAIGN_LEGACY_SPAWN_BOSS = window.spawnBoss;
const CAMPAIGN_LEGACY_GAME_OVER = window.gameOver;
const CAMPAIGN_LEGACY_CHECK_COLLISIONS = window.checkCollisions;

function readCampaignNumber(key) {
    try {
        const value = Number.parseInt(localStorage.getItem(key) || '0', 10);
        return Number.isFinite(value) ? Math.max(0, value) : 0;
    } catch (error) {
        return 0;
    }
}

function campaignElement(id) {
    return document.getElementById(id);
}

function setCampaignScreen(id, visible) {
    const screen = campaignElement(id);
    if (!screen) return;
    if (visible) screen.classList.remove('hidden');
    else screen.classList.add('hidden');
    screen.setAttribute('aria-hidden', String(!visible));
}

function hideCampaignScreens() {
    [
        'waveClearScreen', 'rouletteScreen', 'shopScreen', 'gameOverScreen',
        'pauseOverlay', 'graphicsSettingsOverlay'
    ].forEach((id) => setCampaignScreen(id, false));
}

function showCampaignHud(visible) {
    ['hud', 'xpHud'].forEach((id) => {
        const element = campaignElement(id);
        if (!element) return;
        if (visible) element.classList.remove('hidden');
        else element.classList.add('hidden');
    });

    const progressDetails = campaignElement('waveRunDetails');
    if (progressDetails) {
        if (visible && gameMode !== 'NET') progressDetails.classList.remove('hidden');
        else progressDetails.classList.add('hidden');
    }
}

function formatCampaignNumber(value) {
    return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.floor(value || 0)));
}

function persistCampaignRecords() {
    try {
        localStorage.setItem(CAREER_XP_STORAGE_KEY, String(campaignCareerExperience));
        localStorage.setItem(MAX_WAVE_STORAGE_KEY, String(campaignMaxWave));
    } catch (error) {
        // Keep the run playable if browser storage is unavailable.
    }
}

function refreshCampaignShop() {
    const maxWaveLabel = campaignElement('metaMaxWave');
    const xpLabel = campaignElement('metaCareerXp');
    if (maxWaveLabel) maxWaveLabel.textContent = formatCampaignNumber(campaignMaxWave);
    if (xpLabel) xpLabel.textContent = formatCampaignNumber(campaignCareerExperience) + ' XP';
}

function updateCampaignMaxWave(candidate = wave) {
    if (gameMode === 'NET' && !isNetHost) return;
    const nextBest = Math.max(campaignMaxWave, Math.floor(candidate || 0));
    if (nextBest === campaignMaxWave) return;
    campaignMaxWave = nextBest;
    try {
        localStorage.setItem(MAX_WAVE_STORAGE_KEY, String(campaignMaxWave));
    } catch (error) {
        // The in-memory record is still kept for this session.
    }
    refreshCampaignShop();
}

function trackCareerExperience(baseAmount) {
    if (gameMode === 'NET' && !isNetHost) return;
    const reactorRank = typeof getUpgradeRank === 'function' ? getUpgradeRank('reactor') : 0;
    const gained = Math.max(1, Math.round((Number(baseAmount) || 0) * (1 + reactorRank * 0.25)));
    campaignCareerExperience += gained;
    if (campaignActive) campaignWaveExperience += gained;
}

if (typeof CAMPAIGN_LEGACY_AWARD_EXPERIENCE === 'function') {
    window.awardExperience = function (baseAmount) {
        const result = CAMPAIGN_LEGACY_AWARD_EXPERIENCE.apply(this, arguments);
        trackCareerExperience(baseAmount);
        return result;
    };
}

function waveDurationFor(number) {
    // Wave one lasts 40 seconds; later sectors stretch to a maximum of 65.
    return 2400 + Math.min(1500, Math.max(0, number - 1) * 120);
}

function waveSpawnInterval() {
    const wavePressure = Math.max(30, 66 - Math.max(0, wave - 1) * 2);
    return Math.max(24, Math.round(wavePressure / campaignDifficulty.spawnRate));
}

function clearForNextWave() {
    asteroids = [];
    shards = [];
    orbs = [];
    particles = [];
    explosions = [];
    floatingTexts = [];
    lasers = [];
    enemies = [];
    powerups = [];
    boss = null;
    activePowerup = null;
    powerupTimer = 0;
    powerupMaxTime = 0;
    screenShake = 0;
    const powerupDisplay = campaignElement('powerupDisplay');
    const bossDisplay = campaignElement('bossDisplay');
    if (powerupDisplay) powerupDisplay.classList.add('hidden');
    if (bossDisplay) bossDisplay.classList.add('hidden');

    players.forEach((player, index) => {
        if (!player.active && !(gameMode === '2P' && index === 1)) return;
        if (gameMode === '2P') {
            player.active = true;
            player.downed = false;
            player.x = canvas.width * (index === 0 ? 0.34 : 0.66);
        } else {
            player.x = canvas.width * 0.5;
        }
        player.y = canvas.height * 0.58;
        player.vx = 0;
        player.vy = 0;
        player.speed = 0;
        player.invincible = Math.max(player.invincible || 0, 55);
        player.trail = [];
    });
}

function startCampaignWave(nextWave, difficulty, options = {}) {
    campaignActive = true;
    campaignPhase = 'spawning';
    campaignDifficulty = difficulty || WAVE_DIFFICULTY_PROFILES.normal;
    wave = Math.max(1, Math.floor(nextWave));
    waveTimer = 0;
    waveDuration = waveDurationFor(wave);
    difficultyMult = (1 + (wave - 1) * 0.15) * campaignDifficulty.worldScale;
    isCalmPeriod = false;
    calmTimer = 0;
    campaignWaveExperience = 0;
    campaignWaveKillsAtStart = kills;
    gameState = STATE.PLAYING;

    if (options.clear) clearForNextWave();
    if (wave % 5 === 0 && !boss) spawnBoss();
    if (options.announce) announceWave(wave);

    updateCampaignMaxWave(wave);
    showCampaignHud(true);
    hideCampaignScreens();
    updateWaveProgressDisplay();
    refreshCampaignShop();
}

function drawWaveEncounter() {
    const enemyShare = Math.min(0.56, 0.28 + wave * 0.012);
    const preferEnemy = Math.random() < enemyShare;
    const canSpawnEnemy = enemies.length < WAVE_MAX_ENEMIES;
    const canSpawnAsteroid = asteroids.length < WAVE_MAX_ASTEROIDS;

    if (preferEnemy && canSpawnEnemy) spawnCampaignEnemy();
    else if (canSpawnAsteroid) spawnAsteroid();
    else if (canSpawnEnemy) spawnCampaignEnemy();
}

function activeWaveTargetCount() {
    return enemies.length + asteroids.length + (boss ? 1 : 0);
}

function updateWaveProgressDisplay() {
    if (!campaignActive) return;
    const fill = campaignElement('waveProgressFill');
    const label = campaignElement('waveProgressText');
    const badge = campaignElement('waveDifficultyBadge');
    const progress = campaignPhase === 'spawning'
        ? Math.min(100, waveTimer / Math.max(1, waveDuration) * 100)
        : campaignPhase === 'clearing' ? 100 : 0;

    if (fill) fill.style.width = progress + '%';
    if (badge) {
        badge.textContent = campaignDifficulty.label;
        badge.style.color = campaignDifficulty.color;
    }
    if (label) {
        if (campaignPhase === 'spawning') {
            const secondsLeft = Math.max(0, Math.ceil((waveDuration - waveTimer) / 60));
            label.textContent = 'ВОЛНА · ' + secondsLeft + ' СЕК';
        } else {
            label.textContent = 'ЗАЧИСТКА · ' + activeWaveTargetCount() + ' ЦЕЛЕЙ';
        }
    }
}

function spawnWaveBonus() {
    if (waveTimer > 0 && waveTimer % 180 === 0 && orbs.length < 18) spawnOrb();
    if (waveTimer > 0 && waveTimer % 720 === 0 && powerups.length < 3) {
        spawnPowerup(rand(canvas.width * 0.2, canvas.width * 0.8), rand(canvas.height * 0.2, canvas.height * 0.8));
    }
}

function completeCampaignWave() {
    if (!campaignActive || gameMode === 'NET') return;
    campaignActive = false;
    campaignPhase = 'complete';
    gameState = 'WAVE_CLEAR';
    updateCampaignMaxWave(wave);
    persistCampaignRecords();
    showCampaignHud(false);
    hideCampaignScreens();

    const waveNumber = campaignElement('waveClearNumber');
    const waveKills = campaignElement('waveClearKills');
    const waveXp = campaignElement('waveClearXp');
    const difficultyLabel = campaignElement('waveClearDifficulty');
    if (waveNumber) waveNumber.textContent = String(wave);
    if (waveKills) waveKills.textContent = formatCampaignNumber(kills - campaignWaveKillsAtStart);
    if (waveXp) waveXp.textContent = formatCampaignNumber(campaignWaveExperience) + ' XP';
    if (difficultyLabel) {
        difficultyLabel.textContent = campaignDifficulty.label;
        difficultyLabel.style.color = campaignDifficulty.color;
    }

    // A small shield refill rewards a clean clear without changing shop XP.
    if (shields < maxShields) shields += 1;
    const shieldIcons = campaignElement('shieldIcons');
    if (shieldIcons && typeof updateUI === 'function') updateUI();
    setCampaignScreen('waveClearScreen', true);
}

function campaignSpawnWaveLogic() {
    if (gameMode === 'NET') {
        if (typeof CAMPAIGN_LEGACY_SPAWN_WAVE_LOGIC === 'function') {
            CAMPAIGN_LEGACY_SPAWN_WAVE_LOGIC();
        }
        return;
    }
    if (!campaignActive || gameState !== STATE.PLAYING) return;

    if (campaignPhase === 'spawning') {
        waveTimer += 1;
        if (waveTimer >= waveDuration) {
            // Waves are timed runs: the countdown ending immediately freezes
            // combat and opens the result screen, even if hazards remain.
            completeCampaignWave();
            return;
        }
        if (!boss && waveTimer % waveSpawnInterval() === 0) drawWaveEncounter();
        spawnWaveBonus();
    }

    if (gameTime % 12 === 0) updateWaveProgressDisplay();
}

window.spawnWaveLogic = campaignSpawnWaveLogic;

function pickWeightedDifficulty() {
    const roll = Math.random() * 100;
    if (roll < 10) return WAVE_DIFFICULTY_PROFILES.easy;
    if (roll < 80) return WAVE_DIFFICULTY_PROFILES.normal;
    if (roll < 95) return WAVE_DIFFICULTY_PROFILES.hard;
    return WAVE_DIFFICULTY_PROFILES.impossible;
}

function startDifficultyRoulette() {
    if (rouletteLaunchTimer !== null) clearTimeout(rouletteLaunchTimer);
    rouletteLaunchTimer = null;
    rouletteOutcome = pickWeightedDifficulty();
    rouletteIsSpinning = true;
    setCampaignScreen('waveClearScreen', false);
    setCampaignScreen('rouletteScreen', true);

    const display = campaignElement('rouletteCurrent');
    const note = campaignElement('rouletteResultNote');
    const startButton = campaignElement('startRolledWaveBtn');
    const stage = display && display.closest('.roulette-display');
    if (startButton) startButton.classList.add('hidden');
    if (stage) stage.classList.remove('is-stopped');
    if (display) {
        display.textContent = 'КРУТИМСЯ';
        display.dataset.difficulty = 'normal';
    }
    if (note) note.textContent = 'Сложная и невозможная вместе выпадают в 20% случаев.';

    const spinOrder = WAVE_DIFFICULTY_ORDER.map((id) => WAVE_DIFFICULTY_PROFILES[id]);
    let frameCount = 0;
    let startTime = null;
    let lastChange = 0;
    const spinDuration = 2850;

    function animateRoulette(timestamp) {
        if (!rouletteIsSpinning) return;
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / spinDuration);
        const interval = 42 + Math.pow(progress, 3) * 260;

        if (elapsed - lastChange >= interval) {
            const option = spinOrder[frameCount % spinOrder.length];
            if (display) {
                display.textContent = option.label;
                display.dataset.difficulty = option.id;
            }
            frameCount += 1;
            lastChange = elapsed;
        }

        if (progress < 1) {
            requestAnimationFrame(animateRoulette);
            return;
        }

        rouletteIsSpinning = false;
        if (display) {
            display.textContent = rouletteOutcome.label;
            display.dataset.difficulty = rouletteOutcome.id;
        }
        if (stage) stage.classList.add('is-stopped');
        if (note) {
            note.textContent = 'Следующая волна: ' + rouletteOutcome.label.toLowerCase() + '. Вероятность этого сектора — ' + rouletteOutcome.weight + '%. Тяжёлые сектора вместе — 20%. Старт через секунду.';
        }
        if (startButton) startButton.classList.remove('hidden');
        rouletteLaunchTimer = setTimeout(beginNextRolledWave, 1100);
    }

    requestAnimationFrame(animateRoulette);
}

function launchRolledWave() {
    if (!rouletteOutcome || rouletteIsSpinning) return;
    const nextWave = wave + 1;
    startCampaignWave(nextWave, rouletteOutcome, { clear: true, announce: true });
    rouletteOutcome = null;
}

function openCampaignShop() {
    campaignActive = false;
    campaignPhase = 'shop';
    rouletteIsSpinning = false;
    rouletteOutcome = null;
    if (rouletteLaunchTimer !== null) clearTimeout(rouletteLaunchTimer);
    rouletteLaunchTimer = null;
    gameState = STATE.MENU;
    persistCampaignRecords();
    hideCampaignScreens();
    showCampaignHud(false);
    refreshCampaignShop();
    setCampaignScreen('shopScreen', true);
}

function startNewCampaignRun() {
    hideCampaignScreens();
    setCampaignScreen('shopScreen', false);
    if (typeof window.startGame === 'function') window.startGame();
}

function updateCampaignEnemyTarget(enemy) {
    let target = null;
    let bestDistance = Infinity;
    players.forEach((player) => {
        if (!player.active || player.downed) return;
        const distance = dist(enemy, player);
        if (distance < bestDistance) {
            target = player;
            bestDistance = distance;
        }
    });
    return target || players[0];
}

function steerCampaignEnemy(enemy, target, acceleration, maxSpeed) {
    if (!target) return;
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const distance = Math.hypot(dx, dy) || 1;
    enemy.vx = (enemy.vx || 0) + dx / distance * acceleration;
    enemy.vy = (enemy.vy || 0) + dy / distance * acceleration;
    enemy.vx *= 0.985;
    enemy.vy *= 0.985;
    const speed = Math.hypot(enemy.vx, enemy.vy);
    if (speed > maxSpeed) {
        enemy.vx = enemy.vx / speed * maxSpeed;
        enemy.vy = enemy.vy / speed * maxSpeed;
    }
    enemy.angle = Math.atan2(enemy.vy, enemy.vx);
}

function aimChargerAtTarget(enemy, target) {
    if (!target) return;
    enemy.aimAngle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
}

function startChargerTelegraph(enemy, target, rage = false) {
    aimChargerAtTarget(enemy, target);
    enemy.state = 'telegraph';
    enemy.stateTimer = CHARGER_DODGE_WINDOW_FRAMES;
    if (rage) enemy.rage = true;
}

function startChargerDash(enemy, pace) {
    enemy.state = 'dash';
    enemy.stateTimer = 0;
    enemy.dashSpeed = CHARGER_DASH_SPEED * pace;
    enemy.dashFrames = 0;
    enemy.vx = Math.cos(enemy.aimAngle) * enemy.dashSpeed;
    enemy.vy = Math.sin(enemy.aimAngle) * enemy.dashSpeed;
}

function turnChargerTowardTarget(enemy, target, step) {
    if (!target) return;
    const targetAngle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
    const angleDifference = Math.atan2(
        Math.sin(targetAngle - enemy.aimAngle),
        Math.cos(targetAngle - enemy.aimAngle)
    );
    const maxTurn = CHARGER_RAGE_TURN_RADIANS * step;
    enemy.aimAngle += Math.max(-maxTurn, Math.min(maxTurn, angleDifference));
    enemy.vx = Math.cos(enemy.aimAngle) * enemy.dashSpeed;
    enemy.vy = Math.sin(enemy.aimAngle) * enemy.dashSpeed;
}

function finishChargerDash(enemy, target) {
    enemy.completedDashes = (enemy.completedDashes || 0) + 1;
    if (enemy.rage) {
        // Keep rage dash starts on a one-second beat; show the next lane during
        // whatever recovery time remains after the full-screen crossing.
        aimChargerAtTarget(enemy, target);
        enemy.state = 'rageCooldown';
        enemy.stateTimer = Math.max(0, CHARGER_RAGE_COOLDOWN_FRAMES - enemy.dashFrames);
    } else if (enemy.completedDashes >= 2) {
        // After two full-screen charges, give two seconds of recovery and a
        // final one-second dodge warning before rage mode begins.
        enemy.state = 'preRageCooldown';
        enemy.stateTimer = CHARGER_COOLDOWN_FRAMES - CHARGER_DODGE_WINDOW_FRAMES;
    } else {
        // Space the two opening dashes three seconds apart, including the warning.
        enemy.state = 'dashCooldown';
        enemy.stateTimer = CHARGER_COOLDOWN_FRAMES - CHARGER_DODGE_WINDOW_FRAMES;
    }
    enemy.vx *= 0.12;
    enemy.vy *= 0.12;
}

function spawnEnemyProjectile(sniper, target) {
    const projectileCount = enemies.reduce((count, enemy) => count + (enemy.enemyProjectile ? 1 : 0), 0);
    if (projectileCount >= 8 || !target) return;
    const angle = sniper.aimAngle;
    const speed = (5.1 + Math.min(1.4, wave * 0.06)) * campaignDifficulty.enemySpeed;
    enemies.push({
        type: 'enemyBolt',
        enemyProjectile: true,
        x: sniper.x + Math.cos(angle) * (sniper.radius + 6),
        y: sniper.y + Math.sin(angle) * (sniper.radius + 6),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 7,
        hp: 1,
        angle,
        life: 260,
        maxLife: 260
    });
}

function updateEnemyEntities(delta = 1) {
    const step = Number.isFinite(delta) ? Math.max(0, delta) : 1;
    const pace = campaignDifficulty.enemySpeed * (1 + Math.min(0.22, Math.max(0, wave - 1) * 0.02));

    for (let index = enemies.length - 1; index >= 0; index -= 1) {
        const enemy = enemies[index];
        if (!enemy || enemy.bossHazard || enemy.type === 'mine' || enemy.type === 'pulse') continue;

        if (enemy.type === 'enemyBolt') {
            enemy.x += (enemy.vx || 0) * step;
            enemy.y += (enemy.vy || 0) * step;
            enemy.life = (enemy.life || 0) - step;
            if (enemy.life <= 0 || enemy.x < -100 || enemy.x > canvas.width + 100 ||
                enemy.y < -100 || enemy.y > canvas.height + 100) enemies.splice(index, 1);
            continue;
        }

        const target = updateCampaignEnemyTarget(enemy);
        if (enemy.type === 'charger') {
            enemy.state = enemy.state || 'approach';
            if (enemy.stateTimer === undefined) enemy.stateTimer = 52;

            if (enemy.state === 'approach') {
                enemy.stateTimer -= step;
                steerCampaignEnemy(enemy, target, 0.032 * pace * step, 2.35 * pace);
                enemy.x += enemy.vx * step;
                enemy.y += enemy.vy * step;
                if (enemy.stateTimer <= 0) {
                    enemy.vx = 0;
                    enemy.vy = 0;
                    startChargerTelegraph(enemy, target);
                }
            } else if (enemy.state === 'telegraph') {
                enemy.stateTimer -= step;
                if (enemy.stateTimer <= 0) startChargerDash(enemy, pace);
            } else if (enemy.state === 'dash') {
                if (enemy.rage) turnChargerTowardTarget(enemy, target, step);
                enemy.x += enemy.vx * step;
                enemy.y += enemy.vy * step;
                enemy.dashFrames = (enemy.dashFrames || 0) + step;

                const margin = enemy.radius + 16;
                if (enemy.x < -margin || enemy.x > canvas.width + margin ||
                    enemy.y < -margin || enemy.y > canvas.height + margin) {
                    finishChargerDash(enemy, target);
                }
            } else if (enemy.state === 'dashCooldown' || enemy.state === 'preRageCooldown') {
                enemy.stateTimer -= step;
                if (enemy.stateTimer <= 0) {
                    startChargerTelegraph(enemy, target, enemy.state === 'preRageCooldown');
                }
            } else if (enemy.state === 'rageCooldown') {
                enemy.stateTimer -= step;
                if (enemy.stateTimer <= 0) startChargerDash(enemy, pace);
            }

            enemy.angle = enemy.state === 'dash' || enemy.state === 'telegraph' || enemy.state === 'rageCooldown'
                ? enemy.aimAngle : Math.atan2(enemy.vy, enemy.vx);
            continue;
        }

        if (enemy.type === 'sniper') {
            enemy.state = enemy.state || 'tracking';
            enemy.angle = enemy.aimAngle || enemy.angle || 0;
            if (enemy.state === 'tracking') {
                const dx = target.x - enemy.x;
                const dy = target.y - enemy.y;
                const distance = Math.hypot(dx, dy) || 1;
                const orbit = Math.atan2(dy, dx) + Math.PI * 0.5;
                if (distance < 235) {
                    enemy.vx -= dx / distance * 0.045 * pace * step;
                    enemy.vy -= dy / distance * 0.045 * pace * step;
                } else if (distance > 365) {
                    enemy.vx += dx / distance * 0.035 * pace * step;
                    enemy.vy += dy / distance * 0.035 * pace * step;
                } else {
                    enemy.vx += Math.cos(orbit) * 0.025 * pace * step;
                    enemy.vy += Math.sin(orbit) * 0.025 * pace * step;
                }
                enemy.vx *= 0.985;
                enemy.vy *= 0.985;
                const speed = Math.hypot(enemy.vx, enemy.vy);
                const maxSpeed = 1.8 * pace;
                if (speed > maxSpeed) {
                    enemy.vx = enemy.vx / speed * maxSpeed;
                    enemy.vy = enemy.vy / speed * maxSpeed;
                }
                enemy.x += enemy.vx * step;
                enemy.y += enemy.vy * step;
                enemy.fireTimer = (enemy.fireTimer === undefined ? 96 : enemy.fireTimer) - step;
                if (enemy.fireTimer <= 0) {
                    enemy.aimAngle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
                    enemy.state = 'aiming';
                    enemy.stateTimer = Math.max(26, 42 - Math.floor(wave / 3));
                }
            } else if (enemy.state === 'aiming') {
                enemy.stateTimer -= step;
                if (enemy.stateTimer <= 0) {
                    spawnEnemyProjectile(enemy, target);
                    enemy.state = 'recover';
                    enemy.stateTimer = 48;
                    enemy.fireTimer = Math.max(76, (142 - wave * 2) / campaignDifficulty.attackRate);
                }
            } else {
                enemy.stateTimer -= step;
                if (enemy.stateTimer <= 0) enemy.state = 'tracking';
            }
            continue;
        }

        if (enemy.type === 'brute') {
            steerCampaignEnemy(enemy, target, 0.014 * pace * step, 1.15 * pace);
            enemy.x += enemy.vx * step;
            enemy.y += enemy.vy * step;
        }
    }
}

function spawnCampaignEnemy() {
    if (gameMode === 'NET' && typeof CAMPAIGN_LEGACY_SPAWN_ENEMY === 'function') {
        return CAMPAIGN_LEGACY_SPAWN_ENEMY.apply(this, arguments);
    }
    const edge = 92;
    const side = Math.floor(Math.random() * 4);
    let x;
    let y;
    if (side === 0) { x = Math.random() * canvas.width; y = -edge; }
    else if (side === 1) { x = canvas.width + edge; y = Math.random() * canvas.height; }
    else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + edge; }
    else { x = -edge; y = Math.random() * canvas.height; }

    const activeChargerCount = enemies.reduce((count, enemy) => count + (enemy && enemy.type === 'charger' ? 1 : 0), 0);
    const canSpawnCharger = campaignDifficulty.id !== 'easy' && activeChargerCount < CHARGER_MAX_ACTIVE;
    const roll = Math.random();
    let type = 'mine';
    if (wave >= 5 && roll < 0.15) type = 'pulse';
    else if (wave >= 4 && roll < 0.32) type = 'brute';
    else if (wave >= 3 && roll < 0.56) type = 'sniper';
    else if (wave >= 2 && roll < 0.79 && canSpawnCharger) type = 'charger';

    if (campaignDifficulty.id === 'hard' && type === 'mine' && wave >= 3 && roll > 0.36 && canSpawnCharger) type = 'charger';
    if (campaignDifficulty.id === 'impossible' && type === 'mine' && wave >= 3 && roll > 0.22) type = 'sniper';
    if (type === 'charger' && !canSpawnCharger) type = 'mine';

    const waveHealth = 1 + Math.min(0.65, Math.max(0, wave - 1) * 0.035);
    const healthScale = waveHealth * campaignDifficulty.enemyHealth;
    const baseEnemy = {
        x, y, vx: 0, vy: 0, angle: 0,
        state: 'approach', stateTimer: 50 + Math.random() * 30,
        aimAngle: 0, shockwave: 0
    };

    if (type === 'pulse') {
        enemies.push({ ...baseEnemy, type, radius: 24, hp: Math.ceil(2 * healthScale), maxHp: Math.ceil(2 * healthScale), state: 'orbit', stateTimer: 0 });
    } else if (type === 'charger') {
        enemies.push({
            ...baseEnemy,
            type,
            radius: 17,
            hp: CHARGER_HIT_POINTS,
            maxHp: CHARGER_HIT_POINTS,
            completedDashes: 0,
            rage: false
        });
    } else if (type === 'sniper') {
        enemies.push({ ...baseEnemy, type, radius: 18, hp: Math.ceil(2 * healthScale), maxHp: Math.ceil(2 * healthScale), state: 'tracking', fireTimer: 90 + Math.random() * 55 });
    } else if (type === 'brute') {
        enemies.push({ ...baseEnemy, type, radius: 28, hp: Math.ceil(5 * healthScale), maxHp: Math.ceil(5 * healthScale), state: 'pursuit' });
    } else {
        enemies.push({ ...baseEnemy, type: 'mine', radius: 15, hp: Math.ceil(1 * healthScale), maxHp: Math.ceil(1 * healthScale) });
    }
}

function drawEnemies() {
    const quality = getGraphicsPreset();
    enemies.forEach((enemy) => {
        ctx.save();
        ctx.translate(enemy.x, enemy.y);

        if (enemy.type === 'mine') {
            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ff373f';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 1.36, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 91, 92, 0.48)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff1dc';
            ctx.fill();
        } else if (enemy.type === 'pulse') {
            ctx.rotate(enemy.angle || 0);
            ctx.beginPath();
            for (let point = 0; point < 8; point += 1) {
                const angle = point / 8 * Math.PI * 2;
                const radius = enemy.radius * (point % 2 === 0 ? 1 : 0.52);
                if (point === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
            ctx.closePath();
            ctx.fillStyle = quality.gradientMaterials ? '#b15cff' : '#8450ad';
            ctx.fill();
            ctx.strokeStyle = '#e7c5ff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 0.18, 0, Math.PI * 2);
            ctx.fillStyle = '#fff5ff';
            ctx.fill();
            if (enemy.shockwave > 0) {
                ctx.beginPath();
                ctx.arc(0, 0, enemy.shockwave, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(170, 0, 255, ' + Math.max(0, 1 - enemy.shockwave / 150) + ')';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        } else if (enemy.type === 'charger') {
            const showingLane = enemy.state === 'telegraph' || enemy.state === 'rageCooldown';
            if (showingLane) {
                const lineLength = Math.hypot(canvas.width, canvas.height) * 1.4;
                ctx.save();
                ctx.globalAlpha = 0.5 + 0.25 * Math.sin(gameTime * 0.35);
                ctx.setLineDash([8, 7]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(enemy.aimAngle) * lineLength, Math.sin(enemy.aimAngle) * lineLength);
                ctx.strokeStyle = enemy.rage ? '#ff477a' : '#ffad57';
                ctx.lineWidth = enemy.rage ? 3 : 2;
                ctx.stroke();
                ctx.restore();
            }

            // Three lit segments make the charger's three-shot health clear.
            const hpSegments = CHARGER_HIT_POINTS;
            const segmentGap = 2;
            const segmentWidth = (enemy.radius * 2 - segmentGap * (hpSegments - 1)) / hpSegments;
            const remainingHp = Math.max(0, Math.ceil(enemy.hp || 0));
            for (let segment = 0; segment < hpSegments; segment += 1) {
                ctx.fillStyle = segment < remainingHp
                    ? (enemy.rage ? '#ff386b' : '#ffc36c')
                    : 'rgba(18, 22, 32, 0.9)';
                ctx.fillRect(
                    -enemy.radius + segment * (segmentWidth + segmentGap),
                    -enemy.radius - 9,
                    segmentWidth,
                    4
                );
            }

            if (enemy.rage && quality.laserGlow) {
                ctx.shadowColor = '#ff285f';
                ctx.shadowBlur = 14;
            }
            ctx.rotate(enemy.state === 'dash' || enemy.state === 'telegraph' || enemy.state === 'rageCooldown'
                ? enemy.aimAngle : enemy.angle || 0);
            ctx.beginPath();
            ctx.moveTo(enemy.radius * 1.35, 0);
            ctx.lineTo(-enemy.radius * 0.58, -enemy.radius * 0.78);
            ctx.lineTo(-enemy.radius * 0.27, 0);
            ctx.lineTo(-enemy.radius * 0.58, enemy.radius * 0.78);
            ctx.closePath();
            ctx.fillStyle = enemy.rage
                ? (enemy.state === 'dash' ? '#ff174f' : '#a92e52')
                : (enemy.state === 'dash' ? '#ff6f4f' : '#bd603e');
            ctx.fill();
            ctx.strokeStyle = enemy.rage ? '#ffd0de' : (enemy.state === 'telegraph' ? '#ffe1aa' : '#ffb77a');
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(enemy.radius * 0.15, 0, enemy.radius * 0.22, 0, Math.PI * 2);
            ctx.fillStyle = '#fff0d5';
            ctx.fill();
        } else if (enemy.type === 'sniper') {
            if (enemy.state === 'aiming') {
                const lineLength = Math.hypot(canvas.width, canvas.height);
                ctx.save();
                ctx.globalAlpha = 0.46 + 0.3 * Math.sin(gameTime * 0.3);
                ctx.setLineDash([5, 8]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(enemy.aimAngle) * lineLength, Math.sin(enemy.aimAngle) * lineLength);
                ctx.strokeStyle = '#ff637e';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.restore();
            }
            ctx.rotate(enemy.aimAngle || enemy.angle || 0);
            ctx.beginPath();
            ctx.rect(-enemy.radius * 0.72, -enemy.radius * 0.72, enemy.radius * 1.44, enemy.radius * 1.44);
            ctx.fillStyle = '#4d315e';
            ctx.fill();
            ctx.strokeStyle = '#da9cff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(enemy.radius * 1.35, 0);
            ctx.strokeStyle = enemy.state === 'aiming' ? '#ff728c' : '#e9c7ff';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, enemy.radius * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = '#fff3ff';
            ctx.fill();
        } else if (enemy.type === 'brute') {
            ctx.rotate(enemy.angle || 0);
            ctx.beginPath();
            for (let point = 0; point < 8; point += 1) {
                const angle = point / 8 * Math.PI * 2;
                const radius = enemy.radius * (point % 2 === 0 ? 1 : 0.86);
                if (point === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
            ctx.closePath();
            ctx.fillStyle = quality.gradientMaterials ? '#7e4054' : '#654354';
            ctx.fill();
            ctx.strokeStyle = '#ffb08e';
            ctx.lineWidth = 2.2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-enemy.radius * 0.45, -enemy.radius * 0.1);
            ctx.lineTo(enemy.radius * 0.45, -enemy.radius * 0.1);
            ctx.moveTo(-enemy.radius * 0.45, enemy.radius * 0.18);
            ctx.lineTo(enemy.radius * 0.45, enemy.radius * 0.18);
            ctx.strokeStyle = 'rgba(255, 222, 192, 0.72)';
            ctx.lineWidth = 2;
            ctx.stroke();
            const hpRatio = Math.max(0, Math.min(1, enemy.hp / Math.max(1, enemy.maxHp || enemy.hp)));
            ctx.fillStyle = 'rgba(4, 8, 15, 0.8)';
            ctx.fillRect(-enemy.radius, -enemy.radius - 7, enemy.radius * 2, 3);
            ctx.fillStyle = '#ff986f';
            ctx.fillRect(-enemy.radius, -enemy.radius - 7, enemy.radius * 2 * hpRatio, 3);
        } else if (enemy.type === 'enemyBolt') {
            ctx.rotate(enemy.angle || Math.atan2(enemy.vy || 0, enemy.vx || 0));
            if (quality.laserGlow) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#ff637e';
            }
            ctx.beginPath();
            ctx.moveTo(enemy.radius * 1.8, 0);
            ctx.lineTo(0, enemy.radius * 0.72);
            ctx.lineTo(-enemy.radius, 0);
            ctx.lineTo(0, -enemy.radius * 0.72);
            ctx.closePath();
            ctx.fillStyle = quality.gradientMaterials ? '#ff607c' : '#bd6873';
            ctx.fill();
            ctx.strokeStyle = '#ffe4ed';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();
    });
}

window.spawnEnemy = spawnCampaignEnemy;
window.drawEnemies = drawEnemies;
window.updateEnemyEntities = updateEnemyEntities;

if (typeof CAMPAIGN_LEGACY_SPAWN_BOSS === 'function') {
    window.spawnBoss = function () {
        CAMPAIGN_LEGACY_SPAWN_BOSS.apply(this, arguments);
        if (!campaignActive || !boss) return;
        const adjustedHp = Math.max(1, Math.round(boss.maxHp * campaignDifficulty.bossHealth));
        boss.maxHp = adjustedHp;
        boss.hp = adjustedHp;
        const fill = campaignElement('bossFill');
        if (fill) fill.style.width = '100%';
    };
}

if (typeof CAMPAIGN_LEGACY_START_GAME === 'function') {
    window.startGame = function () {
        hideCampaignScreens();
        const result = CAMPAIGN_LEGACY_START_GAME.apply(this, arguments);
        rouletteIsSpinning = false;
        rouletteOutcome = null;
        if (rouletteLaunchTimer !== null) clearTimeout(rouletteLaunchTimer);
        rouletteLaunchTimer = null;

        if (gameMode === 'NET') {
            campaignActive = false;
            campaignPhase = 'network';
            showCampaignHud(true);
            const details = campaignElement('waveRunDetails');
            if (details) details.classList.add('hidden');
            return result;
        }

        startCampaignWave(1, WAVE_DIFFICULTY_PROFILES.normal, { clear: false, announce: false });
        return result;
    };
}

if (typeof CAMPAIGN_LEGACY_GAME_OVER === 'function') {
    window.gameOver = function () {
        updateCampaignMaxWave(wave);
        persistCampaignRecords();
        const shopButton = campaignElement('gameOverShopBtn');
        if (shopButton) {
            if (gameMode === 'NET') shopButton.classList.add('hidden');
            else shopButton.classList.remove('hidden');
        }
        campaignActive = false;
        campaignPhase = 'gameover';
        rouletteIsSpinning = false;
        if (rouletteLaunchTimer !== null) clearTimeout(rouletteLaunchTimer);
        rouletteLaunchTimer = null;
        return CAMPAIGN_LEGACY_GAME_OVER.apply(this, arguments);
    };
}

function beginNextRolledWave() {
    if (!rouletteOutcome || rouletteIsSpinning) return;
    if (rouletteLaunchTimer !== null) clearTimeout(rouletteLaunchTimer);
    rouletteLaunchTimer = null;
    const nextWave = wave + 1;
    startCampaignWave(nextWave, rouletteOutcome, { clear: true, announce: true });
    rouletteOutcome = null;
}

function resolveEnemyProjectileCollisions() {
    if (gameMode === 'NET') return;
    for (let enemyIndex = enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
        const projectile = enemies[enemyIndex];
        if (!projectile || !projectile.enemyProjectile) continue;
        const target = players.find((player) => player.active && !player.downed &&
            dist(player, projectile) < player.radius + projectile.radius * 0.7);
        if (!target) continue;
        enemies.splice(enemyIndex, 1);
        hitPlayer(target);
    }
}

if (typeof CAMPAIGN_LEGACY_CHECK_COLLISIONS === 'function') {
    window.checkCollisions = function () {
        resolveEnemyProjectileCollisions();
        return CAMPAIGN_LEGACY_CHECK_COLLISIONS.apply(this, arguments);
    };
}

function wireCampaignScreens() {
    const bindings = [
        ['continueWaveBtn', startDifficultyRoulette],
        ['waveClearShopBtn', openCampaignShop],
        ['gameOverShopBtn', openCampaignShop],
        ['startRolledWaveBtn', beginNextRolledWave],
        ['newRunBtn', startNewCampaignRun]
    ];
    bindings.forEach(([id, callback]) => {
        const button = campaignElement(id);
        if (button) button.addEventListener('click', callback);
    });
}

wireCampaignScreens();
refreshCampaignShop();
window.addEventListener('beforeunload', persistCampaignRecords);
