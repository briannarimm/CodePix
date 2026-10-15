# Module B: Intro to Machine Learning (lesson plan)

Status: research draft, 2026-10-14; gaps closed 2026-10-15 (library Python requirements, savefig, regression versus classification, learning rate, baselines, random forests, SVMs, backpropagation, embeddings, LLMs, semi-supervised learning). Content and accuracy first.

Unlocked by finishing Module A (A17 certificate). The reading conventions are the same as in Module A:

- **[ml-012]** style tags are fact IDs from `sources/facts.json` (look them up in `docs/source-notes.md`). A tagged sentence says no more than the fact says.
- **◇** our own explanation or analogy, uncited, no outside facts.
- **⚙** a number or output that must come from running real Python before it is shown.
- **GAP** not sourced yet; do not write book text for it.
- All data, shops, tickets and customers are fictional.

## Sources for this module

| Source | Role | Caution |
|---|---|---|
| GeeksforGeeks, *Types of machine learning* | Overview of the five types and example algorithms | Commercial site, no author shown, "all rights reserved". Every claim from it is cross-checked against an independent source below. |
| Jurafsky and Martin, 3rd edition draft of 2026-08-19, chapters 1, 3, 4, 5, 6, 7 | Modern logistic regression, neural units, embeddings, transformers, LLM history | Draft; "feel free to use the draft chapters in your classes." Paraphrase only. |
| Google, Machine Learning Crash Course and intro course (CC BY 4.0) | Definitions, loss, gradient descent, metrics, overfitting, fairness | Attribute Google. Some numbers shown on the page only as images were not used. |
| scikit-learn documentation (BSD) | Install, estimators, cross-validation, metrics, clustering, trees, neighbors, naive Bayes | Version drift: install page lists requirements only through 1.7. |
| NumPy, pandas, Matplotlib docs (BSD-style) | Tools | |
| PyPI release metadata (scikit-learn 1.9.1, NumPy 2.5.4, pandas 3.0.6, Matplotlib 3.11.2) | Which Python each library needs | Facts only. Re-read before each release of the book. |
| Dive into Deep Learning, sections 3.1, 5.3, 11.9, 15.1 (CC BY-SA 4.0) | Learning rate, backpropagation, word embeddings, pretrained transformers | ShareAlike: cite and paraphrase only. Site shows version 1.0.3. |
| Samuel (1959), Rosenblatt (1958) | History | Cite abstract and title only. |

Not used because it could not be read or verified: Turing (1950) itself (no open full text found; the B-Bonus section cites an encyclopedia entry for what it proposes). Google's crash-course pages on hyperparameters, embeddings and LLMs were opened on 2026-10-15 but could not be checked as raw text, so their facts are pending and not citable. The Dive into Deep Learning landing-page entry stays `unverified`; the four chapter entries above are verified.

## Decisions that shape this module (see research summary)

