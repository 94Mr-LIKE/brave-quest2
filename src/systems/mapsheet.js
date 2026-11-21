/*
 * BQ2 v0.6 整合2：地圖上怪物的走路圖（sprites.js 的 map_sheet）。與畫面無關，可在 node 測試；MapScene.placeMonster 接到畫面上。
 * - map_sheet：{ file, frameW, frameH, cols:4, rows:["down","left","right","up"], shadow:false }
 *   4 方向 × 4 格，列序 down、left、right、up；小怪 80×80、頭目 128×128（美術交件規格）。
 * - 美術圖不含影子（shadow:false）→ 引擎統一畫影子（橢圓）；沒有 map_sheet 的怪維持舊做法（單張圖縮到 mapH），也畫同樣的影子。
 * - 顯示高度：sprites.js 的 mapH 優先；沒有時用 config 預設（小怪 MAP_MONSTER_H、頭目 MAP_BOSS_H）。
 */
(function () {
  'use strict';
  var ROWS4 = ['down', 'left', 'right', 'up'];

  /** sprites.js 一筆 → 正規化的 map_sheet；沒有或欄位不完整時回 null（呼叫端照舊用單張圖） */
  function sheetOf(entry) {
    var s = entry && entry.map_sheet;
    if (!s || !s.file) return null;
    var fw = s.frameW || s.fw || 0, fh = s.frameH || s.fh || 0;
    if (!(fw > 0 && fh > 0)) return null;
    var rows = Array.isArray(s.rows) && s.rows.length ? s.rows.slice() : ROWS4.slice();
    return { file: s.file, frameW: fw, frameH: fh, cols: s.cols || 4, rows: rows, shadow: !!s.shadow };
  }

  /** 移動量 → 4 方向（橫向優先；沒有移動回 null） */
  function dirOf(dx, dy) {
    if (!dx && !dy) return null;
    if (Math.abs(dx) >= Math.abs(dy)) return dx < 0 ? 'left' : 'right';
    return dy < 0 ? 'up' : 'down';
  }

  /** 方向在第幾列；圖裡沒有這個方向時退到 down（第 0 列） */
  function rowOf(sheet, dir) {
    var i = sheet.rows.indexOf(dir);
    return i >= 0 ? i : 0;
  }

  /** 該方向、第 step 步的影格編號（列 × cols ＋ 格；step 會繞回） */
  function frameOf(sheet, dir, step) {
    var c = sheet.cols, k = ((step || 0) % c + c) % c;
    return rowOf(sheet, dir) * c + k;
  }

  /** 該方向的影格清單（建動畫用） */
  function framesOf(sheet, dir) {
    var out = [];
    for (var i = 0; i < sheet.cols; i++) out.push(frameOf(sheet, dir, i));
    return out;
  }

  /** 顯示高度（像素）：mapH 優先，否則小怪／頭目預設 */
  function displayH(entry, boss, cfg) {
    if (entry && entry.mapH) return entry.mapH;
    cfg = cfg || {};
    return boss ? (cfg.MAP_BOSS_H || 96) : (cfg.MAP_MONSTER_H || 64);
  }

  /** 引擎畫的影子：寬＝顯示寬的 0.6、高＝寬的 0.3，透明度 0.28；畫在腳底（origin 0.5,1 的 y） */
  function shadowOf(dispW) {
    var w = Math.max(8, Math.round(dispW * 0.6));
    return { w: w, h: Math.max(4, Math.round(w * 0.3)), alpha: 0.28, color: 0x000000 };
  }

  var MapSheet = { ROWS4: ROWS4, sheetOf: sheetOf, dirOf: dirOf, rowOf: rowOf, frameOf: frameOf, framesOf: framesOf, displayH: displayH, shadowOf: shadowOf };
  if (typeof window !== 'undefined' && window) { window.JQ = window.JQ || {}; window.JQ.MapSheet = MapSheet; }
  if (typeof module !== 'undefined') module.exports = MapSheet;
})();
