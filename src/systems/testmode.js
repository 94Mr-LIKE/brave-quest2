(function () {
  'use strict';
  var KEY = 'bq4_testmode';
  var BACKUP_KEY = 'bq4_testmode_backup';
  var HASH = '021e1a2907e7bd516d68e8370bebcb3ecb609968b0d95aa009e71e5475394302';   // SHA-256（UTF-8）；明碼不放在任何檔案
  var hash = HASH, store = null;

  function storage() {
    if (store) return store;
    try { return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null; } catch (e) { return null; }
  }
  function subtleOf(win) {
    var c = win ? win.crypto : (typeof crypto !== 'undefined' ? crypto : null);   // 有給 win 就只看它（瀏覽器的 window）；node 測試用全域 crypto
    return c && c.subtle && typeof c.subtle.digest === 'function' ? c.subtle : null;
  }
  /** 這台裝置能不能用（crypto.subtle、TextEncoder 都要有；file:// 或舊瀏覽器沒有 → 設定裡不顯示按鈕） */
  function supported(win) { return !!subtleOf(win || (typeof window !== 'undefined' ? window : null)) && typeof TextEncoder === 'function'; }
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  /** 字串的 SHA-256（十六進位）→ Promise */
  function digest(text, win) {
    var s = subtleOf(win || (typeof window !== 'undefined' ? window : null));
    if (!s || typeof TextEncoder !== 'function') return Promise.resolve(null);
    return s.digest('SHA-256', new TextEncoder().encode(String(text == null ? '' : text))).then(hex);
  }
  /** 密碼對不對 → Promise<boolean> */
  function check(text, win) { return digest(text, win).then(function (h) { return !!h && h === hash; }); }
  function marker() { return 'on:' + hash.slice(0, 16); }   // 存的是雜湊的前段（不是密碼）；換密碼後舊的自動失效
  function on() {
    var s = storage();
    try { return !!s && s.getItem(KEY) === marker(); } catch (e) { return false; }
  }
  /** 輸入密碼開啟 → Promise<boolean>（對了才寫 localStorage） */
  function enable(text, win) {
    return check(text, win).then(function (ok) {
      if (ok) { var s = storage(); try { if (s) s.setItem(KEY, marker()); } catch (e) { return false; } }
      return ok && on();
    });
  }
  function disable() { var s = storage(); try { if (s) s.removeItem(KEY); } catch (e) { /* 存不了就算了 */ } }
  function backup(raw) {
    if (typeof raw !== 'string' || !raw) return false;
    var s = storage();
    try { if (!s) return false; s.setItem(BACKUP_KEY, raw); return true; } catch (e) { return false; }
  }
  function backupRaw() {
    var s = storage();
    try { return s ? s.getItem(BACKUP_KEY) || null : null; } catch (e) { return null; }
  }
  function clearBackup() { var s = storage(); try { if (s) s.removeItem(BACKUP_KEY); } catch (e) { /* 存不了就算了 */ } }
  /** 左上角「測試模式」標籤（開著才有）；doc＝document */
  function badge(doc) {
    if (!doc || !doc.body) return null;
    var el = doc.getElementById('testmode-badge');
    if (!on()) { if (el && el.parentNode) el.parentNode.removeChild(el); return null; }
    if (!el) {
      el = doc.createElement('div');
      el.id = 'testmode-badge';
      el.setAttribute('aria-label', '測試模式開著');
      el.textContent = '測試模式';
      el.style.cssText = 'position:fixed;left:4px;top:calc(var(--hud-h, 0px) + 4px);z-index:99999;pointer-events:none;font-size:11px;line-height:1.4;padding:0 5px;border-radius:4px;background:rgba(200,40,40,.85);color:#fff;font-weight:bold';
      doc.body.appendChild(el);
    }
    return el;
  }
  function setStorage(s) { store = s || null; }
  function setHash(h) { hash = h || HASH; }

  /** 設定頁的地圖清單；落點沿用各地圖 start，關閉時回傳空清單。 */
  function mapTargets(maps) {
    if (!on() || !maps) return [];
    return Object.keys(maps).filter(function (id) { var s = maps[id] && maps[id].start; return !!s && Number.isInteger(s.x) && Number.isInteger(s.y); })
      .map(function (id) { var m = maps[id]; return { id: id, name: m.name || id, x: m.start.x, y: m.start.y }; });
  }

  var TestMode = { KEY: KEY, BACKUP_KEY: BACKUP_KEY, backup: backup, backupRaw: backupRaw, clearBackup: clearBackup, HASH: HASH, supported: supported, digest: digest, check: check, on: on, enable: enable, disable: disable, badge: badge, setStorage: setStorage, setHash: setHash, mapTargets: mapTargets };
  if (typeof window !== 'undefined') { window.JQ = window.JQ || {}; window.JQ.TestMode = TestMode; }
  if (typeof module !== 'undefined') module.exports = TestMode;
})();
