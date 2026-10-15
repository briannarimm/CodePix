/* Toolbox icons (48x48) and the title logo. */
const ICONS = {
  map: () => A.rect(6, 8, 36, 32, "#bfeaea", { sw: 3 }) + A.path("M6 18 l12 -6 l12 8 l12 -6 M18 12 v28 M30 20 v20", "none", { sw: 2 }) + A.circ(30, 28, 4, "#ff6fae", { sw: 2 }),
  book: () => A.path("M24 12 q-10 -6 -18 -2 v28 q8 -4 18 2 q10 -6 18 -2 v-28 q-8 -4 -18 2 z", "#ff8a1f", { sw: 3 }) + A.line(24, 12, 24, 40, { sw: 2 }),
  trace: () => A.circ(20, 20, 12, "#bfeaea", { sw: 4 }) + A.line(29, 29, 42, 42, { sw: 6 }),
  play: () => A.rect(6, 8, 36, 32, "#ffe45c", { r: 6 }) + A.path("M20 16 l12 8 l-12 8 z", "#141414", { sw: 2 }),
  term: () => A.rect(4, 8, 40, 32, "#121417", { r: 5 }) + A.path("M10 18 l6 5 l-6 5 M20 30 h10", "none", { stroke: "#7dff8a", sw: 3 }),
  tray: () => A.path("M6 26 l6 -14 h24 l6 14 v14 h-36 z", "#5cc8ff", { sw: 3 }) + A.path("M24 8 v18 M18 20 l6 6 l6 -6", "none", { sw: 3 }),
  bulb: () => A.circ(24, 20, 12, "#ffe45c", { sw: 3 }) + A.rect(18, 31, 12, 9, "#9aa3ad", { r: 2, sw: 2 }),
  time: () => A.circ(24, 24, 17, "#9be34a", { sw: 3 }) + A.path("M24 13 v11 l8 5", "none", { sw: 3 }),
  sticker: () => A.star(24, 24, 18, "#ff6fae"),
  gloss: () => A.rect(8, 6, 32, 36, "#fffdf6", { r: 3 }) + A.text(24, 34, "Aa", { size: 18 }),
  refs: () => A.rect(10, 6, 28, 36, "#d9dde2", { r: 3 }) + A.line(16, 16, 32, 16, { sw: 2 }) + A.line(16, 24, 32, 24, { sw: 2 }) + A.line(16, 32, 28, 32, { sw: 2 }),
  gear: () => A.circ(24, 24, 9, "#9aa3ad", { sw: 3 }) + A.path("M24 6 v6 M24 36 v6 M6 24 h6 M36 24 h6 M11 11 l4 4 M33 33 l4 4 M37 11 l-4 4 M15 33 l-4 4", "none", { sw: 5 }),
  help: () => A.circ(24, 24, 18, "#5cc8ff", { sw: 3 }) + A.text(24, 33, "?", { size: 24 }),
  cert: () => A.rect(6, 10, 36, 28, "#fff6b8", { r: 3 }) + A.circ(32, 32, 7, "#ff8a1f", { sw: 2 }) + A.line(12, 18, 32, 18, { sw: 2 }),
  toy: () => A.rect(8, 16, 32, 24, "#9b6bff", { r: 6 }) + A.circ(18, 28, 5, "#ffe45c", { sw: 2 }) + A.circ(30, 28, 5, "#9be34a", { sw: 2 }) + A.line(24, 16, 24, 8, { sw: 3 }) + A.circ(24, 7, 3, "#ff6fae", { sw: 2 }),
  bug: () => A.ell(24, 26, 11, 14, "#ff6fae", { sw: 3 }) + A.path("M13 20 l-7 -4 M13 28 h-8 M13 34 l-7 4 M35 20 l7 -4 M35 28 h8 M35 34 l7 4 M24 12 v28", "none", { sw: 2 }),
};
function icon(name) { return A.svg("0 0 48 48", (ICONS[name] || ICONS.toy)()); }

function logoSVG() {
  let s = "";
  const letters = "CODE PIX".split("");
  const cols = ["#ff8a1f", "#1a8a8a", "#ff6fae", "#9be34a", null, "#9b6bff", "#5cc8ff", "#ffe45c"];
  letters.forEach((ch, i) => {
    if (ch === " ") return;
    const x = 34 + i * 64, rot = (i % 2 ? 4 : -4);
    s += A.g(A.rect(-28, -40, 56, 64, cols[i], { r: 10, sw: 4 }) + A.text(0, 12, ch, { size: 44 }), `translate(${x} 70) rotate(${rot})`);
  });
  s += A.g(CAST.byte.art("happy"), "translate(492 6) scale(.22)");
  return A.svg("0 0 560 130", s, "logo", "Code Pix");
}
