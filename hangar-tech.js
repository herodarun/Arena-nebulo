'use strict';

const HANGAR_TECH_STORAGE_KEY = 'nebulaDriftHangarTechV1';
const HANGAR_ENGINE_BASE_COST = 400;
const HANGAR_ENGINE_COST_GROWTH = 1.035;

const HANGAR_ATTACHMENTS = Object.freeze([
    Object.freeze({
        id: 'standard',
        name: 'Штатный излучатель',
        shortName: 'СТАНДАРТ',
        description: 'Надёжный стандартный комплект оружия без дополнительных модификаторов.',
        effect: 'БЕЗ ДОПОЛНИТЕЛЬНЫХ БОНУСОВ',
        cost: 0
    }),
    Object.freeze({
        id: 'silencer',
        name: 'Шумогаситель «Тихий импульс»',
        shortName: 'ТИХИЙ ИМПУЛЬС',
        description: 'Точная настройка катушки снижает расход энергии оружия на 2%.',
        effect: 'РАСХОД ЭНЕРГИИ ОРУЖИЯ −2%',
        cost: 5000
    }),
    Object.freeze({
        id: 'helix',
        name: 'Спиральный компенсатор «Геликс»',
        shortName: 'ГЕЛИКС',
        description: 'Спиральные направляющие повышают урон лазерных попаданий на 2%.',
        effect: 'УРОН ЛАЗЕРА +2%',
        cost: 5000
    })
]);

const HANGAR_ENGINE_MODULES = Object.freeze([
    Object.freeze({
        id: 'strength',
        stateKey: 'strengthLevel',
        name: 'Сила+',
        description: 'Усиленные силовые катушки повышают скорость корабля.',
        effect: 'СКОРОСТЬ +1% ЗА УРОВЕНЬ'
    }),
    Object.freeze({
        id: 'traction',
        stateKey: 'tractionLevel',
        name: 'Тяга+',
        description: 'Дополнительная тяга повышает максимальную скорость и разгон.',
        effect: 'СКОРОСТЬ +1% ЗА УРОВЕНЬ'
    })
]);

