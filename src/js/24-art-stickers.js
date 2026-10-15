/* Sticker art. A level's sticker is {id, title, glyph, color}; art is drawn from those.
   Toys may also award stickers with their own art via STICKERS[id] = {title, level, art()}. */
function stickerSVG(id) {
  const st = STICKERS[id] || {};
  if (st.art) return A.svg("0 0 120 120", st.art(), "", st.title);
  const c = st.color || "#ffe45c";
  let s = "";
  for (let i = 0; i < 16; i++) {
    const a = Math.PI / 8 * i, r = i % 2 ? 50 : 58;
    s += (i ? "L" : "M") + (60 + r * Math.cos(a)).toFixed(1) + " " + (60 + r * Math.sin(a)).toFixed(1);
  }
  let g = A.path(s + "Z", c, { sw: 4 }) + A.circ(60, 60, 38, "#fffdf6", { sw: 3 });
  g += A.text(60, 62 + (st.glyph && st.glyph.length > 2 ? 4 : 10), st.glyph || "?", { size: st.glyph && st.glyph.length > 2 ? 18 : 30, font: "JetBrains Mono, monospace", extra: ' font-weight="700"' });
  return A.svg("0 0 120 120", g, "", st.title || id);
}
