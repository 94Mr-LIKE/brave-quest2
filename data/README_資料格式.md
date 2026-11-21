> **勇者大冒險II 注意**：這份是三年級版的資料格式說明，欄位大致沿用。四年級的差異：格子 48px（背景＝欄數×48 × 列數×48）、走路圖 `rows` 預設 8 方向（`down, downleft, left, upleft, up, upright, right, downright`，見 `src/systems/dirrows.js`）、`world.js` 多了 `start_map`、怪物可寫 `final: true`（最終頭目）、題目的四年級新欄位見 `questions.js` 檔頭與 `tests/validate_questions.js`。三年級專屬的例子（M01、知識燈等）請不要照抄。

# 世界內容資料格式（勇者大冒險）

- 給前端對照用。依據：`07_設計改版v0.2_多地圖冒險.md` 第 6 節。
- 本文件列出七個資料檔的**全部欄位**。標「（新增）」的欄位不在 6 節規格裡，是內容端加的；前端不讀也不會壞。
- 所有檔案都寫成 `window.XXX = …`，依序載入即可。
- 驗證指令：`node tests/validate_world.js`。結束碼 0＝通過。

| 檔案 | 全域變數 |
|---|---|
| `maps.js` | `window.MAPS` |
| `world.js` | `window.WORLD`（新增，世界地圖） |
| `quests.js` | `window.QUESTS` |
| `dialogs.js` | `window.DIALOGS`、`window.SPEAKERS`（新增） |
| `monsters.js` | `window.MONSTERS` |
| `items.js` | `window.ITEMS`、`window.SHOPS`（新增） |
| `jobs.js` | `window.JOBS`、`window.PLAYER_BASE`（新增）、`window.JOB_RULES`（新增） |

座標一律是 `x`＝欄、`y`＝列，從 0 開始算。

---

## 1. 地圖 `window.MAPS`

鍵是地圖 ID（`M01`–`M11`）。

| 欄位 | 型別 | 說明 |
|---|---|---|
| `name` | 字串 | 地圖中文名 |
| `type` | 字串 | `village`／`field`／`tribe`／`dungeon`／`town`／`castle` |
| `level` | 數字 1–5 | 地圖等級，用來決定 EXP 係數（1.0／1.1／1.2／1.3／1.5） |
| `bgm` | 字串 | 背景音樂 key |
| `battle_bg` | 字串 | 戰鬥背景 key：`grass`／`forest`／`swamp`／`cave`／`rock`／`town`／`harbor`／`castle`／`castle_top` |
| `tileset` | 字串 | 圖塊組：`village`／`field`／`forest`／`swamp`／`cave`／`town`／`castle` |
| `grid` | 字串陣列 | 文字格子，每個字元是一格，每列等長，尺寸在 24×14 到 32×20 之間。字元圖例見下表 |
| `real_ref` | 字串 | （新增）參考的真實地點 |
| `art_note` | 字串 | （新增）給美術依格子畫整張背景圖的文字說明 |
| `start` | `{x,y}` | （新增）M01：新遊戲的出生點。有車站的地圖：下車位置（和 world.js 的 tx, ty 相同，讓只讀 `start` 的引擎也能正確落點） |
| `station` | `{x,y,name}` | （新增）車站。站上去互動就打開世界地圖（world.js）；不擋路 |
| `places` | 陣列 | （新增，只有 M01 有）`{name,x,y,w,h}` 設施範圍，給美術與任務日誌標示用 |
| `exits` | 陣列 | 出口，見 1.2。遠方地圖（M04、M05、M08）沒有出口，只能搭車進出 |
| `npcs` | 陣列 | NPC，見 1.3 |
| `lamps` | 陣列 | （新增，只有 M01 有）五盞知識燈，見 1.4 |
| `chests` | 陣列 | 寶箱，見 1.5 |
| `spawns` | 陣列 | 怪物分佈，見 1.6 |
| `inn` | 物件或 `null` | 旅店，見 1.7 |
| `shop` | 物件或 `null` | 商店，見 1.7 |
| `extra_shops` | 陣列 | （新增，只有 M09 有）同一張圖的第二、三間店，格式和 `shop` 一樣 |

### 1.1 字元圖例

不在這張表裡的字元，驗證會報錯。

| 字元 | 意義 | 能不能走 |
|---|---|---|
| `.` | 地面（依 tileset 顯示為草地、地板或洞窟地） | 可 |
| `,` | 花草、裝飾地面 | 可 |
| `=` | 路、石板 | 可 |
| `%` | 淺泥、淺灘 | 可 |
| `D` | 門（裝飾用；v0.4 起不可走，NPC／商店在門前一格互動） | 擋 |
| `B` | 橋 | 可 |
| `S` | 樓梯 | 可 |
| `c` | 地毯 | 可 |
| `T` | 樹、柱 | 擋 |
| `#` | 牆、岩壁、城牆 | 擋 |
| `~` | 水、沼澤水 | 擋 |
| `H` | 房屋牆 | 擋 |
| `R` | 屋頂 | 擋 |
| `F` | 柵欄 | 擋 |
| `*` | 灌木、岩石 | 擋 |
| `K` | 王座、大型擺設 | 擋 |
| `U` | 上層格（v0.4 新增）：可以走，但背景圖這一格畫在角色上方（拱門、橋下、屋簷下）；角色被擋住時顯示半透明剪影 | 可 |

### 1.2 出口 `exits[]`