const HANGAR_TECH_NODES = Object.freeze([
    Object.freeze({
        id: 'focusLens', name: 'Фокус-линза', icon: '⌖', cost: 700, wave: 0, row: 1, column: 1,
        prerequisites: [], effect: 'Урон лазерных попаданий +2%.', upgradeRanks: { plasma: 0.02 }
    }),
    Object.freeze({
        id: 'ionBuffer', name: 'Ионный буфер', icon: '◈', cost: 900, wave: 0, row: 1, column: 2,
        prerequisites: [], effect: 'Расход энергии оружия примерно на 2% ниже.', upgradeRanks: { efficiency: 0.1 }
    }),
    Object.freeze({
        id: 'microThrusters', name: 'Микросопла', icon: '➤', cost: 1000, wave: 0, row: 1, column: 4,
        prerequisites: [], effect: 'Скорость корабля +1%.', speedBonusPct: 1
    }),
    Object.freeze({
        id: 'salvageProtocol', name: 'Протокол утилизации', icon: '✧', cost: 1400, wave: 3, row: 2, column: 1,
        prerequisites: ['focusLens'], effect: 'Шанс выпадения сферы выше примерно на 2%.', upgradeRanks: { salvage: 0.25 }
    }),
    Object.freeze({
        id: 'magneticHalo', name: 'Магнитное кольцо', icon: '◎', cost: 1500, wave: 3, row: 2, column: 2,
        prerequisites: ['ionBuffer'], effect: 'Подбор сфер и бонусов с немного большего расстояния.', upgradeRanks: { magnet: 0.17 }
    }),
    Object.freeze({
        id: 'phaseMesh', name: 'Фазовая сетка', icon: '⟡', cost: 1800, wave: 5, row: 2, column: 3,
        prerequisites: ['ionBuffer'], effect: 'Неуязвимость после попадания длится на 2 кадра дольше.', upgradeRanks: { phase: 0.13 }
    }),
    Object.freeze({
        id: 'comboClock', name: 'Синхронизатор комбо', icon: '∞', cost: 2000, wave: 5, row: 2, column: 4,
        prerequisites: ['focusLens'], effect: 'Окно продолжения комбо немного длиннее.', upgradeRanks: { combo: 0.08 }
    }),
    Object.freeze({
        id: 'helixCalibration', name: 'Юстировка «Геликс»', icon: '⟳', cost: 2400, wave: 7, row: 3, column: 1,
        prerequisites: ['focusLens'], requiredAttachment: 'helix', effect: 'Ещё +3% к урону лазерных попаданий.', upgradeRanks: { plasma: 0.03 }
    }),
    Object.freeze({
        id: 'quietReactor', name: 'Тихий реактор', icon: '☼', cost: 2500, wave: 8, row: 3, column: 2,
        prerequisites: ['ionBuffer'], requiredAttachment: 'silencer', effect: 'Карьерный опыт за цели +2%.', upgradeRanks: { reactor: 0.08 }
    }),
    Object.freeze({
        id: 'shieldWeave', name: 'Плетёный щит', icon: '⬡', cost: 2800, wave: 9, row: 3, column: 3,
        prerequisites: ['phaseMesh'], effect: 'Максимум щитов и стартовый запас +1.', extraShields: 1
    }),
    Object.freeze({
        id: 'vectorNozzle', name: 'Векторное сопло', icon: '➤', cost: 3000, wave: 10, row: 3, column: 4,
        prerequisites: ['microThrusters'], effect: 'Скорость корабля +2%.', speedBonusPct: 2
    }),
    Object.freeze({
        id: 'magneticArray', name: 'Магнитный массив', icon: '◎', cost: 3500, wave: 12, row: 4, column: 1,
        prerequisites: ['magneticHalo'], effect: 'Заметно увеличивает радиус сбора сфер.', upgradeRanks: { magnet: 0.25 }
    }),
    Object.freeze({
        id: 'salvageDrone', name: 'Дрон-разборщик', icon: '⌘', cost: 3800, wave: 14, row: 4, column: 2,
        prerequisites: ['salvageProtocol'], effect: 'Шанс выпадения сферы выше примерно на 4%.', upgradeRanks: { salvage: 0.5 }
    }),
    Object.freeze({
        id: 'plasmaChamber', name: 'Плазменная камера', icon: '✦', cost: 4200, wave: 15, row: 4, column: 3,
        prerequisites: ['helixCalibration'], effect: 'Урон лазерных попаданий +4%.', upgradeRanks: { plasma: 0.04 }
    }),
    Object.freeze({
        id: 'doubleCapacitor', name: 'Двухконтурный конденсатор', icon: '◈', cost: 4500, wave: 16, row: 4, column: 4,
        prerequisites: ['quietReactor'], effect: 'Расход энергии оружия примерно на 2% ниже.', upgradeRanks: { efficiency: 0.1 }
    }),
    Object.freeze({
        id: 'reinforcedFrame', name: 'Усиленный каркас', icon: '⬡', cost: 5000, wave: 18, row: 5, column: 1,
        prerequisites: ['shieldWeave'], effect: 'Максимум щитов и стартовый запас +1.', extraShields: 1
    }),
    Object.freeze({
        id: 'overdrive', name: 'Гиперпривод', icon: '⚡', cost: 5600, wave: 20, row: 5, column: 2,
        prerequisites: ['vectorNozzle'], effect: 'Скорость корабля +3%.', speedBonusPct: 3
    }),
    Object.freeze({
        id: 'fieldResearch', name: 'Лаборатория рейдов', icon: '⌬', cost: 6200, wave: 22, row: 5, column: 3,
        prerequisites: ['quietReactor', 'salvageDrone'], effect: 'Карьерный опыт за цели +3%.', upgradeRanks: { reactor: 0.12 }
    }),
    Object.freeze({
        id: 'bossScanner', name: 'Сканер босса', icon: '⌖', cost: 7500, wave: 25, row: 5, column: 4,
        prerequisites: ['plasmaChamber', 'overdrive'], effect: 'Урон лазерных попаданий +6%.', upgradeRanks: { plasma: 0.06 }
    }),
    Object.freeze({
        id: 'singularityKey', name: 'Ключ сингулярности', icon: '✺', cost: 10000, wave: 30, row: 6, column: 2,
        prerequisites: ['bossScanner', 'fieldResearch', 'reinforcedFrame'],
        effect: 'Скорость +3%, урон +4% и карьерный опыт +2%.', speedBonusPct: 3,
        upgradeRanks: { plasma: 0.04, reactor: 0.08 }
    })
]);

