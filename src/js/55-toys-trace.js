/* Trace-driven toys. TRACETOY(id, {title, level, short, programs: [[program_id, "button label"], ...], goal?, note?})
   registers a toy that replays recorded programs inside its own window (Memory Shelf, Loop Belt,
   Call Stack Tower and friends all use this). The goal is reached after the learner steps to the end of
   any recording. */

TRACE.embed = function (box, id, opts, win, onEnd) {
  box.innerHTML = "";
  box.append(el("p", {}, "Loading the recording…"));
  this.load(id).then(t => {
    this.mount(box, t, opts || {}, win);
    const slider = $("input[type=range]", box);
    if (slider && onEnd) {
      const check = () => { if (+slider.value >= +slider.max) onEnd(); };
      box.addEventListener("click", () => setTimeout(check, 0));
      slider.addEventListener("input", check);
      box.addEventListener("keyup", check);
    }
  }).catch(e => { box.innerHTML = ""; box.append(el("p", {}, "Could not load the recording: " + e.message)); });
};

function TRACETOY(id, def) {
  TOY(id, Object.assign({
    color: "var(--sky)",
    wide: true,
    label: null, // the trace viewer prints its own honesty label
    html: () => "",
    init(root, ctx, opts) {
      const pick = el("div.row");
      const stage = el("div");
      const progs = def.programs.filter(([p]) => DATA.programs[p] && DATA.programs[p].traced);
      progs.forEach(([p, label], k) => pick.append(el("button.btn.small" + (k ? ".plain" : ".sky"), { type: "button", "data-hint": "Replay " + p + ".py", onclick: e => {
        $$("button", pick).forEach(b => { b.classList.remove("sky"); b.classList.add("plain"); });
        e.target.classList.add("sky"); e.target.classList.remove("plain");
        TRACE.embed(stage, p, { note: def.notes && def.notes[p] }, ctx.win, () => ctx.goalDone());
      } }, label || p)));
      root.append(pick, stage);
      const first = (opts && opts.program) || (progs[0] && progs[0][0]);
      if (first) TRACE.embed(stage, first, { note: def.notes && def.notes[first] }, ctx.win, () => ctx.goalDone());
      else root.append(el("p", {}, "No recordings yet."));
    },
  }, def));
}
