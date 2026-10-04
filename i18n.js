'use strict';

// Lightweight runtime localization. Russian remains the source language so the
// game code and its network protocol do not need to change when the UI changes.
(function () {
    const LANGUAGE_STORAGE_KEY = 'nebulaDriftLanguage';
    const LOCALE_TAGS = Object.freeze({ ru: 'ru-RU', en: 'en-US', de: 'de-DE', es: 'es-ES', uk: 'uk-UA' });
    const supportedLanguages = new Set(Object.keys(LOCALE_TAGS));

    // [Russian source, English, German, Spanish, Ukrainian]
    const messages = [
        ['Nebula Drift — Космическая Аркада', 'Nebula Drift — Space Arcade', 'Nebula Drift — Weltraum-Arcade', 'Nebula Drift — Arcade espacial', 'Nebula Drift — Космічна аркада'],
        ['Nebula Drift — космическая аркада с онлайн мультиплеером для любых провайдеров и серых IP.', 'Nebula Drift — a space arcade with online multiplayer for all providers and CGNAT connections.', 'Nebula Drift — eine Weltraum-Arcade mit Online-Mehrspieler für alle Anbieter und CGNAT-Verbindungen.', 'Nebula Drift — un arcade espacial con multijugador en línea compatible con cualquier proveedor y conexión CGNAT.', 'Nebula Drift — космічна аркада з онлайн-мультиплеєром для будь-яких провайдерів і CGNAT-підключень.'],
        ['Переподключение...', 'Reconnecting...', 'Verbindung wird wiederhergestellt...', 'Reconectando...', 'Перепідключення...'],
        ['Пронесись сквозь космос с другом в онлайне', 'Race through space with a friend online', 'Rase mit einem Freund online durchs All', 'Surca el espacio con un amigo en línea', 'Мчи крізь космос разом із другом онлайн'],
        ['👤 1 ИГРОК', '👤 1 PLAYER', '👤 1 SPIELER', '👤 1 JUGADOR', '👤 1 ГРАВЕЦЬ'],
        ['👥 2 ИГРОКА (1 ПК)', '👥 2 PLAYERS (1 PC)', '👥 2 SPIELER (1 PC)', '👥 2 JUGADORES (1 PC)', '👥 2 ГРАВЦІ (1 ПК)'],
        ['🌐 ОНЛАЙН МУЛЬТИПЛЕЕР', '🌐 ONLINE MULTIPLAYER', '🌐 ONLINE-MULTIPLAYER', '🌐 MULTIJUGADOR EN LÍNEA', '🌐 МЕРЕЖЕВА ГРА'],
        ['НАСТРОЙКИ ГРАФИКИ', 'GRAPHICS SETTINGS', 'GRAFIK-EINSTELLUNGEN', 'AJUSTES GRÁFICOS', 'НАЛАШТУВАННЯ ГРАФІКИ'],
        ['ЯЗЫК', 'LANGUAGE', 'SPRACHE', 'IDIOMA', 'МОВА'],
        ['Язык интерфейса', 'Interface language', 'Sprache der Benutzeroberfläche', 'Idioma de la interfaz', 'Мова інтерфейсу'],
        ['🔴 Выберите способ подключения', '🔴 Choose a connection method', '🔴 Verbindungsmethode auswählen', '🔴 Elige un método de conexión', '🔴 Оберіть спосіб підключення'],
        ['⚡ P2P Прямое (Рекомендуется)', '⚡ Direct P2P (Recommended)', '⚡ Direktes P2P (Empfohlen)', '⚡ P2P directo (Recomendado)', '⚡ Пряме P2P (Рекомендовано)'],
        ['☁️ Cloud WSS (Серые IP / fallback)', '☁️ Cloud WSS (CGNAT / fallback)', '☁️ Cloud WSS (CGNAT / Fallback)', '☁️ Cloud WSS (CGNAT / alternativa)', '☁️ Cloud WSS (CGNAT / резерв)'],
        ['🖥️ Локальный WS (Radmin)', '🖥️ Local WS (Radmin)', '🖥️ Lokales WS (Radmin)', '🖥️ WS local (Radmin)', '🖥️ Локальний WS (Radmin)'],
        ['СОЗДАТЬ КОМНАТУ (ХОСТ)', 'CREATE ROOM (HOST)', 'RAUM ERSTELLEN (HOST)', 'CREAR SALA (ANFITRIÓN)', 'СТВОРИТИ КІМНАТУ (ХОСТ)'],
        ['СФОРМИРОВАТЬ КОД', 'GENERATE CODE', 'CODE ERSTELLEN', 'GENERAR CÓDIGO', 'СТВОРИТИ КОД'],
        ['Код комнаты:', 'Room code:', 'Raumcode:', 'Código de sala:', 'Код кімнати:'],
        ['Код:', 'Code:', 'Code:', 'Código:', 'Код:'],
        ['📋 Копировать', '📋 Copy', '📋 Kopieren', '📋 Copiar', '📋 Копіювати'],
        ['ИЛИ', 'OR', 'ODER', 'O', 'АБО'],
        ['ПРИСОЕДИНИТЬСЯ К ХОСТУ', 'JOIN HOST', 'HOST BEITRETEN', 'UNIRSE AL ANFITRIÓN', 'ПРИЄДНАТИСЯ ДО ХОСТА'],
        ['Код комнаты (напр. ND-8291)', 'Room code (e.g. ND-8291)', 'Raumcode (z. B. ND-8291)', 'Código de sala (p. ej., ND-8291)', 'Код кімнати (напр. ND-8291)'],
        ['ПОДКЛЮЧИТЬСЯ', 'CONNECT', 'VERBINDEN', 'CONECTAR', 'ПІДКЛЮЧИТИСЯ'],
        ['⚡ Прямое P2P через WebRTC — минимальный пинг 10–50ms. Если не работает (корпоративный NAT/VPN) — используй Cloud WSS ☁️', '⚡ Direct P2P via WebRTC — low latency, typically 10–50 ms. If it fails behind a corporate NAT or VPN, try Cloud WSS ☁️', '⚡ Direktes P2P über WebRTC — geringe Latenz, meist 10–50 ms. Falls es hinter Firmen-NAT oder VPN nicht klappt, nutze Cloud WSS ☁️', '⚡ P2P directo mediante WebRTC — baja latencia, normalmente 10–50 ms. Si falla tras un NAT corporativo o VPN, prueba Cloud WSS ☁️', '⚡ Пряме P2P через WebRTC — низька затримка, зазвичай 10–50 мс. Якщо не працює за корпоративним NAT або VPN, спробуйте Cloud WSS ☁️'],
        ['СФОРМИРОВАТЬ КОД КОМНАТЫ', 'GENERATE ROOM CODE', 'RAUMCODE ERSTELLEN', 'GENERAR CÓDIGO DE SALA', 'СТВОРИТИ КОД КІМНАТИ'],
        ['☁️ Cloud WSS через MQTT — работает за любым NAT и серыми IP. Пинг выше (~100–300ms), но надёжно.', '☁️ Cloud WSS over MQTT works behind any NAT, including CGNAT. Latency is higher (~100–300 ms), but the connection is reliable.', '☁️ Cloud WSS über MQTT funktioniert hinter jedem NAT, auch CGNAT. Die Latenz ist höher (~100–300 ms), dafür ist die Verbindung zuverlässig.', '☁️ Cloud WSS mediante MQTT funciona tras cualquier NAT, incluido CGNAT. La latencia es mayor (~100–300 ms), pero la conexión es fiable.', '☁️ Cloud WSS через MQTT працює за будь-яким NAT, зокрема CGNAT. Затримка вища (~100–300 мс), зате з’єднання надійне.'],
        ['IP (авто)', 'IP (auto)', 'IP (auto)', 'IP (auto)', 'IP (авто)'],
        ['СОЗДАТЬ КОМНАТУ', 'CREATE ROOM', 'RAUM ERSTELLEN', 'CREAR SALA', 'СТВОРИТИ КІМНАТУ'],
        ['Друг подключается к:', 'Your friend connects to:', 'Dein Freund verbindet sich mit:', 'Tu amigo se conecta a:', 'Друг підключається до:'],
        ['IP хоста (26.x.x.x)', 'Host IP (26.x.x.x)', 'Host-IP (26.x.x.x)', 'IP del anfitrión (26.x.x.x)', 'IP хоста (26.x.x.x)'],
        ['Код комнаты (ND-XXXX)', 'Room code (ND-XXXX)', 'Raumcode (ND-XXXX)', 'Código de sala (ND-XXXX)', 'Код кімнати (ND-XXXX)'],
        ['🖥️ Локальный WebSocket — нужен', '🖥️ Local WebSocket — requires', '🖥️ Lokaler WebSocket — benötigt', '🖥️ WebSocket local — requiere', '🖥️ Локальний WebSocket — потрібен'],
        ['и Radmin VPN на ПК хоста.', 'and Radmin VPN on the host PC.', 'und Radmin VPN auf dem Host-PC.', 'y Radmin VPN en el PC del anfitrión.', 'і Radmin VPN на ПК хоста.'],
        ['Движение', 'Move', 'Bewegen', 'Moverse', 'Рух'],
        ['ЛКМ / ПРОБЕЛ', 'LMB / SPACE', 'LMT / LEERTASTE', 'Clic izq. / ESPACIO', 'ЛКМ / ПРОБІЛ'],
        ['Огонь', 'Fire', 'Feuer', 'Disparar', 'Вогонь'],
        ['Ускорение', 'Boost', 'Schub', 'Impulso', 'Прискорення'],
        ['ИГРОК 1', 'PLAYER 1', 'SPIELER 1', 'JUGADOR 1', 'ГРАВЕЦЬ 1'],
        ['Руль', 'Steer', 'Steuerung', 'Dirigir', 'Керування'],
        ['ПРОБЕЛ', 'SPACE', 'LEERTASTE', 'ESPACIO', 'ПРОБІЛ'],
        ['Буст', 'Boost', 'Schub', 'Impulso', 'ФОРСАЖ'],
        ['ИГРОК 2', 'PLAYER 2', 'SPIELER 2', 'JUGADOR 2', 'ГРАВЕЦЬ 2'],
        ['ЗАПУСК', 'LAUNCH', 'START', 'INICIO', 'ЗАПУСК'],
        ['ОЧКИ', 'SCORE', 'PUNKTE', 'PUNTOS', 'ОЧКИ'],
        ['КОМБО', 'COMBO', 'KOMBO', 'COMBO', 'КОМБО'],
        ['УНИЧТОЖЕНО', 'DESTROYED', 'ZERSTÖRT', 'DESTRUIDOS', 'ЗНИЩЕНО'],
        ['ВОЛНА', 'WAVE', 'WELLE', 'OLEADA', 'ХВИЛЯ'],
        ['ОБЫЧНАЯ', 'NORMAL', 'NORMAL', 'NORMAL', 'ЗВИЧАЙНА'],
        ['РАЗГОН ВОЛНЫ', 'WAVE CHARGE', 'WELLENLADUNG', 'CARGA DE OLEADA', 'РОЗГІН ХВИЛІ'],
        ['УСИЛЕНИЕ', 'POWER-UP', 'POWER-UP', 'MEJORA', 'ПОСИЛЕННЯ'],
        ['БОСС', 'BOSS', 'BOSS', 'JEFE', 'БОС'],
        ['P1 ЭНЕРГИЯ', 'P1 ENERGY', 'P1-ENERGIE', 'ENERGÍA P1', 'P1 ЕНЕРГІЯ'],
        ['P2 ЭНЕРГИЯ', 'P2 ENERGY', 'P2-ENERGIE', 'ENERGÍA P2', 'P2 ЕНЕРГІЯ'],
        ['ЩИТЫ', 'SHIELDS', 'SCHILDE', 'ESCUDOS', 'ЩИТИ'],
        ['Опыт и уровень', 'Experience and level', 'Erfahrung und Level', 'Experiencia y nivel', 'Досвід і рівень'],
        ['Опыт до следующего уровня', 'Experience to next level', 'Erfahrung bis zum nächsten Level', 'Experiencia hasta el siguiente nivel', 'Досвід до наступного рівня'],
        ['УРОВЕНЬ 1', 'LEVEL 1', 'LEVEL 1', 'NIVEL 1', 'РІВЕНЬ 1'],
        ['МИССИЯ', 'MISSION', 'MISSION', 'MISIÓN', 'МІСІЯ'],
        ['ЗАВЕРШЕНА', 'COMPLETE', 'ABGESCHLOSSEN', 'COMPLETADA', 'ЗАВЕРШЕНА'],
        ['Очки', 'Score', 'Punkte', 'Puntos', 'Очки'],
        ['Волна', 'Wave', 'Welle', 'Oleada', 'Хвиля'],
        ['Макс. комбо', 'Best combo', 'Bestes Combo', 'Mejor combo', 'Найкраще комбо'],
        ['Уничтожено', 'Destroyed', 'Zerstört', 'Destruidos', 'Знищено'],
        ['🏆 Лучший результат', '🏆 Best score', '🏆 Bestpunktzahl', '🏆 Récord', '🏆 Найкращий результат'],
        ['ЕЩЁ РАЗ', 'PLAY AGAIN', 'NOCHMAL SPIELEN', 'JUGAR DE NUEVO', 'ЩЕ РАЗ'],
        ['В МАГАЗИН', 'TO HANGAR', 'ZUM HANGAR', 'AL HANGAR', 'ДО АНГАРА'],
        ['СЕКТОР ЗАЧИЩЕН', 'SECTOR CLEARED', 'SEKTOR GESÄUBERT', 'SECTOR DESPEJADO', 'СЕКТОР ЗАЧИЩЕНО'],
        ['ПРОЙДЕНА', 'CLEARED', 'GESCHAFFT', 'SUPERADA', 'ПРОЙДЕНА'],
        ['ОПЫТ ЗА ВОЛНУ', 'WAVE EXPERIENCE', 'ERFAHRUNG DER WELLE', 'EXPERIENCIA DE OLEADA', 'ДОСВІД ЗА ХВИЛЮ'],
        ['СЛОЖНОСТЬ', 'DIFFICULTY', 'SCHWIERIGKEIT', 'DIFICULTAD', 'СКЛАДНІСТЬ'],
        ['Продолжи забег или вернись в ангар-магазин.', 'Continue your run or return to the hangar.', 'Setze deinen Lauf fort oder kehre zum Hangar zurück.', 'Continúa la partida o vuelve al hangar.', 'Продовж забіг або повернися до ангара.'],
        ['ПРОДОЛЖИТЬ', 'CONTINUE', 'WEITER', 'CONTINUAR', 'ПРОДОВЖИТИ'],
        ['СЛЕДУЮЩИЙ СЕКТОР', 'NEXT SECTOR', 'NÄCHSTER SEKTOR', 'SIGUIENTE SECTOR', 'НАСТУПНИЙ СЕКТОР'],
        ['РУЛЕТКА', 'ROULETTE', 'ROULETTE', 'RULETA', 'РУЛЕТКА'],
        ['СЛОЖНОСТИ', 'DIFFICULTIES', 'SCHWIERIGKEITEN', 'DIFICULTADES', 'РІВНІ СКЛАДНОСТІ'],
        ['ГОТОВИМСЯ', 'PREPARING', 'VORBEREITUNG', 'PREPARANDO', 'ГОТУЄМОСЯ'],
        ['Шансы сложностей', 'Difficulty odds', 'Schwierigkeitschancen', 'Probabilidades de dificultad', 'Шанси складностей'],
        ['ЛЁГКАЯ', 'EASY', 'LEICHT', 'FÁCIL', 'ЛЕГКА'],
        ['СЛОЖНАЯ', 'HARD', 'SCHWER', 'DIFÍCIL', 'СКЛАДНА'],
        ['НЕВОЗМОЖНАЯ', 'IMPOSSIBLE', 'UNMÖGLICH', 'IMPOSIBLE', 'НЕМОЖЛИВА'],
        ['Шансы меняются после каждой пройденной волны независимо от выпавшей сложности.', 'Odds change after every cleared wave, regardless of the difficulty rolled.', 'Die Chancen ändern sich nach jeder abgeschlossenen Welle – unabhängig von der gezogenen Schwierigkeit.', 'Las probabilidades cambian tras cada oleada superada, independientemente de la dificultad obtenida.', 'Шанси змінюються після кожної пройденої хвилі незалежно від отриманої складності.'],
        ['ВЫХОД НА ВОЛНУ', 'DEPLOY TO WAVE', 'ZUR WELLE STARTEN', 'SALIR A LA OLEADA', 'ВИХІД НА ХВИЛЮ'],
        ['АНГАР · ПРОГРЕСС ПИЛОТА', 'HANGAR · PILOT PROGRESS', 'HANGAR · PILOTENFORTSCHRITT', 'HANGAR · PROGRESO DEL PILOTO', 'АНГАР · ПРОГРЕС ПІЛОТА'],
        ['ДАННЫЕ ПИЛОТА', 'PILOT RECORD', 'PILOTENDATEN', 'DATOS DEL PILOTO', 'ДАНІ ПІЛОТА'],
        ['МАКСИМАЛЬНАЯ ВОЛНА', 'BEST WAVE', 'HÖCHSTE WELLE', 'MEJOR OLEADA', 'НАЙВИЩА ХВИЛЯ'],
        ['КАРЬЕРНЫЙ XP', 'CAREER XP', 'KARRIERE-XP', 'XP DE CARRERA', 'КАР’ЄРНИЙ XP'],
        ['Осмотр корабля игрока', 'Player ship inspection', 'Schiffsinspektion', 'Inspección de la nave del jugador', 'Огляд корабля гравця'],
        ['АНГАР · БОРТ 01', 'HANGAR · SHIP 01', 'HANGAR · SCHIFF 01', 'HANGAR · NAVE 01', 'АНГАР · БОРТ 01'],
        ['КОРАБЛЬ ПИЛОТА', 'PILOT SHIP', 'PILOTENSCHIFF', 'NAVE DEL PILOTO', 'КОРАБЕЛЬ ГРАВЦЯ'],
        ['Вращаемый предпросмотр корабля игрока', 'Rotatable player ship preview', 'Drehbare Schiffs-Vorschau', 'Vista previa giratoria de la nave', 'Обертальний попередній перегляд корабля'],
        ['МАСШТАБ ОСМОТРА', 'INSPECTION ZOOM', 'INSPEKTIONSZOOM', 'ZOOM DE INSPECCIÓN', 'МАСШТАБ ОГЛЯДУ'],
        ['Приближение корабля в ангаре', 'Hangar ship zoom', 'Schiffszoom im Hangar', 'Zoom de la nave en el hangar', 'Наближення корабля в ангарі'],
        ['Потяни корабль, чтобы повернуть. Колесо мыши или ползунок — приблизить.', 'Drag the ship to rotate it. Use the mouse wheel or slider to zoom.', 'Ziehe das Schiff zum Drehen. Mausrad oder Regler zum Zoomen verwenden.', 'Arrastra la nave para girarla. Usa la rueda del ratón o el control para acercar.', 'Перетягни корабель, щоб обертати. Коліщатко миші або повзунок — наблизити.'],
        ['Выбор оборудования корабля', 'Ship equipment selection', 'Schiffsausrüstung auswählen', 'Selección de equipo de la nave', 'Вибір обладнання корабля'],
        ['Группы оборудования', 'Equipment groups', 'Ausrüstungsgruppen', 'Grupos de equipo', 'Групи обладнання'],
        ['ОРУЖИЕ', 'WEAPONS', 'WAFFEN', 'ARMAS', 'ЗБРОЯ'],
        ['ДВИГАТЕЛИ', 'ENGINES', 'ANTRIEBE', 'MOTORES', 'ДВИГУНИ'],
        ['Предыдущая группа', 'Previous group', 'Vorherige Gruppe', 'Grupo anterior', 'Попередня група'],
        ['Следующая группа', 'Next group', 'Nächste Gruppe', 'Grupo siguiente', 'Наступна група'],
        ['ОРУЖИЕ · ОСНАСТКА', 'WEAPONS · ATTACHMENTS', 'WAFFEN · AUFSÄTZE', 'ARMAS · ACCESORIOS', 'ЗБРОЯ · НАСАДКИ'],
        ['Прокрутить модули', 'Browse modules', 'Module durchblättern', 'Recorrer módulos', 'Переглянути модулі'],
        ['Предыдущий модуль', 'Previous module', 'Vorheriges Modul', 'Módulo anterior', 'Попередній модуль'],
        ['Следующий модуль', 'Next module', 'Nächstes Modul', 'Módulo siguiente', 'Наступний модуль'],
        ['Штатный излучатель', 'Standard emitter', 'Standard-Emitter', 'Emisor estándar', 'Штатний випромінювач'],
        ['Надёжный стандартный комплект оружия.', 'A dependable standard weapon loadout.', 'Eine zuverlässige Standard-Waffenausstattung.', 'Un equipo de armas estándar y fiable.', 'Надійний стандартний комплект зброї.'],
        ['БЕЗ ДОПОЛНИТЕЛЬНЫХ БОНУСОВ', 'NO ADDITIONAL BONUSES', 'KEINE ZUSATZBONI', 'SIN BONIFICACIONES ADICIONALES', 'БЕЗ ДОДАТКОВИХ БОНУСІВ'],
        ['АКТИВНО', 'ACTIVE', 'AKTIV', 'ACTIVO', 'АКТИВНО'],
        ['Постоянные улучшения действуют в локальной кампании.', 'Permanent upgrades apply in the local campaign.', 'Dauerhafte Verbesserungen gelten in der lokalen Kampagne.', 'Las mejoras permanentes se aplican en la campaña local.', 'Постійні покращення діють у локальній кампанії.'],
        ['МЕЖДУ ЗАБЕГАМИ', 'BETWEEN RUNS', 'ZWISCHEN DEN LÄUFEN', 'ENTRE PARTIDAS', 'МІЖ ЗАБІГАМИ'],
        ['Подготовь корабль к следующему вылету.', 'Prepare your ship for the next sortie.', 'Bereite dein Schiff auf den nächsten Einsatz vor.', 'Prepara la nave para la próxima salida.', 'Підготуй корабель до наступного вильоту.'],
        ['СИСТЕМЫ КОРАБЛЯ ГОТОВЫ', 'SHIP SYSTEMS READY', 'SCHIFFSSYSTEME BEREIT', 'SISTEMAS DE LA NAVE LISTOS', 'СИСТЕМИ КОРАБЛЯ ГОТОВІ'],
        ['ПОСТОЯННАЯ ПРОКАЧКА', 'PERMANENT UPGRADES', 'DAUERHAFTE VERBESSERUNGEN', 'MEJORAS PERMANENTES', 'ПОСТІЙНІ ПОКРАЩЕННЯ'],
        ['ДЕРЕВО ТЕХНОЛОГИЙ', 'TECH TREE', 'TECHNOLOGIEBAUM', 'ÁRBOL TECNOLÓGICO', 'ДЕРЕВО ТЕХНОЛОГІЙ'],
        ['НАЧАТЬ НОВЫЙ ЗАБЕГ', 'START NEW RUN', 'NEUEN LAUF STARTEN', 'EMPEZAR NUEVA PARTIDA', 'ПОЧАТИ НОВИЙ ЗАБІГ'],
        ['VHS-LINK · КАРЬЕРНЫЙ ТЕРМИНАЛ', 'VHS-LINK · CAREER TERMINAL', 'VHS-LINK · KARRIERE-TERMINAL', 'VHS-LINK · TERMINAL DE CARRERA', 'VHS-LINK · КАР’ЄРНИЙ ТЕРМІНАЛ'],
        ['ДОСТУПНО', 'AVAILABLE', 'VERFÜGBAR', 'DISPONIBLE', 'ДОСТУПНО'],
        ['Закрыть дерево технологий', 'Close tech tree', 'Technologiebaum schließen', 'Cerrar árbol tecnológico', 'Закрити дерево технологій'],
        ['20 постоянных узлов. Часть систем требует рекордной волны, предыдущих разработок и купленных насадок.', '20 permanent nodes. Some systems require a wave record, prerequisite research, and purchased attachments.', '20 dauerhafte Knoten. Einige Systeme erfordern einen Wellenrekord, vorherige Forschungen und gekaufte Aufsätze.', '20 nodos permanentes. Algunos sistemas requieren un récord de oleada, investigaciones previas y accesorios comprados.', '20 постійних вузлів. Для деяких систем потрібні рекордна хвиля, попередні розробки та придбані насадки.'],
        ['Прокручиваемое дерево технологий', 'Scrollable tech tree', 'Scrollbarer Technologiebaum', 'Árbol tecnológico desplazable', 'Прокручуване дерево технологій'],
        ['Выбери доступный узел для постоянной установки.', 'Select an available node for permanent installation.', 'Wähle einen verfügbaren Knoten zur dauerhaften Installation.', 'Elige un nodo disponible para instalarlo permanentemente.', 'Вибери доступний вузол для постійного встановлення.'],
        ['ЗАКРЫТЬ ТЕРМИНАЛ', 'CLOSE TERMINAL', 'TERMINAL SCHLIESSEN', 'CERRAR TERMINAL', 'ЗАКРИТИ ТЕРМІНАЛ'],
        ['ПАУЗА', 'PAUSED', 'PAUSE', 'PAUSA', 'ПАУЗА'],
        ['Нажмите ESC чтобы продолжить', 'Press ESC to resume', 'Drücke ESC zum Fortsetzen', 'Pulsa ESC para continuar', 'Натисни ESC, щоб продовжити'],
        ['⚙ НАСТРОЙКИ ГРАФИКИ', '⚙ GRAPHICS SETTINGS', '⚙ GRAFIK-EINSTELLUNGEN', '⚙ AJUSTES GRÁFICOS', '⚙ НАЛАШТУВАННЯ ГРАФІКИ'],
        ['Закрыть настройки', 'Close settings', 'Einstellungen schließen', 'Cerrar ajustes', 'Закрити налаштування'],
        ['СИСТЕМА РЕНДЕРА', 'RENDER SYSTEM', 'RENDER-SYSTEM', 'SISTEMA DE RENDERIZADO', 'СИСТЕМА РЕНДЕРИНГУ'],
        ['Качество управляет эффектами, а ползунок отдельно — разрешением кадра. Настройки можно менять во время паузы.', 'Quality controls visual effects; the slider separately controls frame resolution. Settings can be changed while paused.', 'Die Qualität steuert Effekte, der Regler separat die Auflösung. Einstellungen lassen sich während der Pause ändern.', 'La calidad controla los efectos y el control deslizante, por separado, la resolución. Puedes cambiar los ajustes durante la pausa.', 'Якість керує ефектами, а повзунок окремо — роздільною здатністю кадру. Налаштування можна змінювати під час паузи.'],
        ['Качество графики', 'Graphics quality', 'Grafikqualität', 'Calidad gráfica', 'Якість графіки'],
        ['НИЗКОЕ', 'LOW', 'NIEDRIG', 'BAJA', 'НИЗЬКА'],
        ['Меньше неона и частиц; форма моделей прежняя.', 'Less neon and fewer particles; model silhouettes stay the same.', 'Weniger Neon und Partikel; die Modellformen bleiben unverändert.', 'Menos neón y partículas; las siluetas de los modelos no cambian.', 'Менше неону й частинок; форма моделей не змінюється.'],
        ['СРЕДНЕЕ', 'MEDIUM', 'MITTEL', 'MEDIA', 'СЕРЕДНЯ'],
        ['Стандартная графика игры.', 'Standard game graphics.', 'Standardgrafik des Spiels.', 'Gráficos estándar del juego.', 'Стандартна графіка гри.'],
        ['ВЫСОКОЕ', 'HIGH', 'HOCH', 'ALTA', 'ВИСОКА'],
        ['Больше деталей и частиц.', 'More detail and particles.', 'Mehr Details und Partikel.', 'Más detalles y partículas.', 'Більше деталей і частинок.'],
        ['МАСШТАБ ОТРИСОВКИ', 'RENDER SCALE', 'RENDER-SKALIERUNG', 'ESCALA DE RENDERIZADO', 'МАСШТАБ РЕНДЕРИНГУ'],
        ['50% · ПИКСЕЛЬНЕЕ', '50% · PIXELATED', '50% · PIXELIGER', '50% · MÁS PIXELADO', '50% · ПІКСЕЛЬНІШЕ'],
        ['100% · ЧЁТЧЕ', '100% · SHARPER', '100% · SCHÄRFER', '100% · MÁS NÍTIDO', '100% · ЧІТКІШЕ'],
        ['Меньше — крупнее пиксели и легче рендер; больше — чётче. Масштаб применяется ко всему игровому кадру.', 'Lower means larger pixels and lighter rendering; higher means a sharper image. Scale applies to the entire game frame.', 'Niedriger bedeutet größere Pixel und weniger Renderaufwand, höher ein schärferes Bild. Die Skalierung gilt für das gesamte Spielfeld.', 'Un valor menor produce píxeles más grandes y reduce el renderizado; uno mayor da más nitidez. Se aplica a todo el fotograma del juego.', 'Менше значення — більші пікселі й легший рендеринг; більше — чіткіше зображення. Масштаб застосовується до всього ігрового кадру.'],
        ['Сейчас используется стандартный масштаб 84%', 'Standard scale of 84% is currently in use', 'Der Standardmaßstab von 84% wird derzeit verwendet', 'Ahora se usa la escala estándar del 84%', 'Зараз використовується стандартний масштаб 84%'],
        ['Вернуть стандартный масштаб 84%', 'Restore standard scale of 84%', 'Standardmaßstab von 84% wiederherstellen', 'Restaurar la escala estándar del 84%', 'Повернути стандартний масштаб 84%'],
        ['СТАНДАРТ 84%', 'DEFAULT 84%', 'STANDARD 84%', 'ESTÁNDAR 84%', 'СТАНДАРТ 84%'],
        ['Форма корабля и астероидов не меняется ни в одном режиме.', 'Ship and asteroid shapes stay the same in every mode.', 'Die Formen von Schiff und Asteroiden bleiben in jedem Modus gleich.', 'La forma de la nave y los asteroides no cambia en ningún modo.', 'Форма корабля й астероїдів не змінюється в жодному режимі.'],
        ['Форма корабля и астероидов не меняется.', 'Ship and asteroid shapes stay the same.', 'Die Formen von Schiff und Asteroiden bleiben gleich.', 'La forma de la nave y los asteroides no cambia.', 'Форма корабля й астероїдів не змінюється.'],
        ['Меньше неона и частиц, рендер легче. Силуэты корабля и астероидов не меняются.', 'Less neon and fewer particles for lighter rendering. Ship and asteroid silhouettes stay the same.', 'Weniger Neon und Partikel für leichteres Rendering. Schiff und Asteroiden behalten ihre Silhouette.', 'Menos neón y partículas para aligerar el renderizado. Las siluetas de la nave y los asteroides no cambian.', 'Менше неону й частинок для легшого рендерингу. Силуети корабля й астероїдів не змінюються.'],
        ['Дополнительные детали окружения и эффекты. Модели остаются прежними.', 'Extra environmental detail and effects. Models remain unchanged.', 'Zusätzliche Umgebungsdetails und Effekte. Die Modelle bleiben unverändert.', 'Más detalles del entorno y efectos. Los modelos no cambian.', 'Додаткові деталі оточення й ефекти. Моделі залишаються незмінними.'],
        ['Среднее — стандартный режим. Форма корабля и астероидов не меняется.', 'Medium is the standard mode. Ship and asteroid shapes stay the same.', 'Mittel ist der Standardmodus. Schiff und Asteroiden behalten ihre Form.', 'Media es el modo estándar. La forma de la nave y los asteroides no cambia.', 'Середня — стандартний режим. Форма корабля й астероїдів не змінюється.'],
        ['ГОТОВО', 'DONE', 'FERTIG', 'LISTO', 'ГОТОВО'],
        ['НОВЫЙ УРОВЕНЬ · ВЫБЕРИ ОДНО УСИЛЕНИЕ', 'NEW LEVEL · CHOOSE ONE UPGRADE', 'NEUES LEVEL · WÄHLE EIN UPGRADE', 'NUEVO NIVEL · ELIGE UNA MEJORA', 'НОВИЙ РІВЕНЬ · ОБЕРИ ОДНЕ ПОСИЛЕННЯ'],
        ['СИСТЕМА УЛУЧШЕНИЙ', 'UPGRADE SYSTEM', 'UPGRADE-SYSTEM', 'SISTEMA DE MEJORAS', 'СИСТЕМА ПОКРАЩЕНЬ'],
        ['Выбери одну из трёх карт', 'Choose one of three cards', 'Wähle eine von drei Karten', 'Elige una de tres cartas', 'Обери одну з трьох карток'],
        ['ВЫБРАТЬ КАРТУ →', 'CHOOSE CARD →', 'KARTE WÄHLEN →', 'ELEGIR CARTA →', 'ОБРАТИ КАРТКУ →'],
        ['Игра поставлена на паузу, пока ты выбираешь', 'The game is paused while you choose', 'Das Spiel pausiert, während du auswählst', 'La partida está en pausa mientras eliges', 'Гру призупинено, поки ти обираєш'],
        ['КОМАНДА ЖДЁТ', 'TEAM IS WAITING', 'TEAM WARTET', 'EL EQUIPO ESPERA', 'КОМАНДА ЧЕКАЄ'],
        ['ПИЛОТ ВЫБИРАЕТ УСИЛЕНИЕ', 'PILOT IS CHOOSING AN UPGRADE', 'PILOT WÄHLT EIN UPGRADE', 'EL PILOTO ESTÁ ELIGIENDO UNA MEJORA', 'ПІЛОТ ОБИРАЄ ПОСИЛЕННЯ'],
        ['Игра продолжится сразу после выбора карты.', 'The game will resume as soon as a card is chosen.', 'Das Spiel wird fortgesetzt, sobald eine Karte gewählt wurde.', 'La partida continuará en cuanto se elija una carta.', 'Гра продовжиться одразу після вибору картки.'],

        // Canvas/HUD text and dynamic game labels.
        ['ПУЛЕМЁТ', 'RAPID FIRE', 'SCHNELLFEUER', 'FUEGO RÁPIDO', 'КУЛЕМЕТ'],
        ['МАГНИТ', 'MAGNET', 'MAGNET', 'IMÁN', 'МАГНІТ'],
        ['ЗАМЕДЛЕНИЕ', 'SLOW MOTION', 'ZEITLUPE', 'CÁMARA LENTA', 'СПОВІЛЬНЕННЯ'],
        ['ВЗРЫВ ЩИТА', 'SHIELD BURST', 'SCHILDEXPLOSION', 'EXPLOSIÓN DE ESCUDO', 'ВИБУХ ЩИТА'],
        [' СБИТ! 🆘', ' DOWNED! 🆘', ' AUSGESCHALTET! 🆘', ' ¡DERRIBADO! 🆘', ' ЗБИТО! 🆘'],
        ['ПРИШЁЛ НА ПОМОЩЬ! ❤️', 'HELP HAS ARRIVED! ❤️', 'HILFE IST DA! ❤️', '¡LLEGÓ LA AYUDA! ❤️', 'ДОПОМОГА ВЖЕ ТУТ! ❤️'],
        ['СОПЕРНИК · СИСТЕМ:', 'RIVAL · SYSTEMS:', 'RIVALE · SYSTEME:', 'RIVAL · SISTEMAS:', 'СУПРОТИВНИК · СИСТЕМИ:'],
        ['Перезарядка оружия короче на 2 кадра.', 'Weapon cooldown is 2 frames shorter.', 'Die Waffen-Abklingzeit ist 2 Frames kürzer.', 'La recarga del arma dura 2 fotogramas menos.', 'Перезаряджання зброї коротше на 2 кадри.'],
        ['Каждый лазерный луч наносит на 1 урон больше.', 'Each laser beam deals 1 extra damage.', 'Jeder Laserstrahl verursacht 1 zusätzlichen Schaden.', 'Cada rayo láser inflige 1 punto de daño adicional.', 'Кожен лазерний промінь завдає на 1 шкоду більше.'],
        ['Скорость и ускорение кораблей выше на 8%.', 'Ship speed and acceleration are increased by 8%.', 'Geschwindigkeit und Beschleunigung der Schiffe steigen um 8%.', 'La velocidad y aceleración de las naves aumentan un 8%.', 'Швидкість і прискорення кораблів зростають на 8%.'],
        ['Каждый выстрел тратит на 18% меньше энергии.', 'Each shot uses 18% less energy.', 'Jeder Schuss verbraucht 18% weniger Energie.', 'Cada disparo consume un 18% menos de energía.', 'Кожен постріл витрачає на 18% менше енергії.'],
        ['Максимум щитов и текущий запас увеличиваются на 1.', 'Maximum shields and current shield supply increase by 1.', 'Maximale und aktuelle Schildladung steigen um 1.', 'El máximo y la carga actual de escudos aumentan en 1.', 'Максимум щитів і поточний запас збільшуються на 1.'],
        ['Сферы и бонусы подбираются с большего расстояния.', 'Collect orbs and power-ups from farther away.', 'Sphären und Power-ups werden aus größerer Entfernung eingesammelt.', 'Recoge esferas y potenciadores desde más lejos.', 'Сфери й бонуси підбираються з більшої відстані.'],
        ['Окно для продолжения серии увеличивается на 0,5 сек.', 'The combo window is extended by 0.5 sec.', 'Das Zeitfenster für eine Kombo wird um 0,5 Sek. verlängert.', 'La ventana para mantener el combo aumenta 0,5 s.', 'Вікно для продовження серії збільшується на 0,5 с.'],
        ['За уничтожение целей начисляется на 25% больше опыта.', 'Destroying targets grants 25% more experience.', 'Für zerstörte Ziele gibt es 25% mehr Erfahrung.', 'Destruir objetivos otorga un 25% más de experiencia.', 'За знищення цілей нараховується на 25% більше досвіду.'],
        ['Обломки чаще оставляют энергетические сферы.', 'Wreckage drops energy orbs more often.', 'Trümmer hinterlassen häufiger Energiesphären.', 'Los restos dejan esferas de energía con más frecuencia.', 'Уламки частіше залишають енергетичні сфери.'],
        ['После попадания неуязвимость длится на 15 кадров дольше.', 'Invulnerability after a hit lasts 15 frames longer.', 'Die Unverwundbarkeit nach einem Treffer dauert 15 Frames länger.', 'La invulnerabilidad tras recibir un impacto dura 15 fotogramas más.', 'Невразливість після влучання триває на 15 кадрів довше.'],
        ['Импульсный разгон', 'Impulse Burst', 'Impulsantrieb', 'Impulso acelerado', 'Імпульсний розгін'],
        ['Плазменное ядро', 'Plasma Core', 'Plasmakern', 'Núcleo de plasma', 'Плазмове ядро'],
        ['Гипердвигатель', 'Hyperdrive', 'Hyperantrieb', 'Hiperimpulsor', 'Гіпердвигун'],
        ['Ионный конденсатор', 'Ion Capacitor', 'Ionenkondensator', 'Condensador iónico', 'Іонний конденсатор'],
        ['Дополнительный щит', 'Extra Shield', 'Zusatzschild', 'Escudo adicional', 'Додатковий щит'],
        ['Гравитационный магнит', 'Gravity Magnet', 'Gravitationsmagnet', 'Imán gravitatorio', 'Гравітаційний магніт'],
        ['Стабилизатор комбо', 'Combo Stabilizer', 'Combo-Stabilisator', 'Estabilizador de combo', 'Стабілізатор комбо'],
        ['Опытный реактор', 'Veteran Reactor', 'Erfahrungsreaktor', 'Reactor veterano', 'Досвідчений реактор'],
        ['Протокол утилизации', 'Salvage Protocol', 'Bergungsprotokoll', 'Protocolo de recuperación', 'Протокол утилізації'],
        ['Фазовая броня', 'Phase Armor', 'Phasenpanzerung', 'Armadura de fase', 'Фазова броня'],

        // Hangar attachments, engine upgrades, and permanent tech tree.
        ['СТАНДАРТ', 'STANDARD', 'STANDARD', 'ESTÁNDAR', 'СТАНДАРТ'],
        ['Шумогаситель «Тихий импульс»', 'Quiet Pulse Silencer', 'Schalldämpfer „Leiser Impuls“', 'Silenciador «Pulso silencioso»', 'Глушник «Тихий імпульс»'],
        ['ТИХИЙ ИМПУЛЬС', 'QUIET PULSE', 'LEISER IMPULS', 'PULSO SILENCIOSO', 'ТИХИЙ ІМПУЛЬС'],
        ['Точная настройка катушки снижает расход энергии оружия на 2%.', 'Precision coil tuning reduces weapon energy use by 2%.', 'Die präzise Spuleneinstellung senkt den Energieverbrauch der Waffe um 2%.', 'El ajuste preciso de la bobina reduce un 2% el consumo de energía del arma.', 'Точне налаштування котушки зменшує витрати енергії зброї на 2%.'],
        ['РАСХОД ЭНЕРГИИ ОРУЖИЯ −2%', 'WEAPON ENERGY USE −2%', 'WAFFENENERGIEVERBRAUCH −2%', 'CONSUMO DE ENERGÍA DEL ARMA −2%', 'ВИТРАТИ ЕНЕРГІЇ ЗБРОЇ −2%'],
        ['Спиральный компенсатор «Геликс»', 'Helix Spiral Compensator', 'Helix-Spiralkompensator', 'Compensador espiral «Hélice»', 'Спіральний компенсатор «Гелікс»'],
        ['ГЕЛИКС', 'HELIX', 'HELIX', 'HÉLICE', 'ГЕЛІКС'],
        ['Спиральные направляющие повышают урон лазерных попаданий на 2%.', 'Spiral guides increase laser hit damage by 2%.', 'Spiralführungen erhöhen den Schaden von Lasertreffern um 2%.', 'Las guías en espiral aumentan un 2% el daño de los impactos láser.', 'Спіральні напрямні збільшують шкоду від лазерних влучань на 2%.'],
        ['УРОН ЛАЗЕРА +2%', 'LASER DAMAGE +2%', 'LASERSCHADEN +2%', 'DAÑO LÁSER +2%', 'ШКОДА ЛАЗЕРА +2%'],
        ['Сила+', 'Power+', 'Kraft+', 'Potencia+', 'Сила+'],
        ['Усиленные силовые катушки повышают скорость корабля.', 'Reinforced power coils increase ship speed.', 'Verstärkte Leistungsspulen erhöhen die Schiffsgeschwindigkeit.', 'Las bobinas reforzadas aumentan la velocidad de la nave.', 'Посилені силові котушки збільшують швидкість корабля.'],
        ['СКОРОСТЬ +1% ЗА УРОВЕНЬ', 'SPEED +1% PER LEVEL', 'GESCHWINDIGKEIT +1% PRO STUFE', 'VELOCIDAD +1% POR NIVEL', 'ШВИДКІСТЬ +1% ЗА РІВЕНЬ'],
        ['Тяга+', 'Thrust+', 'Schub+', 'Empuje+', 'Тяга+'],
        ['Дополнительная тяга повышает максимальную скорость и разгон.', 'Extra thrust increases top speed and acceleration.', 'Zusätzlicher Schub erhöht Höchstgeschwindigkeit und Beschleunigung.', 'El empuje adicional aumenta la velocidad máxima y la aceleración.', 'Додаткова тяга збільшує максимальну швидкість і розгін.'],
        ['Фокус-линза', 'Focus Lens', 'Fokuslinse', 'Lente de enfoque', 'Фокус-лінза'],
        ['Урон лазерных попаданий +2%.', 'Laser hit damage +2%.', 'Schaden durch Lasertreffer +2%.', 'Daño de impactos láser +2%.', 'Шкода від лазерних влучань +2%.'],
        ['Ионный буфер', 'Ion Buffer', 'Ionenpuffer', 'Amortiguador iónico', 'Іонний буфер'],
        ['Расход энергии оружия примерно на 2% ниже.', 'Weapon energy use is about 2% lower.', 'Der Energieverbrauch der Waffe ist etwa 2% niedriger.', 'El consumo de energía del arma es aproximadamente un 2% menor.', 'Витрати енергії зброї приблизно на 2% нижчі.'],
        ['Микросопла', 'Microthrusters', 'Mikrodüsen', 'Micropropulsores', 'Мікросопла'],
        ['Скорость корабля +1%.', 'Ship speed +1%.', 'Schiffsgeschwindigkeit +1%.', 'Velocidad de la nave +1%.', 'Швидкість корабля +1%.'],
        ['Шанс выпадения сферы выше примерно на 2%.', 'Orb drop chance is about 2% higher.', 'Die Chance auf eine Energiesphäre ist etwa 2% höher.', 'La probabilidad de obtener una esfera aumenta aproximadamente un 2%.', 'Шанс випадіння сфери приблизно на 2% вищий.'],
        ['Магнитное кольцо', 'Magnetic Halo', 'Magnetischer Ring', 'Aro magnético', 'Магнітне кільце'],
        ['Подбор сфер и бонусов с немного большего расстояния.', 'Collect orbs and power-ups from a slightly greater distance.', 'Sphären und Boni aus etwas größerer Entfernung einsammeln.', 'Recoge esferas y potenciadores desde un poco más lejos.', 'Підбирання сфер і бонусів із трохи більшої відстані.'],
        ['Фазовая сетка', 'Phase Mesh', 'Phasengitter', 'Malla de fase', 'Фазова сітка'],
        ['Неуязвимость после попадания длится на 2 кадра дольше.', 'Invulnerability after a hit lasts 2 frames longer.', 'Die Unverwundbarkeit nach einem Treffer dauert 2 Frames länger.', 'La invulnerabilidad tras un impacto dura 2 fotogramas más.', 'Невразливість після влучання триває на 2 кадри довше.'],
        ['Синхронизатор комбо', 'Combo Synchronizer', 'Combo-Synchronisator', 'Sincronizador de combo', 'Синхронізатор комбо'],
        ['Окно продолжения комбо немного длиннее.', 'The combo continuation window is slightly longer.', 'Das Zeitfenster zum Fortsetzen einer Kombo ist etwas länger.', 'La ventana para continuar el combo es un poco más larga.', 'Вікно продовження комбо трохи довше.'],
        ['Юстировка «Геликс»', 'Helix Calibration', 'Helix-Kalibrierung', 'Ajuste «Hélice»', 'Юстування «Гелікс»'],
        ['Ещё +3% к урону лазерных попаданий.', 'Another +3% laser hit damage.', 'Weitere +3% Schaden durch Lasertreffer.', 'Un +3% adicional al daño de impactos láser.', 'Ще +3% до шкоди від лазерних влучань.'],
        ['Тихий реактор', 'Quiet Reactor', 'Leiser Reaktor', 'Reactor silencioso', 'Тихий реактор'],
        ['Карьерный опыт за цели +2%.', 'Career XP from targets +2%.', 'Karriere-XP für Ziele +2%.', 'XP de carrera por objetivos +2%.', 'Кар’єрний досвід за цілі +2%.'],
        ['Плетёный щит', 'Woven Shield', 'Geflochtener Schild', 'Escudo trenzado', 'Плетений щит'],
        ['Максимум щитов и стартовый запас +1.', 'Maximum shields and starting supply +1.', 'Maximale Schilde und Startvorrat +1.', 'Escudos máximos y reserva inicial +1.', 'Максимум щитів і стартовий запас +1.'],
        ['Векторное сопло', 'Vector Nozzle', 'Vektordüse', 'Tobera vectorial', 'Векторне сопло'],
        ['Скорость корабля +2%.', 'Ship speed +2%.', 'Schiffsgeschwindigkeit +2%.', 'Velocidad de la nave +2%.', 'Швидкість корабля +2%.'],
        ['Магнитный массив', 'Magnetic Array', 'Magnetfeld-Array', 'Matriz magnética', 'Магнітний масив'],
        ['Заметно увеличивает радиус сбора сфер.', 'Noticeably increases orb collection radius.', 'Vergrößert den Sammelradius für Sphären deutlich.', 'Aumenta notablemente el radio de recogida de esferas.', 'Помітно збільшує радіус збирання сфер.'],
        ['Дрон-разборщик', 'Salvage Drone', 'Bergungsdrohne', 'Dron de recuperación', 'Дрон-розбирач'],
        ['Шанс выпадения сферы выше примерно на 4%.', 'Orb drop chance is about 4% higher.', 'Die Chance auf eine Energiesphäre ist etwa 4% höher.', 'La probabilidad de obtener una esfera aumenta aproximadamente un 4%.', 'Шанс випадіння сфери приблизно на 4% вищий.'],
        ['Плазменная камера', 'Plasma Chamber', 'Plasmakammer', 'Cámara de plasma', 'Плазмова камера'],
        ['Урон лазерных попаданий +4%.', 'Laser hit damage +4%.', 'Schaden durch Lasertreffer +4%.', 'Daño de impactos láser +4%.', 'Шкода від лазерних влучань +4%.'],
        ['Двухконтурный конденсатор', 'Dual-Circuit Capacitor', 'Doppelschicht-Kondensator', 'Condensador de doble circuito', 'Двоконтурний конденсатор'],
        ['Усиленный каркас', 'Reinforced Frame', 'Verstärkter Rahmen', 'Armazón reforzado', 'Посилений каркас'],
        ['Гиперпривод', 'Hyperdrive', 'Hyperantrieb', 'Hiperimpulsor', 'Гіперпривід'],
        ['Скорость корабля +3%.', 'Ship speed +3%.', 'Schiffsgeschwindigkeit +3%.', 'Velocidad de la nave +3%.', 'Швидкість корабля +3%.'],
        ['Лаборатория рейдов', 'Raid Lab', 'Raid-Labor', 'Laboratorio de incursiones', 'Лабораторія рейдів'],
        ['Карьерный опыт за цели +3%.', 'Career XP from targets +3%.', 'Karriere-XP für Ziele +3%.', 'XP de carrera por objetivos +3%.', 'Кар’єрний досвід за цілі +3%.'],
        ['Сканер босса', 'Boss Scanner', 'Boss-Scanner', 'Escáner de jefe', 'Сканер боса'],
        ['Урон лазерных попаданий +6%.', 'Laser hit damage +6%.', 'Schaden durch Lasertreffer +6%.', 'Daño de impactos láser +6%.', 'Шкода від лазерних влучань +6%.'],
        ['Ключ сингулярности', 'Singularity Key', 'Singularitätsschlüssel', 'Llave de singularidad', 'Ключ сингулярності'],
        ['Скорость +3%, урон +4% и карьерный опыт +2%.', 'Speed +3%, damage +4%, and career XP +2%.', 'Geschwindigkeit +3%, Schaden +4% und Karriere-XP +2%.', 'Velocidad +3%, daño +4% y XP de carrera +2%.', 'Швидкість +3%, шкода +4% і кар’єрний досвід +2%.'],
        ['Не удалось сохранить ангар в браузере. Покупка действует только до закрытия страницы.', 'Could not save the hangar to browser storage. This purchase lasts only until the page is closed.', 'Der Hangar konnte nicht im Browser gespeichert werden. Dieser Kauf gilt nur bis zum Schließen der Seite.', 'No se pudo guardar el hangar en el navegador. Esta compra solo durará hasta que se cierre la página.', 'Не вдалося зберегти ангар у браузері. Покупка діятиме лише до закриття сторінки.'],
        ['Постоянная покупка. В полёте активна только одна насадка.', 'Permanent purchase. Only one attachment can be active in flight.', 'Dauerhafter Kauf. Im Flug kann nur ein Aufsatz aktiv sein.', 'Compra permanente. Solo se puede activar un accesorio durante el vuelo.', 'Постійна покупка. Під час польоту активна лише одна насадка.'],
        ['Уровни двигателей сохраняются навсегда; цена растёт на 3,5% за уровень.', 'Engine levels are permanent; the price increases by 3.5% per level.', 'Antriebsstufen bleiben dauerhaft; der Preis steigt pro Stufe um 3,5%.', 'Los niveles de motor son permanentes; el precio aumenta un 3,5% por nivel.', 'Рівні двигунів зберігаються назавжди; ціна зростає на 3,5% за рівень.'],
        ['УСТАНОВЛЕНО', 'EQUIPPED', 'AUSGERÜSTET', 'EQUIPADO', 'ВСТАНОВЛЕНО'],
        ['ЭКИПИРОВАТЬ', 'EQUIP', 'AUSRÜSTEN', 'EQUIPAR', 'ЕКІПІРУВАТИ'],
        ['КУПИТЬ', 'BUY', 'KAUFEN', 'COMPRAR', 'КУПИТИ'],
        ['МАКСИМАЛЬНЫЙ УРОВЕНЬ', 'MAX LEVEL', 'MAXIMALE STUFE', 'NIVEL MÁXIMO', 'МАКСИМАЛЬНИЙ РІВЕНЬ'],
        ['УЛУЧШИТЬ', 'UPGRADE', 'VERBESSERN', 'MEJORAR', 'ПОКРАЩИТИ'],
        ['Активна только одна насадка.', 'Only one attachment can be active.', 'Es kann nur ein Aufsatz aktiv sein.', 'Solo puede haber un accesorio activo.', 'Активною може бути лише одна насадка.'],
        ['Недостаточно карьерного XP: нужно', 'Not enough career XP: need', 'Nicht genug Karriere-XP: benötigt', 'XP de carrera insuficiente: se necesitan', 'Недостатньо кар’єрного XP: потрібно'],
        ['куплена навсегда и установлена.', 'purchased permanently and equipped.', 'dauerhaft gekauft und ausgerüstet.', 'comprado permanentemente y equipado.', 'придбано назавжди й встановлено.'],
        ['Постоянно +1% скорости за уровень.', 'Permanent +1% speed per level.', 'Dauerhaft +1% Geschwindigkeit pro Stufe.', '+1% de velocidad permanente por nivel.', 'Постійно +1% швидкості за рівень.'],
        ['Рекорд: волна', 'Record: wave', 'Rekord: Welle', 'Récord: oleada', 'Рекорд: хвиля'],
        ['Узел:', 'Node:', 'Knoten:', 'Nodo:', 'Вузол:'],
        ['Насадка:', 'Attachment:', 'Aufsatz:', 'Accesorio:', 'Насадка:'],
        ['НУЖНО', 'NEED', 'BENÖTIGT', 'NECESARIO', 'ПОТРІБНО'],
        ['ГОТОВО', 'READY', 'BEREIT', 'LISTO', 'ГОТОВО'],
        ['ЗАКРЫТО:', 'LOCKED:', 'GESPERRT:', 'BLOQUEADO:', 'ЗАБЛОКОВАНО:'],
        ['Сначала установи предыдущие узлы дерева.', 'Install the prerequisite tech nodes first.', 'Installiere zuerst die vorausgesetzten Technologieknoten.', 'Instala primero los nodos tecnológicos previos.', 'Спочатку встанови попередні вузли дерева.'],
        ['Недостаточно карьерного XP: для узла нужно', 'Not enough career XP: node cost', 'Nicht genug Karriere-XP: Knoten kostet', 'XP de carrera insuficiente: el nodo cuesta', 'Недостатньо кар’єрного XP: для вузла потрібно'],
        ['установлен навсегда.', 'permanently installed.', 'dauerhaft installiert.', 'instalado permanentemente.', 'встановлено назавжди.'],
        ['20 постоянных узлов.', '20 permanent nodes.', '20 dauerhafte Knoten.', '20 nodos permanentes.', '20 постійних вузлів.'],
        ['Надёжный стандартный комплект оружия без дополнительных модификаторов.', 'A reliable standard weapon loadout with no extra modifications.', 'Eine zuverlässige Standard-Waffenausstattung ohne zusätzliche Modifikationen.', 'Un equipo de armas estándar y fiable, sin modificaciones adicionales.', 'Надійний стандартний комплект зброї без додаткових модифікацій.'],
        ['Шансы следующей рулетки: лёгкая 20%, обычная 50%, сложная 20%, невозможная 10%.', 'Next roulette odds: easy 20%, normal 50%, hard 20%, impossible 10%.', 'Chancen der nächsten Ziehung: leicht 20%, normal 50%, schwer 20%, unmöglich 10%.', 'Probabilidades de la próxima ruleta: fácil 20%, normal 50%, difícil 20%, imposible 10%.', 'Шанси наступної рулетки: легка 20%, звичайна 50%, складна 20%, неможлива 10%.'],
        ['Сила+ установлен', 'Power+ installed', 'Kraft+ installiert', 'Potencia+ instalada', 'Сила+ встановлена'],
        ['Тяга+ установлен', 'Thrust+ installed', 'Schub+ installiert', 'Empuje+ instalado', 'Тяга+ встановлена'],
        ['Качество', 'Quality', 'Qualität', 'Calidad', 'Якість'],
        ['Низкое', 'Low', 'Niedrig', 'Baja', 'Низька'],
        ['Среднее', 'Medium', 'Mittel', 'Media', 'Середня'],
        ['Высокое', 'High', 'Hoch', 'Alta', 'Висока'],
        ['СТАНДАРТНЫЙ МАСШТАБ', 'DEFAULT SCALE', 'STANDARD-SKALIERUNG', 'ESCALA ESTÁNDAR', 'СТАНДАРТНИЙ МАСШТАБ'],
        ['Волна', 'Wave', 'Welle', 'Oleada', 'Хвиля'],
        ['СЕК', 'SEC', 'SEK', 'S', 'С'],
        ['ЦЕЛЕЙ', 'TARGETS', 'ZIELE', 'OBJETIVOS', 'ЦІЛЕЙ'],
        ['КРУТИМСЯ', 'ROLLING', 'DREHT SICH', 'GIRANDO', 'КРУТИМОСЯ'],
        ['Следующая рулетка:', 'Next roulette:', 'Nächste Ziehung:', 'Próxima ruleta:', 'Наступна рулетка:'],
        ['лёгкая', 'easy', 'leicht', 'fácil', 'легка'],
        ['обычная', 'normal', 'normal', 'normal', 'звичайна'],
        ['сложная', 'hard', 'schwer', 'difícil', 'складна'],
        ['невозможная', 'impossible', 'unmöglich', 'imposible', 'неможлива'],
        ['Следующая волна:', 'Next wave:', 'Nächste Welle:', 'Próxima oleada:', 'Наступна хвиля:'],
        ['Вероятность —', 'Chance:', 'Wahrscheinlichkeit:', 'Probabilidad:', 'Імовірність —'],
        ['После завершения волны шансы изменятся снова. Старт через секунду.', 'Odds will change again after the wave. Launching in one second.', 'Nach der Welle ändern sich die Chancen erneut. Start in einer Sekunde.', 'Las probabilidades volverán a cambiar al terminar la oleada. Comienza en un segundo.', 'Після завершення хвилі шанси знову зміняться. Старт за секунду.'],
        ['Систем:', 'Systems:', 'Systeme:', 'Sistemas:', 'Системи:'],

        // Network status text emitted dynamically by the existing game code.
        ['🟢 СОЕДИНЕНИЕ УСТАНОВЛЕНО! P2P прямое ⚡', '🟢 CONNECTION ESTABLISHED! Direct P2P ⚡', '🟢 VERBINDUNG HERGESTELLT! Direktes P2P ⚡', '🟢 ¡CONEXIÓN ESTABLECIDA! P2P directo ⚡', '🟢 З’ЄДНАННЯ ВСТАНОВЛЕНО! Пряме P2P ⚡'],
        ['🟢 Cloud: подключён к комнате', '🟢 Cloud: joined room', '🟢 Cloud: Raum beigetreten', '🟢 Cloud: conectado a la sala', '🟢 Cloud: підключено до кімнати'],
        ['🔴 Введите код комнаты!', '🔴 Enter a room code!', '🔴 Raumcode eingeben!', '🔴 ¡Introduce el código de sala!', '🔴 Введіть код кімнати!'],
        ['🟡 Подключение к Cloud WSS...', '🟡 Connecting to Cloud WSS...', '🟡 Verbindung zu Cloud WSS wird hergestellt...', '🟡 Conectando a Cloud WSS...', '🟡 Підключення до Cloud WSS...'],
        ['🔴 Хост не отвечает. Проверь код или попробуй Cloud WSS ☁️', '🔴 Host is not responding. Check the code or try Cloud WSS ☁️', '🔴 Host antwortet nicht. Prüfe den Code oder versuche Cloud WSS ☁️', '🔴 El anfitrión no responde. Comprueba el código o prueba Cloud WSS ☁️', '🔴 Хост не відповідає. Перевірте код або спробуйте Cloud WSS ☁️'],
        ['🔴 Игрок отключился', '🔴 Player disconnected', '🔴 Spieler getrennt', '🔴 Jugador desconectado', '🔴 Гравець від’єднався'],
        ['🟢 Игрок 2 подключился!', '🟢 Player 2 connected!', '🟢 Spieler 2 verbunden!', '🟢 ¡Jugador 2 conectado!', '🟢 Гравець 2 підключився!'],
        ['🟢 Игрок 2 подключился! Можно начинать!', '🟢 Player 2 connected! Ready to start!', '🟢 Spieler 2 verbunden! Ihr könnt starten!', '🟢 ¡Jugador 2 conectado! ¡Listos para empezar!', '🟢 Гравець 2 підключився! Можна починати!'],
        ['🔴 Хост не найден. Проверь код комнаты.', '🔴 Host not found. Check the room code.', '🔴 Host nicht gefunden. Prüfe den Raumcode.', '🔴 No se encontró al anfitrión. Comprueba el código de sala.', '🔴 Хоста не знайдено. Перевірте код кімнати.'],
        ['🔴 Ошибка подключения к серверу', '🔴 Server connection error', '🔴 Fehler bei der Serververbindung', '🔴 Error de conexión con el servidor', '🔴 Помилка підключення до сервера'],
        ['🟡 Создание комнаты (P2P)...', '🟡 Creating room (P2P)...', '🟡 Raum wird erstellt (P2P)...', '🟡 Creando sala (P2P)...', '🟡 Створення кімнати (P2P)...'],
        ['🟢 Подключён:', '🟢 Connected:', '🟢 Verbunden:', '🟢 Conectado:', '🟢 Підключено:'],
        ['🔴 PeerJS недоступен, попробуйте Cloud WSS', '🔴 PeerJS unavailable; try Cloud WSS', '🔴 PeerJS nicht verfügbar; versuche Cloud WSS', '🔴 PeerJS no está disponible; prueba Cloud WSS', '🔴 PeerJS недоступний, спробуйте Cloud WSS'],
        ['🟡 Переподключение к PeerJS...', '🟡 Reconnecting to PeerJS...', '🟡 PeerJS-Verbindung wird wiederhergestellt...', '🟡 Reconectando a PeerJS...', '🟡 Повторне підключення до PeerJS...'],
        ['КОД СКОПИРОВАН! 📋', 'CODE COPIED! 📋', 'CODE KOPIERT! 📋', '¡CÓDIGO COPIADO! 📋', 'КОД СКОПІЙОВАНО! 📋'],
        ['🔴 Введите IP-адрес хоста!', '🔴 Enter the host IP address!', '🔴 Host-IP-Adresse eingeben!', '🔴 ¡Introduce la IP del anfitrión!', '🔴 Введіть IP-адресу хоста!'],
        ['🔴 Cloud WSS разорван', '🔴 Cloud WSS disconnected', '🔴 Cloud WSS getrennt', '🔴 Cloud WSS desconectado', '🔴 Cloud WSS розірвано'],
        ['🔴 Все Cloud WSS брокеры недоступны. Используйте PeerJS P2P!', '🔴 All Cloud WSS brokers are unavailable. Use PeerJS P2P!', '🔴 Alle Cloud-WSS-Broker sind nicht verfügbar. Nutze PeerJS P2P!', '🔴 Ningún broker de Cloud WSS está disponible. ¡Usa PeerJS P2P!', '🔴 Усі брокери Cloud WSS недоступні. Використовуйте PeerJS P2P!'],
        ['🔴 Не удалось переподключиться', '🔴 Reconnection failed', '🔴 Wiederverbindung fehlgeschlagen', '🔴 No se pudo reconectar', '🔴 Не вдалося повторно підключитися'],
        ['🟡 Подключение к серверу...', '🟡 Connecting to server...', '🟡 Verbindung zum Server wird hergestellt...', '🟡 Conectando con el servidor...', '🟡 Підключення до сервера...'],
        ['🔴 Соединение разорвано', '🔴 Connection lost', '🔴 Verbindung unterbrochen', '🔴 Conexión perdida', '🔴 З’єднання розірвано'],
        ['🔴 PeerJS сервер не отвечает. Используйте Cloud WSS ☁️', '🔴 PeerJS server is not responding. Use Cloud WSS ☁️', '🔴 PeerJS-Server antwortet nicht. Nutze Cloud WSS ☁️', '🔴 El servidor PeerJS no responde. Usa Cloud WSS ☁️', '🔴 Сервер PeerJS не відповідає. Використовуйте Cloud WSS ☁️'],
        ['🟢 Код:', '🟢 Code:', '🟢 Code:', '🟢 Código:', '🟢 Код:'],
        ['🔴 Не удалось подключиться:', '🔴 Could not connect:', '🔴 Verbindung fehlgeschlagen:', '🔴 No se pudo conectar:', '🔴 Не вдалося підключитися:'],
        ['🔴 P2P ошибка:', '🔴 P2P error:', '🔴 P2P-Fehler:', '🔴 Error de P2P:', '🔴 Помилка P2P:'],
        ['🟡 Вход в Cloud комнату', '🟡 Joining Cloud room', '🟡 Cloud-Raum wird betreten', '🟡 Entrando en la sala Cloud', '🟡 Вхід до Cloud-кімнати'],
        ['🟡 Cloud WSS (попытка', '🟡 Cloud WSS (attempt', '🟡 Cloud WSS (Versuch', '🟡 Cloud WSS (intento', '🟡 Cloud WSS (спроба'],
        ['🟡 Переподключение (', '🟡 Reconnecting (', '🟡 Wiederverbindung (', '🟡 Reconectando (', '🟡 Повторне підключення ('],
        ['🟢 Cloud комната:', '🟢 Cloud room:', '🟢 Cloud-Raum:', '🟢 Sala Cloud:', '🟢 Cloud-кімната:'],
        [' — ожидание игрока...', ' — waiting for player...', ' — warte auf Spieler...', ' — esperando a un jugador...', ' — очікування гравця...'],
        [' — жди игрока!', ' — waiting for a player!', ' — warte auf einen Spieler!', ' — ¡espera a otro jugador!', ' — чекай на гравця!'],
        ['🟢 Cloud: Игрок 2 подключился!', '🟢 Cloud: Player 2 connected!', '🟢 Cloud: Spieler 2 verbunden!', '🟢 Cloud: ¡Jugador 2 conectado!', '🟢 Cloud: гравець 2 підключився!'],
        ['http://<ваш-IP>:', 'http://<your-IP>:', 'http://<deine-IP>:', 'http://<tu-IP>:', 'http://<ваш-IP>:'],
        ['ХОСТ', 'HOST', 'HOST', 'ANFITRIÓN', 'ХОСТ'],
        ['КЛИЕНТ', 'CLIENT', 'CLIENT', 'CLIENTE', 'КЛІЄНТ'],
        ['Хост', 'Host', 'Host', 'Anfitrión', 'Хост'],
        ['Клиент', 'Client', 'Client', 'Cliente', 'Клієнт'],
        ['Друг', 'Friend', 'Freund', 'Amigo', 'Друг'],
        ['Игрок', 'Player', 'Spieler', 'Jugador', 'Гравець'],
        ['Игрок отключился', 'Player disconnected', 'Spieler getrennt', 'Jugador desconectado', 'Гравець від’єднався'],
        ['Cloud WSS', 'Cloud WSS', 'Cloud WSS', 'Cloud WSS', 'Cloud WSS'],
        ['PeerJS', 'PeerJS', 'PeerJS', 'PeerJS', 'PeerJS'],
        ['соединение', 'connection', 'Verbindung', 'conexión', 'з’єднання'],
        ['подключение', 'connection', 'Verbindung', 'conexión', 'підключення'],
        ['подключён', 'connected', 'verbunden', 'conectado', 'підключено'],
        ['Подключение', 'Connecting', 'Verbindung', 'Conectando', 'Підключення'],
        ['переподключение', 'reconnecting', 'Wiederverbindung', 'reconexión', 'повторне підключення'],
        ['игрока', 'players', 'Spieler', 'jugadores', 'гравців'],
        ['Ошибка', 'Error', 'Fehler', 'Error', 'Помилка'],
        ['не отвечает', 'is not responding', 'antwortet nicht', 'no responde', 'не відповідає'],
        ['Введите', 'Enter', 'Gib ein', 'Introduce', 'Введіть'],
        ['Проверь код', 'Check the code', 'Prüfe den Code', 'Comprueba el código', 'Перевірте код'],
        ['Проверить', 'Check', 'Prüfen', 'Comprobar', 'Перевірити'],
        ['соединение разорвано', 'connection lost', 'Verbindung unterbrochen', 'conexión perdida', 'з’єднання розірвано'],
        ['отключился', 'disconnected', 'getrennt', 'desconectado', 'від’єднався'],
        ['сервер', 'server', 'Server', 'servidor', 'сервер'],
        ['комната', 'room', 'Raum', 'sala', 'кімната'],
        ['комнаты', 'room', 'Raum', 'sala', 'кімнати'],

        // Boss display names.
        ['СТРАЖ-ПАНЦИРЬ', 'SHELL WARDEN', 'PANZERWÄCHTER', 'GUARDIÁN ACORAZADO', 'ПАНЦИРНИЙ ВАРТОВИЙ'],
        ['ПЕРЕХВАТЧИК', 'INTERCEPTOR', 'ABFANGJÄGER', 'INTERCEPTOR', 'ПЕРЕХОПЛЮВАЧ'],
        ['СИНГУЛЯРНОСТЬ', 'SINGULARITY', 'SINGULARITÄT', 'SINGULARIDAD', 'СИНГУЛЯРНІСТЬ']
    ];

    const translations = Object.create(null);
    messages.forEach((row) => {
        const source = normalize(row[0]);
        translations[source] = Object.freeze({ en: row[1], de: row[2], es: row[3], uk: row[4] });
    });

    const partialTranslations = Object.keys(translations)
        .filter((source) => source.length >= 4 && /[А-Яа-яЁёІіЇїЄєҐґ]/u.test(source))
        .sort((a, b) => b.length - a.length)
        .map((source) => ({ source, pattern: new RegExp(escapeRegExp(source), 'giu') }));

    function normalize(value) {
        return String(value).replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function localizedNumber(value, language, decimals = 2) {
        const numeric = Number(String(value).replace(/[\s\u00a0\u202f]/g, '').replace(',', '.'));
        if (!Number.isFinite(numeric)) return String(value);
        return new Intl.NumberFormat(LOCALE_TAGS[language] || LOCALE_TAGS.en, {
            maximumFractionDigits: decimals,
            minimumFractionDigits: 0
        }).format(numeric);
    }

    function translateDifficulty(value, language) {
        const difficultyKey = normalize(value).toLocaleLowerCase('ru-RU');
        const exact = translations[difficultyKey];
        if (exact && exact[language]) return exact[language];
        return translateCore(value, language);
    }

    function translateDynamic(source, language) {
        let match;

        match = source.match(/^Следующая рулетка:\s*лёгкая\s+([\d.,]+)%,\s*обычная\s+([\d.,]+)%,\s*сложная\s+([\d.,]+)%,\s*невозможная\s+([\d.,]+)%\.$/iu);
        if (match) {
            const values = match.slice(1).map((value) => localizedNumber(value, language));
            const labels = {
                en: ['easy', 'normal', 'hard', 'impossible'],
                de: ['leicht', 'normal', 'schwer', 'unmöglich'],
                es: ['fácil', 'normal', 'difícil', 'imposible'],
                uk: ['легка', 'звичайна', 'складна', 'неможлива']
            }[language];
            const heading = { en: 'Next roulette odds:', de: 'Chancen der nächsten Ziehung:', es: 'Probabilidades de la próxima ruleta:', uk: 'Шанси наступної рулетки:' }[language];
            return `${heading} ${labels.map((label, index) => `${label} ${values[index]}%`).join(', ')}.`;
        }

        match = source.match(/^Следующая волна:\s*(.+?)\.\s*Вероятность —\s*([\d.,]+)%.\s*После завершения волны шансы изменятся снова\. Старт через секунду\.$/iu);
        if (match) {
            const difficulty = translateDifficulty(match[1], language);
            const probability = localizedNumber(match[2], language);
            return {
                en: `Next wave: ${difficulty}. Chance: ${probability}%. Odds will change again after the wave. Launching in one second.`,
                de: `Nächste Welle: ${difficulty}. Wahrscheinlichkeit: ${probability}%. Nach der Welle ändern sich die Chancen erneut. Start in einer Sekunde.`,
                es: `Próxima oleada: ${difficulty}. Probabilidad: ${probability}%. Las probabilidades volverán a cambiar al terminar la oleada. Comienza en un segundo.`,
                uk: `Наступна хвиля: ${difficulty}. Імовірність — ${probability}%. Після завершення хвилі шанси знову зміняться. Старт за секунду.`
            }[language];
        }

        match = source.match(/^ВОЛНА\s*·\s*(\d+)\s*СЕК$/iu);
        if (match) return {
            en: `WAVE · ${match[1]} SEC`, de: `WELLE · ${match[1]} SEK`, es: `OLEADA · ${match[1]} S`, uk: `ХВИЛЯ · ${match[1]} С`
        }[language];

        match = source.match(/^ЗАЧИСТКА\s*·\s*(\d+)\s*ЦЕЛЕЙ$/iu);
        if (match) return {
            en: `CLEAR · ${match[1]} TARGETS`, de: `SÄUBERUNG · ${match[1]} ZIELE`, es: `LIMPIEZA · ${match[1]} OBJETIVOS`, uk: `ЗАЧИСТКА · ${match[1]} ЦІЛЕЙ`
        }[language];

        match = source.match(/^УСИЛЕНИЕ\s*·\s*РАНГ\s*(\d+)$/iu);
        if (match) return {
            en: `UPGRADE · RANK ${match[1]}`, de: `UPGRADE · RANG ${match[1]}`, es: `MEJORA · RANGO ${match[1]}`, uk: `ПОСИЛЕННЯ · РАНГ ${match[1]}`
        }[language];

        match = source.match(/^УРОВЕНЬ\s+(\d+)$/iu);
        if (match) return {
            en: `LEVEL ${match[1]}`, de: `LEVEL ${match[1]}`, es: `NIVEL ${match[1]}`, uk: `РІВЕНЬ ${match[1]}`
        }[language];

        match = source.match(/^Выбери карту — осталось выборов:\s*(\d+)$/iu);
        if (match) return {
            en: `Choose a card — ${match[1]} picks remaining`, de: `Wähle eine Karte — noch ${match[1]} Auswahl(en)`, es: `Elige una carta — quedan ${match[1]} elecciones`, uk: `Обери картку — залишилося виборів: ${match[1]}`
        }[language];

        match = source.match(/^ДВИГАТЕЛИ\s*·\s*МОДУЛЬ\s*(\d+)$/iu);
        if (match) return {
            en: `ENGINES · MODULE ${match[1]}`, de: `ANTRIEBE · MODUL ${match[1]}`, es: `MOTORES · MÓDULO ${match[1]}`, uk: `ДВИГУНИ · МОДУЛЬ ${match[1]}`
        }[language];

        match = source.match(/^УРОВЕНЬ\s+(\d+)\s*·\s*СУММАРНОЕ УСИЛЕНИЕ\s+(\d+)%$/iu);
        if (match) return {
            en: `LEVEL ${match[1]} · TOTAL BOOST ${match[2]}%`, de: `STUFE ${match[1]} · GESAMTSCHUB ${match[2]}%`, es: `NIVEL ${match[1]} · IMPULSO TOTAL ${match[2]}%`, uk: `РІВЕНЬ ${match[1]} · ЗАГАЛЬНЕ ПОСИЛЕННЯ ${match[2]}%`
        }[language];

        match = source.match(/^(КУПИТЬ|УЛУЧШИТЬ)\s*·\s*([\d\s\u00a0\u202f.,]+)\s*XP$/iu);
        if (match) {
            const verb = match[1].toLocaleUpperCase('ru-RU') === 'КУПИТЬ'
                ? { en: 'BUY', de: 'KAUFEN', es: 'COMPRAR', uk: 'КУПИТИ' }[language]
                : { en: 'UPGRADE', de: 'VERBESSERN', es: 'MEJORAR', uk: 'ПОКРАЩИТИ' }[language];
            const amount = localizedNumber(match[2].replace(/[^\d]/g, ''), language, 0);
            return `${verb} · ${amount} XP`;
        }

        match = source.match(/^НУЖНО\s+([\d\s\u00a0\u202f.,]+)\s*XP$/iu);
        if (match) return {
            en: `NEED ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`,
            de: `BENÖTIGT ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`,
            es: `NECESARIO ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`,
            uk: `ПОТРІБНО ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`
        }[language];

        match = source.match(/^ГОТОВО\s*·\s*([\d\s\u00a0\u202f.,]+)\s*XP$/iu);
        if (match) return {
            en: `READY · ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`,
            de: `BEREIT · ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`,
            es: `LISTO · ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`,
            uk: `ГОТОВО · ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)} XP`
        }[language];

        match = source.match(/^Рекорд:\s*волна\s+(\d+)$/iu);
        if (match) return {
            en: `Record: wave ${match[1]}`, de: `Rekord: Welle ${match[1]}`, es: `Récord: oleada ${match[1]}`, uk: `Рекорд: хвиля ${match[1]}`
        }[language];

        match = source.match(/^Узел:\s*(.+)$/iu);
        if (match) return `${{ en: 'Node:', de: 'Knoten:', es: 'Nodo:', uk: 'Вузол:' }[language]} ${translateCore(match[1], language)}`;

        match = source.match(/^Насадка:\s*(.+)$/iu);
        if (match) return `${{ en: 'Attachment:', de: 'Aufsatz:', es: 'Accesorio:', uk: 'Насадка:' }[language]} ${translateCore(match[1], language)}`;

        match = source.match(/^ЗАКРЫТО:\s*(.+)\.$/iu);
        if (match) return `${{ en: 'LOCKED:', de: 'GESPERRT:', es: 'BLOQUEADO:', uk: 'ЗАБЛОКОВАНО:' }[language]} ${translateCore(match[1], language)}.`;

        match = source.match(/^Недостаточно карьерного XP:\s*нужно\s+([\d\s\u00a0\u202f.,]+)\.$/iu);
        if (match) return {
            en: `Not enough career XP: need ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`,
            de: `Nicht genug Karriere-XP: benötigt ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`,
            es: `XP de carrera insuficiente: se necesitan ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`,
            uk: `Недостатньо кар’єрного XP: потрібно ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`
        }[language];

        match = source.match(/^Недостаточно карьерного XP:\s*для узла нужно\s+([\d\s\u00a0\u202f.,]+)\.$/iu);
        if (match) return {
            en: `Not enough career XP: node cost ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`,
            de: `Nicht genug Karriere-XP: Knoten kostet ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`,
            es: `XP de carrera insuficiente: el nodo cuesta ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`,
            uk: `Недостатньо кар’єрного XP: для вузла потрібно ${localizedNumber(match[1].replace(/[^\d]/g, ''), language, 0)}.`
        }[language];

        match = source.match(/^Установлена насадка «(.+)»\. Активна только одна насадка\.$/iu);
        if (match) return {
            en: `Attachment “${translateCore(match[1], language)}” equipped. Only one attachment can be active.`,
            de: `Aufsatz „${translateCore(match[1], language)}“ ausgerüstet. Es kann nur ein Aufsatz aktiv sein.`,
            es: `Accesorio «${translateCore(match[1], language)}» equipado. Solo puede haber uno activo.`,
            uk: `Насадку «${translateCore(match[1], language)}» встановлено. Активною може бути лише одна.`
        }[language];

        match = source.match(/^Насадка «(.+)» куплена навсегда и установлена\.$/iu);
        if (match) return {
            en: `Attachment “${translateCore(match[1], language)}” purchased permanently and equipped.`,
            de: `Aufsatz „${translateCore(match[1], language)}“ dauerhaft gekauft und ausgerüstet.`,
            es: `Accesorio «${translateCore(match[1], language)}» comprado permanentemente y equipado.`,
            uk: `Насадку «${translateCore(match[1], language)}» придбано назавжди й встановлено.`
        }[language];

        match = source.match(/^Узел «(.+)» установлен навсегда\.$/iu);
        if (match) return {
            en: `Node “${translateCore(match[1], language)}” permanently installed.`,
            de: `Knoten „${translateCore(match[1], language)}“ dauerhaft installiert.`,
            es: `Nodo «${translateCore(match[1], language)}» instalado permanentemente.`,
            uk: `Вузол «${translateCore(match[1], language)}» встановлено назавжди.`
        }[language];

        match = source.match(/^(Сила\+|Тяга\+) установлен · уровень (\d+)\. Постоянно \+1% скорости за уровень\.$/iu);
        if (match) {
            const name = translateCore(match[1], language);
            return {
                en: `${name} installed · level ${match[2]}. Permanent +1% speed per level.`,
                de: `${name} installiert · Stufe ${match[2]}. Dauerhaft +1% Geschwindigkeit pro Stufe.`,
                es: `${name} instalado · nivel ${match[2]}. +1% de velocidad permanente por nivel.`,
                uk: `${name} встановлено · рівень ${match[2]}. Постійно +1% швидкості за рівень.`
            }[language];
        }

        return null;
    }

    function translateCore(value, language) {
        if (!supportedLanguages.has(language) || language === 'ru') return value;
        const normalized = normalize(value);
        const exact = translations[normalized];
        if (exact && exact[language]) return exact[language];

        let result = normalized;
        partialTranslations.forEach(({ source, pattern }) => {
            const translated = translations[source] && translations[source][language];
            if (translated) result = result.replace(pattern, () => normalize(translated));
        });
        return result;
    }

    function translateText(value, language = currentLanguage) {
        const source = String(value);
        if (language === 'ru' || !supportedLanguages.has(language)) return source;
        const normalized = normalize(source);
        const dynamic = translateDynamic(normalized, language);
        if (dynamic !== null) return dynamic;
        return translateCore(source, language);
    }

    function preserveWhitespace(source, translated) {
        const leading = source.match(/^\s*/u)[0];
        const trailing = source.match(/\s*$/u)[0];
        const coreEnd = source.length - trailing.length;
        if (coreEnd <= leading.length) return source;
        return leading + translated + trailing;
    }

    const textSources = new WeakMap();
    const attributeSources = new WeakMap();
    const localizedAttributes = ['placeholder', 'aria-label', 'title', 'alt'];

    function localizeTextNode(node) {
        if (!node || node.nodeType !== Node.TEXT_NODE) return;
        const current = node.nodeValue || '';
        let source = textSources.get(node);
        if (source === undefined) {
            if (!/[А-Яа-яЁёІіЇїЄєҐґ]/u.test(current)) return;
            source = current;
            textSources.set(node, source);
        }
        const translated = currentLanguage === 'ru' ? source : preserveWhitespace(source, translateText(source, currentLanguage));
        if (node.nodeValue !== translated) node.nodeValue = translated;
    }

    function localizeAttribute(element, attribute, currentValue) {
        let elementRecords = attributeSources.get(element);
        let record = elementRecords && elementRecords.get(attribute);
        if (!record && !/[А-Яа-яЁёІіЇїЄєҐґ]/u.test(currentValue || '')) return;
        if (!elementRecords) {
            elementRecords = new Map();
            attributeSources.set(element, elementRecords);
        }
        if (!record || currentValue !== record.applied) {
            record = { source: currentValue, applied: currentValue };
            elementRecords.set(attribute, record);
        }
        const translated = currentLanguage === 'ru' ? record.source : translateText(record.source, currentLanguage);
        if (element.getAttribute(attribute) !== translated) {
            record.applied = translated;
            element.setAttribute(attribute, translated);
        } else {
            record.applied = translated;
        }
    }

    function walkText(root) {
        if (!root) return;
        if (root.nodeType === Node.TEXT_NODE) {
            localizeTextNode(root);
            return;
        }
        if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
        if (root.nodeType === Node.ELEMENT_NODE) {
            localizedAttributes.forEach((attribute) => {
                if (root.hasAttribute(attribute)) localizeAttribute(root, attribute, root.getAttribute(attribute));
            });
        }
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) localizeTextNode(node);
        if (root.querySelectorAll) {
            root.querySelectorAll('*').forEach((element) => {
                localizedAttributes.forEach((attribute) => {
                    if (element.hasAttribute(attribute)) localizeAttribute(element, attribute, element.getAttribute(attribute));
                });
            });
        }
    }

    function updateDocumentMetadata() {
        const title = document.querySelector('title');
        if (title) {
            if (title.dataset.i18nSource === undefined) title.dataset.i18nSource = title.textContent;
            title.textContent = translateText(title.dataset.i18nSource, currentLanguage);
        }
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            if (description.dataset.i18nSource === undefined) description.dataset.i18nSource = description.getAttribute('content') || '';
            description.setAttribute('content', translateText(description.dataset.i18nSource, currentLanguage));
        }
        document.documentElement.lang = currentLanguage === 'uk' ? 'uk-UA' : currentLanguage;
    }

    function syncLanguagePickers() {
        document.querySelectorAll('[data-language-picker]').forEach((picker) => {
            if (picker.value !== currentLanguage) picker.value = currentLanguage;
        });
    }

    function applyLanguage() {
        updateDocumentMetadata();
        walkText(document.body);
        syncLanguagePickers();
    }

    function readSavedLanguage() {
        try {
            const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
            return supportedLanguages.has(stored) ? stored : 'ru';
        } catch (error) {
            return 'ru';
        }
    }

    let currentLanguage = readSavedLanguage();

    function setLanguage(language) {
        if (!supportedLanguages.has(language) || language === currentLanguage) return false;
        currentLanguage = language;
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        } catch (error) {
            // Keep the language selected for this session if storage is unavailable.
        }
        applyLanguage();
        return true;
    }

    document.addEventListener('change', (event) => {
        if (event.target && event.target.matches('[data-language-picker]')) setLanguage(event.target.value);
    });

    applyLanguage();

    if (typeof MutationObserver !== 'undefined' && document.body) {
        const observer = new MutationObserver((records) => {
            records.forEach((record) => {
                if (record.type === 'characterData') {
                    localizeTextNode(record.target);
                } else if (record.type === 'attributes' && localizedAttributes.includes(record.attributeName)) {
                    localizeAttribute(record.target, record.attributeName, record.target.getAttribute(record.attributeName) || '');
                } else if (record.type === 'childList') {
                    record.addedNodes.forEach((node) => walkText(node));
                }
            });
        });
        observer.observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: localizedAttributes
        });
    }

    // Most in-game callouts are rendered on canvas. Translate only strings that
    // actually contain Cyrillic, leaving the numeric/gameplay draw path alone.
    if (typeof CanvasRenderingContext2D !== 'undefined') {
        const canvasPrototype = CanvasRenderingContext2D.prototype;
        const originalFillText = canvasPrototype.fillText;
        if (typeof originalFillText === 'function' && !canvasPrototype.__nebulaI18nWrapped) {
            canvasPrototype.fillText = function (text, ...args) {
                if (currentLanguage !== 'ru') {
                    const value = typeof text === 'string' ? text : String(text);
                    if (/[А-Яа-яЁёІіЇїЄєҐґ]/u.test(value)) text = translateText(value, currentLanguage);
                }
                return originalFillText.call(this, text, ...args);
            };
            Object.defineProperty(canvasPrototype, '__nebulaI18nWrapped', { value: true });
        }
    }

    window.addEventListener('storage', (event) => {
        if (event.key === LANGUAGE_STORAGE_KEY && supportedLanguages.has(event.newValue) && event.newValue !== currentLanguage) {
            currentLanguage = event.newValue;
            applyLanguage();
        }
    });

    window.NebulaI18n = Object.freeze({
        getLanguage: () => currentLanguage,
        setLanguage,
        translate: (value, language = currentLanguage) => translateText(value, language),
        supportedLanguages: Object.freeze(Array.from(supportedLanguages))
    });
})();