function cleanHangarTechState(data = {}) {
    const validAttachmentIds = new Set(HANGAR_ATTACHMENTS.map((attachment) => attachment.id));
    const ownedAttachments = Array.isArray(data.ownedAttachments)
        ? [...new Set(data.ownedAttachments.filter((id) => validAttachmentIds.has(id)))]
        : [];
    if (!ownedAttachments.includes('standard')) ownedAttachments.unshift('standard');

    const purchasedNodes = Array.isArray(data.purchasedNodes)
        ? [...new Set(data.purchasedNodes.filter((id) => HANGAR_TECH_NODES.some((node) => node.id === id)))]
        : [];
    const requestedLoadout = validAttachmentIds.has(data.selectedAttachment) ? data.selectedAttachment : 'standard';
    const selectedAttachment = ownedAttachments.includes(requestedLoadout) ? requestedLoadout : 'standard';

    return {
        ownedAttachments,
        selectedAttachment,
        strengthLevel: Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(Number(data.strengthLevel) || 0))),
        tractionLevel: Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(Number(data.tractionLevel) || 0))),
        purchasedNodes
    };
}

function readHangarTechState() {
    try {
        const raw = localStorage.getItem(HANGAR_TECH_STORAGE_KEY);
        return cleanHangarTechState(raw ? JSON.parse(raw) : {});
    } catch (error) {
        return cleanHangarTechState();
    }
}

let hangarTechState = readHangarTechState();
let hangarSelectedGroup = 'weapon';
const hangarSelectedModuleIndex = { weapon: 0, engine: 0 };
let hangarTechBonusCache = createHangarTechBonusCache();
let hangarTechPreviousFocus = null;

function createHangarTechBonusCache() {
    const cache = {
        upgradeRanks: Object.create(null),
        speedBonusPct: 0,
        extraShields: 0,
        shotCostMultiplier: 1
    };

    HANGAR_TECH_NODES.forEach((node) => {
        if (!hangarTechState || !hangarTechState.purchasedNodes.includes(node.id)) return;
        Object.entries(node.upgradeRanks || {}).forEach(([id, amount]) => {
            cache.upgradeRanks[id] = (cache.upgradeRanks[id] || 0) + amount;
        });
        cache.speedBonusPct += node.speedBonusPct || 0;
        cache.extraShields += node.extraShields || 0;
    });

    if (hangarTechState && hangarTechState.selectedAttachment === 'helix') {
        cache.upgradeRanks.plasma = (cache.upgradeRanks.plasma || 0) + 0.02;
    } else if (hangarTechState && hangarTechState.selectedAttachment === 'silencer') {
        cache.shotCostMultiplier *= 0.98;
    }
    return cache;
}

function refreshHangarTechBonusCache() {
    hangarTechBonusCache = createHangarTechBonusCache();
}

function getHangarUpgradeRank(id) {
    if (typeof gameMode !== 'undefined' && gameMode === 'NET') return 0;
    const bonus = hangarTechBonusCache.upgradeRanks[id] || 0;
    if (id === 'plasma') {
        const runRank = typeof upgradeLevels !== 'undefined' ? upgradeLevels.plasma || 0 : 0;
        return bonus * (1 + runRank);
    }
    return bonus;
}

function getHangarShotCostMultiplier() {
    if (typeof gameMode !== 'undefined' && gameMode === 'NET') return 1;
    return hangarTechBonusCache.shotCostMultiplier;
}

function getHangarCareerExperience() {
    return typeof campaignCareerExperience === 'number' ? campaignCareerExperience : 0;
}

function saveHangarTechState() {
    try {
        localStorage.setItem(HANGAR_TECH_STORAGE_KEY, JSON.stringify(hangarTechState));
    } catch (error) {
        setHangarEquipmentStatus('Не удалось сохранить ангар в браузере. Покупка действует только до закрытия страницы.');
    }
}

function persistCareerExperienceAfterPurchase() {
    if (typeof persistCampaignRecords === 'function') persistCampaignRecords();
    if (typeof refreshCampaignShop === 'function') refreshCampaignShop();
    refreshHangarTechBalance();
}

