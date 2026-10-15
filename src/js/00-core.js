/* Core helpers: DOM, safe storage, save state, event bus, sound, hints, sparkles.
   All files are concatenated into one script in name order, so top-level names are shared.
   Registries filled by later files: LEVELS, BOOK, TOYS, GLOSSARY, TIMELINE, STICKERS. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wait = ms => new Promise(r => setTimeout(r, reducedMotion() ? Math.min(ms, 30) : ms));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

/** el("div.cls#id", {attrs}, ...children). Children may be strings (text), nodes, arrays or null. */
function el(spec, attrs, ...kids) {
  const m = spec.match(/^([a-z0-9]+)?((?:[.#][\w-]+)*)$/i);
  const node = document.createElement((m && m[1]) || "div");
  if (m && m[2]) m[2].replace(/([.#])([\w-]+)/g, (_, k, v) => { if (k === ".") node.classList.add(v); else node.id = v; });
  if (attrs && (typeof attrs !== "object" || attrs instanceof Node || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
  for (const k in attrs || {}) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k === "style" && typeof v === "object") { for (const sk in v) { if (sk.startsWith("--")) node.style.setProperty(sk, v[sk]); else node.style[sk] = v[sk]; } }
    else node.setAttribute(k, v === true ? "" : v);
  }
  const add = c => { if (c == null || c === false) return; if (Array.isArray(c)) c.forEach(add); else node.append(c instanceof Node ? c : document.createTextNode(String(c))); };
  kids.forEach(add);
  return node;
}

/** localStorage may throw (private mode, blocked storage). Always go through this. */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } },
};

// The release candidate (DATA.channel "rc", served at /CodePix/rc/) shares the live site's origin, so it saves under its own key.
const SAVE_KEY = DATA.channel === "rc" ? "codepix-save-rc" : "codepix-save";
const VERSION_TEXT = DATA.channel === "rc" ? `Release candidate ${DATA.version}${DATA.buildId ? " (build " + DATA.buildId + ")" : ""}` : `Version ${DATA.version}`;
if (DATA.channel === "rc") document.title = "RC: " + document.title;
const FRESH = () => ({ v: 1, name: "", done: {}, beat: {}, stickers: {}, ran: {}, hints: {}, sol: {}, quiz: {}, toys: {}, seen: {}, cur: null,
  settings: { sound: true, motion: "auto", unlockAll: false, os: "mac" } });
let S = Object.assign(FRESH(), store.get(SAVE_KEY, {}));
S.settings = Object.assign(FRESH().settings, S.settings || {});
function save() { store.set(SAVE_KEY, S); }
function resetSave() { S = FRESH(); store.del(SAVE_KEY); save(); }

const BUS = {
  h: {},
  on(ev, fn) { (this.h[ev] = this.h[ev] || []).push(fn); },
  emit(ev, x) { (this.h[ev] || []).forEach(fn => { try { fn(x); } catch (e) { console.error(e); } }); },
};

function reducedMotion() {
  if (S.settings.motion === "reduce") return true;
  if (S.settings.motion === "full") return false;
  try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
}

/** Tiny synth for clicks and cheers. No audio files. */
const SND = {
  ctx: null,
  play(kind) {
    if (!S.settings.sound) return;
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = { click: [660], ok: [523, 659, 784], bad: [220, 196], open: [440, 560], sticker: [784, 988, 1175, 1568] }[kind] || [440];
      notes.forEach((f, i) => {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain(), t = this.ctx.currentTime + i * 0.07;
        o.type = kind === "bad" ? "sawtooth" : "square"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t + 0.13);
      });
    } catch (e) { /* audio is optional */ }
  },
};

/** Hint bar: every interactive element carries data-hint. */
const HINT = {
  bar: null, base: "Point at anything to see what it does.",
  set(t) { if (this.bar) this.bar.textContent = t || this.base; },
  init(bar) {
    this.bar = bar; this.set();
    const show = e => { const h = e.target.closest && e.target.closest("[data-hint]"); this.set(h ? h.getAttribute("data-hint") : ""); };
    document.addEventListener("mouseover", show);
    document.addEventListener("focusin", show);
  },
};

function sparkle(x, y) {
  if (reducedMotion()) return;
  const s = el("div.sparkle", { html: `<svg viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="${["#ffe45c", "#ff6fae", "#5cc8ff", "#9be34a"][Math.floor(Math.random() * 4)]}" stroke="#141414" stroke-width="1.5"/></svg>` });
  s.style.left = x + "px"; s.style.top = y + "px";
  document.body.append(s);
  setTimeout(() => s.remove(), 700);
}
document.addEventListener("click", e => {
  if (e.target.closest && e.target.closest("button,a,.tile,[role=button]")) { sparkle(e.clientX, e.clientY); SND.play("click"); }
});

function toast(msg, ms = 2600) {
  const t = el("div.toast", { role: "status" }, msg);
  document.body.append(t);
  setTimeout(() => t.remove(), ms);
}

/** Copy text; falls back to selecting it and asking for Cmd/Ctrl+C. */
async function copyText(text, fallbackNode) {
  try { await navigator.clipboard.writeText(text); toast("Copied. Paste it with Cmd+V (Mac) or Ctrl+V."); return true; }
  catch (e) {
    if (fallbackNode) { const r = document.createRange(); r.selectNodeContents(fallbackNode); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
    toast("Your browser blocked copying. The text is selected: press Cmd+C or Ctrl+C.", 4000);
    return false;
  }
}

/** Player name substitution in story and book text. */
const you = () => S.name || "Apprentice";

/* Registries */
const LEVELS = [];          // in play order
const LV = {};              // id -> level
const BOOK = {};            // level id -> [page, ...]
const TOYS = {};            // toy id -> {title, short, level, icon, color, html(), init(root), open(opts)}
const GLOSSARY = {};        // term (lowercase) -> {term, def, level}
const TIMELINE = [];        // {year, text, level, color}
const STICKERS = {};        // id -> {title, level, art()}

/** Register a level. See 30-engine.js for the beat format and docs/authoring.md for a full guide. */
function LEVEL(def) {
  if (LV[def.id]) throw new Error("duplicate level " + def.id);
  def.mod = def.id[0].toUpperCase();
  LEVELS.push(def); LV[def.id] = def;
  if (def.sticker) STICKERS[def.sticker.id || def.id] = Object.assign({ level: def.id }, def.sticker);
}
function PAGES(id, pages) { BOOK[id] = pages; }
function GLOSS(entries, level) { for (const k in entries) GLOSSARY[k.toLowerCase()] = { term: k, def: entries[k], level }; }
function TOY(id, def) { if (TOYS[id]) throw new Error("duplicate toy " + id); TOYS[id] = Object.assign({ id }, def); }
function EVENTS(list) { list.forEach(e => TIMELINE.push(e)); }
