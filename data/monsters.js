/*
 * 勇者大冒險II — 怪物與頭目（GDD 1.4、4.4；老闆 2026-10-19 裁示：照第 1 節的 5 隻怪＋嘟嘟號）
 *
 * 原創怪物：只借經典 RPG 的「類型」，不照搬造型、名稱、配色；不用信仰對象、原住民族神靈與傳說。
 * 老闆裁示第 13 點：野外怪物與頭目一律兇狠造型（美術用），仍不畫血與傷口；打倒＝「逃走」「退回」「安靜下來」，不寫死亡（wake 欄位）。
 * 圖：第三批接上戰鬥圖（mon_*.png 256×256、boss_dudu.png 448×448，兇狠版）；地圖上的 8 方向圖還沒交，先用戰鬥圖縮小（sprites.js mapH）。
 *
 * 數值照 GDD 4.4（37 號公式）：小怪 hp＝參考 ATK × 平均難度係數 × 1.15 × K；atk＝參考 HP ÷ 9＋DEF 2；
 *   exp＝升級所需 ÷（lv＋2 場）÷ 地圖係數；gold＝exp × 地圖係數 × 0.12。
 * 弱點不綁科目（GDD 1.4），切片不做弱點系統。
 * 掉落：drops[].quest＝只有這個委託進行中、而且還沒收集夠的時候才掉（GDD 4.4：strap_spring 只在 Q4_TUT_2、clue_piece 只在 Q4_T02_3）。
 * 第三批台詞（劇本 dialogs_taipei.js）：dialog_first＝第一次遇到時阿咕提醒（D_MON_FIRST_*）；頭目 dialog_phase＝進入第 2、3 階段、
 *   dialog_again＝輸了（累倒）再來。
 */
window.MONSTERS = {

  // ── T01 博覽會會場（練習草地）、T02 ──
  strap: {
    name: "晃晃吊環", sprite: "mon_strap", level: 2, hp: 25, atk: 6, subject: "數學", q_levels: [1, 1],
    exp: 30, gold: 4, drops: [{ item: "strap_spring", rate: 1.0, quest: "Q4_TUT_2" }, { item: "herb", rate: 0.2 }], boss: false, dialog_first: "D_MON_FIRST_STRAP",
    desc: "捷運車廂的吊環變成的怪物，一晃一晃想把人絆倒。",
    wake: "晃晃吊環不晃了，乖乖退回車廂。"
  },

  // ── T02 北投溫泉街 ──
  compass: {
    name: "轉轉指北針", sprite: "mon_compass", level: 3, hp: 30, atk: 7, subject: "社會", q_levels: [1, 1],
    exp: 40, gold: 5, drops: [{ item: "clue_piece", rate: 0.5, quest: "Q4_T02_3" }], boss: false, dialog_first: "D_MON_FIRST_COMPASS",
    desc: "指針是鼻子的指北針，一直轉圈，轉得大家都迷路。",
    wake: "轉轉指北針停下來，指著北方逃走了。"
  },
  bookworm: {
    name: "書籤毛毛蟲", sprite: "mon_bookworm", level: 4, hp: 35, atk: 8, subject: "國語", q_levels: [1, 2],
    exp: 55, gold: 7, drops: [{ item: "clue_piece", rate: 0.5, quest: "Q4_T02_3" }, { item: "herb", rate: 0.2 }], boss: false, dialog_first: "D_MON_FIRST_BOOKWORM",
    desc: "身體一節一節像書籤的毛毛蟲，最愛把書頁咬亂。",
    wake: "書籤毛毛蟲縮回書裡，不敢再出來。"
  },

  // ── T03 地熱谷步道 ──
  sparrow: {
    name: "字母麻雀", sprite: "mon_sparrow", level: 5, hp: 55, atk: 9, subject: "英語", q_levels: [1, 2],
    exp: 60, gold: 8, drops: [{ item: "eraser", rate: 0.1 }], boss: false, dialog_first: "D_MON_FIRST_SPARROW",
    desc: "翅膀上有 A、B、C 斑點的胖麻雀，會把字母弄亂。",
    wake: "字母麻雀丟下亂掉的字母，飛回樹上去了。"
  },
  steam: {
    name: "噗噗蒸氣團", sprite: "mon_steam", level: 6, hp: 65, atk: 10, subject: "自然", q_levels: [1, 2],
    exp: 65, gold: 9, drops: [{ item: "herb", rate: 0.3 }], boss: false, dialog_first: "D_MON_FIRST_STEAM",
    desc: "地熱谷的白煙聚成的怪物，頭頂一直冒熱泡泡。",
    wake: "噗噗蒸氣團散成白煙，退回山谷裡。"
  },

  // ───────────────────────────── 頭目 ─────────────────────────────
  dudu: {
    name: "發條蒸氣壺嘟嘟號", short_name: "嘟嘟號", sprite: "boss_dudu", level: 7, hp: 360, atk: 10, subject: "混合",
    subjects: ["國語", "數學", "自然", "社會", "英語"], q_levels: [1, 3],
    exp: 500, gold: 60, drops: [], boss: true,
    phases: 3, phase_q: 2, last_q_level: 3, ref_mobs: ["sparrow", "steam"],
    dialog_before: "D_BOSS_DUDU_A", dialog_after: "D_BOSS_DUDU_B", dialog_phase: { 2: "D_BOSS_DUDU_P2", 3: "D_BOSS_DUDU_P3" }, dialog_again: "D_BOSS_DUDU_AGAIN",
    desc: "怪盜做的發條機關：銅色大茶壺，背後有發條鑰匙，壺嘴一直噴白煙。",
    wake: "嘟嘟號的發條轉完了，坐下來不動了。"
  }
};
