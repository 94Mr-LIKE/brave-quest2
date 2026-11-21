/*
 * BQ2 v0.6 戰鬥流程（畫面層用的流程邏輯；規則在 battle_v06.js）
 *
 * - game.js 的戰鬥函式只負責畫面與等待玩家；「這一步之後是哪一步、這次要播哪些對話、這次要顯示什麼字」都在這裡，node 可以測。
 * - 依據：03b_戰鬥系統實作規格 R1–R14、01_劇本 第 7 節（頭目兩段對話 id）、派工單 B2-前端A 第 2 段。
 * - 不碰 DOM、不碰 Phaser；隨機由呼叫的人注入（rng）。
 */
(function () {
  'use strict';

  function BVof() {
    if (typeof window !== 'undefined' && window.JQ && window.JQ.BattleV06) return window.JQ.BattleV06;
    return typeof require === 'function' ? require('./battle_v06.js') : null;
  }
  function num(x, d) { var n = Number(x); return isFinite(n) ? n : d; }

  // ---------------------------------------------------------------- 文字（給四年級看的）
  /**
   * 五種受傷程度（R11）。規格用詞（Miss／擦傷／輕傷／命中／被爆擊）放在 spec，畫面主文字用孩子看得懂的說法，
   * 再配一個圖示，不只靠顏色分辨（暫用建議，待老闆確認）。
   */
  var TIER_TEXT = {
    miss: { text: '完美防禦！', icon: '✨', spec: 'Miss', cls: 'tier-miss' },
    graze: { text: '擋住了！只擦到一點', icon: '🛡️', spec: '擦傷', cls: 'tier-graze' },
    light: { text: '擋住一半', icon: '🛡️', spec: '輕傷', cls: 'tier-light' },
    hit: { text: '被打中了', icon: '💥', spec: '命中', cls: 'tier-hit' },
    crit: { text: '來不及防禦！', icon: '⚡', spec: '被爆擊', cls: 'tier-crit' }
  };
  /** R10：連續超時 3 次，戰鬥結束時給的提示（只提示、不自動改設定） */
  var HINT_TEXT = '題目有點趕嗎？可以請爸媽在「家長設定」把答題時間調成「寬鬆」喔！';
  /** 屬性回饋（R4）：打到弱點／被抵抗，文字＋圖示 */
  function elemFeedback(mult) {
    var P = BVof().P;
    if (mult >= P.ELEM_WEAK) return { kind: 'weak', text: '打到弱點！', icon: '🎯' };
    if (mult > 0 && mult <= P.ELEM_RESIST) return { kind: 'resist', text: '被抵抗了……', icon: '🔰' };
    return null;
  }
  /** R7 等級差小字：「等級差 −15%」；沒有降低回傳 '' */
  function lvDiffText(lvd) {
    if (!(lvd < 1)) return '';
    return '等級差 −' + Math.round((1 - lvd) * 100) + '%';
  }
  function tierInfo(tier) { return TIER_TEXT[tier] || TIER_TEXT.hit; }

  // ---------------------------------------------------------------- R1 編組
  /**
   * 地圖出沒表 → 權重表 [{id, w}]（頭目、精英不進表；權重＝count，沒寫算 1）
   */
  function spawnTable(spawns, monsters) {
    var out = [];
    (spawns || []).forEach(function (s) {
      var m = monsters && monsters[s.monster];
      if (!s.monster || s.boss || !m || m.boss || m.kind === 'elite') return;
      out.push({ id: s.monster, w: Math.max(1, num(s.count, 1)) });
    });
    return out;
  }
  /**
   * 這一場的編組（R1）。mon＝地圖上碰到的那隻；spawn＝它的出沒設定（可有 group：[id…] 指定整組）。
   * 回傳 { ids: [slot 1 起的怪物 id], stages: [第二段起的 id] }
   *   - 頭目：單挑；有 next_stage 時接第二段（可以接很多段）
   *   - spawn.group：照指定（最多 5 隻）
   *   - 精英：固定帶 1 隻野怪
   *   - 野怪：隻數照章別抽；第 1 隻一定是碰到的那隻，其餘從出沒表抽
   */
  function buildGroup(mon, spawn, table, ch, rng, monsters) {
    var BV = BVof(), max = BV.SPEC.MAX_FOES;
    if (mon.boss) {
      var stages = [], seen = {}, cur = mon;
      seen[mon.id] = true;
      while (cur && cur.next_stage && monsters && monsters[cur.next_stage] && !seen[cur.next_stage]) {
        seen[cur.next_stage] = true; stages.push(cur.next_stage); cur = monsters[cur.next_stage];
      }
      return { ids: [mon.id], stages: stages };
    }
    // README_資料格式 8.9：group＝碰到這隻時「一起出戰」的怪（例精英礦車 group:["steam"]）→ 碰到的那隻放 slot 1；
    // group 第一隻就是自己時當成整組（舊寫法相容）。整合 2026-11-20 修
    if (spawn && spawn.group && spawn.group.length) {
      var gids = spawn.group[0] === mon.id ? spawn.group.slice() : [mon.id].concat(spawn.group);
      return { ids: gids.slice(0, max), stages: [] };
    }
    var t = table && table.length ? table : [{ id: mon.id, w: 1 }];
    // 整合2：地圖沒寫 group 時，精英照怪物資料的 escort（固定帶 1 隻，例 e_minecart → steam）
    if (mon.kind === 'elite' && mon.escort && (!monsters || monsters[mon.escort])) return { ids: [mon.id, mon.escort].slice(0, max), stages: [] };
    if (mon.kind === 'elite') return { ids: BV.rollGroup(t, ch, rng, { elite: mon.id }).map(function (g) { return g.id; }), stages: [] };
    var g = BV.rollGroup(t, ch, rng).map(function (x) { return x.id; });
    g[0] = mon.id;
    return { ids: g, stages: [] };
  }

  // ---------------------------------------------------------------- 回合狀態機（R2、規格第 0 節）
  /**
   * 一回合的步驟：主角先 → ['hero', 'enemy']；敵人先 → ['enemy', 'hero']。
   * round＝{ n, steps, i }；next(round) 回傳下一步（'hero'｜'enemy'），這回合做完回傳 'end'
   */
  function newRound(prev, order) { return { n: (prev ? prev.n : 0) + 1, order: order, steps: order === 'enemy' ? ['enemy', 'hero'] : ['hero', 'enemy'], i: 0 }; }
  function nextStep(round) {
    if (!round || round.i >= round.steps.length) return 'end';
    return round.steps[round.i++];
  }

  // ---------------------------------------------------------------- R6–R8 主角一擊
  /**
   * 主角攻擊一隻敵人的一段傷害（R6；多段時 part＞0 的前一擊屬性＝這一擊的屬性）。
   * o＝{ hero（Character.stats6 的結果）, trait, foe, star, elapsed（秒）, limit（秒；0＝不計時）, favored, favMult,
   *     p（技能倍率，含增益）, magic, elem（攻擊屬性）, prevElem, phantom, boss, jobMult, rand（爆擊擲骰）, sureCrit, noCrit }
   * 回傳 { damage, elemMult, chainMult, lvd, crit }
   */
  function heroStrike(o) {
    var BV = BVof(), P = BV.P, hero = o.hero || {}, trait = o.trait || {};
    var mc = BV.monsterCombat(o.foe.mon);
    var star = o.star || 1, std = BV.timeLimitSec(star, 'standard', 1);
    var em = BV.elemMult(o.elem || null, mc.ELEM), cm = BV.chainMult(o.prevElem || null, o.elem || null, !!o.phantom);
    var crit = !!o.sureCrit || (!o.noCrit && BV.isCrit(num(o.elapsed, 0), num(o.limit, 0), num(hero.CRIT, 0), o.rand, trait.critFrac, std));
    var critMult = trait.critMult || P.CRIT_MULT;
    var r = BV.heroDamage({
      atk: o.magic ? hero.MATK : hero.ATK, p: num(o.p, 1), tgtDef: o.magic ? mc.MDEF : mc.PDEF, star: star,
      elapsed: num(o.elapsed, 0), limit: num(o.limit, 0), stdLimit: std, favored: !!o.favored, favMult: o.favMult,
      elem: em, chain: cm, enemyLv: mc.LV, el: num(hero.EL, 1), crit: crit && !o.sureCrit ? true : false, critMult: critMult,
      boss: !!o.boss, jobMult: num(o.jobMult, 1)
    });
    // sureCrit（一定爆擊的技能）：倍率已經乘在 p 裡（沿用切片），這裡只標記要播爆擊演出
    return { damage: r.damage, elemMult: em, chainMult: cm, lvd: r.lvd, crit: crit };
  }

  /**
   * 切片的增益（fx：atk_up／charge／time_up 關閉時的 power）在攻擊時用掉一次（和舊 Battle.attack 一致）。
   * 回傳 { mult, used: ['up'|'charge'|'power'] }；會改 fx
   */
  function consumeBuffs(fx) {
    var mult = 1, used = [];
    if (!fx) return { mult: mult, used: used };
    if (fx.up > 0) { mult *= fx.upM || 1; fx.up -= 1; used.push('up'); }
    if (fx.charge !== undefined && fx.charge !== 1) { mult *= fx.charge; fx.charge = 1; used.push('charge'); }
    if (fx.power > 0) { mult *= fx.powerM || 1; fx.power -= 1; used.push('power'); }
    return { mult: mult, used: used };
  }

  // ---------------------------------------------------------------- R9、R11 敵方回合
  /**
   * 防禦題結果 → 畫面要顯示的字。hurt＝BV.enemyResolve 的結果；labelOf(slot) → 敵人名稱
   * 回傳 { title（大字：受傷程度）, icon, spec, cls, lines: ['晃晃吊環A：2', …], total }
   */
  function defenseText(hurt, labelOf) {
    var info = tierInfo(hurt.tier);
    var lines = (hurt.hits || []).map(function (h) {
      var name = labelOf ? labelOf(h.slot) : ('#' + h.slot);
      if (h.evaded) return name + '：閃開了！';
      if (h.damage === 0) return name + '：沒打到';
      return name + (h.skill ? '（使出技能）' : '') + '：' + h.damage;
    });
    return { title: info.text, icon: info.icon, spec: info.spec, cls: info.cls, lines: lines, total: hurt.total || 0 };
  }

  /** 防禦題的秒數顯示（31.5 → 32） */
  function showSec(sec) { return sec > 0 ? Math.ceil(sec) : 0; }

  // ---------------------------------------------------------------- R10 超時計數
  /** 每答完一題（攻擊題、防禦題都算）；r＝quiz 的結果 { timeout } */
  function noteAnswer(watch, r) { return BVof().watchAnswer(watch, !!(r && r.timeout)); }
  /** 戰鬥結束（勝、敗、逃都要）→ 要不要顯示 HINT_TEXT */
  function endHint(watch, mode) { return BVof().watchBattleEnd(watch, mode || 'standard'); }

  // ---------------------------------------------------------------- R13 頭目
  /**
   * 主角一擊之後要播的頭目對話（照順序）。res＝BV.heroAttack 的結果；mon＝這一段的怪物；nextMon＝下一段（換段時）
   * 回傳 [{ id, kind: 'phase'|'reveal'|'intro' }]；對話 id 不存在時呼叫的人要安全略過
   */
  function bossDialogs(res, mon, nextMon) {
    var out = [];
    (res.lines || []).forEach(function (k) {
      var id = mon && mon.dialog_phase && mon.dialog_phase[k];
      if (id && !res.cleared && !res.nextStage) out.push({ id: id, kind: 'phase' });
    });
    if (res.nextStage) {
      if (mon && mon.dialog_after) out.push({ id: mon.dialog_after, kind: 'reveal' });
      if (nextMon && nextMon.dialog_before) out.push({ id: nextMon.dialog_before, kind: 'intro' });
    }
    return out;
  }
  /** 頭目狀態列文字：「第 1 段／共 2 段」「再答對 N 題」 */
  function bossStatus(b) {
    if (!b || !b.boss) return null;
    var total = b.stages.length, si = b.stageInfo || {};
    var need = Math.max(0, num(si.need, 0) - num(si.correct, 0));
    return { stage: b.stage + 1, total: total, need: need, held: si.hp > 0 && si.hp <= Math.max(1, Math.round(si.max * BVof().SPEC.HOLD_MARGIN)) && need > 0 };
  }

  // ---------------------------------------------------------------- R14 勝利結算
  /**
   * 勝利結算（兩段合計）。goldMult＝職業金幣倍率×技能（hit_gold）；dropFn(mon) → [item id]（委託素材過濾、掉寶倍率由呼叫的人處理）
   * 回傳 { exp, gold, drops, mons }
   */
  function settleVictory(b, goldMult, dropFn) {
    var BV = BVof(), r = BV.settle(b, goldMult), mons = [], drops = [];
    b.stages.slice(0, b.stage + 1).forEach(function (g) { mons = mons.concat(g); });
    if (dropFn) mons.forEach(function (m) { drops = drops.concat(dropFn(m) || []); });
    return { exp: r.exp, gold: r.gold, drops: drops, mons: mons };
  }

  // ---------------------------------------------------------------- 怪物戰鬥圖（新格式 sheet）
  /**
   * sprites.js 的 battle_sheet 欄位 → 格子資訊。sheet＝{ file, cols（預設 8）, idle（第 1 列格數，預設 4）, attack（第 2 列格數，6–8） }
   * 圖片寬高 w、h（讀到圖之後才知道）。格寬＝圖寬÷cols、格高＝圖高÷2（兩列）。不合格式回傳 null（畫面退回舊單張圖）
   */
  function sheetFrames(sheet, w, h) {
    if (!sheet || !(w > 0) || !(h > 0)) return null;
    var cols = num(sheet.cols, 8), idle = num(sheet.idle, 4), atk = num(sheet.attack, 8);
    if (cols < 1 || idle < 1 || idle > cols || atk < 0 || atk > cols) return null;
    var fw = Math.floor(w / cols), fh = Math.floor(h / 2);
    if (fw < 8 || fh < 8) return null;
    var idleF = [], atkF = [];
    for (var i = 0; i < idle; i++) idleF.push(i);
    for (var j = 0; j < atk; j++) atkF.push(cols + j);
    return { fw: fw, fh: fh, idle: idleF, attack: atkF };
  }

  // ---------------------------------------------------------------- 站位（1–5 隻）
  /**
   * 敵人在畫面上的 x 位置（中心）。W＝畫面寬；n＝隻數；回傳每隻的 x 與可用寬度（點擊區至少 minTouch）
   */
  function layoutFoes(W, n, minTouch) {
    var out = [], gap = W / (n + 1), wEach = Math.max(minTouch || 64, Math.min(W / n - 8, 260));
    for (var i = 0; i < n; i++) out.push({ x: Math.round(gap * (i + 1)), w: Math.round(wEach) });
    return out;
  }

  /**
   * 敵人那一排的高度（D-04、D-07）：top～bottom 是畫面上「沒有被面板蓋住」的區域（遊戲座標）。
   * 名字＋體力條在腳下（約 labelH），游標「▼ 目標」在頭上（約 cursorH）。回傳 { footY, imgH }
   */
  function foeRow(top, bottom, n, boss, labelH, cursorH) {
    labelH = labelH || 40; cursorH = cursorH || 30;
    var footY = Math.round(bottom - labelH);
    var want = boss ? 240 : (n >= 4 ? 120 : n === 3 ? 140 : 160);
    var room = Math.max(40, footY - top - cursorH);
    return { footY: footY, imgH: Math.round(Math.min(want, room)) };
  }

  /**
   * 遊戲畫布的邏輯大小（D-04、D-20）。直放手機（高＞寬×1.05）時改成和可用區域同比例的直式畫布，
   * 寬固定 logicalW（地圖 480、戰鬥 600），高＝寬 × 可用高 ÷ 視窗寬；橫放、電腦照舊 baseW×baseH（960×540）。
   * vw、vh＝視窗 CSS 尺寸；topPx＝上方被 HUD 佔掉的高度
   */
  function viewSize(vw, vh, topPx, logicalW, baseW, baseH) {
    baseW = baseW || 960; baseH = baseH || 540;
    if (!(vw > 0) || !(vh > 0) || vh <= vw * 1.05) return { w: baseW, h: baseH, portrait: false };
    var avail = Math.max(120, vh - Math.max(0, topPx || 0));
    var w = logicalW || 480;
    return { w: w, h: Math.max(Math.round(w * 9 / 16), Math.round(w * avail / vw)), portrait: true };
  }

  /**
   * 每隻敵人的位置（技術長退回意見：直放 4–5 隻排兩排）。回傳 [{ x, footY, imgH, w（這格寬） }]，順序＝slot 順序。
   *  - 一般：一排（layoutFoes＋foeRow）
   *  - 直放（portrait）且 4–5 隻：前排（下）放第 1、3、5 隻，後排（上）放第 2、4 隻，左右錯開；
   *    兩排各用一半高度，敵人圖大小和直放 3 隻差不多
   * big＝直放時的放大倍率（BattleScene 用 1.35）
   */
  function foeSlots(W, top, bottom, n, boss, labelH, cursorH, portrait, minTouch, big) {
    big = big || 1;
    var out = [], i;
    if (!(portrait && n >= 4)) {
      var L = layoutFoes(W, n, minTouch), row = foeRow(top, bottom, n, boss, labelH, cursorH);
      var imgH = Math.min(row.imgH * big, row.footY - top - (cursorH || 30));
      var gapW = Math.max(minTouch || 64, Math.round(W / (n + 1)) - 6);   // 一格寬不超過相鄰兩隻的間距（名字才不會互相重疊）
      for (i = 0; i < n; i++) out.push({ x: L[i].x, footY: row.footY, imgH: Math.round(imgH), w: Math.min(L[i].w, gapW) });
      return out;
    }
    var front = [], back = [];
    for (i = 0; i < n; i++) (i % 2 === 0 ? front : back).push(i);
    var mid = top + (bottom - top) * 0.5;
    var rowB = foeRow(top, mid + (labelH || 40) * 0.3, 3, false, labelH, cursorH);   // 後排（上）
    var rowF = foeRow(mid, bottom, 3, false, labelH, cursorH);                       // 前排（下）
    var LF = layoutFoes(W, front.length, minTouch), xsB;
    if (back.length === front.length) { var d = W / 7; xsB = [LF[0].x - d, LF[LF.length - 1].x + d]; }
    else { xsB = []; for (i = 0; i + 1 < LF.length; i++) xsB.push(Math.round((LF[i].x + LF[i + 1].x) / 2)); }
    var cellW = Math.round(Math.max(minTouch || 64, Math.min(W / (front.length + 1) - 6, 260)));
    var hB = Math.min(rowB.imgH * big, rowB.footY - top - (cursorH || 30)), hF = Math.min(rowF.imgH * big, rowF.footY - mid - (cursorH || 30));
    for (i = 0; i < n; i++) {
      var fi = front.indexOf(i);
      if (fi >= 0) out.push({ x: LF[fi].x, footY: rowF.footY, imgH: Math.round(hF), w: cellW });
      else out.push({ x: Math.round(xsB[back.indexOf(i)]), footY: rowB.footY, imgH: Math.round(hB), w: cellW });
    }
    return out;
  }

  /**
   * 減少動態效果（審查第 2 輪必須修第 2 項）：家長設定 settings.reduceMotion 是字串 'auto'｜'on'｜'off'。
   *   'on'（舊存檔的 true）→ 減少；'off'（舊存檔的 false）→ 不減少；'auto' 或沒設定 → 看系統 prefers-reduced-motion。
   * 戰鬥畫面、技能特效共用這一個判斷（family.js 的 openingFadeMs 規則相同）。
   */
  function reduceMotion(settings, prefersReduced) {
    var m = settings ? settings.reduceMotion : undefined;
    if (m === 'on' || m === true) return true;
    if (m === 'off' || m === false) return false;
    return !!prefersReduced;
  }
  /** 系統有沒有要求減少動態（瀏覽器才有；node 回 false） */
  function systemReducedMotion() {
    try { return !!(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  }

  /**
   * 這個畫面該用哪一種縮放（D-22）：直放一律等比例填滿（FIT、水平置中）；橫放照 game.js 的 zoomPlan
   * （整數倍且不浪費畫面 → NONE＋zoom；否則 FIT、置中）。plan＝G.zoomPlan() 的結果。回傳 { mode: 'fit'|'none', zoom, center: 'h'|'both' }
   */
  function scalePlan(portrait, plan) {
    if (portrait) return { mode: 'fit', zoom: 1, center: 'h' };
    if (plan && plan.integer) return { mode: 'none', zoom: Math.max(1, plan.zoom || 1), center: 'both' };
    return { mode: 'fit', zoom: 1, center: 'both' };
  }
  /**
   * 套用畫布大小與縮放（D-22：直放轉回橫放時畫布 CSS 停在直放大小）。每次都把縮放方式、置中、zoom 一起設回去，
   * 不只改遊戲大小。scale＝Phaser ScaleManager；P＝Phaser；回傳這次有沒有改到東西
   */
  function applyView(scale, v, plan, P) {
    var sp = scalePlan(v.portrait, plan), S = P.Scale, changed = false;
    var mode = sp.mode === 'none' ? S.NONE : S.FIT, center = sp.center === 'h' ? S.CENTER_HORIZONTALLY : S.CENTER_BOTH;
    if (scale.scaleMode !== mode) { scale.scaleMode = mode; changed = true; }
    if (scale.autoCenter !== center) { scale.autoCenter = center; changed = true; }
    if (mode === S.NONE && scale.zoom !== sp.zoom) { scale.zoom = sp.zoom; changed = true; }
    if (mode === S.FIT && scale.zoom !== 1) { scale.zoom = 1; changed = true; }
    if (scale.width !== v.w || scale.height !== v.h) { scale.setGameSize(v.w, v.h); changed = true; }
    // 只改 scaleMode 不夠：Phaser 的 displaySize 開機時就記住了比例模式（NONE 開機 → 之後 FIT 會被拉長）。一起設回去
    var ds = scale.displaySize;
    if (ds && ds.setAspectMode && ds.aspectMode !== mode) { ds.setAspectMode(mode); changed = true; }
    if (ds && ds.setAspectRatio && Math.abs((ds.aspectRatio || 0) - v.w / v.h) > 1e-6) { ds.setAspectRatio(v.w / v.h); changed = true; }
    // NONE 模式 Phaser 不會重寫畫布的 CSS 寬高（從直放轉回來會留在直放的 249×540）：自己寫回「遊戲大小 × zoom」
    var cv = scale.canvas;
    if (mode === S.NONE && cv && cv.style) {
      var cw = Math.round(v.w * sp.zoom) + 'px', ch = Math.round(v.h * sp.zoom) + 'px';
      if (cv.style.width !== cw || cv.style.height !== ch) { cv.style.width = cw; cv.style.height = ch; changed = true; }
    }
    return changed;
  }

  /** 兩個外框（{left, top, right, bottom}）有沒有重疊（量測版面用） */
  function rectsOverlap(a, b) {
    return !!(a && b && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom);
  }

  var BattleFlow = {
    TIER_TEXT: TIER_TEXT, HINT_TEXT: HINT_TEXT, tierInfo: tierInfo, elemFeedback: elemFeedback, lvDiffText: lvDiffText,
    spawnTable: spawnTable, buildGroup: buildGroup, newRound: newRound, nextStep: nextStep,
    heroStrike: heroStrike, consumeBuffs: consumeBuffs, defenseText: defenseText, showSec: showSec,
    noteAnswer: noteAnswer, endHint: endHint, bossDialogs: bossDialogs, bossStatus: bossStatus, settleVictory: settleVictory,
    sheetFrames: sheetFrames, layoutFoes: layoutFoes, foeRow: foeRow, foeSlots: foeSlots, viewSize: viewSize, rectsOverlap: rectsOverlap, reduceMotion: reduceMotion, systemReducedMotion: systemReducedMotion, scalePlan: scalePlan, applyView: applyView
  };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.BattleFlow = BattleFlow; }
  if (typeof module !== 'undefined') module.exports = BattleFlow;
})();
