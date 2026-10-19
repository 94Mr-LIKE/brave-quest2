/*
 * 勇者大冒險II — 課程系統 Curriculum（GDD 3.2–3.4、7.3 C1–C5、C13；老闆裁示第 10 條）
 * 與畫面無關，可在 node 底下測試。資料：data/curriculum.js（window.CURRICULUM）、data/teachcards.js（TEACH_CARDS、SAGE_LESSONS）。
 *
 * 硬規則（永遠不放寬，GDD 3.3）：
 *   戰鬥、委託、寶箱、頭目、立志小考都只能經過 Curriculum 拿題：eligible(q, state, mapId) 為 true 的題目才會出。
 *   - 題目的節點（subject＋node）要在 poolFor(mapId) 裡（地圖累加；不在路線、也沒有 inherit 的地圖＝一題都不出）
 *   - curriculum:false（知識卡）不出；explain_status:"pending"（概念還沒查證）不出算分題
 *   - uses／uses_math（跨科先後）用到的節點，也要在這張地圖已開放
 *   - beyond_curriculum:true（超綱）只有玩家看完賢者的那一課（state.sage.learned[beyond_topic]）之後才出
 * 配比（C2）：當前／近期／更早三池，以這一科最近 20 題（state.recentNodes）滾動計算；新節點引入期 80／20；空池的名額依序讓給 近期→當前→更早。
 * 存檔：state.progress.maxRoute（走到路線第幾張）、state.nodeIntro[node] = { battles, answered, companionDone }、
 *       state.recentNodes[科目] = 最近 20 題的節點、state.sage.learned[課程id] = 學完的時間。
 */