| 欄位 | 說明 |
|---|---|
| `x`, `y` | 出口格，一定在地圖邊緣的可走格上。踩到就換圖 |
| `to` | 目標地圖 ID |
| `tx`, `ty` | 到目標地圖後站的位置。一定是可走格，而且不是出口（避免來回彈） |

- 出口都是雙向的：目標地圖在落點旁邊，一定有一個回來的出口。
- 地圖邊緣上所有可走的格子都是出口；其他邊緣格都不能走。

### 1.3 NPC `npcs[]`

| 欄位 | 說明 |
|---|---|
| `id` | 全遊戲唯一。委託的 `giver` 和對話的 `who` 都用這個 id |
| `x`, `y` | 站的位置（可走格）。NPC 本身會擋路 |
| `sprite` | 圖像 key（`npc_*`） |
| `dialog` | 平常說話時用的對話 ID |
| `quest` | 第一個委託 ID；沒有委託時是 `null`。保留這欄是為了相容 6.1 |
| `quests` | （新增）這位 NPC 會發的**所有**委託 ID |
| `dialog_done` | （選填）`{ quest, dialog }`：那個委託完成後，平常說話改成這段 |
| `dialog_active` | （選填，整合2）`{ quest, dialog }`：那個委託**進行中**時，平常說話改成這段（例：M6 進行中布攤阿姨說 `D_C01_CLOTH_CLUE`）；`dialog_done` 優先 |

- 建議的顯示邏輯：從 `quests` 裡找第一個「還沒完成」的委託，再依狀態顯示不同對話：
  - 前置還沒完成：顯示 `dialog_locked`；沒有的話就顯示 `dialog`。
  - 可以接：顯示 `dialog_start`。
  - 完成時：顯示 `dialog_end`。
- 全部完成後，顯示 `dialog`。

### 1.4 知識燈 `lamps[]`（新增）

| 欄位 | 說明 |
|---|---|
| `subject` | 五科之一 |
| `x`, `y` | 位置（可走格上的擋路物件）。依點燈狀態顯示 `lamp_off`／`lamp_on` |

### 1.5 寶箱 `chests[]`

| 欄位 | 說明 |
|---|---|
| `id` | 全遊戲唯一，存檔用這個 id 記錄「開過了沒」 |
| `x`, `y` | 位置（可走格上的擋路物件） |
| `subject` | 一律是 `"數學"`。答對一題數學數字題才打得開 |
| `level` | 題目難度 1–4 |
| `reward.gold` | 金幣 20–60 |
| `reward.item` | 道具 ID，或 `null` |

### 1.6 怪物分佈 `spawns[]`

| 欄位 | 說明 |
|---|---|
| `monster` | 怪物 ID（`MONSTERS` 的鍵） |
| `count` | 同時存在幾隻 |
| `area` | `[x, y, w, h]` 遊走範圍。範圍內只能放在可走、不是出口、沒有物件的格子上 |
| `boss` | （新增）`true`＝頭目 |
| `quest` | （新增）頭目綁定的委託 ID。只在這個委託「進行中」時出現，打倒（完成委託）後就不再出現 |

### 1.7 旅店 `inn`、商店 `shop`／`extra_shops[]`

| 欄位 | 說明 |
|---|---|
| `x`, `y` | 互動位置。有站櫃 NPC 時，就是那位 NPC 的位置 |
| `npc` | （新增）站櫃 NPC 的 id；沒有站櫃的話是 `null`，前端自行顯示招牌或床 |
| `price` | （新增，只有旅店有）住宿費。目前全部是 0，失敗要安全 |
| `shop_id` | （只有商店有）對應 `window.SHOPS` 的鍵 |

---

## 1b. 世界地圖 `window.WORLD`（新增，world.js）

| 欄位 | 說明 |
|---|---|
| `image` | 世界地圖圖檔名（CTO 繪製後填入；`null`＝用前端備援畫面） |
| `regions` | 地區陣列，見下表 |

`regions[]`：

| 欄位 | 說明 |
|---|---|
| `id` | 地區 ID |
| `name` | 地區中文名（世界地圖上顯示） |
| `real_ref` | 參考的真實地點 |
| `map_entry` | 搭車抵達的地圖 ID（字串） |
| `tx`, `ty` | 下車後站的格子（可走、不是出口）。與該地圖的 `start` 相同（M01 除外：M01 的 `start` 是新遊戲出生點） |
| `x`, `y` | 在世界地圖圖片上的相對位置（0–1） |
| `unlock_quest` | 完成這個委託才解鎖；`null`＝一開始就能去；陣列＝全部完成才解鎖 |

- 搭車規則：在任何一張有 `station` 的地圖，站上車站就能打開世界地圖，前往已解鎖的地區。
- 驗證腳本會模擬：每個委託的委託人地圖、頭目地圖、打獵地圖，在它的前置委託完成時都到得了。
- M01 金包里的設施方位參考來源寫在 world.js 檔頭。

---

## 2. 委託 `window.QUESTS`

鍵是委託 ID。

