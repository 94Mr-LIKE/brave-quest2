/*
 * 勇者大冒險II — 委託（格式沿用三年級版 quests.js；新增欄位見 README_資料格式.md）
 * 第三批（2026-10-19）：GDD 2.3 主線 9 個＋支線 2 個，照劇本草稿 README 的委託表（觸發、步驟、獎勵、對白 key）。
 *
 * 欄位（三年級版沿用）：title、giver、map、kind（help 答題／hunt 收集掉落物／boss 打頭目）、goal（任務日誌目標，一定寫出去哪裡、找誰）、
 *   log_next（完成後的下一步）、subject／subjects、count、level_range、hunt、requires、reward、dialog_start、dialog_end。
 * 第三批新增：
 *   nodes        偏好的課程節點（data/curriculum.js 的節點 id；只當偏好，題目一律只出這張地圖已開放的節點）
 *   kind "talk"  0 題、只對話（Q4_T01_4 蓋章）：接下就完成
 *   giver "agu"  阿咕的委託（阿咕跟在主角身邊）：前置委託完成後自動開始（auto: true）；中途離開時面對阿咕按 A 繼續
 *   auto_accept  前置完成後自動接下（不播對話；Q4_T03_B：步道安全守則完成 → 觀景台的嘟嘟號出現）
 *   after        完成對話（dialog_end）後接著做的事：mrt_puzzle（捷運路線圖謎題，Q4_T01_3）、dialog（例：D_CARD_OWL 知識卡）
 *   pre_complete 0 題的委託在完成前先做的事：chart（海圖過場預告；系統下一批做，先留接口 G.chartPreview）、dialog（D_CHART_PREVIEW_B）
 *   reward.item_n、reward.title（稱號）、reward.stamp（印章，GDD 3.4 state.stamps；集章冊系統下一批做）
 *   ending       完成後播片尾（煙火、state.ending）
 * reward.exp 0＝依答題自動計算（題目 exp × 地圖係數）；hunt、boss 的 exp 也是 0（打怪本身就有 EXP）。
 */
