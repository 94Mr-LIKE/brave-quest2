/*
 * 遊戲設定常數（可調參數集中在這裡）
 * 改這裡的數字不需要動其他程式；node 測試也讀這份。
 */
(function () {
  'use strict';
  var CONFIG = {
    GAME_TITLE: '勇者大冒險II',
    GAME_SUBTITLE: '怪盜與家鄉的印章',

    // 畫面（GDD 7.3 C7、6.1；老闆裁示高解析）：邏輯格子 48px、內部解析度 960×540（16:9；三年級版 32px、640×360 的 1.5 倍）
    TILE: 48,
    VIEW_W: 960,
    VIEW_H: 540,

    // 地圖上角色的顯示高度（sprites.js 有 mapH 時以 sprites.js 為準）；三年級版 40／64 依格子放大 1.5 倍
    MAP_MONSTER_H: 60,     // 一般怪物在地圖上的高度
    MAP_BOSS_H: 96,        // 頭目在地圖上的高度
    STEP_MS: 210,          // 走一格的時間（毫秒）；斜走 ×√2（systems/move8.js）

    // 戰鬥
    BOSS_DAMAGE_MULT: 1.3,
    // 戰鬥背景：maps.js 的 battle_bg 若對得到 assets/battle/bb_<名稱>.png 就用它；否則用這張「地圖 ID → 戰鬥背景」對照表
    // 四年級的戰鬥背景（bb_expo_lawn、bb_beitou、bb_thermal，GDD 6.3）美術還沒交；沒有圖時戰鬥畫面用純色底
    BATTLE_BG_BY_MAP: { T01: 'expo_lawn', T02: 'beitou', T03: 'thermal' },
    BATTLE_BG_ALIAS: {},
    MONSTER_RESPAWN_MS: 30000,

    // 虛擬搖桿
    JOYSTICK_SIZE: 150,    // 搖桿底座直徑（px，CSS 像素）
    JOYSTICK_DEADZONE: 0.25, // 拖不到這個比例不會走
    TOUCH_BUTTON_SIZE: 76  // A/B 鍵直徑（至少 64px）
  };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.CONFIG = CONFIG; }
  if (typeof module !== 'undefined') module.exports = CONFIG;
})();
