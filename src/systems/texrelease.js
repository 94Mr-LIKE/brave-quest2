/*
 * 換地圖時釋放舊地圖的貼圖（勇者大冒險II，GDD 7.3 C7、6.1）：與畫面無關，可在 node 測試（MapScene.preload 接到 Phaser）。
 * - 四年級版地圖背景很大（T02 3456×2304 解碼後約 30 MiB），三年級版換地圖時從不釋放，地圖越多越吃記憶體。
 * - 地圖背景／前景的貼圖 key 是 'map:<檔名>'，切塊後是 'map:<檔名>#<i>,<j>'（MapScene.addBigImage）。
 * - 換到新地圖時（MapScene.preload，舊地圖的物件已在 scene 重新開始時清掉），把「不是新地圖要用的」map: 貼圖全部 textures.remove。
 *   新地圖要用的（同一張圖重新開始，例如轉職換走路圖）留著，不重新下載。
 * - 只動 'map:' 開頭的 key；角色、圖塊、介面圖（spr:、tiles:、ui:）很小而且各地圖共用，不釋放。
 */
(function () {
  'use strict';
  var PREFIX = 'map:';

  /** 貼圖 key → 它屬於哪個地圖圖檔（'map:bg_T01.webp#0,1' → 'bg_T01.webp'）；不是地圖貼圖 → null */
  function fileOf(key) {
    if (typeof key !== 'string' || key.indexOf(PREFIX) !== 0) return null;
    var f = key.slice(PREFIX.length), i = f.indexOf('#');
    return i >= 0 ? f.slice(0, i) : f;
  }

  /** 要釋放哪些 key：所有 map: 貼圖裡，圖檔不在 keepFiles（新地圖的 bg、fg）裡的 */
  function staleKeys(allKeys, keepFiles) {
    var keep = {};
    (keepFiles || []).forEach(function (f) { if (f) keep[f] = true; });
    return (allKeys || []).filter(function (k) { var f = fileOf(k); return f !== null && !keep[f]; });
  }

  /**
   * 釋放舊地圖貼圖。textures＝Phaser 的 TextureManager（或測試用的假物件：getTextureKeys()、exists(k)、remove(k)）。
   * 回傳釋放了哪些 key。出錯（例如貼圖還在用）時略過那一個，不讓換地圖失敗。
   */
  function release(textures, keepFiles) {
    if (!textures || typeof textures.getTextureKeys !== 'function') return [];
    var out = [];
    staleKeys(textures.getTextureKeys(), keepFiles).forEach(function (k) {
      try { if (!textures.exists || textures.exists(k)) { textures.remove(k); out.push(k); } } catch (e) { /* 略過 */ }
    });
    return out;
  }

  /** 開發版顯示用：目前 map: 貼圖的總像素（寬×高）與 MiB（每像素 4 位元組）。sizeOf(k) → {w, h} */
  function mapBytes(allKeys, sizeOf) {
    var px = 0;
    (allKeys || []).forEach(function (k) {
      if (fileOf(k) === null) return;
      var s = sizeOf ? sizeOf(k) : null;
      if (s && s.w > 0 && s.h > 0) px += s.w * s.h;
    });
    return { px: px, mib: Math.round(px * 4 / 1048576 * 10) / 10 };
  }

  var TexRelease = { PREFIX: PREFIX, fileOf: fileOf, staleKeys: staleKeys, release: release, mapBytes: mapBytes };
  if (typeof window !== 'undefined' && window) { window.JQ = window.JQ || {}; window.JQ.TexRelease = TexRelease; }
  if (typeof module !== 'undefined') module.exports = TexRelease;
})();
