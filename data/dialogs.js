/*
 * 勇者大冒險II — 對話（由 tools/build_dialogs.js 產生，請勿手動修改；要改台詞請改劇本 dialogs_taipei.js 再重新產生）
 * 第三批（2026-10-19）：換成劇本草稿（成品匣 四年級版規劃/劇本草稿/dialogs_taipei.js，含台語欄位、角色表），取代第一批的暫定對白。
 * 台語語音檔還沒做：有 taigi 的句子先顯示台語漢字、台羅與華語字幕（systems/dialogtext.js），朗讀時播提示音再念華語。
 * 劇本原文照抄在下面；檔尾是遊戲讀的 window.SPEAKERS、window.DIALOGS。
 */

// ──────────────── 劇本原文（dialogs_taipei.js）────────────────
/*
 * 勇者大冒險II（怪盜與家鄉的印章）— 四年級版 台北切片對白草稿
 * 撰寫：遊戲劇情設計師　日期：2026-10-19（網路資料查詢日期一律 2026-10-19）
 * 依據：55_GDD_垂直切片_台北.md 第 2 節（台詞大綱 1–63、系統對話）＋第 8 節後老闆裁示；R6 方案二。
 * 角色表、委託表、來源清單：同資料夾 README.md。檢查程式：check_dialogs.py。
 *
 * 規則：
 * - 每句 30 字以內（{name} 以 8 字計，標點也算）；四年級讀得懂。
 * - 只用 {name} 或「小小導覽員」稱呼主角，不寫「她／他」指主角；男女主角台詞完全相同。
 * - 保護級：不寫死亡、血腥；怪物打倒＝發條轉完、逃走、退回。怪盜一律說「借」，留借條。
 * - NPC 和善；野怪兇狠（只在描述上兇，不恐怖）。怪盜夜光鷗是喜劇角色。
 * - 真實資料只用 README 來源清單查證過的；故事中的博覽會、人物為虛構。
 * - 不用「北投＝女巫」的說法。原住民族內容由族人角色（宇翔）用第一人稱介紹，寫現代生活。
 * - 答錯、累倒不說「你錯了」；稱讚方法，不說「好聰明」。
 *
 * 台語：
 * - text 一律放華語。要翻成台語的句子標 taigi_needed: true，並有 taigi: { hanji, tailo, huayu }（格式同三年級版 dialogs.js）。
 * - 台語組 2026-10-19 補上 39 句：hanji 用教育部《臺灣台語常用詞辭典》推薦用字，tailo 標本調、不標連讀變調；
 *   依辭典開放資料比對，sutian 網址待網站恢復後補上（查證表：台語查證表_台北.md）。
 * - 講台語的角色：志工阿伯 volunteer、公園阿公 grandpa（見 README 待確認 1）、小攤阿伯 stall、
 *   管理員阿伯 ranger；賢者方爺爺 sage 只有打招呼、閒聊句講台語，教學句講華語（讓聽不懂台語的孩子也學得會）。
 *
 * who：見 window.SPEAKERS_G4_TAIPEI。emotion 只用三年級版的 6 種：平靜、開心、擔心、驚訝、生氣、神祕。
 * 標「（知識卡）」的句子不算分，不進戰鬥。
 */
window.SPEAKERS_G4_TAIPEI = {
  hero: "{name}", agu: "阿咕", narrator: "",
  classmate: "阿哲", desk: "小雯姊姊", director: "陳主任", shop: "紀念品店店員", inn: "休息站阿姨",
  mrt_staff: "站務員", traveler: "外國旅客",
  volunteer: "志工阿伯", guide: "宇翔哥哥", stall: "小攤阿伯", grandpa: "公園阿公", sage: "方爺爺",
  ranger: "管理員阿伯", kaito: "怪盜夜光鷗", dudu: "嘟嘟號"
};

