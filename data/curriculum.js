/*
 * 勇者大冒險II — 課程表（GDD 3.1、3.2、3.4；7.3 C1、C2）
 *
 * 題目跟著地圖累加（53 號老闆裁示）：某張地圖可出的節點＝route 上「到這張地圖為止」所有地圖 add 的聯集。
 *   T01：各科 1-1（數學、社會、自然、國語）
 *   T02：再加 1-2（數學、社會、自然、國語）與英語第 1 單元
 *   T03：再加數學 1-3、國語第 3 課
 * 不在 route 上的地圖（海上測試圖、之後的室內）用 inherit 指定照哪張地圖出題；沒寫的地圖一題都不出（不會退回全部題目）。
 *
 * 節點 id＝「科目-序號」，序號＝學期×1000＋單元×10＋課（上學期＝1；英語只到單元，課碼 0）。
 * 題庫的題目用 subject＋node（數字序號，例如 1011）對到這裡的節點；程式只讀 node，不從題目 id 解析單元。
 * label 給頭目戰前的「會考清單」（C13）、教學卡標題用；teach_card 對到 data/teachcards.js。
 * school_week 只給教學卡顯示「學校大約第幾週教」的小字參考（53 號：不等學校進度）。
 *
 * mix（GDD 3.3 配比，數字是推論，上線後校正）：
 *   當前＝這張地圖新開放的節點；近期＝前一張地圖開放的；更早＝再之前的。
 *   某節點剛開放（還沒打滿 2 場、也還沒答滿 8 題）：當前 80%、近期 20%；之後：當前 60%、近期 20%、更早 20%。
 *   以「這一科最近 20 題」滾動計算。某一池是空的，名額依序讓給：近期 → 當前 → 更早（yield_order）。
 * teach（GDD 3.3 超前學的保護）：每個節點第一次出題由阿咕陪看（台詞暫定）、自動打開第 1 層提示；看教學卡時暫停計時。
 */
window.CURRICULUM = {
  grade: 4,
  order: "翰林",   // 53 號：單元順序固定一套，不讓家長選
  nodes: {
    "數學-1011": { subject: "數學", term: "上", unit: 1, lesson: 1, seq: 1011, label: "1-1 十萬以內的數", codes: ["N-4-1"], teach_card: "TC_MA_1011", school_week: [1, 2] },
    "數學-1012": { subject: "數學", term: "上", unit: 1, lesson: 2, seq: 1012, label: "1-2 一億以內的數", codes: ["N-4-1"], teach_card: "TC_MA_1012", school_week: [1, 2] },
    "數學-1013": { subject: "數學", term: "上", unit: 1, lesson: 3, seq: 1013, label: "1-3 大數的大小比較與加減", codes: ["N-4-1"], teach_card: "TC_MA_1013", school_week: [1, 2] },
    "社會-1011": { subject: "社會", term: "上", unit: 1, lesson: 1, seq: 1011, label: "1-1 閱讀生活中的地圖", codes: [], teach_card: "TC_SO_1011" },
    "社會-1012": { subject: "社會", term: "上", unit: 1, lesson: 2, seq: 1012, label: "1-2 善用地圖好生活", codes: [], teach_card: "TC_SO_1012" },
    "自然-1011": { subject: "自然", term: "上", unit: 1, lesson: 1, seq: 1011, label: "1-1 一天的天空", codes: [], teach_card: "TC_SC_1011" },
    "自然-1012": { subject: "自然", term: "上", unit: 1, lesson: 2, seq: 1012, label: "1-2 月亮的位置", codes: [], teach_card: "TC_SC_1012" },
    "國語-1011": { subject: "國語", term: "上", unit: 1, lesson: 1, seq: 1011, label: "第 1 課〈美麗島〉", codes: [], teach_card: "TC_CH_1011" },
    "國語-1012": { subject: "國語", term: "上", unit: 1, lesson: 2, seq: 1012, label: "第 2 課〈請到我的家鄉來〉", codes: [], teach_card: "TC_CH_1012" },
    "國語-1013": { subject: "國語", term: "上", unit: 1, lesson: 3, seq: 1013, label: "第 3 課〈鏡頭下的家鄉〉", codes: [], teach_card: "TC_CH_1013" },
    "英語-1010": { subject: "英語", term: "上", unit: 1, lesson: 0, seq: 1010, label: "Unit 1 How's the Weather?", codes: [], teach_card: "TC_EN_1010" }
  },
  // 路線：地圖順序
  route: ["T01", "T02", "T03"],
  maps: {
    T01: { add: ["數學-1011", "社會-1011", "自然-1011", "國語-1011"] },
    T02: { add: ["數學-1012", "社會-1012", "自然-1012", "國語-1012", "英語-1010"] },
    T03: { add: ["數學-1013", "國語-1013"] }
  },
  inherit: { S_TEST: "T03" },
  // 第三批（老闆裁示 1：英語兩個版本都收進題庫）：遊戲預設只出翰林版（單元順序固定翰林）；
  // 題目標 alt_publisher:true 的（何嘉仁 Super Fun 3）在 alt_enabled 改成 true 之前一題都不出（Curriculum.eligible）
  publishers: {
    "英語": { use: "翰林", alt: ["何嘉仁"], alt_enabled: false }
  },
  mix: {
    intro: { cur: 0.8, recent: 0.2, early: 0, battles: 2, questions: 8 },
    normal: { cur: 0.6, recent: 0.2, early: 0.2 },
    window: 20,
    yield_order: ["recent", "cur", "early"]
  },
  teach: {
    companion_first_q: true,
    companion_line: "第一題我陪你看：先找題目在問什麼。",   // 沒有對話資料時的備援（GDD 2.4 台詞 17）
    // 第三批：阿咕陪看、教學卡引導的台詞接劇本（data/dialogs.js；dialogs_taipei.js）
    companion_dialog: "D_AGU_FIRST_Q",             // 第 1 句 → 科目小提醒 → 其餘句子
    companion_tips: { "數學": "D_AGU_TIP_MATH", "社會": "D_AGU_TIP_SOCIAL", "自然": "D_AGU_TIP_SCIENCE", "國語": "D_AGU_TIP_CHINESE", "英語": "D_AGU_TIP_ENGLISH" },
    companion_right: "D_AGU_FIRST_Q_RIGHT", companion_wrong: "D_AGU_FIRST_Q_WRONG",
    card_button_dialog: "D_TEACH_CARD_BTN",        // 第一次看到「看教學卡」按鈕時（每份存檔一次）
    card_open_dialog: "D_TEACH_CARD", card_done_dialog: "D_TEACH_CARD_DONE",
    card_pauses_timer: true
  }
};
