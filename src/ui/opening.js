/*
 * 片頭（勇者大冒險II，GDD 2.4 S0、7.2 B8）：黑底三句旁白，約 12 秒，可以跳過。
 * 三年級版的片頭動畫（金包里、知識燈、番薯仔的分鏡）已經拿掉；之後有 GPT 圖卡再換成圖卡版。
 * - 第一次（沒看過）在「點一下開始」之後、選單之前自動播；看過就跳過（localStorage 的 bq4_opening_seen）。家長設定可以重看。
 * - 焦點放在片頭畫面本身：空白鍵、Enter 不會一下子跳過；要跳過請點「跳過」或按 Esc。
 * - 外部腳本（CSP 不允許 inline script）；不用 canvas，只用 DOM 文字（減少動態效果時一樣能看）。
 * 對外介面和三年級版相同：play、skip、seen、shouldPlay、markSeen、isPlaying、time、stats。
 */
(function () {
  'use strict';
  var J = window.JQ = window.JQ || {};
  var SEEN_KEY = 'bq4_opening_seen';
  // S0 三句旁白（GDD 2.4 第 1–3 句）
  var SUBS = [
    { t0: 0.6, t1: 4.2, text: '今年，全臺家鄉博覽會要在台北舉行。' },
    { t0: 4.4, t1: 8.0, text: '每個地方都刻了一顆家鄉印章。' },
    { t0: 8.2, t1: 11.8, text: '蓋滿集章冊，臺灣大地圖就會拼起來。' }
  ];
  var SCENES = [{ id: 1, name: 'S0 片頭旁白（黑幕）', t0: 0, t1: 12 }];
  var DUR = 12;

  function storage() { try { return window.localStorage; } catch (e) { return null; } }
  /** 看過片頭了沒（播完或按跳過都算看過） */
  function seen() { var s = storage(); try { return !!(s && s.getItem(SEEN_KEY)); } catch (e) { return false; } }
  function markSeen() { var s = storage(); try { if (s) s.setItem(SEEN_KEY, '1'); } catch (e) { /* 無痕模式存不了：下次還會播，可以跳過 */ } }
  /** 第一次（沒看過）才自動播 */
  function shouldPlay() { return !seen(); }

  var cur = null;   // 這次播放 { overlay, handle, timer, t0, paused, pausedAt, done, onDone, line }
  var stats = { plays: 0, skips: 0, ends: 0, failed: 0, lastT: 0 };   // 測試用

  function curT() {
    if (!cur) return 0;
    var now = cur.paused ? cur.pausedAt : performance.now();
    return Math.min(DUR, Math.max(0, (now - cur.t0) / 1000));
  }
  function render() {
    if (!cur) return;
    var t = curT();
    stats.lastT = t;
    var s = SUBS.filter(function (x) { return t >= x.t0 && t < x.t1; })[0];
    var text = s ? s.text : '';
    if (cur.line.textContent !== text) { cur.line.textContent = text; cur.line.classList.toggle('on', !!text); }
    if (t >= DUR) finish('end');
  }
  function onVisibility() {
    if (!cur) return;
    if (document.visibilityState === 'hidden' && !cur.paused) { cur.paused = true; cur.pausedAt = performance.now(); }
    else if (document.visibilityState === 'visible' && cur.paused) { cur.t0 += performance.now() - cur.pausedAt; cur.paused = false; }
  }
  /** 結束（播完或跳過）：拿掉畫面，記下看過了，接著做 onDone（進選單） */
  function finish(how) {
    if (!cur || cur.done) return;
    var c = cur; c.done = true;
    clearInterval(c.timer);
    cur = null;
    document.removeEventListener('visibilitychange', onVisibility);
    if (how === 'skip') stats.skips++; else if (how === 'end') stats.ends++;
    markSeen();
    c.handle.close(true);
    if (c.onDone) { try { c.onDone(how); } catch (e) { console.error(e); } }
  }
  function skip() { finish('skip'); }

  /**
   * 播放片頭。opts = { onDone(how)：結束後（'end' 播完／'skip' 跳過），music：要不要從頭播標題曲 }
   * 回傳 true＝開始播；已經在播就回傳 false
   */
  function play(opts) {
    opts = opts || {};
    if (cur) return false;
    var h = J.UI.h;
    var line = h('p.opening-line', { 'aria-live': 'polite' });
    var skipBtn = h('button.opening-skip', { type: 'button', 'aria-label': '跳過片頭', onclick: function (e) { e.stopPropagation(); skip(); } }, ['跳過 ▸▸']);
    var stage = h('div.opening-stage.opening-text', {}, [line, skipBtn]);
    var overlay = h('div.opening', { role: 'dialog', 'aria-label': '片頭（右下角可以跳過）', tabindex: '-1' }, [stage]);
    var handle = J.UI.open(overlay, { modal: false, label: '片頭', focus: overlay, onClose: function () { if (cur && cur.overlay === overlay) skip(); } });
    cur = { overlay: overlay, stage: stage, line: line, handle: handle, timer: 0, t0: performance.now(), paused: false, pausedAt: 0, done: false, onDone: opts.onDone || null };
    stats.plays++;
    document.addEventListener('visibilitychange', onVisibility);
    if (document.visibilityState === 'hidden') { cur.paused = true; cur.pausedAt = cur.t0; }
    if (opts.music) { try { var M = J.Music; if (M && M.playBgm) { M.stopBgm(0); M.playBgm('title'); } } catch (e) { /* 沒有聲音也照常播放 */ } }
    cur.timer = setInterval(render, 100);
    render();
    return true;
  }

  J.Opening = {
    DUR: DUR, SCENES: SCENES, SUBS: SUBS, SEEN_KEY: SEEN_KEY,
    play: play, skip: skip, seen: seen, shouldPlay: shouldPlay, markSeen: markSeen,
    isPlaying: function () { return !!cur; }, time: curT, stats: stats
  };
})();
