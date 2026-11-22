/*
 * 遊戲流程控制：標題 → 建角／讀檔 → 地圖、對話、委託、寶箱、戰鬥、商店、旅店、轉職、存檔、遊玩時間
 * 規則都在 src/systems/*（可在 node 測試）；這裡只負責把規則接到畫面上。
 */
(function () {
  'use strict';
  var J = window.JQ;
  var SLOT = 'main';

  var C = J.CONFIG;
  var G = {
    state: null, data: null, questions: [], provider: null, phaser: null, mapScene: null, busy: false,
    held: {}, heldOrder: [], tickTimer: 0, lastSave: 0, npcIndex: {}, battleCtx: null,
    joy: { dir: null, force: 0 },
    // 開發者模式（碰撞格子疊圖，會看到寶箱位置）：只在本機開啟（localhost、127.0.0.1、file://）；正式網站帶了參數也不開
    DEBUG: /[?&]debug=1\b/.test(location.search) && (location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/.test(location.hostname)),
    // 測試用：把最大貼圖尺寸調小（例如 ?maxtex=1024），檢查大背景自動切塊
    MAX_TEX_OVERRIDE: (function () { var m = /[?&]maxtex=(\d+)/.exec(location.search); return m ? Math.max(256, Number(m[1])) : 0; })(),
    mapLoadLog: []   // 地圖背景載入時間紀錄（debug.mapLoadLog()）
  };

  // ---------------------------------------------------------------- 啟動
  G.boot = function () {
    G.data = J.World.fromWindow(window);
    var norm = J.Answer.normalizeQuestions(window.QUESTIONS || []);
    G.questions = norm.valid;
    if (norm.invalid.length) console.warn('[題庫] 有 ' + norm.invalid.length + ' 題格式不對，已略過：', norm.invalid.slice(0, 5));
    var warn = J.World.validate(G.data);
    if (warn.length) console.warn('[世界資料] ' + warn.length + ' 則提醒：', warn.slice(0, 10));
    Object.keys(G.data.maps).forEach(function (mid) {
      (G.data.maps[mid].npcs || []).forEach(function (n) { G.npcIndex[n.id] = { npc: n, map: mid }; });
    });
    var storage = null;
    try { storage = window.localStorage; storage.getItem('bq4_save'); } catch (e) { storage = null; }
    if (!storage) {   // 瀏覽器封鎖網站資料時：改用記憶體（關掉就沒了），提醒用存檔碼備份
      var mem = {};
      storage = { getItem: function (k) { return k in mem ? mem[k] : null; }, setItem: function (k, v) { mem[k] = String(v); }, removeItem: function (k) { delete mem[k]; }, _m: mem };
      setTimeout(function () { J.UI.toast('這台裝置無法存檔，請用存檔碼備份進度。', 6000); }, 1500);
    }
    G.provider = new J.SaveProvider.LocalSaveProvider(storage);
    // v1.0.2（老闆「舊玩家也要算進去」）：這台裝置已經有存檔、還沒送過 +1 → 啟動時送一次（非同步，不擋標題畫面；失敗不重送）
    if (J.Counter) setTimeout(function () { try { J.Counter.reportExisting(storage).then(function (r) { G.counterBoot = r; }); } catch (e) { G.counterBoot = 'skipped'; } }, 0);
    // 請瀏覽器把本站資料標成「持久保存」，降低存檔被自動清除的機會（不支援或被拒絕都不影響遊戲）
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) { /* 忽略 */ }
    J.UI.init();
    J.HUD.init({
      journal: function () { if (!G.blocked()) J.Menus.journal(G); },
      quests: function () { if (!G.blocked()) { if (J.PuzzleUI) G.openNotebook(); else J.Menus.questList(G); } },   // v0.6：任務列表改成偵探筆記
      askAgu: function () { G.askAgu(); },
      bag: function () { if (!G.blocked()) J.Menus.bag(G); },
      settings: function () { if (!G.blocked()) J.Settings.open(G); },
      joystick: function (dir, force) { G.joy = { dir: dir, force: force }; },
      // 在搖桿上「輕點一下」（沒有拖曳）：當作點了搖桿底下的地圖（例如搖桿蓋住的寶箱）
      mapTap: function (cx, cy) { G.lastMapTap = { x: cx, y: cy }; if (G.mapScene && !G.blocked() && !J.UI.blocksMove()) G.mapScene.tapAtClient(cx, cy); },   // v0.9.5 放大地圖開著也能點
      action: function () { if (G.mapScene && !J.UI.isOpen()) G.mapScene.actionKey(); },
      cancel: function () {
        // B 鍵：有視窗就關掉（同 Esc），沒有就打開背包選單
        if (J.UI.isOpen()) { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return; }
        if (!G.blocked() && G.state) J.Menus.bag(G);
      }
    });
    document.title = C.GAME_TITLE;
    G.bindKeys();
    G.showTitle();
  };

  G.blocked = function () { return G.busy || (G.battleCtx && !G.battleCtx.over); };

  G.showTitle = function () {
    J.HUD.show(false);
    // v1.0.1 首頁「已有 N 位冒險者加入」：讀到數字才顯示（3 秒逾時、500、離線都不顯示）
    var counterEl = J.UI.h('p.title-count', { hidden: true, 'aria-live': 'polite' });
    if (J.Counter) J.Counter.fetchCount().then(function (n) { G.counterShown = n; if (n !== null) { counterEl.textContent = J.Counter.label(n); counterEl.hidden = false; } });
    Promise.all([G.provider.load(SLOT), G.provider.loadError(SLOT)]).then(function (r) {
      var s = r[0], err = r[1];
      var titleHandle = J.Title.show({
        counterEl: counterEl,
        summary: s ? { name: s.player.name, level: s.player.level, job: s.player.job } : null,
        loadError: s ? '' : err, migrated: !!(s && s.migratedFrom),
        onContinue: function () { G.state = s; G.startWorld(false); },
        onNew: function (name, gender) { G.newGame(name, gender); },
        onImport: function (code) {
          return J.SaveCode.importAny(code).then(function (res) {
          if (!res.ok) return res.error;
          // 本機已經有存檔時，先確認才取代（審查 F-13）；取消就什麼都不動
          var ask = s ? J.UI.confirm('這會取代目前的存檔（等級 ' + s.player.level + '、名字 ' + s.player.name + '），確定嗎？', '確定取代', '取消')
            : err ? J.UI.confirm('這會取代這台裝置上讀不進來的存檔，確定嗎？', '確定取代', '取消') : Promise.resolve(true);
          return ask.then(function (yes) {
            if (!yes) return '已取消，原本的存檔沒有變動。';
            G.state = res.state;
            G.save(true);
            G.startWorld(false);
            return '';
          });
          });
        }
      });
      G.titleHandle = titleHandle;
      // 標題曲（還沒點畫面解鎖聲音時，music.js 會記住、解鎖後自動開始）；存檔裡關掉音樂就不播
      // 存檔裡關掉音樂：標題畫面就先關（music.js 不會下載任何音樂檔）
      if (s && s.settings && s.settings.music === false) { if (G.musicReady()) { try { window.JQ.Music.setEnabled(false); } catch (e) { /* 忽略 */ } } }
      else G.bgm('title');
      G.checkLoadLink(s);
    });
  };

  /** 把網址上的 #load=… 拿掉（避免重新整理又跳出來；也不讓存檔碼留在瀏覽紀錄的網址列） */
  G.clearLoadHash = function () {
    try { history.replaceState(null, '', location.href.split('#')[0]); } catch (e) { try { location.hash = ''; } catch (x) { /* 忽略 */ } }
  };

  /**
   * 掃 QR Code 開啟的網址：<遊戲網址>#load=<存檔碼>
   * 先驗證存檔碼；本機已有存檔時說明會取代哪一份，按「讀取」才覆蓋，取消就什麼都不動。
   */
  G.checkLoadLink = function (local) {
    var code = J.SaveCode.parseHash(location.hash);
    if (!code) return;
    G.clearLoadHash();   // 先清掉網址上的存檔碼：就算存檔碼有問題讓頁面卡住，重新整理也不會再讀一次
    J.SaveCode.importAny(code).then(function (res) {
      if (!res.ok) { G.clearLoadHash(); J.UI.toast('QR Code 存檔讀不出來：' + res.error + '（原本的存檔沒有變動）', 6000); return; }
      var p = res.state.player;
      var msg = '要讀取這個 QR Code 的存檔嗎？（名字 ' + p.name + '、等級 ' + p.level + '）' +
        (local ? '這會取代目前的存檔（等級 ' + local.player.level + '、名字 ' + local.player.name + '）。' : '');
      J.UI.confirm(msg, '讀取存檔', '取消').then(function (yes) {
        G.clearLoadHash();
        if (!yes) { J.UI.toast('已取消，原本的存檔沒有變動。'); return; }
        J.Audio.unlock();   // 按鈕是使用者手勢：順便解鎖 iPad 音效
        G.state = res.state;
        G.save(true);
        if (G.titleHandle) G.titleHandle.close(true);
        G.startWorld(false);
      });
    });
  };

  G.newGame = function (name, gender) {
    var st = J.State.createNewState(name, gender, Date.now());
    var m1 = G.data.startMap;   // 勇者大冒險II：world.js 的 start_map（T01 博覽會會場）
    var map = G.data.maps[m1];
    var start = map.start || { x: 2, y: 2 };
    st.mapDims = J.MapInfo.currentDims(G.data.maps);   // 新遊戲的座標就是目前地圖的座標
    st.location = { map: m1, x: start.x, y: start.y };
    if (map.inn) st.lastInn = { map: m1, x: map.inn.x, y: map.inn.y + 1 };
    else st.lastInn = { map: m1, x: start.x, y: start.y };
    G.state = st;
    G.startWorld(true);
    // v1.0.1 建立角色成功：這台裝置第一次才匿名送一次 +1（不含名字或任何資料；失敗不重送、不影響遊戲）
    if (J.Counter) { try { J.Counter.reportNew(window.localStorage).then(function (r) { G.counterReport = r; }); } catch (e) { G.counterReport = 'skipped'; } }
  };

  /** 整合3（審查 L-9）：捷運到站台詞——台北章新稿 D_C01_MRT_ARRIVE_<地圖>（劇本 4.2）優先，沒有再用舊的 D_MRT_ARRIVE_<地圖> */
  G.mrtArriveId = function (mapId) { var c = 'D_C01_MRT_ARRIVE_' + mapId; return G.data.dialogs && G.data.dialogs[c] ? c : 'D_MRT_ARRIVE_' + mapId; };

  G.startWorld = function (isNew) {
    var st = G.state;
    J.Daily.ensure(st.daily, Date.now());
    // 整合3（審查 S-6、S-7）：位置、旅店的地圖不存在或不可走 → start_map（貼入被改過的存檔碼也不會全黑）；讀到體力 0 先照累倒處理
    // B4 整合3（審查 S-2）：舊存檔站的格子後來變擋路（格子修正）→ 同一張地圖最近的可站格，不要整個送回 start_map
    // （地圖尺寸改過的舊存檔交給後面的 migrateCoords 換算，這裡不動）
    var dimsNow = J.MapInfo.currentDims(G.data.maps), dimsSaved = (st.mapDims && Object.keys(st.mapDims).length) ? st.mapDims : J.MapInfo.LEGACY_DIMS;
    var lm = st.location && st.location.map, sameDims = lm && (!dimsSaved[lm] || (dimsNow[lm] && dimsSaved[lm][0] === dimsNow[lm][0] && dimsSaved[lm][1] === dimsNow[lm][1]));
    var reloc = sameDims && J.MapInfo.relocateBlocked(st, G.data.maps, function (m, x, y) { return J.World.isWalkable(G.data.tilesets, m, x, y); }, function (h) { return J.Puzzle.hiddenOpen(st, h); });
    if (reloc) { G.relocLog = reloc; console.info('[存檔] 站的格子現在不能走，移到最近的可站格：', reloc); }
    var badPlaces = J.Character.fixPlaces(st, G.data.maps, function (m, x, y) { return J.World.isWalkable(G.data.tilesets, m, x, y); });
    if (badPlaces.length) console.info('[存檔] 位置無效，改回起點：', badPlaces);
    J.Character.reviveIfDown(st, G.data, { map: G.data.startMap, x: undefined, y: undefined });
    // 整合6 D-27：新遊戲、v0.5 舊檔搬移後兩格都沒裝備 → 裝上家人給的練習木棒、布衣（只給一次）
    if (isNew || st.migratedV05) { var gear = J.Character.giveStarterGear(st, G.data); if (gear.length) console.info('[裝備] 起始裝備：', gear); }
    J.Character.clampVitals(st, G.data);
    // v0.5：地圖放大後，舊存檔的位置（location、lastInn）換算到新地圖最近能站的格子
    var moved = J.MapInfo.migrateCoords(st, G.data.maps, G.data.tilesets);
    if (moved.length) console.info('[存檔] 地圖尺寸改變，位置已換算：', moved);
    // 整合3（審查 M-2）：人已經在日治區（T07／T08／TI4）但 M5 沒完成的壞存檔 → 讀檔時補記完成，不讓孩子卡在過去
    var rescued = J.Puzzle.rescueRegion(st, G.data.quests, G.data.maps, st.location && st.location.map);
    if (rescued.length) console.info('[存檔] 補記完成的委託（讀檔自救）：', rescued);
    // v0.7：上次在戰鬥中關掉或重新整理 → 存檔裡還有沒結算的經驗值，現在結算（進地圖後再顯示升級）
    G.pendingLevelUp = J.Session.settlePlayerExp(st);
    // v1.0 立志小考：上次考到一半就關掉（inProgress）→ 算考過一次、沒通過（48 號第 4 節）
    G.pendingTrialQuit = J.JobTrial.recover(st);
    G.applySettings(true);
    G.save(true);
    J.HUD.show(true);
    G.refreshHud();
    setTimeout(G.onResize, 50);   // HUD 出現後量它的高度（直向時畫面貼在 HUD 下面）
    var loc = st.location && G.data.maps[st.location.map] ? st.location : { map: G.data.startMap, x: undefined, y: undefined };
    G.ensurePhaser(function () {
      G.phaser.scene.start('Map', { mapId: loc.map, x: loc.x, y: loc.y });
    });
    // 整合3（審查 M-1）：v0.5 切片存檔搬進台北章（Save.migrateV05 立 _v06Opening）→ 也播開場
    // 整合6：開場還沒播完就重新整理 → 下次讀檔再播一次（_openingPending 等播完才拿掉）
    G.pendingIntro = J.Family.openingStart(st, isNew);
    G.save(true);
    if (G.tickTimer) clearInterval(G.tickTimer);
    G.tickTimer = setInterval(G.tick, 1000);
    if (J.Playtime.isOverLimit(st.playtime, st.settings, Date.now())) setTimeout(function () { J.Settings.limitScreen(G); }, 600);
  };

  G.ensurePhaser = function (cb) {
    if (G.phaser) { cb(); return; }
    var portrait = G.layoutMode();
    var z = G.zoomPlan();
    G.phaser = new Phaser.Game({
      type: Phaser.AUTO, parent: 'game', width: C.VIEW_W, height: C.VIEW_H, pixelArt: true, roundPixels: true,
      backgroundColor: '#0e1430', banner: false, audio: { noAudio: true },
      input: { keyboard: false },
      // v0.9 直向：畫面放大到滿寬、貼在 HUD 下面（以前置中，上面空了一大塊）
      scale: z.integer ? { mode: Phaser.Scale.NONE, zoom: z.zoom, autoCenter: Phaser.Scale.CENTER_BOTH }
        : { mode: Phaser.Scale.FIT, autoCenter: portrait ? Phaser.Scale.CENTER_HORIZONTALLY : Phaser.Scale.CENTER_BOTH },
      scene: []
    });
    G.phaser.scene.add('Map', J.MapScene, false);
    G.phaser.scene.add('Battle', J.BattleScene, false);
    window.addEventListener('resize', G.onResize);
    G.phaser.events.once('ready', cb);
  };

  /**
   * 放大方式：能用整數倍又不浪費太多畫面時用整數倍（像素一樣大）；
   * 否則用等比例填滿（FIT），避免在 1.8 倍這類視窗留下一大圈黑邊。
   */
  G.zoomPlan = function () {
    var f = Math.min(window.innerWidth / C.VIEW_W, window.innerHeight / C.VIEW_H);
    var n = Math.floor(f);
    if (G.isPortrait()) return { integer: false, zoom: 1 };   // 直向一律等比例放大到滿寬
    return { integer: n >= 1 && f - n < 0.2, zoom: Math.max(1, n) };
  };
  G.isPortrait = function () { return window.innerHeight > window.innerWidth * 1.05; };
  /** 直向（平板直拿）：body.portrait，畫面貼在 HUD 下面；記下 HUD 高度給 CSS 用 */
  G.layoutMode = function () {
    var portrait = G.isPortrait();
    document.body.classList.toggle('portrait', portrait);
    var hud = document.getElementById('hud');
    if (hud && !hud.hidden && hud.offsetHeight) document.documentElement.style.setProperty('--hud-h', hud.offsetHeight + 'px');
    return portrait;
  };
  G.onResize = function () {
    var portrait = G.layoutMode();
    if (!G.phaser || !G.phaser.scale) return;
    var sc = G.phaser.scale, z = G.zoomPlan();
    if (sc.scaleMode === Phaser.Scale.NONE && z.integer) sc.setZoom(z.zoom);
    if (sc.scaleMode === Phaser.Scale.FIT) {
      var want = portrait ? Phaser.Scale.CENTER_HORIZONTALLY : Phaser.Scale.CENTER_BOTH;
      if (sc.autoCenter !== want) { sc.autoCenter = want; }
      sc.refresh();
    }
  };

  // ---------------------------------------------------------------- 共用
  G.stats = function () { return J.Character.stats(G.state, G.data); };
  G.refreshHud = function () { if (G.state) J.HUD.update(G.state, G.stats()); };
  /** 戰鬥進行中（還沒結束）？ */
  G.inBattle = function () { return !!(G.battleCtx && !G.battleCtx.over && !G.battleCtx.won); };   // 打贏（won）之後就可以存檔
  /**
   * 存檔。v0.9 老闆指示「非戰鬥時間才可存檔」：戰鬥中（自動存檔、答題、怪物攻擊、離開頁面…）一律不寫入，
   * 戰鬥結束（G.bend）才寫。戰鬥中途重新整理 → 回到戰鬥前的狀態（這場答題的金幣、經驗值都還沒寫入，不會重複拿）。
   */
  G.save = function (force) {
    if (G.testModeRestoring) return Promise.resolve(false);   // 還原後直到重新載入，定時／切背景／其他存檔都不可蓋掉備份
    if (!G.state) return Promise.resolve();
    if (G.inBattle()) { G.saveSkipped = (G.saveSkipped || 0) + 1; return Promise.resolve(false); }
    G.lastSave = Date.now();
    return G.provider.save(SLOT, G.state).catch(function (e) { J.UI.toast('存檔失敗：' + e.message); });
  };
  G.applySettings = function () {
    var s = G.state.settings;
    J.Audio.setEnabled(s.sound !== false);
    J.TTS.setEnabled(s.tts !== false);
    // v0.9.3：音量「小／中／大」、語速預設「稍快」、家長選的語音（數值見 state.js 的 AUDIO）
    var A = J.State.AUDIO;
    J.Voice.configure({ volume: A.voiceVolume(s), rateMult: A.voiceSpeed(s), pref: s.voiceLang || 'taigi', voiceName: s.voiceName || '',
      allowCloud: s.voiceCloud !== false, playerName: G.state.player.name || '' });   // 雲端語音念的文字會把這個名字換成「勇者」
    J.HUD.setTouchMode(s.touchControls || 'auto');
    if (G.musicReady()) {
      try { window.JQ.Music.setEnabled(s.music !== false); window.JQ.Music.setVolume(A.musicVolume(s)); } catch (e) { /* 忽略 */ }
    }
    if (G.limitHandle && !J.Playtime.isOverLimit(G.state.playtime, s, Date.now())) { G.limitHandle.close(true); G.limitHandle = null; }
  };
  G.resume = function () { };

  // ---------------------------------------------------------------- 音樂（作曲家的 music.js；還沒完成時安全略過）
  /** JQ.Music 有沒有載入（API：playBgm(id)、stopBgm(ms)、jingle(id,onEnd)、setVolume、setEnabled） */
  G.musicReady = function () { return typeof window.JQ.Music !== 'undefined' && !!window.JQ.Music && typeof window.JQ.Music.playBgm === 'function'; };
  G.musicLog = [];   // 測試用：遊戲要求播過哪些音樂
  G.bgm = function (id) {
    G.musicLog.push('bgm:' + id);
    G.currentBgm = id;
    if (!G.musicReady() || (G.state && G.state.settings.music === false)) return;
    // v0.9.3 還沒讀存檔（標題畫面）時也用新的預設音量「中」
    if (!G.state) { try { window.JQ.Music.setVolume(J.State.AUDIO.MUSIC_VOL.mid); } catch (e) { /* 忽略 */ } }
    try { window.JQ.Music.playBgm(id); } catch (e) { /* 音樂出錯不影響遊戲 */ }
  };
  /** v0.9.5 家長設定「重看片頭動畫」：播片頭（配標題序曲），結束後換回原本地圖的音樂 */
  G.replayOpening = function () {
    if (!J.Opening || J.Opening.isPlaying() || G.blocked()) return false;
    var prev = G.currentBgm, music = G.musicReady() && !(G.state && G.state.settings.music === false);
    document.body.classList.add('opening-on');
    // 片頭蓋滿整個畫面：先讓遊戲畫面（Phaser）睡著，平板只需要畫片頭，比較順
    var slept = false;
    try { if (G.phaser && G.phaser.loop && G.phaser.loop.sleep) { G.phaser.loop.sleep(); slept = true; } } catch (e) { slept = false; }
    return J.Opening.play({ music: music, onDone: function () {
      document.body.classList.remove('opening-on');
      if (slept) { try { G.phaser.loop.wake(); } catch (e) { /* 忽略 */ } }
      G.held = {}; G.heldOrder = [];
      if (music && prev) { G.currentBgm = null; G.bgm(prev); }
    } });
  };
  G.stopBgm = function (ms) { if (G.musicReady()) { try { window.JQ.Music.stopBgm(ms || 300); } catch (e) { /* 忽略 */ } } };
  /**
   * 短曲（勝利、升級、委託完成、旅店休息、珍貴道具、點燈、累倒、開寶箱、結局）。
   * 沒有 music.js 時改播音效 fallback；onEnd 一定會被呼叫（最多等 maxMs）。
   */
  G.jingle = function (id, onEnd, fallback, maxMs) {
    G.musicLog.push('jingle:' + id);
    var called = false;
    var done = function () { if (called) return; called = true; if (onEnd) onEnd(); };
    var useMusic = G.musicReady() && !(G.state && G.state.settings.music === false) && typeof window.JQ.Music.jingle === 'function';
    if (useMusic) {
      try { window.JQ.Music.jingle(id, done); } catch (e) { useMusic = false; }
    }
    if (!useMusic) { if (fallback) J.Audio.play(fallback); setTimeout(done, Math.min(maxMs || 1500, 1500)); }
    else setTimeout(done, maxMs || 9000);   // 保險：music.js 沒呼叫 onEnd 時也會繼續
  };
  G.heroKey = function () { return J.Assets.heroKey(G.state.player.gender, G.state.player.job); };

  /** 說話的人：名字與頭像 sprite */
  /** 整合2：開場選家人稱呼（媽媽／爸爸／阿嬤／阿公；存 state.player.family）。選過就不問；按「等一下」＝「家人」 */
  G.askFamily = function () {
    var F = J.Family;
    if (!F || !F.needAsk(G.state)) return Promise.resolve(F ? F.get(G.state) : null);
    var opts = F.OPTIONS.map(function (v, i) { return { value: v, text: v, primary: i === 0 }; });
    return J.UI.choose(J.UI.fill('出門前，是誰送{name}出門呢？', G.state.player.name), opts).then(function (v) {
      var got = F.set(G.state, v);
      G.familyLog = (G.familyLog || []).concat([got]);   // 測試用
      G.save();
      return got;
    });
  };

  G.speaker = function (who) {
    var SP = window.SPEAKERS || {};
    var name = SP[who] !== undefined ? SP[who] : null;
    var sprite = null;
    if (who === 'hero' || who === 'player') { name = G.state.player.name; sprite = G.heroKey(); }
    else if (who === 'pet' || who === 'agu') { name = name || '阿咕'; sprite = 'pet_agu'; }   // 勇者大冒險II：跟著主角的是阿咕（GDD 2.2）
    else if (who === 'narrator') { name = ''; }
    else if (/^animal:/.test(who)) { name = who.slice(7); sprite = G.animalSprite || null; }   // v0.9.3 會走動的動物（黃牛）
    // v0.9.3 B14：旅店老闆的稱呼以 SPEAKERS 為準（例：「樹屋旅店老闆」）；v0.9.4 圖依老闆性別選（MapInfo.innKeeperSprite）
    else if (who === '__inn') { name = J.MapInfo.innKeeperName(G.mapScene && G.mapScene.map, G.data.dialogs, SP); sprite = J.MapInfo.innKeeperSprite(G.mapScene && G.mapScene.map, G.data.dialogs, window.VOICES, J.Assets.has); }
    else if (/^inn_/.test(who) && !G.npcIndex[who]) { sprite = J.MapInfo.innSpeakerSprite(who, window.VOICES, J.Assets.has); }   // v0.9.4 審查：頭像和地圖上的老闆同性別
    else if (G.npcIndex[who]) { sprite = G.npcIndex[who].npc.sprite; name = name || G.npcIndex[who].npc.name || who; }
    else if (G.data.monsters[who]) { sprite = G.data.monsters[who].sprite; name = name || G.data.monsters[who].name; }
    if (name === null) name = who;
    if (J.Family && G.state) name = J.Family.fill(name, G.state);   // 整合2：c01_family 的 {family}
    return { name: J.UI.fill(name, G.state && G.state.player.name), sprite: sprite };
  };

  /** 播放 dialogs.js 的一段對話；找不到時用 fallback 句子 */
  G.say = function (id, fallback) {
    var D = G.data.dialogs || {};
    var lines = (id && D[id]) || fallback || [];
    G.busy = true;
    var s = G.state.settings;
    return J.UI.dialog(lines, {
      speaker: G.speaker, playerName: G.state.player.name, playerGender: G.state.player.gender, taigiSub: s.taigiSub,
      tts: s.tts !== false, voiceAuto: s.voiceAuto !== false, dialogId: (id && D[id]) ? id : null
    }).then(function () { G.busy = false; if (id && D[id] && J.Puzzle) G.dialogDone(id); });
  };

  /** 職業公會所在地圖的名字（jobs.js 的 JOB_RULES.change_map） */
  G.jobMapName = function () {
    var id = G.data.jobRules && G.data.jobRules.change_map;
    return (id && G.data.maps[id] && G.data.maps[id].name) || '城裡';
  };
  /** 升到轉職等級時的提示。勇者大冒險II：台北切片沒有轉職地點（JOB_RULES.places 是空的，GDD 7.2 B6）→ 說第 2 期才開放 */
  G.jobUnlockText = function () {
    if (!((G.data.jobRules || {}).places || []).length) return '見習冒險者 10 級了！轉職的地方還在準備中，之後的冒險才會開放。';
    var shrine = Object.keys(G.data.maps).filter(function (k) { return G.data.maps[k].statue; })[0];
    var shrineName = shrine ? (G.data.maps[shrine].name || '神像') : null;
    return shrineName ? '可以考立志小考了！到' + shrineName + '的神像前，或' + G.jobMapName() + '的職業公會都可以，考過就能轉職。' : '可以到' + G.jobMapName() + '的職業公會考立志小考了！';
  };
  /** 有燈（maps.js 的 lamps）的地圖名字（四年級切片沒有燈；保留給選單用） */
  G.lampMapName = function () {
    var ids = Object.keys(G.data.maps).filter(function (k) { return G.data.maps[k].lamps; });
    return ids.length ? G.data.maps[ids[0]].name : '村子';
  };

  // 勇者大冒險II（GDD 7.3 C14）：地圖有填 exp_coef 就用它，沒填照 level 的係數
  G.coef = function (mapId) { var m = G.data.maps[mapId || (G.mapScene && G.mapScene.mapId)]; return J.World.coefFor(m || null); };

  /** 答對後：升級、補滿、提示 */
  G.afterReward = function (levels) {
    G.refreshHud();
    if (levels > 0) {
      J.Character.onLevelUp(G.state, G.data);
      G.jingle('levelup', null, 'levelup');
      J.UI.banner('等級提升！現在是 ' + G.state.player.level + ' 級');
      var unlock = (G.data.jobRules && G.data.jobRules.unlock_level) || 10;
      // v1.0：只有見習冒險者升到 10 級時提示（轉職後職業等級從 1 開始，再升到 10 級不用再提示）
      if (G.state.player.job === 'novice' && G.state.player.level >= unlock && G.state.player.level - levels < unlock) J.UI.toast(G.jobUnlockText(), 5000);
      G.refreshHud();
    }
  };

  // ---------------------------------------------------------------- 地圖
  G.onMapReady = function (scene) {
    G.mapScene = scene;
    G.mapReadyCount = (G.mapReadyCount || 0) + 1;   // v0.9.5 慈護宮轉職：等轉職後重新開始的場景好了再放光芒
    // v0.9.5 從別張地圖「走進來」才算進廟（轉職換走路圖時同一張地圖重新開始，不再介紹一次）
    var enteredMap = G.lastReadyMap !== scene.mapId;
    G.lastReadyMap = scene.mapId;
    G.mapChanging = 0;
    if (G.pendingChange) { var pc = G.pendingChange; G.pendingChange = null; setTimeout(function () { G.changeMap(pc[0], pc[1], pc[2], pc[3]); }, 0); }
    if (G.pendingLevelUp > 0) { var plv = G.pendingLevelUp; G.pendingLevelUp = 0; setTimeout(function () { G.afterReward(plv); }, 800); }
    var st = G.state, map = scene.map;
    st.location = { map: scene.mapId, x: scene.p.tx, y: scene.p.ty };
    var firstVisit = !st.visited[scene.mapId];   // v0.9.6 這份存檔第一次來這張地圖（慈護宮介紹只播一次）
    st.visited[scene.mapId] = true;
    J.Curriculum.visit(st, scene.mapId);   // 勇者大冒險II：記下走到路線第幾張（progress.maxRoute）
    if (map.inn) {
      var w = function (x, y) { return scene.walkable(x, y); };
      var spot = w(map.inn.x, map.inn.y + 1) ? { c: map.inn.x, r: map.inn.y + 1 } : J.Pathfind.nearestWalkable(w, scene.size.w, scene.size.h, { c: map.inn.x, r: map.inn.y }, null);
      if (spot) J.Character.setInn(st, scene.mapId, spot.c, spot.r);
    }
    // v0.9.3 地名＋建議等級「擎天草原 Lv1–4」。v0.9.6（47 號 B06）同一張地圖重新開始（轉職換走路圖）不再跳地名，免得蓋住轉職的光芒
    if (enteredMap) J.HUD.mapBanner(J.MapInfo.nameWithLevel(map, scene.mapId));
    G.bgm(J.MapInfo.bgmFor(map));
    if (J.Minimap) J.Minimap.attach(G, scene);
    G.refreshHud();
    G.save();
    // 整合3（審查 M-2）：讀檔、進地圖時補跑迷宮委託檢查（機關解開後還沒播完對話就關分頁 → 讀檔時把該完成的 M5 補完）
    if (J.Puzzle && Object.keys(G.data.quests).some(function (id) { var q = G.data.quests[id]; return q.kind === 'maze' && J.QuestLog.canComplete(st, G.data.quests, id, G.data); })) {
      var mzScene = scene;
      setTimeout(function () { if (G.mapScene === mzScene && !G.blocked()) G.checkMaze(mzScene); }, 700);
    }
    // v0.9.5 進廟（MT1：有神像的室內地圖）時，廟公介紹慈護宮
    // （場景物件換地圖時會重用：要確認 0.5 秒後還在同一張地圖、沒有正在換圖）
    // v0.9.6（47 號觀察 1、CTO）每份存檔只在第一次進廟時介紹；之後只有地名橫幅，要聽介紹可以面對正殿裡的廟公說話
    if (map.type === 'interior' && map.statue && enteredMap && firstVisit && !G.pendingIntro) {
      var introMap = scene.mapId;
      setTimeout(function () { if (G.mapScene === scene && scene.mapId === introMap && !scene.transitioning && !G.mapChanging && !G.blocked()) G.templeIntro(scene); }, 500);
    }
    if (G.pendingTrialQuit && G.pendingTrialQuit.length) {
      var quit = G.pendingTrialQuit; G.pendingTrialQuit = null;
      var PET = ((G.data.jobRules || {}).trial_dialogs || {}).pet || {};
      setTimeout(function () { G.say(PET.quit || 'D_TRIAL_QUIT_PET', [{ who: 'pet', text: '上次小考中途離開，也算考一次喔。明天再一起加油！' }]); }, 600);
      G.trialQuitShown = quit;   // 測試用
    }
    if (G.pendingIntro && window.WORLD && Array.isArray(window.WORLD.opening)) {
      // BQ2 v0.6 整合（劇本第 1 節步 0–1）：家門口過場（D_C01_HOME）→ 進 TI1 的到達對話（D_C01_NPM_ARRIVE）→ 去展櫃前（觸發 D_C01_THEFT）
      G.pendingIntro = false;
      var opScene = scene, opCover = null;
      // 整合4 D-16：家門口是過場、不用地圖——黑底蓋住 TI1，選稱呼＋D_C01_HOME 播完再淡入（減少動態效果時直接切換；出錯也會拿掉黑底）
      J.Family.playOpening(function () { opCover = G.openingCover(opScene); },
        function () { return new Promise(function (r) { setTimeout(r, 400); }).then(function () { return G.askFamily().then(function () { return G.sayChain(window.WORLD.opening); }); }); },   // 整合2：先選家人稱呼（步 0），再播家門口
        function () { return null; },
        function () { G.openingReveal(opScene, opCover); opCover = null; })
        .then(function () {
          J.Family.openingDone(st); G.save();   // 整合6：過場真的播完才記「看過開場」
          if (G.mapScene !== opScene) return null;
          var ids = firstVisit || !st.flags || !st.flags['_dlg:D_C01_NPM_ARRIVE'] ? (map.arrive_dialogs || []) : [];
          return G.sayChain(ids);
        }, function (e) { console.warn('[開場] 過場出錯，直接顯示地圖：', e); });
    } else if (G.pendingIntro) {
      G.pendingIntro = false;
      // 第三批（劇本委託表 Q4_TUT_1）：新遊戲 → D_INTRO（旁白）→ D_Q4_TUT_1A（阿哲帶進場）→ 去服務台找小雯姊姊
      var introQ = Object.keys(G.data.quests).map(function (k) { return G.data.quests[k]; }).filter(function (q) { return q.dialog_intro && q.map === scene.mapId && !(q.requires || []).length; })[0];
      setTimeout(function () {
        G.say('D_INTRO', [{ who: 'narrator', text: '今年，全臺家鄉博覽會要在台北舉行。' }])
          .then(function () { return introQ ? G.say(introQ.dialog_intro, []) : null; })
          .then(function () { J.UI.toast('找頭上有「！」的人說話吧！', 4000); });
      }, 400);
    } else G.arriveDialogs(scene, firstVisit);
  };

  /** 整合4 D-16：開場黑底（畫在地圖最上層、跟著畫面不跟鏡頭；對話框是 DOM，在它上面） */
  G.openingCover = function (scene) {
    if (!scene || !scene.add) return null;
    var W = C.VIEW_W, H = C.VIEW_H;
    G.openingCoverShown = (G.openingCoverShown || 0) + 1;   // 測試用
    // 過場期間也不露出地點：收起 HUD（含小地圖）、拿掉剛跳出的地名橫幅；拿掉黑底時再放回來
    J.HUD.show(false);
    Array.prototype.forEach.call(document.querySelectorAll('.map-banner'), function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    return scene.add.rectangle(-W, -H, W * 4, H * 4, 0x000000, 1).setOrigin(0, 0).setScrollFactor(0).setDepth(70000);
  };
  G.openingReveal = function (scene, cover) {
    J.HUD.show(true);
    if (!cover || !cover.scene) return;
    if (scene && scene.map) J.HUD.mapBanner(J.MapInfo.nameWithLevel(scene.map, scene.mapId));
    var pr = false; try { pr = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { pr = false; }
    var ms = J.Family.openingFadeMs(G.state && G.state.settings, pr);
    G.openingRevealMs = ms;   // 測試用
    if (!ms) { cover.destroy(); return; }
    scene.tweens.add({ targets: cover, alpha: 0, duration: ms, onComplete: function () { cover.destroy(); } });
  };

  /** 連續播好幾段對話（id 陣列） */
  G.sayChain = function (ids) {
    var p = Promise.resolve();
    (ids || []).forEach(function (id) { p = p.then(function () { return G.say(id, []); }); });
    return p;
  };

  /**
   * 第三批：到達地圖時的台詞——搭捷運到站（G.pendingArrive，例：D_MRT_ARRIVE_T02），
   * 第一次來這張地圖時 maps.js 的 arrive_dialogs（例：D_T02_ARRIVE → D_NODE_OPEN_T02）。播完檢查阿咕的委託能不能自動完成
   */
  G.arriveDialogs = function (scene, firstVisit) {
    var ids = [];
    if (G.pendingArrive) { if (G.data.dialogs[G.pendingArrive]) ids.push(G.pendingArrive); G.pendingArrive = null; }
    if (firstVisit && Array.isArray(scene.map.arrive_dialogs)) ids = ids.concat(scene.map.arrive_dialogs);
    G.lastArrive = { map: scene.mapId, ids: ids.slice() };   // 測試用
    var mapId = scene.mapId;
    setTimeout(function () {
      if (G.mapScene !== scene || scene.mapId !== mapId || G.blocked()) return;
      G.sayChain(ids).then(function () { return G.checkAguAuto(scene); });
    }, ids.length ? 450 : 0);
  };

  G.changeMap = function (to, x, y, facing) {
    if (!G.data.maps[to]) { console.warn('[地圖] 不存在：' + to); return; }
    J.UI.closePassMove();   // v0.9.3 開著放大地圖走到出口：換地圖前把舊地圖關掉
    G.state.location = { map: to, x: x, y: y };
    G.save();
    var sc = G.mapScene;
    // 上一次換地圖還沒完成（場景重新開始、圖檔還在載入）：等它好了（onMapReady）再換，避免同一張圖被兩個載入器同時載入
    if (G.mapChanging && Date.now() - G.mapChanging < 20000) { G.pendingChange = [to, x, y, facing]; return; }
    if (sc && sc.load && sc.load.isLoading && sc.load.isLoading()) { G.pendingChange = [to, x, y, facing]; return; }
    G.mapChanging = Date.now();
    sc.scene.restart({ mapId: to, x: x, y: y, facing: facing });
  };

  // ---------------------------------------------------------------- 鍵盤與方向
  G.bindKeys = function () {
    var MAP = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right' };
    window.addEventListener('keydown', function (e) {
      var tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      // v0.9.3 放大地圖（passMove 視窗）開著時方向鍵照樣能走；其他視窗開著時不動
      if (J.UI.blocksMove()) return;
      if (MAP[e.key]) { G.setHeld(MAP[e.key], true); e.preventDefault(); }
      else if (J.UI.isOpen()) return;
      else if (G.isActionKey(e.key, tag)) {
        if (G.mapScene && G.state) { e.preventDefault(); G.mapScene.actionKey(); }
      }
    });
    window.addEventListener('keyup', function (e) { if (MAP[e.key]) G.setHeld(MAP[e.key], false); });
    window.addEventListener('blur', function () { G.held = {}; G.heldOrder = []; });
  };
  /**
   * v0.9.6（47 號 B01）哪些按鍵是「對話、調查」：Z 一律是（不管焦點停在哪個按鈕上）；
   * 空白鍵、Enter 在焦點停在按鈕上時讓給那個按鈕（用鍵盤 Tab 到按鈕的人要能按它），其他時候也是對話。
   * 用滑鼠點過的 HUD 按鈕會自動失去焦點（hud.js、dom.js），所以空白鍵、Enter 不會再重新打開背包。
   */
  G.isActionKey = function (key, tag) {
    if (key === 'z' || key === 'Z') return true;
    return (key === ' ' || key === 'Enter') && tag !== 'BUTTON';
  };
  G.setHeld = function (d, on) {
    G.held[d] = on;
    G.heldOrder = G.heldOrder.filter(function (x) { return x !== d; });
    if (on) G.heldOrder.push(d);
  };
  /**
   * 現在要往哪裡走：搖桿優先（8 方向）；鍵盤只按一個鍵＝那個方向，
   * v1.0.6 同時按住一個垂直鍵和一個水平鍵＝斜走（例如 ↑＋→、W＋D；規則在 systems/move8.js）
   */
  G.heldDir = function () {
    if (G.joy.dir) return G.joy.dir;
    return J.Move8.heldDir(G.held, G.heldOrder);
  };
  /** 移動速度倍率：搖桿推越遠走越快（0.7～1.25 倍）；鍵盤、點擊是 1 倍 */
  G.moveSpeed = function () {
    if (!G.joy.dir) return 1;
    return 0.55 + 0.7 * Math.max(0, Math.min(1, G.joy.force));
  };

  // ---------------------------------------------------------------- NPC 與委託
  function npcRole(npc, map) {
    if (npc.virtual) return { role: 'inn', info: map.inn };
    if (map.inn && map.inn.npc === npc.id) return { role: 'inn', info: map.inn };
    if (map.shop && map.shop.npc === npc.id) return { role: 'shop', info: map.shop };
    var ex = (map.extra_shops || []).filter(function (s) { return s.npc === npc.id; })[0];
    if (ex) return { role: 'shop', info: ex };
    if (npc.id === ((G.data.jobRules && G.data.jobRules.change_npc) || 'guild')) return { role: 'guild' };
    if (npc.role === 'travel' || npc.travel) return { role: 'travel' };
    if (npc.sage) return { role: 'sage' };   // 勇者大冒險II 賢者（老闆裁示第 10 條）
    if (npc.mrt || npc.mrt_stations) return { role: 'mrt' };     // 第三批：站務員（和他說話也能搭捷運；GDD 7.3 C8 的接口）
    return { role: 'quest' };
  }
  function questIds(npc) { return npc.quests && npc.quests.length ? npc.quests : (npc.quest ? [npc.quest] : []); }

  /** NPC 頭上的記號：'bang'（有新委託）、'ready'（可以回報）、null */
  G.npcMarker = function (npc) {
    if (npc.virtual) return null;
    var f = J.QuestLog.forNpc(G.state, G.data.quests, npc.id, questIds(npc));
    if (!f) return null;
    if (f.status === 'available') return 'bang';
    var q = G.data.quests[f.id];
    if (J.QuestLog.canComplete(G.state, G.data.quests, f.id, G.data)) return 'ready';
    if ((q.kind || 'help') === 'help') return 'bang';
    return null;
  };

  /**
   * v0.9.5（老闆 2026-10-11）：金包里慈護宮正殿（MT1）的媽祖神像也能轉職——和職業公會同一套流程（J.Menus.guild）、同樣的等級條件，
   * 轉職時加上祝福光芒（MapScene.blessFx）。職業公會先保留（等老闆決定）。
   */
  G.shrineJob = function (scene) {
    if (G.blocked()) return;
    G.shrineLog = (G.shrineLog || 0) + 1;   // 測試用
    G.jobPlace('temple');
  };

  /**
   * v1.0 第一批（48 號 1.5、2.4、第 4 節；35 號第十二節）：慈護宮神像（temple，廟公）、府城職業公會（guild，公會導師）規則一樣。
   * 見習還不到 10 級、也沒有以前當過的職業 → locked 台詞。其他 → 轉職清單：
   *   換回以前當過的（back）：D_JOB_BACK → 換；小考通過過的（change）：D_JOB_LV1 → 換；
   *   立志小考（trial）：今天考過沒通過 → D_TRIAL_AGAIN；剩不到 15 分鐘 → 提醒；可以考 → D_TRIAL_INTRO → 20 題 →
   *     通過：D_TRIAL_PASS → D_JOB_LV1 → 轉職（光芒、換裝、存檔；慈護宮再播 D_TEMPLE_BLESS、D_TEMPLE_JOB_DONE）；
   *     沒通過：D_TRIAL_FAIL → 結果畫面（答錯的單元）→ D_TRIAL_FAIL_PET。
   */
  G.jobPlace = function (place) {
    if (G.blocked()) return Promise.resolve();
    var st = G.state, R = G.data.jobRules || {}, TD = (R.trial_dialogs || {})[place] || {}, PET = (R.trial_dialogs || {}).pet || {};
    var need = (R.master_level && R.master_level.novice) || R.unlock_level || 10;
    var held = Object.keys(st.player.jobs || {}).some(function (j) { return j !== st.player.job; });
    G.jobPlaceLog = (G.jobPlaceLog || []).concat([place]);   // 測試用
    if (J.JobTrial.noviceLevel(st) < need && !held) {
      return G.say(TD.locked || (place === 'guild' ? 'D_GUILD_IDLE' : 'D_TEMPLE_LOCKED'), [{ who: place === 'guild' ? 'guild' : 'temple_keeper', text: '見習冒險者到 ' + need + ' 級，就能來考立志小考喔。' }]);
    }
    var intro = place === 'guild' ? G.say(R.dialog_open || 'D_GUILD_JOB', []) : Promise.resolve();
    return intro.then(function () {
      J.Menus.guild(G, { place: place, title: place === 'guild' ? '⚔️ 職業公會' : '✨ 神像前・轉職', label: place === 'guild' ? '職業公會' : '神像前轉職',
        onPick: function (jobId, kind) { G.jobPick(place, jobId, kind); } });
    });
  };

  /** 轉職清單上按了某個職業 */
  G.jobPick = function (place, jobId, kind) {
    var st = G.state, D = G.data, R = D.jobRules || {}, TD = (R.trial_dialogs || {})[place] || {}, PET = (R.trial_dialogs || {}).pet || {};
    var who = place === 'guild' ? 'guild' : 'temple_keeper', name = D.jobs[jobId].name;
    if (kind === 'back') return G.say(TD.back, [{ who: who, text: '以前當過「' + name + '」，免費換回去！' }]).then(function () { return G.doJobChange(place, jobId); });
    if (kind === 'change') return G.say(TD.lv1, [{ who: who, text: '換了職業，等級會從 1 開始，能力有保底，不用擔心。' }]).then(function () { return G.doJobChange(place, jobId); });
    var c = J.JobTrial.canStart(st, jobId, D, Date.now());
    if (!c.ok) {
      if (c.reason === 'today') return G.say(TD.again, [{ who: who, text: '今天已經考過了，明天再來喔！' }]);
      if (c.reason === 'time') return G.say(null, [{ who: 'pet', text: '今天只剩 ' + c.minutes + ' 分鐘，考不完的。明天精神飽滿再來考吧！' }]);
      return Promise.resolve();
    }
    return G.say(TD.intro, [{ who: who, text: '立志小考有 20 題，答對 16 題就通過。' }]).then(function () {
      return J.TrialUI.run(G, jobId, place);
    }).then(function (res) {
      G.lastTrial = res;   // 測試用
      if (!res) { J.UI.toast('題目還在準備中，先去冒險吧！'); return; }
      if (res.pass) {
        return G.say(TD.pass, [{ who: who, text: '恭喜你，立志小考過關了！' }])
          .then(function () { return G.say(TD.lv1, [{ who: who, text: '換了職業，等級會從 1 開始，能力有保底，不用擔心。' }]); })
          .then(function () { return G.doJobChange(place, jobId); });
      }
      return G.say(TD.fail, [{ who: who, text: '這次還沒過，沒關係。明天可以再來考。' }])
        .then(function () { return G.say(PET.fail || 'D_TRIAL_FAIL_PET', [{ who: 'pet', text: '我們去做委託、開寶箱多練習，明天再來！' }]); });
    });
  };

  /** 轉職：換職業（自動換裝）→ 換主角圖 → 光芒 → 慈護宮的祝福台詞；回傳 Promise */
  G.doJobChange = function (place, jobId) {
    var st = G.state, D = G.data, R = D.jobRules || {};
    var r = J.Character.changeJob(st, jobId, D);
    if (!r.ok) return Promise.resolve(r);
    J.Audio.play('levelup');
    J.UI.toast('轉職成「' + D.jobs[jobId].name + '」了！' + (r.back ? '（等級 ' + st.player.level + '）' : '等級從 1 開始。'), 4000);
    if (r.gear && r.gear.on.length) setTimeout(function () { J.UI.toast('換上了' + r.gear.on.map(function (id) { return (D.items[id] || {}).name || id; }).join('、') + '！', 3500); }, 600);
    G.lastJobChange = { job: jobId, back: r.back, gear: r.gear, place: place };   // 測試用
    G.onJobChanged();
    G.save();
    return new Promise(function (resolve) {
      // 轉職會重新開始地圖場景（換主角的走路圖）：等場景好了再放光芒；先讓孩子看到光芒（約 1 秒）再說話
      G.busy = true;
      var tries = 0, ready0 = G.mapReadyCount || 0;
      (function waitScene() {
        var sc = G.mapScene;
        if (((G.mapReadyCount || 0) <= ready0 || !sc || !sc.p) && tries++ < 60) { setTimeout(waitScene, 100); return; }
        if (sc && sc.blessFx && sc.p) sc.blessFx();
        setTimeout(function () {
          G.busy = false;
          var p = place === 'temple' ? G.say(R.temple_bless || 'D_TEMPLE_BLESS', [{ who: 'narrator', text: '這是你自己努力得來的！' }])
            .then(function () { return G.say(R.temple_done || 'D_TEMPLE_JOB_DONE', [{ who: 'pet', text: '新職業也要五科一起加油喔！' }]); }) : Promise.resolve();
          p.then(function () { G.save(); resolve(r); });
        }, 1000);
      })();
    });
  };

  /** v0.9.5 進廟（有神像的室內地圖）時廟公介紹：D_TEMPLE_INTRO */
  G.templeIntro = function (scene) {
    var R = G.data.jobRules || {};
    G.templeIntroLog = (G.templeIntroLog || 0) + 1;   // 測試用
    return G.say(R.temple_intro || 'D_TEMPLE_INTRO', [{ who: 'narrator', text: '這裡可以轉職。' }]);
  };

  /**
   * v0.9.6（47 號 B02）旅店、商店老闆也有委託時：可以回報就先回報；其他情形（有新委託、委託進行中）讓孩子選
   * 「住宿／買賣東西」或「委託」。回傳 'service'｜'quest'｜'ask'（純判斷，node 測試用）
   */
  G.serviceChoice = function (role, f, canComplete) { return J.QuestLog.serviceChoice(role, f, canComplete); };

  G.talkTo = function (npc, scene, opts) {
    if (G.blocked()) return;
    opts = opts || {};
    if (J.Puzzle && !opts.v06done && G.v06Talk(npc, scene, opts)) return;   // v0.6：多步驟「找某人說話」、推理、時光機關選單
    var map = scene.map, st = G.state, Q = G.data.quests;
    var r = npcRole(npc, map);
    var ids = questIds(npc);
    var f = ids.length ? J.QuestLog.forNpc(st, Q, npc.id, ids) : null;
    // 旅店、商店老闆如果也有委託：可以回報就先回報，不然讓孩子選（v0.9.6 B02：委託沒做完也能住宿、買東西）
    if (f && r.role !== 'quest' && !opts.service) {
      var how = opts.quest ? 'quest' : G.serviceChoice(r.role, f, f.status === 'active' && J.QuestLog.canComplete(st, Q, f.id, G.data));
      if (how === 'ask') {
        var qq = Q[f.id];
        G.lastChoice = { npc: npc.id, role: r.role, quest: f.id };   // 測試用
        J.UI.choose(G.speaker(npc.id).name + '：要做什麼呢？', [
          { value: 'service', text: r.role === 'inn' ? '🛏️ 住宿' : '🛒 買賣東西', primary: true },
          { value: 'quest', text: (f.status === 'available' ? '📜 聽委託' : '📜 委託「' + qq.title + '」') }
        ]).then(function (v) {
          if (v === 'service') G.talkTo(npc, scene, { service: true });
          else if (v === 'quest') G.talkTo(npc, scene, { quest: true });
        });
        return;
      }
      if (how === 'quest') r = { role: 'quest' };
    }
    if (opts.service) f = null;
    if (r.role === 'inn') { G.say(J.MapInfo.innDialog(map, npc), [{ who: npc.id, text: '歡迎！休息一下，體力就會全滿喔。' }]).then(function () { J.Menus.inn(G, scene.mapId, r.info, npc.id).then(function (ok) { if (ok) G.innRest().then(function () { G.say('D_INN_REST', []); }); }); }); return; }
    if (r.role === 'shop') { G.say(npc.dialog, []).then(function () { J.Menus.shop(G, r.info.shop_id || 'general'); }); return; }
    if (r.role === 'travel') { G.say(npc.dialog, [{ who: npc.id, text: '要搭車去哪裡呢？' }]).then(function () { G.openWorldMap(); }); return; }
    if (r.role === 'guild') { G.jobPlace('guild'); return; }   // v1.0：和慈護宮同一套（立志小考）
    if (r.role === 'sage' && !(f && (f.status === 'active' || f.status === 'available'))) { G.sageTalk(npc, scene); return; }
    if (r.role === 'mrt' && !(f && (f.status === 'active' || f.status === 'available'))) { G.mrtTalk(npc, scene); return; }
    if (f && f.status === 'active') {
      var q = Q[f.id];
      if (J.QuestLog.canComplete(st, Q, f.id, G.data)) { G.completeQuest(f.id, scene); return; }
      if ((q.kind || 'help') === 'help') {
        var p = J.QuestLog.progress(st, Q, f.id, G.data);
        J.UI.confirm('「' + q.title + '」：' + p.text + '。要繼續幫忙嗎？', '繼續幫忙', '等一下').then(function (y) { if (y) G.runHelp(f.id, npc, scene); });
        return;
      }
      G.say(null, [{ who: npc.id, text: q.goal || q.title }]).then(function () { J.UI.toast('進度：' + J.QuestLog.progress(st, Q, f.id, G.data).text, 3500); });
      return;
    }
    if (f && f.status === 'available' && Q[f.id].kind === 'talk' && !(Q[f.id].steps || []).length) { G.talkQuest(f.id, npc, scene); return; }   // 第三批：0 題、只對話（Q4_T01_4）
    if (f && f.status === 'available') {
      var q2 = Q[f.id];
      G.say(q2.dialog_start, [{ who: npc.id, text: q2.goal || q2.title }]).then(function () {
        J.QuestLog.accept(st, Q, f.id);
        J.Audio.play('select');
        J.UI.toast('接下委託：「' + q2.title + '」', 3500);
        G.save();
        scene.refreshMarkers();
        if (scene.refreshGates) scene.refreshGates();
        if (q2.dialog_accept_after) { G.say(q2.dialog_accept_after, []); return; }   // 整合：接下後接著播（M5 鐵柵打開 → 坑道口知識卡）
        if ((q2.kind || 'help') === 'help') G.runHelp(f.id, npc, scene);
        else if (q2.kind === 'boss') { J.UI.toast('目標：' + (q2.goal || ''), 5000); G.respawnBosses(); }
        else if (J.QuestLog.canComplete(st, Q, f.id, G.data)) G.completeQuest(f.id, scene);
      });
      return;
    }
    var locked = J.QuestLog.firstLocked(st, Q, ids);
    var lq = locked && Q[locked];
    // 整合：dialog_locked_tail＝只播這段對話的最後幾句（M1 開放前陳館長只說 NPM_ARRIVE 最後一句）
    if (lq && lq.dialog_locked && lq.dialog_locked_tail && (G.data.dialogs || {})[lq.dialog_locked]) { G.say(null, G.data.dialogs[lq.dialog_locked].slice(-lq.dialog_locked_tail)); return; }
    G.say(lq && lq.dialog_locked ? lq.dialog_locked : G.idleDialog(npc), [{ who: npc.id, text: '你好呀，' + st.player.name + '！' }]);
  };

  /** 第三批：NPC 平常的台詞；dialog_done 的委託完成後換一句（結局後的閒聊，例：D_DIRECTOR_IDLE_END） */
  G.idleDialog = function (npc) {
    var dd = npc.dialog_done, da = npc.dialog_active;
    if (dd && dd.quest && dd.dialog && J.QuestLog.status(G.state, G.data.quests, dd.quest) === 'done') return dd.dialog;
    // 整合2：dialog_active＝那個委託進行中時換一句（例：M6 進行中布攤阿姨說 D_C01_CLOTH_CLUE）
    if (da && da.quest && da.dialog && J.QuestLog.status(G.state, G.data.quests, da.quest) === 'active') return da.dialog;
    return npc.dialog;
  };

  /** 第三批：0 題、只對話的委託（Q4_T01_4 蓋章）：開場對話 → 完成前的事（海圖預告接口、D_CHART_PREVIEW_B）→ 完成（獎勵、片尾） */
  G.talkQuest = function (id, npc, scene) {
    var st = G.state, Q = G.data.quests, q = Q[id];
    return G.say(q.dialog_start, [{ who: npc.id, text: q.goal || q.title }]).then(function () {
      J.QuestLog.accept(st, Q, id);
      G.save();
      var pc = q.pre_complete || {};
      return (pc.chart ? G.chartPreview(pc.chart) : Promise.resolve()).then(function () { return pc.dialog ? G.say(pc.dialog, []) : null; });
    }).then(function () { return G.completeQuest(id, scene); });
  };

  /**
   * 勇者大冒險II 賢者教學（老闆裁示第 10 條；第三批照劇本：北投圖書館的方爺爺）。
   * 第一次見面：D_SAGE_MEET → D_SAGE_LIBRARY。之後選一課：開場（lesson.dialogs.a）→ 教學卡 → 1 題示範 → b → 小測驗（test_n 題，
   * 每題第一次就答對才算）→ 全對＝學會（state.sage.learned；這個主題的超綱題才進出題池）＋ pass 台詞；沒全對＝retry 台詞，下次再來。
   * 能教的課＝走到最遠那張地圖已開放的節點（Curriculum.lessonsOpen；走到 T03 以後回來才能學「取概數」）。
   */
  G.sageTalk = function (npc, scene) {
    var st = G.state, F = G.flags(), name = G.speaker(npc.id).name;
    // 整合：台北章方爺爺第一次見面是 D_C01_SAGE_MEET（npcs[].dialogs_extra）；切片的 D_SAGE_MEET／D_SAGE_LIBRARY 已停用（劇本 4.2）
    var meetIds = (npc.dialogs_extra && npc.dialogs_extra.length) ? npc.dialogs_extra : ['D_SAGE_MEET', 'D_SAGE_LIBRARY'];
    var meet = F.sageMet ? Promise.resolve() : G.sayChain(meetIds).then(function () { F.sageMet = Date.now(); G.save(); });
    return meet.then(function () {
      var all = J.Curriculum.lessonsOpen(npc, st);
      if (!all.length) return G.say(G.idleDialog(npc), [{ who: npc.id, text: '你好呀，' + st.player.name + '！' }]);
      var todo = all.filter(function (l) { return !J.Curriculum.sageLearned(st, l.id); });
      var list = (todo.length ? todo : all).map(function (l, i) { return { value: l.id, text: '📜 ' + l.title + (J.Curriculum.sageLearned(st, l.id) ? '（學過了）' : ''), primary: i === 0 }; });
      var msg = todo.length ? name + '：想學哪一課？' : name + '：每一課都學會了！要再複習哪一課？';
      return J.UI.choose(msg, list).then(function (id) {
        var lesson = all.filter(function (l) { return l.id === id; })[0];
        if (!lesson) return G.say(G.idleDialog(npc), []);
        return G.sageLesson(npc, lesson, scene);
      });
    });
  };

  /** 方爺爺的一課（回傳 Promise<{ok, pass, test}>） */
  G.sageLesson = function (npc, lesson, scene) {
    var st = G.state, name = G.speaker(npc.id).name, D = lesson.dialogs || {};
    var before = J.Curriculum.sageLearned(st, lesson.id);
    G.lastSage = { lesson: lesson.id, ok: false, pass: false };   // 測試用
    return G.say(D.a || 'D_SAGE_LESSON_A', []).then(function () { return J.TeachUI.sageLesson(lesson, name); }).then(function (ok) {
      G.lastSage.ok = ok;
      if (!ok) { J.UI.toast('下次再來聽完吧！', 3000); return G.lastSage; }
      return G.say(D.b || 'D_SAGE_LESSON_B', []).then(function () { return G.sageTest(lesson, npc, scene); }).then(function (res) {
        G.lastSage.test = res;
        if (!res || !res.pass) return G.say(D.retry || 'D_SAGE_LESSON_RETRY', []).then(function () { return G.lastSage; });
        J.Curriculum.learnSage(st, lesson.id, Date.now());
        G.lastSage.pass = true;
        G.save();
        return G.say(D.pass || 'D_SAGE_LESSON_PASS', []).then(function () { if (!before) J.UI.toast('學會「' + lesson.title + '」了！冒險中會出現這種題目。', 4000); return G.lastSage; });
      });
    });
  };

  /**
   * 方爺爺的小測驗：這一課的超綱題（beyond_topic）出 test_n 題（題庫不夠就出有的），範圍＝走到最遠那張地圖。
   * 學會之前也能出（Session 的 sageTopic）；不觸發阿咕陪看。每題第一次就答對才算過；中途離開＝沒過。
   */
  G.sageTest = function (lesson, npc, scene) {
    var st = G.state, mapId = J.Curriculum.furthestMap(st), name = G.speaker(npc.id).name;
    var pool = J.Curriculum.lessonQuestions(G.questions, st, lesson.id, mapId);
    var n = Math.min(lesson.test_n || 2, pool.length), res = { pass: n > 0, asked: 0, correct: 0, need: n };
    if (!n) return Promise.resolve(res);
    var sess = J.Session.create(st, G.questions, pool[0].subject, {
      mode: 'free', expMult: G.coef(scene.mapId), mapId: mapId, allowSwitch: false, noRepeat: true,
      sageTopic: lesson.id, noCompanion: true, filter: function (x) { return x.beyond_topic === lesson.id; }
    });
    return new Promise(function (resolve) {
      (function ask(i) {
        if (i >= n) { resolve(res); return; }
        var qq = J.Session.next(sess, Date.now(), {});
        if (!qq) { if (!res.asked) res.pass = false; resolve(res); return; }
        res.asked++;
        J.Quiz.ask({
          session: sess, mode: 'help', state: st, title: name + '的小測驗', subtitle: (i + 1) + '/' + n + '・' + lesson.title, speaker: name,
          onSave: function () { G.save(); },
          onRewards: function (r) { G.refreshHud(); if (r) G.afterReward(r.levelsGained); },
          onDone: function (r) {
            if (r.left) { res.pass = false; res.left = true; resolve(res); return; }
            if (r.correct && sess.wrongCount === 0) res.correct++; else res.pass = false;
            G.save();
            ask(i + 1);
          }
        });
      })(0);
    });
  };

  // ---------------------------------------------------------------- 第三批：阿咕的委託、捷運、柵門、告示牌、集章冊與海圖的接口
  /** 存檔裡的劇情旗標（第一次搭捷運、捷運謎題解開、見過方爺爺、看過教學卡按鈕說明…） */
  G.flags = function () { var st = G.state; if (!st.flags || typeof st.flags !== 'object') st.flags = {}; return st.flags; };
  G.isDone = function (id) { return J.QuestLog.status(G.state, G.data.quests, id) === 'done'; };

  /** 阿咕的委託（giver "agu"；阿咕跟在主角身邊）：進行中 > 可接 > null */
  G.aguQuest = function () { return G.state ? J.QuestLog.forNpc(G.state, G.data.quests, 'agu', null) : null; };
  /** 阿咕頭上的記號：'bang'（可接、答題委託進行中）、'ready'（可以回報）、null */
  G.aguMarker = function () {
    if (J.Puzzle) return null;   // BQ2 v0.6 前端B（v2 第五節）：阿咕頭上不再冒「！」；阿咕只在按「問阿咕」時說話
    var f = G.aguQuest();
    if (!f) return null;
    if (f.status === 'available') return 'bang';
    if (J.QuestLog.canComplete(G.state, G.data.quests, f.id, G.data)) return 'ready';
    return (G.data.quests[f.id].kind || 'help') === 'help' ? 'bang' : null;
  };
  /** 面對阿咕按 A：可接就開始；可以回報就完成；答題委託就繼續答；收集委託就提醒目標 */
  G.aguTalk = function (scene) {
    if (G.blocked()) return Promise.resolve();
    var st = G.state, Q = G.data.quests, f = G.aguQuest();
    if (!f) return Promise.resolve();
    if (f.status === 'available') return G.aguStart(f.id, scene);
    if (J.QuestLog.canComplete(st, Q, f.id, G.data)) return G.completeQuest(f.id, scene);
    var q = Q[f.id];
    if ((q.kind || 'help') === 'help') {
      return J.UI.confirm('「' + q.title + '」：' + J.QuestLog.progress(st, Q, f.id, G.data).text + '。要繼續嗎？', '繼續', '等一下')
        .then(function (y) { if (y) G.runHelp(f.id, { id: 'agu' }, scene); });
    }
    return G.say(null, [{ who: 'agu', text: q.goal || q.title }]).then(function () { J.UI.toast('進度：' + J.QuestLog.progress(st, Q, f.id, G.data).text, 3500); });
  };
  /** 開始阿咕的委託：開場對話 → 接下 → 答題委託直接開始答；收集委託已經收齊就完成 */
  G.aguStart = function (id, scene) {
    var st = G.state, Q = G.data.quests, q = Q[id];
    return G.say(q.dialog_start, [{ who: 'agu', text: q.goal || q.title }]).then(function () {
      if (!J.QuestLog.accept(st, Q, id)) return null;
      J.Audio.play('select');
      J.UI.toast('接下委託：「' + q.title + '」', 3500);
      G.save();
      if (scene && scene.refreshMarkers) scene.refreshMarkers();
      if ((q.kind || 'help') === 'help') { J.UI.toast('中途想休息也可以：之後面對阿咕按 A，就能繼續。', 5000); return G.runHelp(id, { id: 'agu' }, scene); }
      if (J.QuestLog.canComplete(st, Q, id, G.data)) return G.completeQuest(id, scene);
      return null;
    });
  };
  /** 阿咕的收集委託收齊了 → 自動完成（Q4_T02_3 謎題碎片拼好）。打贏、到新地圖時檢查 */
  G.checkAguAuto = function (scene) {
    var f = G.aguQuest(), Q = G.data.quests;
    if (!f || f.status !== 'active' || (Q[f.id].kind || 'help') !== 'hunt' || G.blocked()) return Promise.resolve();
    if (!J.QuestLog.canComplete(G.state, Q, f.id, G.data)) return Promise.resolve();
    return G.completeQuest(f.id, scene || G.mapScene);
  };
  /** 某個委託完成後自動開始的委託（auto：阿咕；auto_accept：直接接下，例如頭目） */
  G.startAuto = function (doneId, scene) {
    var st = G.state, Q = G.data.quests, chain = Promise.resolve();
    J.QuestLog.autoNext(st, Q, doneId).filter(function (a) { return !J.Puzzle || J.Puzzle.allowAuto(Q[a.id]); }).forEach(function (a) {
      chain = chain.then(function () {
        if (!a.silent) return G.aguStart(a.id, scene);
        if (!J.QuestLog.accept(st, Q, a.id)) return null;
        G.save();
        J.UI.toast('新的目標：' + (Q[a.id].goal || Q[a.id].title), 5000);
        if (Q[a.id].kind === 'boss') G.respawnBosses();
        if (scene && scene.refreshMarkers) scene.refreshMarkers();
        return null;
      });
    });
    return chain;
  };

  /** 出口能不能走（maps.js exits[].requires：要先完成的委託） */
  G.testModeOn = function () { return !!(J.TestMode && J.TestMode.on()); };
  G.exitOpen = function (ex) { if (G.testModeOn()) return true; return J.Puzzle ? J.Puzzle.exitOpen(G.state, G.data.quests, ex) : (!ex.requires || G.isDone(ex.requires)); };   // v0.6：requires 也接受 cond
  G.exitLocked = function (ex) { G.lastExitLocked = ex.to; return G.say(ex.locked_dialog, [{ who: 'agu', text: '還不能過去喔。' }]); };
  /** 柵門（maps.js gates）：委託完成＝打開 */
  G.gateOpen = function (gt) { return J.Puzzle ? J.Puzzle.gateOpen(G.state, G.data.quests, gt) : (!gt.quest || G.isDone(gt.quest)); };   // v0.6：open（cond）
  G.gateTalk = function (gt) {
    if (G.blocked()) return Promise.resolve();
    if (gt.puzzle && G.mapScene) return G.codeDoor(gt);   // v0.6 密碼門
    return G.say(gt.dialog, [{ who: 'agu', text: '柵門還關著。' }]);
  };
  /** 告示牌、知識卡（maps.js notes） */
  G.readNote = function (note) {
    if (G.blocked()) return Promise.resolve();
    J.Audio.play('select');
    var id = note.card || note.dialog;
    // 整合：dialog_after＝條件成立後換一段（T08 旗桿：M6 完成後 D_C01_FLAGPOLE_END）
    if (note.dialog_after && J.Puzzle && J.Puzzle.cond(G.state, G.data.quests, note.dialog_after.when)) id = note.dialog_after.dialog;
    G.noteLog = (G.noteLog || []).concat([id]);
    return G.say(id, []);
  };   // v0.6：card＝地標知識卡

  /**
   * 搭捷運（暫時傳送點；GDD 7.3 C8 的捷運路線圖、搭乘動畫下一批做，這裡先接台詞與謎題）：
   * 往北投：捷運路線圖謎題還沒解開 → 先解（G.mrtPuzzle）；第一次 D_MRT_FIRST → D_MRT_RIDE，之後 D_MRT；
   * 回圓山（起點地圖）：D_MRT_BACK。到站後播 D_MRT_ARRIVE_<地圖>（G.arriveDialogs）
   */
  G.rideMrt = function (ex, scene) {
    if (G.riding) return Promise.resolve(false);
    if (ex.mrt_stations && J.Puzzle) return G.mrtMenu(ex, scene);   // v0.6 捷運多站選單
    var F = G.flags(), back = ex.to === G.data.startMap;
    G.riding = true;
    var onExit = scene && scene.p && J.World.exitAt(scene.map, scene.p.tx, scene.p.ty);
    var chain = (!back && !F.mrtPuzzle) ? G.mrtPuzzle() : Promise.resolve(true);
    return chain.then(function (ok) {
      if (!ok) { G.riding = false; if (onExit) scene.bounceBack(); return false; }
      var ids = back ? ['D_MRT_BACK'] : (F.mrtFirst ? ['D_MRT'] : ['D_MRT_FIRST', 'D_MRT_RIDE']);
      if (!back && !F.mrtFirst) F.mrtFirst = Date.now();
      return G.sayChain(ids).then(function () {
        G.riding = false;
        G.pendingArrive = G.mrtArriveId(ex.to);
        G.mrtLog = (G.mrtLog || []).concat([ex.to]);   // 測試用
        scene.leaveBy(ex);
        return true;
      });
    }, function () { G.riding = false; return false; });
  };
  /** 和站務員說話搭車（npcs[].mrt）：謎題卡還沒解開 → D_MRT_LOCKED；可以搭 → 問要不要搭車 */
  G.mrtTalk = function (npc, scene) {
    if (npc.mrt_stations && J.Puzzle) return G.say(G.idleDialog(npc), []).then(function () { return G.mrtMenu(npc, scene); });   // v0.6
    var m = npc.mrt, lock = (scene.map.exits || []).filter(function (e) { return e.mrt && e.to === m.to; })[0];
    var ex = { x: npc.x, y: npc.y, to: m.to, tx: m.tx, ty: m.ty, mrt: true };
    return G.say(G.idleDialog(npc), []).then(function () {
      if (lock && !G.exitOpen(lock)) return G.exitLocked(lock);
      return J.UI.confirm('要搭捷運到' + (m.name || (G.data.maps[m.to] || {}).name || m.to) + '嗎？', '搭車', '等一下').then(function (y) { if (y) return G.rideMrt(ex, scene); });
    });
  };
  /**
   * 捷運路線圖謎題（Q4_T01_3 最後一步；正式的路線圖畫面 ui_mrt_map 下一批做，先用選項）：
   * 點出「旁邊畫著溫泉符號」的站（新北投）。點錯 D_MRT_PUZZLE_WRONG，可以重選；點對 D_MRT_PUZZLE_RIGHT。關掉＝之後在捷運站再解
   */
  G.mrtPuzzle = function () {
    var F = G.flags();
    var opts = [{ value: 'R14', text: '圓山' }, { value: 'R16', text: '士林' }, { value: 'R22', text: '北投' }, { value: 'R22A', text: '新北投 ♨' }];
    G.mrtPuzzleTries = G.mrtPuzzleTries || 0;
    return (function ask() {
      return J.UI.choose('捷運路線圖：圖例說「♨＝溫泉」。哪一站旁邊畫著溫泉的符號？', opts).then(function (v) {
        if (v === null || v === undefined) { J.UI.toast('謎題先留著，到捷運站時再解也可以。', 3500); return false; }
        G.mrtPuzzleTries++;
        if (v !== 'R22A') return G.say('D_MRT_PUZZLE_WRONG', []).then(ask);
        F.mrtPuzzle = Date.now();
        G.save();
        return G.say('D_MRT_PUZZLE_RIGHT', []).then(function () { return true; });
      });
    })();
  };

  // ---------------------------------------------------------------- BQ2 v0.6 前端B：台北章地圖功能（規則在 systems/puzzle.js，畫面在 ui/puzzle.js）
  /** 播完一段對話：立 _dlg 旗標與證人線索旗標（DIALOG_FLAGS、委託 clue_dialogs）；有新線索就提示偵探筆記 */
  G.dialogDone = function (id) {
    G.dialogLog = (G.dialogLog || []).concat([id]).slice(-400);   // 整合4 S-5：這次開遊戲播過的對話（只在記憶體；存檔只留被條件引用的 _dlg: 旗標）
    var add = J.Puzzle.onDialog(G.state, G.data.quests, id, window.DIALOG_FLAGS || {});
    if (add.length) { J.UI.toast('📒 偵探筆記記下了新的線索！', 3000); G.save(); }
    if (G.mapScene && G.mapScene.refreshMarkers && add.length) G.mapScene.refreshMarkers();
    if (G.mapScene && G.mapScene.refreshNpcShow) { G.mapScene.refreshNpcShow(); if (G.mapScene.refreshMarkers) G.mapScene.refreshMarkers(); }   // 整合：show 條件（開場鑑定師消失、陳館長可接 M1）
    return add;
  };
  /** 整合：地圖觸發區（maps.js triggers[]）——播對話（播完 dialogDone 立 _dlg 旗標，條件就不再成立） */
  G.runTrigger = function (tr, scene) {
    if (G.blocked()) return Promise.resolve();
    G.triggerLog = (G.triggerLog || []).concat([tr.id]);   // 測試用
    return G.say(tr.dialog, []).then(function () { G.save(); if (scene && scene.refreshMarkers) scene.refreshMarkers(); });
  };
  /** v0.6 說話前的特別處理；處理掉了回傳 true */
  G.v06Talk = function (npc, scene, opts) {
    var st = G.state, Q = G.data.quests, P = J.Puzzle;
    // 時光機關等選單事件（type:talk）：先讓孩子選「說話」或事件
    var evs = P.talkEvents(G.data.maps, st, Q, npc.id);
    if (evs.length && !opts.noEvents) {
      G.lastChoice = { npc: npc.id, events: evs.map(function (e) { return e.id; }) };   // 測試用
      J.UI.choose(G.speaker(npc.id).name + '：要做什麼呢？', [{ value: '__talk', text: '💬 說話', primary: true }].concat(evs.map(function (e) { return { value: e.id, text: '⏳ ' + (e.menu_label || '出發') }; })))
        .then(function (v) {
          if (v === '__talk') G.talkTo(npc, scene, { noEvents: true });
          else { var ev = evs.filter(function (e) { return e.id === v; })[0]; if (ev) G.warp(ev, scene); }
        });
      return true;
    }
    // 多步驟委託：「找某人說話」的步驟
    var steps = P.talkStep(st, Q, npc.id);
    // 整合：最後一步是「回 return_to 的人那裡」（M6 把翠玉白菜交給 TI1 陳館長）→ 步驟完成就直接完成委託
    var back = steps.filter(function (s) { var q = Q[s.quest]; return q && q.return_to && q.return_to.npc === npc.id && J.QuestLog.canComplete(st, Q, s.quest, G.data); })[0];
    if (back) {
      G.save();
      G.completeQuest(back.quest, scene).then(function () { if (scene && scene.refreshFollowers) scene.refreshFollowers(); });
      return true;
    }
    if (steps.length) {
      G.save();
      G.say(G.idleDialog(npc), [{ who: npc.id, text: '……' }]).then(function () { J.UI.toast('📒 偵探筆記：「' + (Q[steps[0].quest].title || '') + '」往下一步了！', 3500); scene.refreshMarkers(); });
      return true;
    }
    // 推理委託
    var f = J.QuestLog.forNpc(st, Q, npc.id, (npc.quests && npc.quests.length) ? npc.quests : (npc.quest ? [npc.quest] : []));
    if (f && f.status === 'active' && Q[f.id].kind === 'deduce' && !J.QuestLog.canComplete(st, Q, f.id, G.data)) { G.deduce(f.id, npc, scene); return true; }
    return false;
  };
  /** 推理：線索齊了從 4 個身分選 1 個；選錯可以重選，不扣分 */
  G.deduce = function (qid, npc, scene) {
    var st = G.state, Q = G.data.quests, q = Q[qid], d = q.deduce || {};
    if (!J.Puzzle.deduceReady(st, q)) {
      return G.say(d.dialog_need, [{ who: npc.id, text: '線索還不夠，再去問問看吧！（線索 ' + J.Puzzle.cluesHave(st, q) + '/' + (q.clues || []).length + '）' }]);
    }
    G.deduceTries = 0;
    return (function ask() {
      return J.UI.choose('🔍 ' + (d.prompt || '答案是哪一個？'), (d.options || []).map(function (o) { return { value: o, text: o }; })).then(function (v) {
        if (v === null || v === undefined) { J.UI.toast('想好了再來找我一起推理！', 3000); return; }
        G.deduceTries++;
        var r = J.Puzzle.deducePick(st, Q, qid, v);
        G.save();
        if (r === 'wrong') return G.say(d.dialog_wrong, [{ who: npc.id, text: '好像不太對，再想一想。' }]).then(ask);
        if (r === 'right') return G.completeQuest(qid, scene).then(function () { if (scene && scene.refreshFollowers) scene.refreshFollowers(); });
      });
    })();
  };
  /** 密碼門（gates[].puzzle）：數字盤，無限次；答對開門＋獎勵 */
  G.codeDoor = function (gt) {
    var scene = G.mapScene, pz = J.Puzzle.puzzle(scene.map, gt.puzzle);
    if (!pz) return G.say(gt.dialog, []);
    if (J.Puzzle.solved(G.state, pz.id)) return Promise.resolve();
    G.busy = true;
    // 整合2：資料有 dialog_wrong（例 D_C01_TD1_CODE_WRONG）→ 輸錯時關掉數字盤播那段對話，播完再打開（保留剛才的數字）；沒有才用畫面上的「門沒有動。」
    var wrongDlg = J.Puzzle.codeWrongDialog ? J.Puzzle.codeWrongDialog(pz, G.data.dialogs) : null;
    var ask = function (initial) {
      var opts = { title: gt.title || '密碼門', digits: J.Puzzle.codeDigits(pz), labels: J.Puzzle.codeLabels(pz), wrongText: '門沒有動。', initial: initial, closeOnWrong: !!wrongDlg,
        tryFn: function (vals) { G.codeTries = (G.codeTries || 0) + 1; return J.Puzzle.codeTry(G.state, pz, vals); } };
      return J.PuzzleUI.codeDoor(opts).then(function (r) {
        if (r !== 'wrong') return r;
        G.codeWrongLog = (G.codeWrongLog || []).concat([wrongDlg]);   // 測試用
        G.busy = false;
        return G.say(wrongDlg, [{ who: 'narrator', text: '門沒有動。' }]).then(function () { G.busy = true; return ask(opts.lastVals); });
      });
    };
    return ask(null)
      .then(function (r) { G.busy = false; G.save(); if (r === 'ok') return G.puzzleSolved(pz, scene); });
  };
  /** 機關解開：存檔、開門、機關寶箱出現、播 dialog_done、迷宮委託檢查、獎勵事件 */
  G.puzzleSolved = function (pz, scene) {
    var rw = J.Puzzle.reward(G.state, pz);
    G.save(true);
    G.solvedLog = (G.solvedLog || []).concat([pz.id]);   // 測試用
    G.jingle('quest_clear', null, 'chest');
    if (scene) { scene.refreshGates(); if (scene.refreshV06) scene.refreshV06(); }
    if (rw.chest) J.UI.toast('🧰 有一個寶箱出現了！', 3500);
    // 整合4 D-14：六燈全亮播 D_C01_TIME_GO（dialog_done）；同一段台詞也是 M5 的 dialog_end，委託完成時不再播第二次
    var said = J.Puzzle.solvedDialog(pz, G.data.dialogs);
    return G.say(J.Puzzle.solvedDialog(pz, G.data.dialogs), [{ who: 'narrator', text: '機關解開了！' }]).then(function () { G.skipEndDialog = said; return G.checkMaze(scene); }).then(function () {
      G.skipEndDialog = null;
      var ev = rw.event && ((scene.map.events || []).filter(function (e) { return e.id === rw.event; })[0]);
      if (ev) return G.warp(ev, scene);
    });
  };
  /** 迷宮委託（kind:maze）條件成立 → 完成 */
  G.checkMaze = function (scene) {
    var st = G.state, Q = G.data.quests, chain = Promise.resolve();
    Object.keys(Q).forEach(function (id) {
      if (Q[id].kind === 'maze' && J.QuestLog.canComplete(st, Q, id, G.data)) chain = chain.then(function () { return G.completeQuest(id, scene); });
    });
    return chain;
  };
  /** 點燈座：照順序；點錯全部慢慢熄掉重來 */
  G.lampTouch = function (pz, lamp, scene) {
    if (G.blocked()) return Promise.resolve();
    var r = J.Puzzle.lampPress(G.state, pz, lamp);
    G.lampLog = (G.lampLog || []).concat([lamp.dir + ':' + r.result]);   // 測試用
    G.save();
    if (r.result === 'lit') { J.Audio.play('select'); scene.refreshV06(); return G.say(pz.dialog_one, [{ who: 'narrator', text: '燈座亮起來了。' }]); }
    if (r.result === 'wrong') { J.Audio.play('wrong'); scene.lampsFade(pz); return G.say(pz.dialog_reset, [{ who: 'agu', text: '燈全熄了。沒關係，再試一次！' }]); }
    if (r.result === 'solved') { scene.refreshV06(); return G.puzzleSolved(pz, scene); }
    J.UI.toast('這座燈已經亮著了。', 2000);
    return Promise.resolve();
  };
  G.lampReset = function (pz, scene) {
    if (G.blocked()) return Promise.resolve();
    var r = J.Puzzle.lampReset(G.state, pz);
    if (r.result === 'done') { J.UI.toast('燈都亮了，不用重來。', 2500); return Promise.resolve(); }
    G.save();
    J.Audio.play('select');
    scene.lampsFade(pz);
    return G.say(pz.dialog_reset, [{ who: 'agu', text: '燈全熄了。再試一次！' }]);
  };
  /** 拉桿：拉開捷徑（雙向）並存檔 */
  G.leverPull = function (pz, scene) {
    if (G.blocked()) return Promise.resolve();
    if (!J.Puzzle.leverPull(G.state, pz)) { J.UI.toast('拉桿已經拉下來了，門開著。', 2500); return Promise.resolve(); }
    G.save(true);
    J.Audio.play('warp');
    scene.refreshGates(); scene.refreshV06();
    return G.say(pz.dialog_done, [{ who: 'narrator', text: '喀啦！門打開了。' }]).then(function () { J.UI.toast('捷徑打開了，以後可以從這裡進出。（已存檔）', 4000); });
  };
  /** 休息點：回滿體力、存檔、迷宮裡這一層野怪重生 */
  G.restUse = function (rest, scene) {
    if (G.blocked()) return Promise.resolve();
    var o = J.Puzzle.restOpts(scene.map, rest), st = G.state;
    return J.UI.confirm('在「' + (rest.label || '休息點') + '」休息嗎？' + (o.heal ? '（回滿體力' + (o.save ? '、存檔' : '') + '）' : ''), '休息', '等一下').then(function (y) {
      if (!y) return;
      if (o.heal) J.Character.restoreFull(st, G.data);
      if (o.save && scene.p) J.Character.setInn(st, scene.mapId, scene.p.tx, scene.p.ty);
      if (o.respawn) scene.respawnAll();
      G.restLog = (G.restLog || []).concat([scene.mapId]);   // 測試用
      G.refreshHud();
      G.save(true);
      J.Audio.play('heal');
      return G.say(rest.dialog || 'D_REST', [{ who: 'narrator', text: '休息了一下，體力都回來了。' + (o.save ? '（已存檔）' : '') }]);
    });
  };
  /** 調查隱藏區：U 格變可走、永遠開著；隱藏寶箱出現 */
  G.investigate = function (hd, scene) {
    if (G.blocked()) return Promise.resolve();
    var r = J.Puzzle.investigate(G.state, G.data.quests, hd);
    if (r === 'locked') return G.say(hd.dialog_before, [{ who: 'agu', text: '這裡好像怪怪的……' }]);
    if (r === 'already') { if (hd.dialog_again) return G.say(hd.dialog_again, []); J.UI.toast('後面有一條小路。', 2000); return Promise.resolve(); }   // 整合：01b 再次調查
    G.save(true);
    G.hiddenLog = (G.hiddenLog || []).concat([hd.id]);   // 測試用
    J.Audio.play('warp');
    // B4 整合2（隱藏區障礙設計 5-2-3）：先播障礙移開的演出（期間鎖操作），演出完才解除封鎖、播對話
    var BF = J.BattleFlow, reduce = !!(BF && BF.reduceMotion && BF.reduceMotion(G.state.settings, BF.systemReducedMotion()));
    G.busy = true;
    var fx = scene.openHiddenFx ? scene.openHiddenFx(hd, reduce) : Promise.resolve();
    return fx.catch(function () {}).then(function () {
      G.busy = false;
      if (scene.sys && scene.sys.isActive()) scene.refreshV06();
      return G.say(hd.dialog, [{ who: 'agu', text: '牆後面有一條小路！' }]);
    });
  };
  /** 惡作劇寶箱（冷笑話卡）、機關寶箱：直接開，不出題 */
  G.openChestFree = function (chest, scene) {
    var st = G.state, lvl = st.player.level;
    var o = J.Chests.open(st, chest, G.data.quests, G.data);
    if (!o.ok) return;
    scene.setChestOpen(chest.id);
    G.jingle('chest', null, 'chest');
    if (J.Puzzle.chestKind(chest) === 'prank') {
      J.Puzzle.jokeGet(st, chest.joke);
      G.save();
      J.UI.banner('寶箱裡是一張怪盜的冷笑話卡！');
      setTimeout(function () { J.PuzzleUI.jokes(G, chest.joke); }, 600);
    } else {
      var parts = [];
      if (o.gold) parts.push('金幣 +' + o.gold);
      if (o.item) parts.push('得到「' + ((G.data.items[o.item] || {}).name || o.item) + '」');
      J.UI.banner('機關寶箱打開了！' + parts.join('、'));
      G.save();
    }
    G.refreshHud();
    o.quests.forEach(function (qr) { G.questDone(qr.id, qr, scene, st.player.level - lvl); });
  };
  /** 時光機關、回程光圈（events[]）：播對話 → 傳送 */
  /** 整合6：這個地點存在而且能站（Character.validPlace＋地圖格子可走） */
  G.validDest = function (loc) { return J.Character.validPlace(loc, G.data.maps, function (m, x, y) { return J.World.isWalkable(G.data.tilesets, m, x, y); }); };
  /** opts.debug：除錯入口才略過條件檢查 */
  G.warp = function (ev, scene, opts) {
    scene = scene || G.mapScene;
    if (G.warping || !scene) return Promise.resolve();
    // 整合6（審查第 2 輪）：照 requires 檢查；目的地不存在或不能站就回 start_map
    var wt = J.Puzzle.warpTarget(ev, G.state, G.data.quests, G.validDest, G.data.startMap, !!(opts && opts.debug));
    if (!wt.ok) { console.warn('[傳送] 條件不成立，不傳送：', ev && ev.id); return Promise.resolve(false); }
    if (wt.reason === 'fallback') console.warn('[傳送] 目的地無效，改回起點：', ev.id, ev.to, ev.tx, ev.ty);
    G.warping = true;
    G.warpLog = (G.warpLog || []).concat([ev.id]);   // 測試用
    return G.say(ev.dialog, []).then(function () {
      G.warping = false;
      if (ev.arrive_dialog) G.pendingArrive = ev.arrive_dialog;
      scene.leaveBy({ to: wt.to.map, tx: wt.to.x, ty: wt.to.y });
    });
  };
  /** 捷運多站選單（出口光圈或站務員） */
  G.mrtMenu = function (src, scene) {
    var lock = J.Puzzle.mrtLockExit(scene.map);
    var onExit = scene.p && J.World.exitAt(scene.map, scene.p.tx, scene.p.ty);
    if (lock && !G.exitOpen(lock)) { if (onExit) scene.bounceBack(); return G.exitLocked(lock); }
    var list = J.Puzzle.mrtStations(scene.mapId, src);
    if (onExit) scene.bounceBack();   // 先退回一格：選「先不搭」時不會一直站在光圈上
    return J.UI.choose('🚇 ' + (src.station || '捷運站') + '：要搭到哪一站？', list.map(function (s, i) { return { value: String(i), text: '🚉 ' + s.name }; }).concat([{ value: 'no', text: '先不搭' }]), { cancel: false })   // 整合4 D-13：只留「先不搭」一個取消鍵
      .then(function (v) {
        if (v === null || v === undefined || v === 'no') return false;
        var s = list[Number(v)];
        if (!s) return false;
        G.mrtLog = (G.mrtLog || []).concat([s.map]);   // 測試用
        if (J.SpecialItems) J.SpecialItems.recordMrt(G.state, s);   // 整合2：回程車票回到最後搭過的捷運站
        G.pendingArrive = G.mrtArriveId(s.map);
        scene.leaveBy({ to: s.map, tx: s.tx, ty: s.ty });
        return true;
      });
  };
  /** 問阿咕：第 1 次＝第 1 層提示，再按＝第 2 層 */
  G.askAgu = function () {
    if (G.blocked() || !G.mapScene || J.UI.isOpen()) return Promise.resolve();
    var r = J.Puzzle.hintNext(G.state, G.data.quests, G.mapScene.map);
    G.hintLog = (G.hintLog || []).concat([{ group: r.group, level: r.level }]);   // 測試用
    G.save();
    var id = r.ids[0];
    if (!r.level || !G.data.dialogs[id]) return G.say(null, [{ who: 'agu', text: J.Puzzle.HINT_FALLBACK }]);
    return G.say(id, []);
  };
  G.openNotebook = function () { if (!G.blocked()) J.PuzzleUI.notebook(G); };

  /** 集章冊（GDD 7.3 C9）的接口：完整畫面下一批做；第一次打開時阿咕說明（D_STAMPBOOK_HINT，冒險手帳的「集章冊」分頁） */
  G.openStampbook = function () { J.Menus.journal(G, { tab: 'lights' }); };
  /** 海圖過場（GDD 7.3 C10 SR_PREVIEW_KEELUNG_NANGAN）的接口：下一批做；現在只記錄並提示 */
  G.chartPreview = function (routeId) {
    G.chartLog = (G.chartLog || []).concat([routeId]);   // 測試用
    J.UI.toast('🚢 海圖預告：基隆港 → 馬祖南竿（過場動畫下一批製作）', 4000);
    return Promise.resolve(true);
  };
  /** 設定頁「再看一次預告」的接口（D_CHART_REPLAY） */
  G.replayChart = function () { return G.say('D_CHART_REPLAY', []).then(function () { return G.chartPreview('SR_PREVIEW_KEELUNG_NANGAN'); }); };
  /** 開船前檢查今天剩下的時間（GDD 1.5：剩不到 3 分鐘不開船，D_SHIP_TIME；海上地圖下一批做） */
  G.canSail = function () {
    var gate = J.Playtime.finalBossGate(G.state.playtime, G.state.settings, Date.now());
    if (typeof gate.minutes === 'number' && gate.minutes < 3) return G.say('D_SHIP_TIME', []).then(function () { return false; });
    return Promise.resolve(true);
  };
  /** 接到頭目委託後，讓頭目出現在地圖上（同一張圖時立刻出現） */
  G.respawnBosses = function () {
    var sc = G.mapScene;
    if (!sc || !sc.p) return;   // 地圖還在載入（create 之前）：建好時 buildMonsters 會自己放頭目
    (sc.map.spawns || []).forEach(function (s) {
      if (!(s.boss && s.quest)) return;
      if (sc.monsters.some(function (m) { return m.spawn === s; })) return;
      if (J.QuestLog.status(G.state, G.data.quests, s.quest) !== 'active' || G.state.bosses[s.monster]) return;
      if (s.requires && J.Puzzle && !J.Puzzle.cond(G.state, G.data.quests, s.requires)) return;   // 整合：出現條件
      var m = G.data.monsters[s.monster];
      if (!m || !sc.textures.exists(J.Assets.texKey(m.sprite))) { sc.scene.restart({ mapId: sc.mapId, x: sc.p.tx, y: sc.p.ty, facing: sc.p.facing }); return; }
      var mob = { spawn: s, mon: m, id: s.monster, idx: 99, active: false, sprite: null, tx: 0, ty: 0, moving: false, nextMove: 0, respawnAt: 0, boss: true };
      sc.placeMonster(mob, false);
      sc.monsters.push(mob);
    });
  };

  G.completeQuest = function (id, scene) {
    var st = G.state, Q = G.data.quests, q = Q[id];
    var lvl = st.player.level;
    var r = J.QuestLog.complete(st, Q, id, G.data);
    if (!r.ok) return Promise.resolve();
    return G.questDone(id, r, scene, st.player.level - lvl);
  };

  /** 委託完成後的共同處理：結束對話、獎勵提示、光、點燈、每日任務、結局 */
  G.questDone = function (id, r, scene, levels) {
    var st = G.state, q = G.data.quests[id];
    J.Daily.record(st.daily, 'quest').forEach(function (t) { st.player.coins += t.reward; J.UI.toast('每日小任務完成：「' + t.text + '」金幣 +' + t.reward); });
    if (Array.isArray(q.subjects) && scene && scene.map.lamps) {
      ['國語', '英語', '數學', '自然', '社會'].forEach(function (s) { st.lamps[s] = true; });
      if (scene) scene.updateLamps();
    }
    G.save();
    G.questDoneLog = (G.questDoneLog || []).concat([id]);   // 測試用
    // 第三批：dialog_end → after（Q4_T01_3 捷運路線圖謎題、Q4_T03_1 領角鴞知識卡）→ 獎勵 → 下一步 → 自動開始的委託／片尾
    var after = q.after || {};
    var endId = G.skipEndDialog && G.skipEndDialog === q.dialog_end ? null : q.dialog_end;   // 整合4 D-14：剛播過就不重播
    return (endId ? G.say(endId, []) : Promise.resolve()).then(function () {
      return after.mrt_puzzle && !G.flags().mrtPuzzle ? G.mrtPuzzle() : null;
    }).then(function () {
      return after.dialog ? G.say(after.dialog, []) : null;
    }).then(function () {
      if (q.follower && scene && scene.refreshFollowers) scene.refreshFollowers();   // 整合：夥伴加入（阿哲）
      return after.then ? G.say(after.then, []) : null;   // 整合：after.then（M6 → 預告卡 D_C01_CARD_NEXT）
    }).then(function () {
      var parts = [];
      if (r.reward.gold) parts.push('金幣 +' + r.reward.gold);
      if (r.reward.exp) parts.push('經驗值 +' + r.reward.exp);
      if (r.reward.item) parts.push('得到「' + ((G.data.items[r.reward.item] || {}).name || r.reward.item) + '」' + (r.reward.item_n > 1 ? ' ×' + r.reward.item_n : ''));
      if (r.reward.stamp) parts.push(/c01/.test(r.reward.stamp) ? '集章冊蓋上文物守護章' : '蓋上北投的印章');
      if (r.reward.title) parts.push('稱號「' + r.reward.title + '」');
      G.jingle('quest_clear', null, 'chest');
      J.UI.banner('委託完成：「' + q.title + '」' + (parts.length ? '\n' + parts.join('、') : ''));
      G.afterReward(levels || 0);
      if (r.reward.light) {
        G.jingle('rare_item', null, 'lamp');
        return G.say('D_LIGHT_GET', [{ who: 'pet', text: '拿回了' + r.reward.light + '之光！' }]).then(function () { J.UI.banner('拿回了「' + r.reward.light + '之光」！'); });
      }
    }).then(function () {
      if (q.log_next) J.UI.toast('下一步：' + q.log_next, 6000);
      if (scene && scene.refreshMarkers) scene.refreshMarkers();
      if (q.dialog_ending || q.ending) return G.ending(q);
      return G.startAuto(id, scene);
    });
  };

  G.ending = function (q) {
    G.state.ending = true;
    G.save();
    if (G.mapScene && G.mapScene.fireworks) G.mapScene.fireworks();
    G.jingle('ending', null, 'win', 20000);
    J.UI.banner('第一段冒險到這裡。謝謝你的幫忙！');
    return (q.dialog_ending ? G.say(q.dialog_ending, []) : Promise.resolve()).then(function () { J.UI.toast('冒險可以繼續：解委託、練習五科、找方爺爺學新的一課！', 6000); });
  };

  /** 答題委託（help）：一題一題問，答完 count 題就完成 */
  G.runHelp = function (id, npc, scene) {
    var st = G.state, Q = G.data.quests, q = Q[id];
    var lr = q.level_range || [1, 4];
    var units = q.units || [], nodes = q.nodes || [];
    // 勇者大冒險II（GDD 7.3 C1）：只出這張地圖已開放的節點（mapId → Curriculum）；委託的單元、節點（第三批 nodes）、難度範圍只當偏好
    var sess = J.Session.create(st, G.questions, J.QuestLog.helpSubject(q, 0), {
      mode: 'free', expMult: G.coef(scene.mapId), mapId: scene.mapId,
      prefer: function (x) { return (!units.length || units.indexOf(x.unit) >= 0) && (!nodes.length || nodes.indexOf(J.Curriculum.nodeOf(x)) >= 0) && x.level >= lr[0] && x.level <= lr[1]; }
    });
    function nextQ() {
      if (J.QuestLog.canComplete(st, Q, id, G.data)) { G.completeQuest(id, scene); return; }
      var prog = (st.quests[id] || {}).progress || 0;
      var subj = J.QuestLog.helpSubject(q, prog);
      var qq = J.Session.next(sess, Date.now(), { subject: subj });
      if (!qq) { J.UI.toast('「' + subj + '」的題目還在準備中。'); return; }
      J.Quiz.ask({
        session: sess, mode: 'help', state: st, title: q.title, subtitle: '幫忙 ' + (prog + 1) + '/' + J.QuestLog.helpCount(q) + '・' + G.speaker(npc.id).name,
        speaker: G.speaker(npc.id).name,   // 題目情境的說話者換成委託人（不改題庫）
        onSave: function () { G.save(); },
        onRewards: function (res) { G.refreshHud(); if (res) G.afterReward(res.levelsGained); },
        onDone: function (r) {
          if (r.left) { G.save(); J.UI.toast('先休息一下，隨時可以回來繼續幫忙！'); scene.refreshMarkers(); return; }
          if (!r.correct) return;
          J.QuestLog.recordHelp(st, Q, id);
          if (Array.isArray(q.subjects) && scene.map.lamps && scene.map.lamps.some(function (l) { return l.subject === subj; })) {
            st.lamps[subj] = true;
            scene.updateLamps();
            G.jingle('lamp_lit', null, 'lamp');
            J.UI.banner(subj + '燈亮了！');
          }
          G.save();
          nextQ();
        }
      });
    }
    nextQ();
  };

  // ---------------------------------------------------------------- 寶箱與燈
  G.openChest = function (chest, scene) {
    if (G.blocked()) return;
    var st = G.state;
    if (J.Chests.isOpened(st, chest.id)) { G.say('D_CHEST_DONE', [{ who: 'pet', text: '這個寶箱已經打開過了。' }]); return; }
    if (J.Puzzle && !J.Puzzle.chestNeedsQuestion(chest)) { G.openChestFree(chest, scene); return; }   // v0.6 惡作劇、機關寶箱：不出題
    var spec = J.Chests.questionSpec(chest);
    G.say('D_CHEST_LOCKED', [{ who: 'pet', text: '寶箱上有數字鎖！答對就能打開。' }]).then(function () {
      // 勇者大冒險II（GDD 7.3 C1）：寶箱也只出這張地圖已開放的節點；「寶箱情境的題目」只當偏好
      var sess = J.Session.create(st, G.questions, spec.subject, { mode: 'free', expMult: G.coef(scene.mapId), mapId: scene.mapId, prefer: J.Chests.isChestQuestion });
      var q = J.Session.next(sess, Date.now(), { forceLevel: spec.level, preferType: spec.preferType });
      if (!q) { J.UI.toast('題目還在準備中。'); return; }
      J.Quiz.ask({
        session: sess, mode: 'chest', state: st, title: '寶箱的數字鎖', subtitle: '答對就能打開（可以一直重試）',
        onSave: function () { G.save(); },
        onRewards: function (res) { G.refreshHud(); if (res) G.afterReward(res.levelsGained); },
        onDone: function (r) {
          if (!r.correct) { G.save(); return; }
          var lvl = st.player.level;
          var o = J.Chests.open(st, chest, G.data.quests, G.data);
          if (!o.ok) return;
          scene.setChestOpen(chest.id);
          G.jingle('chest', null, 'chest');
          var parts = [];
          if (o.gold) parts.push('金幣 +' + o.gold);
          if (o.item) parts.push('得到「' + ((G.data.items[o.item] || {}).name || o.item) + '」');
          J.UI.banner('寶箱打開了！' + (parts.length ? parts.join('、') : ''));
          G.refreshHud();
          G.save();
          o.quests.forEach(function (qr) { G.questDone(qr.id, qr, scene, st.player.level - lvl); });
        }
      });
    });
  };

  /** 車站（maps.js 的 station）：打開世界地圖 */
  G.useStation = function (station) {
    if (G.blocked()) return;
    J.Audio.play('select');
    J.UI.toast('🚉 ' + (station.name || '車站') + '：要搭車去哪裡呢？');
    G.openWorldMap();
  };

  /** v0.9.3 面對動物按 A：「哞～」跳出一句話（不能戰鬥） */
  G.animalTalk = function (spec) {
    G.animalSprite = spec.sprite;
    J.Audio.play('select');
    return G.say(spec.dialog, [{ who: 'animal:' + spec.name, text: spec.say }]);   // v0.9.4 台詞在 dialogs.js（水牛：D_ANIMAL_BUFFALO）
  };

  G.inspectLamp = function (lamp, scene) {
    var st = G.state;
    if (st.lamps[lamp.subject]) { G.say('D_LAMP_LIT', [{ who: 'pet', text: lamp.subject + '燈亮亮的，好溫暖！' }]); return; }
    var text = st.lights[lamp.subject] ? '已經拿回' + lamp.subject + '之光了！去找村長點燈吧。' : '這是' + lamp.subject + '燈。要找回「' + lamp.subject + '之光」才能點亮。';
    G.say(null, [{ who: 'pet', text: text }]);
  };

  // 勇者大冒險II（GDD 2.2、7.2 B5）：阿咕是博覽會吉祥物，不做餵食、親密度（三年級版的 G.feedPet 拿掉）

  G.onJobChanged = function () {
    J.Character.clampVitals(G.state, G.data);
    G.refreshHud();
    var sc = G.mapScene;
    if (sc) sc.scene.restart({ mapId: sc.mapId, x: sc.p.tx, y: sc.p.ty, facing: sc.p.facing });
  };

  // ---------------------------------------------------------------- 戰鬥
  /** 最終頭目：五科輪流出題、或在最高等級地圖的頭目（和最終頭目 BGM 同一個判斷） */
  G.isFinalBoss = function (mon, map) { return !!(mon && mon.boss && J.MapInfo.battleBgm(mon, map) === 'final'); };

  /**
   * v0.9.3（老闆核准）最終頭目和每日時間上限：進場前看今天還剩多少時間。
   * 剩 25 分鐘以上（或家長設定不限時）直接進場；剩 10～25 分鐘提醒可能打不完，讓孩子選；不到 10 分鐘不讓進場。
   * 最終頭目重新挑戰時從頭開始（每次進場都是新的一場）。回傳 Promise<boolean>（true＝進場）
   */
  G.finalBossGate = function () {
    var st = G.state, gate = J.Playtime.finalBossGate(st.playtime, st.settings, Date.now());
    G.lastFinalGate = gate;   // 測試用
    if (gate.action === 'go') return Promise.resolve(true);
    if (gate.action === 'ask') {
      return J.UI.confirm('今天剩 ' + gate.minutes + ' 分鐘，可能打不完，要現在挑戰還是明天再來？（沒打完的話，下次要從頭開始喔）', '現在挑戰', '明天再來')
        .then(function (yes) {
          if (!yes) return G.say(null, [{ who: 'pet', text: '好！明天精神飽滿再來挑戰！' }]).then(function () { return false; });
          return true;
        });
    }
    return G.say(null, [{ who: 'pet', text: '今天只剩 ' + gate.minutes + ' 分鐘，打不完的。明天再來挑戰吧！' }]).then(function () { return false; });
  };

  // ---------------------------------------------------------------- BQ2 v0.6 戰鬥（03b R1–R14；規則 battle_v06.js、流程 battle_flow.js）
  /** 怪物資料（帶 id）；沒有這隻回傳 null */
  G.bmon = function (id) { var m = G.data.monsters[id]; return m ? (m.id === id ? m : Object.assign({ id: id }, m)) : null; };
  /** 主角六項能力與衍生值（R3；HP、MP 的上限仍用舊 G.stats，見變更說明「已知限制」） */
  G.stats6 = function () { return J.Character.stats6(G.state, G.data); };
  /** R10 連續超時計數：只放記憶體（03b 第 2 版：不存檔，重開遊戲歸零） */
  G.timeoutWatch = null;
  G.bwatch = function () { if (!G.timeoutWatch) G.timeoutWatch = J.BattleV06.createWatch(); return G.timeoutWatch; };

  /**
   * 開戰。mob＝地圖上碰到的怪物（mob.mon、mob.spawn）；編組照 R1（spawn.group 指定、精英帶 1 隻、頭目單挑＋下一段）。
   * mob.debugGroup＝{ ids, stages }（除錯入口用）
   */
  G.startBattle = function (mob, scene) {
    var map = scene.map, mon = mob.mon, BV = J.BattleV06, BF = J.BattleFlow;
    if (mon && !mon.id && mob.id) mon = Object.assign({ id: mob.id }, mon);
    J.UI.closePassMove();
    var grp = mob.debugGroup || BF.buildGroup(mon, mob.spawn, BF.spawnTable(map.spawns, G.data.monsters), map.chapter || 1, Math.random, G.data.monsters);
    var foes = grp.ids.map(G.bmon).filter(Boolean), stages = (grp.stages || []).map(G.bmon).filter(Boolean);
    if (!foes.length) foes = [mon];
    var nameOf = function (id) { var m = G.bmon(id) || {}; return m.short_name || m.name || id; };
    var b = BV.create(foes, { stages: stages, nameOf: nameOf });
    G.battleCtx = { mob: mob, mon: foes[0], mapId: scene.mapId, over: false, b: null, b6: b, round: null };
    // 第一次遇到這種怪物 → 戰鬥開始前阿咕提醒（dialog_first）；同一場有好幾種時每種各一次
    var F = G.flags(), first = [];
    foes.forEach(function (m) { if (m.dialog_first && !F['met_' + m.id]) { first.push(m.dialog_first); F['met_' + m.id] = Date.now(); } J.Bestiary.seen(G.state, m.id); });
    G.battleCtx.firstDialogs = first;
    var bg = G.battleBgFor(foes[0], scene.mapId);
    G.bgm(J.MapInfo.battleBgm(foes[0], map));
    scene.scene.sleep();
    J.HUD.show(false);
    Array.prototype.forEach.call(document.querySelectorAll('.map-banner'), function (n) { n.parentNode.removeChild(n); });
    // 整合5：後面幾段的背景裝飾（第二段的怪盜本人）也先載入，換段時才畫得出來
    var decorLater = stages.map(function (m) { return m.stage_decor || (m.kind === 'tboss2' ? 'npc_kaito_battle' : null); }).filter(Boolean);
    G.phaser.scene.start('Battle', { foes: G.bsceneFoes(b), bg: bg, preload: stages, decor: G.bdecor(b), decorLater: decorLater });
  };
  G.bsceneFoes = function (b) { return b.foes.map(function (f) { return { slot: f.slot, mon: f.mon, label: f.label, hp: f.hp, maxHp: f.maxHp }; }); };
  /** 第二段怪盜本人（背景裝飾，不能選）：怪物資料 stage_decor 優先；怪盜第二段預設 npc_kaito_battle（沒有圖就不顯示） */
  G.bdecor = function (b) { var m = b.foes[0] && b.foes[0].mon; return (m && m.stage_decor) || (b.kind === 'tboss2' ? 'npc_kaito_battle' : null); };

  /** 戰鬥背景：怪物或 maps.js 指定的名稱有對應的 bb_ 圖就用；否則用 config.js 的地圖對照表；再不行用別名 */
  G.battleBgFor = function (mon, mapId) {
    var have = J.Assets.art().battle, map = G.data.maps[mapId] || {};
    var cands = [mon.battle_bg, map.battle_bg, C.BATTLE_BG_BY_MAP[mapId], C.BATTLE_BG_ALIAS[map.battle_bg], 'grass'];
    for (var i = 0; i < cands.length; i++) if (cands[i] && have[cands[i]]) return cands[i];
    return C.BATTLE_BG_BY_MAP[mapId] || 'grass';
  };

  G.battleSceneReady = function (bscene) {
    var ctx = G.battleCtx, st = G.state, mon = ctx.mon, b = ctx.b6;
    ctx.scene = bscene;
    ctx.b = b;
    ctx.ob = J.Battle.create(mon);   // 切片的技能效果狀態（增益、停止次數、防護、不倒祈願）沿用舊 Battle 的 fx；數值規則一律走 BattleV06
    ctx.subjects = G.battleSubjects(mon, ctx.mapId);
    ctx.sess = J.Session.create(st, G.questions, ctx.subjects[0] || mon.subject || '數學', {
      mode: 'free', noRepeat: true, expMult: 1, deferExp: true,   // 經驗值到戰鬥結束才結算（R14 沒有地圖係數）
      mapId: ctx.mapId,
      filter: function (x) { return !J.Chests.isChestQuestion(x); }
    });
    ctx.qn = 0;
    G.battleUI(ctx);
    G.btarget();
    var intro = Promise.resolve();
    (ctx.firstDialogs || []).forEach(function (id) { intro = intro.then(function () { return G.say(id, []); }); });
    if (mon.boss && mon.dialog_before) intro = intro.then(function () { return G.say(mon.dialog_before, []); });
    if (mon.boss) intro = intro.then(function () {
      ctx.examText = J.Curriculum.examText(ctx.mapId, mon.short_name || mon.name);
      return G.say(null, [{ who: 'agu', text: ctx.examText }]);
    });
    intro.then(function () {
      var names = b.foes.map(function (f) { return f.label; }).join('、');
      G.bmsg((mon.boss ? '頭目「' + mon.name + '」' : names) + '出現了！' + (mon.boss ? '（不能逃跑）' : '') + (J.BattleV06.showCursor(b.foes) ? '　點敵人（或按 ← →）可以換目標。' : ''));
      setTimeout(G.bround, 600);
    });
  };

  /** 戰鬥的 DOM 介面 */
  G.battleUI = function (ctx) {
    var h = J.UI.h;
    var top = h('div.win.battle-top');
    var status = h('div.win.status');
    var msg = h('div.win.msg', { 'aria-live': 'polite' });
    var cmds = h('div.win.cmds', { role: 'group', 'aria-label': '戰鬥指令' });
    var ui = h('div.battle-ui.bq2-battle', {}, [status, msg, cmds]);
    var wrap = h('div', {}, [top, ui]);
    ctx.ui = J.UI.open(wrap, { modal: false, escClose: false, label: '戰鬥' });
    ctx.el = { top: top, status: status, msg: msg, cmds: cmds };
    // 左右鍵換目標（只在等玩家下指令時）
    ctx.onKey = function (e) {
      if (!ctx.awaiting || document.querySelector('.win.quiz') || document.querySelector('.dialog')) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var alive = J.BattleV06.aliveFoes(ctx.b); if (alive.length < 2) return;
      var i = alive.map(function (f) { return f.slot; }).indexOf(ctx.b.target);
      i = (i + (e.key === 'ArrowRight' ? 1 : alive.length - 1)) % alive.length;
      G.bselectTarget(alive[i].slot);
      e.preventDefault();
    };
    document.addEventListener('keydown', ctx.onKey);
    G.brender();
  };

  /** 玩家選目標（點敵人、左右鍵）；點到停機的改回預設 */
  G.bselectTarget = function (slot) {
    var ctx = G.battleCtx; if (!ctx || !ctx.b || ctx.over || ctx.won) return;
    var t = J.BattleV06.selectTarget(ctx.b, slot);
    G.btarget();
    var f = ctx.b.foes.filter(function (x) { return x.slot === t; })[0];
    if (f && ctx.awaiting) G.bmsg('目標：' + f.label + '。按「攻擊」或「技能」出手！');
  };
  G.btarget = function () {
    var ctx = G.battleCtx; if (!ctx || !ctx.scene || !ctx.b) return;
    ctx.scene.setTarget(ctx.b.target, J.BattleV06.showCursor(ctx.b.foes) && !ctx.b.boss);
  };

  G.brender = function () {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), s6 = G.stats6(), b = ctx.b, h = J.UI.h;
    var pct = function (a, m) { return Math.max(0, Math.min(100, Math.round(a / m * 100))); };
    ctx.el.top.innerHTML = '';
    var bs = J.BattleFlow.bossStatus(b);
    if (bs) {
      var f0 = b.foes[0];
      // 整合9（QA D-35）：名稱和段數分兩行（直放時不會斷在「第 2／段」中間）；兩行都是整塊，不折行
      ctx.el.top.appendChild(h('div.boss-phase', {}, bs.total > 1 ? [h('div.bp-name', { text: f0.mon.name, style: { whiteSpace: 'nowrap' } }), h('div.bp-stage', { text: ('　第 ' + bs.stage + ' 段／共 ' + bs.total + ' 段').trim(), style: { whiteSpace: 'nowrap' } })]
        : [h('div.bp-name', { text: f0.mon.name, style: { whiteSpace: 'nowrap' } })]));
      var hpPct = f0.hp > 0 ? Math.max(1, pct(f0.hp, f0.maxHp)) : 0;
      ctx.el.top.appendChild(h('span.bar.boss', { role: 'progressbar', 'aria-label': f0.mon.name + ' 的體力', 'aria-valuenow': String(hpPct), style: { width: '220px' } }, [h('i', { style: { width: hpPct + '%' } })]));
      if (!b.over && bs.held) ctx.el.top.appendChild(h('div.small.boss-need', { text: '撐住了！再答對 ' + bs.need + ' 題' + (bs.stage < bs.total ? '就能識破' : '就能打倒') }));
      ctx.el.top.hidden = false;
    } else ctx.el.top.hidden = true;
    ctx.el.status.innerHTML = '';
    ctx.el.status.appendChild(h('div', { html: '<b style="color:#ffd34d">' + J.UI.esc(st.player.name) + '</b>　等級 ' + st.player.level + '<span class="small bq2-stat">　攻擊 ' + s6.ATK + '　防禦 ' + Math.round(s6.PDEF) + '</span>' }));
    ctx.el.status.appendChild(h('div', {}, ['體力 ', h('span.bar.hp', { role: 'progressbar', 'aria-label': '體力' }, [h('i', { style: { width: pct(st.player.hp, s.maxHp) + '%' } })]), ' ' + st.player.hp + '/' + s.maxHp]));
    ctx.el.status.appendChild(h('div', {}, ['魔力 ', h('span.bar.mp', { role: 'progressbar', 'aria-label': '魔力' }, [h('i', { style: { width: pct(st.player.mp, s.maxMp) + '%' } })]), ' ' + st.player.mp + '/' + s.maxMp]));
    if (ctx.scene) b.foes.forEach(function (f) { ctx.scene.setHp(f.slot, f.hp, f.maxHp); });
  };

  G.bmsg = function (text, node) { var c = G.battleCtx; if (c && c.el) { c.el.msg.textContent = text; if (node) c.el.msg.appendChild(node); } };

  // ---------- 回合（R2；規格第 0 節）
  /** 新的一回合：比速度決定誰先，再照步驟走 */
  G.bround = function () {
    var ctx = G.battleCtx; if (!ctx || ctx.over || ctx.won || !ctx.b || ctx.b.over) return;
    var s = G.stats(), s6 = G.stats6();
    var order = J.BattleV06.turnOrder(ctx.b, s6.AGI, !!(s.trait && s.trait.first));
    ctx.round = J.BattleFlow.newRound(ctx.round, order);
    ctx.roundLog = (ctx.roundLog || []).concat([order]);   // 測試用
    if (order === 'enemy' && ctx.round.n > 0) G.bmsg('敵人比較快，先出手了！');
    G.bstep();
  };
  G.bstep = function () {
    var ctx = G.battleCtx; if (!ctx || ctx.over || ctx.won || !ctx.b || ctx.b.over) return;
    var step = J.BattleFlow.nextStep(ctx.round);
    if (step === 'end') { G.bround(); return; }
    if (step === 'enemy') { setTimeout(G.benemyTurn, ctx.round.i === 1 ? 700 : 300); return; }
    G.bcommands(true);
  };

  /** 整合4：敵方回合時指令框顯示「敵人行動中…」（螢幕閱讀器會念）；輪到玩家時 bcommands(true) 會清掉換回指令 */
  G.bwaiting = function (text) {
    var ctx = G.battleCtx; if (!ctx || !ctx.el || !ctx.el.cmds) return;
    ctx.el.cmds.innerHTML = '';
    ctx.el.cmds.appendChild(J.UI.h('div.small.cmd-wait', { role: 'status', 'aria-live': 'polite', text: text || '敵人行動中…' }));
  };
  G.bcommands = function (on) {
    var ctx = G.battleCtx, h = J.UI.h, s = G.stats(), b = ctx.b;
    ctx.el.cmds.innerHTML = '';
    ctx.awaiting = !!on;
    if (!on) return;
    var has = s.skills && s.skills.length;
    var atk = h('button.primary', { onclick: function () { G.battack('attack'); } }, ['⚔️ 攻擊']);
    ctx.el.cmds.appendChild(atk);
    ctx.el.cmds.appendChild(h('button.skill-open', { disabled: !has, title: has ? '選一個技能，答對才會發動' : '見習冒險者 Lv4 會學到第一個技能', onclick: G.bskills }, ['✨ 技能']));
    ctx.el.cmds.appendChild(h('button', { onclick: G.bitems }, ['🎒 道具']));
    ctx.el.cmds.appendChild(h('button', { disabled: b.boss, onclick: G.bflee }, ['🏃 逃跑']));
    if (!ctx.el.msg.textContent || /出手了|防禦|擋|打中|閃開|Miss|沒打到|動不了/.test(ctx.el.msg.textContent)) {
      var tf = b.foes.filter(function (f) { return f.slot === b.target; })[0];
      G.bmsg('輪到你了！' + (tf && J.BattleV06.showCursor(b.foes) && !b.boss ? '目標：' + tf.label + '（點敵人可以換）' : ''));
    }
    setTimeout(function () { atk.focus(); }, 30);
  };

  /** 技能的小圖示（48 號 2.6：用特效類型的小圖示，不另外畫） */
  G.skillIcon = function (sk) { return J.SkillFx && J.SkillFx.icon ? J.SkillFx.icon(sk) : '✨'; };
  var SKILL_WHY = { mp: '魔力不夠', stun: '這場已經停過一次', armed: '已經在身上了' };

  /** 技能清單：魔力不夠變灰；答錯不扣魔力 */
  G.bskills = function () {
    var ctx = G.battleCtx, h = J.UI.h, s = G.stats(), st = G.state;
    ctx.el.cmds.innerHTML = '';
    var first = null;
    (s.skills || []).forEach(function (sk) {
      var c = J.Battle.canUseSkill(ctx.ob, sk, st.player.mp), why = c.ok ? '' : (SKILL_WHY[c.reason] || '');
      var btn = h('button.skill-btn', { disabled: !c.ok, 'data-skill': sk.id, title: (sk.desc || '') + (why ? '（' + why + '）' : ''),
        onclick: function () { G.battack('skill', sk); } },
        [h('span.skill-icon', { 'aria-hidden': 'true', text: G.skillIcon(sk) }), ' ' + sk.name + '（魔力 ' + sk.mp + '）' + (why ? '・' + why : '')]);
      if (c.ok && !first) first = btn;
      ctx.el.cmds.appendChild(btn);
    });
    var back = h('button.ghost', { onclick: function () { G.bcommands(true); } }, ['返回']);
    ctx.el.cmds.appendChild(back);
    G.bmsg('選一個技能。答對才會發動，答錯不扣魔力。');
    setTimeout(function () { (first || back).focus(); }, 30);
  };

  /**
   * 勇者大冒險II（GDD 7.4 D5）這場戰鬥輪流出題的科目：
   *   頭目（或有 subjects 的怪物）：subjects（沒寫時五科）裡、這張地圖現在有題目可出的科目，輪流；
   *   一般怪物：怪物的科目是偏好——這張地圖有那一科的題目就出那一科，沒有就由 Session 換科目。
   *   BQ2（03b R9）：科目不綁怪物；沒寫 subject 的怪物照這張地圖開放的科目輪流。
   */
  G.battleSubjects = function (mon, mapId) {
    var have = J.Curriculum.subjectsFor(G.questions, G.state, mapId);
    if (mon.boss || (mon.subjects && mon.subjects.length) || !mon.subject) {
      var list = (mon.subjects && mon.subjects.length ? mon.subjects : J.Curriculum.SUBJECTS).filter(function (s) { return have.indexOf(s) >= 0; });
      return list.length ? list : have.slice();
    }
    return [mon.subject];
  };
  G.bsubject = function () {
    var ctx = G.battleCtx, mon = ctx.mon, list = ctx.subjects || (mon.subjects && mon.subjects.length ? mon.subjects : [mon.subject]);
    if (list.length && list[0]) return list[ctx.qn % list.length];
    return mon.subject || '數學';
  };
  G.bfoe = function (slot) { var b = G.battleCtx.b; return b.foes.filter(function (f) { return f.slot === slot; })[0] || null; };
  G.bmode = function () { return G.state.settings.answerTime || 'standard'; };

  /** 主角出手：答一題（星數＝目標怪物的星數範圍均勻抽一次；03b 第 2 版 R9） */
  G.battack = function (kind, sk) {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), b = ctx.b, BV = J.BattleV06;
    var skill = kind === 'skill' ? (sk || s.skill) : null;
    if (skill && !J.Battle.canUseSkill(ctx.ob, skill, st.player.mp).ok) return;
    var subject = skill && skill.subject ? skill.subject : G.bsubject();
    var tgt = G.bfoe(BV.pickTarget(b.foes, b.target));
    var star = BV.rollStar(tgt ? tgt.mon : ctx.mon, Math.random);
    var q = J.Session.next(ctx.sess, Date.now(), { subject: subject, forceLevel: star });
    ctx.awaiting = false;
    if (!q) {
      // GDD 3.3 硬規則 2：範圍裡一題都沒有 → 不用答題的普通攻擊（技能不發動、不扣魔力），絕不出範圍外的題目
      if (G.DEBUG) console.error('[課程] ' + ctx.mapId + ' 沒有可出的題目（' + subject + '）：改成普通攻擊。開放的節點：', J.Curriculum.poolFor(ctx.mapId));
      ctx.qn++;
      ctx.plainAttacks = (ctx.plainAttacks || 0) + 1;   // 測試用
      G.bcommands(false);
      G.bmsg('（這裡的題目還在準備中，先用普通攻擊！）');
      var L = BV.timeLimitSec(1, 'standard', 1);
      setTimeout(function () { G.bresolve('attack', null, { subject: subject, level: 1 }, { correct: true, elapsedMs: L * 1000, limitMs: L * 1000 }); }, 500);
      return;
    }
    ctx.qn++;
    G.bcommands(false);
    var timerMs = Math.round(BV.timeLimitSec(q.level, G.bmode(), (s.timeMult || 1) * (ctx.ob.timeBuff || 1) * J.Battle.nextTimeMult(ctx.ob)) * 1000);
    J.Quiz.ask({
      session: ctx.sess, mode: 'battle', state: st, timerMs: timerMs,
      title: skill ? '技能「' + skill.name + '」' : '⚔️ 攻擊！', subtitle: '目標：' + (tgt ? tgt.label : ctx.mon.name),
      onSave: function () { G.save(); },
      onRewards: function (res) { G.refreshHud(); if (res) G.afterReward(res.levelsGained); },
      onDone: function (r) { if (!r.left) J.BattleFlow.noteAnswer(G.bwatch(), r); G.bresolve(kind, skill, q, r); }
    });
  };

  /** 主角那一題答完（R5–R8、R13） */
  G.bresolve = function (kind, skill, q, r) {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), s6 = G.stats6(), b = ctx.b, sc = ctx.scene, BV = J.BattleV06, BF = J.BattleFlow;
    var trait = s.trait || {};
    G.brender();
    if (!r.correct) {
      J.Session.abandon(ctx.sess);
      b.chain = BV.chainNext(b.chain, { type: r.timeout ? 'timeout' : 'miss' });   // R5：答錯、超時清掉相生紀錄
      G.bmsg(r.timeout ? '時間到！這一擊沒打出去……' : '沒打中……');
      setTimeout(G.bstep, 700);
      return;
    }
    var favored = skill && skill.subject ? true : q.subject === s.favored;
    var use = null, opt = { hits: 1, mult: 1, noCrit: false, sureCrit: false }, pre = [];
    var tgt = G.bfoe(BV.pickTarget(b.foes, b.target));
    if (skill) {
      st.player.mp = Math.max(0, st.player.mp - (skill.mp || 0));   // 答對才扣魔力
      use = J.Battle.useSkill(ctx.ob, skill, { maxHp: s.maxHp, timerOff: J.Battle.timerOff(G.bmode()), trait: trait });
      ctx.lastSkill = { id: skill.id, eff: use.eff, attack: use.attack, counted: !!use.counted, heal: use.heal || 0 };   // 測試用
      ctx.skillLog = (ctx.skillLog || []).concat([skill.id]);
      var fx = ctx.ob.fx || {};
      if (use.stunned && tgt) tgt.stun = 1;                                           // 停止：打在目標身上（新引擎的 foe.stun）
      if (fx.weak > 0 && tgt) { tgt.weak = fx.weak; tgt.weakM = fx.weakM; fx.weak = 0; }   // 減弱：搬到目標身上
      G.bmsg(G.skillIcon(skill) + ' ' + skill.name + '！');
      if (!use.attack) {
        if (use.heal) st.player.hp = Math.min(s.maxHp, st.player.hp + use.heal);
        if (b.boss) BV.heroAttack(b, 1, function () { return 0; });   // R13：回復、防護答對也算 1 題
        G.skillFx(skill, use, function () {
          G.brender(); G.refreshHud();
          G.bmsg(G.skillText(skill, use));
          setTimeout(G.bstep, 600);
        });
        return;
      }
      opt = { hits: use.hits, mult: use.mult, noCrit: use.noCrit, sureCrit: use.sureCrit };
      if (use.stunned) pre.push((tgt ? tgt.label : '') + '麻麻的，下一次不能攻擊！');
      if (use.picked) pre.push('表演抽到：' + (use.picked[0] === 'heal' ? '回復' : '大攻擊') + '！');
    }
    var buff = BF.consumeBuffs(ctx.ob.fx);
    if (buff.used.indexOf('power') >= 0) { ctx.powerUsed = (ctx.ob.fx && ctx.ob.fx.powerM) || J.Battle.OFF_SONG_POWER; pre.push('鼓舞的力量！'); }
    if (buff.used.indexOf('charge') >= 0) pre.push('蓄滿力氣的一擊！');
    if (buff.used.indexOf('up') >= 0) pre.push('力量湧上來了！');
    var atkElem = skill ? (skill.elem || null) : (s6.elem || null);
    var limitSec = (r.limitMs || 0) / 1000, elapsed = (r.elapsedMs || 0) / 1000;
    var infos = [], prevMon = b.foes[0].mon, stageMons = b.stages.map(function (g) { return g[0]; });
    var res = BV.heroAttack(b, opt.hits, function (foe, i) {
      var hs = BF.heroStrike({ hero: s6, trait: trait, foe: foe, star: q.level || 1, elapsed: elapsed, limit: limitSec, favored: favored, favMult: s.favoredMult,
        p: opt.mult * buff.mult, elem: atkElem, prevElem: i === 0 ? b.chain : atkElem, phantom: !!trait.chain, boss: b.boss,
        jobMult: (trait.power || 1) * (s.dmgMult || 1) * (b.boss && trait.bossDmg ? trait.bossDmg : 1), rand: Math.random(), sureCrit: opt.sureCrit, noCrit: opt.noCrit });
      infos.push({ slot: foe.slot, hs: hs });
      return hs.damage;
    });
    b.chain = BV.chainNext(b.chain, { type: 'hit', elem: atkElem });
    ctx.lastAttack = { parts: res.parts, infos: infos, stage: res.stage, need: res.need, skill: skill ? skill.id : null };   // 測試用
    var anyCrit = infos.some(function (x) { return x.hs.crit; });
    var fb = infos.length ? BF.elemFeedback(infos[0].hs.elemMult) : null;
    var msg = pre.slice();
    var dealt = res.parts.reduce(function (a, p) { return a + p.dealt; }, 0);
    msg.push((anyCrit ? '爆擊！' : '') + (fb ? fb.text : '') + '造成 ' + dealt + ' 點傷害！');
    if (infos.length && BF.lvDiffText(infos[0].hs.lvd)) msg.push('（' + BF.lvDiffText(infos[0].hs.lvd) + '：先練功再來會更好打）');
    res.killed.forEach(function (sl) { var f = G.bfoe(sl); if (f && !(b.boss && res.nextStage)) msg.push(f.label + '停機了！'); });
    if (res.stage === 'held') msg.push(prevMon.name + '撐住了！再答對 ' + res.need + ' 題' + (res.nextStage || b.stage + 1 < b.stages.length ? '就能識破！' : '就能打倒！'));
    var play = function (done) {
      var i = 0;
      (function next() {
        if (i >= res.parts.length) { done(); return; }
        var p = res.parts[i], inf = infos[i] ? infos[i].hs : {};
        sc.hitEffect(p.slot, b.boss ? p.dealt : p.damage, !!inf.crit, { elem: BF.elemFeedback(inf.elemMult || 1), chain: inf.chainMult > 1, lvd: BF.lvDiffText(inf.lvd) });
        sc.setHp(p.slot, G.bfoe(p.slot) ? G.bfoe(p.slot).hp : 0, G.bfoe(p.slot) ? G.bfoe(p.slot).maxHp : 1);
        if (p.killed && !b.boss) sc.downEffect(p.slot);
        i++;
        setTimeout(next, res.parts.length > 1 ? 320 : 0);
      })();
    };
    var finish = function () {
      G.brender(); G.btarget(); G.bmsg(msg.join(' '));
      var dl = BF.bossDialogs(res, prevMon, res.nextStage ? stageMons[b.stage + 1] : null);
      var chain = Promise.resolve();
      dl.forEach(function (d) {
        chain = chain.then(function () {
          if (d.kind === 'phase') sc.phaseEffect();
          if (d.kind === 'reveal') { ctx.revealed = true; G.bmsg('被識破了！'); J.UI.banner('🔍 識破了！', 'rage-banner'); }
          return G.say(d.id, []);
        });
      });
      if (res.nextStage) {
        chain.then(function () { return G.bnextStage(); });
        return;
      }
      if (b.over) { setTimeout(G.bvictory, 700); return; }
      chain.then(function () { setTimeout(G.bstep, dl.length ? 200 : 600); });
    };
    G.brender();
    if (skill) G.skillFx(skill, use, function () { play(finish); }); else play(finish);
  };

  /** 頭目換段（R13）：主角 HP、MP 不補；敵人換成下一段；從新的一回合開始 */
  G.bnextStage = function () {
    var ctx = G.battleCtx, b = ctx.b;
    J.BattleV06.nextStage(b);
    if (ctx.ob && ctx.ob.fx) ctx.ob.fx.stunUsed = 0;   // 整合3（審查 S-2，03b R13 換段第 4 點）：停止技能的每場 1 次重算
    ctx.mon = b.foes[0].mon;
    ctx.stageLog = (ctx.stageLog || []).concat([ctx.mon.id]);   // 測試用
    return new Promise(function (resolve) {
      ctx.scene.stageEffect(G.bsceneFoes(b), G.bdecor(b), function () {
        G.brender(); G.btarget();
        G.bmsg('第二段開始！' + ctx.mon.name + '出現了！（你的體力不會補滿，小心！）');
        ctx.round = null;
        setTimeout(G.bround, 900);
        resolve();
      });
    });
  };

  /** 技能特效（M3：JQ.SkillFx 程式畫；可跳過、減少動態效果）。沒有特效模組時直接往下 */
  G.skillFx = function (skill, use, done) {
    var sc = G.battleCtx && G.battleCtx.scene;
    if (J.SkillFx && sc && J.SkillFx.play) { J.SkillFx.play(sc, skill, use, done); return; }
    if (sc && use && (use.heal || use.eff === 'revive' || use.eff === 'guard')) sc.healEffect();
    done();
  };

  /** 不造成傷害的技能答對後的訊息 */
  G.skillText = function (skill, use) {
    var ctx = G.battleCtx, t = G.bfoe(J.BattleV06.pickTarget(ctx.b.foes, ctx.b.target)), name = t ? t.label : ctx.mon.name, a = skill.arg || {}, n = skill.name + '！';
    switch (use.eff) {
      case 'heal': return n + '體力回復了 ' + use.heal + ' 點。';
      case 'revive': return n + '這場累倒時，會馬上站起來。';
      case 'guard': return n + '接下來被打 ' + (a.t || 1) + ' 次，傷害變成一半。';
      case 'weaken': return n + name + '變沒力氣了（' + (a.t || 1) + ' 次）。';
      case 'stun': return use.stunned ? n + name + '下一次不能攻擊！' : n + '這場已經停過一次，沒有效果。';
      case 'atk_up': return n + '接下來 ' + (a.t || 1) + ' 次攻擊變強了！';
      case 'charge': return n + '下一次攻擊會變超強！';
      case 'time_up': return use.offPower ? n + '接下來答對 ' + (a.t || 1) + ' 次，傷害變成 ' + use.offPower + ' 倍。' : n + '接下來 ' + (a.t || 1) + ' 題的時間變長了' + (a.atk ? '，也打得比較痛' : '') + '。';
      default: return n;
    }
  };

  // ---------- 敵方回合（R9–R12）：還活著的敵人一起出手，合併成一題防禦題
  G.benemyTurn = function () {
    var ctx = G.battleCtx; if (!ctx || ctx.over || ctx.won || ctx.b.over) return;
    var b = ctx.b, BV = J.BattleV06;
    G.bcommands(false);
    G.bwaiting();   // 整合4（UI 工程師回報）：敵方回合指令框不要空白
    var plan = BV.enemyPlan(b, G.bmode(), Math.random);
    ctx.lastPlan = plan;   // 測試用
    if (!plan.question) { G.bmsg('敵人都動不了！'); setTimeout(G.bstep, 800); return; }
    var names = plan.attackers.map(function (a) { var f = G.bfoe(a.slot); return f ? f.label + (a.skill && f.mon.skill ? '（' + f.mon.skill.name + '）' : '') : ''; }).filter(Boolean);
    G.bmsg('⚠️ ' + names.join('、') + (plan.attackers.length > 1 ? '一起' : '') + '攻過來了！答對題目來防禦——答得越快，受傷越少！');
    var q = J.Session.next(ctx.sess, Date.now(), { subject: G.bsubject(), forceLevel: plan.question.star });
    if (!q) {   // 範圍裡沒有題目：照「答對、用了一半時間」算（輕傷），不出範圍外的題目
      setTimeout(function () { G.bdefend(plan, { correct: true, elapsedMs: plan.question.limitMs * 0.6, limitMs: plan.question.limitMs }); }, 900);
      return;
    }
    ctx.qn++;
    setTimeout(function () {
      J.Quiz.ask({
        session: ctx.sess, mode: 'battle', state: G.state, timerMs: plan.question.limitMs,
        title: '🛡️ 防禦！', subtitle: names.join('、'), defense: true,
        hintText: '答得越快，受到的傷害越少！在前 1/4 答對就是完美防禦。',
        onSave: function () { G.save(); },
        onRewards: function (res) { G.refreshHud(); if (res) G.afterReward(res.levelsGained); },
        onDone: function (r) { if (!r.left) J.BattleFlow.noteAnswer(G.bwatch(), r); if (!r.correct) J.Session.abandon(ctx.sess); G.bdefend(plan, r); }
      });
    }, 900);
  };

  /** 防禦題答完 → 五種受傷程度（R11）、閃避（R12）、每隻分開算傷害 */
  G.bdefend = function (plan, r) {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), s6 = G.stats6(), b = ctx.b, BV = J.BattleV06, BF = J.BattleFlow;
    var trait = s.trait || {}, fx = ctx.ob.fx || {};
    var limitSec = plan.question.sec;
    // 職業特性（切片沿用）：答錯時舞者閃避、搞笑藝人逗笑
    if (!r.correct && trait.evade && Math.random() < trait.evade) { G.bmsg('輕巧一轉，閃過了全部的攻擊！'); setTimeout(G.bstep, 900); return; }
    if (!r.correct && trait.laugh && Math.random() < trait.laugh) { G.bmsg('敵人笑到忘了攻擊！'); setTimeout(G.bstep, 900); return; }
    // 整合3（審查 S-3，技術長裁定照 03b 第 671 行「保留不改」）：答題時間關閉時，弓箭手每場可以閃過一次答錯後的攻擊
    if (!r.correct && J.Battle.dodgeOnWrong(ctx.ob, st.settings.answerTime, s.timeMult)) { G.bmsg('看準了時機，閃過了這次攻擊！'); setTimeout(G.bstep, 900); return; }
    var guardM = fx.guard > 0 ? fx.guardM : 1;
    var hurt = BV.enemyResolve(b, plan, { correct: !!r.correct, elapsed: (r.elapsedMs || 0) / 1000, limit: limitSec },
      { pdef: s6.PDEF * (J.SpecialItems ? J.SpecialItems.guardMult(st) : 1), heroAgi: s6.AGI,   // 整合2：艋舺糕餅 防禦 +20%
        taken: trait.dmgTaken, guardM: guardM, rng: Math.random, varyRng: Math.random });
    if (fx.guard > 0 && hurt.total > 0) fx.guard -= 1;
    var txt = BF.defenseText(hurt, function (sl) { var f = G.bfoe(sl); return f ? f.label : ''; });
    ctx.lastHurt = { tier: hurt.tier, total: hurt.total, hits: hurt.hits, title: txt.title };   // 測試用
    ctx.tierLog = (ctx.tierLog || []).concat([hurt.tier]);   // 測試用
    var hh = J.Battle.heroHurt(st, hurt.total);
    var revived = hh.ko ? J.Battle.tryRevive(ctx.ob, st, s.maxHp) : 0;
    ctx.scene.hurtEffect(plan.attackers.map(function (a) { return a.slot; }), hurt.tier);
    ctx.scene.tierBanner(txt);
    G.brender(); G.refreshHud();
    var h = J.UI.h;
    var node = h('div.bq2-tier.' + txt.cls, {}, [h('b', { text: txt.icon + ' ' + txt.title }), h('span.small', { text: '（' + txt.spec + '）' }),
      h('div.small', { text: txt.lines.join('　') + (hurt.total ? '　合計受到 ' + hurt.total + ' 點傷害' : '') + (guardM < 1 && hurt.total ? '（防護擋住了一半）' : '') })]);
    G.bmsg('', node);
    if (revived) { ctx.scene.healEffect(); node.appendChild(h('div.small', { text: '不倒祈願！又站起來了（體力 ' + revived + '）！' })); }
    if (hh.ko && !revived) { setTimeout(G.bko, 1400); return; }
    setTimeout(G.bstep, 1500);
  };

  G.bitems = function () {
    var ctx = G.battleCtx, st = G.state, D = G.data, h = J.UI.h;
    var usable = Object.keys(st.inventory).filter(function (id) { var it = D.items[id]; return it && st.inventory[id] > 0 && it.type === 'consumable' && (it.heal > 0 || it.mp > 0); });
    ctx.el.cmds.innerHTML = '';
    if (!usable.length && !(J.SpecialItems && J.SpecialItems.battleList(st, window.ITEMS || {}, ctx.b).length)) { G.bmsg('沒有可以用的道具。'); }   // 整合2：只有煙霧彈時不說沒有道具
    usable.forEach(function (id) {
      var it = D.items[id];
      ctx.el.cmds.appendChild(h('button', { onclick: function () {
        var r = J.Character.useItem(st, id, D);
        if (!r.ok) { G.bmsg(r.reason === 'full' ? '體力是滿的，不用吃喔。' : '現在不能用。'); return; }
        ctx.b.chain = J.BattleV06.chainNext(ctx.b.chain, { type: 'item' });   // R5：用道具清掉相生紀錄
        ctx.scene.healEffect();
        G.brender(); G.refreshHud();
        G.bmsg('用了' + it.name + '，體力回復 ' + r.healed + ' 點！');
        G.bcommands(false);
        setTimeout(G.bstep, 800);
      } }, [it.name + ' ×' + st.inventory[id]]));
    });
    G.bspecialItems(h);   // 整合2：煙霧彈
    ctx.el.cmds.appendChild(h('button.ghost', { onclick: function () { G.bcommands(true); } }, ['返回']));
    var f = ctx.el.cmds.querySelector('button'); if (f) f.focus();
  };

  /** 整合2：戰鬥道具清單加上煙霧彈（一般戰鬥逃跑一定成功；頭目戰按了只提示、不消耗） */
  G.bspecialItems = function (h) {
    var ctx = G.battleCtx, st = G.state, SI = J.SpecialItems;
    if (!SI || !ctx) return;
    SI.battleList(st, window.ITEMS || {}, ctx.b).forEach(function (row) {
      var it = G.data.items[row.id] || { name: row.id };
      ctx.el.cmds.appendChild(h('button', { onclick: function () {
        var r = SI.useSmoke(st, window.ITEMS || {}, row.id, ctx.b);
        if (!r.ok) { G.bmsg(SI.REASON_TEXT[r.reason] || '現在不能用。'); return; }
        G.bcommands(false);
        G.state.stats.battles.fled = (G.state.stats.battles.fled || 0) + 1;
        G.smokeLog = (G.smokeLog || []).concat([row.id]);   // 測試用
        G.bmsg('噗！白煙冒出來，趁機逃開了！');
        G.refreshHud();
        setTimeout(function () { G.bend('fled'); }, 700);
      } }, [it.name + ' ×' + st.inventory[row.id] + (row.ok ? '' : '（頭目戰不能用）')]));
    });
  };

  /** 整合2：地圖選單用特殊道具（回程車票、艋舺糕餅）。回 { ok, text } */
  G.useSpecial = function (id) {
    var SI = J.SpecialItems, st = G.state, raw = window.ITEMS || {}, scene = G.mapScene;
    if (!SI) return { ok: false, text: '現在不能用。' };
    var kind = SI.kindOf(SI.effectOf(raw, id)), inBattle = !!(G.battleCtx && !G.battleCtx.over);
    var r;
    if (kind === 'ticket') {
      r = SI.useTicket(st, raw, id, { inBattle: inBattle, map: scene && scene.map, valid: G.validDest });   // 整合6：目的地要存在、能站
      if (!r.ok) return { ok: false, text: SI.REASON_TEXT[r.reason] || '現在不能用。' };
      G.save();
      G.ticketLog = (G.ticketLog || []).concat([r.to.map]);   // 測試用
      if (scene) scene.leaveBy({ to: r.to.map, tx: r.to.tx, ty: r.to.ty });
      return { ok: true, close: true, text: '🎫 搭上捷運，回到' + (r.to.name || '捷運站') + '。' };
    }
    if (kind === 'guard') {
      r = SI.useGuard(st, raw, id, { inBattle: inBattle });
      if (!r.ok) return { ok: false, text: SI.REASON_TEXT[r.reason] || '現在不能用。' };
      G.save();
      return { ok: true, text: '🛡️ 吃了糕餅，接下來 ' + r.battles + ' 場戰鬥防禦變強！' };
    }
    if (kind === 'smoke') return { ok: false, text: SI.REASON_TEXT['not-battle'] };
    return { ok: false, text: '現在不能用。' };
  };

  G.bflee = function () {
    var ctx = G.battleCtx;
    G.bcommands(false);
    var tr = G.stats().trait || {};
    ctx.b.chain = J.BattleV06.chainNext(ctx.b.chain, { type: 'flee' });
    if (J.Battle.tryFlee(ctx.b.boss, null, !!tr.fleeSure)) {   // 船員：逃跑一定成功
      G.state.stats.battles.fled = (G.state.stats.battles.fled || 0) + 1;
      G.bmsg('順利逃開了！');
      setTimeout(function () { G.bend('fled'); }, 700);
    } else {
      G.bmsg('逃不掉！');
      setTimeout(G.bstep, 700);   // R17-24：逃跑失敗時敵人照 R9 出手（回合本來就有敵方步驟）
    }
  };

  /**
   * 第三批（GDD 4.4）：委託素材（monsters.js drops[].quest）只在那個委託進行中、還沒收集夠的時候掉。回傳掉落表過濾過的怪物（不改原資料）
   */
  G.questDrops = function (mon) { return J.QuestLog.questDrops(G.state, G.data.quests, mon, { map: G.battleCtx ? G.battleCtx.mapId : (G.mapScene && G.mapScene.mapId) }); };   // 整合2：帶地圖（drops[].maps）

  /** 職階（經驗表用；03b R14）：novice／basic／inter／adv */
  G.jobTier = function () { var j = G.data.jobs[G.state.player.job] || {}; return j.tier || 'novice'; };

  /** 勝利（R14）：經驗、金幣是每隻（頭目兩段）的合計；掉落每隻各擲一次 */
  G.bvictory = function () {
    var ctx = G.battleCtx, st = G.state, b = ctx.b;
    ctx.awaiting = false;
    ctx.scene.wakeEffect();
    var lvl = st.player.level;
    var s0 = G.stats(), trait = s0.trait || {}, vt = J.Battle.victoryTraits(ctx.ob, trait, s0.maxMp);
    var vr = J.BattleFlow.settleVictory(b, vt.goldMult, function (m) { return J.Battle.rollDrops(G.questDrops(m), null, 0, trait.drop || 1); });
    var ans = J.Session.settleBattle(ctx.sess);   // 這場完成的每日小任務金幣、舊存檔的暫存經驗值
    J.Exp.addExpV06(st.player, vr.exp, G.jobTier());
    st.player.coins += vr.gold;
    ctx.reward = { exp: vr.exp, coins: vr.gold + ans.daily, monsterGold: vr.gold, daily: ans.daily, drops: vr.drops.slice() };   // 測試用
    var drops = vr.drops;
    var stealN = (ctx.ob.fx && ctx.ob.fx.steal) || 0;
    if (trait.steal && Math.random() < trait.steal) stealN += 1;   // 盜賊 trait.steal（R15）
    for (var si = 0; si < stealN; si++) { var got = J.Battle.stealItem(vr.mons[Math.floor(Math.random() * vr.mons.length)]); if (got) drops.push(got); }
    if (vt.mp > 0) st.player.mp = Math.min(s0.maxMp, st.player.mp + vt.mp);
    var last = vr.mons[vr.mons.length - 1];
    if (vt.friend) { st.bestiary[last.id] = st.bestiary[last.id] || {}; st.bestiary[last.id].friend = true; }
    ctx.traits = vt;   // 測試用
    drops.forEach(function (it) { J.Character.addItem(st, it, 1); });
    st.stats.battles.won = (st.stats.battles.won || 0) + 1;
    vr.mons.forEach(function (m) { J.Bestiary.defeated(st, m.id); });
    G.stopBgm(200);
    var boss = b.boss;
    G.jingle(boss && drops.length ? 'rare_item' : 'victory', null, null, 7000);
    var h = J.UI.h;
    var lines = [(last && last.wake) || '全部停機了！', '經驗值 +' + ctx.reward.exp + '　金幣 +' + ctx.reward.coins];
    if (drops.length) lines.push('得到：' + drops.map(function (d) { return (G.data.items[d] || {}).name || d; }).join('、'));
    if (vt.mp > 0) lines.push('琴聲讓魔力回復 ' + vt.mp + ' 點');
    if (vt.friend) lines.push('拿到「' + last.name + '」的怪物朋友卡！');
    var levels = st.player.level - lvl;
    if (levels > 0) lines.push('⬆️ 等級提升！（' + lvl + ' → ' + st.player.level + '）');
    var card = h('div.bq2-victory', {}, [h('b', { text: '🏆 勝利！' })].concat(lines.map(function (t) { return h('div', { text: t }); })));
    G.bmsg('', card);
    G.refreshHud();
    var done = [];
    if (boss) vr.mons.forEach(function (m) { if (m.boss) done = done.concat(J.QuestLog.onBossDefeated(st, G.data.quests, m.id, G.data) || []); });
    ctx.won = true;
    G.save();
    var after = boss && last.dialog_after ? function () { return G.say(last.dialog_after, []); } : function () { return Promise.resolve(); };
    ctx.el.cmds.innerHTML = '';
    var btn = h('button.primary', { onclick: function () {
      btn.disabled = true;
      after().then(function () {
        G.bend('win');
        G.afterReward(levels);   // 升級補滿 HP／MP（Character.onLevelUp）
        var chain = Promise.resolve();
        done.forEach(function (qr) { chain = chain.then(function () { return G.questDone(qr.id, qr, G.mapScene, 0); }); });
        chain.then(function () { return G.checkAguAuto(G.mapScene); }).then(function () { return G.bossAfter(vr.mons); });
      });
    } }, ['繼續 ▶']);
    ctx.el.cmds.appendChild(btn);
    setTimeout(function () { btn.focus(); }, 30);
  };

  /**
   * 整合：頭目戰後（委託 boss_after）播對話並傳送（M6：D_C01_TIME_BACK → 回 TI1 (15,17)，再把翠玉白菜交給陳館長）。
   * 委託還在進行中（最後一步沒做）才會播；破關後重遊不再播
   */
  G.bossAfter = function (mons) {
    var st = G.state, Q = G.data.quests, ids = (mons || []).map(function (m) { return m.id; });
    var qid = Object.keys(Q).filter(function (id) {
      var q = Q[id];
      return q.boss_after && J.QuestLog.status(st, Q, id) === 'active' && ids.indexOf(J.QuestLog.bossTarget(q)) >= 0;
    })[0];
    if (!qid) return Promise.resolve();
    var ba = Q[qid].boss_after;
    G.bossAfterLog = (G.bossAfterLog || []).concat([qid]);   // 測試用
    return new Promise(function (resolve) { setTimeout(resolve, 300); }).then(function () { return G.say(ba.dialog, []); }).then(function () {
      if (Q[qid].goal_after) J.UI.toast('新的目標：' + Q[qid].goal_after, 6000);
      var w = ba.warp;
      if (w && G.mapScene) G.mapScene.leaveBy({ to: w.to, tx: w.tx, ty: w.ty });
    });
  };

  /** 累倒：頭目戰播「輸了再來」（目前這一段的；再挑戰從第一段重來） */
  G.bko = function () {
    var ctx = G.battleCtx, b = ctx.b, cur = ctx.mon, firstMon = b.stages[0][0];
    ctx.awaiting = false;
    G.bmsg('累倒了……');
    G.stopBgm(200);
    G.jingle('faint', null, 'hurt', 7000);
    var again = b.boss ? ((cur && cur.dialog_again) || (firstMon && firstMon.dialog_again)) : null;
    G.say('D_FAINT', [{ who: 'pet', text: '線索還沒找齊，回休息站整理偵探筆記吧！' }, { who: 'pet', text: '沒關係！金幣和道具都還在喔。' }])
      .then(function () { return again ? G.say(again, []) : null; })
      .then(function () { G.bend('ko'); });
  };

  G.bend = function (result) {
    var ctx = G.battleCtx;
    if (!ctx || ctx.over) return;
    ctx.over = true;
    ctx.awaiting = false;
    if (ctx.onKey) document.removeEventListener('keydown', ctx.onKey);
    var late = J.Session.settleBattle(ctx.sess);
    ctx.lateDaily = late.daily;   // 測試用
    if (J.SpecialItems) J.SpecialItems.battleEnded(G.state);   // 整合2：艋舺糕餅效果扣 1 場（勝、逃、倒下都算）
    if (ctx.sess) { var byId = {}; G.questions.forEach(function (x) { byId[x.id] = x; }); J.Curriculum.recordBattle(G.state, ctx.sess.asked.map(function (id) { return byId[id]; }).filter(Boolean)); }
    if (late.levels > 0) setTimeout(function () { G.afterReward(late.levels); }, 900);
    // R10：這場有連續超時 3 次 → 戰鬥結束後提示（只提示，不自動改設定；冷卻 10 場、寬鬆／不計時不提示）
    var hint = J.BattleFlow.endHint(G.bwatch(), G.bmode());
    G.lastTimeoutHint = hint ? Date.now() : (G.lastTimeoutHint || 0);   // 測試用
    if (ctx.ui) ctx.ui.close(true);
    J.TTS.stop();
    G.phaser.scene.stop('Battle');
    J.HUD.show(true);
    G.refreshHud();
    // 整合4 S-4：先過家長確認 → 家長畫面（改成寬鬆／先不要）；沒通過或取消就照舊只播阿咕那一句
    if (hint) setTimeout(function () { J.Settings.suggestRelaxed(G).then(function (r) { if (r === false) G.say(null, [{ who: 'agu', text: J.BattleFlow.HINT_TEXT }]); }); }, 700);
    var mob = ctx.mob && ctx.mob.sprite ? ctx.mob : null;   // 除錯入口開的戰鬥沒有地圖上的怪物
    if (result === 'ko') {
      var to = J.Character.knockout(G.state, G.data, { map: G.data.startMap, x: undefined, y: undefined });
      G.save();
      G.phaser.scene.wake('Map', { result: 'ko', mob: mob });
      G.refreshHud();
      if (to) G.mapScene.scene.restart({ mapId: to.map, x: to.x, y: to.y, facing: 'down' });
      return;
    }
    G.save();
    G.phaser.scene.wake('Map', { result: result, mob: mob });
    if (G.mapScene) G.bgm(J.MapInfo.bgmFor(G.mapScene.map));
  };

  /** 旅店休息：畫面慢慢變暗，播旅店短曲，播完才亮回來（沒有音樂時約 1.5 秒） */
  G.innRest = function () {
    return new Promise(function (resolve) {
      G.busy = true;
      var veil = J.UI.h('div.inn-veil', { 'aria-hidden': 'true' }, [J.UI.h('div', { text: '💤 休息中……' })]);
      document.getElementById('ui').appendChild(veil);
      setTimeout(function () { veil.classList.add('on'); }, 20);
      G.stopBgm(400);
      G.jingle('inn_rest', function () {
        veil.classList.remove('on');
        setTimeout(function () {
          if (veil.parentNode) veil.parentNode.removeChild(veil);
          G.busy = false;
          if (G.mapScene) G.bgm(J.MapInfo.bgmFor(G.mapScene.map));
          resolve();
        }, 450);
      }, 'levelup', 8000);
    });
  };

  /** 拿到珍貴道具（職業武器、頭目掉落、名冊獎勵）時的短曲 */
  G.rareItem = function () { G.jingle('rare_item', null, 'chest'); };

  /**
   * v0.7：資料與圖檔不是同一版（瀏覽器快取到舊檔：背景尺寸≠格子數×32，或背景圖已經換掉讀不到）。
   * 顯示「遊戲剛更新，請重新整理」並提供重新整理按鈕；同一次開遊戲只問一次。
   */
  G.versionIssues = [];
  G.versionMismatch = function (info) {
    G.versionIssues.push(info);
    console.warn('[版本] 地圖資料和圖檔不是同一版：', info);
    if (G.versionAsked) return;
    G.versionAsked = true;
    setTimeout(function () {
      J.UI.confirm('遊戲剛更新了！請按「重新整理」，載入最新的地圖。（進度已經自動存好，不會不見。）', '重新整理', '等一下').then(function (yes) {
        if (!yes) return;
        Promise.resolve(G.state ? G.save(true) : null).then(function () { location.reload(); }, function () { location.reload(); });
      });
    }, 300);
  };

  // ---------------------------------------------------------------- 台灣世界地圖
  G.openWorldMap = function () {
    if (!G.state) return;
    J.WorldMapUI.open(G, function (region) {
      var e = J.WorldMap.entry(region, G.data.maps);
      if (!e || !G.data.maps[e.map]) { J.UI.toast('這個地區還在準備中。'); return; }
      J.Audio.play('warp');
      G.changeMap(e.map, e.x, e.y, 'down');
    });
  };

  // ---------------------------------------------------------------- 存檔碼、刪檔
  G.importCode = function (code) {
    J.SaveCode.importAny(code).then(function (r) {
    if (!r.ok) { J.UI.toast('讀取失敗：' + r.error, 4000); return; }
    J.UI.confirm('確定要用這個存檔碼（' + r.state.player.name + '・等級 ' + r.state.player.level + '）覆蓋目前的進度嗎？', '覆蓋', '取消').then(function (y) {
      if (!y) return;
      G.state = r.state;
      G.save(true).then(function () { location.reload(); });
    });
    });
  };

  G.deleteSave = function () {
    clearInterval(G.tickTimer);
    G.provider['delete'](SLOT).then(function () { G.state = null; location.reload(); });
  };

  // ---------------------------------------------------------------- 遊玩時間
  G.tick = function () {
    var st = G.state;
    if (!st) return;
    if (document.visibilityState === 'hidden') { J.Playtime.pause(st.playtime); return; }
    var now = Date.now();
    if (J.Daily.ensure(st.daily, now)) J.UI.toast('新的一天！每日小任務換新了。');
    var ev = J.Playtime.tick(st.playtime, st.settings, now);
    // 今日上限：不在冒險途中硬擋——戰鬥、對話、題目或其他視窗開著時先記著，結束後才顯示（上限本身不變）
    if ((ev.indexOf('limit') >= 0 || G.limitPending) && !G.limitHandle) {
      // 打贏後（勝利畫面、戰後對話）inBattle() 已是 false，但戰鬥還沒結束：一樣等到按「繼續」之後
      // v0.9.3：放大地圖（passMove 視窗）開著時還能走，不能拿來延後上限 → 用 blocksMove()，顯示上限前先關掉放大地圖
      // v1.0 立志小考（G.inTrial）考試中不會被每日上限打斷，考完才顯示
      if (G.inTrial || G.inBattle() || (G.battleCtx && !G.battleCtx.over) || G.busy || J.UI.blocksMove() || (G.mapScene && G.mapScene.transitioning)) { G.limitPending = true; }
      else if (J.Playtime.isOverLimit(st.playtime, st.settings, now)) { G.limitPending = false; G.save(); J.UI.closeLoadBars && J.UI.closeLoadBars(); J.UI.closePassMove(); J.Settings.limitScreen(G); return; }
      else G.limitPending = false;
    }
    if (ev.indexOf('rest') >= 0) { if (G.inTrial) G.restPending = true; else J.Settings.restReminder(); }
    else if (G.restPending && !G.inTrial) { G.restPending = false; J.Settings.restReminder(); }
    if (now - G.lastSave > 30000) G.save();
  };
  document.addEventListener('visibilitychange', function () { if (G.state) { J.Playtime.pause(G.state.playtime); if (document.visibilityState === 'hidden') G.save(); } });

  // ---------------------------------------------------------------- 測試用（自動化測試會呼叫；一般遊玩用不到）
  G.debug = {
    state: function () { return G.state; },
    mapId: function () { return G.mapScene && G.mapScene.mapId; },
    player: function () { var p = G.mapScene && G.mapScene.p; return p ? { x: p.tx, y: p.ty, moving: p.moving } : null; },
    walkTo: function (x, y) { return G.mapScene.walkTo(x, y, G.mapScene.interactableAt(x, y)); },
    exits: function () { return (G.mapScene.map.exits || []).slice(); },
    chests: function () { return (G.mapScene.map.chests || []).map(function (c) { return { id: c.id, x: c.x, y: c.y, opened: !!G.state.chests[c.id] }; }); },
    npcs: function () { return G.mapScene.npcs.map(function (n) { return { id: n.data.id, x: n.data.x, y: n.data.y }; }); },
    animals: function () { return (G.mapScene.animals || []).map(function (a) { return { id: a.spec.id, x: a.tx, y: a.ty, area: a.spec.area, moving: a.moving }; }); },
    monsters: function () { return G.mapScene.monsters.filter(function (m) { return m.active; }).map(function (m) { return { id: m.id, x: m.tx, y: m.ty }; }); },
    /** 讓最近的怪物走到主角面前（觸發和真的碰到一樣的戰鬥流程） */
    encounter: function () {
      var sc = G.mapScene, act = sc.monsters.filter(function (m) { return m.active && !m.boss; });
      if (!act.length) return false;
      var m = act[0];
      sc.tweens.killTweensOf(m.sprite);
      m.bob = null;
      m.moving = false; m.nextMove = sc.time.now + 60000;
      m.tx = sc.p.tx; m.ty = sc.p.ty;
      m.sprite.setPosition(sc.player.x, sc.player.y);
      sc.encounterCooldown = 0;
      return true;
    },
    inBattle: function () { return !!(G.battleCtx && !G.battleCtx.over && G.battleCtx.b); },
    currentQuestion: function () {
      if (G.inTrial && G.inTrial.cur) { var tq = G.inTrial.cur; return { id: tq.id, type: tq.type, answer: tq.answer, options: tq.options, subject: tq.subject, trial: true }; }   // v1.0 立志小考（選項打亂後的答案）
      var s = (G.battleCtx && !G.battleCtx.over && G.battleCtx.sess) || G._lastSess;
      return s && s.q ? { id: s.q.id, type: s.q.type, answer: s.q.answer, options: s.q.options, subject: s.q.subject } : null;
    },
    teleport: function (mapId, x, y) { G.changeMap(mapId, x, y, 'down'); },
    /** 讓頭目移到主角旁邊（頭目要在委託進行中才會出現） */
    encounterBoss: function () {
      var sc = G.mapScene, b = sc.monsters.filter(function (m) { return m.active && m.boss; })[0];
      if (!b) return false;
      sc.tweens.killTweensOf(b.sprite);
      b.sprite.setPosition(sc.player.x, sc.player.y);
      sc.encounterCooldown = 0;
      return true;
    },
    setQuest: function (id, status) { G.state.quests[id] = { status: status, progress: 0 }; G.save(); },
    setHp: function (hp) { G.state.player.hp = hp; G.refreshHud(); },
    battle: function () { var c = G.battleCtx; if (!c || !c.b) return null; var f = c.b.foes[0] || {}; return { hp: f.hp, maxHp: f.maxHp, phase: c.b.stage + 1, stage: c.b.stage, boss: c.b.boss, over: c.over,
      foes: c.b.foes.map(function (x) { return { slot: x.slot, id: x.id, label: x.label, hp: x.hp, maxHp: x.maxHp }; }), target: c.b.target, won: !!c.won,
      tiers: (c.tierLog || []).slice(), rounds: (c.roundLog || []).slice(), stages: (c.stageLog || []).slice(), revealed: !!c.revealed, lastHurt: c.lastHurt || null, lastAttack: c.lastAttack || null }; },
    /**
     * BQ2 v0.6 除錯入口（只有本機 ?debug=1 才有，G.DEBUG）：直接開一場指定編組的戰鬥。
     * ids＝['strap','strap','clockbug']；頭目兩段：['b01_appraiser']（第二段照 next_stage 自動接上）
     */
    battleV06: function (ids, stages) {
      if (!G.DEBUG || !G.mapScene || G.inBattle()) return false;
      var first = G.bmon(ids[0]); if (!first) return false;
      var st = stages || (first.boss ? J.BattleFlow.buildGroup(first, null, [], 1, Math.random, G.data.monsters).stages : []);
      G.startBattle({ mon: first, id: first.id, debugGroup: { ids: ids.slice(0, 5), stages: st } }, G.mapScene);
      return true;
    },
    timeoutWatch: function () { return Object.assign({}, G.bwatch()); },
    lastTimeoutHint: function () { return G.lastTimeoutHint || 0; },
    heroTexture: function () { return G.mapScene && G.mapScene.player.texture.key; },
    openWorldMap: function () { G.openWorldMap(); },
    /** 前景（上層格 'U'）示範：把主角所在格與上面兩格改成上層格，重新載入地圖，主角就會被前景擋住並顯示剪影 */
    fgDemo: function () {
      var sc = G.mapScene, m = sc.map, x = sc.p.tx, y = sc.p.ty;
      m.grid = m.grid.map(function (row, ry) {
        if (ry < y - 2 || ry > y) return row;
        var a = row.split('');
        for (var rx = x - 1; rx <= x + 1; rx++) if (a[rx] && sc.walkable(rx, ry) && !J.World.exitAt(m, rx, ry)) a[rx] = 'U';
        return a.join('');
      });
      sc.scene.restart({ mapId: sc.mapId, x: x, y: y, facing: 'down' });
      return true;
    },
    ghostVisible: function () { return !!(G.mapScene && G.mapScene.ghost && G.mapScene.ghost.visible); },
    seeMonsters: function (n, defeatedTimes) {
      J.Bestiary.split(G.data.monsters, G.data.maps).all.slice(0, n).forEach(function (id) { var r = J.Bestiary.rec(G.state, id); r.seen = Math.max(r.seen, 1); if (defeatedTimes) r.defeated = Math.max(r.defeated, defeatedTimes); });
      G.save();
    },
    musicLog: function () { return G.musicLog.slice(); },
    mapLoadLog: function () { return G.mapLoadLog.slice(); },
    /** 效能：目前 FPS（Phaser 量測）、畫面物件數、鏡頭附近的怪物數、背景分塊數 */
    perf: function () { var p = G.mapScene ? G.mapScene.perfInfo() : {}; p.fps = G.phaser ? Math.round(G.phaser.loop.actualFps * 10) / 10 : 0; return p; },
    // 勇者大冒險II（GDD 7.3 C7）：開發版看目前地圖貼圖用了多少記憶體（map: 開頭的背景、前景與切塊），以及換地圖時釋放了哪些
    texMem: function () {
      var tm = G.phaser && G.phaser.textures, keys = tm ? tm.getTextureKeys() : [];
      var r = J.TexRelease.mapBytes(keys, function (k) { var s = tm.get(k).getSourceImage(); return s ? { w: s.width, h: s.height } : null; });
      return { mapTextures: keys.filter(function (k) { return J.TexRelease.fileOf(k) !== null; }), mib: r.mib, released: G.texReleaseLog || [] };
    },
    camera: function () { var c = G.mapScene.cameras.main, v = c.worldView; return { x: v.x, y: v.y, w: v.width, h: v.height, mapW: G.mapScene.size.w * C.TILE, mapH: G.mapScene.size.h * C.TILE }; },
    bigPilot: function () { return G.bigPilot || null; },
    gateAsks: function () { return G.gateAsks || 0; },
    monsterTiles: function () { return G.mapScene.monsters.filter(function (m) { return m.active; }).map(function (m) { return { id: m.id, idx: m.idx, x: m.tx, y: m.ty, visited: m.visited || 0, area: m.spawn.area }; }); },
    setLevel: function (lv) { G.state.player.level = lv; J.Character.restoreFull(G.state, G.data); G.refreshHud(); },
    // 第三批（smoke 用）：委託狀態、旗標、阿咕、到達台詞、捷運紀錄、NPC 朝向
    questStatus: function (id) { return J.QuestLog.status(G.state, G.data.quests, id); },
    flags: function () { return Object.assign({}, G.flags()); },
    aguMarker: function () { return G.aguMarker(); },
    lastArrive: function () { return G.lastArrive || null; },
    mrtLog: function () { return (G.mrtLog || []).slice(); },
    questDoneLog: function () { return (G.questDoneLog || []).slice(); },
    npcFacing: function (id) { var n = G.mapScene.npcs.filter(function (o) { return o.data.id === id; })[0]; return n ? (n.facing || 'down') : null; },
    lastSage: function () { return G.lastSage || null; },
    blocked: function () { return G.blocked(); }
  };

  // 讓 debug.currentQuestion 在委託／寶箱時也找得到題目
  var origAsk = J.Quiz.ask;
  J.Quiz.ask = function (o) { G._lastSess = o.session; return origAsk(o); };

  window.JQ = window.JQ || {};
  window.JQ.Game = G;
})();