function spendHangarCareerExperience(cost) {
    const price = Math.max(0, Math.ceil(Number(cost) || 0));
    if (getHangarCareerExperience() < price) return false;
    campaignCareerExperience -= price;
    persistCareerExperienceAfterPurchase();
    return true;
}

function setHangarEquipmentStatus(message) {
    const status = document.getElementById('hangarEquipmentStatus');
    if (status) status.textContent = message;
}

function formatHangarNumber(value) {
    return typeof formatCampaignNumber === 'function'
        ? formatCampaignNumber(value)
        : new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.floor(value || 0)));
}

function getHangarEngineUpgradeCost(level) {
    return Math.ceil(HANGAR_ENGINE_BASE_COST * Math.pow(HANGAR_ENGINE_COST_GROWTH, Math.max(0, level)));
}

function getHangarCurrentModules() {
    return hangarSelectedGroup === 'engine' ? HANGAR_ENGINE_MODULES : HANGAR_ATTACHMENTS;
}

function setHangarGroup(group) {
    if (group !== 'weapon' && group !== 'engine') return;
    hangarSelectedGroup = group;
    hangarSelectedModuleIndex[group] = Math.min(hangarSelectedModuleIndex[group], getHangarCurrentModules().length - 1);
    const consolePanel = document.getElementById('hangarEquipmentConsole');
    if (consolePanel) consolePanel.dataset.activeGroup = group;

    document.querySelectorAll('[data-hangar-group]').forEach((button) => {
        const selected = button.dataset.hangarGroup === group;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-selected', String(selected));
    });
    const panel = document.getElementById('hangarModulePanel');
    if (panel) panel.setAttribute('aria-labelledby', group === 'weapon' ? 'hangarWeaponGroup' : 'hangarEngineGroup');
    setHangarEquipmentStatus(group === 'weapon'
        ? 'Постоянная покупка. В полёте активна только одна насадка.'
        : 'Уровни двигателей сохраняются навсегда; цена растёт на 3,5% за уровень.');
    renderHangarEquipmentPanel();
}

function rotateHangarGroup(direction) {
    setHangarGroup(direction > 0
        ? (hangarSelectedGroup === 'weapon' ? 'engine' : 'weapon')
        : (hangarSelectedGroup === 'engine' ? 'weapon' : 'engine'));
}

function rotateHangarModule(direction) {
    const modules = getHangarCurrentModules();
    const index = hangarSelectedModuleIndex[hangarSelectedGroup];
    hangarSelectedModuleIndex[hangarSelectedGroup] = (index + direction + modules.length) % modules.length;
    renderHangarEquipmentPanel();
}

function renderHangarEquipmentPanel() {
    const title = document.getElementById('hangarModuleTitle');
    const description = document.getElementById('hangarModuleDescription');
    const effect = document.getElementById('hangarModuleEffect');
    const action = document.getElementById('hangarModuleAction');
    const position = document.getElementById('hangarModulePosition');
    const groupLabel = document.getElementById('hangarModuleGroupLabel');
    if (!title || !description || !effect || !action || !position || !groupLabel) return;

    const modules = getHangarCurrentModules();
    const index = hangarSelectedModuleIndex[hangarSelectedGroup] % modules.length;
    const module = modules[index];
    position.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(modules.length).padStart(2, '0');
    groupLabel.textContent = hangarSelectedGroup === 'weapon' ? 'ОРУЖИЕ · ОСНАСТКА' : 'ДВИГАТЕЛИ · МОДУЛЬ ' + String(index + 1).padStart(2, '0');
    title.textContent = module.name;
    description.textContent = module.description;
    action.onclick = null;
    action.disabled = false;
    action.className = 'hangar-module-action';

    if (hangarSelectedGroup === 'weapon') {
        const owned = hangarTechState.ownedAttachments.includes(module.id);
        const equipped = hangarTechState.selectedAttachment === module.id;
        effect.textContent = module.effect;
        if (equipped) {
            action.textContent = 'УСТАНОВЛЕНО';
            action.disabled = true;
            action.classList.add('is-equipped');
        } else if (owned) {
            action.textContent = 'ЭКИПИРОВАТЬ';
            action.classList.add('is-owned');
            action.onclick = () => equipHangarAttachment(module.id);
        } else {
            action.textContent = 'КУПИТЬ · ' + formatHangarNumber(module.cost) + ' XP';
            action.classList.add('is-buy');
            action.disabled = getHangarCareerExperience() < module.cost;
            action.onclick = () => purchaseHangarAttachment(module.id);
        }
    } else {
        const level = hangarTechState[module.stateKey];
        const cost = getHangarEngineUpgradeCost(level);
        effect.textContent = 'УРОВЕНЬ ' + level + ' · СУММАРНОЕ УСИЛЕНИЕ ' + level + '%';
        if (level >= Number.MAX_SAFE_INTEGER) {
            action.textContent = 'МАКСИМАЛЬНЫЙ УРОВЕНЬ';
            action.disabled = true;
        } else {
            action.textContent = 'УЛУЧШИТЬ · ' + formatHangarNumber(cost) + ' XP';
            action.classList.add('is-buy');
            action.disabled = getHangarCareerExperience() < cost;
            action.onclick = () => purchaseHangarEngineUpgrade(module.id);
        }
    }
}

