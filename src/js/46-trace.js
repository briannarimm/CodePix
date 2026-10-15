/* Trace viewer and the predict window. Traces are JSON recorded by tools/gen_traces.py from real Python.
   The browser only replays them. */

const REF_COLORS = ["#5cc8ff", "#ff6fae", "#9be34a", "#ffe45c", "#9b6bff", "#ff8a1f", "#bfeaea", "#ffd2a8"];
const refColor = oid => REF_COLORS[(+oid - 1) % REF_COLORS.length];

const TRACE = {
  cache: {},
  async load(id) {
    if (this.cache[id]) return this.cache[id];
    const r = await fetch("data/traces/" + id + ".json");
    if (!r.ok) throw new Error("could not load trace " + id + " (" + r.status + ")");
    const t = await r.json();
    // rebuild the heap at every step from the recorded changes
    let heap = {};
    t.steps.forEach(s => { if (s.h) heap = Object.assign({}, heap, s.h); s.heap = heap; });
    return (this.cache[id] = t);
  },

  open(id, opts = {}) {
    const p = DATA.programs[id];
    if (!p || !p.traced) { toast("No recorded trace for " + id + "."); return null; }
    const body = el("div");
    const w = UI.win({ title: "Magnifier: " + id + ".py", body, cls: "full", color: "var(--sky)", color2: "#2a86b8" });
    body.append(el("p", {}, "Loading the recording…"));
    this.load(id).then(t => this.mount(body, t, opts, w)).catch(e => { body.innerHTML = ""; body.append(el("p", {}, "Could not load the recording: " + e.message + ". If you opened the page as a file, use tools/preview.py instead.")); });
    return w;
  },

  mount(body, t, opts, w) {
    body.innerHTML = "";
    const code = codeBlock(t.src, { file: t.id + ".py" });
    const slider = el("input", { type: "range", min: 0, max: t.steps.length - 1, value: 0, "aria-label": "Step", "data-hint": "Drag to move through the steps" });
    const stepno = el("span.stepno"), event = el("div.event", { role: "status" });
    const frames = el("div.frames"), heapBox = el("div.heap"), stdout = el("div.stdout", { "aria-label": "Program output so far" });
    let i = 0, timer = null, prevVals = {};
    const btn = (label, hint, fn) => el("button.btn.small.plain", { type: "button", "data-hint": hint, onclick: fn }, label);
    const play = btn("▶ Play", "Play the steps automatically", () => toggle());
    const ctl = el("div.ctl", {}, btn("⏮", "First step", () => go(0)), btn("◀ Step", "One step back (Left arrow)", () => go(i - 1)), btn("Step ▶", "One step forward (Right arrow)", () => go(i + 1)), play, slider);
    if (opts.note) body.append(el("p.goal", { style: { margin: "0 0 8px", padding: "6px 10px", border: "3px solid var(--ink)", borderRadius: "10px", background: "var(--lemon)", fontWeight: 700 }, html: rich(opts.note) }));
    body.append(el("div.trace", {},
      el("div.left", {}, code, ctl, el("div", {}, stepno, " ", event)),
      el("div.right.mem", {}, el("h4", {}, "Names (each box is a label and what it holds)"), frames, el("h4", {}, "Objects (lists, dicts and other containers)"), heapBox, el("h4", {}, "Output so far"), stdout)),
      el("p.honest", {}, `These steps were recorded from real Python ${t.python}. The pictures are a simplified model of what happens in memory.${t.truncated ? " The recording stops early to keep it short." : ""}`));

    const valNode = (v, heap) => {
      if (v[2]) {
        const h = heap[v[2]];
        return el("span.ref", { style: { "--c": refColor(v[2]) }, "data-hint": "This name points at the object with the same color" }, `${v[0]} #${v[2]}` + (h && h.n != null ? ` (${h.n} item${h.n === 1 ? "" : "s"})` : ""));
      }
      return document.createTextNode(v[1]);
    };
    const showHeap = (s) => {
      heapBox.innerHTML = "";
      const live = new Set();
      const walk = v => { if (v && v[2] && !live.has(v[2])) { live.add(v[2]); const h = s.heap[v[2]]; if (h) h.items.forEach(it => Array.isArray(it[0]) ? (walk(it[0]), walk(it[1])) : walk(it)); } };
      s.st.forEach(f => f.v.forEach(([, v]) => walk(v)));
      if (s.rv) walk(s.rv);
      if (!live.size) { heapBox.append(el("p.own", {}, "No containers yet.")); return; }
      [...live].sort((a, b) => a - b).forEach(oid => {
        const h = s.heap[oid];
        if (!h) return;
        const o = el("div.hobj", { style: { borderColor: "var(--ink)", background: "#fff" } }, el("div.hh", {}, el("span.ref", { style: { "--c": refColor(oid) } }, `${h.t} #${oid}`), h.n > h.items.length ? el("span.own", {}, `showing ${h.items.length} of ${h.n}`) : null));
        if (h.t === "dict" || !["list", "tuple", "set"].includes(h.t)) {
          const kv = el("div.kv");
          h.items.forEach(([k, v]) => { kv.append(el("span.k", {}, h.t === "dict" ? k[1] : k[1].replace(/^'|'$/g, "")), el("span", {}, valNode(v, s.heap))); });
          if (!h.items.length) kv.append(el("span.own", {}, "(empty)"));
          o.append(kv);
        } else {
          const cub = el("div.cubbies");
          h.items.forEach((v, k) => cub.append(el("div.cub", {}, h.t === "set" ? null : el("span.i", {}, String(k)), el("span.v", {}, valNode(v, s.heap)))));
          if (!h.items.length) cub.append(el("span.own", {}, "(empty)"));
          o.append(cub);
        }
        heapBox.append(o);
      });
    };
    const go = k => {
      i = clamp(k, 0, t.steps.length - 1);
      const s = t.steps[i], prev = t.steps[i - 1];
      slider.value = i;
      stepno.textContent = `Step ${i + 1} of ${t.steps.length}`;
      const top = s.st[s.st.length - 1] || { fn: "<module>" };
      const fname = top.fn === "<module>" ? "the main program" : top.fn + "()";
      event.innerHTML = rich(s.ev === "line" ? `Next to run: line ${s.l} in ${fname}.` : s.ev === "call" ? (top.fn === "<module>" ? "The program starts." : `Calling ${fname}. A new frame goes on the stack.`) :
        s.ev === "return" ? (top.fn === "<module>" ? "The program has finished." : `${fname} returns \`${s.rv ? (s.rv[1] != null ? s.rv[1] : s.rv[0] + " #" + s.rv[2]) : "None"}\`. Its frame comes off the stack.`) : `An error happened on line ${s.l}.`);
      $$(".ln", code.pre).forEach((ln, k) => { ln.classList.toggle("cur", k + 1 === s.l && s.ev !== "exc"); ln.classList.toggle("err", k + 1 === s.l && s.ev === "exc"); });
      const cur = $(".ln.cur, .ln.err", code.pre);
      if (cur) cur.scrollIntoView({ block: "nearest" });
      frames.innerHTML = "";
      const vals = {};
      s.st.forEach((f, fi) => {
        const boxes = el("div.boxes");
        f.v.forEach(([name, v]) => {
          const key = fi + ":" + f.fn + ":" + name, rep = JSON.stringify(v) + JSON.stringify(v[2] ? s.heap[v[2]] : "");
          vals[key] = rep;
          const changed = prevVals[key] !== undefined && prevVals[key] !== rep || (prevVals[key] === undefined && i > 0 && prev);
          boxes.append(el("div.vbox" + (changed ? ".changed" : ""), {}, el("span.lab", {}, name), el("span.val", {}, valNode(v, s.heap), v[2] ? null : el("div.ty", {}, v[0]))));
        });
        if (!f.v.length) boxes.append(el("span.own", {}, "(no names yet)"));
        frames.append(el("div.frame" + (fi === s.st.length - 1 ? ".top" : ""), {}, el("div.fname", {}, f.fn === "<module>" ? "main program" : f.fn + "()  · frame"), boxes));
      });
      prevVals = vals;
      showHeap(s);
      const before = prev ? prev.o : 0, upto = s.o;
      stdout.innerHTML = esc(t.out.slice(0, before)) + `<span class="new">${esc(t.out.slice(before, upto))}</span>`;
      if (i === t.steps.length - 1 && (t.err || DATA.programs[t.id].err)) stdout.insertAdjacentHTML("beforeend", `<span style="color:#ff9db8">${esc(DATA.programs[t.id].err || t.err)}</span>`);
      stdout.scrollTop = stdout.scrollHeight;
    };
    const toggle = () => {
      if (timer) { clearInterval(timer); timer = null; play.textContent = "▶ Play"; return; }
      if (i >= t.steps.length - 1) go(0);
      play.textContent = "⏸ Pause";
      timer = setInterval(() => { if (i >= t.steps.length - 1) toggle(); else go(i + 1); }, reducedMotion() ? 1200 : 700);
    };
    slider.oninput = () => go(+slider.value);
    // a trace toy can mount several recordings in one window: drop the previous one's keys and timer
    if (w.stopTrace) w.stopTrace();
    const keys = e => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && e.target.type !== "range") return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    };
    w.el.addEventListener("keydown", keys);
    w.stopTrace = () => { if (timer) clearInterval(timer); timer = null; w.el.removeEventListener("keydown", keys); };
    w.onclose = w.stopTrace;
    go(0);
  },
};

