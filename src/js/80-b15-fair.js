/* B15. Careful and Fair: bias, harms, fairness metrics, model cards. Toy: fairness (Fair Share). */

PAGES("b15", [
  {
    h: "Who gets the mistakes?",
    body: [
      "The Quote Machine flags big jobs so Ms. Gridlock can quote them carefully. A wrong flag costs somebody: a customer who gets a surprise bill, or a small job that sits in the wrong queue. So the question is whose tickets the mistakes land on.",
      "Jurafsky and Martin say machine learning systems can replicate and even amplify the biases in their training data [ml-100]. Google warns that metrics calculated on a whole test or validation set don't always give an accurate picture, because great performance overall can mask poor performance on a minority subset of examples [ml-183]. You have to look group by group.",
      "Here are twenty fictional tickets. Each one records how the customer booked, the real answer and the model's guess.",
      { code: "b15_rates", out: true },
      { trace: "b15_rates", label: "🔍 Watch the program sort the tickets by group" },
      { analogy: "An average is a pile of parts weighed all at once. The scale says the pile is fine. Sort the pile into bins and weigh each bin, and one bin turns out to be mostly broken parts." },
      "The overall number looks fine. Split by group, phone bookings get far more wrong answers than online bookings. And there are only four phone tickets, so even this split rests on very little evidence.",
      { honest: "All tickets, groups and guesses on this page are fictional." },
    ],
  },
  {
    h: "Where bias comes from",
    body: [
      "A model can pick up the biases in its training data, long before anyone reads its output [ml-100]. Google's fairness module defines a list of bias types [ml-099]. Here is each one, with a fictional Gadget Gulch example of our own after it.",
      { ul: [
        "**Reporting bias:** how often events, properties or outcomes appear in a dataset does not accurately reflect their real-world frequency [ml-176]. *At the shop:* customers mostly write in when a repair goes wrong, so the inbox makes failures look common.",
        "**Historical bias:** historical data reflects inequities that existed in the world at that time [ml-177]. *At the shop:* ten years of old quotes that charged phone customers extra teach the model to do the same.",
        "**Automation bias:** a tendency to favor results from automated systems over non-automated ones, whatever the error rates of each [ml-178]. *At the shop:* trusting the Quote Machine over Ms. Gridlock on the jobs where she is right more often.",
        "**Selection bias:** a dataset's examples are chosen in a way that does not reflect their real-world distribution. Coverage bias means data not selected in a representative way. Non-response (participation) bias means gaps in who took part. Sampling bias means no proper randomization [ml-179]. *At the shop:* training only on online bookings, only on customers who answered the feedback form, or only on Monday's tickets.",
        "**Group attribution bias:** generalizing what is true of individuals to their whole group. In-group bias prefers members of your own group; out-group homogeneity bias stereotypes members of a group you do not belong to, or sees them as more alike [ml-180]. *At the shop:* one phone customer exaggerated a fault, so every phone customer gets doubted.",
        "**Implicit bias:** assumptions that come from your own way of thinking and personal experience, which don't necessarily apply more generally [ml-181]. *At the shop:* your own kettle's fault was the lid, so you label every kettle note *lid*.",
        "**Confirmation bias:** model builders unconsciously process data in ways that affirm what they already believe. Its cousin, experimenter's bias, is training until the result matches the original hypothesis [ml-182]. *At the shop:* retraining until the model agrees that phone jobs are small, because you were sure they were.",
      ] },
      "Real systems show these problems at scale. Jurafsky and Martin describe a study of 200 sentiment analysis systems. The researchers ran sentence pairs that differed only in a first name, either African American or European American. Most systems assigned lower sentiment to the African American names [ml-101].",
      "That is a harm to real people, measured in real systems. It is why we check results group by group, and why we write down what a model was tested on.",
    ],
  },
  {
    h: "A model that learned the wrong lesson",
    body: [
      "Here is how it can happen at Gadget Gulch. Online bookings and phone bookings follow different patterns in this fictional data: for online bookings, a job is big after about 5 hours; for phone bookings, after about 2. The training data holds 180 online bookings and only 20 phone bookings.",
      { code: "b15_groups", out: true },
      "The model learned the online pattern, because that is almost all it saw. Then it was scored on fresh tickets from each group, and the phone bookings did much worse.",
      "If the real shop gets far more phone bookings than this training data shows, that is [[selection bias]]: examples chosen in a way that does not reflect their real-world distribution [ml-179].",
      { honest: "The data is generated by the program and is fictional. The two patterns were chosen to make the problem easy to see." },
      { toy: "fairness", label: "Try it: Fair Share" },
    ],
  },
  {
    h: "Two ways to measure fairness",
    body: [
      "Splitting the error rate by group is one check. Google explains two fairness metrics as well. We borrow the ideas for a fictional rush queue: which repair tickets jump the line. Here the preferred outcome is *rushed*, and the tickets that deserve it are the *urgent* ones.",
      "**[[Demographic parity]].** In Google's admissions example, the predictions show demographic parity if the admission rates for the two groups are equal, so a student's chance of admission doesn't vary by group [ml-184]. At the shop: online and phone tickets get rushed at the same rate.",
      "**[[Equality of opportunity]].** A model shows equality of opportunity if qualified members of each group have an equal chance of acceptance, whichever group they belong to. The ratio of positive to negative predictions may still differ between groups [ml-186]. At the shop: an urgent phone ticket is as likely to be rushed as an urgent online ticket.",
      "This program checks two fictional models on the same sixteen tickets. Online bookings have four urgent tickets out of eight; phone bookings have two.",
      { code: "b15_parity", out: true },
      { trace: "b15_parity", label: "🔍 Watch both checks run" },
      "Model A rushes half of each group, so it passes demographic parity. Look closer: it rushes only half the urgent phone tickets, while three phone tickets that were not urgent jump the line. It fails equality of opportunity.",
      "Model B rushes every urgent ticket in both groups, so it passes equality of opportunity. Its rush rates differ, 50% and 25%, because the phone group has fewer urgent tickets. It fails demographic parity.",
      "Each metric has a catch. Google says demographic parity has a significant drawback: it does not take the distribution of predictions into account, so it may not be the best metric for evaluating fairness [ml-185]. Model A is our own example of equal rates with a problem underneath.",
      "Google notes two drawbacks of equality of opportunity. It needs a clear-cut preferred label, and it compares error rates in aggregate for demographic groups, which may not always be feasible [ml-187]. *Urgent* is clear enough at the shop. *A good customer* would not be.",
      { analogy: "Two inspectors at the shop door. One counts how many tickets from each line get waved through. The other only asks whether the urgent tickets from each line got waved through. They can look at the same morning and disagree." },
      { honest: "All tickets and both models are fictional. Here the two metrics disagree about the same models, so checking only one of them would miss something." },
    ],
  },
  {
    h: "Write it down: model cards",
    body: [
      "Jurafsky and Martin recommend documenting a model with a [[model card]] [ml-100]. A model card is a short, honest note that travels with the model.",
      "The Saturday Showcase asks you to write one. Our own outline has these parts:",
      { ul: [
        "**Data:** where the examples came from, how many, and who is missing.",
        "**Intended use:** what the model is for, and who checks its output.",
        "**Limits:** where it should not be trusted.",
        "**Results by group:** the error rate for each group you can measure, not only the average.",
      ] },
      "Careful evaluation is part of fairness too. Google warns that the more often you reuse the same test set, the more likely the model fits that test set [ml-046]. scikit-learn says preprocessing should be learnt from the training set and only applied to held-out data [ml-050]. A model that peeked at its test can look fair on paper.",
      "Plan for this from the first day of a project. Write the model card's sections and pick the groups you will measure before you train anything.",
      { analogy: "Safety checks belong in the repair plan, written before the first screw comes out. Bolted on at the end, they tend to get skipped." },
      { machine: ["b15-rates"], label: "Go to your machine: mistakes by group" },
    ],
  },
]);

