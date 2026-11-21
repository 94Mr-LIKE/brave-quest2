/*
 * 勇者大冒險II — 道具與商店（沿用三年級版格式；GDD 4.7）
 *
 * id：eraser（刪去卡）、guide（引導卡）、snack（飯糰：GDD 4.7「點心改成飯糰」，回 HP 10，沒有寵物效果；id 沿用 snack，程式不用改）。
 * 四年級版沒有寵物餵食、親密度（GDD 2.2、7.2 B5）。
 * kind：consumable（消耗品）/ card（答題輔助卡）/ weapon / armor / material（素材，打獵委託要收集的）
 * 裝備欄位：atk / def / mp；fam＝類別（48 號 F2）；jobs＝專屬武器限定的職業（null＝看類別）；fx＝特效。數值依 07 第 5 節：木劍 ATK+3、皮衣 DEF+2（價格見下）。
 * 價格依 40 號報告（40_物價與住宿收費調整.md 第 6 節，老闆 2026-10-10 核准；法袍改 4,000）：
 *   藥草 15、飯糰 15（GDD 4.7）、刪去卡 40、引導卡 50、木劍 120、皮衣 100、職業武器 650／720、鐵劍 800、法袍 4,000。舊存檔的金幣不動。
 *   BQ2 v0.6 整合2：藥草 9（回 17）、刪去卡 24、引導卡 30 改成台北章規格值（ch01 03_數值 9.2、第 3 節）；飯糰與切片裝備不在台北章貨架，維持原值。
 * 素材是怪物掉落、交打獵委託用的任務素材：不賣、也不收購（老闆 2026-10-09 裁示，已拿掉原本的 sell 收購價）。
 * 本檔只賣道具與裝備，不賣真錢、沒有轉蛋。
 */
