/* UI: title screen, frame, toolbox, hub map, windows, stickers, settings, glossary, sources, time machine, certificate. */

const MOD_INFO = {
  A: { title: "Module A: Intro to CS and Python", short: "Module A" },
  B: { title: "Module B: Intro to Machine Learning", short: "Module B" },
};

const UI = {
  root: null, stage: null, wins: [],

  unlocked(L) { return L.mod !== "B" || S.settings.unlockAll || !!S.done.a17; },
  nextLevel(id) { const k = LEVELS.findIndex(l => l.id === id); return LEVELS[k + 1] || null; },
  label(L) { return L.id.toUpperCase().replace(/^([AB])0?(\d)/, "$1$2"); },

  /* ---------- Title screen ---------- */
  title() {
    ENGINE.stop();
    this.root.innerHTML = "";
    const name = el("input#pname", { type: "text", maxlength: 24, value: S.name, autocomplete: "off", "data-hint": "Type the name the cast will call you", "aria-label": "Your name" });
    const go = () => { S.name = name.value.trim().slice(0, 24) || "Apprentice"; save(); this.app(); };
    name.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
    const started = Object.keys(S.done).length || Object.keys(S.beat).length;
    const card = el("main.title-card", {},
      el("div", { html: logoSVG() }),
      el("h1", { html: '<span class="c">CODE</span> <span class="p">PIX</span>' }),
      el("p.tag", {}, "A visual-novel textbook. You learn Python and machine learning by running real programs on your own computer, with the shop's very literal helper robot."),
      el("label", { for: "pname" }, "What should the shop call you?"), name,
      el("div.row", {},
        el("button.btn.tang", { type: "button", "data-hint": started ? "Pick up where you left off" : "Start your first day at the shop", onclick: go }, started ? "Continue ▶" : "Start ▶"),
        started ? el("button.btn.plain", { type: "button", "data-hint": "Open settings, where you can reset your progress", onclick: () => this.settings() }, "Settings") : null),
      el("p.fine", {}, `Beta v0.1. Everything shown as Python output was recorded from real Python ${DATA.python || ""}. No Python runs in this page. All shops, people and data are fictional. Progress saves in this browser only.`));
    this.root.append(el("div.title.checker", {}, card));
    name.focus();
  },

  /* ---------- Main frame ---------- */
  app() {
    this.root.innerHTML = "";
    this.where = el("div.where", { "aria-live": "polite" });
    const top = el("header.topbar", {},
      el("button.brand", { type: "button", "data-hint": "Back to the title screen", onclick: () => this.title(), html: 'CODE <span class="c">PIX</span>' }),
      this.where,
      el("button.btn.small.plain", { type: "button", "data-hint": "The shop map: every job in both modules", onclick: () => this.hub() }, "Map"));
    const tbin = el("div.tbin");
    TOOLS.forEach(t => tbin.append(el("button.tool", { type: "button", "data-hint": t.hint, onclick: () => t.run(), "aria-label": t.label, html: icon(t.icon) + `<span>${esc(t.label)}</span>` })));
    this.toolbox = el("nav.toolbox", { "aria-label": "Toolbox" }, tbin);
    this.wrap = el("div.stagewrap");
    this.pal = el("footer.palette", { "aria-label": "Jobs" });
    const hint = el("div.hintbar", { role: "status" });
    this.root.append(el("div.app.pegboard", {}, top, this.toolbox, this.wrap, this.pal, hint));
    HINT.init(hint);
    this.palette();
    const h = location.hash.replace("#", "");
    if (LV[h]) ENGINE.start(h); else this.hub();
  },

  palette() {
    if (!this.pal) return;
    this.pal.innerHTML = "";
    let mod = null;
    LEVELS.forEach(L => {
      if (mod && L.mod !== mod) this.pal.append(el("span.sep"));
      mod = L.mod;
      const b = el("button", { type: "button", style: { "--c": L.color || "#fff" }, "data-hint": `${this.label(L)}: ${L.title}${this.unlocked(L) ? "" : " (locked)"}`,
        "aria-label": `${this.label(L)} ${L.title}`, onclick: () => ENGINE.start(L.id) }, this.label(L));
      if (S.done[L.id]) b.classList.add("done");
      if (!this.unlocked(L)) b.classList.add("locked");
      if (ENGINE.lvl === L) b.setAttribute("aria-current", "true");
      this.pal.append(b);
    });
  },

  showStage(L) {
    this.wrap.innerHTML = "";
    this.stage = el("div.stage", {}, el("div.cast"), el("div.hot"), el("div.iris"));
    this.dlg = el("div.dialog", { "aria-live": "polite" });
    this.wrap.append(this.stage, this.dlg);
    this.where.textContent = `${this.label(L)} · ${L.title}`;
    try { history.replaceState(null, "", "#" + L.id); } catch (e) { /* file:// */ }
    this.palette();
  },

  dialog(who, color) {
    this.dlg.innerHTML = "";
    const body = el("div"), acts = el("div.acts");
    if (who) this.dlg.append(el("span.who", { style: { "--c": color || "var(--lemon)" } }, who));
    const L = ENGINE.lvl;
    if (L) this.dlg.append(el("span.prog", { "aria-hidden": "true" }, `${Math.min(ENGINE.i + 1, L.beats.length)}/${L.beats.length}`));
    this.dlg.append(body, acts);
    return { body, acts };
  },

  /* ---------- Hub map ---------- */
  hub() {
    ENGINE.stop(); this.closeAll();
    S.cur = null; save();
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* ignore */ }
    this.where.textContent = `Shop map · Welcome, ${you()}`;
    this.wrap.innerHTML = "";
    const hub = el("div.hub");
    ["A", "B"].forEach(m => {
      const ls = LEVELS.filter(l => l.mod === m);
      if (!ls.length) return;
      const done = ls.filter(l => S.done[l.id]).length;
      const sec = el("section.mod", {}, el("h2", {}, `${MOD_INFO[m].title} (${done}/${ls.length})`));
      if (m === "B" && !this.unlocked(ls[0])) sec.append(el("p.lock-note", { html: rich("Module B opens when you finish **A17, Saturday Showcase**. It needs Python 3.10 or newer and a virtual environment, which Module A teaches.") }));
      const tiles = el("div.tiles");
      ls.forEach(L => {
        const st = S.done[L.id] ? "Done" : S.beat[L.id] ? "In progress" : this.unlocked(L) ? "Not started" : "Locked";
        const t = el("button.tile", { type: "button", style: { "--c": L.color || "#fff" }, "data-hint": this.unlocked(L) ? `${L.title}: ${L.job || ""}` : "Locked until A17 is finished",
          onclick: () => ENGINE.start(L.id) },
          el("span.n", {}, this.label(L)), el("span.t", {}, L.title), el("span.s", {}, st));
        if (S.done[L.id]) t.classList.add("done");
        if (!this.unlocked(L)) t.classList.add("locked");
        tiles.append(t);
      });
      sec.append(tiles);
      hub.append(sec);
    });
    const cont = LEVELS.find(l => S.beat[l.id] && !S.done[l.id] && this.unlocked(l)) || LEVELS.find(l => !S.done[l.id] && this.unlocked(l));
    if (cont) hub.prepend(el("p", {}, el("button.btn.tang", { type: "button", "data-hint": "Continue with " + cont.title, onclick: () => ENGINE.start(cont.id) }, `Continue: ${this.label(cont)} ${cont.title} ▶`)));
    this.wrap.append(el("div.stage.hub-stage", {}, hub));
    this.palette();
  },

  /* ---------- Windows ---------- */
  win({ title, cls = "", color, color2, body, foot }) {
    const prev = document.activeElement;
    let done;
    const closed = new Promise(r => (done = r));
    const x = el("button.x", { type: "button", "aria-label": "Close", "data-hint": "Close this window (Escape)" }, "×");
    const b = el("div.body");
    const f = el("footer");
    const w = el("section.win" + (cls ? "." + cls.split(" ").join(".") : ""), { role: "dialog", "aria-modal": "true", "aria-label": title, style: { "--c": color || "var(--tang)", "--c2": color2 || "var(--tang-d)" } },
      el("header", {}, el("h2", {}, title), x), b, f);
    const layer = el("div.winlayer", {}, w);
    layer.addEventListener("mousedown", e => { if (e.target === layer) api.close(); });
    document.body.append(layer);
    if (body) b.append(body);
    if (foot) f.append(foot); else f.hidden = true;
    const api = {
      el: w, body: b, foot: f, closed, title,
      close: () => { if (!layer.isConnected) return; POP.close(); layer.remove(); this.wins = this.wins.filter(z => z !== api); (api.onclose || (() => {}))(); done(); if (prev && prev.focus) prev.focus({ preventScroll: true }); },
    };
    x.onclick = api.close;
    this.wins.push(api);
    SND.play("open");
    setTimeout(() => x.focus({ preventScroll: true }), 0);
    if (ENGINE.auto) setTimeout(() => api.close(), 30);
    return api;
  },
  closeAll() { this.wins.slice().forEach(w => w.close()); },

  /* ---------- Toys ---------- */
  openToy(id, opts = {}) {
    const T = TOYS[id];
    if (!T) { toast("That toy is not built yet."); return null; }
    const root = el("div.toy.toy-" + id);
    const goal = opts.goal || T.goal;
    const g = goal ? el("p.goal", { role: "status", html: rich("Goal: " + goal) }) : null;
    if (g) root.append(g);
    const inner = el("div");
    const h = T.html ? T.html() : "";
    if (typeof h === "string") inner.innerHTML = h; else inner.append(h);
    root.append(inner);
    if (T.label) root.append(el("p.honest", {}, T.label));
    const w = this.win({ title: T.title, body: root, color: T.color || "var(--grape)", color2: "#5a3bb0", cls: T.wide ? "full" : "" });
    const ctx = {
      root: inner, win: w,
      goalDone(msg) { if (g && !g.classList.contains("done")) { g.classList.add("done"); g.innerHTML = rich("Goal reached! " + (msg || goal)); SND.play("ok"); S.toys[id] = true; save(); } },
      sticker(sid) { UI.award(sid); },
      onClose(fn) { w.onclose = fn; },
    };
    try { T.init && T.init(inner, ctx, opts); } catch (e) { console.error("toy init failed", id, e); inner.append(el("p", {}, "This toy hit a problem: " + e.message)); }
    return w;
  },

  award(id, quiet) {
    if (!id || S.stickers[id]) return;
    S.stickers[id] = new Date().toISOString().slice(0, 10); save();
    SND.play("sticker");
    if (!quiet || ENGINE.auto) toast(`New sticker: ${(STICKERS[id] && STICKERS[id].title) || id}!`);
    else toast(`Sticker earned: ${(STICKERS[id] && STICKERS[id].title) || id}`);
  },

  /* ---------- Tool windows ---------- */
  stickers() {
    const grid = el("div.stickers");
    Object.keys(STICKERS).forEach(id => {
      const have = S.stickers[id];
      grid.append(el("div.sticker" + (have ? "" : ".missing"), { "data-hint": have ? "Earned " + have : "Not earned yet", html: stickerSVG(id) + `<div>${esc(STICKERS[id].title || id)}</div>` }));
    });
    const n = Object.keys(STICKERS).filter(id => S.stickers[id]).length;
    this.win({ title: `Sticker book (${n}/${Object.keys(STICKERS).length})`, body: grid, color: "var(--pink)", color2: "#c23a7a" });
  },

  settings() {
    const box = el("div");
    const sw = (label, hint, val, set) => el("label.switch", { "data-hint": hint }, el("input", { type: "checkbox", checked: val ? true : null, onchange: e => { set(e.target.checked); save(); } }), label);
    const name = el("input", { type: "text", value: S.name, maxlength: 24, "data-hint": "Change your name", "aria-label": "Your name" });
    name.onchange = () => { S.name = name.value.trim() || "Apprentice"; save(); };
    const motion = el("select", { "data-hint": "Animation: follow your system setting, or choose", "aria-label": "Motion" },
      ["auto", "reduce", "full"].map(v => el("option", { value: v, selected: S.settings.motion === v ? true : null }, { auto: "Follow my system", reduce: "Reduce motion", full: "Full motion" }[v])));
    motion.onchange = () => { S.settings.motion = motion.value; document.body.classList.toggle("reduce", reducedMotion()); save(); };
    const os = el("select", { "data-hint": "Which computer do you use? Steps for it are shown first", "aria-label": "Operating system" },
      [["mac", "macOS"], ["win", "Windows"], ["linux", "Linux"]].map(([v, t]) => el("option", { value: v, selected: S.settings.os === v ? true : null }, t)));
    os.onchange = () => { S.settings.os = os.value; save(); };
    let armed = false;
    const reset = el("button.btn.pink", { type: "button", "data-hint": "Erase all progress in this browser (asks twice)" }, "Reset progress");
    reset.onclick = () => {
      if (!armed) { armed = true; reset.textContent = "Press again to erase everything"; return; }
      resetSave(); toast("Progress erased."); this.closeAll(); this.title();
    };
    box.append(
      el("div.field", {}, el("b", {}, "Your name"), name),
      el("div.field", {}, el("b", {}, "Your computer"), os),
      el("div.field", {}, sw("Sounds", "Little beeps on clicks and answers", S.settings.sound, v => (S.settings.sound = v))),
      el("div.field", {}, el("b", {}, "Motion"), motion),
      el("div.field", {}, sw("Beta: open every level, including Module B", "Testing switch for the beta. Normally Module B opens after A17.", S.settings.unlockAll, v => { S.settings.unlockAll = v; this.palette(); })),
      el("p.honest", {}, "Progress is saved in this browser only, under the name codepix-save. Private windows may not keep it."),
      el("div.field", {}, reset));
    const w = this.win({ title: "Settings", body: box, cls: "narrow", color: "var(--silver-d)", color2: "#6d7891" });
    w.onclose = () => { if (this.wrap && !ENGINE.lvl) this.hub(); };
  },

  glossary() {
    const list = el("div");
    const q = el("input", { type: "text", placeholder: "Search the glossary", "data-hint": "Type to filter the glossary", "aria-label": "Search" });
    const draw = () => {
      list.innerHTML = "";
      Object.values(GLOSSARY).sort((a, b) => a.term.localeCompare(b.term)).filter(g => !q.value || (g.term + " " + g.def).toLowerCase().includes(q.value.toLowerCase()))
        .forEach(g => list.append(el("p", { html: `<b>${esc(g.term)}</b>${g.level && LV[g.level] ? ` <span class="chip" style="--c:${LV[g.level].color}">${UI.label(LV[g.level])}</span>` : ""}: ${rich(g.def)}` })));
    };
    q.oninput = draw; draw();
    this.win({ title: "Glossary", body: el("div.page", {}, el("div.field", {}, q), list), color: "var(--teal)", color2: "var(--teal-d)" });
  },

  sources() {
    const box = el("div.page");
    box.append(el("h2", {}, "Sources"), el("p", { html: rich("Every cited sentence in Code Pix links to one of these pages. Each source was opened and read on the date shown, and each claim was checked against the page's own text by the project's research tools. Sources under NonCommercial or ShareAlike licenses are cited and paraphrased only; no text or examples are copied from them.") }));
    const srcs = Object.values(SRC).sort((a, b) => a.apa.localeCompare(b.apa));
    srcs.forEach(s => box.append(el("p", { style: { paddingLeft: "2em", textIndent: "-2em" }, html: apaHTML(s) + `<br><span class="own">License: ${esc(s.license)}. ${esc(s.reuse || "")}</span>` })));
    this.win({ title: `Sources (${srcs.length})`, body: box, color: "var(--silver-d)", color2: "#6d7891" });
  },

  timeline() {
    const box = el("div.page");
    box.append(el("p", { html: rich("The time machine shows moments from the history of computing and machine learning. Each one comes from a cited source.") }));
    const tl = el("div.timeline");
    TIMELINE.slice().sort((a, b) => a.year - b.year).forEach(e => {
      const L = e.level && LV[e.level];
      if (L && !this.unlocked(L)) return;
      tl.append(el("div.ev", { style: { "--c": e.color || (L && L.color) || "var(--tang)" } }, el("div.yr", {}, e.when || String(e.year)), el("div", { html: rich(e.text) })));
    });
    if (!TIMELINE.length) tl.append(el("p", {}, "The time machine is still warming up."));
    box.append(tl);
    this.win({ title: "Time machine", body: box, color: "var(--lime-d)", color2: "#2f5a08" });
  },

  toys() {
    const grid = el("div.grid2");
    Object.values(TOYS).sort((a, b) => (a.level || "").localeCompare(b.level || "")).forEach(T => {
      const L = LV[T.level];
      if (L && !this.unlocked(L)) return;
      grid.append(el("div.card", {}, el("b", {}, T.title), L ? el("span.chip", { style: { "--c": L.color, marginLeft: "6px" } }, this.label(L)) : null,
        el("p", { html: rich(T.short || "") }),
        el("button.btn.small.grape", { type: "button", "data-hint": "Open " + T.title, onclick: () => this.openToy(T.id) }, "Open")));
    });
    this.win({ title: "Toy shelf", body: grid, color: "var(--grape)", color2: "#5a3bb0" });
  },

  traces() {
    const box = el("div.page");
    box.append(el("p", { html: rich("Every program here was run with real Python when the site was built. Pick one to watch it step by step.") }));
    const ids = Object.keys(DATA.programs).filter(k => DATA.programs[k].traced).sort();
    let mod = "";
    ids.forEach(k => {
      const L = LV[k.slice(0, 3)];
      if (L && !this.unlocked(L)) return;
      if (k[0] !== mod) { mod = k[0]; box.append(el("h3", {}, MOD_INFO[mod.toUpperCase()] ? MOD_INFO[mod.toUpperCase()].short : mod)); }
      box.append(el("button.btn.small.plain", { type: "button", style: { margin: "3px" }, "data-hint": "Watch " + k + " run", onclick: () => TRACE.open(k) }, k));
    });
    this.win({ title: "Magnifier: watch a program run", body: box, color: "var(--sky)", color2: "#2a86b8" });
  },

  downloads() {
    const L = ENGINE.lvl || LV[S.cur];
    const exs = L ? Object.values(DATA.exercises).filter(e => e.level === L.id) : [];
    if (L && exs.length) { MACHINE.open(exs.map(e => e.id)); return; }
    const box = el("div.page");
    box.append(el("p", {}, L ? "This job has no files to download." : "Open a job first. Its exercise files will appear here. You can also pick any level below."));
    const byLvl = {};
    Object.values(DATA.exercises).forEach(e => (byLvl[e.level] = byLvl[e.level] || []).push(e));
    Object.keys(byLvl).sort().forEach(k => {
      const LL = LV[k];
      if (LL && !this.unlocked(LL)) return;
      box.append(el("p", {}, el("button.btn.small.sky", { type: "button", "data-hint": "Open the files for " + k, onclick: () => MACHINE.open(byLvl[k].map(e => e.id)) }, `${LL ? this.label(LL) + " " + LL.title : k} (${byLvl[k].length})`)));
    });
    this.win({ title: "Download tray", body: box, color: "var(--sky)", color2: "#2a86b8" });
  },

  certificate() {
    const L = LV.a17;
    const box = el("div");
    if (!S.done.a17) {
      const done = LEVELS.filter(l => l.mod === "A" && S.done[l.id]).length, all = LEVELS.filter(l => l.mod === "A").length;
      box.append(el("div.page", {}, el("p", {}, `The certificate appears when you finish A17, Saturday Showcase. You have finished ${done} of ${all} Module A jobs.`)));
    } else {
      const ran = Object.keys(S.ran).length;
      box.append(el("div.cert", {}, el("div", { html: logoSVG() }), el("h3", {}, "Certificate of Tinkering"), el("p", {}, "Gadget Gulch Repair & Tinker Shop (fictional) certifies that"),
        el("div.nm", {}, you()), el("p", {}, `finished Module A, Intro to CS and Python, and reports running ${ran} programs on their own machine.`),
        el("p", {}, "Signed: Dr. Nib, Byte, Reader and Ms. Gridlock"), el("p.own", {}, "Progress is self-reported. Code Pix never sees your code.")));
      if (S.done.b16) box.append(el("div.cert", { style: { marginTop: "16px" } }, el("h3", {}, "Learning Bench Certificate"), el("div.nm", {}, you()), el("p", {}, "finished Module B, Intro to Machine Learning.")));
    }
    this.win({ title: "Certificate", body: box, color: "var(--lemon)", color2: "var(--tang)" });
  },

  about() {
    const box = el("div.page");
    box.append(
      el("h2", {}, "About Code Pix"),
      el("p", { html: rich("Code Pix is a visual-novel textbook. The story happens here; the programming happens on your own computer, in a real terminal and editor. **No Python runs in this page.**") }),
      el("p", { html: rich(`Every program, output and step-by-step trace shown in the app was recorded by running real Python (version ${DATA.python || "unknown"}) when the site was built on ${DATA.built}. Module A examples are also checked on Python 3.9. The trace pictures are a simplified model of memory. JavaScript toys are demos of ideas and are labeled as such.`) }),
      el("p", { html: rich("Every cited sentence links to an openly accessible source. The Sources window lists them all with their licenses.") }),
      el("h3", {}, "Licenses"),
      el("p", { html: rich("Site text: CC BY 4.0. Code: MIT. Fonts (self-hosted): Bungee, Comic Neue, VT323, Lora and JetBrains Mono, all under the SIL Open Font License 1.1. Characters and art are drawn in code for this project.") }),
      el("h3", {}, "Fictional"),
      el("p", {}, "Gadget Gulch Repair & Tinker Shop, its staff, customers, inventory and data files are invented. Any resemblance to a real shop is a coincidence."),
      el("h3", {}, "Beta"),
      el("p", {}, "This is beta v0.1. Some toys are simple and some pages will grow. Settings has a switch that opens every level for testing."));
    this.win({ title: "About, credits and licenses", body: box, color: "var(--teal)", color2: "var(--teal-d)" });
  },
};