function equipHangarAttachment(id) {
    if (!hangarTechState.ownedAttachments.includes(id)) return false;
    hangarTechState.selectedAttachment = id;
    refreshHangarTechBonusCache();
    saveHangarTechState();
    renderHangarEquipmentPanel();
    drawHangarShipPreviewIfAvailable();
    setHangarEquipmentStatus('Установлена насадка «' + HANGAR_ATTACHMENTS.find((item) => item.id === id).shortName + '». Активна только одна насадка.');
    return true;
}

function purchaseHangarAttachment(id) {
    const attachment = HANGAR_ATTACHMENTS.find((item) => item.id === id);
    if (!attachment || attachment.id === 'standard' || hangarTechState.ownedAttachments.includes(id)) return false;
    if (!spendHangarCareerExperience(attachment.cost)) {
        setHangarEquipmentStatus('Недостаточно карьерного XP: нужно ' + formatHangarNumber(attachment.cost) + '.');
        return false;
    }

    hangarTechState.ownedAttachments.push(id);
    hangarTechState.selectedAttachment = id;
    refreshHangarTechBonusCache();
    saveHangarTechState();
    renderHangarEquipmentPanel();
    drawHangarShipPreviewIfAvailable();
    setHangarEquipmentStatus('Насадка «' + attachment.shortName + '» куплена навсегда и установлена.');
    return true;
}

function purchaseHangarEngineUpgrade(id) {
    const module = HANGAR_ENGINE_MODULES.find((item) => item.id === id);
    if (!module) return false;
    const level = hangarTechState[module.stateKey];
    if (level >= Number.MAX_SAFE_INTEGER) return false;
    const cost = getHangarEngineUpgradeCost(level);
    if (!spendHangarCareerExperience(cost)) {
        setHangarEquipmentStatus('Недостаточно карьерного XP: нужно ' + formatHangarNumber(cost) + '.');
        return false;
    }

    hangarTechState[module.stateKey] += 1;
    saveHangarTechState();
    renderHangarEquipmentPanel();
    setHangarEquipmentStatus(module.name + ' установлен · уровень ' + hangarTechState[module.stateKey] + '. Постоянно +1% скорости за уровень.');
    return true;
}

function getHangarTechNode(id) {
    return HANGAR_TECH_NODES.find((node) => node.id === id) || null;
}

function getHangarNodeLockReason(node) {
    if (typeof campaignMaxWave === 'number' && campaignMaxWave < node.wave) {
        return 'Рекорд: волна ' + node.wave;
    }
    const missingNode = node.prerequisites.find((id) => !hangarTechState.purchasedNodes.includes(id));
    if (missingNode) {
        const requiredNode = getHangarTechNode(missingNode);
        return 'Узел: ' + (requiredNode ? requiredNode.name : missingNode);
    }
    if (node.requiredAttachment && !hangarTechState.ownedAttachments.includes(node.requiredAttachment)) {
        const attachment = HANGAR_ATTACHMENTS.find((item) => item.id === node.requiredAttachment);
        return 'Насадка: ' + (attachment ? attachment.shortName : node.requiredAttachment);
    }
    return '';
}

function getHangarTechNodeState(node) {
    if (hangarTechState.purchasedNodes.includes(node.id)) return 'owned';
    return getHangarNodeLockReason(node) ? 'locked' : 'available';
}

