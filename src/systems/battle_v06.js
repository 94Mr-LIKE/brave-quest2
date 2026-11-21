/*
 * BQ2 v0.6 戰鬥規則引擎（03b_戰鬥系統實作規格 R1–R16；參考實作 battle_spec.py）
 *
 * - 純函式＋一個小狀態機，不碰畫面；node 測試直接 require。隨機一律由呼叫的人注入（rng：回傳 0～1 的函式）。
 * - 參數全部集中在 CFG（P＝框架 sim_bq2.py 的 P，名稱照抄；SPEC＝battle_spec.py 的 SPEC）。程式裡不寫死數字。
 * - 秒數一律用「秒」；要毫秒時用 *Ms 結尾的欄位。
 * - 四捨五入：Math.round（.5 進位；規格「ROUND」）。
 * - 和舊 battle.js 的關係：舊介面（JQ.Battle）保留給現有畫面；第 2 段 BattleScene／quiz 改呼叫本檔。
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------- 設定（唯一來源）
  var P = {
    EL_PER_MASTER: 5,
    B_STR: 6, G_STR: 2.0, B_VIT: 5, G_VIT: 1.5, B_AGI: 5, G_AGI: 1.5,
    B_INT: 5, G_INT: 1.5, B_SPI: 5, G_SPI: 1.2, B_LUK: 5, G_LUK: 1.0,
    TRANSFER_STEP: 0.2, FLOOR_RATIO: 0.5,          // FLOOR_RATIO：D3 定案 0.7 但框架仍 0.5（待決 N6），先照 0.5
    HP_CONST: 10, HP_PER_VIT: 4, HP_PER_LV: 2,
    MP_CONST: 2, MP_PER_INT: 1.0, MP_PER_SPI: 0.5,
    PDEF_PER_VIT: 0.5, MDEF_PER_SPI: 0.5,
    CRIT_PER_LUK: 0.0015, CRIT_LUK_CAP: 0.15, CRIT_FAST_FRAC: 1 / 3,
    EVADE_PER_AGI: 0.004, EVADE_CAP: 0.10,
    DEF_FACTOR: 0.5, MIN_DMG_RATIO: 0.2,
    DIFF_1: 1.0, DIFF_2: 1.3, DIFF_3: 1.6, DIFF_4: 2.0, SPEED_MAX: 0.3, FAV_MULT: 1.5,
    ELEM_WEAK: 1.5, ELEM_RESIST: 0.5, CHAIN_BONUS: 0.25,
    LVDIFF_STEP: 0.05, LVDIFF_FLOOR: 0.5, CRIT_MULT: 1.5,
    TIME_1: 30, TIME_2: 40, TIME_3: 60, TIME_4: 90,
    DEF_TIME_NORMAL: 0.7, DEF_TIME_SKILL: 1.3, SKILL_DMG: 1.5,
    TIER_MISS: 0.0, TIER_GRAZE: 0.25, TIER_LIGHT: 0.5, TIER_HIT: 1.0, TIER_CRIT: 1.5,
    SKILL_RATE_WILD: 0.2, SKILL_RATE_ELITE: 0.3, SKILL_RATE_BOSS: 0.35,
    BOSS_DMG_MULT: 1.3,
    MAX_STAR: 4, MAX_LEVEL: 99
  };
  var SPEC = {
    DEF_MIN_SEC: 12,               // D1-B：防禦題最短 12 秒（先套最短、再乘家長模式）
    TIMEOUT_STREAK_PROMPT: 3,      // D1-C：連續超時 3 次 → 這場戰鬥結束後提示家長
    PROMPT_COOLDOWN_BATTLES: 10,   // 提示後至少隔 10 場才會再提示
    MODE_MULT: { relaxed: 1.5, standard: 1.0, off: 0 },
    ENEMY_VAR: [0.9, 1.1],         // 敵人傷害浮動
    BOSS_MIN_CORRECT: { mboss: 3, tboss1: 2, tboss2: 2, elite: 0, wild: 0 },
    HOLD_MARGIN: 0.1,
    CHAIN_BONUS_PHANTOM: 0.40,
    CRIT_MULT_MASTER: 1.7,
    THIEF_STEAL: 0.08,
    PHASE_LINE_AT: { 2: 2 / 3, 3: 1 / 3 },   // 頭目階段台詞：HP 第一次 ≤ 2/3、≤ 1/3 時播（只播台詞，不改數值）
    MAX_FOES: 5,
    FLOOR_RATIO: 0.7               // 03b 第 2 版：轉職保底 70%（D3 定案）；框架 P.FLOOR_RATIO 0.5 不再使用
  };
  var STATS = ['STR', 'VIT', 'AGI', 'INT', 'SPI', 'LUK'];
  var ELEMS = ['金', '木', '水', '火', '土', '風', '光', '闇'];
  var BEATS = { '金': ['木'], '木': ['土'], '水': ['火'], '火': ['金'], '土': ['水', '風'], '風': ['土'], '光': ['闇'], '闇': ['光'] };
  var GEN = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };   // 五行相生：前一擊 → 這一擊
  // 每場隻數（R1；框架 enemies_per_battle，D11-A）：[章上限, 隻數[], 權重[]]
  var PER_BATTLE = [
    [1, [1, 2], [0.6, 0.4]],
    [4, [1, 2, 3], [0.3, 0.45, 0.25]],
    [10, [1, 2, 3, 4], [0.15, 0.35, 0.33, 0.17]],
    [Infinity, [1, 2, 3, 4, 5], [0.12, 0.3, 0.32, 0.18, 0.08]]
  ];
  var TIERS = ['miss', 'graze', 'light', 'hit', 'crit'];
  var TIER_LABEL = { miss: 'Miss', graze: '擦傷', light: '輕傷', hit: '命中', crit: '被爆擊' };
  var TIER_MULT = { miss: P.TIER_MISS, graze: P.TIER_GRAZE, light: P.TIER_LIGHT, hit: P.TIER_HIT, crit: P.TIER_CRIT };
  var TIER_EDGES = [[0.25, 'miss'], [0.5, 'graze'], [0.75, 'light']];   // f < 邊界 → 該段；其餘＝命中
  var SKILL_RATE = { wild: P.SKILL_RATE_WILD, elite: P.SKILL_RATE_ELITE, mboss: P.SKILL_RATE_BOSS, tboss1: P.SKILL_RATE_BOSS, tboss2: P.SKILL_RATE_BOSS, boss: P.SKILL_RATE_BOSS };
  var BOSS_KINDS = ['mboss', 'tboss1', 'tboss2'];

  var CFG = { P: P, SPEC: SPEC, STATS: STATS, ELEMS: ELEMS, BEATS: BEATS, GEN: GEN, PER_BATTLE: PER_BATTLE,
    TIERS: TIERS, TIER_LABEL: TIER_LABEL, TIER_MULT: TIER_MULT, SKILL_RATE: SKILL_RATE, BOSS_KINDS: BOSS_KINDS };

  /**
   * ROUND：03b 第 2 版（技術長 2026-11-20 裁定）全篇一律四捨五入、.5 進位＝JS Math.round（預設 'half_up'）。
   * 'half_even' 只留給對照第 1 版舊算例用（只有剛好 .5 才有差）。
   */
  CFG.ROUND_MODE = 'half_up';
  function rnd(x) {
    if (CFG.ROUND_MODE === 'half_even') {
      var f = Math.floor(x);
      if (x - f === 0.5) return f % 2 === 0 ? f : f + 1;
    }
    return Math.round(x);
  }
  function num(x, d) { var n = Number(x); return isFinite(n) ? n : d; }
  function rngOf(r) { return typeof r === 'function' ? r : Math.random; }

  // ---------------------------------------------------------------- R1 編組與目標
  function perBattleRow(ch) {
    for (var i = 0; i < PER_BATTLE.length; i++) if (ch <= PER_BATTLE[i][0]) return PER_BATTLE[i];
    return PER_BATTLE[PER_BATTLE.length - 1];
  }
  /** 這一場幾隻（照章別權重抽） */
  function groupSize(ch, rng) {
    var row = perBattleRow(num(ch, 1)), r = rngOf(rng)(), acc = 0;
    for (var i = 0; i < row[1].length; i++) { acc += row[2][i]; if (r < acc) return row[1][i]; }
    return row[1][row[1].length - 1];
  }
  function pickWeighted(table, rng) {
    var tot = 0; table.forEach(function (t) { tot += num(t.w, 0); });
    var r = rngOf(rng)() * tot, acc = 0;
    for (var i = 0; i < table.length; i++) { acc += num(table[i].w, 0); if (r < acc) return table[i].id; }
    return table[table.length - 1].id;
  }
  /**
   * 編組（R1）。table＝[{id, w}]；opts＝{ elite: id（精英固定帶 1 隻野怪）, boss: id（單挑） }
   * 回傳 [{slot, id}]，slot 1–5 由左到右
   */
  function rollGroup(table, ch, rng, opts) {
    opts = opts || {};
    if (opts.boss) return [{ slot: 1, id: opts.boss }];
    if (opts.elite) return [{ slot: 1, id: opts.elite }, { slot: 2, id: pickWeighted(table, rng) }];
    var n = Math.min(SPEC.MAX_FOES, groupSize(ch, rng)), out = [];
    for (var i = 0; i < n; i++) out.push({ slot: i + 1, id: pickWeighted(table, rng) });
    return out;
  }
  /** 同種兩隻以上：名稱後面加 A、B、C（照 slot 順序） */
  function labelFoes(foes, nameOf) {
    var cnt = {}, seen = {};
    foes.forEach(function (f) { cnt[f.id] = (cnt[f.id] || 0) + 1; });
    return foes.map(function (f) {
      var base = nameOf ? nameOf(f.id) : f.id;
      if (cnt[f.id] < 2) return base;
      seen[f.id] = (seen[f.id] || 0) + 1;
      return base + String.fromCharCode(64 + seen[f.id]);
    });
  }
  function aliveSorted(foes, exceptSlot) {
    return foes.filter(function (f) { return f.hp > 0 && f.slot !== exceptSlot; }).sort(function (a, b) { return a.slot - b.slot; });
  }
  /** 目標：玩家點的還在就打它，否則 slot 最小、還沒停機的那隻；全倒回傳 null */
  function pickTarget(foes, chosen) {
    var alive = aliveSorted(foes);
    if (!alive.length) return null;
    if (chosen !== undefined && chosen !== null && alive.some(function (f) { return f.slot === chosen; })) return chosen;
    return alive[0].slot;
  }
  /** 多段攻擊中目標停機：換「右邊最近」還在的，右邊沒有換「左邊最近」的 */
  function nextTargetAfterKill(foes, deadSlot) {
    var alive = aliveSorted(foes, deadSlot);
    if (!alive.length) return null;
    var right = alive.filter(function (f) { return f.slot > deadSlot; });
    return right.length ? right[0].slot : alive[alive.length - 1].slot;
  }
  /** 只剩 1 隻時不顯示目標游標 */
  function showCursor(foes) { return aliveSorted(foes).length > 1; }

  // ---------------------------------------------------------------- R2 出手順序
  function heroFirst(heroAgi, enemyAgis, thiefFirst) {
    if (thiefFirst) return true;
    if (!enemyAgis || !enemyAgis.length) return true;
    return num(heroAgi, 0) >= Math.max.apply(null, enemyAgis);
  }

  // ---------------------------------------------------------------- R3 能力值與衍生值
  /** 六項能力：max(ROUND((基礎＋成長×(Lv−1))×mods×(1＋0.2n)), floor) */
  function stats6(lv, mods, n, floor) {
    mods = mods || {}; floor = floor || {};
    var L = Math.max(1, Math.min(P.MAX_LEVEL, num(lv, 1))), out = {};
    STATS.forEach(function (s) {
      var m = mods[s] === undefined ? 1 : num(mods[s], 1);
      var v = rnd((P['B_' + s] + P['G_' + s] * (L - 1)) * m * (1 + P.TRANSFER_STEP * num(n, 0)));
      out[s] = Math.max(v, num(floor[s], 0));
    });
    return out;
  }
  function critRate(luk) { return Math.min(P.CRIT_LUK_CAP, P.CRIT_PER_LUK * num(luk, 0)); }
  /** 衍生值。gear＝{ atk（武器攻擊）, matk（武器魔力）, pdef（防具物防）, mdef（防具魔防） } */
  function derived(st, lv, gear) {
    gear = gear || {};
    return {
      HP: rnd(P.HP_CONST + P.HP_PER_VIT * st.VIT + P.HP_PER_LV * lv),
      MP: rnd(P.MP_CONST + P.MP_PER_INT * st.INT + P.MP_PER_SPI * st.SPI),
      ATK: st.STR + num(gear.atk, 0), MATK: st.INT + num(gear.matk, 0),
      PDEF: P.PDEF_PER_VIT * st.VIT + num(gear.pdef, 0), MDEF: P.MDEF_PER_SPI * st.SPI + num(gear.mdef, 0),
      AGI: st.AGI, CRIT: critRate(st.LUK)
    };
  }
  /** 轉職保底：各項 max(舊 floor, ROUND(轉職前能力 × ratio))；ratio 沒給用 SPEC.FLOOR_RATIO（0.7） */
  function floorAfterTransfer(prevFloor, stBefore, ratio) {
    var r = ratio === undefined ? SPEC.FLOOR_RATIO : ratio, out = {};
    STATS.forEach(function (s) { out[s] = Math.max(num((prevFloor || {})[s], 0), rnd(stBefore[s] * r)); });
    return out;
  }
  /** 有效等級 EL＝職業等級＋5×已出師職業數 */
  function effectiveLevel(jobLv, mastered) { return num(jobLv, 1) + P.EL_PER_MASTER * num(mastered, 0); }
  /** 怪物的戰鬥值（03_數值 2.1：力＝攻擊、物防＝0.5×體；HP 直接指定） */
  function monsterCombat(mon) {
    var six = mon.six || {};
    return {
      HP: num(mon.hp, 1), ATK: num(mon.atk, num(six.STR, 1)), MATK: num(six.INT, num(mon.atk, 1)),
      PDEF: mon.pdef !== undefined ? num(mon.pdef, 0) : P.PDEF_PER_VIT * num(six.VIT, 0),
      MDEF: mon.mdef !== undefined ? num(mon.mdef, 0) : P.MDEF_PER_SPI * num(six.SPI, 0),
      AGI: num(mon.agi, num(six.AGI, 0)), LV: num(mon.level, 1), ELEM: mon.elem || null
    };
  }

  // ---------------------------------------------------------------- R4 屬性、R5 相生
  function elemMult(att, tgt) {
    if (!att || !tgt || !BEATS[att] || !BEATS[tgt]) return 1.0;
    if (BEATS[att].indexOf(tgt) >= 0) return P.ELEM_WEAK;
    if (BEATS[tgt].indexOf(att) >= 0) return P.ELEM_RESIST;
    return 1.0;
  }
  function chainMult(prev, cur, phantom) {
    if (prev && cur && GEN[prev] === cur) return 1 + (phantom ? SPEC.CHAIN_BONUS_PHANTOM : P.CHAIN_BONUS);
    return 1.0;
  }
  /**
   * 「前一擊」紀錄怎麼更新（R5）：ev＝{ type: 'hit', elem } 打中；'miss'（答錯）、'timeout'、'item'、'flee' 清掉。
   * 打中無屬性也清掉。換目標、換頭目段落不影響（呼叫的人不要呼叫）。
   */
  function chainNext(prev, ev) {
    if (!ev || ev.type !== 'hit') return null;
    return ev.elem || null;
  }

  // ---------------------------------------------------------------- R6–R8 主角打敵人
  function timeStd(star) { return P['TIME_' + star] || P.TIME_1; }
  function diffOf(star) { return P['DIFF_' + star] || P.DIFF_1; }
  /** 答題係數。limit＝0（不計時）時用 stdLimit（標準時限）算速度 */
  function answerCoef(star, elapsed, limit, favored, stdLimit, favMult) {
    var ref = limit > 0 ? limit : (stdLimit || timeStd(star));
    var frac = Math.max(0, Math.min(1, num(elapsed, 0) / ref));
    return diffOf(star) * (1 + P.SPEED_MAX * (1 - frac)) * (favored ? (favMult || P.FAV_MULT) : 1);
  }
  function lvDiffMult(enemyLv, el) { return Math.max(P.LVDIFF_FLOOR, 1 - P.LVDIFF_STEP * Math.max(0, num(enemyLv, 1) - num(el, 1))); }
  /** 爆擊（R8）：用時 ≤ 時限×max(1/3, critFrac)，或亂數 < 爆擊率 */
  function isCrit(elapsed, limit, lukRate, rand, critFrac, stdLimit) {
    var ref = limit > 0 ? limit : stdLimit;
    if (num(elapsed, 0) <= ref * Math.max(P.CRIT_FAST_FRAC, num(critFrac, 0))) return true;
    return rand !== undefined && rand !== null && rand < num(lukRate, 0);
  }
  /** 時限（秒；0＝不計時）。mult＝時間條倍率（弓箭手 1.2、影子步等） */
  function timeLimitSec(star, mode, mult) {
    var m = SPEC.MODE_MULT[mode] === undefined ? 1 : SPEC.MODE_MULT[mode];
    if (m === 0) return 0;
    return timeStd(star) * m * (mult || 1);
  }
  /**
   * 一擊的傷害（R6）。o＝{ atk, p（技能倍率）, tgtDef, star, elapsed, limit（0＝不計時）, stdLimit, favored, favMult,
   *   elem, chain, enemyLv, el, crit, critMult, boss, jobMult（職業特性×裝備特效） }
   * 回傳 { damage, raw, ac, lvd, crit（倍率）, boss（倍率） }
   */
  function heroDamage(o) {
    var atk = num(o.atk, 1), p = num(o.p, 1), def = num(o.tgtDef, 0);
    var raw = Math.max(P.MIN_DMG_RATIO * atk * p, atk * p - P.DEF_FACTOR * def);
    var ac = answerCoef(o.star || 1, o.elapsed, num(o.limit, 0), o.favored, o.stdLimit, o.favMult);
    var lvd = lvDiffMult(o.enemyLv === undefined ? 1 : o.enemyLv, o.el === undefined ? 1 : o.el);
    var cm = o.crit ? (o.critMult || P.CRIT_MULT) : 1;
    var bm = o.boss ? P.BOSS_DMG_MULT : 1;
    var d = raw * ac * num(o.elem, 1) * num(o.chain, 1) * lvd * cm * bm * num(o.jobMult, 1);
    return { damage: Math.max(1, rnd(d)), raw: raw, ac: ac, lvd: lvd, crit: cm, boss: bm };
  }

  // ---------------------------------------------------------------- R9 敵人合併防禦題
  /** 防禦題秒數：max(最短 12, 基準×倍率) × 家長模式；不計時回傳 0 */
  function defenseSeconds(baseSec, mult, mode) {
    var m = SPEC.MODE_MULT[mode] === undefined ? 1 : SPEC.MODE_MULT[mode];
    if (m === 0) return 0;
    return Math.round(Math.max(SPEC.DEF_MIN_SEC, baseSec * mult) * m * 10) / 10;
  }
  /**
   * attackers＝[{ star（普攻星數）, skill（這回合放技能？） }]（只放這回合真的要出手的）。
   * 回傳 { star, sec（0＝不計時；畫面顯示用 Math.ceil）, limitMs, anySkill }；沒人出手回傳 null
   */
  function defenseQuestion(attackers, mode) {
    if (!attackers || !attackers.length) return null;
    var anySkill = attackers.some(function (a) { return !!a.skill; });
    var star = Math.max.apply(null, attackers.map(function (a) { return num(a.star, 1); })) + (anySkill ? 1 : 0);
    star = Math.min(P.MAX_STAR, star);
    var sec = defenseSeconds(timeStd(star), anySkill ? P.DEF_TIME_SKILL : P.DEF_TIME_NORMAL, mode || 'standard');
    return { star: star, sec: sec, limitMs: Math.round(sec * 1000), anySkill: anySkill };
  }
  /** 每隻各自擲骰決定放不放技能（野怪 20%、精英 30%、頭目 35%；怪物有 skill.rate 時用它） */
  function rollSkill(mon, rng) {
    var rate = mon && mon.skill && mon.skill.rate !== undefined ? num(mon.skill.rate, 0) : num(SKILL_RATE[(mon && mon.kind) || 'wild'], P.SKILL_RATE_WILD);
    return rngOf(rng)() < rate;
  }
  /** 這回合普攻的星數：怪物 stars＝[低, 高]，各自抽一個整數（規格沒寫怎麼選，暫用均勻抽） */
  function rollStar(mon, rng) {
    var s = (mon && mon.stars) || [1, 1], lo = num(s[0], 1), hi = num(s[1], lo);
    return lo + Math.floor(rngOf(rng)() * (hi - lo + 1));
  }

  /** 合併題的星數範圍（03b 第 2 版 R9）：[max(各隻下限), max(各隻上限)] */
  function groupStars(mons) {
    var lo = 1, hi = 1;
    (mons || []).forEach(function (m, i) {
      var s = (m && m.stars) || [1, 1], a = num(s[0], 1), c = num(s[1], a);
      if (i === 0) { lo = a; hi = c; } else { lo = Math.max(lo, a); hi = Math.max(hi, c); }
    });
    return [lo, Math.max(lo, hi)];
  }

  // ---------------------------------------------------------------- R11 受傷程度、R12 閃避
  /** 五段受傷程度。limit＝0 是不計時：答對一律輕傷、答錯被爆擊 */
  function defenseTier(correct, elapsed, limit) {
    if (!(limit > 0)) return correct ? 'light' : 'crit';
    if (!correct || elapsed >= limit) return 'crit';
    var f = elapsed / limit;
    for (var i = 0; i < TIER_EDGES.length; i++) if (f < TIER_EDGES[i][0]) return TIER_EDGES[i][1];
    return 'hit';
  }
  function evadeRate(heroAgi, enemyAgi) { return Math.min(P.EVADE_CAP, Math.max(0, (num(heroAgi, 0) - num(enemyAgi, 0)) * P.EVADE_PER_AGI)); }
  /**
   * 一隻敵人打主角（R11）。o＝{ atk, pdef, tier, skill, taken（職業被打倍率）, vary（浮動 0.9–1.1）, evaded, weakM, guardM }
   * 回傳 { damage, tier }（閃避成功時 tier 變 miss；被爆擊閃不掉）
   */
  function enemyDamage(o) {
    var tier = o.tier;
    if (o.evaded && (tier === 'graze' || tier === 'light' || tier === 'hit')) tier = 'miss';
    var t = TIER_MULT[tier];
    if (!t) return { damage: 0, tier: tier };
    var atk = num(o.atk, 1) * num(o.weakM, 1);
    var base = Math.max(P.MIN_DMG_RATIO * atk, atk - P.DEF_FACTOR * num(o.pdef, 0));
    var d = base * t * (o.skill ? P.SKILL_DMG : 1) * num(o.taken, 1) * num(o.vary, 1) * num(o.guardM, 1);
    return { damage: Math.max(1, rnd(d)), tier: tier };
  }
  function varyRoll(rng) { var v = SPEC.ENEMY_VAR; return v[0] + (v[1] - v[0]) * rngOf(rng)(); }

  // ---------------------------------------------------------------- R10 連續超時 → 提示家長
  function createWatch() { return { streak: 0, pending: false, cool: 0 }; }
  /** 每答完一題（攻擊題、防禦題都算）呼叫一次 */
  function watchAnswer(w, timedOut) {
    w.streak = timedOut ? w.streak + 1 : 0;
    if (w.streak >= SPEC.TIMEOUT_STREAK_PROMPT && w.cool === 0) w.pending = true;
    return w.pending;
  }
  /** 戰鬥結束時呼叫；回傳 true＝現在要跳家長提示（寬鬆、不計時模式不提示） */
  function watchBattleEnd(w, mode) {
    var show = w.pending && (mode || 'standard') === 'standard';
    if (show) { w.cool = SPEC.PROMPT_COOLDOWN_BATTLES; w.streak = 0; }
    else if (w.cool > 0) w.cool -= 1;
    w.pending = false;
    return show;
  }

  // ---------------------------------------------------------------- R13 頭目段落
  function minCorrect(kind) { return num(SPEC.BOSS_MIN_CORRECT[kind || 'wild'], 0); }
  /**
   * 段落打中一下（答對才呼叫；回復、防護等不造成傷害的技能 dmg＝0 也呼叫，算 1 題）。
   * stage＝{ hp, max, correct, need }；回傳 { stage（新物件）, result: 'held'|'cleared'|'hit' }
   */
  function bossHit(stage, dmg) {
    var st = { hp: stage.hp, max: stage.max, correct: stage.correct + 1, need: stage.need };
    var hp = stage.hp - num(dmg, 0);
    var margin = Math.max(1, rnd(stage.max * SPEC.HOLD_MARGIN));
    if (hp <= 0 && st.correct < st.need) { st.hp = Math.min(stage.hp, margin); return { stage: st, result: 'held' }; }
    if (hp <= 0) { st.hp = 0; return { stage: st, result: 'cleared' }; }
    st.hp = hp;
    return { stage: st, result: 'hit' };
  }
  /** 階段台詞觸發：HP 第一次降到門檻（含）以下。fired＝已播過的 {2:true}；回傳這次要播的 [2, 3] */
  function phaseLines(prevHp, hp, max, fired) {
    var out = [];
    Object.keys(SPEC.PHASE_LINE_AT).forEach(function (k) {
      var th = max * SPEC.PHASE_LINE_AT[k];
      if (!(fired && fired[k]) && hp > 0 && hp <= th && prevHp > th) out.push(Number(k));
    });
    return out;
  }

  // ---------------------------------------------------------------- R14 勝利獎勵
  /** 經驗＝Σexp；金幣＝ROUND(Σgold × 職業金幣倍率) */
  function victoryReward(mons, goldMult) {
    var exp = 0, gold = 0;
    (mons || []).forEach(function (m) { exp += num(m.exp, 0); gold += num(m.gold, 0); });
    return { exp: exp, gold: rnd(gold * num(goldMult, 1)) };
  }

  // ---------------------------------------------------------------- 狀態機（畫面層呼叫）
  /**
   * 開戰。mons＝[monster 物件]（已照 slot 排好；頭目戰傳第一段），opts＝{ stages: [第二段 monster…], nameOf }
   * 回傳戰鬥狀態 b：
   *   b.foes＝[{slot, id, mon, hp, maxHp, stun, weak, weakM, label}]、b.kind、b.stage（0 起）、b.stageInfo（頭目段落）、
   *   b.chain（前一擊屬性）、b.target、b.over、b.result、b.turn、b.lines（已播的階段台詞）
   */
  function create(mons, opts) {
    opts = opts || {};
    var kind = (mons[0] && mons[0].kind) || (mons[0] && mons[0].boss ? 'mboss' : 'wild');
    var b = { kind: kind, stage: 0, stages: [mons].concat((opts.stages || []).map(function (m) { return [m]; })),
      chain: null, target: null, over: false, result: null, turn: 0, questions: 0, nameOf: opts.nameOf || null };
    setFoes(b, mons);
    return b;
  }
  function setFoes(b, mons) {
    var foes = mons.map(function (m, i) {
      return { slot: i + 1, id: m.id, mon: m, hp: num(m.hp, 1), maxHp: num(m.hp, 1), stun: 0, weak: 0, weakM: 1 };
    });
    var labels = labelFoes(foes, function (id) { var f = foes.filter(function (x) { return x.id === id; })[0]; return (b.nameOf && b.nameOf(id)) || (f.mon.short_name || f.mon.name || id); });
    foes.forEach(function (f, i) { f.label = labels[i]; });
    b.foes = foes;
    b.kind = (mons[0] && mons[0].kind) || b.kind;
    var bossKind = BOSS_KINDS.indexOf(b.kind) >= 0;
    b.boss = bossKind;
    b.stageInfo = bossKind ? { hp: foes[0].hp, max: foes[0].maxHp, correct: 0, need: minCorrect(b.kind) } : null;
    b.lines = {};
    b.target = pickTarget(foes, null);
  }
  function foeAt(b, slot) { return b.foes.filter(function (f) { return f.slot === slot; })[0] || null; }
  function aliveFoes(b) { return aliveSorted(b.foes); }
  /** 玩家點目標；點到停機的改回預設。回傳實際目標 slot */
  function selectTarget(b, slot) { b.target = pickTarget(b.foes, slot); return b.target; }
  /** 這回合誰先（R2）：'hero' | 'enemy' */
  function turnOrder(b, heroAgi, thiefFirst) {
    var agis = aliveFoes(b).map(function (f) { return monsterCombat(f.mon).AGI; });
    return heroFirst(heroAgi, agis, thiefFirst) ? 'hero' : 'enemy';
  }
  /**
   * 主角答對後的攻擊（已算好每一段傷害的函式）。dmgFn(foe, partIndex) → 傷害數字（用新目標的防禦重算，R1 多段）。
   * hits＝段數。回傳 { parts: [{slot, damage, dealt, killed}], killed: [slot], stage: 'held'|'cleared'|'hit'|null, need（還要答對幾題）,
   *   lines: [階段台詞編號], cleared（全部停機）, nextStage（頭目還有下一段） }
   */
  function heroAttack(b, hits, dmgFn) {
    var out = { parts: [], killed: [], stage: null, need: 0, lines: [], cleared: false, nextStage: false };
    if (b.over) return out;
    var n = Math.max(1, hits || 1), slot = pickTarget(b.foes, b.target);
    if (b.boss) {
      var f0 = b.foes[0], total = 0;
      for (var i = 0; i < n; i++) total += Math.max(0, num(dmgFn(f0, i), 0));
      var prev = b.stageInfo.hp, r = bossHit(b.stageInfo, total);
      b.stageInfo = r.stage; f0.hp = r.stage.hp;
      out.parts.push({ slot: f0.slot, damage: total, dealt: prev - f0.hp, killed: r.result === 'cleared' });
      out.stage = r.result;
      out.need = Math.max(0, r.stage.need - r.stage.correct);
      out.lines = phaseLines(prev, f0.hp, f0.maxHp, b.lines);
      out.lines.forEach(function (k) { b.lines[k] = true; });
      if (r.result === 'cleared') {
        out.killed.push(f0.slot);
        if (b.stage + 1 < b.stages.length) out.nextStage = true;
        else { out.cleared = true; b.over = true; b.result = 'win'; }
      }
      return out;
    }
    for (var j = 0; j < n && slot !== null; j++) {
      var f = foeAt(b, slot), d = Math.max(0, num(dmgFn(f, j), 0)), dealt = Math.min(f.hp, d);
      f.hp -= dealt;
      var killed = f.hp <= 0;
      out.parts.push({ slot: slot, damage: d, dealt: dealt, killed: killed });
      if (killed) { out.killed.push(slot); slot = nextTargetAfterKill(b.foes, slot); }
    }
    b.target = pickTarget(b.foes, b.target);
    if (!aliveFoes(b).length) { out.cleared = true; b.over = true; b.result = 'win'; }
    return out;
  }
  /** 頭目換段（R13）：主角 HP/MP、增益、相生紀錄都不動；敵人減益、停止、停止次數重算 */
  function nextStage(b) {
    if (b.stage + 1 >= b.stages.length) return false;
    b.stage += 1;
    setFoes(b, b.stages[b.stage]);
    return true;
  }
  /**
   * 敵方回合第一步：決定誰出手、誰放技能、合併出哪一題（R9）。被停止的這回合不出手（停止次數 −1）。
   * 回傳 { attackers: [{slot, skill, star}], question（null＝全部停止，不出題） }
   */
  function enemyPlan(b, mode, rng) {
    rng = rngOf(rng);
    var attackers = [];
    aliveFoes(b).forEach(function (f) {
      if (f.stun > 0) { f.stun -= 1; return; }
      attackers.push({ slot: f.slot, skill: rollSkill(f.mon, rng), mon: f.mon });
    });
    // 03b 第 2 版 R9：合併題星數範圍＝[出手敵人最低星數的最大值, 最高星數的最大值]，每回合均勻抽一次，之後才套技能 +1
    var star = attackers.length ? rollStar({ stars: groupStars(attackers.map(function (a) { return a.mon; })) }, rng) : 0;
    attackers.forEach(function (a) { a.star = star; delete a.mon; });
    return { attackers: attackers, question: defenseQuestion(attackers, mode) };
  }
  /**
   * 敵方回合第二步：防禦題答完。ans＝{ correct, elapsed（秒）, limit（秒；0＝不計時） }；
   * o＝{ pdef, heroAgi, taken, guardM, rng（閃避）, varyRng（浮動；測試傳 () => 0.5 得 1.0） }
   * 回傳 { tier, hits: [{slot, damage, tier, skill, evaded}], total }
   */
  function enemyResolve(b, plan, ans, o) {
    o = o || {};
    var tier = defenseTier(!!ans.correct, num(ans.elapsed, 0), num(ans.limit, 0));
    var hits = [], total = 0, rng = rngOf(o.rng);
    (plan.attackers || []).forEach(function (a) {
      var f = foeAt(b, a.slot); if (!f || f.hp <= 0) return;
      var mc = monsterCombat(f.mon);
      var evaded = tier !== 'crit' && tier !== 'miss' && rng() < evadeRate(o.heroAgi, mc.AGI);
      var weakM = f.weak > 0 ? f.weakM : 1; if (f.weak > 0) f.weak -= 1;
      var vary = o.varyRng ? varyRoll(o.varyRng) : (o.vary === undefined ? 1 : o.vary);
      var r = enemyDamage({ atk: mc.ATK, pdef: o.pdef, tier: tier, skill: a.skill, taken: o.taken, vary: vary, evaded: evaded, weakM: weakM, guardM: o.guardM });
      hits.push({ slot: a.slot, damage: r.damage, tier: r.tier, skill: !!a.skill, evaded: evaded });
      total += r.damage;
    });
    return { tier: tier, hits: hits, total: total };
  }
  /** 勝利結算：打過的每一段、每一隻加總（頭目兩段＝兩段合計） */
  function settle(b, goldMult) {
    var mons = [];
    b.stages.slice(0, b.stage + 1).forEach(function (g) { mons = mons.concat(g); });
    return victoryReward(mons, goldMult);
  }

  var BattleV06 = {
    CFG: CFG, P: P, SPEC: SPEC,
    groupSize: groupSize, rollGroup: rollGroup, labelFoes: labelFoes, pickTarget: pickTarget, nextTargetAfterKill: nextTargetAfterKill, showCursor: showCursor,
    heroFirst: heroFirst,
    stats6: stats6, derived: derived, critRate: critRate, floorAfterTransfer: floorAfterTransfer, effectiveLevel: effectiveLevel, monsterCombat: monsterCombat,
    elemMult: elemMult, chainMult: chainMult, chainNext: chainNext,
    answerCoef: answerCoef, lvDiffMult: lvDiffMult, isCrit: isCrit, timeLimitSec: timeLimitSec, heroDamage: heroDamage,
    defenseSeconds: defenseSeconds, defenseQuestion: defenseQuestion, rollSkill: rollSkill, rollStar: rollStar, groupStars: groupStars,
    defenseTier: defenseTier, evadeRate: evadeRate, enemyDamage: enemyDamage,
    createWatch: createWatch, watchAnswer: watchAnswer, watchBattleEnd: watchBattleEnd,
    minCorrect: minCorrect, bossHit: bossHit, phaseLines: phaseLines, victoryReward: victoryReward,
    create: create, selectTarget: selectTarget, turnOrder: turnOrder, heroAttack: heroAttack, nextStage: nextStage,
    enemyPlan: enemyPlan, enemyResolve: enemyResolve, settle: settle, aliveFoes: aliveFoes
  };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.BattleV06 = BattleV06; }
  if (typeof module !== 'undefined') module.exports = BattleV06;
})();
