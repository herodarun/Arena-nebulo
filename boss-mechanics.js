'use strict';

// Bosses rotate every five waves. Each encounter also raises their stats and
// shortens their attack breaks, so a familiar boss is tougher when it returns.
const BOSS_ARCHETYPES = Object.freeze({
    bulwark: Object.freeze({
        label: 'СТРАЖ-ПАНЦИРЬ',
        main: '#ff8052',
        light: '#ffe0a1',
        dark: '#421b3e',
        lowMain: '#b66c4e',
        lowLight: '#e0bd8c',
        lowDark: '#392638'
    }),
    hunter: Object.freeze({
        label: 'ПЕРЕХВАТЧИК',
        main: '#43dfff',
        light: '#d8fbff',
        dark: '#103b68',
        lowMain: '#558fa0',
        lowLight: '#b7d1d4',
        lowDark: '#1e3850'
    }),
    singularity: Object.freeze({
        label: 'СИНГУЛЯРНОСТЬ',
        main: '#c27aff',
        light: '#f1d6ff',
        dark: '#251047',
        lowMain: '#856b9f',
        lowLight: '#c5b6cf',
        lowDark: '#261f31'
    })
});

const BOSS_SEQUENCE = Object.freeze(['bulwark', 'hunter', 'singularity']);
const BOSS_PROJECTILE_SPEED_MULTIPLIER = 4;

function getBossArenaBounds() {
    return typeof getGameWorldBounds === 'function'
        ? getGameWorldBounds()
        : { width: canvas.width, height: canvas.height };
}

function getBossTarget() {
    let target = null;
    let nearestDistance = Infinity;

    players.forEach((player) => {
        if (!player.active || player.downed) return;
        const distance = boss ? dist(player, boss) : 0;
        if (distance < nearestDistance) {
            nearestDistance = distance;
            target = player;
        }
    });

    return target || players[0];
}

function setBossAction(action, duration) {
    if (!boss) return;
    boss.action = action;
    boss.actionTimer = duration;
    boss.actionDuration = duration;
}

function bossAttackCooldown(baseFrames) {
    const tier = boss ? boss.tier || 1 : 1;
    return Math.max(58, baseFrames - (tier - 1) * 7);
}

function countBossHazards() {
    let count = 0;
    enemies.forEach((enemy) => {
        if (enemy.bossHazard) count += 1;
    });
    return count;
}

function spawnBossHazard(type, x, y, angle, speed, radius, life) {
    if (countBossHazards() >= 14) return null;

    const vx = Math.cos(angle || 0) * (speed || 0);
    const vy = Math.sin(angle || 0) * (speed || 0);
    const hazard = {
        type,
        bossHazard: true,
        x,
        y,
        vx,
        vy,
        radius,
        hp: 1,
        angle: angle || 0,
        phase: rand(0, Math.PI * 2),
        life,
        maxLife: life,
        armTimer: type === 'bossMine' ? 18 : 0
    };
    enemies.push(hazard);
    return hazard;
}

function clearBossHazards() {
    for (let index = enemies.length - 1; index >= 0; index -= 1) {
        if (enemies[index].bossHazard) enemies.splice(index, 1);
    }
}

function updateBossHazards(delta) {
    for (let index = enemies.length - 1; index >= 0; index -= 1) {
        const hazard = enemies[index];
        if (!hazard.bossHazard) continue;

        hazard.life -= delta;
        hazard.phase = (hazard.phase || 0) + 0.12 * delta;
        hazard.armTimer = Math.max(0, (hazard.armTimer || 0) - delta);
        hazard.x += (hazard.vx || 0) * delta;
        hazard.y += (hazard.vy || 0) * delta;

        let consumed = false;
        if (hazard.armTimer <= 0) {
            for (const player of players) {
                if (!player.active || player.downed) continue;
                if (dist(player, hazard) <= player.radius + hazard.radius) {
                    hitPlayer(player);
                    spawnParticles(hazard.x, hazard.y, '#ff9d67', 8, 2.5, 18);
                    consumed = true;
                    break;
                }
            }
        }

        const bounds = getBossArenaBounds();
        const outside = hazard.x < -120 || hazard.x > bounds.width + 120 ||
            hazard.y < -120 || hazard.y > bounds.height + 120;
        if (consumed || hazard.life <= 0 || outside) enemies.splice(index, 1);
    }
}

