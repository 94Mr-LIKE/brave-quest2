/*
 * 戰鬥場景（DQ 式正面畫面）：上方戰鬥背景、敵人 1–5 隻由左到右站（BQ2 v0.6 R1）。
 * 指令、訊息、題目都是 DOM（見 game.js 的戰鬥流程），這裡只負責畫面效果、目標游標與點選。
 *
 * data＝{ foes: [{ slot, mon, label, hp, maxHp }], bg, decor（背景裝飾圖鍵名，例 npc_kaito_battle；沒有圖就不顯示） }
 * 怪物戰鬥圖：
 *   - 新格式（sprites.js 的 battle_sheet：{ file, cols 8, idle 4, attack 6–8 }）：第 1 列待機循環、第 2 列攻擊
 *   - 舊單張圖（sprites.js 只有 file）照舊；都沒有時用佔位圖
 */
(function () {
  'use strict';
  var J = window.JQ;
  var MIN_TOUCH = 72;   // 觸控目標至少 72 遊戲 px（直放畫布寬 600 縮到 390 時＝47px，畫面上 ≥44px）
  var TIER_HOLD_MS = 2400;   // 防禦結果停留時間（D-08：至少 1.2 秒）

  function sheetOf(key) { var e = (window.SPRITES || {})[key]; return e && e.battle_sheet && e.battle_sheet.file ? e.battle_sheet : null; }

  class BattleScene extends Phaser.Scene {
    constructor() { super('Battle'); }

    init(data) {
      this.data_ = data;
      // 舊呼叫（單一 mon）也能開
      if (!data.foes && data.mon) data.foes = [{ slot: 1, mon: data.mon, label: data.mon.name, hp: data.mon.hp, maxHp: data.mon.hp }];
      this.views = {};
      this.raging = false;
    }

    preload() {
      J.Assets.watch(this);
      J.Assets.queueBattleBg(this, this.data_.bg);
      var self = this, seen = {};
      this.data_.foes.forEach(function (f) { self.queueMon(f.mon, seen); });
      (this.data_.preload || []).forEach(function (m) { self.queueMon(m, seen); });
      var dk = this.data_.decor;
      if (dk && J.Assets.info(dk)) J.Assets.queue(this, dk, '');
      (this.data_.decorLater || []).forEach(function (k) { if (k !== dk && J.Assets.info(k)) J.Assets.queue(self, k, ''); });   // 整合5：換段才出現的裝飾先載入
    }

    /** 怪物的圖：舊單張＋新格式 sheet（有寫才載入；載入失敗會退回舊圖） */
    queueMon(mon, seen) {
      if (!mon || seen[mon.sprite]) return;
      seen[mon.sprite] = true;
      J.Assets.queue(this, mon.sprite, mon.name);
      var sh = sheetOf(mon.sprite), url = sh ? J.Assets.resolveUrl(sh.file) : null;
      if (url && !this.textures.exists('sheet:' + mon.sprite)) this.load.image('sheet:' + mon.sprite, url);
    }

    create() {
      J.Assets.finalize(this);
      this.fitView();
      var W = this.scale.width, H = this.scale.height;
      this.W = W; this.H = H;
      this.cameras.main.setBackgroundColor('#0b1236');
      var bgKey = 'bg:' + this.data_.bg;
      // 背景：16:9 圖鋪滿（直放畫布時等比例放大蓋滿、左右裁掉，不拉長）；沒有圖時用天空色
      if (this.textures.exists(bgKey)) {
        var bgImg = this.add.image(W / 2, 0, bgKey).setOrigin(0.5, 0);
        bgImg.setScale(Math.max(W / bgImg.width, H / bgImg.height)).setDepth(-10);
        this.bgImg = bgImg;
      } else this.bgImg = this.add.rectangle(0, 0, W, H, 0x6ab8e8).setOrigin(0, 0).setDepth(-10);
      this.bgH = H;
      if (!this.textures.exists('ui:spark')) {
        var c = document.createElement('canvas'); c.width = 4; c.height = 4;
        var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(1, 0, 2, 4); g.fillRect(0, 1, 4, 2);
        this.textures.addCanvas('ui:spark', c);
      }
      this.decorImg = null;
      this.safe = this.safeArea();
      this.buildFoes(this.data_.foes);
      this.setDecor(this.data_.decor);
      if (this.calm()) this.cameras.main.fadeIn(300, 11, 18, 54); else this.cameras.main.fadeIn(300, 255, 255, 255);
      var self0 = this;
      this.time.delayedCall(320, function () { self0.cry('appear'); });
      // 面板（狀態、訊息、指令）高度會變（訊息變長、手機直放疊成三層）：定時量一次，敵人那一排永遠在面板上方（D-04、D-07）
      this.time.addEvent({ delay: 200, loop: true, callback: function () { self0.relayout(); } });
      this.onWinResize = function () { if (self0.sys && self0.sys.isActive()) { self0.fitView(); self0.relayout(true); } };
      window.addEventListener('resize', this.onWinResize);
      this.events.once('shutdown', function () { window.removeEventListener('resize', self0.onWinResize); });
      J.Game.battleSceneReady(this);
    }

    /** 減少動態效果（S-8）：家長設定 reduceMotion 或系統 prefers-reduced-motion */
    calm() {
      var st = J.Game && J.Game.state, BF = J.BattleFlow;
      return BF.reduceMotion(st && st.settings, BF.systemReducedMotion());   // 'on'／'off'／'auto'（字串，不能直接當真假）
    }
    shake(ms, k) { if (!this.calm()) this.cameras.main.shake(ms, k); }
    /** 閃光：減少動態效果時改成很淡的色層淡入淡出（不閃白、不震動） */
    flash(ms, r, g, b) {
      if (!this.calm()) { this.cameras.main.flash(ms, r, g, b); return; }
      var veil = this.add.rectangle(0, 0, this.W, this.H, Phaser.Display.Color.GetColor(r, g, b), 1).setOrigin(0, 0).setDepth(80).setAlpha(0);
      this.tweens.add({ targets: veil, alpha: 0.15, duration: ms, yoyo: true, onComplete: function () { veil.destroy(); } });
    }

    /** 畫布大小：直放手機用直式畫布（寬 600），其他 960×540（BattleFlow.viewSize） */
    fitView() {
      var C = J.CONFIG, v = J.BattleFlow.viewSize(window.innerWidth, window.innerHeight, 0, 600, C.VIEW_W, C.VIEW_H);
      J.BattleFlow.applyView(this.scale, v, J.Game.zoomPlan ? J.Game.zoomPlan() : null, Phaser);   // D-22：縮放方式一起還原
      this.scale.refresh();
      J.BattleFlow.applyView(this.scale, v, J.Game.zoomPlan ? J.Game.zoomPlan() : null, Phaser);   // refresh 之後再對一次畫布 CSS
      this.W = this.scale.width; this.H = this.scale.height; this.bgH = this.H;
      if (this.bgImg && this.bgImg.type === 'Image') this.bgImg.setPosition(this.W / 2, 0).setScale(Math.max(this.W / this.bgImg.width, this.H / this.bgImg.height));
    }

    /**
     * 沒被面板蓋住的區域（遊戲座標）：上緣＝頭目資訊框（.battle-top）下緣，下緣＝狀態／訊息／指令框（.battle-ui）的最上緣。
     * 面板還沒出來時用預估值（電腦 160px、直放 45%）
     */
    safeArea() {
      var W = this.scale.width, H = this.scale.height, cv = this.game.canvas.getBoundingClientRect();
      var k = cv.width > 0 ? cv.width / W : 1, top = 8, bottom = H - (H > W ? H * 0.45 : 160);
      var ui = document.querySelector('.battle-ui');
      if (ui && cv.height > 0) {
        var t = Infinity;
        Array.prototype.forEach.call(ui.children, function (el) { var r = el.getBoundingClientRect(); if (r.height > 0) t = Math.min(t, r.top); });
        if (t < Infinity) bottom = (t - cv.top) / k - 6;
      }
      var bt = document.querySelector('.battle-top');
      if (bt && !bt.hidden && cv.height > 0) { var r2 = bt.getBoundingClientRect(); if (r2.height > 0) top = Math.max(top, (r2.bottom - cv.top) / k + 4); }
      bottom = Math.max(top + 120, Math.min(H - 4, bottom));
      return { top: Math.round(top), bottom: Math.round(bottom) };
    }
    relayout(force) {
      if (!this.views) return;
      var s = this.safeArea();
      if (!force && this.safe && Math.abs(s.top - this.safe.top) < 4 && Math.abs(s.bottom - this.safe.bottom) < 4) return;
      this.safe = s;
      this.placeFoes();
    }

    /** 第二段的背景裝飾（怪盜本人）：右後方、0.8 倍、不能點；沒有圖就不顯示 */
    setDecor(key) {
      if (this.decorImg) { this.decorImg.destroy(); this.decorImg = null; }
      if (!key || !J.Assets.info(key) || !this.textures.exists(J.Assets.texKey(key)) || J.Assets.isPlaceholder(this, key)) return;
      var img = this.add.image(this.W - 90, this.safe.bottom - 40, J.Assets.texKey(key)).setOrigin(0.5, 1).setDepth(-2);
      // 整合5：直放（窄畫面）時也限制在畫面寬的 45% 內，怪盜不會比第二段頭目大、也不會蓋住它
      var s = Math.min(1, Math.min((this.safe.bottom - this.safe.top) * 0.6, this.W * 0.45) / img.height) * 0.8;
      img.setScale(s).setAlpha(0.95);
      this.decorImg = img;
    }

    /** 敵人：slot 由左到右；每隻有名稱、體力條、可點的區域（≥64 遊戲 px，畫面上 ≥44px）。位置由 placeFoes 決定 */
    buildFoes(foes) {
      var self = this;
      Object.keys(this.views).forEach(function (k) { self.destroyView(self.views[k]); });
      this.views = {};
      this.foeList = foes;
      var n = foes.length;
      foes.forEach(function (f, i) {
        var mon = f.mon, v = { slot: f.slot, mon: mon, alive: f.hp > 0, idx: i };
        var shKey = 'sheet:' + mon.sprite, img, frames = null, src;
        if (self.textures.exists(shKey)) {
          src = self.textures.get(shKey).getSourceImage();
          frames = J.BattleFlow.sheetFrames(sheetOf(mon.sprite), src.width, src.height);
        }
        if (frames) {
          var tex = self.textures.get(shKey);
          if (!tex.__framed) {
            var cols = Math.round(src.width / frames.fw);
            for (var r = 0; r < 2; r++) for (var cc = 0; cc < cols; cc++) tex.add(r * cols + cc, 0, cc * frames.fw, r * frames.fh, frames.fw, frames.fh);
            tex.__framed = true;
          }
          img = self.add.sprite(0, 0, shKey, frames.idle[0]).setOrigin(0.5, 1);
          var ik = 'idle:' + mon.sprite, ak = 'atk:' + mon.sprite;
          if (!self.anims.exists(ik)) self.anims.create({ key: ik, frames: frames.idle.map(function (fr) { return { key: shKey, frame: fr }; }), frameRate: 6, repeat: -1 });
          if (frames.attack.length && !self.anims.exists(ak)) self.anims.create({ key: ak, frames: frames.attack.map(function (fr) { return { key: shKey, frame: fr }; }), frameRate: 12, repeat: 0 });
          img.play(ik);
          v.anim = { idle: ik, attack: frames.attack.length ? ak : null };
        } else {
          img = self.add.image(0, 0, J.Assets.texKey(mon.sprite)).setOrigin(0.5, 1);
        }
        v.img = img;
        v.shadow = self.add.ellipse(0, 0, 10, 12, 0x000000, 0.25).setDepth(-1);
        v.name = self.add.text(0, 0, f.label, { fontFamily: 'sans-serif', fontSize: (self.W < 700 ? (n >= 4 ? 21 : 24) : (n >= 4 ? 16 : 18)) + 'px', fontStyle: 'bold', color: '#ffffff', stroke: '#1a1430', strokeThickness: 5 }).setOrigin(0.5, 0).setDepth(30);
        v.barBg = self.add.rectangle(0, 0, 10, 8, 0x1a1430).setOrigin(0, 0).setDepth(30).setStrokeStyle(1, 0xffffff);
        v.bar = self.add.rectangle(0, 0, 10, 6, 0x7ee07a).setOrigin(0, 0).setDepth(31);
        v.hit = self.add.zone(0, 0, 64, 64).setOrigin(0.5, 1).setInteractive({ useHandCursor: true }).setDepth(35);
        v.hit.on('pointerdown', function () { if (J.Game.bselectTarget) J.Game.bselectTarget(f.slot); });
        v.hp = f.hp; v.maxHp = f.maxHp;
        self.views[f.slot] = v;
      });
      if (this.cursor) this.cursor.destroy();
      this.cursor = this.add.text(0, 0, '▼ 目標', { fontFamily: 'sans-serif', fontSize: '20px', fontStyle: 'bold', color: '#ffd34d', stroke: '#1a1430', strokeThickness: 6 }).setOrigin(0.5, 1).setDepth(40).setVisible(false);
      if (!this.calm()) this.cursorTw = this.tweens.add({ targets: this.cursor, alpha: 0.6, duration: 450, yoyo: true, repeat: -1 });
      this.placeFoes();
    }

    /** 依目前的安全區域擺位置（D-04、D-07：名字、體力條在面板上方） */
    placeFoes() {
      var self = this, list = this.foeList || [], n = list.length; if (!n) return;
      var boss = n === 1 && list[0].mon.boss, portrait = this.H > this.W;
      // 名字字級：畫面上實際字高至少 13px（橫放手機畫布縮小時字跟著放大）；放不下這一格時再縮，但不小於畫面 11px
      var cv = this.game.canvas.getBoundingClientRect(), k = cv.width > 0 ? cv.width / this.W : 1;
      var want = portrait ? (n >= 4 ? 22 : 24) : (n >= 4 ? 16 : 18);
      var fs = Math.max(want, Math.ceil(13 / k)), fsMin = Math.ceil(11 / k);
      list.forEach(function (f) { var v = self.views[f.slot]; if (v && v.name) v.name.setFontSize(fs + 'px'); });
      var v0 = this.views[list[0].slot], nameH = v0 && v0.name ? Math.ceil(v0.name.height) : 24;
      var labelH = nameH + 18;   // 名字＋體力條
      var P = J.BattleFlow.foeSlots(this.W, this.safe.top, this.safe.bottom, n, boss, labelH, 30, portrait, MIN_TOUCH, portrait ? 1.35 : 1);
      list.forEach(function (f, i) {
        var v = self.views[f.slot]; if (!v || !v.alive) return;
        var pos = P[i], x = pos.x, img = v.img, footY = pos.footY;
        v.x = x; v.footY = footY;
        var s = pos.imgH / img.height, maxW = Math.max(MIN_TOUCH, pos.w - 12);
        s = Math.min(s, maxW / img.width);
        if (v.idle) { v.idle.stop(); v.idle = null; }
        img.setScale(s).setPosition(x, v.alive ? footY : footY + 4);
        v.baseScale = s;
        v.shadow.setPosition(x, footY - 2).setSize(img.displayWidth * 0.7, 12);
        if (!v.anim && v.alive && !self.calm()) v.idle = self.tweens.add({ targets: img, y: footY - 5, duration: 650 + i * 70, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
        var f2 = fs;
        while (v.name.width > pos.w - 6 && f2 > fsMin) { f2 -= 1; v.name.setFontSize(f2 + 'px'); }
        var barW = Math.min(140, Math.max(70, pos.w - 20));
        v.name.setPosition(x, footY + 4);
        v.barBg.setPosition(x - barW / 2, footY + nameH + 6).setSize(barW, 8);
        v.bar.setPosition(x - barW / 2 + 1, footY + nameH + 7);
        v.barW = barW - 2;
        var hw = Math.max(MIN_TOUCH, Math.min(pos.w, img.displayWidth + 20)), hh = Math.max(MIN_TOUCH, img.displayHeight + 40);
        v.hit.setPosition(x, footY + labelH - 2).setSize(hw, hh);
        if (v.hit.input && v.hit.input.hitArea) v.hit.input.hitArea.setTo(0, 0, hw, hh);
        if (v.down) v.down.setPosition(x, footY - 40);
        self.setHp(f.slot, v.hp, v.maxHp);
      });
      if (this.cursor) this.cursor.setFontSize(Math.max(20, Math.ceil(14 / k)) + 'px');
      if (this.cursor && this.cursor.visible && this.targetSlot) this.setTarget(this.targetSlot, true);
      if (this.decorImg) this.decorImg.setPosition(this.W - 90, this.safe.bottom - 40);
    }

    destroyView(v) {
      ['img', 'shadow', 'name', 'barBg', 'bar', 'hit', 'down'].forEach(function (k) { if (v[k]) { this.tweens.killTweensOf(v[k]); try { v[k].destroy(); } catch (e) { /* 忽略 */ } } }, this);
      if (v.flashTw) this.time.removeEvent(v.flashTw);
      if (v.idle) v.idle.stop();
    }

    view(slot) { return this.views[slot] || null; }
    /** 舊程式用 this.monster：回傳第一隻還在的 */
    get monster() { var k = Object.keys(this.views)[0]; return k ? this.views[k].img : null; }

    setHp(slot, hp, max) {
      var v = this.view(slot); if (!v) return;
      v.hp = hp; v.maxHp = max;
      var f = max > 0 ? Math.max(0, Math.min(1, hp / max)) : 0;
      v.bar.width = Math.max(hp > 0 ? 2 : 0, v.barW * f);
      v.bar.fillColor = f > 0.5 ? 0x7ee07a : f > 0.25 ? 0xffd34d : 0xff7a5a;
    }

    /** 目標游標放到 slot 頭上；show＝false（只剩 1 隻）就藏起來 */
    setTarget(slot, show) {
      var v = this.view(slot);
      this.targetSlot = slot;
      if (!v || !show) { this.cursor.setVisible(false); return; }
      this.cursor.setPosition(v.x, Math.max(this.safe.top + 24, v.footY - v.img.displayHeight - 6)).setVisible(true);
    }

    /** 怪物叫聲（sfx.js 依怪物的 family／size／mood 合成） */
    cry(kind, slot) {
      var v = slot ? this.view(slot) : this.views[Object.keys(this.views)[0]];
      if (v && J.Sfx && J.Audio.isEnabled()) J.Sfx.monster(v.mon.id, v.mon, kind);
    }

    floatText(x, y, text, style, rise) {
      var t = this.add.text(x, y, text, Object.assign({ fontFamily: 'sans-serif', fontSize: '22px', fontStyle: 'bold', color: '#ffffff', stroke: '#2a1e22', strokeThickness: 5, align: 'center' }, style || {})).setOrigin(0.5).setDepth(60);
      this.tweens.add({ targets: t, y: y - (rise || 36), alpha: 0, duration: 1400, delay: 300, onComplete: function () { t.destroy(); } });
      return t;
    }

    /**
     * 主角打中 slot：怪物閃一下、跳數字。extra＝{ elem: {kind, text, icon}, lvd: '等級差 −15%', chain: true }
     * 弱點／抵抗：數字上方加一行「🎯 打到弱點！」／「🔰 被抵抗了……」＋外框形狀不同（不只靠顏色）
     */
    hitEffect(slot, dmg, crit, extra) {
      if (typeof slot !== 'number' || dmg === undefined) { extra = undefined; crit = dmg; dmg = slot; slot = Number(Object.keys(this.views)[0]); }
      var v = this.view(slot); if (!v) return;
      var m = v.img, self = this; extra = extra || {};
      J.Audio.play(crit ? 'crit' : 'hit');
      this.time.delayedCall(90, function () { self.cry('hurt', slot); });
      if (v.flashTw) { try { this.time.removeEvent(v.flashTw); } catch (e) { /* 忽略 */ } v.flashTw = null; }
      if (v.shakeTw) v.shakeTw.stop();
      m.setAlpha(1).setX(v.x);
      var flashes = (crit ? 4 : 2) * 2, k = 0;
      var restore = function () { if (self.raging) m.setTint(0xff5a4a); else m.clearTint(); m.setAlpha(1); };
      v.flashTw = this.time.addEvent({ delay: 70, repeat: flashes - 1, callback: function () { k++; if (k % 2) m.setTint(0xffb4a0); else restore(); if (k >= flashes) restore(); } });
      if (!this.calm()) v.shakeTw = this.tweens.add({ targets: m, x: v.x + (crit ? 10 : 5), duration: 50, yoyo: true, repeat: 2, onComplete: function () { m.setX(v.x); }, onStop: function () { m.setX(v.x); } });
      if (crit) this.shake(180, 0.012);
      var topY = v.footY - m.displayHeight * 0.6;
      var t = this.add.text(v.x, topY, String(dmg), { fontFamily: 'sans-serif', fontSize: crit ? '38px' : '30px', fontStyle: 'bold', color: crit ? '#ffd34d' : '#ffffff', stroke: '#2a1e22', strokeThickness: 5 }).setOrigin(0.5).setDepth(55);
      this.tweens.add({ targets: t, y: t.y - 30, alpha: 0, duration: 1100, delay: 200, onComplete: function () { t.destroy(); } });
      var tags = [];
      if (crit) tags.push('💫 爆擊！');
      if (extra.elem) tags.push(extra.elem.icon + ' ' + extra.elem.text);
      if (extra.chain) tags.push('🔗 相生連攻！');
      if (tags.length) {
        var weak = extra.elem && extra.elem.kind === 'weak', resist = extra.elem && extra.elem.kind === 'resist';
        var tg = this.floatText(v.x, topY - 40, tags.join('\n'), { fontSize: '20px', color: weak ? '#ffe066' : resist ? '#cfd8e8' : '#ffffff', backgroundColor: weak ? '#a8321e' : resist ? '#3a4a66' : null, padding: { x: 8, y: 4 } }, 24);
        tg.setDepth(58);
        if (weak) { this.flash(120, 255, 220, 120); }
      }
      if (extra.lvd) this.floatText(v.x, topY + 28, extra.lvd, { fontSize: '15px', color: '#ffd0d0' }, 12);
      var em = this.add.particles(v.x, v.footY - m.displayHeight / 2, 'ui:spark', { speed: { min: 70, max: 200 }, lifespan: 420, scale: { start: 2.6, end: 0 }, tint: crit ? 0xffd34d : 0xffffff, emitting: false });
      em.setDepth(40);
      em.explode(crit ? 26 : 12);
      this.time.delayedCall(700, function () { em.destroy(); });
    }

    /** 敵人停機：短暫變灰後消散，名字與體力條一起退場。 */
    downEffect(slot) {
      var v = this.view(slot); if (!v || !v.alive) return;
      v.alive = false;
      var reduce = this.calm(), duration = reduce ? 300 : 700;
      if (v.idle) v.idle.stop();
      // 受擊閃爍會把 alpha 還原成 1，必須先停掉，避免消散後又亮回來。
      if (v.flashTw) { this.time.removeEvent(v.flashTw); v.flashTw = null; }
      if (v.shakeTw) { v.shakeTw.stop(); v.shakeTw = null; }
      this.tweens.killTweensOf(v.img);
      if (v.img.anims) try { v.img.anims.stop(); } catch (e) { /* 忽略 */ }
      v.img.setTint(0x777777);
      var fade = { targets: v.img, alpha: 0, duration: duration, onComplete: function () { v.img.setVisible(false); } };
      if (!reduce) { fade.y = v.img.y - 18; fade.scale = v.baseScale * 1.06; }
      this.tweens.add(fade);
      v.down = this.add.text(v.x, v.footY - 40, '停機', { fontFamily: 'sans-serif', fontSize: '18px', fontStyle: 'bold', color: '#ffffff', backgroundColor: '#3a3a4a', padding: { x: 6, y: 2 } }).setOrigin(0.5).setDepth(45);
      var attached = [v.shadow, v.name, v.barBg, v.bar].filter(Boolean);
      this.tweens.add({ targets: attached, alpha: 0, duration: duration, onComplete: function () { attached.forEach(function (o) { o.setVisible(false); }); } });
      this.tweens.add({ targets: v.down, alpha: 0, delay: reduce ? 0 : 500, duration: reduce ? 300 : 200, onComplete: function () { v.down.setVisible(false); } });
      if (v.hit) { v.hit.disableInteractive(); v.hit.setVisible(false); }
      if (this.targetSlot === slot) {
        var foes = Object.keys(this.views).map(function (k) { var o = this.views[k]; return { slot: o.slot, hp: o.alive ? 1 : 0 }; }, this);
        this.setTarget(J.BattleV06.nextTargetAfterKill(foes, slot), J.BattleV06.showCursor(foes) && !v.mon.boss);
      }
    }

    /** 敵方回合：出手的那幾隻往前撲（有攻擊列就播攻擊列），畫面紅閃與否看受傷程度 */
    hurtEffect(slots, tier) {
      var self = this;
      (slots && slots.length ? slots : Object.keys(this.views).map(Number)).forEach(function (s, i) {
        var v = self.view(s); if (!v || !v.alive) return;
        self.time.delayedCall(i * 120, function () {
          if (v.anim && v.anim.attack) { v.img.play(v.anim.attack); v.img.once('animationcomplete', function () { if (v.alive) v.img.play(v.anim.idle); }); }
          var bs = v.baseScale;
          self.tweens.add({ targets: v.img, scale: bs * 1.15, duration: 120, yoyo: true, onComplete: function () { v.img.setScale(bs); } });
          self.cry('attack', s);
        });
      });
      if (tier === 'miss') { this.time.delayedCall(260, function () { J.Audio.play('select'); }); return; }
      this.time.delayedCall(260, function () { J.Audio.play('hurt'); });
      var big = tier === 'crit' || tier === 'hit';
      this.shake(big ? 240 : 140, big ? 0.016 : 0.007);
      if (big) this.flash(200, 255, 80, 60);
    }

    /**
     * 防禦結果的大字（D-08）：不透明深色底框＋白字黑描邊（亮的芒草背景、暗背景都讀得出來，對比 > 10:1），
     * 外框顏色與樣式依程度不同；底下列出每隻扣多少。停留 TIER_HOLD_MS（2.4 秒），點一下可以提早關掉
     */
    tierBanner(info) {
      var self = this, W = this.W, safe = this.safe || { top: 8, bottom: this.H - 160 };
      var BORDER = { 'tier-miss': 0xffe066, 'tier-graze': 0x9fd3ff, 'tier-light': 0x9fd3ff, 'tier-hit': 0xffb38a, 'tier-crit': 0xff6a5a };
      if (this.tierBox) { this.tierBox.destroy(); this.tierBox = null; }
      var maxW = Math.min(W - 24, 640);
      var title = this.add.text(0, 0, info.icon + ' ' + info.title + '（' + info.spec + '）', {
        fontFamily: 'sans-serif', fontSize: W < 700 ? '36px' : '34px', fontStyle: 'bold', align: 'center', color: '#ffffff', stroke: '#000000', strokeThickness: 6,
        wordWrap: { width: maxW - 28, useAdvancedWrap: true } }).setOrigin(0.5, 0);
      var detail = (info.lines || []).join('　') + (info.total ? '\n合計 ' + info.total + ' 點' : '');
      var lines = detail ? this.add.text(0, title.height + 6, detail, {
        fontFamily: 'sans-serif', fontSize: W < 700 ? '27px' : '21px', fontStyle: 'bold', align: 'center', color: '#fff6d8', stroke: '#000000', strokeThickness: 4,
        wordWrap: { width: maxW - 28, useAdvancedWrap: true } }).setOrigin(0.5, 0) : null;
      var h = title.height + (lines ? lines.height + 6 : 0) + 20;
      var bg = this.add.rectangle(0, -10, maxW, h, 0x0d0a24, 0.94).setOrigin(0.5, 0).setStrokeStyle(4, BORDER[info.cls] || 0xffffff);
      var box = this.add.container(W / 2, Math.max(safe.top + 6, Math.round(safe.top + (safe.bottom - safe.top) * 0.18)), [bg, title].concat(lines ? [lines] : [])).setDepth(70);
      box.setSize(maxW, h);
      box.setInteractive(new Phaser.Geom.Rectangle(-maxW / 2, -10, maxW, h), Phaser.Geom.Rectangle.Contains);
      var close = function () { if (self.tierBox !== box) return; self.tierBox = null; self.tweens.add({ targets: box, alpha: 0, duration: 250, onComplete: function () { box.destroy(); } }); };
      box.on('pointerdown', close);
      this.tierBox = box;
      if (!this.calm()) this.tweens.add({ targets: box, scale: { from: 0.8, to: 1 }, duration: 180, ease: 'Back.out' });
      this.time.delayedCall(TIER_HOLD_MS, close);
      return box;
    }

    /** 主角補血、技能：綠色閃光＋補血音效 */
    healEffect() {
      J.Audio.play('heal');
      this.flash(250, 120, 255, 140);
    }

    /** 全部停機：保留勝利音效與原本 200＋800ms 的完成時機，不讓已消散的怪再跑走。 */
    wakeEffect(done) {
      var self = this, list = Object.keys(this.views).map(function (k) { return self.views[k]; });
      J.Audio.play('win');
      this.cry('wake');
      if (this.cursor) this.cursor.setVisible(false);
      var left = list.length || 1, fin = function () { left--; if (left === 0 && done) done(); };
      if (!list.length) { fin(); return; }
      list.forEach(function (v) {
        // 頭目最後一段由勝利入口消散；一般怪已經退場的 view 不重播。
        if (v.alive) self.downEffect(v.slot);
        self.time.delayedCall(1000, fin);
      });
    }

    /** 頭目換段：一陣煙 → 新的敵人（主角 HP 不補，由 game.js 處理數值） */
    stageEffect(foes, decor, done) {
      var self = this;
      this.flash(300, 255, 255, 255);
      var smoke = this.add.particles(this.W / 2, this.bgH * 0.55, 'ui:spark', { speed: { min: 40, max: 160 }, lifespan: 900, scale: { start: 6, end: 0 }, tint: 0xd0d0e0, alpha: { start: 0.8, end: 0 }, emitting: false });
      smoke.setDepth(65); smoke.explode(60);
      this.time.delayedCall(450, function () {
        self.raging = false;
        self.buildFoes(foes);
        self.setDecor(decor);
        self.time.delayedCall(500, function () { smoke.destroy(); if (done) done(); });
      });
    }

    /** 頭目說 P2／P3 台詞時：搖一下（只是演出，不改數值） */
    phaseEffect() {
      var m = this.monster; if (!m) return;
      this.cry('phase');
      J.Audio.play('rage');
      this.shake(300, 0.012);
      if (!this.calm()) this.tweens.add({ targets: m, angle: 6, duration: 90, yoyo: true, repeat: 3, onComplete: function () { m.setAngle(0); } });
    }
  }

  window.JQ = window.JQ || {};
  window.JQ.BattleScene = BattleScene;
})();