function nodeHasAllPurchasedRequirements(node) {
    return node.prerequisites.every((id) => hangarTechState.purchasedNodes.includes(id));
}

function getHangarTechNodePosition(node) {
    const cellWidth = 250;
    const cellHeight = 144;
    return {
        x: cellWidth * (node.column - 0.5),
        y: 66 + cellHeight * (node.row - 1)
    };
}

function renderHangarTechConnections() {
    const svg = document.getElementById('hangarTechConnections');
    if (!svg) return;
    svg.replaceChildren();
    svg.setAttribute('viewBox', '0 0 1000 852');
    svg.setAttribute('preserveAspectRatio', 'none');
    const svgNamespace = 'http://www.w3.org/2000/svg';

    HANGAR_TECH_NODES.forEach((node) => {
        const destination = getHangarTechNodePosition(node);
        node.prerequisites.forEach((prerequisiteId) => {
            const prerequisite = getHangarTechNode(prerequisiteId);
            if (!prerequisite) return;
            const origin = getHangarTechNodePosition(prerequisite);
            const curveY = (origin.y + destination.y) / 2;
            const path = document.createElementNS(svgNamespace, 'path');
            path.setAttribute('d', 'M ' + origin.x + ' ' + origin.y + ' C ' + origin.x + ' ' + curveY + ', ' + destination.x + ' ' + curveY + ', ' + destination.x + ' ' + destination.y);
            const open = hangarTechState.purchasedNodes.includes(prerequisiteId) &&
                (hangarTechState.purchasedNodes.includes(node.id) || nodeHasAllPurchasedRequirements(node));
            path.setAttribute('class', open ? 'hangar-tech-link is-awake' : 'hangar-tech-link');
            svg.appendChild(path);
        });
    });
}

function makeHangarTechNodeButton(node) {
    const state = getHangarTechNodeState(node);
    const lockReason = getHangarNodeLockReason(node);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hangar-tech-node is-' + state;
    button.style.gridRow = String(node.row);
    button.style.gridColumn = String(node.column);
    button.setAttribute('aria-label', node.name + '. ' + node.effect + (lockReason ? '. ' + lockReason : ''));
    button.title = node.name + ' · ' + node.effect;

    const icon = document.createElement('span');
    icon.className = 'hangar-tech-node-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = node.icon;

    const name = document.createElement('strong');
    name.className = 'hangar-tech-node-name';
    name.textContent = node.name;

    const effect = document.createElement('span');
    effect.className = 'hangar-tech-node-effect';
    effect.textContent = node.effect;

    const requirements = document.createElement('span');
    requirements.className = 'hangar-tech-node-requirement';
    if (state === 'owned') requirements.textContent = 'УСТАНОВЛЕНО';
    else if (lockReason) requirements.textContent = lockReason;
    else if (getHangarCareerExperience() < node.cost) requirements.textContent = 'НУЖНО ' + formatHangarNumber(node.cost) + ' XP';
    else requirements.textContent = 'ГОТОВО · ' + formatHangarNumber(node.cost) + ' XP';

    button.append(icon, name, effect, requirements);
    button.disabled = state === 'owned';
    button.addEventListener('click', () => purchaseHangarTechNode(node.id));
    return button;
}

function renderHangarTechTree() {
    const grid = document.getElementById('hangarTechNodeGrid');
    if (!grid) return;
    grid.replaceChildren();
    HANGAR_TECH_NODES.forEach((node) => grid.appendChild(makeHangarTechNodeButton(node)));
    renderHangarTechConnections();
    refreshHangarTechBalance();
}

function refreshHangarTechBalance() {
    const balance = document.getElementById('hangarTechCareerXp');
    if (balance) balance.textContent = formatHangarNumber(getHangarCareerExperience()) + ' XP';
}

