'use strict';

// Medium is the game's normal look. Low renders the same shapes at reduced
// resolution and trims effects; models remain unchanged at every quality level.
const GRAPHICS_PRESETS = Object.freeze({
    low: Object.freeze({
        label: 'Низкое',
        renderScale: 0.62,
        starCount: 250,
        nebulaCount: 7,
        backdropInterval: 4,
        backdropScale: 0.9,
        nebulaStrength: 0.85,
        starCrosses: false,
        particleScale: 0.8,
        particleCap: 220,
        skipTrailParticles: true,
        trailPoints: 36,
        surfaceDetail: false,
        gradientMaterials: false,
        orbOrbit: false,
        powerupDetail: false,
        laserGlow: false,
        explosionSpokes: 6,
        hudInterval: 4
    }),
    medium: Object.freeze({
        label: 'Среднее',
        renderScale: 0.84,
        starCount: 300,
        nebulaCount: 8,
        backdropInterval: 3,
        backdropScale: 1,
        nebulaStrength: 1,
        starCrosses: true,
        particleScale: 1,
        particleCap: 280,
        skipTrailParticles: false,
        trailPoints: 999,
        surfaceDetail: true,
        gradientMaterials: true,
        orbOrbit: true,
        powerupDetail: true,
        laserGlow: true,
        explosionSpokes: 8,
        hudInterval: 3
    }),
    high: Object.freeze({
        label: 'Высокое',
        renderScale: 1,
        starCount: 360,
        nebulaCount: 10,
        backdropInterval: 2,
        backdropScale: 1,
        nebulaStrength: 1.05,
        starCrosses: true,
        particleScale: 1.15,
        particleCap: 420,
        skipTrailParticles: false,
        trailPoints: 999,
        surfaceDetail: true,
        gradientMaterials: true,
        orbOrbit: true,
        powerupDetail: true,
        laserGlow: true,
        explosionSpokes: 10,
        hudInterval: 2
    })
});

const GRAPHICS_QUALITY_STORAGE_KEY = 'nebulaDriftGraphicsQuality';
const GRAPHICS_RENDER_SCALE_STORAGE_KEY = 'nebulaDriftRenderScale';
const GRAPHICS_RENDER_SCALE_MIN = 0.5;
const GRAPHICS_RENDER_SCALE_MAX = 1;

function readSavedRenderScale() {
    try {
        const saved = localStorage.getItem(GRAPHICS_RENDER_SCALE_STORAGE_KEY);
        if (saved === null) return null;
        const scale = Number(saved);
        if (!Number.isFinite(scale)) return null;
        return Math.max(GRAPHICS_RENDER_SCALE_MIN, Math.min(GRAPHICS_RENDER_SCALE_MAX, scale));
    } catch (error) {
        return null;
    }
}

function readSavedGraphicsQuality() {
    try {
        const saved = localStorage.getItem(GRAPHICS_QUALITY_STORAGE_KEY);
        return Object.prototype.hasOwnProperty.call(GRAPHICS_PRESETS, saved) ? saved : 'medium';
    } catch (error) {
        return 'medium';
    }
}

let graphicsQuality = readSavedGraphicsQuality();
let renderScaleOverride = readSavedRenderScale();
let settingsReturnState = null;
let settingsReturnPauseVisible = false;
let settingsReturnFocus = null;

function getGraphicsPreset() {
    return GRAPHICS_PRESETS[graphicsQuality] || GRAPHICS_PRESETS.medium;
}

function getCanvasRenderScale() {
    const scale = renderScaleOverride === null ? getGraphicsPreset().renderScale : renderScaleOverride;
    return Math.max(GRAPHICS_RENDER_SCALE_MIN, Math.min(GRAPHICS_RENDER_SCALE_MAX, Number.isFinite(scale) ? scale : 1));
}

function updateCanvasPixelationMode() {
    document.documentElement.classList.toggle('render-scale-pixelated', getCanvasRenderScale() <= 0.75);
}

function setRenderScaleOverride(scale) {
    let nextScale = null;
    if (scale !== null) {
        const parsedScale = Number(scale);
        if (!Number.isFinite(parsedScale)) return;
        nextScale = Math.max(GRAPHICS_RENDER_SCALE_MIN, Math.min(GRAPHICS_RENDER_SCALE_MAX, parsedScale));
    }
    renderScaleOverride = nextScale;

    try {
        if (renderScaleOverride === null) localStorage.removeItem(GRAPHICS_RENDER_SCALE_STORAGE_KEY);
        else localStorage.setItem(GRAPHICS_RENDER_SCALE_STORAGE_KEY, String(renderScaleOverride));
    } catch (error) {
        // Keep the selected resolution for this session if storage is unavailable.
    }

    updateCanvasPixelationMode();
    resizeCanvas();
    if (gameState === STATE.PAUSED) {
        ctx.save();
        draw();
        ctx.restore();
    }
    refreshGraphicsSettingsUI();
}

