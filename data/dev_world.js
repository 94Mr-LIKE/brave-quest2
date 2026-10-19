/*
 * 開發用的世界地圖資料：只有正式的 window.WORLD（world.js）還沒定義時才使用。
 * 格式：window.WORLD = { image?, start_map?, regions: [{ id, name, map_entry, x, y, unlock_quest }] }
 *   x, y 介於 0～1 時是圖片上的比例位置；大於 1 時是圖片像素座標。
 */
if (typeof window.WORLD === 'undefined') {
  window.WORLD = {
    title: '世界地圖（開發用）',
    start_map: 'T01',
    regions: [
      { id: 'dev_a', name: '起點（開發用）', map_entry: 'T01', x: 0.62, y: 0.12, unlock_quest: null }
    ]
  };
}