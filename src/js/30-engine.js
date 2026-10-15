/* The visual-novel engine.

   A level is LEVEL({id, title, job, color, scene, cast, toy, sticker, goals, beats}). Each beat is one object.
   Stage keys (may sit on any beat, applied first):
     scene: "shop" | "office" | "bench" | "showcase"     change the background (iris wipe)
     show:  ["nib", "byte"]                               who stands on stage (ids from CAST)
   Action keys (one per beat):
     say: "nib", text: "...", mood: "think"   a line of dialogue; use the helper say(who, text, mood)
     nar: "..."                               narration; helper nar(text)
     ask: {q, choices: [...], answer: i, why}  multiple-choice check (any order of choices)
     predict: {program, q, choices?, answer?} "what will this print?"; the reveal is the real recorded output.
                                              With choices, tools/check verifies choices[answer] equals the output.
     trace: {program, note}                    open the trace viewer on a recorded program
     toy: "id", goal: "..."                    open a toy
     machine: ["exercise-id", ...]             the "go to your machine" panel
     book: n                                   open this level's book at page n (0-based)
     sticker: true                             award the level's sticker
   Text everywhere uses rich() markup (see 10-refs.js). Dialogue lines stay about 45 words or fewer. */

function say(who, text, mood) { return { say: who, text, mood }; }
function nar(text) { return { nar: text }; }