| 欄位 | 說明 |
|---|---|
| `title` | 委託標題（任務日誌顯示） |
| `giver` | 委託人 NPC id，一定在 `map` 這張圖上 |
| `map` | 委託人所在地圖 |
| `kind` | `help`（答題）／`hunt`（收集掉落物）／`boss`（打倒頭目）／`chest`（保留，目前沒用到） |
| `goal` | （新增）任務日誌上的「目標」。**推進主線的關鍵資訊一定寫在這裡**，對話可以跳過 |
| `log_next` | （新增）完成後，任務日誌顯示的「下一步去哪裡」 |
| `teaches` | （新增，只有教學委託有）這個委託在教什麼，給前端決定要不要跳教學提示 |
| `subject` | 五科之一，或 `"混合"` |
| `subjects` | （新增）`subject` 是 `"混合"` 時，要輪流出題的科目 |
| `units` | 出題單元，字串和 `questions.js` 的 `unit` 完全相同。空陣列＝該科全部單元 |
| `count` | `help` 委託要答對幾題（2–5）。`hunt`／`boss` 是 `null` |
| `level_range` | `[最低, 最高]` 題目難度 |
| `hunt` | `hunt` 委託才有，見 2.1；其他是 `null` |
| `boss` | （新增）`boss` 委託要打倒的怪物 ID |
| `boss_map` | （新增）頭目所在地圖。頭目由該地圖 `spawns` 的 `quest` 綁定 |
| `requires` | 前置委託 ID 陣列，全部完成才能接 |
| `requires_lights` | （新增，只有 Q_FINAL 有）需要先拿回的光（科目陣列） |
| `reward.exp` | 0＝依答題自動計算（題目 exp × 地圖等級係數） |
| `reward.gold` | 完成時給的金幣 |
| `reward.item` | 道具 ID，或 `null` |
| `reward.light` | 拿回哪一科的光；只有頭目委託有。五科各由一個頭目委託給 |
| `dialog_start` | 接委託時的對話 |
| `dialog_end` | 完成時的對話 |
| `dialog_locked` | （新增）前置還沒完成時跟委託人說話的對話，會告訴孩子「先去哪裡」 |
| `dialog_ending` | （新增，只有 Q_FINAL 有）破關結尾對話 |

### 2.1 打獵 `hunt`

| 欄位 | 說明 |
|---|---|
| `item` | 要收集的道具 ID（素材） |
| `n` | 數量 |
| `monster` | （新增）會掉這個素材的怪，給任務日誌顯示 |
| `map` | （新增）那隻怪出沒的地圖，給任務日誌顯示 |

### 2.2 主線順序

```
Q_TUT_1 → Q_TUT_2 → Q_TUT_3
  ├→ Q_ELF_1→2→3→4（自然之光）→ Q_GNO_1→2→3→4（數學之光）─┐
  └→ Q_MER_1→2→3→4（英語之光）→ Q_GOB_1→2→3→4（國語之光）─┴→ Q_ORC_1→2→3→4（社會之光）
→ Q_LAMPS（金包里點燈）→ Q_FINAL（古城塔頂）
```

`Q_SIDE_*` 都是支線，不擋主線。

---

## 3. 對話 `window.DIALOGS`、`window.SPEAKERS`

`DIALOGS`：鍵是對話 ID，值是陣列 `[{ who, text, taigi? }, …]`，依序播放。

| 欄位 | 說明 |
|---|---|
| `who` | 說話者：NPC id、怪物 id、`"hero"`（主角）、`"pet"`（番薯仔）或 `"narrator"`（旁白，不顯示名字） |
| `text` | 台詞（一律是華語，給朗讀和聽不懂台語的孩子），每句不超過 30 字（`{name}` 以 8 字計算）。`{name}` 要換成主角自取的名字 |
| `taigi` | （新增，選填，只有 NPC 台詞有）台語版本 `{ hanji, tailo, huayu }`：`hanji` 台語漢字（≤30 字）、`tailo` 台羅拼音（目前留空，待課綱設計師依教育部辭典補上並修正用字）、`huayu` 華語翻譯。建議顯示：台語漢字在上、華語小字在下；朗讀用 `text` |

`SPEAKERS`（新增）：`who` → 顯示名稱。`hero` 是 `"{name}"`，`narrator` 是空字串。

- 主角有男生和女生兩種，所以台詞只用 `{name}` 或「冒險者」稱呼主角，不寫「她／他」。
- 只有外國商人的台詞會夾簡單英文，而且一定附中文。

### 3.1 系統對話（前端在特定時機播放）

| ID | 時機 |
|---|---|
| `D_INTRO` | 新遊戲開場 |
| `D_FAINT` | 主角累倒（HP 歸零），回旅店前 |
| `D_INN_REST` | 住完旅店 |
| `D_CHEST_LOCKED` | 碰到還沒開的寶箱 |
| `D_CHEST_DONE` | 碰到已經開過的寶箱 |
| `D_LAMP_LIT` | 點亮一盞知識燈 |
| `D_LIGHT_GET` | 拿回一道光（頭目委託完成時，可接在 `dialog_end` 後面） |
| `D_GUILD_JOB` | Lv5 以上找公會導師轉職 |
| `D_STATION` | 站上車站、打開世界地圖時 |
| `D_STATION_LOCKED` | 在世界地圖點了還沒解鎖的地區 |

---

## 4. 怪物 `window.MONSTERS`

鍵是怪物 ID。

