/*
 * 勇者大冒險II — 題庫（四年級台北切片；GDD 3.1、3.5、7.2 B1）—— 由 tools/qbank/merge_g4_drafts.js 產生，請勿手動修改
 * 第三批（2026-10-19）：換成各科家教的最新版草稿（reviewed 一律 false，等老師審題）：
 *   數學 四上 第 1 單元（1-1～1-3）、自然 四上 一（1-1、1-2）、社會 四上 第一單元（1-1、1-2）、國語 四上 第 1–3 課、
 *   英語 翰林 Here We Go 3 Unit 1（遊戲預設出這一版）、英語 何嘉仁 Super Fun 3 Lesson 1（alt_publisher:true，預設不出題，之後可開）。
 * 合併時只改了：exp 照難度 58 題；超綱題補 beyond_topic（賢者課程）25 題
 *   （SAGE_MA_YI 2、SAGE_MA_ROUND 2、SAGE_SC_FACE 3、SAGE_SC_SKY 5、SAGE_SO_MAP4 7、SAGE_SO_8DIR 6）；何嘉仁版加 alt_publisher 14 題。共 271 題。
 * 超綱題（老闆裁示第 10 條）：要先和北投圖書館的方爺爺學過那一課（data/teachcards.js SAGE_LESSONS），才會在戰鬥、委託出現；報表另列。
 */

// ════════════════════════════════════════════════════════════════════
// 來源：成品匣 四年級版規劃/題庫草稿/math_4A_u01.js（72 題；檔頭說明照原檔，題目以 JSON 寫出）
// ════════════════════════════════════════════════════════════════════
// 四年級版 數學 四上 第1單元〈一億以內的數〉題庫草稿（A2 數學家教，2026-10-19）
// 第 2 版（2026-10-19，依 55 號 GDD 7.3 C3「每個節點至少 20 題、至少 6 個概念」補題）：
//   正式題 68 題：1011＝21 題、1012＝21 題、1013＝26 題；每節點 6 個概念、L1–L4 都有、L1／L2 各至少 4 題。
//   新增題 id 接續（113–121、213–221、313–326），舊題 id 不變。
//   舊題只改了兩題的 concept 欄位（id、題目內容不變）：305 → MA4-bignum-digitcards（數字卡排數）、
//   310 → MA4-bignum-inverse（加減互逆找原數），讓 1-3 的概念分類更準。
//   各節點概念：
//     1011／1012：place 位值、readwrite 讀寫、compose 幾個幾、tenfold 十進位換算、expand 位值展開、sequence 數的序列
//     1013：compare 兩數比較、order 多數排序、digitcards 數字卡排數、addsub 加減計算、inverse 加減互逆／驗算、multistep 兩步驟加減
// 超綱延伸題（老闆 2026-10-19 裁示「超綱內容可簡化後由賢者教導學習再測試」）：
//   id 901–904，欄位加 beyond_curriculum: true 與 beyond_note（說明為什麼算邊界），不算在節點 20 題與概念數裡。
//   901–902 MA4-beyond-yi：「億」當位值單位（課綱 N-4-1 位值單位只列到千萬，說明寫「教學可進行到一億」）。
//   903–904 MA4-beyond-round：取概數（課綱 N-4-4，四年級但不屬本單元；翰林版放在哪個單元待查證）。
//   遊戲端建議：賢者先用 scene 那句話教一次，再出題；正式題的抽題池要排除 beyond_curriculum: true。
//   正式題沒有加 beyond_curriculum 欄位（視為 false）。
// 課綱條文查證：均一教育平台 N-4-1 https://www.junyiacademy.org/v108_n-4-01 、
//   N-4-4 https://www.junyiacademy.org/v108_n-4-04 （2026-10-19 查詢；原文出處為國教院數學領域課綱）。
// 單元順序：翰林版（金山國小 115 學年四年級數學課程計畫：1-1 十萬以內的數、1-2 一億以內的數、1-3 大數的大小比較與加減）。
// node＝學期×1000＋單元×10＋小節：1011＝1-1、1012＝1-2、1013＝1-3。
// 欄位沿用三年級版 questions.js，另加：grade、node、curriculum_code、concept、option_tags、option_why、fictional_numbers。
//   option_tags：和 options 一一對應，正解是 "ok"，其他是這個錯誤選項代表的典型錯誤代號。
//   option_why ：和 options 一一對應，正解是空字串；錯誤選項是 30 字以內、針對方法的回饋句。
//   fictional_numbers：true 表示情境裡的人數、金額是虛構的（scene 也標「虛構數字」），不是真實統計。
// 所有題目都是原創，不含課本或習作的題目；source_ref 只表示「可以回去複習的單元」。
// 所有答案與錯誤選項都由 verify_math_u01.py 重新計算核對。reviewed 一律 false，等老師審核。
window.QUESTIONS_G4_MATH_U01 = [
  {
    "id": "MA-4A-01-101",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在定位板上排好數字卡：3、6、0、1、5。",
    "stem": "36015 的「6」在哪一位？",
    "options": [
      "千位",
      "萬位",
      "十位",
      "百位"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "place-shift-left",
      "place-count-from-left",
      "place-shift-right"
    ],
    "option_why": [
      "",
      "最左邊的 3 才在萬位，6 在 3 的右邊一格。",
      "要從最右邊的個位開始，往左一位一位數。",
      "從個位往左數：個、十、百、千，6 在第四位。"
    ],
    "hints": [
      "第1層：最右邊的數字在哪一位？",
      "第2層：從個位往左，依序是個、十、百、千、萬。",
      "第3層：從 5 開始往左一格一格數到 6。"
    ],
    "explanation": "36015＝3 個萬、6 個千、0 個百、1 個十、5 個一，所以 6 在千位，代表 6000。",
    "variant_group": "MA4-01-place-100k",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-102",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "圖書館館員：「這本書的編號是 47208，你看得懂每個數字嗎？」",
    "stem": "47208 的「7」代表多少？",
    "options": [
      "7",
      "700",
      "7000",
      "70000"
    ],
    "answer": 2,
    "option_tags": [
      "face-value",
      "place-shift-right",
      "ok",
      "place-shift-left"
    ],
    "option_why": [
      "7 在千位，要看它在哪一位才知道代表多少。",
      "7 在千位，不是百位，代表 7 個千。",
      "",
      "4 才在萬位，7 在千位，代表 7 個千。"
    ],
    "hints": [
      "第1層：7 在哪一位？",
      "第2層：從個位往左數：個、十、百、千。",
      "第3層：7 在千位，就是 7 個千。"
    ],
    "explanation": "47208 的 7 在千位，代表 7 個千，也就是 7000。",
    "variant_group": "MA4-01-place-100k",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-103",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕把定位板上千位的數字卡換了一張。",
    "stem": "41536 的千位數字 1 換成 6，這個數會變大多少？",
    "options": [
      "5",
      "5000",
      "500",
      "50000"
    ],
    "answer": 1,
    "option_tags": [
      "face-value",
      "ok",
      "place-shift-right",
      "place-shift-left"
    ],
    "option_why": [
      "6 比 1 多 5，這個 5 在千位，是 5 個千。",
      "",
      "換的是千位，多了 5 個千，不是 5 個百。",
      "換的是千位，不是萬位，多了 5 個千。"
    ],
    "hints": [
      "第1層：換了數字以後，這個數變成多少？",
      "第2層：比一比 41536 和 46536，哪一位不一樣？",
      "第3層：千位從 1 個千變成 6 個千，多了幾個千？"
    ],
    "explanation": "41536 變成 46536，千位多了 5 個千，所以變大 5000。",
    "variant_group": "MA4-01-place-100k",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-104",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "捷運站務員：「今天這一站的人數，我記在白板上了。」（虛構數字）",
    "stem": "進站 52418 人、出站 49870 人，進站人數的萬位數字代表幾人？",
    "options": [
      "5 人",
      "40000 人",
      "5000 人",
      "50000 人"
    ],
    "answer": 3,
    "option_tags": [
      "face-value",
      "condition-confusion",
      "place-shift-right",
      "ok"
    ],
    "option_why": [
      "萬位的 5 代表 5 個萬，要看它在哪一位。",
      "題目問的是進站人數 52418，不是出站人數。",
      "5 在萬位，代表 5 個萬，不是 5 個千。",
      ""
    ],
    "hints": [
      "第1層：題目問的是進站還是出站？",
      "第2層：52418 的萬位數字是哪一個？",
      "第3層：萬位的數字代表幾個一萬？"
    ],
    "explanation": "進站人數 52418 的萬位是 5，代表 5 個萬，也就是 50000 人。出站人數用不到。",
    "variant_group": "MA4-01-place-100k",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-105",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "博覽會售票姐姐寫了一張字條：「四萬零七百」。",
    "stem": "「四萬零七百」寫成數字是多少？",
    "options": [
      "4700",
      "40700",
      "47000",
      "40000700"
    ],
    "answer": 1,
    "option_tags": [
      "zero-drop",
      "ok",
      "place-shift-left",
      "concat-write"
    ],
    "option_why": [
      "四萬是五位數，千位沒有數字要寫 0。",
      "",
      "七百要寫在百位，千位是 0。",
      "四萬零七百是 4 個萬和 7 個百，只有五位。"
    ],
    "hints": [
      "第1層：四萬是幾位數？",
      "第2層：在位值表的萬位寫 4、百位寫 7。",
      "第3層：沒有數字的千位、十位、個位都寫 0。"
    ],
    "explanation": "四萬零七百＝4 個萬＋7 個百＝40700。千位、十位、個位都是 0。",
    "variant_group": "MA4-01-readwrite-100k",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-106",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "圖書館館員：「新書的條碼上印著 50608，請你唸給我聽。」",
    "stem": "50608 要怎麼讀？",
    "options": [
      "五萬零六百零八",
      "五萬六百八",
      "五千六百零八",
      "五萬零六百八十"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "zero-read-omit",
      "zero-drop",
      "digit-swap"
    ],
    "option_why": [
      "",
      "千位和十位是 0，中間的 0 要讀出「零」。",
      "50608 是五位數，最高位是萬位。",
      "最後兩位是 0 和 8，8 在個位，讀「零八」。"
    ],
    "hints": [
      "第1層：50608 是幾位數？最高位是哪一位？",
      "第2層：中間有 0 的地方，要讀出「零」。",
      "第3層：先讀「五萬」，再讀後面的 0608。"
    ],
    "explanation": "50608 讀作「五萬零六百零八」。千位和十位是 0，都要讀出「零」。",
    "variant_group": "MA4-01-readwrite-100k",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-107",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕拿出四張數字卡：「這四個數都有兩個 0，讀法卻不一樣喔！」",
    "stem": "哪一個數讀出來，會唸到兩個「零」？",
    "options": [
      "34050",
      "34500",
      "30450",
      "30405"
    ],
    "answer": 3,
    "option_tags": [
      "zero-every-read",
      "zero-every-read",
      "zero-every-read",
      "ok"
    ],
    "option_why": [
      "34050 讀作三萬四千零五十，只唸到一個零。",
      "34500 讀作三萬四千五百，末尾的 0 不讀。",
      "30450 讀作三萬零四百五十，末尾的 0 不讀。",
      ""
    ],
    "hints": [
      "第1層：把每個數輕輕唸一遍。",
      "第2層：數字末尾的 0，要不要讀出來？",
      "第3層：先唸 30405，數一數有幾個「零」。"
    ],
    "explanation": "30405 讀作「三萬零四百零五」，唸到兩個零。末尾的 0 不讀，所以其他三個數唸到的零比較少。",
    "variant_group": "MA4-01-readwrite-100k",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-108",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "博覽會看板寫著四天的參觀人數，廣播正在報其中一天。（虛構數字）",
    "stem": "廣播說「六萬零三百人」，是哪一天的人數？",
    "options": [
      "週一 63000 人",
      "週二 6300 人",
      "週三 60300 人",
      "週四 60030 人"
    ],
    "answer": 2,
    "option_tags": [
      "zero-drop-pad",
      "zero-drop",
      "ok",
      "place-shift-right"
    ],
    "option_why": [
      "六萬零三百的千位是 0，3 要寫在百位。",
      "六萬是五位數，6 要寫在萬位。",
      "",
      "三百要寫在百位，不是十位。"
    ],
    "hints": [
      "第1層：六萬零三百是幾位數？",
      "第2層：6 在萬位，3 在哪一位？",
      "第3層：找萬位是 6、百位是 3、其他位是 0 的數。"
    ],
    "explanation": "六萬零三百＝6 個萬＋3 個百＝60300，是週三。",
    "variant_group": "MA4-01-readwrite-100k",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-109",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在定位板上放了 3 個一萬、5 個一千和 2 個十的積木。",
    "stem": "3 個萬、5 個千和 2 個十，合起來是多少？",
    "options": [
      "352",
      "3520",
      "35020",
      "35200"
    ],
    "answer": 2,
    "option_tags": [
      "digits-concat",
      "zero-drop",
      "ok",
      "place-shift-left"
    ],
    "option_why": [
      "3 個萬是 30000，要照位值放，不能只把數字排一起。",
      "3 在萬位，這是五位數；百位和個位要寫 0。",
      "",
      "2 個十要放在十位，不是百位。"
    ],
    "hints": [
      "第1層：3 個萬、5 個千、2 個十，各是多少？",
      "第2層：把 30000、5000、20 合起來。",
      "第3層：在位值表上，百位和個位沒有積木要寫 0。"
    ],
    "explanation": "30000＋5000＋20＝35020。百位和個位沒有積木，要寫 0。",
    "variant_group": "MA4-01-compose-100k",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-110",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "博覽會售票姐姐：「這裡有 48000 元，都是千元鈔。」",
    "stem": "48000 是幾個千？",
    "options": [
      "8 個",
      "48 個",
      "480 個",
      "4800 個"
    ],
    "answer": 1,
    "option_tags": [
      "place-digit-only",
      "ok",
      "unit-confuse",
      "unit-confuse"
    ],
    "option_why": [
      "千位的 8 只是一部分，4 個萬也是 40 個千。",
      "",
      "480 個百才是 48000，題目問的是幾個千。",
      "4800 個十才是 48000，題目問的是幾個千。"
    ],
    "hints": [
      "第1層：1 萬是幾個千？",
      "第2層：4 個萬是 40 個千，再加上千位的 8 個千。",
      "第3層：把 48000 末尾的三個 0 遮起來看看。"
    ],
    "explanation": "1 萬＝10 個千，4 萬＝40 個千，再加 8 個千，48000 是 48 個千。",
    "variant_group": "MA4-01-compose-100k",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-111",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜拿走了集章卡！館員要重新印，每 100 張裝成一盒。",
    "stem": "集章卡 100 張裝一盒，50000 張可以裝成幾盒？",
    "options": [
      "500 盒",
      "5 盒",
      "50 盒",
      "5000 盒"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "place-digit-only",
      "unit-confuse",
      "unit-confuse"
    ],
    "option_why": [
      "",
      "5 是萬位數字；要算的是 50000 裡有幾個百。",
      "50 個千才是 50000，一盒是 1 個百張。",
      "5000 個十才是 50000，一盒是 1 個百張。"
    ],
    "hints": [
      "第1層：一盒是 100 張，也就是 1 個百。",
      "第2層：1 萬裡有幾個百？",
      "第3層：1 萬是 100 個百，5 萬是幾個百？"
    ],
    "explanation": "1 萬＝100 個百，5 萬＝500 個百，所以可以裝 500 盒。",
    "variant_group": "MA4-01-compose-100k",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-112",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "阿咕：「我們家 4 個人要去旅行，媽媽要去領錢。」（虛構數字）",
    "stem": "4 個人的旅費一共 36000 元，全部用千元鈔付，要付幾張？",
    "options": [
      "6 張",
      "9 張",
      "360 張",
      "36 張"
    ],
    "answer": 3,
    "option_tags": [
      "place-digit-only",
      "extra-condition-used",
      "unit-confuse",
      "ok"
    ],
    "option_why": [
      "千位的 6 只是一部分，3 個萬也是 30 個千。",
      "旅費一共 36000 元，不用分給 4 個人。",
      "360 張是百元鈔的張數，這裡用的是千元鈔。",
      ""
    ],
    "hints": [
      "第1層：題目問的是一共要付幾張，要不要分給每個人？",
      "第2層：36000 是幾個千？",
      "第3層：3 個萬是 30 個千，再加 6 個千。"
    ],
    "explanation": "36000＝36 個千，所以要付 36 張千元鈔。「4 個人」這個條件用不到。",
    "variant_group": "MA4-01-compose-100k",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-113",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-tenfold",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕把 10 個一千的積木，換成一個更大的積木。",
    "stem": "10 個一千是多少？",
    "options": [
      "一百",
      "十萬",
      "一千",
      "一萬"
    ],
    "answer": 3,
    "option_tags": [
      "ten-times-reverse",
      "ten-times-over",
      "ten-times-ignore",
      "ok"
    ],
    "option_why": [
      "10 個一百才是一千，一千的 10 倍更大。",
      "10 個一萬才是十萬，這裡是 10 個一千。",
      "1 個一千才是一千，10 個要往左進一位。",
      ""
    ],
    "hints": [
      "第1層：10 個一百是多少？",
      "第2層：每滿 10 個，就往左進一位。",
      "第3層：千位的左邊一位是什麼位？"
    ],
    "explanation": "10 個一千＝一萬（10000）。滿十就往左進一位。",
    "variant_group": "MA4-01-tenfold-100k",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-114",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-tenfold",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "售票姐姐：「今天收了十萬元，全部都是千元鈔。」",
    "stem": "十萬元是幾張千元鈔？",
    "options": [
      "10 張",
      "100 張",
      "1000 張",
      "10000 張"
    ],
    "answer": 1,
    "option_tags": [
      "zero-count-less",
      "ok",
      "zero-count-more",
      "unit-confuse"
    ],
    "option_why": [
      "10 張千元鈔只有一萬元，還差很多。",
      "",
      "1000 張是百元鈔的張數，這裡是千元鈔。",
      "10000 個十元才是十萬元，這裡是千元鈔。"
    ],
    "hints": [
      "第1層：10 張千元鈔是多少元？",
      "第2層：一萬是 10 個一千，十萬是幾個一萬？",
      "第3層：10 個一萬，每個一萬是 10 張千元鈔。"
    ],
    "explanation": "一萬＝10 個一千，十萬＝10 個一萬＝100 個一千，所以是 100 張千元鈔。",
    "variant_group": "MA4-01-tenfold-100k",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-115",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-tenfold",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕的積木盒裡有 3 個一萬和 15 個一千。",
    "stem": "3 個萬和 15 個千，合起來是多少？",
    "options": [
      "35000",
      "315000",
      "45000",
      "31500"
    ],
    "answer": 2,
    "option_tags": [
      "carry-forget",
      "exchange-ignore",
      "ok",
      "unit-confuse"
    ],
    "option_why": [
      "15 個千是 1 萬 5 千，那 1 個萬別漏掉。",
      "15 個千要先換成 1 萬 5 千，不能直接接著寫。",
      "",
      "15 個千是 15000，不是 15 個百。"
    ],
    "hints": [
      "第1層：15 個千裡面，有沒有滿 10 個千？",
      "第2層：10 個千可以換成 1 個萬。",
      "第3層：15 個千＝1 個萬和 5 個千，再和 3 個萬合起來。"
    ],
    "explanation": "15 個千＝1 個萬和 5 個千。3 個萬＋1 個萬＝4 個萬，所以是 45000。",
    "variant_group": "MA4-01-tenfold-100k",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-116",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-expand",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕把 52706 拆成幾個數相加。",
    "stem": "52706＝50000＋2000＋□＋6，□＝？",
    "options": [
      "700",
      "7",
      "70",
      "7000"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "face-value",
      "place-shift-right",
      "place-shift-left"
    ],
    "option_why": [
      "",
      "7 在百位，代表 7 個百，不是 7 個一。",
      "7 在百位，不是十位，代表 7 個百。",
      "2 才在千位，7 在百位，代表 7 個百。"
    ],
    "hints": [
      "第1層：7 在 52706 的哪一位？",
      "第2層：從個位往左數：個、十、百。",
      "第3層：百位的 7 代表幾個百？"
    ],
    "explanation": "52706＝50000＋2000＋700＋6。7 在百位，代表 700；十位是 0，不用寫。",
    "variant_group": "MA4-01-expand-100k",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-117",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-expand",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "圖書館館員：「把書號 80450 拆開寫，要怎麼寫？」",
    "stem": "哪一個算式和 80450 一樣大？",
    "options": [
      "80000＋4000＋50",
      "8000＋400＋50",
      "80000＋400＋5",
      "80000＋400＋50"
    ],
    "answer": 3,
    "option_tags": [
      "place-shift-left",
      "zero-drop",
      "place-shift-right",
      "ok"
    ],
    "option_why": [
      "4 在百位，是 400，不是 4000。",
      "80450 是五位數，8 在萬位，是 80000。",
      "5 在十位，是 50，不是 5。",
      ""
    ],
    "hints": [
      "第1層：80450 每個數字各在哪一位？",
      "第2層：8 在萬位、4 在百位、5 在十位。",
      "第3層：把每個數字代表的數寫出來相加。"
    ],
    "explanation": "80450＝8 個萬＋4 個百＋5 個十＝80000＋400＋50。千位和個位是 0。",
    "variant_group": "MA4-01-expand-100k",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-118",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-expand",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜把三張數字條的順序打亂了。",
    "stem": "90000＋5＋600 合起來是多少？",
    "options": [
      "95600",
      "90605",
      "9605",
      "90650"
    ],
    "answer": 1,
    "option_tags": [
      "order-as-written",
      "ok",
      "zero-drop",
      "place-shift-left"
    ],
    "option_why": [
      "要看每個數在哪一位，不是照寫的順序排。",
      "",
      "90000 是五位數，千位沒有數要寫 0。",
      "5 是 5 個一，要寫在個位。"
    ],
    "hints": [
      "第1層：90000、5、600 各是幾個什麼？",
      "第2層：9 個萬、6 個百、5 個一。",
      "第3層：在位值表填好，沒有數字的位寫 0。"
    ],
    "explanation": "90000＋600＋5＝90605。順序換了，和不變；要照位值寫，千位和十位寫 0。",
    "variant_group": "MA4-01-expand-100k",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-119",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-sequence",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕一千一千地數：44000、45000、46000……",
    "stem": "46000 再多 1000 是多少？",
    "options": [
      "46100",
      "56000",
      "47000",
      "46001"
    ],
    "answer": 2,
    "option_tags": [
      "place-shift-right",
      "place-shift-left",
      "ok",
      "face-value"
    ],
    "option_why": [
      "多 1000 是千位加 1，不是百位加 1。",
      "多 1000 是千位加 1，不是萬位加 1。",
      "",
      "多的是 1000，不是 1，要加在千位。"
    ],
    "hints": [
      "第1層：1000 是 1 個什麼？",
      "第2層：多 1 個千，哪一位要加 1？",
      "第3層：46000 的千位是 6，加 1 變成幾？"
    ],
    "explanation": "46000 多 1 個千，千位從 6 變成 7，是 47000。",
    "variant_group": "MA4-01-seq-100k",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-120",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-sequence",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "博覽會的人數看板，每天都比前一天多一些人。（虛構數字）",
    "stem": "38000、48000、58000，下一個是多少？",
    "options": [
      "68000",
      "59000",
      "78000",
      "58100"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "step-wrong-place",
      "step-skip",
      "step-wrong-place"
    ],
    "option_why": [
      "",
      "每次多 1 個萬，是萬位加 1，不是千位。",
      "58000 的下一個，只要再多 1 個萬。",
      "每次多 1 個萬，不是多 1 個百。"
    ],
    "hints": [
      "第1層：38000 到 48000，多了多少？",
      "第2層：每次都多 10000，哪一位在變？",
      "第3層：58000 的萬位再加 1。"
    ],
    "explanation": "每次多 10000（萬位加 1），58000 的下一個是 68000。",
    "variant_group": "MA4-01-seq-100k",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-121",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1011,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-sequence",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-1 十萬以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "捷運站務員：「這週每天的進站人數，都比前一天多一點。」（虛構數字）",
    "stem": "第一天 96000 人，每天多 1000 人，第幾天是 10 萬人？",
    "options": [
      "第 4 天",
      "第 40 天",
      "第 6 天",
      "第 5 天"
    ],
    "answer": 3,
    "option_tags": [
      "fencepost-forget-first",
      "unit-confuse",
      "overcount",
      "ok"
    ],
    "option_why": [
      "要從第一天的 96000 開始數，第一天也要算。",
      "每天多的是 1000 人，不是 100 人。",
      "第 5 天就是 100000 人，第 6 天會超過。",
      ""
    ],
    "hints": [
      "第1層：第二天是多少人？",
      "第2層：一天一天寫下來：96000、97000……",
      "第3層：寫到 100000 時，是第幾天？"
    ],
    "explanation": "96000、97000、98000、99000、100000，第 5 天剛好是 10 萬人。",
    "variant_group": "MA4-01-seq-100k",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-201",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在位值表上寫了一個八位數：36000000。",
    "stem": "36000000 的「6」在哪一位？",
    "options": [
      "千萬位",
      "百萬位",
      "十萬位",
      "十位"
    ],
    "answer": 1,
    "option_tags": [
      "place-shift-left",
      "ok",
      "place-shift-right",
      "place-count-from-left"
    ],
    "option_why": [
      "八位數的最高位是千萬位，那是 3 的位置。",
      "",
      "從個位往左數，6 在第七位，是百萬位。",
      "要從最右邊的個位開始，往左一位一位數。"
    ],
    "hints": [
      "第1層：36000000 是幾位數？",
      "第2層：八位數最左邊是千萬位。",
      "第3層：3 在千萬位，6 在它右邊一格。"
    ],
    "explanation": "36000000 是八位數，3 在千萬位，6 在百萬位，代表 6 個百萬。",
    "variant_group": "MA4-01-place-1e8",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-202",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "圖書館館員：「全市的書，編號已經編到 70358000 號了。」（虛構數字）",
    "stem": "70358000 的「7」代表多少？",
    "options": [
      "7",
      "7000",
      "7000000",
      "70000000"
    ],
    "answer": 3,
    "option_tags": [
      "face-value",
      "wan-unit-drop",
      "place-shift-right",
      "ok"
    ],
    "option_why": [
      "7 在千萬位，要看它在哪一位才知道代表多少。",
      "7035萬 的 7 是 7 個千萬，別漏了「萬」。",
      "八位數最左邊是千萬位，7 代表 7 個千萬。",
      ""
    ],
    "hints": [
      "第1層：70358000 是幾位數？",
      "第2層：八位數最左邊那一位叫什麼？",
      "第3層：7 在千萬位，就是 7 個千萬。"
    ],
    "explanation": "70358000 是八位數，7 在千萬位，代表 7 個千萬，也就是 70000000。",
    "variant_group": "MA4-01-place-1e8",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-203",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜留下一張紙條，上面寫著保險箱密碼的提示。",
    "stem": "八位數，千萬位是 4、萬位是 6，其他位都是 0，這個數是多少？",
    "options": [
      "40060000",
      "4060000",
      "46000000",
      "40600000"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "zero-drop",
      "zero-drop-pad",
      "place-shift-left"
    ],
    "option_why": [
      "",
      "八位數要有 8 個數字，百萬位、十萬位都寫 0。",
      "6 要寫在萬位，不是百萬位。",
      "6 要寫在萬位，不是十萬位。"
    ],
    "hints": [
      "第1層：八位數有幾個數字？",
      "第2層：先畫 8 格位值表，千萬位寫 4。",
      "第3層：萬位寫 6，其他格子都寫 0。"
    ],
    "explanation": "千萬位 4、百萬位 0、十萬位 0、萬位 6，後面四位都是 0，這個數是 40060000。",
    "variant_group": "MA4-01-place-1e8",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-204",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-place",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "博覽會看板：今年門票收入 25380000 元。（虛構數字）",
    "stem": "門票收入 25380000 元，下面哪一句說得對？",
    "options": [
      "5 代表 50 萬元",
      "3 代表 3 萬元",
      "2 代表 2000 萬元",
      "8 代表 8 元"
    ],
    "answer": 2,
    "option_tags": [
      "place-shift-right",
      "place-shift-right",
      "ok",
      "wan-unit-drop"
    ],
    "option_why": [
      "5 在百萬位，代表 500 萬元。",
      "3 在十萬位，代表 30 萬元。",
      "",
      "8 在萬位，代表 8 萬元，別漏了「萬」。"
    ],
    "hints": [
      "第1層：25380000 是幾位數？",
      "第2層：把它看成 2538萬，每個數字在哪一位？",
      "第3層：2 在千萬位，代表幾個千萬？"
    ],
    "explanation": "25380000＝2538萬。2 代表 2000 萬，5 代表 500 萬，3 代表 30 萬，8 代表 8 萬。",
    "variant_group": "MA4-01-place-1e8",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-205",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「我在書上看到『三千零五萬』，這是多大的數？」",
    "stem": "「三千零五萬」寫成數字是多少？",
    "options": [
      "3005",
      "3050000",
      "30050000",
      "30500000"
    ],
    "answer": 2,
    "option_tags": [
      "wan-unit-drop",
      "zero-drop",
      "ok",
      "place-shift-left"
    ],
    "option_why": [
      "後面還有「萬」，3005 萬要在 3005 後面加四個 0。",
      "三千零五萬是 3005 個萬，是八位數。",
      "",
      "五萬的 5 在萬位，不是十萬位。"
    ],
    "hints": [
      "第1層：先想「三千零五」怎麼寫。",
      "第2層：三千零五萬就是 3005 個萬。",
      "第3層：在 3005 後面加上四個 0。"
    ],
    "explanation": "三千零五萬＝3005 個萬＝30050000。",
    "variant_group": "MA4-01-readwrite-1e8",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-206",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "捷運站的看板：今年搭乘人次 40080600。（虛構數字）",
    "stem": "40080600 要怎麼讀？",
    "options": [
      "四千八萬六百",
      "四千零八十萬零六百",
      "四千零八萬六百",
      "四千零八萬零六百"
    ],
    "answer": 3,
    "option_tags": [
      "zero-read-omit",
      "place-shift-left",
      "zero-read-omit-group",
      "ok"
    ],
    "option_why": [
      "中間有 0 的地方要讀「零」，例如四千零八萬。",
      "萬位是 8、十萬位是 0，前四位讀「四千零八萬」。",
      "萬後面的千位是 0，要讀「零六百」。",
      ""
    ],
    "hints": [
      "第1層：從右邊每四位分一段，分成 4008 和 0600。",
      "第2層：前一段讀「四千零八萬」。",
      "第3層：後一段的千位是 0，要先讀「零」。"
    ],
    "explanation": "40080600＝4008萬0600，讀作「四千零八萬零六百」。",
    "variant_group": "MA4-01-readwrite-1e8",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-207",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜在牆上寫了一個數：「八百零六萬零三十」。",
    "stem": "「八百零六萬零三十」寫成數字，是幾位數？",
    "options": [
      "5 位數",
      "7 位數",
      "6 位數",
      "8 位數"
    ],
    "answer": 1,
    "option_tags": [
      "zero-drop",
      "ok",
      "wan-group-short",
      "place-shift-left"
    ],
    "option_why": [
      "萬後面要寫滿四位數字：0030，不能只寫 30。",
      "",
      "萬後面要寫滿四位數字：0030，不是 030。",
      "8 在百萬位，八百多萬是 7 位數。"
    ],
    "hints": [
      "第1層：先把「八百零六萬」寫成數字。",
      "第2層：萬後面一定有四位：千、百、十、個。",
      "第3層：寫出 806 和 0030，合起來數一數。"
    ],
    "explanation": "八百零六萬零三十＝8060030，一共 7 位數。萬後面要寫滿四位：0030。",
    "variant_group": "MA4-01-readwrite-1e8",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-208",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-readwrite",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "夜市四個攤位一年的營業額，寫在四張紙卡上。（虛構數字）",
    "stem": "哪一攤的營業額讀作「七百零五萬零八十」元？",
    "options": [
      "甲攤 7050080 元",
      "乙攤 705080 元",
      "丙攤 750080 元",
      "丁攤 7050800 元"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "wan-group-short",
      "zero-drop",
      "place-shift-left"
    ],
    "option_why": [
      "",
      "萬後面要寫滿四位，零八十要寫成 0080。",
      "七百零五萬是 705 個萬，十萬位的 0 不能漏。",
      "八十的 8 在十位，萬後面是 0080。"
    ],
    "hints": [
      "第1層：先分成「七百零五萬」和「零八十」。",
      "第2層：七百零五萬寫成 705，後面還要寫四位。",
      "第3層：零八十寫成 0080，接在 705 後面。"
    ],
    "explanation": "七百零五萬零八十＝705萬0080＝7050080，是甲攤。",
    "variant_group": "MA4-01-readwrite-1e8",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-209",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在位值表上，把 10 個一百萬的積木換成一個大積木。",
    "stem": "10 個一百萬是多少？",
    "options": [
      "一百萬",
      "一千萬",
      "一億",
      "十萬"
    ],
    "answer": 1,
    "option_tags": [
      "ten-times-ignore",
      "ok",
      "ten-times-over",
      "ten-times-reverse"
    ],
    "option_why": [
      "1 個一百萬才是一百萬，10 個要往左進一位。",
      "",
      "10 個一千萬才是一億，這裡是 10 個一百萬。",
      "10 個一萬才是十萬，一百萬的 10 倍更大。"
    ],
    "hints": [
      "第1層：10 個一萬是多少？",
      "第2層：每滿 10 個，就往左進一位。",
      "第3層：百萬位的左邊一位是什麼位？"
    ],
    "explanation": "10 個一百萬＝一千萬（10000000）。滿十就往左進一位。",
    "variant_group": "MA4-01-compose-1e8",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-210",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "圖書館館員：「新館的預算是 52300000 元。」（虛構數字）",
    "stem": "52300000 是幾個十萬？",
    "options": [
      "3 個",
      "52 個",
      "523 個",
      "5230 個"
    ],
    "answer": 2,
    "option_tags": [
      "place-digit-only",
      "unit-confuse",
      "ok",
      "unit-confuse"
    ],
    "option_why": [
      "十萬位的 3 只是一部分，前面的 52 也要算進去。",
      "52 個百萬是 5200 萬，題目問的是幾個十萬。",
      "",
      "5230 個萬才是 52300000，題目問的是十萬。"
    ],
    "hints": [
      "第1層：十萬後面有幾個 0？",
      "第2層：把 52300000 末尾的五個 0 遮起來。",
      "第3層：遮起來後剩下的數，就是有幾個十萬。"
    ],
    "explanation": "十萬後面有五個 0。把 52300000 末尾五個 0 遮起來剩下 523，所以是 523 個十萬。",
    "variant_group": "MA4-01-compose-1e8",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-211",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕：「怪盜說寶箱裡有 1 億元，都是一疊一疊的千元鈔！」",
    "stem": "千元鈔 100 張一疊，幾疊合起來是 1 億元？",
    "options": [
      "1000 疊",
      "100 疊",
      "10000 疊",
      "100000 疊"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "zero-count-less",
      "zero-count-more",
      "skip-step"
    ],
    "option_why": [
      "",
      "一疊是 10 萬元，100 疊只有 1000 萬元。",
      "一疊是 10 萬元，10000 疊會超過 1 億元。",
      "1 億元是 100000 張，還要再 100 張分成一疊。"
    ],
    "hints": [
      "第1層：一疊千元鈔是多少元？",
      "第2層：100 個一千是十萬，一疊是十萬元。",
      "第3層：1 億裡面有幾個十萬？"
    ],
    "explanation": "一疊＝100 張×1000 元＝10 萬元。1 億＝1000 個十萬，所以要 1000 疊。",
    "variant_group": "MA4-01-compose-1e8",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-212",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compose",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "怪盜留下紙條：「寶藏有 4 個千萬元。」阿咕想換個說法。",
    "stem": "下面哪一個，和 4 個千萬一樣多？",
    "options": [
      "40 個十萬",
      "400 個萬",
      "4000 個百",
      "40 個百萬"
    ],
    "answer": 3,
    "option_tags": [
      "unit-confuse",
      "zero-count-less",
      "unit-confuse",
      "ok"
    ],
    "option_why": [
      "1 個千萬是 100 個十萬，4 個千萬是 400 個十萬。",
      "1 個千萬是 1000 個萬，4 個千萬是 4000 個萬。",
      "4000 個百只有 40 萬，比 4 個千萬少很多。",
      ""
    ],
    "hints": [
      "第1層：4 個千萬寫成數字是多少？",
      "第2層：40000000 是幾個百萬？",
      "第3層：1 個千萬是 10 個百萬。"
    ],
    "explanation": "4 個千萬＝40000000＝40 個百萬。另外三個只有 400 萬或 40 萬。",
    "variant_group": "MA4-01-compose-1e8",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-213",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-tenfold",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在位值表的十萬位，放了 10 個十萬的積木。",
    "stem": "10 個十萬是多少？",
    "options": [
      "一百萬",
      "一萬",
      "一千萬",
      "十萬"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "ten-times-reverse",
      "ten-times-over",
      "ten-times-ignore"
    ],
    "option_why": [
      "",
      "10 個一千才是一萬，十萬的 10 倍更大。",
      "10 個一百萬才是一千萬，這裡是 10 個十萬。",
      "1 個十萬才是十萬，10 個要往左進一位。"
    ],
    "hints": [
      "第1層：10 個一萬是多少？",
      "第2層：每滿 10 個，就往左進一位。",
      "第3層：十萬位的左邊一位是什麼位？"
    ],
    "explanation": "10 個十萬＝一百萬（1000000）。滿十就往左進一位。",
    "variant_group": "MA4-01-tenfold-1e8",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-214",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-tenfold",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "阿咕在位值表上，看看 1000 萬可以分成幾個十萬。",
    "stem": "1000 萬是幾個十萬？",
    "options": [
      "10 個",
      "1000 個",
      "100 個",
      "10000 個"
    ],
    "answer": 2,
    "option_tags": [
      "zero-count-less",
      "zero-count-more",
      "ok",
      "unit-confuse"
    ],
    "option_why": [
      "10 個百萬才是一千萬，十萬比百萬小。",
      "1000 個萬才是一千萬，十萬比萬大。",
      "",
      "10000 個千才是一千萬，這裡問的是十萬。"
    ],
    "hints": [
      "第1層：1 個百萬是幾個十萬？",
      "第2層：1000 萬是 10 個百萬。",
      "第3層：10 個百萬，每個百萬是 10 個十萬。"
    ],
    "explanation": "1 個百萬＝10 個十萬，1000 萬＝10 個百萬＝100 個十萬。",
    "variant_group": "MA4-01-tenfold-1e8",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-215",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-tenfold",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜的寶箱：9 個百萬元的大袋子，和 12 個十萬元的小袋子。",
    "stem": "9 個百萬和 12 個十萬，合起來是多少？",
    "options": [
      "9200000",
      "10200000",
      "91200000",
      "9120000"
    ],
    "answer": 1,
    "option_tags": [
      "carry-forget",
      "ok",
      "exchange-ignore",
      "unit-confuse"
    ],
    "option_why": [
      "12 個十萬是 120 萬，不只 20 萬。",
      "",
      "12 個十萬要先換成 1 百萬 2 十萬，不能直接接著寫。",
      "12 個十萬是 120 萬，不是 12 萬。"
    ],
    "hints": [
      "第1層：12 個十萬裡面，有沒有滿 10 個十萬？",
      "第2層：10 個十萬可以換成 1 個百萬。",
      "第3層：9 個百萬再加 1 個百萬，會變成什麼？"
    ],
    "explanation": "12 個十萬＝1 個百萬和 2 個十萬。9＋1＝10 個百萬＝1 個千萬，所以是 10200000。",
    "variant_group": "MA4-01-tenfold-1e8",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-216",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-expand",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕把 5080000 拆成兩個數相加。",
    "stem": "5080000＝5000000＋□，□＝？",
    "options": [
      "8000",
      "800000",
      "8",
      "80000"
    ],
    "answer": 3,
    "option_tags": [
      "place-shift-right",
      "place-shift-left",
      "face-value",
      "ok"
    ],
    "option_why": [
      "8 在萬位，不是千位，代表 8 個萬。",
      "0 在十萬位，8 在萬位，代表 8 個萬。",
      "8 在萬位，代表 8 個萬，不是 8 個一。",
      ""
    ],
    "hints": [
      "第1層：5080000 是幾位數？",
      "第2層：從個位往左數，8 在第幾位？",
      "第3層：8 在萬位，就是 8 個萬。"
    ],
    "explanation": "5080000＝5000000＋80000。8 在萬位，代表 80000。",
    "variant_group": "MA4-01-expand-1e8",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-217",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-expand",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "阿咕把三堆積木合起來：4000萬、30萬、6萬。",
    "stem": "4000萬＋30萬＋6萬＝？",
    "options": [
      "4360000",
      "40360000",
      "40306000",
      "43600000"
    ],
    "answer": 1,
    "option_tags": [
      "zero-drop",
      "ok",
      "place-shift-right",
      "place-shift-left"
    ],
    "option_why": [
      "4000 萬是八位數，百萬位的 0 不能漏。",
      "",
      "6 萬的 6 要寫在萬位，不是千位。",
      "30 萬的 3 在十萬位，不是百萬位。"
    ],
    "hints": [
      "第1層：先算萬的部分：4000＋30＋6＝？",
      "第2層：答案是 4036 個萬。",
      "第3層：4036 後面加上四個 0。"
    ],
    "explanation": "4000萬＋30萬＋6萬＝4036萬＝40360000。",
    "variant_group": "MA4-01-expand-1e8",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-218",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-expand",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜把寶藏金額拆成三堆，阿咕要找出拆對的那張紙條。",
    "stem": "哪一個算式和 20504000 一樣大？",
    "options": [
      "2000萬＋5萬＋4000",
      "200萬＋50萬＋4000",
      "2000萬＋50萬＋4000",
      "2000萬＋50萬＋400"
    ],
    "answer": 2,
    "option_tags": [
      "place-shift-right",
      "zero-drop",
      "ok",
      "place-shift-right"
    ],
    "option_why": [
      "5 在十萬位，是 50 萬，不是 5 萬。",
      "20504000 是八位數，2 代表 2000 萬。",
      "",
      "4 在千位，是 4000，不是 400。"
    ],
    "hints": [
      "第1層：從右邊每四位分一段：2050 和 4000。",
      "第2層：2050 萬＝2000 萬＋50 萬。",
      "第3層：萬後面那一段是 4000。"
    ],
    "explanation": "20504000＝2050萬4000＝2000萬＋50萬＋4000。",
    "variant_group": "MA4-01-expand-1e8",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-219",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-sequence",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕十萬十萬地數，數到 390萬 停下來想一想。",
    "stem": "十萬十萬地數：380萬、390萬，下一個是？",
    "options": [
      "391萬",
      "490萬",
      "40萬",
      "400萬"
    ],
    "answer": 3,
    "option_tags": [
      "step-wrong-place",
      "step-wrong-place",
      "unit-confuse",
      "ok"
    ],
    "option_why": [
      "每次多 10 萬，不是多 1 萬。",
      "每次多 10 萬，不是多 100 萬。",
      "40 個十萬是 400 萬，不是 40 萬。",
      ""
    ],
    "hints": [
      "第1層：380 萬到 390 萬，多了多少？",
      "第2層：390 萬再多 10 萬是幾萬？",
      "第3層：390＋10＝400。"
    ],
    "explanation": "每次多 10 萬，390萬＋10萬＝400萬。",
    "variant_group": "MA4-01-seq-1e8",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-220",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-sequence",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "捷運站看板：累計搭乘 7999 萬人次。（虛構數字）",
    "stem": "7999 萬再多 1 萬是多少？",
    "options": [
      "8000 萬",
      "7990 萬",
      "8999 萬",
      "79990001"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "carry-forget",
      "place-shift-left",
      "wan-unit-drop"
    ],
    "option_why": [
      "",
      "9＋1＝10 要進位，一路進到千位。",
      "多 1 萬是萬位加 1，不是千萬位加 1。",
      "多的是 1 萬，不是 1，要加在萬位。"
    ],
    "hints": [
      "第1層：把它想成 7999 個萬再多 1 個萬。",
      "第2層：7999＋1＝？",
      "第3層：算完記得在後面加上「萬」。"
    ],
    "explanation": "7999 個萬＋1 個萬＝8000 個萬＝8000 萬（80000000）。",
    "variant_group": "MA4-01-seq-1e8",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-221",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-sequence",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "博覽會網站的點閱數，每天大約多一些。（虛構數字）",
    "stem": "現在 9600 萬，每天多 100 萬，再過幾天滿 1 億？",
    "options": [
      "40 天",
      "4 天",
      "400 天",
      "5 天"
    ],
    "answer": 1,
    "option_tags": [
      "unit-confuse",
      "ok",
      "unit-confuse",
      "fencepost-extra"
    ],
    "option_why": [
      "每天多的是 100 萬，40 天是每天 10 萬。",
      "",
      "每天多的是 100 萬，400 天是每天 1 萬。",
      "9600 萬是現在的數，不算一天。"
    ],
    "hints": [
      "第1層：1 億是幾萬？",
      "第2層：1 億比 9600 萬多幾萬？",
      "第3層：400 萬裡有幾個 100 萬？"
    ],
    "explanation": "1 億＝10000 萬，10000 萬－9600 萬＝400 萬；400 萬是 4 個 100 萬，要 4 天。",
    "variant_group": "MA4-01-seq-1e8",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-301",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compare",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "四張數字卡排在桌上，阿咕想找出最大的那一張。",
    "stem": "哪一個數最大？",
    "options": [
      "9876543",
      "10020000",
      "9999999",
      "1002000"
    ],
    "answer": 1,
    "option_tags": [
      "compare-first-digit",
      "ok",
      "compare-many-nines",
      "digit-count-misread"
    ],
    "option_why": [
      "先數位數：八位數一定比七位數大。",
      "",
      "9 很多也只是七位數，八位數比較大。",
      "1002000 是七位數，比 10020000 少一位。"
    ],
    "hints": [
      "第1層：每個數各是幾位數？",
      "第2層：位數多的數比較大。",
      "第3層：找出唯一的八位數。"
    ],
    "explanation": "10020000 是八位數，其他都是七位數，所以 10020000 最大。",
    "variant_group": "MA4-01-compare-order",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-302",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compare",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "博覽會今年的參觀人次是 6050000。（虛構數字）",
    "stem": "下面哪一個數比 6050000 大？",
    "options": [
      "6005000",
      "6049999",
      "605000",
      "6500000"
    ],
    "answer": 3,
    "option_tags": [
      "compare-wrong-place",
      "compare-many-nines",
      "digit-count-ignore",
      "ok"
    ],
    "option_why": [
      "一樣是七位數，萬位 0 比 5 小，所以比較小。",
      "萬位 4 比 5 小，後面的 9 再多也比較小。",
      "605000 是六位數，比七位數小。",
      ""
    ],
    "hints": [
      "第1層：先數一數，各是幾位數？",
      "第2層：位數一樣時，從最高位開始比。",
      "第3層：百萬位都是 6，接著比十萬位。"
    ],
    "explanation": "6500000 的十萬位是 5，6050000 的十萬位是 0，所以 6500000 比較大。",
    "variant_group": "MA4-01-compare-order",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-303",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compare",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "四個場館的參觀人次貼在公告欄上。（虛構數字）",
    "stem": "哪一個數最小？",
    "options": [
      "45230000",
      "45320000",
      "45032000",
      "45203000"
    ],
    "answer": 2,
    "option_tags": [
      "compare-wrong-place",
      "compare-reverse",
      "ok",
      "compare-wrong-place"
    ],
    "option_why": [
      "前兩位都是 45，接著比十萬位：0 比 2 小。",
      "45320000 是最大的數，題目問的是最小。",
      "",
      "十萬位 0 比 2 小，45032000 比較小。"
    ],
    "hints": [
      "第1層：四個數都是八位數，前兩位一樣嗎？",
      "第2層：千萬位、百萬位都一樣，就比十萬位。",
      "第3層：找十萬位最小的那個數。"
    ],
    "explanation": "四個數前兩位都是 45，比十萬位：0＜2＜3，所以 45032000 最小。",
    "variant_group": "MA4-01-compare-order",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-304",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compare",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜的保險箱密碼被墨水遮住了一格。",
    "stem": "47□8000 比 4768000 大，□ 裡最小可以填多少？",
    "options": [
      "7",
      "5",
      "6",
      "9"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "compare-reverse",
      "equal-counted",
      "max-instead-of-min"
    ],
    "option_why": [
      "",
      "填 5 時是 4758000，比 4768000 小。",
      "填 6 時兩個數一樣大，題目要比較大。",
      "填 9 也可以，但題目問的是最小填多少。"
    ],
    "hints": [
      "第1層：兩個數前兩位都是 47，接著要比哪一位？",
      "第2層：□ 和萬位的 6 比，□ 要比 6 大還是小？",
      "第3層：□ 填 6 的時候，兩個數一樣大嗎？"
    ],
    "explanation": "前兩位一樣，接著比萬位：□ 要比 6 大，可以填 7、8、9，最小是 7。",
    "variant_group": "MA4-01-compare-reason",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-305",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-digitcards",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕拿出 6 張數字卡：9、0、0、5、1、3。",
    "stem": "用這 6 張卡排出最小的六位數，是多少？",
    "options": [
      "135900",
      "100359",
      "001359",
      "953100"
    ],
    "answer": 1,
    "option_tags": [
      "zeros-last",
      "ok",
      "leading-zero",
      "make-largest"
    ],
    "option_why": [
      "0 比 1 小，可以放在第二、三位，數會更小。",
      "",
      "最高位不能是 0，不然就不是六位數。",
      "這是最大的六位數，題目要最小的。"
    ],
    "hints": [
      "第1層：六位數的最高位可以放 0 嗎？",
      "第2層：最高位放不是 0 的最小數字。",
      "第3層：最高位放 1，剩下的從小排到大。"
    ],
    "explanation": "最高位不能是 0，先放 1；剩下 0、0、3、5、9 從小排到大，得到 100359。",
    "variant_group": "MA4-01-compare-reason",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-306",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-compare",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "怪盜得意的說：「我的寶藏可不少喔！」",
    "stem": "寶藏比 4999 萬元多、比 5001 萬元少，可能是多少元？",
    "options": [
      "49990000 元",
      "5000000 元",
      "50100000 元",
      "50000000 元"
    ],
    "answer": 3,
    "option_tags": [
      "boundary-included",
      "digit-count-misread",
      "compare-wrong-place",
      "ok"
    ],
    "option_why": [
      "49990000 就是 4999 萬，題目要比它多。",
      "5000000 是 500 萬，比 4999 萬少很多。",
      "50100000 是 5010 萬，比 5001 萬多。",
      ""
    ],
    "hints": [
      "第1層：把每個選項寫成「幾萬」看看。",
      "第2層：要比 4999 萬多，又要比 5001 萬少。",
      "第3層：4999 萬和 5001 萬中間，有哪個整萬的數？"
    ],
    "explanation": "50000000＝5000 萬，比 4999 萬多、比 5001 萬少，所以可能是 50000000 元。",
    "variant_group": "MA4-01-compare-reason",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-307",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-addsub",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕把大數想成「幾個萬」，用積木來算加法。",
    "stem": "25 萬＋37 萬＝？",
    "options": [
      "62萬",
      "52萬",
      "512萬",
      "62"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "carry-forget",
      "carry-write-both",
      "wan-unit-drop"
    ],
    "option_why": [
      "",
      "5＋7＝12，要進 1 到前一位：2＋3＋1＝6。",
      "5＋7＝12，只寫 2，把 1 進到前一位。",
      "25 萬加 37 萬，答案也要寫「萬」。"
    ],
    "hints": [
      "第1層：把 25 萬和 37 萬想成 25 個萬和 37 個萬。",
      "第2層：25＋37 是多少？",
      "第3層：算完記得在後面加上「萬」。"
    ],
    "explanation": "25 個萬＋37 個萬＝62 個萬，所以是 62 萬。",
    "variant_group": "MA4-01-addsub-calc",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-308",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-addsub",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "兩條捷運路線一個月的搭乘人次，阿咕想合起來算。（虛構數字）",
    "stem": "38萬7500＋26萬4800＝？",
    "options": [
      "64萬2300",
      "74萬2300",
      "65萬2300",
      "65萬12300"
    ],
    "answer": 2,
    "option_tags": [
      "carry-drop",
      "carry-wrong-place",
      "ok",
      "carry-keep"
    ],
    "option_why": [
      "7500＋4800＝12300，滿 1 萬要進到萬。",
      "進位的 1 萬要加到萬位，不是十萬位。",
      "",
      "進位 1 萬以後，萬以下只剩 2300。"
    ],
    "hints": [
      "第1層：萬以下的部分先算：7500＋4800。",
      "第2層：12300 裡有 1 個萬，要進位。",
      "第3層：萬的部分：38＋26＋1＝？"
    ],
    "explanation": "7500＋4800＝12300＝1萬2300；38萬＋26萬＋1萬＝65萬，答案是 65萬2300。",
    "variant_group": "MA4-01-addsub-calc",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-309",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-addsub",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "阿咕拿出計算紙，用直式來算大數減法。",
    "stem": "4508000－2730000＝？",
    "options": [
      "2238000",
      "1778000",
      "2878000",
      "4235000"
    ],
    "answer": 1,
    "option_tags": [
      "borrow-reverse",
      "ok",
      "borrow-no-decrement",
      "zero-drop-operand"
    ],
    "option_why": [
      "上面的數字比較小時，要向前一位借 1。",
      "",
      "借了 1 以後，前一位要少 1。",
      "2730000 是七位數，直式要對齊每一位。"
    ],
    "hints": [
      "第1層：用直式，從個位開始一位一位減。",
      "第2層：萬位 0 減 3 不夠減，要向十萬位借。",
      "第3層：十萬位借出去以後剩 4，4 減 7 又要向百萬位借。"
    ],
    "explanation": "4508000－2730000＝1778000。驗算：1778000＋2730000＝4508000。",
    "variant_group": "MA4-01-addsub-calc",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-310",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-inverse",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜的存錢筒：再放進 285 萬元，就剛好 1000 萬元。（虛構數字）",
    "stem": "一個數加上 285 萬是 1000 萬，這個數是多少？",
    "options": [
      "1285萬",
      "825萬",
      "715萬",
      "715"
    ],
    "answer": 2,
    "option_tags": [
      "op-swap",
      "borrow-zero-chain",
      "ok",
      "wan-unit-drop"
    ],
    "option_why": [
      "要找原來的數，用 1000 萬減 285 萬。",
      "連續借位時，中間的 0 借完會變 9，不是 10。",
      "",
      "1000 萬減 285 萬，答案也要寫「萬」。"
    ],
    "hints": [
      "第1層：原來的數加 285 萬是 1000 萬，要用什麼方法找回原來的數？",
      "第2層：算 1000－285，答案再加上「萬」。",
      "第3層：千位借給百位，百位再借給十位，借出去的 0 會變成 9。"
    ],
    "explanation": "1000 萬－285 萬＝715 萬。驗算：715 萬＋285 萬＝1000 萬。",
    "variant_group": "MA4-01-addsub-word",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-311",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-addsub",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "售票姐姐：「我們博覽會有 3 個展館喔！」（虛構數字）",
    "stem": "第一週賣出 128 萬張票，第二週賣出 96 萬張，兩週共賣幾萬張？",
    "options": [
      "224 萬張",
      "32 萬張",
      "114 萬張",
      "672 萬張"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "op-swap",
      "carry-forget",
      "extra-condition-used"
    ],
    "option_why": [
      "",
      "「共賣幾萬張」要把兩週合起來，用加法。",
      "8＋6＝14 要進位，2＋9＋1 也要再進位。",
      "展館有幾個和賣幾張票無關，不用乘 3。"
    ],
    "hints": [
      "第1層：題目要算的是哪兩個數？",
      "第2層：「兩週共賣」要用加法。",
      "第3層：128＋96，個位 8＋6 滿十要進位。"
    ],
    "explanation": "128 萬＋96 萬＝224 萬張。「3 個展館」用不到。",
    "variant_group": "MA4-01-addsub-word",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-312",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-addsub",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "捷運站務員：「這兩站一年的進站人次，你比比看。」（虛構數字）",
    "stem": "甲站一年 3650 萬人次，乙站 2980 萬人次。哪站多？多幾萬人次？",
    "options": [
      "乙站多 670 萬",
      "甲站多 1330 萬",
      "甲站多 6630 萬",
      "甲站多 670 萬"
    ],
    "answer": 3,
    "option_tags": [
      "compare-many-nines",
      "borrow-reverse",
      "op-swap",
      "ok"
    ],
    "option_why": [
      "千位 3 比 2 大，3650 萬比 2980 萬多。",
      "百位 6 減 9 不夠減，要向千位借 1。",
      "問多幾萬要用減法，不是把兩站加起來。",
      ""
    ],
    "hints": [
      "第1層：先比大小：3650 萬和 2980 萬，哪個多？",
      "第2層：多幾萬，用大的減小的。",
      "第3層：3650－2980，十位、百位都要借位。"
    ],
    "explanation": "3650 萬＞2980 萬，甲站多；3650 萬－2980 萬＝670 萬人次。",
    "variant_group": "MA4-01-addsub-word",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-313",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-order",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕想把三張數字卡，從小排到大。",
    "stem": "52萬、5200萬、520萬由小到大排，哪個對？",
    "options": [
      "52萬＜520萬＜5200萬",
      "520萬＜52萬＜5200萬",
      "5200萬＜520萬＜52萬",
      "52萬＜5200萬＜520萬"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "digit-count-ignore",
      "order-reverse",
      "digit-count-ignore"
    ],
    "option_why": [
      "",
      "520 萬比 52 萬多一位，比較大。",
      "這是由大到小排，題目要由小到大。",
      "5200 萬比 520 萬多一位，比較大。"
    ],
    "hints": [
      "第1層：三個數都是「幾萬」，先比萬前面的數。",
      "第2層：52、520、5200，哪個最小？",
      "第3層：位數少的比較小。"
    ],
    "explanation": "52＜520＜5200，所以 52萬＜520萬＜5200萬。",
    "variant_group": "MA4-01-order",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-314",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-order",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "四座場館一年的參觀人次寫在看板上。（虛構數字）",
    "stem": "由大到小排，排第二的是哪一個數？",
    "options": [
      "30540000",
      "3054000",
      "30450000",
      "30405000"
    ],
    "answer": 2,
    "option_tags": [
      "rank-largest",
      "digit-count-ignore",
      "ok",
      "rank-from-small"
    ],
    "option_why": [
      "30540000 最大，排第一，不是第二。",
      "3054000 只有七位數，是最小的。",
      "",
      "這是由小到大排的第二個。"
    ],
    "hints": [
      "第1層：先數位數，哪一個位數比較少？",
      "第2層：八位數的三個，從十萬位開始比。",
      "第3層：找出最大的，再找第二大的。"
    ],
    "explanation": "由大到小：30540000＞30450000＞30405000＞3054000，排第二的是 30450000。",
    "variant_group": "MA4-01-order",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-315",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-order",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "怪盜把四張數字卡混在一起，數字長得很像。",
    "stem": "70800、708000、78000、7080000 由小到大排，第 3 個是？",
    "options": [
      "78000",
      "70800",
      "7080000",
      "708000"
    ],
    "answer": 3,
    "option_tags": [
      "rank-from-big",
      "rank-smallest",
      "digit-count-ignore",
      "ok"
    ],
    "option_why": [
      "78000 是由大到小排的第 3 個。",
      "70800 最小，排第 1，不是第 3。",
      "要先數位數，7080000 是七位數，最大。",
      ""
    ],
    "hints": [
      "第1層：每個數各是幾位數？",
      "第2層：兩個五位數先比，再排六位數、七位數。",
      "第3層：由小到大寫出來，數到第 3 個。"
    ],
    "explanation": "70800＜78000＜708000＜7080000，第 3 個是 708000。",
    "variant_group": "MA4-01-order",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-316",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-order",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "四個縣市的人口寫在表上，寫法不太一樣。（虛構數字）",
    "stem": "人口由多到少排，排第 2 的是哪一個？",
    "options": [
      "丙市 2563000 人",
      "甲市 2650000 人",
      "乙市 265萬3000 人",
      "丁市 26萬5000 人"
    ],
    "answer": 1,
    "option_tags": [
      "rank-from-small",
      "ok",
      "rank-largest",
      "wan-group-misread"
    ],
    "option_why": [
      "這是由少到多排的第 2 個。",
      "",
      "乙市 265萬3000 人最多，排第 1。",
      "26萬5000 只有六位數，是最少的。"
    ],
    "hints": [
      "第1層：先把「萬」的寫法都改成數字。",
      "第2層：265萬3000＝2653000，26萬5000＝265000。",
      "第3層：由多到少排好，數到第 2 個。"
    ],
    "explanation": "2653000（乙）＞2650000（甲）＞2563000（丙）＞265000（丁），排第 2 的是甲市。",
    "variant_group": "MA4-01-order",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-317",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-digitcards",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "阿咕拿出 5 張數字卡：4、0、7、2、5。",
    "stem": "用這 5 張卡排出最大的五位數，是多少？",
    "options": [
      "75420",
      "20457",
      "75402",
      "57420"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "make-smallest",
      "sort-slip",
      "sort-slip"
    ],
    "option_why": [
      "",
      "這是最小的五位數，題目要最大的。",
      "0 最小，要放在最後一位。",
      "7 比 5 大，7 要放在最高位。"
    ],
    "hints": [
      "第1層：最高位放哪一張卡，數會最大？",
      "第2層：從大到小，一張一張往右放。",
      "第3層：7、5、4、2、0。"
    ],
    "explanation": "數字從大到小排：7、5、4、2、0，最大的五位數是 75420。",
    "variant_group": "MA4-01-digitcards",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-318",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-digitcards",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕拿出 5 張數字卡：6、2、0、5、9。",
    "stem": "排出比 50000 大的五位數，最小是多少？",
    "options": [
      "20569",
      "59620",
      "50269",
      "60259"
    ],
    "answer": 2,
    "option_tags": [
      "condition-ignore",
      "max-instead-of-min",
      "ok",
      "boundary-strict"
    ],
    "option_why": [
      "20569 比 50000 小，不合條件。",
      "59620 也比 50000 大，但不是最小的。",
      "",
      "萬位放 5 就能比 50000 大，不用放 6。"
    ],
    "hints": [
      "第1層：萬位放哪一張卡，才會比 50000 大？",
      "第2層：萬位放 5，就比 50000 大了嗎？",
      "第3層：萬位放 5，剩下的卡從小排到大。"
    ],
    "explanation": "萬位放 5，剩下 0、2、6、9 從小排到大，得到 50269，比 50000 大，而且最小。",
    "variant_group": "MA4-01-digitcards",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-319",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-digitcards",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "怪盜的密碼：用 0、4、7、1、0、3 排出最大和最小的六位數。",
    "stem": "最大的六位數比最小的六位數多多少？",
    "options": [
      "741753",
      "643247",
      "843447",
      "642753"
    ],
    "answer": 3,
    "option_tags": [
      "leading-zero",
      "borrow-reverse",
      "op-swap",
      "ok"
    ],
    "option_why": [
      "最高位不能是 0，最小的六位數要從 1 開始。",
      "上面的數字比較小時，要向前一位借 1。",
      "問多多少要用減法，不是加法。",
      ""
    ],
    "hints": [
      "第1層：最大的六位數是多少？",
      "第2層：最小的六位數，最高位可以放 0 嗎？",
      "第3層：743100－100347，用直式算。"
    ],
    "explanation": "最大 743100，最小 100347（最高位不能是 0）。743100－100347＝642753。",
    "variant_group": "MA4-01-digitcards",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-320",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-inverse",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "阿咕用加法和減法互相檢查。",
    "stem": "□＋34 萬＝80 萬，□ 是多少？",
    "options": [
      "114 萬",
      "46 萬",
      "54 萬",
      "46"
    ],
    "answer": 1,
    "option_tags": [
      "op-swap",
      "ok",
      "borrow-reverse",
      "wan-unit-drop"
    ],
    "option_why": [
      "要找 □，用 80 萬減 34 萬。",
      "",
      "0 減 4 不夠減，要向十位借 1。",
      "80 萬減 34 萬，答案也要寫「萬」。"
    ],
    "hints": [
      "第1層：□ 加 34 萬是 80 萬，要怎麼找回 □？",
      "第2層：算 80－34，答案再加上「萬」。",
      "第3層：個位 0 減 4 不夠減，要借位。"
    ],
    "explanation": "□＝80 萬－34 萬＝46 萬。驗算：46 萬＋34 萬＝80 萬。",
    "variant_group": "MA4-01-inverse",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-321",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-inverse",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "怪盜的存款被領走 250 萬元，還剩 470 萬元。（虛構數字）",
    "stem": "原本有多少萬元？",
    "options": [
      "220 萬",
      "620 萬",
      "720 萬",
      "720"
    ],
    "answer": 2,
    "option_tags": [
      "op-swap",
      "carry-forget",
      "ok",
      "wan-unit-drop"
    ],
    "option_why": [
      "領走以後才剩 470 萬，原本比較多，要用加法。",
      "7＋5＝12 要進 1 到百位。",
      "",
      "250 萬加 470 萬，答案也要寫「萬」。"
    ],
    "hints": [
      "第1層：原本的錢比 470 萬多還是少？",
      "第2層：剩下的加上領走的，就是原本的。",
      "第3層：470＋250，十位 7＋5 要進位。"
    ],
    "explanation": "原本＝470 萬＋250 萬＝720 萬。驗算：720 萬－250 萬＝470 萬。",
    "variant_group": "MA4-01-inverse",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-322",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-inverse",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "阿咕算好一題減法，想用另一個算式檢查答案。",
    "stem": "6305000－2870000＝3435000，要用哪個算式驗算？",
    "options": [
      "3435000＋2870000",
      "6305000＋2870000",
      "3435000－2870000",
      "2870000－3435000"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "check-add-wrong",
      "check-wrong-op",
      "order-reverse"
    ],
    "option_why": [
      "",
      "要用答案 3435000 去加 2870000。",
      "答案再減 2870000，不會回到 6305000。",
      "2870000 比 3435000 小，不夠減。"
    ],
    "hints": [
      "第1層：減法的答案，加回減掉的數會變成什麼？",
      "第2層：3435000 加上 2870000，要等於哪個數？",
      "第3層：算出來是 6305000，就驗算成功。"
    ],
    "explanation": "用加法驗算減法：3435000＋2870000＝6305000，回到原來的數，答案正確。",
    "variant_group": "MA4-01-inverse",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-323",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-multistep",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 1,
    "type": "choice",
    "scene": "博覽會門票印了 50 萬張，賣出 20 萬張後，又加印 10 萬張。（虛構數字）",
    "stem": "現在門票有幾萬張？",
    "options": [
      "20 萬張",
      "80 萬張",
      "30 萬張",
      "40 萬張"
    ],
    "answer": 3,
    "option_tags": [
      "op-swap-second",
      "all-add",
      "skip-step",
      "ok"
    ],
    "option_why": [
      "加印是變多，要加 10 萬，不是減。",
      "賣出是變少，要減 20 萬，不是加。",
      "還有加印的 10 萬張要加進去。",
      ""
    ],
    "hints": [
      "第1層：賣出以後，門票變多還是變少？",
      "第2層：50 萬－20 萬＝？",
      "第3層：再加上加印的 10 萬張。"
    ],
    "explanation": "50 萬－20 萬＝30 萬，30 萬＋10 萬＝40 萬張。",
    "variant_group": "MA4-01-multistep",
    "exp": 10,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-324",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-multistep",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "捷運甲站一個月 128 萬人次，乙站比甲站少 35 萬人次。（虛構數字）",
    "stem": "兩站一共幾萬人次？",
    "options": [
      "93 萬",
      "221 萬",
      "291 萬",
      "163 萬"
    ],
    "answer": 1,
    "option_tags": [
      "skip-step",
      "ok",
      "op-swap",
      "add-direct"
    ],
    "option_why": [
      "93 萬只是乙站，還要加上甲站。",
      "",
      "乙站比甲站少，乙站要用減法算。",
      "35 萬是兩站差多少，不是乙站人次。"
    ],
    "hints": [
      "第1層：乙站有多少人次？",
      "第2層：乙站＝128 萬－35 萬。",
      "第3層：再把甲站和乙站加起來。"
    ],
    "explanation": "乙站：128 萬－35 萬＝93 萬；兩站：128 萬＋93 萬＝221 萬人次。",
    "variant_group": "MA4-01-multistep",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-325",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-multistep",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "博覽會目標 1000 萬人次，上半年來了 386 萬，下半年來了 427 萬。（虛構數字）",
    "stem": "離目標還差幾萬人次？",
    "options": [
      "297 萬",
      "614 萬",
      "187 萬",
      "813 萬"
    ],
    "answer": 2,
    "option_tags": [
      "borrow-zero-chain",
      "skip-step",
      "ok",
      "sum-only"
    ],
    "option_why": [
      "連續借位時，中間的 0 借完會變 9，不是 10。",
      "下半年的 427 萬也要減掉。",
      "",
      "813 萬是來的人次，還要和 1000 萬比。"
    ],
    "hints": [
      "第1層：一整年來了多少萬人次？",
      "第2層：386 萬＋427 萬＝？",
      "第3層：再用 1000 萬去減。"
    ],
    "explanation": "386 萬＋427 萬＝813 萬；1000 萬－813 萬＝187 萬人次。",
    "variant_group": "MA4-01-multistep",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-326",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-bignum-multistep",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-3 大數的大小比較與加減（同主題原創題，非課本題）",
    "level": 4,
    "type": "choice",
    "scene": "三個展館的參觀人次：A 館 245 萬，B 館比 A 館多 58 萬。（虛構數字）",
    "stem": "B 館又比 C 館少 76 萬，C 館有幾萬人次？",
    "options": [
      "379 萬",
      "227 萬",
      "303 萬",
      "263 萬"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "keyword-trap",
      "skip-step",
      "keyword-trap"
    ],
    "option_why": [
      "",
      "B 館比 C 館少，表示 C 館比較多，要用加法。",
      "303 萬是 B 館，還要再算出 C 館。",
      "B 館比 A 館多，B 館要用加法算。"
    ],
    "hints": [
      "第1層：先算 B 館有多少人次。",
      "第2層：B 館比 C 館少，C 館比 B 館多還是少？",
      "第3層：C 館＝B 館＋76 萬。"
    ],
    "explanation": "B 館：245 萬＋58 萬＝303 萬；C 館比 B 館多 76 萬：303 萬＋76 萬＝379 萬人次。",
    "variant_group": "MA4-01-multistep",
    "exp": 50,
    "tts_lang": "zh-TW",
    "fictional_numbers": true,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "MA-4A-01-901",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-beyond-yi",
    "beyond_curriculum": true,
    "beyond_note": "邊界：N-4-1 位值單位只列到千萬，課綱說明「教學可進行到一億」；「億」當位值單位、億與萬的換算屬邊界，先由賢者教「10 個千萬＝1 億」再測。",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（延伸原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "賢者在黑板上寫：10 個千萬＝1 億。",
    "stem": "1 億裡面有幾個一萬？",
    "options": [
      "100 個",
      "1000 個",
      "10000 個",
      "100000 個"
    ],
    "answer": 2,
    "option_tags": [
      "unit-confuse",
      "zero-count-less",
      "ok",
      "unit-confuse"
    ],
    "option_why": [
      "100 個百萬才是 1 億，這裡問的是一萬。",
      "1000 個一萬只有 1000 萬。",
      "",
      "100000 個一千才是 1 億，這裡問一萬。"
    ],
    "hints": [
      "第1層：1 個千萬是幾個一萬？",
      "第2層：1 個千萬＝1000 個一萬。",
      "第3層：1 億是 10 個千萬，就是幾個 1000 個一萬？"
    ],
    "explanation": "1 千萬＝1000 個一萬，1 億＝10 個千萬＝10000 個一萬（萬萬為億）。",
    "variant_group": "MA4-01-beyond-yi",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_MA_YI"
  },
  {
    "id": "MA-4A-01-902",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1012,
    "curriculum_code": "數學:N-4-1",
    "concept": "MA4-beyond-yi",
    "beyond_curriculum": true,
    "beyond_note": "邊界：「億位」是第 9 位，N-4-1 位值單位沒有列「億」；賢者先教「99999999 再多 1 是 1 億」再測。",
    "source_ref": "翰林 四上 數學 第1單元〈一億以內的數〉1-2 一億以內的數（延伸原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "賢者：「99999999 再多 1，就是 1 億，寫成 100000000。」",
    "stem": "100000000 是幾位數？",
    "options": [
      "8 位數",
      "10 位數",
      "7 位數",
      "9 位數"
    ],
    "answer": 3,
    "option_tags": [
      "zero-count-only",
      "zero-count-more",
      "zero-count-less",
      "ok"
    ],
    "option_why": [
      "8 是 0 的個數，前面的 1 也要算一位。",
      "一個一個數，只有 9 個數字。",
      "一個一個數，有 9 個數字，不是 7 個。",
      ""
    ],
    "hints": [
      "第1層：千萬是幾位數？",
      "第2層：1 億比千萬多一位嗎？",
      "第3層：把 1 和後面的 0 一起數。"
    ],
    "explanation": "100000000 有 1 個 1 和 8 個 0，一共 9 位數；最左邊的 1 在億位。",
    "variant_group": "MA4-01-beyond-yi",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_MA_YI"
  },
  {
    "id": "MA-4A-01-903",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-4",
    "concept": "MA4-beyond-round",
    "beyond_curriculum": true,
    "beyond_note": "跨單元：取概數是課綱 N-4-4（四年級，但不在本單元 N-4-1）；翰林版放在哪一冊哪一單元待查證。賢者先教「看下一位：0～4 捨去，5～9 進 1」再測。",
    "source_ref": "課綱 N-4-4 解題：對大數取概數（延伸原創題，非課本題）",
    "level": 2,
    "type": "choice",
    "scene": "賢者：「取到萬位，就看千位：0～4 捨去，5～9 進 1。」",
    "stem": "36580 用四捨五入法取到萬位，大約是多少？",
    "options": [
      "30000",
      "40000",
      "37000",
      "36000"
    ],
    "answer": 1,
    "option_tags": [
      "round-down-always",
      "ok",
      "round-wrong-place",
      "round-down-wrong-place"
    ],
    "option_why": [
      "千位是 6，5～9 要進 1 到萬位。",
      "",
      "題目要取到萬位，不是千位。",
      "取到萬位，萬位以下都要變 0。"
    ],
    "hints": [
      "第1層：取到萬位，要看哪一位？",
      "第2層：36580 的千位是幾？",
      "第3層：6 在 5～9 之間，萬位要進 1。"
    ],
    "explanation": "看千位 6，要進 1，萬位 3 變成 4，後面都變 0：36580 約是 40000。",
    "variant_group": "MA4-01-beyond-round",
    "exp": 20,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_MA_ROUND"
  },
  {
    "id": "MA-4A-01-904",
    "grade": 4,
    "subject": "數學",
    "publisher": "翰林",
    "term": "四上",
    "unit": "1 一億以內的數",
    "node": 1013,
    "curriculum_code": "數學:N-4-4",
    "concept": "MA4-beyond-round",
    "beyond_curriculum": true,
    "beyond_note": "跨單元：無條件進入法是課綱 N-4-4（四年級，但不在本單元 N-4-1）；翰林版位置待查證。賢者先教「不夠就要多拿一疊」再測。",
    "source_ref": "課綱 N-4-4 解題：對大數取概數（延伸原創題，非課本題）",
    "level": 3,
    "type": "choice",
    "scene": "千元鈔 100 張一疊是 10 萬元。賢者：「錢不夠，就要多拿一疊。」",
    "stem": "要付 23萬4000 元，用 10 萬元一疊付，至少要幾疊？",
    "options": [
      "2 疊",
      "24 疊",
      "3 疊",
      "23 疊"
    ],
    "answer": 2,
    "option_tags": [
      "round-down",
      "unit-confuse",
      "ok",
      "unit-confuse"
    ],
    "option_why": [
      "2 疊只有 20 萬元，不夠付。",
      "24 是萬的個數，一疊是 10 萬元。",
      "",
      "23 是萬的個數，一疊是 10 萬元。"
    ],
    "hints": [
      "第1層：2 疊是多少元？夠不夠？",
      "第2層：3 疊是多少元？夠不夠？",
      "第3層：不夠的那一點點，也要多拿一疊。"
    ],
    "explanation": "2 疊＝20 萬元不夠，3 疊＝30 萬元夠，所以至少要 3 疊（無條件進入）。",
    "variant_group": "MA4-01-beyond-round",
    "exp": 35,
    "tts_lang": "zh-TW",
    "fictional_numbers": false,
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_MA_ROUND"
  }
];

// ════════════════════════════════════════════════════════════════════
// 來源：成品匣 四年級版規劃/題庫草稿/science_4A_u01.js（52 題；檔頭說明照原檔，題目以 JSON 寫出）
// ════════════════════════════════════════════════════════════════════
// 四年級版學習 RPG — 自然 四上 一、閃亮的天空（翰林順序）題庫草稿
// 範圍：1-1 一天的天空（node 1011）、1-2 月亮的位置（node 1012）。1-3 月相的變化不出題。
// 出題：自然科學家教（A3），2026-10-19 初稿；同日第二版依新規格補題（每個節點至少 20 題、至少 6 個概念，L1、L2 各至少 4 題）。
// 全部原創，不照抄課本、習作；source_ref 只表示「同主題可回去複習的活動」。
//
// 課綱查證（查詢日期 2026-10-19）：
//   國家教育研究院《十二年國民基本教育課程綱要 國民中小學暨普通型高級中等學校—自然科學領域》（107 年 11 月）
//   PDF 下載自國教署：https://www.k12ea.gov.tw/files/class_schema/課綱/17-自然科學/17-1/十二年國民基本教育課程綱要國民中小學暨普通型高級中等學校─自然科學領域.pdf
//   頁碼一律用 PDF 上印的頁碼（和三年級審題紀錄同一套）：
//     INc-Ⅱ-1 條文 p.16、學習內容說明 1-1、1-2 p.103
//     INc-Ⅱ-4 條文 p.16、學習內容說明 4-1 p.105
//     INc-Ⅱ-10 條文 p.17、學習內容說明 10-1～10-4 p.107
//       10-1 觀察天空中天體每日東升西落的現象。
//       10-2 觀察月亮，了解月亮會東升西落以及盈虧變化（不涉及月相變化的原因）。
//       10-3 在觀察中能察覺夜空中星星有亮有暗，這是因為各個星星本身亮度或與我們的距離遠近不同所致。
//       10-4 觀察太陽，察覺太陽亦有東升西落的變化，但不可用肉眼直視觀測太陽。
//     超綱題用到的較高階段（第二版重新下載 PDF 抽字核對）：
//       INc-Ⅲ-13 條文 p.17「日出日落時間與位置，在不同季節會不同。」；說明 p.108
//         13-1 太陽是一顆恆星，會發出光與熱，因為距離地球很近，所以看起來很亮。
//         13-2 日出日落的時間與位置會隨季節而改變。
//       Id-Ⅳ-1 說明 1-1 p.157「說明地球自轉會造成晝夜交替現象。」
//       Fb-Ⅳ-4 p.153 月相變化具有規律性（課綱各階段都沒有直接寫「月亮反射太陽光」）
//   翰林活動內容（二手）：臺南市虎山實驗小學 112 學年度四年級自然領域課程計畫（翰林版），第 1～4 週
//     http://course.tn.edu.tw/course/112E虎山國小C5-1領域學習課程(調整)計畫普通班四年級自然0718105818.pdf
//   白天看得到月亮（二手）：第 56 屆中小學科展國小組地球科學科 080506〈揭開月姑娘白天神秘的面紗〉（新竹縣光明國小）結論
//     https://twsf.ntsec.gov.tw/activity/race-1/56/pdf/080506.pdf
//
// 老闆裁示（2026-10-19）：
//   1. 「超綱內容可簡化後由賢者教導學習再測試」→ 超綱題標 beyond_curriculum:true，附 teach（賢者教學，60 字內），
//      beyond_code 寫它真正屬於的較高階段代碼（課綱沒列就留空字串），beyond_note 說明屬於哪個階段。超綱題不算進每節點的 20 題。
//      超綱題：901 太陽也是星星、902 白天星星還在、903 日出位置隨季節改變、904 東升西落是因為地球在轉（簡化說法）、905 月亮反射太陽光。
//   2. 「8 方位移動是角色的移動方式，並非學習目標」→ 不出遊戲 8 方位的題；東北、西南等八方位詞與「斜走」由檢查程式擋下。
//   上次待查證的 010、011、112（面向某方位判斷左右手方位）：社會四上 1-1 只教地圖方向標，查不到翰林三、四年級社會有教
//      「面向東方、左北右南」，改為 beyond_curriculum:true（保留題號，附 teach），uses 拿掉 SO:1011。
//
// 仍刻意不出（算分題）：月相形狀與成因（1-3 未開放；10-2 明寫不涉及月相變化的原因）；影子方向（INe-Ⅱ-6，上4 才開放）；
//   指北針原理（INe-Ⅲ-9）；「月亮在南方天空最高」（台灣緯度下並非每次都成立）；任何度數（數學上3 角度未解鎖，超綱題也不出）。
//
// 欄位：沿用三年級版 questions.js，另加 grade、node、curriculum_code、curriculum_code_also、explain_status、
//   explain_page、explain_source、beyond_curriculum、concept、option_tags、option_why、variant_group、uses、image_prompt；
//   超綱題另有 beyond_code、beyond_note、teach。
//   option_tags／option_why 的長度和 options 相同；正解的 option_tags 是 "ok"、option_why 是 null。
//   type 是 order、number 的題目沒有干擾選項，option_tags／option_why 都是 null；number 題另有 wrong_why（常見錯答→回饋）。
//   explain_status：verified＝概念已對國教院原文的學習內容說明（附 explain_page）；secondary＝二手轉引或 A3 加註（附 explain_source）；pending＝待查證（本檔沒有）。
//   本檔資料區是合法 JSON（鍵都加引號），驗證程式 verify_science_u01.py 直接讀取。
window.QUESTIONS_G4_SCI_U01 = [
  {
    "id": "SC-4A-01-001",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 1,
    "type": "choice",
    "scene": "天文館解說員：「清晨在台北的河濱公園，可以看到太陽慢慢升起。」",
    "stem": "早上，太陽會從哪一個方位升起？",
    "options": [
      "西方",
      "南方",
      "東方",
      "北方"
    ],
    "answer": 2,
    "option_tags": [
      "rise-set-swap",
      "dir-south",
      "ok",
      "dir-north"
    ],
    "option_why": [
      "西方是傍晚太陽落下的方位，早上從東方升起。",
      "太陽是從東方升起，南方不是升起的方位。",
      null,
      "太陽是從東方升起，北方不是升起的方位。"
    ],
    "hints": [
      "第1層：題目問的是「早上」，不是傍晚。",
      "第2層：太陽早上升起和傍晚落下，是在相反的兩邊。",
      "第3層：記住「東升西落」，前面兩個字說的就是升起的方位。"
    ],
    "explanation": "太陽每天從東方升起、從西方落下，叫做「東升西落」。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-002",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「放學後，太陽越來越低，天空變成橘色了！」",
    "stem": "傍晚，太陽會往哪一個方位落下？",
    "options": [
      "東方",
      "西方",
      "北方",
      "南方"
    ],
    "answer": 1,
    "option_tags": [
      "rise-set-swap",
      "ok",
      "dir-north",
      "dir-south"
    ],
    "option_why": [
      "東方是太陽早上升起的方位，傍晚落在西方。",
      null,
      "太陽傍晚落在西方，不是北方。",
      "太陽傍晚落在西方，不是南方。"
    ],
    "hints": [
      "第1層：題目問的是「傍晚」太陽落下的地方。",
      "第2層：早上太陽從東方升起，傍晚會在另一邊。",
      "第3層：「東升西落」的後面兩個字，說的就是落下的方位。"
    ],
    "explanation": "太陽早上從東方升起，傍晚往西方落下。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-003",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4（不可用肉眼直視觀測太陽）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-safety",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「太陽好亮！我想盯著它看清楚一點。」",
    "stem": "觀察太陽時，哪一種做法是安全的？",
    "options": [
      "睜大眼睛盯著太陽看",
      "瞇著眼睛看太陽一下下",
      "不直視太陽，只看它在哪一邊",
      "看一下太陽，休息後再看"
    ],
    "answer": 2,
    "option_tags": [
      "sun-stare",
      "sun-squint-ok",
      "ok",
      "sun-short-look-ok"
    ],
    "option_why": [
      "直視太陽會傷眼睛，看方位就好，不要盯著看。",
      "瞇著眼睛還是在直視太陽，一樣會傷眼睛。",
      null,
      "就算只看一下，也是直視太陽，不可以。"
    ],
    "hints": [
      "第1層：題目問的是「安全」的做法。",
      "第2層：有三個選項，其實都是用眼睛直接看太陽。",
      "第3層：觀察太陽時，只要知道它在哪一個方位就夠了。"
    ],
    "explanation": "不可以用眼睛直視太陽，瞇著眼或只看一下下也不行。觀察時只要記下太陽在哪一個方位。",
    "image_prompt": null,
    "variant_group": "SC4-sun-safety",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-004",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-3",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-bright-dim",
    "level": 1,
    "type": "choice",
    "scene": "天文館解說員：「晴朗的晚上，跟家人一起抬頭看看星星吧。」",
    "stem": "晴朗的夜晚看星星，會發現星星怎麼樣？",
    "options": [
      "每一顆都一樣亮",
      "只有下雨天才看得到",
      "天上只有一顆",
      "有些比較亮，有些比較暗"
    ],
    "answer": 3,
    "option_tags": [
      "star-same-bright",
      "star-rain",
      "star-only-one",
      "ok"
    ],
    "option_why": [
      "仔細比一比，星星有的亮、有的暗，不一樣。",
      "下雨天雲很多，反而不容易看到星星。",
      "晴朗的夜晚，通常不只看到一顆星星。",
      null
    ],
    "hints": [
      "第1層：找兩顆星星比一比。",
      "第2層：有的星星一眼就看到，有的要很仔細才看得到。",
      "第3層：一眼就看到的，是比較亮的星星。"
    ],
    "explanation": "夜空中的星星有些比較亮、有些比較暗。",
    "image_prompt": null,
    "variant_group": "SC4-star-bright",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-005",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-3（星星本身亮度或與我們的距離遠近不同）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-bright-reason",
    "level": 3,
    "type": "choice",
    "scene": "阿咕：「為什麼有的星星好亮，有的卻暗暗的？」",
    "stem": "夜空中的星星看起來有亮有暗，主要是因為什麼？",
    "options": [
      "星星本身有多亮不同，離我們也有遠有近",
      "亮的星星一定離我們比較近",
      "暗的星星都快要熄滅了",
      "大家看到的都一樣亮，是眼睛看錯了"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "bright-means-near",
      "dim-means-dying",
      "eye-wrong"
    ],
    "option_why": [
      null,
      "看起來多亮，還要看星星本身亮不亮，不只看遠近。",
      "暗暗的星星不是快熄滅，而是本身較暗或比較遠。",
      "星星真的有亮有暗，不是眼睛看錯。"
    ],
    "hints": [
      "第1層：想想看，同一盞燈放近一點、放遠一點，看起來一樣亮嗎？",
      "第2層：除了遠近，每顆星星本身也不一樣。",
      "第3層：找一個同時說到「星星本身」和「遠近」的選項。"
    ],
    "explanation": "星星看起來有亮有暗，是因為每顆星星本身有多亮不一樣，離我們的遠近也不一樣。",
    "image_prompt": null,
    "variant_group": "SC4-star-bright",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-006",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-1、10-2、10-3",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sky-objects-night",
    "level": 2,
    "type": "multi",
    "scene": "阿咕：「晚上的天空黑黑的，可是好像有東西在發亮！」",
    "stem": "晴朗的晚上，天空中可能看得到哪些天體？（可以選不只一個）",
    "options": [
      "星星",
      "太陽",
      "月亮",
      "飛機"
    ],
    "answer": [
      0,
      2
    ],
    "option_tags": [
      "ok",
      "sun-at-night",
      "ok",
      "not-celestial"
    ],
    "option_why": [
      null,
      "晚上太陽已經從西方落下，看不到了。",
      null,
      "飛機是人做的，在空中飛，不是天體。"
    ],
    "hints": [
      "第1層：一個一個想，晚上抬頭真的看得到嗎？",
      "第2層：太陽傍晚已經落下了。",
      "第3層：天體是太空中的東西，不是人做出來的。"
    ],
    "explanation": "晚上可能看到月亮和星星；太陽已經落下；飛機是人做的，不是天體。",
    "image_prompt": null,
    "variant_group": "SC4-sky-objects",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-007",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "課綱 10-2 只寫「觀察月亮，了解月亮會東升西落」，沒有直接寫白天；白天看得到月亮依第56屆科展國小組地球科學科 080506〈揭開月姑娘白天神秘的面紗〉結論（文中也引述翰林版教師手冊第24頁談白天看月亮），查詢 2026-10-19",
    "beyond_curriculum": false,
    "concept": "SC4-moon-daytime",
    "level": 2,
    "type": "choice",
    "scene": "阿咕：「下午放學時，我好像在天空看到月亮！是看錯了嗎？」",
    "stem": "下午在天空看到月亮，哪一個說法正確？",
    "options": [
      "一定看錯了，月亮只在晚上出現",
      "那是太陽變暗了",
      "月亮白天會變成雲",
      "白天有時候也看得到月亮"
    ],
    "answer": 3,
    "option_tags": [
      "moon-night-only",
      "moon-is-sun",
      "moon-becomes-cloud",
      "ok"
    ],
    "option_why": [
      "月亮不是只在晚上出現，白天有時也看得到。",
      "太陽和月亮是兩個不同的天體。",
      "月亮不會變成雲；白天看到的就是月亮。",
      null
    ],
    "hints": [
      "第1層：你自己有沒有在白天的天空，看過淡淡的月亮？",
      "第2層：月亮出現在天空的時間，不一定都是晚上。",
      "第3層：找一個說「白天也可能看到月亮」的選項。"
    ],
    "explanation": "月亮不是只在晚上才有，白天有時候也看得到，只是看起來比較淡。",
    "image_prompt": null,
    "variant_group": "SC4-moon-daytime",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-008",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-1（天空中天體每日東升西落）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-east-west",
    "level": 3,
    "type": "choice",
    "scene": "天文館解說員：「星星也會在天空中慢慢移動喔，回家跟家人一起找找看。」",
    "stem": "晚上8點，東方低空有一顆亮星，過3小時它最可能在哪？",
    "options": [
      "往下沉回東方的地面下",
      "還停在原來的位置",
      "比較高，而且往西邊移過去",
      "跑到北方的低空"
    ],
    "answer": 2,
    "option_tags": [
      "rise-reverse",
      "sky-static",
      "ok",
      "dir-north"
    ],
    "option_why": [
      "從東方升起後會越升越高，不會沉回東方。",
      "天體在天空中會慢慢移動，不會一直停著。",
      null,
      "星星大致由東往西移，不會跑到北方低空。"
    ],
    "hints": [
      "第1層：星星也是天體，想想天體在天空怎麼移動。",
      "第2層：剛從東方升起的天體，接下來會越來越高，還是越來越低？",
      "第3層：東升西落：升起後會變高，再慢慢往西邊移。"
    ],
    "explanation": "星星和太陽、月亮一樣東升西落。東方低空的星星，幾小時後會升高，並往西邊移。",
    "image_prompt": null,
    "variant_group": "SC4-star-eastwest",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-009",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-4"
    ],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4；p.105 學習內容說明 4-1",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 2,
    "type": "choice",
    "scene": "小安在家裡的頂樓說：「每天早上，太陽都從對面那棟大樓後面升起。」",
    "stem": "太陽早上從大樓後面升起，大樓在小安家的哪個方位？",
    "options": [
      "西方",
      "北方",
      "南方",
      "東方"
    ],
    "answer": 3,
    "option_tags": [
      "rise-set-swap",
      "dir-north",
      "dir-south",
      "ok"
    ],
    "option_why": [
      "早上太陽從東方升起，所以大樓在東方。",
      "太陽不是從北方升起，大樓應在東方。",
      "太陽不是從南方升起，大樓應在東方。",
      null
    ],
    "hints": [
      "第1層：題目說的是「早上」太陽升起的地方。",
      "第2層：太陽從哪個方位升起，大樓就在那個方位。",
      "第3層：想想「東升西落」。"
    ],
    "explanation": "太陽早上從東方升起。從小安家看，大樓在太陽升起的那一邊，所以大樓在東方。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-010",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-4",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "東升西落依 10-2、10-4（p.107，已對原文）；面向某方位時判斷前後左右手的方位：社會四上 1-1 只教地圖的方向標（A1 social_4A_u01.js 檔頭註記：社會領綱第二學習階段沒有一條直接寫方位）；2026-10-19 搜尋翰林三、四年級社會課程資料，查不到有教「面向東方、左北右南」，依老闆 2026-10-19 裁示改為超綱、由賢者教學後再測試",
    "beyond_curriculum": true,
    "beyond_code": "",
    "beyond_note": "社會課查不到有教面向判斷左右手方位",
    "teach": "面向東方站好：前面是東，背後是西，左手邊是北，右手邊是南。口訣是「前東後西，左北右南」。",
    "concept": "SC4-X-face-direction",
    "level": 3,
    "type": "choice",
    "scene": "阿咕：「面向早上太陽升起的那一邊站好，記得別盯著太陽看！」",
    "stem": "面向太陽升起的方位站好，背後是哪一個方位？",
    "options": [
      "東方",
      "西方",
      "南方",
      "北方"
    ],
    "answer": 1,
    "option_tags": [
      "face-back-swap",
      "ok",
      "lr-confuse",
      "lr-confuse"
    ],
    "option_why": [
      "前面才是東方；背後是相反的西方。",
      null,
      "南方在你的右手邊，背後是西方。",
      "北方在你的左手邊，背後是西方。"
    ],
    "hints": [
      "第1層：太陽從哪個方位升起？你就是面向那裡。",
      "第2層：背後的方位，和前面的方位剛好相反。",
      "第3層：東的相反是哪一個方位？"
    ],
    "explanation": "太陽從東方升起。面向東方時，背後是西方，左手邊是北方，右手邊是南方。",
    "image_prompt": null,
    "variant_group": "SC4-direction-by-sun",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_FACE"
  },
  {
    "id": "SC-4A-01-011",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-4",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "東升西落依 10-2、10-4（p.107，已對原文）；面向某方位時判斷前後左右手的方位：社會四上 1-1 只教地圖的方向標（A1 social_4A_u01.js 檔頭註記：社會領綱第二學習階段沒有一條直接寫方位）；2026-10-19 搜尋翰林三、四年級社會課程資料，查不到有教「面向東方、左北右南」，依老闆 2026-10-19 裁示改為超綱、由賢者教學後再測試",
    "beyond_curriculum": true,
    "beyond_code": "",
    "beyond_note": "社會課查不到有教面向判斷左右手方位",
    "teach": "太陽在西方落下。面向南方時，右手邊剛好是西方；所以太陽在右手邊落下，就是面向南方。",
    "concept": "SC4-X-face-direction",
    "level": 4,
    "type": "choice",
    "scene": "小安傍晚站在河濱公園，太陽正往他的右手邊落下。",
    "stem": "傍晚太陽在小安右手邊落下，小安面向哪個方位？",
    "options": [
      "北方",
      "東方",
      "西方",
      "南方"
    ],
    "answer": 3,
    "option_tags": [
      "lr-confuse",
      "back-sun",
      "face-sun",
      "ok"
    ],
    "option_why": [
      "面向北方時，右手邊是東方，太陽不會在那裡落下。",
      "面向東方時，西方在背後，不在右手邊。",
      "面向西方時，太陽在前面，不在右手邊。",
      null
    ],
    "hints": [
      "第1層：太陽傍晚從哪個方位落下？",
      "第2層：所以小安的右手邊是西方。",
      "第3層：面向哪個方位時，右手邊剛好是西方？可以站起來轉轉看。"
    ],
    "explanation": "太陽在西方落下。面向南方時，右手邊是西方，所以小安面向南方。",
    "image_prompt": null,
    "variant_group": "SC4-direction-by-sun",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_FACE"
  },
  {
    "id": "SC-4A-01-012",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-1、10-2、10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sky-east-west",
    "level": 3,
    "type": "multi",
    "scene": "天文館解說員：「天空中的天體，都有東升西落的現象。」",
    "stem": "哪些是天體東升西落的例子？（可以選不只一個）",
    "options": [
      "太陽早上在東方，傍晚在西方",
      "月亮從東方升起，後來往西方移",
      "風把雲從西邊吹到東邊",
      "東方低空的星星，後來升高往西移"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "option_tags": [
      "ok",
      "ok",
      "cloud-not-celestial",
      "ok"
    ],
    "option_why": [
      null,
      null,
      "雲不是天體，雲的移動是風吹的。",
      null
    ],
    "hints": [
      "第1層：先看每個選項說的是不是天體。",
      "第2層：太陽、月亮、星星是天體；雲不是。",
      "第3層：再看天體是不是從東邊往西邊移動。"
    ],
    "explanation": "太陽、月亮、星星都會東升西落；雲不是天體，雲的移動是風吹的。",
    "image_prompt": null,
    "variant_group": "SC4-sky-eastwest",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-013",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 2,
    "type": "order",
    "scene": "阿咕：「我們把太陽一天的旅程排好吧！」",
    "stem": "把太陽一天中的位置，依照時間先後排好。",
    "options": [
      "高高掛在天空中",
      "從西方落下",
      "從東方升起"
    ],
    "answer": [
      2,
      0,
      1
    ],
    "option_tags": null,
    "option_why": null,
    "hints": [
      "第1層：一天從早上開始。",
      "第2層：早上太陽從哪裡出來？",
      "第3層：先升起，再升高，最後落下。"
    ],
    "explanation": "太陽早上從東方升起，中午前後高高掛在天空，傍晚從西方落下。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-014",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4（不可用肉眼直視觀測太陽）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-safety",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「我戴了太陽眼鏡，是不是就可以一直看太陽了？」",
    "stem": "戴上太陽眼鏡，可以直視太陽嗎？",
    "options": [
      "可以，戴了就很安全",
      "可以，只要看一下下",
      "可以，隔著窗戶玻璃看",
      "不可以，還是會傷眼睛"
    ],
    "answer": 3,
    "option_tags": [
      "sunglasses-ok",
      "sun-short-look-ok",
      "glass-ok",
      "ok"
    ],
    "option_why": [
      "太陽眼鏡擋不住直視太陽的傷害，不可以看。",
      "只看一下下也是直視太陽，一樣會傷眼睛。",
      "窗戶玻璃擋不住，隔著玻璃也不可以看。",
      null
    ],
    "hints": [
      "第1層：太陽的光非常強。",
      "第2層：一般的太陽眼鏡，不是用來看太陽的。",
      "第3層：觀察太陽時，只要知道它在哪一邊就好。"
    ],
    "explanation": "不可以用眼睛直視太陽，戴太陽眼鏡、隔著玻璃或只看一下下都不行。觀察時只要記下太陽在哪一個方位。",
    "image_prompt": null,
    "variant_group": "SC4-sun-safety",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-015",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「中午吃飯的時候，太陽跑到哪裡去了？」",
    "stem": "中午前後，太陽大約在天空的哪裡？",
    "options": [
      "高高的天空中",
      "東方的低空",
      "西方的地面下",
      "北方的地面下"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "noon-still-east",
      "noon-set",
      "dir-north"
    ],
    "option_why": [
      null,
      "東方低空是早上剛升起的位置，中午已經升高。",
      "太陽傍晚才在西方落下，中午還在天空中。",
      "太陽中午還在天空中，不會在地面下。"
    ],
    "hints": [
      "第1層：早上太陽剛從東方升起。",
      "第2層：太陽升起後會越來越高。",
      "第3層：傍晚才落下，中午正是很高的時候。"
    ],
    "explanation": "太陽早上從東方升起，越升越高，中午前後高高掛在天空中，傍晚再往西方落下。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-016",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sky-objects-day",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「白天抬頭，天空一片亮亮的。」",
    "stem": "白天的天空中，最亮的天體是哪一個？",
    "options": [
      "星星",
      "太陽",
      "飛機",
      "雲"
    ],
    "answer": 1,
    "option_tags": [
      "star-day",
      "ok",
      "not-celestial",
      "cloud-not-celestial"
    ],
    "option_why": [
      "白天通常看不到星星，最亮的是太陽。",
      null,
      "飛機是人做的，不是天體。",
      "雲在空中，但它不是天體。"
    ],
    "hints": [
      "第1層：天體是太空中的東西，不是人做的。",
      "第2層：白天讓天空變亮的是誰？",
      "第3層：記得，不可以直視它。"
    ],
    "explanation": "白天天空中最亮的天體是太陽，觀察時不可以直視。飛機和雲都不是天體。",
    "image_prompt": null,
    "variant_group": "SC4-sky-objects",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-017",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-3",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-record",
    "level": 2,
    "type": "choice",
    "scene": "阿咕畫星空圖：亮的星星畫大點，暗的星星畫小點。",
    "stem": "阿咕用大點、小點畫星星，是在記錄星星的什麼？",
    "options": [
      "星星的顏色",
      "星星會不會動",
      "星星的亮暗",
      "星星的形狀"
    ],
    "answer": 2,
    "option_tags": [
      "record-color",
      "record-move",
      "ok",
      "record-shape"
    ],
    "option_why": [
      "大點小點表示亮暗，不是顏色。",
      "只畫一次看不出會不會動，要隔一段時間再畫。",
      null,
      "星星看起來都是小亮點，大小點不是畫形狀。"
    ],
    "hints": [
      "第1層：再讀一次題目：什麼樣的星星畫大點？",
      "第2層：亮的畫大點，暗的畫小點。",
      "第3層：大點、小點分的是星星亮不亮。"
    ],
    "explanation": "用大點表示亮星、小點表示暗星，就是在記錄星星有亮有暗。",
    "image_prompt": null,
    "variant_group": "SC4-star-bright",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-018",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-1（天空中天體每日東升西落）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-east-west",
    "level": 3,
    "type": "choice",
    "scene": "天文館解說員：「西方低空那顆亮星，等一下會跑去哪裡呢？」",
    "stem": "晚上9點，西方低空有一顆亮星，1小時後最可能怎樣？",
    "options": [
      "更低，快要落到西方地面下",
      "升得更高",
      "移回東方的低空",
      "停在原來的位置"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "rise-in-west",
      "rise-reverse",
      "sky-static"
    ],
    "option_why": [
      null,
      "在西方低空的星星，接下來會越來越低。",
      "天體由東往西移，不會往回移到東方。",
      "天體在天空中會慢慢移動，不會一直停著。"
    ],
    "hints": [
      "第1層：星星也會東升西落。",
      "第2層：已經在西方低空，是剛升起，還是快落下？",
      "第3層：快落下的天體，接下來會更高還是更低？"
    ],
    "explanation": "星星東升西落。在西方低空的星星快要落下了，1小時後會更低，甚至落到西方地面下。",
    "image_prompt": null,
    "variant_group": "SC4-star-eastwest",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-019",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-1",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-east-west",
    "level": 2,
    "type": "order",
    "scene": "阿咕：「東方剛升起一顆亮星，我要整晚追蹤它！」",
    "stem": "把這顆亮星一晚中的位置，依照時間先後排好。",
    "options": [
      "西方的低空",
      "東方的低空",
      "高高的天空中"
    ],
    "answer": [
      1,
      2,
      0
    ],
    "option_tags": null,
    "option_why": null,
    "hints": [
      "第1層：它是從哪裡升起的？",
      "第2層：升起後會越來越高。",
      "第3層：最後往西方落下。"
    ],
    "explanation": "星星和太陽一樣東升西落：先在東方低空，再升到高高的天空中，最後到西方的低空。",
    "image_prompt": null,
    "variant_group": "SC4-star-eastwest",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-020",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 2,
    "type": "choice",
    "scene": "阿咕：「放學了！太陽已經在西方的低空了。」",
    "stem": "太陽在西方低空，再過一會兒會怎樣？",
    "options": [
      "升高回到天空中間",
      "移到東方升起",
      "停在原地不動",
      "落到西方地面下"
    ],
    "answer": 3,
    "option_tags": [
      "rise-in-west",
      "rise-set-swap",
      "sky-static",
      "ok"
    ],
    "option_why": [
      "在西方低空的太陽會越來越低，不會再升高。",
      "太陽傍晚是往西方落下，不是到東方。",
      "太陽會慢慢移動，不會停住。",
      null
    ],
    "hints": [
      "第1層：太陽在傍晚是升起還是落下？",
      "第2層：「東升西落」，西方是落下的地方。",
      "第3層：快落下的太陽會越來越低。"
    ],
    "explanation": "太陽傍晚在西方低空，接下來會越來越低，最後落到西方地面下，天色就暗了。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-021",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "課綱 10-2 只寫「觀察月亮，了解月亮會東升西落」，沒有直接寫白天；白天看得到月亮依第56屆科展國小組地球科學科 080506〈揭開月姑娘白天神秘的面紗〉結論（文中也引述翰林版教師手冊第24頁談白天看月亮），查詢 2026-10-19",
    "beyond_curriculum": false,
    "concept": "SC4-sky-objects-day",
    "level": 2,
    "type": "multi",
    "scene": "天文館解說員：「白天抬頭看天空，也可能看到不只一種天體喔。」",
    "stem": "白天的天空中，可能看得到哪些天體？（可以選不只一個）",
    "options": [
      "太陽",
      "月亮",
      "風箏",
      "彩虹"
    ],
    "answer": [
      0,
      1
    ],
    "option_tags": [
      "ok",
      "ok",
      "not-celestial",
      "rainbow-not-celestial"
    ],
    "option_why": [
      null,
      null,
      "風箏是人做的，在空中飛，不是天體。",
      "彩虹出現在空中，但它不是天體。"
    ],
    "hints": [
      "第1層：天體是太空中的東西，不是人做的。",
      "第2層：想想看，下午有沒有可能看到月亮？",
      "第3層：風箏是人做的；彩虹一下就消失，也不是天體。"
    ],
    "explanation": "白天看得到太陽，有時候也看得到月亮。風箏是人做的，彩虹也不是天體。",
    "image_prompt": null,
    "variant_group": "SC4-sky-objects",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-022",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-3（星星本身亮度或與我們的距離遠近不同）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-bright-reason",
    "level": 3,
    "type": "choice",
    "scene": "天文館解說員：「假如有兩顆本身一樣亮的星星，一顆近、一顆遠……」",
    "stem": "兩顆星本身一樣亮，一顆近一顆遠，哪顆看起來比較亮？",
    "options": [
      "遠的那顆",
      "近的那顆",
      "看起來一樣亮",
      "沒辦法知道"
    ],
    "answer": 1,
    "option_tags": [
      "far-brighter",
      "ok",
      "distance-no-effect",
      "cant-compare"
    ],
    "option_why": [
      "離得越遠，看起來會越暗。",
      null,
      "遠近不同，看起來的亮暗也不同。",
      "本身一樣亮時，比遠近就知道哪顆亮。"
    ],
    "hints": [
      "第1層：想想同一支手電筒，放近和放遠有什麼不同？",
      "第2層：同樣亮的光，離你越遠，看起來越暗。",
      "第3層：兩顆本身一樣亮，就只要比遠近。"
    ],
    "explanation": "兩顆星星本身一樣亮時，離我們近的看起來比較亮，遠的看起來比較暗。",
    "image_prompt": null,
    "variant_group": "SC4-star-bright",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-023",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-3（星星本身亮度或與我們的距離遠近不同）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-star-bright-reason",
    "level": 4,
    "type": "choice",
    "scene": "阿咕：「那顆星星好暗，它一定離我們超級遠吧！」",
    "stem": "看起來比較暗的星星，一定離我們比較遠嗎？",
    "options": [
      "一定，暗就是比較遠",
      "一定，暗的都快熄滅了",
      "不一定，也可能本身比較暗",
      "一定，暗的都比較小"
    ],
    "answer": 2,
    "option_tags": [
      "dim-means-far",
      "dim-means-dying",
      "ok",
      "dim-means-small"
    ],
    "option_why": [
      "看起來暗，也可能是星星本身比較暗。",
      "暗暗的星星不是快熄滅，是本身暗或比較遠。",
      null,
      "看起來暗不一定是小，要看本身多亮和遠近。"
    ],
    "hints": [
      "第1層：星星看起來多亮，跟哪兩件事有關？",
      "第2層：一件是遠近，另一件是星星本身有多亮。",
      "第3層：只知道它暗，能確定是哪一個原因嗎？"
    ],
    "explanation": "星星看起來暗，可能是離我們比較遠，也可能是星星本身比較暗，所以不一定比較遠。",
    "image_prompt": null,
    "variant_group": "SC4-star-bright",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-024",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動1 一天的天空）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-4"
    ],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-4；p.105 學習內容說明 4-1",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-sun-rise-set",
    "level": 4,
    "type": "choice",
    "scene": "小安家東邊是學校，西邊是公園。",
    "stem": "下午4點，太陽比較可能在哪一邊的天空？",
    "options": [
      "公園那一邊",
      "學校那一邊",
      "已經落到地面下",
      "在小安頭頂停住不動"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "rise-set-swap",
      "sun-set-early",
      "sky-static"
    ],
    "option_why": [
      null,
      "學校在東邊，下午太陽已經移到西邊。",
      "下午4點太陽通常還沒落下，還在天空中。",
      "太陽會一直慢慢移動，不會停住。"
    ],
    "hints": [
      "第1層：太陽早上在東方，傍晚往西方落下。",
      "第2層：下午的太陽，已經移到哪一邊了？",
      "第3層：再看看學校和公園各在小安家的哪一邊。"
    ],
    "explanation": "太陽東升西落，下午已經移到西邊的天空。公園在小安家的西邊，所以太陽比較可能在公園那一邊。",
    "image_prompt": null,
    "variant_group": "SC4-sun-eastwest",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-101",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-east-west",
    "level": 1,
    "type": "choice",
    "scene": "阿嬤帶小安到河濱公園：「月亮剛剛升起來了，你找找看。」",
    "stem": "月亮剛升起時，會出現在哪一個方位的低空？",
    "options": [
      "東方",
      "西方",
      "南方",
      "北方"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "rise-set-swap",
      "dir-south",
      "dir-north"
    ],
    "option_why": [
      null,
      "西方是月亮落下的方位，升起是在東方。",
      "月亮和太陽一樣從東方升起，不是南方。",
      "月亮和太陽一樣從東方升起，不是北方。"
    ],
    "hints": [
      "第1層：月亮也是天體。",
      "第2層：天體在天空的移動，有一個共同的規律。",
      "第3層：想想「東升西落」，月亮升起在哪邊？"
    ],
    "explanation": "月亮和太陽一樣東升西落，剛升起時會在東方的低空。",
    "image_prompt": null,
    "variant_group": "SC4-moon-eastwest",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-102",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-east-west",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「今晚我要一直看著月亮，看它會不會動！」",
    "stem": "同一個晚上，月亮在天空的位置大致會怎樣移動？",
    "options": [
      "由西方往東方移動",
      "停在同一個地方不動",
      "由東方往西方移動",
      "由北方直直往南方移動"
    ],
    "answer": 2,
    "option_tags": [
      "rise-set-swap",
      "moon-static",
      "ok",
      "dir-north-south"
    ],
    "option_why": [
      "方向相反了，月亮大致由東方往西方移動。",
      "隔一段時間再看，月亮的位置會改變。",
      null,
      "月亮大致是由東方往西方移動。"
    ],
    "hints": [
      "第1層：月亮從哪個方位升起？",
      "第2層：升起之後，它會往另一邊移過去。",
      "第3層：東升西落：從東方出發，往西方去。"
    ],
    "explanation": "一個晚上之中，月亮在天空的位置會改變，大致由東方往西方移動。",
    "image_prompt": null,
    "variant_group": "SC4-moon-eastwest",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-103",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-1"
    ],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2；p.103 學習內容說明 1-1",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-observe-method",
    "level": 2,
    "type": "choice",
    "scene": "阿咕：「月亮看起來一直掛在同一個地方耶！」",
    "stem": "想知道月亮的位置有沒有改變，該怎麼做？",
    "options": [
      "隔一段時間，在同一地點再看一次",
      "只看一眼就決定",
      "每次換一個地方看",
      "閉上眼睛想一想"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "single-observe",
      "change-place",
      "no-observe"
    ],
    "option_why": [
      null,
      "只看一次，沒辦法比較位置有沒有改變。",
      "換地點看，參考的景物不同，不好比較。",
      "要真的觀察記錄，才知道月亮怎麼移動。"
    ],
    "hints": [
      "第1層：「改變」要拿兩次以上的觀察來比。",
      "第2層：兩次觀察之間，要隔一段時間。",
      "第3層：為了好比較，觀察的地點要一樣。"
    ],
    "explanation": "月亮移動得很慢，要隔一段時間、在同一地點再觀察一次，比一比才知道位置有沒有改變。",
    "image_prompt": null,
    "variant_group": "SC4-moon-observe",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-104",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置：拳頭數量高）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1（能以合理的參考標準或工具代替實際的數值）",
    "explain_source": "拳頭數測量法屬翰林 1-2 內容：虎山實驗小學 112 學年度四年級自然（翰林）課程計畫第 2 週學習目標",
    "beyond_curriculum": false,
    "concept": "SC4-fist-arm-straight",
    "level": 1,
    "type": "choice",
    "scene": "天文館解說員：「沒有工具時，可以用拳頭量月亮有多高。」",
    "stem": "用拳頭量月亮有多高時，手臂應該怎麼放？",
    "options": [
      "手臂往前伸直",
      "手臂彎起來，拳頭靠近臉",
      "手肘貼著肚子",
      "先把手臂舉到頭頂上"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "arm-bent",
      "arm-bent",
      "arm-overhead"
    ],
    "option_why": [
      null,
      "手臂彎起來，拳頭太靠近眼睛，量出來會不準。",
      "手臂沒伸直，每次拳頭的位置不同，會不準。",
      "要從遠方地面往上疊拳頭，不是先舉到頭頂。"
    ],
    "hints": [
      "第1層：每次量的時候，拳頭和眼睛的距離要一樣。",
      "第2層：手臂怎麼放，最容易每次都一樣？",
      "第3層：把手臂往前伸到最直。"
    ],
    "explanation": "量的時候手臂要往前伸直，拳頭和眼睛的距離每次才會一樣，量出來的拳頭數才好比較。",
    "image_prompt": "【需要圖片】白底、黑色清楚線條，可加淡黃色。側面圖：一個四年級小孩站在平地上，右手臂往前平平伸直、握拳，眼睛看著前方天空；遠方畫一條水平的地平線。旁邊畫一個小框，裡面是錯誤示範：同一個小孩手臂彎曲、拳頭靠近臉，框上方畫一個灰色的小叉叉。不要寫任何文字答案，不要畫任何測量工具、格線或數字記號。",
    "variant_group": "SC4-fist-method",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-105",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置：拳頭數量高）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1",
    "explain_source": "拳頭數測量法屬翰林 1-2 內容：虎山實驗小學 112 學年度四年級自然（翰林）課程計畫第 2 週學習目標",
    "beyond_curriculum": false,
    "concept": "SC4-fist-start-horizon",
    "level": 2,
    "type": "choice",
    "scene": "阿咕：「我拳頭握好了！要從哪裡開始疊呢？」",
    "stem": "疊拳頭量月亮有多高時，要從哪裡開始往上疊？",
    "options": [
      "從自己的腳尖",
      "從旁邊路燈的頂端",
      "從遠方地面和天空交界的地方",
      "從自己的肩膀"
    ],
    "answer": 2,
    "option_tags": [
      "start-feet",
      "start-landmark-top",
      "ok",
      "start-shoulder"
    ],
    "option_why": [
      "從腳尖開始會多算拳頭；要從遠方地面開始。",
      "路燈有高有低，要從遠方地面和天空交界開始。",
      null,
      "從肩膀開始沒有共同標準，要從遠方地面開始。"
    ],
    "hints": [
      "第1層：大家量的起點要一樣，結果才能比較。",
      "第2層：月亮有多高，是從地面往上算。",
      "第3層：看向遠方，找地面和天空相接的那條線。"
    ],
    "explanation": "量月亮有多高，要從遠方地面和天空交界的地方（地平線）開始，一個拳頭一個拳頭往上疊，數到月亮為止。",
    "image_prompt": "【需要圖片】白底、黑色清楚線條，月亮淡黃色。畫遠方一條水平的地平線（地面和天空交界），地面畫幾個簡單的矮房子剪影。畫面左下角露出一隻往前伸直的手臂。從地平線開始，往上用細虛線畫三個一樣大的拳頭輪廓，一個疊一個，依序標 1、2、3；第 3 個拳頭的上緣剛好碰到圓形的月亮。地平線用粗一點的線並加小箭頭指向它。除了拳頭上的 1、2、3，不要畫任何測量工具、格線或其他數字記號。",
    "variant_group": "SC4-fist-method",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-106",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1；p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-fist-compare",
    "level": 2,
    "type": "choice",
    "scene": "小安的紀錄：晚上7點，月亮2個拳頭高；晚上9點，月亮4個拳頭高。",
    "stem": "依照小安的紀錄，哪一個時間月亮比較高？",
    "options": [
      "晚上7點",
      "晚上9點",
      "兩次一樣高",
      "拳頭數不能比高低"
    ],
    "answer": 1,
    "option_tags": [
      "more-fist-lower",
      "ok",
      "same-height",
      "fist-cant-compare"
    ],
    "option_why": [
      "拳頭數越多，月亮越高；9點的拳頭數比較多。",
      null,
      "2個和4個拳頭不同，月亮的高低也不同。",
      "同一個人用同樣方法量，拳頭數可以比高低。"
    ],
    "hints": [
      "第1層：先找出兩個時間各是幾個拳頭高。",
      "第2層：拳頭疊得越多，表示越往上。",
      "第3層：比一比 2 和 4，哪個比較多？"
    ],
    "explanation": "拳頭數越多，表示月亮越高。9點有4個拳頭高，比7點的2個拳頭高。",
    "image_prompt": null,
    "variant_group": "SC4-fist-compare",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-107",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1；p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-fist-compare",
    "level": 2,
    "type": "number",
    "scene": "小安的紀錄：晚上8點，月亮1個拳頭高；晚上10點，月亮3個拳頭高。",
    "stem": "從8點到10點，月亮升高了幾個拳頭？",
    "options": [],
    "answer": 2,
    "unit_label": "個拳頭",
    "option_tags": null,
    "option_why": null,
    "wrong_why": {
      "3": "3 是10點的拳頭數，還要減掉8點的1個。",
      "4": "要算相差多少，是 3 減 1，不是 3 加 1。"
    },
    "hints": [
      "第1層：找出8點和10點各是幾個拳頭高。",
      "第2層：問「升高了幾個」，是要算兩次相差多少。",
      "第3層：3個拳頭比1個拳頭多幾個？"
    ],
    "explanation": "3個拳頭－1個拳頭＝2個拳頭，月亮升高了2個拳頭。",
    "image_prompt": null,
    "variant_group": "SC4-fist-compare",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-108",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1（以合理的參考標準代替實際數值作比較）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-fist-same-person",
    "level": 3,
    "type": "choice",
    "scene": "小安8點量月亮，10點換弟弟量，想比較月亮的高低。",
    "stem": "8點小安量、10點弟弟量，這樣比較拳頭數會有什麼問題？",
    "options": [
      "沒有問題，誰量都一樣",
      "弟弟比較矮，月亮會變低",
      "晚上不可以量月亮",
      "兩人拳頭大小不同，不好比較"
    ],
    "answer": 3,
    "option_tags": [
      "anyone-same",
      "observer-height",
      "no-night-measure",
      "ok"
    ],
    "option_why": [
      "每個人的拳頭大小不同，最好同一個人量。",
      "月亮不會因為量的人比較矮就變低。",
      "有大人陪著，晚上可以安全地觀察月亮。",
      null
    ],
    "hints": [
      "第1層：拳頭就是量的「尺」，兩個人的尺一樣大嗎？",
      "第2層：把你的拳頭和大人的拳頭比一比。",
      "第3層：要公平比較，量的人應該怎麼安排？"
    ],
    "explanation": "每個人的拳頭大小不一樣，換人量就像換了一把不同的尺。要比較，最好同一個人用同一種方法量。",
    "image_prompt": null,
    "variant_group": "SC4-fair-measure",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-109",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-4"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1；p.105 學習內容說明 4-1",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-same-place",
    "level": 3,
    "type": "choice",
    "scene": "阿咕：「第一次在頂樓看月亮，第二次我想去公園看。」",
    "stem": "觀察月亮位置的變化，為什麼每次最好站在同一個地點？",
    "options": [
      "換地點月亮就看不到了",
      "方位和參考的景物一樣，才好比較",
      "月亮只照得到那個地點",
      "站久了月亮就會停下來"
    ],
    "answer": 1,
    "option_tags": [
      "place-moon-gone",
      "ok",
      "moon-one-place",
      "moon-static"
    ],
    "option_why": [
      "換地點通常還看得到月亮，只是不好比較。",
      null,
      "在很多地方都看得到月亮，不是只有一個地點。",
      "月亮不會因為你站著不動就停下來。"
    ],
    "hints": [
      "第1層：記錄月亮的位置時，會用旁邊的什麼東西當參考？",
      "第2層：換了地點，旁邊的大樓、樹也跟著換了。",
      "第3層：參考的東西一樣，前後兩次才好比較。"
    ],
    "explanation": "站在同一個地點，方位和旁邊的大樓、樹都一樣，前後兩次觀察才好比較月亮怎麼移動。",
    "image_prompt": null,
    "variant_group": "SC4-fair-measure",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-110",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置：記錄月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-4",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-1",
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.105 學習內容說明 4-1（用方向等資料表示物體位置）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-record-position",
    "level": 3,
    "type": "multi",
    "scene": "天文館解說員：「觀察月亮要做紀錄，下次才能比較。」",
    "stem": "記錄月亮的位置，紀錄表上要寫哪些？（可以選不只一個）",
    "options": [
      "觀察的時間",
      "月亮在哪個方位",
      "月亮有幾個拳頭高",
      "當天穿了什麼衣服"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "option_tags": [
      "ok",
      "ok",
      "ok",
      "irrelevant-info"
    ],
    "option_why": [
      null,
      null,
      null,
      "穿什麼衣服和月亮的位置沒有關係。"
    ],
    "hints": [
      "第1層：想想看，要怎麼說清楚月亮「在哪裡」？",
      "第2層：月亮的位置包括哪個方位，和有多高。",
      "第3層：位置會隨時間改變，所以時間也要記。"
    ],
    "explanation": "記錄月亮的位置要寫時間、方位和幾個拳頭高；穿什麼衣服和月亮的位置無關。",
    "image_prompt": null,
    "variant_group": "SC4-record-position",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-111",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置：記錄月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-4",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-1"
    ],
    "explain_status": "verified",
    "explain_page": "p.105 學習內容說明 4-1；p.103 學習內容說明 1-1",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-read-position",
    "level": 2,
    "type": "choice",
    "scene": "阿咕畫了一張觀察圖，請你幫忙看看。",
    "stem": "看圖：月亮在哪一個方位？大約幾個拳頭高？",
    "options": [
      "西方，3個拳頭高",
      "東方，3個拳頭高",
      "東方，5個拳頭高",
      "西方，1個拳頭高"
    ],
    "answer": 1,
    "option_tags": [
      "dir-misread",
      "ok",
      "fist-miscount",
      "dir-and-count"
    ],
    "option_why": [
      "圖中月亮在標著「東」的那一邊。",
      null,
      "從地平線數到月亮，只有3個拳頭。",
      "方位和拳頭數都要再看一次圖。"
    ],
    "hints": [
      "第1層：先找圖上寫的方位字。",
      "第2層：再從地平線開始，一個一個數拳頭。",
      "第3層：數到剛好碰到月亮的那個拳頭就停。"
    ],
    "explanation": "圖中月亮在東方，從地平線往上數到月亮是3個拳頭，所以是東方、3個拳頭高。",
    "image_prompt": "【需要圖片】白底、黑色清楚線條，月亮淡黃色。畫一個小孩的背影站在地面上，面向前方。前方遠處一條水平的地平線，線上有幾棟簡單的矮房子剪影。地平線正中間下方的地面上標一個大字「東」；畫面最左邊邊緣標小字「北」，最右邊邊緣標小字「南」（小孩面向東方，所以左手邊是北、右手邊是南）。小孩的右手臂往前伸直握拳；從地平線開始往上，用細虛線畫三個一樣大的拳頭輪廓，一個疊一個，依序標 1、2、3；第 3 個拳頭的上緣剛好碰到圓形的月亮。不要畫任何測量工具、格線或其他數字記號，不要寫「3個拳頭」或任何答案文字。",
    "variant_group": "SC4-record-position",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-112",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-4"
    ],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "東升西落依 10-2、10-4（p.107，已對原文）；面向某方位時判斷前後左右手的方位：社會四上 1-1 只教地圖的方向標（A1 social_4A_u01.js 檔頭註記：社會領綱第二學習階段沒有一條直接寫方位）；2026-10-19 搜尋翰林三、四年級社會課程資料，查不到有教「面向東方、左北右南」，依老闆 2026-10-19 裁示改為超綱、由賢者教學後再測試",
    "beyond_curriculum": true,
    "beyond_code": "",
    "beyond_note": "社會課查不到有教面向判斷左右手方位",
    "teach": "面向南方時，左手邊是東，右手邊是西。月亮從東方升起、往西方落下，看起來就是從左邊移到右邊。",
    "concept": "SC4-X-face-direction",
    "level": 4,
    "type": "choice",
    "scene": "小安和爸爸在頂樓，面向南方看月亮。",
    "stem": "小安面向南方，月亮整晚大致會怎樣移動？",
    "options": [
      "從他的右手邊往左手邊",
      "從他的左手邊往右手邊",
      "從他的背後往前面",
      "一直停在他的正前方"
    ],
    "answer": 1,
    "option_tags": [
      "lr-confuse",
      "ok",
      "dir-north-south",
      "moon-static"
    ],
    "option_why": [
      "面向南方時，東方在左手邊，月亮從左往右移。",
      null,
      "月亮大致由東往西移，不是從背後往前。",
      "隔一段時間，月亮的位置就會改變。"
    ],
    "hints": [
      "第1層：面向南方時，東方在你的哪一手邊？",
      "第2層：月亮從東方升起，往西方移動。",
      "第3層：面向南方時，右手邊是西方。"
    ],
    "explanation": "面向南方時，左手邊是東方、右手邊是西方。月亮東升西落，所以會從左手邊往右手邊移動。",
    "image_prompt": null,
    "variant_group": "SC4-moon-eastwest",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_FACE"
  },
  {
    "id": "SC-4A-01-113",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-1"
    ],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-predict",
    "level": 4,
    "type": "choice",
    "scene": "小安的紀錄：晚上8點，月亮在東方，1個拳頭高。",
    "stem": "晚上8點月亮在東方1個拳頭高，10點最可能在哪裡？",
    "options": [
      "比較高，也往西邊移了一些",
      "還在東方1個拳頭高",
      "已經落到西方地面下",
      "比較低，回到東方地面下"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "moon-static",
      "too-fast",
      "rise-reverse"
    ],
    "option_why": [
      null,
      "過了2小時，月亮的位置會改變。",
      "剛升起不久的月亮，2小時還落不到西方。",
      "剛升起的月亮會越升越高，不會退回東方。"
    ],
    "hints": [
      "第1層：1個拳頭高的月亮，是剛升起不久，還是快要落下？",
      "第2層：剛升起的天體，接下來會升高還是降低？",
      "第3層：月亮東升西落，升高時也會慢慢往西邊移。"
    ],
    "explanation": "8點月亮剛從東方升起不久，接下來會越升越高，也慢慢往西邊移，所以10點會比較高，位置也往西移了一些。",
    "image_prompt": null,
    "variant_group": "SC4-moon-predict",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-114",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置：遠物與近物）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "課綱說明沒有直接寫遠近對測量結果的影響；依虎山實驗小學 112 學年度四年級自然（翰林）課程計畫第 3～4 週學習目標「了解物體距離觀測者的遠近對測出的高度角有什麼差異」「測量遠物與近物，並比較兩者差異」，查詢 2026-10-19",
    "beyond_curriculum": false,
    "concept": "SC4-near-far-measure",
    "level": 3,
    "type": "choice",
    "scene": "天文館解說員：「站在離路燈遠一點的地方，量量看路燈頂端有幾個拳頭高。」",
    "stem": "小安往前走近路燈，再量一次路燈頂端，拳頭數會怎樣？",
    "options": [
      "變少",
      "不變",
      "變多",
      "變成零"
    ],
    "answer": 2,
    "option_tags": [
      "near-fewer",
      "near-same",
      "ok",
      "near-zero"
    ],
    "option_why": [
      "走得越近，路燈頂端看起來越高，拳頭數變多。",
      "路燈離你很近，走近後看起來更高，拳頭數會變。",
      null,
      "路燈頂端還在地面上方，拳頭數不會變成零。"
    ],
    "hints": [
      "第1層：想像你站在路燈正下方，要怎麼抬頭看燈？",
      "第2層：離得越近，頭要抬得越高才看得到。",
      "第3層：看起來越高，就要疊越多拳頭。"
    ],
    "explanation": "離路燈越近，路燈頂端看起來越高，要疊更多拳頭。月亮離我們非常遠，走幾步路，拳頭數幾乎不會改變。",
    "image_prompt": null,
    "variant_group": "SC4-near-far",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-115",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-1",
      "自然:INc-Ⅱ-4"
    ],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-predict",
    "level": 4,
    "type": "multi",
    "scene": "四位同學交來月亮觀察紀錄，阿咕想找出合理的紀錄。",
    "stem": "哪些紀錄符合月亮東升西落？（可以選不只一個）",
    "options": [
      "7點東方1個拳頭高；9點東方3個拳頭高",
      "8點西方2個拳頭高；10點西方1個拳頭高",
      "7點西方1個拳頭高；9點西方3個拳頭高",
      "9點東方3個拳頭高；11點東方1個拳頭高"
    ],
    "answer": [
      0,
      1
    ],
    "option_tags": [
      "ok",
      "ok",
      "rise-in-west",
      "sink-in-east"
    ],
    "option_why": [
      null,
      null,
      "在西方的月亮會越來越低，不會越升越高。",
      "在東方的月亮會越升越高，不會越來越低。"
    ],
    "hints": [
      "第1層：月亮在東方時，是剛升起，還是快落下？",
      "第2層：在東方的月亮會變高；在西方的月亮會變低。",
      "第3層：一筆一筆檢查：拳頭數是變多還是變少？"
    ],
    "explanation": "月亮東升西落：在東方時越升越高，在西方時越來越低。所以第一筆和第二筆紀錄合理。",
    "image_prompt": null,
    "variant_group": "SC4-moon-predict",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-116",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-east-west",
    "level": 1,
    "type": "choice",
    "scene": "阿嬤：「月亮快要下山了，趕快再看一眼。」",
    "stem": "月亮快要落下時，會在哪一個方位的低空？",
    "options": [
      "東方",
      "南方",
      "北方",
      "西方"
    ],
    "answer": 3,
    "option_tags": [
      "rise-set-swap",
      "dir-south",
      "dir-north",
      "ok"
    ],
    "option_why": [
      "東方是月亮升起的方位，落下是在西方。",
      "月亮和太陽一樣在西方落下，不是南方。",
      "月亮和太陽一樣在西方落下，不是北方。",
      null
    ],
    "hints": [
      "第1層：月亮也是天體，也會東升西落。",
      "第2層：題目問的是「落下」，不是升起。",
      "第3層：「東升西落」的後兩個字，說的是落下的方位。"
    ],
    "explanation": "月亮東升西落，快要落下時會在西方的低空。",
    "image_prompt": null,
    "variant_group": "SC4-moon-eastwest",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-117",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1（能以合理的參考標準或工具代替實際的數值）",
    "explain_source": "拳頭數測量法屬翰林 1-2 內容：虎山實驗小學 112 學年度四年級自然（翰林）課程計畫第 2 週學習目標",
    "beyond_curriculum": false,
    "concept": "SC4-fist-tool",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「我忘了帶工具，要怎麼量月亮有多高？」",
    "stem": "沒有工具時，可以用什麼量月亮有多高？",
    "options": [
      "自己的腳掌",
      "伸直手臂後的拳頭",
      "眨眼睛的次數",
      "走路的步數"
    ],
    "answer": 1,
    "option_tags": [
      "foot-measure",
      "ok",
      "blink-count",
      "steps-measure"
    ],
    "option_why": [
      "腳掌沒辦法舉到眼前和天空比，量不了。",
      null,
      "眨眼的次數和月亮多高沒有關係。",
      "步數量的是地上的距離，不是月亮多高。"
    ],
    "hints": [
      "第1層：要量天上的月亮，量的東西要能舉到眼前比。",
      "第2層：用身體的一部分，一個接一個往上疊。",
      "第3層：把手臂往前伸直，手握起來。"
    ],
    "explanation": "沒有工具時，可以把手臂伸直、握拳，從地平線一個拳頭一個拳頭往上疊，數月亮有幾個拳頭高。",
    "image_prompt": null,
    "variant_group": "SC4-fist-method",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-118",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "觀察月亮依 10-2（p.107，已對原文）；「晚上觀察要大人陪同、選安全地點」是安全守則，不是課綱條文，A3 依角色守則加入（2026-10-19）",
    "beyond_curriculum": false,
    "concept": "SC4-night-safety",
    "level": 1,
    "type": "choice",
    "scene": "阿咕：「今天晚上我想去看月亮！」",
    "stem": "晚上去觀察月亮，哪一種做法最安全？",
    "options": [
      "一個人走到沒人的河邊",
      "爬到頂樓的欄杆上",
      "請大人陪著，在安全的地方看",
      "站在馬路中間看"
    ],
    "answer": 2,
    "option_tags": [
      "alone-night",
      "unsafe-height",
      "ok",
      "unsafe-road"
    ],
    "option_why": [
      "晚上不要一個人去沒人的地方，要大人陪。",
      "爬欄杆可能摔下去，要站在安全的地方。",
      null,
      "馬路上有車子，站在路中間很危險。"
    ],
    "hints": [
      "第1層：晚上外面比較暗，要先想到安全。",
      "第2層：哪些地方可能摔倒、被車撞，或找不到人幫忙？",
      "第3層：找一個有大人陪伴的選項。"
    ],
    "explanation": "晚上觀察月亮要請大人陪著，選安全、平坦、沒有車子的地方，不要爬高，也不要站在馬路上。",
    "image_prompt": null,
    "variant_group": "SC4-night-safety",
    "uses": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-119",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1；p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-fist-compare",
    "level": 2,
    "type": "choice",
    "scene": "小安的紀錄：晚上7點，東方2個拳頭高；晚上9點，東方4個拳頭高。",
    "stem": "從小安的紀錄看，這段時間月亮怎麼移動？",
    "options": [
      "越升越高",
      "越來越低",
      "完全沒有移動",
      "往北方移過去"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "more-fist-lower",
      "moon-static",
      "dir-north"
    ],
    "option_why": [
      null,
      "拳頭數從2變4，表示月亮變高了。",
      "拳頭數改變了，表示月亮的位置有改變。",
      "兩次紀錄都在東方，沒有往北方移。"
    ],
    "hints": [
      "第1層：7點和9點各是幾個拳頭高？",
      "第2層：拳頭數變多，表示變高還是變低？",
      "第3層：2個拳頭到4個拳頭，是變多了。"
    ],
    "explanation": "拳頭數從2個變成4個，表示月亮越升越高。在東方的月亮升起後會越來越高。",
    "image_prompt": null,
    "variant_group": "SC4-fist-compare",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-120",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-4",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.105 學習內容說明 4-1（用方向等資料表示物體位置）",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-record-position",
    "level": 2,
    "type": "multi",
    "scene": "阿咕要畫月亮觀察圖，下次好跟這次比較。",
    "stem": "畫月亮觀察圖時，畫上哪些東西有助於比較？（可以選不只一個）",
    "options": [
      "旁邊固定不動的大樓或樹",
      "在圖上標出方位",
      "剛好飛過的小鳥",
      "路上開過的汽車"
    ],
    "answer": [
      0,
      1
    ],
    "option_tags": [
      "ok",
      "ok",
      "moving-ref",
      "moving-ref"
    ],
    "option_why": [
      null,
      null,
      "小鳥一下就飛走了，下次比較時找不到它。",
      "汽車會開走，不能當比較的參考。"
    ],
    "hints": [
      "第1層：下次再畫時，要找得到同樣的東西才能比。",
      "第2層：哪些東西過一陣子還會在原地？",
      "第3層：方位也能幫忙說清楚月亮在哪一邊。"
    ],
    "explanation": "畫上固定不動的大樓或樹當參考，並標出方位，下次才能比較月亮的位置；小鳥和汽車會移動，不適合。",
    "image_prompt": null,
    "variant_group": "SC4-record-position",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-121",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "verified",
    "explain_page": "p.103 學習內容說明 1-1（能以合理的參考標準或工具代替實際的數值）",
    "explain_source": "拳頭數測量法屬翰林 1-2 內容：虎山實驗小學 112 學年度四年級自然（翰林）課程計畫第 2 週學習目標",
    "beyond_curriculum": false,
    "concept": "SC4-fist-arm-straight",
    "level": 3,
    "type": "choice",
    "scene": "小安量月亮時，有時手臂伸直，有時手臂彎著。",
    "stem": "小安有時伸直手臂、有時彎著量，會造成什麼問題？",
    "options": [
      "月亮會被手推遠",
      "沒有問題，拳頭數一樣",
      "月亮會變得比較大",
      "拳頭數會不準，不好比較"
    ],
    "answer": 3,
    "option_tags": [
      "moon-moves-by-arm",
      "arm-no-effect",
      "moon-size-change",
      "ok"
    ],
    "option_why": [
      "手怎麼放，都不會讓月亮移動。",
      "手臂彎著，拳頭靠近眼睛，數出的拳頭數會不同。",
      "月亮不會因為手怎麼放就變大。",
      null
    ],
    "hints": [
      "第1層：拳頭離眼睛近一點，看起來會變大還是變小？",
      "第2層：拳頭看起來變大，疊到月亮的拳頭數就會改變。",
      "第3層：每次手臂都伸直，量法才會一樣。"
    ],
    "explanation": "手臂彎著時拳頭靠近眼睛，看起來比較大，數出來的拳頭數會變少。每次都伸直手臂，量出來才好比較。",
    "image_prompt": null,
    "variant_group": "SC4-fist-method",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-122",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-1",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-10"
    ],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "課綱說明沒有直接寫遠近對測量結果的影響；依虎山實驗小學 112 學年度四年級自然（翰林）課程計畫第 3～4 週學習目標「了解物體距離觀測者的遠近對測出的高度角有什麼差異」「測量遠物與近物，並比較兩者差異」，查詢 2026-10-19",
    "beyond_curriculum": false,
    "concept": "SC4-near-far-measure",
    "level": 3,
    "type": "choice",
    "scene": "小安量到月亮4個拳頭高，接著往前走了10步。",
    "stem": "往前走10步再量月亮，拳頭數最可能會怎樣？",
    "options": [
      "變多很多",
      "幾乎不變",
      "變少很多",
      "變成零"
    ],
    "answer": 1,
    "option_tags": [
      "moon-near-like-lamp",
      "ok",
      "walk-fewer",
      "near-zero"
    ],
    "option_why": [
      "月亮非常遠，走幾步路，拳頭數幾乎不變。",
      null,
      "月亮非常遠，走幾步路，拳頭數幾乎不變。",
      "月亮還在天空中，拳頭數不會變成零。"
    ],
    "hints": [
      "第1層：走近路燈時，路燈頂端的拳頭數會變多。",
      "第2層：可是月亮離我們比路燈遠非常多。",
      "第3層：離得非常遠時，走幾步路幾乎沒有差別。"
    ],
    "explanation": "近的路燈走幾步，拳頭數就會改變；月亮離我們非常遠，走10步，拳頭數幾乎不會改變。",
    "image_prompt": null,
    "variant_group": "SC4-near-far",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-123",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "翰林 四上 自然 一、閃亮的天空（活動2 月亮的位置）（同主題延伸，非課文題）",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [
      "自然:INc-Ⅱ-1"
    ],
    "explain_status": "verified",
    "explain_page": "p.107 學習內容說明 10-2",
    "explain_source": "",
    "beyond_curriculum": false,
    "concept": "SC4-moon-predict",
    "level": 4,
    "type": "choice",
    "scene": "小安的紀錄：晚上10點，月亮在西方，2個拳頭高。",
    "stem": "10點月亮在西方2個拳頭高，12點最可能在哪？",
    "options": [
      "升高到4個拳頭",
      "回到東方的低空",
      "更低，或已落到西方地面下",
      "還在西方2個拳頭高"
    ],
    "answer": 2,
    "option_tags": [
      "rise-in-west",
      "rise-reverse",
      "ok",
      "moon-static"
    ],
    "option_why": [
      "在西方的月亮會越來越低，不會再升高。",
      "月亮由東往西移，不會退回東方。",
      null,
      "過了2小時，月亮的位置會改變。"
    ],
    "hints": [
      "第1層：月亮在西方，是剛升起還是快要落下？",
      "第2層：快要落下的月亮，接下來會更高還是更低？",
      "第3層：只剩2個拳頭高，2小時後可能已經落下。"
    ],
    "explanation": "在西方的月亮快要落下，會越來越低。10點只剩2個拳頭高，到12點會更低，也可能已經落到西方地面下。",
    "image_prompt": null,
    "variant_group": "SC4-moon-predict",
    "uses": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SC-4A-01-901",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.108 INc-Ⅲ-13 學習內容說明 13-1（太陽是一顆恆星，會發出光與熱，因為距離地球很近，所以看起來很亮）",
    "explain_source": "",
    "beyond_curriculum": true,
    "beyond_code": "自然:INc-Ⅲ-13",
    "beyond_note": "第三學習階段（五、六年級）內容",
    "teach": "太陽其實也是一顆星星，自己會發出光和熱。它離我們最近，所以看起來特別大、特別亮。",
    "concept": "SC4-X-sun-is-star",
    "level": 2,
    "type": "choice",
    "scene": "賢者：「孩子，你知道太陽和夜空的星星有什麼關係嗎？」",
    "stem": "太陽和夜空中的星星，有什麼相同的地方？",
    "options": [
      "太陽也是一顆自己會發光的星星",
      "太陽和星星完全沒有關係",
      "星星是太陽掉下來的碎片",
      "太陽晚上會變成星星"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "sun-not-star",
      "star-fragment",
      "sun-becomes-star"
    ],
    "option_why": [
      null,
      "太陽也是一顆星星，只是離我們最近。",
      "星星不是太陽的碎片，它們本身就是星星。",
      "太陽晚上落到西方地面下，不會變成星星。"
    ],
    "hints": [
      "第1層：想想賢者剛剛教的：太陽是什麼？",
      "第2層：太陽看起來特別大、特別亮，是因為離我們近。",
      "第3層：找說太陽也是星星的選項。"
    ],
    "explanation": "太陽也是一顆星星，自己會發出光和熱。因為離我們最近，所以看起來特別大、特別亮。",
    "image_prompt": null,
    "variant_group": "SC4-X-sun-is-star",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_SKY"
  },
  {
    "id": "SC-4A-01-902",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "臺北市立天文科學教育館 天文QA〈在月球上白天可以看到星星嗎？火星呢？〉（2025-06-02）：地球白天天空明亮是因為大氣使光線散射；https://tam.gov.taipei/News_Content.aspx?n=EE8B0C19F602864A&sms=52C350C47FE06B81&s=104B8ECA7E77DBCA ，查詢 2026-10-19",
    "beyond_curriculum": true,
    "beyond_code": "",
    "beyond_note": "課綱第二、三學習階段都沒有明列",
    "teach": "白天星星其實還在天上。太陽把天空照得很亮，星星的光比較弱，就看不出來了。",
    "concept": "SC4-X-day-stars",
    "level": 2,
    "type": "choice",
    "scene": "賢者：「白天的天空裡，星星真的都不見了嗎？」",
    "stem": "白天看不到星星，是因為什麼？",
    "options": [
      "星星白天會熄滅",
      "星星白天都躲到月亮後面",
      "星星白天會變成雲",
      "星星還在，只是天空太亮看不到"
    ],
    "answer": 3,
    "option_tags": [
      "star-off-day",
      "star-behind-moon",
      "star-to-cloud",
      "ok"
    ],
    "option_why": [
      "星星不會白天熄滅、晚上再亮起來。",
      "月亮很小，擋不住滿天的星星。",
      "星星不會變成雲，雲在離地面近的空中。",
      null
    ],
    "hints": [
      "第1層：晚上的星星，到了白天跑去哪了？",
      "第2層：在很亮的房間裡開一支小手電筒，看得清楚嗎？",
      "第3層：太陽把天空照得很亮。"
    ],
    "explanation": "白天星星還在天上，只是太陽把天空照得很亮，星星的光比較弱，所以看不出來。",
    "image_prompt": null,
    "variant_group": "SC4-X-day-stars",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_SKY"
  },
  {
    "id": "SC-4A-01-903",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.17 INc-Ⅲ-13 條文；p.108 學習內容說明 13-2（日出日落的時間與位置會隨季節而改變）",
    "explain_source": "「在台灣夏天偏北、冬天偏南」是 A3 補充的北半球天文常識，13-2 原文只寫會隨季節改變",
    "beyond_curriculum": true,
    "beyond_code": "自然:INc-Ⅲ-13",
    "beyond_note": "第三學習階段（五、六年級）內容",
    "teach": "太陽都從東邊升起，但位置會隨季節慢慢移動：在台灣，夏天偏北一點，冬天偏南一點。",
    "concept": "SC4-X-sunrise-season",
    "level": 3,
    "type": "choice",
    "scene": "賢者：「每天早上看太陽升起，一整年都在同一個地方嗎？」",
    "stem": "夏天和冬天，太陽升起的位置一樣嗎？",
    "options": [
      "完全一樣，每天都同一點",
      "不一樣，會隨季節慢慢改變",
      "冬天改從西方升起",
      "夏天太陽不會升起"
    ],
    "answer": 1,
    "option_tags": [
      "sunrise-fixed",
      "ok",
      "winter-west",
      "summer-no-rise"
    ],
    "option_why": [
      "升起的位置會隨季節慢慢移動，不是固定一點。",
      null,
      "太陽一年四季都從東邊升起，不會從西方。",
      "夏天太陽每天都會升起。"
    ],
    "hints": [
      "第1層：太陽都從東邊升起，但「東邊的哪一點」會變嗎？",
      "第2層：想想賢者剛剛說的夏天和冬天。",
      "第3層：升起的位置會跟著季節慢慢移動。"
    ],
    "explanation": "太陽一年四季都從東邊升起，但升起的位置會隨季節改變：在台灣，夏天偏北一點，冬天偏南一點。",
    "image_prompt": null,
    "variant_group": "SC4-X-sunrise-season",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_SKY"
  },
  {
    "id": "SC-4A-01-904",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1011,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "verified",
    "explain_page": "p.157 Id-Ⅳ-1 學習內容說明 1-1（說明地球自轉會造成晝夜交替現象）",
    "explain_source": "課綱寫的是晝夜交替；拿來解釋天體東升西落是 A3 的延伸，屬簡化說法（教學文字已註明「簡化」）",
    "beyond_curriculum": true,
    "beyond_code": "自然:Id-Ⅳ-1",
    "beyond_note": "第四學習階段（國中）內容，這裡只用簡化說法",
    "teach": "這是簡化的說法：地球像陀螺一樣自己在轉，我們跟著轉，就看到天體從東邊升起、往西邊落下。",
    "concept": "SC4-X-earth-spin",
    "level": 3,
    "type": "choice",
    "scene": "賢者：「為什麼天上的東西都從東邊升起、往西邊落下呢？」",
    "stem": "太陽、月亮、星星東升西落，其實是因為什麼？",
    "options": [
      "天體都被風吹著走",
      "太陽每天繞著台灣跑一圈",
      "我們住的地球自己在轉",
      "月亮拉著大家一起走"
    ],
    "answer": 2,
    "option_tags": [
      "wind-push",
      "sun-circles",
      "ok",
      "moon-pull"
    ],
    "option_why": [
      "風只在地球的空氣裡吹，吹不動太陽和星星。",
      "不是太陽繞著台灣跑，是地球自己在轉。",
      null,
      "月亮沒有拉著太陽和星星走。"
    ],
    "hints": [
      "第1層：坐旋轉木馬時，旁邊的東西看起來怎麼動？",
      "第2層：是我們在轉，旁邊的東西看起來才往後跑。",
      "第3層：我們住的大球，自己會轉。"
    ],
    "explanation": "這是簡化的說法：地球自己在轉，我們跟著轉，所以看到太陽、月亮、星星從東邊升起、往西邊落下。",
    "image_prompt": null,
    "variant_group": "SC4-X-earth-spin",
    "uses": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_SKY"
  },
  {
    "id": "SC-4A-01-905",
    "grade": 4,
    "subject": "自然",
    "publisher": "翰林",
    "term": "四上",
    "unit": "一、閃亮的天空",
    "node": 1012,
    "source_ref": "超綱延伸（賢者教學後再測試），不是翰林四上課文內容；不算進節點的 20 題",
    "curriculum_code": "自然:INc-Ⅱ-10",
    "curriculum_code_also": [],
    "explain_status": "secondary",
    "explain_page": "",
    "explain_source": "國立中央大學天文研究所 陳文屏〈太陽〉（原載國語日報資訊雙週刊 1998.05）：「有的則自己不會發光，而必須靠反射來自別處的光線，我們才看得到，例如月亮（它是反射太陽的光）」；https://www.astro.ncu.edu.tw/~wchen/wp_chen/essay/sun.htm ，查詢 2026-10-19",
    "beyond_curriculum": true,
    "beyond_code": "",
    "beyond_note": "課綱第二、三學習階段沒有明列；國中 Fb-Ⅳ-4（p.153）談月相，也沒有直接寫月亮反射光",
    "teach": "月亮自己不會發光。太陽光照在月亮上，再反射到我們眼睛，就像手電筒照亮白牆一樣。",
    "concept": "SC4-X-moon-light",
    "level": 2,
    "type": "choice",
    "scene": "賢者：「月亮晚上亮亮的，可是它的光是從哪裡來的呢？」",
    "stem": "月亮看起來亮亮的，它的光是從哪裡來的？",
    "options": [
      "月亮自己會發光",
      "月亮裡面有很多燈",
      "星星把光借給月亮",
      "太陽光照到月亮，再反射過來"
    ],
    "answer": 3,
    "option_tags": [
      "moon-self-light",
      "moon-lamps",
      "star-gives-light",
      "ok"
    ],
    "option_why": [
      "月亮自己不會發光，是被太陽照亮的。",
      "月亮上沒有燈，是太陽光把它照亮。",
      "星星離月亮太遠，照亮月亮的是太陽。",
      null
    ],
    "hints": [
      "第1層：黑漆漆的房間裡，白色的牆自己會亮嗎？",
      "第2層：手電筒一照，牆才看起來亮亮的。",
      "第3層：照亮月亮的那支「手電筒」是誰？"
    ],
    "explanation": "月亮自己不會發光。太陽光照到月亮上，再反射到我們的眼睛，我們才看得到月亮。",
    "image_prompt": null,
    "variant_group": "SC4-X-moon-light",
    "uses": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SC_SKY"
  }
];

// ════════════════════════════════════════════════════════════════════
// 來源：成品匣 四年級版規劃/題庫草稿/social_4A_u01.js（53 題；檔頭說明照原檔，題目以 JSON 寫出）
// ════════════════════════════════════════════════════════════════════
// 四年級版學習 RPG — 社會 四上 第一單元「家鄉的地圖與運用」題庫草稿
// 撰寫：A1 108 課綱教案設計師｜初版 2026-10-19（28 題）｜第二版 2026-10-19（補到每節點課綱題 ≥20、概念 ≥6；超綱題改標 beyond_curriculum）
// 狀態：草稿，reviewed 一律 false，待老師審題
//
// 【題數（第二版）】共 53 題＝課綱題 40（1011：20、1012：20）＋超綱題 13（1011：10、1012：3，不算在 20 題裡）
//   課綱題難度分布：1011＝L1 6、L2 6、L3 5、L4 3；1012＝L1 6、L2 6、L3 5、L4 3（照 55 號 GDD 3.5 節建議配比）
//   id 接續：SO4-1011-017～030、SO4-1012-013～023 是新題；001～016、001～012 的 id 都沒改。
//
// 【單元與課名】翰林 四上 第一單元 家鄉的地圖與運用：1-1 閱讀生活中的地圖、1-2 善用地圖好生活
//   - 單元名稱「運用」：臺北市 114 學年度翰林四年級社會課程計畫、金山國小 115 學年四上社會課程計畫（R8 查核）都寫「運用」。
//     https://tten.tp.edu.tw/Login/Downment?grade=4&spid=7349b91b-c5d9-446a-9ab0-fe5586d968c7&subject=Society
//     https://rrcp.ntpc.edu.tw/api/openfile/open?key=b464cb8f-7614-496c-a653-12f3dbd9c9d8
//   - 1-1 三個活動：選擇合適的地圖（行政區圖、導覽圖、電子地圖、衛星影像圖）／讀懂地圖的資訊（圖名、圖例、方向標、比例尺）／好用的電子地圖（放大縮小、導航）。
//   - 1-2 三個活動：利用地圖探索家鄉（行政區）／規畫我的交通路線（交通路線圖、轉乘）／拿著地圖去旅行（觀光導覽圖、規畫行程）。
//
// 【老闆裁示（2026-10-19）怎麼落實】
//   1. 「超綱內容可簡化後由賢者教導學習再測試」：社會領綱第二學習階段的學習內容與說明，沒有一條寫到地圖要素（圖名、圖例、方向標、比例尺）與方位。
//      所以凡是答題要靠這些術語或方位知識的題目，一律標 beyond_curriculum:true，並加 teach 欄位（60 字內的賢者簡化教學）。
//      這 13 題：SO4-1011-005～014、SO4-1012-007、SO4-1012-010、SO4-1012-012。程式要在賢者教過後才出這些題，報表另列。
//      超綱題的 curriculum_code 只表示「相關的學習表現」，不代表課綱列有這項學習內容。
//   2. 「8 方位移動是角色的移動方式，並非學習目標」：本檔沒有任何題目考遊戲的 8 方位移動；地圖的八方位知識照第 1 點列為超綱題。
//   3. 課綱題不得出現超綱術語：原本 SO4-1011-015、016、SO4-1012-004、006、008 的選項或說明用到「圖例」「比例尺」，
//      已改成不靠這些術語的說法（題意、答案位置不變）。檢查程式會擋課綱題裡的「圖例、圖名、方向標、比例尺、方位、東西南北方」等字。
//
// 【出題守則】
//   - 題目全部原創：不照抄課文、課本插圖、習作。課本 1-2 用日月潭導覽圖，本題庫一律改用遊戲自製、虛構站名與景點的台北情境。
//   - 比例尺只出定性題（作用、同一張圖上長短比較），不出距離換算、不出「公里」（數學上5 公里還沒教），uses_math 一律空陣列。
//   - 不出會變動的數字（例如行政區數量、捷運站數）；開放時間一律用虛構場館（「阿咕想去的博物館」），不寫真實場館的休館日。
//   - 題幹 40 字以內；option_why 30 字以內、只講方法，不寫「粗心」「很簡單」。
//
// 【課綱代碼】全部對照國教院社會領綱原文（107 年 10 月）逐字核對（2026-10-19 下載 PDF 全文抽字）：
//   https://www.naer.edu.tw/upload/1/16/doc/819/十二年國民基本教育課程綱要國民中小學暨普通型高級中等校-社會領域.pdf
//   （頁碼是 PDF 檔的頁序，括號內是印刷頁碼）
//   - 1a-Ⅱ-2 分辨社會事物的類別或先後順序。（PDF p.10／印 6）
//   - 1b-Ⅱ-1 解釋社會事物與環境之間的關係。（PDF p.11／印 7）
//   - 3b-Ⅱ-1 透過適當的管道蒐集與學習主題相關的資料，並判讀其正確性。（PDF p.12／印 8）
//   - 3b-Ⅱ-2 摘取相關資料中的重點。（PDF p.12／印 8）
//   - Ab-Ⅱ-1 居民的生活方式與空間利用，和其居住地方的自然、人文環境相互影響。（條文 PDF p.18／印 14；附錄三學習內容說明 PDF p.97／印 93）
//   - Bb-Ⅱ-1 居民的生活空間與生活方式具有地區性的差異。（條文 PDF p.20／印 16；附錄三 PDF p.100／印 96，本條沒有說明文字）
//   注意：「1a-Ⅱ-2」原文是「類別或先後順序」，網路搜尋摘要誤寫成「類別或屬性」，以原文為準。
//   綜合活動領域也有 Ab-Ⅱ-1、Bb-Ⅱ-1 等同號代碼，所以代碼一律加「社會」領域前綴。
//
// 【代碼與課次的對應（推論）】課綱不規定哪一課對哪個代碼。參考嘉義縣大鄉國小 111 學年度翰林四上社會課程計畫：
//   https://course.cyc.edu.tw/upfile/course111/sub1/15090010999711163.pdf
//   地圖種類 → 1a-Ⅱ-2、Bb-Ⅱ-1；地圖與空間的關係 → 1b-Ⅱ-1、Ab-Ⅱ-1。
//   電子地圖判讀資訊對不對、比較紙本與電子地圖 → 3b-Ⅱ-1；從地圖找出需要的資訊、規畫行程 → 3b-Ⅱ-2：A1 依條文推論。
//
// 【explain_status】本單元掛的學習內容是 Ab-Ⅱ-1、Bb-Ⅱ-1，兩條的附錄三說明都已逐字核對 → verified。
//
// 【概念清單（第二版細分；課綱題）】
//   1011（20 題，8 個概念）
//     SO4-maptype-identify  從樣子、內容認出地圖種類            社會 1a-Ⅱ-2、Bb-Ⅱ-1   001 003 017
//     SO4-maptype-choose    依需要選擇合適的地圖                社會 1a-Ⅱ-2、Bb-Ⅱ-1   002 004 024 028（1012-011 也是）
//     SO4-maptype-purpose   某種地圖可以查到什麼                社會 1a-Ⅱ-2、Bb-Ⅱ-1   018 021
//     SO4-emap-zoom         電子地圖放大、縮小                  社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   015 020 027
//     SO4-emap-search       電子地圖搜尋地點                    社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   019 030
//     SO4-emap-nav          電子地圖導航                        社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   016 023
//     SO4-emap-verify       判讀電子地圖資訊的正確性            社會 3b-Ⅱ-1、1b-Ⅱ-1、Ab-Ⅱ-1   025 029（1012-009 也是）
//     SO4-map-compare       比較紙本地圖與電子地圖              社會 3b-Ⅱ-1、1a-Ⅱ-2、Ab-Ⅱ-1   022 026
//   1012（20 題，8 個概念）
//     SO4-route-read        讀路線圖（顏色、站序）              社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   003 013
//     SO4-route-transfer    轉乘站與換車                        社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   001 002 019
//     SO4-route-plan        規畫交通路線（依需要、遇到變化）    社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   008 018 022
//     SO4-admin-read        讀行政區圖（區界、相鄰、分色）      社會 1a-Ⅱ-2、Bb-Ⅱ-1   004 005 016 023
//     SO4-guide-use         用導覽圖找設施                      社會 1b-Ⅱ-1、3b-Ⅱ-2、Ab-Ⅱ-1   006 014 020
//     SO4-trip-plan         拿著地圖規畫行程（準備、開放時間）  社會 3b-Ⅱ-2、3b-Ⅱ-1、Ab-Ⅱ-1   015 017 021
//     SO4-emap-verify、SO4-maptype-choose（009、011）
//   超綱題概念：SO4-beyond-legend（圖例）、SO4-beyond-title（圖名）、SO4-beyond-dirmarker（方向標）、
//     SO4-beyond-dir4（四方位、上北下南）、SO4-beyond-dir8（八方位）、SO4-beyond-scale（比例尺）
//
// 【待查證】
//   1. 翰林四上是否教「八方位」、是否明寫「沒有方向標時上方為北」：已依裁示改列超綱題，不影響課綱題數；老師對課本後若確認有教，可把 beyond_curriculum 改回 false。
//   2. 「手繪地圖」只當錯誤選項，課程計畫列的地圖種類沒有它。
//
// 【欄位】沿用三年級版 questions.js 格式，另加：grade、lesson、node（學期×1000＋單元×10＋課）、curriculum_code（含領域前綴）、
//   explain_status、beyond_curriculum（true＝超綱，賢者教過才出）、teach（超綱題才有，60 字內）、concept、option_tags（"ok"＝正解）、
//   option_why（正解為空字串）、read_aloud、uses_math、image_prompt／img_alt（需要圖的題目才有）。
window.QUESTIONS_G4_SOC_U01 = [
  {
    "id": "SO4-1011-001",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-identify",
    "variant_group": "SO4-maptype-guide",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在動物園門口拿到一張地圖，上面畫著可愛的動物、步道和廁所。",
    "stem": "這種介紹景點、設施和步道的地圖，是哪一種地圖？",
    "options": [
      "衛星影像圖",
      "行政區圖",
      "觀光導覽圖",
      "交通路線圖"
    ],
    "answer": 2,
    "option_tags": [
      "maptype-satellite",
      "maptype-admin",
      "ok",
      "maptype-route"
    ],
    "option_why": [
      "衛星影像圖是從高空拍下的真實影像。",
      "行政區圖畫的是各區的範圍和界線。",
      "",
      "交通路線圖主要畫車子或捷運的路線。"
    ],
    "hints": [
      "第1層：這張地圖是給誰用的？是來玩的遊客。",
      "第2層：它告訴遊客景點在哪裡、要怎麼走過去。",
      "第3層：給遊客看、介紹景點的地圖，名字裡有「導覽」兩個字。"
    ],
    "explanation": "介紹景點、設施和步道，方便遊客參觀的地圖，叫做觀光導覽圖。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-002",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-choose",
    "variant_group": "SO4-maptype-admin",
    "level": 2,
    "type": "choice",
    "scene": "老師說：「臺北市分成好幾個區，我們來找找自己住在哪一區。」",
    "stem": "想知道臺北市有哪些區、各區在哪裡，最適合看哪一種地圖？",
    "options": [
      "行政區圖",
      "衛星影像圖",
      "公園導覽圖",
      "捷運路線圖"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "maptype-satellite",
      "maptype-guide",
      "maptype-route"
    ],
    "option_why": [
      "",
      "衛星影像看得到房子，但沒有畫出區的界線。",
      "公園導覽圖只畫公園裡的景點和設施。",
      "捷運路線圖畫的是路線和車站，不是區界。"
    ],
    "hints": [
      "第1層：題目要找的是「區」的位置和範圍。",
      "第2層：哪一種地圖會把每一區的界線畫出來？",
      "第3層：「區」是行政上的分區，看名字裡有「行政區」的地圖。"
    ],
    "explanation": "行政區圖畫出各區的範圍和界線，可以看出有哪些區、各區在哪裡。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-003",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-identify",
    "variant_group": "SO4-maptype-satellite",
    "level": 1,
    "type": "choice",
    "scene": "阿咕用平板打開一張從很高的天空拍下的真實照片，看得到屋頂和綠綠的樹林。",
    "stem": "這種從高空拍下地面真實樣子的圖，叫做什麼？",
    "options": [
      "手繪地圖",
      "行政區圖",
      "觀光導覽圖",
      "衛星影像圖"
    ],
    "answer": 3,
    "option_tags": [
      "maptype-handdrawn",
      "maptype-admin",
      "maptype-guide",
      "ok"
    ],
    "option_why": [
      "手繪地圖是用手畫的，不是拍下來的。",
      "行政區圖是畫出來的區界，不是照片。",
      "觀光導覽圖是畫給遊客看的，常有可愛圖案。",
      ""
    ],
    "hints": [
      "第1層：這張圖是「畫」的，還是「拍」的？",
      "第2層：它是從很高很高的地方往下拍的。",
      "第3層：在太空中繞著地球拍照的是衛星。"
    ],
    "explanation": "從高空用衛星拍下地面真實樣子的圖，叫做衛星影像圖。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-004",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-choose",
    "variant_group": "SO4-maptype-choose",
    "level": 3,
    "type": "choice",
    "scene": "你在不熟的街上找不到要去的書店，想先知道自己現在在哪裡。",
    "stem": "哪一種地圖最能告訴你「我現在在哪裡」？",
    "options": [
      "一張沒有路名的手繪圖",
      "能顯示目前位置的電子地圖",
      "課本裡的臺灣行政區圖",
      "去年活動的宣傳海報"
    ],
    "answer": 1,
    "option_tags": [
      "map-missing-info",
      "ok",
      "maptype-scale-mismatch",
      "not-a-map"
    ],
    "option_why": [
      "沒有路名，很難對照你現在站的位置。",
      "",
      "臺灣行政區圖範圍太大，也不會標出你的位置。",
      "海報不是地圖，也不會顯示你在哪裡。"
    ],
    "hints": [
      "第1層：題目要的是「我現在在哪裡」。",
      "第2層：哪一種地圖會跟著你移動，標出你的位置？",
      "第3層：手機或平板上的地圖，常有一個點代表你。"
    ],
    "explanation": "電子地圖可以顯示目前位置，找路時最方便；要依需要選合適的地圖。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-005",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-legend",
    "variant_group": "SO4-legend",
    "level": 1,
    "type": "choice",
    "scene": "河濱公園導覽圖的角落有一個小框，寫著「P＝停車場」「▲＝涼亭」。",
    "stem": "地圖上說明各種符號代表什麼的地方，叫做什麼？",
    "options": [
      "方向標",
      "圖名",
      "圖例",
      "比例尺"
    ],
    "answer": 2,
    "option_tags": [
      "elem-dir",
      "elem-title",
      "ok",
      "elem-scale"
    ],
    "option_why": [
      "方向標是告訴我們哪邊是北方的記號。",
      "圖名是地圖的名字，通常寫在最上方。",
      "",
      "比例尺告訴我們地圖縮小了多少。"
    ],
    "hints": [
      "第1層：小框裡寫的是「符號＝什麼地方」。",
      "第2層：它在「舉例說明」圖上的符號。",
      "第3層：把圖上的符號一一說明的地方，叫做「圖」什麼？"
    ],
    "explanation": "圖例說明地圖上各種符號代表什麼，看地圖時要先對照圖例。",
    "teach": "賢者：地圖角落說明符號的小框叫「圖例」。看到不認識的符號，先去圖例找它代表什麼。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-006",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-legend",
    "variant_group": "SO4-legend",
    "level": 2,
    "type": "choice",
    "scene": "導覽圖的圖例寫著：「★＝遊客中心」「P＝停車場」。",
    "stem": "地圖上畫著一顆★，表示那裡有什麼？",
    "options": [
      "最好玩的地方",
      "遊客中心",
      "一顆真正的星星",
      "停車場"
    ],
    "answer": 1,
    "option_tags": [
      "legend-guess",
      "ok",
      "symbol-literal",
      "legend-misread"
    ],
    "option_why": [
      "符號的意思要看圖例，不能自己猜。",
      "",
      "地圖符號代表某種地方，不是真的東西。",
      "P 才是停車場，要對照圖例找符號。"
    ],
    "hints": [
      "第1層：先找到圖例裡的★。",
      "第2層：圖例說★等於什麼？",
      "第3層：圖例寫「★＝遊客中心」。"
    ],
    "explanation": "對照圖例，★代表遊客中心；符號的意思一定要看圖例。",
    "teach": "賢者：符號的意思不要用猜的。在圖例裡找到同一個符號，旁邊寫的就是它代表的地方。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-007",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-title",
    "variant_group": "SO4-title",
    "level": 1,
    "type": "choice",
    "scene": "公園入口的大看板上方，寫著「河濱公園導覽圖」幾個大字。",
    "stem": "「河濱公園導覽圖」這行字，是地圖的哪一個部分？",
    "options": [
      "圖名",
      "比例尺",
      "圖例",
      "方向標"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "elem-scale",
      "elem-legend",
      "elem-dir"
    ],
    "option_why": [
      "",
      "比例尺告訴我們地圖縮小了多少。",
      "圖例是解釋符號意思的地方。",
      "方向標是指出北方的記號。"
    ],
    "hints": [
      "第1層：這行字告訴我們這是一張什麼地圖。",
      "第2層：它就像這張地圖的名字。",
      "第3層：地圖的名字叫做「圖」什麼？"
    ],
    "explanation": "圖名是地圖的名字，告訴我們這張地圖畫的是哪裡、是什麼內容。",
    "teach": "賢者：地圖的名字叫「圖名」，通常寫在最上方，告訴你這張圖畫的是哪裡、畫了什麼。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-008",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dirmarker",
    "variant_group": "SO4-dir-marker",
    "level": 1,
    "type": "choice",
    "scene": "地圖的右下角有一個箭頭，箭頭旁邊寫著「北」。",
    "stem": "這個用來指出方向的記號，叫做什麼？",
    "options": [
      "圖例",
      "比例尺",
      "方向標",
      "圖名"
    ],
    "answer": 2,
    "option_tags": [
      "elem-legend",
      "elem-scale",
      "ok",
      "elem-title"
    ],
    "option_why": [
      "圖例是解釋符號意思的地方。",
      "比例尺告訴我們地圖縮小了多少。",
      "",
      "圖名是地圖的名字。"
    ],
    "hints": [
      "第1層：這個記號在告訴我們什麼？",
      "第2層：箭頭旁邊寫著「北」，是在標示方向。",
      "第3層：標示方向的記號，叫做「方向」什麼？"
    ],
    "explanation": "方向標告訴我們地圖上的北方在哪裡，有了它才能判斷東南西北。",
    "teach": "賢者：畫著箭頭、旁邊寫「北」的記號叫「方向標」。箭頭指的那一邊，就是北方。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-009",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dir4",
    "variant_group": "SO4-dir4",
    "level": 2,
    "type": "choice",
    "scene": "這張地圖的方向標，箭頭指向地圖的上方，寫著「北」。",
    "stem": "上方是北方，那麼地圖的右邊是哪一個方向？",
    "options": [
      "東方",
      "北方",
      "南方",
      "西方"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "dir-same",
      "dir-opposite",
      "dir-east-west-swap"
    ],
    "option_why": [
      "",
      "北方在上方，題目問的是右邊。",
      "南方在地圖的下方，和北方相反。",
      "上北下南時，右邊是東、左邊是西，別弄反。"
    ],
    "hints": [
      "第1層：先找到北方在哪一邊。",
      "第2層：北方在上面，南方就在下面。",
      "第3層：記住「上北、下南、左西、右東」。"
    ],
    "explanation": "上方是北方時，下方是南方，左邊是西方，右邊是東方。",
    "teach": "賢者：地圖上方是北方時，下方是南方，右邊是東方，左邊是西方，記成「上北、下南、左西、右東」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_8DIR"
  },
  {
    "id": "SO4-1011-010",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dir4",
    "variant_group": "SO4-dir4",
    "level": 1,
    "type": "choice",
    "scene": "地圖的上方是北方。圖書館畫在學校的正上方。",
    "stem": "圖書館在學校的哪一個方向？",
    "options": [
      "東方",
      "南方",
      "西方",
      "北方"
    ],
    "answer": 3,
    "option_tags": [
      "dir-side",
      "dir-opposite",
      "dir-side",
      "ok"
    ],
    "option_why": [
      "東方在右邊，圖書館不在學校右邊。",
      "南方在下方，圖書館畫在學校上方。",
      "西方在左邊，圖書館不在學校左邊。",
      ""
    ],
    "hints": [
      "第1層：圖書館畫在學校的哪一邊？",
      "第2層：圖書館在學校的上方。",
      "第3層：這張地圖的上方代表哪一個方向？"
    ],
    "explanation": "地圖上方是北方，圖書館畫在學校正上方，所以在學校的北方。",
    "teach": "賢者：先看哪一邊是北方。北方在上面時，畫在某地正上方的地點，就在它的北方。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_8DIR"
  },
  {
    "id": "SO4-1011-011",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dir8",
    "variant_group": "SO4-dir8",
    "level": 3,
    "type": "choice",
    "scene": "阿咕說：「公園在車站北方和東方的中間。」",
    "stem": "北方和東方中間的方向，叫做什麼？",
    "options": [
      "東北方",
      "西北方",
      "西南方",
      "東南方"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "dir8-ew-swap",
      "dir8-both-swap",
      "dir8-ns-swap"
    ],
    "option_why": [
      "",
      "西北方在北方和西方的中間。",
      "西南方在西方和南方的中間。",
      "東南方在東方和南方的中間。"
    ],
    "hints": [
      "第1層：題目說的是「北方」和「東方」的中間。",
      "第2層：兩個方向合起來，就是這個方位的名字。",
      "第3層：先說東、再說北，合起來念念看。"
    ],
    "explanation": "北方和東方的中間叫東北方；同樣的，西方和南方的中間叫西南方。",
    "teach": "賢者：兩個方向的中間，把名字合起來就好：東和北中間叫東北，西和南中間叫西南，一共八個方位。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_8DIR"
  },
  {
    "id": "SO4-1011-012",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dir4",
    "variant_group": "SO4-dir4",
    "level": 2,
    "type": "choice",
    "scene": "阿咕撿到一張小地圖，上面找不到方向標。",
    "stem": "地圖上沒有畫方向標時，通常哪一邊是北方？",
    "options": [
      "下方",
      "右邊",
      "上方",
      "左邊"
    ],
    "answer": 2,
    "option_tags": [
      "dir-opposite",
      "dir-side",
      "ok",
      "dir-side"
    ],
    "option_why": [
      "下方通常是南方。",
      "右邊通常是東方。",
      "",
      "左邊通常是西方。"
    ],
    "hints": [
      "第1層：想一想遊戲裡的小地圖，北方在哪一邊？",
      "第2層：一般地圖習慣「上北、下南」。",
      "第3層：「上北」的意思就是上方是北方。"
    ],
    "explanation": "一般地圖習慣上北下南、左西右東；如果有方向標，就以方向標為準。",
    "teach": "賢者：大多數地圖習慣把北方畫在上方。如果地圖上有方向標，就照方向標來判斷。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_8DIR"
  },
  {
    "id": "SO4-1011-013",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；比例尺只出定性題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-scale",
    "variant_group": "SO4-scale-qual",
    "level": 1,
    "type": "choice",
    "scene": "地圖比真實的地方小很多，阿咕想知道它縮小了多少。",
    "stem": "地圖上用來表示「地圖縮小了多少」的是什麼？",
    "options": [
      "方向標",
      "圖名",
      "圖例",
      "比例尺"
    ],
    "answer": 3,
    "option_tags": [
      "elem-dir",
      "elem-title",
      "elem-legend",
      "ok"
    ],
    "option_why": [
      "方向標是指出北方的記號。",
      "圖名是地圖的名字。",
      "圖例是解釋符號意思的地方。",
      ""
    ],
    "hints": [
      "第1層：題目問的是「縮小了多少」。",
      "第2層：它常畫成一小段有刻度的線。",
      "第3層：名字裡有一個「尺」字。"
    ],
    "explanation": "比例尺表示地圖比真實的地方縮小了多少，可以用來比較實際的遠近。",
    "teach": "賢者：地圖是把真實的地方縮小畫出來的。「比例尺」告訴我們，地圖比真實縮小了多少。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-014",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動二：讀懂地圖的資訊（同主題原創，非課文題；比例尺只出定性題，不換算距離；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-scale",
    "variant_group": "SO4-scale-qual",
    "level": 3,
    "type": "choice",
    "scene": "同一張地圖上，甲到乙畫的直線很長，甲到丙畫的直線很短。",
    "stem": "實際上，甲到乙和甲到丙，哪一段的直線距離比較遠？",
    "options": [
      "地圖上看不出遠近",
      "兩段一樣遠",
      "甲到乙比較遠",
      "甲到丙比較遠"
    ],
    "answer": 2,
    "option_tags": [
      "scale-useless",
      "scale-ignore",
      "ok",
      "scale-inverse"
    ],
    "option_why": [
      "同一張地圖可以用圖上長短比較遠近。",
      "同一張圖縮小程度一樣，圖上長的比較遠。",
      "",
      "甲到丙在圖上比較短，實際上也比較近。"
    ],
    "hints": [
      "第1層：這兩段畫在「同一張」地圖上。",
      "第2層：同一張地圖，每個地方縮小的程度都一樣。",
      "第3層：圖上畫得越長，真實的距離就越遠。"
    ],
    "explanation": "同一張地圖的比例尺一樣，圖上越長的直線，實際的直線距離也越遠。",
    "teach": "賢者：同一張地圖，每個地方縮小的程度都一樣，所以圖上畫得越長，真實的距離就越遠。",
    "image_prompt": "【需要圖表】類型：簡易示意地圖（遊戲自製）\n內容：一張白底地圖，三個圓點分別寫「甲」「乙」「丙」；甲到乙用一條長直線連起來，甲到丙用一條短直線連起來；右下角有方向標（箭頭朝上寫「北」）與一段不寫數字的比例尺線條\n標注：甲、乙、丙、北；比例尺不寫任何數字或單位\n風格：遊戲高解析像素風，淺色底、清楚線條，不仿照課本插圖",
    "img_alt": "地圖上甲到乙是一條長線，甲到丙是一條短線。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-015",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-zoom",
    "variant_group": "SO4-emap-zoom",
    "level": 1,
    "type": "choice",
    "scene": "你在平板上看電子地圖，路名的字太小，看不清楚。",
    "stem": "想把路名看清楚，可以怎麼做？",
    "options": [
      "把螢幕調暗一點",
      "把地圖放大",
      "換成行政區圖",
      "把地圖縮小"
    ],
    "answer": 1,
    "option_tags": [
      "emap-irrelevant",
      "ok",
      "maptype-mismatch",
      "emap-zoom-reverse"
    ],
    "option_why": [
      "調暗螢幕不會讓字變大。",
      "",
      "行政區圖看的是各區範圍，路名不會變清楚。",
      "縮小會看到更大範圍，字會變得更小。"
    ],
    "hints": [
      "第1層：字太小，要讓它變大還是變小？",
      "第2層：電子地圖可以用兩根手指拉開或按「＋」。",
      "第3層：這個動作叫做「放大」。"
    ],
    "explanation": "電子地圖可以放大和縮小；想看清楚細節就放大，想看大範圍就縮小。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-016",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-nav",
    "variant_group": "SO4-emap-nav",
    "level": 2,
    "type": "choice",
    "scene": "媽媽在電子地圖輸入「動物園」，地圖畫出路線，還會說「前方路口右轉」。",
    "stem": "電子地圖這種一路帶你走到目的地的功能，叫什麼？",
    "options": [
      "導航",
      "截圖",
      "放大",
      "列印"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "emap-screenshot",
      "emap-zoom",
      "emap-print"
    ],
    "option_why": [
      "",
      "截圖只是把畫面存起來，不會帶路。",
      "放大只是把畫面變大，不會告訴你怎麼走。",
      "列印是把地圖印在紙上，不會一路提示。"
    ],
    "hints": [
      "第1層：這個功能會一路告訴你怎麼走。",
      "第2層：它會說「右轉」「直走」，像在帶路。",
      "第3層：「引導你到目的地」叫做什麼？"
    ],
    "explanation": "導航會規畫路線，並一路提示怎麼走，帶我們到目的地。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-001",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題；路線圖為遊戲自製虛構站名）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-transfer",
    "variant_group": "SO4-route-transfer",
    "level": 1,
    "type": "choice",
    "scene": "捷運路線圖（遊戲自製）：紅線和藍線在「中央站」交會。",
    "stem": "兩條路線交會的中央站，可以讓乘客做什麼？",
    "options": [
      "換搭另一條路線",
      "買便當和飲料",
      "讓列車停下來休息",
      "只能下車，不能換線"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "route-irrelevant",
      "route-irrelevant",
      "transfer-misread"
    ],
    "option_why": [
      "",
      "路線圖只畫路線和車站，不畫賣什麼。",
      "交會點表示兩條路線在這一站相連。",
      "交會的車站就是轉乘站，可以換線。"
    ],
    "hints": [
      "第1層：找到紅線和藍線碰在一起的那一站。",
      "第2層：兩條線都經過這一站。",
      "第3層：在這一站可以從紅線換到藍線，這叫「轉乘」。"
    ],
    "explanation": "兩條路線交會的車站是轉乘站，乘客可以在這裡換搭另一條路線。",
    "image_prompt": "【需要圖表】類型：捷運路線圖（遊戲自製，虛構站名）\n內容：紅線由左到右依序是「河岸站」「中央站」「學府站」；藍線由上到下依序是「山腳站」「中央站」「海港站」；兩線在「中央站」交叉，中央站畫成較大的雙圈\n標注：五個站名、紅線、藍線；右下角圖例「◎＝轉乘站」\n風格：遊戲高解析像素風，簡潔清楚，不仿照臺北捷運官方路線圖，也不用真實站名",
    "img_alt": "紅線和藍線在中央站交叉，中央站是轉乘站。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-002",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題；路線圖為遊戲自製虛構站名）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-transfer",
    "variant_group": "SO4-route-transfer",
    "level": 2,
    "type": "choice",
    "scene": "路線圖：紅線依序是河岸站、中央站、學府站；藍線依序是山腳站、中央站、海港站。",
    "stem": "從河岸站要去海港站，應該在哪一站換車？",
    "options": [
      "不用換車",
      "中央站",
      "學府站",
      "山腳站"
    ],
    "answer": 1,
    "option_tags": [
      "route-same-line",
      "ok",
      "route-overshoot",
      "route-wrong-line"
    ],
    "option_why": [
      "河岸站在紅線、海港站在藍線，要換車。",
      "",
      "學府站只有紅線，在那裡換不到藍線。",
      "山腳站在藍線另一頭，要先到中央站。"
    ],
    "hints": [
      "第1層：河岸站在哪一條線？海港站在哪一條線？",
      "第2層：兩站不在同一條線上，要找兩條線都經過的站。",
      "第3層：紅線和藍線交會在哪一站？"
    ],
    "explanation": "河岸站在紅線、海港站在藍線，要在兩線交會的中央站換車。",
    "image_prompt": "同 SO4-1012-001 的捷運路線圖（遊戲自製，虛構站名），可共用同一張圖",
    "img_alt": "紅線：河岸、中央、學府；藍線：山腳、中央、海港。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-003",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-read",
    "variant_group": "SO4-route-read",
    "level": 1,
    "type": "choice",
    "scene": "車站牆上的捷運路線圖，畫著紅、藍、綠、橘好幾種顏色的線。",
    "stem": "捷運路線圖用不同顏色畫線，主要是為了什麼？",
    "options": [
      "表示哪一站人比較多",
      "分辨不同的路線",
      "表示列車開多快",
      "讓圖看起來漂亮而已"
    ],
    "answer": 1,
    "option_tags": [
      "color-crowd",
      "ok",
      "color-speed",
      "color-decor"
    ],
    "option_why": [
      "路線圖沒有畫出各站人多不多。",
      "",
      "路線圖只畫路線和車站，沒有畫速度。",
      "顏色有意思：一種顏色代表一條路線。"
    ],
    "hints": [
      "第1層：每一種顏色的線，經過的車站一樣嗎？",
      "第2層：同一種顏色的線，就是同一條路線。",
      "第3層：顏色是用來「分辨」什麼的？"
    ],
    "explanation": "路線圖用不同顏色代表不同路線，看顏色就能分辨要搭哪一條線。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-004",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動一：利用地圖探索家鄉（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-admin-read",
    "variant_group": "SO4-admin-boundary",
    "level": 2,
    "type": "choice",
    "scene": "臺北市行政區圖上，各區之間有一條條細細的線。",
    "stem": "行政區圖上，區和區之間的線代表什麼？",
    "options": [
      "馬路",
      "河流",
      "捷運路線",
      "區和區的界線"
    ],
    "answer": 3,
    "option_tags": [
      "line-road",
      "line-river",
      "line-route",
      "ok"
    ],
    "option_why": [
      "行政區圖主要畫區界，這些線不是馬路。",
      "河流常畫成藍色；分開各區的線是區界。",
      "捷運路線要看路線圖，不是區界。",
      ""
    ],
    "hints": [
      "第1層：行政區圖最主要想告訴我們什麼？",
      "第2層：每一區都有自己的範圍。",
      "第3層：把兩區分開的線，叫做什麼線？"
    ],
    "explanation": "行政區圖上分開各區的線是界線，可以看出每一區的範圍。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-005",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動一：利用地圖探索家鄉（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-admin-read",
    "variant_group": "SO4-admin-use",
    "level": 3,
    "type": "choice",
    "scene": "阿咕想介紹自己住的區，還想知道旁邊有哪些區。",
    "stem": "看行政區圖，可以知道下面哪一件事？",
    "options": [
      "哪一班捷運比較擠",
      "今天哪一區在下雨",
      "哪些區彼此相鄰",
      "每家商店幾點開門"
    ],
    "answer": 2,
    "option_tags": [
      "info-crowd",
      "info-weather",
      "ok",
      "info-hours"
    ],
    "option_why": [
      "擠不擠在地圖上看不出來。",
      "天氣要看氣象報告，地圖上不會寫。",
      "",
      "營業時間要看店家公告，地圖上不會寫。"
    ],
    "hints": [
      "第1層：行政區圖畫出了每一區的範圍。",
      "第2層：從圖上可以看到每一區旁邊挨著哪些區。",
      "第3層：天氣、營業時間、人多不多，地圖上都沒有畫。"
    ],
    "explanation": "行政區圖可以看出有哪些區、各區的位置，以及哪些區彼此相鄰。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-006",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題；不使用課本的日月潭導覽圖）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-guide-use",
    "variant_group": "SO4-guide-legend",
    "level": 2,
    "type": "choice",
    "scene": "公園導覽圖上畫著：飲水機、廁所、遊樂場、停車場。",
    "stem": "玩累了口渴，想裝水喝，要在導覽圖上找哪一個地方？",
    "options": [
      "飲水機",
      "遊樂場",
      "廁所",
      "停車場"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "need-mismatch",
      "need-mismatch",
      "need-mismatch"
    ],
    "option_why": [
      "",
      "遊樂場是玩的地方，裝水要找飲水機。",
      "廁所不是喝水的地方，要找飲水機。",
      "停車場是停車用的，裝水要找飲水機。"
    ],
    "hints": [
      "第1層：你現在需要的是什麼？",
      "第2層：要找可以裝水的地方。",
      "第3層：哪一個地方和「喝水」有關？"
    ],
    "explanation": "先想清楚自己的需要，再到導覽圖上找對應的地方。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-007",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題；導覽圖為遊戲自製；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dir4",
    "variant_group": "SO4-guide-route",
    "level": 3,
    "type": "choice",
    "scene": "導覽圖北方朝上：溜滑梯在入口的北方，花園在溜滑梯東方，池塘在溜滑梯西方。",
    "stem": "從入口往北走到溜滑梯，再往東走，會到哪裡？",
    "options": [
      "池塘",
      "入口",
      "花園",
      "溜滑梯"
    ],
    "answer": 2,
    "option_tags": [
      "dir-east-west-swap",
      "dir-reverse",
      "ok",
      "route-stop-early"
    ],
    "option_why": [
      "池塘在溜滑梯西方，往東走不會到。",
      "一直往北再往東，不會走回入口。",
      "",
      "到溜滑梯後還要再往東走一段。"
    ],
    "hints": [
      "第1層：先從入口往北走，會到哪裡？",
      "第2層：到了溜滑梯，再往東走。",
      "第3層：北方朝上時，東方在右邊；溜滑梯右邊是什麼？"
    ],
    "explanation": "入口往北是溜滑梯，溜滑梯再往東就是花園；西方的池塘方向相反。",
    "teach": "賢者：照方位走路時，先找到北方。北方在上面時，往東就是往右走，往西就是往左走。",
    "image_prompt": "【需要圖表】類型：公園導覽圖（遊戲自製，虛構公園）\n內容：方向標箭頭朝上寫「北」；最下方中央是「入口」；入口正上方是「溜滑梯」；溜滑梯右邊是「花園」，左邊是「池塘」；地圖下方另有一小塊「停車場」\n標注：入口、溜滑梯、花園、池塘、停車場、北；角落圖例\n風格：遊戲高解析像素風，色塊清楚，不仿照課本插圖",
    "img_alt": "入口上方是溜滑梯，溜滑梯右邊是花園，左邊是池塘。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_8DIR"
  },
  {
    "id": "SO4-1012-008",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-plan",
    "variant_group": "SO4-route-plan",
    "level": 2,
    "type": "choice",
    "scene": "全班要用地圖規畫去博物館的路線。",
    "stem": "規畫路線時，第一步最好先做什麼？",
    "options": [
      "先數地圖上有幾種顏色",
      "直接出發，邊走邊問",
      "先把地圖折得小小的",
      "在地圖上找出起點和終點"
    ],
    "answer": 3,
    "option_tags": [
      "plan-irrelevant",
      "plan-skip",
      "plan-irrelevant",
      "ok"
    ],
    "option_why": [
      "顏色多少幫不了規畫，要先找起點終點。",
      "先在地圖上規畫好，出發才不容易迷路。",
      "折起來看不清楚，要先找起點和終點。",
      ""
    ],
    "hints": [
      "第1層：規畫路線，要知道從哪裡出發、要去哪裡。",
      "第2層：先在地圖上把這兩個地方找出來。",
      "第3層：「起點」和「終點」都找到了，才能選路線。"
    ],
    "explanation": "規畫路線要先找出起點和終點，再看地圖選擇要走的路或要搭的車。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-009",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-1 活動三、1-2 活動二（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-1",
      "社會 1b-Ⅱ-1",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-verify",
    "variant_group": "SO4-emap-verify",
    "level": 3,
    "type": "choice",
    "scene": "電子地圖說前面可以直走，可是現場立著「道路施工，請改道」的牌子。",
    "stem": "這時候最好怎麼做？",
    "options": [
      "照電子地圖直走過去",
      "把電子地圖刪掉",
      "站在原地一直等",
      "依現場標示改走別的路"
    ],
    "answer": 3,
    "option_tags": [
      "emap-overtrust",
      "emap-reject",
      "plan-skip",
      "ok"
    ],
    "option_why": [
      "地圖可能還沒更新，要以現場標示為準。",
      "電子地圖也會有錯，平常還是能使用它。",
      "可以重新規畫路線，不用一直等。",
      ""
    ],
    "hints": [
      "第1層：電子地圖和現場的牌子說的不一樣。",
      "第2層：哪一個是現在、現場的真實狀況？",
      "第3層：遇到施工，要照現場標示改道，再重新找路。"
    ],
    "explanation": "電子地圖的資料可能還沒更新；要對照現場標示，判斷資訊對不對。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-010",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-dir8",
    "variant_group": "SO4-dir8",
    "level": 3,
    "type": "choice",
    "scene": "地圖北方朝上：捷運站畫在左下角，學校畫在右上角。",
    "stem": "學校在捷運站的哪一個方向？",
    "options": [
      "西北方",
      "東北方",
      "西南方",
      "東南方"
    ],
    "answer": 1,
    "option_tags": [
      "dir8-ew-swap",
      "ok",
      "dir8-reverse",
      "dir8-ns-swap"
    ],
    "option_why": [
      "學校在右邊，右邊是東，不是西。",
      "",
      "反過來了：捷運站才在學校的西南方。",
      "學校在上方，上方是北，不是南。"
    ],
    "hints": [
      "第1層：從捷運站看過去，學校在上面還是下面？",
      "第2層：學校在上方（北），也在右邊（東）。",
      "第3層：北和東合起來，是哪一個方向？"
    ],
    "explanation": "學校在捷運站的上方和右邊，也就是北方和東方之間，是東北方。",
    "teach": "賢者：一個地點如果在上方又在右邊，就是在北方和東方的中間，叫做東北方。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_8DIR"
  },
  {
    "id": "SO4-1012-011",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-choose",
    "variant_group": "SO4-maptype-choose",
    "level": 2,
    "type": "choice",
    "scene": "外婆要搭公車來看你，想知道要搭哪一路車。",
    "stem": "想知道要搭哪一路公車、在哪一站下車，要看什麼？",
    "options": [
      "公園導覽圖",
      "公車路線圖",
      "行政區圖",
      "衛星影像圖"
    ],
    "answer": 1,
    "option_tags": [
      "maptype-guide",
      "ok",
      "maptype-admin",
      "maptype-satellite"
    ],
    "option_why": [
      "公園導覽圖只介紹公園裡的設施。",
      "",
      "行政區圖畫的是各區範圍，沒有公車站。",
      "衛星影像只有地面樣子，沒有公車路線。"
    ],
    "hints": [
      "第1層：題目要找的是「公車」怎麼走。",
      "第2層：哪一種地圖會畫出公車經過的站？",
      "第3層：畫出車子路線和站牌的，是「路線圖」。"
    ],
    "explanation": "公車路線圖畫出每一路公車經過哪些站，可以用來規畫搭車路線。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-012",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（實作繪製）（同主題原創，非課文題；課綱第二學習階段沒有列這項內容，依老闆 2026-10-19 裁示列為超綱題：賢者教學後才出題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": true,
    "concept": "SO4-beyond-legend",
    "variant_group": "SO4-legend",
    "level": 3,
    "type": "choice",
    "scene": "小組在畫社區地圖，用「●」代表學校、「■」代表市場。",
    "stem": "為什麼要在地圖角落加上圖例？",
    "options": [
      "寫出這張地圖的名字",
      "告訴別人哪邊是北方",
      "讓地圖變得比較大",
      "讓別人看懂符號的意思"
    ],
    "answer": 3,
    "option_tags": [
      "elem-title",
      "elem-dir",
      "elem-confuse",
      "ok"
    ],
    "option_why": [
      "地圖的名字是圖名，不是圖例。",
      "指出北方的是方向標，不是圖例。",
      "圖例不會改變地圖大小，它解釋符號。",
      ""
    ],
    "hints": [
      "第1層：別人看到「●」，知道它是什麼嗎？",
      "第2層：要有一個地方說明每個符號的意思。",
      "第3層：說明符號意思的，就是圖例。"
    ],
    "explanation": "自己畫的符號別人不一定看得懂，加上圖例說明，看地圖的人才知道符號的意思。",
    "teach": "賢者：自己畫地圖時，用了什麼符號，就要在圖例寫清楚它代表什麼，別人才看得懂。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "beyond_topic": "SAGE_SO_MAP4"
  },
  {
    "id": "SO4-1011-017",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-identify",
    "variant_group": "SO4-maptype-emap",
    "level": 1,
    "type": "choice",
    "scene": "阿咕用平板打開一張地圖，手指一拉就能放大，還能輸入地名找地方。",
    "stem": "這種在手機或平板上使用的地圖，叫做什麼？",
    "options": [
      "行政區圖",
      "電子地圖",
      "手繪地圖",
      "觀光導覽圖"
    ],
    "answer": 1,
    "option_tags": [
      "maptype-admin",
      "ok",
      "maptype-handdrawn",
      "maptype-guide"
    ],
    "option_why": [
      "行政區圖畫的是各區的範圍和界線。",
      "",
      "手繪地圖是用手畫在紙上的。",
      "導覽圖介紹景點，不一定能搜尋。"
    ],
    "hints": [
      "第1層：這張地圖是在什麼東西上看的？",
      "第2層：它在平板裡，可以放大、搜尋。",
      "第3層：用電子產品看的地圖，叫「電子」什麼？"
    ],
    "explanation": "在手機、平板或電腦上使用，可以放大縮小、搜尋地點的地圖，叫做電子地圖。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-018",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-purpose",
    "variant_group": "SO4-maptype-route-content",
    "level": 1,
    "type": "choice",
    "scene": "捷運車站的牆上，貼著一張捷運路線圖。",
    "stem": "捷運路線圖上，主要可以看到什麼？",
    "options": [
      "每一家商店的位置",
      "各區的界線",
      "各條路線和車站",
      "明天的天氣"
    ],
    "answer": 2,
    "option_tags": [
      "info-shop",
      "maptype-admin",
      "ok",
      "info-weather"
    ],
    "option_why": [
      "路線圖不會畫出每一家商店。",
      "各區的界線要看行政區圖。",
      "",
      "天氣要看氣象報告，路線圖不會寫。"
    ],
    "hints": [
      "第1層：這張圖的名字裡有「路線」兩個字。",
      "第2層：搭捷運的人最需要知道什麼？",
      "第3層：要知道有哪些路線、會停哪些車站。"
    ],
    "explanation": "捷運路線圖畫出各條路線和經過的車站，方便我們規畫怎麼搭車。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-019",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-search",
    "variant_group": "SO4-emap-search",
    "level": 1,
    "type": "choice",
    "scene": "阿咕想知道圖書館在哪裡，打開了電子地圖。",
    "stem": "想最快找到圖書館的位置，可以怎麼做？",
    "options": [
      "把地圖縮到最小",
      "把平板關機",
      "一直往旁邊滑來滑去",
      "在搜尋欄輸入「圖書館」"
    ],
    "answer": 3,
    "option_tags": [
      "emap-zoom-misuse",
      "emap-irrelevant",
      "emap-slow",
      "ok"
    ],
    "option_why": [
      "縮到最小只看到大範圍，找不到小地方。",
      "關機就看不到地圖了。",
      "慢慢滑也許找得到，但很花時間。",
      ""
    ],
    "hints": [
      "第1層：電子地圖有一個可以打字的地方。",
      "第2層：在那裡輸入你想找的地方。",
      "第3層：輸入「圖書館」，地圖就會標出位置。"
    ],
    "explanation": "電子地圖可以搜尋：輸入地名，就能很快找到位置。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-020",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-zoom",
    "variant_group": "SO4-emap-zoom",
    "level": 2,
    "type": "choice",
    "scene": "電子地圖的畫面上，只看得到學校旁邊的一條小巷子。",
    "stem": "想看到整個臺北市的範圍，要怎麼調整地圖？",
    "options": [
      "把地圖縮小",
      "把地圖放大",
      "把地圖轉一圈",
      "把螢幕調亮"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "emap-zoom-reverse",
      "emap-irrelevant",
      "emap-irrelevant"
    ],
    "option_why": [
      "",
      "放大會看得更細，範圍反而更小。",
      "轉動地圖不會讓範圍變大。",
      "調亮只是看得清楚，範圍不變。"
    ],
    "hints": [
      "第1層：現在看到的範圍大，還是小？",
      "第2層：題目要看到更大的範圍。",
      "第3層：想看大範圍，地圖要縮小。"
    ],
    "explanation": "電子地圖縮小時，看到的範圍變大；放大時，看到的範圍變小、細節變清楚。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-021",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-purpose",
    "variant_group": "SO4-maptype-satellite-use",
    "level": 2,
    "type": "choice",
    "scene": "老師說：「我們來看看學校附近，哪裡有綠綠的樹林和田地。」",
    "stem": "想看地面真實的樣子，最適合用哪一種圖？",
    "options": [
      "捷運路線圖",
      "衛星影像圖",
      "行政區圖",
      "公車路線圖"
    ],
    "answer": 1,
    "option_tags": [
      "maptype-route",
      "ok",
      "maptype-admin",
      "maptype-route"
    ],
    "option_why": [
      "捷運路線圖只畫路線和車站。",
      "",
      "行政區圖畫的是各區範圍，看不到樹林。",
      "公車路線圖只畫公車經過的站。"
    ],
    "hints": [
      "第1層：老師想看的是真實的樹林和田地。",
      "第2層：哪一種圖是從高空「拍」下來的？",
      "第3層：從高空拍下來的，是衛星影像圖。"
    ],
    "explanation": "衛星影像圖是從高空拍下的真實影像，可以看到樹林、田地和房子。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-022",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-1",
      "社會 1a-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-map-compare",
    "variant_group": "SO4-compare-emap-good",
    "level": 2,
    "type": "choice",
    "scene": "阿咕在比較紙本地圖和電子地圖。",
    "stem": "下面哪一件事，是電子地圖比紙本地圖方便的地方？",
    "options": [
      "沒有電也能看",
      "不怕摔壞",
      "可以搜尋地點、放大縮小",
      "可以摺起來放口袋"
    ],
    "answer": 2,
    "option_tags": [
      "compare-reverse",
      "compare-reverse",
      "ok",
      "compare-reverse"
    ],
    "option_why": [
      "沒有電也能看，是紙本地圖的優點。",
      "不怕摔壞，是紙本地圖比較好的地方。",
      "",
      "摺起來放口袋，是紙本地圖的特點。"
    ],
    "hints": [
      "第1層：電子地圖要用手機或平板來看。",
      "第2層：它能做哪些紙本地圖做不到的事？",
      "第3層：想一想「搜尋」和「放大縮小」。"
    ],
    "explanation": "電子地圖能搜尋、放大縮小和導航；紙本地圖不用電、不怕沒網路，兩種各有好處。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-023",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-nav",
    "variant_group": "SO4-emap-nav-input",
    "level": 2,
    "type": "choice",
    "scene": "爸爸要用電子地圖導航，帶全家去海邊。",
    "stem": "開始導航前，一定要先告訴電子地圖什麼？",
    "options": [
      "要去的目的地",
      "今天的天氣",
      "全家人的名字",
      "地圖要用什麼顏色"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "nav-irrelevant",
      "nav-irrelevant",
      "nav-irrelevant"
    ],
    "option_why": [
      "",
      "天氣不會影響它幫你找路線。",
      "導航不需要知道家人的名字。",
      "地圖顏色和規畫路線沒有關係。"
    ],
    "hints": [
      "第1層：導航是幫你「帶路」。",
      "第2層：帶路之前，要知道你想去哪裡。",
      "第3層：先輸入目的地，它才能規畫路線。"
    ],
    "explanation": "導航要先知道目的地，才能規畫路線，一路提示怎麼走。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-024",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-choose",
    "variant_group": "SO4-maptype-choose",
    "level": 3,
    "type": "choice",
    "scene": "全家第一次去一座森林遊樂區，想知道步道、廁所和觀景台在哪裡。",
    "stem": "最適合看下面哪一種地圖？",
    "options": [
      "臺灣行政區圖",
      "捷運路線圖",
      "森林遊樂區的導覽圖",
      "森林的衛星影像圖"
    ],
    "answer": 2,
    "option_tags": [
      "maptype-scale-mismatch",
      "maptype-route",
      "ok",
      "maptype-satellite"
    ],
    "option_why": [
      "範圍太大，看不到園區裡的步道。",
      "捷運路線圖不會畫園區裡的設施。",
      "",
      "衛星影像看得到樹，但沒有標出廁所。"
    ],
    "hints": [
      "第1層：要找的是園區「裡面」的設施。",
      "第2層：哪一種地圖專門介紹景點和設施？",
      "第3層：給遊客看的地圖，叫做導覽圖。"
    ],
    "explanation": "要找園區裡的步道和設施，看那個園區的導覽圖最清楚。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-025",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-1",
      "社會 1b-Ⅱ-1",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-verify",
    "variant_group": "SO4-emap-outdated",
    "level": 3,
    "type": "choice",
    "scene": "電子地圖上寫著文具店「營業中」。阿咕走到門口，卻發現店已經搬走了。",
    "stem": "最可能是什麼原因？",
    "options": [
      "電子地圖的資料還沒更新",
      "電子地圖從來不會出錯",
      "文具店躲起來了",
      "阿咕看錯了地圖的顏色"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "emap-overtrust",
      "unrealistic",
      "irrelevant"
    ],
    "option_why": [
      "",
      "電子地圖的資料也可能過時或錯誤。",
      "店家不會躲起來，是資料沒跟上。",
      "顏色和店有沒有搬走沒有關係。"
    ],
    "hints": [
      "第1層：電子地圖的資料，是誰放上去的？",
      "第2層：店家搬走了，地圖不一定馬上知道。",
      "第3層：資料「沒有更新」，就會和現場不一樣。"
    ],
    "explanation": "電子地圖的資料可能沒有更新；看到的資訊要和現場或其他資料比對。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-026",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-1",
      "社會 1a-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-map-compare",
    "variant_group": "SO4-compare-both",
    "level": 3,
    "type": "choice",
    "scene": "全家要去山上健行，山上可能收不到訊號，手機也可能沒電。",
    "stem": "怎麼準備地圖最安全？",
    "options": [
      "只帶手機，沒電再說",
      "什麼地圖都不用帶",
      "只帶市區的捷運路線圖",
      "手機地圖和紙本地圖都帶"
    ],
    "answer": 3,
    "option_tags": [
      "compare-overtrust",
      "plan-skip",
      "maptype-mismatch",
      "ok"
    ],
    "option_why": [
      "沒電或沒訊號時，電子地圖就不能用。",
      "不帶地圖，在山上容易迷路。",
      "山上沒有捷運，這張圖用不到。",
      ""
    ],
    "hints": [
      "第1層：山上可能沒有訊號，手機也可能沒電。",
      "第2層：哪一種地圖不用電也能看？",
      "第3層：兩種都帶，一種不能用時還有另一種。"
    ],
    "explanation": "電子地圖方便，但需要電和訊號；去山上時再帶一份紙本地圖比較安全。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-027",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-zoom",
    "variant_group": "SO4-emap-zoom-effect",
    "level": 3,
    "type": "choice",
    "scene": "阿咕把電子地圖放大了好幾次。",
    "stem": "放大以後，畫面會有什麼改變？",
    "options": [
      "看到的範圍變大，細節變少",
      "看到的範圍變小，細節變清楚",
      "範圍和細節都不會改變",
      "地圖上的地方真的變大了"
    ],
    "answer": 1,
    "option_tags": [
      "emap-zoom-reverse",
      "ok",
      "emap-no-change",
      "map-literal"
    ],
    "option_why": [
      "範圍變大是縮小地圖時才會發生。",
      "",
      "放大後，畫面一定會改變。",
      "放大的是畫面，真實的地方不會變。"
    ],
    "hints": [
      "第1層：放大後，你看得到的地方變多還是變少？",
      "第2層：畫面只剩一小塊，但看得更清楚。",
      "第3層：放大＝範圍變小、細節變清楚。"
    ],
    "explanation": "放大電子地圖，看到的範圍變小、細節變清楚；縮小則相反。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-028",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動一：選擇合適的地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-maptype-choose",
    "variant_group": "SO4-maptype-choose-seq",
    "level": 4,
    "type": "choice",
    "scene": "阿咕今天要做三件事：①查自己家在哪一區 ②搭捷運去動物園 ③在動物園裡找企鵝館。",
    "stem": "依照順序，要看哪三種地圖最合適？",
    "options": [
      "動物園導覽圖→行政區圖→捷運路線圖",
      "衛星影像圖→行政區圖→動物園導覽圖",
      "行政區圖→捷運路線圖→動物園導覽圖",
      "捷運路線圖→動物園導覽圖→行政區圖"
    ],
    "answer": 2,
    "option_tags": [
      "order-wrong",
      "maptype-satellite",
      "ok",
      "order-wrong"
    ],
    "option_why": [
      "順序不對：第一件事是查住在哪一區。",
      "查住在哪一區要看行政區圖。",
      "",
      "順序不對：要先查區，最後才找企鵝館。"
    ],
    "hints": [
      "第1層：一件一件想，每件事要用哪一種地圖？",
      "第2層：查區→行政區圖；搭捷運→捷運路線圖。",
      "第3層：在動物園裡找館，要看動物園導覽圖。"
    ],
    "explanation": "查區看行政區圖，搭捷運看捷運路線圖，在園區裡找地方看導覽圖；要依需要選地圖。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-029",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-1",
      "社會 1b-Ⅱ-1",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-verify",
    "variant_group": "SO4-emap-crosscheck",
    "level": 4,
    "type": "choice",
    "scene": "兩個電子地圖說法不一樣：一個說博物館星期一休館，另一個說星期一有開。",
    "stem": "要怎麼確認，最可靠？",
    "options": [
      "相信先看到的那一個",
      "查博物館自己的網站或打電話問",
      "相信評分星星比較多的那一個",
      "不用查，直接去了再說"
    ],
    "answer": 1,
    "option_tags": [
      "verify-first",
      "ok",
      "verify-rating",
      "plan-skip"
    ],
    "option_why": [
      "先看到的不一定對，要找可靠的來源。",
      "",
      "星星多少是評價，不代表開放時間對。",
      "沒確認就去，可能白跑一趟。"
    ],
    "hints": [
      "第1層：兩個說法不同，一定有一個不對。",
      "第2層：誰最清楚博物館哪天開門？",
      "第3層：去問博物館自己，最可靠。"
    ],
    "explanation": "資料互相矛盾時，要找最可靠的來源確認，例如博物館的官方網站或電話。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1011-030",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-1 閱讀生活中的地圖",
    "node": 1011,
    "source_ref": "翰林 四上 社會 1-1 活動三：好用的電子地圖（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-emap-search",
    "variant_group": "SO4-emap-search-same-name",
    "level": 4,
    "type": "choice",
    "scene": "阿咕在電子地圖搜尋「中山」，結果跑出好多個不同的地方。",
    "stem": "下一步怎麼做最好？",
    "options": [
      "隨便選第一個就出發",
      "放棄，不去了",
      "把地圖放到最大再看",
      "加上更多字，例如城市名或店名"
    ],
    "answer": 3,
    "option_tags": [
      "search-first",
      "plan-skip",
      "emap-zoom-misuse",
      "ok"
    ],
    "option_why": [
      "第一個不一定是你要去的地方。",
      "換個方法搜尋就找得到，不必放棄。",
      "放大地圖不能分辨同名的地方。",
      ""
    ],
    "hints": [
      "第1層：很多地方都叫「中山」。",
      "第2層：要讓電子地圖知道你要的是哪一個。",
      "第3層：多打幾個字，例如「臺北市中山國小」。"
    ],
    "explanation": "很多地方名字一樣；搜尋時加上城市名、完整名稱或看地址，才能找到正確地點。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-013",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題；路線圖為遊戲自製虛構站名）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-read",
    "variant_group": "SO4-route-next",
    "level": 1,
    "type": "choice",
    "scene": "路線圖：紅線依序是河岸站、中央站、學府站；藍線依序是山腳站、中央站、海港站。",
    "stem": "從河岸站往學府站的方向坐，下一站是哪一站？",
    "options": [
      "學府站",
      "海港站",
      "中央站",
      "山腳站"
    ],
    "answer": 2,
    "option_tags": [
      "route-skip",
      "route-wrong-line",
      "ok",
      "route-wrong-line"
    ],
    "option_why": [
      "學府站在中央站後面，不是下一站。",
      "海港站在藍線上，不在紅線。",
      "",
      "山腳站在藍線上，不在紅線。"
    ],
    "hints": [
      "第1層：先在紅線上找到河岸站。",
      "第2層：往學府站的方向，看緊接著的那一站。",
      "第3層：河岸站後面緊接著的是中央站。"
    ],
    "explanation": "照路線圖上車站的順序看，河岸站的下一站是中央站。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-014",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-guide-use",
    "variant_group": "SO4-guide-facility",
    "level": 1,
    "type": "choice",
    "scene": "動物園導覽圖上，企鵝館旁邊畫著一個廁所的小圖案。",
    "stem": "從這張導覽圖，可以知道什麼？",
    "options": [
      "企鵝館附近有廁所",
      "企鵝館今天休息",
      "企鵝館裡有幾隻企鵝",
      "廁所要排隊多久"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "info-not-shown",
      "info-not-shown",
      "info-not-shown"
    ],
    "option_why": [
      "",
      "有沒有休息，地圖上沒有畫。",
      "企鵝有幾隻，導覽圖不會畫。",
      "排隊多久，地圖上看不出來。"
    ],
    "hints": [
      "第1層：圖上畫了什麼？畫在哪裡？",
      "第2層：廁所圖案畫在企鵝館旁邊。",
      "第3層：地圖告訴我們「位置」，不告訴我們人多不多。"
    ],
    "explanation": "導覽圖畫出設施的位置，可以知道企鵝館附近有廁所。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-015",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-2",
      "社會 3b-Ⅱ-1",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-trip-plan",
    "variant_group": "SO4-trip-prepare",
    "level": 1,
    "type": "choice",
    "scene": "下星期全班要去一個沒去過的地方校外教學。",
    "stem": "出發前，用地圖可以先做什麼準備？",
    "options": [
      "數地圖上有幾種顏色",
      "查好要去的地方和怎麼去",
      "把地圖剪成小片",
      "什麼都不用準備"
    ],
    "answer": 1,
    "option_tags": [
      "plan-irrelevant",
      "ok",
      "plan-irrelevant",
      "plan-skip"
    ],
    "option_why": [
      "顏色多少，和怎麼去沒有關係。",
      "",
      "剪碎地圖就看不清楚了。",
      "沒準備容易迷路、浪費時間。"
    ],
    "hints": [
      "第1層：去沒去過的地方，最怕什麼？",
      "第2層：最怕不知道在哪裡、不知道怎麼去。",
      "第3層：先用地圖查好地點和路線。"
    ],
    "explanation": "出門前先用地圖查好地點和路線，旅行會更順利。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-016",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動一：利用地圖探索家鄉（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-admin-read",
    "variant_group": "SO4-admin-color",
    "level": 1,
    "type": "choice",
    "scene": "臺北市行政區圖上，每一區都塗上了不同的顏色。",
    "stem": "把每一區塗上不同顏色，主要是為了什麼？",
    "options": [
      "表示哪一區比較熱",
      "表示哪一區人比較多",
      "讓人容易分出各區的範圍",
      "讓地圖變重一點"
    ],
    "answer": 2,
    "option_tags": [
      "color-weather",
      "color-crowd",
      "ok",
      "irrelevant"
    ],
    "option_why": [
      "溫度要看氣象資料，不是看區的顏色。",
      "這張圖的顏色是用來分區的。",
      "",
      "顏色不會讓地圖變重。"
    ],
    "hints": [
      "第1層：行政區圖最想讓我們看清楚什麼？",
      "第2層：它想讓我們看清楚每一區的範圍。",
      "第3層：相鄰的區塗不同顏色，就容易分開。"
    ],
    "explanation": "行政區圖把各區塗上不同顏色，方便分辨每一區的範圍。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-017",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-2",
      "社會 3b-Ⅱ-1",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-trip-plan",
    "variant_group": "SO4-trip-hours",
    "level": 2,
    "type": "choice",
    "scene": "阿咕想去的博物館，導覽單上寫著「每週一休館」。",
    "stem": "規畫行程時，這句話提醒我們什麼？",
    "options": [
      "星期一門票比較便宜",
      "星期一要早一點去",
      "博物館只有星期一開",
      "不要安排在星期一去"
    ],
    "answer": 3,
    "option_tags": [
      "info-misread",
      "info-misread",
      "info-reverse",
      "ok"
    ],
    "option_why": [
      "「休館」是不開門，和票價無關。",
      "休館那天去多早都進不去。",
      "意思相反：星期一是不開門。",
      ""
    ],
    "hints": [
      "第1層：「休館」是什麼意思？",
      "第2層：休館就是那天不開門。",
      "第3層：所以星期一去會進不去。"
    ],
    "explanation": "「每週一休館」表示星期一不開放，規畫行程時要避開這一天。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-018",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題；路線圖為遊戲自製虛構站名）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-plan",
    "variant_group": "SO4-route-choose",
    "level": 3,
    "type": "choice",
    "scene": "去博物館有兩條路線：甲路線要換車兩次；乙路線不用換車，但要多坐幾站。",
    "stem": "外婆走路不方便，想少上下車，選哪一條比較合適？",
    "options": [
      "甲路線，因為站數比較少",
      "乙路線，因為不用換車",
      "兩條都不能選",
      "哪一條都一樣"
    ],
    "answer": 1,
    "option_tags": [
      "need-ignore",
      "ok",
      "plan-skip",
      "need-ignore"
    ],
    "option_why": [
      "換車兩次要多走路、多上下車。",
      "",
      "兩條都能到，要看需要來選。",
      "上下車次數不同，對外婆差很多。"
    ],
    "hints": [
      "第1層：外婆最在意的是什麼？",
      "第2層：她想少上下車、少走路。",
      "第3層：哪一條不用換車？"
    ],
    "explanation": "規畫路線要看搭乘的人需要什麼；外婆想少上下車，就選不用換車的乙路線。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-019",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題；路線圖為遊戲自製虛構站名）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-transfer",
    "variant_group": "SO4-route-transfer",
    "level": 3,
    "type": "choice",
    "scene": "路線圖：紅線依序是河岸站、中央站、學府站；藍線依序是山腳站、中央站、海港站。",
    "stem": "從山腳站到學府站，哪一種搭法正確？",
    "options": [
      "搭紅線到中央站，換藍線到學府站",
      "搭藍線一直坐到海港站",
      "不用換車，直接坐到學府站",
      "搭藍線到中央站，換紅線到學府站"
    ],
    "answer": 3,
    "option_tags": [
      "line-swap",
      "route-overshoot",
      "route-same-line",
      "ok"
    ],
    "option_why": [
      "山腳站只有藍線，要先搭藍線。",
      "海港站在藍線另一頭，到不了學府站。",
      "山腳站和學府站不在同一條線上。",
      ""
    ],
    "hints": [
      "第1層：山腳站在哪一條線？學府站在哪一條線？",
      "第2層：兩站不同線，要在交會站換車。",
      "第3層：先搭藍線到中央站，再換紅線。"
    ],
    "explanation": "山腳站在藍線、學府站在紅線，先搭藍線到中央站，再換紅線到學府站。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-020",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-guide-use",
    "variant_group": "SO4-guide-help",
    "level": 3,
    "type": "choice",
    "scene": "公園導覽圖上：遊樂場旁邊有飲水機，涼亭旁邊有廁所，大門口有服務台。",
    "stem": "和家人走散了，要去導覽圖上的哪裡找人幫忙？",
    "options": [
      "涼亭",
      "服務台",
      "飲水機",
      "遊樂場"
    ],
    "answer": 1,
    "option_tags": [
      "need-mismatch",
      "ok",
      "need-mismatch",
      "need-mismatch"
    ],
    "option_why": [
      "涼亭是休息的地方，不一定有工作人員。",
      "",
      "飲水機是喝水的地方，沒有人能幫忙。",
      "遊樂場是玩的地方，不是服務處。"
    ],
    "hints": [
      "第1層：走散了，需要誰來幫忙？",
      "第2層：要找公園的工作人員。",
      "第3層：哪個地方有工作人員可以幫忙？"
    ],
    "explanation": "走散時可以到服務台請工作人員幫忙；先想需要，再到導覽圖上找地點。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-021",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動三：拿著地圖去旅行（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 3b-Ⅱ-2",
      "社會 3b-Ⅱ-1",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-trip-plan",
    "variant_group": "SO4-trip-order",
    "level": 4,
    "type": "choice",
    "scene": "阿咕一天想去三個地方：A 只有早上開的魚市場、B 白天開的博物館、C 晚上才開的夜市。",
    "stem": "照開放時間，哪一種先後順序最合理？",
    "options": [
      "C→B→A",
      "B→C→A",
      "A→B→C",
      "B→A→C"
    ],
    "answer": 2,
    "option_tags": [
      "order-reverse",
      "order-wrong",
      "ok",
      "order-wrong"
    ],
    "option_why": [
      "夜市晚上才開，不能排在最前面。",
      "魚市場只有早上開，不能排最後。",
      "",
      "魚市場只開早上，要第一個去。"
    ],
    "hints": [
      "第1層：哪一個地方最早關門？",
      "第2層：魚市場只有早上開，要先去。",
      "第3層：晚上才開的夜市，排在最後。"
    ],
    "explanation": "規畫行程要看開放時間：早上去魚市場，白天去博物館，晚上去夜市。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-022",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動二：規畫我的交通路線（同主題原創，非課文題；路線圖為遊戲自製虛構站名）",
    "curriculum_code": [
      "社會 1b-Ⅱ-1",
      "社會 3b-Ⅱ-2",
      "社會 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-route-plan",
    "variant_group": "SO4-route-disruption",
    "level": 4,
    "type": "choice",
    "scene": "紅線：河岸站—中央站—學府站；藍線：山腳站—中央站—海港站。廣播說：紅線暫停行駛。",
    "stem": "阿咕在河岸站，要去海港站，怎麼做最合適？",
    "options": [
      "在河岸站改搭藍線",
      "照原本的計畫搭紅線",
      "搭藍線到山腳站",
      "改搭公車到中央站，再換藍線"
    ],
    "answer": 3,
    "option_tags": [
      "line-not-here",
      "plan-ignore-news",
      "route-wrong-direction",
      "ok"
    ],
    "option_why": [
      "河岸站只有紅線，沒有藍線。",
      "紅線暫停，照原計畫搭不到車。",
      "山腳站在另一頭，離海港站更遠。",
      ""
    ],
    "hints": [
      "第1層：河岸站有哪幾條線經過？",
      "第2層：紅線停了，要先用別的方法到中央站。",
      "第3層：到了中央站，就能換藍線去海港站。"
    ],
    "explanation": "路線有變化時要重新規畫：先用其他交通方式到中央站，再換藍線去海港站。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "SO4-1012-023",
    "grade": 4,
    "subject": "社會",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元 家鄉的地圖與運用",
    "lesson": "1-2 善用地圖好生活",
    "node": 1012,
    "source_ref": "翰林 四上 社會 1-2 活動一：利用地圖探索家鄉（同主題原創，非課文題）",
    "curriculum_code": [
      "社會 1a-Ⅱ-2",
      "社會 Bb-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "SO4-admin-read",
    "variant_group": "SO4-admin-adjacent",
    "level": 4,
    "type": "choice",
    "scene": "這張行政區圖只有甲、乙、丙三區。甲區和乙區相鄰，甲區和丙區相鄰，乙區和丙區不相鄰。",
    "stem": "只在這三區裡走，從乙區到丙區，一定會經過哪一區？",
    "options": [
      "甲區",
      "不用經過別的區",
      "乙區旁邊就是丙區",
      "地圖上看不出來"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "adjacent-misread",
      "adjacent-misread",
      "info-ignore"
    ],
    "option_why": [
      "",
      "乙區和丙區不相鄰，中間要經過別區。",
      "題目說乙區和丙區不相鄰。",
      "哪些區相鄰，從圖上看得出來。"
    ],
    "hints": [
      "第1層：乙區和丙區有沒有挨在一起？",
      "第2層：沒有，所以中間一定要經過別的區。",
      "第3層：哪一區同時挨著乙區和丙區？"
    ],
    "explanation": "乙區和丙區不相鄰，但都和甲區相鄰，所以從乙區到丙區要經過甲區。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  }
];

// ════════════════════════════════════════════════════════════════════
// 來源：成品匣 四年級版規劃/題庫草稿/chinese_4A_l01-03.js（60 題；檔頭說明照原檔，題目以 JSON 寫出）
// ════════════════════════════════════════════════════════════════════
// 四年級版學習 RPG — 國語 四上 第 1–3 課 題庫草稿
// 撰寫：A1 108 課綱教案設計師｜初版 2026-10-19（27 題，每課 9 題）｜第二版 2026-10-19（每課補到 20 題、概念 ≥6）
// 狀態：草稿，reviewed 一律 false，待老師審題
//
// 【題數（第二版）】共 60 題，每課 20 題（全部是課綱題，沒有超綱題）
//   難度分布：第一課 L1 6、L2 6、L3 5、L4 3；第二課 L1 6、L2 6、L3 5、L4 3；第三課 L1 6、L2 6、L3 5、L4 3
//   id 接續：每課 010～020 是新題；001～009 的 id 與題目內容都沒改（只把 concept 細分）。
//
// 【課名（已查證）】翰林 115 學年度 四上 國語
//   第一課 美麗島／第二課 請到我的家鄉來／第三課 鏡頭下的家鄉
//   來源：教育部教育百科「生字詞彙表」115學年度／四年級／國語／翰林版（官方網站，2026-10-19 直接讀取頁面）
//     課次清單 https://pedia.cloud.edu.tw/Bookmark/Textword?category=%E5%9C%8B%E8%AA%9E&year=115_1&degree=4&press=%E7%BF%B0%E6%9E%97%E7%89%88
//     第一課 https://pedia.cloud.edu.tw/Bookmark/TCollection?TextNameId=0101041150101 （23 筆詞條）
//     第二課 https://pedia.cloud.edu.tw/Bookmark/TCollection?TextNameId=0101041150102 （26 筆詞條）
//     第三課 https://pedia.cloud.edu.tw/Bookmark/TCollection?TextNameId=0101041150103 （23 筆詞條）
//   各課生字、語詞（照教育百科列表）：
//     第一課 生字：島 唾 沫 忠 衛 寒 椰 隊 蕉 街 灣 甜 糖 童；語詞：唾沫 忠實 守衛 寒冷 成群結隊 香蕉 臺灣 甜蜜 童話
//     第二課 生字：泉 抹 訝 牙 齒 架 速 彷 彿 汽 區 恐 陀 螺 聚；語詞：溫泉 驚訝 牙齒 打架 快速 彷彿 汽水 園區 恐龍 陀螺 團聚
//     第三課 生字：鏡 軌 樓 與 耕 耘 蔬 鼓 腮 烤 柳 丁 粉 網 錄；語詞：鏡頭 軌道 耕耘 蔬菜 腮幫子 柳丁 上網 記錄
//
// 【單元與 node】翰林國語四上的「單元名稱」查不到（R2）。搜尋摘要顯示第 1–3 課之後接「統整活動一」，
//   所以推定第 1–3 課是第一單元：node＝1011、1012、1013（推定，單元名稱待查證）。
//
// 【出題守則】
//   - 每題考的字或詞都是該課生字、語詞；句子全部自己寫，不引用課文段落、不考課文內容（沒讀過課文也能作答）。
//     錯誤選項、句子裡的陪襯字可以用其他常用字（例如「鳥、塘、氣、芽、往、綱」），只用來比較字形字音。
//   - 注音、部首、字義一律查教育部《重編國語辭典修訂本》資料（透過萌典 moedict.tw 開放資料 API 逐字查詢，2026-10-19）。
//     第二版新增字音題的答案：島ㄉㄠˇ、速ㄙㄨˋ、陀ㄊㄨㄛˊ、烤ㄎㄠˇ（皆為單一讀音）；陪襯音：鳥ㄋㄧㄠˇ、它ㄊㄚ、考ㄎㄠˇ、素ㄙㄨˋ、駝ㄊㄨㄛˊ。
//     第二版新增部首題：甜（甘）、恐（心）、烤（火）、粉（米）；陪襯：考（老部）、分（刀部）。
//     多義字題的字義：架＝「泛指有支撐或擱置作用的結構體（書架、衣架）」與「互相毆打、爭吵（打架、吵架）」；
//       鼓＝「打擊樂器」「敲擊、拍擊（鼓掌）」「激勵、使振作（鼓勵）」，都照辭典義項，沒有用辭典查不到的「鼓起」義出題。
//   - 刻意避開破音字的字音題：「唾沫」辭典注為ㄊㄨㄛˋ ˙ㄇㄛ（輕聲）、「與」有ㄩˇ／ㄩˋ／ㄩˊ、「抹」有ㄇㄛˇ／ㄇㄛˋ、
//     「蔬」有ㄕㄨ／ㄙㄨ、「區」有三音、「丁」有兩音，這些字都不出字音題。
//   - 字音、字形、部首題的 read_aloud 設成 none 或 stem_only（朗讀會洩漏答案或看不到字形）。
//
// 【課綱代碼】對照國教署公告《十二年國民基本教育課程綱要 語文領域－國語文》（107 年 1 月）PDF 原文逐字核對（2026-10-19 下載抽字）：
//   https://www.k12ea.gov.tw/files/class_schema/課綱/3-國語文/3-1/十二年國民基本教育課程綱要國民中小學暨普通型高級中等學校語文領域-國語文.pdf
//   （頁碼為 PDF 檔頁序）
//   - 4-Ⅱ-1 認識常用國字至少1,800字，使用1,200字。（p.12）
//   - 4-Ⅱ-2 利用共同部件，擴充識字量。（p.12）
//   - 4-Ⅱ-4 能分辨形近、音近字詞，並正確使用。（p.12）
//   - 4-Ⅱ-5 利用字義推論詞義。（p.13）
//   - 5-Ⅱ-4 掌握句子和段落的意義與主要概念。（p.14）
//   - Ab-Ⅱ-1 1,800個常用字的字形、字音和字義。（p.17）
//   - Ab-Ⅱ-3 常用字部首及部件的表音及表義功能。（p.17）
//   - Ab-Ⅱ-4 多音字及多義字。（p.17）
//   - Ab-Ⅱ-5 3,000個常用語詞的認念。（p.17）
//   - Ab-Ⅱ-6 2,000個常用語詞的使用。（p.17）
//   - Ab-Ⅱ-7 國字組成詞彙的構詞規則。（p.17）
//
// 【explain_status】國語文領綱沒有「學習內容說明」附錄（全文搜尋「學習內容說明」0 筆）；
//   範圍判斷改看附錄三「學習表現之教材編選與教學實施說明」（PDF p.52）：
//   「第二學習階段起則強調分析字的部件對於辨識字的影響，宜採部件（部首、聲旁）歸類，協助以部首以及聲旁識字。」
//   本檔的部首、聲旁誤讀、形近字、構詞、多義字、句意題都在學習表現與學習內容範圍內，所以都標 verified。
//
// 【概念清單（第二版細分）】每課 8 個概念（第一課 7 個，沒有多義字題）
//   CH4-char-sound    字音（含聲旁誤讀）          國語 4-Ⅱ-1、國語 Ab-Ⅱ-1（聲旁題加 Ab-Ⅱ-3）
//   CH4-char-shape    形近、音近字辨別（填空）    國語 4-Ⅱ-4、國語 Ab-Ⅱ-3（或 Ab-Ⅱ-1）
//   CH4-radical       部首                        國語 Ab-Ⅱ-3、國語 4-Ⅱ-2
//   CH4-word-meaning  詞義                        國語 4-Ⅱ-5、國語 Ab-Ⅱ-5（或 Ab-Ⅱ-7）
//   CH4-word-use      詞語運用（選詞、判斷用法）  國語 Ab-Ⅱ-6、國語 4-Ⅱ-5
//   CH4-word-build    構詞（同一字組成的詞語、字義推論詞義）  國語 Ab-Ⅱ-7、國語 4-Ⅱ-5
//   CH4-polysemy      多義字                      國語 Ab-Ⅱ-4、國語 4-Ⅱ-5
//   CH4-sentence      句子理解（含「雖然……還是……」、查證）  國語 5-Ⅱ-4、國語 Ab-Ⅱ-5
//
// 【待查證】翰林國語四上第一單元的單元名稱；node 1011–1013 是依「第 1–3 課接統整活動一」推定。
window.QUESTIONS_G4_CH_L01_03 = [
  {
    "id": "CH4-1011-001",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「椰」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L01",
    "level": 1,
    "type": "choice",
    "scene": "海邊的小攤子在賣冰涼的椰子水。",
    "stem": "「椰子」的「椰」，注音是哪一個？",
    "options": [
      "ㄧㄝ",
      "ㄧㄝˋ",
      "ㄧㄝˊ",
      "ㄧㄚˊ"
    ],
    "answer": 2,
    "option_tags": [
      "tone-1",
      "tone-4",
      "ok",
      "vowel-confuse"
    ],
    "option_why": [
      "「椰」是第二聲，聲調要往上揚。",
      "「椰」是第二聲，不是第四聲。",
      "",
      "韻母是ㄧㄝ，不是ㄧㄚ。"
    ],
    "hints": [
      "第1層：先找出這個字的韻母。",
      "第2層：「椰」和「爺爺」的「爺」念法一樣。",
      "第3層：「爺」念ㄧㄝˊ，是第二聲。"
    ],
    "explanation": "「椰」念ㄧㄝˊ，第二聲，和「爺」同音。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-002",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「灣」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L01",
    "level": 2,
    "type": "choice",
    "scene": "颱風快來了，漁船紛紛開進港＿，躲避風浪。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "晚",
      "灣",
      "彎",
      "碗"
    ],
    "answer": 1,
    "option_tags": [
      "near-sound",
      "ok",
      "homophone-shape",
      "near-sound"
    ],
    "option_why": [
      "「晚」是晚上的晚，和水無關。",
      "",
      "「彎」是彎曲，和水無關；水邊要用「灣」。",
      "「碗」是吃飯用的碗。"
    ],
    "hints": [
      "第1層：船停的地方和什麼有關？",
      "第2層：和水有關的字，常有三點水「氵」。",
      "第3層：找有「氵」的那一個字。"
    ],
    "explanation": "「港灣」是海邊可以停船的地方，和水有關，所以用有「氵」的「灣」。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-003",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「衛」、語詞「守衛」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L01",
    "level": 2,
    "type": "choice",
    "scene": "社區大門口有一位警＿，每天認真守著大門。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "術",
      "衛",
      "衡",
      "為"
    ],
    "answer": 1,
    "option_tags": [
      "shape-similar",
      "ok",
      "shape-similar",
      "homophone"
    ],
    "option_why": [
      "「術」念ㄕㄨˋ，是美術的術。",
      "",
      "「衡」念ㄏㄥˊ，是平衡的衡。",
      "「為」是因為的為，沒有保護的意思。"
    ],
    "hints": [
      "第1層：這個人在做什麼工作？",
      "第2層：他在保護、守著大門。",
      "第3層：「保衛」「守衛」的「衛」，就是保護的意思。"
    ],
    "explanation": "「警衛」是守護門口安全的人，「衛」有保護、防守的意思。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-004",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「成群結隊」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L01",
    "level": 2,
    "type": "choice",
    "scene": "放學後，一群鴿子成群結隊的飛過校園上空。",
    "stem": "「成群結隊」的意思最接近哪一個？",
    "options": [
      "只有一隻，單獨行動",
      "分成兩隊互相比賽",
      "許多聚在一起，一起行動",
      "排隊等著買東西"
    ],
    "answer": 2,
    "option_tags": [
      "antonym",
      "literal-word",
      "ok",
      "literal-word"
    ],
    "option_why": [
      "「成群」是很多聚在一起，不是一隻。",
      "「結隊」是結成隊伍一起走，不是比賽。",
      "",
      "句子說鴿子一起飛，不是排隊買東西。"
    ],
    "hints": [
      "第1層：「成群」是什麼意思？",
      "第2層：「群」是很多聚在一起。",
      "第3層：一大群一起飛，就是一起行動。"
    ],
    "explanation": "「成群結隊」是形容很多人或動物聚在一起行動。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-005",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「寒冷」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L01",
    "level": 1,
    "type": "choice",
    "scene": "冬天一大早，北風呼呼的吹。",
    "stem": "「今天好＿＿，出門要穿厚外套。」最適合填什麼？",
    "options": [
      "寒冷",
      "炎熱",
      "甜蜜",
      "忠實"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "antonym",
      "word-mismatch",
      "word-mismatch"
    ],
    "option_why": [
      "",
      "「炎熱」是很熱，不必穿厚外套。",
      "「甜蜜」是形容味道或感覺很甜。",
      "「忠實」是形容人或動物很可靠。"
    ],
    "hints": [
      "第1層：為什麼要穿厚外套？",
      "第2層：天氣很冷，才要穿厚外套。",
      "第3層：找一個表示「很冷」的詞語。"
    ],
    "explanation": "要穿厚外套，表示天氣很冷，所以填「寒冷」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-006",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「忠實」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L01",
    "level": 2,
    "type": "choice",
    "scene": "阿嬤家的大黃狗，每天都在門口等阿嬤回家。",
    "stem": "「大黃狗真是阿嬤＿＿的好朋友。」最適合填什麼？",
    "options": [
      "忠實",
      "童話",
      "香蕉",
      "寒冷"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "pos-mismatch",
      "pos-mismatch",
      "word-mismatch"
    ],
    "option_why": [
      "",
      "「童話」是故事，放進句子不通順。",
      "「香蕉」是水果，放進句子不通順。",
      "「寒冷」是形容天氣，不是形容朋友。"
    ],
    "hints": [
      "第1層：大黃狗每天都做同一件事，等阿嬤。",
      "第2層：牠對阿嬤很真心、很可靠。",
      "第3層：找一個形容「真心可靠」的詞語。"
    ],
    "explanation": "「忠實」是忠誠可靠，用來形容每天守候阿嬤的大黃狗最合適。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-007",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「蕉」（教育百科生字表；原創題）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 2,
    "type": "choice",
    "scene": "香蕉的「蕉」和燒焦的「焦」長得很像。",
    "stem": "「蕉」的部首是哪一個？",
    "options": [
      "隹（隹部）",
      "木（木部）",
      "艹（艸部）",
      "灬（火部）"
    ],
    "answer": 2,
    "option_tags": [
      "radical-component",
      "radical-meaning-guess",
      "ok",
      "radical-component"
    ],
    "option_why": [
      "「隹」是字的一部分，但不是部首。",
      "香蕉是植物，但部首是上面的艹。",
      "",
      "「灬」是「焦」的部首；「蕉」多了草字頭。"
    ],
    "hints": [
      "第1層：比一比「蕉」和「焦」，多了哪一部分？",
      "第2層：多出來的是上面的那一部分。",
      "第3層：上面的「艹」叫草字頭，和植物有關。"
    ],
    "explanation": "「蕉」是植物，部首是上面的「艹」（艸部）；「焦」的部首才是「灬」。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-008",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「唾」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L01",
    "level": 3,
    "type": "choice",
    "scene": "醫生說，吃飯要細嚼慢嚥，讓唾液幫忙消化。",
    "stem": "「唾液」的「唾」，注音是哪一個？",
    "options": [
      "ㄔㄨㄟˊ",
      "ㄉㄨㄛˋ",
      "ㄊㄨㄛ",
      "ㄊㄨㄛˋ"
    ],
    "answer": 3,
    "option_tags": [
      "phonetic-component",
      "initial-confuse",
      "tone-1",
      "ok"
    ],
    "option_why": [
      "右邊的「垂」念ㄔㄨㄟˊ，但「唾」不這樣念。",
      "聲母是ㄊ，不是ㄉ。",
      "「唾」是第四聲，不是第一聲。",
      ""
    ],
    "hints": [
      "第1層：不是每個字都念右邊那一半的音。",
      "第2層：「唾」的聲母是ㄊ。",
      "第3層：它念第四聲，聲調往下降。"
    ],
    "explanation": "「唾」念ㄊㄨㄛˋ，不念右邊「垂」的ㄔㄨㄟˊ。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-009",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「童話」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-7"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L01",
    "level": 2,
    "type": "choice",
    "scene": "睡覺前，媽媽拿出一本童話，念給妹妹聽。",
    "stem": "句子裡的「童話」是指什麼？",
    "options": [
      "和朋友講的電話",
      "一首兒童歌曲",
      "小朋友說的話",
      "寫給小朋友看的故事"
    ],
    "answer": 3,
    "option_tags": [
      "literal-sound",
      "category-confuse",
      "literal-split",
      "ok"
    ],
    "option_why": [
      "這裡的「話」不是電話的意思。",
      "歌曲是用唱的；媽媽是拿書念故事。",
      "「童話」是一種故事，不是指誰說的話。",
      ""
    ],
    "hints": [
      "第1層：媽媽拿出的是一本什麼？",
      "第2層：是一本書，念給妹妹聽。",
      "第3層：「童」是小孩，「童話」是給小孩的故事。"
    ],
    "explanation": "「童話」是寫給兒童看的故事，常有神奇有趣的情節。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-010",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「島」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L01",
    "level": 1,
    "type": "choice",
    "scene": "爸爸開船，載我們到附近的小島玩。",
    "stem": "「小島」的「島」，注音是哪一個？",
    "options": [
      "ㄉㄠ",
      "ㄋㄧㄠˇ",
      "ㄉㄠˋ",
      "ㄉㄠˇ"
    ],
    "answer": 3,
    "option_tags": [
      "tone-1",
      "shape-confuse",
      "tone-4",
      "ok"
    ],
    "option_why": [
      "「島」是第三聲，不是第一聲。",
      "ㄋㄧㄠˇ是「鳥」的音，「島」聲母是ㄉ。",
      "「島」是第三聲，不是第四聲。",
      ""
    ],
    "hints": [
      "第1層：「島」和「鳥」長得像，念法不一樣。",
      "第2層：「島」的聲母是ㄉ，韻母是ㄠ。",
      "第3層：「島」念第三聲，聲調先降再升。"
    ],
    "explanation": "「島」念ㄉㄠˇ，第三聲；不要和長得很像的「鳥」（ㄋㄧㄠˇ）弄混。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-011",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「甜蜜」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L01",
    "level": 1,
    "type": "choice",
    "scene": "妹妹收到全家人一起做的生日卡片，笑得好開心。",
    "stem": "「妹妹心裡覺得好＿＿。」最適合填什麼？",
    "options": [
      "寒冷",
      "甜蜜",
      "守衛",
      "唾沫"
    ],
    "answer": 1,
    "option_tags": [
      "word-mismatch",
      "ok",
      "pos-mismatch",
      "pos-mismatch"
    ],
    "option_why": [
      "「寒冷」是形容天氣很冷。",
      "",
      "「守衛」是看守保護，放進句子不通順。",
      "「唾沫」是口水，放進句子不通順。"
    ],
    "hints": [
      "第1層：妹妹收到卡片，心情怎麼樣？",
      "第2層：她覺得很幸福、很開心。",
      "第3層：形容心裡甜甜的、很幸福的詞是什麼？"
    ],
    "explanation": "「甜蜜」可以形容心裡覺得幸福美好，所以填「甜蜜」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-012",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「守衛」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L01",
    "level": 1,
    "type": "choice",
    "scene": "博物館門口有警衛日夜守衛，保護裡面的寶物。",
    "stem": "「守衛」的意思最接近哪一個？",
    "options": [
      "看守保護",
      "打開大門",
      "睡覺休息",
      "到處遊玩"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "literal-split",
      "unrelated",
      "unrelated"
    ],
    "option_why": [
      "",
      "「守衛」是看守，不是開門。",
      "守衛要醒著看守，不是睡覺。",
      "守衛要留在原地，不是到處玩。"
    ],
    "hints": [
      "第1層：「守」是守著、看著。",
      "第2層：「衛」是保護。",
      "第3層：合起來就是看守保護。"
    ],
    "explanation": "「守衛」是看守、保護的意思，也可以指負責看守的人。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-013",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「島」「椰」「街」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L01",
    "level": 1,
    "type": "choice",
    "scene": "這座小島上有很多椰子樹，海邊的街道兩旁也種滿了椰子樹。",
    "stem": "這句話主要在說什麼？",
    "options": [
      "小島上沒有街道",
      "椰子樹只長在山上",
      "小島上有很多椰子樹",
      "街上都是賣椰子的人"
    ],
    "answer": 2,
    "option_tags": [
      "negation",
      "detail-misread",
      "ok",
      "detail-add"
    ],
    "option_why": [
      "句子說海邊有街道，兩旁有椰子樹。",
      "句子說椰子樹種在海邊街道旁。",
      "",
      "句子沒有說有人在賣椰子。"
    ],
    "hints": [
      "第1層：句子裡一直出現的東西是什麼？",
      "第2層：「椰子樹」出現了兩次。",
      "第3層：島上和街道旁都有椰子樹。"
    ],
    "explanation": "這句話告訴我們，小島上有很多椰子樹，連街道兩旁都有。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-014",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「甜」（部首依教育部《重編國語辭典修訂本》）（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 3,
    "type": "choice",
    "scene": "「甜」的左邊是「舌」，右邊是「甘」。",
    "stem": "「甜」的部首是哪一個？",
    "options": [
      "舌（舌部）",
      "口（口部）",
      "甘（甘部）",
      "十（十部）"
    ],
    "answer": 2,
    "option_tags": [
      "radical-component",
      "radical-component",
      "ok",
      "radical-component"
    ],
    "option_why": [
      "「舌」在左邊，但部首是右邊的甘。",
      "「口」藏在「舌」裡，不是部首。",
      "",
      "「十」只是「舌」的一部分。"
    ],
    "hints": [
      "第1層：「甜」是一種味道。",
      "第2層：「甘」本來就有甜美的意思。",
      "第3層：部首是右邊表示意思的「甘」。"
    ],
    "explanation": "「甜」的部首是「甘」（甘部），「甘」有甜美的意思；左邊的「舌」不是部首。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-015",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「糖」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L01",
    "level": 3,
    "type": "choice",
    "scene": "這杯咖啡太苦了，加一點＿就好喝多了。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "塘",
      "唐",
      "堂",
      "糖"
    ],
    "answer": 3,
    "option_tags": [
      "homophone-shape",
      "homophone-shape",
      "homophone",
      "ok"
    ],
    "option_why": [
      "「塘」是土字旁，例如池塘。",
      "「唐」少了米字旁，例如唐朝。",
      "「堂」是禮堂的堂，和吃的無關。",
      ""
    ],
    "hints": [
      "第1層：四個字念法都一樣，要看意思。",
      "第2層：加進咖啡的是一種吃的東西。",
      "第3層：和吃有關的字，常有「米」字旁。"
    ],
    "explanation": "「糖」是米字旁，是吃的東西；「塘、唐、堂」念法相同，意思不同。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-016",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「寒」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-7",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-build",
    "variant_group": "CH4-word-build-L01",
    "level": 3,
    "type": "choice",
    "scene": "學期結束了，冬天要放一段長長的假。",
    "stem": "「寒＿」是冬天放的長假，空格要填哪個字？",
    "options": [
      "冷",
      "假",
      "風",
      "流"
    ],
    "answer": 1,
    "option_tags": [
      "word-build-near",
      "ok",
      "word-build-near",
      "word-build-near"
    ],
    "option_why": [
      "「寒冷」是很冷，不是放假。",
      "",
      "「寒風」是冷冷的風。",
      "「寒流」是讓天氣變冷的冷空氣。"
    ],
    "hints": [
      "第1層：「寒」在這裡是冬天、寒冷的意思。",
      "第2層：題目說的是一段「假期」。",
      "第3層：冬天的假期叫「寒」什麼？"
    ],
    "explanation": "「寒假」是冬天放的長假；「寒」和不同的字組合，會變成不同的詞語。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-017",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「隊」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-7",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-build",
    "variant_group": "CH4-word-build-L01",
    "level": 3,
    "type": "choice",
    "scene": "「排隊」「隊伍」「球隊」這三個詞語都有「隊」。",
    "stem": "這三個「隊」，共同的意思最接近哪一個？",
    "options": [
      "一群人排成或組成的團體",
      "一個人單獨走路",
      "速度非常快",
      "一種好吃的水果"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "antonym",
      "unrelated",
      "unrelated"
    ],
    "option_why": [
      "",
      "「隊」是很多人，不是一個人。",
      "「隊」和速度沒有關係。",
      "「隊」不是水果的名字。"
    ],
    "hints": [
      "第1層：排隊的時候，有幾個人？",
      "第2層：球隊裡也有很多球員。",
      "第3層：「隊」是很多人排在一起或組在一起。"
    ],
    "explanation": "「隊」是一群人排成的行列或組成的團體，所以有排隊、隊伍、球隊。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-018",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「寒冷」「忠實」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L01",
    "level": 4,
    "type": "choice",
    "scene": "雖然外面很寒冷，小狗還是忠實的守在門口，等主人回家。",
    "stem": "從這句話可以知道什麼？",
    "options": [
      "天氣很熱，小狗躲進屋裡",
      "主人已經回到家了",
      "小狗怕冷，跑去睡覺了",
      "天氣很冷，小狗仍然在等主人"
    ],
    "answer": 3,
    "option_tags": [
      "detail-reverse",
      "detail-misread",
      "concession-miss",
      "ok"
    ],
    "option_why": [
      "句子說外面「很寒冷」，不是很熱。",
      "小狗還在「等」，表示主人還沒回家。",
      "「還是」守在門口，表示牠沒離開。",
      ""
    ],
    "hints": [
      "第1層：「雖然……還是……」是什麼意思？",
      "第2層：雖然很冷，小狗還是沒有離開。",
      "第3層：小狗在門口做什麼？在等主人。"
    ],
    "explanation": "「雖然……還是……」表示情況不好，仍然繼續做；天冷，小狗仍在門口等主人。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-019",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉語詞「成群結隊」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L01",
    "level": 4,
    "type": "choice",
    "scene": "老師請大家找出詞語用對的句子。",
    "stem": "下面哪一句的「成群結隊」用得最恰當？",
    "options": [
      "我一個人成群結隊的走回家。",
      "螞蟻成群結隊的搬運食物。",
      "他成群結隊的吃完一碗麵。",
      "桌上成群結隊的放著一本書。"
    ],
    "answer": 1,
    "option_tags": [
      "number-mismatch",
      "ok",
      "number-mismatch",
      "number-mismatch"
    ],
    "option_why": [
      "「一個人」不能成群結隊。",
      "",
      "一個人吃麵，不是很多人一起。",
      "一本書不是很多，也不會行動。"
    ],
    "hints": [
      "第1層：「成群結隊」要有很多才行。",
      "第2層：而且是很多人或動物一起行動。",
      "第3層：找「很多」又「一起行動」的那一句。"
    ],
    "explanation": "「成群結隊」是很多人或動物聚在一起行動，用在一大群螞蟻搬食物最恰當。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1011-020",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第一課 美麗島",
    "node": 1011,
    "source_ref": "翰林 四上 國語 第一課〈美麗島〉生字「灣」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L01",
    "level": 4,
    "type": "choice",
    "scene": "小河在這裡轉了一個大＿，河口旁邊有一個小港＿。",
    "stem": "兩個空格依序要填哪兩個字？",
    "options": [
      "灣、灣",
      "彎、彎",
      "灣、彎",
      "彎、灣"
    ],
    "answer": 3,
    "option_tags": [
      "shape-same",
      "shape-same",
      "shape-swap",
      "ok"
    ],
    "option_why": [
      "轉彎是彎曲，不用三點水的「灣」。",
      "港灣和水有關，要用三點水的「灣」。",
      "兩個字放反了，轉彎用「彎」。",
      ""
    ],
    "hints": [
      "第1層：第一格是「轉彎」，第二格是「港灣」。",
      "第2層：和水有關的，要有三點水。",
      "第3層：轉彎用「彎」，港灣用「灣」。"
    ],
    "explanation": "「轉彎」的「彎」是彎曲；「港灣」的「灣」和水有關，有三點水。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-001",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「驚訝」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L02",
    "level": 2,
    "type": "choice",
    "scene": "看到魔術師把帽子變成鴿子，大家都很驚訝。",
    "stem": "「驚訝」的「訝」，注音是哪一個？",
    "options": [
      "ㄧㄚ",
      "ㄧㄝˋ",
      "ㄧㄚˋ",
      "ㄧㄚˊ"
    ],
    "answer": 2,
    "option_tags": [
      "tone-1",
      "vowel-confuse",
      "ok",
      "phonetic-component"
    ],
    "option_why": [
      "「訝」是第四聲，不是第一聲。",
      "韻母是ㄧㄚ，不是ㄧㄝ。",
      "",
      "右邊「牙」念ㄧㄚˊ，「訝」要念第四聲。"
    ],
    "hints": [
      "第1層：「訝」右邊是「牙」，韻母一樣。",
      "第2層：可是聲調不一樣。",
      "第3層：「訝」念第四聲，聲調往下降。"
    ],
    "explanation": "「訝」念ㄧㄚˋ，和右邊的「牙」（ㄧㄚˊ）韻母相同，但聲調不同。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-002",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「溫泉」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L02",
    "level": 2,
    "type": "choice",
    "scene": "爺爺帶我們上山泡溫＿，水暖暖的好舒服。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "線",
      "原",
      "泉",
      "全"
    ],
    "answer": 2,
    "option_tags": [
      "shared-component",
      "shape-similar",
      "ok",
      "homophone"
    ],
    "option_why": [
      "「線」是毛線的線，左邊有糸。",
      "「原」念ㄩㄢˊ，是原來的原。",
      "",
      "「全」是全部的全，和水沒有關係。"
    ],
    "hints": [
      "第1層：溫泉是從哪裡冒出來的？",
      "第2層：是從地底下冒出來的水。",
      "第3層：找下面有「水」的那個字。"
    ],
    "explanation": "「泉」是從地底冒出的水，下面有「水」；「溫泉」就是溫暖的泉水。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-003",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「彷彿」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L02",
    "level": 1,
    "type": "choice",
    "scene": "遠遠的看，天上那朵白雲彷彿一隻大白貓。",
    "stem": "「彷彿」的意思最接近哪一個？",
    "options": [
      "從來不是",
      "一定是",
      "慢慢變成",
      "好像"
    ],
    "answer": 3,
    "option_tags": [
      "negation",
      "certainty-overstate",
      "process-confuse",
      "ok"
    ],
    "option_why": [
      "句子是說雲像貓，不是說不像。",
      "「彷彿」只是看起來像，不是真的一定是。",
      "「彷彿」是說像什麼，不是說變成什麼。",
      ""
    ],
    "hints": [
      "第1層：雲會真的變成一隻貓嗎？",
      "第2層：雲只是「看起來」像貓。",
      "第3層：「看起來像」可以換成哪個詞？"
    ],
    "explanation": "「彷彿」是好像、似乎的意思，雲只是看起來像貓。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-004",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「齒」、語詞「牙齒」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L02",
    "level": 2,
    "type": "choice",
    "scene": "牙醫叮嚀大家：「吃完東西要刷牙，保護牙＿。」",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "恥",
      "齡",
      "齒",
      "尺"
    ],
    "answer": 2,
    "option_tags": [
      "homophone",
      "shared-component",
      "ok",
      "homophone"
    ],
    "option_why": [
      "「恥」是羞恥的恥，和牙齒無關。",
      "「齡」是年齡的齡，念ㄌㄧㄥˊ。",
      "",
      "「尺」是量長度用的尺。"
    ],
    "hints": [
      "第1層：要保護的是嘴巴裡的什麼？",
      "第2層：這個字的樣子像張開的嘴裡有牙。",
      "第3層：「齡」的左邊就是它，但「齡」多了「令」。"
    ],
    "explanation": "「牙齒」的「齒」，字形像嘴裡排列的牙；「齡」只是借用它當部首。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-005",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「驚訝」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L02",
    "level": 1,
    "type": "choice",
    "scene": "小貓竟然自己跳起來，把門把轉開了！",
    "stem": "「看到這一幕，大家都很＿＿。」最適合填什麼？",
    "options": [
      "驚訝",
      "團聚",
      "汽水",
      "快速"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "word-mismatch",
      "pos-mismatch",
      "word-mismatch"
    ],
    "option_why": [
      "",
      "「團聚」是家人朋友聚在一起。",
      "「汽水」是飲料，放進句子不通順。",
      "「快速」是形容動作快，不是心情。"
    ],
    "hints": [
      "第1層：小貓做了一件很不尋常的事。",
      "第2層：大家看到時，心情是怎樣？",
      "第3層：覺得很意外、很奇怪的心情叫什麼？"
    ],
    "explanation": "看到意想不到的事，覺得很奇怪、很意外，就是「驚訝」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-006",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「螺」（教育百科生字表；原創題）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 2,
    "type": "choice",
    "scene": "海邊沙灘上有好多漂亮的海螺殼。",
    "stem": "「螺」的部首是哪一個？",
    "options": [
      "虫（虫部）",
      "田（田部）",
      "水（水部）",
      "糸（糸部）"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "radical-component",
      "radical-meaning-guess",
      "radical-component"
    ],
    "option_why": [
      "",
      "「田」在右上方，是字的一部分，不是部首。",
      "海螺住在水裡，但「螺」的左邊是虫。",
      "「糸」在右下方，是字的一部分，不是部首。"
    ],
    "hints": [
      "第1層：先看「螺」的左邊是什麼。",
      "第2層：螺是一種動物。",
      "第3層：很多小動物的字，左邊都是「虫」。"
    ],
    "explanation": "「螺」是有硬殼的軟體動物，部首是左邊的「虫」。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-007",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「彷彿」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L02",
    "level": 3,
    "type": "choice",
    "scene": "那首歌好熟悉，我彷彿在哪裡聽過。",
    "stem": "「彷彿」的「彿」，注音是哪一個？",
    "options": [
      "ㄈㄤˇ",
      "ㄈㄛˊ",
      "ㄈㄨˋ",
      "ㄈㄨˊ"
    ],
    "answer": 3,
    "option_tags": [
      "char-swap",
      "phonetic-component",
      "tone-4",
      "ok"
    ],
    "option_why": [
      "ㄈㄤˇ是「彷」的音，不是「彿」。",
      "「佛」常念ㄈㄛˊ，但「彷彿」的彿念ㄈㄨˊ。",
      "「彿」是第二聲，不是第四聲。",
      ""
    ],
    "hints": [
      "第1層：「彷彿」兩個字，聲母都是ㄈ。",
      "第2層：「彷」念ㄈㄤˇ，問的是後面那一個字。",
      "第3層：「彿」的韻母是ㄨ，第二聲。"
    ],
    "explanation": "「彷彿」念ㄈㄤˇ ㄈㄨˊ；「彿」不念「佛陀」的ㄈㄛˊ。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-008",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「團聚」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L02",
    "level": 2,
    "type": "choice",
    "scene": "過年時，在外地工作的叔叔回到家裡，和家人團聚。",
    "stem": "這句話告訴我們什麼？",
    "options": [
      "叔叔回家和家人聚在一起",
      "叔叔在外地和同事聚餐",
      "叔叔過年時沒有回家",
      "全家人一起搬到外地"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "detail-misread",
      "negation",
      "detail-misread"
    ],
    "option_why": [
      "",
      "叔叔是「回到家裡」，不是留在外地。",
      "句子說叔叔回到家裡了。",
      "句子說叔叔回家，不是全家搬走。"
    ],
    "hints": [
      "第1層：叔叔過年時去了哪裡？",
      "第2層：他回到家裡。",
      "第3層：「團聚」是和家人聚在一起。"
    ],
    "explanation": "叔叔過年回到家，和家人聚在一起，這就是「團聚」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-009",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「園區」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L02",
    "level": 2,
    "type": "choice",
    "scene": "這座＿＿裡有好幾間展覽館，可以逛上一整天。",
    "stem": "空格最適合填哪一個詞語？",
    "options": [
      "牙齒",
      "園區",
      "陀螺",
      "團聚"
    ],
    "answer": 1,
    "option_tags": [
      "pos-mismatch",
      "ok",
      "pos-mismatch",
      "shape-similar-word"
    ],
    "option_why": [
      "牙齒長在嘴裡，放進句子不通順。",
      "",
      "陀螺是玩具，裡面不會有展覽館。",
      "「團」和「園」很像；團聚是聚在一起，不是地方。"
    ],
    "hints": [
      "第1層：空格說的是一個「地方」。",
      "第2層：這個地方裡面有好幾間展覽館。",
      "第3層：小心「園」和「團」長得很像。"
    ],
    "explanation": "「園區」是一片活動場地；「團」和「園」字形相近，要分清楚。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-010",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「速」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L02",
    "level": 1,
    "type": "choice",
    "scene": "列車快速的開過鐵橋。",
    "stem": "「快速」的「速」，注音是哪一個？",
    "options": [
      "ㄙㄨ",
      "ㄙㄨˋ",
      "ㄕㄨˋ",
      "ㄙㄨˇ"
    ],
    "answer": 1,
    "option_tags": [
      "tone-1",
      "ok",
      "initial-confuse",
      "tone-3"
    ],
    "option_why": [
      "「速」是第四聲，不是第一聲。",
      "",
      "聲母是ㄙ，不是ㄕ。",
      "「速」是第四聲，不是第三聲。"
    ],
    "hints": [
      "第1層：「速」的聲母是ㄙ，不捲舌。",
      "第2層：「速」和「素食」的「素」同音。",
      "第3層：念第四聲，聲調往下降。"
    ],
    "explanation": "「速」念ㄙㄨˋ，第四聲，聲母ㄙ不捲舌。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-011",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「恐龍」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L02",
    "level": 1,
    "type": "choice",
    "scene": "博物館裡有一副好大的骨頭化石，是很久很久以前的動物留下來的。",
    "stem": "「那是＿＿的化石。」最適合填什麼？",
    "options": [
      "汽水",
      "陀螺",
      "恐龍",
      "園區"
    ],
    "answer": 2,
    "option_tags": [
      "pos-mismatch",
      "pos-mismatch",
      "ok",
      "pos-mismatch"
    ],
    "option_why": [
      "汽水是飲料，不會留下骨頭化石。",
      "陀螺是玩具，不是動物。",
      "",
      "園區是一個地方，不是動物。"
    ],
    "hints": [
      "第1層：化石是很久以前的什麼留下來的？",
      "第2層：是一種很大的動物。",
      "第3層：很久以前、已經絕跡的大型動物是什麼？"
    ],
    "explanation": "恐龍是很久以前的動物，現在已經絕跡，只留下化石。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-012",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「快速」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L02",
    "level": 1,
    "type": "choice",
    "scene": "聽到上課鐘聲，大家快速的回到教室。",
    "stem": "「快速」的意思是什麼？",
    "options": [
      "速度很慢",
      "停下來不動",
      "往後倒退",
      "速度很快"
    ],
    "answer": 3,
    "option_tags": [
      "antonym",
      "antonym",
      "unrelated",
      "ok"
    ],
    "option_why": [
      "「快速」和很慢意思相反。",
      "「快速」是在動，不是停下來。",
      "「快速」說的是快慢，不是方向。",
      ""
    ],
    "hints": [
      "第1層：「快」是什麼意思？",
      "第2層：「速」是速度。",
      "第3層：合起來就是速度很快。"
    ],
    "explanation": "「快速」是速度很快、很迅速的意思。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-013",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「陀螺」「打架」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L02",
    "level": 1,
    "type": "choice",
    "scene": "下課時，弟弟和同學在走廊旁比賽打陀螺。",
    "stem": "弟弟下課時在做什麼？",
    "options": [
      "打陀螺",
      "喝汽水",
      "和同學打架",
      "去看恐龍"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "detail-add",
      "word-confuse",
      "detail-add"
    ],
    "option_why": [
      "",
      "句子沒有說弟弟在喝汽水。",
      "「打陀螺」是玩陀螺，不是打架。",
      "句子沒有說弟弟去看恐龍。"
    ],
    "hints": [
      "第1層：找出句子裡弟弟做的事。",
      "第2層：他和同學在比賽。",
      "第3層：比賽什麼？比賽打陀螺。"
    ],
    "explanation": "弟弟下課和同學比賽打陀螺；「打陀螺」是玩陀螺，不是打架。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-014",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「恐」（部首依教育部《重編國語辭典修訂本》）（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 3,
    "type": "choice",
    "scene": "「恐」有害怕的意思，例如「驚恐」。",
    "stem": "「恐」的部首是哪一個？",
    "options": [
      "工（工部）",
      "几（几部）",
      "心（心部）",
      "丶（丶部）"
    ],
    "answer": 2,
    "option_tags": [
      "radical-component",
      "radical-component",
      "ok",
      "radical-component"
    ],
    "option_why": [
      "「工」在左上，是字的一部分。",
      "「几」藏在右上，不是部首。",
      "",
      "那一點只是筆畫，不是部首。"
    ],
    "hints": [
      "第1層：害怕是一種什麼？",
      "第2層：害怕是心裡的感覺。",
      "第3層：和心情有關的字，部首常是下面的「心」。"
    ],
    "explanation": "「恐」是害怕的意思，和心情有關，部首是下面的「心」（心部）。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-015",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「汽水」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L02",
    "level": 3,
    "type": "choice",
    "scene": "天氣好熱，媽媽買了一瓶冰涼的＿水。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "汽",
      "氣",
      "器",
      "企"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "homophone-shape",
      "homophone",
      "homophone"
    ],
    "option_why": [
      "",
      "「氣」是空氣的氣；汽水要用三點水。",
      "「器」是機器的器。",
      "「企」是企鵝的企。"
    ],
    "hints": [
      "第1層：四個字念法都一樣。",
      "第2層：汽水是一種喝的飲料，和水有關。",
      "第3層：找有三點水的那一個字。"
    ],
    "explanation": "「汽水」的「汽」有三點水；「氣、器、企」念法相同，意思不同。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-016",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「聚」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-7",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-build",
    "variant_group": "CH4-word-build-L02",
    "level": 3,
    "type": "choice",
    "scene": "「團聚」「聚會」「聚集」這三個詞語都有「聚」。",
    "stem": "這三個「聚」，共同的意思最接近哪一個？",
    "options": [
      "分開離去",
      "會合在一起",
      "大聲吵架",
      "快速跑走"
    ],
    "answer": 1,
    "option_tags": [
      "antonym",
      "ok",
      "unrelated",
      "unrelated"
    ],
    "option_why": [
      "「聚」是合在一起，和分開相反。",
      "",
      "「聚」和吵架沒有關係。",
      "「聚」是聚在一起，不是跑走。"
    ],
    "hints": [
      "第1層：家人「團聚」是在做什麼？",
      "第2層：大家回到一起。",
      "第3層：「聚」就是會合在一起。"
    ],
    "explanation": "「聚」是會合、集合在一起的意思，所以有團聚、聚會、聚集。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-017",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「陀」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L02",
    "level": 3,
    "type": "choice",
    "scene": "哥哥把陀螺用力一甩，陀螺在地上轉個不停。",
    "stem": "「陀螺」的「陀」，注音是哪一個？",
    "options": [
      "ㄊㄚ",
      "ㄉㄨㄛˋ",
      "ㄊㄨㄛ",
      "ㄊㄨㄛˊ"
    ],
    "answer": 3,
    "option_tags": [
      "phonetic-component",
      "initial-confuse",
      "tone-1",
      "ok"
    ],
    "option_why": [
      "右邊「它」念ㄊㄚ，「陀」不這樣念。",
      "聲母是ㄊ，不是ㄉ。",
      "「陀」是第二聲，不是第一聲。",
      ""
    ],
    "hints": [
      "第1層：不是每個字都念右邊那一半的音。",
      "第2層：「陀」和「駱駝」的「駝」同音。",
      "第3層：「駝」念ㄊㄨㄛˊ，第二聲。"
    ],
    "explanation": "「陀」念ㄊㄨㄛˊ，和「駝」同音，不念右邊「它」的ㄊㄚ。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-018",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「架」（字義依教育部《重編國語辭典修訂本》）（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-4",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-polysemy",
    "variant_group": "CH4-polysemy",
    "level": 4,
    "type": "choice",
    "scene": "弟弟和表哥為了搶玩具打架，被媽媽叫去罰站。",
    "stem": "下面哪一句的「架」，和「打架」的「架」意思一樣？",
    "options": [
      "書架上擺滿了故事書。",
      "爸爸把衣服掛在衣架上。",
      "兩隻小狗在草地上吵架。",
      "畫架上放著一張圖畫。"
    ],
    "answer": 2,
    "option_tags": [
      "meaning-rack",
      "meaning-rack",
      "ok",
      "meaning-rack"
    ],
    "option_why": [
      "書架的「架」是放東西的架子。",
      "衣架的「架」是掛東西的架子。",
      "",
      "畫架的「架」是放畫的架子。"
    ],
    "hints": [
      "第1層：「打架」的「架」是什麼意思？",
      "第2層：是互相打、互相吵。",
      "第3層：哪一句是在吵、在打？"
    ],
    "explanation": "「架」可以是放東西的架子，也可以是互相爭吵、毆打，例如打架、吵架。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-019",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉語詞「汽水」「牙齒」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L02",
    "level": 4,
    "type": "choice",
    "scene": "妹妹以為汽水喝越多越好。媽媽說：「汽水裡有很多糖，喝太多對牙齒不好。」",
    "stem": "媽媽想提醒妹妹什麼？",
    "options": [
      "汽水喝越多越好",
      "牙齒要多吃糖才健康",
      "汽水不要喝太多",
      "以後只能喝熱水"
    ],
    "answer": 2,
    "option_tags": [
      "opinion-confuse",
      "detail-reverse",
      "ok",
      "overgeneralize"
    ],
    "option_why": [
      "這是妹妹原本的想法，媽媽不同意。",
      "媽媽說糖太多對牙齒不好。",
      "",
      "媽媽沒有說只能喝熱水。"
    ],
    "hints": [
      "第1層：媽媽說了什麼？",
      "第2層：汽水糖很多，喝太多對牙齒不好。",
      "第3層：所以媽媽希望妹妹怎麼做？"
    ],
    "explanation": "媽媽說汽水糖分多、喝太多傷牙齒，是提醒妹妹汽水不要喝太多。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1012-020",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第二課 請到我的家鄉來",
    "node": 1012,
    "source_ref": "翰林 四上 國語 第二課〈請到我的家鄉來〉生字「牙」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L02",
    "level": 4,
    "type": "choice",
    "scene": "春天，種子冒出了嫩＿；妹妹掉了一顆＿齒。",
    "stem": "兩個空格依序要填哪兩個字？",
    "options": [
      "牙、芽",
      "芽、芽",
      "牙、牙",
      "芽、牙"
    ],
    "answer": 3,
    "option_tags": [
      "shape-swap",
      "shape-same",
      "shape-same",
      "ok"
    ],
    "option_why": [
      "兩個字放反了，植物的要用「芽」。",
      "牙齒的「牙」沒有草字頭。",
      "植物的嫩芽要有草字頭。",
      ""
    ],
    "hints": [
      "第1層：第一格說的是植物，第二格說的是牙齒。",
      "第2層：和植物有關的字，常有草字頭。",
      "第3層：嫩芽用「芽」，牙齒用「牙」。"
    ],
    "explanation": "「嫩芽」的「芽」有草字頭，和植物有關；「牙齒」的「牙」沒有草字頭。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-001",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「軌道」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L03",
    "level": 2,
    "type": "choice",
    "scene": "捷運列車沿著軌道，平穩的開進車站。",
    "stem": "「軌道」的「軌」，注音是哪一個？",
    "options": [
      "ㄍㄨㄟ",
      "ㄍㄨㄟˇ",
      "ㄍㄨㄟˋ",
      "ㄐㄧㄡˇ"
    ],
    "answer": 1,
    "option_tags": [
      "tone-1",
      "ok",
      "tone-4",
      "phonetic-component"
    ],
    "option_why": [
      "「軌」是第三聲，不是第一聲。",
      "",
      "「軌」是第三聲，不是第四聲。",
      "右邊的「九」念ㄐㄧㄡˇ，「軌」念ㄍㄨㄟˇ。"
    ],
    "hints": [
      "第1層：「軌」不念右邊「九」的音。",
      "第2層：「軌」和「鬼」同音。",
      "第3層：「鬼」念ㄍㄨㄟˇ，第三聲。"
    ],
    "explanation": "「軌」念ㄍㄨㄟˇ，和「鬼」同音，不念右邊「九」的音。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-002",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「軌」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L03",
    "level": 2,
    "type": "choice",
    "scene": "火車在鐵＿上轟隆轟隆的跑。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "軋",
      "軌",
      "規",
      "鬼"
    ],
    "answer": 1,
    "option_tags": [
      "shape-similar",
      "ok",
      "near-sound",
      "homophone"
    ],
    "option_why": [
      "「軋」右邊是乚，不是九。",
      "",
      "「規」是規定的規，念ㄍㄨㄟ。",
      "「鬼」和「軌」同音，但和鐵路無關。"
    ],
    "hints": [
      "第1層：火車跑的路，和「車」有關。",
      "第2層：找左邊是「車」的字。",
      "第3層：左邊是車、右邊是九的那個字。"
    ],
    "explanation": "「鐵軌」是火車行駛的路線，「軌」是車字旁，右邊是「九」。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-003",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「鏡」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L03",
    "level": 2,
    "type": "choice",
    "scene": "爺爺戴上老花眼＿，才看得清楚報紙上的字。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "境",
      "敬",
      "竟",
      "鏡"
    ],
    "answer": 3,
    "option_tags": [
      "shape-similar",
      "homophone",
      "shared-component",
      "ok"
    ],
    "option_why": [
      "「境」是土字旁，例如環境。",
      "「敬」是尊敬的敬，同音但意思不同。",
      "「竟」是竟然的竟，少了金字旁。",
      ""
    ],
    "hints": [
      "第1層：眼鏡是用什麼材料做的？",
      "第2層：古時候的鏡子是用銅做的。",
      "第3層：找有「金」字旁的那個字。"
    ],
    "explanation": "「眼鏡」的「鏡」是金字旁，古代的鏡子用銅等金屬做成。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-004",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「耕耘」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L03",
    "level": 2,
    "type": "choice",
    "scene": "農夫一大早就到田裡耕耘，太陽下山才回家。",
    "stem": "「耕耘」是在做什麼事？",
    "options": [
      "拍照錄影、上網分享",
      "翻土種田、拔除雜草",
      "敲鑼打鼓、唱歌跳舞",
      "把柳丁裝箱運去賣"
    ],
    "answer": 1,
    "option_tags": [
      "unrelated",
      "ok",
      "unrelated",
      "stage-confuse"
    ],
    "option_why": [
      "「耕耘」是田裡的工作，不是拍照。",
      "",
      "句子說在田裡工作，不是在表演。",
      "裝箱去賣是收成以後的事。"
    ],
    "hints": [
      "第1層：農夫在哪裡工作？",
      "第2層：「耕」是犁田、種植。",
      "第3層：「耘」是除草。"
    ],
    "explanation": "「耕」是翻土種植，「耘」是除草，「耕耘」就是在田裡辛苦工作。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-005",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「耘」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L03",
    "level": 1,
    "type": "choice",
    "scene": "老師說：「一分耕耘，一分收穫。」",
    "stem": "「耕耘」的「耘」，注音是哪一個？",
    "options": [
      "ㄩㄣ",
      "ㄩㄣˇ",
      "ㄩㄣˊ",
      "ㄩㄣˋ"
    ],
    "answer": 2,
    "option_tags": [
      "tone-1",
      "tone-3",
      "ok",
      "tone-4"
    ],
    "option_why": [
      "「耘」是第二聲，不是第一聲。",
      "「耘」是第二聲，不是第三聲。",
      "",
      "「耘」是第二聲，不是第四聲。"
    ],
    "hints": [
      "第1層：四個選項的聲母、韻母都一樣，只差聲調。",
      "第2層：「耘」右邊的「云」念ㄩㄣˊ。",
      "第3層：「耘」和「云」同音，第二聲。"
    ],
    "explanation": "「耘」念ㄩㄣˊ，第二聲，和右邊的「云」同音。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-006",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「記錄」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L03",
    "level": 3,
    "type": "choice",
    "scene": "小美每天把種子發芽的樣子，用筆記＿下來。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "綠",
      "祿",
      "碌",
      "錄"
    ],
    "answer": 3,
    "option_tags": [
      "shape-similar",
      "shape-similar",
      "shape-similar",
      "ok"
    ],
    "option_why": [
      "「綠」是綠色的綠，糸字旁。",
      "「祿」是示字旁，和寫下來無關。",
      "「碌」是忙碌的碌，石字旁。",
      ""
    ],
    "hints": [
      "第1層：四個字右邊都一樣，要看左邊。",
      "第2層：「記錄」是把事情寫下來、留下來。",
      "第3層：「抄錄」「記錄」的「錄」是金字旁。"
    ],
    "explanation": "「記錄」是把事情寫下來，用金字旁的「錄」；右邊相同的字要看左邊分辨。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-007",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「腮幫子」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L03",
    "level": 1,
    "type": "choice",
    "scene": "弟弟一口塞進一大塊麵包。",
    "stem": "「弟弟的＿＿＿鼓得圓圓的。」最適合填什麼？",
    "options": [
      "鏡頭",
      "腮幫子",
      "軌道",
      "柳丁"
    ],
    "answer": 1,
    "option_tags": [
      "pos-mismatch",
      "ok",
      "pos-mismatch",
      "pos-mismatch"
    ],
    "option_why": [
      "鏡頭在相機上，不在弟弟臉上。",
      "",
      "軌道是給列車走的路。",
      "柳丁是水果，不是身體的一部分。"
    ],
    "hints": [
      "第1層：嘴巴塞滿食物時，臉上哪裡會鼓起來？",
      "第2層：是臉頰。",
      "第3層：臉頰的另一種說法是「腮」什麼？"
    ],
    "explanation": "「腮幫子」就是臉頰，嘴裡塞滿食物時會鼓起來。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-008",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「蔬」（教育百科生字表；原創題）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 3,
    "type": "choice",
    "scene": "「蔬菜」的「蔬」和「疏」長得很像。",
    "stem": "「蔬」的部首是哪一個？",
    "options": [
      "艹（艸部）",
      "厶（厶部）",
      "木（木部）",
      "疋（疋部）"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "radical-component",
      "radical-meaning-guess",
      "radical-component"
    ],
    "option_why": [
      "",
      "「厶」是字的一部分，不是部首。",
      "蔬菜是植物，但部首是上面的艹。",
      "「疋」是「疏」的部首；「蔬」多了草字頭。"
    ],
    "hints": [
      "第1層：比一比「蔬」和「疏」，多了哪一部分？",
      "第2層：多出來的是上面的草字頭。",
      "第3層：蔬菜和植物有關，部首就是那個草字頭。"
    ],
    "explanation": "「蔬」的部首是「艹」（艸部），表示和植物有關；「疏」的部首才是「疋」。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-009",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「與」（教育百科生字表：與＝和、同、跟；參加；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-4",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-polysemy",
    "variant_group": "CH4-polysemy",
    "level": 4,
    "type": "choice",
    "scene": "學校海報寫著：「歡迎全校同學參與淨灘活動。」",
    "stem": "下面哪一句的「與」，是「參加」的意思？",
    "options": [
      "他參與了班上的話劇表演。",
      "山與海都很美。",
      "我與妹妹一起畫畫。",
      "老師與家長在開會。"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "meaning-and",
      "meaning-and",
      "meaning-and"
    ],
    "option_why": [
      "",
      "這裡的「與」是「和」的意思。",
      "這裡的「與」是「和」的意思。",
      "這裡的「與」是「和」的意思。"
    ],
    "hints": [
      "第1層：「與」有兩個常見的意思：「和」、「參加」。",
      "第2層：把「與」換成「和」，念得通的就不是答案。",
      "第3層：「參與」就是參加。"
    ],
    "explanation": "「與」可以當「和」，也可以當「參加」；「參與表演」就是參加表演。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-010",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「烤」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-1",
      "國語 Ab-Ⅱ-1",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-sound",
    "variant_group": "CH4-sound-L03",
    "level": 1,
    "type": "choice",
    "scene": "中秋節晚上，全家在院子裡烤肉。",
    "stem": "「烤肉」的「烤」，注音是哪一個？",
    "options": [
      "ㄍㄠˇ",
      "ㄎㄠ",
      "ㄎㄠˇ",
      "ㄎㄠˋ"
    ],
    "answer": 2,
    "option_tags": [
      "initial-confuse",
      "tone-1",
      "ok",
      "tone-4"
    ],
    "option_why": [
      "聲母是ㄎ，不是ㄍ。",
      "「烤」是第三聲，不是第一聲。",
      "",
      "「烤」是第三聲，不是第四聲。"
    ],
    "hints": [
      "第1層：「烤」右邊是「考」。",
      "第2層：「烤」和「考試」的「考」同音。",
      "第3層：「考」念ㄎㄠˇ，第三聲。"
    ],
    "explanation": "「烤」念ㄎㄠˇ，和右邊的「考」同音。",
    "read_aloud": "none",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-011",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「蔬菜」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L03",
    "level": 1,
    "type": "choice",
    "scene": "媽媽說，每天要多吃青菜和水果，身體才會健康。",
    "stem": "「青菜」還可以說成哪一個詞語？",
    "options": [
      "柳丁",
      "蔬菜",
      "鏡頭",
      "軌道"
    ],
    "answer": 1,
    "option_tags": [
      "category-confuse",
      "ok",
      "unrelated",
      "unrelated"
    ],
    "option_why": [
      "柳丁是水果，不是青菜。",
      "",
      "鏡頭是相機的一部分。",
      "軌道是給列車走的路。"
    ],
    "hints": [
      "第1層：青菜是吃的東西。",
      "第2層：它長在田裡，是植物。",
      "第3層：找兩個字都有草字頭的詞語。"
    ],
    "explanation": "「蔬菜」就是可以吃的青菜，例如高麗菜、菠菜。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-012",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「上網」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-6",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-use",
    "variant_group": "CH4-word-use-L03",
    "level": 1,
    "type": "choice",
    "scene": "老師請大家回家查一查家鄉的老照片。",
    "stem": "「哥哥用電腦＿＿查資料。」最適合填什麼？",
    "options": [
      "耕耘",
      "腮幫子",
      "柳丁",
      "上網"
    ],
    "answer": 3,
    "option_tags": [
      "word-mismatch",
      "pos-mismatch",
      "pos-mismatch",
      "ok"
    ],
    "option_why": [
      "「耕耘」是在田裡工作。",
      "腮幫子是臉頰。",
      "柳丁是水果。",
      ""
    ],
    "hints": [
      "第1層：用電腦查資料，要連到哪裡？",
      "第2層：要連上網路。",
      "第3層：連上網路叫做什麼？"
    ],
    "explanation": "用電腦連上網路找資料，叫做「上網」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-013",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「柳丁」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L03",
    "level": 1,
    "type": "choice",
    "scene": "爺爺把剛採下來的柳丁裝進箱子，準備寄給住在城市的姑姑。",
    "stem": "爺爺要把柳丁怎麼樣？",
    "options": [
      "寄給姑姑",
      "拿去烤來吃",
      "種回田裡",
      "自己全部吃掉"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "detail-add",
      "detail-add",
      "detail-add"
    ],
    "option_why": [
      "",
      "句子沒有說要烤柳丁。",
      "柳丁已經採下來，要裝箱寄出。",
      "句子說要寄給姑姑，不是自己吃。"
    ],
    "hints": [
      "第1層：爺爺把柳丁裝進了什麼？",
      "第2層：裝進箱子，準備寄出去。",
      "第3層：要寄給誰？"
    ],
    "explanation": "爺爺把柳丁裝箱，是要寄給住在城市的姑姑。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-014",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「烤」（部首依教育部《重編國語辭典修訂本》）（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 2,
    "type": "choice",
    "scene": "「烤」的右邊是「考試」的「考」。",
    "stem": "「烤」的部首是哪一個？",
    "options": [
      "老（老部）",
      "火（火部）",
      "土（土部）",
      "木（木部）"
    ],
    "answer": 1,
    "option_tags": [
      "radical-component",
      "ok",
      "radical-component",
      "radical-meaning-guess"
    ],
    "option_why": [
      "「老」是「考」的部首；「烤」多了火字旁。",
      "",
      "「土」只是右上的樣子，不是部首。",
      "烤東西要用火，部首是左邊的火。"
    ],
    "hints": [
      "第1層：烤肉要用什麼？",
      "第2層：要用火。",
      "第3層：左邊的「火」就是部首。"
    ],
    "explanation": "「烤」是用火加熱，部首是左邊的「火」（火部）；「考」的部首才是「老」。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-015",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「鏡頭」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-5",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-meaning",
    "variant_group": "CH4-word-meaning-L03",
    "level": 2,
    "type": "choice",
    "scene": "攝影師把鏡頭對準舞台上的演員。",
    "stem": "句子裡的「鏡頭」是指什麼？",
    "options": [
      "鏡子的上面",
      "舞台上的燈",
      "相機上拍攝影像的部分",
      "攝影師的頭"
    ],
    "answer": 2,
    "option_tags": [
      "literal-split",
      "unrelated",
      "ok",
      "literal-split"
    ],
    "option_why": [
      "「鏡頭」不是鏡子的上面。",
      "燈是照亮舞台的，不是拍攝用的。",
      "",
      "「頭」在這裡不是人的頭。"
    ],
    "hints": [
      "第1層：攝影師手上拿的是什麼？",
      "第2層：是相機或攝影機。",
      "第3層：對準演員、用來拍攝的部分是什麼？"
    ],
    "explanation": "「鏡頭」是相機或攝影機上用來拍攝影像的部分。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-016",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「上網」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 4-Ⅱ-4",
      "國語 Ab-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-char-shape",
    "variant_group": "CH4-shape-L03",
    "level": 3,
    "type": "choice",
    "scene": "＿路上的消息很多，要小心分辨真假。",
    "stem": "空格裡應該填哪一個字？",
    "options": [
      "往",
      "忘",
      "綱",
      "網"
    ],
    "answer": 3,
    "option_tags": [
      "near-sound",
      "near-sound",
      "shape-similar",
      "ok"
    ],
    "option_why": [
      "「往」是往前走的往。",
      "「忘」是忘記的忘。",
      "「綱」念ㄍㄤ，是大綱的綱。",
      ""
    ],
    "hints": [
      "第1層：說的是電腦、手機上的什麼？",
      "第2層：就是「上網」的那個字。",
      "第3層：「網」是糸字旁，像一張網子。"
    ],
    "explanation": "「網路」的「網」是糸字旁；「往、忘」念法相近，意思不同。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-017",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「粉」（部首依教育部《重編國語辭典修訂本》）（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-3",
      "國語 4-Ⅱ-2"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-radical",
    "variant_group": "CH4-radical",
    "level": 3,
    "type": "choice",
    "scene": "媽媽用麵粉做了好吃的包子。",
    "stem": "「粉」的部首是哪一個？",
    "options": [
      "刀（刀部）",
      "米（米部）",
      "八（八部）",
      "木（木部）"
    ],
    "answer": 1,
    "option_tags": [
      "radical-component",
      "ok",
      "radical-component",
      "shape-similar"
    ],
    "option_why": [
      "「刀」在「分」的下面，是字的一部分。",
      "",
      "「八」在右上方，是字的一部分。",
      "「木」和「米」很像，米多了兩點。"
    ],
    "hints": [
      "第1層：麵粉是把穀物磨碎做成的。",
      "第2層：「粉」左邊是什麼？",
      "第3層：左邊的「米」就是部首。"
    ],
    "explanation": "「粉」是把米、麥等磨碎的細末，部首是左邊的「米」（米部）。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-018",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「錄」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-7",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-word-build",
    "variant_group": "CH4-word-build-L03",
    "level": 3,
    "type": "choice",
    "scene": "「記錄」「錄音」「錄影」這三個詞語都有「錄」。",
    "stem": "這三個「錄」，共同的意思最接近哪一個？",
    "options": [
      "很綠的顏色",
      "把事情、聲音或影像留存下來",
      "非常忙碌",
      "把東西丟掉"
    ],
    "answer": 1,
    "option_tags": [
      "homophone-meaning",
      "ok",
      "homophone-meaning",
      "antonym"
    ],
    "option_why": [
      "「綠」才是顏色，是糸字旁。",
      "",
      "「碌」才是忙碌，是石字旁。",
      "「錄」是留下來，和丟掉相反。"
    ],
    "hints": [
      "第1層：「錄音」是把什麼留下來？",
      "第2層：把聲音留下來。",
      "第3層：「錄」就是把事情、聲音、影像留下來。"
    ],
    "explanation": "「錄」有記下、留存的意思，所以有記錄、錄音、錄影。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-019",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉生字「鼓」（字義依教育部《重編國語辭典修訂本》）（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 Ab-Ⅱ-4",
      "國語 4-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-polysemy",
    "variant_group": "CH4-polysemy",
    "level": 4,
    "type": "choice",
    "scene": "「鼓」可以是一種樂器，也可以有別的意思。",
    "stem": "下面哪一句的「鼓」，是「讓人更有勇氣」的意思？",
    "options": [
      "樂隊在操場上打鼓。",
      "大家熱烈的鼓掌。",
      "老師鼓勵我上台表演。",
      "他敲著小鼓唱歌。"
    ],
    "answer": 2,
    "option_tags": [
      "meaning-drum",
      "meaning-clap",
      "ok",
      "meaning-drum"
    ],
    "option_why": [
      "這裡的「鼓」是一種樂器。",
      "「鼓掌」是拍手。",
      "",
      "這裡的「鼓」是一種樂器。"
    ],
    "hints": [
      "第1層：讓人更有勇氣，就是替人加油。",
      "第2層：哪一句是有人在替別人加油？",
      "第3層：「鼓勵」就是給人勇氣。"
    ],
    "explanation": "「鼓」可以是樂器，也可以是拍打（鼓掌），還可以是激勵、使振作（鼓勵）。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "CH4-1013-020",
    "grade": 4,
    "subject": "國語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "第一單元（單元名稱待查證）",
    "lesson": "第三課 鏡頭下的家鄉",
    "node": 1013,
    "source_ref": "翰林 四上 國語 第三課〈鏡頭下的家鄉〉語詞「上網」「柳丁」（教育百科生字表；句子原創，非課文）",
    "curriculum_code": [
      "國語 5-Ⅱ-4",
      "國語 Ab-Ⅱ-5"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "CH4-sentence",
    "variant_group": "CH4-sentence-L03",
    "level": 4,
    "type": "choice",
    "scene": "小明在網路上看到「吃柳丁會變聰明」，他決定先問老師，再查可靠的資料。",
    "stem": "小明這樣做，是因為他知道什麼？",
    "options": [
      "網路上的消息都是對的",
      "網路上的消息不一定正確",
      "吃柳丁一定會變聰明",
      "老師不喜歡吃柳丁"
    ],
    "answer": 1,
    "option_tags": [
      "overtrust",
      "ok",
      "detail-overstate",
      "detail-add"
    ],
    "option_why": [
      "小明要先查證，表示他不全信。",
      "",
      "小明還沒確定，所以才要查。",
      "句子沒有說老師喜不喜歡柳丁。"
    ],
    "hints": [
      "第1層：小明看到消息後，馬上相信了嗎？",
      "第2層：沒有，他要先問老師、查資料。",
      "第3層：為什麼要查？因為消息可能不對。"
    ],
    "explanation": "小明先問老師、查資料，因為網路上的消息不一定正確，要先查證。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "zh-TW",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  }
];

// ════════════════════════════════════════════════════════════════════
// 來源：成品匣 四年級版規劃/題庫草稿/english_4A_u01.js（20 題；檔頭說明照原檔，題目以 JSON 寫出）
// ════════════════════════════════════════════════════════════════════
// 四年級版學習 RPG — 英語 四上 Unit 1 How's the Weather?（翰林 Here We Go 3）題庫草稿
// 撰寫：A1 108 課綱教案設計師｜初版 2026-10-19（13 題）｜第二版 2026-10-19（補到 20 題、概念 6 個）
// 狀態：草稿，reviewed 一律 false，待老師審題
//
// 【題數（第二版）】20 題，全部是課綱題；難度 L1 6、L2 6、L3 5、L4 3。id 接續：EN4-1010-014～020 是新題，001～013 的 id 與內容沒改（只細分 concept）。
// 【老闆裁示（2026-10-19）】「英文都可以，全包也行」→ 本檔照翰林 Here We Go 3（和全遊戲單元順序一致）；
//   何嘉仁 Super Fun 3（金山國小 115 學年實際使用）另收在 english_4A_superfun_u01.js，兩個版本都進題庫、共用 node 1010。
//
// 【版本判斷】翰林國小英語在四年級（四上）常用的是 Here We Go 3（四下接 Here We Go 4），不是 Dino on the Go 3。
//   依據：
//   1. 彰化縣育英國小 114 學年度四年級英語課程計畫（學校官方 PDF，2026-10-19 直接打開核對）：
//      教材版本「翰林版」、四年級「英語 Here We Go 3」、每週 1 節。順序：Classroom English → Starter → Festival（Moon Festival）
//      → 第 4–7 週 Unit 1 How's the Weather? → 第 8 週起 Unit 2 Are You Thirsty?
//      https://www.curriculum.chc.edu.tw/storage/57/114/5-4%E8%8B%B1%E8%AA%9E%E6%96%87.pdf/gXlilXQUKHKP6MLKc9pHv12xwU6N9WsZgAVDcKXv.pdf
//   2. 彰化縣長安國小 114 學年度四年級「英語 Here We Go 3」課程計畫（學校官方 PDF，已直接打開，單元順序相同）
//      https://www.curriculum.chc.edu.tw/storage/211/114/5-4%E8%8B%B1%E8%AA%9E%E6%96%87.pdf/Wg9WRHmMMuiwRdX1H8W8m4iAJ8e9lFViLnUxDedS.pdf
//   3. 翰林國小英語英聽網 https://kiddo.hle.com.tw/ （2026-10-19 讀取）：Dino on the Go! 1–8 標「111, 112適用」、9 標「112, 113適用」；
//      Here We Go 2–4 標「111, 112適用」。【推論】Dino 系列已逐年被 Here We Go 取代，115 學年度沒有找到 Dino 仍在使用的學校計畫。
//   4. R2 研究資料：臺南大社國小 115 學年度四年級用翰林 Here We Go 3.4（搜尋摘要，可信度較低）。
//   注意：英語冊別取決於學校從幾年級開始教英語（臺北市有學校三年級就用 Here We Go 3，見 R2）。
//
// 【第一單元主題（已查證）】Unit 1 How's the Weather?（天氣）— 依上列育英國小 114 計畫（PDF 第 14 頁一帶）：
//   - 單字：sunny、rainy、cloudy、windy、hot、warm、cool、cold
//   - 句型：How's the weather? ／ It's sunny. It's hot.
//   - 字母拼讀：d-、t- 開頭的字，例字 dot、duck、dig、tot、tuck、ten
//   （本檔沒有使用 tot、tuck：這兩個字不在課綱參考字彙表基本 1,200 字裡，題目只用表內的字。）
//   Starter Unit（課程計畫寫的是職業句型 Is he a driver?）與 Festival 不算 Unit 1，本檔不出。
//   第二版新增的 and（It's rainy and cold.）在基本 1,200 字表內；課本 Unit 1 是否教「兩種天氣用 and 連接」待老師確認（L4 題 018、020）。
//
// 【出題守則】句子、情境全部原創，不照抄課本對話、歌謠、韻文。scene、stem、options、explanation 裡的英文字，
//   全部在課綱附錄五「表一、基本 1,200 字」裡（PDF p.56–59）；檢查程式用同一份字表（en_basic1200_words.txt）逐字比對。
//   拼字題的錯誤拼法（clowdy、celd…）是刻意的錯字，檢查程式略過拼字概念的選項。
//
// 【課綱代碼】對照國教署公告《十二年國民基本教育課程綱要 語文領域－英語文》（107 年 4 月）PDF 原文逐字核對（2026-10-19 下載抽字）：
//   https://www.k12ea.gov.tw/files/class_schema/課綱/9-英語文/9-1/十二年國民基本教育課程綱要國民中小學暨普通型高級中等學校語文領域─英語文.pdf
//   （頁碼為 PDF 檔頁序）
//   - 1-Ⅱ-7 能聽懂課堂中所學的字詞。（p.11）
//   - 1-Ⅱ-10 能聽懂簡易句型的句子。（p.11）
//   - 3-Ⅱ-2 能辨識課堂中所學的字詞。（p.13）
//   - 3-Ⅱ-3 能看懂課堂中所學的句子。（p.13）
//   - 5-Ⅱ-4 能運用所學的字母拼讀規則讀出英文字詞。（p.14）
//   - Ab-Ⅱ-4 所學的字母拼讀規則（含看字讀音、聽音拼字）。（p.19）
//   - Ac-Ⅱ-3 第二學習階段所學字詞。（p.19）
//   - B-Ⅱ-1 第二學習階段所學字詞及句型的生活溝通。（p.20）
//
// 【explain_status】英語文領綱沒有「學習內容說明」附錄（全文搜尋 0 筆）；範圍判斷改看附錄五參考字彙表（PDF p.56–59），
//   本檔用字全部在基本 1,200 字內，所以標 verified。
//
// 【概念清單（第二版細分，6 個）】
//   EN4-weather-word     天氣字彙 sunny／rainy／cloudy／windy   英語 3-Ⅱ-2、1-Ⅱ-7、Ac-Ⅱ-3   001 002 003 004 014 020
//   EN4-temp-word        溫度字彙 hot／warm／cool／cold         英語 3-Ⅱ-2、1-Ⅱ-7、Ac-Ⅱ-3   005 006 015
//   EN4-weather-ask      問天氣 How's the weather?              英語 3-Ⅱ-3、1-Ⅱ-10、B-Ⅱ-1   007 016
//   EN4-weather-answer   回答天氣 It's ___.                     英語 3-Ⅱ-3、1-Ⅱ-10、B-Ⅱ-1   008 009 013 018
//   EN4-phonics-dt       字母拼讀 d-、t-                        英語 5-Ⅱ-4、Ab-Ⅱ-4           010 011 017
//   EN4-spelling         看字拼寫                               英語 3-Ⅱ-2、Ab-Ⅱ-4           012 019
//
// 【node】英語解鎖單位是「單元」，Unit 1 記為 1010（學期 1×1000＋單元 1×10＋課 0）。
// 【待查證】115 學年度翰林四上英語是否仍為 Here We Go 3（目前最新直接核對到的是 114 學年度計畫）；Here We Go 4 各單元句型未逐單元核對。
window.QUESTIONS_G4_EN_U01 = [
  {
    "id": "EN4-1010-001",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-word",
    "variant_group": "EN4-weather-word-pick",
    "level": 1,
    "type": "choice",
    "scene": "窗外的太陽好大，天空藍藍的，一朵雲也沒有。",
    "stem": "這種天氣，英文是哪一個字？",
    "options": [
      "sunny",
      "rainy",
      "cloudy",
      "windy"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "weather-rain",
      "weather-cloud",
      "weather-wind"
    ],
    "option_why": [
      "",
      "rainy 是下雨，今天沒有下雨。",
      "cloudy 是雲很多，今天沒有雲。",
      "windy 是風很大，題目說的是太陽大。"
    ],
    "hints": [
      "第1層：題目說太陽很大。",
      "第2層：太陽的英文是 sun。",
      "第3層：sun 加上 ny，就是出太陽的天氣。"
    ],
    "explanation": "sunny 是晴天、出太陽，和 sun（太陽）有關。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-002",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-word",
    "variant_group": "EN4-weather-word-pick",
    "level": 1,
    "type": "choice",
    "scene": "外面嘩啦嘩啦下大雨，大家都撐著傘。",
    "stem": "這種天氣，英文是哪一個字？",
    "options": [
      "hot",
      "rainy",
      "windy",
      "sunny"
    ],
    "answer": 1,
    "option_tags": [
      "weather-temp",
      "ok",
      "weather-wind",
      "weather-sun"
    ],
    "option_why": [
      "hot 是很熱，說的是溫度，不是下雨。",
      "",
      "windy 是風很大，題目說的是下雨。",
      "sunny 是出太陽，下雨天看不到大太陽。"
    ],
    "hints": [
      "第1層：題目說外面在下什麼？",
      "第2層：雨的英文是 rain。",
      "第3層：rain 加上 y，就是下雨的天氣。"
    ],
    "explanation": "rainy 是下雨的天氣，和 rain（雨）有關。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-003",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-word",
    "variant_group": "EN4-weather-word-pick",
    "level": 2,
    "type": "choice",
    "scene": "強風吹得樹枝一直搖，帽子差點被吹走。",
    "stem": "這種天氣，英文是哪一個字？",
    "options": [
      "windy",
      "cloudy",
      "rainy",
      "warm"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "weather-cloud",
      "weather-rain",
      "weather-temp"
    ],
    "option_why": [
      "",
      "cloudy 是雲很多，和風大不一樣。",
      "rainy 是下雨，題目說的是風很大。",
      "warm 是溫暖，說的是溫度。"
    ],
    "hints": [
      "第1層：是什麼把帽子吹走？",
      "第2層：風的英文是 wind。",
      "第3層：wind 加上 y，就是風很大的天氣。"
    ],
    "explanation": "windy 是風很大的天氣，和 wind（風）有關。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-004",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-word",
    "variant_group": "EN4-weather-word-pick",
    "level": 2,
    "type": "choice",
    "scene": "天空灰灰的，全是雲，可是沒有下雨。",
    "stem": "這種天氣，英文是哪一個字？",
    "options": [
      "cloudy",
      "cold",
      "rainy",
      "sunny"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "weather-temp",
      "cloud-rain-confuse",
      "weather-sun"
    ],
    "option_why": [
      "",
      "cold 是冷，說的是溫度。",
      "雲多不一定下雨；下雨才是 rainy。",
      "天空全是雲，看不到大太陽。"
    ],
    "hints": [
      "第1層：天空裡滿滿的是什麼？",
      "第2層：雲的英文是 cloud。",
      "第3層：cloud 加上 y，就是雲很多的天氣。"
    ],
    "explanation": "cloudy 是多雲的天氣；雲很多但沒下雨，不是 rainy。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-005",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-temp-word",
    "variant_group": "EN4-weather-word-meaning",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在天氣預報看板上看到一個字：cold。",
    "stem": "cold 是什麼意思？",
    "options": [
      "溫暖",
      "冷",
      "涼爽",
      "熱"
    ],
    "answer": 1,
    "option_tags": [
      "near-meaning",
      "ok",
      "near-meaning",
      "antonym"
    ],
    "option_why": [
      "溫暖是 warm。",
      "",
      "涼爽是 cool，比 cold 暖和一點。",
      "熱是 hot，和 cold 意思相反。"
    ],
    "hints": [
      "第1層：cold 和 hot 是一對相反詞。",
      "第2層：hot 是熱。",
      "第3層：和熱相反的是什麼？"
    ],
    "explanation": "cold 是冷，hot 是熱；cool 是涼爽，warm 是溫暖。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-006",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-temp-word",
    "variant_group": "EN4-weather-word-meaning",
    "level": 2,
    "type": "choice",
    "scene": "春天的早上，陽光照在身上暖暖的，好舒服。",
    "stem": "warm 是什麼意思？",
    "options": [
      "很冷",
      "很熱",
      "涼爽",
      "溫暖"
    ],
    "answer": 3,
    "option_tags": [
      "antonym",
      "degree-overstate",
      "warm-cool-swap",
      "ok"
    ],
    "option_why": [
      "很冷是 cold，和 warm 相反。",
      "很熱是 hot，warm 是暖暖的。",
      "涼爽是 cool，別和 warm 弄反。",
      ""
    ],
    "hints": [
      "第1層：題目的情境是暖暖的、舒服的。",
      "第2層：warm 不像 hot 那麼熱。",
      "第3層：暖暖的感覺叫做什麼？"
    ],
    "explanation": "warm 是溫暖，比 hot（熱）溫和；cool 是涼爽，比 cold（冷）溫和。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-007",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（句型 How's the weather?；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-ask",
    "variant_group": "EN4-weather-ask",
    "level": 2,
    "type": "choice",
    "scene": "你想問從美國來的朋友：今天天氣怎麼樣？",
    "stem": "要說哪一句英文？",
    "options": [
      "What time is it?",
      "What's this?",
      "How are you?",
      "How's the weather?"
    ],
    "answer": 3,
    "option_tags": [
      "q-time",
      "q-object",
      "q-greeting",
      "ok"
    ],
    "option_why": [
      "What time is it? 是問「現在幾點」。",
      "What's this? 是問「這是什麼」。",
      "How are you? 是問「你好嗎」。",
      ""
    ],
    "hints": [
      "第1層：你想問的是「天氣」。",
      "第2層：天氣的英文是 weather。",
      "第3層：找有 weather 的那一句。"
    ],
    "explanation": "問天氣要說 How's the weather?，weather 是天氣。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-008",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（句型 It's hot.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-answer",
    "variant_group": "EN4-weather-answer",
    "level": 3,
    "type": "choice",
    "scene": "朋友問你：How's the weather? 外面熱得大家都在流汗。",
    "stem": "你要怎麼回答？",
    "options": [
      "It's a hat.",
      "It's cold.",
      "It's hot.",
      "Yes, it is."
    ],
    "answer": 2,
    "option_tags": [
      "spelling-confuse",
      "antonym",
      "ok",
      "yesno-to-wh"
    ],
    "option_why": [
      "hat 是帽子，hot 才是熱。",
      "外面很熱，cold 是冷。",
      "",
      "How 開頭的問句，不用 Yes 回答。"
    ],
    "hints": [
      "第1層：外面的天氣是熱還是冷？",
      "第2層：回答天氣要用 It's ＿＿.",
      "第3層：熱是 hot，小心不要看成 hat。"
    ],
    "explanation": "回答天氣用 It's 加天氣的字；很熱就說 It's hot.",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-009",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（句型 It's rainy.；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-answer",
    "variant_group": "EN4-weather-answer",
    "level": 1,
    "type": "choice",
    "scene": "天氣預報的大哥哥說：It's rainy today.",
    "stem": "It's rainy. 這句話是什麼意思？",
    "options": [
      "出太陽了。",
      "風很大。",
      "在下雨。",
      "雲很多。"
    ],
    "answer": 2,
    "option_tags": [
      "weather-sun",
      "weather-wind",
      "ok",
      "weather-cloud"
    ],
    "option_why": [
      "出太陽是 sunny。",
      "風很大是 windy。",
      "",
      "雲很多是 cloudy。"
    ],
    "hints": [
      "第1層：句子裡的天氣字是哪一個？",
      "第2層：是 rainy。",
      "第3層：rainy 和 rain（雨）有關。"
    ],
    "explanation": "It's rainy. 是「在下雨」的意思。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-010",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（字母拼讀 d-、t-；原創題）",
    "curriculum_code": [
      "英語 5-Ⅱ-4",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-phonics-dt",
    "variant_group": "EN4-phonics-initial",
    "level": 2,
    "type": "choice",
    "scene": "阿咕念：duck、duck，鴨子嘎嘎叫。",
    "stem": "下面哪一個字，開頭的音和 duck 一樣？",
    "options": [
      "ten",
      "dig",
      "pig",
      "cat"
    ],
    "answer": 1,
    "option_tags": [
      "d-t-confuse",
      "ok",
      "initial-other",
      "initial-other"
    ],
    "option_why": [
      "ten 開頭是 t，duck 開頭是 d。",
      "",
      "pig 開頭是 p。",
      "cat 開頭是 c。"
    ],
    "hints": [
      "第1層：duck 的第一個字母是什麼？",
      "第2層：是 d。",
      "第3層：找第一個字母也是 d 的字。"
    ],
    "explanation": "duck 和 dig 都是 d 開頭，第一個音一樣。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-011",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（字母拼讀 d-、t-；原創題）",
    "curriculum_code": [
      "英語 5-Ⅱ-4",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-phonics-dt",
    "variant_group": "EN4-phonics-initial",
    "level": 3,
    "type": "choice",
    "scene": "黑板上寫著四個字：ten、dot、dig、duck。",
    "stem": "下面哪一個字是用字母 t 開頭？",
    "options": [
      "duck",
      "dig",
      "dot",
      "ten"
    ],
    "answer": 3,
    "option_tags": [
      "d-t-confuse",
      "d-t-confuse",
      "final-letter-confuse",
      "ok"
    ],
    "option_why": [
      "duck 開頭是 d。",
      "dig 開頭是 d。",
      "dot 的 t 在最後面，開頭是 d。",
      ""
    ],
    "hints": [
      "第1層：只看每個字的第一個字母。",
      "第2層：dot 裡面有 t，但 t 在哪裡？",
      "第3層：第一個字母是 t 的，只有一個字。"
    ],
    "explanation": "ten 用 t 開頭；dot 雖然有 t，但 t 在字尾，開頭是 d。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-012",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字拼寫；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-spelling",
    "variant_group": "EN4-spelling-missing",
    "level": 3,
    "type": "choice",
    "scene": "天氣好冷，阿咕想寫 cold，卻寫成 c _ l d。",
    "stem": "空格要填哪一個字母，才是 cold？",
    "options": [
      "o",
      "e",
      "a",
      "u"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "vowel-confuse",
      "vowel-confuse",
      "vowel-confuse"
    ],
    "option_why": [
      "",
      "celd 不是正確拼法，cold 第二個字母是 o。",
      "cald 不是正確拼法，cold 第二個字母是 o。",
      "culd 不是正確拼法，cold 第二個字母是 o。"
    ],
    "hints": [
      "第1層：慢慢念 cold，聽中間的母音。",
      "第2層：cold 和 hot 裡面有同一個母音字母。",
      "第3層：hot 中間的字母是 o。"
    ],
    "explanation": "cold 的拼法是 c-o-l-d，第二個字母是 o。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-013",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（句型 It's ＿.；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-answer",
    "variant_group": "EN4-weather-answer",
    "level": 2,
    "type": "choice",
    "scene": "秋天傍晚，媽媽說：It's cool today.",
    "stem": "媽媽說今天天氣怎麼樣？",
    "options": [
      "很熱",
      "風很大",
      "涼涼的",
      "在下雨"
    ],
    "answer": 2,
    "option_tags": [
      "cool-hot-confuse",
      "weather-wind",
      "ok",
      "weather-rain"
    ],
    "option_why": [
      "很熱是 hot；cool 是涼涼的。",
      "風很大是 windy。",
      "",
      "下雨是 rainy。"
    ],
    "hints": [
      "第1層：句子裡的天氣字是哪一個？",
      "第2層：是 cool。",
      "第3層：cool 比 cold 暖一點，是涼涼的。"
    ],
    "explanation": "cool 是涼爽、涼涼的；It's cool today. 是「今天很涼爽」。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-014",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-word",
    "variant_group": "EN4-weather-word-meaning",
    "level": 1,
    "type": "choice",
    "scene": "天氣預報看板上寫著：sunny。",
    "stem": "sunny 是什麼意思？",
    "options": [
      "下雨",
      "晴天、出太陽",
      "多雲",
      "風很大"
    ],
    "answer": 1,
    "option_tags": [
      "weather-rain",
      "ok",
      "weather-cloud",
      "weather-wind"
    ],
    "option_why": [
      "下雨是 rainy。",
      "",
      "多雲是 cloudy。",
      "風很大是 windy。"
    ],
    "hints": [
      "第1層：sunny 裡面藏著哪個字？",
      "第2層：sun 是太陽。",
      "第3層：有太陽的天氣是什麼天氣？"
    ],
    "explanation": "sunny 是晴天、出太陽，和 sun（太陽）有關。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-015",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（溫度單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-temp-word",
    "variant_group": "EN4-temp-word-pick",
    "level": 1,
    "type": "choice",
    "scene": "夏天的中午，阿咕熱得一直流汗。",
    "stem": "「很熱」的英文是哪一個字？",
    "options": [
      "cold",
      "cool",
      "warm",
      "hot"
    ],
    "answer": 3,
    "option_tags": [
      "antonym",
      "temp-confuse",
      "degree-understate",
      "ok"
    ],
    "option_why": [
      "cold 是冷，和熱相反。",
      "cool 是涼爽。",
      "warm 是溫暖，沒有熱到流汗。",
      ""
    ],
    "hints": [
      "第1層：熱得流汗，是很熱還是溫暖？",
      "第2層：很熱的字只有三個字母。",
      "第3層：h-o-t。"
    ],
    "explanation": "hot 是很熱；warm 是溫暖，cool 是涼爽，cold 是冷。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-016",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（句型 How's the weather?；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-ask",
    "variant_group": "EN4-weather-ask-reverse",
    "level": 3,
    "type": "choice",
    "scene": "朋友回答你：It's windy.",
    "stem": "你剛剛最可能問了哪一句？",
    "options": [
      "What's this?",
      "How are you?",
      "How's the weather?",
      "What time is it?"
    ],
    "answer": 2,
    "option_tags": [
      "q-object",
      "q-greeting",
      "ok",
      "q-time"
    ],
    "option_why": [
      "What's this? 要回答「這是什麼」。",
      "How are you? 要回答「你好不好」。",
      "",
      "What time is it? 要回答「幾點」。"
    ],
    "hints": [
      "第1層：It's windy. 在說什麼？",
      "第2層：在說天氣。",
      "第3層：哪一句是在問天氣？"
    ],
    "explanation": "It's windy. 是在說天氣，所以前面的問題是 How's the weather?",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-017",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（字母拼讀 d-、t-；原創題）",
    "curriculum_code": [
      "英語 5-Ⅱ-4",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-phonics-dt",
    "variant_group": "EN4-phonics-initial-set",
    "level": 3,
    "type": "choice",
    "scene": "老師請大家找出開頭的音都一樣的一組字。",
    "stem": "下面哪一組字，開頭的音都一樣？",
    "options": [
      "ten, dig, dot",
      "dot, dig, duck",
      "duck, ten, dig",
      "dot, ten, duck"
    ],
    "answer": 1,
    "option_tags": [
      "d-t-confuse",
      "ok",
      "d-t-confuse",
      "d-t-confuse"
    ],
    "option_why": [
      "ten 是 t 開頭，另外兩個是 d。",
      "",
      "ten 是 t 開頭，另外兩個是 d。",
      "ten 是 t 開頭，另外兩個是 d。"
    ],
    "hints": [
      "第1層：只看每個字的第一個字母。",
      "第2層：找三個字都是同一個字母開頭的。",
      "第3層：哪一組裡沒有 ten？"
    ],
    "explanation": "dot、dig、duck 都是 d 開頭，第一個音一樣；ten 是 t 開頭。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-018",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（句型 It's ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-answer",
    "variant_group": "EN4-weather-answer-two",
    "level": 4,
    "type": "choice",
    "scene": "朋友問：How's the weather? 外面在下雨，而且很冷。",
    "stem": "哪一個回答最完整、最正確？",
    "options": [
      "It's sunny and hot.",
      "Yes, it's cold.",
      "It's rainy and cold.",
      "It's windy and warm."
    ],
    "answer": 2,
    "option_tags": [
      "weather-opposite",
      "yesno-to-wh",
      "ok",
      "weather-wrong"
    ],
    "option_why": [
      "外面下雨又很冷，不是晴天很熱。",
      "How 開頭的問句，不用 Yes 回答。",
      "",
      "題目沒有說風大，也不是溫暖。"
    ],
    "hints": [
      "第1層：外面的天氣有哪兩件事？",
      "第2層：在下雨（rainy），而且很冷（cold）。",
      "第3層：用 and 把兩個字連起來。"
    ],
    "explanation": "下雨又很冷，可以說 It's rainy and cold.，用 and 連接兩種天氣。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-019",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字拼寫；原創題）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-spelling",
    "variant_group": "EN4-spelling-choose",
    "level": 4,
    "type": "choice",
    "scene": "阿咕要在天氣日記上寫「多雲」。",
    "stem": "下面哪一個是正確的拼法？",
    "options": [
      "cloudi",
      "clowdy",
      "claudy",
      "cloudy"
    ],
    "answer": 3,
    "option_tags": [
      "suffix-confuse",
      "vowel-confuse",
      "vowel-confuse",
      "ok"
    ],
    "option_why": [
      "字尾是 y，不是 i。",
      "中間是 ou，不是 ow。",
      "中間是 ou，不是 au。",
      ""
    ],
    "hints": [
      "第1層：cloudy 是 cloud 加上 y。",
      "第2層：先想 cloud（雲）怎麼拼。",
      "第3層：c-l-o-u-d，再加 y。"
    ],
    "explanation": "cloudy 是 cloud（雲）加上 y：c-l-o-u-d-y。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  },
  {
    "id": "EN4-1010-020",
    "grade": 4,
    "subject": "英語",
    "publisher": "翰林",
    "term": "四上",
    "unit": "Here We Go 3 Unit 1 How's the Weather?",
    "lesson": "Unit 1 How's the Weather?",
    "node": 1010,
    "source_ref": "翰林 Here We Go 3 Unit 1（天氣單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 3-Ⅱ-2",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4-weather-word",
    "variant_group": "EN4-weather-word-two",
    "level": 4,
    "type": "choice",
    "scene": "阿咕看天氣報告：It's cloudy and windy.",
    "stem": "這句話說的是哪一種天氣？",
    "options": [
      "雲很多，風也很大",
      "出大太陽，沒有風",
      "下大雨，沒有風",
      "雲很多，正在下雨"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "weather-opposite",
      "weather-wrong",
      "cloud-rain-confuse"
    ],
    "option_why": [
      "",
      "cloudy 是雲多，不是出大太陽。",
      "句子沒有 rainy，還說了 windy。",
      "雲多不一定下雨，句子沒有 rainy。"
    ],
    "hints": [
      "第1層：句子裡有哪兩個天氣字？",
      "第2層：cloudy 和 windy。",
      "第3層：cloudy 是雲多，windy 是風大。"
    ],
    "explanation": "cloudy 是雲多，windy 是風大；It's cloudy and windy. 就是雲多又風大。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": ""
  }
];

// ════════════════════════════════════════════════════════════════════
// 來源：成品匣 四年級版規劃/題庫草稿/english_4A_superfun_u01.js（14 題；檔頭說明照原檔，題目以 JSON 寫出）
// ════════════════════════════════════════════════════════════════════
// 四年級版學習 RPG — 英語 四上 何嘉仁 Super Fun 3 Lesson 1（家人）題庫草稿（14 題）
// 撰寫：A1 108 課綱教案設計師｜2026-10-19｜狀態：草稿，reviewed 一律 false，待老師審題
//
// 【為什麼有這個檔】老闆裁示（2026-10-19）「英文都可以，全包也行」：翰林 Here We Go 3 Unit 1 放在 english_4A_u01.js；
//   金山國小實際使用的何嘉仁 Super Fun 3 另收本檔。兩個版本共用 node 1010（英語第 1 單元），用 publisher 欄位區分；
//   id 前綴 EN4SF- 避免和翰林版 EN4- 重複。
//
// 【版本與單元查證（2026-10-19）】
//   【事實】1. 金山國小 115 學年度四年級第一學期英語課程計畫（新北市中小學課程備查網，學校上傳的官方 PDF，設計者張家琳，異動日期 2026/06/25）：
//      https://rrcp.ntpc.edu.tw/api/openfile/open?key=0c4b384f-2ebd-4236-bd00-39e85df348af
//      （查法：https://rrcp.ntpc.edu.tw/Share/Share_BySchool → 115 學年、上學期、七星分區、市立金山國小 →「4年級_英語_Super Fun 3課程計畫(上)」）
//      計畫原文（第二週，Lesson 1）：「Lesson 1《Theme Words》……說出圖片中人物與Emma 之間的關係」；
//      「《Pattern》……教師在黑板上寫出Who’s he/she? 、He’s/She’s my _ .的句子」；延伸活動「說出完整句子 He’s/She’s my _ .」。
//      第一週 Get Ready 是 Phonics Fun 1（b、p）、Phonics Fun 2（d、t），在 Lesson 1 之前，本檔不出拼讀題。
//      第三週起是 Lesson 2（職業，Is he/she a ___?），本檔不出。
//      注意：金山計畫裡另有校訂課程「英閱繪」的家人字（uncle、aunt、cousin、daddy、grandpa……），那是學校自編繪本活動，不是課本 Lesson 1，本檔不用。
//   【事實】2. 金山計畫沒有逐字列出 Lesson 1 的 Theme Words。單字清單取自臺南市成功國小 111 學年度第一學期四年級英語課程計畫（學校官方 PDF，教材何嘉仁 Super Fun 3）：
//      http://course.tn.edu.tw/course/111E%E6%88%90%E5%8A%9F%E5%9C%8B%E5%B0%8FC5-1%E9%A0%98%E5%9F%9F%E5%AD%B8%E7%BF%92%E8%AA%B2%E7%A8%8B(%E8%AA%BF%E6%95%B4)%E8%A8%88%E7%95%AB%E6%99%AE%E9%80%9A%E7%8F%AD%E5%9B%9B%E5%B9%B4%E7%B4%9A%E8%8B%B1%E8%AA%9E0707093538.pdf
//      原文：「Lesson1 範圍 Father、Grandfather、Grandmother、Sister、Brother、Mother」「能聽懂課堂中所學的句型 Who’s he? He’s my father.」
//      口語評量：「能以 Who’s he/she? 詢問他人，並以He’s/She’s____.回應」。
//   【推論】兩份計畫的 Lesson 1 句型一致（Who’s he/she? He’s/She’s my ___.），所以採用 111 計畫列的 6 個家人字；
//      但 111 與 115 學年中間課本可能改版，6 個單字是否完全相同【待查證】（請金山國小英語老師對課本 Lesson 1 Theme Words）。
//   【查不到】Lesson 1 的正式課名（Wordwall 上出版社帳號的練習標題寫「L1 Family」，只是練習名稱，不當正式課名）；本檔 unit 寫「主題：家人；正式課名待查證」。
//
// 【用字】只用 father、mother、grandfather、grandmother、brother、sister 與 who、he、she、my、is、this、what、how、are、you、yes，
//   全部在課綱附錄五「表一、基本 1,200 字」（PDF p.56–59）；檢查程式用 en_basic1200_words.txt 逐字比對。不用課本角色名（Emma 等）。
//   中文對譯：grandfather＝爺爺或外公、grandmother＝奶奶或外婆、brother＝哥哥或弟弟、sister＝姊姊或妹妹。
//
// 【課綱代碼】同 english_4A_u01.js（國教署英語文領綱 107 年 4 月 PDF 逐字核對）：
//   英語 1-Ⅱ-7、1-Ⅱ-10、3-Ⅱ-2、3-Ⅱ-3、Ab-Ⅱ-4、Ac-Ⅱ-3、B-Ⅱ-1。explain_status 依字彙表判斷 → verified。
//
// 【概念清單（7 個）】難度 L1 4、L2 5、L3 3、L4 2
//   EN4SF-family-word     看中文或情境選家人單字        英語 3-Ⅱ-2、1-Ⅱ-7、Ac-Ⅱ-3   001 002
//   EN4SF-family-meaning  看家人單字選中文意思          英語 3-Ⅱ-2、Ac-Ⅱ-3           003 004
//   EN4SF-who-ask         問人是誰 Who's he/she?        英語 3-Ⅱ-3、1-Ⅱ-10、B-Ⅱ-1   005 009
//   EN4SF-my-answer       回答 He's/She's my ___.       英語 3-Ⅱ-3、1-Ⅱ-10、B-Ⅱ-1   006 008 012
//   EN4SF-he-she          he 和 she 的分別              英語 3-Ⅱ-3、1-Ⅱ-10、B-Ⅱ-1   007 011
//   EN4SF-spell           家人單字拼寫                  英語 3-Ⅱ-2、Ab-Ⅱ-4           010 014
//   EN4SF-relation        家人關係推理（爸爸的爸爸）    英語 3-Ⅱ-3、1-Ⅱ-10、B-Ⅱ-1   013
//
// 【待查證】1. 115 學年度課本 Lesson 1 Theme Words 是否就是上列 6 個字。2. Lesson 1 正式課名。
//   3. 本檔只有 14 題（裁示要求至少 12 題）；若之後要讓 Super Fun 版也達「每節點 20 題、6 個概念」，等第 1 點確認後再補。
window.QUESTIONS_G4_EN_SF_U01 = [
  {
    "id": "EN4SF-1010-001",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（家人單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-family-word",
    "variant_group": "EN4SF-word-pick",
    "level": 1,
    "type": "choice",
    "scene": "阿咕指著全家福照片裡的爸爸。",
    "stem": "「爸爸」的英文是哪一個字？",
    "options": [
      "mother",
      "brother",
      "father",
      "sister"
    ],
    "answer": 2,
    "option_tags": [
      "family-mother",
      "family-brother",
      "ok",
      "family-sister"
    ],
    "option_why": [
      "mother 是媽媽。",
      "brother 是哥哥或弟弟。",
      "",
      "sister 是姊姊或妹妹。"
    ],
    "hints": [
      "第1層：爸爸是男生還是女生？",
      "第2層：father 和 mother 是一對。",
      "第3層：爸爸是 father，媽媽是 mother。"
    ],
    "explanation": "father 是爸爸，mother 是媽媽。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-002",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（家人單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 1-Ⅱ-7",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-family-word",
    "variant_group": "EN4SF-word-pick",
    "level": 1,
    "type": "choice",
    "scene": "照片裡，奶奶坐在爺爺旁邊。",
    "stem": "「奶奶」的英文是哪一個字？",
    "options": [
      "grandmother",
      "grandfather",
      "mother",
      "sister"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "gender-swap",
      "generation-confuse",
      "family-sister"
    ],
    "option_why": [
      "",
      "grandfather 是爺爺或外公。",
      "mother 是媽媽，奶奶是媽媽的上一輩。",
      "sister 是姊姊或妹妹。"
    ],
    "hints": [
      "第1層：奶奶是爸爸的媽媽。",
      "第2層：「媽媽」是 mother，奶奶的字比它長。",
      "第3層：奶奶是 grandmother。"
    ],
    "explanation": "grandmother 是奶奶或外婆；grandfather 是爺爺或外公。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-003",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（家人單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-family-meaning",
    "variant_group": "EN4SF-word-meaning",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在單字卡上看到：sister。",
    "stem": "sister 是什麼意思？",
    "options": [
      "哥哥或弟弟",
      "媽媽",
      "奶奶",
      "姊姊或妹妹"
    ],
    "answer": 3,
    "option_tags": [
      "gender-swap",
      "family-mother",
      "family-grandmother",
      "ok"
    ],
    "option_why": [
      "哥哥或弟弟是 brother。",
      "媽媽是 mother。",
      "奶奶是 grandmother。",
      ""
    ],
    "hints": [
      "第1層：sister 是男生還是女生？",
      "第2層：是和你同一輩的女生。",
      "第3層：sister 是姊姊或妹妹。"
    ],
    "explanation": "sister 是姊姊或妹妹；brother 是哥哥或弟弟。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-004",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（家人單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-family-meaning",
    "variant_group": "EN4SF-word-meaning",
    "level": 1,
    "type": "choice",
    "scene": "阿咕在單字卡上看到：brother。",
    "stem": "brother 是什麼意思？",
    "options": [
      "爸爸",
      "哥哥或弟弟",
      "爺爺",
      "姊姊或妹妹"
    ],
    "answer": 1,
    "option_tags": [
      "family-father",
      "ok",
      "family-grandfather",
      "gender-swap"
    ],
    "option_why": [
      "爸爸是 father。",
      "",
      "爺爺是 grandfather。",
      "姊姊或妹妹是 sister。"
    ],
    "hints": [
      "第1層：brother 是男生還是女生？",
      "第2層：是和你同一輩的男生。",
      "第3層：brother 是哥哥或弟弟。"
    ],
    "explanation": "brother 是哥哥或弟弟；英文不分年紀大小。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 10,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-005",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-who-ask",
    "variant_group": "EN4SF-who-ask",
    "level": 2,
    "type": "choice",
    "scene": "照片裡有一位你不認識的女生。",
    "stem": "想問她是誰，英文要怎麼說？",
    "options": [
      "Who's he?",
      "Who's she?",
      "What's this?",
      "How are you?"
    ],
    "answer": 1,
    "option_tags": [
      "he-she-swap",
      "ok",
      "q-object",
      "q-greeting"
    ],
    "option_why": [
      "he 是說男生，問女生要用 she。",
      "",
      "What's this? 是問「這是什麼」。",
      "How are you? 是問「你好嗎」。"
    ],
    "hints": [
      "第1層：問「誰」用 Who。",
      "第2層：照片裡是女生。",
      "第3層：女生用 she：Who's she?"
    ],
    "explanation": "問女生是誰說 Who's she?；問男生是誰說 Who's he?",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-006",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-my-answer",
    "variant_group": "EN4SF-my-answer",
    "level": 2,
    "type": "choice",
    "scene": "朋友指著照片問：Who's he? 照片裡是你的爺爺。",
    "stem": "你要怎麼回答？",
    "options": [
      "She's my grandfather.",
      "He's my grandmother.",
      "He's my grandfather.",
      "Yes, he is."
    ],
    "answer": 2,
    "option_tags": [
      "he-she-swap",
      "gender-swap",
      "ok",
      "yesno-to-wh"
    ],
    "option_why": [
      "爺爺是男生，要用 He's。",
      "grandmother 是奶奶，照片裡是爺爺。",
      "",
      "Who 開頭的問句，不用 Yes 回答。"
    ],
    "hints": [
      "第1層：爺爺是男生，用 He's 還是 She's？",
      "第2層：爺爺的英文是 grandfather。",
      "第3層：He's my grandfather."
    ],
    "explanation": "回答 Who's he? 要說 He's my ___.；爺爺是 grandfather。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-007",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-he-she",
    "variant_group": "EN4SF-he-she",
    "level": 2,
    "type": "choice",
    "scene": "老師說：說女生用 she，說男生用 he。",
    "stem": "下面哪一個人，要用 she 來說？",
    "options": [
      "my father",
      "my brother",
      "my grandfather",
      "my mother"
    ],
    "answer": 3,
    "option_tags": [
      "he-she-swap",
      "he-she-swap",
      "he-she-swap",
      "ok"
    ],
    "option_why": [
      "father 是男生，要用 he。",
      "brother 是男生，要用 he。",
      "grandfather 是男生，要用 he。",
      ""
    ],
    "hints": [
      "第1層：she 是說女生。",
      "第2層：四個人裡，誰是女生？",
      "第3層：媽媽是女生：She's my mother."
    ],
    "explanation": "說女生用 she，例如 my mother；說男生用 he，例如 my father。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-008",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 Ac-Ⅱ-3"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-my-answer",
    "variant_group": "EN4SF-my-answer-meaning",
    "level": 2,
    "type": "choice",
    "scene": "阿咕介紹照片：She's my mother.",
    "stem": "這句話是什麼意思？",
    "options": [
      "他是我的爸爸。",
      "她是我的媽媽。",
      "她是我的姊姊。",
      "他是我的哥哥。"
    ],
    "answer": 1,
    "option_tags": [
      "he-she-swap",
      "ok",
      "family-sister",
      "he-she-swap"
    ],
    "option_why": [
      "She 是她，mother 是媽媽。",
      "",
      "sister 才是姊姊；mother 是媽媽。",
      "He 才是他；這句是 She。"
    ],
    "hints": [
      "第1層：She 是「他」還是「她」？",
      "第2層：mother 是誰？",
      "第3層：She's my mother. 她是我的媽媽。"
    ],
    "explanation": "She's my mother. 是「她是我的媽媽」；She's 是 She is 的縮寫。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-009",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-who-ask",
    "variant_group": "EN4SF-who-ask",
    "level": 2,
    "type": "choice",
    "scene": "你想知道照片裡那位男生是誰。",
    "stem": "要用哪一句來問？",
    "options": [
      "Who's he?",
      "What's this?",
      "Who's she?",
      "How are you?"
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "q-object",
      "he-she-swap",
      "q-greeting"
    ],
    "option_why": [
      "",
      "What's this? 是問「這是什麼」。",
      "問男生要用 he，不是 she。",
      "How are you? 是問「你好嗎」。"
    ],
    "hints": [
      "第1層：問「誰」用哪個字開頭？",
      "第2層：用 Who 開頭。",
      "第3層：男生用 he：Who's he?"
    ],
    "explanation": "問男生是誰用 Who's he?，問女生是誰用 Who's she?",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 20,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-010",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（家人單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-spell",
    "variant_group": "EN4SF-spell-missing",
    "level": 3,
    "type": "choice",
    "scene": "阿咕在卡片上寫「媽媽」，寫成 m _ t h e r。",
    "stem": "空格要填哪一個字母，才是 mother？",
    "options": [
      "a",
      "u",
      "e",
      "o"
    ],
    "answer": 3,
    "option_tags": [
      "vowel-confuse",
      "vowel-confuse",
      "vowel-confuse",
      "ok"
    ],
    "option_why": [
      "mather 不是正確拼法，要填 o。",
      "muther 不是正確拼法，要填 o。",
      "mether 不是正確拼法，要填 o。",
      ""
    ],
    "hints": [
      "第1層：mother 和 brother 的拼法很像。",
      "第2層：brother 是 b-r-o-t-h-e-r。",
      "第3層：mother 第二個字母也是 o。"
    ],
    "explanation": "mother 的拼法是 m-o-t-h-e-r；brother 也有 o-t-h-e-r。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-011",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-he-she",
    "variant_group": "EN4SF-he-she-infer",
    "level": 3,
    "type": "choice",
    "scene": "朋友指著照片問：Who's she?",
    "stem": "照片裡最可能是誰？",
    "options": [
      "我的哥哥",
      "我的姊姊",
      "我的爸爸",
      "我的爺爺"
    ],
    "answer": 1,
    "option_tags": [
      "he-she-swap",
      "ok",
      "he-she-swap",
      "he-she-swap"
    ],
    "option_why": [
      "哥哥是男生，要問 Who's he?",
      "",
      "爸爸是男生，要問 Who's he?",
      "爺爺是男生，要問 Who's he?"
    ],
    "hints": [
      "第1層：朋友用的是 he 還是 she？",
      "第2層：she 是說女生。",
      "第3層：四個人裡只有一位是女生。"
    ],
    "explanation": "Who's she? 是問女生，所以照片裡是女生，例如姊姊。",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-012",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-my-answer",
    "variant_group": "EN4SF-my-answer",
    "level": 3,
    "type": "choice",
    "scene": "朋友問：Who's she? 照片裡是你的外婆。",
    "stem": "你要怎麼回答？",
    "options": [
      "She's my grandmother.",
      "He's my grandmother.",
      "She's my grandfather.",
      "She's my mother."
    ],
    "answer": 0,
    "option_tags": [
      "ok",
      "he-she-swap",
      "gender-swap",
      "generation-confuse"
    ],
    "option_why": [
      "",
      "外婆是女生，要用 She's。",
      "grandfather 是外公或爺爺。",
      "mother 是媽媽，不是外婆。"
    ],
    "hints": [
      "第1層：外婆是女生，用 She's。",
      "第2層：外婆的英文是 grandmother。",
      "第3層：She's my grandmother."
    ],
    "explanation": "外婆、奶奶都是 grandmother；回答 Who's she? 要說 She's my ___.",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 35,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-013",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（句型 Who's he/she? He's/She's my ___.；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-3",
      "英語 1-Ⅱ-10",
      "英語 B-Ⅱ-1"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-relation",
    "variant_group": "EN4SF-relation",
    "level": 4,
    "type": "choice",
    "scene": "照片裡有爸爸，和爸爸的爸爸。朋友指著「爸爸的爸爸」問：Who's he?",
    "stem": "你要怎麼回答？",
    "options": [
      "He's my father.",
      "She's my grandmother.",
      "He's my brother.",
      "He's my grandfather."
    ],
    "answer": 3,
    "option_tags": [
      "generation-confuse",
      "he-she-swap",
      "generation-confuse",
      "ok"
    ],
    "option_why": [
      "他是爸爸的爸爸，不是爸爸。",
      "他是男生，而且是爺爺。",
      "哥哥弟弟和你同一輩，不是他。",
      ""
    ],
    "hints": [
      "第1層：爸爸的爸爸，中文叫什麼？",
      "第2層：是爺爺。",
      "第3層：爺爺是 grandfather，男生用 He's。"
    ],
    "explanation": "爸爸的爸爸是爺爺，英文是 grandfather，所以說 He's my grandfather.",
    "read_aloud": "full",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  },
  {
    "id": "EN4SF-1010-014",
    "grade": 4,
    "subject": "英語",
    "publisher": "何嘉仁",
    "term": "四上",
    "unit": "Super Fun 3 Lesson 1（主題：家人；正式課名待查證）",
    "lesson": "Lesson 1（家人）",
    "node": 1010,
    "source_ref": "何嘉仁 Super Fun 3 Lesson 1（家人單字；情境原創，非課本對話）",
    "curriculum_code": [
      "英語 3-Ⅱ-2",
      "英語 Ab-Ⅱ-4"
    ],
    "explain_status": "verified",
    "beyond_curriculum": false,
    "concept": "EN4SF-spell",
    "variant_group": "EN4SF-spell-choose",
    "level": 4,
    "type": "choice",
    "scene": "阿咕要在家人卡片上寫「姊姊」。",
    "stem": "下面哪一個是正確的拼法？",
    "options": [
      "sistar",
      "sester",
      "sister",
      "cister"
    ],
    "answer": 2,
    "option_tags": [
      "suffix-confuse",
      "vowel-confuse",
      "ok",
      "initial-confuse"
    ],
    "option_why": [
      "字尾是 er，不是 ar。",
      "第二個字母是 i，不是 e。",
      "",
      "第一個字母是 s，不是 c。"
    ],
    "hints": [
      "第1層：sister 第一個字母是 s。",
      "第2層：s-i-s，再接 t。",
      "第3層：最後是 er：s-i-s-t-e-r。"
    ],
    "explanation": "sister 的拼法是 s-i-s-t-e-r；最後兩個字母 e-r 和 brother 一樣。",
    "read_aloud": "stem_only",
    "uses_math": [],
    "exp": 50,
    "tts_lang": "en-US",
    "reviewed": false,
    "reviewer": "",
    "reviewed_at": "",
    "alt_publisher": true
  }
];

// ── 合併成遊戲讀的 window.QUESTIONS（順序：數學、自然、社會、國語、英語翰林、英語何嘉仁）──
window.QUESTIONS = [].concat(
  window.QUESTIONS_G4_MATH_U01 || [], window.QUESTIONS_G4_SCI_U01 || [], window.QUESTIONS_G4_SOC_U01 || [],
  window.QUESTIONS_G4_CH_L01_03 || [], window.QUESTIONS_G4_EN_U01 || [], window.QUESTIONS_G4_EN_SF_U01 || []
);