const TOOLS = [
  { icon: "map", label: "Map", hint: "The shop map: pick any job", run: () => UI.hub() },
  { icon: "book", label: "Book", hint: "The textbook, with citations you can click", run: () => BOOKUI.open(ENGINE.lvl ? ENGINE.lvl.id : S.cur || "a00") },
  { icon: "trace", label: "Magnifier", hint: "Watch a recorded program run step by step", run: () => UI.traces() },
  { icon: "toy", label: "Toys", hint: "Every toy on the shelf", run: () => UI.toys() },
  { icon: "tray", label: "Files", hint: "This job's exercise files and the steps for your machine", run: () => UI.downloads() },
  { icon: "term", label: "Terminal", hint: "Your terminal cheat sheet", run: () => BOOKUI.open("x-terminal") },
  { icon: "bug", label: "Help!", hint: "Troubleshooting: fixes for common problems", run: () => BOOKUI.open("x-trouble") },
  { icon: "gloss", label: "Glossary", hint: "Every word the book defines", run: () => UI.glossary() },
  { icon: "time", label: "Time", hint: "The time machine: history of computing", run: () => UI.timeline() },
  { icon: "sticker", label: "Stickers", hint: "Your sticker book", run: () => UI.stickers() },
  { icon: "cert", label: "Certificate", hint: "Your certificate (after A17)", run: () => UI.certificate() },
  { icon: "refs", label: "Sources", hint: "Every source the book cites, with licenses", run: () => UI.sources() },
  { icon: "gear", label: "Settings", hint: "Name, sounds, motion, your computer, reset", run: () => UI.settings() },
  { icon: "help", label: "About", hint: "About Code Pix, credits and licenses", run: () => UI.about() },
];

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !POP.node && UI.wins.length) { e.preventDefault(); UI.wins[UI.wins.length - 1].close(); }
});