| 欄位 | 說明 |
|---|---|
| `name` | 中文名 |
| `sprite` | 圖像 key（`mon_*`／`boss_*`） |
| `level` | 怪物等級（和出沒地圖的等級相同） |
| `hp`, `atk` | 體力、攻擊。怪物打主角＝max(1, atk − 主角 DEF)（內容端假設，待前端確認） |
| `subject` | 戰鬥出題科目；最終頭目是 `"混合"` |
| `subjects` | （新增，只有遺忘霧魔有）五科輪流 |
| `q_levels` | （新增）出題難度範圍 `[最低, 最高]` |
| `exp`, `gold` | 打倒後**額外**給的討伐獎勵。答題 EXP 由題目另外算 |
| `drops` | `[{ item, rate }]`，rate 是 0–1 的掉落機率 |
| `boss` | 是不是頭目 |
| `phases` | （新增，只有頭目有）階段數 3。依 CTO 裁定，階段＝體力剩 2/3、1/3 時換階段 |
| `phase_q` | （新增，只有頭目有）每階段至少答對 2 題 |
| `last_q_level` | （新增，只有頭目有）每階段最後一題的難度 4 |
| `ref_mobs` | （新增，只有頭目有）用來算體力倍率的同區小怪。一般頭目 ×5、最終頭目 ×6，驗證範圍 4.5–6.5 |
| `dialog_before`, `dialog_after` | （新增，只有頭目有）戰鬥前、戰鬥後的對話 |
| `desc` | （新增）圖鑑說明 |
| `wake` | （新增）打倒後顯示的「清醒了、跑走了」文字。不寫死亡、不寫血腥 |

數值的計算依據寫在 `monsters.js` 檔頭。

### 4.1 BQ2 v0.6 戰鬥新欄位（03b 戰鬥系統規格、03_數值 第 2、7 節；新引擎 `systems/battle_v06.js` 讀）

| 欄位 | 說明 |
|---|---|
| `kind` | `wild` 野怪／`elite` 精英／`mboss` 迷宮小頭目／`tboss1` 怪盜第一段（變裝）／`tboss2` 怪盜第二段（原裝）。決定技能率（20／30／35%）與頭目每段至少答對題數（3／2／2） |
| `cat` | 類別：在地自然系、發條機關、怪盜 |
| `elem` | 屬性：金、木、水、火、土、風、光、闇（8×8 相剋表在 `battle_v06.js` 的 `CFG`） |
| `tpl` | 家族模板（快腳、硬殼、飄浮、發條機關、均衡；只是紀錄，數值已乘好） |
| `agi`, `pdef`, `mdef` | 速、物防、魔防 |
| `six` | 六項能力 `{STR, VIT, AGI, INT, SPI, LUK}`。力＝攻擊、體＝物防÷0.5、精神＝魔防÷0.5（和主角同一套公式） |
| `stars` | 普攻星數 `[低, 高]`：主角攻擊題、敵人防禦題都照這個；放技能時防禦題 +1 星（最多 4）。取代 `q_levels` |
| `skill` | `{ name, rate, act }`：技能名、每回合放技能的機率、技能動作文字（給美術、文案）。技能傷害 ×1.5 |
| `next_stage` | 頭目下一段的怪物 id（怪盜第一段 → 第二段；換段不補血） |
| `stage` | 第幾段（第二段寫 2） |
| `escort` | 精英固定帶的野怪 id |
| `drops[].need` | 委託素材：還沒收集夠這個數量才掉（和 `quest` 一起用） |
| `drops[].maps` | 整合2（選填）：只在這些地圖掉，例第 7 章圖畫卡 `maps:["P06"]`（P04 同一種怪不掉）。和 `quest`、`need` 可以一起用 |
| `drops[].cond` | 整合2（選填）：條件成立才掉（同 8.x 的 cond 寫法，例 `{flag:"…"}`、`{quest:"…", status:"active"}`） |
| `phases`, `phase_q` | BQ2：`phases` 一律 1（每段一個階段，不再每階段攻擊 +20%）；`phase_q`＝每段至少答對題數 |
| `dialog_phase` | BQ2：`{2, 3}` 改成「HP 第一次降到 2/3、1/3 以下」時播的台詞，只播台詞、不鎖血 |

- `subject`、`q_levels`、`last_q_level` 是舊畫面用的欄位，屬性不綁科目；第 2 段畫面接上新引擎後拿掉。

---

## 5. 道具 `window.ITEMS`、商店 `window.SHOPS`

`ITEMS`：鍵是道具 ID。`eraser`、`guide`、`snack` 沿用 v0.1 的 id，舊存檔不用轉換。

| 欄位 | 說明 |
|---|---|
| `name` | 中文名 |
| `sprite` | 圖像 key（`item_*`） |
| `kind` | `consumable`（消耗品）／`card`（答題輔助卡）／`weapon`／`armor`／`material`（素材） |
| `price` | 買價；素材是 0（不賣） |
| （素材） | 素材是任務素材，商店不收購，所以沒有 `sell` 欄位（2026-10-09 拿掉）。裝備、道具的賣價由遊戲依 `price` 計算（裝備 50%、道具 25%） |
| `effect` | 消耗品與卡片的效果：`hp`（回復體力）、`pet`（番薯仔好感）、`remove_option`（刪掉幾個錯的選項）、`hint_level`（打開到第幾層提示） |
| `atk`, `def`, `mp` | 裝備加成 |
| `jobs` | 裝備限定的職業 ID 陣列；`null`＝誰都能裝 |
| `desc` | 說明 |

BQ2 v0.6 裝備新欄位（03b R17 第 21 項、03_數值 9.2）：

| 欄位 | 說明 |
|---|---|
| `fam` | 裝備類別；新增 `knife`（飛刀・手套，D8-B，盜賊系） |
| `mdef` | 防具的魔防加成（主角魔防＝0.5×精神＋mdef） |
| `elem` | 武器屬性（普通攻擊帶這個屬性；`null`＝無屬性） |
| `no_sell` | 起始裝備（練習木棒、布衣）：不能賣、賣回 0 |
| （武器 `mp`） | 新引擎暫時把武器的魔力加在魔攻（規格 R3「魔攻＝智＋武器魔力」） |

