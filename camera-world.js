'use strict';

// Single-player campaigns use a world that is 20% larger than the camera's
// field of view in both dimensions. Two-player and network games retain their
// original viewport-sized, screen-wrapping arena.
const CAMERA_WORLD_SCALE = 1.2;
const CAMERA_FOLLOW_LERP = 0.18;
let cameraX = 0;
let cameraY = 0;
let cameraPointerX = canvas.width / 2;
let cameraPointerY = canvas.height / 2;

function isCameraWorldActive() {
    return gameMode === '1P';
}

function getGameWorldBounds() {
    const scale = isCameraWorldActive() ? CAMERA_WORLD_SCALE : 1;
    return {
        width: Math.max(1, canvas.width * scale),
        height: Math.max(1, canvas.height * scale)
    };
}

function getCameraWorldView() {
    return {
        x: isCameraWorldActive() ? cameraX : 0,
        y: isCameraWorldActive() ? cameraY : 0,
        width: canvas.width,
        height: canvas.height
    };
}

function updateCameraWorld(snap = false) {
    if (!isCameraWorldActive()) {
        cameraX = 0;
        cameraY = 0;
        return;
    }

    const player = players[0];
    if (!player) return;

    const bounds = getGameWorldBounds();
    const maxCameraX = Math.max(0, bounds.width - canvas.width);
    const maxCameraY = Math.max(0, bounds.height - canvas.height);
    const targetX = clamp(player.x - canvas.width / 2, 0, maxCameraX);
    const targetY = clamp(player.y - canvas.height / 2, 0, maxCameraY);

    if (snap) {
        cameraX = targetX;
        cameraY = targetY;
    } else {
        cameraX += (targetX - cameraX) * CAMERA_FOLLOW_LERP;
        cameraY += (targetY - cameraY) * CAMERA_FOLLOW_LERP;
        if (Math.abs(targetX - cameraX) < 0.5) cameraX = targetX;
        if (Math.abs(targetY - cameraY) < 0.5) cameraY = targetY;
    }

    // These clamps are the camera's hard stops at the map edges.
    cameraX = clamp(cameraX, 0, maxCameraX);
    cameraY = clamp(cameraY, 0, maxCameraY);
    mouseX = cameraPointerX + cameraX;
    mouseY = cameraPointerY + cameraY;
}

function constrainPlayerToWorld(player) {
    if (!isCameraWorldActive() || player !== players[0]) return false;

    const bounds = getGameWorldBounds();
    const radius = Math.max(0, Number(player.radius) || 0);
    const minX = Math.min(radius, bounds.width / 2);
    const minY = Math.min(radius, bounds.height / 2);
    const maxX = Math.max(minX, bounds.width - radius);
    const maxY = Math.max(minY, bounds.height - radius);

    player.x = clamp(player.x, minX, maxX);
    player.y = clamp(player.y, minY, maxY);
    if ((player.x <= minX && player.vx < 0) || (player.x >= maxX && player.vx > 0)) player.vx = 0;
    if ((player.y <= minY && player.vy < 0) || (player.y >= maxY && player.vy > 0)) player.vy = 0;

    updateCameraWorld();
    return true;
}

function drawCameraWorldBoundary() {
    if (!isCameraWorldActive()) return;

    const bounds = getGameWorldBounds();
    const viewLeft = cameraX;
    const viewTop = cameraY;
    const viewRight = viewLeft + canvas.width;
    const viewBottom = viewTop + canvas.height;
    const atLeftEdge = viewLeft <= 1;
    const atTopEdge = viewTop <= 1;
    const atRightEdge = viewRight >= bounds.width - 1;
    const atBottomEdge = viewBottom >= bounds.height - 1;

    // Most of the map border is offscreen. Skip its large, blurred rectangle;
    // draw only the short edge segments that can actually be seen.
    if (!atLeftEdge && !atTopEdge && !atRightEdge && !atBottomEdge) return;

    ctx.save();
    ctx.strokeStyle = 'rgba(100, 201, 255, 0.36)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(63, 177, 255, 0.3)';
    ctx.shadowBlur = getGraphicsPreset().laserGlow ? 5 : 0;
    ctx.beginPath();

    if (atLeftEdge) {
        ctx.moveTo(1, Math.max(0, viewTop));
        ctx.lineTo(1, Math.min(bounds.height, viewBottom));
    }
    if (atTopEdge) {
        ctx.moveTo(Math.max(0, viewLeft), 1);
        ctx.lineTo(Math.min(bounds.width, viewRight), 1);
    }
    if (atRightEdge) {
        ctx.moveTo(bounds.width - 1, Math.max(0, viewTop));
        ctx.lineTo(bounds.width - 1, Math.min(bounds.height, viewBottom));
    }
    if (atBottomEdge) {
        ctx.moveTo(Math.max(0, viewLeft), bounds.height - 1);
        ctx.lineTo(Math.min(bounds.width, viewRight), bounds.height - 1);
    }

    ctx.stroke();
    ctx.restore();
}

