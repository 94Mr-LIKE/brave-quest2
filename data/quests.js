/*
 * 勇者大冒險II — 委託（台北章 v0.6：主線 6、支線 8）
 * 由工具產生（tools/build_content.js），請勿手動修改：請改 content/ch01/ 再重跑 node tools/build_content.js
 * 來源：content/ch01/quests.json、notebook.json、jokes.json；切片 Q4_TUT_*、Q4_T01_*、Q4_T02_*、Q4_T03_* 停用不輸出
 */
window.QUESTS = {
 "Q4_C01_M1": {
  "title": "消失的翠玉白菜",
  "giver": "director",
  "map": "TI1",
  "kind": "help",
  "line": "main",
  "goal": "幫陳館長看故宮展場的平面圖，答對 2 題社會。",
  "log_next": "陳館長說，故宮外面有晃晃吊環在亂晃。再跟館長說說話。",
  "teaches": [
   "對話",
   "答題",
   "提示",
   "問阿咕",
   "偵探筆記"
  ],
  "subject": "社會",
  "units": [],
  "count": 2,
  "level_range": [
   1,
   1
  ],
  "hunt": null,
  "requires": [],
  "hint": "M1",
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": "herb",
   "light": null,
   "item_n": 2
  },
  "dialog_start": "D_C01_M1A",
  "dialog_end": "D_C01_M1B",
  "after": {
   "dialog": "D_C01_M1_AFTER"
  },
  "requires_cond": {
   "flag": "_dlg:D_C01_THEFT"
  },
  "dialog_locked": "D_C01_NPM_ARRIVE",
  "dialog_locked_tail": 1
 },
 "Q4_C01_M2": {
  "title": "海鷗發條",
  "giver": "director",
  "map": "TI1",
  "kind": "hunt",
  "line": "main",
  "goal": "在士林打倒晃晃吊環，帶 2 個『吊環的小發條』給故宮展場的陳館長。",
  "log_next": "天文館的解說員姊姊需要幫忙。也可以回博覽會會場找阿哲。",
  "teaches": [
   "戰鬥"
  ],
  "subject": "數學",
  "units": [],
  "count": null,
  "level_range": [
   1,
   1
  ],
  "hunt": {
   "item": "strap_spring",
   "n": 2,
   "monster": "strap",
   "map": "T04"
  },
  "requires": [
   "Q4_C01_M1"
  ],
  "hint": "M2",
  "reward": {
   "exp": 4,
   "gold": 3,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_M2A",
  "dialog_end": "D_C01_M2B"
 },
 "Q4_C01_M3": {
  "title": "星星齒輪",
  "giver": "c01_tam_guide",
  "map": "TI2",
  "kind": "hunt",
  "line": "main",
  "goal": "在士林和萬華打倒發條小蟲，找回 4 個『星星齒輪』，交給天文館的解說員姊姊。",
  "log_next": "星空裡的藍字說：『白菜在圓山的地底下。』先和阿哲把線索整理好。",
  "subject": "自然",
  "units": [],
  "count": null,
  "level_range": [
   1,
   2
  ],
  "hunt": {
   "item": "star_gear",
   "n": 4,
   "monster": "clockbug",
   "map": "T04",
   "maps": [
    "T04",
    "T05"
   ]
  },
  "requires": [
   "Q4_C01_M2"
  ],
  "hint": "M3",
  "reward": {
   "exp": 5,
   "gold": 4,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_M3A",
  "dialog_end": "D_C01_M3B",
  "after": {
   "dialog": "D_C01_SHOW"
  }
 },
 "Q4_C01_M4": {
  "title": "誰是古董鑑定師？",
  "giver": "classmate",
  "map": "T01",
  "kind": "deduce",
  "line": "main",
  "goal": "問故宮的展場志工姊姊、剝皮寮的老碗阿伯、天文館的解說員姊姊，再回博覽會會場和阿哲一起推理。",
  "log_next": "推理完成！到圓山的劍潭山步道，找巡守隊阿伯。」（M3 也完成時才顯示；否則「先幫天文館找回星星齒輪",
  "subject": "社會",
  "units": [],
  "count": null,
  "level_range": [
   1,
   2
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M2"
  ],
  "hint": "M4T",
  "clues": [
   "clue_appraiser_1",
   "clue_appraiser_2",
   "clue_appraiser_3"
  ],
  "deduce": {
   "prompt": "怪盜扮成了誰？",
   "options": [
    "古董鑑定師",
    "魔術師",
    "天文學家",
    "照相師"
   ],
   "answer": "古董鑑定師",
   "dialog_wrong": "D_C01_M4_WRONG",
   "dialog_need": "D_C01_M4_WAIT"
  },
  "steps": [
   {
    "id": "C1",
    "goal": "問故宮的展場志工姊姊。",
    "done": {
     "flag": "clue_appraiser_1"
    },
    "hint": "M4C1"
   },
   {
    "id": "C2",
    "goal": "問剝皮寮的老碗阿伯。",
    "done": {
     "flag": "clue_appraiser_2"
    },
    "hint": "M4C2"
   },
   {
    "id": "C3",
    "goal": "問天文館的解說員姊姊。",
    "done": {
     "flag": "clue_appraiser_3"
    },
    "hint": "M4C3"
   },
   {
    "id": "T",
    "goal": "回博覽會會場，和阿哲一起推理。",
    "done": {
     "flag": "_dedok:Q4_C01_M4"
    },
    "hint": "M4T"
   }
  ],
  "reward": {
   "exp": 5,
   "gold": 4,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_M4A",
  "dialog_end": "D_C01_M4B"
 },
 "Q4_C01_M5": {
  "title": "圓山坑道的燈",
  "giver": "c01_patrol",
  "map": "T06",
  "kind": "maze",
  "line": "main",
  "goal": "進圓山坑道，把最深處的 6 座點燈座全部點亮。",
  "log_next": "這裡是很久以前的大稻埕！跟碼頭的船伕阿伯說說話。",
  "subject": "混合",
  "subjects": [
   "數學",
   "社會"
  ],
  "units": [],
  "count": null,
  "level_range": [
   2,
   3
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M3",
   "Q4_C01_M4"
  ],
  "hint": "M5S",
  "maze": {
   "maps": [
    "TD1",
    "TD2"
   ],
   "done": {
    "flag": "PZ_C01_LAMPS"
   }
  },
  "steps": [
   {
    "id": "D",
    "goal": "解開圓山坑道第 1 層的密碼門。",
    "done": {
     "flag": "PZ_C01_CODE"
    },
    "hint": "M5D"
   },
   {
    "id": "L",
    "goal": "點亮最深處的 6 座點燈座。",
    "done": {
     "flag": "PZ_C01_LAMPS"
    },
    "hint": "M5L"
   }
  ],
  "reward": {
   "exp": 6,
   "gold": 5,
   "item": null,
   "light": null
  },
  "dialog_locked": "D_C01_M5L",
  "dialog_start": "D_C01_M5A",
  "dialog_end": "D_C01_TIME_GO",
  "dialog_accept_after": "D_C01_CARD_TUNNEL_GATE"
 },
 "Q4_C01_M6": {
  "title": "碼頭上的鑑定師",
  "giver": "c01_boatman",
  "map": "T08",
  "kind": "boss",
  "line": "main",
  "goal": "到永樂市場問布攤阿姨，再到大稻埕碼頭和古董鑑定師對決。",
  "goal_after": "把翠玉白菜送回故宮展場，交給陳館長。",
  "log_next": "第 1 章完成！預告卡指向下一站，偵探筆記可以重看謎題。",
  "subject": "混合",
  "subjects": [
   "國語",
   "數學",
   "社會",
   "自然",
   "英語"
  ],
  "units": [],
  "count": null,
  "level_range": [
   2,
   3
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M5"
  ],
  "hint": "M6A",
  "steps": [
   {
    "id": "A",
    "goal": "到永樂市場問布攤阿姨。",
    "done": {
     "flag": "_dlg:D_C01_CLOTH_CLUE"
    },
    "hint": "M6A"
   },
   {
    "id": "B",
    "goal": "到大稻埕碼頭和古董鑑定師對決。",
    "done": {
     "any": [
      {
       "flag": "_dlg:D_BOSS_C01_BENGBENG_B"
      },
      {
       "boss": "b01_bengbeng"
      }
     ]
    },
    "hint": "M6B"
   },
   {
    "id": "C",
    "goal": "把翠玉白菜送回故宮展場，交給陳館長。",
    "hint": "M6C",
    "talk": "director"
   }
  ],
  "boss": "b01_appraiser",
  "boss_chain": [
   "b01_bengbeng"
  ],
  "boss_map": "T08",
  "return_to": {
   "npc": "director",
   "map": "TI1"
  },
  "follower": "classmate",
  "reward": {
   "exp": 6,
   "gold": 5,
   "item": null,
   "light": null,
   "title": "台北小偵探",
   "stamp": "artifact_c01_jadeite_cabbage"
  },
  "dialog_start": "D_C01_M6A",
  "dialog_end": "D_C01_M6B",
  "after": {
   "dialog": "D_C01_ZHE_JOIN",
   "then": "D_C01_CARD_NEXT"
  },
  "boss_after": {
   "dialog": "D_C01_TIME_BACK",
   "warp": {
    "to": "TI1",
    "tx": 15,
    "ty": 17
   }
  }
 },
 "Q4_C01_S1": {
  "title": "展板上的錯字",
  "giver": "c01_leader",
  "map": "T01",
  "kind": "help",
  "line": "side",
  "goal": "幫班長小芸檢查『我的家鄉』展板上的字，答對 3 題國語。",
  "subject": "國語",
  "units": [],
  "count": 3,
  "level_range": [
   1,
   2
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M2"
  ],
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_S1A",
  "dialog_end": "D_C01_S1B"
 },
 "Q4_SIDE_2": {
  "title": "外國旅客問路",
  "giver": "mrt_staff2",
  "map": "T04",
  "kind": "help",
  "line": "side",
  "goal": "士林站的站務員請你幫外國旅客問路，答對 3 題英語。",
  "subject": "英語",
  "units": [],
  "count": 3,
  "level_range": [
   1,
   2
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M2"
  ],
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_Q4_SIDE_2A",
  "dialog_end": "D_Q4_SIDE_2B"
 },
 "Q4_C01_S2": {
  "title": "月亮的臉",
  "giver": "c01_star_kid",
  "map": "T04",
  "kind": "help",
  "line": "side",
  "goal": "天文館前的小星想知道月亮的事，答對 3 題自然。",
  "subject": "自然",
  "units": [],
  "count": 3,
  "level_range": [
   1,
   2
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M2"
  ],
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_S2A",
  "dialog_end": "D_C01_S2B"
 },
 "Q4_SIDE_1": {
  "title": "阿公的路線圖",
  "giver": "grandpa",
  "map": "T05",
  "kind": "help",
  "line": "side",
  "goal": "萬華的公園阿公找不到路，用地圖幫他，答對 3 題社會。",
  "subject": "社會",
  "units": [],
  "count": 3,
  "level_range": [
   1,
   2
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M2"
  ],
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_Q4_SIDE_1A",
  "dialog_end": "D_Q4_SIDE_1B"
 },
 "Q4_C01_S3": {
  "title": "青草巷的香草籃",
  "giver": "c01_herb_aunt",
  "map": "T05",
  "kind": "hunt",
  "line": "side",
  "goal": "在萬華打倒轉轉指北針，找回 3 片『香草葉』給青草巷的青草阿姨。",
  "subject": "自然",
  "units": [],
  "count": null,
  "level_range": [
   1,
   2
  ],
  "hunt": {
   "item": "herb_leaf",
   "n": 3,
   "monster": "compass",
   "map": "T05"
  },
  "requires": [
   "Q4_C01_M2"
  ],
  "reward": {
   "exp": 1,
   "gold": 6,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_S3A",
  "dialog_end": "D_C01_S3B"
 },
 "Q4_C01_S5": {
  "title": "阿伯的老碗",
  "giver": "c01_bpl_uncle",
  "map": "TI3",
  "kind": "help",
  "line": "side",
  "goal": "幫剝皮寮的老碗阿伯整理老碗，答對 3 題數學。",
  "subject": "數學",
  "units": [],
  "count": 3,
  "level_range": [
   1,
   2
  ],
  "hunt": null,
  "requires": [],
  "requires_cond": {
   "flag": "clue_appraiser_2"
  },
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_S5A",
  "dialog_end": "D_C01_S5B"
 },
 "Q4_C01_S4": {
  "title": "碼頭的貨箱",
  "giver": "c01_porter",
  "map": "T08",
  "kind": "help",
  "line": "side",
  "goal": "幫碼頭的搬貨大哥數貨箱，答對 3 題數學。",
  "subject": "數學",
  "units": [],
  "count": 3,
  "level_range": [
   2,
   3
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M5"
  ],
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_S4A",
  "dialog_end": "D_C01_S4B"
 },
 "Q4_C01_S6": {
  "title": "未來的車站",
  "giver": "c01_old_kid",
  "map": "T07",
  "kind": "help",
  "line": "side",
  "goal": "大稻埕的阿明想知道以後的台北，答對 3 題社會。",
  "subject": "社會",
  "units": [],
  "count": 3,
  "level_range": [
   2,
   3
  ],
  "hunt": null,
  "requires": [
   "Q4_C01_M5"
  ],
  "reward": {
   "exp": 3,
   "gold": 2,
   "item": null,
   "light": null
  },
  "dialog_start": "D_C01_S6A",
  "dialog_end": "D_C01_S6B"
 }
};
window.DIALOG_FLAGS = {
 "D_C01_WIT1": "clue_appraiser_1",
 "D_C01_WIT2": "clue_appraiser_2",
 "D_C01_M3A": "clue_appraiser_3"
};
window.NOTEBOOK_PAGES = [
 {
  "id": "NB_C01_CASE",
  "title": "案件",
  "text": "翠玉白菜在故宮展場被借走，展櫃只剩發藍光的借條。借條署名：怪盜夜光鷗。附註：我家在地圖上很小。",
  "when": {
   "flag": "_dlg:D_C01_THEFT"
  }
 },
 {
  "id": "NB_C01_SCENE",
  "title": "現場",
  "text": "白菜不見以前，展櫃前有一位說要『仔細鑑定』的人。",
  "when": {
   "flag": "_dlg:D_C01_THEFT"
  }
 },
 {
  "id": "NB_C01_EVIDENCE1",
  "title": "物證 1",
  "text": "晃晃吊環身上的小發條，刻著和借條一樣的海鷗。",
  "when": "Q4_C01_M2"
 },
 {
  "id": "NB_C01_REQUEST",
  "title": "委託",
  "who": "天文館的解說員姊姊",
  "text": "投影機的星星齒輪被發條小蟲咬走了。",
  "when": "Q4_C01_M2"
 },
 {
  "id": "NB_C01_CLUE1",
  "title": "線索 1",
  "who": "故宮的展場志工姊姊",
  "text": "那個人戴單片眼鏡，拿放大鏡盯著展品看了好久。",
  "when": {
   "flag": "clue_appraiser_1"
  }
 },
 {
  "id": "NB_C01_CLUE2",
  "title": "線索 2",
  "who": "剝皮寮的老碗阿伯",
  "text": "他用白手套摸老碗，說『這是真品』。",
  "when": {
   "flag": "clue_appraiser_2"
  }
 },
 {
  "id": "NB_C01_CLUE3",
  "title": "線索 3",
  "who": "天文館的解說員姊姊",
  "text": "他的筆記本寫滿年代、真假、價值，還想幫星星估價。",
  "when": {
   "flag": "clue_appraiser_3"
  }
 },
 {
  "id": "NB_C01_MESSAGE",
  "title": "訊息",
  "who": "星空裡的藍字",
  "text": "白菜在圓山的地底下。把燈點亮吧。",
  "when": {
   "flag": "_dlg:D_C01_SHOW"
  }
 },
 {
  "id": "NB_C01_DEDUCE",
  "title": "推理",
  "text": "放大鏡＋白手套＋看真假和價值 → 怪盜這次扮成『古董鑑定師』。",
  "when": "Q4_C01_M4"
 },
 {
  "id": "NB_C01_NEXT",
  "title": "下一步",
  "text": "劍潭山步道的巡守隊阿伯知道圓山坑道的事。",
  "when": {
   "all": [
    "Q4_C01_M4",
    "Q4_C01_M3"
   ]
  }
 },
 {
  "id": "NB_C01_TUNNEL",
  "title": "坑道",
  "text": "坑道裡沒有小地圖。第 1 層有密碼門；最深處有 6 座點燈座。",
  "when": {
   "active": "Q4_C01_M5"
  }
 },
 {
  "id": "NB_C01_DDC",
  "title": "大稻埕",
  "text": "時光機關把我們帶到日治時期的大稻埕。船伕阿伯說：拿放大鏡的人去市場了。",
  "when": {
   "flag": "_dlg:D_C01_TIME_ARRIVE"
  }
 },
 {
  "id": "NB_C01_DDC2",
  "title": "大稻埕 2",
  "who": "永樂市場的布攤阿姨",
  "text": "他要去碼頭搭船。",
  "when": {
   "flag": "_dlg:D_C01_CLOTH_CLUE"
  }
 },
 {
  "id": "NB_C01_REVEAL",
  "title": "識破",
  "text": "放大鏡的鏡框刻著海鷗——鑑定師就是怪盜夜光鷗。",
  "when": {
   "flag": "_dlg:D_BOSS_C01_BENGBENG_B"
  }
 },
 {
  "id": "NB_C01_CARD",
  "title": "預告卡",
  "text": "一個「天」字，一盞「燈」，合起來，會飛上天。\n去找它們元宵節飛最多的地方。\n那裡的小火車，終點站叫菁桐。\n附註：斗篷的洞，我自己會補。\n下一站：答案的地方。",
  "when": "Q4_C01_M6",
  "kind": "card"
 }
];
window.JOKE_CARDS = {
 "JOKE_C01_1": {
  "q": "翠玉白菜為什麼從來不會被罵「白目」？",
  "a": "因為它一半是綠的呀！",
  "note": "我覺得很好笑，阿咕說不好笑。"
 },
 "JOKE_C01_2": {
  "q": "星星為什麼不用去天文館上課？",
  "a": "因為它們天天都在「上」面！",
  "note": "這個是我在宇宙劇場想到的。"
 },
 "JOKE_C01_3": {
  "q": "捷運排隊的時候，誰最守規矩？",
  "a": "黃線——它一直站在原地不動！",
  "note": "不准笑！好啦，可以笑一點點。"
 }
};
