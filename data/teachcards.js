/*
 * 勇者大冒險II — 教學卡與賢者教學（GDD 3.3、7.3 C5；老闆裁示第 10 條）
 *
 * ── 教學卡 TEACH_CARDS（每個節點一張，id 對到 curriculum.js 的 teach_card）──
 *   題目畫面的「看教學卡」按鈕打開：一個例子＋一句重點；看卡時暫停計時、不算答錯、不扣錢。
 *   欄位：node（節點 id）、title（卡片標題）、example（一個例子）、point（一句重點）、
 *         school_note（選填：學校大約什麼時候教，只當參考小字）、status（"draft"＝暫定文字，老師寫好後改 "ready"）。
 *   目前全部是暫定文字（status:"draft"），內容由各科老師補；validate_questions.js 會把 draft 列成提醒。
 *
 * ── 賢者教學 SAGE_LESSONS（老闆裁示第 10 條：超綱內容簡化後由賢者先教、再出題）──
 *   第三批（2026-10-19）：賢者是北投圖書館的「方爺爺」（maps.js T02 npc id "sage"，劇本 dialogs_taipei.js）。
 *   題目標 beyond_curriculum:true，並用 beyond_topic 指到這裡的課程 id（tools/qbank/merge_g4_drafts.js 依 concept 補上）。
 *   流程：和方爺爺說話 → 開場台詞 → 教學卡 → 1 題示範（按「看方爺爺怎麼想」）→ 小測驗 test_n 題（每題第一次就答對才算）→
 *         全對＝學會（state.sage.learned），之後這個主題的超綱題才進出題池（Curriculum.eligible）；沒全對＝retry 台詞，下次再來。
 *   欄位：title、order（課次）、sage（教這一課的 NPC id）、node（開放這一課的節點：走到最遠的地圖已開放這個節點才教）、
 *         nodes（這一課的題目會出現在哪些節點）、dialogs（a 開場、b 示範後、pass 學會、retry 沒過；沒寫用通用台詞 D_SAGE_LESSON_*）、
 *         card（title／example／point）、demo（示範題：stem、options、answer、explanation；只示範、不算分）、test_n、status。
 *   第 1、2 課照劇本（八方位、地圖四好幫手）；其餘各課的教學卡內容整理自題目的 teach 欄位（自然、社會）與
 *   scene／beyond_note（數學），示範題是另外寫的（不和小測驗的題目重複），status:"draft" 等老師審。
 */