function refreshGraphicsSettingsUI() {
    const overlay = document.getElementById('graphicsSettingsOverlay');
    if (!overlay) return;

    overlay.querySelectorAll('[data-graphics-quality]').forEach((button) => {
        const selected = button.dataset.graphicsQuality === graphicsQuality;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
    });

    const note = document.getElementById('graphicsQualityNote');
    if (note) {
        if (graphicsQuality === 'low') {
            note.textContent = 'Меньше неона и частиц, рендер легче. Силуэты корабля и астероидов не меняются.';
        } else if (graphicsQuality === 'high') {
            note.textContent = 'Дополнительные детали окружения и эффекты. Модели остаются прежними.';
        } else {
            note.textContent = 'Среднее — стандартный режим. Форма корабля и астероидов не меняется.';
        }
    }

    const scaleSlider = document.getElementById('renderScaleSlider');
    const scaleValue = document.getElementById('renderScaleValue');
    const autoButton = document.getElementById('renderScaleAutoBtn');
    const currentScale = getCanvasRenderScale();
    if (scaleSlider) scaleSlider.value = String(Math.round(currentScale * 100));
    if (scaleValue) scaleValue.textContent = Math.round(currentScale * 100) + '%';
    if (autoButton) {
        const usingPresetScale = renderScaleOverride === null;
        autoButton.disabled = usingPresetScale;
        autoButton.setAttribute('aria-label', usingPresetScale
            ? 'Сейчас используется масштаб выбранного пресета'
            : 'Вернуть масштаб выбранного пресета');
        autoButton.textContent = 'ПО ПРЕСЕТУ';
    }
}

function setGraphicsQuality(quality) {
    if (!Object.prototype.hasOwnProperty.call(GRAPHICS_PRESETS, quality)) return;
    const changed = graphicsQuality !== quality;
    graphicsQuality = quality;
    document.documentElement.dataset.graphicsQuality = quality;
    updateCanvasPixelationMode();

    try {
        localStorage.setItem(GRAPHICS_QUALITY_STORAGE_KEY, quality);
    } catch (error) {
        // The setting still works for this session when storage is unavailable.
    }

    if (changed) {
        // The logical canvas size stays constant; only its backing resolution changes.
        resizeCanvas();
        // Rebuild only the decorative background. Gameplay entities and models
        // are untouched, including in network games.
        initStars();
        initNebula();
        backdropFrame = 0;
        if (gameState === STATE.PAUSED) {
            ctx.save();
            draw();
            ctx.restore();
        }
    }
    refreshGraphicsSettingsUI();
}

function openGraphicsSettings() {
    const overlay = document.getElementById('graphicsSettingsOverlay');
    const pauseOverlay = document.getElementById('pauseOverlay');
    if (!overlay || !overlay.classList.contains('hidden')) return;
    if ((typeof upgradeChoiceOpen !== 'undefined' && upgradeChoiceOpen) ||
        (typeof networkUpgradePaused !== 'undefined' && networkUpgradePaused)) return;

    settingsReturnState = gameState;
    settingsReturnPauseVisible = Boolean(pauseOverlay && !pauseOverlay.classList.contains('hidden'));
    settingsReturnFocus = document.activeElement;

    if (gameState === STATE.PLAYING) {
        gameState = STATE.PAUSED;
        if (pauseOverlay) pauseOverlay.classList.add('hidden');
    }

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    refreshGraphicsSettingsUI();
    const selected = overlay.querySelector(`[data-graphics-quality="${graphicsQuality}"]`);
    if (selected) selected.focus();
}

function closeGraphicsSettings() {
    const overlay = document.getElementById('graphicsSettingsOverlay');
    const pauseOverlay = document.getElementById('pauseOverlay');
    if (!overlay || overlay.classList.contains('hidden')) return;

    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');

    if (settingsReturnState !== null) {
        gameState = settingsReturnState;
        if (pauseOverlay) {
            if (settingsReturnPauseVisible) pauseOverlay.classList.remove('hidden');
            else pauseOverlay.classList.add('hidden');
        }
    }

    settingsReturnState = null;
    settingsReturnPauseVisible = false;
    const focusTarget = settingsReturnFocus;
    settingsReturnFocus = null;
    if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus();
}

