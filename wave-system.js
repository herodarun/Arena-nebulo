'use strict';

// The local run is now a sequence of long, self-contained waves. Online games
// keep their existing host-driven wave loop for compatibility.
const WAVE_DIFFICULTY_PROFILES = Object.freeze({
    easy: Object.freeze({
        id: 'easy', label: 'ЛЁГКАЯ', weight: 20, rivalAbilities: 1,
        worldScale: 0.76, spawnRate: 0.84, enemySpeed: 0.82,
        enemyHealth: 0.86, attackRate: 0.86, bossHealth: 0.84,
        color: '#8de3b4'
    }),
    normal: Object.freeze({
        id: 'normal', label: 'ОБЫЧНАЯ', weight: 50, rivalAbilities: 2,
        worldScale: 1, spawnRate: 1, enemySpeed: 1,
        enemyHealth: 1, attackRate: 1, bossHealth: 1,
        color: '#77dfff'
    }),
    hard: Object.freeze({
        id: 'hard', label: 'СЛОЖНАЯ', weight: 20, rivalAbilities: 3,
        worldScale: 1.34, spawnRate: 1.18, enemySpeed: 1.2,
        enemyHealth: 1.22, attackRate: 1.2, bossHealth: 1.3,
        color: '#ffca74'
    }),
    impossible: Object.freeze({
        id: 'impossible', label: 'НЕВОЗМОЖНАЯ', weight: 10, rivalAbilities: 4,
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
const CHARGER_RAGE_ATTACK_INTERVAL_SECONDS = 1.43;
const CHARGER_RAGE_COOLDOWN_FRAMES = Math.round(CHARGER_RAGE_ATTACK_INTERVAL_SECONDS * 60);
const CHARGER_RAGE_TURN_RADIANS = 3 * Math.PI / 180;
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
let rivalShipArrivalWave = 4;
let rivalShipArrivalPending = false;
let rivalShipHasArrived = false;
let rivalShipSpawnCountdown = 0;
let shopPreviewRotation = -0.28;
let shopPreviewZoom = 1;
let shopPreviewDrag = null;

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

    const cameraView = typeof getCameraWorldView === 'function'
        ? getCameraWorldView()
        : { x: 0, y: 0 };
    players.forEach((player, index) => {
        if (!player.active && !(gameMode === '2P' && index === 1)) return;
        if (gameMode === '2P') {
            player.active = true;
            player.downed = false;
            player.x = canvas.width * (index === 0 ? 0.34 : 0.66);
        } else {
            player.x = cameraView.x + canvas.width * 0.5;
        }
        player.y = cameraView.y + canvas.height * 0.58;
        player.vx = 0;
        player.vy = 0;
        player.speed = 0;
        player.invincible = Math.max(player.invincible || 0, 55);
        player.trail = [];
    });
}

function resetRivalShipSchedule() {
    // One debut encounter per campaign run, placed at a random wave from 4 to 6.
    rivalShipArrivalWave = 4 + Math.floor(Math.random() * 3);
    rivalShipArrivalPending = false;
    rivalShipHasArrived = false;
    rivalShipSpawnCountdown = 0;
}

function queueRivalShipArrivalForWave(number) {
    if (number !== rivalShipArrivalWave || rivalShipHasArrived || rivalShipArrivalPending) return;
    rivalShipArrivalPending = true;
    rivalShipSpawnCountdown = 150;
}

function updateRivalShipArrival() {
    if (!campaignActive || gameMode === 'NET' || !rivalShipArrivalPending || rivalShipHasArrived || boss) return;
    rivalShipSpawnCountdown -= 1;
    if (rivalShipSpawnCountdown > 0) return;

    spawnRivalShip();
    rivalShipArrivalPending = false;
    rivalShipHasArrived = true;
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
    queueRivalShipArrivalForWave(wave);
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
        const cameraView = typeof getCameraWorldView === 'function'
            ? getCameraWorldView()
            : { x: 0, y: 0 };
        spawnPowerup(
            rand(cameraView.x + canvas.width * 0.2, cameraView.x + canvas.width * 0.8),
            rand(cameraView.y + canvas.height * 0.2, cameraView.y + canvas.height * 0.8)
        );
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
        updateRivalShipArrival();
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
    let cumulativeWeight = 0;
    for (const id of WAVE_DIFFICULTY_ORDER) {
        const profile = WAVE_DIFFICULTY_PROFILES[id];
        cumulativeWeight += profile.weight;
        if (roll < cumulativeWeight) return profile;
    }
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
    if (note) note.textContent = 'Сложная и невозможная вместе выпадают в 30% случаев.';

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
            note.textContent = 'Следующая волна: ' + rouletteOutcome.label.toLowerCase() + '. Вероятность этого сектора — ' + rouletteOutcome.weight + '%. Тяжёлые сектора вместе — 30%. Старт через секунду.';
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
    drawHangarShipPreview();
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
        // Keep rage dash starts 1.43 seconds apart; show the next lane during
        // whatever recovery time remains after reaching a world boundary.
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

function spawnRivalShipBolt(ship, angle, speed, radius = 7) {
    const projectileCount = enemies.reduce((count, enemy) => count + (enemy && enemy.enemyProjectile ? 1 : 0), 0);
    if (projectileCount >= 24) return;

    enemies.push({
        type: 'enemyBolt',
        enemyProjectile: true,
        rivalProjectile: true,
        x: ship.x + Math.cos(angle) * (ship.radius + 5),
        y: ship.y + Math.sin(angle) * (ship.radius + 5),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        hp: 1,
        angle,
        life: 280,
        maxLife: 280,
        projectileColor: '#ff647c'
    });
}

function spawnRivalShipSpread(ship, target, boltCount, angleStep, speed) {
    if (!target) return;
    const baseAngle = Math.atan2(target.y - ship.y, target.x - ship.x);
    ship.aimAngle = baseAngle;
    for (let index = 0; index < boltCount; index += 1) {
        const offset = (index - (boltCount - 1) / 2) * angleStep;
        spawnRivalShipBolt(ship, baseAngle + offset, speed);
    }
}

function spawnRivalShip(shipTargetWave = wave) {
    if (gameMode === 'NET' || enemies.some((enemy) => enemy && enemy.type === 'rivalShip')) return;

    const bounds = typeof getGameWorldBounds === 'function'
        ? getGameWorldBounds()
        : { width: canvas.width, height: canvas.height };
    const view = typeof getCameraWorldView === 'function'
        ? getCameraWorldView()
        : { x: 0, y: 0, width: canvas.width, height: canvas.height };
    const radius = 24;
    const viewWidth = view.width || canvas.width;
    const viewHeight = view.height || canvas.height;
    const minX = Math.min(radius, bounds.width / 2);
    const minY = Math.min(radius, bounds.height / 2);
    const maxX = Math.max(minX, bounds.width - radius);
    const maxY = Math.max(minY, bounds.height - radius);
    const side = Math.floor(Math.random() * 4);
    let x;
    let y;

    if (side === 0 || side === 2) {
        x = clamp(rand(view.x + radius * 1.5, view.x + viewWidth - radius * 1.5), minX, maxX);
        y = clamp(side === 0 ? view.y - radius * 1.5 : view.y + viewHeight + radius * 1.5, minY, maxY);
    } else {
        x = clamp(side === 1 ? view.x + viewWidth + radius * 1.5 : view.x - radius * 1.5, minX, maxX);
        y = clamp(rand(view.y + radius * 1.5, view.y + viewHeight - radius * 1.5), minY, maxY);
    }

    const centerX = clamp(view.x + viewWidth * 0.5, minX, maxX);
    const centerY = clamp(view.y + viewHeight * 0.45, minY, maxY);
    const entryAngle = Math.atan2(centerY - y, centerX - x);
    const abilityCount = Math.max(1, Math.min(4, campaignDifficulty.rivalAbilities || 1));
    const waveHealth = 1 + Math.min(0.65, Math.max(0, shipTargetWave - 1) * 0.035);
    const hitPoints = Math.ceil(8 * waveHealth * campaignDifficulty.enemyHealth);
    const ship = {
        type: 'rivalShip',
        x,
        y,
        vx: Math.cos(entryAngle) * 2.8 * campaignDifficulty.enemySpeed,
        vy: Math.sin(entryAngle) * 2.8 * campaignDifficulty.enemySpeed,
        angle: entryAngle,
        aimAngle: entryAngle,
        radius,
        hp: hitPoints,
        maxHp: hitPoints,
        state: 'entry',
        stateTimer: 72,
        abilityCount,
        attackCycle: 0,
        attackTimer: 92,
        age: 0,
        orbitDirection: Math.random() < 0.5 ? -1 : 1
    };
    enemies.push(ship);

    if (typeof showFloatingText === 'function') {
        showFloatingText(x, y - radius - 12, 'СОПЕРНИК · СИСТЕМ: ' + abilityCount, '#ff7188');
    }
    if (typeof spawnParticles === 'function') spawnParticles(x, y, '#ff4b67', 12, 2.6, 24);
}

function beginRivalShipAttack(ship, target) {
    const ability = ship.attackCycle % ship.abilityCount;
    ship.attackCycle += 1;
    ship.attackTimer = Math.max(78, 136 / campaignDifficulty.attackRate);
    ship.aimAngle = Math.atan2(target.y - ship.y, target.x - ship.x);

    if (ability === 0) {
        // The easiest difficulty keeps the first boss's three-bolt volley.
        const speed = (4.2 + Math.min(1, wave * 0.035)) * campaignDifficulty.enemySpeed;
        spawnRivalShipSpread(ship, target, 3, 0.22, speed);
        ship.state = 'recover';
        ship.stateTimer = 24;
    } else if (ability === 1) {
        // The second system widens the attack into a five-bolt fan.
        const speed = (3.9 + Math.min(0.9, wave * 0.03)) * campaignDifficulty.enemySpeed;
        spawnRivalShipSpread(ship, target, 5, 0.27, speed);
        ship.state = 'recover';
        ship.stateTimer = 30;
    } else if (ability === 2) {
        // Hard and Impossible add a clearly telegraphed charge at the player.
        ship.state = 'attackTell';
        ship.stateTimer = 48;
    } else {
        // The fourth system sends a short, dodgeable ring of six bolts.
        const speed = (3.6 + Math.min(0.8, wave * 0.025)) * campaignDifficulty.enemySpeed;
        for (let index = 0; index < 6; index += 1) {
            const angle = ship.aimAngle + index / 6 * Math.PI * 2;
            spawnRivalShipBolt(ship, angle, speed, 6.5);
        }
        ship.state = 'recover';
        ship.stateTimer = 34;
    }
}

function updateRivalShipEntity(ship, target, step, pace) {
    if (!target) return;
    ship.age += step;

    if (ship.state === 'entry') {
        ship.x += ship.vx * step;
        ship.y += ship.vy * step;
        ship.stateTimer -= step;
        constrainCampaignEnemyToWorld(ship);
        ship.angle = Math.atan2(ship.vy, ship.vx);
        if (ship.stateTimer <= 0) {
            ship.state = 'combat';
            ship.vx *= 0.2;
            ship.vy *= 0.2;
            ship.attackTimer = 55;
        }
        return;
    }

    if (ship.state === 'attackTell') {
        ship.stateTimer -= step;
        if (ship.stateTimer <= 0) {
            ship.state = 'dash';
            ship.stateTimer = 28;
            ship.dashSpeed = 8.8 * pace;
            ship.vx = Math.cos(ship.aimAngle) * ship.dashSpeed;
            ship.vy = Math.sin(ship.aimAngle) * ship.dashSpeed;
        }
        ship.angle = ship.aimAngle;
        return;
    }

    if (ship.state === 'dash') {
        ship.x += ship.vx * step;
        ship.y += ship.vy * step;
        ship.stateTimer -= step;
        const hitBoundary = constrainCampaignEnemyToWorld(ship);
        if (ship.stateTimer <= 0 || hitBoundary) {
            ship.state = 'recover';
            ship.stateTimer = 34;
            ship.vx *= 0.12;
            ship.vy *= 0.12;
        }
        ship.angle = ship.aimAngle;
        return;
    }

    if (ship.state === 'recover') {
        ship.stateTimer -= step;
        if (ship.stateTimer <= 0) ship.state = 'combat';
        ship.angle = ship.aimAngle;
        return;
    }

    const dx = target.x - ship.x;
    const dy = target.y - ship.y;
    const distance = Math.hypot(dx, dy) || 1;
    if (distance < 205) {
        ship.vx -= dx / distance * 0.046 * pace * step;
        ship.vy -= dy / distance * 0.046 * pace * step;
    } else if (distance > 350) {
        ship.vx += dx / distance * 0.038 * pace * step;
        ship.vy += dy / distance * 0.038 * pace * step;
    } else {
        const orbit = Math.atan2(dy, dx) + ship.orbitDirection * Math.PI * 0.5;
        ship.vx += Math.cos(orbit) * 0.026 * pace * step;
        ship.vy += Math.sin(orbit) * 0.026 * pace * step;
    }
    ship.vx *= 0.985;
    ship.vy *= 0.985;
    const speed = Math.hypot(ship.vx, ship.vy);
    const maxSpeed = 2.55 * pace;
    if (speed > maxSpeed) {
        ship.vx = ship.vx / speed * maxSpeed;
        ship.vy = ship.vy / speed * maxSpeed;
    }
    ship.x += ship.vx * step;
    ship.y += ship.vy * step;
    constrainCampaignEnemyToWorld(ship);
    ship.aimAngle = Math.atan2(target.y - ship.y, target.x - ship.x);
    ship.angle = ship.aimAngle;
    ship.attackTimer -= step;
    if (ship.attackTimer <= 0) beginRivalShipAttack(ship, target);
}

function constrainCampaignEnemyToWorld(enemy) {
    const bounds = typeof getGameWorldBounds === 'function'
        ? getGameWorldBounds()
        : { width: canvas.width, height: canvas.height };
    const radius = Math.max(0, Number(enemy.radius) || 0);
    const minX = Math.min(radius, bounds.width / 2);
    const minY = Math.min(radius, bounds.height / 2);
    const maxX = Math.max(minX, bounds.width - radius);
    const maxY = Math.max(minY, bounds.height - radius);
    const hitBoundary = enemy.x < minX || enemy.x > maxX || enemy.y < minY || enemy.y > maxY;

    enemy.x = clamp(enemy.x, minX, maxX);
    enemy.y = clamp(enemy.y, minY, maxY);
    if ((enemy.x <= minX && enemy.vx < 0) || (enemy.x >= maxX && enemy.vx > 0)) enemy.vx = 0;
    if ((enemy.y <= minY && enemy.vy < 0) || (enemy.y >= maxY && enemy.vy > 0)) enemy.vy = 0;
    return hitBoundary;
}

function updateEnemyEntities(delta = 1) {
    const step = Number.isFinite(delta) ? Math.max(0, delta) : 1;
    const bounds = typeof getGameWorldBounds === 'function'
        ? getGameWorldBounds()
        : { width: canvas.width, height: canvas.height };
    const pace = campaignDifficulty.enemySpeed * (1 + Math.min(0.22, Math.max(0, wave - 1) * 0.02));

    for (let index = enemies.length - 1; index >= 0; index -= 1) {
        const enemy = enemies[index];
        if (!enemy || enemy.bossHazard || enemy.type === 'mine' || enemy.type === 'pulse') continue;

        if (enemy.type === 'enemyBolt') {
            enemy.x += (enemy.vx || 0) * step;
            enemy.y += (enemy.vy || 0) * step;
            enemy.life = (enemy.life || 0) - step;
            if (enemy.life <= 0 || enemy.x < -100 || enemy.x > bounds.width + 100 ||
                enemy.y < -100 || enemy.y > bounds.height + 100) enemies.splice(index, 1);
            continue;
        }

        const target = updateCampaignEnemyTarget(enemy);
        if (enemy.type === 'rivalShip') {
            updateRivalShipEntity(enemy, target, step, pace);
            continue;
        }

        if (enemy.type === 'charger') {
            enemy.state = enemy.state || 'approach';
            if (enemy.stateTimer === undefined) enemy.stateTimer = 52;

            if (enemy.state === 'approach') {
                enemy.stateTimer -= step;
                steerCampaignEnemy(enemy, target, 0.032 * pace * step, 2.35 * pace);
                enemy.x += enemy.vx * step;
                enemy.y += enemy.vy * step;
                constrainCampaignEnemyToWorld(enemy);
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

                const margin = enemy.radius;
                const crossedWorldBoundary = enemy.x < margin || enemy.x > bounds.width - margin ||
                    enemy.y < margin || enemy.y > bounds.height - margin;
                if (crossedWorldBoundary) {
                    enemy.x = clamp(enemy.x, margin, Math.max(margin, bounds.width - margin));
                    enemy.y = clamp(enemy.y, margin, Math.max(margin, bounds.height - margin));
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
                constrainCampaignEnemyToWorld(enemy);
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
            constrainCampaignEnemyToWorld(enemy);
        }
    }
}

function spawnCampaignEnemy() {
    if (gameMode === 'NET' && typeof CAMPAIGN_LEGACY_SPAWN_ENEMY === 'function') {
        return CAMPAIGN_LEGACY_SPAWN_ENEMY.apply(this, arguments);
    }
    const bounds = typeof getGameWorldBounds === 'function'
        ? getGameWorldBounds()
        : { width: canvas.width, height: canvas.height };
    const cameraView = typeof getCameraWorldView === 'function'
        ? getCameraWorldView()
        : { x: 0, y: 0 };
    const edge = Math.min(92, bounds.width * 0.15, bounds.height * 0.15);
    const minX = Math.min(edge, bounds.width / 2);
    const minY = Math.min(edge, bounds.height / 2);
    const maxX = Math.max(minX, bounds.width - edge);
    const maxY = Math.max(minY, bounds.height - edge);
    const viewLeft = clamp(cameraView.x, minX, maxX);
    const viewRight = clamp(cameraView.x + canvas.width, minX, maxX);
    const viewTop = clamp(cameraView.y, minY, maxY);
    const viewBottom = clamp(cameraView.y + canvas.height, minY, maxY);
    const side = Math.floor(Math.random() * 4);
    let x;
    let y;
    if (side === 0) {
        x = rand(Math.min(viewLeft, viewRight), Math.max(viewLeft, viewRight));
        y = clamp(cameraView.y + edge, minY, maxY);
    } else if (side === 1) {
        x = clamp(cameraView.x + canvas.width - edge, minX, maxX);
        y = rand(Math.min(viewTop, viewBottom), Math.max(viewTop, viewBottom));
    } else if (side === 2) {
        x = rand(Math.min(viewLeft, viewRight), Math.max(viewLeft, viewRight));
        y = clamp(cameraView.y + canvas.height - edge, minY, maxY);
    } else {
        x = clamp(cameraView.x + edge, minX, maxX);
        y = rand(Math.min(viewTop, viewBottom), Math.max(viewTop, viewBottom));
    }

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

function drawShipSilhouette(targetContext, primary, accent, boost, quality = {}) {
    const gradients = Boolean(quality.gradientMaterials);

    let wingGradient = null;
    if (gradients) {
        wingGradient = targetContext.createLinearGradient(-10, -15, 8, 0);
        wingGradient.addColorStop(0, 'rgba(10, 20, 39, 0.98)');
        wingGradient.addColorStop(0.62, accent);
        wingGradient.addColorStop(1, 'rgba(240, 249, 255, 0.94)');
    }
    targetContext.fillStyle = wingGradient || accent;
    targetContext.globalAlpha = 0.9;
    targetContext.beginPath();
    targetContext.moveTo(6, -3);
    targetContext.lineTo(-3, -14);
    targetContext.lineTo(-11, -13);
    targetContext.lineTo(-8, -4);
    targetContext.lineTo(-12, -2);
    targetContext.closePath();
    targetContext.fill();
    targetContext.beginPath();
    targetContext.moveTo(6, 3);
    targetContext.lineTo(-3, 14);
    targetContext.lineTo(-11, 13);
    targetContext.lineTo(-8, 4);
    targetContext.lineTo(-12, 2);
    targetContext.closePath();
    targetContext.fill();
    targetContext.globalAlpha = 1;

    targetContext.strokeStyle = 'rgba(245, 248, 255, 0.48)';
    targetContext.lineWidth = 0.8;
    targetContext.beginPath();
    targetContext.moveTo(3, -4);
    targetContext.lineTo(-6, -10.5);
    targetContext.moveTo(3, 4);
    targetContext.lineTo(-6, 10.5);
    targetContext.stroke();

    targetContext.beginPath();
    targetContext.moveTo(23, 0);
    targetContext.lineTo(10, -3.4);
    targetContext.lineTo(4, -8);
    targetContext.lineTo(-5, -8);
    targetContext.lineTo(-9, -5);
    targetContext.lineTo(-15, -4);
    targetContext.lineTo(-17, -2);
    targetContext.lineTo(-17, 2);
    targetContext.lineTo(-15, 4);
    targetContext.lineTo(-9, 5);
    targetContext.lineTo(-5, 8);
    targetContext.lineTo(4, 8);
    targetContext.lineTo(10, 3.4);
    targetContext.closePath();
    let hull = null;
    if (gradients) {
        hull = targetContext.createLinearGradient(-17, 0, 23, 0);
        hull.addColorStop(0, '#17253a');
        hull.addColorStop(0.28, primary);
        hull.addColorStop(0.72, '#d6d5e3');
        hull.addColorStop(1, '#fff7f7');
    }
    targetContext.fillStyle = hull || primary;
    targetContext.fill();
    targetContext.strokeStyle = 'rgba(255, 242, 245, 0.94)';
    targetContext.lineWidth = 1.2;
    targetContext.stroke();

    targetContext.beginPath();
    targetContext.moveTo(16, 0);
    targetContext.lineTo(5, -1.45);
    targetContext.lineTo(-7, -1.8);
    targetContext.lineTo(-10, 0);
    targetContext.lineTo(-7, 1.8);
    targetContext.lineTo(5, 1.45);
    targetContext.closePath();
    targetContext.fillStyle = 'rgba(255, 244, 247, 0.28)';
    targetContext.fill();

    targetContext.beginPath();
    targetContext.ellipse(4.5, 0, 5.1, 2.35, 0, 0, Math.PI * 2);
    targetContext.fillStyle = 'rgba(6, 18, 36, 0.96)';
    targetContext.fill();
    targetContext.strokeStyle = 'rgba(224, 244, 255, 0.96)';
    targetContext.lineWidth = 0.9;
    targetContext.stroke();
    targetContext.beginPath();
    targetContext.ellipse(5.3, -0.65, 2.4, 0.65, -0.18, Math.PI, Math.PI * 2);
    targetContext.strokeStyle = 'rgba(255, 255, 255, 0.82)';
    targetContext.lineWidth = 0.75;
    targetContext.stroke();

    targetContext.beginPath();
    targetContext.arc(-12.2, 0, 2.15, 0, Math.PI * 2);
    targetContext.fillStyle = 'rgba(16, 8, 22, 0.98)';
    targetContext.fill();
    targetContext.beginPath();
    targetContext.arc(-12.2, 0, 1.05, 0, Math.PI * 2);
    targetContext.fillStyle = boost;
    targetContext.fill();

    targetContext.fillStyle = '#ffffff';
    targetContext.beginPath();
    targetContext.arc(19, 0, 1.25, 0, Math.PI * 2);
    targetContext.fill();
    targetContext.fillStyle = accent;
    targetContext.beginPath();
    targetContext.arc(-8.4, -11.5, 1.15, 0, Math.PI * 2);
    targetContext.arc(-8.4, 11.5, 1.15, 0, Math.PI * 2);
    targetContext.fill();
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
                const bounds = typeof getGameWorldBounds === 'function'
                    ? getGameWorldBounds()
                    : { width: canvas.width, height: canvas.height };
                const lineLength = Math.hypot(bounds.width, bounds.height) * 1.4;
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
                const bounds = typeof getGameWorldBounds === 'function'
                    ? getGameWorldBounds()
                    : { width: canvas.width, height: canvas.height };
                const lineLength = Math.hypot(bounds.width, bounds.height);
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
        } else if (enemy.type === 'rivalShip') {
            if (enemy.state === 'attackTell') {
                const bounds = typeof getGameWorldBounds === 'function'
                    ? getGameWorldBounds()
                    : { width: canvas.width, height: canvas.height };
                const lineLength = Math.hypot(bounds.width, bounds.height) * 1.3;
                ctx.save();
                ctx.globalAlpha = 0.44 + 0.3 * Math.sin(gameTime * 0.32);
                ctx.setLineDash([8, 7]);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(enemy.aimAngle) * lineLength, Math.sin(enemy.aimAngle) * lineLength);
                ctx.strokeStyle = '#ff526d';
                ctx.lineWidth = 2.5;
                ctx.stroke();
                ctx.restore();
            }

            ctx.save();
            ctx.rotate(enemy.angle || 0);
            if ((enemy.state === 'dash' || enemy.state === 'attackTell') && quality.laserGlow) {
                ctx.shadowColor = '#ff284e';
                ctx.shadowBlur = 16;
            }
            drawShipSilhouette(ctx, '#ff3e58', '#ff947a', '#ff264e', quality);
            ctx.restore();

            const hpRatio = Math.max(0, Math.min(1, enemy.hp / Math.max(1, enemy.maxHp || enemy.hp)));
            ctx.fillStyle = 'rgba(7, 8, 18, 0.88)';
            ctx.fillRect(-enemy.radius, -enemy.radius - 11, enemy.radius * 2, 3.5);
            ctx.fillStyle = '#ff526d';
            ctx.fillRect(-enemy.radius, -enemy.radius - 11, enemy.radius * 2 * hpRatio, 3.5);
            for (let index = 0; index < enemy.abilityCount; index += 1) {
                ctx.beginPath();
                ctx.arc(-enemy.radius + 3 + index * 5, -enemy.radius - 16, 1.45, 0, Math.PI * 2);
                ctx.fillStyle = '#ff9a9f';
                ctx.fill();
            }
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
            ctx.fillStyle = enemy.projectileColor || (quality.gradientMaterials ? '#ff607c' : '#bd6873');
            ctx.fill();
            ctx.strokeStyle = '#ffe4ed';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();
    });
}

function drawHangarShipPreview() {
    const previewCanvas = campaignElement('shopShipPreviewCanvas');
    if (!previewCanvas) return;
    const rect = previewCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const pixelRatio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const pixelWidth = Math.max(1, Math.round(rect.width * pixelRatio));
    const pixelHeight = Math.max(1, Math.round(rect.height * pixelRatio));
    if (previewCanvas.width !== pixelWidth || previewCanvas.height !== pixelHeight) {
        previewCanvas.width = pixelWidth;
        previewCanvas.height = pixelHeight;
    }

    const previewContext = previewCanvas.getContext('2d');
    const width = rect.width;
    const height = rect.height;
    previewContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    previewContext.clearRect(0, 0, width, height);

    const background = previewContext.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, '#061526');
    background.addColorStop(0.58, '#07101e');
    background.addColorStop(1, '#030811');
    previewContext.fillStyle = background;
    previewContext.fillRect(0, 0, width, height);

    const glow = previewContext.createRadialGradient(width * 0.5, height * 0.44, 2, width * 0.5, height * 0.44, Math.max(width, height) * 0.62);
    glow.addColorStop(0, 'rgba(40, 148, 201, 0.2)');
    glow.addColorStop(0.58, 'rgba(34, 84, 143, 0.07)');
    glow.addColorStop(1, 'rgba(3, 9, 18, 0)');
    previewContext.fillStyle = glow;
    previewContext.fillRect(0, 0, width, height);

    for (let index = 0; index < 22; index += 1) {
        const starX = (index * 73 + 19) % width;
        const starY = (index * 47 + 13) % Math.max(1, height * 0.72);
        previewContext.beginPath();
        previewContext.arc(starX, starY, index % 5 === 0 ? 1.15 : 0.65, 0, Math.PI * 2);
        previewContext.fillStyle = index % 3 === 0 ? 'rgba(190, 231, 255, 0.7)' : 'rgba(126, 181, 220, 0.48)';
        previewContext.fill();
    }

    const floorY = height * 0.72;
    previewContext.save();
    previewContext.globalAlpha = 0.54;
    previewContext.strokeStyle = 'rgba(70, 155, 203, 0.28)';
    previewContext.lineWidth = 1;
    for (let line = 0; line < 6; line += 1) {
        const y = floorY + line * line * height * 0.008;
        previewContext.beginPath();
        previewContext.moveTo(width * 0.08, y);
        previewContext.lineTo(width * 0.92, y);
        previewContext.stroke();
    }
    previewContext.beginPath();
    previewContext.ellipse(width * 0.5, floorY + 4, width * 0.29, height * 0.055, 0, 0, Math.PI * 2);
    previewContext.strokeStyle = 'rgba(95, 194, 241, 0.55)';
    previewContext.lineWidth = 1.2;
    previewContext.stroke();
    previewContext.beginPath();
    previewContext.ellipse(width * 0.5, floorY + 4, width * 0.21, height * 0.035, 0, 0, Math.PI * 2);
    previewContext.strokeStyle = 'rgba(117, 162, 255, 0.3)';
    previewContext.stroke();
    previewContext.restore();

    const player = players[0] || {};
    const scale = Math.min((width * 0.56) / 46, (height * 0.43) / 30) * shopPreviewZoom;
    previewContext.save();
    previewContext.translate(width * 0.5, height * 0.45);
    previewContext.rotate(shopPreviewRotation);
    previewContext.scale(scale, scale);

    const primary = player.color || '#64c8ff';
    const accent = player.secondaryColor || primary;
    const boost = player.boostColor || accent;
    const flame = previewContext.createLinearGradient(-12, 0, -21, 0);
    flame.addColorStop(0, 'rgba(233, 250, 255, 0.92)');
    flame.addColorStop(0.2, boost);
    flame.addColorStop(1, 'rgba(42, 175, 255, 0)');
    previewContext.beginPath();
    previewContext.moveTo(-12, -2.4);
    previewContext.lineTo(-21, 0);
    previewContext.lineTo(-12, 2.4);
    previewContext.closePath();
    previewContext.fillStyle = flame;
    previewContext.fill();

    previewContext.shadowColor = accent;
    previewContext.shadowBlur = 12;
    drawShipSilhouette(previewContext, primary, accent, boost, { gradientMaterials: true, laserGlow: true });
    previewContext.restore();

    previewContext.save();
    previewContext.strokeStyle = 'rgba(125, 201, 234, 0.34)';
    previewContext.lineWidth = 1;
    previewContext.beginPath();
    previewContext.moveTo(width * 0.5, height * 0.82);
    previewContext.lineTo(width * 0.5, height * 0.9);
    previewContext.stroke();
    previewContext.beginPath();
    previewContext.arc(width * 0.5, height * 0.82, 2, 0, Math.PI * 2);
    previewContext.fillStyle = '#92dbff';
    previewContext.fill();
    previewContext.restore();
}

function setShopPreviewZoom(percent) {
    shopPreviewZoom = clamp(Number(percent) / 100, 0.8, 1.6);
    const slider = campaignElement('shopPreviewZoom');
    const value = campaignElement('shopPreviewZoomValue');
    if (slider) slider.value = String(Math.round(shopPreviewZoom * 100));
    if (value) value.textContent = Math.round(shopPreviewZoom * 100) + '%';
    drawHangarShipPreview();
}

function connectShopShipPreview() {
    const previewCanvas = campaignElement('shopShipPreviewCanvas');
    const zoomSlider = campaignElement('shopPreviewZoom');
    if (!previewCanvas) return;

    previewCanvas.addEventListener('pointerdown', (event) => {
        shopPreviewDrag = { pointerId: event.pointerId, x: event.clientX, rotation: shopPreviewRotation };
        previewCanvas.classList.add('is-dragging');
        if (typeof previewCanvas.setPointerCapture === 'function') previewCanvas.setPointerCapture(event.pointerId);
        event.preventDefault();
    });
    previewCanvas.addEventListener('pointermove', (event) => {
        if (!shopPreviewDrag || shopPreviewDrag.pointerId !== event.pointerId) return;
        shopPreviewRotation = shopPreviewDrag.rotation + (event.clientX - shopPreviewDrag.x) * 0.012;
        drawHangarShipPreview();
    });
    const stopPreviewDrag = (event) => {
        if (shopPreviewDrag && (!event || shopPreviewDrag.pointerId === event.pointerId)) {
            shopPreviewDrag = null;
            previewCanvas.classList.remove('is-dragging');
        }
    };
    previewCanvas.addEventListener('pointerup', stopPreviewDrag);
    previewCanvas.addEventListener('pointercancel', stopPreviewDrag);
    previewCanvas.addEventListener('lostpointercapture', stopPreviewDrag);
    previewCanvas.addEventListener('wheel', (event) => {
        event.preventDefault();
        setShopPreviewZoom(shopPreviewZoom * 100 - Math.sign(event.deltaY) * 8);
    }, { passive: false });
    previewCanvas.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            shopPreviewRotation += event.key === 'ArrowLeft' ? -0.16 : 0.16;
            drawHangarShipPreview();
        } else if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            setShopPreviewZoom(shopPreviewZoom * 100 + 8);
        } else if (event.key === '-') {
            event.preventDefault();
            setShopPreviewZoom(shopPreviewZoom * 100 - 8);
        }
    });
    if (zoomSlider) zoomSlider.addEventListener('input', () => setShopPreviewZoom(zoomSlider.value));
    window.addEventListener('resize', drawHangarShipPreview);
    setShopPreviewZoom(shopPreviewZoom * 100);
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
        resetRivalShipSchedule();
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
    connectShopShipPreview();
}

wireCampaignScreens();
refreshCampaignShop();
window.addEventListener('beforeunload', persistCampaignRecords);
