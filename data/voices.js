/*
 * 勇者大冒險II — 角色聲音設定（格式沿用三年級版 voices.js）
 *
 * 用途：給朗讀（Web Speech API）與音效用。前端讀 pitch／rate 設定 SpeechSynthesisUtterance，依 gender／age 挑選系統語音。
 * 第一批骨架：三年級版的角色聲音與台語設定全部拿掉，先放 T01 的角色（GDD 2.2）。外觀年齡照美術清單（GDD 6.3）推定，美術交件後再核對。
 * 台語：老闆裁示四年級版有台語。第三批接上劇本：志工阿伯、小攤阿伯、公園阿公、方爺爺（打招呼、閒聊）、管理員阿伯講台語（taigi:true）；
 *   預錄音檔還沒做，朗讀時先播提示音再用華語念（engine/voice.js）。
 *
 * 數值範圍（validate_world.js 會檢查）：pitch 0.5–1.8、rate 0.6–1.3；小孩 pitch ≥ 1.25；長者 rate ≤ 0.95；
 *   成年男 pitch ≤ 1.05；成年女 pitch ≥ 0.7；同性別、同年齡的角色，pitch 或 rate 至少差 0.05。
 * monsters：family（聲音類型，sfx.js）、size（s／m／l／boss）、mood（個性）、pitch_shift（半音 −12～+12）、cry（叫聲）。
 *   老闆裁示第 13 點：野外怪物與頭目一律兇狠，所以 mood 用「生氣」「暴躁」。
 */
