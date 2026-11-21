/*
 * BQ2 v0.6 整合2：開場「選家人稱呼」（ch01 01_劇本 第 1 節步 0；介面_NPC與委託清單 c01_family；劇情大綱待決 3 定案 A）。
 * - 選項：媽媽／爸爸／阿嬤／阿公（劇本）。存檔欄位 state.player.family（劇本沒定欄位名，暫用最簡單做法，待決）。
 * - SPEAKERS.c01_family = "{family}" → 對話框名字換成選的稱呼；沒選過（舊存檔、按「等一下」）顯示「家人」。
 */
(function () {
  'use strict';
  var OPTIONS = ['媽媽', '爸爸', '阿嬤', '阿公'];
  var DEFAULT = '家人';

  function valid(v) { return OPTIONS.indexOf(v) >= 0 || v === DEFAULT; }
  /** 新遊戲要不要問（還沒選過） */
  function needAsk(state) { return !(state && state.player && valid(state.player.family)); }
  /** 記下選擇；不是選項（含 null＝按了等一下）→ 「家人」 */
  function set(state, v) { state.player.family = OPTIONS.indexOf(v) >= 0 ? v : DEFAULT; return state.player.family; }
  function get(state) { var v = state && state.player && state.player.family; return valid(v) ? v : DEFAULT; }
  /** 把 {family} 換成稱呼 */
  function fill(text, state) { return String(text == null ? '' : text).replace(/\{family\}/g, get(state)); }

  /**
   * 整合4 D-16：開場過場的順序——先蓋黑底（cover）→ 選稱呼（family）→ 家門口對話（home）→ 拿掉黑底、顯示地圖（reveal）。
   * 每一步可回傳 Promise；任何一步出錯也一定會 reveal（不留下遮罩），錯誤照樣往外丟。
   */
  function playOpening(cover, family, home, reveal) {
    var p;
    try { cover(); p = Promise.resolve().then(family).then(home); } catch (e) { p = Promise.reject(e); }
    return p.then(function (v) { reveal(); return v; }, function (e) { reveal(); throw e; });
  }
  /** 黑底淡出的毫秒數：「減少動態效果」開（或自動且裝置要求減少動態）→ 0，直接切換 */
  function openingFadeMs(settings, prefersReduced) {
    return reduced(settings, prefersReduced) ? 0 : 450;
  }
  /** 整合7：「減少動態效果」判斷共用 BattleFlow.reduceMotion（瀏覽器：JQ.BattleFlow；node：require）；都拿不到時照同一規則 */
  function reduced(settings, prefersReduced) {
    var BF = (typeof window !== 'undefined' && window && window.JQ && window.JQ.BattleFlow) || null;
    if (!BF && typeof require === 'function') { try { BF = require('./battle_flow.js'); } catch (e) { BF = null; } }
    if (BF && BF.reduceMotion) return BF.reduceMotion(settings, prefersReduced);
    var m = settings ? settings.reduceMotion : undefined;
    return m === 'on' || m === true ? true : (m === 'off' || m === false ? false : !!prefersReduced);
  }

  /**
   * 整合6（審查第 2 輪）：開場過場中重新整理，開場與選稱呼都不會再出現 → 「開場還沒播完」記在存檔旗標 _openingPending，
   * 等過場真的播完（openingDone）才拿掉。讀檔時：新遊戲、v0.5 搬移（_v06Opening）、或 _openingPending 還在 → 要播開場。
   */
  function openingStart(state, isNew) {
    if (!state.flags || typeof state.flags !== 'object') state.flags = {};
    var F = state.flags, play = !!isNew || !!F._v06Opening || !!F._openingPending;
    delete F._v06Opening;
    if (play) F._openingPending = 1;
    return play;
  }
  function openingDone(state) { if (state && state.flags) delete state.flags._openingPending; }

  var Family = { openingStart: openingStart, openingDone: openingDone, playOpening: playOpening, openingFadeMs: openingFadeMs, OPTIONS: OPTIONS, DEFAULT: DEFAULT, needAsk: needAsk, set: set, get: get, fill: fill };
  if (typeof window !== 'undefined' && window) { window.JQ = window.JQ || {}; window.JQ.Family = Family; }
  if (typeof module !== 'undefined') module.exports = Family;
})();