const PREDICT = {
  open(o) {
    const p = prog(o.program);
    const body = el("div.page");
    body.append(el("p", { html: rich(o.q || "Read the program. What will it print?") }));
    body.append(codeBlock(p.src, { file: o.program + ".py" }));
    const reveal = el("div", { "aria-live": "polite" });
    const doReveal = (msg) => {
      reveal.innerHTML = "";
      if (msg) reveal.append(msg);
      reveal.append(outBlock(p));
      if (o.why) reveal.append(el("p", { html: rich(o.why) }));
      if (p.traced) reveal.append(el("p", {}, el("button.btn.sky", { type: "button", "data-hint": "See how Python got there, step by step", onclick: () => TRACE.open(o.program) }, "🔍 Watch it run")));
    };
    if (o.choices) {
      const box = el("div.choices", { style: { display: "flex", flexDirection: "column", gap: "8px" } });
      o.choices.forEach((c, k) => box.append(el("button.btn.plain", { type: "button", style: { justifyContent: "flex-start", borderRadius: "12px", fontFamily: "var(--f-code)", whiteSpace: "pre-wrap", textAlign: "left" }, "data-hint": "Pick this prediction",
        onclick: () => {
          const good = k === o.answer;
          SND.play(good ? "ok" : "bad");
          $$("button", box).forEach(b => (b.disabled = true));
          doReveal(el("div.fb", { style: { padding: "8px", border: "2px dashed var(--ink)", borderRadius: "10px", background: good ? "#ecffd6" : "#ffe3ec" }, html: good ? "<b class='ok-mark'>You predicted it.</b>" : "<b class='no-mark'>Not quite.</b> Here is what really happened." }));
        } }, c)));
      body.append(box);
    } else {
      const ta = el("textarea", { "aria-label": "Your prediction", placeholder: "Type your guess here (optional)", style: { width: "100%", minHeight: "5em", fontFamily: "var(--f-code)", border: "3px solid var(--ink)", borderRadius: "10px", padding: "8px" }, "data-hint": "Write down your prediction first. It helps the idea stick." });
      body.append(ta, el("p", {}, el("button.btn.tang", { type: "button", "data-hint": "Show the real output", onclick: e => {
        e.target.disabled = true;
        const same = ta.value.trim() && normOut(ta.value) === normOut(p.out + (p.err || ""));
        doReveal(ta.value.trim() ? el("p", { html: same ? "<b class='ok-mark'>Exactly right.</b>" : "Compare your guess with the real output:" }) : null);
      } }, "Reveal the real output")));
    }
    body.append(reveal);
    if (ENGINE.auto) setTimeout(() => doReveal(), 0);
    return UI.win({ title: "Predict", body, color: "var(--tang)", color2: "var(--tang-d)" });
  },
};