window.VOICES = {
  speakers: {
    // ── T01 博覽會會場（第三批：NPC id 照劇本 dialogs_taipei.js；innkeeper→inn、shopkeeper→shop；暫定賢者老館長拿掉）──
    desk:       { name: "小雯姊姊",     gender: "f", age: "adult", stage: "青年", look: "npc_desk",       pitch: 1.18, rate: 1.02, taigi: false, persona: "親切、說話清楚，像在帶小朋友參觀。" },
    director:   { name: "陳館長",       gender: "m", age: "adult", stage: "中年", look: "npc_director",   pitch: 0.84, rate: 0.98, taigi: false, persona: "緊張但溫柔，著急時說話會變快。" },
    classmate:  { name: "阿哲",         gender: "m", age: "child", stage: "小孩", look: "npc_classmate",  pitch: 1.36, rate: 1.10, taigi: false, persona: "活潑、愛笑，講話很有精神。" },
    mrt_staff:  { name: "站務員",       gender: "m", age: "adult", stage: "青年", look: "npc_mrt_staff",  pitch: 0.95, rate: 0.96, taigi: false, persona: "圓山站的站務員：有禮貌、講規矩，說話一句一句很清楚。" },
    inn:        { name: "休息站阿姨",   gender: "f", age: "adult", stage: "中年", look: "npc_inn",        pitch: 0.98, rate: 0.92, taigi: false, persona: "溫暖、慢慢說，讓人想坐下來休息。" },
    shop:       { name: "紀念品店店員", gender: "f", age: "adult", stage: "青年", look: "npc_shop",       pitch: 1.24, rate: 1.08, taigi: false, persona: "開朗愛招呼客人。" },
    // ── T02 北投溫泉街 ──
    mrt_staff2: { name: "站務員",       gender: "m", age: "adult", stage: "青年", look: "npc_mrt_staff",  pitch: 0.98, rate: 0.90, taigi: false, persona: "新北投站的站務員：有禮貌，會請小小導覽員幫外國旅客。" },
    traveler:   { name: "外國旅客",     gender: "m", age: "adult", stage: "青年", look: "npc_traveler",   pitch: 1.04, rate: 0.84, taigi: false, persona: "背包客，說簡單的英文，慢慢講。" },
    volunteer:  { name: "志工阿伯",     gender: "m", age: "elder", stage: "老年", look: "npc_volunteer",  pitch: 0.82, rate: 0.88, taigi: true,  persona: "溫泉博物館志工，熱情、愛講古，講台語。" },
    guide:      { name: "宇翔哥哥",     gender: "m", age: "adult", stage: "青年", look: "npc_guide",      pitch: 1.02, rate: 1.06, taigi: false, persona: "凱達格蘭族的大學生，週末當文化館導覽員，喜歡拍老房子。" },
    stall:      { name: "小攤阿伯",     gender: "m", age: "adult", stage: "中年", look: "npc_stall",      pitch: 0.90, rate: 1.04, taigi: true,  persona: "溫泉街小攤，爽朗叫賣，講台語。" },
    grandpa:    { name: "公園阿公",     gender: "m", age: "elder", stage: "老年", look: "npc_grandpa",    pitch: 0.76, rate: 0.84, taigi: true,  persona: "每天早上到北投公園散步，慢慢說、常說「哎喲」，講台語。" },
    sage:       { name: "方爺爺",       gender: "m", age: "elder", stage: "老年", look: "npc_sage",       pitch: 0.88, rate: 0.80, taigi: true,  persona: "北投的地圖賢者，退休的地圖繪製者；打招呼講台語，教學講華語，說話慢。" },
    // 2026-10-19 溪東岸地標（千禧湯、梅庭）：沿用現有 NPC 圖，只說華語
    bath_staff: { name: "浴池管理員伯伯", gender: "m", age: "elder", stage: "老年", look: "npc_volunteer", pitch: 0.94, rate: 0.90, taigi: false, persona: "千禧湯入口的管理員，和氣、仔細提醒泡湯安全。" },
    meiting_guide: { name: "梅庭導覽志工", gender: "m", age: "adult", stage: "青年", look: "npc_guide",   pitch: 1.00, rate: 1.12, taigi: false, persona: "梅庭的導覽志工，喜歡老房子和書法，說話清楚有精神。" },
    // ── T03 地熱谷步道 ──
    ranger:     { name: "管理員阿伯",   gender: "m", age: "adult", stage: "中年", look: "npc_ranger",     pitch: 0.88, rate: 0.92, taigi: true,  persona: "地熱谷管理員，認真、安全第一，講台語。" },
    // ── 全區 ──
    kaito:      { name: "怪盜夜光鷗",   gender: "m", age: "child", stage: "小孩", look: "npc_kaito",      pitch: 1.28, rate: 1.16, taigi: false, persona: "五年級的男孩，故意裝神秘，其實很愛笑。" },
    agu:        { name: "阿咕",         gender: "m", age: "child", stage: "小孩", look: "pet_agu",        pitch: 1.58, rate: 1.10, taigi: false, persona: "博覽會吉祥物偵探，元氣十足，說話前常「咕！」一聲。" },
    // ── 旁白 ──
    narrator:   { name: "旁白",         gender: "f", age: "adult", stage: "中年", look: null,             pitch: 0.92, rate: 0.95, taigi: false, persona: "平穩溫和的說書人。" },
    // ── BQ2 v0.6 台北章（整合5：性別年齡照 ch01 介面_NPC與委託清單、01_劇本人物表；劇本沒寫性別的照名字與台詞推定，列在整合5_變更說明待決）──
    c01_family: { name: "{family}", gender: "f", age: "adult", stage: "中年", look: null, pitch: 1.00, rate: 0.98, taigi: false, persona: "主角的家人，出門前叮嚀；聲音跟著開場選的稱呼（媽媽、阿嬤＝女聲，爸爸、阿公＝男聲，家人＝中性）。",
      // 整合5：依 player.family（對話框顯示的稱呼）換聲音；engine/voice.js profileFor 用 ctx.name 挑 variants（沒選過＝「家人」中性）
      variants: {
        "媽媽": { gender: "f", age: "adult", pitch: 1.06, rate: 0.98 },
        "爸爸": { gender: "m", age: "adult", pitch: 0.86, rate: 0.96 },
        "阿嬤": { gender: "f", age: "elder", pitch: 0.90, rate: 0.84 },
        "阿公": { gender: "m", age: "elder", pitch: 0.80, rate: 0.82 },
        "家人": { gender: "n", age: "adult", pitch: 1.00, rate: 0.96 }
      } },
    c01_teacher: { name: "林老師", gender: "f", age: "adult", stage: "青年", look: "npc_desk", pitch: 1.10, rate: 0.96, taigi: false, persona: "班導師，帶校外教學，溫和但說話有份量。" },
    c01_appraiser: { name: "古董鑑定師", gender: "m", age: "adult", stage: "中年", look: "npc_traveler", pitch: 0.98, rate: 0.84, taigi: false, persona: "怪盜假扮的古董鑑定師，故意壓低聲音、慢條斯理，裝成大人。" },
    c01_npm_volunteer: { name: "展場志工姊姊", gender: "f", age: "adult", stage: "青年", look: "npc_desk", pitch: 1.28, rate: 1.02, taigi: false, persona: "故宮展場志工姊姊，細心、記性很好。" },
    c01_tam_guide: { name: "解說員姊姊", gender: "f", age: "adult", stage: "青年", look: "npc_shop", pitch: 1.16, rate: 1.12, taigi: false, persona: "天文館解說員姊姊，講星星時眼睛發亮，說話輕快。" },
    c01_leader: { name: "小芸", gender: "f", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.46, rate: 1.08, taigi: false, persona: "班長小芸，認真負責，容易緊張。" },
    c01_guild: { name: "公會導師", gender: "m", age: "adult", stage: "中年", look: "npc_desk", pitch: 0.82, rate: 0.90, taigi: false, persona: "冒險者公會攤位的導師，沉穩、像教練。" },
    c01_star_kid: { name: "小星", gender: "m", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.44, rate: 1.16, taigi: false, persona: "來天文館玩的小朋友小星，愛問為什麼。" },
    c01_smith: { name: "武器防具店老闆", gender: "m", age: "adult", stage: "中年", look: "npc_desk", pitch: 0.80, rate: 1.04, taigi: false, persona: "武器防具店老闆，嗓門大、爽快。" },
    c01_mob_t04a: { name: "阿凱", gender: "m", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.30, rate: 1.22, taigi: false, persona: "別班的學生阿凱，好勝又熱心。" },
    c01_mob_t04b: { name: "單車大哥", gender: "m", age: "adult", stage: "青年", look: "npc_desk", pitch: 1.00, rate: 1.18, taigi: false, persona: "騎單車的大哥，陽光、說話快。" },
    c01_mob_t04c: { name: "林阿嬤", gender: "f", age: "elder", stage: "老年", look: "npc_desk", pitch: 0.84, rate: 0.82, taigi: false, persona: "林阿嬤，慢慢說、很慈祥。" },
    c01_mob_t04d: { name: "畫畫姊姊", gender: "f", age: "adult", stage: "青年", look: "npc_desk", pitch: 1.22, rate: 0.96, taigi: false, persona: "在廣場畫畫的姊姊，說話輕柔。" },
    c01_herb_aunt: { name: "青草阿姨", gender: "f", age: "adult", stage: "中年", look: "npc_desk", pitch: 0.94, rate: 1.02, taigi: false, persona: "青草巷的青草阿姨，熱心、會叮嚀。" },
    c01_snack: { name: "名產攤阿姨", gender: "f", age: "adult", stage: "中年", look: "npc_stall", pitch: 1.04, rate: 1.10, taigi: false, persona: "名產攤阿姨，大聲招呼客人。" },
    c01_mob_t05_mrt: { name: "站務員", gender: "m", age: "adult", stage: "青年", look: "npc_mrt_staff", pitch: 0.96, rate: 1.02, taigi: false, persona: "龍山寺站的站務員，有禮貌、口齒清楚。" },
    c01_mob_t05a: { name: "小晴", gender: "f", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.52, rate: 1.02, taigi: false, persona: "來剝皮寮看展的小晴，觀察很仔細。" },
    c01_mob_t05b: { name: "散步阿伯", gender: "m", age: "elder", stage: "老年", look: "npc_grandpa", pitch: 0.82, rate: 0.78, taigi: false, persona: "散步的阿伯，說話慢吞吞。" },
    c01_mob_t05c: { name: "送貨大哥", gender: "m", age: "adult", stage: "青年", look: "npc_desk", pitch: 0.94, rate: 1.20, taigi: false, persona: "送貨大哥，趕時間、講話很快。" },
    c01_mob_t05d: { name: "吳老師", gender: "m", age: "adult", stage: "中年", look: "npc_desk", pitch: 0.90, rate: 0.84, taigi: false, persona: "帶學生來寫生的吳老師，溫和、慢慢說。" },
    c01_patrol: { name: "巡守隊阿伯", gender: "m", age: "elder", stage: "老年", look: "npc_ranger", pitch: 0.88, rate: 0.90, taigi: false, persona: "巡守隊阿伯，認真守著坑道口，說話中氣十足。" },
    c01_runner: { name: "慢跑姊姊", gender: "f", age: "adult", stage: "青年", look: "npc_desk", pitch: 1.20, rate: 1.18, taigi: false, persona: "在河濱慢跑的姊姊，說話有點喘、很有精神。" },
    c01_old_kid: { name: "阿明", gender: "m", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.38, rate: 1.04, taigi: false, persona: "日治時期大稻埕的小孩阿明，好奇未來的事。" },
    c01_ddc_inn: { name: "旅社老闆娘", gender: "f", age: "adult", stage: "中年", look: "npc_grandpa", pitch: 0.86, rate: 0.94, taigi: false, persona: "大稻埕旅社的老闆娘，親切、說話穩重。" },
    c01_mob_t07a: { name: "撿茶阿姨", gender: "f", age: "adult", stage: "中年", look: "npc_grandpa", pitch: 0.98, rate: 0.86, taigi: false, persona: "撿茶阿姨，手不停、說話慢慢的。" },
    c01_mob_t07b: { name: "茶行掌櫃", gender: "m", age: "adult", stage: "中年", look: "npc_grandpa", pitch: 0.78, rate: 0.96, taigi: false, persona: "茶行掌櫃，精明、說話有條理。" },
    c01_mob_t07c: { name: "糕餅小販", gender: "f", age: "adult", stage: "青年", look: "npc_grandpa", pitch: 1.26, rate: 1.14, taigi: false, persona: "賣糕餅的小販，甜甜地招呼小客人。" },
    c01_mob_t07d: { name: "布車大哥", gender: "m", age: "adult", stage: "青年", look: "npc_grandpa", pitch: 1.00, rate: 0.96, taigi: false, persona: "推布車的大哥，憨厚。" },
    c01_mob_t07e: { name: "學徒阿文", gender: "m", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.26, rate: 0.96, taigi: false, persona: "店裡的學徒阿文，說話規矩、有點害羞。" },
    c01_mob_t07f: { name: "阿春", gender: "f", age: "child", stage: "小孩", look: "npc_classmate", pitch: 1.60, rate: 1.14, taigi: false, persona: "跳格子的小孩阿春，活潑愛玩。" },
    c01_boatman: { name: "船伕阿伯", gender: "m", age: "elder", stage: "老年", look: "npc_grandpa", pitch: 0.76, rate: 0.90, taigi: true, persona: "碼頭的船伕阿伯，見過大風大浪，講台語。" },
    c01_porter: { name: "搬貨大哥", gender: "m", age: "adult", stage: "青年", look: "npc_grandpa", pitch: 0.88, rate: 1.10, taigi: false, persona: "碼頭搬貨大哥，力氣大、說話直爽。" },
    c01_mob_t08a: { name: "撿茶姊姊", gender: "f", age: "adult", stage: "青年", look: "npc_grandpa", pitch: 1.12, rate: 1.02, taigi: false, persona: "撿茶姊姊，輕聲細語。" },
    c01_bpl_uncle: { name: "老碗阿伯", gender: "m", age: "elder", stage: "老年", look: "npc_volunteer", pitch: 0.94, rate: 0.84, taigi: true, persona: "剝皮寮老店的老碗阿伯，愛講古，講台語。" },
    c01_cloth_aunt: { name: "布攤阿姨", gender: "f", age: "adult", stage: "中年", look: "npc_inn", pitch: 0.88, rate: 1.00, taigi: true, persona: "永樂市場布攤阿姨，眼尖、記得每位客人，講台語。" },
    c01_grocer: { name: "南北貨老闆", gender: "m", age: "adult", stage: "中年", look: "npc_grandpa", pitch: 0.82, rate: 0.84, taigi: false, persona: "永樂市場南北貨老闆，實在、說話慢條斯理。" },
    bengbeng: { name: "蹦蹦號", gender: "m", age: "adult", stage: "中年", look: "boss_b01_bengbeng", pitch: 0.60, rate: 0.88, taigi: false, persona: "發條螽斯蹦蹦號，只會發出「蹦！嘰嘰！」的機器聲。" },
    // ── 會說話的頭目 ──
    dudu:       { name: "嘟嘟號",       gender: "m", age: "adult", stage: "中年", look: "boss_dudu",      pitch: 0.55, rate: 0.80, taigi: false, persona: "壺嘴噴氣，只會發出「嘟嘟」聲。" }
  },
  // 主角男女（目前沒有台詞，預留）
  player: {
    f: { name: "主角（女生）", gender: "f", age: "child", pitch: 1.42, rate: 1.00, taigi: false, persona: "勇敢、好奇，說話清楚有精神。" },
    m: { name: "主角（男生）", gender: "m", age: "child", pitch: 1.30, rate: 1.00, taigi: false, persona: "勇敢、好奇，說話清楚有精神。" }
  },

  // 跟著主角的夥伴（引擎用 who:"pet"）：阿咕
  pet: { name: "阿咕", gender: "m", age: "child", pitch: 1.58, rate: 1.10, taigi: false, persona: "博覽會吉祥物偵探，元氣十足，說話前常「咕！」一聲。" },

  monsters: {
    strap:    { family: "armor",  size: "s",    mood: "暴躁", pitch_shift: 6,   cry: "鏘鏘！晃——！" },
    compass:  { family: "spirit", size: "s",    mood: "生氣", pitch_shift: 8,   cry: "嗡嗡嗡——轉！" },
    bookworm: { family: "slime",  size: "s",    mood: "暴躁", pitch_shift: 3,   cry: "嘶嘶……沙沙！" },
    sparrow:  { family: "bird",   size: "s",    mood: "生氣", pitch_shift: 9,   cry: "啾！啾啾！" },
    steam:    { family: "spirit", size: "m",    mood: "暴躁", pitch_shift: -2,  cry: "噗——噗——！" },
    dudu:     { family: "armor",  size: "boss", mood: "生氣", pitch_shift: -9,  cry: "嘟嘟——！嘶——！" },
    // 整合5：台北章新怪物（03_數值 第 2 節；發條機關＝armor、怪盜變裝＝goblin）
    clockbug:      { family: "armor",  size: "s",    mood: "暴躁", pitch_shift: 7,  cry: "喀喀喀——吱！" },
    e_minecart:    { family: "armor",  size: "l",    mood: "暴躁", pitch_shift: -6, cry: "轟隆——轟隆隆！" },
    b01_appraiser: { family: "goblin", size: "boss", mood: "神祕", pitch_shift: -2, cry: "呵呵……讓我鑑定一下！" },
    b01_bengbeng:  { family: "armor",  size: "boss", mood: "生氣", pitch_shift: -7, cry: "蹦！嘰嘰嘰——！" }
  }
};
