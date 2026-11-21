/*
 * 勇者大冒險II — 對話（台北章 v0.6）
 * 由工具產生（tools/build_content.js），請勿手動修改：請改 content/ch01/ 再重跑 node tools/build_content.js
 * 來源：content/ch01/dialogs_ch01.json（劇本第 5、5.1、7 節 js 區塊）＋dialogs_slice.json（切片保留的對話）＋knowledge_cards.json（可上線的知識卡）
 */
window.SPEAKERS = {
 "pet": "阿咕",
 "mrt_staff2": "站務員",
 "hero": "{name}",
 "agu": "阿咕",
 "narrator": "",
 "classmate": "阿哲",
 "desk": "小雯姊姊",
 "director": "陳館長",
 "shop": "紀念品店店員",
 "inn": "休息站阿姨",
 "mrt_staff": "站務員",
 "traveler": "外國旅客",
 "guide": "宇翔哥哥",
 "grandpa": "公園阿公",
 "sage": "方爺爺",
 "kaito": "怪盜夜光鷗",
 "dudu": "嘟嘟號",
 "c01_family": "{family}",
 "c01_appraiser": "古董鑑定師",
 "c01_teacher": "林老師",
 "c01_leader": "小芸",
 "c01_npm_volunteer": "展場志工姊姊",
 "c01_tam_guide": "解說員姊姊",
 "c01_star_kid": "小星",
 "c01_smith": "武器防具店老闆",
 "c01_bpl_uncle": "老碗阿伯",
 "c01_herb_aunt": "青草阿姨",
 "c01_snack": "名產攤阿姨",
 "c01_patrol": "巡守隊阿伯",
 "c01_runner": "慢跑姊姊",
 "c01_boatman": "船伕阿伯",
 "c01_porter": "搬貨大哥",
 "c01_cloth_aunt": "布攤阿姨",
 "c01_old_kid": "阿明",
 "c01_grocer": "南北貨老闆",
 "c01_ddc_inn": "旅社老闆娘",
 "bengbeng": "蹦蹦號",
 "c01_guild": "公會導師",
 "c01_mob_t04a": "阿凱",
 "c01_mob_t04b": "單車大哥",
 "c01_mob_t04c": "林阿嬤",
 "c01_mob_t04d": "畫畫姊姊",
 "c01_mob_t05_mrt": "站務員",
 "c01_mob_t05a": "小晴",
 "c01_mob_t05b": "散步阿伯",
 "c01_mob_t05c": "送貨大哥",
 "c01_mob_t05d": "吳老師",
 "c01_mob_t07a": "撿茶阿姨",
 "c01_mob_t07b": "茶行掌櫃",
 "c01_mob_t07c": "糕餅小販",
 "c01_mob_t07d": "布車大哥",
 "c01_mob_t07e": "學徒阿文",
 "c01_mob_t07f": "阿春",
 "c01_mob_t08a": "撿茶姊姊"
};
window.DIALOGS = {
 "D_FAINT": [
  {
   "who": "agu",
   "emotion": "擔心",
   "text": "線索還沒找齊，回休息站整理偵探筆記吧！"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "金幣和道具都還在，休息好再出發！"
  }
 ],
 "D_INN_REST": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "休息好了，體力都回來了！"
  }
 ],
 "D_CHEST_LOCKED": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "寶箱上有數字鎖，答對才打得開！"
  }
 ],
 "D_CHEST_DONE": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "這個寶箱已經打開過了。"
  }
 ],
 "D_TEACH_CARD": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "這個單元先看一張教學卡，再一起試試看！"
  }
 ],
 "D_TEACH_CARD_BTN": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "看不懂的時候，按「看教學卡」就好。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "看卡的時候，時間會停下來喔。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "看完回來還是同一題，不算答錯！"
  }
 ],
 "D_TEACH_CARD_DONE": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "看完了！用剛剛學到的方法試試看。"
  }
 ],
 "D_AGU_FIRST_Q": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "第一題我陪你看：先找題目在問什麼。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "第一個小提示，阿咕幫你打開了。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "想好了再選，不用急！"
  }
 ],
 "D_AGU_FIRST_Q_RIGHT": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "答對了！你先看清楚題目，方法很好。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "集章冊裡，這個單元亮起一格了！"
  }
 ],
 "D_AGU_FIRST_Q_WRONG": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "沒關係，線索還沒找齊。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "看看正確答案和理由，下次就會了。"
  }
 ],
 "D_AGU_TIP_MATH": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "數字很大的時候，先一位一位數清楚。"
  }
 ],
 "D_AGU_TIP_SOCIAL": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "看地圖，先找方位和圖例。"
  }
 ],
 "D_AGU_TIP_SCIENCE": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "想一想，太陽和月亮在天空的哪裡？"
  }
 ],
 "D_AGU_TIP_CHINESE": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先把句子念一遍，找出最重要的詞。"
  }
 ],
 "D_AGU_TIP_ENGLISH": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先找認識的英文字，再選答案。"
  }
 ],
 "D_MON_FIRST_STRAP": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "晃晃吊環兇巴巴地衝過來了！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "別怕，答對題目就能把它打退！"
  }
 ],
 "D_MON_FIRST_COMPASS": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "轉轉指北針轉得好兇，別被轉暈了！"
  }
 ],
 "D_MON_FIRST_BOOKWORM": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "書籤毛毛蟲張開大嘴撲過來了！"
  }
 ],
 "D_MON_FIRST_STEAM": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "噗噗蒸氣團噴著熱氣衝過來了！"
  }
 ],
 "D_SHOP_IDLE": [
  {
   "who": "shop",
   "emotion": "開心",
   "text": "歡迎光臨！木劍、皮衣、藥草都有喔。"
  }
 ],
 "D_INN_IDLE": [
  {
   "who": "inn",
   "emotion": "開心",
   "text": "累了嗎？在這裡休息，不用錢喔。"
  }
 ],
 "D_MRT": [
  {
   "who": "mrt_staff",
   "emotion": "平靜",
   "text": "要搭到哪一站呢？"
  }
 ],
 "D_MRT_ARRIVE_T01": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "回到圓山了！博覽會就在附近。"
  }
 ],
 "D_MRT_STAFF_IDLE": [
  {
   "who": "mrt_staff",
   "emotion": "平靜",
   "text": "進站前，記得排隊喔。"
  }
 ],
 "D_SAGE_IDLE": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "嗯——讀書累了，就看看窗外的樹。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "讀冊讀甲忝矣，就看一下窗仔外的樹仔。",
    "tailo": "Tha̍k-tsheh tha̍k kah thiám--ah, tō khuànn tsi̍t-ē thang-á guā ê tshiū-á.",
    "huayu": "嗯——讀書累了，就看看窗外的樹。"
   }
  }
 ],
 "D_SAGE_LESSON1_A": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "嗯——今天教你一個課本沒細講的東西。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "看地圖之前，先把方向弄清楚。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "上北、下南、左西、右東，記得嗎？"
  },
  {
   "who": "sage",
   "emotion": "神祕",
   "text": "那北和東的中間，叫做什麼呢？"
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "嗯……北東？"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "很接近！我們說「東北」，先說東西再說南北。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "還有東南、西南、西北，加上四個方向……"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "一共八個方向，叫做八方位。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "我先示範一題，你看我怎麼想。"
  }
 ],
 "D_SAGE_LESSON1_B": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "看懂了嗎？先找北，再看夾在哪兩個方向中間。"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "換你試試看，答對兩題就算學會。"
  }
 ],
 "D_SAGE_LESSON1_PASS": [
  {
   "who": "sage",
   "emotion": "開心",
   "text": "很好！你先找北再判斷，方法對了。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "以後的戰鬥裡，也會出現八方位的題目。"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "學會了，就是你的。嗯——慢慢來。"
  }
 ],
 "D_SAGE_LESSON1_RETRY": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "沒關係，再看一次教學卡，慢慢來。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "記住：先找北，再看夾在哪兩個方向中間。"
  }
 ],
 "D_SAGE_LESSON2_A": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "嗯——再來認識「地圖的四個好幫手」。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "第一是圖名，告訴你這是哪裡的地圖。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "第二是方位，告訴你哪一邊是北。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "第三是圖例，告訴你每個符號的意思。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "第四是比例尺，告訴你真的距離有多長。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "例如地圖上 1 公分，代表真的 100 公尺。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "我先示範一題，你看我怎麼想。"
  }
 ],
 "D_SAGE_LESSON2_B": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "看懂了嗎？先想想要用哪一個好幫手。"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "換你試試看，答對兩題就算學會。"
  }
 ],
 "D_SAGE_LESSON2_PASS": [
  {
   "who": "sage",
   "emotion": "開心",
   "text": "很好！四個好幫手，你都認識了。"
  },
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
 "D_SAGE_LESSON2_RETRY": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "沒關係，再看一次教學卡，慢慢來。"
  },
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "先問自己：題目要找名字、方向、符號，還是距離？"
  }
 ],
 "D_Q4_SIDE_1B": [
  {
   "who": "grandpa",
   "emotion": "開心",
   "text": "找到了！你先看方位再看圖例，真細心。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "揣著路矣！你先看方位才看圖例，真細膩。",
    "tailo": "Tshuē-tio̍h lōo--ah! Lí sing khuànn hong-uī tsiah khuànn tôo-lē, tsin sè-jī.",
    "huayu": "找到了！你先看方位再看圖例，真細心。"
   }
  },
  {
   "who": "grandpa",
   "emotion": "開心",
   "text": "這株藥草帶著，走路累了用得到。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "這株藥草予你紮去，行路忝矣用會著。",
    "tailo": "Tsit tu io̍h-tsháu hōo lí tsah--khì, kiânn-lōo thiám--ah īng ē tio̍h.",
    "huayu": "這株藥草帶著，走路累了用得到。"
   }
  },
  {
   "who": "grandpa",
   "emotion": "擔心",
   "text": "公園裡的指北針怪物，看到要小心喔。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "公園內的指北針怪物，看著愛細膩喔。",
    "tailo": "Kong-hn̂g lāi ê tsí-pak-tsiam kuài-bu̍t, khuànn-tio̍h ài sè-jī--ooh.",
    "huayu": "公園裡的指北針怪物，看到要小心喔。"
   }
  }
 ],
 "D_GRANDPA_IDLE": [
  {
   "who": "grandpa",
   "emotion": "開心",
   "text": "每天早上，我都來公園走一走。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "逐工透早，我攏來公園行行咧。",
    "tailo": "Ta̍k-kang thàu-tsá, guá lóng lâi kong-hn̂g kiânn-kiânn--leh.",
    "huayu": "每天早上，我都來公園走一走。"
   }
  }
 ],
 "D_Q4_SIDE_2A": [
  {
   "who": "mrt_staff",
   "emotion": "擔心",
   "text": "這位外國旅客在問路，可以幫幫他嗎？"
  },
  {
   "who": "traveler",
   "emotion": "平靜",
   "text": "Hello! Excuse me.（你好！不好意思。）"
  },
  {
   "who": "traveler",
   "emotion": "擔心",
   "text": "Where is the museum?（博物館在哪裡？）"
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "我試試看！用學過的英文幫忙。"
  },
  {
   "who": "mrt_staff",
   "emotion": "平靜",
   "text": "他說的話，我整理成三題。加油！"
  }
 ],
 "D_Q4_SIDE_2B": [
  {
   "who": "traveler",
   "emotion": "開心",
   "text": "Thank you!（謝謝你！）"
  },
  {
   "who": "traveler",
   "emotion": "開心",
   "text": "It's sunny today!（今天是晴天！）"
  },
  {
   "who": "mrt_staff",
   "emotion": "開心",
   "text": "你聽得很仔細，幫了大忙！"
  },
  {
   "who": "mrt_staff",
   "emotion": "開心",
   "text": "這 30 枚金幣，是旅客請我轉交的謝禮。"
  }
 ],
 "D_TRAVELER_IDLE": [
  {
   "who": "traveler",
   "emotion": "開心",
   "text": "Taipei is fun!（台北好好玩！）"
  }
 ],
 "D_CARD_OWL": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "（知識卡）真的領角鴞是保育類，看到不要抓、不要餵。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！我是吉祥物，不是真的貓頭鷹啦。"
  }
 ],
 "D_BOSS_DUDU_A": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "前面有一個好大的茶壺在冒煙！"
  },
  {
   "who": "dudu",
   "emotion": "生氣",
   "text": "嘟——！嘟嘟嘟！"
  },
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "嘟嘟！發條蒸氣壺嘟嘟號開始轉動了！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "這是怪盜做的機關，答對題目讓它停下來！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "它會考的單元，列在下面的清單裡。"
  },
  {
   "who": "hero",
   "emotion": "開心",
   "text": "我準備好了！"
  }
 ],
 "D_BOSS_DUDU_P2": [
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "嘟嘟號噴出更多白煙，轉得更快了！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "別急，先看清楚題目再回答！"
  }
 ],
 "D_BOSS_DUDU_P3": [
  {
   "who": "dudu",
   "emotion": "生氣",
   "text": "嘟嘟嘟嘟——！！"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "發條快轉完了！再答對幾題！"
  }
 ],
 "D_BOSS_DUDU_AGAIN": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "嘟嘟號還在冒煙。休息好了，再來挑戰！"
  }
 ],
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
 ],
 "D_INTRO": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "台北的早晨，天空亮亮的。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "今天，四年級要去校外教學。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "{name}被選上了「小小導覽員」！"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "可是，沒有人知道，今天會發生怪事……"
  }
 ],
 "D_C01_HOME": [
  {
   "who": "c01_family",
   "emotion": "開心",
   "text": "{name}，導覽員證帶了嗎？"
  },
  {
   "who": "hero",
   "emotion": "開心",
   "text": "帶了！掛在脖子上。"
  },
  {
   "who": "c01_family",
   "emotion": "擔心",
   "text": "跟緊林老師，不要亂跑喔。"
  },
  {
   "who": "c01_family",
   "emotion": "開心",
   "text": "回來要講給我聽，今天看到什麼。"
  },
  {
   "who": "hero",
   "emotion": "開心",
   "text": "好！我出門了！"
  }
 ],
 "D_C01_NPM_ARRIVE": [
  {
   "who": "c01_teacher",
   "emotion": "平靜",
   "text": "大家小聲一點，這裡是故宮的展場。"
  },
  {
   "who": "director",
   "emotion": "開心",
   "text": "我是陳館長，今天帶小小導覽員活動。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！我是博物館的吉祥物，偵探阿咕！"
  },
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "{name}，翠玉白菜在那個展櫃裡！"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "導覽員先去展櫃看看，等一下介紹給大家。"
  }
 ],
 "D_C01_THEFT": [
  {
   "who": "c01_appraiser",
   "emotion": "神祕",
   "text": "嗯……這顆白菜，我要仔細鑑定一下。"
  },
  {
   "who": "hero",
   "emotion": "驚訝",
   "text": "您是誰？為什麼拿著放大鏡？"
  },
  {
   "who": "c01_appraiser",
   "emotion": "開心",
   "text": "我是古董鑑定師。看，葉子上有蟲呢。"
  },
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "啪！展場的燈閃了一下。"
  },
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "燈再亮起來時，展櫃裡空空的。"
  },
  {
   "who": "classmate",
   "emotion": "驚訝",
   "text": "白菜呢？翠玉白菜不見了！"
  },
  {
   "who": "hero",
   "emotion": "驚訝",
   "text": "展櫃裡有一張發藍光的卡片……"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「翠玉白菜我借走了，一定會還。」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「——怪盜夜光鷗」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「附註：我家在地圖上很小，你們找不到。」"
  },
  {
   "who": "agu",
   "emotion": "生氣",
   "text": "咕！鑑定師也不見了！"
  },
  {
   "who": "director",
   "emotion": "擔心",
   "text": "{name}、阿咕，過來一下好嗎？"
  }
 ],
 "D_C01_M1A": [
  {
   "who": "director",
   "emotion": "擔心",
   "text": "展場要先關起來，大家都好擔心。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "{name}，你是導覽員，最會看平面圖。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "幫我看看，展櫃和出口在哪裡？"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "答不出來時，可以按「問阿咕」喔。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "不過阿咕只給提示，答案要你自己想！"
  }
 ],
 "D_C01_M1B": [
  {
   "who": "director",
   "emotion": "開心",
   "text": "答得好！你先看圖例，再找地方。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "這本偵探筆記給你，誰說了什麼都記下來。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！筆記可以重看，忘了就打開它。"
  },
  {
   "who": "director",
   "emotion": "擔心",
   "text": "對了，外面的晃晃吊環一直在亂晃……"
  }
 ],
 "D_C01_M1_AFTER": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "（知識卡）真的領角鴞是保育類，看到不要抓、不要餵。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！我是吉祥物，不是真的貓頭鷹啦。"
  }
 ],
 "D_C01_M2A": [
  {
   "who": "director",
   "emotion": "擔心",
   "text": "故宮外面的晃晃吊環，今天特別兇。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "它們身上，好像多了亮亮的小發條。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "小發條可能是線索！去士林看看吧。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "答對題目就能打退怪物，拿到經驗值。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "帶 2 個小發條回來給我看，好嗎？"
  }
 ],
 "D_C01_M2B": [
  {
   "who": "hero",
   "emotion": "驚訝",
   "text": "發條上刻著一隻海鷗，和借條上的一樣！"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕咕！怪盜的機關，是同一個人做的！"
  },
  {
   "who": "director",
   "emotion": "驚訝",
   "text": "咦，天文館的解說員打電話來……"
  },
  {
   "who": "director",
   "emotion": "擔心",
   "text": "她說投影機的零件，被發條蟲咬走了！"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "全班先回博覽會，阿哲在那裡等你。"
  }
 ],
 "D_C01_M3A": [
  {
   "who": "c01_tam_guide",
   "emotion": "擔心",
   "text": "你們是陳館長說的小偵探吧？"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "擔心",
   "text": "宇宙劇場的投影機，少了 4 個星星齒輪。"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "擔心",
   "text": "一群發條小蟲咬走它們，跑到外面去了。"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "平靜",
   "text": "早上還來了一位奇怪的客人。"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "平靜",
   "text": "他的筆記本寫滿「年代」「真假」「價值」。"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "驚訝",
   "text": "還說要幫天上的星星估價呢！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（偵探筆記：解說員姊姊的線索記下來了）"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "平靜",
   "text": "聽說小蟲在士林和萬華都有。拜託了！"
  }
 ],
 "D_C01_M3B": [
  {
   "who": "c01_tam_guide",
   "emotion": "開心",
   "text": "4 個齒輪都回來了！謝謝你們！"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "開心",
   "text": "節目可以放了，一起進來看吧！"
  }
 ],
 "D_C01_SHOW": [
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "圓圓的天花板暗下來，滿天星星亮了。"
  },
  {
   "who": "classmate",
   "emotion": "驚訝",
   "text": "哇，好像躺在山上看星星！"
  },
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "咦？有些星星排成一隻發光的海鷗！"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "海鷗下面，出現一行藍色的字："
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「白菜在圓山的地底下。把燈點亮吧。」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「附註：星星我沒有估價，放心。」"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "驚訝",
   "text": "這不是我們的節目……是惡作劇！"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！記進偵探筆記：圓山、地底、點燈！"
  }
 ],
 "D_C01_M4A": [
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "{name}！我聽說了，白菜被借走了？"
  },
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "我來幫忙！你問到什麼，我都幫你記。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "看過鑑定師的人，至少有 3 位。"
  },
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "故宮的志工、剝皮寮的阿伯、天文館的姊姊。"
  },
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "3 條線索都問到，再回來一起推理！"
  }
 ],
 "D_C01_M4_WAIT": [
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "線索還不夠，偵探筆記裡還有空格。"
  }
 ],
 "D_C01_M4_THINK": [
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "一、他拿放大鏡，盯著展品看好久。"
  },
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "二、他戴白手套，說老碗是真品。"
  },
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "三、他在想年代、真假、價值。"
  },
  {
   "who": "agu",
   "emotion": "神祕",
   "text": "咕……什麼工作，會做這三件事？"
  }
 ],
 "D_C01_M4_WRONG": [
  {
   "who": "classmate",
   "emotion": "擔心",
   "text": "嗯……這個工作，會管東西是不是真的嗎？"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "再看一次筆記，想想三條線索的共同點。"
  }
 ],
 "D_C01_M4B": [
  {
   "who": "hero",
   "emotion": "開心",
   "text": "放大鏡、白手套、看真假——是古董鑑定師！"
  },
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "對！就是展櫃前那個人！我寫下來！"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕咕！你把三條線索連起來了。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "星空的藍字說，白菜在圓山的地底下。"
  },
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "圓山的步道有巡守隊，去問問看吧！"
  }
 ],
 "D_C01_M4_NEEDSHOW": [
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "鑑定師在哪裡呢？天文館的事還沒解決耶。"
  }
 ],
 "D_C01_WIT1": [
  {
   "who": "c01_npm_volunteer",
   "emotion": "擔心",
   "text": "白菜不見了，我到現在還在發抖。"
  },
  {
   "who": "c01_npm_volunteer",
   "emotion": "平靜",
   "text": "那個人戴著單片眼鏡，鏡片圓圓的。"
  },
  {
   "who": "c01_npm_volunteer",
   "emotion": "平靜",
   "text": "他拿放大鏡，盯著展品看了好久好久。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（偵探筆記：展場志工姊姊的線索記下來了）"
  }
 ],
 "D_C01_VOL_IDLE_END": [
  {
   "who": "c01_npm_volunteer",
   "emotion": "開心",
   "text": "白菜回來了！今天要好好介紹給大家。"
  },
  {
   "who": "c01_npm_volunteer",
   "emotion": "平靜",
   "text": "葉子上的兩隻蟲，你找到了嗎？"
  }
 ],
 "D_C01_WIT2": [
  {
   "who": "c01_bpl_uncle",
   "emotion": "開心",
   "text": "歡迎！小朋友，來看以前的碗喔？",
   "taigi_needed": true,
   "taigi": {
    "hanji": "歡迎！囡仔，來看以早的碗喔？",
    "tailo": "Huan-gîng! Gín-á, lâi khuànn í-tsá ê uánn--ooh?",
    "huayu": "歡迎！小朋友，來看以前的碗喔？"
   }
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "阿伯，今天有奇怪的客人來過嗎？"
  },
  {
   "who": "c01_bpl_uncle",
   "emotion": "平靜",
   "text": "他用白手套摸我的碗。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "伊用白手橐仔摸我的碗。",
    "tailo": "I īng pe̍h tshiú-lok-á bong guá ê uánn.",
    "huayu": "他用白手套摸我的碗。"
   }
  },
  {
   "who": "c01_bpl_uncle",
   "emotion": "驚訝",
   "text": "還說：「嗯，這是真品。」害我好開心。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（偵探筆記：老碗阿伯的線索記下來了）"
  }
 ],
 "D_C01_UNCLE_IDLE_END": [
  {
   "who": "c01_bpl_uncle",
   "emotion": "開心",
   "text": "謝謝你！",
   "taigi_needed": true,
   "taigi": {
    "hanji": "多謝你！",
    "tailo": "To-siā lí!",
    "huayu": "謝謝你！"
   }
  },
  {
   "who": "c01_bpl_uncle",
   "emotion": "開心",
   "text": "原來那個鑑定師是怪盜，害我白高興。"
  }
 ],
 "D_C01_M5L": [
  {
   "who": "c01_patrol",
   "emotion": "平靜",
   "text": "小朋友，步道要走樓梯，慢慢來喔。"
  },
  {
   "who": "c01_patrol",
   "emotion": "平靜",
   "text": "坑道的鐵柵不能隨便開，有什麼事嗎？"
  }
 ],
 "D_C01_M5A": [
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "阿伯，我們在找圓山地底下的燈。"
  },
  {
   "who": "c01_patrol",
   "emotion": "驚訝",
   "text": "你們也知道？坑道裡最近一直有光。"
  },
  {
   "who": "c01_patrol",
   "emotion": "擔心",
   "text": "還有喀啦喀啦的發條聲，好奇怪。"
  },
  {
   "who": "c01_patrol",
   "emotion": "平靜",
   "text": "陳館長打電話來了，我幫你們開鐵柵。"
  },
  {
   "who": "c01_patrol",
   "emotion": "平靜",
   "text": "我在門口等。累了就回來，不要勉強。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "坑道裡沒有小地圖，路要自己記喔。"
  }
 ],
 "D_C01_TD1_ARRIVE": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "好暗……牆上好像刻著什麼。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "走錯了也沒關係，可以回到入口重來。"
  }
 ],
 "D_C01_TD1_DOOR_OPEN": [
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "喀啦！密碼門打開了，有樓梯往下走。"
  }
 ],
 "D_C01_TD1_SHORTCUT": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "生鏽的鐵門拉開了，外面是坑道口。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "以後從這裡進出，就不用繞路了！"
  }
 ],
 "D_C01_TD2_ARRIVE": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "這裡有 6 座燈座，都是暗的。"
  },
  {
   "who": "agu",
   "emotion": "神祕",
   "text": "星空的藍字說：把燈點亮吧……"
  }
 ],
 "D_C01_LAMP_ONE": [
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "燈座亮起來了，坑道變亮一點。"
  }
 ],
 "D_C01_LAMP_RESET": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "燈全熄了。沒關係，再試一次！"
  }
 ],
 "D_C01_TIME_GO": [
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "6 座燈都亮了！地上浮出一個大圓盤。"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "圓盤上的齒輪，一圈一圈轉起來……"
  },
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "咕！這是怪盜的機關！大家抓緊！"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "一陣藍光，大家都被吸進去了。"
  }
 ],
 "D_C01_TIME_ARRIVE": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "睜開眼睛，眼前是一條好寬的河。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "河邊停著木船，大家扛著貨走來走去。"
  },
  {
   "who": "hero",
   "emotion": "驚訝",
   "text": "這裡的人穿得好像老照片！"
  },
  {
   "who": "agu",
   "emotion": "神祕",
   "text": "咕……我們好像回到很久以前了。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（知識卡）這是日治時期的大稻埕碼頭。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先找人問問，鑑定師有沒有來過。"
  }
 ],
 "D_C01_M6A": [
  {
   "who": "c01_boatman",
   "emotion": "開心",
   "text": "小朋友，要搭船嗎？",
   "taigi_needed": true,
   "taigi": {
    "hanji": "囡仔，欲搭船無？",
    "tailo": "Gín-á, beh tah tsûn--bô?",
    "huayu": "小朋友，要搭船嗎？"
   }
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "請問，有沒有看到拿放大鏡的人？"
  },
  {
   "who": "c01_boatman",
   "emotion": "平靜",
   "text": "那個人去市場了。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "彼个人去市場矣。",
    "tailo": "Hit ê lâng khì tshī-tiûnn--ah.",
    "huayu": "那個人去市場了。"
   }
  },
  {
   "who": "c01_boatman",
   "emotion": "平靜",
   "text": "他說等一下要搭船，還會回來碼頭。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！去市場問問看！"
  }
 ],
 "D_C01_CLOTH_CLUE": [
  {
   "who": "c01_cloth_aunt",
   "emotion": "開心",
   "text": "來喔，好布很便宜喔！",
   "taigi_needed": true,
   "taigi": {
    "hanji": "來喔，好布真俗喔！",
    "tailo": "Lâi--ooh, hó pòo tsin sio̍k--ooh!",
    "huayu": "來喔，好布很便宜喔！"
   }
  },
  {
   "who": "c01_cloth_aunt",
   "emotion": "驚訝",
   "text": "拿放大鏡的人？剛剛還在看我的布。"
  },
  {
   "who": "c01_cloth_aunt",
   "emotion": "平靜",
   "text": "他說要去碼頭搭船。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "伊講欲去碼頭搭船。",
    "tailo": "I kóng beh khì bé-thâu tah tsûn.",
    "huayu": "他說要去碼頭搭船。"
   }
  },
  {
   "who": "c01_cloth_aunt",
   "emotion": "平靜",
   "text": "船就要開了，他應該快到碼頭了。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "回碼頭！這次不能讓他跑掉！"
  }
 ],
 "D_C01_TIME_BACK": [
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "時光機關的齒輪又轉了起來……"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "一陣藍光，大家回到了圓山。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "回來了！快把白菜送回故宮！"
  }
 ],
 "D_C01_M6B": [
  {
   "who": "hero",
   "emotion": "開心",
   "text": "陳館長，翠玉白菜找回來了！"
  },
  {
   "who": "director",
   "emotion": "驚訝",
   "text": "真的是它！一片葉子都沒少！"
  },
  {
   "who": "director",
   "emotion": "開心",
   "text": "我們請館方的人，小心放回展櫃。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "翠玉白菜回到了展櫃裡，亮晶晶的。"
  },
  {
   "who": "c01_tam_guide",
   "emotion": "開心",
   "text": "我也來道謝！節目今天場場客滿喔！"
  },
  {
   "who": "director",
   "emotion": "開心",
   "text": "{name}，這是第一枚文物守護章。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "（集章冊：台北 ✔　文物圖鑑：翠玉白菜）"
  },
  {
   "who": "director",
   "emotion": "開心",
   "text": "「台北小偵探」這個稱號，送給你！"
  }
 ],
 "D_C01_ZHE_JOIN": [
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "{name}！下一次冒險，我也要去！"
  },
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "我不想只聽故事，偵探筆記我來寫！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "咕！可以，但是不能跟怪物打架喔。"
  },
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "我躲在後面幫你加油，這樣可以吧？"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "我會跟林老師和你們家人說好。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "每一站都有大人幫忙，放假才出發喔。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "阿哲加入了！（會跟著走，不參加戰鬥）"
  }
 ],
 "D_C01_CARD_NEXT": [
  {
   "who": "classmate",
   "emotion": "驚訝",
   "text": "這是怪盜留下的卡片！一起念！"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「一個『天』字，一盞『燈』，」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「合起來，會飛上天。」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「去找它們元宵節飛最多的地方。」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「那裡的小火車，終點站叫菁桐。」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「附註：斗篷的洞，我自己會補。」"
  },
  {
   "who": "classmate",
   "emotion": "平靜",
   "text": "天加燈……會飛上天的燈？"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "謎題記進偵探筆記了，隨時可以重看！"
  }
 ],
 "D_BOSS_DUDU_B": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "嘟嘟號的發條轉完了，坐下來呼呼睡。"
  },
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "壺蓋裡有一把銅鑰匙，刻著海鷗！"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「鑰匙給你們，燈座要照順序點喔。」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「附註：嘟嘟號很怕癢，請不要搔它。」"
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "燈座的順序……牆上應該有線索。"
  }
 ],
 "D_STAMPBOOK_HINT": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "集章冊每一頁，都留給一枚文物守護章。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "每學會一個新單元，下面就亮一格！"
  }
 ],
 "D_C01_NODE_OPEN": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "到了新地方，題目也多了新單元喔！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "第一次遇到的單元，阿咕會陪你看。"
  }
 ],
 "D_C01_ASK_AGU_FIRST": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！不知道下一步，就按「問阿咕」。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "第一次先說聽到的線索，再問才給方向。"
  }
 ],
 "D_C01_ASK_AGU_NONE": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "現在沒有要追的線索，四處逛逛吧！"
  }
 ],
 "D_MON_FIRST_CLOCKBUG": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "發條小蟲喀啦喀啦衝過來了！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "它背上有鑰匙，是怪盜做的機關！"
  }
 ],
 "D_MON_FIRST_MINECART": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "轟隆轟隆！礦車自己衝過來了！"
  }
 ],
 "D_MRT_LOCKED": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先聽陳館長說完，再出發喔。"
  }
 ],
 "D_MRT_FIRST": [
  {
   "who": "mrt_staff",
   "emotion": "平靜",
   "text": "排隊候車，先下車、再上車。"
  },
  {
   "who": "mrt_staff",
   "emotion": "平靜",
   "text": "過了黃線就不能吃東西，連喝水也不行。"
  },
  {
   "who": "hero",
   "emotion": "開心",
   "text": "好！我會遵守規矩。"
  }
 ],
 "D_C01_MRT_ARRIVE_T04": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！士林站到了！"
  }
 ],
 "D_C01_MRT_ARRIVE_T05": [
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！龍山寺站到了！"
  }
 ],
 "D_DIRECTOR_IDLE": [
  {
   "who": "director",
   "emotion": "擔心",
   "text": "白菜就拜託你們了……我在這裡等消息。"
  }
 ],
 "D_DIRECTOR_IDLE_END": [
  {
   "who": "director",
   "emotion": "開心",
   "text": "白菜能回家，都是大家的功勞！"
  }
 ],
 "D_DESK_IDLE": [
  {
   "who": "desk",
   "emotion": "平靜",
   "text": "不知道去哪裡，就打開偵探筆記看看。"
  },
  {
   "who": "desk",
   "emotion": "平靜",
   "text": "累了可以去休息站，不用錢喔。"
  }
 ],
 "D_C01_DESK_IDLE_END": [
  {
   "who": "desk",
   "emotion": "開心",
   "text": "聽說你找回了翠玉白菜！真了不起！"
  }
 ],
 "D_CLASSMATE_IDLE": [
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "我在顧我們班的展板，有線索就來找我！"
  }
 ],
 "D_CLASSMATE_IDLE_END": [
  {
   "who": "classmate",
   "emotion": "開心",
   "text": "下一站有什麼好吃的？我先記下來！"
  }
 ],
 "D_C01_TEACHER_IDLE": [
  {
   "who": "c01_teacher",
   "emotion": "擔心",
   "text": "陳館長說你在幫忙，要注意安全喔。"
  },
  {
   "who": "c01_teacher",
   "emotion": "平靜",
   "text": "其他同學我會顧好，放心。"
  }
 ],
 "D_C01_TEACHER_IDLE_END": [
  {
   "who": "c01_teacher",
   "emotion": "開心",
   "text": "回學校要上台分享，大家都想聽！"
  }
 ],
 "D_C01_LEADER_IDLE": [
  {
   "who": "c01_leader",
   "emotion": "擔心",
   "text": "展板明天要給大家看，我好緊張。"
  }
 ],
 "D_C01_LEADER_IDLE_END": [
  {
   "who": "c01_leader",
   "emotion": "開心",
   "text": "展板沒有錯字了，謝謝你幫忙！"
  }
 ],
 "D_C01_SAGE_MEET": [
  {
   "who": "sage",
   "emotion": "平靜",
   "text": "嗯——小朋友，來看地圖展區嗎？"
  },
  {
   "who": "hero",
   "emotion": "驚訝",
   "text": "請問您是……"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "大家叫我方爺爺，以前是畫地圖的人。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "逐家攏叫我方阿公，以早是畫地圖的人。",
    "tailo": "Ta̍k-ke lóng kiò guá Png a-kong, í-tsá sī uē tē-tôo ê lâng.",
    "huayu": "大家叫我方爺爺，以前是畫地圖的人。"
   }
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "咕！聽說方爺爺是博覽會的地圖賢者！"
  },
  {
   "who": "sage",
   "emotion": "開心",
   "text": "賢者不敢當。想學看地圖，就來找我。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "賢者受袂起。想欲學看地圖，就來揣我。",
    "tailo": "Hiân-tsiá siū-bē-khí. Siūnn-beh o̍h khuànn tē-tôo, tō lâi tshuē guá.",
    "huayu": "賢者不敢當。想學看地圖，就來找我。"
   }
  }
 ],
 "D_C01_INN_IDLE_END": [
  {
   "who": "inn",
   "emotion": "開心",
   "text": "小偵探回來啦？今天好好休息喔。"
  }
 ],
 "D_C01_TAM_IDLE": [
  {
   "who": "c01_tam_guide",
   "emotion": "擔心",
   "text": "齒輪不夠，星星就排不出來……"
  }
 ],
 "D_C01_TAM_IDLE_END": [
  {
   "who": "c01_tam_guide",
   "emotion": "開心",
   "text": "星空會跟著季節改變，下次再來看喔。"
  }
 ],
 "D_C01_TRAVELER_IDLE_END": [
  {
   "who": "traveler",
   "emotion": "開心",
   "text": "I like the museum!（我喜歡博物館！）"
  }
 ],
 "D_C01_STARKID_IDLE": [
  {
   "who": "c01_star_kid",
   "emotion": "擔心",
   "text": "節目停了，我好想看星星喔。"
  }
 ],
 "D_C01_STARKID_IDLE_END": [
  {
   "who": "c01_star_kid",
   "emotion": "開心",
   "text": "我看到海鷗星星了！你也看到了嗎？"
  }
 ],
 "D_C01_SMITH_IDLE": [
  {
   "who": "c01_smith",
   "emotion": "開心",
   "text": "要冒險，先挑一把順手的武器！"
  }
 ],
 "D_C01_GRANDPA_IDLE_END": [
  {
   "who": "grandpa",
   "emotion": "開心",
   "text": "現在我自己會看路線圖了，謝謝你喔。"
  }
 ],
 "D_C01_HERB_IDLE": [
  {
   "who": "c01_herb_aunt",
   "emotion": "開心",
   "text": "這條巷子都是賣青草的店喔。"
  }
 ],
 "D_C01_HERB_IDLE_END": [
  {
   "who": "c01_herb_aunt",
   "emotion": "開心",
   "text": "香草葉都晒好了，聞起來涼涼的吧？"
  }
 ],
 "D_C01_SNACK_IDLE": [
  {
   "who": "c01_snack",
   "emotion": "開心",
   "text": "走累了嗎？吃點東西再出發！"
  }
 ],
 "D_C01_PATROL_IDLE": [
  {
   "who": "c01_patrol",
   "emotion": "平靜",
   "text": "坑道裡的光，到底是什麼呢……"
  }
 ],
 "D_C01_PATROL_IDLE_END": [
  {
   "who": "c01_patrol",
   "emotion": "開心",
   "text": "坑道安靜了。我每天還是會來巡一巡。"
  }
 ],
 "D_C01_RUNNER_IDLE": [
  {
   "who": "c01_runner",
   "emotion": "擔心",
   "text": "最近山上常有喀啦喀啦的聲音，好怪。"
  }
 ],
 "D_C01_RUNNER_IDLE_END": [
  {
   "who": "c01_runner",
   "emotion": "開心",
   "text": "聲音不見了！今天跑起來好舒服。"
  }
 ],
 "D_C01_BOAT_IDLE": [
  {
   "who": "c01_boatman",
   "emotion": "平靜",
   "text": "船要開以前，貨都要先搬上去。"
  }
 ],
 "D_C01_BOAT_IDLE_END": [
  {
   "who": "c01_boatman",
   "emotion": "開心",
   "text": "又是你們？今天的河水很平靜。"
  }
 ],
 "D_C01_PORTER_IDLE": [
  {
   "who": "c01_porter",
   "emotion": "擔心",
   "text": "貨箱好多，數到一半就忘了……"
  }
 ],
 "D_C01_PORTER_IDLE_END": [
  {
   "who": "c01_porter",
   "emotion": "開心",
   "text": "你教我分堆數，現在快多了！"
  }
 ],
 "D_C01_CLOTH_IDLE": [
  {
   "who": "c01_cloth_aunt",
   "emotion": "開心",
   "text": "這塊花布，做衣服最好看。"
  }
 ],
 "D_C01_CLOTH_IDLE_END": [
  {
   "who": "c01_cloth_aunt",
   "emotion": "開心",
   "text": "那個鑑定師是怪盜？難怪怪怪的。"
  }
 ],
 "D_C01_OLDKID_IDLE": [
  {
   "who": "c01_old_kid",
   "emotion": "驚訝",
   "text": "你們的衣服好奇怪，從哪裡來的？"
  }
 ],
 "D_C01_OLDKID_IDLE_END": [
  {
   "who": "c01_old_kid",
   "emotion": "開心",
   "text": "以後的台北，我一定要去看看！"
  }
 ],
 "D_C01_GROCER_IDLE": [
  {
   "who": "c01_grocer",
   "emotion": "開心",
   "text": "乾貨、雜貨，這裡都買得到！"
  }
 ],
 "D_C01_DDCINN_IDLE": [
  {
   "who": "c01_ddc_inn",
   "emotion": "開心",
   "text": "走累了就來休息，不收錢。"
  }
 ],
 "D_C01_DDCINN_IDLE_END": [
  {
   "who": "c01_ddc_inn",
   "emotion": "開心",
   "text": "時光旅人又來啦？房間幫你留著。"
  }
 ],
 "D_C01_S1A": [
  {
   "who": "c01_leader",
   "emotion": "擔心",
   "text": "展板上好像有寫錯的字……"
  },
  {
   "who": "c01_leader",
   "emotion": "平靜",
   "text": "{name}，幫我一起檢查三題好不好？"
  }
 ],
 "D_C01_S1B": [
  {
   "who": "c01_leader",
   "emotion": "開心",
   "text": "你一個字一個字看，好仔細！"
  },
  {
   "who": "c01_leader",
   "emotion": "平靜",
   "text": "服務台有圓山遺址旁柵門的鑰匙。"
  },
  {
   "who": "c01_leader",
   "emotion": "開心",
   "text": "小雯姊姊說，送你們走步道用！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（圓山遺址旁的柵門打開了）"
  }
 ],
 "D_C01_S2A": [
  {
   "who": "c01_star_kid",
   "emotion": "擔心",
   "text": "月亮有時候圓圓的，有時候彎彎的。"
  },
  {
   "who": "c01_star_kid",
   "emotion": "平靜",
   "text": "它是不是在變魔術？你知道嗎？"
  }
 ],
 "D_C01_S2B": [
  {
   "who": "c01_star_kid",
   "emotion": "開心",
   "text": "原來是這樣！我今天晚上要看月亮！"
  }
 ],
 "D_Q4_SIDE_1A": [
  {
   "who": "grandpa",
   "emotion": "擔心",
   "text": "哎喲，指北針一直轉，我的路線圖都亂掉了。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "哎喲喂，指北針一直踅，我的路線圖攏亂操操矣。",
    "tailo": "Ai-iō-uê, tsí-pak-tsiam it-ti̍t se̍h, guá ê lōo-suànn-tôo lóng luān-tshau-tshau--ah.",
    "huayu": "哎喲，指北針一直轉，我的路線圖都亂掉了。"
   }
  },
  {
   "who": "grandpa",
   "emotion": "擔心",
   "text": "我要去公園另一頭，找不到路了。",
   "taigi_needed": true,
   "taigi": {
    "hanji": "我欲去公園彼爿，揣無路矣。",
    "tailo": "Guá beh khì kong-hn̂g hit pîng, tshuē-bô lōo--ah.",
    "huayu": "我要去公園另一頭，找不到路了。"
   }
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "我來幫忙！我會看方位和圖例。"
  },
  {
   "who": "grandpa",
   "emotion": "開心",
   "text": "真好心。幫我看三題，好不好？",
   "taigi_needed": true,
   "taigi": {
    "hanji": "真好心。共我看三題，好無？",
    "tailo": "Tsin hó-sim. Kā guá khuànn sann tê, hó--bô?",
    "huayu": "真好心。幫我看三題，好不好？"
   }
  },
  {
   "who": "grandpa",
   "emotion": "平靜",
   "text": "看不懂，就去問博覽會的方爺爺。"
  }
 ],
 "D_C01_S3A": [
  {
   "who": "c01_herb_aunt",
   "emotion": "擔心",
   "text": "我晒的香草葉，被指北針轉得到處飛！"
  },
  {
   "who": "c01_herb_aunt",
   "emotion": "平靜",
   "text": "幫我找回 3 片，好嗎？"
  }
 ],
 "D_C01_S3B": [
  {
   "who": "c01_herb_aunt",
   "emotion": "開心",
   "text": "全部找回來了！謝謝你。"
  },
  {
   "who": "c01_herb_aunt",
   "emotion": "平靜",
   "text": "生病要看醫生喔，青草不能代替藥。"
  }
 ],
 "D_C01_S5A": [
  {
   "who": "c01_bpl_uncle",
   "emotion": "平靜",
   "text": "阿伯要把老碗分盒子裝，幫我算一算。"
  }
 ],
 "D_C01_S5B": [
  {
   "who": "c01_bpl_uncle",
   "emotion": "開心",
   "text": "謝謝你！",
   "taigi_needed": true,
   "taigi": {
    "hanji": "多謝你！",
    "tailo": "To-siā lí!",
    "huayu": "謝謝你！"
   }
  },
  {
   "who": "c01_bpl_uncle",
   "emotion": "開心",
   "text": "你算得又快又清楚，阿伯省好多事。"
  }
 ],
 "D_C01_S4A": [
  {
   "who": "c01_porter",
   "emotion": "擔心",
   "text": "船長要我數貨箱，我一直數錯……"
  },
  {
   "who": "c01_porter",
   "emotion": "平靜",
   "text": "小朋友，你會算數嗎？幫幫我！"
  }
 ],
 "D_C01_S4B": [
  {
   "who": "c01_porter",
   "emotion": "開心",
   "text": "先分堆再算，真是好方法！"
  }
 ],
 "D_C01_S6A": [
  {
   "who": "c01_old_kid",
   "emotion": "驚訝",
   "text": "你們從很久以後的台北來的？"
  },
  {
   "who": "c01_old_kid",
   "emotion": "開心",
   "text": "以後的人，都坐什麼車去上學？"
  }
 ],
 "D_C01_S6B": [
  {
   "who": "c01_old_kid",
   "emotion": "驚訝",
   "text": "地底下有火車跑來跑去？好厲害！"
  },
  {
   "who": "c01_old_kid",
   "emotion": "開心",
   "text": "我要好好長大，等著看那一天！"
  }
 ],
 "D_C01_MOB_T04A": [
  {
   "who": "c01_mob_t04a",
   "emotion": "驚訝",
   "text": "你是隔壁班的導覽員？聽說白菜不見了！"
  }
 ],
 "D_C01_MOB_T04A_END": [
  {
   "who": "c01_mob_t04a",
   "emotion": "開心",
   "text": "白菜回來了！下次換我當導覽員！"
  }
 ],
 "D_C01_MOB_T04B": [
  {
   "who": "c01_mob_t04b",
   "emotion": "擔心",
   "text": "騎車經過捷運站，吊環一直晃，好可怕。"
  }
 ],
 "D_C01_MOB_T04B_END": [
  {
   "who": "c01_mob_t04b",
   "emotion": "開心",
   "text": "吊環安靜多了，騎車也安心了。"
  }
 ],
 "D_C01_MOB_T04C": [
  {
   "who": "c01_mob_t04c",
   "emotion": "平靜",
   "text": "我帶孫子來看星星，節目卻停了。"
  }
 ],
 "D_C01_MOB_T04C_END": [
  {
   "who": "c01_mob_t04c",
   "emotion": "開心",
   "text": "孫子說海鷗星星最好看，一直講呢。"
  }
 ],
 "D_C01_MOB_T04D": [
  {
   "who": "c01_mob_t04d",
   "emotion": "平靜",
   "text": "我在畫至善園的亭子，水池好安靜。"
  }
 ],
 "D_C01_MOB_T04D_END": [
  {
   "who": "c01_mob_t04d",
   "emotion": "開心",
   "text": "今天想畫翠玉白菜，可惜不能帶畫架進去。"
  }
 ],
 "D_C01_MOB_T05A": [
  {
   "who": "c01_mob_t05a",
   "emotion": "平靜",
   "text": "剝皮寮的老房子，紅磚上有刻字喔。"
  }
 ],
 "D_C01_MOB_T05A_END": [
  {
   "who": "c01_mob_t05a",
   "emotion": "開心",
   "text": "我找到刻字的磚了！你找到了嗎？"
  }
 ],
 "D_C01_MOB_T05B": [
  {
   "who": "c01_mob_t05b",
   "emotion": "平靜",
   "text": "早上走一走，看看廟的屋頂，很舒服。"
  }
 ],
 "D_C01_MOB_T05B_END": [
  {
   "who": "c01_mob_t05b",
   "emotion": "開心",
   "text": "最近街上沒有喀啦喀啦的聲音了。"
  }
 ],
 "D_C01_MOB_T05C": [
  {
   "who": "c01_mob_t05c",
   "emotion": "擔心",
   "text": "送貨的時候，有小蟲咬我的推車輪子！"
  }
 ],
 "D_C01_MOB_T05C_END": [
  {
   "who": "c01_mob_t05c",
   "emotion": "開心",
   "text": "小蟲變少了，今天送貨好順。"
  }
 ],
 "D_C01_MOB_T05D": [
  {
   "who": "c01_mob_t05d",
   "emotion": "平靜",
   "text": "我帶學生來寫生，畫老街的騎樓。"
  }
 ],
 "D_C01_MOB_T05D_END": [
  {
   "who": "c01_mob_t05d",
   "emotion": "開心",
   "text": "有學生畫了一隻海鷗，說是怪盜。"
  }
 ],
 "D_C01_MOB_T07A": [
  {
   "who": "c01_mob_t07a",
   "emotion": "平靜",
   "text": "把茶梗一根一根挑掉，茶葉才漂亮。"
  }
 ],
 "D_C01_MOB_T07A_END": [
  {
   "who": "c01_mob_t07a",
   "emotion": "開心",
   "text": "又是你們？來，看我挑得多快！"
  }
 ],
 "D_C01_MOB_T07B": [
  {
   "who": "c01_mob_t07b",
   "emotion": "平靜",
   "text": "今天的茶葉要裝箱，等船來載。"
  }
 ],
 "D_C01_MOB_T07B_END": [
  {
   "who": "c01_mob_t07b",
   "emotion": "開心",
   "text": "貨都上船了，今天可以早點休息。"
  }
 ],
 "D_C01_MOB_T07C": [
  {
   "who": "c01_mob_t07c",
   "emotion": "開心",
   "text": "剛做好的糕餅，香香甜甜喔！"
  }
 ],
 "D_C01_MOB_T07C_END": [
  {
   "who": "c01_mob_t07c",
   "emotion": "開心",
   "text": "小客人又來了！今天也很香喔。"
  }
 ],
 "D_C01_MOB_T07D": [
  {
   "who": "c01_mob_t07d",
   "emotion": "平靜",
   "text": "這車布要送去市場，路上小心喔。"
  }
 ],
 "D_C01_MOB_T07D_END": [
  {
   "who": "c01_mob_t07d",
   "emotion": "平靜",
   "text": "布送到了，阿姨說要謝謝你們。"
  }
 ],
 "D_C01_MOB_T07E": [
  {
   "who": "c01_mob_t07e",
   "emotion": "平靜",
   "text": "我是店裡的學徒，晚上要練寫字。"
  }
 ],
 "D_C01_MOB_T07E_END": [
  {
   "who": "c01_mob_t07e",
   "emotion": "開心",
   "text": "你們以後的學校，也要練寫字嗎？"
  }
 ],
 "D_C01_MOB_T07F": [
  {
   "who": "c01_mob_t07f",
   "emotion": "開心",
   "text": "一起跳格子嗎？畫在地上就能玩！"
  }
 ],
 "D_C01_MOB_T07F_END": [
  {
   "who": "c01_mob_t07f",
   "emotion": "開心",
   "text": "以後的小孩，也會跳格子嗎？"
  }
 ],
 "D_C01_MOB_T08A": [
  {
   "who": "c01_mob_t08a",
   "emotion": "平靜",
   "text": "茶葉挑好了，就搬到碼頭等船。"
  }
 ],
 "D_C01_MOB_T08A_END": [
  {
   "who": "c01_mob_t08a",
   "emotion": "驚訝",
   "text": "昨晚旗桿上掛著一塊破布，是你們的嗎？"
  }
 ],
 "D_C01_GUILD_MEET": [
  {
   "who": "c01_guild",
   "emotion": "開心",
   "text": "歡迎來到冒險者公會的攤位！"
  },
  {
   "who": "c01_guild",
   "emotion": "平靜",
   "text": "等級夠了，就可以在這裡選一個職業。"
  },
  {
   "who": "c01_guild",
   "emotion": "平靜",
   "text": "台北這裡，只能先選初級職業喔。"
  },
  {
   "who": "c01_guild",
   "emotion": "開心",
   "text": "這次多了新職業「盜賊」！"
  },
  {
   "who": "c01_guild",
   "emotion": "平靜",
   "text": "盜賊動作快，會找機關，不是壞人喔。"
  }
 ],
 "D_C01_GUILD_LOCKED": [
  {
   "who": "c01_guild",
   "emotion": "平靜",
   "text": "再多累積一點經驗，等級夠了再來。"
  }
 ],
 "D_C01_GUILD_OPEN": [
  {
   "who": "c01_guild",
   "emotion": "開心",
   "text": "等級夠了！想好要當什麼了嗎？"
  },
  {
   "who": "c01_guild",
   "emotion": "平靜",
   "text": "選好以後，要換職業也可以再來找我。"
  }
 ],
 "D_C01_GUILD_DONE": [
  {
   "who": "c01_guild",
   "emotion": "開心",
   "text": "新職業很適合你！冒險加油！"
  }
 ],
 "D_C01_CARD_MANKA": [
  {
   "who": "guide",
   "emotion": "開心",
   "text": "（知識卡）我是導覽員宇翔，說說「艋舺」。"
  },
  {
   "who": "guide",
   "emotion": "平靜",
   "text": "萬華以前叫艋舺，和「獨木舟」有關。"
  },
  {
   "who": "guide",
   "emotion": "平靜",
   "text": "凱達格蘭族人划獨木舟，載番薯來河邊交易。"
  },
  {
   "who": "guide",
   "emotion": "平靜",
   "text": "1920 年，這裡才改名叫「萬華」。"
  }
 ],
 "D_C01_TD2_MURAL": [
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "壁畫上寫著："
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「太陽出來的地方先點，」"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "「再照時鐘走的方向，一座一座點過去。」"
  }
 ],
 "D_C01_TD2_PILLAR": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "石柱上刻著一支箭頭，旁邊寫著「北」。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上的方位盤，八個方位的字都寫著。"
  }
 ],
 "D_C01_TIME_AGAIN": [
  {
   "who": "director",
   "emotion": "平靜",
   "text": "想回大稻埕看看？時光機關還能用一次。"
  },
  {
   "who": "director",
   "emotion": "平靜",
   "text": "辦完事，從碼頭的圓盤就能回來喔。"
  }
 ],
 "D_C01_HINT_M1_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "館長請你看平面圖，找展櫃和出口。"
  }
 ],
 "D_C01_HINT_M1_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先看圖例，每個符號代表什麼。"
  }
 ],
 "D_C01_HINT_M2_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "館長說，外面的晃晃吊環身上有小發條。"
  }
 ],
 "D_C01_HINT_M2_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "晃晃吊環常在捷運站和故宮附近晃。"
  }
 ],
 "D_C01_HINT_M3_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "解說員姊姊說，小蟲跑到士林和萬華了。"
  }
 ],
 "D_C01_HINT_M3_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "兩個地方都要去，搭捷運就到得了。"
  }
 ],
 "D_C01_HINT_M4C1_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "阿哲說，故宮的志工可能看過他。"
  }
 ],
 "D_C01_HINT_M4C1_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "志工姊姊還在故宮展場裡。"
  }
 ],
 "D_C01_HINT_M4C2_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "阿哲說，剝皮寮有一位阿伯見過他。"
  }
 ],
 "D_C01_HINT_M4C2_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "剝皮寮在萬華，老店裡可以走進去。"
  }
 ],
 "D_C01_HINT_M4C3_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "阿哲說，天文館的姊姊也見過他。"
  }
 ],
 "D_C01_HINT_M4C3_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "天文館在士林，就在故宮那一帶。"
  }
 ],
 "D_C01_HINT_M4T_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "三條線索：放大鏡、白手套、看真假。"
  }
 ],
 "D_C01_HINT_M4T_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "什麼工作，會看古董是真是假？"
  }
 ],
 "D_C01_HINT_M5S_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "星空的藍字說：白菜在圓山的地底下。"
  }
 ],
 "D_C01_HINT_M5S_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "圓山有步道，巡守隊的人最熟。"
  }
 ],
 "D_C01_HINT_M5D_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "門上有三個空格，牆上有三幅刻痕。"
  }
 ],
 "D_C01_HINT_M5D_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "去看看刻痕上的字，和下面畫了幾個東西。"
  }
 ],
 "D_C01_HINT_M5L_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "壁畫說：太陽出來的地方先點。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "太陽從哪一邊出來呢？"
  }
 ],
 "D_C01_HINT_M5L_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "太陽從東邊出來，先點東邊。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "再往時鐘指針轉的方向，找下一座。"
  }
 ],
 "D_C01_HINT_M6A_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "船伕阿伯說，那個人去市場了。"
  }
 ],
 "D_C01_HINT_M6A_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "市場在街上，進去問問賣東西的人。"
  }
 ],
 "D_C01_HINT_M6B_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "布攤阿姨說，他要去碼頭搭船。"
  }
 ],
 "D_C01_HINT_M6B_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "回到碼頭，旗桿那一帶看看。"
  }
 ],
 "D_C01_HINT_M6C_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "白菜要送回原本的地方。"
  }
 ],
 "D_C01_HINT_M6C_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "陳館長在故宮展場等我們。"
  }
 ],
 "D_C01_HINT_CARD_1": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "卡片說：天字加燈字，會飛上天。"
  }
 ],
 "D_C01_HINT_CARD_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "元宵節很多燈飛上天的地方，在台北旁邊。"
  }
 ],
 "D_C01_HINT_SIDE_2": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "再去問問委託人，他說過要找什麼。"
  }
 ],
 "D_BOSS_C01_APPRAISER_A": [
  {
   "who": "hero",
   "emotion": "生氣",
   "text": "等一下！古董鑑定師，請把白菜還來！"
  },
  {
   "who": "c01_appraiser",
   "emotion": "神祕",
   "text": "哦？小朋友，讓我鑑定一下你的證件。"
  },
  {
   "who": "c01_appraiser",
   "emotion": "開心",
   "text": "嗯……這張導覽員證，是假的！"
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "我的證件是真的。你才是假的！"
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "偵探筆記寫著放大鏡、白手套、看真假。"
  },
  {
   "who": "hero",
   "emotion": "平靜",
   "text": "真的鑑定師，會把放大鏡借給大家看。"
  },
  {
   "who": "c01_appraiser",
   "emotion": "擔心",
   "text": "這、這是我的寶貝，不能借！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "咕！答對題目，讓他的道具停下來！"
  }
 ],
 "D_BOSS_C01_APPRAISER_P2": [
  {
   "who": "c01_appraiser",
   "emotion": "生氣",
   "text": "看我的放大鏡聚光！好亮好亮！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "別被閃到，先看清楚題目！"
  }
 ],
 "D_BOSS_C01_APPRAISER_P3": [
  {
   "who": "c01_appraiser",
   "emotion": "擔心",
   "text": "手、手套的灰塵拍不完了……"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "他慌了！再答對幾題！"
  }
 ],
 "D_BOSS_C01_APPRAISER_AGAIN": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "鑑定師還在碼頭。休息好了再來！"
  }
 ],
 "D_BOSS_C01_REVEAL": [
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "噹啷！放大鏡掉在地上。"
  },
  {
   "who": "hero",
   "emotion": "驚訝",
   "text": "鏡框上刻著一隻海鷗……和借條一樣！"
  },
  {
   "who": "classmate",
   "emotion": "驚訝",
   "text": "（偵探筆記上的海鷗，又出現了！）"
  },
  {
   "who": "hero",
   "emotion": "生氣",
   "text": "你就是怪盜夜光鷗！"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "砰！一陣藍色的煙冒出來……"
  },
  {
   "who": "kaito",
   "emotion": "開心",
   "text": "嘿嘿，被你看出來了！"
  },
  {
   "who": "kaito",
   "emotion": "開心",
   "text": "我就是怪盜夜光鷗！白菜只是借一下！"
  }
 ],
 "D_BOSS_C01_BENGBENG_A": [
  {
   "who": "kaito",
   "emotion": "開心",
   "text": "出來吧，發條螽斯蹦蹦號！"
  },
  {
   "who": "bengbeng",
   "emotion": "生氣",
   "text": "蹦！蹦蹦蹦！"
  },
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "好大的綠色蟲子機關！跳得好高！"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "答對題目，讓蹦蹦號停下來！"
  }
 ],
 "D_BOSS_C01_BENGBENG_P2": [
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "蹦蹦號跳得更快了！"
  },
  {
   "who": "kaito",
   "emotion": "開心",
   "text": "它的腳是我最得意的設計！"
  }
 ],
 "D_BOSS_C01_BENGBENG_P3": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "蹦蹦號的發條，越轉越慢了。"
  },
  {
   "who": "kaito",
   "emotion": "擔心",
   "text": "等、等等，你不要停啦！"
  }
 ],
 "D_BOSS_C01_BENGBENG_AGAIN": [
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "蹦蹦號還在跳。休息好了再來！"
  }
 ],
 "D_BOSS_C01_BENGBENG_B": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "蹦蹦號停下來，掉了一顆小齒輪。"
  },
  {
   "who": "kaito",
   "emotion": "擔心",
   "text": "可惡……今天就到這裡！"
  },
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "怪盜丟出煙霧，往旗桿跳上去——"
  },
  {
   "who": "kaito",
   "emotion": "驚訝",
   "text": "哎呀！斗篷卡在旗桿上了！"
  },
  {
   "who": "kaito",
   "emotion": "生氣",
   "text": "不、不准笑！我可是很帥的怪盜！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "斗篷扯破一角，怪盜手忙腳亂地跑走了。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "木箱留下來了！裡面是……翠玉白菜！"
  },
  {
   "who": "hero",
   "emotion": "開心",
   "text": "一片葉子都沒破！還有一張卡片。"
  }
 ],
 "D_C01_AUTO_NOTE_T01_8_18": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這裡是花博公園圓山園區。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "今天的博覽會，就在這座公園裡舉辦。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕！博覽會是故事編的，公園是真的喔。"
  }
 ],
 "D_C01_AUTO_NOTE_T01_47_16": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（知識卡）解說牌：圓山天文臺舊址。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1963 年，圓山天文臺在圓山正式啟用。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "它是士林天文館的前身喔。"
  }
 ],
 "D_C01_AUTO_GATE_T01_61_9": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "木柵門上了鎖，還不能過去。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先幫班長小芸的忙，她也許知道鑰匙。"
  }
 ],
 "D_C01_AUTO_GATE_T01_61_10": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "木柵門上了鎖，還不能過去。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先幫班長小芸的忙，她也許知道鑰匙。"
  }
 ],
 "D_C01_AUTO_NOTE_T04_51_11": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這是外雙溪。溪水清清的，慢慢流著。"
  },
  {
   "who": "agu",
   "emotion": "擔心",
   "text": "溪邊的石頭很滑，不要下水玩喔。"
  }
 ],
 "D_C01_AUTO_NOTE_T05_5_33": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "牆上有一塊紅磚，刻著「TR」兩個字母。"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "附近的牆縫，好像有風吹出來……"
  },
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "咕？牆縫裡面，會不會有路？"
  }
 ],
 "D_C01_AUTO_NOTE_T06_37_15": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "一間長滿藤蔓的舊崗哨，門窗都空了。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這條步道沿線，以前有很多崗哨。"
  },
  {
   "who": "agu",
   "emotion": "擔心",
   "text": "裡面暗暗的，我們在外面看就好。"
  }
 ],
 "D_C01_AUTO_GATE_T06_48_7": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "坑道口的鐵柵鎖著，還不能進去。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "巡守隊阿伯管這裡，要先請他幫忙。"
  }
 ],
 "D_C01_AUTO_GATE_T06_49_7": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "坑道口的鐵柵鎖著，還不能進去。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "巡守隊阿伯管這裡，要先請他幫忙。"
  }
 ],
 "D_C01_AUTO_GATE_T06_54_9": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "木柵門上了鎖，還不能過去。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先幫班長小芸的忙，她也許知道鑰匙。"
  }
 ],
 "D_C01_AUTO_GATE_T06_54_10": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "木柵門上了鎖，還不能過去。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "先幫班長小芸的忙，她也許知道鑰匙。"
  }
 ],
 "D_C01_AUTO_NOTE_T07_47_39": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "竹篩一排一排，茶葉的香味飄過來。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "大稻埕有很多茶行，在這裡把茶做好。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕，難怪整條街都是茶香！"
  }
 ],
 "D_C01_AUTO_NOTE_T08_18_16": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這根旗桿，是碼頭上最高的。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "旗桿上掛著一面白白的布旗。"
  }
 ],
 "D_C01_AUTO_NOTE_TI1_13_9": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這是放翠玉白菜的玻璃展櫃。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "展櫃只有館方的人可以打開。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "我們用眼睛看，不用手碰。"
  }
 ],
 "D_C01_AUTO_NOTE_TI1_10_4": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "導覽牌：翠玉白菜，清朝的玉器。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "藝術家利用玉石天然的顏色雕刻出來。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "它只有 18.7 公分長，小小一顆。"
  }
 ],
 "D_C01_AUTO_NOTE_TI1_25_13": [
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "互動展區：拿放大鏡，看看文物的小地方。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕，偵探也要會看小地方喔！"
  }
 ],
 "D_C01_AUTO_NOTE_TI2_14_8": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這是宇宙劇場的星象投影機。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "它會把滿天星星，投在圓圓的屋頂上。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "宇宙劇場可以坐 300 人一起看。"
  }
 ],
 "D_C01_AUTO_NOTE_TI2_12_5": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "行星模型排成一排，大大小小都有。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "太陽系有八顆行星，地球是第三顆。"
  }
 ],
 "D_C01_AUTO_NOTE_TI2_24_6": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "天文望遠鏡模型。用它可以看清遠方的星星。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕，天文館裡也有真的觀測室喔。"
  }
 ],
 "D_C01_AUTO_NOTE_TI3_4_7": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "一排舊碗盤，有的碗邊畫著藍色花紋。"
  },
  {
   "who": "agu",
   "emotion": "擔心",
   "text": "這些是阿伯的寶貝，看就好，不要摸。"
  }
 ],
 "D_C01_AUTO_NOTE_TI3_16_7": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "木櫃上有好多小抽屜，一格一格的。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "以前的藥鋪，用小抽屜分開放藥材。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "生病要看醫生，不要自己亂吃喔。"
  }
 ],
 "D_C01_AUTO_NOTE_TI3_18_4": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "老照片裡，是一排窄窄長長的老街屋。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "以前的人在這裡開店，也住在這裡。"
  }
 ],
 "D_C01_AUTO_NOTE_TI4_4_8": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "一捲一捲的布，花色好多。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "布攤阿姨把布疊得整整齊齊。"
  }
 ],
 "D_C01_AUTO_NOTE_TI4_25_8": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "香菇和各種乾貨，堆得高高的。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這一帶是南北貨、布和中藥的批發地。"
  }
 ],
 "D_C01_AUTO_NOTE_TI4_18_4": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "黃昏的光，從屋頂的高窗灑下來。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕，市場裡亮亮的，不用點燈。"
  }
 ],
 "D_C01_AUTO_NOTE_TD1_3_25": [
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "牆上刻著一個大大的「百」字。"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "字的下面，刻著 3 盞油燈。"
  }
 ],
 "D_C01_AUTO_NOTE_TD1_53_25": [
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "牆上刻著一個大大的「十」字。"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "字的下面，刻著 6 個齒輪。"
  }
 ],
 "D_C01_AUTO_NOTE_TD1_21_17": [
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "牆上刻著一個大大的「一」字。"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "字的下面，刻著 2 顆星星。"
  }
 ],
 "D_C01_AUTO_NOTE_TD1_51_19": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這面牆的顏色比旁邊淺，有一條裂縫。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "牆角還有一小堆碎石。"
  },
  {
   "who": "narrator",
   "emotion": "驚訝",
   "text": "輕輕一推，牆縮進去，露出一條窄路！"
  }
 ],
 "D_C01_AUTO_GATE_TD1_28_13": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "門上有三個格子，寫著「百」「十」「一」。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "三個格子都填對，門才會打開。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "填錯也沒關係，可以一直試。"
  }
 ],
 "D_C01_AUTO_GATE_TD1_29_13": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "門上有三個格子，寫著「百」「十」「一」。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "三個格子都填對，門才會打開。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "填錯也沒關係，可以一直試。"
  }
 ],
 "D_C01_AUTO_FLOOR_24_12": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「北」。"
  }
 ],
 "D_C01_AUTO_FLOOR_27_12": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「東北」。"
  }
 ],
 "D_C01_AUTO_FLOOR_27_15": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「東」。"
  }
 ],
 "D_C01_AUTO_FLOOR_27_18": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「東南」。"
  }
 ],
 "D_C01_AUTO_FLOOR_24_18": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「南」。"
  }
 ],
 "D_C01_AUTO_FLOOR_21_18": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「西南」。"
  }
 ],
 "D_C01_AUTO_FLOOR_21_15": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「西」。"
  }
 ],
 "D_C01_AUTO_FLOOR_21_12": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "地上刻著「西北」。"
  }
 ],
 "D_C01_TD1_CODE_WRONG": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "門沒有動。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "（可以再輸入一次。）"
  }
 ],
 "D_C01_TD1_CRACK_AGAIN": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "牆裡的窄路還開著。"
  }
 ],
 "D_C01_TD2_BASE_EMPTY": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這裡只有燈座的底座，沒有燈。"
  }
 ],
 "D_C01_FLAGPOLE_END": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "旗桿上卡著一小塊斗篷，風一吹就飄。"
  },
  {
   "who": "agu",
   "emotion": "開心",
   "text": "咕，那是怪盜的！他跑得太急了。"
  }
 ],
 "D_C01_CARD_HID_KATYDID": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "（知識卡）咕！這裡藏著一張卡片！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "翠玉白菜上有兩隻蟲：大螽斯和小蝗蟲。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "牠們很會生孩子，有多子多孫的好意思。"
  },
  {
   "who": "narrator",
   "emotion": "神祕",
   "text": "螽斯的觸角，很久以前就斷了一根。"
  }
 ],
 "D_C01_CARD_HID_OBSERVATORY": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "（知識卡）咕！布幕裡藏著一張老卡片！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1938 年，報社把屋頂的觀測臺送給臺北。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "後來蓋了圓山天文臺，1963 年啟用。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "2000 年，圓山天文臺拆除了。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "現在，換天文館陪大家看星星。"
  }
 ],
 "D_C01_CARD_HID_TRBRICK": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "（知識卡）咕！這裡有一塊刻字的紅磚！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "「TR」是台灣煉瓦株式會社的簡稱。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "一塊 TR 磚重二公斤多，是很有名的紅磚。"
  },
  {
   "who": "narrator",
   "emotion": "開心",
   "text": "剝皮寮的老牆上，也找得到 TR 磚喔。"
  }
 ],
 "D_C01_CARD_HID_YONGLE_NAME": [
  {
   "who": "agu",
   "emotion": "驚訝",
   "text": "（知識卡）咕！布匹堆裡藏著一張卡片！"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "大稻埕市場在 1897 年開張。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1908 年，市場搬到大稻埕蘆竹腳街。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1933 年，改名叫「永樂町市場」。"
  }
 ],
 "D_C01_CARD_YUANSHAN_SITE": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "很久很久以前，人們在這裡吃完貝類，把殼堆成「貝塚」。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這裡是國定考古遺址。"
  }
 ],
 "D_C01_CARD_NPM": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "外雙溪的故宮新館，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "在 1965 年 11 月 12 日正式開放。"
  }
 ],
 "D_C01_CARD_ZHISHAN": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "至善園是故宮旁的庭園，1984 年動工，園裡有蘭亭和龍池。"
  }
 ],
 "D_C01_CARD_TAM": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "天文館在 1997 年 7 月 20 日全面開館。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "宇宙劇場可以坐 300 人，一起看滿天星星。"
  }
 ],
 "D_C01_CARD_LUNGSHAN": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "龍山寺在清朝乾隆三年（1738 年）開始興建，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "2018 年升格為國定古蹟。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "進廟參觀要輕聲細語。"
  }
 ],
 "D_C01_CARD_BOPILIAO": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這條老街保留了清代、日治和戰後三個時期的房子，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "2009 年修復完成後開放參觀。"
  }
 ],
 "D_C01_CARD_HERBLANE": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "青草巷是從清代就有的老街之一，巷子裡都是賣青草的店，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "是北臺灣最大的青草藥集散地。"
  }
 ],
 "D_C01_CARD_JIANTAN": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這條步道沿途有「圓山十美」的景點。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "在老地方觀機平臺，可以看飛機起降。"
  }
 ],
 "D_C01_CARD_KEELUNG_RIVER": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "從步道的稜線，可以看到基隆河、松山機場，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "還能遠望淡水河和觀音山。"
  }
 ],
 "D_C01_CARD_TUNNEL_GATE": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "這是遊戲裡的坑道入口，參考圓山一帶的地形畫的，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "真實的坑道不能隨便進去。"
  }
 ],
 "D_C01_CARD_GRANDHOTEL": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "山上紅柱黃瓦的大樓是圓山大飯店，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "14 層的宮殿式大樓在 1973 年蓋好。"
  }
 ],
 "D_C01_CARD_XIAHAI": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "霞海城隍廟在 1859 年蓋好，到現在還在迪化街上。"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "廟很小，但很有名。"
  }
 ],
 "D_C01_CARD_YONGLE": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "大稻埕的市場在 1908 年搬到這裡，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "後來改名叫「永樂町市場」。"
  }
 ],
 "D_C01_CARD_DDC_TRADE": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "很久以前，茶葉、布、南北貨和中藥材，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "都從大稻埕的碼頭運進運出。"
  }
 ],
 "D_C01_CARD_DDC_PIER": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1860 年淡水開港以後，大稻埕成為對外做生意的地方，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "河邊越來越熱鬧。"
  }
 ],
 "D_C01_CARD_TEA_SHIP": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1860 年代，有人在大稻埕把茶葉做好，裝船送到美國紐約，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "很受歡迎。"
  }
 ],
 "D_C01_CARD_TAMSUI_RIVER": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "後來河道淤淺，大船開不進來，碼頭就慢慢安靜下來。"
  }
 ],
 "D_C01_CARD_TFAM": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "美術館的房子像一個『井』字，"
  },
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "1983 年 12 月 24 日開館。"
  }
 ],
 "D_C01_TD1_EASTDOOR_LOCKED": [
  {
   "who": "narrator",
   "emotion": "平靜",
   "text": "鐵門從裡面門住了，推不開。"
  },
  {
   "who": "agu",
   "emotion": "平靜",
   "text": "咕……也許坑道裡面有開門的拉桿。"
  }
 ]
};
// 細規格缺台詞、先用身分描述或名稱代替的對話（之後劇情補上就拿掉）
window.DIALOGS_PLACEHOLDER_C01 = {};
