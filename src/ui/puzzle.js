/*
 * BQ2 v0.6 前端B：機關與偵探畫面（DOM）
 * - codeDoor：密碼門數字盤（每位 ＋／－ 按鈕 ≥64px；鍵盤：數字鍵直接填、←→ 換位、↑↓ 加減、Enter 確定、Esc 離開）。無限次、不計時
 * - notebook：偵探筆記（取代任務列表；誰說了什麼、預告卡全文、進行中委託的目標）；可重看
 * - jokes：冷笑話卡冊
 * 機關圖目前是程式畫的佔位（CSS 方塊＋字）；美術圖鍵名見「前端B_變更說明.md」的美術清單。
 */
(function () {
  'use strict';
  var J = window.JQ;
  function h() { return J.UI.h.apply(null, arguments); }
  function closeBtn(fn) { return h('button.close.ghost', { onclick: fn, 'aria-label': '關閉' }, ['✕ 關閉']); }

  /** 密碼門：回傳 Promise<'ok'｜null>；tryFn(digits陣列) → true／false（false 時播「門沒有動」，可以再試） */
  function codeDoor(opts) {
    var n = opts.digits || 3, labels = opts.labels || [], vals = [], cells = [], cur = 0, handle;
    for (var i = 0; i < n; i++) vals.push(Number((opts.initial || [])[i]) || 0);   // 整合2：播完輸錯對話重開時保留剛才轉到的數字
    var msg = h('p.pz-msg', { role: 'status', 'aria-live': 'polite', text: opts.prompt || '轉動數字盤，按「確定」試試看。' });
    function paint() { cells.forEach(function (c, i) { c.num.textContent = String(vals[i]); c.box.classList.toggle('cur', i === cur); }); }
    function step(i, d) { vals[i] = J.Puzzle.dialStep(vals[i], d); cur = i; paint(); J.Audio.play('select'); }
    var row = h('div.pz-dials');
    for (var k = 0; k < n; k++) (function (i) {
      var num = h('div.pz-num', { text: '0', 'aria-label': (labels[i] || ('第 ' + (i + 1) + ' 位')) });
      var box = h('div.pz-dial', {}, [
        h('div.pz-label', { text: labels[i] || '' }),
        h('button.pz-btn', { onclick: function () { step(i, 1); }, 'aria-label': (labels[i] || '') + '加一' }, ['＋']),
        num,
        h('button.pz-btn', { onclick: function () { step(i, -1); }, 'aria-label': (labels[i] || '') + '減一' }, ['－'])
      ]);
      cells.push({ box: box, num: num });
      row.appendChild(box);
    })(k);
    return new Promise(function (resolve) {
      var done = false;
      function finish(v) { if (done) return; done = true; document.removeEventListener('keydown', onKey, true); handle.close(); resolve(v); }
      function submit() {
        var ok = opts.tryFn(vals.slice());
        if (ok) { finish('ok'); return; }
        if (opts.closeOnWrong) { opts.lastVals = vals.slice(); J.Audio.play('wrong'); finish('wrong'); return; }   // 整合2：關掉數字盤，由呼叫端播資料裡的輸錯對話
        msg.textContent = opts.wrongText || '門沒有動。';
        panel.classList.remove('pz-shake'); void panel.offsetWidth; panel.classList.add('pz-shake');
        J.Audio.play('wrong');
      }
      function onKey(e) {
        if (done) return;
        if (/^[0-9]$/.test(e.key)) { vals[cur] = Number(e.key); cur = Math.min(n - 1, cur + 1); paint(); e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'ArrowLeft') { cur = Math.max(0, cur - 1); paint(); e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'ArrowRight') { cur = Math.min(n - 1, cur + 1); paint(); e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'ArrowUp') { step(cur, 1); e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'ArrowDown') { step(cur, -1); e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'Enter') { submit(); e.preventDefault(); e.stopPropagation(); }
      }
      var panel = h('div.win.panel.pz-panel', {}, [closeBtn(function () { finish(null); }),
        h('h2', { text: '🔒 ' + (opts.title || '密碼門') }), row, msg,
        h('div.pz-actions', {}, [h('button.primary.pz-ok', { onclick: submit }, ['確定']), h('button.ghost', { onclick: function () { finish(null); } }, ['先離開'])])]);
      handle = J.UI.open(panel, { label: opts.title || '密碼門', onClose: function () { if (!done) { done = true; document.removeEventListener('keydown', onKey, true); resolve(null); } } });
      document.addEventListener('keydown', onKey, true);
      paint();
    });
  }

  /** 偵探筆記 */
  function notebook(G) {
    var st = G.state, D = G.data, handle;
    var pages = J.Puzzle.notebookPages(st, D.quests, window.NOTEBOOK_PAGES || []);
    var goals = J.Puzzle.activeGoals(st, D.quests);
    var gl = h('ul.list.nb-goals', { 'aria-label': '現在要做的事' });
    if (!goals.length) gl.appendChild(h('li', { text: '現在沒有進行中的委託。到處找人說說話吧！' }));
    goals.forEach(function (g) { gl.appendChild(h('li', {}, [h('b', { text: (g.side ? '【支線】' : '【主線】') + g.title }), h('div', { text: '🎯 ' + g.goal })])); });
    var pl = h('ul.list.nb-pages', { 'aria-label': '筆記內容' });
    if (!pages.length) pl.appendChild(h('li', { text: '筆記還是空的。聽到線索，阿哲會幫忙記下來。' }));
    pages.slice().reverse().forEach(function (p) {
      var nt = J.Puzzle.notebookText(p);   // 整合4 D-10：沒有 who 就不顯示「說的人：」，內文只一份
      pl.appendChild(h('li' + (p.kind === 'card' ? '.nb-card' : ''), {}, [h('b', { text: nt.title }),
        nt.speaker ? h('div.small', { text: nt.speaker }) : null, h('div', { text: nt.text })]));
    });
    var jk = J.Puzzle.jokeList(st, window.JOKE_CARDS || {});
    var panel = h('div.win.panel.nb-panel', {}, [closeBtn(function () { handle.close(); }),
      h('h2', { text: '📒 偵探筆記' }), h('h3', { text: '現在要做的事' }), gl, h('h3', { text: '誰說了什麼' }), pl,
      h('div.nb-actions', {}, [h('button.ghost', { onclick: function () { handle.close(); jokes(G); } }, ['🃏 冷笑話卡冊（' + jk.length + '）'])])]);
    handle = J.UI.open(panel, { label: '偵探筆記' });
    G.notebookShown = (G.notebookShown || 0) + 1;   // 測試用
    return handle;
  }

  /** 冷笑話卡冊（可重看） */
  function jokes(G, focusId) {
    var list = J.Puzzle.jokeList(G.state, window.JOKE_CARDS || {}), handle;
    var ul = h('ul.list.joke-list', { 'aria-label': '冷笑話卡' });
    if (!list.length) ul.appendChild(h('li', { text: '還沒有冷笑話卡。有些寶箱裡面藏著怪盜的冷笑話喔！' }));
    list.forEach(function (c) {
      ul.appendChild(h('li.joke-card' + (c.id === focusId ? '.new' : ''), {}, [h('b', { text: '❓ ' + (c.q || '') }), h('div', { text: '💡 ' + (c.a || '') }), c.note ? h('div.small', { text: '怪盜附註：' + c.note }) : null]));
    });
    var panel = h('div.win.panel.joke-panel', {}, [closeBtn(function () { handle.close(); }), h('h2', { text: '🃏 冷笑話卡冊' }), ul]);
    handle = J.UI.open(panel, { label: '冷笑話卡冊' });
    return handle;
  }

  window.JQ.PuzzleUI = { codeDoor: codeDoor, notebook: notebook, jokes: jokes };
})();
