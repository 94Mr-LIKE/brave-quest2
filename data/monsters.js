/*
 * 勇者大冒險II — 怪物與頭目（BQ2 v0.6 台北章：03_數值.md 第 2 節、03b 戰鬥系統規格）
 *
 * 原創怪物：只借經典 RPG 的「類型」，不照搬造型、名稱、配色；不用信仰對象、原住民族神靈與傳說。
 * 老闆裁示第 13 點：野外怪物與頭目一律兇狠造型（美術用），仍不畫血與傷口；打倒＝「逃走」「退回」「停機」，不寫死亡（wake 欄位）。
 *
 * 數值（v0.6）：框架 sim_bq2.monster() 的公式值，野怪再乘家族模板（03_數值 第 2 節）。頭目不套模板。
 * BQ2 v0.6 新欄位（03_數值 第 7 節；說明見 README_資料格式.md「怪物」）：
 *   cat 類別、elem 屬性（金木水火土風光闇）、tpl 家族模板、agi 速、pdef 物防、mdef 魔防、
 *   six 六項能力 {STR,VIT,AGI,INT,SPI,LUK}（力＝攻擊、體＝物防÷0.5、精神＝魔防÷0.5）、
 *   stars 普攻星數 [低, 高]（取代 q_levels；技能時 +1 星）、skill {name, rate, act（技能動作文字）}、
 *   kind 種類：wild 野怪／elite 精英／mboss 迷宮小頭目／tboss1 怪盜第一段（變裝）／tboss2 怪盜第二段（原裝），
 *   next_stage 頭目下一段的怪物 id（第一段→第二段，換段不補血）。
 * 舊欄位 q_levels 只留給現有畫面；整合6（數值複核 QA 第 2 輪裁定）：台北章怪物一律不綁科目——野怪不寫 subject，攻擊題照所在地圖已開放的科目輪流（03b R9）。頭目的 subjects 是五科輪流。
 * 頭目：phases＝1（每段一個階段，不再 +20%）、phase_q＝每段至少答對題數（03b R13：迷宮小頭目 3、怪盜兩段各 2）。
 * 掉落：drops[].quest＝只在這個委託進行中、need＝還沒收集夠這個數量時才掉（03_數值 2.4）。
 * 台詞：dialog_first＝第一次遇到；頭目 dialog_phase＝HP 第一次降到 2/3、1/3 時播（只播台詞，不鎖血）、dialog_again＝輸了再來。
 */