function spawnBulwarkVolley() {
    const target = getBossTarget();
    if (!target || !boss) return;

    const tier = boss.tier || 1;
    const boltCount = 6;
    const totalSpread = 0.2;
    const speed = (3.7 + Math.min(1.4, tier * 0.17)) * BOSS_PROJECTILE_SPEED_MULTIPLIER;
    const baseAngle = boss.aimAngle;

    for (let index = 0; index < boltCount; index += 1) {
        const offset = boltCount === 1 ? 0 : -totalSpread / 2 + totalSpread * index / (boltCount - 1);
        const angle = baseAngle + offset;
        spawnBossHazard(
            'bossBolt',
            boss.x + Math.cos(angle) * boss.radius * 0.72,
            boss.y + Math.sin(angle) * boss.radius * 0.72,
            angle,
            speed,
            8 + Math.min(2, tier * 0.2),
            240
        );
    }
}

function getHunterDashBoundaryDistance(angle, bounds) {
    if (!boss) return 0;

    const minX = boss.radius;
    const minY = boss.radius;
    const maxX = Math.max(minX, bounds.width - boss.radius);
    const maxY = Math.max(minY, bounds.height - boss.radius);
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    let distance = Infinity;

    if (dx > 1e-6) distance = Math.min(distance, (maxX - boss.x) / dx);
    else if (dx < -1e-6) distance = Math.min(distance, (minX - boss.x) / dx);
    if (dy > 1e-6) distance = Math.min(distance, (maxY - boss.y) / dy);
    else if (dy < -1e-6) distance = Math.min(distance, (minY - boss.y) / dy);

    return Number.isFinite(distance) ? Math.max(0, distance) : 0;
}

function aimHunterAcrossArena(target) {
    const bounds = getBossArenaBounds();
    const targetAngle = Math.atan2(target.y - boss.y, target.x - boss.x);
    const forwardDistance = getHunterDashBoundaryDistance(targetAngle, bounds);
    const reverseAngle = targetAngle + Math.PI;
    const reverseDistance = getHunterDashBoundaryDistance(reverseAngle, bounds);

    if (reverseDistance > forwardDistance) {
        boss.dashAngle = reverseAngle;
        boss.dashDistance = reverseDistance;
    } else {
        boss.dashAngle = targetAngle;
        boss.dashDistance = forwardDistance;
    }
}

function beginBossAttack() {
    if (!boss) return;
    const target = getBossTarget();
    if (!target) return;

    boss.targetX = target.x;
    boss.targetY = target.y;

    if (boss.kind === 'bulwark') {
        boss.aimAngle = Math.atan2(target.y - boss.y, target.x - boss.x);
        setBossAction('barrageTell', Math.max(30, 48 - boss.tier));
    } else if (boss.kind === 'hunter') {
        boss.returnX = boss.x;
        boss.returnY = boss.y;
        aimHunterAcrossArena(target);
        setBossAction('chargeTell', Math.max(28, 43 - boss.tier));
    } else {
        boss.fieldX = target.x;
        boss.fieldY = target.y;
        const bounds = getBossArenaBounds();
        boss.fieldRadius = Math.min(Math.max(bounds.width, bounds.height) * 0.36, 205 + boss.tier * 5);
        setBossAction('gravityTell', Math.max(34, 52 - boss.tier));
    }
}

function finishBossAttack(baseCooldown) {
    if (!boss) return;
    boss.action = 'idle';
    boss.actionTimer = 0;
    boss.attackTimer = bossAttackCooldown(baseCooldown);
}

function updateBulwarkBoss(delta) {
    if (boss.action === 'idle') {
        boss.attackTimer -= delta;
        if (boss.attackTimer <= 0) beginBossAttack();
        return;
    }

    if (boss.action === 'barrageTell') {
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) {
            spawnBulwarkVolley();
            setBossAction('recover', 30);
        }
        return;
    }

    if (boss.action === 'recover') {
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) finishBossAttack(118);
    }
}

