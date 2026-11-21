/*
 * BQ2 v0.6 前端B：台北章地圖規則（純邏輯，node 可測；畫面在 ui/puzzle.js、MapScene.js、game.js）
 * 資料格式見 docs/data/README_資料格式.md 第 8 節。
 * - cond：條件（委託完成、進行中、旗標、all／any／not）
 * - 機關：點燈座（照順序；點錯全熄）、密碼門（無限次）、拉桿（一次）、隱藏區（調查後 U 格可走、永遠開著）
 * - 寶箱種類（一般／隱藏／惡作劇／機關）、柵門與出口條件、事件（時光機關）、捷運多站選單
 * - 野怪重生規則（離開地圖重生；迷宮休息點重生；頭目、精英不重生）
 * - 阿咕兩層提示、偵探筆記、推理委託、迷宮委託、多步驟委託、冷笑話卡、跟隨夥伴
 * 所有進度都存在 state.flags（存檔、讀檔後保留）；前端內部旗標以 '_' 開頭。
 */
(function () {
  'use strict';

  function flags(state) { if (!state.flags || typeof state.flags !== 'object') state.flags = {}; return state.flags; }

  /** 委託狀態（和 QuestLog.status 同規則；這裡另寫一份，避免互相 require） */
  function qstatus(state, quests, id) {
    var r = state.quests && state.quests[id];
    if (r) return r.status;
    var q = quests && quests[id];
    if (!q) return 'locked';
    var ok = (q.requires || []).every(function (req) { var rr = state.quests && state.quests[req]; return rr && rr.status === 'done'; });
    if (ok && q.requires_cond) ok = cond(state, quests, q.requires_cond);   // 整合：requires_cond
    return ok ? 'available' : 'locked';
  }

  /** 條件：字串＝委託完成；{quest}、{active}、{flag}、{boss}（頭目打倒紀錄）、{all}、{any}、{not}；沒寫＝成立 */
  function cond(state, quests, c) {
    if (c === undefined || c === null || c === true) return true;
    if (c === false) return false;
    if (typeof c === 'string') return qstatus(state, quests, c) === 'done';
    if (Array.isArray(c)) return c.every(function (x) { return cond(state, quests, x); });
    if (typeof c !== 'object') return false;
    if (c.all) return c.all.every(function (x) { return cond(state, quests, x); });
    if (c.any) return c.any.some(function (x) { return cond(state, quests, x); });
    if (c.not !== undefined) return !cond(state, quests, c.not);
    var ok = true;
    if (c.quest) ok = ok && qstatus(state, quests, c.quest) === 'done';
    if (c.active) ok = ok && qstatus(state, quests, c.active) === 'active';
    if (c.flag) ok = ok && !!flags(state)[c.flag];
    if (c.boss) ok = ok && !!(state.bosses && state.bosses[c.boss]);   // 整合3（審查 M-3）：看已存進檔的頭目打倒紀錄
    return ok;
  }

  // ---------------------------------------------------------------- 地圖種類
  function mapKind(map) {
    if (!map) return 'field';
    if (map.kind) return map.kind;
    var t = map.type;
    if (t === 'town' || t === 'village') return 'town';
    if (t === 'dungeon') return 'dungeon';
    if (t === 'interior') return 'interior';
    return 'field';
  }
  function noMinimap(map) {
    if (!map) return false;
    if (typeof map.no_minimap === 'boolean') return map.no_minimap;
    return mapKind(map) === 'dungeon' && !!map.kind;
  }
  /** 新規則（v0.6 地圖：有寫 kind）才用「離開地圖再重生」；舊資料維持 30 秒重生 */
  function v06(map) { return !!(map && map.kind); }

  // ---------------------------------------------------------------- 機關
  function puzzle(map, id) { return ((map && map.puzzles) || []).filter(function (p) { return p.id === id; })[0] || null; }
  function solved(state, id) { return !!flags(state)[id]; }

  /** 點燈座：目前亮了幾座（解開＝全部） */
  function lampsLit(state, pz) {
    if (solved(state, pz.id)) return (pz.lamps || []).length;
    return Math.max(0, Math.min((pz.lamps || []).length, Number(flags(state)['_pzp:' + pz.id]) || 0));
  }
  function lampSorted(pz) { return (pz.lamps || []).slice().sort(function (a, b) { return a.order - b.order; }); }
  /** 這座燈亮著嗎 */
  function lampOn(state, pz, lamp) { return lamp.order <= lampsLit(state, pz); }
  /**
   * 點一座燈。回傳 { result: 'lit'｜'wrong'｜'solved'｜'already'｜'done', lit, wasLit }
   * 點錯：進度歸零（畫面讓已亮的燈慢慢熄掉）；全亮：解開（旗標）
   */
  function lampPress(state, pz, lamp) {
    var F = flags(state);
    if (solved(state, pz.id)) return { result: 'done', lit: (pz.lamps || []).length, wasLit: (pz.lamps || []).length };
    var lit = lampsLit(state, pz);
    if (lamp.order <= lit) return { result: 'already', lit: lit, wasLit: lit };
    if (lamp.order !== lit + 1) { F['_pzp:' + pz.id] = 0; return { result: 'wrong', lit: 0, wasLit: lit }; }
    lit++;
    if (lit >= (pz.lamps || []).length) { delete F['_pzp:' + pz.id]; F[pz.id] = true; return { result: 'solved', lit: lit, wasLit: lit - 1 }; }
    F['_pzp:' + pz.id] = lit;
    return { result: 'lit', lit: lit, wasLit: lit - 1 };
  }
  /** 重來拉桿：全部熄掉（解開以後不能重來） */
  function lampReset(state, pz) {
    if (solved(state, pz.id)) return { result: 'done', wasLit: (pz.lamps || []).length };
    var was = lampsLit(state, pz);
    flags(state)['_pzp:' + pz.id] = 0;
    return { result: 'reset', wasLit: was };
  }

  /** 密碼門：位數、每位標籤 */
  function codeDigits(pz) { return Math.max(1, pz.digits || String(pz.answer || '').length || 3); }
  function codeLabels(pz) { var n = codeDigits(pz), l = pz.labels || []; var out = []; for (var i = 0; i < n; i++) out.push(l[i] || ''); return out; }
  /** 輸入（字串或數字陣列）對不對；對了就立旗標。回傳 true／false */
  function codeTry(state, pz, input) {
    var s = Array.isArray(input) ? input.join('') : String(input);
    var ok = s === String(pz.answer);
    if (ok) flags(state)[pz.id] = true;
    else flags(state)['_pzt:' + pz.id] = (Number(flags(state)['_pzt:' + pz.id]) || 0) + 1;
    return ok;
  }
  /** 整合2：密碼門輸錯時要播的對話 id（資料 dialog_wrong；對話不存在或沒寫 → null，畫面只顯示「門沒有動。」） */
  function codeWrongDialog(pz, dialogs) {
    var id = pz && pz.dialog_wrong;
    return id && dialogs && dialogs[id] ? id : null;
  }
  /** 數字盤 ＋／－：0–9 循環 */
  function dialStep(v, d) { return ((Number(v) || 0) + d + 10) % 10; }

  /** 拉桿：第一次拉＝立旗標。回傳 true＝這次才拉開 */
  function leverPull(state, pz) { if (solved(state, pz.id)) return false; flags(state)[pz.id] = true; return true; }

  /** 機關解開後的獎勵：要讓哪些寶箱出現、立哪些旗標、觸發哪個事件 */
  function reward(state, pz) {
    var r = pz.reward || {};
    if (r.flag) flags(state)[r.flag] = true;
    return { chest: r.chest || null, flag: r.flag || null, event: r.event || null };
  }

  // ---------------------------------------------------------------- 隱藏區
  function hiddenAt(map, x, y) { return ((map && map.hidden) || []).filter(function (h) { return h.at && h.at.x === x && h.at.y === y; })[0] || null; }
  function hiddenOpen(state, h) { return !!flags(state)[h.id]; }
  /** 調查：條件成立就打開（永遠開著）。回傳 'opened'｜'already'｜'locked' */
  function investigate(state, quests, h) {
    if (hiddenOpen(state, h)) return 'already';
    if (h.requires !== undefined && !cond(state, quests, h.requires)) return 'locked';
    flags(state)[h.id] = true;
    return 'opened';
  }
  /** 還沒打開的隱藏區格子（擋路）：{ "x,y": true } */
  function hiddenBlocked(map, state) {
    var out = {};
    ((map && map.hidden) || []).forEach(function (h) {
      if (hiddenOpen(state, h)) return;
      (h.cells || []).forEach(function (c) { out[c[0] + ',' + c[1]] = true; });
    });
    return out;
  }

  // ---------------------------------------------------------------- 寶箱
  function chestKind(c) { return c && c.kind ? c.kind : 'normal'; }
  /** 寶箱現在看得到嗎（隱藏：隱藏區打開；機關：機關解開；已經打開過的一律看得到） */
  function chestVisible(map, state, c) {
    if (state.chests && state.chests[c.id]) return true;
    var k = chestKind(c);
    if (k === 'hidden') {
      var h = ((map && map.hidden) || []).filter(function (x) { return x.id === c.hidden || (x.chests || []).indexOf(c.id) >= 0; })[0];
      return h ? hiddenOpen(state, h) : true;
    }
    if (k === 'puzzle') {
      var pid = c.puzzle || (((map && map.puzzles) || []).filter(function (p) { return p.reward && p.reward.chest === c.id; })[0] || {}).id;
      return pid ? solved(state, pid) : true;
    }
    return true;
  }
  /** 開寶箱要不要出題（一般、隱藏要；惡作劇、機關不要） */
  function chestNeedsQuestion(c) { var k = chestKind(c); return k === 'normal' || k === 'hidden'; }
  /** 惡作劇寶箱：拿冷笑話卡。回傳卡 id（已經有了也回傳） */
  function jokeGet(state, id) { if (id) flags(state)['joke:' + id] = flags(state)['joke:' + id] || Date.now(); return id || null; }
  function jokeList(state, cards) {
    var F = flags(state);
    return Object.keys(cards || {}).filter(function (k) { return F['joke:' + k]; }).map(function (k) { return Object.assign({ id: k }, cards[k]); });
  }

  // ---------------------------------------------------------------- 柵門、出口、休息點、事件
  function gateOpen(state, quests, gt) {
    if (gt.open !== undefined) return cond(state, quests, gt.open);
    return !gt.quest || cond(state, quests, gt.quest);
  }
  function exitOpen(state, quests, ex) { return !ex.requires || cond(state, quests, ex.requires); }
  function restOpts(map, r) {
    return { heal: r.heal !== false, save: r.save !== false, respawn: r.respawn !== undefined ? !!r.respawn : mapKind(map) === 'dungeon' };
  }
  function restAt(map, x, y) { return ((map && map.rests) || []).filter(function (r) { return r.x === x && r.y === y; })[0] || null; }
  /** 這張圖現在出現的傳送事件（warp） */
  function warpEvents(map, state, quests) {
    return ((map && map.events) || []).filter(function (e) { return (e.type || 'warp') === 'warp' && cond(state, quests, e.requires); });
  }
  function warpAt(map, state, quests, x, y) { return warpEvents(map, state, quests).filter(function (e) { return e.x === x && e.y === y; })[0] || null; }
  /**
   * 整合3（審查 M-2）：只能靠「要求某委託完成」的傳送事件才進得去的區域（例：TD2 時光機關 → T08、T07、TI4 日治區）。
   * 回傳 [{ quest, maps:[…] }]：從傳送目的地沿一般出口走得到、又沒有一般出口通回區域外的地圖群。
   */
  /** 條件 c 成立之前，一定要先完成委託 q 嗎（看委託的 requires 鏈；any 要每一條都需要才算；{boss} 看那個頭目只在哪個委託進行中出現＝bossQ） */
  function needsQuest(c, q, quests, seen, bossQ) {
    seen = seen || {};
    if (c === undefined || c === null || c === true) return false;
    if (typeof c === 'string') {
      if (c === q) return true;
      if (seen[c]) return false;   // 只防循環：seen 是這一條路徑上的委託（每條分支各自一份）
      var path = Object.assign({}, seen); path[c] = true;
      return ((quests && quests[c] && quests[c].requires) || []).some(function (r) { return needsQuest(r, q, quests, path, bossQ); });
    }
    if (Array.isArray(c)) return c.some(function (x) { return needsQuest(x, q, quests, seen, bossQ); });
    if (typeof c !== 'object') return false;
    if (c.all) return c.all.some(function (x) { return needsQuest(x, q, quests, seen, bossQ); });
    if (c.any) return c.any.length > 0 && c.any.every(function (x) { return needsQuest(x, q, quests, seen, bossQ); });
    if (c.quest && needsQuest(c.quest, q, quests, seen, bossQ)) return true;
    if (c.active && needsQuest(c.active, q, quests, seen, bossQ)) return true;
    if (c.boss && bossQ && bossQ[c.boss] && bossQ[c.boss].length && bossQ[c.boss].every(function (bq) { return bq && needsQuest(bq, q, quests, seen, bossQ); })) return true;
    return false;
  }
  /**
   * 封閉區域：靠傳送事件（requires＝委託）才進得去、而且「確實沒有任何回程」的地圖群。
   * 整合6（審查第 2 輪）：回程不只看出口，事件（warp、NPC 選單 talk）與觸發區（triggers 有 to）的傳送也算；
   * 但那條回程的條件如果一定要先完成「進來要的委託」，對壞存檔來說還是回不去，就不算回程。quests 沒給時，有條件的事件一律不算回程。
   */
  function lockedRegions(maps, quests) {
    var out = [], bossQ = {};
    // 頭目只在綁定的委託進行中出現（spawns[].quest）；沒綁委託的頭目＝null（隨時打得到）
    Object.keys(maps || {}).forEach(function (mid) { ((maps[mid].spawns) || []).forEach(function (sp) { [sp.monster].concat(sp.chain || []).forEach(function (mon) { (bossQ[mon] = bossQ[mon] || []).push(sp.quest || null); }); }); });   // chain：打倒後接著出場的第二段
    Object.keys(maps || {}).forEach(function (mid) {
      ((maps[mid].events) || []).forEach(function (e) {
        if ((e.type || 'warp') !== 'warp' || !e.to || !maps[e.to]) return;
        var r = e.requires, qs = typeof r === 'string' ? [r] : (r && Array.isArray(r.all) ? r.all.filter(function (x) { return typeof x === 'string'; }) : []);
        if (!qs.length) return;
        qs.forEach(function (q) {
          var usable = function (c) { return c === undefined || c === null || (quests ? !needsQuest(c, q, quests, null, bossQ) : false); };
          var seen = {}, todo = [e.to];
          var go = function (to) { if (to && maps[to] && !seen[to]) todo.push(to); };
          while (todo.length) {
            var m = todo.pop(); if (seen[m]) continue; seen[m] = true;
            var M = maps[m] || {};
            (M.exits || []).forEach(function (x) {
              if (x.mrt_stations) x.mrt_stations.forEach(function (st) { go(st.map); });
              go(x.to);
            });
            (M.events || []).forEach(function (ev) {
              if (ev === e || !ev.to || !usable(ev.requires)) return;
              if ((ev.type || 'warp') === 'warp') go(ev.to);
              else if (ev.type === 'talk' && (M.npcs || []).some(function (n) { return n.id === ev.npc; })) go(ev.to);
            });
            (M.triggers || []).forEach(function (tr) { if (tr.to && usable(tr.requires)) go(tr.to); });
            // NPC 選單事件可以寫在別張圖，NPC 在這張圖也算
            Object.keys(maps).forEach(function (om) {
              if (om === m) return;
              ((maps[om].events) || []).forEach(function (ev) { if (ev.type === 'talk' && ev.to && usable(ev.requires) && (M.npcs || []).some(function (n) { return n.id === ev.npc; })) go(ev.to); });
            });
          }
          if (!seen[mid]) out.push({ quest: q, maps: Object.keys(seen) });   // 回不到出發地 → 封閉區域
        });
      });
    });
    return out;
  }
  /**
   * 讀檔自救：人已經在封閉區域裡，但進來要的委託沒完成（舊版本先存檔、後完成造成的壞存檔）→ 直接記成完成。
   * 回傳補完成的委託 id 陣列（不發獎勵：獎勵在委託完成時才發，這裡只修狀態）
   */
  function rescueRegion(state, quests, maps, mapId) {
    var fixed = [];
    lockedRegions(maps, quests).forEach(function (rg) {
      if (rg.maps.indexOf(mapId) < 0 || qstatus(state, quests, rg.quest) === 'done' || !quests[rg.quest]) return;
      state.quests = state.quests || {};
      state.quests[rg.quest] = Object.assign({}, state.quests[rg.quest] || {}, { status: 'done', rescued: true });
      fixed.push(rg.quest);
    });
    return fixed;
  }
  /** 某位 NPC 的選單事件（type:talk；條件成立的） */
  function talkEvents(maps, state, quests, npcId) {
    var out = [];
    Object.keys(maps || {}).forEach(function (mid) {
      ((maps[mid].events) || []).forEach(function (e) { if (e.type === 'talk' && e.npc === npcId && cond(state, quests, e.requires)) out.push(e); });
    });
    return out;
  }

  // ---------------------------------------------------------------- 捷運多站
  /** 捷運選單的目的地（排除本站所在地圖）；src 是出口或站務員 */
  function mrtStations(mapId, src) {
    return ((src && src.mrt_stations) || []).filter(function (s) { return s.map !== mapId; });
  }
  /** 這張圖的捷運開放條件（有 mrt_stations 的出口） */
  function mrtLockExit(map) { return ((map && map.exits) || []).filter(function (e) { return e.mrt_stations; })[0] || null; }

  // ---------------------------------------------------------------- 野怪
  function isFixed(spawn, mon) { return !!(spawn.boss || spawn.elite || (mon && mon.boss)); }
  /** 'never'（頭目、精英、respawn:never）｜'leave'（v0.6：離開地圖、迷宮休息點才重生）｜'timer'（舊地圖：30 秒） */
  function respawnMode(map, spawn, mon) {
    if (isFixed(spawn, mon) || spawn.respawn === 'never') return 'never';
    return v06(map) ? 'leave' : 'timer';
  }
  /** 這個 spawn 現在要不要放怪（頭目、精英打倒後不放；綁委託的頭目只在委託進行中；respawn:never 打倒後不放） */
  function spawnAlive(state, quests, spawn, mon, mapId, si) {
    if (spawn.requires && !cond(state, quests, spawn.requires)) return false;   // 整合：出現條件（例碼頭頭目要問完布攤阿姨）
    if (isFixed(spawn, mon)) {
      if (state.bosses && state.bosses[spawn.monster]) return false;
      if (spawn.quest && qstatus(state, quests, spawn.quest) !== 'active') return false;
      return true;
    }
    if (spawn.respawn === 'never' && flags(state)['_spd:' + mapId + ':' + si]) return false;
    return true;
  }
  /** 固定位置（at 優先，舊資料用 area 左上角） */
  function spawnSpot(spawn) { return spawn.at ? { x: spawn.at.x, y: spawn.at.y } : (spawn.area ? { x: spawn.area[0], y: spawn.area[1] } : null); }

  // ---------------------------------------------------------------- 委託：多步驟、推理、迷宮、跟隨
  function stepDone(state, quests, qid, step) {
    if (step.done !== undefined) return cond(state, quests, step.done);
    if (step.talk) return !!flags(state)['_step:' + qid + ':' + step.id];
    return false;
  }
  /** 目前這一步（第一個還沒完成的）；全部完成回 null */
  function currentStep(state, quests, qid) {
    var q = quests[qid];
    var st = (q && q.steps) || [];
    for (var i = 0; i < st.length; i++) if (!stepDone(state, quests, qid, st[i])) return Object.assign({ index: i }, st[i]);
    return null;
  }
  function stepsDone(state, quests, qid) { var q = quests[qid]; return !(q && q.steps && q.steps.length) || !currentStep(state, quests, qid); }
  /** 和 NPC 說話：完成「找某人說話」的步驟。回傳完成的步驟 id 陣列 */
  function talkStep(state, quests, npcId) {
    var out = [];
    Object.keys(quests || {}).forEach(function (qid) {
      if (qstatus(state, quests, qid) !== 'active') return;
      var cur = currentStep(state, quests, qid);
      if (cur && cur.talk === npcId) { flags(state)['_step:' + qid + ':' + cur.id] = true; out.push({ quest: qid, step: cur.id }); }
    });
    return out;
  }
  function cluesHave(state, q) { var F = flags(state); return (q.clues || []).filter(function (c) { return F[c]; }).length; }
  function deduceReady(state, q) { return cluesHave(state, q) >= (q.clues || []).length; }
  /** 推理選一個身分：'need'（線索不齊）｜'wrong'｜'right'（記進度，委託可完成） */
  function deducePick(state, quests, qid, choice) {
    var q = quests[qid];
    if (!deduceReady(state, q)) return 'need';
    var d = q.deduce || {};
    if (choice !== d.answer) { flags(state)['_ded:' + qid] = (Number(flags(state)['_ded:' + qid]) || 0) + 1; return 'wrong'; }
    flags(state)['_dedok:' + qid] = true;
    return 'right';
  }
  function mazeDone(state, quests, q) { return !!(q.maze && cond(state, quests, q.maze.done)); }
  /** 新委託種類的進度（QuestLog.progress 用）；不是新種類回 null */
  function questProgress(state, quests, qid) {
    var q = quests[qid];
    if (!q) return null;
    var k = q.kind;
    var base = null;
    if (k === 'deduce') {
      var n = (q.clues || []).length, have = cluesHave(state, q), ok = !!flags(state)['_dedok:' + qid];
      base = { have: ok ? 1 : 0, need: 1, text: ok ? '推理完成' : (have < n ? '線索 ' + have + '/' + n : '線索齊了，回去一起推理') };
    } else if (k === 'maze') {
      var md = mazeDone(state, quests, q);
      base = { have: md ? 1 : 0, need: 1, text: md ? '迷宮的機關解開了' : '解開迷宮的機關' };
    }
    if (q.steps && q.steps.length) {
      var cur = currentStep(state, quests, qid);
      if (cur) return { have: 0, need: 1, text: '目前：' + (cur.goal || cur.id) + '（' + (cur.index + 1) + '/' + q.steps.length + '）', step: cur };
      if (!base) return null;   // 步驟都完成：照原本種類（boss、help…）判斷
    }
    return base;
  }
  /** v0.6：除了寫 auto_boss 的頭目委託，一律不自動開始 */
  function allowAuto(q) { return !!(q && q.kind === 'boss' && q.auto_boss); }
  /** 跟隨夥伴（完成時 follower 的委託） */
  function followers(state, quests) {
    var out = [];
    Object.keys(quests || {}).forEach(function (id) { var f = quests[id].follower; if (f && qstatus(state, quests, id) === 'done' && out.indexOf(f) < 0) out.push(f); });
    return out;
  }

  // ---------------------------------------------------------------- 對話旗標
  /** 播完對話：立 _dlg:<id>，以及 DIALOG_FLAGS／委託 clue_dialogs 對應的旗標。回傳新立的旗標 */
  function onDialog(state, quests, id, dialogFlags) {
    if (!id) return [];
    var F = flags(state), out = [];
    var keep = dialogFlagList();   // 整合4 S-5：有清單時只記被引用的對話
    if (!keep || keep.indexOf('_dlg:' + id) >= 0) F['_dlg:' + id] = true;
    var add = function (f) { if (f && !F[f]) { F[f] = true; out.push(f); } };
    if (dialogFlags && dialogFlags[id]) [].concat(dialogFlags[id]).forEach(add);
    Object.keys(quests || {}).forEach(function (qid) { var cd = quests[qid].clue_dialogs; if (cd && cd[id]) add(cd[id]); });
    return out;
  }

  // ---------------------------------------------------------------- 阿咕兩層提示
  var HINT_FALLBACK = '咕……先跟大家說說話，再打開偵探筆記看看吧。';
  /** 提示組：未解機關（目前地圖）→ 進行中委託的步驟 → 委託 → 支線 SIDE。回傳 { group, prefix, quest } 或 null */
  function hintGroup(state, quests, map) {
    var pz = ((map && map.puzzles) || []).filter(function (p) { return p.hint && !solved(state, p.id) && cond(state, quests, p.requires); })[0];
    if (pz) return { group: pz.hint, prefix: pz.hint_prefix || 'D_C01_HINT_', quest: null };
    var act = Object.keys(quests || {}).filter(function (id) { return qstatus(state, quests, id) === 'active'; });
    // 主線優先（id 沒有 SIDE／_S 的），再依資料順序
    act.sort(function (a, b) { return side(a) - side(b); });
    for (var i = 0; i < act.length; i++) {
      var q = quests[act[i]], cur = currentStep(state, quests, act[i]);
      var g = (cur && cur.hint) || q.hint;
      if (g) return { group: g, prefix: q.hint_prefix || 'D_C01_HINT_', quest: act[i] };
      if (side(act[i])) return { group: 'SIDE', prefix: q.hint_prefix || 'D_C01_HINT_', quest: act[i] };
    }
    return null;
  }
  function side(id) { return /SIDE|_S\d/.test(id) ? 1 : 0; }
  /** 按一次「問阿咕」：回傳 { level: 1|2, ids: [對話id], group } 或 { level: 0 }（沒有提示組） */
  function hintNext(state, quests, map) {
    var g = hintGroup(state, quests, map);
    if (!g) return { level: 0, ids: [], group: null };
    var F = flags(state), key = '_hint:' + g.group;
    var lv = Math.min(2, (Number(F[key]) || 0) + 1);
    F[key] = lv;
    return { level: lv, ids: [g.prefix + g.group + '_' + lv], group: g.group, quest: g.quest };
  }

  // ---------------------------------------------------------------- 偵探筆記
  /** 寫進筆記的頁（when 成立的） */
  function notebookPages(state, quests, pages) {
    return (pages || []).filter(function (p) { return cond(state, quests, p.when); });
  }
  /** 進行中委託的目前目標（雙保險） */
  function activeGoals(state, quests) {
    var out = [];
    Object.keys(quests || {}).forEach(function (id) {
      if (qstatus(state, quests, id) !== 'active') return;
      var q = quests[id], cur = currentStep(state, quests, id);
      out.push({ id: id, title: q.title || id, goal: (cur && cur.goal) || q.goal || '', side: !!side(id) });
    });
    return out.sort(function (a, b) { return (a.side ? 1 : 0) - (b.side ? 1 : 0); });
  }


  // ---------------------------------------------------------------- 整合4 S-5：對話紀錄旗標只留有人引用的（QR 存檔碼不會越來越長）
  /** 遞迴收集條件（或任何資料物件）裡的 _dlg: 旗標：字串、{flag}、all／any／not 都算；依出現順序、不重複 */
  function collectDialogFlags(obj, out) {
    out = out || [];
    (function walk(v) {
      if (typeof v === 'string') { if (v.indexOf('_dlg:') === 0 && out.indexOf(v) < 0) out.push(v); return; }
      if (Array.isArray(v)) { v.forEach(walk); return; }
      if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k]); });
    })(obj);
    return out;
  }
  /** world.js 的 dialog_flags（build_content.js 產生）；沒有清單（舊資料、測試地圖）時回 null＝全部保留 */
  function dialogFlagList() {
    var W = typeof window !== 'undefined' ? window.WORLD : null;
    return W && Array.isArray(W.dialog_flags) ? W.dialog_flags : null;
  }
  /**
   * 整合6（審查第 2 輪）：傳送（時光機關、回程光圈、NPC 選單事件）前的檢查。
   * 條件（ev.requires）不成立 → { ok:false, reason:'locked' }（除錯入口 debug:true 才略過）；
   * 目的地圖不存在或落點不能站（valid(loc) 為 false，例如被改過的存檔碼）→ 改去 startMap 的起點（reason:'fallback'）。
   */
  function warpTarget(ev, state, quests, valid, startMap, debug) {
    if (!ev) return { ok: false, reason: 'none' };
    if (!debug && ev.requires !== undefined && !cond(state, quests, ev.requires)) return { ok: false, reason: 'locked' };
    var loc = { map: ev.to, x: ev.tx, y: ev.ty };
    if (valid && !valid(loc)) return { ok: true, reason: 'fallback', to: { map: startMap, x: undefined, y: undefined } };
    return { ok: true, reason: null, to: loc };
  }
  /** 整合6：程式直接判斷「播過沒」的對話（game.js 到達 TI1 時看 NPM_ARRIVE）——build_content.js 與測試共用 */
  var PROGRAM_DIALOG_FLAGS = ['_dlg:D_C01_NPM_ARRIVE'];
  /** 整合6：從資料（地圖、委託、偵探筆記、怪物…）算出 WORLD.dialog_flags；build_content.js 與「清單過期」測試用同一段 */
  function dialogFlagsFrom(sources) { return collectDialogFlags(sources, PROGRAM_DIALOG_FLAGS.slice()).sort(); }
  /** 清掉清單外的 _dlg: 旗標（其他旗標不動）。回傳清掉幾個 */
  function pruneDialogFlags(fl, list) {
    list = list === undefined ? dialogFlagList() : list;
    if (!list || !fl || typeof fl !== 'object') return 0;
    var n = 0;
    Object.keys(fl).forEach(function (k) { if (k.indexOf('_dlg:') === 0 && list.indexOf(k) < 0) { delete fl[k]; n++; } });
    return n;
  }
  /** 整合4 D-10：筆記一頁的顯示文字（沒有 who 就不顯示「說的人：」，內文只一份） */
  function notebookText(p) {
    return { title: (p.kind === 'card' ? '🃏 ' : '📝 ') + (p.title || ''), speaker: p.who ? '說的人：' + p.who : '', text: p.text || '' };
  }
  /** 整合4 D-14：機關解開時要播的對話（dialog_done 有資料才播；沒有回 null，畫面用通用句） */
  function solvedDialog(pz, dialogs) { return pz && pz.dialog_done && dialogs && dialogs[pz.dialog_done] ? pz.dialog_done : null; }

  var Puzzle = {
    flags: flags, qstatus: qstatus, cond: cond, mapKind: mapKind, noMinimap: noMinimap, v06: v06,
    puzzle: puzzle, solved: solved, lampsLit: lampsLit, lampSorted: lampSorted, lampOn: lampOn, lampPress: lampPress, lampReset: lampReset,
    codeDigits: codeDigits, codeLabels: codeLabels, codeTry: codeTry, codeWrongDialog: codeWrongDialog, dialStep: dialStep, leverPull: leverPull, reward: reward,
    hiddenAt: hiddenAt, hiddenOpen: hiddenOpen, investigate: investigate, hiddenBlocked: hiddenBlocked,
    chestKind: chestKind, chestVisible: chestVisible, chestNeedsQuestion: chestNeedsQuestion, jokeGet: jokeGet, jokeList: jokeList,
    gateOpen: gateOpen, exitOpen: exitOpen, restOpts: restOpts, restAt: restAt, warpEvents: warpEvents, warpAt: warpAt, talkEvents: talkEvents, lockedRegions: lockedRegions, needsQuest: needsQuest, rescueRegion: rescueRegion,
    mrtStations: mrtStations, mrtLockExit: mrtLockExit,
    respawnMode: respawnMode, spawnAlive: spawnAlive, spawnSpot: spawnSpot, isFixed: isFixed,
    stepDone: stepDone, currentStep: currentStep, stepsDone: stepsDone, talkStep: talkStep, cluesHave: cluesHave, deduceReady: deduceReady, deducePick: deducePick,
    mazeDone: mazeDone, questProgress: questProgress, allowAuto: allowAuto, followers: followers, onDialog: onDialog,
    HINT_FALLBACK: HINT_FALLBACK, hintGroup: hintGroup, hintNext: hintNext, notebookPages: notebookPages, activeGoals: activeGoals,
    warpTarget: warpTarget, collectDialogFlags: collectDialogFlags, PROGRAM_DIALOG_FLAGS: PROGRAM_DIALOG_FLAGS, dialogFlagsFrom: dialogFlagsFrom, dialogFlagList: dialogFlagList, pruneDialogFlags: pruneDialogFlags, notebookText: notebookText, solvedDialog: solvedDialog
  };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.Puzzle = Puzzle; }
  if (typeof module !== 'undefined') module.exports = Puzzle;
})();
