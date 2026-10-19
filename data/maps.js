/*
 * 勇者大冒險II（怪盜與家鄉的印章）— 地圖資料（由 tools/build_g4_maps.js 產生；改配置請改那支工具再重新產生）
 * 第三批（2026-10-19）：GDD 1.3 的正式格子配置——T01 博覽會會場（64×40）、T02 北投溫泉街（72×48）、T03 地熱谷步道（56×40）。
 * 背景圖之後由 GPT 照 art_note 與格子圖預覽畫（成品匣 四年級版規劃/美術成品/maps/）；還沒交件時引擎用格子畫備援圖塊。
 * 地圖一律上北下南、左西右東；座標 x＝欄、y＝列（0 起算）。真實相對位置大致正確（北投公園、溫泉博物館、圖書館、凱達格蘭文化館、地熱谷都沿北投溪）。
 *
 * 字元圖例（tilesets.js）：
 *   '.' 地面   ',' 花草   '=' 步道／路面   'B' 橋（以上可走）
 *   'T' 樹     '~' 水     'H' 牆     'R' 屋頂     'D' 門（不能站，在門前一格互動）   'F' 柵欄／欄杆   '*' 岩石／灌木   'K' 櫃檯、展示櫃、燈柱（以上擋路）
 *
 * 第三批新增欄位（game.js、MapScene.js；validate_world.js、check_reachability.js 都認得）：
 *   exits[].teleport  暫時傳送點（T01↔T02 捷運；GDD 7.3 C8 捷運系統下一批做）：可以在地圖中間，不必在邊緣
 *   exits[].mrt       搭捷運的出口（播 D_MRT_FIRST／D_MRT／D_MRT_BACK 等台詞）
 *   exits[].requires  走這個出口前要完成的委託；沒完成時播 locked_dialog、主角退回一格
 *   npcs[].mrt        和這位站務員說話也能搭車（{ to, tx, ty }）
 *   npcs[].dialog_done { quest, dialog }：這個委託完成後平常的台詞換成 dialog（結局後的閒聊）
 *   gates[]           柵門：{ x, y, quest, dialog }——委託完成前這格擋路，靠近按 A 播 dialog（連通測試把柵門當成打開）
 *   notes[]           告示牌、知識卡：{ x, y, dialog, label }——擋路，按 A 播 dialog
 *   safe[]            這些點周圍 5 格不出怪（傳送點落點；MapInfo.safePoints）
 *   arrive_dialogs    第一次來這張地圖時依序播的台詞（到北投、到地熱谷、新單元開放）
 */
