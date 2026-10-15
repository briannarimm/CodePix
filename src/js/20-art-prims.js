/* Drawing primitives. Art is hand-written SVG strings, no libraries.
   Scene art uses a 960x720 viewBox; keep important detail above y = 520 (the dialogue box covers the bottom). */
const A = {
  INK: "#141414",
  rect: (x, y, w, h, fill, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 0}" fill="${fill}" stroke="${o.stroke || A.INK}" stroke-width="${o.sw == null ? 3 : o.sw}"${o.extra || ""}/>`,
  circ: (cx, cy, r, fill, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${o.stroke || A.INK}" stroke-width="${o.sw == null ? 3 : o.sw}"/>`,
  ell: (cx, cy, rx, ry, fill, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${o.stroke || A.INK}" stroke-width="${o.sw == null ? 3 : o.sw}"/>`,
  path: (d, fill = "none", o = {}) => `<path d="${d}" fill="${fill}" stroke="${o.stroke || A.INK}" stroke-width="${o.sw == null ? 3 : o.sw}" stroke-linecap="round" stroke-linejoin="round"${o.extra || ""}/>`,
  line: (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || A.INK}" stroke-width="${o.sw || 3}" stroke-linecap="round"/>`,
  text: (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-family="${o.font || "Bungee, Arial Black, sans-serif"}" font-size="${o.size || 28}" fill="${o.fill || A.INK}" text-anchor="${o.anchor || "middle"}"${o.extra || ""}>${esc(s)}</text>`,
  g: (inner, tr) => `<g${tr ? ` transform="${tr}"` : ""}>${inner}</g>`,
  svg: (vb, inner, cls = "", label = "") => `<svg class="${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg"${label ? ` role="img" aria-label="${esc(label)}"` : ` aria-hidden="true"`}>${inner}</svg>`,
  pegboard(x, y, w, h, base = "#e9d9b8", hole = "#c9b58c") {
    let s = A.rect(x, y, w, h, base, { sw: 0 });
    for (let yy = y + 16; yy < y + h; yy += 32) for (let xx = x + 16; xx < x + w; xx += 32) s += `<circle cx="${xx}" cy="${yy}" r="4" fill="${hole}"/>`;
    return s;
  },
  wrench: (x, y, s = 1, c = "#9aa3ad") => A.g(A.path("M0 0 l0 120 M-14 -6 a20 20 0 1 0 28 0 l-8 14 h-12 z", c, { sw: 3 }) + A.rect(-6, 10, 12, 110, c, { r: 6 }), `translate(${x} ${y}) scale(${s})`),
  hammer: (x, y, s = 1) => A.g(A.rect(-5, 0, 10, 120, "#b97a43", { r: 4 }) + A.rect(-30, -14, 60, 24, "#6d7891", { r: 4 }), `translate(${x} ${y}) scale(${s})`),
  screwdriver: (x, y, s = 1, c = "#ff8a1f") => A.g(A.rect(-9, 0, 18, 50, c, { r: 8 }) + A.rect(-3, 50, 6, 60, "#d9dde2", { r: 2 }), `translate(${x} ${y}) scale(${s})`),
  hook: (x, y) => A.path(`M${x} ${y} q0 -14 -10 -14`, "none", { sw: 4 }),
  star: (cx, cy, r, fill) => {
    let d = "";
    for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1); }
    return A.path(d + "Z", fill);
  },
  bulb: (x, y, on) => A.g(A.circ(0, 0, 22, on ? "#ffe45c" : "#d9dde2") + A.rect(-10, 20, 20, 14, "#9aa3ad", { r: 3 }) + (on ? A.path("M-34 -30 l-10 -10 M34 -30 l10 -10 M0 -36 v-14", "none", { sw: 3 }) : ""), `translate(${x} ${y})`),
};
