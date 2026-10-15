/* The cast, each drawn in a 300x520 box. Moods: "happy" (default), "think", "wow".
   Byte is a robot: never draw a snake or the Python logo. */
const face = (cx, cy, mood, o = {}) => {
  const ey = cy - 6, sp = o.sp || 22;
  let s = A.circ(cx - sp, ey, 6, A.INK, { sw: 0 }) + A.circ(cx + sp, ey, 6, A.INK, { sw: 0 });
  if (mood === "think") s += A.path(`M${cx - sp - 10} ${ey - 18} l18 -6 M${cx + sp - 8} ${ey - 20} l18 4`, "none") + A.path(`M${cx - 12} ${cy + 26} h22`);
  else if (mood === "wow") s += A.ell(cx, cy + 26, 9, 12, "#7a2b2b", { sw: 3 });
  else s += A.path(`M${cx - 18} ${cy + 18} q18 18 36 0`);
  return s;
};
const CAST = {
  nib: {
    name: "Dr. Nib", color: "#9b6bff",
    art(m) {
      let s = A.path("M70 520 L90 250 Q150 220 210 250 L230 520 Z", "#fffdf6", { sw: 4 }); // lab coat
      s += A.path("M118 250 L150 330 L182 250", "#1a8a8a", { sw: 3 }) + A.line(150, 330, 150, 520, { sw: 3 });
      s += A.rect(196, 300, 20, 60, "#fff", { sw: 3 }) + A.rect(201, 284, 10, 24, "#9b6bff", { r: 3, sw: 2 }); // pocket and pen
      s += A.rect(130, 200, 40, 50, "#ffd9b8", { sw: 3 }); // neck
      s += A.path("M76 150 q-20 -90 74 -110 q94 20 74 110 q20 30 -6 50 q-30 -120 -136 0 q-26 -20 -6 -50z", "#9b6bff", { sw: 4 }); // hair
      s += A.ell(150, 150, 62, 70, "#ffd9b8", { sw: 4 });
      s += A.circ(126, 146, 20, "#fff8", { sw: 4 }) + A.circ(174, 146, 20, "#fff8", { sw: 4 }) + A.line(146, 146, 154, 146, { sw: 4 });
      s += face(150, 154, m, { sp: 24 });
      s += A.path("M120 104 q30 -30 60 0", "#9b6bff", { sw: 3 });
      return s;
    },
  },
  byte: {
    name: "Byte", color: "#ff8a1f",
    art(m) {
      let s = A.line(150, 120, 150, 70, { sw: 5 }) + A.circ(150, 62, 14, m === "wow" ? "#ff6fae" : "#ffe45c");
      s += A.rect(60, 120, 180, 150, "#ff8a1f", { r: 26, sw: 5 }); // head
      s += A.rect(82, 142, 136, 100, "#121417", { r: 14, sw: 4 }); // screen face
      const eye = (x) => m === "think" ? A.rect(x - 12, 178, 24, 8, "#7dff8a", { sw: 0 }) : A.rect(x - 10, 168, 20, 26, "#7dff8a", { r: 4, sw: 0 });
      s += eye(120) + eye(180);
      s += m === "wow" ? A.circ(150, 220, 10, "none", { stroke: "#7dff8a", sw: 4 }) : m === "think" ? A.line(132, 222, 168, 222, { stroke: "#7dff8a", sw: 4 }) : A.path("M126 214 q24 18 48 0", "none", { stroke: "#7dff8a", sw: 4 });
      s += A.rect(80, 280, 140, 150, "#1a8a8a", { r: 18, sw: 5 }); // body
      s += A.rect(108, 304, 84, 50, "#fffdf6", { r: 8, sw: 3 }) + A.circ(126, 329, 8, "#ff6fae", { sw: 2 }) + A.circ(150, 329, 8, "#ffe45c", { sw: 2 }) + A.circ(174, 329, 8, "#9be34a", { sw: 2 });
      s += A.rect(36, 300, 44, 22, "#9aa3ad", { r: 10 }) + A.rect(220, 300, 44, 22, "#9aa3ad", { r: 10 }) + A.circ(30, 311, 16, "#ffe45c") + A.circ(270, 311, 16, "#ffe45c");
      s += A.rect(70, 430, 160, 50, "#6d7891", { r: 24, sw: 5 }) + A.circ(100, 455, 14, "#d9dde2") + A.circ(150, 455, 14, "#d9dde2") + A.circ(200, 455, 14, "#d9dde2");
      return s;
    },
  },
  reader: {
    name: "Reader", color: "#5cc8ff",
    art(m) {
      let s = A.path("M130 330 l-30 120 M170 330 l30 120", "none", { sw: 10 }) + A.path("M100 450 h-26 M200 450 h26", "none", { sw: 10 });
      s += A.rect(110, 230, 80, 110, "#5cc8ff", { r: 20, sw: 4 });
      s += A.rect(170, 250, 70, 90, "#b97a43", { r: 6, sw: 4 }) + A.rect(180, 264, 50, 66, "#fffdf6", { sw: 2 }); // clipboard
      for (let i = 0; i < 4; i++) s += A.line(186, 278 + i * 14, 222, 278 + i * 14, { sw: 2 });
      s += A.circ(150, 180, 52, "#ffd9b8", { sw: 4 });
      s += A.path("M96 168 q54 -70 108 0 z", "#ff8a1f", { sw: 4 }) + A.path("M190 162 h40", "none", { sw: 6 }); // cap
      s += face(150, 186, m, { sp: 18 });
      return s;
    },
  },
  gridlock: {
    name: "Ms. Gridlock", color: "#ff6fae",
    art(m) {
      let s = A.path("M80 520 L96 260 Q150 236 204 260 L220 520 Z", "#ff6fae", { sw: 4 });
      s += A.path("M108 300 L192 300 L200 520 L100 520 Z", "#fffdf6", { sw: 4 }); // apron
      s += A.rect(122, 360, 56, 40, "#fffdf6", { sw: 3 }) + A.line(150, 360, 150, 400, { sw: 2 });
      s += A.path("M108 262 q42 50 84 0", "none", { stroke: "#ffe45c", sw: 6 }); // measuring tape
      s += A.rect(132, 210, 36, 46, "#e8b48a", { sw: 3 });
      s += A.circ(150, 70, 30, "#7d4d23", { sw: 4 }); // bun
      s += A.ell(150, 150, 60, 66, "#e8b48a", { sw: 4 });
      s += A.path("M92 140 q4 -66 58 -70 q54 4 58 70 q-30 -40 -58 -36 q-28 -4 -58 36z", "#7d4d23", { sw: 4 });
      s += face(150, 156, m, { sp: 22 });
      s += A.path(`M124 132 l18 ${m === "think" ? 6 : -4} M158 ${m === "think" ? 138 : 128} l18 4`, "none");
      return s;
    },
  },
};
function castSVG(id, mood) { const c = CAST[id]; return A.svg("0 0 300 520", c.art(mood || "happy"), "who-" + id, c.name); }