window.MONSTERS = {

  // ── T01 練習草地、T04 士林 ──
  strap: {
    name: "晃晃吊環", sprite: "mon_strap", level: 1, hp: 7, atk: 4, q_levels: [1, 1],
    cat: "在地自然系", elem: "風", tpl: "快腳", kind: "wild", agi: 7, pdef: 3, mdef: 3,
    six: { STR: 4, VIT: 6, AGI: 7, INT: 4, SPI: 6, LUK: 5 }, stars: [1, 1],
    skill: { name: "大迴旋", rate: 0.2, act: "吊環甩一大圈捲起風" },
    exp: 4, gold: 3, drops: [{ item: "strap_spring", rate: 1.0, quest: "Q4_C01_M2", need: 2 }, { item: "herb", rate: 0.03 }], boss: false, dialog_first: "D_MON_FIRST_STRAP",
    desc: "捷運車廂的吊環變成的怪物，一晃一晃想把人絆倒。",
    wake: "晃晃吊環不晃了，乖乖退回車廂。"
  },
  bookworm: {
    name: "書籤毛毛蟲", sprite: "mon_bookworm", level: 2, hp: 11, atk: 4, q_levels: [1, 1],
    cat: "在地自然系", elem: "木", tpl: "均衡", kind: "wild", agi: 6, pdef: 4, mdef: 4,
    six: { STR: 4, VIT: 8, AGI: 6, INT: 4, SPI: 8, LUK: 6 }, stars: [1, 1],
    skill: { name: "書頁亂翻", rate: 0.2, act: "把書頁翻得嘩啦啦" },
    exp: 4, gold: 3, drops: [{ item: "herb", rate: 0.03 }], boss: false, dialog_first: "D_MON_FIRST_BOOKWORM",
    desc: "身體一節一節像書籤的毛毛蟲，最愛把書頁咬亂。",
    wake: "書籤毛毛蟲縮回書裡，不敢再出來。"
  },

  // ── T04 士林、T05 萬華、T08 碼頭、TD1–TD2 坑道 ──
  clockbug: {
    name: "發條小蟲", sprite: "mon_clockbug", level: 3, hp: 14, atk: 5,
    cat: "發條機關", elem: "金", tpl: "發條機關", kind: "wild", agi: 7, pdef: 7, mdef: 5,
    six: { STR: 5, VIT: 14, AGI: 7, INT: 5, SPI: 10, LUK: 7 }, stars: [1, 2],
    skill: { name: "齒輪咬咬", rate: 0.2, act: "用銅齒輪夾一下" },
    exp: 5, gold: 3, drops: [{ item: "star_gear", rate: 0.6, quest: "Q4_C01_M3", need: 4 }, { item: "herb", rate: 0.03 }], boss: false, dialog_first: "D_MON_FIRST_CLOCKBUG",
    desc: "怪盜做的銅色小甲蟲，背上插著發條鑰匙，喀啦喀啦到處咬東西。",
    wake: "發條小蟲停機了，掉出一個小齒輪。"
  },

  // ── T05 萬華、T06 圓山 ──
  compass: {
    name: "轉轉指北針", sprite: "mon_compass", level: 4, hp: 17, atk: 5, q_levels: [1, 2],
    cat: "在地自然系", elem: "土", tpl: "硬殼", kind: "wild", agi: 7, pdef: 10, mdef: 4,
    six: { STR: 5, VIT: 20, AGI: 7, INT: 5, SPI: 8, LUK: 8 }, stars: [1, 2],
    skill: { name: "轉轉暈", rate: 0.2, act: "指針狂轉，讓人頭暈" },
    exp: 5, gold: 3, drops: [{ item: "herb_leaf", rate: 0.6, quest: "Q4_C01_S3", need: 3 }, { item: "herb", rate: 0.03 }], boss: false, dialog_first: "D_MON_FIRST_COMPASS",
    desc: "指針是鼻子的指北針，一直轉圈，轉得大家都迷路。",
    wake: "轉轉指北針停下來，指著北方逃走了。"
  },

  // ── 切片舊怪（台北章 03_數值 沒有列；保留給現有地圖，數值未改） ──
  sparrow: {
    name: "字母麻雀", sprite: "mon_sparrow", level: 5, hp: 55, atk: 9, subject: "英語", q_levels: [1, 2],
    exp: 60, gold: 8, drops: [{ item: "eraser", rate: 0.1 }], boss: false, dialog_first: "D_MON_FIRST_SPARROW",
    desc: "翅膀上有 A、B、C 斑點的胖麻雀，會把字母弄亂。",
    wake: "字母麻雀丟下亂掉的字母，飛回樹上去了。"
  },

  // ── T06 圓山、TD1–TD2 坑道 ──
  steam: {
    name: "噗噗蒸氣團", sprite: "mon_steam", level: 5, hp: 14, atk: 7, q_levels: [1, 2],
    cat: "在地自然系", elem: "水", tpl: "飄浮", kind: "wild", agi: 11, pdef: 4, mdef: 11,
    six: { STR: 7, VIT: 8, AGI: 11, INT: 7, SPI: 22, LUK: 9 }, stars: [1, 2],
    skill: { name: "熱泡泡", rate: 0.2, act: "頭頂冒出一串熱泡泡" },
    exp: 5, gold: 4, drops: [{ item: "herb", rate: 0.05 }], boss: false, dialog_first: "D_MON_FIRST_STEAM",
    desc: "地熱谷的白煙聚成的怪物，頭頂一直冒熱泡泡。",
    wake: "噗噗蒸氣團散成白煙，退回山谷裡。"
  },

  // ───────────────────────────── 精英 ─────────────────────────────
  // TD1 固定 1 隻，帶 1 隻 steam（03_數值 2.5；精英固定帶 1 隻野怪，03b R1）
  e_minecart: {
    name: "發條礦車轟隆號", short_name: "轟隆號", sprite: "mon_e_minecart", level: 6, hp: 68, atk: 12,
    cat: "發條機關", elem: "金", tpl: "發條機關", kind: "elite", agi: 10, pdef: 10, mdef: 8,
    six: { STR: 12, VIT: 20, AGI: 10, INT: 12, SPI: 16, LUK: 10 }, stars: [2, 2],
    skill: { name: "全速衝刺", rate: 0.3, act: "沿著軌道轟隆隆衝過來" },
    exp: 22, gold: 15, drops: [{ item: "herb", rate: 0.5 }, { item: "c01_herbtea", rate: 0.2 }], boss: false, escort: "steam", dialog_first: "D_MON_FIRST_MINECART",
    desc: "坑道裡的小礦車裝上了發條鑰匙，沿著軌道橫衝直撞。",
    wake: "轟隆號停機了，輪子掉了下來。"
  },

  // ───────────────────────────── 頭目 ─────────────────────────────
  dudu: {
    name: "發條蒸氣壺嘟嘟號", short_name: "嘟嘟號", sprite: "boss_dudu", level: 6, hp: 135, atk: 11, subject: "混合",
    subjects: ["國語", "數學", "自然", "社會", "英語"], q_levels: [2, 3],
    cat: "發條機關", elem: "光", kind: "mboss", agi: 12, pdef: 8, mdef: 8,
    six: { STR: 11, VIT: 16, AGI: 12, INT: 11, SPI: 16, LUK: 10 }, stars: [2, 3],
    skill: { name: "強光蒸氣", rate: 0.35, act: "壺嘴噴出發亮的白煙" },
    exp: 56, gold: 38, drops: [], boss: true,
    phases: 1, phase_q: 3, last_q_level: 3, ref_mobs: ["steam", "clockbug"],
    dialog_before: "D_BOSS_DUDU_A", dialog_after: "D_BOSS_DUDU_B", dialog_phase: { 2: "D_BOSS_DUDU_P2", 3: "D_BOSS_DUDU_P3" }, dialog_again: "D_BOSS_DUDU_AGAIN",
    desc: "怪盜做的發條機關：銅色大茶壺，背後有發條鑰匙，壺嘴一直噴白煙。",
    wake: "嘟嘟號的發條轉完了，坐下來不動了。"
  },
  // 怪盜兩段（03_數值 2.3）：第一段變裝鑑定師 → HP 歸零且答對 ≥2 題 → 播 D_BOSS_C01_REVEAL → 第二段蹦蹦號（不補血）。
  // 第二段時怪盜原裝站在後面指揮，不是目標、不攻擊（技術長裁定）。
  b01_appraiser: {
    name: "古董鑑定師", sprite: "boss_b01_appraiser", level: 6, hp: 108, atk: 10, subject: "混合",
    subjects: ["國語", "數學", "自然", "社會", "英語"], q_levels: [2, 3],
    cat: "怪盜", elem: "火", kind: "tboss1", agi: 12, pdef: 8, mdef: 8,
    six: { STR: 10, VIT: 16, AGI: 12, INT: 10, SPI: 16, LUK: 10 }, stars: [2, 3],
    skill: { name: "聚光鑑定", rate: 0.35, act: "放大鏡把燈光聚成一道熱熱的光" },
    exp: 56, gold: 38, drops: [], boss: true, next_stage: "b01_bengbeng",
    phases: 1, phase_q: 2,
    dialog_before: "D_BOSS_C01_APPRAISER_A", dialog_after: "D_BOSS_C01_REVEAL", dialog_phase: { 2: "D_BOSS_C01_APPRAISER_P2", 3: "D_BOSS_C01_APPRAISER_P3" }, dialog_again: "D_BOSS_C01_APPRAISER_AGAIN",
    desc: "自稱古董鑑定師的神祕人，拿著大放大鏡，好像在打什麼主意。",
    wake: "鑑定師的帽子掉了下來——被識破了！"
  },
  b01_bengbeng: {
    name: "發條螽斯蹦蹦號", short_name: "蹦蹦號", sprite: "boss_b01_bengbeng", level: 7, hp: 147, atk: 12, subject: "混合",
    subjects: ["國語", "數學", "自然", "社會", "英語"], q_levels: [2, 3],
    cat: "發條機關", elem: "土", kind: "tboss2", agi: 13, pdef: 9, mdef: 9,
    six: { STR: 12, VIT: 18, AGI: 13, INT: 12, SPI: 18, LUK: 10 }, stars: [2, 3],
    skill: { name: "大跳躍", rate: 0.35, act: "跳到半空再落下，碼頭木板震一下" },
    exp: 60, gold: 40, drops: [], boss: true, stage: 2,
    phases: 1, phase_q: 2,
    dialog_before: "D_BOSS_C01_BENGBENG_A", dialog_after: "D_BOSS_C01_BENGBENG_B", dialog_phase: { 2: "D_BOSS_C01_BENGBENG_P2", 3: "D_BOSS_C01_BENGBENG_P3" }, dialog_again: "D_BOSS_C01_BENGBENG_AGAIN",
    desc: "怪盜做的發條大螽斯，後腿一蹬就跳得好高。",
    wake: "蹦蹦號停機了；怪盜丟下煙霧彈逃走了。"
  }
};