(function () {
  'use strict';
  var SUBJ_CODE = { MA: '數學', SO: '社會', SC: '自然', CH: '國語', EN: '英語' };
  var SUBJECTS = ['國語', '英語', '數學', '自然', '社會'];
  var TIERS = ['cur', 'recent', 'early'];
  var DEFAULT_MIX = { intro: { cur: 0.8, recent: 0.2, early: 0, battles: 2, questions: 8 }, normal: { cur: 0.6, recent: 0.2, early: 0.2 }, window: 20, yield_order: ['recent', 'cur', 'early'] };
  var DEFAULT_TEACH = { companion_first_q: true, companion_line: '這是新的謎題，我陪你看第一題！', card_pauses_timer: true };

  var D = null;          // 正規化後的課程表
  var cards = null, lessons = null;
  var poolCache = {};

  function normalize(raw) {
    raw = raw || {};
    var route = Array.isArray(raw.route) ? raw.route.slice() : [];
    var maps = raw.maps || {};
    var routeIndex = {}, addedAt = {}, order = [];
    route.forEach(function (m, i) {
      routeIndex[m] = i;
      ((maps[m] && maps[m].add) || []).forEach(function (n) { if (!(n in addedAt)) { addedAt[n] = i; order.push(n); } });
    });
    var mix = raw.mix || {};
    return {
      grade: raw.grade || 4, nodes: raw.nodes || {}, route: route, maps: maps, inherit: raw.inherit || {}, publishers: raw.publishers || {},
      routeIndex: routeIndex, addedAt: addedAt, order: order,
      mix: {
        intro: Object.assign({}, DEFAULT_MIX.intro, mix.intro || {}), normal: Object.assign({}, DEFAULT_MIX.normal, mix.normal || {}),
        window: Number(mix.window) || DEFAULT_MIX.window, yield_order: Array.isArray(mix.yield_order) ? mix.yield_order : DEFAULT_MIX.yield_order
      },
      teach: Object.assign({}, DEFAULT_TEACH, raw.teach || {})
    };
  }

  /** 換一份課程表（測試、或資料檔晚載入時）；cardsData＝{TEACH_CARDS, SAGE_LESSONS}（選填） */
  function use(raw, cardsData) {
    D = normalize(raw);
    poolCache = {};
    if (cardsData) { cards = cardsData.TEACH_CARDS || {}; lessons = cardsData.SAGE_LESSONS || {}; }
    return D;
  }
  function data() {
    if (!D) use(typeof window !== 'undefined' ? window.CURRICULUM : null);
    return D;
  }
  function teachCards() { if (!cards) cards = (typeof window !== 'undefined' && window.TEACH_CARDS) || {}; return cards; }
  function sageLessons() { if (!lessons) lessons = (typeof window !== 'undefined' && window.SAGE_LESSONS) || {}; return lessons; }

  // ---------------------------------------------------------------- 節點
  /** 題目的節點 id（「科目-序號」）；node 已經是 "數學-1012" 這種字串時直接用 */
  function nodeOf(q) {
    if (!q || q.node === undefined || q.node === null || q.node === '') return null;
    if (typeof q.node === 'string' && q.node.indexOf('-') > 0) return q.node;
    return q.subject + '-' + q.node;
  }
  /** uses 的寫法「SO:1011」（或直接寫節點 id）→ 節點 id；格式不對回傳 null */
  function usesNode(u) {
    if (typeof u === 'number') return null;
    var s = String(u || '');
    var m = /^([A-Z]{2}):(\d{4})$/.exec(s);
    if (m) return SUBJ_CODE[m[1]] ? SUBJ_CODE[m[1]] + '-' + m[2] : null;
    return /^.+-\d{4}$/.test(s) ? s : null;
  }
  function nodeInfo(id) { return data().nodes[id] || null; }
  function label(id) { var n = nodeInfo(id); return n ? n.subject + ' ' + n.label : id; }
  function subjectOfNode(id) { var n = nodeInfo(id); return n ? n.subject : String(id).split('-')[0]; }

  /** 照哪一張「路線上的地圖」出題（inherit 最多追 5 層）；不在路線上也沒有 inherit → null */
  function routeMapFor(mapId) {
    var d = data(), m = mapId;
    for (var i = 0; i < 6 && m !== undefined && m !== null; i++) {
      if (m in d.routeIndex) return m;
      m = d.inherit[m];
    }
    return null;
  }
  function routeIndexOf(mapId) { var m = routeMapFor(mapId); return m === null ? -1 : data().routeIndex[m]; }

  /** 這張地圖可出的全部節點（路線上到這張為止的聯集，照開放順序）；未知地圖回傳 [] */
  function poolList(mapId) {
    var k = String(mapId);
    if (poolCache[k]) return poolCache[k];
    var d = data(), idx = routeIndexOf(mapId), out = [];
    if (idx >= 0) d.order.forEach(function (n) { if (d.addedAt[n] <= idx) out.push(n); });
    poolCache[k] = out;
    return out;
  }
  function poolFor(mapId) { return poolList(mapId).slice(); }
  function inPool(mapId, nodeId) { return poolList(mapId).indexOf(nodeId) >= 0; }

  /** 節點在這張地圖是哪一池：'cur'（這張圖新開放）、'recent'（前一張）、'early'（更早）；不在範圍內 → null */
  function tierOf(mapId, nodeId) {
    var d = data(), idx = routeIndexOf(mapId);
    if (idx < 0 || !(nodeId in d.addedAt) || d.addedAt[nodeId] > idx) return null;
    var gap = idx - d.addedAt[nodeId];
    return gap === 0 ? 'cur' : gap === 1 ? 'recent' : 'early';
  }
  function tiersFor(mapId) {
    var out = { cur: [], recent: [], early: [] };
    poolList(mapId).forEach(function (n) { out[tierOf(mapId, n)].push(n); });
    return out;
  }

  // ---------------------------------------------------------------- 能不能出
  function sageTopic(q) { return q && q.beyond_curriculum ? (q.beyond_topic || null) : null; }
  function sageLearned(state, topic) { return !!(topic && state && state.sage && state.sage.learned && state.sage.learned[topic]); }

  /**
   * 這一題現在能不能出（硬規則）。mapId 不給時用存檔位置的地圖。
   * 不在範圍內、知識卡、pending、跨科節點還沒開、超綱還沒學 → false
   */
  function eligible(q, state, mapId, opts) {
    if (!q) return false;
    // 第三批：英語只出預設版本（翰林）；alt_publisher 的題目（何嘉仁）要等 curriculum.js 的 alt_enabled 打開
    if (q.alt_publisher === true && !altEnabled(q.subject)) return false;
    if (mapId === undefined) mapId = state && state.location ? state.location.map : null;
    var node = nodeOf(q);
    if (!node || !inPool(mapId, node)) return false;
    if (q.curriculum === false) return false;
    if (q.explain_status === 'pending') return false;
    var uses = [].concat(Array.isArray(q.uses) ? q.uses : [], Array.isArray(q.uses_math) ? q.uses_math : []);
    for (var i = 0; i < uses.length; i++) { var u = usesNode(uses[i]); if (!u || !inPool(mapId, u)) return false; }
    // 賢者的小測驗（opts.sageTopic）：正在學的這一課的超綱題可以出（其他超綱題照樣要先學過）
    if (q.beyond_curriculum === true && !sageLearned(state, sageTopic(q)) && !(opts && opts.sageTopic && sageTopic(q) === opts.sageTopic)) return false;
    return true;
  }
  /** 這一科的「其他版本」題目（alt_publisher）有沒有打開（curriculum.js publishers.科目.alt_enabled） */
  function altEnabled(subject) { var p = data().publishers[subject]; return !!(p && p.alt_enabled); }
  /** 題庫裡這張地圖現在能出的題目 */
  function questionsFor(questions, state, mapId) { return (questions || []).filter(function (q) { return eligible(q, state, mapId); }); }
  /** 這張地圖現在有題目可出的科目（照 SUBJECTS 順序） */
  function subjectsFor(questions, state, mapId) {
    var have = {};
    questionsFor(questions, state, mapId).forEach(function (q) { have[q.subject] = 1; });
    return SUBJECTS.filter(function (s) { return have[s]; });
  }

  // ---------------------------------------------------------------- 進度（存檔）
  function ensureState(state) {
    if (!state.progress || typeof state.progress !== 'object') state.progress = { maxRoute: 0 };
    if (!state.nodeIntro || typeof state.nodeIntro !== 'object') state.nodeIntro = {};
    if (!state.sage || typeof state.sage !== 'object') state.sage = { learned: {} };
    if (!state.sage.learned || typeof state.sage.learned !== 'object') state.sage.learned = {};
    return state;
  }
  function introOf(state, nodeId) {
    ensureState(state);
    var e = state.nodeIntro[nodeId];
    if (!e || typeof e !== 'object') e = state.nodeIntro[nodeId] = { battles: 0, answered: 0, companionDone: false };
    return e;
  }
  /** 進入地圖：記下走到路線第幾張（立志小考、之後的集章冊用） */
  function visit(state, mapId) {
    ensureState(state);
    var i = routeIndexOf(mapId);
    if (i > (Number(state.progress.maxRoute) || 0)) state.progress.maxRoute = i;
    return state.progress.maxRoute;
  }
  /** 走到最遠的那張路線地圖 id */
  function furthestMap(state) { ensureState(state); var r = data().route; return r[Math.max(0, Math.min(r.length - 1, Number(state.progress.maxRoute) || 0))] || null; }

  /** 節點還在引入期嗎：還沒打滿 intro.battles 場、也還沒答滿 intro.questions 題（先到者結束） */
  function isIntro(state, nodeId) {
    var e = state && state.nodeIntro && state.nodeIntro[nodeId], I = data().mix.intro;
    if (!e) return true;
    return (Number(e.battles) || 0) < I.battles && (Number(e.answered) || 0) < I.questions;
  }
  /** 答了一題（第一次送出時呼叫一次） */
  function recordAnswered(state, q) { var n = nodeOf(q); if (!n) return; introOf(state, n).answered += 1; }
  /** 一場戰鬥結束：這場出過題的節點各 +1 場 */
  function recordBattle(state, qs) {
    var seen = {};
    (qs || []).forEach(function (q) { var n = nodeOf(q); if (n && !seen[n]) { seen[n] = 1; introOf(state, n).battles += 1; } });
    return Object.keys(seen);
  }

  // ---------------------------------------------------------------- 阿咕陪看第一題（C4）
  function companionNeeded(state, q) {
    if (!data().teach.companion_first_q) return false;
    var n = nodeOf(q);
    if (!n) return false;
    var e = state && state.nodeIntro && state.nodeIntro[n];
    return !(e && e.companionDone);
  }
  /** 標記這個節點已經陪看過（同一節點只觸發一次；存在存檔裡，讀檔後不重複） */
  function markCompanion(state, q) { var n = nodeOf(q); if (n) introOf(state, n).companionDone = true; }
  function companionLine() { return data().teach.companion_line; }
  /**
   * 第三批：阿咕陪看的台詞（劇本 D_AGU_FIRST_Q）：第 1 句 → 這一科的小提醒（D_AGU_TIP_*）→ 其餘句子。
   * dialogs＝window.DIALOGS；沒有資料時回傳 [companion_line]。回傳字串陣列（每句 ≤30 字）
   */
  function companionLines(q, dialogs) {
    var T = data().teach, D = dialogs || {}, base = D[T.companion_dialog];
    if (!Array.isArray(base) || !base.length) return [T.companion_line];
    var tip = T.companion_tips && q && D[T.companion_tips[q.subject]];
    var out = [base[0].text].concat(Array.isArray(tip) ? tip.map(function (l) { return l.text; }) : []);
    return out.concat(base.slice(1).map(function (l) { return l.text; }));
  }
  /** 陪看的那一題答完：答對／答錯各一段（D_AGU_FIRST_Q_RIGHT／_WRONG）的文字 */
  function companionAfter(correct, dialogs) {
    var T = data().teach, L = (dialogs || {})[correct ? T.companion_right : T.companion_wrong];
    return Array.isArray(L) ? L.map(function (l) { return l.text; }) : [];
  }
  /** 教學卡引導台詞（kind：'button' 第一次看到按鈕、'open' 打開卡片、'done' 看完）的文字陣列 */
  function cardLines(kind, dialogs) {
    var T = data().teach, key = { button: T.card_button_dialog, open: T.card_open_dialog, done: T.card_done_dialog }[kind];
    var L = (dialogs || {})[key];
    return Array.isArray(L) ? L.map(function (l) { return l.text; }) : [];
  }

  // ---------------------------------------------------------------- 配比（C2）
  /**
   * 目標比例：{cur, recent, early}，空池的名額依 yield_order 讓出。
   * avail＝{cur:bool, recent:bool, early:bool}（這一池這一科有沒有能出的題）；intro＝這一科有當前節點在引入期
   */
  function targetShares(avail, intro) {
    var M = data().mix, base = intro ? M.intro : M.normal, out = { cur: 0, recent: 0, early: 0 };
    TIERS.forEach(function (t) { out[t] = Number(base[t]) || 0; });
    TIERS.forEach(function (t) {
      if (avail[t] || !out[t]) return;
      var to = null;
      for (var i = 0; i < M.yield_order.length; i++) { var c = M.yield_order[i]; if (c !== t && avail[c]) { to = c; break; } }
      if (to) out[to] += out[t];
      out[t] = 0;
    });
    return out;
  }
  /**
   * 出了一題：記下節點（state.recentNodes[科目]，最多 window 筆，重複的照樣記）。
   * 不用 qhist（qhist 同一題只留最後一次，題目開始重複後就不會再變，配比會卡住）
   */
  function logAsked(state, q) {
    var n = nodeOf(q);
    if (!n) return;
    if (!state.recentNodes || typeof state.recentNodes !== 'object') state.recentNodes = {};
    var a = Array.isArray(state.recentNodes[q.subject]) ? state.recentNodes[q.subject] : (state.recentNodes[q.subject] = []);
    a.push(n);
    while (a.length > data().mix.window) a.shift();
  }
  /** 這一科最近 window 題裡，各池出了幾題（以現在這張地圖的分池算；不在範圍內的節點不算） */
  function windowCounts(state, subject, mapId) {
    var log = (state.recentNodes && Array.isArray(state.recentNodes[subject]) && state.recentNodes[subject]) || [], W = data().mix.window;
    var out = { cur: 0, recent: 0, early: 0, n: 0 };
    log.slice(-W).forEach(function (n) {
      var t = tierOf(mapId, n);
      if (t) { out[t]++; out.n++; }
    });
    return out;
  }
  /**
   * 下一題要從哪一池出：回傳池的順序（第一個＝配比最缺的那池；其餘照 當前→近期→更早 當作放寬順序）。
   * cands＝這一科能出的題目
   */
  function tierOrder(state, subject, mapId, cands, rng) {
    rng = rng || Math.random;
    var avail = { cur: false, recent: false, early: false }, intro = false;
    cands.forEach(function (q) {
      var n = nodeOf(q), t = tierOf(mapId, n);
      if (!t) return;
      avail[t] = true;
      if (t === 'cur' && isIntro(state, n)) intro = true;
    });
    var share = targetShares(avail, intro), cnt = windowCounts(state, subject, mapId);
    var best = null, bestD = -Infinity;
    TIERS.forEach(function (t) {
      if (!avail[t] || share[t] <= 0) return;
      var d = share[t] * (cnt.n + 1) - cnt[t] + rng() * 1e-6;
      if (d > bestD) { bestD = d; best = t; }
    });
    var order = best ? [best] : [];
    TIERS.forEach(function (t) { if (order.indexOf(t) < 0) order.push(t); });
    return { order: order, share: share, intro: intro, counts: cnt };
  }

  // ---------------------------------------------------------------- 頭目戰前的會考清單（C13）
  /** 依科目分組：[{subject, nodes:[id], labels:[label]}]（科目照 SUBJECTS 順序） */
  function examList(mapId) {
    var by = {};
    poolFor(mapId).forEach(function (n) { var s = subjectOfNode(n); (by[s] = by[s] || []).push(n); });
    return SUBJECTS.filter(function (s) { return by[s]; }).map(function (s) {
      return { subject: s, nodes: by[s], labels: by[s].map(function (n) { var x = nodeInfo(n); return x ? x.label : n; }) };
    });
  }
  /** 「嘟嘟號會考：國語 第 1 課〈美麗島〉、…；數學 1-1 …」 */
  function examText(mapId, who) {
    var parts = examList(mapId).map(function (g) { return g.subject + ' ' + g.labels.join('、'); });
    return (who || '頭目') + '會考：' + (parts.length ? parts.join('；') : '（這裡沒有開放的單元）');
  }

  // ---------------------------------------------------------------- 教學卡（C5）
  /** 節點的教學卡：{id, node, title, example, point, school_note, status} 或 null */
  function cardFor(nodeId) {
    var n = nodeInfo(nodeId), C = teachCards();
    var id = n && n.teach_card;
    var c = id && C[id];
    if (!c) {   // 沒寫 teach_card 時，找 node 相同的卡
      Object.keys(C).some(function (k) { if (C[k] && C[k].node === nodeId) { id = k; c = C[k]; return true; } return false; });
    }
    return c ? Object.assign({ id: id }, c) : null;
  }
  /** 看教學卡的時候計時要不要停（和朗讀、冷卻鎖同一個機制，見 ui/quiz.js） */
  function timerPaused(flags) {
    flags = flags || {};
    return !!(flags.speaking || flags.locked || flags.limit || (flags.card && data().teach.card_pauses_timer !== false));
  }

  // ---------------------------------------------------------------- 賢者教學（老闆裁示第 10 條）
  function lesson(id) { var L = sageLessons(); return L[id] ? Object.assign({ id: id }, L[id]) : null; }
  /** 這位 NPC 教的課（maps.js 的 npcs[].sage＝課程 id 陣列；沒寫時找 SAGE_LESSONS 裡 sage＝這個 NPC 的課） */
  function lessonsFor(npc) {
    var L = sageLessons(), ids = npc && Array.isArray(npc.sage) ? npc.sage : Object.keys(L).filter(function (k) { return L[k].sage === (npc && npc.id); });
    return ids.map(lesson).filter(Boolean);
  }
  /**
   * 第三批：這位賢者現在能教的課——課程的 node 在「走到最遠的那張地圖」已開放（progress.maxRoute）。
   * 方爺爺在 T02：走到 T03 以後回來，就能學 T03 才開放的「取概數」（數學 1-3）。照 order 排序
   */
  function lessonsOpen(npc, state) {
    var far = furthestMap(state);
    return lessonsFor(npc).filter(function (l) { return !l.node || inPool(far, l.node); })
      .sort(function (a, b) { return (Number(a.order) || 99) - (Number(b.order) || 99); });
  }
  /** 這一課的小測驗題目（題庫裡 beyond_topic＝這一課、而且在 mapId 範圍內能出的；學過之前也能出） */
  function lessonQuestions(questions, state, lessonId, mapId) {
    return (questions || []).filter(function (q) { return q && q.beyond_topic === lessonId && eligible(q, state, mapId, { sageTopic: lessonId }); });
  }
  /** 看完教學卡＋示範題：記成學過（之後這個主題的超綱題才會出） */
  function learnSage(state, id, now) {
    ensureState(state);
    if (!lesson(id)) return false;
    if (!state.sage.learned[id]) state.sage.learned[id] = now || 1;
    return true;
  }

  var Curriculum = {
    SUBJECTS: SUBJECTS, SUBJ_CODE: SUBJ_CODE, TIERS: TIERS,
    use: use, data: data, nodeOf: nodeOf, usesNode: usesNode, nodeInfo: nodeInfo, label: label, subjectOfNode: subjectOfNode,
    routeMapFor: routeMapFor, routeIndexOf: routeIndexOf, poolFor: poolFor, inPool: inPool, tierOf: tierOf, tiersFor: tiersFor,
    eligible: eligible, altEnabled: altEnabled, questionsFor: questionsFor, subjectsFor: subjectsFor, sageTopic: sageTopic, sageLearned: sageLearned,
    ensureState: ensureState, introOf: introOf, visit: visit, furthestMap: furthestMap, isIntro: isIntro, recordAnswered: recordAnswered, recordBattle: recordBattle,
    companionNeeded: companionNeeded, markCompanion: markCompanion, companionLine: companionLine, companionLines: companionLines, companionAfter: companionAfter, cardLines: cardLines,
    targetShares: targetShares, windowCounts: windowCounts, tierOrder: tierOrder, logAsked: logAsked,
    examList: examList, examText: examText, cardFor: cardFor, timerPaused: timerPaused,
    lesson: lesson, lessonsFor: lessonsFor, lessonsOpen: lessonsOpen, lessonQuestions: lessonQuestions, learnSage: learnSage
  };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.Curriculum = Curriculum; }
  if (typeof module !== 'undefined') module.exports = Curriculum;
})();
