// Playwright smoke test for the built site. Run through tools/check.py.
// Serves DIST, plays every level at 1280 px and 400 px, opens every toy, book page and tool window,
// and fails on console errors, page errors, failed requests, CP.problems(), or sideways scrolling.
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const DIST = process.argv[2], SHOTS = process.argv[3] || "";
const only = (process.argv[4] || "").split(",").filter(Boolean);
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".py": "text/plain", ".zip": "application/zip", ".txt": "text/plain", ".csv": "text/plain", ".png": "image/png" };
// Served under /CodePix/ (case-sensitive), like GitHub Pages, so an absolute URL in the app shows up as a 404.
const PREFIX = "/CodePix/";
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  if (!p.startsWith(PREFIX)) { res.writeHead(404); res.end("outside /CodePix/"); return; }
  p = "/" + p.slice(PREFIX.length);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(DIST, p);
  if (!f.startsWith(DIST) || !fs.existsSync(f)) { res.writeHead(404); res.end("nope"); return; }
  res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}${PREFIX}`;
const problems = [];
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});

async function session(width) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 860 : 900 } });
  page.on("console", m => { if (m.type() === "error") problems.push(`[${width}] console: ${m.text()}`); });
  page.on("pageerror", e => problems.push(`[${width}] page error: ${e.message}`));
  page.on("requestfailed", r => problems.push(`[${width}] request failed: ${r.url()}`));
  page.on("response", r => { if (r.status() >= 400) problems.push(`[${width}] HTTP ${r.status()}: ${r.url()}`); });
  await page.goto(base + "?noboot");
  await page.evaluate(() => { localStorage.clear(); 0; });
  await page.goto(base + "?noboot");
  await page.fill("#pname", "Tester");
  await page.click(".title-card .btn.tang");
  await page.waitForSelector(".hub");
  return page;
}
async function sideways(page, where, width) {
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over > 1) problems.push(`[${width}] ${where}: page scrolls sideways by ${over}px`);
}

for (const width of [1280, 400]) {
  const page = await session(width);
  if (width === 1280) {
    const p = await page.evaluate(() => CP.problems());
    p.forEach(x => problems.push("content: " + x));
  }
  await page.evaluate(() => { S.settings.unlockAll = true; save(); 0; });
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/hub-${width}.png` });
  await sideways(page, "hub", width);
  const levels = await page.evaluate(() => LEVELS.map(l => l.id));
  for (const id of levels) {
    if (only.length && !only.includes(id)) continue;
    await page.evaluate(i => { ENGINE.start(i, 0); 0; }, id);
    await page.waitForTimeout(80);
    if (SHOTS && width === 1280) await page.screenshot({ path: `${SHOTS}/${id}-start.png` });
    await sideways(page, id + " start", width);
    const ok = await page.evaluate(i => CP.playLevel(i), id);
    if (!ok) problems.push(`[${width}] ${id}: auto-play did not finish`);
    await sideways(page, id + " end", width);
  }
  // every toy
  const toys = await page.evaluate(() => Object.keys(TOYS));
  for (const t of toys) {
    await page.evaluate(i => { UI.closeAll(); UI.openToy(i); 0; }, t);
    await page.waitForTimeout(250);
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/toy-${t}-${width}.png` });
    await sideways(page, "toy " + t, width);
  }
  // every book page
  const pages = await page.evaluate(() => Object.keys(BOOK).flatMap(k => BOOK[k].map((_, i) => [k, i])));
  for (const [k, i] of pages) {
    if (only.length && !only.includes(k)) continue;
    await page.evaluate(([a, b]) => { UI.closeAll(); BOOKUI.open(a, b); 0; }, [k, i]);
    await page.waitForTimeout(20);
    await sideways(page, `book ${k}:${i}`, width);
  }
  // every trace
  const traces = await page.evaluate(() => Object.keys(DATA.programs).filter(k => DATA.programs[k].traced));
  for (const t of traces) {
    await page.evaluate(i => { UI.closeAll(); TRACE.open(i); 0; }, t);
    await page.waitForTimeout(60);
    const err = await page.evaluate(() => { const b = document.querySelector(".win .body"); return b && b.textContent.includes("Could not load") ? b.textContent : ""; });
    if (err) problems.push(`[${width}] trace ${t}: ${err}`);
  }
  // every exercise panel and tool window
  const exs = await page.evaluate(() => Object.keys(DATA.exercises));
  for (const e of exs) { await page.evaluate(i => { UI.closeAll(); MACHINE.open([i]); 0; }, e); await sideways(page, "exercise " + e, width); }
  for (let k = 0; k < 14; k++) {
    await page.evaluate(i => { UI.closeAll(); TOOLS[i] && TOOLS[i].run(); 0; }, k);
    await page.waitForTimeout(30);
    await sideways(page, "tool " + k, width);
  }
  if (SHOTS) { await page.evaluate(() => { UI.closeAll(); BOOKUI.open("a03", 0); 0; }); await page.waitForTimeout(100); await page.screenshot({ path: `${SHOTS}/book-${width}.png` }); }
  await page.close();
}
await browser.close();
server.close();
const uniq = [...new Set(problems)];
uniq.forEach(p => console.log(p));
console.log(uniq.length ? `check: ${uniq.length} problems` : "ALL GOOD");
process.exit(uniq.length ? 1 : 0);
