/*
 * 答題流程（把 rewards / adaptive / guard / hints / quest / daily / report 串起來）
 * 與畫面無關，可在 node 底下測試。
 *
 * 兩種模式：
 *   mode 'quest'（預設，v0.1）：答對自動推進 v0.1 委託（Quest.recordCorrect）
 *   mode 'free' （v0.2）     ：戰鬥、寶箱、村民委託共用；由呼叫端決定答對後做什麼
 * 其他選項：
 *   expMult   經驗值 乘數（地圖等級係數）
 *   filter    function(q) → 是否可出（硬條件，不放寬；例：戰鬥不出寶箱題）
 *   prefer    function(q) → 偏好（軟條件，篩不到時放寬；例：怪物的 q_levels、委託的單元與難度範圍）
 *   noRepeat  true = 同一個 session 內同一題不出兩次（戰鬥：同一隻怪同一場戰鬥）；最後才放寬
 *   mapId     勇者大冒險II（GDD 7.3 C1、C2）：有給就進「課程模式」——只出 Curriculum.eligible(q, state, mapId) 的題目
 *             （這張地圖已開放的節點；範圍外的題目永遠不出），並照當前／近期／更早三池配比挑題
 *   allowSwitch 課程模式下這一科沒有題目時可以換科目（預設 true；GDD 3.3 放寬順序）
 *   sageTopic  第三批：賢者的小測驗——這一課（SAGE_LESSONS id）的超綱題在學會之前也能出（Curriculum.eligible 的 opts）
 *   noCompanion 第三批：不觸發阿咕陪看（賢者小測驗：超綱題不該用掉節點的「第一題陪看」）
 *
 * 篩不到題時的放寬順序（GDD 3.3 硬規則 2；三年級版「篩不到就出該科全部題目」的退路已拿掉）：
 *   偏好（難度、單元、題型）→ 最近出過 → 題池（配比選的那池 → 其他池）→ 換科目 → 重複出最久以前出過的題 → 都沒有就回傳 null
 */
