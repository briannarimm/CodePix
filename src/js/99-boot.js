/* Boot: check the registries, show the boot screen once per session, then the title screen. */
STICKERS["ran-first"] = STICKERS["ran-first"] || { title: "First run on my machine", glyph: "$>", color: "#9be34a" };
STICKERS["ran-ten"] = STICKERS["ran-ten"] || { title: "Ten programs run", glyph: "10", color: "#5cc8ff" };

const CP = {
  /* Test hooks for tools/check.mjs */
  problems() {
    const out = [];
    LEVELS.forEach(L => {
      if (!L.beats || !L.beats.length) out.push(L.id + ": no beats");
      (L.beats || []).forEach((b, i) => {
        const at = `${L.id} beat ${i}`;
        if (b.say && !CAST[b.say]) out.push(`${at}: unknown speaker ${b.say}`);
        if (b.toy && !TOYS[b.toy]) out.push(`${at}: unknown toy ${b.toy}`);
        if (b.trace && !(DATA.programs[b.trace.program] || {}).traced) out.push(`${at}: no trace for ${b.trace.program}`);
        if (b.machine) b.machine.forEach(x => { if (!DATA.exercises[x]) out.push(`${at}: unknown exercise ${x}`); });
        if (b.book != null && !(BOOK[L.id] && BOOK[L.id][b.book])) out.push(`${at}: no book page ${b.book}`);
        if (b.ask && (b.ask.answer == null || !b.ask.choices[b.ask.answer])) out.push(`${at}: ask has no valid answer`);
        if (b.predict) {
          const p = DATA.programs[b.predict.program];
          if (!p) out.push(`${at}: unknown program ${b.predict.program}`);
          else if (b.predict.choices && normOut(b.predict.choices[b.predict.answer]) !== normOut(p.out + (p.err ? p.err.split("\n").filter(Boolean).pop() : ""))) out.push(`${at}: predict answer does not match the real output ${JSON.stringify(p.out)}`);
        }
      });
      if (L.toy && !TOYS[L.toy]) out.push(`${L.id}: unknown toy ${L.toy}`);
    });
    const walk = (blocks, where) => (blocks || []).forEach(b => {
      if (!b || typeof b !== "object") return;
      ["code", "out", "trace"].forEach(k => { if (typeof b[k] === "string" && !DATA.programs[b[k]]) out.push(`${where}: unknown program ${b[k]}`); });
      if (b.trace && DATA.programs[b.trace] && !DATA.programs[b.trace].traced) out.push(`${where}: ${b.trace} has no trace`);
      if (b.toy && !TOYS[b.toy]) out.push(`${where}: unknown toy ${b.toy}`);
      if (b.machine) b.machine.forEach(x => { if (!DATA.exercises[x]) out.push(`${where}: unknown exercise ${x}`); });
      if (b.level && !LV[b.level]) out.push(`${where}: unknown level ${b.level}`);
      if (b.body) walk(b.body, where);
      if (b.os) Object.values(b.os).forEach(v => walk(v, where));
    });
    Object.keys(BOOK).forEach(k => BOOK[k].forEach((p, i) => walk(p.body, `book ${k} page ${i}`)));
    Object.values(DATA.exercises).forEach(e => { if (!LV[e.level]) out.push(`exercise ${e.id}: unknown level ${e.level}`); });
    Object.keys(GLOSSARY).forEach(k => { if (!GLOSSARY[k].def) out.push(`glossary ${k}: empty`); });
    // every [[term]] used must exist
    const text = JSON.stringify(LEVELS) + JSON.stringify(BOOK);
    (text.match(/\[\[[A-Za-z][^\]|"\[]*(?:\|[^\]"]*)?\]\]/g) || []).forEach(m => { const t = m.slice(2).split(/[|\]]/)[0].toLowerCase(); if (!GLOSSARY[t]) out.push(`glossary term used but not defined: ${t}`); });
    return [...new Set(out)];
  },
  async playLevel(id) {
    ENGINE.auto = true;
    ENGINE.start(id, 0);
    for (let k = 0; k < 2000 && ENGINE.lvl && !S.done[id]; k++) await new Promise(r => setTimeout(r, 5));
    ENGINE.auto = false;
    return !!S.done[id];
  },
};

function boot() {
  document.body.classList.toggle("reduce", reducedMotion());
  const root = $("#root");
  UI.root = root;
  let seen = false;
  try { seen = sessionStorage.getItem("codepix-booted") === "1"; sessionStorage.setItem("codepix-booted", "1"); } catch (e) { /* ignore */ }
  if (seen || reducedMotion() || /[?&]noboot/.test(location.search)) { start(); return; }
  const pre = el("pre");
  const b = el("div.boot", { role: "status", "aria-label": "Starting Code Pix" }, pre);
  document.body.append(b);
  const lines = ["GADGET GULCH SHOP COMPUTER", "Memory check ........ OK", `Recorded programs ... ${Object.keys(DATA.programs).length}`, `Cited facts ......... ${Object.keys(DATA.facts).length}`, "Byte ................ awake", "", "Press any key"];
  let k = 0;
  const done = () => { clearInterval(t); b.remove(); document.removeEventListener("keydown", done); start(); };
  const t = setInterval(() => { pre.innerHTML = esc(lines.slice(0, ++k).join("\n")) + '<span class="cur">_</span>'; if (k >= lines.length) { clearInterval(t); setTimeout(done, 700); } }, 160);
  b.addEventListener("click", done);
  document.addEventListener("keydown", done);
}
function start() {
  if (S.name && location.hash.length > 1) UI.app();
  else UI.title();
}
window.CP = CP;
window.addEventListener("DOMContentLoaded", boot);
