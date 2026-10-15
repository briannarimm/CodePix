/* Block rendering shared by the book, the machine panel and toys.

   A page is {h: "Title", kicker?: "small heading", body: [block, ...]}. Blocks:
     "a paragraph with rich() markup"
     {h3: "subheading"}                     {ul: [...]} / {ol: [...]}   (items use rich markup)
     {code: "program_id"}                   a recorded program from content/programs, with a copy button
     {code: "program_id", out: true}        ...followed by its real recorded output
     {out: "program_id"}                    only the real recorded output (or traceback)
     {snippet: "text", lang: "py"|"text", file?: "name"}   a fragment that is not a whole program (label says so)
     {term: [["cmd", "what it does"], ...], title?, shown?: "what the terminal prints (from a source)"}
     {os: {mac: [blocks], win: [blocks], linux: [blocks]}}  tabs; the reader's OS (Settings) is shown first
     {alt: "Summary line", body: [blocks]}  a collapsible section (Windows and Linux alternates)
     {nerd: "How it really works", body: [blocks]}
     {analogy: "text"}                      our own analogy (no citation needed)
     {fig: () => "<svg ...>", cap: "caption"}
     {table: {head: [...], rows: [[...], ...]}}
     {trace: "program_id", label?}  {toy: "toy_id", label?}  {machine: ["exercise-id"], label?}  {level: "a03", label?}
     {honest: "text"}                       a dashed honesty note */

function codeBlock(src, o = {}) {
  const lines = highlightLines(src, o.lang || "py");
  const pre = el("pre", { tabindex: "0", "aria-label": (o.file || "code") + " listing" });
  pre.innerHTML = lines.map((l, i) => `<span class="ln" data-n="${i + 1}">${l || " "}</span>`).join("");
  const bar = el("div.bar", {}, el("span.fn", {}, o.file || (o.lang === "text" ? "text" : "Python")), o.badge ? el("span.chip", { style: { "--c": "var(--lemon)", color: "var(--ink)" } }, o.badge) : null);
  if (o.copy !== false) bar.append(el("button.btn.small.plain", { type: "button", "data-hint": "Copy this code so you can paste it into your editor", onclick: () => copyText(src, pre) }, "Copy"));
  const box = el("div.code" + (o.nonum ? ".nonum" : ""), {}, bar, pre);
  box.pre = pre;
  return box;
}

function outBlock(p, o = {}) {
  const isErr = !!p.err;
  const text = (p.out || "") + (p.err || "");
  return el("div.out" + (isErr ? ".err" : ""), {},
    el("div.bar", {}, isErr ? "Real output, ending in an error (traceback)" : "Real output"),
    el("pre", {}, text || "(this program prints nothing)"),
    el("div.note", {}, `Recorded from real Python ${p.python} when the site was built.${o.note ? " " + o.note : ""}`));
}

function termBlock(cmds, o = {}) {
  const t = el("div.term", {}, el("div.bar", { html: `<i></i><i></i><i></i><span>${esc(o.title || "Terminal")}</span>` }));
  cmds.forEach(c => {
    const [cmd, what] = Array.isArray(c) ? c : [c, ""];
    const pre = el("pre", {}, cmd);
    t.append(el("div.cmd", {}, pre, el("button.btn.small.plain", { type: "button", "data-hint": "Copy this command", onclick: () => copyText(cmd, pre) }, "Copy")));
    if (what) t.append(el("div.what", { html: rich(what) }));
  });
  if (o.shown) t.append(el("div.shown", {}, o.shown));
  return t;
}

function prog(id) {
  const p = DATA.programs[id];
  if (!p) console.error("missing program", id);
  return p || { src: "# missing program " + id + "\n", out: "", err: "", python: "?" };
}

