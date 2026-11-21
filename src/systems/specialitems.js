/*
 * BQ2 v0.6 整合2：台北章三種特殊道具的效果（ch01 03_數值 9.2）。與畫面無關，可在 node 測試；game.js、ui/menus.js 接到畫面上。
 * - 煙霧彈 c01_smoke  effect { flee:true, no_boss:true }：一般戰鬥逃跑一定成功；頭目戰不能用（不消耗）。
 * - 回程車票 c01_ticket effect { warp:"last_mrt" }：傳送到最後搭過的捷運站（G.mrtMenu 搭車時記在 flags._lastMrt）。
 *     保守做法（規格沒寫，待決）：沒搭過捷運 → 不能用、不消耗；日治時期的地圖（地圖名含「日治」）不能用；戰鬥中不能用。
 * - 艋舺糕餅 c01_cake  effect { guard:0.2, battles:3 }：接下來 3 場戰鬥防禦 +20%（主角物防 PDEF ×1.2）。
 *     保守做法（待決）：在地圖選單吃（戰鬥中不能吃）；效果期間再吃 → 重設成 3 場、不疊加；每場戰鬥結束（勝、逃、倒下都算）扣 1 場。
 * 效果欄位讀 items.js 原始資料的 effect（World.normalizeItems 只留 hp／mp，這裡不改它）。
 */
(function () {
  'use strict';
  var JP_ERA = /日治/;

  function effectOf(rawItems, id) { var it = rawItems && rawItems[id]; return (it && it.effect) || {}; }
  /** 'smoke'｜'ticket'｜'guard'｜null */
  function kindOf(eff) {
    if (!eff) return null;
    if (eff.flee) return 'smoke';
    if (eff.warp) return 'ticket';
    if (eff.guard > 0) return 'guard';
    return null;
  }
  function flags(state) { state.flags = state.flags || {}; return state.flags; }
  function has(state, id) { return !!(state.inventory && state.inventory[id] > 0); }
  function take(state, id) { state.inventory[id] -= 1; }

  /** 戰鬥中能用的特殊道具清單（目前只有煙霧彈）；回 [{id, ok, reason}] */
  function battleList(state, rawItems, battle) {
    return Object.keys(state.inventory || {}).filter(function (id) { return has(state, id) && kindOf(effectOf(rawItems, id)) === 'smoke'; })
      .map(function (id) { var r = canSmoke(battle, effectOf(rawItems, id)); return { id: id, ok: r.ok, reason: r.reason }; });
  }
  function canSmoke(battle, eff) {
    if (!battle) return { ok: false, reason: 'not-battle' };
    if (battle.boss && (eff || {}).no_boss !== false) return { ok: false, reason: 'boss' };
    return { ok: true };
  }
  /** 用煙霧彈：一般戰鬥 → 消耗 1 個、回 { ok:true, fled:true }；頭目戰 → 不消耗 */
  function useSmoke(state, rawItems, id, battle) {
    var eff = effectOf(rawItems, id);
    if (kindOf(eff) !== 'smoke' || !has(state, id)) return { ok: false, reason: 'none' };
    var r = canSmoke(battle, eff);
    if (!r.ok) return r;
    take(state, id);
    return { ok: true, fled: true };
  }

  /** 搭捷運時記下落點（G.mrtMenu） */
  function recordMrt(state, s) {
    if (!s || !s.map) return;
    flags(state)._lastMrt = { map: s.map, tx: s.tx, ty: s.ty, name: s.name || '' };
  }
  function lastMrt(state) { return (state.flags && state.flags._lastMrt) || null; }
  /** 回程車票能不能用：{ ok, reason, to }。reason：none、battle、no-mrt、era */
  function canTicket(state, rawItems, id, ctx) {
    var eff = effectOf(rawItems, id);
    if (kindOf(eff) !== 'ticket' || !has(state, id)) return { ok: false, reason: 'none' };
    ctx = ctx || {};
    if (ctx.inBattle) return { ok: false, reason: 'battle' };
    var to = lastMrt(state);
    if (!to) return { ok: false, reason: 'no-mrt' };
    if (ctx.map && JP_ERA.test(ctx.map.name || '')) return { ok: false, reason: 'era' };
    // 整合6（審查第 2 輪）：目的地要真的存在、能站（ctx.valid＝Character.validPlace；被改過的存檔碼不能傳到不存在的地圖）
    if (ctx.valid && !ctx.valid({ map: to.map, x: to.tx, y: to.ty })) return { ok: false, reason: 'bad-dest' };
    return { ok: true, to: to };
  }
  function useTicket(state, rawItems, id, ctx) {
    var r = canTicket(state, rawItems, id, ctx);
    if (!r.ok) return r;
    take(state, id);
    return r;
  }

  /** 艋舺糕餅：吃了 → flags._guardBuff = { mult, battles }（重設、不疊加） */
  function useGuard(state, rawItems, id, ctx) {
    var eff = effectOf(rawItems, id);
    if (kindOf(eff) !== 'guard' || !has(state, id)) return { ok: false, reason: 'none' };
    if (ctx && ctx.inBattle) return { ok: false, reason: 'battle' };
    take(state, id);
    flags(state)._guardBuff = { mult: Number(eff.guard), battles: Math.max(1, Number(eff.battles) || 1) };
    return { ok: true, battles: flags(state)._guardBuff.battles };
  }
  /** 這場戰鬥的物防倍率（沒有效果＝1） */
  function guardMult(state) {
    var g = state.flags && state.flags._guardBuff;
    return g && g.battles > 0 ? 1 + (Number(g.mult) || 0) : 1;
  }
  function guardLeft(state) { var g = state.flags && state.flags._guardBuff; return g && g.battles > 0 ? g.battles : 0; }
  /** 一場戰鬥結束（任何結果）→ 扣 1 場；扣完拿掉。回剩幾場 */
  function battleEnded(state) {
    var g = state.flags && state.flags._guardBuff;
    if (!g) return 0;
    g.battles -= 1;
    if (g.battles <= 0) { delete state.flags._guardBuff; return 0; }
    return g.battles;
  }

  var REASON_TEXT = { 'bad-dest': '車票上的站找不到了，先走路去車站吧。', boss: '頭目戰不能用煙霧彈！', 'no-mrt': '還沒搭過捷運，車票不知道要回哪一站。', era: '這個時代還沒有捷運，車票用不了。', battle: '戰鬥中不能用。', none: '現在不能用。', 'not-battle': '戰鬥時才能用。' };

  var SpecialItems = { effectOf: effectOf, kindOf: kindOf, battleList: battleList, canSmoke: canSmoke, useSmoke: useSmoke,
    recordMrt: recordMrt, lastMrt: lastMrt, canTicket: canTicket, useTicket: useTicket,
    useGuard: useGuard, guardMult: guardMult, guardLeft: guardLeft, battleEnded: battleEnded, REASON_TEXT: REASON_TEXT };
  if (typeof window !== 'undefined' && window) { window.JQ = window.JQ || {}; window.JQ.SpecialItems = SpecialItems; }
  if (typeof module !== 'undefined') module.exports = SpecialItems;
})();