function updateHunterBoss(delta) {
    if (boss.action === 'idle') {
        const bounds = getBossArenaBounds();
        const minX = boss.radius + 24;
        const maxX = Math.max(minX, bounds.width - boss.radius - 24);
        boss.x += boss.drift * 1.65 * delta;
        if (boss.x < minX || boss.x > maxX) {
            boss.x = Math.max(minX, Math.min(maxX, boss.x));
            boss.drift *= -1;
        }
        boss.y = boss.entryY + Math.sin(boss.age * 0.022) * 15;
        boss.attackTimer -= delta;
        if (boss.attackTimer <= 0) beginBossAttack();
        return;
    }

    if (boss.action === 'chargeTell') {
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) {
            boss.dashDrops = 0;
            boss.dashDropTimer = 5;
            boss.dashTravelled = 0;
            boss.dashSpeed = 23 + Math.min(8, boss.tier * 0.75);
            const dashFrames = Math.max(1, Math.ceil(boss.dashDistance / boss.dashSpeed) + 1);
            setBossAction('dash', dashFrames);
        }
        return;
    }

    if (boss.action === 'dash') {
        const previousX = boss.x;
        const previousY = boss.y;
        const distanceRemaining = Math.max(0, boss.dashDistance - boss.dashTravelled);
        const moveDistance = Math.min(boss.dashSpeed * delta, distanceRemaining);
        boss.x += Math.cos(boss.dashAngle) * moveDistance;
        boss.y += Math.sin(boss.dashAngle) * moveDistance;
        boss.dashTravelled += moveDistance;
        boss.actionTimer -= delta;
        boss.dashDropTimer -= delta;

        const maxDrops = Math.min(5, 3 + Math.floor((boss.tier - 1) / 2));
        if (boss.dashDropTimer <= 0 && boss.dashDrops < maxDrops) {
            const sideAngle = boss.dashAngle + Math.PI * 0.5;
            const sideSpeed = 9 + Math.min(3, boss.tier * 0.25);
            spawnBossHazard('bossMine', previousX, previousY, sideAngle, sideSpeed, 12, 175);
            spawnBossHazard('bossMine', previousX, previousY, sideAngle + Math.PI, sideSpeed, 12, 175);
            boss.dashDrops += 1;
            boss.dashDropTimer = 6;
        }

        const bounds = getBossArenaBounds();
        const outOfArena = boss.x < boss.radius || boss.x > bounds.width - boss.radius ||
            boss.y < boss.radius || boss.y > bounds.height - boss.radius;
        if (boss.actionTimer <= 0 || boss.dashTravelled >= boss.dashDistance || outOfArena) {
            boss.x = Math.max(boss.radius, Math.min(bounds.width - boss.radius, boss.x));
            boss.y = Math.max(boss.radius, Math.min(bounds.height - boss.radius, boss.y));
            setBossAction('recover', 38);
        }
        return;
    }

    if (boss.action === 'recover') {
        const returnX = Number.isFinite(boss.returnX) ? boss.returnX : boss.x;
        const returnY = Number.isFinite(boss.returnY) ? boss.returnY : boss.entryY;
        const returnStep = Math.min(1, 0.12 * delta);
        boss.x += (returnX - boss.x) * returnStep;
        boss.y += (returnY - boss.y) * returnStep;
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) finishBossAttack(125);
    }
}

function applySingularityPull(delta) {
    const strength = 0.105 + Math.min(0.07, (boss.tier - 1) * 0.008);
    players.forEach((player) => {
        if (!player.active || player.downed) return;
        const dx = boss.fieldX - player.x;
        const dy = boss.fieldY - player.y;
        const distance = Math.hypot(dx, dy);
        if (distance <= 1 || distance >= boss.fieldRadius) return;
        const falloff = 1 - distance / boss.fieldRadius;
        const force = strength * falloff * delta;
        player.vx += dx / distance * force;
        player.vy += dy / distance * force;
    });
}

function updateSingularityBoss(delta) {
    const bounds = getBossArenaBounds();
    boss.x = bounds.width * 0.5 + Math.sin(boss.age * 0.006) * bounds.width * 0.055;
    boss.y = boss.entryY + Math.sin(boss.age * 0.013) * 10;

    if (boss.action === 'idle') {
        boss.attackTimer -= delta;
        if (boss.attackTimer <= 0) beginBossAttack();
        return;
    }

    if (boss.action === 'gravityTell') {
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) setBossAction('gravityPull', 92);
        return;
    }

    if (boss.action === 'gravityPull') {
        applySingularityPull(delta);
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) {
            boss.waveRadius = 0;
            boss.waveSpeed = 6 + Math.min(2, boss.tier * 0.24);
            boss.waveMax = Math.hypot(bounds.width, bounds.height) + 32;
            boss.waveHit1 = false;
            boss.waveHit2 = false;
            setBossAction('shockwave', Math.ceil(boss.waveMax / boss.waveSpeed) + 1);
        }
        return;
    }

    if (boss.action === 'shockwave') {
        const previousRadius = boss.waveRadius;
        boss.waveRadius = Math.min(boss.waveMax, boss.waveRadius + boss.waveSpeed * delta);
        players.forEach((player) => {
            if (!player.active || player.downed) return;
            const hitKey = 'waveHit' + player.id;
            if (boss[hitKey]) return;
            const distance = Math.hypot(player.x - boss.fieldX, player.y - boss.fieldY);
            if (distance >= Math.max(0, previousRadius - player.radius) &&
                distance <= boss.waveRadius + player.radius) {
                hitPlayer(player);
                boss[hitKey] = true;
            }
        });

        if (boss.waveRadius >= boss.waveMax) setBossAction('recover', 36);
        return;
    }

    if (boss.action === 'recover') {
        boss.actionTimer -= delta;
        if (boss.actionTimer <= 0) finishBossAttack(152);
    }
}