function purchaseHangarTechNode(id) {
    const node = getHangarTechNode(id);
    if (!node || hangarTechState.purchasedNodes.includes(id)) return false;

    const lockReason = getHangarNodeLockReason(node);
    if (lockReason) {
        setHangarTechFeedback('ЗАКРЫТО: ' + lockReason + '.');
        return false;
    }
    if (!nodeHasAllPurchasedRequirements(node)) {
        setHangarTechFeedback('Сначала установи предыдущие узлы дерева.');
        return false;
    }
    if (!spendHangarCareerExperience(node.cost)) {
        setHangarTechFeedback('Недостаточно карьерного XP: для узла нужно ' + formatHangarNumber(node.cost) + '.');
        return false;
    }

    hangarTechState.purchasedNodes.push(node.id);
    refreshHangarTechBonusCache();
    saveHangarTechState();
    renderHangarTechTree();
    renderHangarEquipmentPanel();
    setHangarTechFeedback('Узел «' + node.name + '» установлен навсегда.');
    return true;
}

function setHangarTechFeedback(message) {
    const feedback = document.getElementById('hangarTechFeedback');
    if (feedback) feedback.textContent = message;
}

function openHangarTechTree() {
    const overlay = document.getElementById('hangarTechTreeOverlay');
    if (!overlay) return;
    hangarTechPreviousFocus = document.activeElement;
    renderHangarTechTree();
    setHangarTechFeedback('Выбери доступный узел для постоянной установки.');
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    const firstAvailable = overlay.querySelector('.hangar-tech-node.is-available:not(:disabled)') ||
        document.getElementById('closeHangarTechTreeBtn');
    if (firstAvailable) firstAvailable.focus();
}

function closeHangarTechTree() {
    const overlay = document.getElementById('hangarTechTreeOverlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    if (hangarTechPreviousFocus && typeof hangarTechPreviousFocus.focus === 'function') {
        hangarTechPreviousFocus.focus();
    }
}

function drawHangarShipPreviewIfAvailable() {
    if (typeof drawHangarShipPreview === 'function') drawHangarShipPreview();
}

function drawHangarWeaponAttachment(targetContext, attachmentId = hangarTechState.selectedAttachment, accentColor) {
    if (!targetContext || !attachmentId || attachmentId === 'standard') return;
    const reducedGlow = typeof getGraphicsPreset === 'function' && !getGraphicsPreset().laserGlow;
    const accent = accentColor || '#67dfff';
    targetContext.save();
    targetContext.lineJoin = 'round';
    targetContext.lineCap = 'round';
    targetContext.shadowBlur = reducedGlow ? 0 : 5;
    targetContext.shadowColor = attachmentId === 'helix' ? '#62ebff' : accent;

    if (attachmentId === 'silencer') {
        targetContext.beginPath();
        targetContext.moveTo(14, -2.8);
        targetContext.lineTo(23, -2.8);
        targetContext.lineTo(27, -1.8);
        targetContext.lineTo(27, 1.8);
        targetContext.lineTo(23, 2.8);
        targetContext.lineTo(14, 2.8);
        targetContext.closePath();
        targetContext.fillStyle = '#203c4d';
        targetContext.fill();
        targetContext.strokeStyle = reducedGlow ? '#c3d8e3' : '#83efff';
        targetContext.lineWidth = 0.8;
        targetContext.stroke();
        targetContext.beginPath();
        targetContext.ellipse(23.5, 0, 1.7, 2.2, 0, 0, Math.PI * 2);
        targetContext.fillStyle = '#111e2d';
        targetContext.fill();
        targetContext.strokeStyle = '#d7f8ff';
        targetContext.lineWidth = 0.7;
        targetContext.stroke();
        targetContext.fillStyle = '#90f1ff';
        targetContext.fillRect(16, -0.55, 4.5, 1.1);
    } else if (attachmentId === 'helix') {
        targetContext.fillStyle = reducedGlow ? '#557b8a' : '#297e92';
        for (const side of [-1, 1]) {
            targetContext.beginPath();
            targetContext.moveTo(6, side * 2.2);
            targetContext.lineTo(13, side * 4.9);
            targetContext.lineTo(21, side * 3.1);
            targetContext.lineTo(17, side * 1.25);
            targetContext.closePath();
            targetContext.fill();
            targetContext.strokeStyle = reducedGlow ? '#bbd3da' : '#9ff7ff';
            targetContext.lineWidth = 0.85;
            targetContext.stroke();
        }
        targetContext.beginPath();
        targetContext.ellipse(15, 0, 5.6, 2.2, 0, 0, Math.PI * 2);
        targetContext.strokeStyle = reducedGlow ? '#c1d7dd' : '#b7f8ff';
        targetContext.lineWidth = 1.3;
        targetContext.stroke();
        targetContext.beginPath();
        targetContext.moveTo(18, -1.25);
        targetContext.lineTo(22, 0);
        targetContext.lineTo(18, 1.25);
        targetContext.strokeStyle = accent;
        targetContext.lineWidth = 1.4;
        targetContext.stroke();
    }

    targetContext.restore();
}