function translateWorldEntities(dx, dy) {
    const entities = [
        ...players, ...asteroids, ...shards, ...orbs, ...particles,
        ...explosions, ...floatingTexts, ...lasers, ...enemies, ...powerups
    ];
    if (boss) entities.push(boss);

    entities.forEach((entity) => {
        if (!entity) return;
        if (Number.isFinite(entity.x)) entity.x += dx;
        if (Number.isFinite(entity.y)) entity.y += dy;
        if (Number.isFinite(entity.targetX)) entity.targetX += dx;
        if (Number.isFinite(entity.targetY)) entity.targetY += dy;
        if (Number.isFinite(entity.fieldX)) entity.fieldX += dx;
        if (Number.isFinite(entity.fieldY)) entity.fieldY += dy;
        if (Number.isFinite(entity.entryY)) entity.entryY += dy;
        if (Array.isArray(entity.trail)) {
            entity.trail.forEach((point) => {
                point.x += dx;
                point.y += dy;
            });
        }
    });

    const bounds = getGameWorldBounds();
    asteroids.forEach((asteroid) => {
        const radius = Math.max(0, Number(asteroid.radius) || 0);
        asteroid.x = clamp(asteroid.x, radius, Math.max(radius, bounds.width - radius));
        asteroid.y = clamp(asteroid.y, radius, Math.max(radius, bounds.height - radius));
    });
}

function placeGeneratedEntityInWorld(entity) {
    const bounds = getGameWorldBounds();
    const radius = Math.max(0, Number(entity.radius) || 0);
    const minX = Math.min(radius, bounds.width / 2);
    const minY = Math.min(radius, bounds.height / 2);
    entity.x = clamp(entity.x + cameraX, minX, Math.max(minX, bounds.width - radius));
    entity.y = clamp(entity.y + cameraY, minY, Math.max(minY, bounds.height - radius));
}

// Existing random spawners choose coordinates relative to the visible canvas.
// Shift only those new objects into world space; split asteroids and collected
// drops already receive world coordinates and must not be shifted again.
const CAMERA_LEGACY_SPAWN_ASTEROID = window.spawnAsteroid;
if (typeof CAMERA_LEGACY_SPAWN_ASTEROID === 'function') {
    window.spawnAsteroid = function (x, y, radius) {
        const randomViewportSpawn = x === undefined && y === undefined;
        const firstNewAsteroid = asteroids.length;
        const result = CAMERA_LEGACY_SPAWN_ASTEROID.apply(this, arguments);
        if (isCameraWorldActive() && randomViewportSpawn) {
            for (let index = firstNewAsteroid; index < asteroids.length; index += 1) {
                placeGeneratedEntityInWorld(asteroids[index]);
            }
        }
        return result;
    };
}

const CAMERA_LEGACY_SPAWN_ORB = window.spawnOrb;
if (typeof CAMERA_LEGACY_SPAWN_ORB === 'function') {
    window.spawnOrb = function (x, y) {
        const randomViewportSpawn = x === undefined && y === undefined;
        const firstNewOrb = orbs.length;
        const result = CAMERA_LEGACY_SPAWN_ORB.apply(this, arguments);
        if (isCameraWorldActive() && randomViewportSpawn) {
            for (let index = firstNewOrb; index < orbs.length; index += 1) {
                placeGeneratedEntityInWorld(orbs[index]);
            }
        }
        return result;
    };
}

const CAMERA_LEGACY_START_GAME = window.startGame;
if (typeof CAMERA_LEGACY_START_GAME === 'function') {
    window.startGame = function () {
        const useCameraWorld = isCameraWorldActive();
        // Reset the offsets before resetGame's random spawners run. Afterward,
        // shift the run into the center of the larger world without changing
        // the initial composition visible to the player.
        cameraX = 0;
        cameraY = 0;
        const result = CAMERA_LEGACY_START_GAME.apply(this, arguments);

        if (useCameraWorld) {
            const bounds = getGameWorldBounds();
            const offsetX = Math.max(0, (bounds.width - canvas.width) / 2);
            const offsetY = Math.max(0, (bounds.height - canvas.height) / 2);
            translateWorldEntities(offsetX, offsetY);
            cameraX = offsetX;
            cameraY = offsetY;
            updateCameraWorld(true);
        } else {
            cameraX = 0;
            cameraY = 0;
        }
        return result;
    };
}

window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    cameraPointerX = clamp(event.clientX - rect.left, 0, canvas.width);
    cameraPointerY = clamp(event.clientY - rect.top, 0, canvas.height);
    if (isCameraWorldActive()) {
        mouseX = cameraPointerX + cameraX;
        mouseY = cameraPointerY + cameraY;
    }
});

window.addEventListener('resize', () => {
    cameraPointerX = clamp(cameraPointerX, 0, canvas.width);
    cameraPointerY = clamp(cameraPointerY, 0, canvas.height);
    if (!isCameraWorldActive()) {
        cameraX = 0;
        cameraY = 0;
        return;
    }
    constrainPlayerToWorld(players[0]);
    updateCameraWorld(true);
});