GLOSS({
  fairness: "In Code Pix: checking whether a model's mistakes and harms fall harder on some groups than others. (Our own wording.) Google's course has a fairness module. [ml-099]",
  "bias (in data)": "A skew in the data or in how it was collected, which a model can replicate and even amplify. [ml-100] Google's fairness module lists types such as historical, selection and reporting bias. [ml-099]",
  "selection bias": "A dataset's examples are chosen in a way that does not reflect their real-world distribution. Coverage, non-response and sampling bias are kinds of it. [ml-179]",
  "demographic parity": "In Google's admissions example: the admission rates for the groups are equal, so a person's chance doesn't vary by group. [ml-184] It does not take the distribution of predictions into account. [ml-185]",
  "equality of opportunity": "Qualified members of each group have an equal chance of acceptance. It needs a clear-cut preferred label. [ml-186] [ml-187]",
  "model card": "A short document that describes a model. Jurafsky and Martin recommend documenting a model with one. [ml-100]",
}, "b15");

/* Toy: Fair Share. Fictional scores for two groups of tickets; one threshold for everyone. */
const B15_TICKETS = {
  online: [[92, 1], [85, 1], [77, 1], [70, 1], [64, 1], [58, 0], [52, 0], [45, 0], [38, 0], [30, 0], [22, 0], [15, 0]],
  phone: [[62, 1], [55, 1], [52, 1], [48, 1], [40, 1], [45, 0], [36, 0], [31, 0], [25, 0], [19, 0], [12, 0], [6, 0]],
};
TOY("fairness", {
  title: "Fair Share", level: "b15", color: "var(--pink)",
  short: "One cutoff, two groups. Who gets the mistakes?",
  goal: "Find a cutoff where the two groups' error rates are within 10 points of each other.",
  label: "A JavaScript demo of the idea, not Python code. All tickets and scores are fictional.",
  html: () => `<p>The model gives each ticket a score. Tickets at or above the cutoff are flagged as big jobs. A filled dot is really a big job; a ✗ marks a mistake.</p>
    <label class="fs-cut">Cutoff: <b></b><input type="range" min="10" max="95" step="1" value="60" data-hint="Move the cutoff: tickets scoring at or above it are flagged as big"></label>
    <div class="fs-groups"></div>
    <p class="readout fs-sum" aria-live="polite"></p>`,
  init(root, ctx) {
    const slider = $("input", root), groups = $(".fs-groups", root), sum = $(".fs-sum", root);
    function draw() {
      const cut = +slider.value;
      $("b", $(".fs-cut", root)).textContent = cut;
      groups.innerHTML = "";
      const rate = {};
      let wrongAll = 0, nAll = 0;
      Object.entries(B15_TICKETS).forEach(([g, list]) => {
        let wrong = 0, s = A.rect(0, 0, 600, 64, "#fffdf6", { sw: 0 });
        s += A.line(10, 42, 590, 42, { sw: 2, stroke: "#9aa3ad" });
        const cx = v => 15 + v * 5.7;
        s += A.line(cx(cut), 6, cx(cut), 60, { stroke: "#ff6fae", sw: 4 });
        list.forEach(([score, big]) => {
          const flag = score >= cut ? 1 : 0, bad = flag !== big;
          if (bad) wrong++;
          s += A.circ(cx(score), 42, 7, big ? "#141414" : "#fff", { sw: 3 });
          if (bad) s += A.text(cx(score), 24, "✗", { size: 16, fill: "#c23a7a", font: "Comic Neue, sans-serif" });
        });
        rate[g] = wrong / list.length; wrongAll += wrong; nAll += list.length;
        groups.append(el("div.panel.fs-group", {}, el("p.fs-title", {}, `${g} bookings: ${wrong} of ${list.length} wrong (${Math.round(rate[g] * 100)}%)`),
          el("div", { html: A.svg("0 0 600 64", s, "", `${g} bookings: ${list.length} tickets on a score line, with the cutoff at ${cut}`) })));
      });
      const gap = Math.abs(rate.online - rate.phone) * 100;
      sum.textContent = `All tickets: ${wrongAll} of ${nAll} wrong (${Math.round(wrongAll / nAll * 100)}%). Gap between groups: ${Math.round(gap)} points.`;
      if (gap <= 10) ctx.goalDone("The gap is small at this cutoff. Compare the overall error with the one at 60: the mistakes are shared differently.");
    }
    slider.addEventListener("input", draw);
    draw();
  },
});