window.DIALOGS_G4_TAIPEI = {

  // ═════════════ 系統對話 ═════════════
  D_INTRO: [
    { who: "narrator", emotion: "平靜", text: "今年，全臺家鄉博覽會要在台北舉行。" },
    { who: "narrator", emotion: "開心", text: "每個地方都刻了一顆家鄉印章。" },
    { who: "narrator", emotion: "開心", text: "蓋滿集章冊，臺灣大地圖就會拼起來。" },
    { who: "narrator", emotion: "神祕", text: "可是，就在開幕前一天的早上……" }
  ],
  D_FAINT: [
    { who: "agu", emotion: "擔心", text: "線索還沒找齊，回休息站整理偵探筆記吧！" },
    { who: "agu", emotion: "開心", text: "金幣和道具都還在，休息好再出發！" }
  ],
  D_INN_REST: [
    { who: "narrator", emotion: "平靜", text: "休息好了，體力都回來了！" }
  ],
  D_CHEST_LOCKED: [
    { who: "agu", emotion: "平靜", text: "寶箱上有數字鎖，答對才打得開！" }
  ],
  D_CHEST_DONE: [
    { who: "agu", emotion: "平靜", text: "這個寶箱已經打開過了。" }
  ],
  D_SHIP_TIME: [
    { who: "agu", emotion: "平靜", text: "今天的時間快用完了，船明天再開吧！" }
  ],
  D_CHART_REPLAY: [
    { who: "agu", emotion: "開心", text: "咕！再看一次海圖預告吧！" }
  ],

  // ═════════════ 教學卡引導 ═════════════
  D_TEACH_CARD: [
    { who: "agu", emotion: "平靜", text: "這個單元先看一張教學卡，再一起試試看！" }
  ],
  // 第一次出現「看教學卡」按鈕時播一次
  D_TEACH_CARD_BTN: [
    { who: "agu", emotion: "平靜", text: "看不懂的時候，按「看教學卡」就好。" },
    { who: "agu", emotion: "平靜", text: "看卡的時候，時間會停下來喔。" },
    { who: "agu", emotion: "開心", text: "看完回來還是同一題，不算答錯！" }
  ],
  D_TEACH_CARD_DONE: [
    { who: "agu", emotion: "開心", text: "看完了！用剛剛學到的方法試試看。" }
  ],

  // ═════════════ 阿咕陪看（每個節點第一次出題，C4） ═════════════
  D_AGU_FIRST_Q: [
    { who: "agu", emotion: "平靜", text: "第一題我陪你看：先找題目在問什麼。" },
    { who: "agu", emotion: "開心", text: "第一個小提示，阿咕幫你打開了。" },
    { who: "agu", emotion: "平靜", text: "想好了再選，不用急！" }
  ],
  D_AGU_FIRST_Q_RIGHT: [
    { who: "agu", emotion: "開心", text: "答對了！你先看清楚題目，方法很好。" },
    { who: "agu", emotion: "開心", text: "集章冊裡，這個單元亮起一格了！" }
  ],
  D_AGU_FIRST_Q_WRONG: [
    { who: "agu", emotion: "平靜", text: "沒關係，線索還沒找齊。" },
    { who: "agu", emotion: "平靜", text: "看看正確答案和理由，下次就會了。" }
  ],
  // 陪看時依科目多說一句（接在 D_AGU_FIRST_Q 第 1 句後）
  D_AGU_TIP_MATH: [
    { who: "agu", emotion: "平靜", text: "數字很大的時候，先一位一位數清楚。" }
  ],
  D_AGU_TIP_SOCIAL: [
    { who: "agu", emotion: "平靜", text: "看地圖，先找方位和圖例。" }
  ],
  D_AGU_TIP_SCIENCE: [
    { who: "agu", emotion: "平靜", text: "想一想，太陽和月亮在天空的哪裡？" }
  ],
  D_AGU_TIP_CHINESE: [
    { who: "agu", emotion: "平靜", text: "先把句子念一遍，找出最重要的詞。" }
  ],
  D_AGU_TIP_ENGLISH: [
    { who: "agu", emotion: "平靜", text: "先找認識的英文字，再選答案。" }
  ],
  // 到新地圖、開放新節點時
  D_NODE_OPEN_T02: [
    { who: "agu", emotion: "開心", text: "到了新地方，題目也多了新單元喔！" },
    { who: "agu", emotion: "平靜", text: "第一次遇到的單元，阿咕會陪你看。" }
  ],
  D_NODE_OPEN_T03: [
    { who: "agu", emotion: "開心", text: "地熱谷的題目，又多了新單元！" },
    { who: "agu", emotion: "平靜", text: "看不懂就先看教學卡，慢慢來。" }
  ],

  // ═════════════ 集章冊 ═════════════
  D_STAMPBOOK_HINT: [
    { who: "agu", emotion: "平靜", text: "集章冊的第一頁，留給家鄉印章。" },
    { who: "agu", emotion: "開心", text: "每學會一個新單元，下面就亮一格！" }
  ],

  // ═════════════ 野怪第一次出現（阿咕提醒） ═════════════
  D_MON_FIRST_STRAP: [
    { who: "agu", emotion: "驚訝", text: "晃晃吊環兇巴巴地衝過來了！" },
    { who: "agu", emotion: "平靜", text: "別怕，答對題目就能把它打退！" }
  ],
  D_MON_FIRST_COMPASS: [
    { who: "agu", emotion: "驚訝", text: "轉轉指北針轉得好兇，別被轉暈了！" }
  ],
  D_MON_FIRST_BOOKWORM: [
    { who: "agu", emotion: "驚訝", text: "書籤毛毛蟲張開大嘴撲過來了！" }
  ],
  D_MON_FIRST_SPARROW: [
    { who: "agu", emotion: "驚訝", text: "字母麻雀在搶字母，兇得不得了！" }
  ],
  D_MON_FIRST_STEAM: [
    { who: "agu", emotion: "驚訝", text: "噗噗蒸氣團噴著熱氣衝過來了！" }
  ],

  // ═════════════ T01 博覽會會場 ═════════════
  // Q4_TUT_1 小小導覽員報到：出生後自動播
  D_Q4_TUT_1A: [
    { who: "classmate", emotion: "開心", text: "{name}，快來！我們班的展板放好了！" },
    { who: "hero", emotion: "開心", text: "「我的家鄉」展板，終於完成了！" },
    { who: "classmate", emotion: "開心", text: "你被選上小小導覽員，快去服務台報到！" },
    { who: "classmate", emotion: "平靜", text: "服務台在展板的北邊，就是畫面上面。" }
  ],
  // Q4_TUT_1：和小雯姊姊說話（教 8 方向、斜著說話），出 2 題
  D_Q4_TUT_1_DESK: [
    { who: "desk", emotion: "開心", text: "你好！你就是小小導覽員{name}吧？" },
    { who: "desk", emotion: "平靜", text: "斜斜走過來也可以，對著我按 A 就能說話。" },
    { who: "desk", emotion: "平靜", text: "這是集章冊。地圖上方是北邊，記住喔。" },
    { who: "desk", emotion: "開心", text: "考你兩題看地圖的小問題，準備好了嗎？" }
  ],
  D_Q4_TUT_1B: [
    { who: "desk", emotion: "開心", text: "答得好！你會先看圖例再找答案，很細心。" },
    { who: "desk", emotion: "平靜", text: "打開集章冊，能看到每個單元學到哪裡。" },
    { who: "desk", emotion: "開心", text: "這 20 枚金幣，是導覽員的零用錢。" },
    { who: "desk", emotion: "擔心", text: "咦？陳主任那邊，好像出事了……" }
  ],
  // Q4_TUT_2 印章不見了！
  D_Q4_TUT_2A: [
    { who: "director", emotion: "驚訝", text: "糟了！印章展示櫃是空的！" },
    { who: "director", emotion: "擔心", text: "裡面只剩一張會發藍光的卡片……" },
    { who: "hero", emotion: "驚訝", text: "卡片上有字！我來念念看。" },
    { who: "narrator", emotion: "神祕", text: "「想要印章，就照著謎題來找我吧！」" },
    { who: "narrator", emotion: "神祕", text: "「印章是借的，一定會還。——怪盜夜光鷗」" },
    { who: "narrator", emotion: "神祕", text: "「附註：我的字很漂亮吧？」" },
    { who: "hero", emotion: "驚訝", text: "怪盜？還在卡片上誇自己的字……" },
    { who: "agu", emotion: "開心", text: "咕！我是博覽會吉祥物，偵探阿咕！" },
    { who: "agu", emotion: "開心", text: "{name}，我們一起把印章找回來吧！" },
    { who: "director", emotion: "擔心", text: "沒有印章，博覽會就不能開幕……拜託了！" },
    { who: "agu", emotion: "平靜", text: "練習草地上有晃晃吊環在亂晃，先去看看！" },
    { who: "agu", emotion: "平靜", text: "它們身上的小發條，可能是線索。" },
    { who: "agu", emotion: "平靜", text: "打倒怪物，才拿得到經驗值和金幣喔。" }
  ],
  D_Q4_TUT_2B: [
    { who: "agu", emotion: "開心", text: "兩個小發條都到手了！咕咕！" },
    { who: "hero", emotion: "平靜", text: "發條上刻著一隻海鷗……和卡片上的一樣。" },
    { who: "director", emotion: "開心", text: "你們真可靠！藥草帶著，累了就用。" },
    { who: "director", emotion: "驚訝", text: "咦，展示櫃底下還有第二張卡片！" }
  ],
  // Q4_T01_3 第一張謎題卡：答 3 題後打開捷運路線圖謎題
  D_Q4_T01_3A: [
    { who: "agu", emotion: "驚訝", text: "卡片背面有謎題！一起念吧！" },
    { who: "narrator", emotion: "神祕", text: "「我在一個會冒白煙的地方。」" },
    { who: "narrator", emotion: "神祕", text: "「那裡的名字，是很久以前住在那裡的人說的話。」" },
    { who: "narrator", emotion: "神祕", text: "「附註：不是我家喔，我家很遠。」" },
    { who: "hero", emotion: "平靜", text: "會冒白煙的地方……會是哪裡呢？" },
    { who: "agu", emotion: "平靜", text: "解謎前先暖暖身！答 3 題看看。" }
  ],
  D_Q4_T01_3B: [
    { who: "agu", emotion: "開心", text: "暖身完成！看捷運路線圖，先找圖例在哪裡。" },
    { who: "desk", emotion: "平靜", text: "圖例告訴你，每個小符號代表什麼。" },
    { who: "agu", emotion: "平靜", text: "找找看，哪一站旁邊畫著冒煙的符號？" }
  ],
  // 捷運路線圖謎題（C8）：點對／點錯
  D_MRT_PUZZLE_RIGHT: [
    { who: "hero", emotion: "驚訝", text: "新北投站旁邊，畫著溫泉的符號！" },
    { who: "agu", emotion: "開心", text: "會冒白煙的地方，就是溫泉！咕！" },
    { who: "agu", emotion: "平靜", text: "從圓山往北坐 8 站到北投，再換車坐 1 站。" },
    { who: "desk", emotion: "開心", text: "這張引導卡送你，卡關時可以用。" },
    { who: "agu", emotion: "開心", text: "走吧！去西邊的捷運圓山站！" }
  ],
  D_MRT_PUZZLE_WRONG: [
    { who: "agu", emotion: "平靜", text: "這一站旁邊沒有溫泉符號，再找找看。" },
    { who: "agu", emotion: "平靜", text: "先看圖例：溫泉的符號長什麼樣子？" }
  ],
  D_CLASSMATE_IDLE: [
    { who: "classmate", emotion: "開心", text: "展板我來顧，你放心去找印章吧！" }
  ],
  D_CLASSMATE_IDLE_END: [
    { who: "classmate", emotion: "開心", text: "下一次冒險，也講給我聽好不好？" }
  ],
  D_DESK_IDLE: [
    { who: "desk", emotion: "平靜", text: "不知道去哪裡，就打開任務日誌看看。" }
  ],
  D_DIRECTOR_IDLE: [
    { who: "director", emotion: "擔心", text: "印章就拜託你們了……我先去擦展示櫃。" }
  ],
  D_DIRECTOR_IDLE_END: [
    { who: "director", emotion: "開心", text: "博覽會能開幕，都是大家的功勞！" }
  ],
  D_SHOP_IDLE: [
    { who: "shop", emotion: "開心", text: "歡迎光臨！木劍、皮衣、藥草都有喔。" }
  ],
  D_INN_IDLE: [
    { who: "inn", emotion: "開心", text: "累了嗎？在這裡休息，不用錢喔。" }
  ],

  // ═════════════ 捷運 ═════════════
  D_MRT: [
    { who: "mrt_staff", emotion: "平靜", text: "要搭到哪一站呢？" }
  ],
  D_MRT_LOCKED: [
    { who: "agu", emotion: "平靜", text: "謎題卡還沒解開，先不要出發喔。" }
  ],
  // 第一次從圓山站搭車
  D_MRT_FIRST: [
    { who: "mrt_staff", emotion: "平靜", text: "要去新北投嗎？在北投站換支線喔。" },
    { who: "mrt_staff", emotion: "平靜", text: "排隊候車，先下車、再上車。" },
    { who: "mrt_staff", emotion: "平靜", text: "過了黃線就不能吃東西，連喝水也不行。" },
    { who: "hero", emotion: "開心", text: "好！我會遵守規矩。" }
  ],
  // 搭乘動畫中（R14→R22→R22A）
  D_MRT_RIDE: [
    { who: "agu", emotion: "開心", text: "圓山、劍潭、士林……一站一站數喔！" },
    { who: "narrator", emotion: "平靜", text: "（知識卡）據說唭哩岸這個站名，和凱達格蘭族語有關。" },
    { who: "agu", emotion: "平靜", text: "北投站到了！換搭支線，再坐 1 站。" }
  ],
  D_MRT_ARRIVE_T02: [
    { who: "agu", emotion: "開心", text: "咕！新北投站到了！" }
  ],
  D_MRT_BACK: [
    { who: "mrt_staff", emotion: "平靜", text: "回圓山嗎？在北投站換回淡水信義線喔。" }
  ],
  D_MRT_ARRIVE_T01: [
    { who: "agu", emotion: "開心", text: "回到圓山了！博覽會就在附近。" }
  ],
  D_MRT_STAFF_IDLE: [
    { who: "mrt_staff", emotion: "平靜", text: "進站前，記得排隊喔。" }
  ],

  // ═════════════ T02 北投溫泉街 ═════════════
  D_T02_ARRIVE: [
    { who: "agu", emotion: "開心", text: "這裡是北投，在台北市最北邊！" },
    { who: "agu", emotion: "平靜", text: "北投公園裡有溫泉博物館，也有圖書館。" },
    { who: "agu", emotion: "平靜", text: "先去溫泉博物館，問問志工阿伯吧！" }
  ],
  // Q4_T02_1 公共浴場的故事（國語 1012，答 2 題）
  D_Q4_T02_1A: [
    { who: "volunteer", emotion: "開心", text: "歡迎！小朋友，來看古蹟喔？", taigi_needed: true,
      taigi: { hanji: "歡迎！囡仔，欲來看古蹟喔？", tailo: "Huan-gîng! Gín-á, beh lâi khuànn kóo-tsik--ooh?", huayu: "歡迎！小朋友，來看古蹟喔？" } },
    { who: "volunteer", emotion: "平靜", text: "這棟房子，以前是北投公共浴場。", taigi_needed: true,
      taigi: { hanji: "這間厝，以早是北投公共浴場。", tailo: "Tsit king tshù, í-tsá sī Pak-tâu kong-kiōng i̍k-tiûnn.", huayu: "這棟房子，以前是北投公共浴場。" } },
    { who: "volunteer", emotion: "平靜", text: "1913 年蓋好，曾是東亞最大的公共浴場。", taigi_needed: true,
      taigi: { hanji: "一九一三年起好，捌是東亞上大的公共浴場。", tailo: "It-kiú-it-sam nî khí hó, bat sī Tang-a siōng tuā ê kong-kiōng i̍k-tiûnn.", huayu: "1913 年蓋好，曾是東亞最大的公共浴場。" } },
    { who: "volunteer", emotion: "擔心", text: "後來沒人用，變得破破的。", taigi_needed: true,
      taigi: { hanji: "後來無人用，變甲真漚古。", tailo: "Āu--lâi bô lâng īng, piàn kah tsin àu-kóo.", huayu: "後來沒人用，變得破破的。" } },
    { who: "volunteer", emotion: "平靜", text: "1994 年，北投國小的師生發現了它。", taigi_needed: true,
      taigi: { hanji: "一九九四年，北投國小的老師佮學生發現伊。", tailo: "It-kiú-kiú-sù nî, Pak-tâu kok-sió ê lāu-su kah ha̍k-sing huat-hiān i.", huayu: "1994 年，北投國小的師生發現了它。" } },
    { who: "volunteer", emotion: "開心", text: "他們寫陳情書、找大家連署，請大家保存它。", taigi_needed: true,
      taigi: { hanji: "怹寫陳情書、揣逐家連署，請逐家共伊保存。", tailo: "In siá tîn-tsîng-su, tshuē ta̍k-ke liân-sú, tshiánn ta̍k-ke kā i pó-tsûn.", huayu: "他們寫陳情書、找大家連署，請大家保存它。" } },
    { who: "volunteer", emotion: "開心", text: "1998 年，它變成了溫泉博物館。", taigi_needed: true,
      taigi: { hanji: "一九九八年，伊變做溫泉博物館矣。", tailo: "It-kiú-kiú-pat nî, i piàn-tsò un-tsuânn phok-bu̍t-kuán--ah.", huayu: "1998 年，它變成了溫泉博物館。" } },
    { who: "hero", emotion: "驚訝", text: "是跟我們一樣大的小學生耶！" },
    { who: "volunteer", emotion: "平靜", text: "介紹板的字有點難，幫阿伯讀兩題好嗎？", taigi_needed: true,
      taigi: { hanji: "介紹牌仔的字有淡薄仔深，共阿伯讀兩題，好無？", tailo: "Kài-siāu pâi-á ê jī ū tām-po̍h-á tshim, kā a-peh tha̍k nn̄g tê, hó--bô?", huayu: "介紹板的字有點難，幫阿伯讀兩題好嗎？" } }
  ],
  D_Q4_T02_1B: [
    { who: "volunteer", emotion: "開心", text: "讀得真清楚！你會一句一句慢慢看。", taigi_needed: true,
      taigi: { hanji: "讀甲真清楚！你會一句一句慢慢仔看。", tailo: "Tha̍k kah tsin tshing-tshó! Lí ē tsi̍t kù tsi̍t kù bān-bān-á khuànn.", huayu: "讀得真清楚！你會一句一句慢慢看。" } },
    { who: "volunteer", emotion: "平靜", text: "名字的祕密，去附近的凱達格蘭文化館問。", taigi_needed: true,
      taigi: { hanji: "名的祕密，去附近的凱達格蘭文化館問。", tailo: "Miâ ê pì-bi̍t, khì hù-kīn ê Khái-ta̍t-kik-lân bûn-huà-kuán mn̄g.", huayu: "名字的祕密，去附近的凱達格蘭文化館問。" } },
    { who: "volunteer", emotion: "開心", text: "這 40 枚金幣，給你當點心錢。", taigi_needed: true,
      taigi: { hanji: "這四十个金幣，予你做點心錢。", tailo: "Tsit sì-tsa̍p ê kim-pè, hōo lí tsò tiám-sim-tsînn.", huayu: "這 40 枚金幣，給你當點心錢。" } }
  ],
  D_VOLUNTEER_IDLE: [
    { who: "volunteer", emotion: "開心", text: "有空再來，阿伯講更多故事給你聽。", taigi_needed: true,
      taigi: { hanji: "有閒才閣來，阿伯講閣較濟故事予你聽。", tailo: "Ū-îng tsiah koh lâi, a-peh kóng koh-khah tsē kòo-sū hōo lí thiann.", huayu: "有空再來，阿伯講更多故事給你聽。" } }
  ],
  // Q4_T02_2 北投名字的秘密（社會 1012，答 3 題）；宇翔是凱達格蘭族人，第一人稱介紹
  D_Q4_T02_2A: [
    { who: "guide", emotion: "開心", text: "你好！我是宇翔，週末在這裡當導覽員。" },
    { who: "guide", emotion: "平靜", text: "我平常在大學讀書，最喜歡拍老房子。" },
    { who: "guide", emotion: "平靜", text: "我們家是凱達格蘭族，祖先住在北投一帶。" },
    { who: "guide", emotion: "平靜", text: "「北投」這個名字，已經很老很老了。" },
    { who: "guide", emotion: "平靜", text: "那是我們祖先說的話，寫成 Patauw。" },
    { who: "guide", emotion: "平靜", text: "後來的人照發音寫成「八頭」，慢慢變成「北投」。" },
    { who: "hero", emotion: "驚訝", text: "謎題卡說的地方，就是這裡！" },
    { who: "guide", emotion: "開心", text: "這裡是原住民族的文化館，歡迎常來。" },
    { who: "guide", emotion: "平靜", text: "我用平板帶你看導覽地圖，考你三題。" }
  ],
  D_Q4_T02_2B: [
    { who: "guide", emotion: "開心", text: "你會先找方位再找地點，真會看地圖！" },
    { who: "guide", emotion: "擔心", text: "對了，剛剛有怪物撿走幾張發光的紙片。" },
    { who: "guide", emotion: "開心", text: "這 40 枚金幣給你，祝你找到印章！" }
  ],
  D_GUIDE_IDLE: [
    { who: "guide", emotion: "開心", text: "館裡常常換展覽，歡迎再來看看！" }
  ],
  // Q4_T02_3 謎題碎片（收 3 片）
  D_Q4_T02_3A: [
    { who: "agu", emotion: "擔心", text: "可是印章在哪裡？咕……" },
    { who: "agu", emotion: "驚訝", text: "謎題碎片被怪物撿走了！一共 3 片。" },
    { who: "agu", emotion: "平靜", text: "轉轉指北針和書籤毛毛蟲身上可能有。" }
  ],
  D_Q4_T02_3B: [
    { who: "agu", emotion: "開心", text: "3 片都找到了！拼拼看！" },
    { who: "narrator", emotion: "神祕", text: "「沿著溪往上走，找煙最多的地方。」" },
    { who: "narrator", emotion: "神祕", text: "「附註：這張卡我剪歪了，請原諒。」" },
    { who: "hero", emotion: "平靜", text: "沿著北投溪往上走……是地熱谷！" },
    { who: "agu", emotion: "開心", text: "咕！從北邊的出口出發吧！" }
  ],
  D_T03_LOCK: [
    { who: "agu", emotion: "平靜", text: "線索還不夠，先把謎題碎片找齊吧！" }
  ],
  D_STALL_IDLE: [
    { who: "stall", emotion: "開心", text: "溫泉街走累了，買株藥草吧！", taigi_needed: true,
      taigi: { hanji: "溫泉街行甲忝矣，買一株藥草啦！", tailo: "Un-tsuânn-ke kiânn kah thiám--ah, bé tsi̍t tu io̍h-tsháu--lah!", huayu: "溫泉街走累了，買株藥草吧！" } },
    { who: "stall", emotion: "開心", text: "飯糰也有，熱熱的喔。", taigi_needed: true,
      taigi: { hanji: "飯丸嘛有，燒燒的喔。", tailo: "Pn̄g-uân mā ū, sio-sio--ê--ooh.", huayu: "飯糰也有，熱熱的喔。" } }
  ],

  // ═════════════ T02 賢者方爺爺（北投圖書館；超綱內容先教再考） ═════════════
  D_SAGE_MEET: [
    { who: "sage", emotion: "平靜", text: "嗯——小朋友，在圖書館要輕聲細語喔。", taigi_needed: true,
      taigi: { hanji: "囡仔，佇圖書館愛輕聲細說喔。", tailo: "Gín-á, tī tôo-su-kuán ài khin-siann-sè-sueh--ooh.", huayu: "嗯——小朋友，在圖書館要輕聲細語喔。" } },
    { who: "hero", emotion: "驚訝", text: "對不起！請問您是……" },
    { who: "sage", emotion: "開心", text: "大家叫我方爺爺，以前是畫地圖的人。", taigi_needed: true,
      taigi: { hanji: "逐家攏叫我方阿公，以早是畫地圖的人。", tailo: "Ta̍k-ke lóng kiò guá Png a-kong, í-tsá sī uē tē-tôo ê lâng.", huayu: "大家叫我方爺爺，以前是畫地圖的人。" } },
    { who: "agu", emotion: "平靜", text: "咕！聽說方爺爺是北投的地圖賢者！" },
    { who: "sage", emotion: "開心", text: "賢者不敢當。想學看地圖，就來找我。", taigi_needed: true,
      taigi: { hanji: "賢者受袂起。想欲學看地圖，就來揣我。", tailo: "Hiân-tsiá siū-bē-khí. Siūnn-beh o̍h khuànn tē-tôo, tō lâi tshuē guá.", huayu: "賢者不敢當。想學看地圖，就來找我。" } }
  ],
  D_SAGE_LIBRARY: [
    { who: "sage", emotion: "平靜", text: "這座圖書館用木頭蓋，屋頂有太陽能板。", taigi_needed: true,
      taigi: { hanji: "這間圖書館用柴起的，厝頂有日頭發電的枋仔。", tailo: "Tsit king tôo-su-kuán īng tshâ khí--ê, tshù-tíng ū ji̍t-thâu huat-tiān ê pang-á.", huayu: "這座圖書館用木頭蓋，屋頂有太陽能板。" } },
    { who: "sage", emotion: "平靜", text: "還會收集雨水，拿來沖馬桶、澆花。", taigi_needed: true,
      taigi: { hanji: "閣會收集雨水，提來沖馬桶、沃花。", tailo: "Koh ē siu-tsi̍p hōo-tsuí, the̍h lâi tshiâng bé-tháng, ak-hue.", huayu: "還會收集雨水，拿來沖馬桶、澆花。" } },
    { who: "narrator", emotion: "平靜", text: "（知識卡）北投圖書館拿到綠建築最高等級的標章。" }
  ],
  D_SAGE_IDLE: [
    { who: "sage", emotion: "平靜", text: "嗯——讀書累了，就看看窗外的樹。", taigi_needed: true,
      taigi: { hanji: "讀冊讀甲忝矣，就看一下窗仔外的樹仔。", tailo: "Tha̍k-tsheh tha̍k kah thiám--ah, tō khuànn tsi̍t-ē thang-á guā ê tshiū-á.", huayu: "嗯——讀書累了，就看看窗外的樹。" } }
  ],
  // 第 1 課：八方位（beyond_curriculum）
  D_SAGE_LESSON1_A: [
    { who: "sage", emotion: "平靜", text: "嗯——今天教你一個課本沒細講的東西。" },
    { who: "sage", emotion: "平靜", text: "看地圖之前，先把方向弄清楚。" },
    { who: "sage", emotion: "平靜", text: "上北、下南、左西、右東，記得嗎？" },
    { who: "sage", emotion: "神祕", text: "那北和東的中間，叫做什麼呢？" },
    { who: "hero", emotion: "平靜", text: "嗯……北東？" },
    { who: "sage", emotion: "開心", text: "很接近！我們說「東北」，先說東西再說南北。" },
    { who: "sage", emotion: "平靜", text: "還有東南、西南、西北，加上四個方向……" },
    { who: "sage", emotion: "開心", text: "一共八個方向，叫做八方位。" },
    { who: "sage", emotion: "平靜", text: "我先示範一題，你看我怎麼想。" }
  ],
  D_SAGE_LESSON1_B: [
    { who: "sage", emotion: "平靜", text: "看懂了嗎？先找北，再看夾在哪兩個方向中間。" },
    { who: "sage", emotion: "開心", text: "換你試試看，答對兩題就算學會。" }
  ],
  D_SAGE_LESSON1_PASS: [
    { who: "sage", emotion: "開心", text: "很好！你先找北再判斷，方法對了。" },
    { who: "sage", emotion: "平靜", text: "以後的戰鬥裡，也會出現八方位的題目。" },
    { who: "sage", emotion: "開心", text: "學會了，就是你的。嗯——慢慢來。" }
  ],
  D_SAGE_LESSON1_RETRY: [
    { who: "sage", emotion: "平靜", text: "沒關係，再看一次教學卡，慢慢來。" },
    { who: "sage", emotion: "平靜", text: "記住：先找北，再看夾在哪兩個方向中間。" }
  ],
  // 第 2 課：地圖的四個好幫手（beyond_curriculum；距離只用公分、公尺）
  D_SAGE_LESSON2_A: [
    { who: "sage", emotion: "平靜", text: "嗯——再來認識「地圖的四個好幫手」。" },
    { who: "sage", emotion: "平靜", text: "第一是圖名，告訴你這是哪裡的地圖。" },
    { who: "sage", emotion: "平靜", text: "第二是方位，告訴你哪一邊是北。" },
    { who: "sage", emotion: "平靜", text: "第三是圖例，告訴你每個符號的意思。" },
    { who: "sage", emotion: "平靜", text: "第四是比例尺，告訴你真的距離有多長。" },
    { who: "sage", emotion: "平靜", text: "例如地圖上 1 公分，代表真的 100 公尺。" },
    { who: "sage", emotion: "平靜", text: "我先示範一題，你看我怎麼想。" }
  ],
  D_SAGE_LESSON2_B: [
    { who: "sage", emotion: "平靜", text: "看懂了嗎？先想想要用哪一個好幫手。" },
    { who: "sage", emotion: "開心", text: "換你試試看，答對兩題就算學會。" }
  ],
  D_SAGE_LESSON2_PASS: [
    { who: "sage", emotion: "開心", text: "很好！四個好幫手，你都認識了。" },
    { who: "sage", emotion: "平靜", text: "這些題目，以後也會在戰鬥裡出現。" },
    { who: "sage", emotion: "開心", text: "學會了，就是你的。下次再來聊。" }
  ],
  D_SAGE_LESSON2_RETRY: [
    { who: "sage", emotion: "平靜", text: "沒關係，再看一次教學卡，慢慢來。" },
    { who: "sage", emotion: "平靜", text: "先問自己：題目要找名字、方向、符號，還是距離？" }
  ],

  // ═════════════ T02 支線 ═════════════
  // Q4_SIDE_1 阿公的路線圖（社會 1012，答 3 題）
  D_Q4_SIDE_1A: [
    { who: "grandpa", emotion: "擔心", text: "哎喲，指北針一直轉，我的路線圖都亂掉了。", taigi_needed: true,
      taigi: { hanji: "哎喲喂，指北針一直踅，我的路線圖攏亂操操矣。", tailo: "Ai-iō-uê, tsí-pak-tsiam it-ti̍t se̍h, guá ê lōo-suànn-tôo lóng luān-tshau-tshau--ah.", huayu: "哎喲，指北針一直轉，我的路線圖都亂掉了。" } },
    { who: "grandpa", emotion: "擔心", text: "我要去公園另一頭，找不到路了。", taigi_needed: true,
      taigi: { hanji: "我欲去公園彼爿，揣無路矣。", tailo: "Guá beh khì kong-hn̂g hit pîng, tshuē-bô lōo--ah.", huayu: "我要去公園另一頭，找不到路了。" } },
    { who: "hero", emotion: "平靜", text: "我來幫忙！我會看方位和圖例。" },
    { who: "grandpa", emotion: "開心", text: "真好心。幫我看三題，好不好？", taigi_needed: true,
      taigi: { hanji: "真好心。共我看三題，好無？", tailo: "Tsin hó-sim. Kā guá khuànn sann tê, hó--bô?", huayu: "真好心。幫我看三題，好不好？" } },
    { who: "grandpa", emotion: "平靜", text: "看不懂，就問圖書館的方爺爺，他最會看地圖。", taigi_needed: true,
      taigi: { hanji: "看無，就去問圖書館的方阿公，伊上會曉看地圖。", tailo: "Khuànn-bô, tō khì mn̄g tôo-su-kuán ê Png a-kong, i siōng ē-hiáu khuànn tē-tôo.", huayu: "看不懂，就問圖書館的方爺爺，他最會看地圖。" } }
  ],
  D_Q4_SIDE_1B: [
    { who: "grandpa", emotion: "開心", text: "找到了！你先看方位再看圖例，真細心。", taigi_needed: true,
      taigi: { hanji: "揣著路矣！你先看方位才看圖例，真細膩。", tailo: "Tshuē-tio̍h lōo--ah! Lí sing khuànn hong-uī tsiah khuànn tôo-lē, tsin sè-jī.", huayu: "找到了！你先看方位再看圖例，真細心。" } },
    { who: "grandpa", emotion: "開心", text: "這株藥草帶著，走路累了用得到。", taigi_needed: true,
      taigi: { hanji: "這株藥草予你紮去，行路忝矣用會著。", tailo: "Tsit tu io̍h-tsháu hōo lí tsah--khì, kiânn-lōo thiám--ah īng ē tio̍h.", huayu: "這株藥草帶著，走路累了用得到。" } },
    { who: "grandpa", emotion: "擔心", text: "公園裡的指北針怪物，看到要小心喔。", taigi_needed: true,
      taigi: { hanji: "公園內的指北針怪物，看著愛細膩喔。", tailo: "Kong-hn̂g lāi ê tsí-pak-tsiam kuài-bu̍t, khuànn-tio̍h ài sè-jī--ooh.", huayu: "公園裡的指北針怪物，看到要小心喔。" } }
  ],
  D_GRANDPA_IDLE: [
    { who: "grandpa", emotion: "開心", text: "每天早上，我都來公園走一走。", taigi_needed: true,
      taigi: { hanji: "逐工透早，我攏來公園行行咧。", tailo: "Ta̍k-kang thàu-tsá, guá lóng lâi kong-hn̂g kiânn-kiânn--leh.", huayu: "每天早上，我都來公園走一走。" } }
  ],
  // Q4_SIDE_2 外國旅客問路（英語 1010，版本：先用翰林 Here We Go 3 Unit 1 天氣）
  D_Q4_SIDE_2A: [
    { who: "mrt_staff", emotion: "擔心", text: "這位外國旅客在問路，可以幫幫他嗎？" },
    { who: "traveler", emotion: "平靜", text: "Hello! Excuse me.（你好！不好意思。）" },
    { who: "traveler", emotion: "擔心", text: "Where is the park?（公園在哪裡？）" },
    { who: "hero", emotion: "平靜", text: "我試試看！用學過的英文幫忙。" },
    { who: "mrt_staff", emotion: "平靜", text: "他說的話，我整理成三題。加油！" }
  ],
  D_Q4_SIDE_2B: [
    { who: "traveler", emotion: "開心", text: "Thank you!（謝謝你！）" },
    { who: "traveler", emotion: "開心", text: "It's sunny today!（今天是晴天！）" },
    { who: "mrt_staff", emotion: "開心", text: "你聽得很仔細，幫了大忙！" },
    { who: "mrt_staff", emotion: "開心", text: "這 30 枚金幣，是旅客請我轉交的謝禮。" }
  ],
  D_TRAVELER_IDLE: [
    { who: "traveler", emotion: "開心", text: "Taipei is fun!（台北好好玩！）" }
  ],

  // ═════════════ T03 地熱谷步道 ═════════════
  D_T03_ARRIVE: [
    { who: "agu", emotion: "驚訝", text: "咕！好多白煙，這裡就是地熱谷！" },
    { who: "agu", emotion: "平靜", text: "聞到了嗎？有一點硫磺的味道。" },
    { who: "agu", emotion: "平靜", text: "走步道前，先跟管理員阿伯打招呼。" }
  ],
  // Q4_T03_1 步道安全守則（自然 1011／1012，答 3 題）
  D_Q4_T03_1A: [
    { who: "ranger", emotion: "開心", text: "你好！我是地熱谷的管理員。", taigi_needed: true,
      taigi: { hanji: "你好！我是地熱谷的管理員。", tailo: "Lí hó! Guá sī Tē-jia̍t-kok ê kuán-lí-uân.", huayu: "你好！我是地熱谷的管理員。" } },
    { who: "ranger", emotion: "擔心", text: "地熱谷的水很燙，只能在步道上看喔。", taigi_needed: true,
      taigi: { hanji: "地熱谷的水真燒，干焦會使佇步道頂看喔。", tailo: "Tē-jia̍t-kok ê tsuí tsin sio, kan-na ē-sái tī pōo-tō tíng khuànn--ooh.", huayu: "地熱谷的水很燙，只能在步道上看喔。" } },
    { who: "ranger", emotion: "擔心", text: "不要翻過欄杆，也不要把手伸進水裡。", taigi_needed: true,
      taigi: { hanji: "毋通迒過欄杆，嘛毋通共手伸入去水內。", tailo: "M̄-thang hānn kuè lân-kan, mā m̄-thang kā tshiú tshun ji̍p-khì tsuí lāi.", huayu: "不要翻過欄杆，也不要把手伸進水裡。" } },
    { who: "ranger", emotion: "平靜", text: "這裡的水是淡淡的綠色，還會冒白煙。", taigi_needed: true,
      taigi: { hanji: "遮的水淡薄仔青青，閣會衝白煙。", tailo: "Tsia ê tsuí tām-po̍h-á tshenn-tshenn, koh ē tshìng pe̍h-ian.", huayu: "這裡的水是淡淡的綠色，還會冒白煙。" } },
    { who: "ranger", emotion: "平靜", text: "從這裡流出去的水，就變成北投溪。", taigi_needed: true,
      taigi: { hanji: "對遮流出去的水，就變做北投溪。", tailo: "Uì tsia lâu tshut-khì ê tsuí, tō piàn-tsò Pak-tâu-khe.", huayu: "從這裡流出去的水，就變成北投溪。" } },
    { who: "ranger", emotion: "平靜", text: "管理員每天都看天空。考你三題天空的題目！", taigi_needed: true,
      taigi: { hanji: "管理員逐工攏看天頂。考你三題天頂的題目！", tailo: "Kuán-lí-uân ta̍k-kang lóng khuànn thinn-tíng. Khó lí sann tê thinn-tíng ê tê-bo̍k!", huayu: "管理員每天都看天空。考你三題天空的題目！" } }
  ],
  D_Q4_T03_1B: [
    { who: "ranger", emotion: "開心", text: "答得好！你一步一步觀察，很適合當管理員。", taigi_needed: true,
      taigi: { hanji: "回答甲真好！你一步一步觀察，真適合做管理員。", tailo: "Huê-tap kah tsin hó! Lí tsi̍t pōo tsi̍t pōo kuan-tshat, tsin sik-ha̍p tsò kuán-lí-uân.", huayu: "答得好！你一步一步觀察，很適合當管理員。" } },
    { who: "ranger", emotion: "平靜", text: "觀景台的柵門開了。上面好像有怪聲音……", taigi_needed: true,
      taigi: { hanji: "觀景台的柵門開矣。頂懸敢若有奇怪的聲……", tailo: "Kuan-kíng-tâi ê tshik-mn̂g khui--ah. Tíng-kuân kánn-ná ū kî-kuài ê siann......", huayu: "觀景台的柵門開了。上面好像有怪聲音……" } },
    { who: "ranger", emotion: "擔心", text: "累了就回來休息，不要勉強喔。", taigi_needed: true,
      taigi: { hanji: "忝矣就轉來歇睏，毋通勉強喔。", tailo: "Thiám--ah tō tńg-lâi hioh-khùn, m̄-thang bián-kióng--ooh.", huayu: "累了就回來休息，不要勉強喔。" } }
  ],
  D_T03_GATE_LOCK: [
    { who: "ranger", emotion: "平靜", text: "先聽完安全守則，才可以上觀景台喔。", taigi_needed: true,
      taigi: { hanji: "先聽安全守則，才會使去觀景台喔。", tailo: "Sing thiann an-tsuân siú-tsik, tsiah ē-sái khì kuan-kíng-tâi--ooh.", huayu: "先聽完安全守則，才可以上觀景台喔。" } }
  ],
  D_RANGER_IDLE: [
    { who: "ranger", emotion: "平靜", text: "白煙很好看，但是要站在步道上看喔。", taigi_needed: true,
      taigi: { hanji: "白煙真好看，毋過愛徛佇步道頂看喔。", tailo: "Pe̍h-ian tsin hó-khuànn, m̄-koh ài khiā tī pōo-tō tíng khuànn--ooh.", huayu: "白煙很好看，但是要站在步道上看喔。" } }
  ],
  // 知識卡（不算分）
  D_CARD_OWL: [
    { who: "agu", emotion: "平靜", text: "（知識卡）真的領角鴞是保育類，看到不要抓、不要餵。" },
    { who: "agu", emotion: "開心", text: "咕！我是吉祥物，不是真的貓頭鷹啦。" }
  ],
  D_CARD_JINSHAN: [
    { who: "narrator", emotion: "平靜", text: "（知識卡）翻過大屯山，就是新北市金山區。" }
  ],

  // ═════════════ 頭目：發條蒸氣壺嘟嘟號（Q4_T03_B） ═════════════
  // 戰前（monsters.js dialog_before）；考試單元清單由程式（C13）另外顯示
  D_BOSS_DUDU_A: [
    { who: "agu", emotion: "驚訝", text: "前面有一個好大的茶壺在冒煙！" },
    { who: "dudu", emotion: "生氣", text: "嘟——！嘟嘟嘟！" },
    { who: "narrator", emotion: "驚訝", text: "嘟嘟！發條蒸氣壺嘟嘟號開始轉動了！" },
    { who: "agu", emotion: "平靜", text: "這是怪盜做的機關，答對題目讓它停下來！" },
    { who: "agu", emotion: "平靜", text: "它會考的單元，列在下面的清單裡。" },
    { who: "hero", emotion: "開心", text: "我準備好了！" }
  ],
  D_BOSS_DUDU_P2: [
    { who: "narrator", emotion: "驚訝", text: "嘟嘟號噴出更多白煙，轉得更快了！" },
    { who: "agu", emotion: "平靜", text: "別急，先看清楚題目再回答！" }
  ],
  D_BOSS_DUDU_P3: [
    { who: "dudu", emotion: "生氣", text: "嘟嘟嘟嘟——！！" },
    { who: "agu", emotion: "開心", text: "發條快轉完了！再答對幾題！" }
  ],
  D_BOSS_DUDU_AGAIN: [
    { who: "agu", emotion: "平靜", text: "嘟嘟號還在冒煙。休息好了，再來挑戰！" }
  ],
  // 戰後（monsters.js dialog_after）
  D_BOSS_DUDU_B: [
    { who: "narrator", emotion: "平靜", text: "嘟嘟號的發條轉完了，坐下來呼呼睡。" },
    { who: "agu", emotion: "驚訝", text: "壺蓋裡有東西！是北投的印章！" },
    { who: "narrator", emotion: "神祕", text: "「第一顆還你們。下一張卡，在北邊的港口。」" },
    { who: "narrator", emotion: "神祕", text: "「我在地圖的小框框裡等你。——夜光鷗」" },
    { who: "narrator", emotion: "神祕", text: "「附註：嘟嘟號很怕癢，請不要搔它。」" },
    { who: "hero", emotion: "平靜", text: "地圖的小框框？那是哪裡？" },
    { who: "agu", emotion: "開心", text: "先把印章送回博覽會！搭捷運回圓山吧！" }
  ],

  // ═════════════ 蓋章與海圖預告（Q4_T01_4） ═════════════
  D_Q4_T01_4A: [
    { who: "director", emotion: "開心", text: "太好了！北投的印章回來了！" },
    { who: "desk", emotion: "開心", text: "來，蓋在集章冊的第一頁吧！" },
    { who: "narrator", emotion: "開心", text: "（集章冊：北投 ✔，大地圖拼上一小塊）" },
    { who: "classmate", emotion: "開心", text: "{name}，謝謝你！大家都說你很認真！" },
    { who: "agu", emotion: "平靜", text: "北邊的港口……是基隆港吧？" },
    { who: "director", emotion: "平靜", text: "從基隆港，有船會開一整個晚上。" },
    { who: "agu", emotion: "開心", text: "咕！說不定小框框就在海的那一邊！" }
  ],
  // 海圖過場（基隆港→南竿，終點「？」）播完
  D_CHART_PREVIEW_B: [
    { who: "narrator", emotion: "平靜", text: "（小知識卡）真的去馬祖，要從基隆搭一整晚的船。" },
    { who: "agu", emotion: "開心", text: "總有一天，我們也坐船去看看！" }
  ],
  // 片尾：屋頂剪影
  D_Q4_T01_4B: [
    { who: "kaito", emotion: "開心", text: "嘿嘿，下一關可沒有那麼簡單喔！" },
    { who: "kaito", emotion: "驚訝", text: "哎呀！斗篷卡在招牌上了……" },
    { who: "kaito", emotion: "生氣", text: "不、不准笑！我可是很帥的怪盜！" },
    { who: "narrator", emotion: "平靜", text: "夜光鷗手忙腳亂地跑走了。" },
    { who: "director", emotion: "開心", text: "「北投小偵探」這個稱號，送給你！" },
    { who: "narrator", emotion: "開心", text: "第一段冒險到這裡。謝謝你的幫忙！" },
    { who: "narrator", emotion: "平靜", text: "本故事的博覽會與人物都是虛構的。" }
  ]
};