function connectGraphicsSettingsUI() {
    const menuButton = document.getElementById('graphicsSettingsBtn');
    const pauseButton = document.getElementById('pauseGraphicsSettingsBtn');
    const closeButton = document.getElementById('closeGraphicsSettingsBtn');
    const doneButton = document.getElementById('doneGraphicsSettingsBtn');
    const overlay = document.getElementById('graphicsSettingsOverlay');
    const renderScaleSlider = document.getElementById('renderScaleSlider');
    const renderScaleAutoButton = document.getElementById('renderScaleAutoBtn');

    if (menuButton) menuButton.addEventListener('click', openGraphicsSettings);
    if (pauseButton) pauseButton.addEventListener('click', openGraphicsSettings);
    if (closeButton) closeButton.addEventListener('click', closeGraphicsSettings);
    if (doneButton) doneButton.addEventListener('click', closeGraphicsSettings);

    if (overlay) {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeGraphicsSettings();
        });
        overlay.querySelectorAll('[data-graphics-quality]').forEach((button) => {
            button.addEventListener('click', () => setGraphicsQuality(button.dataset.graphicsQuality));
        });
    }

    if (renderScaleSlider) {
        renderScaleSlider.addEventListener('input', () => {
            setRenderScaleOverride(Number(renderScaleSlider.value) / 100);
        });
    }
    if (renderScaleAutoButton) renderScaleAutoButton.addEventListener('click', () => setRenderScaleOverride(null));

    document.addEventListener('keydown', (event) => {
        const settingsOverlay = document.getElementById('graphicsSettingsOverlay');
        if (event.key === 'Escape' && settingsOverlay && !settingsOverlay.classList.contains('hidden')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            closeGraphicsSettings();
        }
    }, true);
}

// Compact short-lived effects in place instead of allocating several new
// arrays with Array.filter() on every simulation tick.
function compactByPositiveField(items, field) {
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < items.length; readIndex += 1) {
        const item = items[readIndex];
        if (item[field] > 0) items[writeIndex++] = item;
    }
    items.length = writeIndex;
}

function compactAsteroidsToViewport() {
    const bounds = typeof getGameWorldBounds === 'function'
        ? getGameWorldBounds()
        : { width: canvas.width, height: canvas.height };
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < asteroids.length; readIndex += 1) {
        const asteroid = asteroids[readIndex];
        if (asteroid.x > -200 && asteroid.x < bounds.width + 200 &&
            asteroid.y > -200 && asteroid.y < bounds.height + 200) {
            asteroids[writeIndex++] = asteroid;
        }
    }
    asteroids.length = writeIndex;
}

// Cap simulation work to one fixed update per rendered frame. Catch-up batches
// made slow machines fall further behind because each missed frame multiplied
// the full entity, collision, and network update cost.
const GAME_FRAME_INTERVAL = 1000 / 60;
let lastGameFrameTimestamp = 0;
let gameFrameNumber = 0;

function optimizedGameLoop(timestamp) {
    requestAnimationFrame(optimizedGameLoop);
    const currentTimestamp = Number.isFinite(timestamp) ? timestamp : performance.now();
    if (lastGameFrameTimestamp === 0) lastGameFrameTimestamp = currentTimestamp - GAME_FRAME_INTERVAL;

    const elapsed = currentTimestamp - lastGameFrameTimestamp;
    if (elapsed + 0.25 < GAME_FRAME_INTERVAL) return;
    lastGameFrameTimestamp = currentTimestamp - (elapsed % GAME_FRAME_INTERVAL);

    if (gameState !== STATE.PLAYING) return;

    gameTime += 1;
    updatePlayers();
    updateEntities();
    checkCollisions();
    spawnWaveLogic();

    const preset = getGraphicsPreset();
    if (gameFrameNumber % preset.hudInterval === 0) updateUI();

    ctx.save();
    if (screenShake > 0) {
        ctx.translate(Math.cos(screenShakeAngle) * screenShake, Math.sin(screenShakeAngle) * screenShake);
    }
    draw();
    ctx.restore();
    gameFrameNumber += 1;
}

function connectGraphicsSettings() {
    document.documentElement.dataset.graphicsQuality = graphicsQuality;
    updateCanvasPixelationMode();
    resizeCanvas();
    connectGraphicsSettingsUI();
    refreshGraphicsSettingsUI();
    initStars();
    initNebula();
    backdropFrame = 0;
    requestAnimationFrame(optimizedGameLoop);
}

connectGraphicsSettings();