window.drawHangarWeaponAttachment = drawHangarWeaponAttachment;

const HANGAR_LEGACY_DRAW_PLAYERS = window.drawPlayers;
if (typeof HANGAR_LEGACY_DRAW_PLAYERS === 'function') {
    window.drawPlayers = function () {
        const result = HANGAR_LEGACY_DRAW_PLAYERS.apply(this, arguments);
        if (gameMode === 'NET' || hangarTechState.selectedAttachment === 'standard' || typeof players === 'undefined') return result;

        players.forEach((player) => {
            if (!player.active || player.downed ||
                (player.invincible > 0 && Math.floor(player.invincible / 4) % 2 === 0)) return;
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(player.angle || 0);
            drawHangarWeaponAttachment(ctx, hangarTechState.selectedAttachment, player.secondaryColor || player.color);
            ctx.restore();
        });
        return result;
    };
}

function applyHangarBonusesToRun() {
    if (gameMode === 'NET') return;
    const engineLevels = hangarTechState.strengthLevel + hangarTechState.tractionLevel;
    const speedMultiplier = 1 + (engineLevels + hangarTechBonusCache.speedBonusPct) / 100;
    const shieldBonus = Math.min(10 - maxShields, hangarTechBonusCache.extraShields);

    players.forEach((player) => {
        player.maxSpeed *= speedMultiplier;
        player.boostSpeed *= speedMultiplier;
        player.accel *= speedMultiplier;
    });

    if (shieldBonus > 0) {
        maxShields += shieldBonus;
        shields = Math.min(maxShields, shields + shieldBonus);
    }
    if (typeof updateUI === 'function') updateUI();
}

const HANGAR_LEGACY_START_GAME = window.startGame;
if (typeof HANGAR_LEGACY_START_GAME === 'function') {
    window.startGame = function () {
        const result = HANGAR_LEGACY_START_GAME.apply(this, arguments);
        applyHangarBonusesToRun();
        return result;
    };
}

function wireHangarTechUI() {
    document.querySelectorAll('[data-hangar-group]').forEach((button) => {
        button.addEventListener('click', () => setHangarGroup(button.dataset.hangarGroup));
    });
    document.getElementById('hangarGroupPrev')?.addEventListener('click', () => rotateHangarGroup(-1));
    document.getElementById('hangarGroupNext')?.addEventListener('click', () => rotateHangarGroup(1));
    document.getElementById('hangarModulePrev')?.addEventListener('click', () => rotateHangarModule(-1));
    document.getElementById('hangarModuleNext')?.addEventListener('click', () => rotateHangarModule(1));
    document.getElementById('hangarTechTreeBtn')?.addEventListener('click', openHangarTechTree);
    document.getElementById('closeHangarTechTreeBtn')?.addEventListener('click', closeHangarTechTree);
    document.getElementById('hangarTechDoneBtn')?.addEventListener('click', closeHangarTechTree);
    document.getElementById('hangarTechTreeOverlay')?.addEventListener('click', (event) => {
        if (event.target.id === 'hangarTechTreeOverlay') closeHangarTechTree();
    });
    document.addEventListener('keydown', (event) => {
        const overlay = document.getElementById('hangarTechTreeOverlay');
        if (event.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
            event.preventDefault();
            closeHangarTechTree();
        }
    });
    renderHangarEquipmentPanel();
    refreshHangarTechBalance();
}

wireHangarTechUI();
window.getHangarTechSnapshot = () => JSON.parse(JSON.stringify(hangarTechState));
window.getHangarEngineUpgradeCost = getHangarEngineUpgradeCost;
window.purchaseHangarAttachment = purchaseHangarAttachment;
window.purchaseHangarEngineUpgrade = purchaseHangarEngineUpgrade;
window.purchaseHangarTechNode = purchaseHangarTechNode;
window.getHangarUpgradeRank = getHangarUpgradeRank;
