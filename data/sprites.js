/* 由 tools/build_art.py 自動產生（三年級版），勇者大冒險II 手動整理：
 * 第三批（2026-10-19）：四年級的 8 方向圖接上——主角 hero_novice（女，heroF_novice.png）、heroM_novice（男），每格 64×80、8 列
 *   （down, downleft, left, upleft, up, upright, right, downright；腳底對齊每格底部中央）；NPC 14 張（64×80、8 列，3 格目前都是站姿）；
 *   阿咕 pet_agu／npc_agu（npc_agu.png，每格 48×48、8 列）；怪物戰鬥圖 mon_*（256×256）、頭目 boss_dudu（448×448）——
 *   地圖上的怪物圖還沒交，先用戰鬥圖縮小（mapH：小怪 64px、頭目 120px）。
 * 其他職業的主角圖仍是沿用的三年級四方向圖（rows 明寫 4 方向；台北切片不能轉職，用不到）；寶箱、招牌、道具圖示沿用。
 * 美術：GPT 繪製＋程式後製。 */
window.SPRITES = {
 "hero_novice": {
  "file": "assets/chars/heroF_novice.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "hero_swordsman": {
  "file": "assets/chars/hero_swordsman.png",
  "type": "walk",
  "frameW": 33,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_mage": {
  "file": "assets/chars/hero_mage.png",
  "type": "walk",
  "frameW": 37,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_archer": {
  "file": "assets/chars/hero_archer.png",
  "type": "walk",
  "frameW": 33,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_bard": {
  "file": "assets/chars/hero_bard.png",
  "type": "walk",
  "frameW": 32,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_priest": {
  "file": "assets/chars/hero_priest.png",
  "type": "walk",
  "frameW": 35,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_novice": {
  "file": "assets/chars/heroM_novice.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "heroM_swordsman": {
  "file": "assets/chars/heroM_swordsman.png",
  "type": "walk",
  "frameW": 30,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_mage": {
  "file": "assets/chars/heroM_mage.png",
  "type": "walk",
  "frameW": 29,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_archer": {
  "file": "assets/chars/heroM_archer.png",
  "type": "walk",
  "frameW": 29,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_bard": {
  "file": "assets/chars/heroM_bard.png",
  "type": "walk",
  "frameW": 34,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_priest": {
  "file": "assets/chars/heroM_priest.png",
  "type": "walk",
  "frameW": 29,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "chest_closed": {
  "file": "assets/ui/chest_closed.png",
  "type": "single",
  "frameW": 45,
  "frameH": 44
 },
 "chest_open": {
  "file": "assets/ui/chest_open.png",
  "type": "single",
  "frameW": 38,
  "frameH": 44
 },
 "sign_weapon": {
  "file": "assets/ui/sign_weapon.png",
  "type": "single",
  "frameW": 39,
  "frameH": 44
 },
 "sign_armor": {
  "file": "assets/ui/sign_armor.png",
  "type": "single",
  "frameW": 39,
  "frameH": 44
 },
 "sign_item": {
  "file": "assets/ui/sign_item.png",
  "type": "single",
  "frameW": 40,
  "frameH": 44
 },
 "sign_inn": {
  "file": "assets/ui/sign_inn.png",
  "type": "single",
  "frameW": 40,
  "frameH": 44
 },
 "sign_general": {
  "file": "assets/ui/sign_general.png",
  "type": "single",
  "frameW": 40,
  "frameH": 44
 },
 "item_herb": {
  "file": "assets/items/item_herb.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_card_remove": {
  "file": "assets/items/item_card_remove.png",
  "type": "icon",
  "frameW": 26,
  "frameH": 32
 },
 "item_card_guide": {
  "file": "assets/items/item_card_guide.png",
  "type": "icon",
  "frameW": 25,
  "frameH": 32
 },
 "item_wood_sword": {
  "file": "assets/items/item_wood_sword.png",
  "type": "icon",
  "frameW": 31,
  "frameH": 32
 },
 "item_iron_sword": {
  "file": "assets/items/item_iron_sword.png",
  "type": "icon",
  "frameW": 32,
  "frameH": 32
 },
 "item_staff": {
  "file": "assets/items/item_staff.png",
  "type": "icon",
  "frameW": 30,
  "frameH": 32
 },
 "item_bow": {
  "file": "assets/items/item_bow.png",
  "type": "icon",
  "frameW": 30,
  "frameH": 32
 },
 "item_harp": {
  "file": "assets/items/item_harp.png",
  "type": "icon",
  "frameW": 31,
  "frameH": 32
 },
 "item_rod": {
  "file": "assets/items/item_rod.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_leather": {
  "file": "assets/items/item_leather.png",
  "type": "icon",
  "frameW": 31,
  "frameH": 32
 },
 "item_robe": {
  "file": "assets/items/item_robe.png",
  "type": "icon",
  "frameW": 33,
  "frameH": 32
 },
 "hero_fighter": {
  "file": "assets/chars/hero_fighter.png",
  "type": "walk",
  "frameW": 33,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_fighter": {
  "file": "assets/chars/heroM_fighter.png",
  "type": "walk",
  "frameW": 31,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_dancer": {
  "file": "assets/chars/hero_dancer.png",
  "type": "walk",
  "frameW": 38,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_dancer": {
  "file": "assets/chars/heroM_dancer.png",
  "type": "walk",
  "frameW": 31,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_sailor": {
  "file": "assets/chars/hero_sailor.png",
  "type": "walk",
  "frameW": 33,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_sailor": {
  "file": "assets/chars/heroM_sailor.png",
  "type": "walk",
  "frameW": 29,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_shepherd": {
  "file": "assets/chars/hero_shepherd.png",
  "type": "walk",
  "frameW": 35,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_shepherd": {
  "file": "assets/chars/heroM_shepherd.png",
  "type": "walk",
  "frameW": 34,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_jester": {
  "file": "assets/chars/hero_jester.png",
  "type": "walk",
  "frameW": 37,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_jester": {
  "file": "assets/chars/heroM_jester.png",
  "type": "walk",
  "frameW": 36,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_tamer": {
  "file": "assets/chars/hero_tamer.png",
  "type": "walk",
  "frameW": 31,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_tamer": {
  "file": "assets/chars/heroM_tamer.png",
  "type": "walk",
  "frameW": 27,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "hero_merchant": {
  "file": "assets/chars/hero_merchant.png",
  "type": "walk",
  "frameW": 33,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "heroM_merchant": {
  "file": "assets/chars/heroM_merchant.png",
  "type": "walk",
  "frameW": 30,
  "frameH": 50,
  "rows": [
   "down",
   "left",
   "right",
   "up"
  ]
 },
 "item_steel_sword": {
  "file": "assets/items/item_steel_sword.png",
  "type": "icon",
  "frameW": 30,
  "frameH": 32
 },
 "item_cloak": {
  "file": "assets/items/item_cloak.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_heavy_armor": {
  "file": "assets/items/item_heavy_armor.png",
  "type": "icon",
  "frameW": 33,
  "frameH": 32
 },
 "item_light_armor": {
  "file": "assets/items/item_light_armor.png",
  "type": "icon",
  "frameW": 27,
  "frameH": 32
 },
 "item_anchor_axe": {
  "file": "assets/items/item_anchor_axe.png",
  "type": "icon",
  "frameW": 28,
  "frameH": 32
 },
 "item_gloves": {
  "file": "assets/items/item_gloves.png",
  "type": "icon",
  "frameW": 31,
  "frameH": 32
 },
 "item_whip": {
  "file": "assets/items/item_whip.png",
  "type": "icon",
  "frameW": 32,
  "frameH": 32
 },
 "item_ribbon_fan": {
  "file": "assets/items/item_ribbon_fan.png",
  "type": "icon",
  "frameW": 35,
  "frameH": 32
 },
 "item_clapper": {
  "file": "assets/items/item_clapper.png",
  "type": "icon",
  "frameW": 37,
  "frameH": 32
 },
 "item_tamer_whip": {
  "file": "assets/items/item_tamer_whip.png",
  "type": "icon",
  "frameW": 38,
  "frameH": 32
 },
 "item_abacus_dagger": {
  "file": "assets/items/item_abacus_dagger.png",
  "type": "icon",
  "frameW": 31,
  "frameH": 32
 },
 "item_amulet": {
  "file": "assets/items/item_amulet.png",
  "type": "icon",
  "frameW": 32,
  "frameH": 32
 },
 "pet_agu": {
  "file": "assets/npcs/npc_agu.png",
  "type": "walk",
  "frameW": 48,
  "frameH": 48,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_agu": {
  "file": "assets/npcs/npc_agu.png",
  "type": "walk",
  "frameW": 48,
  "frameH": 48,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_sage": {
  "file": "assets/npcs/npc_sage.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_kaito": {
  "file": "assets/npcs/npc_kaito.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_volunteer": {
  "file": "assets/npcs/npc_volunteer.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_grandpa": {
  "file": "assets/npcs/npc_grandpa.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_guide": {
  "file": "assets/npcs/npc_guide.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_ranger": {
  "file": "assets/npcs/npc_ranger.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_desk": {
  "file": "assets/npcs/npc_desk.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_director": {
  "file": "assets/npcs/npc_director.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_classmate": {
  "file": "assets/npcs/npc_classmate.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_mrt_staff": {
  "file": "assets/npcs/npc_mrt_staff.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_shop": {
  "file": "assets/npcs/npc_shop.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_inn": {
  "file": "assets/npcs/npc_inn.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_traveler": {
  "file": "assets/npcs/npc_traveler.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "npc_stall": {
  "file": "assets/npcs/npc_stall.png",
  "type": "walk",
  "frameW": 64,
  "frameH": 80,
  "rows": [
   "down",
   "downleft",
   "left",
   "upleft",
   "up",
   "upright",
   "right",
   "downright"
  ]
 },
 "mon_strap": {
  "file": "assets/monsters/mon_strap.png",
  "type": "single",
  "frameW": 256,
  "frameH": 256,
  "mapH": 64
 },
 "mon_compass": {
  "file": "assets/monsters/mon_compass.png",
  "type": "single",
  "frameW": 256,
  "frameH": 256,
  "mapH": 64
 },
 "mon_bookworm": {
  "file": "assets/monsters/mon_bookworm.png",
  "type": "single",
  "frameW": 256,
  "frameH": 256,
  "mapH": 64
 },
 "mon_sparrow": {
  "file": "assets/monsters/mon_sparrow.png",
  "type": "single",
  "frameW": 256,
  "frameH": 256,
  "mapH": 64
 },
 "mon_steam": {
  "file": "assets/monsters/mon_steam.png",
  "type": "single",
  "frameW": 256,
  "frameH": 256,
  "mapH": 64
 },
 "boss_dudu": {
  "file": "assets/monsters/boss_dudu.png",
  "type": "single",
  "frameW": 448,
  "frameH": 448,
  "mapH": 120
 }
};