window.MAPS = {

  // ───────────────────────────── T01 博覽會會場（64×40）─────────────────────────────
  T01: {
    name: "博覽會會場", type: "town", level: 1, bgm: "town", battle_bg: "expo_lawn", tileset: "field",
    real_ref: "臺北市花博公園圓山園區、捷運圓山站 1 號出口一帶（故事中的「全臺家鄉博覽會」是虛構的）",
    art_note: "花博公園風格的博覽會會場（3072×1920，上北下南）。北邊一排 4 座各縣市展板帳篷（門朝南）；中央南北大道與東西大道交會；中央廣場北側西邊是服務台櫃檯、東邊是印章展示櫃（玻璃櫃，空的）；出生點北邊是「我們班的展板」；西側是捷運圓山站入口（通用列車圖示，不畫真實標誌），門前是暫時的傳送光圈（之後換成捷運系統）；西南是休息站，東南是紀念品店；南邊中間是矮柵欄圍起來的練習草地（北邊中間有入口）；東南角小池塘與小木橋；大道兩旁行道樹、燈柱。",
    grid: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TT............................====............................TT",
      "TT....RRRRRRRRR...RRRRRRRRR...====...RRRRRRRRR...RRRRRRRRR....TT",
      "TT....RRRRRRRRR...RRRRRRRRR...====...RRRRRRRRR...RRRRRRRRR....TT",
      "TT....HHHHHHHHH...HHHHHHHHH...====...HHHHHHHHH...HHHHHHHHH....TT",
      "TT....HHHHDHHHH...HHHHDHHHH...====...HHHHDHHHH...HHHHDHHHH....TT",
      "TT............................====............................TT",
      "TT....,,,,,,,,,...,,,,,,,,,...====...,,,,,,,,,...,,,,,,,,,....TT",
      "TT............................====............................TT",
      "TT.....................K================K.....................TT",
      "TT.....................==KKKKK=====KKK===.....................TT",
      "TT.RRRRRRRR............==================.....................TT",
      "TT.RRRRRRRR............==================.....................TT",
      "TT.HHHHHHHH............==================.....................TT",
      "TT.HHHHHHHH............==================.....................TT",
      "TT.HHHDHHHH............==================.....................TT",
      "TT....=................==================.....................TT",
      "TT..T.=.....T...T...T.........====..........T...T...T...T.....TT",
      "TT============================================================TT",
      "TT============================================================TT",
      "TT..T...T...T...T...T.........====..........T...T...T...T.....TT",
      "TT.......................KKK..====............................TT",
      "TT............................====.............RRRRRRRRRR.....TT",
      "TT..RRRRRRRRRR................====.............RRRRRRRRRR.....TT",
      "TT..RRRRRRRRRR................====.............HHHHHHHHHH.....TT",
      "TT..HHHHHHHHHH......FFFFFFFFFFF==FFFFFFFFFFFF..HHHHHDHHHH.....TT",
      "TT..HHHHHDHHHH......F.........====..........F.......=.........TT",
      "TT.......=..........F.........====..........F.................TT",
      "TT..................F.........====....*.....F..,,,,,,,,,,,,...TT",
      "TT.,,,,,,,,,,,,,,,..F.....*...====..........F.................TT",
      "TT..................F.........====..........F.....~~~~BB~~~...TT",
      "TT..................F.........====..........F.....~~~~BB~~~...TT",
      "TT..................F.........====.......*..F.....~~~~BB~~~...TT",
      "TT..................F.......*.====..........F.....~~~~BB~~~...TT",
      "TT..................F.........====..........F.....~~~~BB~~~...TT",
      "TT..................F.........====..........F.................TT",
      "TT******************FFFFFFFFFFFFFFFFFFFFFFFFF*****************TT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    start: {"x":31,"y":24},
    places: [
      {"name":"各縣市展板帳篷","x":6,"y":3,"w":52,"h":4},
      {"name":"博覽會服務台","x":23,"y":10,"w":8,"h":8},
      {"name":"印章展示櫃","x":33,"y":10,"w":8,"h":8},
      {"name":"捷運圓山站（暫時傳送點）","x":3,"y":12,"w":8,"h":7},
      {"name":"我們班的展板","x":24,"y":21,"w":6,"h":3},
      {"name":"休息站","x":4,"y":24,"w":10,"h":5},
      {"name":"紀念品店","x":47,"y":23,"w":10,"h":5},
      {"name":"練習草地","x":20,"y":26,"w":25,"h":12},
      {"name":"小池塘","x":50,"y":31,"w":9,"h":5}
    ],
    exits: [
      {"x":6,"y":17,"to":"T02","tx":7,"ty":42,"teleport":true,"mrt":true,"label":"捷運（暫時傳送點）","requires":"Q4_T01_3","locked_dialog":"D_MRT_LOCKED"}
    ],
    npcs: [
      {"id":"desk","x":27,"y":12,"sprite":"npc_desk","dialog":"D_DESK_IDLE","quest":"Q4_TUT_1","quests":["Q4_TUT_1"]},
      {"id":"director","x":36,"y":12,"sprite":"npc_director","dialog":"D_DIRECTOR_IDLE","quest":"Q4_TUT_2","quests":["Q4_TUT_2","Q4_T01_4"],"dialog_done":{"quest":"Q4_T01_4","dialog":"D_DIRECTOR_IDLE_END"}},
      {"id":"classmate","x":28,"y":23,"sprite":"npc_classmate","dialog":"D_CLASSMATE_IDLE","quest":null,"quests":[],"dialog_done":{"quest":"Q4_T01_4","dialog":"D_CLASSMATE_IDLE_END"}},
      {"id":"mrt_staff","x":8,"y":17,"sprite":"npc_mrt_staff","dialog":"D_MRT_STAFF_IDLE","quest":null,"quests":[],"mrt":{"to":"T02","tx":7,"ty":42,"name":"新北投站"}},
      {"id":"inn","x":11,"y":28,"sprite":"npc_inn","dialog":"D_INN_IDLE","quest":null,"quests":[]},
      {"id":"shop","x":54,"y":27,"sprite":"npc_shop","dialog":"D_SHOP_IDLE","quest":null,"quests":[]}
    ],
    chests: [],
    spawns: [
      {"monster":"strap","count":5,"area":[21,27,23,10]}
    ],
    inn: {"npc":"inn","price":0,"x":11,"y":28,"name":"博覽會休息站","sign":"休息","freeIfBroke":true},
    shop: {"shop_id":"expo","npc":"shop","x":54,"y":27}
  },

  // ───────────────────────────── T02 北投溫泉街（72×48）─────────────────────────────
  T02: {
    name: "北投溫泉街", type: "field", level: 1, bgm: "village", battle_bg: "beitou", tileset: "field",
    real_ref: "臺北市北投區：捷運新北投站、北投公園、北投溫泉博物館、北投圖書館、凱達格蘭文化館外觀、北投溪（真實相對位置大致正確，不是比例地圖）",
    art_note: "北投溫泉街與北投公園（3456×2304，上北下南）。北投溪從北邊（偏東）往西南斜斜流過整張圖，溪的西北岸有溪畔步道，一路往北走到北邊出口（往地熱谷）；中山路在溪的西北側、和溪平行。溫泉博物館（和洋風公共浴場建築，紅磚＋木造）在中山路和北投溪之間，門朝南；凱達格蘭文化館（現代建築外觀）在中山路對面的西北側；北投圖書館（木造綠建築、屋頂太陽能板）在公園裡、博物館西南方；溪上 2 座小橋通到東南岸的公園，東南邊是光明路；西北角是溫泉街的旅館與商家，中山路西側有一個溫泉街小攤（藥草、飯糰）；西南角是捷運新北投站（高架車站外觀，不畫真實標誌），門前是暫時的傳送光圈（之後換成捷運系統），站前廣場。溪東岸北段是北投公園露天溫泉浴池（千禧湯：木圍籬、冒煙的露天池、日式入口小屋）與梅庭（唭哩岸石圍牆、日式木造平房，門柱字由程式寫），南段是練功草地（幾叢灌木）。",
    grid: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT=T~~~~TTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT=T~~~~TTTTTTTT",
      "TT.......................................==..............==~~~~FFFFFFTTT",
      "TT.......................................==..............==~~~.F~~~~~FTT",
      "TT..RRRRRRRR..RRRRRRR...................==..............==~~~..F~~~~~FTT",
      "TT..RRRRRRRR..RRRRRRR....RRRRRRRRRR.....==..............==~~~..F~~~~~FTT",
      "TT..HHHHHHHH..HHHHHHH....RRRRRRRRRR.....==.RRRRRRRRRR...=~~~~..F~~~~~FTT",
      "TT..HHHHHHHH..HHHHHHH....HHHHHHHHHH....==..RRRRRRRRRR..==~~~~..FFRRRRFTT",
      "TT..HHHHDHHH..HHHDHHH....HHHHHHHHHH....==..RRRRRRRRRR..==~~~.....HDHH.TT",
      "TT.......................HHHHHHHHHH...==...HHHHHHHHHH.==~~~~..........TT",
      "TT.......................HHHHHDHHHH...==...HHHHHHHHHH.=~~~~...........TT",
      "TT=====================================....HHHHDHHHHH==~~~~...########TT",
      "TT====================================..............===~~~..T.#.RRRRR#TT",
      "TT..................................==..............==~~~.....#.RRRRR#TT",
      "TT..RRRRRRRR..RRRRRRRR....,,,,,,...==.............==~~~~~.....#.HHDHH#TT",
      "TT..RRRRRRRR..RRRRRRRR....,,,,,,..==.............===~~~~......#......#TT",
      "TT..HHHHHHHH..HHHHHHHH...........==..............==BBBB==.....####=###TT",
      "TT..HHHHHHHH..HHHHHHHH..........==...............==BBBB==.............TT",
      "TT..HHHDHHHH..HHHHDHHH..........==...............==~~~~.T.............TT",
      "TT======================.......==RRRRRRRRR.....====~~~................TT",
      "TT======================......==.RRRRRRRRR....====~~~~.........=......TT",
      "TT...........................==..RRRRRRRRR...===~~~~~..........=......TT",
      "TT..........................==...HHHHHHHHH..===~~~~~...........=......TT",
      "TT..........................==...HHHHHHHHH..==~~~~.............=......TT",
      "TT......T,,,,,..........T..==....HHHHHHHHH.==~~~~..T...........=......TT",
      "TT......,,,,,,............==.....HHHHDHHHH==~~~~...............=......TT",
      "TT......,,,,,,...RRRRR...==..............==~~~~=.........T.....=......TT",
      "TT......,,,,,,...RRRRR..==..............=~~~~..................=......TT",
      "TT......,,,,,T...KKKKK..==..............=~~~...................=......TT",
      "TT.....................==.............==~~~....................=......TT",
      "TT....................==..T..........==~~~~.T.T.........,,,,,,.=......TT",
      "TT...................==..............==BBBB==...........,,,,,,.=......TT",
      "TT..................==...............==BBBB==..................=......TT",
      "TT..................==...............==~~~~....................=......TT",
      "TT.................==..............===~~~~...........**.....T..=......TT",
      "TT.RRRRRRRRRR.....==..............==~~~~~.......*..............=......TT",
      "TT.RRRRRRRRRR....==...T..........==~~~~..T.....T*..............=......TT",
      "TT.RRRRRRRRRR...==..............===~~~.........................=......TT",
      "TT.HHHHHHHHHH...==..............==~~~....................**....=......TT",
      "TT.HHHHHHHHHH..==..............==~~~~..........................=......TT",
      "TT.HHHHDHHHHH.==........,,,,,,==~~~~......................T....=......TT",
      "TT===================........===~~~............................=......TT",
      "TT===================........==~~~~..T.........................=......TT",
      "TT===================.......==~~~~.............................=......TT",
      "TT===================.......==~~~...============================......TT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    arrive_dialogs: [
      "D_T02_ARRIVE",
      "D_NODE_OPEN_T02"
    ],
    start: {"x":7,"y":42},
    places: [
      {"name":"捷運新北投站（暫時傳送點）","x":3,"y":35,"w":10,"h":7},
      {"name":"站前廣場","x":2,"y":41,"w":19,"h":4},
      {"name":"溫泉街","x":2,"y":4,"w":22,"h":17},
      {"name":"溫泉街小攤","x":17,"y":26,"w":5,"h":4},
      {"name":"凱達格蘭文化館","x":25,"y":5,"w":10,"h":7},
      {"name":"北投溫泉博物館","x":43,"y":6,"w":10,"h":7},
      {"name":"北投圖書館","x":33,"y":20,"w":9,"h":7},
      {"name":"北投公園","x":24,"y":12,"w":44,"h":33},
      {"name":"北投溪","x":28,"y":0,"w":36,"h":48},
      {"name":"往地熱谷（北邊出口）","x":55,"y":0,"w":6,"h":4},
      {"name":"千禧湯露天溫泉","x":63,"y":2,"w":7,"h":8},
      {"name":"梅庭（于右任故居）","x":62,"y":11,"w":8,"h":6},
      {"name":"東岸練功草地","x":43,"y":33,"w":19,"h":10}
    ],
    plaques: [
      {"x":65.75,"y":16.35,"w":1.1,"h":0.45,"text":"梅庭"}
    ],
    exits: [
      {"x":7,"y":41,"to":"T01","tx":6,"ty":18,"teleport":true,"mrt":true,"label":"捷運（暫時傳送點）"},
      {"x":58,"y":0,"to":"T03","tx":28,"ty":38,"requires":"Q4_T02_3","locked_dialog":"D_T03_LOCK"}
    ],
    safe: [
      {"x":7,"y":42}
    ],
    npcs: [
      {"id":"mrt_staff2","x":10,"y":42,"sprite":"npc_mrt_staff","dialog":"D_MRT_STAFF_IDLE","quest":"Q4_SIDE_2","quests":["Q4_SIDE_2"],"mrt":{"to":"T01","tx":6,"ty":18,"name":"圓山站"}},
      {"id":"traveler","x":14,"y":43,"sprite":"npc_traveler","dialog":"D_TRAVELER_IDLE","quest":null,"quests":[]},
      {"id":"volunteer","x":49,"y":12,"sprite":"npc_volunteer","dialog":"D_VOLUNTEER_IDLE","quest":"Q4_T02_1","quests":["Q4_T02_1"]},
      {"id":"guide","x":32,"y":11,"sprite":"npc_guide","dialog":"D_GUIDE_IDLE","quest":"Q4_T02_2","quests":["Q4_T02_2"]},
      {"id":"sage","x":39,"y":26,"sprite":"npc_sage","dialog":"D_SAGE_IDLE","quest":null,"quests":[],"sage":["SAGE_SO_8DIR","SAGE_SO_MAP4","SAGE_SC_FACE","SAGE_SC_SKY","SAGE_MA_YI","SAGE_MA_ROUND"]},
      {"id":"grandpa","x":28,"y":38,"sprite":"npc_grandpa","dialog":"D_GRANDPA_IDLE","quest":"Q4_SIDE_1","quests":["Q4_SIDE_1"]},
      {"id":"stall","x":19,"y":29,"sprite":"npc_stall","dialog":"D_STALL_IDLE","quest":null,"quests":[]},
      {"id":"bath_staff","x":68,"y":9,"sprite":"npc_volunteer","dialog":"D_BATH_STAFF_IDLE","quest":null,"quests":[]},
      {"id":"meiting_guide","x":68,"y":17,"sprite":"npc_guide","dialog":"D_MEITING_GUIDE_IDLE","quest":null,"quests":[]}
    ],
    chests: [
      {"id":"C_T02_1","x":61,"y":22,"subject":"數學","level":2,"reward":{"gold":30,"item":null}},
      {"id":"C_T02_2","x":49,"y":36,"subject":"數學","level":2,"reward":{"gold":25,"item":"herb"}},
      {"id":"C_T02_3","x":54,"y":41,"subject":"數學","level":2,"reward":{"gold":30,"item":"snack"}}
    ],
    spawns: [
      {"monster":"strap","count":3,"area":[43,30,16,14]},
      {"monster":"compass","count":3,"area":[59,18,11,26]},
      {"monster":"bookworm","count":2,"area":[27,26,8,11]}
    ],
    extra_shops: [
      {"shop_id":"stall","npc":"stall","x":19,"y":29}
    ]
  },

  // ───────────────────────────── T03 地熱谷步道（56×40）─────────────────────────────
  T03: {
    name: "地熱谷步道", type: "field", level: 2, bgm: "forest", battle_bg: "thermal", tileset: "field",
    real_ref: "臺北市北投區 地熱谷與步道（北投溪源頭之一；水很燙，只能在步道上看）",
    art_note: "地熱谷（2688×1920，上北下南）。中間是碧綠色、冒白煙的地熱谷水池，池邊有岩石，外圍一圈欄杆、再外圍是木步道；水從水池東南流出去，成為北投溪（往南邊樹林）；南邊中間是入口步道與入口廣場（管理員站在這裡），從南邊出口走回北投溫泉街；北邊是木造觀景台（頭目嘟嘟號的位置），用欄杆圍起來，南邊中間一道柵門；觀景台西邊有一塊告示牌（知識卡，文字由程式寫）；東西兩側是樹林與林間步道。不畫人在水裡、不畫受傷；警告牌文字留白。",
    grid: [
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TT.................TTTTTTTTTTTTTTTTTTT................TT",
      "TT..T...T...T......F=================F.......T...T...TTT",
      "TT.................F=================F................TT",
      "TT.................F=================F................TT",
      "TT.T...T...T.......F=================F......T...T...T.TT",
      "TT.................F=================F................TT",
      "TT.................FFFFFFFFF=FFFFFFFFF................TT",
      "TT..T...T...T.============================...T...T...TTT",
      "TT............============================............TT",
      "TT............==FFFFFFFFFFFFFFFFFFFFFFFF==............TT",
      "TT.T...T...T..==F~*~~~~~~~~~~~~~~~~~~*~F==..T...T...T.TT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~F==............TT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~F==............TT",
      "TT..T...T...T.==F~~~~~~~~~~~~~~~~~~~~~~F==...T...T...TTT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~F==............TT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~F==............TT",
      "TT.T============F~~~~~~~~~~~~~~~~~~~~~~F============T.TT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~F==............TT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~F==............TT",
      "TT..T...T...T.==F~~~~~~~~~~~~~~~~~~~~~~F==...T...T...TTT",
      "TT............==F~~~~~~~~~~~~~~~~~~~~~~~==............TT",
      "TT............==F~*~~~~~~~~~~~~~~~~~~*~~==............TT",
      "TT.T...T...T..==F~~~~~~~~~~~~~~~~~~~~~~~==..T...T...T.TT",
      "TT............==FFFFFFFFFFFFFFFFFFFFFFF~==............TT",
      "TT............==========================~~............TT",
      "TT..T...T...T.==========================BB...T...T...TTT",
      "TT..........................=.......==========........TT",
      "TT..........................=...........~~............TT",
      "TT.T...T..============......=............~~.T...T...T.TT",
      "TT..........................=............~~...........TT",
      "TT....................=============......~~...........TT",
      "TT..T...T...T.........=============......~~..T...T...TTT",
      "TT....................=============.......~~..........TT",
      "TT....................=============.......~~..........TT",
      "TT.T...T...T................=.............~~T...T...T.TT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT=TTTTTTTTTTTTT~~TTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT=TTTTTTTTTTTTTTTTTTTTTTTTTTT",
      "TTTTTTTTTTTTTTTTTTTTTTTTTTTT=TTTTTTTTTTTTTTTTTTTTTTTTTTT"
    ],
    arrive_dialogs: [
      "D_T03_ARRIVE",
      "D_NODE_OPEN_T03"
    ],
    start: {"x":28,"y":37},
    places: [
      {"name":"地熱谷","x":16,"y":11,"w":24,"h":15},
      {"name":"觀景台","x":19,"y":2,"w":19,"h":7},
      {"name":"入口廣場","x":22,"y":32,"w":13,"h":4},
      {"name":"北投溪源頭","x":39,"y":22,"w":5,"h":16},
      {"name":"往北投溫泉街（南邊出口）","x":26,"y":36,"w":5,"h":4}
    ],
    exits: [
      {"x":28,"y":39,"to":"T02","tx":58,"ty":1}
    ],
    npcs: [
      {"id":"ranger","x":31,"y":33,"sprite":"npc_ranger","dialog":"D_RANGER_IDLE","quest":"Q4_T03_1","quests":["Q4_T03_1","Q4_T03_B"]}
    ],
    gates: [
      {"x":28,"y":8,"quest":"Q4_T03_1","dialog":"D_T03_GATE_LOCK","label":"觀景台柵門"}
    ],
    notes: [
      {"x":22,"y":4,"dialog":"D_CARD_JINSHAN","label":"告示牌"}
    ],
    chests: [
      {"id":"C_T03_1","x":50,"y":31,"subject":"數學","level":3,"reward":{"gold":30,"item":null}}
    ],
    spawns: [
      {"monster":"sparrow","count":2,"area":[2,2,12,17]},
      {"monster":"steam","count":3,"area":[42,2,12,35]},
      {"monster":"bookworm","count":2,"area":[2,19,20,18]},
      {"monster":"dudu","count":1,"area":[28,4,1,1],"boss":true,"quest":"Q4_T03_B"}
    ]
  }
};