window.QUESTS = {

  // ═════════════════════ T01 博覽會會場 ═════════════════════
  // 1. 新遊戲開始自動播 D_INTRO → D_Q4_TUT_1A（阿哲帶進場），再到服務台找小雯姊姊
  Q4_TUT_1: {
    title: "小小導覽員報到", giver: "desk", map: "T01", kind: "help",
    goal: "走到中央廣場北邊的服務台（在我們班展板的北邊），找小雯姊姊報到：答對 2 題社會（看地圖）。",
    log_next: "陳主任在服務台東邊的印章展示櫃前，好像出事了，去看看。",
    teaches: ["移動", "斜著走", "對話", "答題", "提示"],
    subject: "社會", nodes: ["社會-1011"], count: 2, level_range: [1, 1],
    hunt: null, requires: [], reward: { exp: 0, gold: 20, item: null, light: null },
    dialog_intro: "D_Q4_TUT_1A", dialog_start: "D_Q4_TUT_1_DESK", dialog_end: "D_Q4_TUT_1B"
  },
  // 2. 印章不見了：練習草地打倒晃晃吊環，收 2 個小發條（掉率 1.0，只在這個委託進行中掉）
  Q4_TUT_2: {
    title: "印章不見了！", giver: "director", map: "T01", kind: "hunt",
    goal: "到南邊用矮柵欄圍起來的練習草地，打倒晃晃吊環，帶回 2 個「吊環的小發條」給印章展示櫃前的陳主任。",
    log_next: "展示櫃底下還有第二張卡片！和阿咕一起念謎題卡。",
    teaches: ["戰鬥", "休息站"],
    subject: "數學", nodes: ["數學-1011"], count: null, level_range: [1, 1],
    hunt: { item: "strap_spring", n: 2, monster: "strap", map: "T01" },
    requires: ["Q4_TUT_1"], reward: { exp: 0, gold: 30, item: "herb", item_n: 2, light: null },
    dialog_start: "D_Q4_TUT_2A", dialog_end: "D_Q4_TUT_2B"
  },
  // 3. 第一張謎題卡（阿咕）：答 3 題 → 捷運路線圖謎題（點出有溫泉圖例的站）→ 捷運開放
  Q4_T01_3: {
    title: "第一張謎題卡", giver: "agu", map: "T01", kind: "help", auto: true,
    goal: "和阿咕一起解謎：答對 3 題（社會、數學），再看捷運路線圖，找出有溫泉符號的站。（中途離開了，面對阿咕按 A 就能繼續）",
    log_next: "到西邊的捷運圓山站，搭捷運到新北投站（現在是暫時的傳送光圈）。",
    subject: "混合", subjects: ["社會", "數學"], nodes: ["社會-1011", "數學-1011"], count: 3, level_range: [1, 2],
    hunt: null, requires: ["Q4_TUT_2"], reward: { exp: 0, gold: 30, item: "guide", light: null },
    dialog_start: "D_Q4_T01_3A", dialog_end: "D_Q4_T01_3B", after: { mrt_puzzle: true }
  },

  // ═════════════════════ T02 北投溫泉街 ═════════════════════
  // 4. 公共浴場的故事（溫泉博物館志工阿伯，台語）
  Q4_T02_1: {
    title: "公共浴場的故事", giver: "volunteer", map: "T02", kind: "help",
    goal: "到北投溫泉博物館（中山路和北投溪之間）門口找志工阿伯，聽公共浴場的故事：答對 2 題國語。",
    log_next: "到中山路對面（西北邊）的凱達格蘭文化館，問宇翔哥哥「北投」名字的祕密。",
    subject: "國語", nodes: ["國語-1012"], count: 2, level_range: [1, 2],
    hunt: null, requires: ["Q4_T01_3"], reward: { exp: 0, gold: 40, item: null, light: null },
    dialog_start: "D_Q4_T02_1A", dialog_end: "D_Q4_T02_1B"
  },
  // 5. 北投名字的秘密（凱達格蘭文化館導覽員宇翔，第一人稱介紹）
  Q4_T02_2: {
    title: "北投名字的秘密", giver: "guide", map: "T02", kind: "help",
    goal: "到凱達格蘭文化館（中山路西北邊）門口找宇翔哥哥，聽「北投」名字的由來：答對 3 題社會。",
    log_next: "怪物撿走了發光的紙片！打倒轉轉指北針、書籤毛毛蟲，找回 3 片謎題碎片。",
    subject: "社會", nodes: ["社會-1012"], count: 3, level_range: [1, 2],
    hunt: null, requires: ["Q4_T02_1"], reward: { exp: 0, gold: 40, item: null, light: null },
    dialog_start: "D_Q4_T02_2A", dialog_end: "D_Q4_T02_2B"
  },
  // 6. 謎題碎片（阿咕）：打倒轉轉指北針、書籤毛毛蟲，收 3 片（掉率 0.5，只在這個委託進行中掉）；收齊自動拼好
  Q4_T02_3: {
    title: "謎題碎片", giver: "agu", map: "T02", kind: "hunt", auto: true,
    goal: "在北投公園打倒轉轉指北針（北投溪東岸）、書籤毛毛蟲（圖書館西南邊），收集 3 片「謎題碎片」。收齊了阿咕會自動拼好。",
    log_next: "沿著北投溪往上走，從北邊的出口到地熱谷。",
    subject: "社會", nodes: [], count: null, level_range: [1, 2],
    hunt: { item: "clue_piece", n: 3, monster: "compass", map: "T02" },
    requires: ["Q4_T02_2"], reward: { exp: 0, gold: 50, item: "eraser", light: null },
    dialog_start: "D_Q4_T02_3A", dialog_end: "D_Q4_T02_3B"
  },
  // 支線 1：阿公的路線圖（公園阿公，台語；阿公會推薦去找圖書館的方爺爺）
  Q4_SIDE_1: {
    title: "阿公的路線圖", giver: "grandpa", map: "T02", kind: "help",
    goal: "北投公園西南邊的公園阿公迷路了：用方位和地圖幫他找路，答對 3 題社會。",
    log_next: "看不懂地圖的時候，可以去北投圖書館找方爺爺學看地圖。",
    subject: "社會", nodes: ["社會-1012"], count: 3, level_range: [1, 2],
    hunt: null, requires: ["Q4_T01_3"], reward: { exp: 0, gold: 30, item: "herb", light: null },
    dialog_start: "D_Q4_SIDE_1A", dialog_end: "D_Q4_SIDE_1B"
  },
  // 支線 2：外國旅客問路（新北投站站務員；英語只出翰林版 Here We Go 3 Unit 1）
  Q4_SIDE_2: {
    title: "外國旅客問路", giver: "mrt_staff2", map: "T02", kind: "help",
    goal: "新北投站前的站務員請你幫外國旅客問路：答對 3 題英語。",
    log_next: "主線：到北投溫泉博物館找志工阿伯。",
    subject: "英語", nodes: ["英語-1010"], count: 3, level_range: [1, 2],
    hunt: null, requires: ["Q4_T01_3"], reward: { exp: 0, gold: 30, item: null, light: null },
    dialog_start: "D_Q4_SIDE_2A", dialog_end: "D_Q4_SIDE_2B"
  },

  // ═════════════════════ T03 地熱谷步道 ═════════════════════
  // 7. 步道安全守則（管理員阿伯，台語）：完成才打開觀景台柵門；接著播領角鴞知識卡
  Q4_T03_1: {
    title: "步道安全守則", giver: "ranger", map: "T03", kind: "help",
    goal: "在地熱谷入口廣場找管理員阿伯，聽步道安全守則：答對 3 題自然（天空）。完成後觀景台的柵門才會打開。",
    log_next: "觀景台的柵門開了！往北走上觀景台，看看那個冒煙的大茶壺。",
    subject: "自然", nodes: ["自然-1011", "自然-1012"], count: 3, level_range: [1, 2],
    hunt: null, requires: ["Q4_T02_3"], reward: { exp: 0, gold: 40, item: null, light: null },
    dialog_start: "D_Q4_T03_1A", dialog_end: "D_Q4_T03_1B", after: { dialog: "D_CARD_OWL" }
  },
  // 8. 頭目：發條蒸氣壺嘟嘟號（步道安全守則完成後自動接下；戰前顯示會考的單元 C13）
  Q4_T03_B: {
    title: "發條蒸氣壺嘟嘟號", giver: "ranger", map: "T03", kind: "boss", auto_accept: true,
    goal: "走上北邊的觀景台，答對題目讓發條蒸氣壺嘟嘟號停下來，拿回北投的印章。",
    log_next: "拿回北投印章了！搭捷運回圓山（T02 新北投站的傳送光圈），把印章交給博覽會的陳主任。",
    subject: "混合", subjects: ["國語", "數學", "自然", "社會", "英語"], count: null, level_range: [1, 3],
    boss: "dudu", boss_map: "T03",
    hunt: null, requires: ["Q4_T03_1"], reward: { exp: 0, gold: 60, item: null, light: null }
  },

  // ═════════════════════ 回到 T01 ═════════════════════
  // 9. 蓋下第一顆印章（0 題，只對話）：蓋章 → 海圖過場預告（系統下一批做）→ 片尾
  Q4_T01_4: {
    title: "蓋下第一顆印章", giver: "director", map: "T01", kind: "talk",
    goal: "把北投的印章交給博覽會印章展示櫃前的陳主任，蓋在集章冊的第一頁。",
    log_next: "第一段冒險到這裡！可以繼續練習五科、找方爺爺學新的一課。",
    subject: "社會", nodes: [], count: null, level_range: [1, 1],
    hunt: null, requires: ["Q4_T03_B"], reward: { exp: 0, gold: 50, item: null, light: null, title: "北投小偵探", stamp: "beitou" },
    dialog_start: "D_Q4_T01_4A", pre_complete: { chart: "SR_PREVIEW_KEELUNG_NANGAN", dialog: "D_CHART_PREVIEW_B" }, dialog_end: "D_Q4_T01_4B", ending: true
  }
};