`SHOPS`（新增）：鍵是 `shop_id`。

| 欄位 | 說明 |
|---|---|
| `name` | 店名 |
| `items` | 販賣的道具 ID 陣列 |

---

## 6. 職業 `window.JOBS`、`window.PLAYER_BASE`、`window.JOB_RULES`

`JOBS`：鍵是職業 ID，有 `novice`／`swordsman`／`mage`／`archer`／`bard`／`priest` 六種。

| 欄位 | 說明 |
|---|---|
| `name` | 中文名 |
| `sprite_f` | 女生主角走路圖 key：`hero_` 加職業 ID（CTO 定案） |
| `sprite_m` | 男生主角走路圖 key：`heroM_` 加職業 ID（CTO 定案） |
| `fav_subject` | 拿手科目；見習冒險者是 `null` |
| `bonus` | 拿手科目答對時的傷害倍率（1.5） |
| `unlock_level` | 可以轉職的等級 |
| `growth` | 每升一級的 `{hp, mp, atk}`。總和都是 13，只是分配不同 |
| `speed_bonus` | （新增，只有弓箭手有）答題時間條倍率 |
| `skill` | 技能，見下表；見習冒險者是 `null` |
| `desc` | 說明 |

技能 `skill` 的欄位：

| 欄位 | 說明 |
|---|---|
| `id` | 技能 ID |
| `name` | 中文名 |
| `mp` | 消耗魔力 |
| `subject` | 發動時出題的科目 |
| `effect` | 效果類型：`double_hit`（打兩下）／`hit_all`（打全體）／`preemptive`（戰鬥開始先打一下）／`extend_timer`（下一題時間條加長）／`heal`（回復體力） |
| `value` | 效果數值。`extend_timer` 是時間倍率，`heal` 是回復最大體力的比例 |
| `desc` | 說明 |

技能都是「答對才發動」。

`PLAYER_BASE`（新增）：主角 Lv1 的 `{hp, mp, atk, def}`。ATK 6 是依指示訂的；HP 30、MP 10、DEF 0 是內容端的假設。

`JOB_RULES`（新增）：

| 欄位 | 說明 |
|---|---|
| `change_map`, `change_npc` | 轉職地點：M10 的公會導師 |
| `unlock_level` | 5 |
| `change_cost` | 換職費用 0（免費） |
| `dialog_locked` | 未滿 5 級時的對話 |
| `dialog_open` | 可以轉職時的對話 |

### 6.1 BQ2 v0.6 職業新欄位（03b R3、R15、R16）

| 欄位 | 說明 |
|---|---|
| `mods6` | 六項能力倍率 `{STR, VIT, AGI, INT, SPI, LUK}`（框架第 7 節）。新引擎用這個；舊的 `mods {hp, mp, atk, def}` 留給現有畫面 |
| `trait.first` | 先手：每回合一定是主角先（盜賊、俠盜、幻影盜） |
| `trait.steal` | 答對打中時偷到一樣掉落物的機率（盜賊 0.08、俠盜 0.10、幻影盜 0.15；不偷金幣） |
| `trait.critMult` | 爆擊倍率（戰鬥大師、神之手 1.7） |
| `trait.chain` | 五行相生加成（幻影盜 0.40；一般 0.25） |
| `trait.bossDmg` | 打頭目傷害倍率（魔物獵人 1.3） |
| `trait.mirage` | 答錯時讓這回合敵人攻擊全部 Miss 的機率（奇術師 0.10） |
| `recipe` | 中級、高級的配方（要出師的職業 id） |
| `favs` | 多科拿手（中級、高級）；`fav` 是第一科，給舊程式 |

- `window.JOBS_LATER`：中級 10 個、高級 4 個職業（台北章轉不到）。技能表、走路圖第 11 章再補，補好再搬進 `JOBS`。
- `JOB_RULES.master_level` 加 `inter: 50`、`adv: 60`；`tier_mult` 加 `inter: 1.25`、`adv: 1.5`（一代值）。
- 六項能力公式、轉職保底比例 `FLOOR_RATIO`（目前 0.5，待決 N6）在 `systems/battle_v06.js` 的 `CFG.P`。

## 7. 課程表 `window.CURRICULUM`、教學卡 `window.TEACH_CARDS`、賢者課程 `window.SAGE_LESSONS`（勇者大冒險II 第二批，GDD 3.4、7.3 C1–C5）

- `data/curriculum.js`：`nodes`（節點 id＝「科目-序號」，例 `數學-1012`；`label`、`teach_card`）、`route`（地圖順序）、`maps[地圖].add`（這張地圖新開放的節點）、
  `inherit`（不在路線上的地圖照哪張出題；沒寫的地圖一題都不出）、`mix`（配比）、`teach`（阿咕陪看台詞）。某地圖可出的節點＝路線上到它為止所有 `add` 的聯集。
- `data/teachcards.js`：`TEACH_CARDS[卡片id] = { node, title, example, point, school_note?, status }`（每節點 1 張；`status:"draft"` 是暫定文字）；
  `SAGE_LESSONS[課程id] = { title, sage, node, card:{title, example, point}, demo:{stem, options, answer, explanation}, status }`。
- 題目欄位（questions.js，格式不變，只說明程式怎麼用）：程式只讀 `subject`＋`node` 決定節點；`curriculum:false` 不出；`explain_status:"pending"` 不出；
  `uses`／`uses_math`（`"SO:1011"` 寫法）用到的節點也要已開放；`beyond_curriculum:true` 的題目要加 **`beyond_topic`**（`SAGE_LESSONS` 的課程 id），玩家看完那一課才會出，報表另列。