LEVEL({
  id: "b15", title: "Careful and Fair", job: "A customer says the Quote Machine is unfair.",
  color: "#ff6fae", scene: "bench", cast: ["gridlock"], toy: "fairness",
  sticker: { title: "Fair Shake", glyph: "⚖", color: "#ff6fae" },
  goals: ["Split a model's errors by group", "Name the sources of bias and two fairness checks", "Know what a model card is for"],
  beats: [
    say("gridlock", "A customer phoned in, furious. The Quote Machine called their toaster repair a small job, and it was not. They say it never gets phone bookings right.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Then we check, group by group. Jurafsky and Martin warn that machine learning systems can replicate and even amplify the biases in their training data [ml-100].") },
    say("nib", "One overall score can hide a lot. Google warns that great performance overall can mask poor performance on a minority subset [ml-183]. Let's sort the tickets by how the customer booked.", "think"),
    { predict: { program: "b15_rates", q: "Twenty fictional tickets, sixteen online and four by phone. What error rates do you expect overall, online, and by phone?", choices: ["all tickets: 15% wrong\nonline (16 tickets): 6% wrong\nphone  ( 4 tickets): 50% wrong", "all tickets: 15% wrong\nonline (16 tickets): 15% wrong\nphone  ( 4 tickets): 15% wrong", "all tickets: 50% wrong\nonline (16 tickets): 6% wrong\nphone  ( 4 tickets): 50% wrong"], answer: 0,
      why: "Three wrong out of twenty is 15%, but two of those three are phone tickets." } },
    { show: ["gridlock", "nib", "byte"], ...say("byte", "BEEP. Overall I am 85% right. But on phone bookings I am a coin toss. I would like to apologize to the toaster.", "wow") },
    { ask: { q: "Why is the 50% figure for phone bookings shaky evidence on its own?", choices: ["Because phone bookings are less important", "Because it rests on only four tickets", "Because 50% is always a coincidence"], answer: 1,
      why: "With four tickets, one more right or wrong answer moves the rate by 25 points. The fix is more phone data, and that is a data problem." } },
    say("nib", "Where does this come from? Usually the data. Google's fairness module defines a whole family of bias types: reporting, historical, automation, selection and more [ml-099]."),
    { ask: { q: "The shop trains its model only on customers who filled in the feedback form. Which bias is that?", choices: ["Non-response bias, a kind of selection bias", "Automation bias", "Confirmation bias"], answer: 0,
      why: "Non-response (participation) bias means gaps in who took part in the data collection. Google files it under selection bias [ml-179]." } },
    say("nib", "Here, phone bookings are rare in our training data and follow a different pattern. The model learns the common pattern and gets the rare one wrong.", "think"),
    { predict: { program: "b15_groups", q: "The model trains on 180 online bookings and 20 phone bookings with a different pattern. Which group scores better on new tickets?" } },
    { toy: "fairness", goal: "Find a cutoff where the two groups' error rates are within 10 points of each other." },
    { ask: { q: "In Fair Share, the cutoff of 60 and the cutoff of 50 make the same number of mistakes overall. What changes?", choices: ["Nothing important", "Which group the mistakes fall on", "The real answers"], answer: 1,
      why: "The total stays the same, but at 60 the phone bookings take all four mistakes. At 50 the groups share them. The average alone hides that." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "This is serious, then. A toaster today, a real person's bill tomorrow.") },
    say("nib", "It is. Jurafsky and Martin describe a study of 200 sentiment systems where most rated sentences lower when they held an African American first name [ml-101]. That is why we check.", "think"),
    say("nib", "Fairness can also be measured. Google describes [[demographic parity]]: equal acceptance rates across groups [ml-184]. And [[equality of opportunity]]: qualified members of each group get an equal chance [ml-186]."),
    { predict: { program: "b15_parity", q: "Two fictional models pick tickets for the rush queue. Which one gives online and phone tickets the same rush rate? Which one rushes every urgent ticket?" } },
    { ask: { q: "Model B rushes every urgent ticket in both groups, but rushes 50% of online and 25% of phone tickets. Which check does it pass?", choices: ["Equality of opportunity", "Demographic parity", "Both"], answer: 0,
      why: "Qualified members of each group get an equal chance, and the ratio of positive predictions may still differ between groups [ml-186]." } },
    say("nib", "So we write things down. Jurafsky and Martin recommend documenting a model with a [[model card]] [ml-100]: what data it saw, what it is for, and where it fails."),
    { ask: { q: "Which line belongs in the Quote Machine's model card?", choices: ["Works for everyone", "Trained on few phone bookings; check phone quotes by hand", "Accuracy: very good"], answer: 1,
      why: "A useful card names a specific limit and says what to do about it." } },
    { book: 1, text: "The book has the whole chapter: each of Google's bias types, the two fairness checks, and an outline for a model card." },
    say("gridlock", "Good. Before the Showcase, I want proof you can count mistakes by group on your own machine.", "think"),
    { machine: ["b15-rates"] },
    say("byte", "Phone customers, I see you now. BEEP BOOP."),
    { sticker: true },
  ],
});