function renderBlocks(blocks, used) {
  const frag = document.createDocumentFragment();
  (blocks || []).forEach(b => {
    if (b == null) return;
    if (typeof b === "string") { frag.append(el("p", { html: rich(b, used) })); return; }
    if (b.h3) frag.append(el("h3", { html: rich(b.h3, used) }));
    else if (b.ul || b.ol) frag.append(el(b.ul ? "ul" : "ol", {}, (b.ul || b.ol).map(x => el("li", { html: rich(x, used) }))));
    else if (b.code) {
      const p = prog(b.code);
      frag.append(codeBlock(p.src, { file: b.file || b.code + ".py" }));
      if (b.out) frag.append(outBlock(p));
    } else if (b.out) frag.append(outBlock(prog(b.out), b));
    else if (b.snippet != null) frag.append(codeBlock(b.snippet, { lang: b.lang || "py", file: b.file || (b.lang === "text" ? "text" : "fragment"), badge: b.lang === "text" ? null : "fragment, not a whole program" }));
    else if (b.term) frag.append(termBlock(b.term, b));
    else if (b.os) frag.append(osTabs(b.os, used));
    else if (b.alt) { const d = el("details.alt", {}, el("summary", { "data-hint": "Open or close this section", html: rich(b.alt, used) })); const inner = el("div"); inner.append(renderBlocks(b.body, used)); d.append(inner); frag.append(d); }
    else if (b.nerd) { const d = el("div.nerd", {}, el("b", {}, b.nerd)); d.append(renderBlocks(b.body, used)); frag.append(d); }
    else if (b.analogy) frag.append(el("div.analogy", { html: rich(b.analogy, used) + ' <span class="own">(our analogy)</span>' }));
    else if (b.fig) frag.append(el("figure", { html: (typeof b.fig === "function" ? b.fig() : b.fig) + (b.cap ? `<figcaption>${rich(b.cap, used)}</figcaption>` : "") }));
    else if (b.table) frag.append(el("table", { html: `<thead><tr>${b.table.head.map(h => `<th>${rich(h, used)}</th>`).join("")}</tr></thead><tbody>${b.table.rows.map(r => `<tr>${r.map(c => `<td>${rich(c, used)}</td>`).join("")}</tr>`).join("")}</tbody>` }));
    else if (b.trace) frag.append(el("p", {}, el("button.btn.sky", { type: "button", "data-hint": "Watch this program run one step at a time", onclick: () => TRACE.open(b.trace, b) }, b.label || "🔍 Watch it run")));
    else if (b.toy) frag.append(el("p", {}, el("button.btn.grape", { type: "button", "data-hint": "Open this toy", onclick: () => UI.openToy(b.toy, b) }, b.label || "Open the " + (TOYS[b.toy] ? TOYS[b.toy].title : b.toy))));
    else if (b.machine) frag.append(el("p", {}, el("button.btn.lime", { type: "button", "data-hint": "Open the steps and files for your own machine", onclick: () => MACHINE.open(b.machine) }, b.label || "Go to your machine")));
    else if (b.level) frag.append(el("p", {}, el("button.btn.tang", { type: "button", "data-hint": "Play this job", onclick: () => ENGINE.start(b.level) }, b.label || "Play " + b.level)));
    else if (b.honest) frag.append(el("p.honest", { html: rich(b.honest, used) }));
  });
  return frag;
}

function osTabs(map, used) {
  const order = [S.settings.os, "mac", "win", "linux"].filter((v, i, a) => map[v] && a.indexOf(v) === i);
  const names = { mac: "macOS", win: "Windows", linux: "Linux" };
  const box = el("div"), tabs = el("div.os-tabs", { role: "tablist" }), panes = {};
  order.forEach((k, i) => {
    const pane = el("div", { role: "tabpanel", hidden: i ? true : null });
    pane.append(renderBlocks(map[k], used));
    panes[k] = pane;
    const t = el("button", { type: "button", role: "tab", "aria-selected": i ? "false" : "true", "data-hint": "Show the steps for " + names[k] }, names[k]);
    t.onclick = () => { $$("button", tabs).forEach(x => x.setAttribute("aria-selected", x === t ? "true" : "false")); order.forEach(z => (panes[z].hidden = z !== k)); };
    tabs.append(t);
  });
  box.append(tabs, ...order.map(k => panes[k]));
  return box;
}