- 地圖欄位：`exp_coef`（選填，正數，有填就蓋過 `level` 的 EXP 係數）；NPC 欄位 `sage: ["課程id"]`＝賢者（對話時教課）。
- 怪物欄位：`short_name`（選填，頭目戰前「○○會考：…」用）。

---

## 8. 台北章（BQ2 v0.6）地圖與委託新欄位——正式格式（前端B 定案，前端C 照這節轉資料）

- 依據：`B1_細規格/ch01_台北市/02_關卡.md` 第 2 版、`圖/ch01_maps_draft.json`、`01_劇本.md` 第 2、9、10、13 節、v2 第四、五節。
- 原則：**舊欄位一律保留、意思不變**（`type`、`exits[].requires`、`gates[].quest`、`notes[].dialog`、`npcs[].mrt`…）；新欄位全部選填，沒寫就照舊行為。
- 所有「條件」都用同一種寫法 **cond**（下面寫 `cond`）：
  - 字串 `"Q4_C01_M2"` ＝ 這個委託已完成（和舊的 `requires` 一樣）。
  - 物件 `{ quest: "Q…" }` 委託完成、`{ active: "Q…" }` 委託進行中、`{ flag: "PZ_C01_CODE" }` 旗標成立、`{ all: [cond…] }` 全部成立、`{ any: [cond…] }` 任一成立、`{ not: cond }`。
- 旗標（存在存檔 `state.flags`，讀檔後保留）：機關解開＝`puzzles[].id`（例 `PZ_C01_CODE`）；隱藏區打開＝`hidden[].id`；證人線索＝劇本的 `clue_appraiser_1/2/3`；冷笑話卡＝`joke:<卡id>`；精英／頭目打倒＝`state.bosses[怪物id]`（沿用）；前端內部旗標都以 `_` 開頭，資料不要自己取 `_` 開頭的旗標名（例外見 8.14 的 `_dlg:`）。
- 草稿欄位對照：草稿 `type` → 正式 `kind`（`type` 照舊保留給舊程式）；草稿 `minimap:false` → `no_minimap:true`；草稿 `lamps[]`（TD2 的燈座）→ 移進 `puzzles[]`（`type:"lamps"`）；草稿 `bases[]` → 同一個 puzzle 的 `bases`；草稿 `mrt{}` → `npcs[].mrt_stations` 與 `exits[].mrt_stations`；草稿 `chests[].kind` 中文 → 英文代碼（見 8.10）；草稿 `hidden[].trigger` 文字 → 結構化 `at`＋`cells`；草稿 `events[]`／`arrive_event` → `events[]`；草稿 `rests[]` 照用（補 8.4 的選填欄）。

### 8.1 地圖層級欄位

| 欄位 | 型別 | 說明 |
|---|---|---|
| `kind` | `town`／`field`／`interior`／`dungeon` | 地圖種類。`dungeon` 預設不開小地圖、休息點會讓該層野怪重生。沒寫時照 `type` 推（`town`/`village`→town，`dungeon`→dungeon，`interior`→interior，其餘 field） |
| `no_minimap` | 布林 | `true`＝小地圖與放大地圖都不能開，按了顯示一句說明（對話 `D_NO_MINIMAP`，沒有就用內建句）。`kind:"dungeon"` 沒寫時當 `true` |
| `light` | `v1`／`v2`／`v3` | 這張圖的光（v1 清晨柔光、v2 黃昏暖光、v3 夜晚燈籠）。給美術與前端調色；一張圖只一種 |
| `ground` | 字串 | （選填）給美術：`.` 代表的地面材質 |

### 8.2 地標與調查點 `notes[]`（擴充）

| 欄位 | 說明 |
|---|---|
| `x`, `y`, `label`, `dialog` | 舊欄位：位置、名稱、按 A 播的對話 |
| `card` | （新）按 A 顯示的**知識卡**對話 ID（地標知識卡 `D_C01_CARD_*`）。有 `card` 時播 `card`（`dialog` 不播） |
| `kind` | （新）`landmark` 地標／`clue` 機關線索／`sign` 告示牌／`investigate` 調查點。沒寫＝`sign` |
| `block` | （新）`false`＝不擋路（地板上的字、方位盤），站在上面或面對它都能按 A；沒寫＝擋路 |
| `requires` | （新，cond）條件不成立時這個調查點不存在 |

### 8.3 隱藏區 `hidden[]`（新）

| 欄位 | 說明 |
|---|---|
| `id` | 全遊戲唯一，打開後寫進旗標 |
| `name` | 名稱 |
| `at` | `{x,y}` 調查點（玩家面對它按 A；這一格擋路，通常是牆或樹叢）。可以和 `notes[]` 同格（`hidden` 優先） |
| `cells` | `[[x,y],…]` 打開後才可以走的格子（grid 上一律寫 `U`）。**沒打開前擋路**；打開後永遠開著 |
| `dialog` | 調查成功時播的對話（沒寫用內建「牆後面有一條小路！」） |
| `requires`, `dialog_before` | （選填）可以打開的條件（cond）；不成立時播 `dialog_before` |
| `chests` | `[寶箱id…]` 這個隱藏區裡的隱藏寶箱（寶箱本身寫 `kind:"hidden"`＋`hidden:"<這個id>"`） |

### 8.4 休息點 `rests[]`（新）

