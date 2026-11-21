/*
 * 勇者大冒險II — 台北章商店與新道具定價（給前端A2 對照 items.js）
 * 由工具產生（tools/build_content.js），請勿手動修改：請改 content/ch01/ 再重跑 node tools/build_content.js
 * 來源：content/ch01/shops.json（數值第 9.2 節定價、關卡第八節貨架）
 */
window.SHOPS = Object.assign(window.SHOPS || {}, {
 "c01_item_expo": {
  "name": "博覽會紀念品店",
  "items": [
   "herb",
   "c01_candy",
   "c01_smoke",
   "c01_ticket",
   "eraser",
   "guide"
  ]
 },
 "c01_item_ddc": {
  "name": "永樂市場南北貨攤",
  "items": [
   "herb",
   "c01_candy",
   "c01_smoke",
   "c01_longan",
   "c01_almond"
  ]
 },
 "c01_weapon_shilin": {
  "name": "士林武器防具店",
  "items": [
   "c01_baton",
   "c01_lens_rod",
   "c01_bamboo",
   "c01_dart_rope",
   "c01_letter_knife",
   "c01_vest",
   "c01_cap",
   "c01_shoes",
   "c01_raincape"
  ]
 },
 "c01_snack_wanhua": {
  "name": "萬華名產攤",
  "items": [
   "c01_herbtea",
   "c01_bittertea",
   "c01_cake",
   "c01_noodle"
  ]
 }
});
window.SHOP_PRICES_C01 = {
 "herb": {
  "name": "藥草",
  "price": 9,
  "effect": "回 HP 17",
  "formula": "回復藥：max(8, ROUND(2U))；ROUND(0.35×48)"
 },
 "c01_detox": {
  "name": "解毒草",
  "price": 5,
  "effect": "回 HP 8（第 1 章沒有中毒，只留回復）",
  "formula": "半瓶回復藥【建議】：max(5, ROUND(1.1U))、ROUND(0.175×48)"
 },
 "c01_candy": {
  "name": "提神糖",
  "price": 9,
  "effect": "回 MP 5",
  "formula": "和藥草同價；ROUND(0.35×13.7)【建議】"
 },
 "c01_smoke": {
  "name": "煙霧彈",
  "price": 5,
  "effect": "一般戰鬥逃跑一定成功（頭目戰不能用）",
  "formula": "1U【建議】"
 },
 "c01_ticket": {
  "name": "回程車票",
  "price": 5,
  "effect": "傳送到最後搭過的捷運站",
  "formula": "等於旅店價【建議】"
 },
 "eraser": {
  "name": "刪去卡",
  "price": 24,
  "effect": "同切片",
  "formula": "照第 3 節"
 },
 "guide": {
  "name": "引導卡",
  "price": 30,
  "effect": "同切片",
  "formula": "照第 3 節"
 },
 "c01_longan": {
  "name": "龍眼乾",
  "price": 9,
  "effect": "回 HP 17",
  "formula": "同藥草（日治時代的回復藥）"
 },
 "c01_almond": {
  "name": "杏仁茶",
  "price": 5,
  "effect": "回 HP 8（解除睡眠拿掉）",
  "formula": "同解毒草"
 },
 "c01_herbtea": {
  "name": "青草茶",
  "price": 19,
  "effect": "回 HP 29",
  "formula": "名產・回復：ROUND(4U)；ROUND(0.6×48)"
 },
 "c01_bittertea": {
  "name": "苦茶",
  "price": 31,
  "effect": "回 HP 48（全滿級）",
  "formula": "照名產比例：ROUND(4U×1.0/0.6)【建議】"
 },
 "c01_cake": {
  "name": "艋舺糕餅",
  "price": 23,
  "effect": "接下來 3 場防禦 +20%",
  "formula": "名產・增益：ROUND(5U)"
 },
 "c01_noodle": {
  "name": "麵線",
  "price": 14,
  "effect": "回 HP 17＋MP 5（全隊效果拿掉）",
  "formula": "藥草＋提神糖打 8 折：ROUND(3U)【建議】"
 },
 "c01_baton": {
  "name": "木製指揮棒",
  "price": 140,
  "effect": "攻擊 +3；通用（見習可用）",
  "formula": "第 1 章限定款強度（N1 裁定）"
 },
 "c01_bamboo": {
  "name": "竹節棍",
  "price": 310,
  "effect": "攻擊 +4；通用（精良款）",
  "formula": "×1.3、價格 ×2.2"
 },
 "c01_lens_rod": {
  "name": "放大鏡短杖",
  "price": 140,
  "effect": "攻擊 +3、魔力 +2；法杖類（魔法師、祭司）",
  "formula": "限定武器；魔力是【建議】"
 },
 "c01_dart_rope": {
  "name": "飛鏢繩",
  "price": 140,
  "effect": "攻擊 +3；飛刀・手套類（盜賊系）",
  "formula": "限定武器"
 },
 "c01_letter_knife": {
  "name": "開信刀",
  "price": 310,
  "effect": "攻擊 +4；飛刀・手套類（盜賊系，精良）",
  "formula": "精良款"
 },
 "c01_vest": {
  "name": "導覽員背心",
  "price": 110,
  "effect": "物防 +2；通用",
  "formula": "第 1 章限定款強度"
 },
 "c01_raincape": {
  "name": "雨衣斗篷",
  "price": 240,
  "effect": "物防 +3；通用（精良）",
  "formula": "×1.3、價格 ×2.2"
 },
 "c01_cap": {
  "name": "帆布帽",
  "price": 110,
  "effect": "物防 +2；輕甲類",
  "formula": "限定防具"
 },
 "c01_shoes": {
  "name": "夜行輕便鞋",
  "price": 240,
  "effect": "物防 +3；輕甲類（盜賊等，精良）",
  "formula": "精良款"
 }
};
