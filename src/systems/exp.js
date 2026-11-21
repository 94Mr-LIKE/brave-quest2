/* 等級與經驗值：經驗值 需求 = round(40 × lv^1.5) */
(function () {
  'use strict';
  var MAX_LEVEL = 99;

  /** 從 lv 升到 lv+1 需要的 經驗值 */
  function expToNext(lv) {
    return Math.round(40 * Math.pow(lv, 1.5));
  }

  /**
   * 把 amount 加到 player（{level, exp, totalExp}），回傳升了幾級。
   * player.exp 是「目前等級內」的進度。
   */
  function addExp(player, amount) {
    amount = Math.max(0, Math.floor(amount || 0));
    player.exp += amount;
    player.totalExp = (player.totalExp || 0) + amount;
    var gained = 0;
    while (player.level < MAX_LEVEL && player.exp >= expToNext(player.level)) {
      player.exp -= expToNext(player.level);
      player.level += 1;
      gained += 1;
    }
    return gained;
  }

  /** 0~1 的進度比例（給 經驗值 條用） */
  function progress(player) {
    return Math.min(1, player.exp / expToNext(player.level));
  }


  /**
   * BQ2 v0.6 經驗表（03b R14；框架 sim_bq2.exp_to_next 輸出 Lv1–98 的常數，不在遊戲裡即時算）
   *   升到下一級＝nice(B(Lv) × E(Lv＋3) × 平均隻數(Lv＋3 所在章) × 職階倍率)；見習、初級 1.0，中級 1.25，高級 1.5
   *   TABLE_V06[tier][lv−1]＝從 lv 升到 lv＋1 要的經驗。舊的 expToNext（40×lv^1.5）留給現有畫面，第 2 段換成這個。
   */
  var TABLE_V06 = {
    basic: [35, 45, 80, 100, 125, 145, 175, 210, 240, 230, 250, 270, 300, 420, 450, 490, 540, 590, 640, 690, 750, 820, 890, 970, 1050, 1140, 1240, 1340, 1460, 1760, 1900, 2050, 2200, 2400, 2550, 2750, 3000, 3200, 3450, 3750, 4050, 4350, 4700, 5050, 5450, 5900, 6350, 6850, 7350, 7950, 8550, 9200, 9950, 10700, 11500, 12400, 13350, 14400, 15500, 16700, 18000, 19400, 20900, 22500, 24200, 26100, 28100, 30300, 32600, 35100, 37800, 40700, 43800, 47100, 50700, 54600, 58800, 63300, 68100, 73300, 78900, 84900, 91400, 98400, 105900, 113900, 122600, 131900, 141900, 152700, 164300, 176800, 190200, 204600, 220100, 236800, 254800, 274100],
    inter: [45, 55, 100, 125, 155, 185, 220, 260, 300, 290, 310, 340, 370, 520, 570, 620, 670, 730, 800, 870, 940, 1020, 1110, 1210, 1310, 1420, 1550, 1680, 1820, 2200, 2350, 2550, 2750, 2950, 3200, 3450, 3750, 4050, 4350, 4700, 5050, 5450, 5850, 6300, 6800, 7350, 7900, 8550, 9200, 9900, 10700, 11500, 12400, 13350, 14400, 15500, 16700, 18000, 19400, 20900, 22500, 24200, 26100, 28100, 30300, 32600, 35100, 37800, 40700, 43900, 47200, 50800, 54700, 58900, 63400, 68300, 73500, 79100, 85200, 91700, 98600, 106200, 114300, 123000, 132300, 142400, 153200, 164900, 177400, 190900, 205400, 221000, 237800, 255800, 275200, 296000, 318500, 342600],
    adv: [50, 70, 120, 150, 185, 220, 260, 310, 360, 340, 370, 410, 440, 620, 680, 740, 810, 880, 950, 1040, 1130, 1230, 1330, 1450, 1570, 1710, 1860, 2000, 2200, 2650, 2850, 3050, 3300, 3550, 3850, 4150, 4500, 4850, 5200, 5600, 6050, 6550, 7050, 7600, 8200, 8800, 9500, 10250, 11050, 11900, 12800, 13800, 14900, 16050, 17300, 18600, 20100, 21600, 23300, 25100, 27000, 29100, 31300, 33700, 36300, 39100, 42100, 45400, 48900, 52600, 56700, 61000, 65700, 70700, 76100, 81900, 88200, 94900, 102200, 110000, 118400, 127400, 137100, 147600, 158800, 170900, 183900, 197900, 212900, 229100, 246500, 265200, 285300, 306900, 330200, 355200, 382200, 411100]
  };
  TABLE_V06.novice = TABLE_V06.basic;
  function expToNextV06(lv, tier) {
    var t = TABLE_V06[tier || 'novice'] || TABLE_V06.basic;
    if (lv >= MAX_LEVEL) return Infinity;
    return t[Math.max(1, lv) - 1];
  }
  /** 照 BQ2 經驗表加經驗；回傳升了幾級（tier＝目前職業的職階） */
  function addExpV06(player, amount, tier) {
    amount = Math.max(0, Math.floor(amount || 0));
    player.exp += amount;
    player.totalExp = (player.totalExp || 0) + amount;
    var gained = 0;
    while (player.level < MAX_LEVEL && player.exp >= expToNextV06(player.level, tier)) {
      player.exp -= expToNextV06(player.level, tier);
      player.level += 1;
      gained += 1;
    }
    return gained;
  }

  var Exp = { MAX_LEVEL: MAX_LEVEL, expToNext: expToNext, addExp: addExp, progress: progress, TABLE_V06: TABLE_V06, expToNextV06: expToNextV06, addExpV06: addExpV06 };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.Exp = Exp; }
  if (typeof module !== 'undefined') module.exports = Exp;
})();
