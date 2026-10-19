/*
 * 走路圖的方向列（勇者大冒險II，GDD 7.4 D1、6.2、5.1 M8）：與畫面無關，可在 node 測試（engine/assets.js、MapScene 接到畫面上）。
 * - 四年級版所有角色都有 8 方向走路圖（老闆裁示）：sprites.js 沒寫 rows 時，預設列順序是
 *     down, downleft, left, upleft, up, upright, right, downright（GDD 6.2）
 * - 走路圖缺某一列（例如沿用三年級版的四方向圖 rows: ["down","left","right","up"]）時，退回最接近的方向：
 *     斜下 → 下（再不行才橫向），斜上 → 上（再不行才橫向）；左、右 → 左下／左上（右下／右上）→ 下；上 → 左上／右上；下 → 左下／右下。
 *   不會一律退成朝下（M8）。都找不到才用第 0 列。
 */
(function () {
  'use strict';
  var ROWS8 = ['down', 'downleft', 'left', 'upleft', 'up', 'upright', 'right', 'downright'];
  var ROWS4 = ['down', 'left', 'right', 'up'];   // 三年級版的四方向圖（sprites.js 要明寫 rows）
  // 每個方向的退路（第一個是自己）
  var FALLBACK = {
    down: ['down', 'downleft', 'downright'],
    up: ['up', 'upleft', 'upright'],
    left: ['left', 'downleft', 'upleft', 'down'],
    right: ['right', 'downright', 'upright', 'down'],
    downleft: ['downleft', 'down', 'left'],
    downright: ['downright', 'down', 'right'],
    upleft: ['upleft', 'up', 'left'],
    upright: ['upright', 'up', 'right']
  };

  /** sprites.js 的 rows 欄位 → 方向名稱陣列：陣列照用；數字 8 或沒寫 → ROWS8；數字 4 → ROWS4（三年級版預設順序） */
  function orderOf(rows) {
    if (Array.isArray(rows) && rows.length) return rows.slice();
    if (rows === 4) return ROWS4.slice();
    return ROWS8.slice();
  }

  /** 方向 dir 在走路圖的第幾列（依 order；缺列時照 FALLBACK 找最接近的；都沒有 → 0） */
  function rowFor(order, dir) {
    var o = Array.isArray(order) && order.length ? order : ROWS8;
    var chain = FALLBACK[dir] || [dir];
    for (var i = 0; i < chain.length; i++) {
      var r = o.indexOf(chain[i]);
      if (r >= 0) return r;
    }
    return 0;
  }

  /** 實際會畫哪一個方向（缺列時的退路結果），給測試與除錯看 */
  function resolvedDir(order, dir) {
    var o = Array.isArray(order) && order.length ? order : ROWS8;
    return o[rowFor(o, dir)];
  }

  /** 這張走路圖 8 個方向都有（主角朝向可以直接用 8 方向） */
  function has8(order) {
    var o = Array.isArray(order) ? order : [];
    return ROWS8.every(function (d) { return o.indexOf(d) >= 0; });
  }

  var DirRows = { ROWS8: ROWS8, ROWS4: ROWS4, FALLBACK: FALLBACK, orderOf: orderOf, rowFor: rowFor, resolvedDir: resolvedDir, has8: has8 };
  if (typeof window !== 'undefined' && window) { window.JQ = window.JQ || {}; window.JQ.DirRows = DirRows; }
  if (typeof module !== 'undefined') module.exports = DirRows;
})();