1. **Which Python.** scikit-learn's install page says version 1.7 requires Python 3.10 or newer [ml-016], but its list stops there. PyPI lists scikit-learn 1.9.1 as requiring Python 3.11 or newer, with a CPython 3.15 wheel for Apple silicon Macs [ml-108]. NumPy 2.5.4 requires Python 3.12 or newer [ml-109]; pandas 3.0.6 and Matplotlib 3.11.2 require 3.11 or newer [ml-110] [ml-111]. Python 3.9 is already end-of-life [py-010], so this module never targets it.
   - ◇ Recommendation (needs Brianna's decision): Module B asks for the current release and states a floor of 3.12, the lowest version on which all four current libraries install at their latest versions.
2. **Virtual environment first.** All installs go into a venv [ml-015], which also avoids the "externally managed" block on Homebrew Python [py-155].
3. **Split proportions.** Google says a two-way training/test split is not optimal and adds a validation set [ml-045]. GAP: no sourced rule of thumb for percentages remains, so the book teaches the three roles (train, validate, test) and gives no fixed ratio.
4. **Honesty labels.** Every number comes from running code on fictional data (⚙). Source numbers are shown only as source numbers, with the page named.
5. **Plain Python first, libraries second.** Each idea is hand-built in plain Python (lists, loops) and then repeated with scikit-learn, so the learner sees what the library does.

## Module shape

| # | Job title | One-line aim |
|---|---|---|
| B0 | Rules or Examples? | What machine learning is and the main types |
| B1 | The Machine Bench | venv, NumPy, pandas, Matplotlib, scikit-learn |
| B2 | Tables of Numbers | Features, labels, arrays, DataFrames |
| B3 | Draw the Data | Plot before you model |
| B4 | Fit a Line | Linear regression |
| B5 | Measuring Mistakes | Loss and gradient descent |
| B6 | Yes or No Machines | Classification and logistic regression |
| B7 | Train, Validate, Test | Splits, overfitting, cross-validation, leakage |
| B8 | Scorekeeping | Accuracy, precision, recall, F1, baselines |
| B9 | Neighbors, Trees and Odds | kNN, decision trees, naive Bayes |
| B10 | Finding Groups | Clustering with k-means |
| B11 | Words as Numbers | Text features, n-grams, text classification |
| B12 | Little Brains | Neural units, layers, XOR |
| B13 | Maps and Next-Word Machines | Embeddings, language models, transformers |
| B14 | Other Ways to Learn | Reinforcement, semi-supervised, self-supervised |
| B15 | Careful and Fair | Bias, harms, model cards |
| B16 | Saturday Showcase | Capstone: a model report |
| B-Bonus | Time Machine | History of learning machines |

Story frame (proposal, changeable): the shop gets a Learning Bench in the back office. Ms. Gridlock wants a "Quote Machine" that guesses what a repair will cost. Byte can run models but only learns from the examples the apprentice provides. Dr. Nib keeps asking "how do you know it works?"

---

## B0. Rules or Examples?

**Goals.** Say what ML is; tell supervised, unsupervised, reinforcement learning and generative AI apart; know features, labels and loss.

**Concept points.**
- Google defines ML as training software, called a model, to make useful predictions or generate content from data [ml-001]. Google names four types: supervised learning, unsupervised learning, reinforcement learning and generative AI [ml-002].
- In supervised learning the features are what the model uses to predict the label, and the label is the answer we want predicted [ml-005]. During training the model compares its prediction with the label, the difference is the loss, and the model gradually updates its solution [ml-006].
- Unsupervised means being given data without the correct answer and finding groupings; many unsupervised models rely on clustering [ml-003]. Reinforcement learning learns from rewards and penalties and produces a policy [ml-004].
- Handwritten rules can be fragile; the most common way to classify is supervised ML with a labeled training set and a learning algorithm [ml-012].
- GeeksforGeeks lists the same three main types plus semi-supervised and self-supervised learning [ml-007], with example algorithms for each [ml-008] [ml-009] [ml-010] [ml-011]. (Cross-checked: the three main types agree with [ml-002]; semi-supervised is covered only by this page and flagged as single-sourced.)
- ◇ Rules versus examples: a rule says "if the fan is loud, the bearing is bad"; an example set says "here are 200 fans and what was wrong with each". The helper finds the pattern.

**Toy: Rules vs Examples.** Sort fictional repair tickets by hand-written rules, then see where the rules break. JS demo, labeled as not Python.

**Quiz ideas.** Is predicting a repair cost supervised or unsupervised? (Needs labels: supervised [ml-005].)

---

## B1. The Machine Bench

**Goals.** Make a virtual environment and install the tools; check the install.

**Concept points.**
- scikit-learn's install page creates a venv with `python -m venv sklearn-env`, activates it with `source sklearn-env/bin/activate` on macOS and Linux, and runs `pip install -U scikit-learn` [ml-015]. It checks the install with `python -m pip show scikit-learn` [ml-017].
- scikit-learn 1.7 requires Python 3.10 or newer [ml-016].
- Conventional imports: `import numpy as np` [ml-018], `import pandas as pd` [ml-019]; Matplotlib is `import matplotlib.pyplot as plt` (shown in its quick start, [ml-020]).
- Reminder from Module A: a venv is isolated from the base packages [py-112]; Homebrew's Python is marked externally managed [py-155].

**On your machine.** `python3 -m venv .venv`, activate, `pip install numpy pandas matplotlib scikit-learn`, run a script that imports each and prints its version. ⚙ Confirm the exact commands against the live pages on the day of writing.

- Current releases: scikit-learn 1.9.1 needs Python 3.11 or newer [ml-108]; NumPy 2.5.4 needs 3.12 or newer [ml-109]; pandas 3.0.6 and Matplotlib 3.11.2 need 3.11 or newer [ml-110] [ml-111]. Each publishes a CPython 3.15 wheel for Apple silicon Macs.

**Open issues.** Re-read the four PyPI pages on the day the book is built; requirements move with each release.

---

## B2. Tables of Numbers

**Goals.** Turn tickets into rows of features and a label; use arrays and tables.

**Concept points.**
- A NumPy ndarray is an N-dimensional array whose elements share one type [ml-021]. `ndim`, `shape` and `size` describe it; a 3-by-4 array has shape (3, 4) and size 12 [ml-022]. Arrays have `sum`, `min`, `max`, and arithmetic with a single number applies to every element (broadcasting) [ml-023].
- A pandas DataFrame is a two-dimensional table whose columns can hold different types; a Series is one column [ml-024]. `describe()` summarizes numeric columns [ml-025].
- In scikit-learn, `fit(X, y)` takes `X` with shape `(n_samples, n_features)` [ml-026].
- Features and labels as in B0 [ml-005].

**Analogy.** A repair ticket becomes one row; each column is something we noted. ◇

**Toy: Ticket Table.** Click a ticket, see its feature row. JS demo.

**On your machine.** ⚙ Load a fictional `repairs.csv` (A11), print `describe()`, split it into `X` and `y`.

---

## B3. Draw the Data

**Concept points.**
- Matplotlib draws on a Figure that can contain Axes; Axes methods include `plot`, `scatter` and `hist` [ml-102]. The basic pattern is `fig, ax = plt.subplots()`, `ax.plot(...)`, `plt.show()` [ml-020].
- ◇ Look at the data before modeling: spot outliers, check the shape of the relationship.

**On your machine.** ⚙ Scatter plot hours against cost; histogram of ticket costs; save the image.

- `savefig` saves the current figure as an image or vector graphic file. Without a format, the format comes from the file name's extension, and `dpi` sets the resolution in dots per inch [ml-112].

**On your machine (saving).** ⚙ Save the scatter plot as `costs.png`, then open it from Finder.

---

## B4. Fit a Line

**Goals.** Understand y' = b + w x; fit it by hand; fit it with scikit-learn.

**Concept points.**
- Google's model is y' = b + w1 x1: predicted label, bias, weight, feature [ml-027]. Its car example has bias 34 and weight -4.6, so a 4,000-pound car is predicted at 15.6 miles per gallon [ml-028].
- Regression versus classification: scikit-learn's glossary calls a classifier a supervised predictor with a finite set of discrete outputs, and a regressor one with continuous outputs [ml-113]. A repair cost is continuous, so B4 is regression; "needs a part: yes or no" is classification (B6). ◇ (The examples are ours.)
- GAP: a worked line-fit example with a published answer is not available. Our own shop data replaces it. ⚙
- scikit-learn's `LinearRegression` minimizes the residual sum of squares [ml-032].
- ◇ Our own shop data replaces the book examples. ⚙ All numbers come from running the code.

**Analogy.** A ruler laid across a scatter of dots. ◇

**Toy: Line Fitter.** Drag a line, watch the errors. JS demo.

**On your machine.** ⚙ Fit by hand with the slope formula, then with `LinearRegression`; compare `coef_` and `intercept_`; predict a new ticket.

---

## B5. Measuring Mistakes

**Concept points.**
- Gradient descent repeats: compute the loss, decide which direction lowers it, move the weight and bias a small amount, repeat until the loss stops improving [ml-033]. In Google's worked example the loss (MSE) is 303.71 at iteration 1 and 42.17 after six iterations [ml-034]. A model has converged when more iterations no longer reduce the loss meaningfully, and linear models have a convex loss surface [ml-035].
- The step size is the learning rate. Dive into Deep Learning multiplies the gradient by a small positive value called the learning rate [ml-114]. scikit-learn says the learning rate controls the step size and can stay constant or slowly decay [ml-115].
- Settings like the learning rate, which training does not update, are hyperparameters [ml-114]. scikit-learn passes them to an estimator's constructor and suggests searching for the best cross validation score [ml-116].
- ◇ Toy idea: rerun Downhill with a tiny, a good and a too-large step. ⚙ Record the real loss values.
- Pending: Google's hyperparameters page says the same in its own words (mlcc-hyperparameters); it is not citable until checked as raw text.

**Analogy.** Walking downhill in fog by feeling the slope. ◇

**Toy: Downhill.** A ball rolls down a loss curve (JS demo of the idea).

**On your machine.** ⚙ Write gradient descent in plain Python on a tiny fictional data set and print loss each step; compare with scikit-learn.

---

## B6. Yes or No Machines

**Concept points.**
- Logistic regression learns a weight per feature plus a bias term, and passes the weighted sum through the sigmoid (the logistic function) [ml-040].
- Google: first z = b + w1x1 + ... + wnxn, then the sigmoid y' = 1 / (1 + e^-z) [ml-037]. Table values: z = -2 gives 0.119, z = 0 gives 0.50, z = 1 gives 0.731, z = 2 gives 0.881 [ml-038]. ⚙ Recomputed.
- At test time the classifier computes a probability for each class and returns the higher-probability label [ml-039].
- scikit-learn says `LogisticRegression` is implemented as a classifier despite its name [ml-042].

**Analogy.** A dimmer switch that squeezes any score into a 0 to 1 probability. ◇

**Toy: Sigmoid Dial.** Slide z; see the probability. JS demo.

**On your machine.** ⚙ Classify "needs a new part: yes/no" from fictional tickets; print probabilities.

---

## B7. Train, Validate, Test

**Concept points.**
- Google: two-way splits are not optimal, so add a validation set [ml-045]; reusing a test set makes the model fit it [ml-046].
- scikit-learn says to hold out part of the data as a test set, with `train_test_split(X, y, test_size=0.4, random_state=0)` in its example [ml-103].
- Overfitting is a model that memorizes the training set so closely that it fails on new data; causes include an overly complex model [ml-047]. Evaluating on training data is a methodological mistake [ml-048].
- k-fold cross-validation trains on k-1 parts, validates on the last, and averages [ml-049]; `cross_validate` defaults to 5 folds [ml-104].
- Preprocessing such as scaling should be learnt from the training set only; a Pipeline helps [ml-050]. (This is data leakage; the book names it.)
- scikit-learn's example: a degree-1 polynomial underfits, degree 4 fits well, degree 15 overfits [ml-051]. n-gram models show the same effect: a 4-gram model trained on Shakespeare reproduces a line from *King John* [ml-053].

**Analogy.** A student who memorizes last year's test. ◇

**Toy: Overfit Lab.** Raise the polynomial degree and watch train and test error diverge. ⚙ error values from real runs.

**On your machine.** ⚙ Repeat the degrees experiment on fictional data; run 5-fold cross-validation.

---

## B8. Scorekeeping

**Concept points.**
- Accuracy is (TP+TN)/(TP+TN+FP+FN); recall is TP/(TP+FN); precision is TP/(TP+FP) [ml-054].
- When one class is rare accuracy misleads: Google's 1%-positives example scores 99% by always predicting negative [ml-055]; J&M's pie-tweet example reaches 99.99% while finding nothing [ml-056]. ⚙ Recomputed.
- J&M define precision and recall as above in words [ml-057]. In a three-class example, macroaveraged precision is .60 and microaveraged .73; microaveraging is dominated by the frequent class [ml-058]. ⚙ Recomputed.
- scikit-learn's confusion matrix entry (i, j) counts observations actually in group i but predicted in group j; for two classes `ravel()` gives tn, fp, fn, tp [ml-059]. Precision, recall and the F-measure (weighted harmonic mean) [ml-060]; its example prints F1 as 0.66..., the truncated form of 2/3 [ml-061]. ⚙
- The F-measure is a weighted harmonic mean of precision and recall (see above, [ml-060]).
- Baselines: scikit-learn calls comparing your model with simple rules of thumb a sanity check. Its `DummyClassifier` with the `most_frequent` strategy always predicts the most frequent training label and ignores the input [ml-118].
- People as a yardstick: Cowley and colleagues say comparisons between algorithm and human performance provide a baseline for evaluating the algorithm, and that a fair human study is hard to design [ml-190]. Their principles: the same task, matched trials, attention to how human and algorithm cognition differ, and good psychology-study practice [ml-191].
- GAP: human performance as a ceiling (an upper bound) is not sourced.

**Analogy.** A smoke alarm: catching every fire (recall) versus never crying wolf (precision). ◇

**Toy: Confusion Board.** Drag cases between boxes; metrics update. JS demo.

**On your machine.** ⚙ Build a confusion matrix in plain Python; compare with scikit-learn; compute a majority-class baseline.

---

## B9. Neighbors, Trees and Odds

**Concept points.**
- k-nearest neighbors stores the training data and gives a query point the class of the majority of its k nearest neighbors; the best k is highly data-dependent [ml-064].
- Decision trees learn if-then-else rules, are simple to interpret and can be visualized, but can overfit; `max_depth` and `min_samples_leaf` limit size [ml-065]; `export_text` prints the rules [ml-066].
- Naive Bayes uses Bayes' theorem with a naive independence assumption [ml-067]; it works well for document classification and spam filtering but its probabilities should not be trusted [ml-068].
- Ensembles combine the predictions of several base estimators to be more robust than one; gradient-boosted trees and random forests are famous examples [ml-119].
- In a random forest each tree trains on a bootstrap sample (drawn with replacement), and each tree considers a random subset of the features [ml-120]. Single trees tend to overfit; averaging many different trees lets some errors cancel out. scikit-learn averages the trees' probabilities instead of taking a vote [ml-121].
- Support vector machines are supervised methods for classification, regression and outlier detection. Their decision function uses a subset of training points called support vectors [ml-122]. Intuitively, the best separating line (a hyperplane) has the largest distance to the nearest training points of any class [ml-123]. SVMs do not directly give probabilities [ml-124].
- ◇ Toy idea: Three Judges grows to five, with a forest and an SVM. ⚙

**Toy: Three Judges.** The same ticket goes to three models; compare answers. ⚙

---

## B10. Finding Groups

**Concept points.**
- Clustering works on unlabeled data [ml-074]; Google calls it the main technique of unsupervised learning [ml-003].
- K-means separates samples into groups by minimizing inertia and needs the number of clusters in advance [ml-071]; it can land in a local minimum that depends on the starting centroids, and k-means++ starting points help [ml-072]; it assumes convex, isotropic clusters [ml-073].
- GeeksforGeeks also names DBSCAN, mean-shift and PCA [ml-009].

**Analogy.** Sorting a mixed bin of screws into piles by eye. ◇

**Toy: Pile Maker.** Watch centroids move step by step. ⚙ (recorded from a real k-means run)

---

## B11. Words as Numbers

**Concept points.**
- Features for text: sentiment words such as awesome and love are informative features [ml-080]. GAP: bag-of-words and collocational features no longer have a source.
- An n-gram model approximates a word's probability from the last few words [ml-088]. ⚙ A worked bigram example uses our own fictional repair notes.
- GAP: why unseen n-grams need smoothing, and add-one smoothing, have no source now. scikit-learn says alpha = 1 in MultinomialNB is Laplace smoothing [ml-079].
- scikit-learn's MultinomialNB takes word-count vectors; alpha = 1 is Laplace smoothing [ml-079].

**Toy: Word Counter.** Count words in fictional repair notes and build a spam filter. ⚙

---

## B12. Little Brains

**Concept points.**
- A neural unit is a weighted sum of inputs plus a bias, passed through a non-linear activation such as sigmoid, tanh or ReLU [ml-082]. J&M's worked unit gives z = 0.87 and output about .70 [ml-083]. ⚙ Recomputed. ReLU is max(z, 0) [ml-085].
- Google: hidden-layer nodes are neurons; a network of only linear nodes cannot learn nonlinearities [ml-081].
- A single perceptron cannot compute XOR because XOR is not linearly separable [ml-084].
- In language-model pretraining the parameters are trained via error backpropagation with gradient descent [ml-107]; backpropagation became widespread with Rumelhart et al. (1986) [ml-093]. Backpropagation calculates the gradient of a network's parameters by working backward, from the output layer to the input layer, using the chain rule from calculus [ml-125]. That is one reason training needs much more memory than prediction [ml-126]. scikit-learn's multi-layer perceptron uses a form of gradient descent with gradients from backpropagation [ml-127].
- ◇ The book shows the backward pass as arrows on Wire a Brain, with no calculus required.

**Toy: Wire a Brain.** Build AND and OR from one unit; fail at XOR; solve with two layers. JS demo, labeled as not Python.

---

## B13. Maps and Next-Word Machines

**Concept points.**
- Word meaning as points in space: sweet sits near honey, juice and candy but far from fried and soup [ml-086].
- A language model predicts the next word from previous words; an LLM is a structured neural network that represents tokens as vectors [ml-087].
- The transformer chapter covers attention, transformer blocks, token and position embeddings, the language modeling head and decoding [ml-090]; decoding choices include greedy decoding, random sampling, temperature sampling and top-k and top-p sampling [ml-091].
- Pretraining is self-supervised because the text supplies its own labels [ml-013]. GeeksforGeeks gives BERT and GPT as examples [ml-011].
- Dates: n-gram language models from Jelinek's IBM group, 1975 to 1985 [ml-089]; transformer 2017 and prompting 2019 [ml-092].
- Word vectors are vectors that represent words, and mapping words to real vectors is called word embedding [ml-128]. One-hot vectors cannot show that two words are similar: the cosine similarity of the one-hot vectors of two different words is 0. Cosine similarity is the cosine of the angle between two vectors [ml-129].
- Transformers come in encoder-only, encoder-decoder and decoder-only forms. Decoder-only transformers are the de facto architecture for large language models, which learn from unlabeled text through self-supervised learning [ml-130].
- In GPT-style pretraining the target is the input shifted by one token [ml-131]. ◇ That is next-word prediction, the same game as the n-gram toy.
- In-context learning: a pretrained model produces a task's output from a description, examples and a prompt, with no parameter update. It comes in zero-shot, one-shot and few-shot forms [ml-132].
- Pending: Google's embeddings and LLM pages (mlcc-embeddings, mlcc-llm) are researched but not citable until checked as raw text. GAP: attention mechanics.

**Toy: Next Word.** Predict the next word from counts, then from a tiny model. ⚙

---

## B14. Other Ways to Learn

**Concept points.**
- Reinforcement learning: rewards and penalties, producing a policy [ml-004]; GeeksforGeeks lists Q-learning and SARSA [ml-010].
- Semi-supervised learning means some training samples have no label; scikit-learn's estimators use the unlabeled data to capture the shape of the data better, and can do well with very few labeled and many unlabeled points [ml-135]. They mark an unlabeled point with -1 in `y` [ml-136]. GeeksforGeeks lists it too [ml-007].
- Self-supervised: [ml-011] and [ml-013]; large language models learn this way [ml-130].

---

## B15. Careful and Fair

**Concept points.**
- Google's fairness module defines reporting, historical, automation, selection (coverage, non-response, sampling), group attribution, implicit and confirmation bias [ml-099].
- J&M say ML systems can replicate and even amplify the biases in their training data, and recommend documenting a model with a model card [ml-100]. They cite a study of 200 sentiment systems in which most gave lower sentiment to African American first names [ml-101].
- Test-set reuse and leakage [ml-046] [ml-050] are fairness-of-evaluation problems too.
- Nyamawe and colleagues' open beginner textbook emphasizes integrating responsible and explainable AI into models as a priority instead of an afterthought [ml-188].

**Toy: Bias Spotter.** Fictional datasets with built-in problems; find them. ⚙

---

## B16. Saturday Showcase (capstone)

Build a "Quote Machine": load fictional repair tickets, split properly [ml-103], fit a model, compare to a baseline (our own teaching), report metrics [ml-054] [ml-060], and write a short model card listing data, intended use and limits [ml-100]. Run its tests.

---

## B-Bonus. Time machine (history)

- 1950: Turing's paper in Mind [ml-189]. He sets aside whether machines can think as too meaningless to discuss and asks whether a digital computer can do well in a game [ml-192]: an interrogator must tell the hidden person from the hidden machine [ml-193]. His prediction about fifty years ahead [ml-194].
- 1958: Rosenblatt's article on the perceptron [ml-098].
- 1959: Samuel reports a computer learning to play checkers better than its programmer, in about 8 or 10 hours of play [ml-097].
- 1975 to 1985: Jelinek's group at IBM develops n-gram language models and coins the term [ml-089].
- 1986: backpropagation widespread [ml-093]. 2017: transformer. 2019: prompting [ml-092].

All dates and claims come from the cited facts; nothing else goes on the timeline.

## Cross-cutting pages

- **Glossary:** model, feature, label, loss [ml-001] [ml-005] [ml-006]; overfitting [ml-047]; precision, recall [ml-057]; centroid and inertia [ml-071]; language model [ml-087]; classifier and regressor [ml-113]; learning rate and hyperparameter [ml-114]; backpropagation [ml-125]; word embedding [ml-128]; support vectors [ml-122].
- **Cheat sheet:** formulas from [ml-054] [ml-037] [ml-060].

## Exercise and trace rules

- Python: the current release, with the floor set by the libraries' PyPI requirements [ml-108] [ml-109]; all outputs from real runs; seeds fixed, and the book says seeds may give different numbers on another Python version [py-122].
- scikit-learn version printed in every exercise so differences are visible.
- All data fictional and generated or hand-written in `content/`.