window.ITEMS = {
  // ── 消耗品與答題卡 ──
  herb:   { name: "藥草",       sprite: "item_herb",        kind: "consumable", price: 9,  effect: { hp: 17 },           desc: "吃了可以回復 17 點體力。" },
  snack:  { name: "飯糰",       sprite: "item_riceball",    kind: "consumable", price: 15, effect: { hp: 10 },           desc: "博覽會小攤賣的飯糰，吃了回復 10 點體力。" },
  eraser: { name: "刪去卡",     sprite: "item_card_remove", kind: "card",       price: 24, effect: { remove_option: 1 }, desc: "選擇題可以刪掉一個錯的選項。" },
  guide:  { name: "引導卡",     sprite: "item_card_guide",  kind: "card",       price: 30, effect: { hint_level: 4 },    desc: "打開第 3、4 層提示，告訴你課本哪裡有教。" },

  // ── 武器（v1.0 第一批：48 號 v2 第 3.2 節）──
  // fam＝26 號的武器類別（gen＝通用，大家都能用，含見習）；jobs＝專屬武器限定的職業；fx.dmg＝特效「攻擊傷害 +x」（普通攻擊和攻擊技能都乘上 1＋x）
  // 專屬武器攻擊都和鋼劍一樣 10（法杖 9＋魔力），畫面上的物攻劍士永遠最高；其他職業靠特效拉近（老闆 2026-10-12）
  wood_sword:   { name: "木劍",     sprite: "item_wood_sword", kind: "weapon", fam: "gen",     price: 120,  atk: 3,  def: 0, mp: 0, jobs: null,          desc: "輕輕的木劍，新手也拿得動。大家都能用。" },
  iron_sword:   { name: "鐵劍",     sprite: "item_iron_sword", kind: "weapon", fam: "gen",     price: 800,  atk: 8,  def: 0, mp: 0, jobs: null,          desc: "鐵匠師傅打的好劍。大家都能用。" },
  steel_sword:  { name: "鋼劍",     sprite: "item_steel_sword", kind: "weapon", fam: "sword",  price: 1000, atk: 10, def: 0, mp: 0, jobs: ["swordsman"], desc: "又硬又亮的鋼劍，劍士專用。劍士的力量最大，用它最順手。" },
  gloves:       { name: "拳套",     sprite: "item_gloves",     kind: "weapon", fam: "fist",    price: 1000, atk: 10, def: 0, mp: 0, jobs: ["fighter"],   desc: "包得緊緊的拳套，武鬥家專用。" },
  staff:        { name: "星光法杖", sprite: "item_staff",      kind: "weapon", fam: "staff",   price: 1000, atk: 9,  def: 0, mp: 8, jobs: ["mage"],      desc: "頂端有小星星的法杖，魔法師專用。魔力也會變多。" },
  rod:          { name: "祈願杖",   sprite: "item_rod",        kind: "weapon", fam: "staff",   price: 1000, atk: 9,  def: 1, mp: 6, jobs: ["priest"],    fx: { dmg: 0.55 }, fx_desc: "祈禱的光讓攻擊傷害 +55%", desc: "暖暖發光的手杖，祭司專用。" },
  ribbon_fan:   { name: "彩帶扇",   sprite: "item_ribbon_fan", kind: "weapon", fam: "perform", price: 1000, atk: 10, def: 0, mp: 0, jobs: ["dancer"],    fx: { dmg: 0.15 }, fx_desc: "舞動的彩帶讓攻擊傷害 +15%", desc: "一揮就飄出彩帶的扇子，舞者專用。" },
  bow:          { name: "海風弓",   sprite: "item_bow",        kind: "weapon", fam: "dagger",  price: 1000, atk: 10, def: 0, mp: 0, jobs: ["archer"],    desc: "輕巧的弓，弓箭手專用。" },
  harp:         { name: "貝殼豎琴", sprite: "item_harp",       kind: "weapon", fam: "perform", price: 1000, atk: 10, def: 0, mp: 0, jobs: ["bard"],      fx: { dmg: 0.50 }, fx_desc: "琴聲讓攻擊傷害 +50%", desc: "用貝殼裝飾的小豎琴，吟遊詩人專用。" },
  anchor_axe:   { name: "船錨斧",   sprite: "item_anchor_axe", kind: "weapon", fam: "axe",     price: 1000, atk: 10, def: 0, mp: 0, jobs: ["sailor"],    fx: { dmg: 0.15 }, fx_desc: "海浪的力氣讓攻擊傷害 +15%", desc: "船錨形狀的斧頭，船員專用。" },
  whip:         { name: "牧羊鞭",   sprite: "item_whip",       kind: "weapon", fam: "whip",    price: 1000, atk: 10, def: 0, mp: 0, jobs: ["shepherd"],  fx: { dmg: 0.10 }, fx_desc: "清脆的鞭聲讓攻擊傷害 +10%", desc: "趕羊用的長鞭，牧羊人專用。" },
  clapper:      { name: "開心響板", sprite: "item_clapper",    kind: "weapon", fam: "perform", price: 1000, atk: 10, def: 0, mp: 0, jobs: ["jester"],    fx: { dmg: 0.40 }, fx_desc: "啪啪的響聲讓攻擊傷害 +40%", desc: "一敲大家就笑的響板，搞笑藝人專用。" },
  tamer_whip:   { name: "馴獸鞭",   sprite: "item_tamer_whip", kind: "weapon", fam: "whip",    price: 1000, atk: 10, def: 0, mp: 0, jobs: ["tamer"],     fx: { dmg: 0.10 }, fx_desc: "朋友們聽到口令更有精神，攻擊傷害 +10%", desc: "綁著彩色繩子的鞭子，魔物大師專用。" },
  abacus_knife: { name: "算盤短刀", sprite: "item_abacus_dagger", kind: "weapon", fam: "dagger", price: 1000, atk: 10, def: 0, mp: 0, jobs: ["merchant"], fx: { dmg: 0.25 }, fx_desc: "算得又快又準，攻擊傷害 +25%", desc: "刀柄是算盤的短刀，商人專用。" },

  // ── 防具（48 號 3.3）──
  // 48 號 F13：圖示都交件了（2026-10-12）。算盤短刀的圖檔叫 item_abacus_dagger（美術命名），道具 id 仍是 abacus_knife
  leather:     { name: "皮衣",     sprite: "item_leather",     kind: "armor", fam: "gen",   price: 100,  atk: 0, def: 2, mp: 0, jobs: null, desc: "耐穿的冒險皮衣。大家都能穿。" },
  cloak:       { name: "旅行斗篷", sprite: "item_cloak",       kind: "armor", fam: "gen",   price: 3200, atk: 0, def: 4, mp: 0, jobs: null, desc: "擋風又擋雨的斗篷。大家都能穿。" },
  heavy_armor: { name: "鐵甲",     sprite: "item_heavy_armor", kind: "armor", fam: "heavy", price: 4000, atk: 0, def: 5, mp: 0, jobs: null, desc: "厚厚的鐵甲，劍士、船員能穿。" },
  light_armor: { name: "輕裝皮甲", sprite: "item_light_armor", kind: "armor", fam: "light", price: 4000, atk: 0, def: 5, mp: 0, jobs: null, desc: "輕巧好動的皮甲，武鬥家、舞者、弓箭手、牧羊人、搞笑藝人、魔物大師、商人能穿。" },
  robe:        { name: "法袍",     sprite: "item_robe",        kind: "armor", fam: "robe",  price: 4000, atk: 0, def: 4, mp: 5, jobs: null, desc: "織了花紋的長袍，魔法師、祭司、吟遊詩人能穿。魔力也會變多。" },

  // ── BQ2 v0.6 台北章裝備（03_數值 3.1 起始裝備、9.2 武器防具店 c01_smith）──
  // 新欄位：mdef（魔防）、elem（屬性武器；null＝無屬性）。fam knife＝飛刀・手套（D8-B 新類別，盜賊系）。
  // 起始裝備（家人給，不賣）：no_sell＝賣回 0。通用款第 1 章用限定款強度（待決 N1，暫用建議）。
  starter_stick:    { name: "練習木棒",   sprite: "item_starter_stick",  kind: "weapon", fam: "gen",   price: 0,   atk: 1, def: 0, mdef: 0, mp: 0, elem: null, jobs: null, no_sell: true, desc: "出發前家人給的木棒。大家都能用。" },
  cloth:            { name: "布衣",       sprite: "item_cloth",          kind: "armor",  fam: "gen",   price: 0,   atk: 0, def: 1, mdef: 0, mp: 0, jobs: null, no_sell: true, desc: "穿慣了的布衣服。大家都能穿。" },
  c01_baton:        { name: "木製指揮棒", sprite: "item_c01_baton",      kind: "weapon", fam: "gen",   price: 140, atk: 3, def: 0, mdef: 0, mp: 0, elem: null, jobs: null, desc: "樂隊指揮用的木棒，揮起來很順手。大家都能用。" },
  c01_bamboo:       { name: "竹節棍",     sprite: "item_c01_bamboo",     kind: "weapon", fam: "gen",   price: 310, atk: 4, def: 0, mdef: 0, mp: 0, elem: null, jobs: null, desc: "一節一節的竹棍，又輕又結實。大家都能用。" },
  c01_lens_rod:     { name: "放大鏡短杖", sprite: "item_c01_lens_rod",   kind: "weapon", fam: "staff", price: 140, atk: 3, def: 0, mdef: 0, mp: 2, elem: null, jobs: null, desc: "頂端裝著放大鏡的短杖，魔法師、祭司能用。魔力也會變多。" },
  c01_dart_rope:    { name: "飛鏢繩",     sprite: "item_c01_dart_rope",  kind: "weapon", fam: "knife", price: 140, atk: 3, def: 0, mdef: 0, mp: 0, elem: null, jobs: null, desc: "繩子綁著小飛鏢，甩出去再收回來。盜賊系能用。" },
  c01_letter_knife: { name: "開信刀",     sprite: "item_c01_letter_knife", kind: "weapon", fam: "knife", price: 310, atk: 4, def: 0, mdef: 0, mp: 0, elem: null, jobs: null, desc: "拆信用的小刀，刀口是鈍的，很安全。盜賊系能用。" },
  c01_vest:         { name: "導覽員背心", sprite: "item_c01_vest",       kind: "armor",  fam: "gen",   price: 110, atk: 0, def: 2, mdef: 0, mp: 0, jobs: null, desc: "小小導覽員的背心，口袋很多。大家都能穿。" },
  c01_raincape:     { name: "雨衣斗篷",   sprite: "item_c01_raincape",   kind: "armor",  fam: "gen",   price: 240, atk: 0, def: 3, mdef: 0, mp: 0, jobs: null, desc: "台北常下雨，有這件就不怕。大家都能穿。" },
  c01_cap:          { name: "帆布帽",     sprite: "item_c01_cap",        kind: "armor",  fam: "light", price: 110, atk: 0, def: 2, mdef: 0, mp: 0, jobs: null, desc: "輕輕的帆布帽，輕甲類。盜賊、武鬥家、舞者等能穿。" },
  c01_shoes:        { name: "夜行輕便鞋", sprite: "item_c01_shoes",      kind: "armor",  fam: "light", price: 240, atk: 0, def: 3, mdef: 0, mp: 0, jobs: null, desc: "走路沒有聲音的布鞋，輕甲類。盜賊、武鬥家、舞者等能穿。" },
  // 精英怪 e_minecart 的掉落（名產・回復；03_數值 2.4、9.2 名產攤 T05）
  c01_herbtea:      { name: "青草茶",     sprite: "item_c01_herbtea",    kind: "consumable", price: 19, effect: { hp: 29 }, desc: "萬華青草巷的青草茶，喝了回復 29 點體力。" },
  // ── BQ2 v0.6 整合：台北章道具店、南北貨攤、名產攤的消耗品（03_數值 9.2；content shops.json 的 SHOP_PRICES_C01）──
  // c01_smoke（逃跑一定成功）、c01_ticket（回最後搭過的捷運站）、c01_cake（3 場防禦 +20%）的效果引擎還沒接：
  // 先只能買、賣、收著（effect 欄位照規格寫好，接線見整合1_變更說明「仍是程式佔位」）
  c01_detox:        { name: "解毒草",     sprite: "item_c01_detox",      kind: "consumable", price: 5,  effect: { hp: 8 },  desc: "苦苦的小草，吃了回復 8 點體力。" },
  c01_candy:        { name: "提神糖",     sprite: "item_c01_candy",      kind: "consumable", price: 9,  effect: { mp: 5 },  desc: "甜甜的薄荷糖，吃了回復 5 點魔力。" },
  c01_smoke:        { name: "煙霧彈",     sprite: "item_c01_smoke",      kind: "consumable", price: 5,  effect: { flee: true, no_boss: true }, desc: "噗一聲冒出白煙，一般戰鬥一定逃得掉（頭目戰不能用）。" },
  c01_ticket:       { name: "回程車票",   sprite: "item_c01_ticket",     kind: "consumable", price: 5,  effect: { warp: "last_mrt" }, desc: "捷運的回程票，可以回到最後搭過的捷運站。" },
  c01_longan:       { name: "龍眼乾",     sprite: "item_c01_longan",     kind: "consumable", price: 9,  effect: { hp: 17 }, desc: "南北貨攤的龍眼乾，吃了回復 17 點體力。" },
  c01_almond:       { name: "杏仁茶",     sprite: "item_c01_almond",     kind: "consumable", price: 5,  effect: { hp: 8 },  desc: "熱熱的杏仁茶，喝了回復 8 點體力。" },
  c01_bittertea:    { name: "苦茶",       sprite: "item_c01_bittertea",  kind: "consumable", price: 31, effect: { hp: 48 }, desc: "很苦很苦的茶，喝了回復 48 點體力。" },
  c01_cake:         { name: "艋舺糕餅",   sprite: "item_c01_cake",       kind: "consumable", price: 23, effect: { guard: 0.2, battles: 3 }, desc: "萬華老店的糕餅，吃了接下來 3 場防禦變強。" },
  c01_noodle:       { name: "麵線",       sprite: "item_c01_noodle",     kind: "consumable", price: 14, effect: { hp: 17, mp: 5 }, desc: "熱呼呼的麵線，回復 17 點體力和 5 點魔力。" },

  // ── 素材（打獵委託）──
  // v1.0 立志小考通過的護身符（CTO Q6：職業名＋的護身符；珍貴道具，不能賣；不加能力）。圖示 item_amulet（2026-10-12 交件）
  amulet_swordsman: { name: "劍士的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的劍士」。" },
  amulet_fighter: { name: "武鬥家的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的武鬥家」。" },
  amulet_mage: { name: "魔法師的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的魔法師」。" },
  amulet_priest: { name: "祭司的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的祭司」。" },
  amulet_dancer: { name: "舞者的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的舞者」。" },
  amulet_archer: { name: "弓箭手的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的弓箭手」。" },
  amulet_bard: { name: "吟遊詩人的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的吟遊詩人」。" },
  amulet_sailor: { name: "船員的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的船員」。" },
  amulet_shepherd: { name: "牧羊人的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的牧羊人」。" },
  amulet_jester: { name: "搞笑藝人的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的搞笑藝人」。" },
  amulet_tamer: { name: "魔物大師的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的魔物大師」。" },
  amulet_merchant: { name: "商人的護身符", sprite: "item_amulet", kind: "key", price: 0, precious: true, desc: "通過立志小考的紀念。上面刻著「立志的商人」。" },
  // ── 任務素材（GDD 2.3：打獵委託要收集的；不賣、也不收購）──
  strap_spring: { name: "吊環的小發條", sprite: "item_strap_spring", kind: "material", price: 0, desc: "晃晃吊環身上掉下來的小發條，是怪盜機關的零件。" },
  clue_piece:   { name: "謎題碎片",     sprite: "item_clue_piece",   kind: "material", price: 0, desc: "謎題卡的碎片，邊邊有藍色光點。拼起來就看得懂。" },
  // BQ2 v0.6 台北章新素材（03_數值 2.4）
  star_gear:    { name: "星星齒輪",     sprite: "item_star_gear",    kind: "material", price: 0, desc: "天文館投影機的齒輪，被發條小蟲咬走了。" },
  herb_leaf:    { name: "香草葉",       sprite: "item_herb_leaf",    kind: "material", price: 0, desc: "青草巷要用的香草葉，聞起來涼涼的。" }
};

/* 商店：shop_id 對應 maps.js 的 shop.shop_id / extra_shops[].shop_id */
window.SHOPS = {
  // T01 紀念品店（GDD 4.7）
  expo:   { name: "博覽會紀念品店", items: ["herb", "snack", "eraser", "guide", "wood_sword", "leather"] },
  // T02 小攤（下一批才有地圖）
  stall:  { name: "溫泉街小攤",     items: ["herb", "snack"] },
  // 職業專屬武器、防具：台北切片沒有轉職（GDD 1.2），第 2 期再放到地圖上。沒開放的職業（JOB_RULES.open_jobs）的專屬武器，商店自動不列
  weapon: { name: "武器鋪", items: ["wood_sword", "iron_sword", "steel_sword", "gloves", "staff", "rod", "ribbon_fan", "bow", "harp", "anchor_axe", "whip", "clapper", "tamer_whip", "abacus_knife"] },
  armor:  { name: "防具店", items: ["leather", "cloak", "heavy_armor", "light_armor", "robe"] }
};