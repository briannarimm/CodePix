/* Citations, glossary hovers and the rich-text markup used everywhere in story and book text.

   rich(text, used?) understands:
     [py-001]            a citation to a verified fact (several in a row become one parenthetical)
     [[term]]            a glossary word; [[term|shown words]] shows other words
     `code`              inline code
     **bold**  *italic*  [label](https://...)   {{you}} the player's name
   `used` (a Set) collects the fact ids so a page can print its reference list. */

const FACT = DATA.facts, SRC = DATA.sources;

function apaHTML(s) {
  return esc(s.apa).replace(/\*([^*]+)\*/g, "<i>$1</i>").replace(/(https?:\/\/[^\s<]+)/g, u => `<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>`);
}
function factURL(id) {
  const f = FACT[id], s = SRC[f.s];
  return s.url + (f.a && f.a.startsWith("#") && !s.url.includes("#") ? f.a : "");
}

function rich(text, used) {
  if (text == null) return "";
  const codes = [];
  let h = esc(String(text).replace(/\{\{you\}\}/g, you()));
  h = h.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
  h = h.replace(/(?:\s*\[(?:py|ml)-\d{3}\])+/g, m => {
    const ids = m.match(/(?:py|ml)-\d{3}/g);
    const parts = ids.map(id => {
      if (used) used.add(id);
      const f = FACT[id];
      if (!f) return `<span class="cite">[missing ${id}]</span>`;
      return `<button type="button" class="cite" data-fact="${id}" data-hint="Show the source behind this sentence">${esc(SRC[f.s].cite)}</button>`;
    });
    return ` <span class="cites">(${parts.join("; ")})</span>`;
  });
  h = h.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, t, shown) =>
    `<button type="button" class="gl" data-term="${esc(t.toLowerCase())}" data-hint="Glossary: what does ${esc(t)} mean?">${shown || t}</button>`);
  h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>");
  h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" data-hint="Opens in a new tab">$1</a>');
  h = h.replace(/\u0000(\d+)\u0000/g, (_, i) => "<code>" + codes[+i] + "</code>");
  return h;
}

/** Reference list (APA) for a set of fact ids, sorted by author. */
function refList(used) {
  const srcs = [...new Set([...used].filter(id => FACT[id]).map(id => FACT[id].s))].map(k => SRC[k]);
  srcs.sort((a, b) => a.apa.localeCompare(b.apa));
  return srcs.map(s => `<p>${apaHTML(s)}</p>`).join("");
}

/* Popovers for citations and glossary words */
const POP = {
  node: null,
  close() { if (this.node) { this.node.remove(); this.node = null; } },
  show(anchor, html) {
    this.close();
    const p = el("div.pop", { role: "dialog", "aria-label": "Details", html: `<button type="button" class="closepop" aria-label="Close" data-hint="Close this note">×</button>` + html });
    document.body.append(p);
    const r = anchor.getBoundingClientRect(), w = p.offsetWidth, hgt = p.offsetHeight;
    let x = clamp(r.left, 12, innerWidth - w - 12), y = r.bottom + 8;
    if (y + hgt > innerHeight - 12) y = Math.max(12, r.top - hgt - 8);
    p.style.left = x + "px"; p.style.top = y + "px";
    $(".closepop", p).onclick = () => { this.close(); anchor.focus(); };
    this.node = p;
    $(".closepop", p).focus({ preventScroll: true });
  },
};
document.addEventListener("click", e => {
  const c = e.target.closest && e.target.closest(".cite[data-fact]");
  const g = e.target.closest && e.target.closest(".gl[data-term]");
  if (c) {
    const f = FACT[c.dataset.fact], s = SRC[f.s];
    POP.show(c, `<div class="ttl">Source</div><div class="apa">${apaHTML(s)}</div>
      <div class="lic">License: ${s.licenseUrl ? `<a href="${esc(s.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(s.license)}</a>` : esc(s.license)}. Read on ${esc(s.accessed)}.</div>
      <div class="claim"><b>What this source supports:</b> ${esc(f.c)} <a href="${esc(factURL(c.dataset.fact))}" target="_blank" rel="noopener noreferrer">Open the page</a> (section: ${esc(f.a)})</div>`);
  } else if (g) {
    const t = GLOSSARY[g.dataset.term];
    POP.show(g, t ? `<div class="ttl">${esc(t.term)}</div><div>${rich(t.def)}</div>` : `<div>No glossary entry yet for ${esc(g.dataset.term)}.</div>`);
  } else if (POP.node && !POP.node.contains(e.target)) POP.close();
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && POP.node) POP.close(); });
