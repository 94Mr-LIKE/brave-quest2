/*
 * 勇者大冒險II — 地圖（台北章 v0.6：T01、T04–T08、TI1–TI4、TD1–TD2）
 * 由工具產生（tools/build_content.js），請勿手動修改：請改 content/ch01/ 再重跑 node tools/build_content.js
 * 來源：content/ch01/maps.json（關卡 ch01_maps_draft.json 第 2 版）、npcs.json、chests.json、maps_meta.json；欄位見 README_資料格式.md 第 8 節
 */
// 切片 T02 北投溫泉街、T03 地熱谷步道：劇本第 4 節停用，本版不輸出（格子留在 git 歷史與 tools/build_g4_maps.js）
window.MAPS = {
 "T01": {
  "name": "博覽會會場（圓山）",
  "type": "town",
  "kind": "town",
  "level": 1,
  "bgm": "town",
  "battle_bg": "expo_lawn",
  "tileset": "field",
  "light": "v1",
  "view": "正面街屋立面",
  "real_ref": "臺北市花博公園圓山園區、捷運圓山站一帶；圓山遺址（國定考古遺址）；臺北市立美術館外觀遠景（博覽會是虛構的）",
  "art_note": "沿用切片 bg_T01。新增：①東西大道東端延伸 2 格接河濱步道（往圓山・劍潭山）②東北角後山小徑木柵門（捷徑，平常鎖著）③東邊空地圓山遺址貝塚：矮圍欄圍住一小丘貝殼土，旁邊解說牌（不畫人骨）④東北角樹叢裡藏一個小空地（隱藏寶箱）⑤西側休息站東北邊加「冒險者公會攤位」（虛構的布棚攤位＋公會旗，3 格寬櫃台，轉職所）⑥中央廣場東南邊加一塊「圓山天文臺舊址」解說牌（天文館前身，1963 年在圓山啟用，官網歷史沿革）⑦北美館只在東北角邊緣露出白色井字形量體一角（遠景，壓縮：北美館在中山美術公園，與圓山園區相鄰但隔中山北路）。",
  "grid": [
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT...TT",
   "TT............................====...........................UTT",
   "TT....RRRRRRRRR...RRRRRRRRR...====...RRRRRRRRR...RRRRRRRRR....TT",
   "TT....RRRRRRRRR...RRRRRRRRR...====...RRRRRRRRR...RRRRRRRRR....TT",
   "TT....HHHHHHHHH...HHHHHHHHH...====...HHHHHHHHH...HHHHHHHHH....TT",
   "TT....HHHHDHHHH...HHHHDHHHH...====...HHHHDHHHH...HHHHDHHHH....TT",
   "TT............................====............................TT",
   "TT....,,,,,,,,,...,,,,,,,,,...====...,,,,,,,,,...,,,,,,,,,....TT",
   "TT............................====..........................====",
   "TT.....................K================K...................====",
   "TT.....................==KKKKK=====KKK===.....................TT",
   "TT.RRRRRRRR............==================.............FFFFFFF.TT",
   "TT.RRRRRRRR............==================.............F*****F.TT",
   "TT.HHHHHHHH............==================.............F*****F.TT",
   "TT.HHHHHHHH............==================.............FFFFFFF.TT",
   "TT.HHHDHHHH............==================.....................TT",
   "TT....=................==================.....................TT",
   "TT..T.=.....T...T...T.........====..........T...T...T...T.....TT",
   "TT==============================================================",
   "TT==============================================================",
   "TT..T...T...T...T...T.........====..........T...T...T...T.....TT",
   "TT............KKK........KKK..====.............KKKKKKKKKK.....TT",
   "TT..KKKKKKKKKK................====.............RRRRRRRRRR.....TT",
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
  "start": {
   "x": 31,
   "y": 24
  },
  "places": [
   {
    "name": "捷運圓山站",
    "x": 3,
    "y": 12,
    "w": 8,
    "h": 7
   },
   {
    "name": "服務台",
    "x": 23,
    "y": 10,
    "w": 8,
    "h": 8
   },
   {
    "name": "練習草地",
    "x": 20,
    "y": 26,
    "w": 25,
    "h": 12
   },
   {
    "name": "圓山遺址",
    "x": 54,
    "y": 12,
    "w": 7,
    "h": 5
   },
   {
    "name": "後山小徑",
    "x": 58,
    "y": 8,
    "w": 6,
    "h": 3
   },
   {
    "name": "冒險者公會攤位",
    "x": 14,
    "y": 22,
    "w": 3,
    "h": 2
   }
  ],
  "exits": [
   {
    "x": 6,
    "y": 17,
    "to": "T04",
    "tx": 7,
    "ty": 43,
    "label": "捷運圓山站（站務員選士林／龍山寺）",
    "teleport": true,
    "mrt": true,
    "station": "圓山站",
    "mrt_stations": [
     {
      "map": "T04",
      "name": "士林站",
      "tx": 7,
      "ty": 43
     },
     {
      "map": "T05",
      "name": "龍山寺站",
      "tx": 35,
      "ty": 37
     }
    ],
    "requires": "Q4_C01_M2",
    "locked_dialog": "D_MRT_LOCKED"
   },
   {
    "x": 63,
    "y": 19,
    "to": "T06",
    "tx": 1,
    "ty": 31,
    "label": "往基隆河畔步道"
   },
   {
    "x": 63,
    "y": 20,
    "to": "T06",
    "tx": 1,
    "ty": 32,
    "label": "往基隆河畔步道"
   },
   {
    "x": 63,
    "y": 9,
    "to": "T06",
    "tx": 53,
    "ty": 9,
    "label": "後山小徑（捷徑）"
   },
   {
    "x": 63,
    "y": 10,
    "to": "T06",
    "tx": 53,
    "ty": 10,
    "label": "後山小徑（捷徑）"
   }
  ],
  "npcs": [
   {
    "id": "desk",
    "x": 27,
    "y": 12,
    "sprite": "npc_desk",
    "dialog": "D_DESK_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_DESK_IDLE_END"
    }
   },
   {
    "id": "classmate",
    "x": 28,
    "y": 23,
    "sprite": "pet_zhe",
    "dialog": "D_CLASSMATE_IDLE",
    "quest": "Q4_C01_M4",
    "quests": [
     "Q4_C01_M4"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_CLASSMATE_IDLE_END"
    }
   },
   {
    "id": "c01_teacher",
    "x": 24,
    "y": 23,
    "sprite": "npc_c01_teacher",
    "dialog": "D_C01_TEACHER_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_TEACHER_IDLE_END"
    }
   },
   {
    "id": "c01_leader",
    "x": 36,
    "y": 23,
    "sprite": "npc_c01_leader",
    "dialog": "D_C01_LEADER_IDLE",
    "quest": "Q4_C01_S1",
    "quests": [
     "Q4_C01_S1"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_LEADER_IDLE_END"
    }
   },
   {
    "id": "sage",
    "x": 45,
    "y": 13,
    "sprite": "npc_sage",
    "dialog": "D_C01_SAGE_MEET",
    "quest": null,
    "quests": [],
    "dialogs_extra": [
     "D_C01_SAGE_MEET"
    ],
    "sage": [
     "SAGE_SO_8DIR",
     "SAGE_SO_MAP4",
     "SAGE_SC_FACE",
     "SAGE_SC_SKY",
     "SAGE_MA_YI",
     "SAGE_MA_ROUND"
    ]
   },
   {
    "id": "mrt_staff",
    "x": 8,
    "y": 17,
    "sprite": "npc_mrt_staff",
    "dialog": "D_MRT_STAFF_IDLE",
    "quest": null,
    "quests": [],
    "station": "圓山站",
    "mrt_stations": [
     {
      "map": "T04",
      "name": "士林站",
      "tx": 7,
      "ty": 43
     },
     {
      "map": "T05",
      "name": "龍山寺站",
      "tx": 35,
      "ty": 37
     }
    ]
   },
   {
    "id": "shop",
    "x": 54,
    "y": 27,
    "sprite": "npc_shop",
    "dialog": "D_SHOP_IDLE",
    "quest": null,
    "quests": []
   },
   {
    "id": "inn",
    "x": 11,
    "y": 28,
    "sprite": "npc_inn",
    "dialog": "D_INN_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_INN_IDLE_END"
    }
   },
   {
    "id": "c01_guild",
    "x": 15,
    "y": 23,
    "sprite": "npc_c01_guild",
    "dialog": "D_C01_GUILD_MEET",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_GUILD_DONE"
    },
    "dialogs_extra": [
     "D_C01_GUILD_LOCKED",
     "D_C01_GUILD_OPEN"
    ],
    "job_change": true
   }
  ],
  "notes": [
   {
    "x": 8,
    "y": 18,
    "label": "花博公園圓山園區",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_T01_8_18"
   },
   {
    "x": 57,
    "y": 16,
    "label": "圓山遺址（貝塚）",
    "kind": "landmark",
    "card": "D_C01_CARD_YUANSHAN_SITE",
    "dialog": "D_C01_CARD_YUANSHAN_SITE"
   },
   {
    "x": 60,
    "y": 8,
    "label": "臺北市立美術館（遠景）",
    "kind": "landmark",
    "card": "D_C01_CARD_TFAM",
    "dialog": "D_C01_CARD_TFAM"
   },
   {
    "x": 47,
    "y": 16,
    "label": "圓山天文臺舊址解說牌（天文館前身）",
    "kind": "landmark",
    "card": "D_C01_AUTO_NOTE_T01_47_16",
    "dialog": "D_C01_AUTO_NOTE_T01_47_16"
   }
  ],
  "gates": [
   {
    "x": 61,
    "y": 9,
    "label": "後山小徑木柵門（捷徑，雙扇）",
    "kind": "fence",
    "quest": "Q4_C01_S1",
    "dialog": "D_C01_AUTO_GATE_T01_61_9"
   },
   {
    "x": 61,
    "y": 10,
    "label": "後山小徑木柵門（捷徑，雙扇）",
    "kind": "fence",
    "quest": "Q4_C01_S1",
    "dialog": "D_C01_AUTO_GATE_T01_61_10"
   }
  ],
  "hidden": [
   {
    "id": "HD_C01_T01_1",
    "name": "東北角樹叢小空地",
    "at": {
     "x": 61,
     "y": 2
    },
    "cells": [
     [
      61,
      2
     ]
    ],
    "area": [
     59,
     1,
     3,
     2
    ],
    "trigger": "調查 (61,2) 的樹叢（樹冠下 U 格可走）",
    "obstacle": "obj_hd_bush",
    "chests": [
     "C_T01_H"
    ]
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_T01_1",
    "x": 3,
    "y": 29,
    "kind": "normal",
    "subject": "國語",
    "level": 1,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T01_2",
    "x": 43,
    "y": 36,
    "kind": "normal",
    "subject": "數學",
    "level": 1,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    }
   },
   {
    "id": "C_T01_H",
    "x": 59,
    "y": 1,
    "kind": "hidden",
    "subject": "社會",
    "level": 1,
    "reward": {
     "gold": 0,
     "item": "c01_candy"
    },
    "hidden": "HD_C01_T01_1"
   }
  ],
  "spawns": [
   {
    "monster": "strap",
    "count": 5,
    "area": [
     21,
     27,
     23,
     10
    ]
   }
  ],
  "safe": [
   {
    "x": 31,
    "y": 24
   },
   {
    "x": 6,
    "y": 18
   }
  ],
  "inn": {
   "x": 11,
   "y": 28,
   "npc": "inn",
   "name": "博覽會休息站",
   "price": 0
  },
  "shop": {
   "x": 54,
   "y": 27,
   "npc": "shop",
   "shop_id": "c01_item_expo"
  }
 },
 "T04": {
  "name": "士林（故宮・天文館）",
  "type": "town",
  "kind": "town",
  "level": 1,
  "bgm": "town",
  "battle_bg": "c01_shilin",
  "tileset": "field",
  "light": "v1",
  "view": "正面街屋立面",
  "real_ref": "國立故宮博物院（士林區外雙溪）https://www.npm.gov.tw/ ；臺北市立天文科學教育館（士林區基河路 363 號）https://www.tam.gov.taipei/ ；至善園；外雙溪（查詢 2026-11-20）",
  "art_note": "【壓縮】故宮（外雙溪）與天文館（基河路）實際相距約 3 公里以上，中間的士林市區省略；捷運士林站實際在兩者之間偏西，畫在西南角。北邊是故宮正館：綠琉璃瓦、米黃牆宮殿式立面，前面寬階梯與廣場（不畫院徽、招牌由程式寫）；西邊至善園：矮牆、池塘、亭子、小石橋；東北外雙溪由北往南再轉東流，木橋過溪到東岸樹林；中間南北大道（至善路→中山北路的意象）與東西大道（基河路意象）；東南天文館：穩重的塊體＋採光罩＋金黃色圓頂（直徑 35 米的全天域劇院，官網天文館簡介）、館外經緯儀與赤道日晷、前廣場；西南捷運士林站（通用列車圖示）與武器防具店。光 v1 清晨柔光。",
  "grid": [
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TT..............................===.................~~~........TTTTTTTTT",
   "TT......RRRRRRRRRRRRRRRRRRRRRR..===.................~~~........TTT...TTT",
   "TT......RRRRRRRRRRRRRRRRRRRRRR.T===T................~~~........U.....TTT",
   "TT......RRRRRRRRRRRRRRRRRRRRRR..===.................~~~........TTTTTTTTT",
   "TT......HHHHHHHHHHHHHHHHHHHHHH..===.................~~~...T....TTTTTTTTT",
   "TT......HHHHHHHHHHHHHHHHHHHHHH..===.................~~~........TTTTTTTTT",
   "TT......HHHHHHHHHH===HHHHHHHHH..====================BBBB===...........TT",
   "TT..........=FFFSSSSSSSFFF==....====================BBBB===...........TT",
   "TT..........=FFFSSSSSSSFFF==....===.................~~~...............TT",
   "TT..........===F=======F====....===.................~~~...............TT",
   "TTFFFFFFFFFF=======================.................~~~.........T.....TT",
   "TTF,,,,,,,,F=======================.................~~~..T............TT",
   "TTF,,,,,,K,F================....===.................~~~...............TT",
   "TTF,~~~~,,,F================....===.................~~~.....T.........TT",
   "TTF,~~~~,,,F...................T===T................~~~............T..TT",
   "TTF,~~~~,,,F....................===.................~~~...............TT",
   "TTF,~~~~,,,=....................===.................~~~~~~~~~~~~~~~~~~TT",
   "TTF,,,B,,,,=....................===.................~~~~~~~~~~~~~~~~~~TT",
   "TTF,,,.,,,,F...................T===T................~~~~~~~~~~~~~~~~~~TT",
   "TTF,,,,,,,,F....................===...................................TT",
   "TTF,,,,,,,,F....................===...................................TT",
   "TTF,,,,,,,,F....................===...................................TT",
   "TTF,,,,,,,,F...................T===T..................................TT",
   "TTFFFFFFFFFF....................===...................................TT",
   "TT..............................===...................................TT",
   "TT..............................===...................................TT",
   "TT..............................===...................................TT",
   "TT..............................===...T..T..T..T......................TT",
   "TT====================================================================TT",
   "TT====================================================================TT",
   "TT..............................===...................................TT",
   "TT..............................===...............RRRRRRRRRRRRRRR.....TT",
   "TT..............RRRRRRRR........===...............RRRRRRRRRRRRRRR.....TT",
   "TT..............RRRRRRRR........===...............RRRRRRRRRRRRRRR.....TT",
   "TT..............HHHHHHHH.......T===T..............HHHHHHHHHHHHHHH.....TT",
   "TT.RRRRRRRRRR...HHHDHHHH........===...............HHHHHHHHHHHHHHH.....TT",
   "TT.RRRRRRRRRR...KKK===KK........===...............HHHHHHH==HHHHHH.....TT",
   "TT.HHHHHHHHHH...................===.............===================...TT",
   "TT.HHHHHHHHHH..................T===T............===================...TT",
   "TT.HHHHDHHHHH...................===.............===================...TT",
   "TT.============.................===.............===================...TT",
   "TT.============.................===...................................TT",
   "TT..............................===...................................TT",
   "TT..............................===...................................TT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
  ],
  "start": {
   "x": 7,
   "y": 43
  },
  "arrive_dialogs": [
   "D_C01_NODE_OPEN"
  ],
  "places": [
   {
    "name": "故宮正館",
    "x": 8,
    "y": 3,
    "w": 23,
    "h": 6
   },
   {
    "name": "至善園",
    "x": 2,
    "y": 12,
    "w": 10,
    "h": 14
   },
   {
    "name": "外雙溪",
    "x": 52,
    "y": 2,
    "w": 18,
    "h": 19
   },
   {
    "name": "天文館",
    "x": 50,
    "y": 33,
    "w": 15,
    "h": 10
   },
   {
    "name": "捷運士林站",
    "x": 3,
    "y": 37,
    "w": 12,
    "h": 7
   }
  ],
  "exits": [
   {
    "x": 7,
    "y": 42,
    "to": "T01",
    "tx": 6,
    "ty": 18,
    "label": "捷運士林站（站務員選圓山／龍山寺）",
    "teleport": true,
    "mrt": true,
    "station": "士林站",
    "mrt_stations": [
     {
      "map": "T01",
      "name": "圓山站",
      "tx": 6,
      "ty": 18
     },
     {
      "map": "T05",
      "name": "龍山寺站",
      "tx": 35,
      "ty": 37
     }
    ]
   },
   {
    "x": 19,
    "y": 8,
    "to": "TI1",
    "tx": 15,
    "ty": 18,
    "label": "故宮正館"
   },
   {
    "x": 20,
    "y": 8,
    "to": "TI1",
    "tx": 16,
    "ty": 18,
    "label": "故宮正館"
   },
   {
    "x": 57,
    "y": 38,
    "to": "TI2",
    "tx": 15,
    "ty": 18,
    "label": "天文館"
   },
   {
    "x": 58,
    "y": 38,
    "to": "TI2",
    "tx": 16,
    "ty": 18,
    "label": "天文館"
   },
   {
    "x": 18,
    "y": 8,
    "to": "TI1",
    "tx": 15,
    "ty": 18,
    "label": "故宮正館"
   }
  ],
  "npcs": [
   {
    "id": "mrt_staff2",
    "x": 10,
    "y": 43,
    "sprite": "npc_mrt_staff",
    "dialog": "D_MRT_STAFF_IDLE",
    "quest": "Q4_SIDE_2",
    "quests": [
     "Q4_SIDE_2"
    ],
    "station": "士林站",
    "mrt_stations": [
     {
      "map": "T01",
      "name": "圓山站",
      "tx": 6,
      "ty": 18
     },
     {
      "map": "T05",
      "name": "龍山寺站",
      "tx": 35,
      "ty": 37
     }
    ]
   },
   {
    "id": "traveler",
    "x": 22,
    "y": 16,
    "sprite": "npc_traveler",
    "dialog": "D_TRAVELER_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_TRAVELER_IDLE_END"
    }
   },
   {
    "id": "c01_star_kid",
    "x": 54,
    "y": 43,
    "sprite": "npc_c01_star_kid",
    "dialog": "D_C01_STARKID_IDLE",
    "quest": "Q4_C01_S2",
    "quests": [
     "Q4_C01_S2"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_STARKID_IDLE_END"
    }
   },
   {
    "id": "c01_smith",
    "x": 21,
    "y": 38,
    "sprite": "npc_c01_smith",
    "dialog": "D_C01_SMITH_IDLE",
    "quest": null,
    "quests": []
   },
   {
    "id": "c01_mob_t04a",
    "x": 26,
    "y": 13,
    "sprite": "npc_c01_mob_t04a",
    "dialog": "D_C01_MOB_T04A",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T04A_END"
    }
   },
   {
    "id": "c01_mob_t04b",
    "x": 40,
    "y": 31,
    "sprite": "npc_c01_mob_t04b",
    "dialog": "D_C01_MOB_T04B",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T04B_END"
    }
   },
   {
    "id": "c01_mob_t04c",
    "x": 62,
    "y": 41,
    "sprite": "npc_c01_mob_t04c",
    "dialog": "D_C01_MOB_T04C",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T04C_END"
    }
   },
   {
    "id": "c01_mob_t04d",
    "x": 8,
    "y": 22,
    "sprite": "npc_c01_mob_t04d",
    "dialog": "D_C01_MOB_T04D",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T04D_END"
    }
   }
  ],
  "notes": [
   {
    "x": 11,
    "y": 9,
    "label": "國立故宮博物院（正館）",
    "kind": "landmark",
    "card": "D_C01_CARD_NPM",
    "dialog": "D_C01_CARD_NPM"
   },
   {
    "x": 12,
    "y": 16,
    "label": "至善園",
    "kind": "landmark",
    "card": "D_C01_CARD_ZHISHAN",
    "dialog": "D_C01_CARD_ZHISHAN"
   },
   {
    "x": 51,
    "y": 11,
    "label": "外雙溪",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_T04_51_11"
   },
   {
    "x": 47,
    "y": 40,
    "label": "臺北市立天文科學教育館",
    "kind": "landmark",
    "card": "D_C01_CARD_TAM",
    "dialog": "D_C01_CARD_TAM"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_T04_1",
    "name": "外雙溪東岸樹林小空地",
    "at": {
     "x": 63,
     "y": 4
    },
    "cells": [
     [
      63,
      4
     ]
    ],
    "area": [
     66,
     3,
     3,
     2
    ],
    "trigger": "調查 (62,4) 的樹叢（U 格 63–65,4）",
    "obstacle": "obj_hd_bush",
    "chests": [
     "C_T04_H"
    ]
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_T04_1",
    "x": 40,
    "y": 3,
    "kind": "normal",
    "subject": "英語",
    "level": 1,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T04_2",
    "x": 29,
    "y": 44,
    "kind": "normal",
    "subject": "自然",
    "level": 1,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    }
   },
   {
    "id": "C_T04_3",
    "x": 66,
    "y": 44,
    "kind": "normal",
    "subject": "國語",
    "level": 2,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T04_4",
    "x": 3,
    "y": 24,
    "kind": "normal",
    "subject": "數學",
    "level": 2,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    }
   },
   {
    "id": "C_T04_P",
    "x": 68,
    "y": 25,
    "kind": "prank",
    "subject": null,
    "level": null,
    "reward": {
     "gold": 0,
     "item": null
    },
    "joke": "JOKE_C01_1"
   },
   {
    "id": "C_T04_H",
    "x": 67,
    "y": 3,
    "kind": "hidden",
    "subject": "社會",
    "level": 2,
    "reward": {
     "gold": 7,
     "item": null
    },
    "hidden": "HD_C01_T04_1"
   }
  ],
  "spawns": [
   {
    "monster": "strap",
    "count": 3,
    "area": [
     14,
     17,
     16,
     11
    ]
   },
   {
    "monster": "bookworm",
    "count": 3,
    "area": [
     57,
     10,
     12,
     7
    ]
   },
   {
    "monster": "clockbug",
    "count": 3,
    "area": [
     37,
     17,
     14,
     11
    ]
   }
  ],
  "safe": [
   {
    "x": 7,
    "y": 43
   }
  ],
  "inn": null,
  "shop": {
   "x": 21,
   "y": 38,
   "npc": "c01_smith",
   "shop_id": "c01_weapon_shilin"
  }
 },
 "T05": {
  "name": "萬華（龍山寺・剝皮寮）",
  "type": "town",
  "kind": "town",
  "level": 2,
  "bgm": "town",
  "battle_bg": "c01_wanhua",
  "tileset": "field",
  "light": "v1",
  "view": "正面街屋立面",
  "real_ref": "艋舺龍山寺 https://www.lungshan.org.tw/ ；剝皮寮歷史街區 https://www.bopiliao.taipei/ ；青草巷（萬華區公所）（查詢 2026-11-20）",
  "art_note": "【壓縮】龍山寺、剝皮寮、青草巷實際都在龍山寺周邊 500 公尺內，相對位置大致：龍山寺在北、剝皮寮在西南（康定路 173 巷）、青草巷在東（西昌街），本圖照這個方向；捷運龍山寺站實際在龍山寺西南邊的公園下，這裡畫在南邊中間。北邊中間龍山寺只畫三川殿外觀（屋頂剪黏輪廓、一對蟠龍柱的輪廓），廟門是裝飾不可進；廟前廣場兩個水池；不畫神像、香爐細節。西南剝皮寮：兩排紅磚窄長街屋與亭仔腳，北排騎樓窄（清代）、南排騎樓寬（日治），南排中間一間老店可進（TI3）；西南角磚牆後的小天井是隱藏區（牆上一塊刻 TR 的磚是線索）。東邊青草巷：巷子兩側堆滿綠色草藥籃。中間（剝皮寮東側）是有行道樹、花圃與長椅的小公園綠地（野怪範圍）。捷運龍山寺站出口西側有一塊地名解說牌（宇翔的艋舺知識卡）。光 v1。",
  "grid": [
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TT............................................==..............TT",
   "TT....................RRRRRRRRRRRRRRRRRRRR....==..............TT",
   "TT....................RRRRRRRRRRRRRRRRRRRR....==..............TT",
   "TT....................RRRRRRRRRRRRRRRRRRRR....==..............TT",
   "TT....................RRRRRRRRRRRRRRRRRRRR....==..............TT",
   "TT....................HHHHHHHHHHHHHHHHHHHH....==..............TT",
   "TT....................HHHHHHHHHHHHHHHHHHHH....==..............TT",
   "TT....................HHHHHHHHHDDHHHHHHHHH....==..............TT",
   "TT..................========================..==..............TT",
   "TT..................========================..==..............TT",
   "TT..................==~~~~============~~~~==..==..............TT",
   "TT..................==~~~~============~~~~==..==..............TT",
   "TT..................==~~~~============~~~~==..==..............TT",
   "TT..................========================..==..............TT",
   "TT..T....T....T...KT...KT...KT...KT...KT......==..............TT",
   "TT============================================================TT",
   "TT============================================================TT",
   "TT............................................==..............TT",
   "TT..RRRRRRRRHHRRRRRRRR........................==.HHHKK==KKHHH.TT",
   "TT..RRRRRRRRHHRRRRRRRR..KT..KT..KT..KT..KT....==.HHHKK==KKHHH.TT",
   "TT..HHHHHHHHHHHHHHHHHH........................==.HHH..==..HHH.TT",
   "TT..HHHHHHHHHHHHHHHHHH........................==.HHHKK==KKHHH.TT",
   "TT..HHDHHDHHHHHHHDHHHH........................==.HHH..==..HHH.TT",
   "TT.====================........,,,,...........==.HHHKK==KKHHH.TT",
   "TT.====================....K...,,,,....K......==.HHH..==..HHH.TT",
   "TT..RRRRRRRRRRRRRRRRRR........................==.HHHKK==KKHHH.TT",
   "TT..RRRRRRRRRRRRRRRRRR........................==.HHHKK==KKHHH.TT",
   "TT..HHHHHHHHHHHHHHHHHH........................==.HHH..==..HHH.TT",
   "TT..HHHHHHHHHHHHHHHHHH...T...............T....==.HHHKK==KKHHH.TT",
   "TT..HHHDHHHH==HHHDHHHH........................==.HHH..==..HHH.TT",
   "TT.====================......KRRRRRRRRRR......==.HHH..==..HHH.TT",
   "TT.====================......KRRRRRRRRRR......==.HHH..==..HHH.TT",
   "TTHHHHH......................KHHHHHHHHHH......==..............TT",
   "TH....U......................KHHHHHDHHHH......==..............TT",
   "TH....H.....................==============....==..............TT",
   "TH....H.....................==============....==..............TT",
   "THHHHHHTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
  ],
  "start": {
   "x": 35,
   "y": 37
  },
  "arrive_dialogs": [
   "D_C01_NODE_OPEN"
  ],
  "places": [
   {
    "name": "龍山寺（外觀）",
    "x": 22,
    "y": 3,
    "w": 20,
    "h": 7
   },
   {
    "name": "廟前廣場",
    "x": 20,
    "y": 10,
    "w": 24,
    "h": 6
   },
   {
    "name": "剝皮寮",
    "x": 3,
    "y": 20,
    "w": 20,
    "h": 14
   },
   {
    "name": "青草巷",
    "x": 50,
    "y": 20,
    "w": 11,
    "h": 14
   },
   {
    "name": "捷運龍山寺站",
    "x": 28,
    "y": 32,
    "w": 14,
    "h": 6
   }
  ],
  "exits": [
   {
    "x": 35,
    "y": 36,
    "to": "T01",
    "tx": 6,
    "ty": 18,
    "label": "捷運龍山寺站（站務員選圓山／士林）",
    "teleport": true,
    "mrt": true,
    "station": "龍山寺站",
    "mrt_stations": [
     {
      "map": "T01",
      "name": "圓山站",
      "tx": 6,
      "ty": 18
     },
     {
      "map": "T04",
      "name": "士林站",
      "tx": 7,
      "ty": 43
     }
    ]
   },
   {
    "x": 12,
    "y": 31,
    "to": "TI3",
    "tx": 11,
    "ty": 18,
    "label": "剝皮寮老店"
   },
   {
    "x": 13,
    "y": 31,
    "to": "TI3",
    "tx": 12,
    "ty": 18,
    "label": "剝皮寮老店"
   }
  ],
  "npcs": [
   {
    "id": "grandpa",
    "x": 15,
    "y": 13,
    "sprite": "npc_grandpa",
    "dialog": "D_GRANDPA_IDLE",
    "quest": "Q4_SIDE_1",
    "quests": [
     "Q4_SIDE_1"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_GRANDPA_IDLE_END"
    }
   },
   {
    "id": "c01_herb_aunt",
    "x": 55,
    "y": 26,
    "sprite": "npc_c01_herb_aunt",
    "dialog": "D_C01_HERB_IDLE",
    "quest": "Q4_C01_S3",
    "quests": [
     "Q4_C01_S3"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_HERB_IDLE_END"
    }
   },
   {
    "id": "c01_snack",
    "x": 52,
    "y": 19,
    "sprite": "npc_c01_snack",
    "dialog": "D_C01_SNACK_IDLE",
    "quest": null,
    "quests": []
   },
   {
    "id": "c01_mob_t05_mrt",
    "x": 38,
    "y": 37,
    "sprite": "npc_mrt_staff",
    "dialog": "D_MRT_STAFF_IDLE",
    "quest": null,
    "quests": [],
    "station": "龍山寺站",
    "mrt_stations": [
     {
      "map": "T01",
      "name": "圓山站",
      "tx": 6,
      "ty": 18
     },
     {
      "map": "T04",
      "name": "士林站",
      "tx": 7,
      "ty": 43
     }
    ]
   },
   {
    "id": "c01_mob_t05a",
    "x": 10,
    "y": 25,
    "sprite": "npc_c01_mob_t05a",
    "dialog": "D_C01_MOB_T05A",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T05A_END"
    }
   },
   {
    "id": "c01_mob_t05b",
    "x": 36,
    "y": 14,
    "sprite": "npc_c01_mob_t05b",
    "dialog": "D_C01_MOB_T05B",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T05B_END"
    }
   },
   {
    "id": "c01_mob_t05c",
    "x": 44,
    "y": 18,
    "sprite": "npc_desk",
    "dialog": "D_C01_MOB_T05C",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T05C_END"
    }
   },
   {
    "id": "c01_mob_t05d",
    "x": 20,
    "y": 33,
    "sprite": "npc_desk",
    "dialog": "D_C01_MOB_T05D",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T05D_END"
    }
   }
  ],
  "notes": [
   {
    "x": 30,
    "y": 10,
    "label": "艋舺龍山寺（只看外觀）",
    "kind": "landmark",
    "card": "D_C01_CARD_LUNGSHAN",
    "dialog": "D_C01_CARD_LUNGSHAN"
   },
   {
    "x": 3,
    "y": 26,
    "label": "剝皮寮歷史街區",
    "kind": "landmark",
    "card": "D_C01_CARD_BOPILIAO",
    "dialog": "D_C01_CARD_BOPILIAO"
   },
   {
    "x": 53,
    "y": 19,
    "label": "青草巷",
    "kind": "landmark",
    "card": "D_C01_CARD_HERBLANE",
    "dialog": "D_C01_CARD_HERBLANE"
   },
   {
    "x": 5,
    "y": 33,
    "label": "刻著 TR 的紅磚（隱藏區線索）",
    "kind": "investigate",
    "dialog": "D_C01_AUTO_NOTE_T05_5_33"
   },
   {
    "x": 32,
    "y": 36,
    "label": "地名解說牌（艋舺；宇翔知識卡 D_C01_CARD_MANKA）",
    "kind": "investigate",
    "card": "D_C01_CARD_MANKA",
    "dialog": "D_C01_CARD_MANKA"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_T05_1",
    "name": "剝皮寮磚牆後小天井",
    "at": {
     "x": 6,
     "y": 35
    },
    "cells": [
     [
      6,
      35
     ]
    ],
    "area": [
     2,
     35,
     4,
     3
    ],
    "trigger": "調查 TR 紅磚 (5,33) 後，(6,35) 的牆縫可以鑽進去",
    "obstacle": "obj_hd_crates",
    "requires": {
     "flag": "_dlg:D_C01_AUTO_NOTE_T05_5_33"
    },
    "dialog_before": "D_C01_T05_HD_BEFORE",
    "chests": [
     "C_T05_H"
    ]
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_T05_1",
    "x": 60,
    "y": 3,
    "kind": "normal",
    "subject": "社會",
    "level": 2,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T05_2",
    "x": 42,
    "y": 30,
    "kind": "normal",
    "subject": "英語",
    "level": 2,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    }
   },
   {
    "id": "C_T05_3",
    "x": 21,
    "y": 37,
    "kind": "normal",
    "subject": "自然",
    "level": 2,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T05_P",
    "x": 54,
    "y": 33,
    "kind": "prank",
    "subject": null,
    "level": null,
    "reward": {
     "gold": 0,
     "item": null
    },
    "joke": "JOKE_C01_2"
   },
   {
    "id": "C_T05_H",
    "x": 2,
    "y": 35,
    "kind": "hidden",
    "subject": "國語",
    "level": 2,
    "reward": {
     "gold": 0,
     "item": "herb"
    },
    "hidden": "HD_C01_T05_1"
   }
  ],
  "spawns": [
   {
    "monster": "clockbug",
    "count": 3,
    "area": [
     24,
     21,
     18,
     10
    ]
   },
   {
    "monster": "compass",
    "count": 3,
    "area": [
     49,
     2,
     12,
     13
    ]
   }
  ],
  "safe": [
   {
    "x": 35,
    "y": 37
   }
  ],
  "inn": null,
  "shop": {
   "x": 52,
   "y": 19,
   "npc": "c01_snack",
   "shop_id": "c01_snack_wanhua"
  }
 },
 "T06": {
  "name": "圓山・劍潭山步道",
  "type": "field",
  "kind": "field",
  "level": 2,
  "bgm": "forest",
  "battle_bg": "c01_yuanshan",
  "tileset": "field",
  "light": "v1",
  "view": "俯視",
  "real_ref": "劍潭山親山步道（臺北市工務局大地工程處）https://www.geo.gov.taipei/ ；圓山大飯店（國家文化記憶庫）；基隆河（查詢 2026-11-20）。圓山坑道內部為虛構（v2：是否開放參觀查不到，只當地圖靈感）",
  "art_note": "【壓縮】劍潭山步道（圓山大飯店後山北稜）、基隆河河濱、圓山園區東側河畔實際分散在基隆河兩岸約 1–2 公里內；本圖把河畔步道放南緣、步道往北爬到稜線、坑道口放東北。南緣基隆河與河濱自行車道；西邊步道彎彎上山；中間偏西觀機平台（老地方意象，木欄杆、遠方飛機剪影）；北緣山頭露出圓山大飯店紅柱黃瓦屋頂（遠景，不可走）；中間長藤蔓的舊崗哨（不畫軍事標誌與武器）；東北岩壁上的坑道口（鐵柵）；北邊樹林裡藏一個小空地。俯視，光 v1。",
  "grid": [
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TT.T....RRRRRRRRRRRRR.T...T......T.........###########TT",
   "TT......RRRRRRRRRRRRR.T...T..T.............###########TT",
   "TT......RRRRRRRRRRRRRTTTUTT................###########TT",
   "TT...........==T..T.T..................T...###########TT",
   "TT...........==......T.....................#####====##TT",
   "TT.T..T.T....==................T...T...T.T.T...====...TT",
   "TT......T....==.........==....===================..====T",
   "TT.T.........==.........==....================.=========",
   "TT....T.....T==.FFFFFFFF==....==......T.....T..........=",
   "TT..T.T......==.F=========TT..==......................TT",
   "TT.T.........==.F=========....==.........T....T..T....TT",
   "TT...........==.F=========.T..==....HHH..........T....TT",
   "TTTTT........==.FFFF==FF==....==..T.HHHT.............TTT",
   "TT..........T==.....==.T==T...==..T.....T.T...........TT",
   "TT.T...T.....==.....==..==....==..............T.......TT",
   "TT.TT....T...==.....==..==....==......................TT",
   "TT.T........T==.T...==..==.T..==.................T....TT",
   "TT...........==.....==..==...T==....*.................TT",
   "TT..T===========================......................TT",
   "TT...===========================......................TT",
   "TT...==.........T...............T.....................TT",
   "TT...==...............T....TT.........................TT",
   "TT...==.......................T...........*.....T....TTT",
   "TT...==.....*................T........................TT",
   "TTT..==..............................................TTT",
   "TT.T.==T..........*.......T...........................TT",
   "TT...==.....................T....TT...................TT",
   "TT...==T................T.......T...TT.T.T.....T....T.TT",
   "TT...==...............................................TT",
   "=======================================================T",
   "=======================================================T",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  ],
  "start": {
   "x": 1,
   "y": 31
  },
  "arrive_dialogs": [
   "D_C01_NODE_OPEN"
  ],
  "places": [
   {
    "name": "基隆河",
    "x": 0,
    "y": 33,
    "w": 56,
    "h": 7
   },
   {
    "name": "觀機平台",
    "x": 16,
    "y": 10,
    "w": 9,
    "h": 5
   },
   {
    "name": "圓山大飯店（遠景）",
    "x": 8,
    "y": 2,
    "w": 13,
    "h": 3
   },
   {
    "name": "坑道口",
    "x": 43,
    "y": 2,
    "w": 11,
    "h": 6
   }
  ],
  "exits": [
   {
    "x": 0,
    "y": 31,
    "to": "T01",
    "tx": 62,
    "ty": 19,
    "label": "往博覽會會場"
   },
   {
    "x": 0,
    "y": 32,
    "to": "T01",
    "tx": 62,
    "ty": 20,
    "label": "往博覽會會場"
   },
   {
    "x": 48,
    "y": 6,
    "to": "TD1",
    "tx": 28,
    "ty": 39,
    "label": "圓山坑道口"
   },
   {
    "x": 49,
    "y": 6,
    "to": "TD1",
    "tx": 29,
    "ty": 39,
    "label": "圓山坑道口"
   },
   {
    "x": 55,
    "y": 9,
    "to": "T01",
    "tx": 62,
    "ty": 9,
    "label": "後山小徑（捷徑）"
   },
   {
    "x": 55,
    "y": 10,
    "to": "T01",
    "tx": 62,
    "ty": 10,
    "label": "後山小徑（捷徑）"
   },
   {
    "x": 50,
    "y": 6,
    "to": "TD1",
    "tx": 54,
    "ty": 20,
    "label": "東側鐵門（捷徑，坑道裡的拉桿拉過才打得開）",
    "requires": {
     "flag": "PZ_C01_LEVER_E"
    },
    "locked_dialog": "D_C01_TD1_EASTDOOR_LOCKED"
   },
   {
    "x": 51,
    "y": 6,
    "to": "TD1",
    "tx": 54,
    "ty": 21,
    "label": "東側鐵門（捷徑）",
    "requires": {
     "flag": "PZ_C01_LEVER_E"
    },
    "locked_dialog": "D_C01_TD1_EASTDOOR_LOCKED"
   }
  ],
  "npcs": [
   {
    "id": "c01_patrol",
    "x": 46,
    "y": 9,
    "sprite": "npc_c01_patrol",
    "dialog": "D_C01_PATROL_IDLE",
    "quest": "Q4_C01_M5",
    "quests": [
     "Q4_C01_M5"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_PATROL_IDLE_END"
    }
   },
   {
    "id": "c01_runner",
    "x": 30,
    "y": 30,
    "sprite": "npc_c01_runner",
    "dialog": "D_C01_RUNNER_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_RUNNER_IDLE_END"
    }
   }
  ],
  "notes": [
   {
    "x": 20,
    "y": 9,
    "label": "老地方觀機平台",
    "kind": "landmark",
    "card": "D_C01_CARD_JIANTAN",
    "dialog": "D_C01_CARD_JIANTAN"
   },
   {
    "x": 13,
    "y": 6,
    "label": "圓山大飯店（遠景）",
    "kind": "landmark",
    "card": "D_C01_CARD_GRANDHOTEL",
    "dialog": "D_C01_CARD_GRANDHOTEL"
   },
   {
    "x": 25,
    "y": 30,
    "label": "基隆河",
    "kind": "landmark",
    "card": "D_C01_CARD_KEELUNG_RIVER",
    "dialog": "D_C01_CARD_KEELUNG_RIVER"
   },
   {
    "x": 37,
    "y": 15,
    "label": "舊崗哨",
    "kind": "investigate",
    "dialog": "D_C01_AUTO_NOTE_T06_37_15"
   }
  ],
  "gates": [
   {
    "x": 48,
    "y": 7,
    "label": "坑道口鐵柵（雙扇，接下 M5 時打開）",
    "kind": "bars",
    "quest": "Q4_C01_M5",
    "open": {
     "any": [
      {
       "active": "Q4_C01_M5"
      },
      "Q4_C01_M5"
     ]
    },
    "dialog": "D_C01_AUTO_GATE_T06_48_7"
   },
   {
    "x": 49,
    "y": 7,
    "label": "坑道口鐵柵（雙扇）",
    "kind": "bars",
    "quest": "Q4_C01_M5",
    "open": {
     "any": [
      {
       "active": "Q4_C01_M5"
      },
      "Q4_C01_M5"
     ]
    },
    "dialog": "D_C01_AUTO_GATE_T06_49_7"
   },
   {
    "x": 54,
    "y": 9,
    "label": "後山小徑木柵門（捷徑，雙扇）",
    "kind": "fence",
    "quest": "Q4_C01_S1",
    "dialog": "D_C01_AUTO_GATE_T06_54_9"
   },
   {
    "x": 54,
    "y": 10,
    "label": "後山小徑木柵門（捷徑，雙扇）",
    "kind": "fence",
    "quest": "Q4_C01_S1",
    "dialog": "D_C01_AUTO_GATE_T06_54_10"
   }
  ],
  "hidden": [
   {
    "id": "HD_C01_T06_1",
    "name": "劍潭山北坡樹林小空地",
    "at": {
     "x": 24,
     "y": 4
    },
    "cells": [
     [
      24,
      4
     ]
    ],
    "area": [
     23,
     2,
     3,
     2
    ],
    "trigger": "調查 (24,7) 樹叢（U 格 24,4–6）",
    "obstacle": "obj_hd_bush",
    "chests": [
     "C_T06_H"
    ]
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_T06_1",
    "x": 3,
    "y": 22,
    "kind": "normal",
    "subject": "數學",
    "level": 2,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    }
   },
   {
    "id": "C_T06_2",
    "x": 52,
    "y": 28,
    "kind": "normal",
    "subject": "社會",
    "level": 3,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T06_H",
    "x": 23,
    "y": 2,
    "kind": "hidden",
    "subject": "自然",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "herb"
    },
    "hidden": "HD_C01_T06_1"
   }
  ],
  "spawns": [
   {
    "monster": "compass",
    "count": 3,
    "area": [
     8,
     23,
     14,
     7
    ]
   },
   {
    "monster": "steam",
    "count": 3,
    "area": [
     33,
     16,
     13,
     12
    ]
   }
  ],
  "safe": [
   {
    "x": 1,
    "y": 31
   }
  ],
  "inn": null,
  "shop": null
 },
 "T07": {
  "name": "大稻埕（日治時期）",
  "type": "town",
  "kind": "town",
  "level": 3,
  "bgm": "village",
  "battle_bg": "c01_dadaocheng_day",
  "tileset": "field",
  "light": "v2",
  "view": "正面街屋立面",
  "ground": "石板／泥土路面與空地（不是草地）",
  "light_baked": true,
  "real_ref": "臺北霞海城隍廟（內政部臺灣宗教文化地圖）https://taiwangods.moi.gov.tw/html/cultural/3_0011.aspx?i=58 ；永樂町市場（國家文化記憶庫，臺北市立文獻館典藏）https://tcmb.culture.tw/zh-tw/detail?indexCode=MOCCOLLECTIONS&id=144000010032 ；永樂町通 1931（國家圖書館臺灣記憶）https://tm.ncl.edu.tw/article?u=005_001_0000358919 ；迪化街（交通部觀光署）（查詢 2026-11-20）",
  "art_note": "日治時期（約 1930 年前後）的大稻埕永樂町，時光機關帶來的特殊事件場景，光 v2 黃昏暖光。**本圖的「.」一律是石板或夯土路面、院子空地，不是草地；整張圖沒有草皮。**【壓縮】霞海城隍廟、永樂市場、迪化街南街中街實際都在迪化街一段北段 300 公尺內，相對位置大致正確；茶行曬茶埕是大稻埕茶行的意象，實際散在各街。密集街區：中間東西向主街（迪化街意象，5 格寬，石板路）＋北側亭仔腳；北排連棟街屋立面（亭仔腳方柱重複、山牆頂端裝飾、漢字布旗與木招牌；不寫日文標語、不畫國旗與政治標語），北排後面再一進屋頂；北排中間偏東是很小的霞海城隍廟（正面拜亭＋屋脊輪廓，比街屋矮，不畫神像）；東邊永樂市場（木構大棚＋屋頂高窗，可進 TI4；畫前先看文獻館典藏照片）。主街南側兩排街屋，用三條、兩條 2 格寬的巷子接兩條後巷；後巷 2 南邊是晒布場（竹竿架掛布）、小孩跳格子的院子、一排背對後巷的街屋、茶行曬茶埕（竹篩一排排）。北排西段兩間街屋之間的窄縫通到隱藏後院。西緣主街接大稻埕碼頭。",
  "grid": [
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR.......RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR.......RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRTT",
   "TTHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHTT",
   "TTHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHTT",
   "TTHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHTT",
   "TTHHDHHHHHDHHHHHDHHHUUHHDHHHHDHHHHHDDHHHHHDHHHHHHHHHHHH==HHHHHHHHHHDHHTT",
   "TT====================================================================TT",
   "======================================================================TT",
   "======================================================================TT",
   "======================================================================TT",
   "======================================================================TT",
   "==HHHHHHHHHH==HHHHHHHHHHHHHHHHHHHH=HHHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHTT",
   "TTRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRR=HRRRRRRRRRRRRRRRRRRRR=HRRRRRRRRRRRRTT",
   "TTRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRR=HRRRRRRRRRRRRRRRRRRRR=HRRRRRRRRRRRRTT",
   "TTRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRR=HRRRRRRRRRRRRRRRRRRRR=HRRRRRRRRRRRRTT",
   "TTHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHH=HHHHHHHHHHHHHHHHHHHHH=HHHHHHHHHHHHHTT",
   "TTHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHH=HHHHHHHHHHHHHHHHHHHHH=HHHHHHHHHHHHHTT",
   "TTHHHHDHHHHH==HHHDHHHHHHHDHHHHDHHH=HHHHHDHHHHHHHHHDHHHHH=HHHHHDHHHDHHHTT",
   "TT====================================================================TT",
   "TT====================================================================TT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRTT",
   "TTRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRRR==RRRRRRRRRRRRRRRRRRRRRRTT",
   "TTHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHHHHTT",
   "TTHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHHHHHH==HHHHHHHHHHHHHHHHHHHHHHTT",
   "TTHHHDHHHHHHHHDHHHHH==HHHHDHHHHHDHHHHHHHDHHHHH==HHHHDHHHHHHHDHHHHHDHHHTT",
   "TT====================================================================TT",
   "TT====================================================================TT",
   "TTFFFFFF==FFFFFFFFFFFF==FFFFFFFRRRRRRRRRRRRR=FFFFF==FFFFFFFFFF==FFFFFFTT",
   "TT..............F.............FRRRRRRRRRRRRR%%%%%%%%%%%%%%%%%%%%%%%%%%TT",
   "TT..............F.............FRRRRRRRRRRRRR%%%*%%%*%%%*%%%*%%%*%%%*%%TT",
   "TT..KK.KK.KK.KK.F.............FRRRRRRRRRRRRR%%%%%%%%%%%%%%%%%%%%%%%%%%TT",
   "TT..............F.............FHHHHHHHHHHHHH%%%%%%%%%%%%%%%%%%%%%%%%%%TT",
   "TT..............F.............FHHHHHHHHHHHHH%%%*%%%*%%%*%%%*%%%*%%%*%%TT",
   "TT..............F.............FHHHHHHHHHHHHH%%%%%%%%%%%%%%%%%%%%%%%%%%TT",
   "TT..............F.............FHHHHHHHHHHHHH%%%%%%%%%%%%%%%%%%%%%%%%%%TT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
  ],
  "start": {
   "x": 1,
   "y": 20
  },
  "arrive_dialogs": [
   "D_C01_NODE_OPEN"
  ],
  "places": [
   {
    "name": "迪化街（主街）",
    "x": 0,
    "y": 16,
    "w": 70,
    "h": 6
   },
   {
    "name": "霞海城隍廟",
    "x": 33,
    "y": 11,
    "w": 6,
    "h": 5
   },
   {
    "name": "永樂市場",
    "x": 47,
    "y": 8,
    "w": 18,
    "h": 8
   },
   {
    "name": "後巷 1",
    "x": 2,
    "y": 28,
    "w": 68,
    "h": 2
   },
   {
    "name": "後巷 2",
    "x": 2,
    "y": 36,
    "w": 68,
    "h": 2
   },
   {
    "name": "晒布場",
    "x": 2,
    "y": 38,
    "w": 14,
    "h": 8
   },
   {
    "name": "院子",
    "x": 17,
    "y": 38,
    "w": 13,
    "h": 8
   },
   {
    "name": "茶行曬茶埕",
    "x": 45,
    "y": 38,
    "w": 25,
    "h": 8
   },
   {
    "name": "街屋後院（隱藏）",
    "x": 20,
    "y": 3,
    "w": 8,
    "h": 5
   }
  ],
  "exits": [
   {
    "x": 0,
    "y": 20,
    "to": "T08",
    "tx": 54,
    "ty": 20,
    "label": "往大稻埕碼頭（T08 夜景 v3）"
   },
   {
    "x": 0,
    "y": 21,
    "to": "T08",
    "tx": 54,
    "ty": 21,
    "label": "往大稻埕碼頭（T08 夜景 v3）"
   },
   {
    "x": 55,
    "y": 15,
    "to": "TI4",
    "tx": 15,
    "ty": 18,
    "label": "永樂市場"
   },
   {
    "x": 56,
    "y": 15,
    "to": "TI4",
    "tx": 16,
    "ty": 18,
    "label": "永樂市場"
   }
  ],
  "npcs": [
   {
    "id": "c01_old_kid",
    "x": 20,
    "y": 19,
    "sprite": "npc_c01_old_kid",
    "dialog": "D_C01_OLDKID_IDLE",
    "quest": "Q4_C01_S6",
    "quests": [
     "Q4_C01_S6"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_OLDKID_IDLE_END"
    }
   },
   {
    "id": "c01_ddc_inn",
    "x": 15,
    "y": 36,
    "sprite": "npc_c01_ddc_inn",
    "dialog": "D_C01_DDCINN_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_DDCINN_IDLE_END"
    }
   },
   {
    "id": "c01_mob_t07a",
    "x": 54,
    "y": 41,
    "sprite": "npc_c01_cloth_aunt",
    "dialog": "D_C01_MOB_T07A",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T07A_END"
    }
   },
   {
    "id": "c01_mob_t07b",
    "x": 42,
    "y": 18,
    "sprite": "npc_c01_porter",
    "dialog": "D_C01_MOB_T07B",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T07B_END"
    }
   },
   {
    "id": "c01_mob_t07c",
    "x": 30,
    "y": 20,
    "sprite": "npc_c01_boatman",
    "dialog": "D_C01_MOB_T07C",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T07C_END"
    }
   },
   {
    "id": "c01_mob_t07d",
    "x": 64,
    "y": 19,
    "sprite": "npc_c01_porter",
    "dialog": "D_C01_MOB_T07D",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T07D_END"
    }
   },
   {
    "id": "c01_mob_t07e",
    "x": 8,
    "y": 28,
    "sprite": "npc_c01_boatman",
    "dialog": "D_C01_MOB_T07E",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T07E_END"
    }
   },
   {
    "id": "c01_mob_t07f",
    "x": 24,
    "y": 41,
    "sprite": "npc_c01_old_kid",
    "dialog": "D_C01_MOB_T07F",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T07F_END"
    }
   }
  ],
  "notes": [
   {
    "x": 37,
    "y": 16,
    "label": "霞海城隍廟（只看外觀）",
    "kind": "landmark",
    "card": "D_C01_CARD_XIAHAI",
    "dialog": "D_C01_CARD_XIAHAI"
   },
   {
    "x": 52,
    "y": 16,
    "label": "永樂市場（永樂町市場）",
    "kind": "landmark",
    "card": "D_C01_CARD_YONGLE",
    "dialog": "D_C01_CARD_YONGLE"
   },
   {
    "x": 12,
    "y": 16,
    "label": "迪化街的街屋與亭仔腳",
    "kind": "landmark",
    "card": "D_C01_CARD_DDC_TRADE",
    "dialog": "D_C01_CARD_DDC_TRADE"
   },
   {
    "x": 47,
    "y": 39,
    "label": "茶行曬茶埕",
    "kind": "investigate",
    "dialog": "D_C01_AUTO_NOTE_T07_47_39"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_T07_1",
    "name": "街屋後院",
    "at": {
     "x": 20,
     "y": 15
    },
    "cells": [
     [
      20,
      15
     ],
     [
      21,
      15
     ]
    ],
    "area": [
     20,
     3,
     8,
     5
    ],
    "trigger": "調查北排西段兩間街屋之間的窄縫 (20–21,15)（U 格 x20–21, y8–15）",
    "obstacle": "obj_hd_crates",
    "chests": [
     "C_T07_H"
    ]
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_T07_1",
    "x": 66,
    "y": 44,
    "kind": "normal",
    "subject": "數學",
    "level": 3,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_T07_2",
    "x": 3,
    "y": 44,
    "kind": "normal",
    "subject": "社會",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_almond"
    }
   },
   {
    "id": "C_T07_P",
    "x": 68,
    "y": 39,
    "kind": "prank",
    "subject": null,
    "level": null,
    "reward": {
     "gold": 0,
     "item": null
    },
    "joke": "JOKE_C01_3"
   },
   {
    "id": "C_T07_H",
    "x": 26,
    "y": 4,
    "kind": "hidden",
    "subject": "英語",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    },
    "hidden": "HD_C01_T07_1"
   }
  ],
  "spawns": [],
  "safe": [
   {
    "x": 1,
    "y": 20
   }
  ],
  "inn": {
   "x": 15,
   "y": 36,
   "npc": "c01_ddc_inn",
   "name": "大稻埕旅社",
   "price": 5
  },
  "shop": null
 },
 "T08": {
  "name": "大稻埕碼頭（日治時期）",
  "type": "field",
  "kind": "field",
  "level": 3,
  "bgm": "village",
  "battle_bg": "c01_pier_night",
  "tileset": "field",
  "light": "v3",
  "view": "俯視",
  "ground": "夯土與石板的碼頭空地（不是草地）",
  "real_ref": "臺北市政府「臺北歷史概述」https://www.gov.taipei/cp.aspx?n=14D2637CBC4AAEC2&s=E0ACC486E3DA0A8C ；淡水河大稻埕河岸 1931（國家圖書館臺灣記憶）https://tm.ncl.edu.tw/article?u=005_001_0000358758 （查詢 2026-11-20）",
  "art_note": "日治時期大稻埕碼頭，怪盜頭目戰，光 v3 夜晚燈籠（整張都是夜晚；從 T07 黃昏的街走過來就換成夜景，劇情台詞不提「天快黑了」）。**本圖的「.」是夯土與石板的碼頭空地，不是草地。**【壓縮】碼頭實際在淡水河東岸，與迪化街相隔一兩條街；本圖把碼頭放西、往永樂町的路放東。西半邊淡水河（雙槳船、帆船、渡船，參考 1931 年照片的關鍵詞），石砌河岸＋伸進河裡的木棧碼頭，碼頭上一根旗桿（只掛空白布旗；怪盜斗篷最後卡在上面）；岸上兩棟茶行倉庫（紅瓦、木門）與成堆貨箱；倉庫 2 東側夾縫是隱藏區。燈籠沿河岸一排。不畫國旗、不寫日文標語。",
  "grid": [
   "~~~~~~~~~~~~~~~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "~~~~~~~~~~~~~~~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRR.....*...........TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRR..............*..TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRR........*........TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRR.................TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRR.................TT",
   "~~~~~~~~K~~~~~~~~~====...KHHHHHHHHHHHK..........*.....TT",
   "~~~~~~~~~~~~~~~~~~====....HHHHHDHHHHH...*.............TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====......................*.........TT",
   "~~~~~~~~~~~~~~~~~~====............................*...TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~BKBBBB====................................TT",
   "~~~~~~~~~~~~BBBBBB====................................TT",
   "~~~~~~~~~~~~BBBBBB======================================",
   "~~~~~~~~~~~~BBBBBB======================================",
   "~~~~~~~~~~~~BBBBBB======================================",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRRHHHH.............TT",
   "~~~~~~K~~~~~~~~~~~====....RRRRRRRRRRRH..H.............TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRRH..H.............TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRRH..H.............TT",
   "~~~~~~~~~~~~~~~~~~====....RRRRRRRRRRRH..H.............TT",
   "~~~~~~~~~~K~~~~~~~====...KHHHHHHHHHHHH..H.............TT",
   "~~~~~~~~~~~~~~~~~~====....HHHHHDHHHHHHUHH.............TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~====................................TT",
   "~~~~~~~~~~~~~~~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
   "~~~~~~~~~~~~~~~~~~TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"
  ],
  "start": {
   "x": 20,
   "y": 36
  },
  "places": [
   {
    "name": "淡水河",
    "x": 0,
    "y": 0,
    "w": 18,
    "h": 40
   },
   {
    "name": "木棧碼頭",
    "x": 12,
    "y": 17,
    "w": 6,
    "h": 5
   },
   {
    "name": "茶行倉庫",
    "x": 26,
    "y": 4,
    "w": 11,
    "h": 7
   },
   {
    "name": "貨箱區",
    "x": 40,
    "y": 3,
    "w": 13,
    "h": 13
   }
  ],
  "exits": [
   {
    "x": 55,
    "y": 20,
    "to": "T07",
    "tx": 1,
    "ty": 20,
    "label": "往永樂町（T07 黃昏 v2）"
   },
   {
    "x": 55,
    "y": 21,
    "to": "T07",
    "tx": 1,
    "ty": 21,
    "label": "往永樂町（T07 黃昏 v2）"
   }
  ],
  "npcs": [
   {
    "id": "c01_boatman",
    "x": 20,
    "y": 30,
    "sprite": "npc_c01_boatman",
    "dialog": "D_C01_BOAT_IDLE",
    "quest": "Q4_C01_M6",
    "quests": [
     "Q4_C01_M6"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_BOAT_IDLE_END"
    }
   },
   {
    "id": "c01_porter",
    "x": 24,
    "y": 14,
    "sprite": "npc_c01_porter",
    "dialog": "D_C01_PORTER_IDLE",
    "quest": "Q4_C01_S4",
    "quests": [
     "Q4_C01_S4"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_PORTER_IDLE_END"
    }
   },
   {
    "id": "c01_mob_t08a",
    "x": 34,
    "y": 23,
    "sprite": "npc_c01_cloth_aunt",
    "dialog": "D_C01_MOB_T08A",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_MOB_T08A_END"
    }
   }
  ],
  "notes": [
   {
    "x": 21,
    "y": 24,
    "label": "大稻埕碼頭",
    "kind": "landmark",
    "card": "D_C01_CARD_DDC_PIER",
    "dialog": "D_C01_CARD_DDC_PIER"
   },
   {
    "x": 21,
    "y": 8,
    "label": "淡水河",
    "kind": "landmark",
    "card": "D_C01_CARD_TAMSUI_RIVER",
    "dialog": "D_C01_CARD_TAMSUI_RIVER"
   },
   {
    "x": 30,
    "y": 11,
    "label": "茶行倉庫",
    "kind": "landmark",
    "card": "D_C01_CARD_TEA_SHIP",
    "dialog": "D_C01_CARD_TEA_SHIP"
   },
   {
    "x": 18,
    "y": 16,
    "label": "碼頭旗桿",
    "kind": "investigate",
    "dialog": "D_C01_AUTO_NOTE_T08_18_16",
    "dialog_after": {
     "when": "Q4_C01_M6",
     "dialog": "D_C01_FLAGPOLE_END"
    }
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_T08_1",
    "name": "茶行倉庫後的夾縫",
    "at": {
     "x": 38,
     "y": 32
    },
    "cells": [
     [
      38,
      32
     ]
    ],
    "area": [
     38,
     27,
     2,
     5
    ],
    "trigger": "調查 (38,34) 貨箱旁的木板縫（U 格 38,33）",
    "obstacle": "obj_hd_crates",
    "chests": [
     "C_T08_H"
    ]
   }
  ],
  "rests": [],
  "events": [
   {
    "id": "EV_T08_BACK",
    "type": "warp",
    "x": 22,
    "y": 37,
    "requires": {
     "any": [
      "Q4_C01_M6",
      {
       "boss": "b01_bengbeng"
      }
     ]
    },
    "to": "TI1",
    "tx": 15,
    "ty": 17,
    "label": "時光機關光圈（回現代 → TI1 (15,17)；Q4_C01_M6 完成後才出現）"
   }
  ],
  "chests": [
   {
    "id": "C_T08_1",
    "x": 52,
    "y": 36,
    "kind": "normal",
    "subject": "國語",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "herb"
    }
   },
   {
    "id": "C_T08_H",
    "x": 38,
    "y": 27,
    "kind": "hidden",
    "subject": "數學",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_almond"
    },
    "hidden": "HD_C01_T08_1"
   }
  ],
  "spawns": [
   {
    "monster": "clockbug",
    "count": 2,
    "area": [
     40,
     3,
     13,
     13
    ]
   },
   {
    "monster": "b01_appraiser",
    "count": 1,
    "area": [
     15,
     19,
     1,
     1
    ],
    "boss": true,
    "at": {
     "x": 15,
     "y": 19
    },
    "respawn": "never",
    "quest": "Q4_C01_M6",
    "requires": {
     "flag": "_dlg:D_C01_CLOTH_CLUE"
    },
    "chain": [
     "b01_bengbeng"
    ]
   }
  ],
  "safe": [
   {
    "x": 20,
    "y": 36
   }
  ],
  "inn": null,
  "shop": null
 },
 "TI1": {
  "name": "故宮展場（虛構化）",
  "type": "town",
  "kind": "interior",
  "level": 1,
  "bgm": "town",
  "battle_bg": "c01_museum",
  "tileset": "field",
  "light": "v1",
  "view": "正面",
  "real_ref": "國立故宮博物院 翠玉白菜（清，玉石；菜葉上大螽斯與小蝗蟲）https://south.npm.gov.tw/SelectionsDetailC004100.aspx?Cond=5ba8270a-cc14-4142-9dde-2158f0855633 （查詢 2026-11-20）。展場配置為虛構",
  "art_note": "虛構化展場（劇情大綱禁忌：不畫真實展櫃配置、不畫真實人員）。暗色牆、聚光燈；中央一座玻璃展櫃，開場後是空的＋一張發藍光的借條；兩側壁櫃與小展櫃畫成概括的玉器、瓷器剪影；西牆展板後面有一個小角落（隱藏區，放隱藏知識卡）。光 v1（室內打清晨柔光感的冷白光）。",
  "grid": [
   "################################",
   "################################",
   "################################",
   "#ccKKcccKKcccccccccccccKKcccKKc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccKKccccccccccccccc#",
   "#cccccccccccccKKKKccccccccccccc#",
   "#cccccccccccccKKKKccccccccccccc#",
   "#cccKKccccccccccccccccccccKKccc#",
   "#cccKKccccccccccccccccccccKKccc#",
   "#cccKKccccccccccccccccccccKKccc#",
   "####ccccccccccccccccccccccccccc#",
   "#ccUccccccccccccccccccccccccccc#",
   "####ccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#ccccccccccccc====ccccccccccccc#",
   "##############====##############",
   "##############====##############"
  ],
  "start": {
   "x": 15,
   "y": 18
  },
  "arrive_dialogs": [
   "D_C01_NPM_ARRIVE"
  ],
  "places": [
   {
    "name": "翠玉白菜展櫃",
    "x": 14,
    "y": 7,
    "w": 4,
    "h": 2
   }
  ],
  "exits": [
   {
    "x": 15,
    "y": 19,
    "to": "T04",
    "tx": 19,
    "ty": 9
   },
   {
    "x": 16,
    "y": 19,
    "to": "T04",
    "tx": 20,
    "ty": 9
   }
  ],
  "npcs": [
   {
    "id": "director",
    "x": 12,
    "y": 12,
    "sprite": "npc_director",
    "dialog": "D_DIRECTOR_IDLE",
    "quest": "Q4_C01_M1",
    "quests": [
     "Q4_C01_M1",
     "Q4_C01_M2"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_DIRECTOR_IDLE_END"
    }
   },
   {
    "id": "c01_npm_volunteer",
    "x": 20,
    "y": 12,
    "sprite": "npc_c01_npm_volunteer",
    "dialog": "D_C01_WIT1",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_VOL_IDLE_END"
    }
   },
   {
    "id": "c01_appraiser",
    "x": 15,
    "y": 9,
    "sprite": "npc_c01_appraiser",
    "dialog": "D_C01_THEFT",
    "quest": null,
    "quests": [],
    "show": {
     "not": {
      "flag": "_dlg:D_C01_THEFT"
     }
    }
   }
  ],
  "triggers": [
   {
    "id": "TR_C01_THEFT",
    "area": [
     12,
     9,
     7,
     3
    ],
    "dialog": "D_C01_THEFT",
    "requires": {
     "not": {
      "flag": "_dlg:D_C01_THEFT"
     }
    }
   }
  ],
  "notes": [
   {
    "x": 13,
    "y": 9,
    "label": "翠玉白菜展櫃（空）",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI1_13_9"
   },
   {
    "x": 10,
    "y": 4,
    "label": "文物導覽牌",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI1_10_4"
   },
   {
    "x": 25,
    "y": 13,
    "label": "互動展區",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI1_25_13"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_TI1_1",
    "name": "展板後的小角落",
    "at": {
     "x": 3,
     "y": 13
    },
    "cells": [
     [
      3,
      13
     ]
    ],
    "area": [
     1,
     13,
     2,
     1
    ],
    "trigger": "調查 (4,13) 展板邊緣",
    "obstacle": "obj_hd_panel",
    "content": "隱藏知識卡：翠玉白菜上的螽斯",
    "dialog": "D_C01_CARD_HID_KATYDID",
    "card": "D_C01_CARD_HID_KATYDID",
    "dialog_again": "D_C01_CARD_HID_KATYDID",
    "chests": []
   }
  ],
  "rests": [],
  "events": [
   {
    "id": "EV_TI1_TIME_AGAIN",
    "type": "talk",
    "npc": "director",
    "menu_label": "再坐一次時光機關",
    "dialog": "D_C01_TIME_AGAIN",
    "requires": "Q4_C01_M6",
    "to": "T08",
    "tx": 20,
    "ty": 36,
    "label": "破關後和陳館長說話：「再坐一次時光機關」→ T08 (20,36)（劇情 C1-3）"
   }
  ],
  "chests": [
   {
    "id": "C_TI1_1",
    "x": 29,
    "y": 15,
    "kind": "normal",
    "subject": "社會",
    "level": 1,
    "reward": {
     "gold": 0,
     "item": "c01_ticket"
    }
   }
  ],
  "spawns": [],
  "safe": [
   {
    "x": 15,
    "y": 18
   }
  ],
  "inn": null,
  "shop": null
 },
 "TI2": {
  "name": "天文館展示廳・宇宙劇場",
  "type": "town",
  "kind": "interior",
  "level": 1,
  "bgm": "town",
  "battle_bg": "c01_museum",
  "tileset": "field",
  "light": "v1",
  "view": "正面",
  "real_ref": "臺北市立天文科學教育館（宇宙劇場可容納 300 人）https://www.tam.gov.taipei/ （查詢 2026-11-20）",
  "art_note": "【壓縮】展示廳與宇宙劇場實際在不同樓層，合成一間。北牆一排行星模型、東北望遠鏡模型、中央星象投影機（星星齒輪裝回去後天花板出現發光海鷗形狀），南邊兩排座椅；東南黑色布幕後面是小角落（隱藏區）。光 v1。",
  "grid": [
   "################################",
   "################################",
   "################################",
   "#cccccKcKcKcccccccccccccccccccc#",
   "#cccKcKcKcKccccccccccccccKKcccc#",
   "#ccccccccccccccccccccccccKKcccc#",
   "#ccccccccccccccKKcccccccccccccc#",
   "#ccccccccccccccKKcccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccKKKKKKKKccccKKKKKKKKccccc#",
   "#ccccccccccccccccccccccccccc####",
   "#cccccKKKKKKKKccccKKKKKKKKcc#cc#",
   "#cccccccccccccccccccccccccccUcc#",
   "#ccccccccccccccccccccccccccc####",
   "#cccccccccccccccccccccccccccccc#",
   "#ccccccccccccc====ccccccccccccc#",
   "##############====##############",
   "##############====##############"
  ],
  "start": {
   "x": 15,
   "y": 18
  },
  "places": [
   {
    "name": "星象投影機",
    "x": 15,
    "y": 6,
    "w": 2,
    "h": 2
   }
  ],
  "exits": [
   {
    "x": 15,
    "y": 19,
    "to": "T04",
    "tx": 57,
    "ty": 39
   },
   {
    "x": 16,
    "y": 19,
    "to": "T04",
    "tx": 58,
    "ty": 39
   }
  ],
  "npcs": [
   {
    "id": "c01_tam_guide",
    "x": 18,
    "y": 7,
    "sprite": "npc_c01_tam_guide",
    "dialog": "D_C01_TAM_IDLE",
    "quest": "Q4_C01_M3",
    "quests": [
     "Q4_C01_M3"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_TAM_IDLE_END"
    }
   }
  ],
  "notes": [
   {
    "x": 14,
    "y": 8,
    "label": "星象投影機",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI2_14_8"
   },
   {
    "x": 12,
    "y": 5,
    "label": "行星展示",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI2_12_5"
   },
   {
    "x": 24,
    "y": 6,
    "label": "天文望遠鏡模型",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI2_24_6"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_TI2_1",
    "name": "布幕後的小角落",
    "at": {
     "x": 28,
     "y": 14
    },
    "cells": [
     [
      28,
      14
     ]
    ],
    "area": [
     29,
     13,
     2,
     2
    ],
    "trigger": "調查 (27,14) 布幕",
    "obstacle": "obj_hd_curtain",
    "content": "隱藏知識卡：圓山天文臺（1963–2000）",
    "dialog": "D_C01_CARD_HID_OBSERVATORY",
    "card": "D_C01_CARD_HID_OBSERVATORY",
    "dialog_again": "D_C01_CARD_HID_OBSERVATORY",
    "chests": []
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_TI2_1",
    "x": 2,
    "y": 15,
    "kind": "normal",
    "subject": "自然",
    "level": 1,
    "reward": {
     "gold": 0,
     "item": "c01_ticket"
    }
   }
  ],
  "spawns": [],
  "safe": [
   {
    "x": 15,
    "y": 18
   }
  ],
  "inn": null,
  "shop": null
 },
 "TI3": {
  "name": "剝皮寮老店",
  "type": "town",
  "kind": "interior",
  "level": 2,
  "bgm": "town",
  "battle_bg": "c01_museum",
  "tileset": "field",
  "light": "v1",
  "view": "正面",
  "real_ref": "剝皮寮歷史街區（清代狹長街屋，前店後居）https://www.bopiliao.taipei/About/Story （查詢 2026-11-20）。店面為虛構",
  "art_note": "虛構老店（不寫真實店名）：狹長街屋內部，紅磚牆、木樑；西邊老碗攤（一排舊碗盤）、東邊老藥鋪木櫃（小抽屜一格格）、東北牆上老照片；東南後頭小倉庫（隱藏區）。光 v1。",
  "grid": [
   "########################",
   "########################",
   "########################",
   "#ccccccccccccccccccKKKc#",
   "#cccKKKKKKcccccKKKccccc#",
   "#cccKKKKKKccccKKKKKKccc#",
   "#cccccccccccccccccccccc#",
   "#cccccccccccccccccccccc#",
   "#cccccccccccccccccccccc#",
   "#cccccccccccccccccccccc#",
   "#cKKKccccccccccccccKKKc#",
   "#cKKKccccccccccccccKKKc#",
   "#cccccccccccccccccccccc#",
   "#ccccccccccccccccccc####",
   "#cccccccccccccccccccUcc#",
   "#ccccccccccccccccccc####",
   "#cccccccccccccccccccccc#",
   "#ccccccccc====ccccccccc#",
   "##########====##########",
   "##########====##########"
  ],
  "start": {
   "x": 11,
   "y": 18
  },
  "places": [
   {
    "name": "老碗攤",
    "x": 4,
    "y": 5,
    "w": 6,
    "h": 1
   },
   {
    "name": "老藥鋪櫃",
    "x": 14,
    "y": 5,
    "w": 6,
    "h": 1
   }
  ],
  "exits": [
   {
    "x": 11,
    "y": 19,
    "to": "T05",
    "tx": 12,
    "ty": 32
   },
   {
    "x": 12,
    "y": 19,
    "to": "T05",
    "tx": 13,
    "ty": 32
   }
  ],
  "npcs": [
   {
    "id": "c01_bpl_uncle",
    "x": 7,
    "y": 7,
    "sprite": "npc_c01_bpl_uncle",
    "dialog": "D_C01_WIT2",
    "quest": "Q4_C01_S5",
    "quests": [
     "Q4_C01_S5"
    ],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_UNCLE_IDLE_END"
    }
   }
  ],
  "notes": [
   {
    "x": 4,
    "y": 7,
    "label": "老碗攤",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI3_4_7"
   },
   {
    "x": 16,
    "y": 7,
    "label": "老藥鋪櫃",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI3_16_7"
   },
   {
    "x": 18,
    "y": 4,
    "label": "老照片牆",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI3_18_4"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_TI3_1",
    "name": "後頭小倉庫",
    "at": {
     "x": 20,
     "y": 14
    },
    "cells": [
     [
      20,
      14
     ]
    ],
    "area": [
     21,
     14,
     2,
     1
    ],
    "trigger": "調查 (19,14) 的竹簾",
    "obstacle": "obj_hd_blind",
    "content": "隱藏知識卡：TR 紅磚",
    "dialog": "D_C01_CARD_HID_TRBRICK",
    "card": "D_C01_CARD_HID_TRBRICK",
    "dialog_again": "D_C01_CARD_HID_TRBRICK",
    "chests": []
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_TI3_1",
    "x": 2,
    "y": 4,
    "kind": "normal",
    "subject": "數學",
    "level": 2,
    "reward": {
     "gold": 0,
     "item": "c01_ticket"
    }
   }
  ],
  "spawns": [],
  "safe": [
   {
    "x": 11,
    "y": 18
   }
  ],
  "inn": null,
  "shop": null
 },
 "TI4": {
  "name": "永樂市場（日治時期）",
  "type": "town",
  "kind": "interior",
  "level": 3,
  "bgm": "village",
  "battle_bg": "c01_museum",
  "tileset": "field",
  "light": "v2",
  "view": "正面",
  "real_ref": "永樂町市場（1908 年改設於大稻埕蘆竹腳街，1933 年改名永樂町市場）國家文化記憶庫 https://tcmb.culture.tw/zh-tw/detail?indexCode=MOCCOLLECTIONS&id=144000010032 （查詢 2026-11-20）",
  "art_note": "日治時期市場內部：木構屋架、中央天窗灑下黃昏光（v2）；四組攤位（布攤、南北貨、青菜、魚乾，概括畫）；西南堆布匹的角落後面是小隔間（隱藏區）。人物穿著照 1930 年前後的一般常民服裝，不畫制服、警察。",
  "grid": [
   "################################",
   "################################",
   "################################",
   "#cccccccccccccKKKKccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#ccKKKcccKKKccccccccKKKcccKKKcc#",
   "#ccKKKcccKKKccccccccKKKcccKKKcc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#ccKKKcccKKKccccccccKKKcccKKKcc#",
   "#ccKKKcccKKKccccccccKKKcccKKKcc#",
   "#cccccccccccccccccccccccccccccc#",
   "####ccccccccccccccccccccccccccc#",
   "#ccUccccccccccccccccccccccccccc#",
   "####ccccccccccccccccccccccccccc#",
   "#cccccccccccccccccccccccccccccc#",
   "#ccccccccccccc====ccccccccccccc#",
   "##############====##############",
   "##############====##############"
  ],
  "start": {
   "x": 15,
   "y": 18
  },
  "places": [
   {
    "name": "攤位區",
    "x": 3,
    "y": 5,
    "w": 26,
    "h": 7
   }
  ],
  "exits": [
   {
    "x": 15,
    "y": 19,
    "to": "T07",
    "tx": 55,
    "ty": 16
   },
   {
    "x": 16,
    "y": 19,
    "to": "T07",
    "tx": 56,
    "ty": 16
   }
  ],
  "npcs": [
   {
    "id": "c01_cloth_aunt",
    "x": 7,
    "y": 8,
    "sprite": "npc_c01_cloth_aunt",
    "dialog": "D_C01_CLOTH_IDLE",
    "quest": null,
    "quests": [],
    "dialog_done": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_CLOTH_IDLE_END"
    },
    "dialog_active": {
     "quest": "Q4_C01_M6",
     "dialog": "D_C01_CLOTH_CLUE"
    }
   },
   {
    "id": "c01_grocer",
    "x": 22,
    "y": 8,
    "sprite": "npc_c01_grocer",
    "dialog": "D_C01_GROCER_IDLE",
    "quest": null,
    "quests": []
   }
  ],
  "notes": [
   {
    "x": 4,
    "y": 8,
    "label": "布攤",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI4_4_8"
   },
   {
    "x": 25,
    "y": 8,
    "label": "南北貨攤",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI4_25_8"
   },
   {
    "x": 18,
    "y": 4,
    "label": "市場天窗",
    "kind": "landmark",
    "dialog": "D_C01_AUTO_NOTE_TI4_18_4"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_TI4_1",
    "name": "布匹後的小隔間",
    "at": {
     "x": 3,
     "y": 14
    },
    "cells": [
     [
      3,
      14
     ]
    ],
    "area": [
     1,
     14,
     2,
     1
    ],
    "trigger": "調查 (4,14) 布匹堆",
    "obstacle": "obj_hd_cloth",
    "content": "隱藏知識卡：大稻埕市場改名的年份",
    "dialog": "D_C01_CARD_HID_YONGLE_NAME",
    "card": "D_C01_CARD_HID_YONGLE_NAME",
    "dialog_again": "D_C01_CARD_HID_YONGLE_NAME",
    "chests": []
   }
  ],
  "rests": [],
  "chests": [
   {
    "id": "C_TI4_1",
    "x": 29,
    "y": 15,
    "kind": "normal",
    "subject": "英語",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_almond"
    }
   }
  ],
  "spawns": [],
  "safe": [
   {
    "x": 15,
    "y": 18
   }
  ],
  "inn": null,
  "shop": {
   "x": 22,
   "y": 8,
   "npc": "c01_grocer",
   "shop_id": "c01_item_ddc"
  }
 },
 "TD1": {
  "name": "圓山坑道 第 1 層",
  "type": "dungeon",
  "kind": "dungeon",
  "level": 3,
  "bgm": "forest",
  "battle_bg": "c01_tunnel",
  "tileset": "field",
  "light": "v3",
  "view": "俯視",
  "ground": "坑道岩石地面",
  "no_minimap": true,
  "real_ref": "虛構（靈感：劍潭山沿線舊堡壘、坑道；v2：圓山坑道是否開放參觀查不到，只當地圖靈感）",
  "art_note": "虛構坑道，俯視，光 v3（壁上油燈）。環境記號取代地圖：入口大廳地磚是紅磚色、西翼地上有藍色粉筆箭頭、東翼地上有黃色粉筆箭頭、往北的坑道（2 格寬）兩側壁燈是綠色；三面牆上各有一幅刻痕（百位、十位、一位）。南邊入口大廳（休息點：一盞大油燈＋長椅）；中央大廳；西翼礦車房有舊鐵軌與發條礦車（精英怪）；東翼盡頭鐵門（從裡面拉桿打開＝捷徑，通坑道口外）；東翼北邊牆面有裂縫（暗門）通到小室；北邊坑道的雙扇密碼門後面是北廳與往下的階梯。",
  "grid": [
   "########################################################",
   "########################################################",
   "##################.....................#################",
   "##################..........S..........#################",
   "##.............###.....................#################",
   "##.............###.....................#################",
   "##.F.F...F.F.F.###.....................#################",
   "##.............###.....................#################",
   "##.............###.....................#################",
   "##.............###.....................#################",
   "##.............###########.....###################.....#",
   "##.............#############..####################.....#",
   "##.............#############..####################.....#",
   "##.............#############..####################.....#",
   "######...###################..####################.....#",
   "######...###################..######################.###",
   "######...###########.................###############.###",
   "######...###########.................###############.###",
   "######...###########....*............###############.###",
   "######...........................................###U###",
   "########................................................",
   "########.........................*......................",
   "########...#########.................########...########",
   "########...#########.................########...########",
   "##.............############...##########...............#",
   "##.............############...##########...............#",
   "##.............############...##########...............#",
   "##.............############...##########...............#",
   "##...*.........############...##########....*..........#",
   "##.............############...##########...............#",
   "##.............############...##########...............#",
   "##.............############...##########...............#",
   "##.............############...##########...............#",
   "##........*....############...##########..........*....#",
   "##.............#######.............#####...............#",
   "##.............#######.............#####...............#",
   "##.............#######.............#####...............#",
   "##.............#######.............#####...............#",
   "######################.............#####################",
   "######################.............#####################",
   "###########################...##########################",
   "###########################...##########################"
  ],
  "start": {
   "x": 28,
   "y": 39
  },
  "arrive_dialogs": [
   "D_C01_TD1_ARRIVE"
  ],
  "places": [
   {
    "name": "入口大廳",
    "x": 22,
    "y": 34,
    "w": 13,
    "h": 6
   },
   {
    "name": "中央大廳",
    "x": 20,
    "y": 16,
    "w": 17,
    "h": 8
   },
   {
    "name": "西翼",
    "x": 2,
    "y": 24,
    "w": 13,
    "h": 14
   },
   {
    "name": "東翼",
    "x": 40,
    "y": 24,
    "w": 15,
    "h": 14
   },
   {
    "name": "礦車房",
    "x": 2,
    "y": 4,
    "w": 13,
    "h": 10
   },
   {
    "name": "北廳",
    "x": 18,
    "y": 2,
    "w": 21,
    "h": 8
   },
   {
    "name": "暗門小室",
    "x": 50,
    "y": 10,
    "w": 5,
    "h": 5
   }
  ],
  "exits": [
   {
    "x": 28,
    "y": 41,
    "to": "T06",
    "tx": 48,
    "ty": 8,
    "label": "坑道口"
   },
   {
    "x": 55,
    "y": 20,
    "to": "T06",
    "tx": 50,
    "ty": 8,
    "label": "東側鐵門（捷徑，從裡面拉開後雙向）",
    "requires": {
     "flag": "PZ_C01_LEVER_E"
    }
   },
   {
    "x": 55,
    "y": 21,
    "to": "T06",
    "tx": 51,
    "ty": 8,
    "label": "東側鐵門（捷徑）",
    "requires": {
     "flag": "PZ_C01_LEVER_E"
    }
   },
   {
    "x": 28,
    "y": 3,
    "to": "TD2",
    "tx": 24,
    "ty": 32,
    "label": "往第 2 層的階梯"
   }
  ],
  "npcs": [],
  "notes": [
   {
    "x": 3,
    "y": 25,
    "label": "刻痕「百」：3 盞油燈",
    "kind": "clue",
    "dialog": "D_C01_AUTO_NOTE_TD1_3_25"
   },
   {
    "x": 53,
    "y": 25,
    "label": "刻痕「十」：6 個齒輪",
    "kind": "clue",
    "dialog": "D_C01_AUTO_NOTE_TD1_53_25"
   },
   {
    "x": 21,
    "y": 17,
    "label": "刻痕「一」：2 顆星星",
    "kind": "clue",
    "dialog": "D_C01_AUTO_NOTE_TD1_21_17"
   },
   {
    "x": 51,
    "y": 19,
    "label": "有裂縫的牆（暗門）",
    "kind": "clue",
    "dialog": "D_C01_AUTO_NOTE_TD1_51_19"
   }
  ],
  "gates": [
   {
    "x": 28,
    "y": 13,
    "label": "密碼門（三位數，雙扇門左扇）",
    "kind": "code",
    "puzzle": "PZ_C01_CODE",
    "open": {
     "flag": "PZ_C01_CODE"
    },
    "title": "密碼門",
    "dialog": "D_C01_AUTO_GATE_TD1_28_13"
   },
   {
    "x": 29,
    "y": 13,
    "label": "密碼門（雙扇門右扇）",
    "kind": "code",
    "puzzle": "PZ_C01_CODE",
    "open": {
     "flag": "PZ_C01_CODE"
    },
    "title": "密碼門",
    "dialog": "D_C01_AUTO_GATE_TD1_29_13"
   }
  ],
  "hidden": [
   {
    "id": "HD_C01_TD1_1",
    "name": "暗門小室",
    "at": {
     "x": 52,
     "y": 19
    },
    "cells": [
     [
      52,
      19
     ]
    ],
    "area": [
     50,
     10,
     5,
     5
    ],
    "trigger": "調查 (51,19) 有裂縫的牆 → U 通道 (52,15–19)",
    "obstacle": "obj_hd_rocks",
    "dialog_again": "D_C01_TD1_CRACK_AGAIN",
    "chests": [
     "C_TD1_H"
    ]
   }
  ],
  "rests": [
   {
    "x": 31,
    "y": 36,
    "label": "入口休息點"
   },
   {
    "x": 46,
    "y": 22,
    "label": "東翼休息點（中段）"
   }
  ],
  "puzzles": [
   {
    "id": "PZ_C01_CODE",
    "type": "code",
    "answer": "362",
    "labels": [
     "百",
     "十",
     "一"
    ],
    "hint": "M5D",
    "reward": {
     "chest": "C_TD1_K"
    },
    "dialog_done": "D_C01_TD1_DOOR_OPEN",
    "dialog_wrong": "D_C01_TD1_CODE_WRONG"
   },
   {
    "id": "PZ_C01_LEVER_E",
    "type": "lever",
    "x": 54,
    "y": 19,
    "dialog_done": "D_C01_TD1_SHORTCUT"
   }
  ],
  "chests": [
   {
    "id": "C_TD1_1",
    "x": 3,
    "y": 5,
    "kind": "normal",
    "subject": "自然",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_smoke"
    }
   },
   {
    "id": "C_TD1_K",
    "x": 37,
    "y": 3,
    "kind": "puzzle",
    "subject": null,
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_herbtea"
    },
    "puzzle": "PZ_C01_CODE"
   },
   {
    "id": "C_TD1_H",
    "x": 53,
    "y": 11,
    "kind": "hidden",
    "subject": "國語",
    "level": 3,
    "reward": {
     "gold": 7,
     "item": null
    },
    "hidden": "HD_C01_TD1_1"
   }
  ],
  "spawns": [
   {
    "monster": "steam",
    "count": 3,
    "area": [
     2,
     24,
     13,
     14
    ]
   },
   {
    "monster": "steam",
    "count": 2,
    "area": [
     40,
     24,
     15,
     14
    ]
   },
   {
    "monster": "clockbug",
    "count": 2,
    "area": [
     20,
     16,
     17,
     8
    ]
   },
   {
    "monster": "e_minecart",
    "count": 1,
    "area": [
     8,
     8,
     1,
     1
    ],
    "boss": true,
    "at": {
     "x": 8,
     "y": 8
    },
    "respawn": "never",
    "elite": true,
    "group": [
     "steam"
    ]
   }
  ],
  "safe": [
   {
    "x": 28,
    "y": 39
   }
  ],
  "inn": null,
  "shop": null
 },
 "TD2": {
  "name": "圓山坑道 第 2 層（最深處）",
  "type": "dungeon",
  "kind": "dungeon",
  "level": 3,
  "bgm": "forest",
  "battle_bg": "c01_tunnel",
  "tileset": "field",
  "light": "v3",
  "view": "俯視",
  "ground": "坑道岩石地面",
  "no_minimap": true,
  "real_ref": "虛構",
  "art_note": "虛構坑道最深處，俯視，光 v3：一開始很暗，只有點亮的燈座周圍亮。南端階梯與休息點；往北的坑道（3 格寬）是小頭目嘟嘟號的位置；大廳地上鋪一圈方位盤：八個方位的字（北、東北、東、東南、南、西南、西、西北）都刻在地板上，中央石柱刻一支指向北的箭頭；六座點燈座照方位排（北、東北、東、南、西南、西），東南與西北兩個方位只有空的燈座基座（沒有燈）；大廳入口牆上一幅壁畫「太陽出來的地方先點，再照時鐘的方向一座一座點」；北端是怪盜的時光機關（黃銅齒輪＋大鐘面，燈全亮後轉動）；左右側廊有野怪；西南角的牆後藏一個小室。",
  "grid": [
   "################################################",
   "################################################",
   "#######################KKK######################",
   "######################.....#####################",
   "######################.....#####################",
   "########................................########",
   "########................................########",
   "########................K...............########",
   "##............................................##",
   "##............K...................K...........##",
   "##............................................##",
   "##............................................##",
   "##...................,,,,,,,..................##",
   "##...................,,,,,,,..................##",
   "##...................,,,,,,,..................##",
   "##.........K.........,,,K,,,.........K........##",
   "##...................,,,,,,,..................##",
   "##...................,,,,,,,..................##",
   "##...................,,,,,,,..................##",
   "##............................................##",
   "##............................................##",
   "##...........K.....................K..........##",
   "##............................................##",
   "##......................K.....................##",
   "##............................................##",
   "##............................................##",
   "####U##################...######################",
   "####.##################...######################",
   "#......################...######################",
   "#......################...######################",
   "#......#############.........###################",
   "#......#############.........###################",
   "#......#############.........###################",
   "####################....S....###################",
   "####################.........###################",
   "################################################"
  ],
  "start": {
   "x": 24,
   "y": 32
  },
  "arrive_dialogs": [
   "D_C01_TD2_ARRIVE"
  ],
  "places": [
   {
    "name": "點燈大廳",
    "x": 8,
    "y": 5,
    "w": 32,
    "h": 21
   },
   {
    "name": "時光機關",
    "x": 22,
    "y": 2,
    "w": 5,
    "h": 3
   },
   {
    "name": "休息點",
    "x": 20,
    "y": 30,
    "w": 9,
    "h": 5
   },
   {
    "name": "牆後小室",
    "x": 1,
    "y": 28,
    "w": 6,
    "h": 5
   }
  ],
  "exits": [
   {
    "x": 24,
    "y": 33,
    "to": "TD1",
    "tx": 28,
    "ty": 4,
    "label": "回第 1 層（階梯）"
   }
  ],
  "npcs": [],
  "notes": [
   {
    "x": 21,
    "y": 25,
    "label": "壁畫：太陽出來的地方先點，再照時鐘的方向",
    "kind": "clue",
    "dialog": "D_C01_TD2_MURAL"
   },
   {
    "x": 22,
    "y": 15,
    "label": "方位盤石柱（刻北的箭頭）",
    "kind": "clue",
    "dialog": "D_C01_TD2_PILLAR"
   },
   {
    "x": 24,
    "y": 12,
    "label": "地板的字：北",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_24_12"
   },
   {
    "x": 27,
    "y": 12,
    "label": "地板的字：東北",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_27_12"
   },
   {
    "x": 27,
    "y": 15,
    "label": "地板的字：東",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_27_15"
   },
   {
    "x": 27,
    "y": 18,
    "label": "地板的字：東南",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_27_18"
   },
   {
    "x": 24,
    "y": 18,
    "label": "地板的字：南",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_24_18"
   },
   {
    "x": 21,
    "y": 18,
    "label": "地板的字：西南",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_21_18"
   },
   {
    "x": 21,
    "y": 15,
    "label": "地板的字：西",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_21_15"
   },
   {
    "x": 21,
    "y": 12,
    "label": "地板的字：西北",
    "kind": "clue",
    "block": false,
    "dialog": "D_C01_AUTO_FLOOR_21_12"
   }
  ],
  "gates": [],
  "hidden": [
   {
    "id": "HD_C01_TD2_1",
    "name": "西南牆後小室",
    "at": {
     "x": 4,
     "y": 26
    },
    "cells": [
     [
      4,
      26
     ]
    ],
    "area": [
     1,
     28,
     6,
     5
    ],
    "trigger": "走到西側廊南端 (4,25)，調查腳邊缺一塊的石磚（U 通道 4,26–27）",
    "obstacle": "obj_hd_rocks",
    "chests": [
     "C_TD2_H"
    ]
   }
  ],
  "rests": [
   {
    "x": 27,
    "y": 31,
    "label": "中段休息點（小頭目前）"
   }
  ],
  "puzzles": [
   {
    "id": "PZ_C01_LAMPS",
    "type": "lamps",
    "hint": "M5L",
    "lamps": [
     {
      "x": 37,
      "y": 15,
      "dir": "東",
      "order": 1
     },
     {
      "x": 24,
      "y": 23,
      "dir": "南",
      "order": 2
     },
     {
      "x": 13,
      "y": 21,
      "dir": "西南",
      "order": 3
     },
     {
      "x": 11,
      "y": 15,
      "dir": "西",
      "order": 4
     },
     {
      "x": 24,
      "y": 7,
      "dir": "北",
      "order": 5
     },
     {
      "x": 34,
      "y": 9,
      "dir": "東北",
      "order": 6
     }
    ],
    "bases": [
     {
      "x": 35,
      "y": 21,
      "dir": "東南",
      "dialog": "D_C01_TD2_BASE_EMPTY"
     },
     {
      "x": 14,
      "y": 9,
      "dir": "西北",
      "dialog": "D_C01_TD2_BASE_EMPTY"
     }
    ],
    "reset": {
     "x": 29,
     "y": 31
    },
    "dialog_one": "D_C01_LAMP_ONE",
    "dialog_reset": "D_C01_LAMP_RESET",
    "dialog_done": "D_C01_TIME_GO",
    "reward": {
     "chest": "C_TD2_K",
     "event": "EV_TD2_TIME"
    }
   }
  ],
  "events": [
   {
    "id": "EV_TD2_TIME",
    "type": "warp",
    "x": 24,
    "y": 3,
    "requires": {
     "all": [
      {
       "flag": "PZ_C01_LAMPS"
      },
      "Q4_C01_M5"
     ]
    },
    "to": "T08",
    "tx": 20,
    "ty": 36,
    "arrive_dialog": "D_C01_TIME_ARRIVE",
    "label": "時光機關（六燈全亮後啟動 → T08 (20,36)）"
   }
  ],
  "chests": [
   {
    "id": "C_TD2_1",
    "x": 44,
    "y": 9,
    "kind": "normal",
    "subject": "英語",
    "level": 3,
    "reward": {
     "gold": 3,
     "item": null
    }
   },
   {
    "id": "C_TD2_K",
    "x": 38,
    "y": 6,
    "kind": "puzzle",
    "subject": null,
    "level": 3,
    "reward": {
     "gold": 12,
     "item": null
    },
    "puzzle": "PZ_C01_LAMPS"
   },
   {
    "id": "C_TD2_H",
    "x": 2,
    "y": 31,
    "kind": "hidden",
    "subject": "社會",
    "level": 3,
    "reward": {
     "gold": 0,
     "item": "c01_ticket"
    },
    "hidden": "HD_C01_TD2_1"
   }
  ],
  "spawns": [
   {
    "monster": "steam",
    "count": 1,
    "area": [
     2,
     8,
     6,
     18
    ]
   },
   {
    "monster": "clockbug",
    "count": 1,
    "area": [
     40,
     8,
     6,
     18
    ]
   },
   {
    "monster": "dudu",
    "count": 1,
    "area": [
     24,
     27,
     1,
     1
    ],
    "boss": true,
    "at": {
     "x": 24,
     "y": 27
    },
    "respawn": "never",
    "quest": "Q4_C01_M5"
   }
  ],
  "safe": [
   {
    "x": 24,
    "y": 32
   }
  ],
  "inn": null,
  "shop": null
 }
};
