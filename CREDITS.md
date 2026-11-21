# 素材與授權

## 程式庫

- **Phaser 4.2.1**（MIT License）
  - 版權：Richard Davey、Phaser Studio Inc.
  - 來源：npm registry <https://registry.npmjs.org/phaser/-/phaser-4.2.1.tgz>（2026-10-07 下載），取其中的 `dist/phaser.min.js`。
  - 授權全文：`lib/PHASER_LICENSE.txt`。

- **qrcode-generator 2.0.4**（MIT License）— 產生存檔 QR Code
  - 版權：Kazuhiko Arase（2009）。「QR Code」是 DENSO WAVE INCORPORATED 的註冊商標。
  - 來源：npm registry <https://registry.npmjs.org/qrcode-generator/-/qrcode-generator-2.0.4.tgz>（2026-10-07 下載），取其中的 `dist/qrcode.js` 存為 `lib/qrcode.js`。
  - 授權全文：`lib/QRCODE_LICENSE.txt`（npm 套件沒有附 LICENSE 檔，依 package.json 與原始碼檔頭標示的 MIT 授權附上標準條文）。

本遊戲沒有使用其他第三方程式庫、字型服務或 CDN。存檔碼壓縮用瀏覽器內建的 CompressionStream。

## 美術

- **角色、NPC、怪物、頭目、道具圖示、地圖背景、戰鬥背景、標題圖、台灣世界地圖**：GPT 繪製＋程式後製（去背、切格、縮放、限色），由 CTO 製作與逐張驗收。
  - `assets/chars/`、`assets/npcs/`、`assets/monsters/`、`assets/items/`、`assets/maps/`、`assets/battle/bb_*.png`、`assets/ui/`
  - 主畫面圖示 `assets/ui/icon-180/192/512.png`：勇者大冒險II 的暫代圖示，由 `tools/make_icons.py` 程式畫（深藍底、金框、「II」）；標題圖交件後改成從標題圖裁切。
- **BQ2 v0.6 台北章（2026-11-20 交件、整合5 接進遊戲）**：全部是 GPT 繪製（ChatGPT 訂閱的 draw_image）＋美術同仁程式後製（限色 40–96 色、去背、切格、1px 描邊、對齊腳底、白邊修補），不含影子（遊戲畫）；由 `tools/c01_art_import.py` 從成品匣 `B2_製作\美術\` 複製並轉成引擎格式（NPC 4 方向→8 列 3 格）。
  - 怪物：`assets/monsters/mon_compass*`、`mon_steam*`、`mon_e_minecart*`、`mon_clockbug_map4x4.png`、`boss_b01_bengbeng*`（戰鬥 512 格重畫版）、`boss_b01_appraiser_map4x4.png`、`boss_dudu*`（2 倍後製版）——美術 M1、M2 設計說明與驗收。
  - 怪盜本人：`assets/npcs/npc_kaito_battle*.png`、`npc_kaito_c01.png`、`npc_kaito_portrait_256.png`（立繪，目前遊戲沒有用到）。
  - NPC：`assets/npcs/pet_zhe.png`（阿哲）、`npc_director_c01.png`（陳館長）、`npc_c01_cloth_aunt.png`（布攤阿姨，日治服裝是推論、未考據，待決 NPC-1）、`npc_c01_appraiser.png`（開場的鑑定師）。
  - 機關物件、門、寶箱、光圈：`assets/ui/obj_*.png`、`gate_*.png`、`chest_{normal,hidden,prank,puzzle}_*.png`、`fx_warp_ring_0–3.png`。
  - 戰鬥背景：`assets/battle/bb_c01_*.png`（士林、萬華、圓山、坑道、大稻埕、碼頭夜、室內；960×540）。
- **BQ2 v0.6 台北章第 2 批（整合9 接進遊戲）**：同樣是 GPT 繪製＋美術同仁程式後製，`tools/c01_art_import.py` 匯入。
  - 道具圖示 23 張：`assets/items/item_c01_*.png`、`item_starter_stick.png`、`item_cloth.png`、`item_star_gear.png`、`item_herb_leaf.png`（高 32px；`item_c01_bamboo_alt` 是美術備用版，沒有放進遊戲）。
  - 地圖背景 6 張：`assets/maps/bg_TD1.webp`、`bg_TD2.webp`、`bg_TI1.webp`–`bg_TI4.webp`——美術同仁的程式依地圖格子鋪 GPT 畫的地面、牆、模組素材後轉 webp（有損 q85）；故宮展場是虛構化的展間、展櫃與畫框不畫真實文物細節與文字。
  - 外景背景 5 張（整合10）：`assets/maps/bg_T04.webp`（士林）、`bg_T05.webp`（萬華）、`bg_T06.webp`（圓山・劍潭山步道）、`bg_T07.webp`（大稻埕・日治）、`bg_T08.webp`（大稻埕碼頭・日治）——同樣由美術同仁的程式依地圖格子鋪 GPT 畫的地面、街屋立面、模組素材後轉 webp；整合10 時美術清掉材料的洋紅殘邊、11 張背景全部重新輸出。真實地點（故宮、天文館、龍山寺、劍潭山、大稻埕）都是概括外觀，不畫招牌文字與神像。
  - NPC：`assets/npcs/npc_c01_boatman.png`（船伕阿伯）、`npc_c01_patrol.png`（巡守隊阿伯）、`npc_c01_tam_guide.png`（天文館解說員）、`npc_c01_bpl_uncle.png`（老碗阿伯）、`npc_c01_npm_volunteer.png`（展場志工）、`npc_c01_cloth_aunt.png`（布攤阿姨重畫版）；日治服裝仍是推論、未考據（待決 NPC-1）。
- **備援圖塊**（寶箱、知識燈、傳送光圈，以及沒有背景圖時的地面）：本專案程式產生（`tools/make_tiles.py`），沒有使用外部素材。
  - `assets/tiles/`
- **佔位圖**：找不到圖檔時由遊戲即時畫出的色塊與文字，不是外部素材。

## 聲音

- 音效與怪物叫聲全部用 Web Audio 即時合成（`src/engine/sfx.js`），沒有外部音檔。
- 朗讀使用裝置內建的語音合成（speechSynthesis，`src/engine/voice.js`）。台語句子沒有預錄音檔時，先響提示音再念華語翻譯。
- 預錄語音（之後由 CTO 產生，放在 `assets/voice/`）：來源與授權請在此補記。勇者大冒險II 目前沒有預錄語音（三年級版的台語音檔已拿掉，之後重做）。

## 故事與場景（勇者大冒險II）

- 故事中的「全臺家鄉博覽會」與所有人物都是虛構的；場景參考真實的臺北市花博公園圓山園區、北投（老闆裁示 9）。
- 本作從「勇者大冒險」（國小三年級版）沿用程式、主角圖、戰鬥背景與音樂；地圖、題庫、怪物、對話為四年級版重新製作。

## 題目與故事

- 題目全部原創；`source_ref` 只標示出版社、冊別與單元名稱，不重製課文、插圖或習作。
- 地名、店名、人物皆為以台灣各地為靈感的虛構設定。