function updateBoss(delta = 1) {
    if (!boss) {
        clearBossHazards();
        return;
    }
    if (gameMode === 'NET' && !isNetHost) return;

    const step = Number.isFinite(delta) ? Math.max(0, delta) : 1;
    updateBossHazards(step);
    boss.age += step;
    boss.angle += 0.012 * step;

    if (boss.action === 'enter') {
        boss.y = Math.min(boss.entryY, boss.y + 0.72 * step);
        if (boss.y >= boss.entryY) {
            boss.y = boss.entryY;
            boss.action = 'idle';
            boss.actionTimer = 0;
            boss.attackTimer = 68;
        }
        return;
    }

    if (boss.kind === 'bulwark') {
        const bounds = getBossArenaBounds();
        boss.x = bounds.width * 0.5 + Math.sin(boss.age * 0.009) * bounds.width * 0.055;
        boss.y = boss.entryY + Math.sin(boss.age * 0.012) * 10;
        updateBulwarkBoss(step);
    } else if (boss.kind === 'hunter') {
        updateHunterBoss(step);
    } else {
        updateSingularityBoss(step);
    }
}

function spawnBoss() {
    const tier = Math.max(1, Math.floor((wave - 1) / 5) + 1);
    const kind = BOSS_SEQUENCE[(tier - 1) % BOSS_SEQUENCE.length];
    const archetype = BOSS_ARCHETYPES[kind];
    const hpMultiplier = 1 + (tier - 1) * 0.12;
    const maxHp = Math.round((30 + wave * 5) * hpMultiplier);
    const bounds = getBossArenaBounds();
    const entryY = Math.max(88, bounds.height * 0.16);

    boss = {
        kind,
        name: archetype.label + (tier > 1 ? ' · ' + tier : ''),
        tier,
        x: bounds.width * 0.5,
        y: -100,
        vx: 0,
        vy: 0.72,
        radius: 80,
        hp: maxHp,
        maxHp,
        angle: 0,
        age: 0,
        entryY,
        drift: Math.random() < 0.5 ? -1 : 1,
        attackTimer: 68,
        action: 'enter',
        actionTimer: 0,
        actionDuration: 0,
        targetX: bounds.width * 0.5,
        targetY: bounds.height * 0.5,
        aimAngle: Math.PI / 2,
        dashAngle: Math.PI / 2,
        fieldX: bounds.width * 0.5,
        fieldY: bounds.height * 0.5,
        fieldRadius: 210,
        waveRadius: 0,
        waveMax: 0,
        waveHit1: false,
        waveHit2: false
    };

    sounds.playBossWarning();
    sounds.setMusicMode('boss');
    const display = document.getElementById('bossDisplay');
    if (display) display.classList.remove('hidden');
    const fill = document.getElementById('bossFill');
    if (fill) fill.style.width = '100%';
    const nameLabel = document.getElementById('bossName');
    if (nameLabel) nameLabel.textContent = boss.name;

    pushNetEvent({ type: 'sound', name: 'bossWarning' });
    pushNetEvent({ type: 'musicMode', mode: 'boss' });
}