const ENGINE = {
  lvl: null, i: 0, auto: false, onStage: [], scene: null, token: 0,

  start(id, from) {
    const L = LV[id];
    if (!L) return;
    if (!UI.unlocked(L)) { toast("Module B opens when you finish the Saturday Showcase (A17). Settings has a switch that opens it early."); return; }
    UI.closeAll();
    this.lvl = L; this.token++;
    S.cur = id; save();
    this.i = from != null ? from : (S.beat[id] && !S.done[id] ? S.beat[id] : 0);
    if (this.i >= L.beats.length) this.i = 0;
    UI.showStage(L);
    this.scene = null; this.onStage = [];
    // replay stage state up to the resume point so the right people are on stage
    let scene = L.scene || "shop", cast = L.cast || [];
    for (let k = 0; k < this.i; k++) { const b = L.beats[k]; if (b.scene) scene = b.scene; if (b.show) cast = b.show; }
    this.setScene(scene, true); this.setCast(cast);
    this.run();
  },

  stop() { this.token++; this.lvl = null; },

  async run() {
    const tok = this.token, L = this.lvl;
    while (tok === this.token && this.i < L.beats.length) {
      const b = L.beats[this.i];
      try { await this.beat(b, L); }
      catch (e) { console.error("beat failed", L.id, this.i, e); }
      if (tok !== this.token) return;
      this.i++;
      S.beat[L.id] = this.i; save();
    }
    if (tok === this.token) this.finish(L);
  },

  setScene(name, instant) {
    if (this.scene === name) return;
    this.scene = name;
    const st = UI.stage;
    if (!st) return;
    const swap = () => { $("svg.scene", st) && $("svg.scene", st).remove(); st.insertAdjacentHTML("afterbegin", sceneSVG(name)); };
    if (instant || reducedMotion() || this.auto) { swap(); return; }
    const iris = $(".iris", st);
    iris.classList.remove("run"); void iris.offsetWidth; iris.classList.add("run");
    setTimeout(swap, 320);
  },

  setCast(ids, speaker, mood) {
    const box = UI.stage && $(".cast", UI.stage);
    if (!box) return;
    this.onStage = ids.slice();
    box.innerHTML = "";
    const n = ids.length;
    ids.forEach((id, k) => {
      if (!CAST[id]) return;
      const wrap = el("div");
      wrap.innerHTML = castSVG(id, id === speaker ? mood : "happy");
      const svg = wrap.firstChild;
      const small = id === "reader" ? 0.62 : 1;
      svg.style.height = (78 * small) + "%";
      const pos = n === 1 ? 38 : n === 2 ? [14, 58][k] : 4 + k * (78 / (n - 1)) * 0.92;
      svg.style.left = pos + "%";
      svg.style.opacity = speaker && id !== speaker ? ".85" : "1";
      svg.style.transform = id === speaker ? "translateY(-2%)" : "none";
      box.append(svg);
    });
  },

  beat(b, L) {
    if (b.scene) this.setScene(b.scene);
    if (b.show) this.setCast(b.show);
    if (b.say) {
      if (!this.onStage.includes(b.say) && CAST[b.say]) this.setCast(this.onStage.concat(b.say).slice(-3), b.say, b.mood);
      else this.setCast(this.onStage, b.say, b.mood);
      return this.line(CAST[b.say] ? CAST[b.say].name : b.say, b.text, CAST[b.say] && CAST[b.say].color);
    }
    if (b.nar) { this.setCast(this.onStage); return this.line(null, b.nar); }
    if (b.ask) return this.ask(b.ask, L);
    if (b.predict) return this.window(b.predict.q || "What will this print?", "Make a prediction", () => PREDICT.open(b.predict));
    if (b.trace) return this.window(b.trace.note || "Watch the program run, one step at a time.", "Watch it run", () => TRACE.open(b.trace.program, b.trace));
    if (b.toy) return this.window(b.goal || "Try the " + TOYS[b.toy].title + ".", "Open the " + TOYS[b.toy].title, () => UI.openToy(b.toy, { goal: b.goal }));
    if (b.machine) return this.window(b.text || "Time to go to your own machine.", "Go to your machine", () => MACHINE.open(b.machine));
    if (b.book != null) return this.window(b.text || "The book has the details. Read the page, then come back.", "Open the book", () => BOOKUI.open(L.id, b.book));
    if (b.sticker) { UI.award(L.sticker && (L.sticker.id || L.id)); return Promise.resolve(); }
    return Promise.resolve();
  },

  /* Dialogue: resolves on Next */
  line(who, text, color) {
    return new Promise(res => {
      const d = UI.dialog(who, color);
      d.body.append(el("div.line" + (who ? "" : ".nar"), { html: rich(text) }));
      const next = el("button.btn.tang", { type: "button", "data-hint": "Next line (Enter or Space)", onclick: () => res() }, "Next ▶");
      d.acts.append(this.backBtn(), next);
      if (this.auto) return setTimeout(res, 0);
      next.focus({ preventScroll: true });
    });
  },

  backBtn() {
    return el("button.btn.plain.small", { type: "button", "data-hint": "Go back one line", disabled: this.i === 0 ? true : null, onclick: () => {
      const L = this.lvl; let k = this.i - 1;
      while (k > 0 && !(L.beats[k].say || L.beats[k].nar)) k--;
      this.start(L.id, Math.max(0, k));
    } }, "◀ Back");
  },

  /* A beat that opens a window: show the line with a button; continue when the window closes. */
  window(text, label, open) {
    return new Promise(res => {
      const d = UI.dialog(null);
      d.body.append(el("div.line.nar", { html: rich(text) }));
      const go = el("button.btn.lime", { type: "button", "data-hint": label, onclick: async () => {
        go.disabled = true;
        const w = open();
        if (w && w.closed) await w.closed;
        res();
      } }, label);
      const skip = el("button.btn.plain.small", { type: "button", "data-hint": "Skip this step for now; you can open it later from the toolbox", onclick: () => res() }, "Skip");
      d.acts.append(this.backBtn(), skip, go);
      if (this.auto) { go.click(); return; }
      go.focus({ preventScroll: true });
    });
  },

  ask(q, L) {
    return new Promise(res => {
      const key = L.id + ":" + this.i;
      const d = UI.dialog("Quick check", "#5cc8ff");
      d.body.append(el("div.line", { html: rich(q.q) }));
      const box = el("div.choices"), fb = el("div.fb", { hidden: true, role: "status" });
      let tries = 0;
      q.choices.forEach((c, k) => {
        const b = el("button.btn.plain", { type: "button", "data-hint": "Choose this answer", html: rich(c) });
        b.onclick = () => {
          tries++;
          fb.hidden = false;
          if (k === q.answer) {
            SND.play("ok");
            fb.className = "fb good";
            fb.innerHTML = "<b class='ok-mark'>Right.</b> " + rich(q.why || "");
            if (S.quiz[key] == null) S.quiz[key] = tries === 1;
            save();
            $$("button", box).forEach(x => (x.disabled = true));
            b.disabled = false; b.style.background = "var(--lime)";
            const next = el("button.btn.tang", { type: "button", "data-hint": "Continue", onclick: () => res() }, "Next ▶");
            d.acts.innerHTML = ""; d.acts.append(next); next.focus({ preventScroll: true });
          } else {
            SND.play("bad");
            fb.className = "fb bad";
            fb.innerHTML = "<b class='no-mark'>Not that one.</b> " + rich((q.wrong && q.wrong[k]) || "Have another look and try again.");
            b.disabled = true;
          }
        };
        box.append(b);
      });
      d.body.append(box, fb);
      d.acts.append(this.backBtn());
      if (this.auto) $$("button", box)[q.answer].click(), setTimeout(res, 0);
    });
  },

  finish(L) {
    const first = !S.done[L.id];
    S.done[L.id] = true; S.beat[L.id] = L.beats.length; save();
    if (L.sticker) UI.award(L.sticker.id || L.id, true);
    BUS.emit("level-done", L.id);
    const d = UI.dialog("Job done!", "#9be34a");
    const nxt = UI.nextLevel(L.id);
    d.body.append(el("div.line", { html: rich(first ? `Nice work, {{you}}. **${L.title}** is finished.` : `**${L.title}** is finished again.`) }));
    if (L.id === "a17" && first) d.body.append(el("div.line", { html: rich("Module B, Intro to Machine Learning, is now open. Your certificate is in the toolbox.") }));
    d.acts.append(...[
      el("button.btn.plain.small", { type: "button", "data-hint": "Play this level again from the start", onclick: () => this.start(L.id, 0) }, "Replay"),
      el("button.btn.sky", { type: "button", "data-hint": "Back to the shop map", onclick: () => UI.hub() }, "Map"),
      nxt && UI.unlocked(nxt) ? el("button.btn.tang", { type: "button", "data-hint": "Start the next job", onclick: () => this.start(nxt.id, 0) }, "Next job ▶") : null,
    ].filter(Boolean));
  },
};

document.addEventListener("keydown", e => {
  if (!ENGINE.lvl || $(".winlayer") || POP.node) return;
  if (/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName) && e.target.closest(".choices")) return;
  if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const b = $(".dialog .acts .btn.tang, .dialog .acts .btn.lime");
    if (b && !b.disabled && document.activeElement !== b) { e.preventDefault(); b.click(); }
  }
});