window.TEACH_CARDS = {
  TC_MA_1011: { node: "數學-1011", title: "1-1 十萬以內的數", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", school_note: "學校大約在四上第 1–2 週教。", status: "draft" },
  TC_MA_1012: { node: "數學-1012", title: "1-2 一億以內的數", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", school_note: "學校大約在四上第 1–2 週教。", status: "draft" },
  TC_MA_1013: { node: "數學-1013", title: "1-3 大數的大小比較與加減", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", school_note: "學校大約在四上第 1–2 週教。", status: "draft" },
  TC_SO_1011: { node: "社會-1011", title: "1-1 閱讀生活中的地圖", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_SO_1012: { node: "社會-1012", title: "1-2 善用地圖好生活", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_SC_1011: { node: "自然-1011", title: "1-1 一天的天空", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_SC_1012: { node: "自然-1012", title: "1-2 月亮的位置", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_CH_1011: { node: "國語-1011", title: "第 1 課〈美麗島〉", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_CH_1012: { node: "國語-1012", title: "第 2 課〈請到我的家鄉來〉", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_CH_1013: { node: "國語-1013", title: "第 3 課〈鏡頭下的家鄉〉", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" },
  TC_EN_1010: { node: "英語-1010", title: "Unit 1 How's the Weather?", example: "（暫定）例子之後由老師補上。", point: "（暫定）重點之後由老師補上。", status: "draft" }
};

window.SAGE_LESSONS = {
  // ── 劇本第 1 課（dialogs_taipei.js D_SAGE_LESSON1_*）：八方位（四方位＋兩個方向的中間）──
  SAGE_SO_8DIR: {
    title: "第 1 課　八方位", order: 1, sage: "sage", node: "社會-1011", nodes: ["社會-1011", "社會-1012"], status: "draft", test_n: 2,
    dialogs: { a: "D_SAGE_LESSON1_A", b: "D_SAGE_LESSON1_B", pass: "D_SAGE_LESSON1_PASS", retry: "D_SAGE_LESSON1_RETRY" },
    card: {
      title: "八方位（方爺爺的第 1 課）",
      example: "地圖上方是北方時：上北、下南、左西、右東。兩個方向的中間，把名字合起來：東和北的中間叫東北，西和南的中間叫西南。",
      point: "先找北，再看夾在哪兩個方向中間。一共八個方位：北、東北、東、東南、南、西南、西、西北。"
    },
    demo: {
      stem: "地圖上方是北方。北和西的中間是哪個方位？",
      options: ["東北", "西北", "東南", "西南"],
      answer: 1,
      explanation: "先找北，北和西的中間，把兩個名字合起來，叫做「西北」。"
    }
  },
  // ── 劇本第 2 課（D_SAGE_LESSON2_*）：地圖的四個好幫手（距離只用公分、公尺，GDD 3.3 跨科先後）──
  SAGE_SO_MAP4: {
    title: "第 2 課　地圖的四個好幫手", order: 2, sage: "sage", node: "社會-1011", nodes: ["社會-1011", "社會-1012"], status: "draft", test_n: 2,
    dialogs: { a: "D_SAGE_LESSON2_A", b: "D_SAGE_LESSON2_B", pass: "D_SAGE_LESSON2_PASS", retry: "D_SAGE_LESSON2_RETRY" },
    card: {
      title: "地圖的四個好幫手（方爺爺的第 2 課）",
      example: "圖名寫在最上方，告訴你這是哪裡的地圖；方向標的箭頭指著北方；圖例說明每個符號代表什麼；比例尺告訴你地圖比真實縮小了多少。",
      point: "先問自己：題目要找名字、方向、符號，還是距離？再去看對應的好幫手。"
    },
    demo: {
      stem: "想知道一張地圖畫的是哪裡，要先看哪一個好幫手？",
      options: ["圖名", "方向標", "圖例", "比例尺"],
      answer: 0,
      explanation: "圖名是地圖的名字，告訴我們這張地圖畫的是哪裡。"
    }
  },
  // ── 自然：面向方位分左右手（SC-4A-01-010、011、112 的 teach；社會課查不到有教）──
  SAGE_SC_FACE: {
    title: "面向方位，分左右手", order: 3, sage: "sage", node: "自然-1011", nodes: ["自然-1011", "自然-1012"], status: "draft", test_n: 2,
    card: {
      title: "面向方位，分左右手",
      example: "面向東方站好：前面是東，背後是西，左手邊是北，右手邊是南。口訣是「前東後西，左北右南」。",
      point: "先想自己面向哪一邊，再找背後和左右手。太陽從東方升起、往西方落下。"
    },
    demo: {
      stem: "面向北方站好，背後是哪一個方位？",
      options: ["東方", "西方", "南方", "北方"],
      answer: 2,
      explanation: "面向北方時，背後是南方，右手邊是東方，左手邊是西方。"
    }
  },
  // ── 自然：天空的小祕密（SC-4A-01-901～905 的 teach；第三、四學習階段的內容，簡化說法）──
  SAGE_SC_SKY: {
    title: "天空的小祕密", order: 4, sage: "sage", node: "自然-1011", nodes: ["自然-1011", "自然-1012"], status: "draft", test_n: 2,
    card: {
      title: "天空的小祕密",
      example: "太陽也是一顆星星，自己會發出光和熱。白天星星還在天上，只是天空太亮看不到。月亮自己不會發光，是太陽光照到月亮再反射過來。",
      point: "地球像陀螺一樣自己在轉，所以天體看起來東升西落（簡化說法）；太陽升起的位置會隨季節慢慢改變。"
    },
    demo: {
      stem: "太陽為什麼看起來比夜空的星星又大又亮？",
      options: ["太陽比所有星星都大", "太陽離我們最近", "太陽是一盞大燈", "星星白天會熄滅"],
      answer: 1,
      explanation: "太陽也是一顆星星，因為離我們最近，所以看起來特別大、特別亮。"
    }
  },
  // ── 數學：1 億有多大（MA-4A-01-901、902；N-4-1 位值單位只列到千萬）──
  SAGE_MA_YI: {
    title: "1 億有多大", order: 5, sage: "sage", node: "數學-1012", nodes: ["數學-1012"], status: "draft", test_n: 2,
    card: {
      title: "1 億有多大",
      example: "10 個千萬＝1 億。99999999 再多 1，就是 1 億，寫成 100000000。",
      point: "1 億是 1 後面接 8 個 0，一共 9 位數；最左邊的 1 在億位。"
    },
    demo: {
      stem: "1 億是幾個千萬？",
      options: ["1 個", "10 個", "100 個", "1000 個"],
      answer: 1,
      explanation: "10 個千萬合起來是 1 億。"
    }
  },
  // ── 數學：取概數（MA-4A-01-903、904；課綱 N-4-4，不在本單元）──
  SAGE_MA_ROUND: {
    title: "取概數", order: 6, sage: "sage", node: "數學-1013", nodes: ["數學-1013"], status: "draft", test_n: 2,
    card: {
      title: "取概數：四捨五入、無條件進入",
      example: "取到千位，就看百位：4280 的百位是 2，捨去，約是 4000；4720 的百位是 7，進 1，約是 5000。錢不夠的時候要多拿一疊，這叫無條件進入。",
      point: "四捨五入：看要取的那一位的下一位，0～4 捨去，5～9 進 1。"
    },
    demo: {
      stem: "4280 用四捨五入法取到千位，大約是多少？",
      options: ["4000", "4300", "5000", "4200"],
      answer: 0,
      explanation: "看百位 2，0～4 捨去，所以 4280 約是 4000。"
    }
  }
};