| 欄位 | 說明 |
|---|---|
| `x`, `y`, `label` | 位置（擋路物件：油燈＋長椅；面對它按 A）、名稱 |
| `heal` | 沒寫＝`true`：回滿體力、魔力 |
| `save` | 沒寫＝`true`：存檔，並記成「累倒後回來的點」（同旅店 `lastInn`） |
| `respawn` | 沒寫：`kind:"dungeon"` 時 `true`——休息後**這一層**野怪全部重生（精英、頭目不重生） |
| `dialog` | （選填）休息時的對話；沒寫用 `D_REST`，再沒有就用內建句 |

### 8.5 柵門／密碼門／鐵門 `gates[]`（擴充）

| 欄位 | 說明 |
|---|---|
| `x`, `y`, `dialog`, `quest` | 舊欄位：關著時擋路、按 A 播 `dialog`；`quest` 完成＝打開 |
| `open` | （新，cond）打開條件；有寫時取代 `quest`。例：密碼門 `{flag:"PZ_C01_CODE"}`、捷徑柵門 `"Q4_C01_S1"` |
| `kind` | （新）`fence` 木柵門／`code` 密碼門／`iron` 鐵門／`bars` 鐵柵。圖像 key：`gate_<kind>_closed`／`gate_<kind>_open`（沒有圖時用舊柵門圖） |
| `puzzle` | （新）`kind:"code"`：按 A 打開哪一個 `puzzles[]` 的密碼輸入畫面 |

### 8.6 機關 `puzzles[]`（新）

共同欄位：`id`（全遊戲唯一＝解開後的旗標）、`type`、`hint`（阿咕提示組，見 8.13）、`reward`、`dialog_done`（解開時播）、`requires`＋`dialog_locked`（選填）。

`reward`：`{ chest: "C_TD2_K", flag: "…", event: "<events[].id>" }`（都選填，可以同時寫）。`chest`＝讓機關寶箱出現；`event`＝立刻觸發該事件。

| `type` | 欄位 | 規則 |
|---|---|---|
| `lamps` 點燈座 | `lamps: [{x,y,dir,order}]`（擋路物件）、`bases: [{x,y,dir}]`（空基座，擋路裝飾）、`reset: {x,y}`（重來拉桿，擋路）、`dialog_one`、`dialog_reset`（選填） | 依 `order` 1→N 點亮。點錯 → 已亮的燈**慢慢熄掉**回到全暗，不扣血、不出怪；拉重來拉桿一樣全熄。全亮 → 解開（旗標）→ `reward`。解開後保持全亮 |
| `code` 密碼門 | `answer`（字串，例 `"362"`）、`digits`（沒寫＝`answer` 長度）、`labels`（每一位上方的字，例 `["百","十","一"]`）、`dialog_wrong`（沒寫用內建「門沒有動。」） | 由 `gates[].puzzle` 打開輸入畫面；每位用 ＋／－、方向鍵或數字鍵；無限次嘗試；答對 → 旗標 → `gates[]`（`open:{flag:id}`）打開 |
| `lever` 拉桿 | `x`, `y`（擋路，牆上拉桿） | 按 A 一次 → 旗標成立、**自動存檔**；`exits[].requires:{flag:id}` 或 `gates[].open:{flag:id}` 接上捷徑，之後雙向通行 |

### 8.7 事件 `events[]`（新；時光機關）

| 欄位 | 說明 |
|---|---|
| `id` | 事件 ID |
| `type` | `warp`：踩上去傳送（時光機關、回程光圈）／`talk`：NPC 選單觸發 |
| `x`, `y` | `warp` 的位置（可走格；條件成立時顯示光圈，踩上去觸發） |
| `requires` | cond：條件成立才出現 |
| `to`, `tx`, `ty` | 目的地圖與落點 |
| `dialog`, `arrive_dialog` | 傳送前／到達後播的對話（選填） |
| `npc`, `menu_label` | `type:"talk"`：和這位 NPC 說話時多一個選項 `menu_label`（例「再坐一次時光機關」），選了播 `dialog` 再傳送（破關後 TI1 陳館長 → T08） |

### 8.8 出口 `exits[]`（擴充）

| 欄位 | 說明 |
|---|---|
| `requires` | 舊欄位（委託 id），現在也接受 **cond** 物件（例 `{flag:"PZ_C01_LEVER_E"}`） |
| `mrt_stations` | （新）`[{ map, name, tx, ty }…]`：捷運光圈。踩到時跳「要去哪一站？」選單；有這欄時 `to/tx/ty` 只當預設值 |
| `station` | （新）本站名稱（選單標題） |

`npcs[].mrt_stations`、`npcs[].station`：站務員，格式同上；和他說話＝同一個選單；開放條件取同圖有 `mrt_stations` 那一筆出口的 `requires`。舊的 `npcs[].mrt`（單站）照舊可用。

### 8.9 野怪 `spawns[]`（擴充）

| 欄位 | 說明 |
|---|---|
| `monster`, `count`, `area`, `boss`, `quest` | 舊欄位 |
| `group` | （新）`[怪物id…]`：碰到這隻時一起出戰的編組（例精英礦車帶 steam：`group:["steam"]`）。戰鬥端是否支援由前端A2 決定；沒支援時只打 `monster` |
| `elite` | （新）`true`＝精英：打倒後不重生（記 `state.bosses`） |
| `at` | （新）`{x,y}` 固定位置（頭目、精英）。有 `at` 時 `area` 不用 |
| `respawn` | （新）`leave`（預設：離開地圖再進來就重生；迷宮休息點也會重生）／`never`。`boss`、`elite` 一律 `never` |

