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
  "file": "assets/npcs/npc_kaito_c01.png",
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
  "file": "assets/npcs/npc_director_c01.png",
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
  "battle_sheet": {"file": "assets/monsters/mon_strap_battle.png", "cols": 8, "idle": 4, "attack": 8},
  "map_sheet": {"file": "assets/monsters/mon_strap_map4x4.png", "frameW": 80, "frameH": 80, "cols": 4, "rows": ["down", "left", "right", "up"], "shadow": false},
  "frameW": 256,
  "frameH": 256,
  "mapH": 64
 },
 "mon_compass": {
  "file": "assets/monsters/mon_compass.png",
  "type": "single",
  "frameW": 256,
  "frameH": 256,
  "mapH": 64,
  "battle_sheet": {
   "file": "assets/monsters/mon_compass_battle.png",
   "cols": 8,
   "idle": 4,
   "attack": 8
  },
  "map_sheet": {
   "file": "assets/monsters/mon_compass_map4x4.png",
   "frameW": 80,
   "frameH": 80,
   "cols": 4,
   "rows": [
    "down",
    "left",
    "right",
    "up"
   ],
   "shadow": false
  }
 },
 "mon_bookworm": {
  "file": "assets/monsters/mon_bookworm.png",
  "type": "single",
  "battle_sheet": {"file": "assets/monsters/mon_bookworm_battle.png", "cols": 8, "idle": 4, "attack": 8},
  "map_sheet": {"file": "assets/monsters/mon_bookworm_map4x4.png", "frameW": 80, "frameH": 80, "cols": 4, "rows": ["down", "left", "right", "up"], "shadow": false},
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
  "mapH": 64,
  "battle_sheet": {
   "file": "assets/monsters/mon_steam_battle.png",
   "cols": 8,
   "idle": 4,
   "attack": 8
  },
  "map_sheet": {
   "file": "assets/monsters/mon_steam_map4x4.png",
   "frameW": 80,
   "frameH": 80,
   "cols": 4,
   "rows": [
    "down",
    "left",
    "right",
    "up"
   ],
   "shadow": false
  }
 },
 "boss_dudu": {
  "file": "assets/monsters/boss_dudu.png",
  "type": "single",
  "battle_sheet": {"file": "assets/monsters/boss_dudu_battle.png", "cols": 8, "idle": 4, "attack": 8},
  "map_sheet": {"file": "assets/monsters/boss_dudu_map4x4.png", "frameW": 128, "frameH": 128, "cols": 4, "rows": ["down", "left", "right", "up"], "shadow": false},
  "frameW": 448,
  "frameH": 448,
  "mapH": 120
 },
 "mon_clockbug": {"file": "assets/monsters/mon_clockbug.png", "type": "single", "frameW": 256, "frameH": 256, "mapH": 64, "battle_sheet": {"file": "assets/monsters/mon_clockbug_battle.png", "cols": 8, "idle": 4, "attack": 8}, "map_sheet": {"file": "assets/monsters/mon_clockbug_map4x4.png", "frameW": 80, "frameH": 80, "cols": 4, "rows": ["down", "left", "right", "up"], "shadow": false}},
 "boss_b01_bengbeng": {
  "file": "assets/monsters/boss_b01_bengbeng.png",
  "type": "single",
  "frameW": 512,
  "frameH": 512,
  "mapH": 120,
  "battle_sheet": {
   "file": "assets/monsters/boss_b01_bengbeng_battle.png",
   "cols": 8,
   "idle": 4,
   "attack": 8
  },
  "map_sheet": {
   "file": "assets/monsters/boss_b01_bengbeng_map4x4.png",
   "frameW": 128,
   "frameH": 128,
   "cols": 4,
   "rows": [
    "down",
    "left",
    "right",
    "up"
   ],
   "shadow": false
  }
 },
 "boss_b01_appraiser": {
  "file": "assets/monsters/boss_b01_appraiser.png",
  "type": "single",
  "frameW": 448,
  "frameH": 448,
  "mapH": 80,
  "battle_sheet": {
   "file": "assets/monsters/boss_b01_appraiser_battle.png",
   "cols": 8,
   "idle": 4,
   "attack": 8
  },
  "map_sheet": {
   "file": "assets/monsters/boss_b01_appraiser_map4x4.png",
   "frameW": 64,
   "frameH": 80,
   "cols": 4,
   "rows": [
    "down",
    "left",
    "right",
    "up"
   ],
   "shadow": false
  }
 },
 "mon_e_minecart": {
  "file": "assets/monsters/mon_e_minecart.png",
  "type": "single",
  "frameW": 320,
  "frameH": 320,
  "mapH": 96,
  "battle_sheet": {
   "file": "assets/monsters/mon_e_minecart_battle.png",
   "cols": 8,
   "idle": 4,
   "attack": 8
  },
  "map_sheet": {
   "file": "assets/monsters/mon_e_minecart_map4x4.png",
   "frameW": 96,
   "frameH": 96,
   "cols": 4,
   "rows": [
    "down",
    "left",
    "right",
    "up"
   ],
   "shadow": false
  }
 },
 "npc_kaito_battle": {
  "file": "assets/npcs/npc_kaito_battle_idle.png",
  "type": "single",
  "frameW": 448,
  "frameH": 448,
  "battle_sheet": {
   "file": "assets/npcs/npc_kaito_battle.png",
   "cols": 8,
   "idle": 4,
   "attack": 4
  },
  "decor_scale": 0.8
 },
 "npc_c01_appraiser": {
  "file": "assets/npcs/npc_c01_appraiser.png",
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
 "pet_zhe": {
  "file": "assets/npcs/pet_zhe.png",
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
 "npc_c01_cloth_aunt": {
  "file": "assets/npcs/npc_c01_cloth_aunt.png",
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
 "obj_rest_lamp_bench": {
  "file": "assets/ui/obj_rest_lamp_bench.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_lamp_base_off": {
  "file": "assets/ui/obj_lamp_base_off.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_lamp_base_on": {
  "file": "assets/ui/obj_lamp_base_on.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_lamp_base_empty": {
  "file": "assets/ui/obj_lamp_base_empty.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_lever_up": {
  "file": "assets/ui/obj_lever_up.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_lever_down": {
  "file": "assets/ui/obj_lever_down.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_crack_wall": {
  "file": "assets/ui/obj_crack_wall.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "obj_crack_bush": {
  "file": "assets/ui/obj_crack_bush.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "fx_warp_ring_0": {
  "file": "assets/ui/fx_warp_ring_0.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "fx_warp_ring_1": {
  "file": "assets/ui/fx_warp_ring_1.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "fx_warp_ring_2": {
  "file": "assets/ui/fx_warp_ring_2.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "fx_warp_ring_3": {
  "file": "assets/ui/fx_warp_ring_3.png",
  "type": "single",
  "frameW": 48,
  "frameH": 72
 },
 "gate_code_closed": {
  "file": "assets/ui/gate_code_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_code_open": {
  "file": "assets/ui/gate_code_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_iron_closed": {
  "file": "assets/ui/gate_iron_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_iron_open": {
  "file": "assets/ui/gate_iron_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_fence_closed": {
  "file": "assets/ui/gate_fence_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_fence_open": {
  "file": "assets/ui/gate_fence_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_bars_closed": {
  "file": "assets/ui/gate_bars_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "gate_bars_open": {
  "file": "assets/ui/gate_bars_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_normal_closed": {
  "file": "assets/ui/chest_normal_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_normal_open": {
  "file": "assets/ui/chest_normal_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_hidden_closed": {
  "file": "assets/ui/chest_hidden_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_hidden_open": {
  "file": "assets/ui/chest_hidden_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_prank_closed": {
  "file": "assets/ui/chest_prank_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_prank_open": {
  "file": "assets/ui/chest_prank_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_puzzle_closed": {
  "file": "assets/ui/chest_puzzle_closed.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "chest_puzzle_open": {
  "file": "assets/ui/chest_puzzle_open.png",
  "type": "single",
  "frameW": 48,
  "frameH": 48
 },
 "item_c01_almond": {
  "file": "assets/items/item_c01_almond.png",
  "type": "icon",
  "frameW": 28,
  "frameH": 32
 },
 "item_c01_bamboo": {
  "file": "assets/items/item_c01_bamboo.png",
  "type": "icon",
  "frameW": 28,
  "frameH": 32
 },
 "item_c01_baton": {
  "file": "assets/items/item_c01_baton.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_c01_bittertea": {
  "file": "assets/items/item_c01_bittertea.png",
  "type": "icon",
  "frameW": 25,
  "frameH": 32
 },
 "item_c01_cake": {
  "file": "assets/items/item_c01_cake.png",
  "type": "icon",
  "frameW": 34,
  "frameH": 32
 },
 "item_c01_candy": {
  "file": "assets/items/item_c01_candy.png",
  "type": "icon",
  "frameW": 36,
  "frameH": 32
 },
 "item_c01_cap": {
  "file": "assets/items/item_c01_cap.png",
  "type": "icon",
  "frameW": 38,
  "frameH": 32
 },
 "item_c01_dart_rope": {
  "file": "assets/items/item_c01_dart_rope.png",
  "type": "icon",
  "frameW": 28,
  "frameH": 32
 },
 "item_c01_detox": {
  "file": "assets/items/item_c01_detox.png",
  "type": "icon",
  "frameW": 28,
  "frameH": 32
 },
 "item_c01_herbtea": {
  "file": "assets/items/item_c01_herbtea.png",
  "type": "icon",
  "frameW": 25,
  "frameH": 32
 },
 "item_c01_lens_rod": {
  "file": "assets/items/item_c01_lens_rod.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_c01_letter_knife": {
  "file": "assets/items/item_c01_letter_knife.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_c01_longan": {
  "file": "assets/items/item_c01_longan.png",
  "type": "icon",
  "frameW": 33,
  "frameH": 32
 },
 "item_c01_noodle": {
  "file": "assets/items/item_c01_noodle.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_c01_raincape": {
  "file": "assets/items/item_c01_raincape.png",
  "type": "icon",
  "frameW": 28,
  "frameH": 32
 },
 "item_c01_shoes": {
  "file": "assets/items/item_c01_shoes.png",
  "type": "icon",
  "frameW": 38,
  "frameH": 32
 },
 "item_c01_smoke": {
  "file": "assets/items/item_c01_smoke.png",
  "type": "icon",
  "frameW": 35,
  "frameH": 32
 },
 "item_c01_ticket": {
  "file": "assets/items/item_c01_ticket.png",
  "type": "icon",
  "frameW": 38,
  "frameH": 32
 },
 "item_c01_vest": {
  "file": "assets/items/item_c01_vest.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_cloth": {
  "file": "assets/items/item_cloth.png",
  "type": "icon",
  "frameW": 33,
  "frameH": 32
 },
 "item_herb_leaf": {
  "file": "assets/items/item_herb_leaf.png",
  "type": "icon",
  "frameW": 32,
  "frameH": 32
 },
 "item_starter_stick": {
  "file": "assets/items/item_starter_stick.png",
  "type": "icon",
  "frameW": 29,
  "frameH": 32
 },
 "item_star_gear": {
  "file": "assets/items/item_star_gear.png",
  "type": "icon",
  "frameW": 32,
  "frameH": 32
 },
 "npc_c01_boatman": {
  "file": "assets/npcs/npc_c01_boatman.png",
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
 "npc_c01_bpl_uncle": {
  "file": "assets/npcs/npc_c01_bpl_uncle.png",
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
 "npc_c01_npm_volunteer": {
  "file": "assets/npcs/npc_c01_npm_volunteer.png",
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
 "npc_c01_patrol": {
  "file": "assets/npcs/npc_c01_patrol.png",
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
 "npc_c01_tam_guide": {
  "file": "assets/npcs/npc_c01_tam_guide.png",
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
 "npc_c01_guild": {
  "file": "assets/npcs/npc_c01_guild.png",
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
 "npc_c01_leader": {
  "file": "assets/npcs/npc_c01_leader.png",
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
 "npc_c01_porter": {
  "file": "assets/npcs/npc_c01_porter.png",
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
 "npc_c01_teacher": {
  "file": "assets/npcs/npc_c01_teacher.png",
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
 }
 // BQ2 v0.6 整合：台北章怪物美術（美術\怪物\ M1、M2 交件）。battle_sheet＝戰鬥 2 列（待機 4、攻擊 8，格寬＝圖寬÷8）；
 // map_sheet＝地圖 4×4（列序 down、left、right、up，不含影子）——引擎還沒讀 map_sheet，地圖暫用 file 單張（見整合1_變更說明）
};
// ── BQ2 v0.6 台北章：要新畫的圖鍵名（由 tools/build_content.js 產生；圖還沒畫前地圖用 fallback）──
window.SPRITES_C01_TODO = {
 "npc_c01_star_kid": {
  "fallback": "npc_classmate",
  "npc": "c01_star_kid"
 },
 "npc_c01_smith": {
  "fallback": "npc_desk",
  "npc": "c01_smith"
 },
 "npc_c01_mob_t04a": {
  "fallback": "npc_classmate",
  "npc": "c01_mob_t04a"
 },
 "npc_c01_mob_t04b": {
  "fallback": "npc_desk",
  "npc": "c01_mob_t04b"
 },
 "npc_c01_mob_t04c": {
  "fallback": "npc_desk",
  "npc": "c01_mob_t04c"
 },
 "npc_c01_mob_t04d": {
  "fallback": "npc_desk",
  "npc": "c01_mob_t04d"
 },
 "npc_c01_herb_aunt": {
  "fallback": "npc_desk",
  "npc": "c01_herb_aunt"
 },
 "npc_c01_mob_t05a": {
  "fallback": "npc_classmate",
  "npc": "c01_mob_t05a"
 },
 "npc_c01_mob_t05b": {
  "fallback": "npc_desk",
  "npc": "c01_mob_t05b"
 },
 "npc_c01_mob_t05c": {
  "fallback": "npc_desk",
  "npc": "c01_mob_t05c"
 },
 "npc_c01_mob_t05d": {
  "fallback": "npc_desk",
  "npc": "c01_mob_t05d"
 },
 "npc_c01_runner": {
  "fallback": "npc_desk",
  "npc": "c01_runner"
 },
 "npc_c01_old_kid": {
  "fallback": "npc_grandpa",
  "npc": "c01_old_kid"
 },
 "npc_c01_ddc_inn": {
  "fallback": "npc_grandpa",
  "npc": "c01_ddc_inn"
 },
 "npc_c01_mob_t07a": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t07a"
 },
 "npc_c01_mob_t07b": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t07b"
 },
 "npc_c01_mob_t07c": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t07c"
 },
 "npc_c01_mob_t07d": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t07d"
 },
 "npc_c01_mob_t07e": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t07e"
 },
 "npc_c01_mob_t07f": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t07f"
 },
 "npc_c01_mob_t08a": {
  "fallback": "npc_grandpa",
  "npc": "c01_mob_t08a"
 },
 "npc_c01_grocer": {
  "fallback": "npc_grandpa",
  "npc": "c01_grocer"
 }
};
// ── 台北章鍵名結束 ──