/* ---------- The book reader ---------- */
const BOOKUI = {
  chapters() {
    const ch = LEVELS.filter(L => BOOK[L.id]).map(L => ({ id: L.id, title: `${UI.label(L)} ${L.title}`, mod: L.mod, L }));
    Object.keys(BOOK).filter(k => !LV[k]).sort().forEach(k => ch.push({ id: k, title: BOOK[k][0].h, mod: "X" }));
    return ch;
  },
  open(id, page = 0) {
    if (!BOOK[id]) id = Object.keys(BOOK)[0];
    if (!id) { toast("The book is empty so far."); return null; }
    const toc = el("nav.toc", { "aria-label": "Chapters" });
    const pageBox = el("article.page", { tabindex: "-1" });
    const wrap = el("div.book", {}, toc, pageBox);
    const w = UI.win({ title: "The Code Pix Book", body: wrap, cls: "full", color: "var(--tang)", color2: "var(--tang-d)" });
    w.body.classList.add("bookbody");
    const draw = (cid, pg) => {
      const pages = BOOK[cid], L = LV[cid];
      pg = clamp(pg, 0, pages.length - 1);
      S.seen[cid + ":" + pg] = true; save();
      toc.innerHTML = "";
      let mod = null;
      this.chapters().forEach(c => {
        if (c.mod !== mod) { mod = c.mod; toc.append(el("h3", {}, mod === "X" ? "Reference" : MOD_INFO[mod].short)); }
        const locked = c.L && !UI.unlocked(c.L);
        toc.append(el("button" + (locked ? ".locked" : ""), { type: "button", "aria-current": c.id === cid ? "true" : null, "data-hint": locked ? "Locked until A17 is finished" : "Read " + c.title, onclick: () => { if (!locked) draw(c.id, 0); } }, c.title));
        if (c.id === cid && pages.length > 1) pages.forEach((p, i) => toc.append(el("button", { type: "button", style: { paddingLeft: "22px", fontSize: "13px" }, "aria-current": i === pg ? "true" : null, "data-hint": "Go to this page", onclick: () => draw(cid, i) }, `${i + 1}. ${p.h}`)));
      });
      const p = pages[pg], used = new Set();
      pageBox.innerHTML = "";
      pageBox.append(el("p.kicker", {}, L ? `${UI.label(L)} · ${L.title} · page ${pg + 1} of ${pages.length}` : `Reference · page ${pg + 1} of ${pages.length}`));
      pageBox.append(el("h2", { html: rich(p.h, used) }));
      pageBox.append(renderBlocks(p.body, used));
      if (used.size) { const r = el("div.refs", {}, el("h4", {}, "References")); r.insertAdjacentHTML("beforeend", refList(used)); pageBox.append(r); }
      const nav = el("div.pnav", {},
        el("button.btn.small.plain", { type: "button", "data-hint": "Previous page", disabled: pg === 0 ? true : null, onclick: () => draw(cid, pg - 1) }, "◀ Previous"),
        L && pg === pages.length - 1 && !(ENGINE.lvl && ENGINE.lvl.id === cid) ? el("button.btn.small.tang", { type: "button", "data-hint": "Play this job's story", onclick: () => ENGINE.start(cid) }, "Play this job") : null,
        el("button.btn.small.tang", { type: "button", "data-hint": "Next page", disabled: pg === pages.length - 1 ? true : null, onclick: () => draw(cid, pg + 1) }, "Next ▶"));
      pageBox.append(nav);
      pageBox.scrollTop = 0; pageBox.focus({ preventScroll: true });
    };
    draw(id, page);
    return w;
  },
};
