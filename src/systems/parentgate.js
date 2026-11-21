/*
 * 家長確認的「通行證」：通過一次後，設定開著的期間、以及關掉後 10 分鐘內，不再詢問。
 * 只存在記憶體（不寫進存檔，重新整理頁面就要再確認一次）。
 */
(function () {
  'use strict';
  var GRACE_MS = 10 * 60 * 1000;

  function create() { return { until: 0, panelOpen: false, asking: false }; }

  /** 現在需不需要再問？ */
  function needAsk(pass, now) { return !(pass.panelOpen || now < pass.until); }

  /** 確認通過：設定面板開著 */
  function grant(pass, now) { pass.until = now + GRACE_MS; pass.panelOpen = true; pass.asking = false; }

  /** 設定面板關掉：10 分鐘內再開不用問 */
  function closePanel(pass, now) { pass.panelOpen = false; pass.until = now + GRACE_MS; }

  /** 確認視窗已經開著時不要再開第二個 */
  function beginAsk(pass) { if (pass.asking) return false; pass.asking = true; return true; }
  function endAsk(pass) { pass.asking = false; }

  // 整合4 S-4（03b R10）：連續 3 題超時 → 戰鬥結束後過家長確認，再問要不要改成寬鬆
  /** 純判斷：這場要不要提示（不改 watch；冷卻中、寬鬆或不計時都不提示）。watch 是 BattleV06.createWatch() */
  function shouldSuggestRelaxed(w, mode) { return !!(w && w.pending && !w.cool) && (mode || 'standard') === 'standard'; }
  /** 純函式：回傳改成寬鬆的新設定（不改原物件；沿用既有欄位 answerTime） */
  function relaxedSettings(settings) { return Object.assign({}, settings, { answerTime: 'relaxed' }); }

  /**
   * 整合6（QA D-21）：家長確認題。兩位數 × 兩位數是四上範圍、孩子自己算得出來 → 改成三位數 × 兩位數（例 347 × 26），
   * 家長心算或紙筆可算、四年級還沒學。避開尾數 0、11 這類太容易的數。rng 可注入（測試用）。回傳 { a, b, answer, text }
   */
  function makeQuestion(rng) {
    rng = rng || Math.random;
    var pick = function (lo, hi) { var v; do { v = lo + Math.floor(rng() * (hi - lo + 1)); } while (v % 10 === 0 || v % 11 === 0); return v; };
    var a = pick(123, 987), b = pick(13, 89);
    return { a: a, b: b, answer: a * b, text: a + ' × ' + b + ' = ?' };
  }

  var ParentGate = { makeQuestion: makeQuestion, shouldSuggestRelaxed: shouldSuggestRelaxed, relaxedSettings: relaxedSettings, GRACE_MS: GRACE_MS, create: create, needAsk: needAsk, grant: grant, closePanel: closePanel, beginAsk: beginAsk, endAsk: endAsk };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.ParentGate = ParentGate; }
  if (typeof module !== 'undefined') module.exports = ParentGate;
})();
