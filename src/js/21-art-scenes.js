/* Scene backgrounds, 960x720. Gadget Gulch Repair & Tinker Shop (fictional). */
const SCENES = {
  shop() {
    let s = A.rect(0, 0, 960, 720, "#ffd2a8", { sw: 0 });
    s += A.pegboard(40, 40, 560, 330);
    s += A.rect(40, 40, 560, 330, "none", { sw: 6 });
    // tools on hooks
    s += A.hook(110, 90) + A.wrench(110, 100, 0.9) + A.hook(200, 90) + A.hammer(200, 110, 0.9) + A.hook(280, 90) + A.screwdriver(280, 96, 1, "#ff8a1f");
    s += A.hook(340, 90) + A.screwdriver(340, 96, 1, "#1a8a8a") + A.hook(420, 90) + A.wrench(420, 100, 0.7, "#ffe45c") + A.hook(520, 90) + A.hammer(520, 110, 0.7);
    // sign
    s += A.rect(130, 270, 380, 70, "#1a8a8a", { r: 12, sw: 5 }) + A.text(320, 316, "GADGET GULCH", { size: 34, fill: "#ffe45c" });
    // window
    s += A.rect(650, 50, 260, 210, "#bfeaea", { sw: 6 }) + A.line(780, 50, 780, 260, { sw: 6 }) + A.line(650, 155, 910, 155, { sw: 6 });
    s += A.circ(860, 100, 22, "#ffe45c", { sw: 3 });
    // shelf with gadgets
    s += A.rect(640, 300, 290, 16, "#b97a43", { sw: 4 });
    s += A.g(A.rect(0, -60, 80, 60, "#ff6fae", { r: 12 }) + A.rect(14, -74, 18, 16, "#d9dde2") + A.rect(46, -74, 18, 16, "#d9dde2") + A.circ(62, -26, 7, "#fff"), "translate(655 300)");
    s += A.g(A.rect(0, -70, 90, 70, "#5cc8ff", { r: 8 }) + A.circ(30, -35, 18, "#fff") + A.rect(58, -55, 22, 8, "#141414", { sw: 0 }) + A.rect(58, -40, 22, 8, "#141414", { sw: 0 }) + A.line(70, -70, 86, -98), "translate(750 300)");
    s += A.g(A.ell(40, -30, 40, 30, "#9be34a") + A.rect(30, -76, 20, 20, "#9aa3ad"), "translate(855 300)");
    // counter (low, mostly under the dialogue box)
    s += A.rect(0, 470, 960, 250, "#b97a43", { sw: 6 }) + A.rect(0, 470, 960, 26, "#7d4d23", { sw: 6 });
    s += A.g(A.rect(0, -54, 120, 54, "#d9dde2", { r: 6 }) + A.rect(10, -46, 60, 22, "#121417", { r: 3 }) + A.text(40, -28, "$0.00", { size: 16, fill: "#7dff8a", font: "VT323, monospace" }) + A.rect(80, -46, 30, 36, "#ffe45c", { r: 4 }), "translate(740 470)");
    return s;
  },
  office() {
    let s = A.rect(0, 0, 960, 720, "#bfeaea", { sw: 0 });
    for (let x = 0; x < 960; x += 48) s += A.line(x, 0, x, 470, { stroke: "#a6dede", sw: 2 });
    // window with night sky
    s += A.rect(60, 50, 230, 180, "#24315a", { sw: 6 }) + A.circ(230, 100, 20, "#fff6b8", { sw: 2 }) + A.star(110, 90, 8, "#ffe45c") + A.star(160, 150, 6, "#ffe45c");
    s += A.line(175, 50, 175, 230, { sw: 5 });
    // poster
    s += A.rect(340, 60, 170, 210, "#fffdf6", { sw: 4 }) + A.text(425, 100, "RULE 1", { size: 22, fill: "#c2570a" }) + A.text(425, 136, "The helper", { size: 18, font: "Comic Neue, sans-serif" }) + A.text(425, 160, "does EXACTLY", { size: 18, font: "Comic Neue, sans-serif" }) + A.text(425, 184, "what you say.", { size: 18, font: "Comic Neue, sans-serif" });
    s += A.bulb(425, 228, true);
    // filing cabinet
    s += A.rect(800, 170, 130, 300, "#9aa3ad", { r: 4, sw: 5 });
    for (let i = 0; i < 3; i++) s += A.rect(812, 184 + i * 96, 106, 82, "#d9dde2", { r: 4 }) + A.rect(845, 214 + i * 96, 40, 12, "#141414", { r: 6, sw: 0 });
    // desk and computer
    s += A.rect(260, 400, 520, 30, "#b97a43", { sw: 5 }) + A.rect(290, 430, 30, 290, "#7d4d23", { sw: 4 }) + A.rect(720, 430, 30, 290, "#7d4d23", { sw: 4 });
    s += A.rect(380, 200, 280, 200, "#e8e1cf", { r: 16, sw: 5 }) + A.rect(404, 222, 232, 150, "#121417", { r: 10, sw: 4 });
    s += A.text(418, 262, "$ python3 shop.py", { size: 22, fill: "#7dff8a", anchor: "start", font: "VT323, monospace" }) + A.text(418, 292, "Hello, Gadget Gulch!", { size: 22, fill: "#d7ffd0", anchor: "start", font: "VT323, monospace" }) + A.text(418, 322, "$ _", { size: 22, fill: "#7dff8a", anchor: "start", font: "VT323, monospace" });
    s += A.rect(470, 386, 100, 18, "#9aa3ad", { sw: 4 }) + A.rect(330, 404, 230, 14, "#d9dde2", { r: 4, sw: 3 });
    s += A.rect(0, 470, 960, 250, "#8a6f52", { sw: 0 });
    return s;
  },
  bench() {
    let s = A.rect(0, 0, 960, 720, "#e6dcff", { sw: 0 });
    s += A.pegboard(30, 30, 300, 260, "#efe6c8", "#cdbf95") + A.rect(30, 30, 300, 260, "none", { sw: 5 });
    // chart on the wall: dots and a line
    s += A.rect(380, 40, 300, 230, "#fff", { sw: 5 }) + A.line(410, 240, 660, 240) + A.line(410, 240, 410, 60);
    [[440, 210], [470, 200], [500, 180], [530, 170], [560, 140], [590, 130], [630, 100]].forEach(p => { s += A.circ(p[0], p[1], 7, "#ff8a1f", { sw: 2 }); });
    s += A.line(420, 225, 650, 95, { stroke: "#1a8a8a", sw: 5 });
    s += A.text(530, 70, "QUOTE MACHINE", { size: 18, fill: "#9b6bff" });
    // the learning bench machine
    s += A.rect(700, 120, 230, 350, "#9b6bff", { r: 18, sw: 6 }) + A.rect(724, 150, 182, 110, "#121417", { r: 10 });
    s += A.text(815, 200, "LEARNING", { size: 20, fill: "#ffe45c" }) + A.text(815, 230, "BENCH", { size: 20, fill: "#ffe45c" });
    [740, 800, 860].forEach((x, i) => { s += A.circ(x + 10, 310, 22, ["#ff6fae", "#9be34a", "#5cc8ff"][i]) + A.line(x + 10, 310, x + 10 + 14 * Math.cos(i), 296); });
    s += A.rect(730, 360, 170, 60, "#d9dde2", { r: 8 });
    for (let i = 0; i < 6; i++) s += A.rect(742 + i * 26, 374, 16, 32, i % 2 ? "#ffe45c" : "#fff", { r: 3, sw: 2 });
    s += A.wrench(120, 70, 0.8) + A.hammer(220, 80, 0.7) + A.screwdriver(290, 70, 0.9, "#9be34a");
    s += A.rect(0, 470, 960, 250, "#b97a43", { sw: 6 });
    return s;
  },
  showcase() {
    let s = A.rect(0, 0, 960, 720, "#fff6b8", { sw: 0 });
    // bunting
    let d = "";
    for (let i = 0; i < 12; i++) d += A.path(`M${i * 84} 30 l42 50 l42 -50 z`, ["#ff8a1f", "#1a8a8a", "#9be34a", "#ff6fae"][i % 4], { sw: 3 });
    s += d + A.line(0, 30, 960, 30, { sw: 4 });
    s += A.rect(220, 110, 520, 90, "#ff8a1f", { r: 16, sw: 6 }) + A.text(480, 172, "SATURDAY SHOWCASE", { size: 36, fill: "#fff" });
    // display shelves with finished gadgets
    s += A.rect(80, 300, 800, 18, "#b97a43", { sw: 4 }) + A.rect(80, 420, 800, 18, "#b97a43", { sw: 4 });
    for (let i = 0; i < 6; i++) {
      const x = 120 + i * 130, c = ["#5cc8ff", "#ff6fae", "#9be34a", "#ffe45c", "#9b6bff", "#ff8a1f"][i];
      s += A.rect(x, 240, 70, 60, c, { r: 10 }) + A.circ(x + 35, 262, 8, "#fff", { sw: 2 }) + A.star(x + 35, 380, 22, c);
    }
    s += A.rect(0, 470, 960, 250, "#7d4d23", { sw: 0 });
    return s;
  },
};
function sceneSVG(name) { return A.svg("0 0 960 720", (SCENES[name] || SCENES.shop)(), "scene", "").replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" '); }
