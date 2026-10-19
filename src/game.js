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
      quests: function () { if (!G.blocked()) J.Menus.questList(G); },
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

  G.startWorld = function (isNew) {
    var st = G.state;
    J.Daily.ensure(st.daily, Date.now());
    J.Character.clampVitals(st, G.data);
    // v0.5：地圖放大後，舊存檔的位置（location、lastInn）換算到新地圖最近能站的格子
    var moved = J.MapInfo.migrateCoords(st, G.data.maps, G.data.tilesets);
    if (moved.length) console.info('[存檔] 地圖尺寸改變，位置已換算：', moved);
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
    G.pendingIntro = !!isNew;
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
    }).then(function () { G.busy = false; });
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
    if (G.pendingIntro) {
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
    if (npc.mrt) return { role: 'mrt' };     // 第三批：站務員（和他說話也能搭捷運；GDD 7.3 C8 的接口）
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
    if (f && f.status === 'available' && Q[f.id].kind === 'talk') { G.talkQuest(f.id, npc, scene); return; }   // 第三批：0 題、只對話（Q4_T01_4）
    if (f && f.status === 'available') {
      var q2 = Q[f.id];
      G.say(q2.dialog_start, [{ who: npc.id, text: q2.goal || q2.title }]).then(function () {
        J.QuestLog.accept(st, Q, f.id);
        J.Audio.play('select');
        J.UI.toast('接下委託：「' + q2.title + '」', 3500);
        G.save();
        scene.refreshMarkers();
        if ((q2.kind || 'help') === 'help') G.runHelp(f.id, npc, scene);
        else if (q2.kind === 'boss') { J.UI.toast('目標：' + (q2.goal || ''), 5000); G.respawnBosses(); }
        else if (J.QuestLog.canComplete(st, Q, f.id, G.data)) G.completeQuest(f.id, scene);
      });
      return;
    }
    var locked = J.QuestLog.firstLocked(st, Q, ids);
    var lq = locked && Q[locked];
    G.say(lq && lq.dialog_locked ? lq.dialog_locked : G.idleDialog(npc), [{ who: npc.id, text: '你好呀，' + st.player.name + '！' }]);
  };

  /** 第三批：NPC 平常的台詞；dialog_done 的委託完成後換一句（結局後的閒聊，例：D_DIRECTOR_IDLE_END） */
  G.idleDialog = function (npc) {
    var dd = npc.dialog_done;
    if (dd && dd.quest && dd.dialog && J.QuestLog.status(G.state, G.data.quests, dd.quest) === 'done') return dd.dialog;
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
    var meet = F.sageMet ? Promise.resolve() : G.sayChain(['D_SAGE_MEET', 'D_SAGE_LIBRARY']).then(function () { F.sageMet = Date.now(); G.save(); });
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
    J.QuestLog.autoNext(st, Q, doneId).forEach(function (a) {
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
  G.exitOpen = function (ex) { return !ex.requires || G.isDone(ex.requires); };
  G.exitLocked = function (ex) { G.lastExitLocked = ex.to; return G.say(ex.locked_dialog, [{ who: 'agu', text: '還不能過去喔。' }]); };
  /** 柵門（maps.js gates）：委託完成＝打開 */
  G.gateOpen = function (gt) { return !gt.quest || G.isDone(gt.quest); };
  G.gateTalk = function (gt) { if (G.blocked()) return Promise.resolve(); return G.say(gt.dialog, [{ who: 'agu', text: '柵門還關著。' }]); };
  /** 告示牌、知識卡（maps.js notes） */
  G.readNote = function (note) { if (G.blocked()) return Promise.resolve(); J.Audio.play('select'); return G.say(note.dialog, []); };

  /**
   * 搭捷運（暫時傳送點；GDD 7.3 C8 的捷運路線圖、搭乘動畫下一批做，這裡先接台詞與謎題）：
   * 往北投：捷運路線圖謎題還沒解開 → 先解（G.mrtPuzzle）；第一次 D_MRT_FIRST → D_MRT_RIDE，之後 D_MRT；
   * 回圓山（起點地圖）：D_MRT_BACK。到站後播 D_MRT_ARRIVE_<地圖>（G.arriveDialogs）
   */
  G.rideMrt = function (ex, scene) {
    if (G.riding) return Promise.resolve(false);
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
        G.pendingArrive = 'D_MRT_ARRIVE_' + ex.to;
        G.mrtLog = (G.mrtLog || []).concat([ex.to]);   // 測試用
        scene.leaveBy(ex);
        return true;
      });
    }, function () { G.riding = false; return false; });
  };
  /** 和站務員說話搭車（npcs[].mrt）：謎題卡還沒解開 → D_MRT_LOCKED；可以搭 → 問要不要搭車 */
  G.mrtTalk = function (npc, scene) {
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
    return G.say(q.dialog_end, []).then(function () {
      return after.mrt_puzzle && !G.flags().mrtPuzzle ? G.mrtPuzzle() : null;
    }).then(function () {
      return after.dialog ? G.say(after.dialog, []) : null;
    }).then(function () {
      var parts = [];
      if (r.reward.gold) parts.push('金幣 +' + r.reward.gold);
      if (r.reward.exp) parts.push('經驗值 +' + r.reward.exp);
      if (r.reward.item) parts.push('得到「' + ((G.data.items[r.reward.item] || {}).name || r.reward.item) + '」' + (r.reward.item_n > 1 ? ' ×' + r.reward.item_n : ''));
      if (r.reward.stamp) parts.push('蓋上北投的印章');
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

  G.startBattle = function (mob, scene) {
    var map = scene.map, mon = mob.mon;
    J.UI.closePassMove();   // v0.9.3 開著放大地圖走路時遇到怪物：先把地圖關掉
    G.battleCtx = { mob: mob, mon: mon, mapId: scene.mapId, over: false };
    // 第三批：第一次遇到這種怪物 → 戰鬥開始前阿咕提醒（monsters.js dialog_first，劇本 D_MON_FIRST_*）；記在存檔旗標
    var F = G.flags();
    if (mon.dialog_first && !F['met_' + mon.id]) { G.battleCtx.firstMeet = true; F['met_' + mon.id] = Date.now(); }
    var bg = G.battleBgFor(mon, scene.mapId);
    J.Bestiary.seen(G.state, mon.id);   // 怪物名冊：遇見
    G.bgm(J.MapInfo.battleBgm(mon, map));
    scene.scene.sleep();
    J.HUD.show(false);
    Array.prototype.forEach.call(document.querySelectorAll('.map-banner'), function (n) { n.parentNode.removeChild(n); });
    G.phaser.scene.start('Battle', { mon: mon, bg: bg });
  };

  /** 戰鬥背景：怪物或 maps.js 指定的名稱有對應的 bb_ 圖就用；否則用 config.js 的地圖對照表；再不行用別名 */
  G.battleBgFor = function (mon, mapId) {
    var have = J.Assets.art().battle, map = G.data.maps[mapId] || {};
    var cands = [mon.battle_bg, map.battle_bg, C.BATTLE_BG_BY_MAP[mapId], C.BATTLE_BG_ALIAS[map.battle_bg], 'grass'];
    for (var i = 0; i < cands.length; i++) if (cands[i] && have[cands[i]]) return cands[i];
    return C.BATTLE_BG_BY_MAP[mapId] || 'grass';
  };

  G.battleSceneReady = function (bscene) {
    var ctx = G.battleCtx, st = G.state, mon = ctx.mon;
    ctx.scene = bscene;
    ctx.b = J.Battle.create(mon);
    var lv = mon.q_levels;
    // 勇者大冒險II（GDD 7.3 C1、7.4 D4、D5）：只出這張地圖已開放的節點（mapId → Curriculum，範圍外永遠不出）；
    // 怪物的科目、q_levels 只當偏好（這張地圖沒有那一科的題目就換科目），頭目照這張地圖開放的科目輪流
    ctx.subjects = G.battleSubjects(mon, ctx.mapId);
    ctx.sess = J.Session.create(st, G.questions, ctx.subjects[0] || mon.subject, {
      mode: 'free', noRepeat: true, expMult: G.coef(ctx.mapId), deferExp: true,   // 經驗值到戰鬥結束才結算
      mapId: ctx.mapId,
      filter: function (x) { return !J.Chests.isChestQuestion(x); },
      prefer: lv ? function (x) { return x.level >= lv[0] && x.level <= lv[1]; } : null
    });
    ctx.qn = 0;
    G.battleUI(ctx);
    var intro = ctx.firstMeet ? G.say(mon.dialog_first, []) : Promise.resolve();
    if (mon.boss && mon.dialog_before) intro = intro.then(function () { return G.say(mon.dialog_before, []); });
    // C13 頭目戰前列出會考的單元（Curriculum.poolFor 產生，和實際出題的節點一致）
    if (mon.boss) intro = intro.then(function () {
      ctx.examText = J.Curriculum.examText(ctx.mapId, mon.short_name || mon.name);
      return G.say(null, [{ who: 'agu', text: ctx.examText }]);
    });
    intro.then(function () {
      G.bmsg((mon.boss ? '頭目「' : '') + mon.name + (mon.boss ? '」' : '') + '出現了！' + (mon.boss ? '（不能逃跑）' : ''));
      G.bcommands(true);
    });
  };

  /** 戰鬥的 DOM 介面 */
  G.battleUI = function (ctx) {
    var h = J.UI.h, mon = ctx.mon;
    var top = h('div.win.battle-top');
    var status = h('div.win.status');
    var msg = h('div.win.msg', { 'aria-live': 'polite' });
    var cmds = h('div.win.cmds', { role: 'group', 'aria-label': '戰鬥指令' });
    var ui = h('div.battle-ui', {}, [status, msg, cmds]);
    var wrap = h('div', {}, [top, ui]);
    ctx.ui = J.UI.open(wrap, { modal: false, escClose: false, label: '戰鬥' });
    ctx.el = { top: top, status: status, msg: msg, cmds: cmds };
    G.brender();
  };

  G.brender = function () {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), b = ctx.b, mon = ctx.mon, h = J.UI.h;
    var pct = function (a, m) { return Math.max(0, Math.min(100, Math.round(a / m * 100))); };
    ctx.el.top.innerHTML = '';
    // v0.9.3 頭目：寫出第幾階段、還剩幾個階段、這一階段還要答對幾題；體力條上畫出階段的分隔線
    var ph = Math.min(b.phase, b.phases), left = b.phases - ph;
    var phaseText = b.boss ? '　第 ' + ph + '/' + b.phases + ' 階段' + (left ? '（還剩 ' + left + ' 個階段）' : '（最後階段）') : '';
    ctx.el.top.appendChild(h('div.boss-phase', { text: mon.name + phaseText }));
    var marks = [];
    if (b.boss) for (var k = 1; k < b.phases; k++) marks.push(h('b.phase-mark', { style: { left: Math.round((1 - k / b.phases) * 100) + '%' } }));
    var hpPct = b.hp > 0 ? Math.max(1, pct(b.hp, b.maxHp)) : 0;   // 還有體力時至少畫 1%，不會看起來是空的
    ctx.el.top.appendChild(h('span.bar.boss', { role: 'progressbar', 'aria-label': mon.name + ' 的體力', 'aria-valuenow': String(hpPct), style: { width: '220px' } }, [h('i', { style: { width: hpPct + '%' } })].concat(marks)));
    var need = J.Battle.needCorrect(b);
    if (b.boss && !b.over && need > 0 && b.held) ctx.el.top.appendChild(h('div.small.boss-need', { text: '再答對 ' + need + ' 題' + (left ? '進入下一階段' : '就能打倒') }));
    // v1.0（48 號 2.7）回復、增益技能答對也算一題，但體力沒變不會換階段 → 題數夠了，要再打中一下
    else if (b.boss && !b.over && need === 0 && b.held) ctx.el.top.appendChild(h('div.small.boss-need', { text: '題數夠了！再打中一下' + (left ? '就進入下一階段' : '就能打倒') }));
    ctx.el.status.innerHTML = '';
    ctx.el.status.appendChild(h('div', { html: '<b style="color:#ffd34d">' + J.UI.esc(st.player.name) + '</b>　等級 ' + st.player.level }));
    ctx.el.status.appendChild(h('div', {}, ['體力 ', h('span.bar.hp', { role: 'progressbar', 'aria-label': '體力' }, [h('i', { style: { width: pct(st.player.hp, s.maxHp) + '%' } })]), ' ' + st.player.hp + '/' + s.maxHp]));
    ctx.el.status.appendChild(h('div', {}, ['魔力 ', h('span.bar.mp', { role: 'progressbar', 'aria-label': '魔力' }, [h('i', { style: { width: pct(st.player.mp, s.maxMp) + '%' } })]), ' ' + st.player.mp + '/' + s.maxMp]));
  };

  G.bmsg = function (text) { var c = G.battleCtx; if (c && c.el) { c.el.msg.textContent = text; } };

  G.bcommands = function (on) {
    var ctx = G.battleCtx, h = J.UI.h, s = G.stats(), b = ctx.b;
    ctx.el.cmds.innerHTML = '';
    if (!on) return;
    // v1.0（48 號 2.6、F6）：技能欄 4 格 → 按「技能」打開清單再選
    var has = s.skills && s.skills.length;
    var atk = h('button.primary', { onclick: function () { G.battack('attack'); } }, ['⚔️ 攻擊']);
    ctx.el.cmds.appendChild(atk);
    ctx.el.cmds.appendChild(h('button.skill-open', { disabled: !has, title: has ? '選一個技能，答對才會發動' : '見習冒險者 Lv4 會學到第一個技能', onclick: G.bskills }, ['✨ 技能']));
    ctx.el.cmds.appendChild(h('button', { onclick: G.bitems }, ['🎒 道具']));
    ctx.el.cmds.appendChild(h('button', { disabled: b.boss, onclick: G.bflee }, ['🏃 逃跑']));
    setTimeout(function () { atk.focus(); }, 30);
  };

  /** 技能的小圖示（48 號 2.6：用特效類型的小圖示，不另外畫） */
  G.skillIcon = function (sk) { return J.SkillFx && J.SkillFx.icon ? J.SkillFx.icon(sk) : '✨'; };
  var SKILL_WHY = { mp: '魔力不夠', stun: '這場已經停過一次', armed: '已經在身上了' };

  /** 技能清單（技能欄裡的 4 個）：魔力不夠變灰；答錯不扣魔力 */
  G.bskills = function () {
    var ctx = G.battleCtx, h = J.UI.h, s = G.stats(), b = ctx.b, st = G.state;
    ctx.el.cmds.innerHTML = '';
    var first = null;
    (s.skills || []).forEach(function (sk) {
      var c = J.Battle.canUseSkill(b, sk, st.player.mp), why = c.ok ? '' : (SKILL_WHY[c.reason] || '');
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
   */
  G.battleSubjects = function (mon, mapId) {
    var have = J.Curriculum.subjectsFor(G.questions, G.state, mapId);
    if (mon.boss || (mon.subjects && mon.subjects.length)) {
      var list = (mon.subjects && mon.subjects.length ? mon.subjects : J.Curriculum.SUBJECTS).filter(function (s) { return have.indexOf(s) >= 0; });
      return list.length ? list : have.slice();
    }
    return [mon.subject];
  };
  G.bsubject = function () {
    var ctx = G.battleCtx, mon = ctx.mon, list = ctx.subjects || (mon.subjects && mon.subjects.length ? mon.subjects : [mon.subject]);
    if (list.length) return list[ctx.qn % list.length];
    return mon.subject;
  };

  G.battack = function (kind, sk) {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), b = ctx.b;
    var skill = kind === 'skill' ? (sk || s.skill) : null;
    if (skill && !J.Battle.canUseSkill(b, skill, st.player.mp).ok) return;
    // 職業技能出拿手科目的題目、一律算拿手 ×1.5（CTO Q12，和模擬一致）；見習的技能出怪物的科目
    var subject = skill && skill.subject ? skill.subject : G.bsubject();
    var favored = skill && skill.subject ? true : subject === s.favored;
    var bossMult = b.boss ? C.BOSS_DAMAGE_MULT : 1;
    var estL4 = Math.round(J.Battle.damage({ atk: s.atk, level: 4, elapsedMs: 0, limitMs: 90000, favored: favored, favoredMult: s.favoredMult, bossMult: bossMult }).damage * ((s.trait && s.trait.power) || 1) * (s.dmgMult || 1));
    var force = J.Battle.needsFinalL4(b, estL4) ? 4 : undefined;
    var q = J.Session.next(ctx.sess, Date.now(), { subject: subject, forceLevel: force });
    if (!q) {
      // GDD 3.3 硬規則 2：這張地圖已開放的範圍裡一題都沒有 → 改成不用答題的普通攻擊（技能不發動、不扣魔力），開發版主控台報錯；絕不出範圍外的題目
      if (G.DEBUG) console.error('[課程] ' + ctx.mapId + ' 沒有可出的題目（' + subject + '）：改成普通攻擊。開放的節點：', J.Curriculum.poolFor(ctx.mapId));
      ctx.qn++;
      ctx.plainAttacks = (ctx.plainAttacks || 0) + 1;   // 測試用
      G.bcommands(false);
      G.bmsg('（這裡的題目還在準備中，先用普通攻擊！）');
      var L = J.Battle.timeLimitMs(1, 'standard', 1) || 30000;
      setTimeout(function () { G.bresolve('attack', null, { subject: subject, level: 1 }, { correct: true, elapsedMs: L, limitMs: L }); }, 500);
      return;
    }
    ctx.qn++;
    G.bcommands(false);
    // 影子步、鼓舞之歌：接下來幾題的時間條變長（每出一題用掉一次）
    var timerMs = J.Battle.timeLimitMs(q.level, st.settings.answerTime, s.timeMult * (b.timeBuff || 1) * J.Battle.nextTimeMult(b));
    b.timeBuff = 1;
    J.Quiz.ask({
      session: ctx.sess, mode: 'battle', state: st, timerMs: timerMs,
      title: skill ? '技能「' + skill.name + '」' : '攻擊！', subtitle: ctx.mon.name + (force ? '・最後一擊！' : ''),
      onSave: function () { G.save(); },
      onRewards: function (res) { G.refreshHud(); if (res) G.afterReward(res.levelsGained); },
      onDone: function (r) { G.bresolve(kind, skill, q, r); }
    });
  };

  G.bresolve = function (kind, skill, q, r) {
    var ctx = G.battleCtx, st = G.state, s = G.stats(), b = ctx.b, sc = ctx.scene;
    G.brender();
    if (!r.correct) {
      J.Session.abandon(ctx.sess);
      // v0.9.6（45 號 F5）答題時間「關閉」時，弓箭手的特色改成：每場戰鬥可以閃過一次答錯後的攻擊
      if (J.Battle.dodgeOnWrong(b, st.settings.answerTime, s.timeMult)) {
        ctx.dodged = (ctx.dodged || 0) + 1;   // 測試用
        G.bmsg('沒打中……但是弓箭手身手敏捷，閃過了這次攻擊！（每場戰鬥一次）');
        setTimeout(function () { G.bcommands(true); }, 700);
        return;
      }
      G.bmsg(r.timeout ? '時間到！這一擊沒打出去……' : '沒打中……');
      setTimeout(G.bmonsterTurn, 700);
      return;
    }
    // v1.0（48 號 2.6、2.7、F6）：17 種技能效果；多段攻擊一次呼叫 Battle.hit；回復、增益答對也算頭目的一題
    var favored = skill && skill.subject ? true : q.subject === s.favored;
    var use = null, opt = { hits: 1, mult: 1, noCrit: false, sureCrit: false }, pre = [];
    if (skill) {
      st.player.mp = Math.max(0, st.player.mp - (skill.mp || 0));   // 答對才扣魔力
      use = J.Battle.useSkill(b, skill, { maxHp: s.maxHp, timerOff: J.Battle.timerOff(st.settings.answerTime), trait: s.trait });
      ctx.lastSkill = { id: skill.id, eff: use.eff, attack: use.attack, counted: !!use.counted, heal: use.heal || 0 };   // 測試用
      ctx.skillLog = (ctx.skillLog || []).concat([skill.id]);
      G.bmsg(G.skillIcon(skill) + ' ' + skill.name + '！');
      if (!use.attack) {
        if (use.heal) st.player.hp = Math.min(s.maxHp, st.player.hp + use.heal);
        G.skillFx(skill, use, function () {
          G.brender(); G.refreshHud();
          G.bmsg(G.skillText(skill, use));
          setTimeout(function () { G.bcommands(true); }, 500);
        });
        return;
      }
      opt = { hits: use.hits, mult: use.mult, noCrit: use.noCrit, sureCrit: use.sureCrit };
      if (use.stunned) pre.push(ctx.mon.name + '麻麻的，下一次不能攻擊！');
      if (use.picked) pre.push('表演抽到：' + (use.picked[0] === 'heal' ? '回復' : '大攻擊') + '！');
    }
    var at = J.Battle.attack(b, { atk: s.atk, level: q.level, elapsedMs: r.elapsedMs, limitMs: r.limitMs, favored: favored, favoredMult: s.favoredMult,
      bossMult: b.boss ? C.BOSS_DAMAGE_MULT : 1, hits: opt.hits, mult: opt.mult, noCrit: opt.noCrit, sureCrit: opt.sureCrit, trait: s.trait, dmgMult: s.dmgMult });
    if (at.buffs.indexOf('power') >= 0) { ctx.powerUsed = (b.fx && b.fx.powerM) || J.Battle.OFF_SONG_POWER; pre.push('鼓舞的力量！'); }
    if (at.buffs.indexOf('charge') >= 0) pre.push('蓄滿力氣的一擊！');
    if (at.buffs.indexOf('up') >= 0) pre.push('力量湧上來了！');
    var hr = J.Battle.hit(b, at.total);
    ctx.lastAttack = { total: at.total, parts: at.parts, dealt: hr.dealt, hits: opt.hits, crit: at.crit, skill: skill ? skill.id : null };   // 測試用
    // 畫面一下一下播：被頭目門檻吃掉時，照比例縮小每一下
    var shown = at.parts.slice();
    if (hr.dealt < at.total) {
      var k = hr.dealt / at.total, acc = 0;
      shown = at.parts.map(function (p, j) { if (j === at.parts.length - 1) return Math.max(0, hr.dealt - acc); var v = Math.round(p * k); acc += v; return v; });
    }
    var left = b.phases - Math.min(b.phase, b.phases), mon = ctx.mon;
    var msg = pre.concat([J.Battle.hitMessage({ crit: at.crit, favored: favored, first: true, dealt: hr.dealt, damage: at.total, phaseUp: hr.phaseUp, held: hr.held, over: b.over, hits: opt.hits, pet: at.pet }) +
      (hr.phaseUp ? mon.name + '生氣了！攻擊變強了！（第 ' + Math.min(b.phase, b.phases) + '/' + b.phases + ' 階段' + (left ? '，還剩 ' + left + ' 個階段' : '，最後一個階段') + '）' : '') +
      (hr.held && !b.over ? mon.name + '撐住了！再答對 ' + J.Battle.needCorrect(b) + ' 題' + (b.phase >= b.phases ? '就能打倒它！' : '就會進入下一個階段！') : '')]).join(' ');
    var play = function (done) {
      var i = 0;
      (function next() {
        if (i >= shown.length) { done(); return; }
        sc.hitEffect(shown[i], at.crit && i === 0);
        i++;
        setTimeout(next, shown.length > 1 ? 260 : 0);
      })();
    };
    var finish = function () {
      if (hr.phaseUp) { sc.phaseEffect(); J.UI.banner(mon.name + '生氣了！攻擊變強了！', 'rage-banner'); }   // v0.9.3 生氣了 = 進入下一階段、攻擊 +20%
      G.brender(); G.bmsg(msg);
      // 第三批：頭目進入第 2、3 階段的台詞（monsters.js dialog_phase，劇本 D_BOSS_DUDU_P2／P3）
      var pd = hr.phaseUp && !b.over && mon.dialog_phase ? mon.dialog_phase[Math.min(b.phase, b.phases)] : null;
      if (b.over) setTimeout(G.bvictory, 700);
      else if (pd) setTimeout(function () { G.say(pd, []).then(function () { G.bcommands(true); }); }, 600);
      else setTimeout(function () { G.bcommands(true); }, 500);
    };
    G.brender();
    if (skill) G.skillFx(skill, use, function () { play(finish); }); else play(finish);
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
    var mon = G.battleCtx.mon, a = skill.arg || {}, n = skill.name + '！';
    switch (use.eff) {
      case 'heal': return n + '體力回復了 ' + use.heal + ' 點。';
      case 'revive': return n + '這場累倒時，會馬上站起來。';
      case 'guard': return n + '接下來被打 ' + (a.t || 1) + ' 次，傷害變成一半。';
      case 'weaken': return n + mon.name + '變沒力氣了（' + (a.t || 1) + ' 次）。';
      case 'stun': return use.stunned ? n + mon.name + '下一次不能攻擊！' : n + mon.name + '這場已經停過一次，沒有效果。';
      case 'atk_up': return n + '接下來 ' + (a.t || 1) + ' 次攻擊變強了！';
      case 'charge': return n + '下一次攻擊會變超強！';
      case 'time_up': return use.offPower ? n + '接下來答對 ' + (a.t || 1) + ' 次，傷害變成 ' + use.offPower + ' 倍。' : n + '接下來 ' + (a.t || 1) + ' 題的時間變長了' + (a.atk ? '，也打得比較痛' : '') + '。';
      default: return n;
    }
  };

  G.bmonsterTurn = function () {
    var ctx = G.battleCtx, mon = ctx.mon, s = G.stats(), st = G.state;
    // v1.0：停止、閃過、逗笑、減弱、防護、劍士被打 ×0.9（48 號 2.5、F5）；頭目每進一個階段傷害 +20%（v0.9.3）
    var t = J.Battle.monsterTurn(ctx.b, mon, { def: s.def, trait: s.trait });
    ctx.lastHit = { dmg: t.damage, mult: t.mult, skipped: t.skipped };   // 測試用
    if (t.skipped) {
      G.bmsg(t.skipped === 'stun' ? mon.name + '麻麻的，動不了！' : t.skipped === 'evade' ? '輕巧一轉，閃過了' + mon.name + '的攻擊！' : mon.name + '笑到忘了攻擊！');
      setTimeout(function () { G.bcommands(true); }, 700);
      return;
    }
    var h = J.Battle.heroHurt(st, t.damage);
    var revived = h.ko ? J.Battle.tryRevive(ctx.b, st, s.maxHp) : 0;
    ctx.scene.hurtEffect();
    G.brender(); G.refreshHud();
    G.bmsg(mon.name + (t.mult > 1 ? '（生氣中）' : '') + '撞了過來！受到 ' + t.damage + ' 點傷害。' + (t.guarded ? '（擋住了一半）' : '') +
      (revived ? '　不倒祈願！又站起來了（體力 ' + revived + '）！' : ''));
    if (revived) ctx.scene.healEffect();
    G.save();
    if (h.ko && !revived) setTimeout(G.bko, 900);
    else setTimeout(function () { G.bcommands(true); }, 700);
  };

  G.bitems = function () {
    var ctx = G.battleCtx, st = G.state, D = G.data, h = J.UI.h;
    var usable = Object.keys(st.inventory).filter(function (id) { var it = D.items[id]; return it && st.inventory[id] > 0 && it.type === 'consumable' && (it.heal > 0 || it.mp > 0); });
    ctx.el.cmds.innerHTML = '';
    if (!usable.length) { G.bmsg('沒有可以用的道具。'); }
    usable.forEach(function (id) {
      var it = D.items[id];
      ctx.el.cmds.appendChild(h('button', { onclick: function () {
        var r = J.Character.useItem(st, id, D);
        if (!r.ok) { G.bmsg(r.reason === 'full' ? '體力是滿的，不用吃喔。' : '現在不能用。'); return; }
        ctx.scene.healEffect();
        G.brender(); G.refreshHud();
        G.bmsg('用了' + it.name + '，體力回復 ' + r.healed + ' 點！');
        G.bcommands(false);
        setTimeout(G.bmonsterTurn, 800);
      } }, [it.name + ' ×' + st.inventory[id]]));
    });
    ctx.el.cmds.appendChild(h('button.ghost', { onclick: function () { G.bcommands(true); } }, ['返回']));
    var f = ctx.el.cmds.querySelector('button'); if (f) f.focus();
  };

  G.bflee = function () {
    var ctx = G.battleCtx;
    G.bcommands(false);
    var tr = G.stats().trait || {};
    if (J.Battle.tryFlee(ctx.b.boss, null, !!tr.fleeSure)) {   // v1.0 船員：逃跑一定成功
      G.state.stats.battles.fled = (G.state.stats.battles.fled || 0) + 1;
      G.bmsg('順利逃開了！');
      setTimeout(function () { G.bend('fled'); }, 700);
    } else {
      G.bmsg('逃不掉！');
      setTimeout(G.bmonsterTurn, 700);
    }
  };

  /**
   * 第三批（GDD 4.4）：委託素材（monsters.js drops[].quest）只在那個委託進行中、還沒收集夠的時候掉
   * （strap_spring 只在 Q4_TUT_2、clue_piece 只在 Q4_T02_3）。回傳掉落表過濾過的怪物（不改原資料）
   */
  G.questDrops = function (mon) { return J.QuestLog.questDrops(G.state, G.data.quests, mon); };

  G.bvictory = function () {
    var ctx = G.battleCtx, st = G.state, mon = ctx.mon;
    ctx.scene.wakeEffect();
    var lvl = st.player.level;
    var bond = 0;   // 勇者大冒險II（GDD 4.2 第 4 點、7.2 B5）：沒有親密度，打倒怪物的 EXP＝怪物 exp × 地圖係數，掉寶率不加成
    var s0 = G.stats(), vt = J.Battle.victoryTraits(ctx.b, s0.trait || {}, s0.maxMp);   // v1.0 吟遊詩人回魔、商人／生意興隆金幣、魔物大師朋友卡
    var vr = J.Battle.victoryReward(mon, G.coef(ctx.mapId), bond, vt.goldMult);
    // v0.9.3 C1：經驗值和金幣只在打倒怪物時給（怪物的 exp×地圖係數、gold）；戰鬥中答對不給
    var ans = J.Session.settleBattle(ctx.sess);   // 只有這場完成的每日小任務金幣、舊存檔的暫存經驗值
    J.Exp.addExp(st.player, vr.exp);
    st.player.coins += vr.gold;
    ctx.reward = { exp: vr.exp, coins: vr.gold + ans.daily, monsterGold: vr.gold, daily: ans.daily, bond: bond };   // 測試用
    var drops = J.Battle.rollDrops(G.questDrops(mon), null, bond, (s0.trait && s0.trait.drop) || 1);   // v1.0 弓箭手掉寶率 ×1.5；第三批：委託素材只在委託進行中掉
    for (var si = 0; si < ((ctx.b.fx && ctx.b.fx.steal) || 0); si++) { var got = J.Battle.stealItem(mon); if (got) drops.push(got); }   // 神奇口袋
    if (vt.mp > 0) st.player.mp = Math.min(s0.maxMp, st.player.mp + vt.mp);
    if (vt.friend) { st.bestiary[mon.id] = st.bestiary[mon.id] || {}; st.bestiary[mon.id].friend = true; }   // 怪物朋友卡（魔物大師，第一批只記資料）
    ctx.traits = vt;   // 測試用
    drops.forEach(function (it) { J.Character.addItem(st, it, 1); });
    st.stats.battles.won = (st.stats.battles.won || 0) + 1;
    J.Bestiary.defeated(st, mon.id);   // 怪物名冊：打倒
    G.stopBgm(200);
    G.jingle(mon.boss && drops.length ? 'rare_item' : 'victory', null, null, 7000);
    var lines = [mon.wake, '經驗值 +' + ctx.reward.exp + '　金幣 +' + ctx.reward.coins];
    if (drops.length) lines.push('得到：' + drops.map(function (d) { return (G.data.items[d] || {}).name || d; }).join('、'));
    if (vt.mp > 0) lines.push('琴聲讓魔力回復 ' + vt.mp + ' 點');
    if (vt.friend) lines.push('拿到「' + mon.name + '」的怪物朋友卡！');
    G.bmsg(lines.join('　'));
    G.refreshHud();
    var done = [];
    if (mon.boss) done = J.QuestLog.onBossDefeated(st, G.data.quests, mon.id, G.data);
    // 打贏了：獎勵、頭目委託馬上寫入存檔（頭目戰後的對話很長，這段時間關掉分頁也不會白打）。
    // ctx.won 之後不會再有答題或攻擊，所以不會重複領獎；按「繼續」時 G.bend 再存一次。
    ctx.won = true;
    G.save();
    var levels = st.player.level - lvl;
    var after = mon.boss && mon.dialog_after ? function () { return G.say(mon.dialog_after, []); } : function () { return Promise.resolve(); };
    var h = J.UI.h;
    ctx.el.cmds.innerHTML = '';
    var btn = h('button.primary', { onclick: function () {
      btn.disabled = true;
      after().then(function () {
        G.bend('win');
        G.afterReward(levels);
        var chain = Promise.resolve();
        done.forEach(function (qr) { chain = chain.then(function () { return G.questDone(qr.id, qr, G.mapScene, 0); }); });
        chain.then(function () { return G.checkAguAuto(G.mapScene); });   // 第三批：阿咕的收集委託收齊了就自動完成
      });
    } }, ['繼續 ▶']);
    ctx.el.cmds.appendChild(btn);
    setTimeout(function () { btn.focus(); }, 30);
  };

  G.bko = function () {
    var ctx = G.battleCtx;
    G.bmsg('累倒了……');
    G.stopBgm(200);
    G.jingle('faint', null, 'hurt', 7000);
    G.say('D_FAINT', [{ who: 'pet', text: '線索還沒找齊，回休息站整理偵探筆記吧！' }, { who: 'pet', text: '沒關係！金幣和道具都還在喔。' }])
      .then(function () { return ctx.mon && ctx.mon.boss && ctx.mon.dialog_again ? G.say(ctx.mon.dialog_again, []) : null; })   // 第三批：頭目輸了再來
      .then(function () { G.bend('ko'); });
  };

  G.bend = function (result) {
    var ctx = G.battleCtx;
    if (!ctx || ctx.over) return;
    ctx.over = true;
    // v0.9.3 逃跑、累倒：不給經驗值和金幣（只給這場完成的每日小任務金幣；打贏時 bvictory 已經給過，這裡是 0）
    var late = J.Session.settleBattle(ctx.sess);
    ctx.lateDaily = late.daily;   // 測試用
    // C2 引入期：這場出過題的節點各記一場（打贏、逃跑、累倒都算）
    if (ctx.sess) { var byId = {}; G.questions.forEach(function (x) { byId[x.id] = x; }); J.Curriculum.recordBattle(G.state, ctx.sess.asked.map(function (id) { return byId[id]; }).filter(Boolean)); }
    if (late.levels > 0) setTimeout(function () { G.afterReward(late.levels); }, 900);
    if (ctx.ui) ctx.ui.close(true);
    J.TTS.stop();
    G.phaser.scene.stop('Battle');
    J.HUD.show(true);
    G.refreshHud();
    if (result === 'ko') {
      var to = J.Character.knockout(G.state, G.data, { map: G.data.startMap, x: undefined, y: undefined });
      G.save();
      G.phaser.scene.wake('Map', { result: 'ko', mob: ctx.mob });
      G.refreshHud();
      if (to) G.mapScene.scene.restart({ mapId: to.map, x: to.x, y: to.y, facing: 'down' });
      return;
    }
    G.save();
    G.phaser.scene.wake('Map', { result: result, mob: ctx.mob });
    if (G.mapScene) G.bgm(J.MapInfo.bgmFor(G.mapScene.map));   // 回到地圖音樂
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
    battle: function () { var c = G.battleCtx; return c && c.b ? { hp: c.b.hp, maxHp: c.b.maxHp, phase: c.b.phase, boss: c.b.boss, over: c.over } : null; },
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