### 8.10 寶箱 `chests[]`（擴充）

| 欄位 | 說明 |
|---|---|
| `kind` | `normal` 一般（答一題，舊行為）／`hidden` 隱藏（隱藏區打開後才出現，答一題）／`prank` 惡作劇（直接開、不出題，給冷笑話卡）／`puzzle` 機關（機關解開後才出現、不出題）。沒寫＝`normal` |
| `hidden` | `kind:"hidden"`：所屬 `hidden[].id` |
| `joke` | `kind:"prank"`：冷笑話卡 id（`JOKE_C01_1`） |
| `puzzle` | `kind:"puzzle"`：所屬 `puzzles[].id` |
| `subject`, `level`, `reward` | 舊欄位；`prank`／`puzzle` 的 `subject` 可以是 `null` |

### 8.11 委託 `window.QUESTS`（擴充）

| 欄位 | 說明 |
|---|---|
| `kind` | 舊的 `help`／`hunt`／`boss`，新增 `talk`（說完話就完成）、`deduce`（推理）、`maze`（迷宮） |
| `auto`, `auto_accept`, `giver:"agu"` | **v0.6 起不再自動開始**：一律要玩家去找 `giver` 說話才接。只有 `kind:"boss"` 且寫 `auto_boss:true` 的頭目委託照劇本自動開始 |
| `dialog_locked` | 前置未完成時跟委託人說話（舊欄位） |
| `clues` | `[旗標…]`：要收集的線索旗標（例 `["clue_appraiser_1","clue_appraiser_2","clue_appraiser_3"]`）。說過就記，接委託以前先聽到也算 |
| `deduce` | `kind:"deduce"`：`{ prompt: "怪盜扮成了誰？", options: [4 個身分], answer: "古董鑑定師", dialog_wrong: "D_C01_M4_WRONG" }`。`clues` 全部成立才能選（不齊時播 `dialog_need`，沒寫用內建句）；選錯播 `dialog_wrong` 可以再選，不扣分；選對＝完成 |
| `maze` | `kind:"maze"`：`{ maps: ["TD1","TD2"], done: cond }`（例 `{flag:"PZ_C01_LAMPS"}`）。`done` 成立＝完成（不用回去找委託人；播 `dialog_end`） |
| `steps` | 多步驟：`[{ id, goal, done: cond, hint }]`。偵探筆記顯示「目前這一步」的 `goal`；第一個 `done` 不成立的步驟就是目前這一步 |
| `hint` | 阿咕提示組代號（例 `"M5L"` → `D_C01_HINT_M5L_1`／`_2`）。`steps[].hint` 優先；前綴由 `hint_prefix`（沒寫＝`D_C01_HINT_`）決定 |
| `follower` | （新）完成時加入跟隨的夥伴 id（例 `"classmate"`，阿哲）。跟隨不參戰，排在阿咕後面 |

### 8.12 對話觸發旗標 `window.DIALOG_FLAGS`（新，選填）

`{ "D_C01_NPM_VOL_CLUE": "clue_appraiser_1", … }`：播完這段對話就立旗標。前端C 放在 `quests.js` 檔尾。

### 8.13 阿咕提示

- 對話 ID：`<hint_prefix><組>_1`（第 1 層）、`_2`（第 2 層）。組代號的找法：目前地圖有未解機關且機關有 `hint` → 用機關的；否則取「進行中委託」目前步驟的 `hint` → 委託的 `hint` → 支線（不是 `Q4_C01_M*`）用 `SIDE` → 都沒有就說內建通用句。
- 第 1 次按＝第 1 層，再按＝第 2 層，之後重複第 2 層；換了組就重新從第 1 層開始（記在旗標 `_hint:<組>`）。

### 8.14 偵探筆記 `window.NOTEBOOK_PAGES`、冷笑話卡 `window.JOKE_CARDS`（新）

前端C 放在 `quests.js` 檔尾（不另開資料檔）。

```js
window.NOTEBOOK_PAGES = [
  { id: "NB_C01_CASE", title: "案件", text: "翠玉白菜在故宮展場被借走……", when: { flag: "_dlg:D_C01_THEFT" } },
  { id: "NB_C01_CLUE1", title: "線索 1", who: "故宮的展場志工姊姊", text: "那個人戴單片眼鏡……", when: { flag: "clue_appraiser_1" } },
  { id: "NB_C01_CARD", title: "預告卡", text: "（謎題全文）", when: "Q4_C01_M6", kind: "card" }
];
window.JOKE_CARDS = {
  JOKE_C01_1: { q: "翠玉白菜為什麼從來不會被罵「白目」？", a: "因為它一半是綠的呀！", note: "我覺得很好笑，阿咕說不好笑。" }
};
```

- `when` 是 cond。前端每段對話播完後立旗標 `_dlg:<對話ID>`，所以「某段對話播過」寫 `{flag:"_dlg:D_…"}`。
- 偵探筆記另外自動列出「進行中委託」目前的 `goal`／步驟 `goal`（雙保險）。

### 8.15 測試地圖

`tests/fixtures/map_v06_fixture.js`：用到本節全部欄位的小地圖（城鎮 `ZT01`、`ZT02`＋迷宮 `ZD1`、`ZD2`＋假委託、假對話、假筆記、假冷笑話卡），給 `tests/map_v06.test.js` 與 `tests/smoke_map_v06.py` 用；正式遊戲不會載入它。