function drawBossProjectiles() {
    const quality = getGraphicsPreset();
    enemies.forEach((hazard) => {
        if (hazard.type !== 'bossBolt' && hazard.type !== 'bossMine') return;
        ctx.save();
        ctx.translate(hazard.x, hazard.y);
        const pulse = 1 + Math.sin(hazard.phase || gameTime * 0.12) * 0.1;

        if (quality.laserGlow) {
            ctx.shadowBlur = hazard.type === 'bossMine' ? 10 : 12;
            ctx.shadowColor = hazard.type === 'bossMine' ? '#ff514f' : '#ffb34f';
        }

        if (hazard.type === 'bossMine') {
            ctx.beginPath();
            ctx.arc(0, 0, hazard.radius * 1.45 * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = quality.gradientMaterials ? 'rgba(255, 82, 71, 0.62)' : 'rgba(158, 82, 72, 0.54)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, hazard.radius * 0.68, 0, Math.PI * 2);
            ctx.fillStyle = quality.gradientMaterials ? '#ff514f' : '#b65b52';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, hazard.radius * 0.23, 0, Math.PI * 2);
            ctx.fillStyle = quality.gradientMaterials ? '#fff1cc' : '#dfc7aa';
            ctx.fill();
        } else {
            ctx.rotate(Math.atan2(hazard.vy || 0, hazard.vx || 0));
            ctx.beginPath();
            ctx.moveTo(hazard.radius * 1.8, 0);
            ctx.lineTo(0, hazard.radius * 0.68);
            ctx.lineTo(-hazard.radius, 0);
            ctx.lineTo(0, -hazard.radius * 0.68);
            ctx.closePath();
            ctx.fillStyle = quality.gradientMaterials ? '#ffe8a0' : '#cc965c';
            ctx.fill();
            ctx.strokeStyle = quality.gradientMaterials ? '#fff5d5' : '#ead6b8';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();
    });
}

function drawBossTelegraph() {
    if (!boss) return;
    const quality = getGraphicsPreset();
    const bounds = getBossArenaBounds();
    ctx.save();
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 8]);
    const pulse = 0.45 + 0.25 * Math.sin(gameTime * 0.2);

    if (boss.action === 'barrageTell') {
        const boltCount = 6;
        const totalSpread = 0.2;
        const range = Math.hypot(bounds.width, bounds.height);
        ctx.globalAlpha = pulse;
        ctx.strokeStyle = quality.gradientMaterials ? '#ff9f57' : '#b57a58';
        for (let index = 0; index < boltCount; index += 1) {
            const offset = boltCount === 1 ? 0 : -totalSpread / 2 + totalSpread * index / (boltCount - 1);
            const angle = boss.aimAngle + offset;
            ctx.beginPath();
            ctx.moveTo(boss.x, boss.y);
            ctx.lineTo(boss.x + Math.cos(angle) * range, boss.y + Math.sin(angle) * range);
            ctx.stroke();
        }
    } else if (boss.action === 'chargeTell') {
        const range = Math.hypot(bounds.width, bounds.height);
        ctx.globalAlpha = 0.55 + 0.3 * Math.sin(gameTime * 0.35);
        ctx.strokeStyle = quality.gradientMaterials ? '#55eeff' : '#5b9199';
        ctx.beginPath();
        ctx.moveTo(boss.x, boss.y);
        ctx.lineTo(boss.x + Math.cos(boss.dashAngle) * range, boss.y + Math.sin(boss.dashAngle) * range);
        ctx.stroke();
    } else if (boss.action === 'gravityTell' || boss.action === 'gravityPull') {
        const progress = boss.action === 'gravityTell'
            ? 1 - boss.actionTimer / Math.max(1, boss.actionDuration)
            : 1;
        const radius = Math.max(25, boss.fieldRadius * (0.35 + 0.65 * progress));
        ctx.setLineDash([]);
        ctx.globalAlpha = boss.action === 'gravityTell' ? 0.55 + progress * 0.25 : 0.78;
        ctx.strokeStyle = quality.gradientMaterials ? '#d38cff' : '#8e75a0';
        ctx.fillStyle = quality.gradientMaterials ? 'rgba(118, 45, 181, 0.12)' : 'rgba(92, 71, 110, 0.10)';
        ctx.beginPath();
        ctx.arc(boss.fieldX, boss.fieldY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (boss.action === 'shockwave') {
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = quality.gradientMaterials ? '#f0b4ff' : '#b396b4';
        ctx.beginPath();
        ctx.arc(boss.fieldX, boss.fieldY, boss.waveRadius, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
}

function drawBoss() {
    if (!boss) return;
    const quality = getGraphicsPreset();
    const archetype = BOSS_ARCHETYPES[boss.kind] || BOSS_ARCHETYPES.bulwark;
    const colors = quality.gradientMaterials ? archetype : {
        main: archetype.lowMain,
        light: archetype.lowLight,
        dark: archetype.lowDark
    };
    const radius = boss.radius || 80;
    const nameLabel = document.getElementById('bossName');
    const visibleName = boss.name || archetype.label;
    if (nameLabel && nameLabel.textContent !== visibleName) nameLabel.textContent = visibleName;

    ctx.save();
    ctx.translate(boss.x, boss.y);

    if (boss.kind === 'hunter') {
        ctx.rotate(boss.action === 'dash' ? boss.dashAngle : boss.angle);
        ctx.beginPath();
        ctx.moveTo(radius * 1.05, 0);
        ctx.lineTo(-radius * 0.34, -radius * 0.58);
        ctx.lineTo(-radius * 0.12, 0);
        ctx.lineTo(-radius * 0.34, radius * 0.58);
        ctx.closePath();
        const shell = quality.gradientMaterials
            ? ctx.createLinearGradient(-radius, 0, radius, 0)
            : null;
        if (shell) {
            shell.addColorStop(0, colors.dark);
            shell.addColorStop(0.65, colors.main);
            shell.addColorStop(1, colors.light);
        }
        ctx.fillStyle = shell || colors.main;
        ctx.fill();
        ctx.strokeStyle = colors.light;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-radius * 0.2, -radius * 0.4);
        ctx.lineTo(-radius * 0.58, -radius * 0.78);
        ctx.lineTo(-radius * 0.48, -radius * 0.13);
        ctx.moveTo(-radius * 0.2, radius * 0.4);
        ctx.lineTo(-radius * 0.58, radius * 0.78);
        ctx.lineTo(-radius * 0.48, radius * 0.13);
        ctx.strokeStyle = colors.main;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(radius * 0.2, 0, radius * 0.19, 0, Math.PI * 2);
        ctx.fillStyle = colors.light;
        ctx.fill();
    } else if (boss.kind === 'singularity') {
        ctx.rotate(boss.angle * 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.82, 0, Math.PI * 2);
        const shell = quality.gradientMaterials
            ? ctx.createRadialGradient(-radius * 0.2, -radius * 0.2, 1, 0, 0, radius)
            : null;
        if (shell) {
            shell.addColorStop(0, colors.main);
            shell.addColorStop(0.45, colors.dark);
            shell.addColorStop(1, '#090515');
        }
        ctx.fillStyle = shell || colors.dark;
        ctx.fill();
        ctx.strokeStyle = colors.main;
        ctx.lineWidth = 3;
        ctx.stroke();

        if (quality.surfaceDetail) {
            for (let index = 0; index < 3; index += 1) {
                ctx.beginPath();
                ctx.ellipse(0, 0, radius * (0.98 + index * 0.12), radius * (0.38 + index * 0.08), index * Math.PI / 3, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(205, 149, 255, ' + (0.66 - index * 0.14) + ')';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        ctx.beginPath();
        ctx.arc(0, 0, radius * (0.28 + Math.sin(gameTime * 0.12) * 0.025), 0, Math.PI * 2);
        ctx.fillStyle = '#080511';
        ctx.fill();
        ctx.strokeStyle = colors.light;
        ctx.lineWidth = 2;
        ctx.stroke();
    } else {
        ctx.rotate(boss.angle);
        ctx.beginPath();
        for (let index = 0; index < 12; index += 1) {
            const angle = index / 12 * Math.PI * 2;
            const pointRadius = radius * (index % 2 === 0 ? 1 : 0.76);
            const x = Math.cos(angle) * pointRadius;
            const y = Math.sin(angle) * pointRadius;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const armor = quality.gradientMaterials
            ? ctx.createRadialGradient(-radius * 0.28, -radius * 0.35, radius * 0.05, 0, 0, radius * 1.1)
            : null;
        if (armor) {
            armor.addColorStop(0, colors.light);
            armor.addColorStop(0.4, colors.main);
            armor.addColorStop(1, colors.dark);
        }
        ctx.fillStyle = armor || colors.dark;
        ctx.fill();
        ctx.strokeStyle = colors.light;
        ctx.lineWidth = 3;
        ctx.stroke();

        if (quality.surfaceDetail) {
            ctx.beginPath();
            ctx.arc(0, 0, radius * 1.22, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 173, 113, 0.38)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.34, 0, Math.PI * 2);
        ctx.fillStyle = colors.dark;
        ctx.fill();
        ctx.strokeStyle = colors.light;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.restore();
    drawBossTelegraph();
}