// ──────────────── 遊戲用的全域變數 ────────────────
// pet＝阿咕（引擎跟隨角色的舊 id）；mrt_staff2＝新北投站的站務員（T02；地圖上的 NPC id 不能和圓山站的 mrt_staff 重複，台詞仍用 mrt_staff）
window.SPEAKERS = Object.assign({ pet: "阿咕", mrt_staff2: "站務員" }, window.SPEAKERS_G4_TAIPEI);
// 賢者的「通用課」台詞：劇本第 1、2 課裡和主題無關的句子（一字不改），給第 3 課以後（自然、數學的超綱主題）用
window.DIALOGS = Object.assign({}, window.DIALOGS_G4_TAIPEI, {
  "D_SAGE_LESSON_A": [
    {
      "who": "sage",
      "emotion": "平靜",
      "text": "嗯——今天教你一個課本沒細講的東西。"
    },
    {
      "who": "sage",
      "emotion": "平靜",
      "text": "我先示範一題，你看我怎麼想。"
    }
  ],
  "D_SAGE_LESSON_B": [
    {
      "who": "sage",
      "emotion": "開心",
      "text": "換你試試看，答對兩題就算學會。"
    }
  ],
  "D_SAGE_LESSON_PASS": [
    {
      "who": "sage",
      "emotion": "平靜",
      "text": "這些題目，以後也會在戰鬥裡出現。"
    },
    {
      "who": "sage",
      "emotion": "開心",
      "text": "學會了，就是你的。下次再來聊。"
    }
  ],
  "D_SAGE_LESSON_RETRY": [
    {
      "who": "sage",
      "emotion": "平靜",
      "text": "沒關係，再看一次教學卡，慢慢來。"
    }
  ]
});
