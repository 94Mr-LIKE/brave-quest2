/*
 * 勇者大冒險II — 教學卡視窗與賢者教學（GDD 3.3、7.3 C5；老闆裁示第 10 條）
 *  - showCard(card)：一張教學卡（一個例子＋一句重點）；題目畫面的「看教學卡」與賢者教學共用。回傳 Promise（關掉時 resolve）。
 *    看卡時題目的時間條暫停（ui/quiz.js 把「卡片開著」放進暫停條件，Curriculum.timerPaused），不算答錯、不扣錢。
 *  - sageLesson(lesson)：賢者教學——先看教學卡，再看 1 題示範（答案與想法由賢者說明，不算分）。
 *    兩步都看完 resolve(true)；中途離開 resolve(false)（不記成學過，超綱題不會出）。
 */
(function () {
  'use strict';
  var J = window.JQ;

  function showCard(card, opts) {
    opts = opts || {};
    var h = J.UI.h;
    return new Promise(function (resolve) {
      var handle;
      var done = function () { if (handle) handle.close(true); resolve(true); };
      var c = card || { title: '教學卡', example: '這張教學卡還在準備中。', point: '' };
      var body = [
        h('div.teach-head', {}, [h('span.chip', { text: opts.chip || '📖 教學卡' }), h('strong', { text: c.title || '' })]),
        h('div.teach-example', {}, [h('b', { text: '例子：' }), h('span', { text: c.example || '' })]),
        c.point ? h('div.teach-point', {}, [h('b', { text: '重點：' }), h('span', { text: c.point })]) : null,
        c.school_note ? h('p.small', { text: c.school_note }) : null,
        opts.note ? h('p.small', { text: opts.note }) : null,
        h('div.row.end', {}, [h('button.primary.teach-close', { onclick: done }, [opts.button || '看完了，回到題目'])])
      ];
      handle = J.UI.open(h('div.win.panel.narrow.teach-card', {}, body), { label: '教學卡：' + (c.title || ''), onClose: function () { resolve(true); } });
    });
  }

  /** 示範題：題目＋選項；按「看老館長怎麼想」才顯示答案和說明；回傳 Promise<boolean>（看完＝true） */
  function showDemo(demo, sageName) {
    var h = J.UI.h;
    return new Promise(function (resolve) {
      var handle, finished = false;
      var opts = h('div.options', { role: 'group', 'aria-label': '示範題的選項' }, (demo.options || []).map(function (op, i) {
        return h('button', { disabled: true, 'data-i': String(i) }, [(i + 1) + '. ' + op]);
      }));
      var why = h('div.feedback', { role: 'status', 'aria-live': 'polite' });
      var ok = h('button.primary.demo-done', { hidden: true, onclick: function () { finished = true; handle.close(true); resolve(true); } }, ['我學會了！']);
      var show = h('button.demo-show', { onclick: function () {
        Array.prototype.forEach.call(opts.querySelectorAll('button'), function (b, i) { if (i === demo.answer) b.setAttribute('aria-pressed', 'true'); });
        why.textContent = (sageName || '賢者') + '：' + (demo.options ? '答案是「' + demo.options[demo.answer] + '」。' : '') + (demo.explanation || '');
        show.hidden = true; ok.hidden = false; ok.focus();
      } }, ['看' + (sageName || '賢者') + '怎麼想']);
      var leave = h('button.ghost', { onclick: function () { handle.close(true); resolve(false); } }, ['先離開']);
      var box = h('div.win.panel.narrow.sage-demo', {}, [
        h('div.teach-head', {}, [h('span.chip', { text: '👴 示範題' }), h('strong', { text: '一起看一題' })]),
        h('div.stem', { text: demo.stem || '' }), opts, why,
        h('div.row', {}, [leave, h('span.grow'), show, ok])
      ]);
      handle = J.UI.open(box, { label: '示範題', onClose: function () { if (!finished) resolve(false); } });
    });
  }

  /** 賢者的一課：教學卡 → 示範題；兩步都看完回傳 true */
  function sageLesson(lesson, sageName) {
    if (!lesson) return Promise.resolve(false);
    return showCard(lesson.card, { chip: '👴 ' + (sageName || '賢者') + '的小課', button: '看懂了，看示範題', note: '這是課本以外的小知識，學會之後冒險中才會出現這種題目。' })
      .then(function () { return lesson.demo ? showDemo(lesson.demo, sageName) : true; });
  }

  window.JQ = window.JQ || {};
  window.JQ.TeachUI = { showCard: showCard, showDemo: showDemo, sageLesson: sageLesson };
})();