(function () {
  'use strict';
  var isNode = typeof module !== 'undefined' && typeof require === 'function';
  var J = isNode ? {
    Answer: require('./answer.js'), Rewards: require('./rewards.js'), Adaptive: require('./adaptive.js'),
    Guard: require('./guard.js'), Hints: require('./hints.js'), Quest: require('./quest.js'),
    Daily: require('./daily.js'), Report: require('./report.js'), Exp: require('./exp.js'), Curriculum: require('./curriculum.js')
  } : window.JQ;
  var ALL_SUBJECTS = ['國語', '英語', '數學', '自然', '社會'];

  function create(state, questions, subject, opts) {
    opts = opts || {};
    var mode = opts.mode || 'quest';
    if (mode === 'quest') J.Quest.start(state, subject);
    var curr = 'mapId' in opts;
    return {
      state: state, questions: questions, subject: subject, rng: opts.rng || Math.random,
      mode: mode, expMult: opts.expMult || 1, filter: opts.filter || null, noRepeat: !!opts.noRepeat,
      prefer: opts.prefer || null, curr: curr, mapId: curr ? opts.mapId : null, allowSwitch: opts.allowSwitch !== false,
      sageTopic: opts.sageTopic || null, noCompanion: !!opts.noCompanion,
      tier: null, companion: false, lastMiss: null,
      // v0.9.3（老闆 2026-10-10 C1）戰鬥：答對、攻擊都不給經驗值和金幣，打倒怪物時才給（怪物的經驗值、金幣，見 game.js bvictory）；
      // 逃跑、累倒都不給。forgone＝這場答對「本來會拿到」的數字（只給測試看）。
      // 每日小任務的金幣等戰鬥結束才給：記在存檔 player.pendingDaily，由 settleBattle（戰鬥結束）或 settlePlayerExp（讀檔時）結算
      deferExp: !!opts.deferExp, forgoneExp: 0, forgoneCoins: 0,
      asked: [], guard: J.Guard.create(), q: null, isVariant: false,
      wrongCount: 0, hintsOpened: 0, hintsUsed: false, erased: [], submitted: false, solved: false,
      shownAt: 0, finished: false
    };
  }

  function nearestLevel(pool, level) {
    var best = null, bestD = Infinity;
    pool.forEach(function (q) { var d = Math.abs(q.level - level) + (q.level > level ? 0.5 : 0); if (d < bestD) { bestD = d; best = q.level; } });
    return pool.filter(function (q) { return q.level === best; });
  }

  function index(sess) {
    if (!sess._byId || sess._byIdSrc !== sess.questions) {
      var m = {};
      (sess.questions || []).forEach(function (x) { if (x && x.id) m[x.id] = x; });
      sess._byId = m; sess._byIdSrc = sess.questions;
    }
    return sess._byId;
  }

  /** 這一科「能出」的題目（硬條件：filter；課程模式再加 Curriculum.eligible）。不會退回範圍外的題目 */
  function candidates(sess, subject) {
    var st = sess.state;
    return (sess.questions || []).filter(function (x) {
      return x && x.subject === subject && (!sess.filter || sess.filter(x)) && (!sess.curr || J.Curriculum.eligible(x, st, sess.mapId, sess.sageTopic ? { sageTopic: sess.sageTopic } : undefined));
    });
  }

  /** 軟條件（偏好、指定難度、題型）：篩完是空的就不用（narrow 只會縮小、不會變空） */
  function narrow(set, o) {
    var out = set;
    if (o.preferType) { var typed = out.filter(function (x) { return x.type === o.preferType; }); if (typed.length) out = typed; }
    if (o.forceLevel && out.length) out = nearestLevel(out, o.forceLevel);
    return out;
  }

  /** 在一池裡挑：S1 偏好∩最近沒出過 → S2 最近沒出過 → S3 這場還沒出過（最久以前出過的優先）；repeat 階段連這場出過的也可以 */
  function pickTier(sess, subject, T, o, hist, lastQ, repeat) {
    var st = sess.state, fresh = T;
    if (!repeat) {
      if (sess.noRepeat) fresh = fresh.filter(function (x) { return sess.asked.indexOf(x.id) < 0; });
      if (sess.q) fresh = fresh.filter(function (x) { return x.id !== sess.q.id; });
      if (!fresh.length) return null;
    }
    // 指定題型、指定難度（寶箱、頭目最後一擊）比「最近沒出過」優先（和三年級版相同）：先縮小，再分最近有沒有出過
    fresh = narrow(fresh, o);
    var pos = {};
    hist.forEach(function (id) { pos[id] = 1; });
    var unseen = fresh.filter(function (x) { return !pos[x.id]; });
    var pref = sess.prefer ? unseen.filter(sess.prefer) : unseen;
    var steps = repeat ? [fresh] : [pref, unseen, fresh];
    var avoid = lastQ && lastQ.variant_group;
    // 同組不連續：沒出過的題目若全和上一題同組，先改出出過的別組題目，真的沒有別組才出同組。
    // 偏好（寶箱情境、委託單元）仍然比同組不連續優先（偏好題全同組時照舊出偏好題）。
    if (avoid && !repeat) {
      var other = function (s) { return s.filter(function (x) { return x.variant_group !== avoid; }); };
      steps = [sess.prefer ? pref : [], other(unseen), other(fresh), unseen, fresh];
    }
    var opt = { rng: sess.rng, answered: st.answered, history: hist, avoidGroup: avoid };
    for (var i = 0; i < steps.length; i++) {
      if (!steps[i].length) continue;
      var q = J.Adaptive.pickQuestion(steps[i], subject, st.adaptive, opt);
      if (q) return q;
    }
    return null;
  }

  /** 一科：依配比決定先從哪一池挑，挑不到再換池（GDD 3.3：當前 → 近期 → 更早） */
  function pickSubject(sess, subject, o, repeat) {
    var st = sess.state, byId = index(sess);
    var cands = candidates(sess, subject);
    if (!cands.length) return null;
    var hist = st.qhist[subject] || [];
    var lastQ = hist.length ? byId[hist[hist.length - 1]] : null;
    var groups = { all: cands }, order = ['all'], mix = null;
    if (sess.curr) {
      groups = { cur: [], recent: [], early: [] };
      cands.forEach(function (x) { var t = J.Curriculum.tierOf(sess.mapId, J.Curriculum.nodeOf(x)); if (t) groups[t].push(x); });
      mix = J.Curriculum.tierOrder(st, subject, sess.mapId, cands, sess.rng);
      order = mix.order;
    }
    for (var i = 0; i < order.length; i++) {
      var T = groups[order[i]];
      if (!T || !T.length) continue;
      var q = pickTier(sess, subject, T, o, hist, lastQ, repeat);
      if (q) return { q: q, tier: sess.curr ? order[i] : null, mix: mix };
    }
    return null;
  }

  function choose(sess, subject, o) {
    var st = sess.state;
    var pv = st.pendingVariant;
    if (pv && pv.subject === subject && !o.forceLevel) {
      // 變化題（ADR-005）刻意出「同概念」：同 variant_group 優先，其中挑最近沒出過的（只在能出的題目裡挑）
      var cands = candidates(sess, subject);
      var fresh = sess.noRepeat ? cands.filter(function (x) { return sess.asked.indexOf(x.id) < 0; }) : cands;
      var vpool = narrow(fresh.length ? fresh : cands, o);
      var picked = vpool.length ? J.Rewards.pickVariant(vpool, pv, { recent: st.qhist[subject] || [], answered: st.answered, rng: sess.rng }) : null;
      if (picked) return { q: picked.question, isVariant: true, tier: sess.curr ? J.Curriculum.tierOf(sess.mapId, J.Curriculum.nodeOf(picked.question)) : null };
      st.pendingVariant = null;
    }
    var subjects = [subject];
    if (sess.curr && sess.allowSwitch) ALL_SUBJECTS.forEach(function (s) { if (s !== subject) subjects.push(s); });
    var passes = [false, true];   // false＝一般（這場不重複）；true＝最後才允許重複
    for (var p = 0; p < passes.length; p++) {
      for (var i = 0; i < subjects.length; i++) {
        var r = pickSubject(sess, subjects[i], o, passes[p]);
        if (r) { r.switched = subjects[i] !== subject; r.repeat = passes[p]; return r; }
      }
    }
    return null;
  }

  /**
   * 換下一題。o = { subject（覆寫科目）, forceLevel（指定難度，找不到就用最接近的）, preferType（優先題型） }
   * 回傳題目或 null（能出的範圍裡一題都沒有；呼叫端改成不用答題的普通攻擊或提示「題目還在準備中」）
   */
  function next(sess, now, o) {
    o = o || {};
    var st = sess.state;
    var subject = o.subject || sess.subject;
    if (!st.qhist) st.qhist = {};
    var r = choose(sess, subject, o);
    if (!r) { sess.lastMiss = { subject: subject, mapId: sess.mapId }; return null; }
    var q = r.q;
    sess.lastMiss = null;
    J.Adaptive.pushRecent(st.adaptive, q.id);
    J.Adaptive.pushHistory(st.qhist, q.subject, q.id);
    if (sess.curr) J.Curriculum.logAsked(st, q);   // C2 配比：這一科最近 20 題的節點
    sess.asked.push(q.id);
    sess.q = q; sess.isVariant = !!r.isVariant; sess.tier = r.tier || null; sess.switched = !!r.switched;
    sess.wrongCount = 0; sess.hintsOpened = 0; sess.hintsUsed = false; sess.erased = []; sess.submitted = false; sess.solved = false;
    sess.shownAt = now || 0;
    // C4 阿咕陪看：這個節點第一次出題（記在存檔 nodeIntro[node].companionDone，同一節點只觸發一次、讀檔後不重複）
    sess.companion = false;
    if (sess.curr && !sess.noCompanion && J.Curriculum.companionNeeded(st, q)) { J.Curriculum.markCompanion(st, q); sess.companion = true; }
    return q;
  }

  /** C4：阿咕陪看時自動打開第 1 層提示（免費，也不算「用了提示」，獎勵照常） */
  function openCompanionHint(sess) {
    if (!sess.q || sess.hintsOpened > 0) return { ok: false, reason: 'opened' };
    var step = J.Hints.nextStep(0);
    sess.hintsOpened = 1;
    return { ok: true, step: step, text: J.Hints.stepText(sess.q, step), free: true };
  }

  /** 讓冷卻計時從現在開始（例如朗讀完或關掉回饋後） */
  function markShown(sess, now) { sess.shownAt = now; }

  /** 這題沒答對就放棄（戰鬥答錯/超時、關掉寶箱）：下一題改出同概念的變化題（ADR-005） */
  function abandon(sess) {
    if (!sess.q || sess.solved) return false;
    if (!sess.submitted) return false;
    sess.state.pendingVariant = J.Rewards.makePending(sess.q, 0);
    return true;
  }

  function submit(sess, response, now) {
    var st = sess.state, q = sess.q;
    if (!q) return { status: 'none' };
    if (J.Guard.isLocked(sess.guard, now)) return { status: 'locked', remainingMs: J.Guard.remainingMs(sess.guard, now) };
    var correct = J.Answer.checkAnswer(q, response);
    J.Report.recordSubmission(st, q);
    var g = J.Guard.onAnswer(sess.guard, correct, now - sess.shownAt, now);
    var adaptiveChange = 0;
    if (!sess.submitted) {
      sess.submitted = true;
      // v0.7.2 最近答過的題目（最多 10 題；回饋「題目有錯」時帶入最近 3 題的 ID）
      st.recentQ = (st.recentQ || []).filter(function (x) { return x !== q.id; });
      st.recentQ.push(q.id);
      while (st.recentQ.length > 10) st.recentQ.shift();
      var res = correct ? (sess.hintsUsed ? 'neutral' : 'correct') : 'wrong';
      adaptiveChange = J.Adaptive.recordResult(st.adaptive, q, res).change;
      if (sess.curr) J.Curriculum.recordAnswered(st, q);   // C2 引入期：這個節點答了幾題
    }
    if (!correct) {
      sess.wrongCount += 1;
      sess.shownAt = now;
      return { status: 'wrong', locked: g.locked, lockMs: g.lockMs, adaptiveChange: adaptiveChange };
    }
    sess.solved = true;

    var scaled = sess.expMult === 1 ? q : Object.assign({}, q, { exp: Math.round((q.exp || 0) * sess.expMult) });
    var reward = J.Rewards.computeReward({
      question: scaled, wrongCount: sess.wrongCount, hintsUsed: sess.hintsUsed,
      alreadyCorrect: !!st.answered[q.id], pendingVariant: sess.isVariant ? st.pendingVariant : null
    });
    if (sess.isVariant) st.pendingVariant = null;
    if (reward.needVariant) st.pendingVariant = J.Rewards.makePending(q, reward.variantBonus);
    var levels = 0;
    if (sess.deferExp) {
      // v0.9.3 戰鬥：答對不給經驗值和金幣（獎勵只來自打倒怪物，見 Battle.victoryReward；數值依 37 號設計重訂）。
      // 只記下「本來會拿到多少」給測試看，不會加到主角身上
      sess.forgoneExp += reward.exp;
      sess.forgoneCoins += reward.coins;
    } else {
      levels = J.Exp.addExp(st.player, reward.exp);
      st.player.coins += reward.coins;
    }
    st.answered[q.id] = true;
    J.Report.recordDone(st, q, reward.firstTry);

    var dailyDone = [];
    dailyDone = dailyDone.concat(J.Daily.record(st.daily, 'correct'));
    dailyDone = dailyDone.concat(J.Daily.record(st.daily, 'subject', q.subject));
    if (reward.firstTry) dailyDone = dailyDone.concat(J.Daily.record(st.daily, 'firsttry'));
    var quest = { questDone: false, lampLit: false, allLit: false };
    if (sess.mode === 'quest') {
      quest = J.Quest.recordCorrect(st);
      if (quest.questDone) { dailyDone = dailyDone.concat(J.Daily.record(st.daily, 'quest')); sess.finished = true; }
    }
    // 每日小任務的金幣：戰鬥中也等戰鬥結束才給（任務已經記成完成，所以逃跑、累倒時一樣會給，見 settleBattle）
    // 記在存檔 player.pendingDaily（和完成狀態一起存），戰鬥中關掉分頁時，下次讀檔一樣拿得到
    dailyDone.forEach(function (t) { if (sess.deferExp) st.player.pendingDaily = (Number(st.player.pendingDaily) || 0) + t.reward; else st.player.coins += t.reward; });

    return {
      status: 'correct', reward: reward, levelsGained: levels, dailyDone: dailyDone, quest: quest,
      adaptiveChange: adaptiveChange, needVariant: reward.needVariant, explanation: q.explanation || ''
    };
  }

  /**
   * 打開下一層提示。method 只在第 3、4 層需要：'card' | 'coins'
   * 回傳 {ok, step, text} 或 {ok:false, reason}
   */
  function openHint(sess, method) {
    var step = J.Hints.nextStep(sess.hintsOpened);
    if (!step) return { ok: false, reason: 'no-more' };
    if (step.paid) {
      var paid = J.Hints.pay(sess.state, method || 'card');
      if (!paid.ok) return { ok: false, reason: paid.reason, step: step };
    }
    sess.hintsOpened += 1;
    sess.hintsUsed = true;
    return { ok: true, step: step, text: J.Hints.stepText(sess.q, step) };
  }

  /** 刪去卡 */
  function useEraser(sess) {
    var st = sess.state;
    if (!sess.q || sess.q.type !== 'choice') return { ok: false, reason: 'type' };
    if ((st.inventory.eraser || 0) < 1) return { ok: false, reason: 'no-card' };
    var idx = J.Hints.pickEraseOption(sess.q, sess.erased, sess.rng);
    if (idx < 0) return { ok: false, reason: 'no-more' };
    st.inventory.eraser -= 1;
    if (st.startItems && (st.startItems['eraser'] || 0) > (st.inventory['eraser'] || 0)) { if (st.inventory['eraser'] > 0) st.startItems['eraser'] = st.inventory['eraser']; else delete st.startItems['eraser']; }   // v0.9.2 先用掉一開始給的
    sess.erased.push(idx);
    sess.hintsUsed = true;
    return { ok: true, index: idx };
  }

  /** 舊介面（v0.7～v0.9.2）：只結算存檔裡留下的 player.pendingExp／pendingDaily；戰鬥結束請用 settleBattle */
  function settleExp(sess) {
    if (!sess) return 0;
    return settlePlayerExp(sess.state);
  }

  /**
   * v0.9.3 戰鬥結束（打倒、逃跑、累倒都一樣）：答對不給經驗值和金幣；
   * 只把這場完成的每日小任務金幣（player.pendingDaily）給出去（任務已經記成完成，不然就白做了），以及舊存檔留下的 player.pendingExp。
   * 回傳 { daily（給了多少金幣）, levels }（只會給一次：給完歸零）
   */
  function settleBattle(sess) {
    if (!sess) return { daily: 0, levels: 0 };
    var p = sess.state.player, daily = Number(p.pendingDaily) || 0;
    var levels = settlePlayerExp(sess.state);
    return { daily: daily, levels: levels };
  }

  /**
   * 存檔裡還沒結算的：戰鬥經驗值（player.pendingExp，v0.7～v0.9.2 的舊存檔）加到主角身上、
   * 戰鬥中完成的每日小任務金幣（player.pendingDaily，v0.9.3）加到金幣，然後歸零。回傳升了幾級。讀檔時也會呼叫
   */
  function settlePlayerExp(state) {
    var p = state && state.player;
    if (!p) return 0;
    var exp = Number(p.pendingExp) || 0, daily = Number(p.pendingDaily) || 0;
    p.pendingExp = 0; p.pendingDaily = 0;
    if (daily > 0) p.coins += daily;
    return exp > 0 ? J.Exp.addExp(p, exp) : 0;
  }

  var Session = { settleExp: settleExp, settleBattle: settleBattle, settlePlayerExp: settlePlayerExp, create: create, next: next, markShown: markShown, abandon: abandon, submit: submit, openHint: openHint, openCompanionHint: openCompanionHint, useEraser: useEraser, candidates: candidates };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.Session = Session; }
  if (typeof module !== 'undefined') module.exports = Session;
})();
