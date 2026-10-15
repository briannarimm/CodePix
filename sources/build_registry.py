#!/usr/bin/env python3
"""Writes sources/registry.json from the compact table below.

Edit the table, run `python3 sources/build_registry.py`, then `python3 tools/verify_facts.py`.
Every source here was opened and read on the access date. Status values: verified, unverified, rejected.
"""
import json, pathlib

ACC = "2026-10-14"
CC4 = ("CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/")
NCSA4 = ("CC BY-NC-SA 4.0", "https://creativecommons.org/licenses/by-nc-sa/4.0/")
NCSA3 = ("CC BY-NC-SA 3.0", "https://creativecommons.org/licenses/by-nc-sa/3.0/")
PSF = ("PSF License Version 2 (text); Zero-Clause BSD (code examples)", "https://docs.python.org/3/license.html")
BSD3 = ("BSD 3-Clause", "https://opensource.org/license/bsd-3-clause")
PD = ("Public domain / CC0 1.0", "https://creativecommons.org/publicdomain/zero/1.0/")

S = []
def add(id, title, author, site, date, url, lic, reuse, levels, apa_tail=None, status="verified", notes="", **extra):
    licname, licurl = lic
    cite_author = author.split(",")[0] if author and not author.startswith("Python Software") else author
    s = dict(id=id, status=status, title=title, author=author, site=site, date=date, url=url,
             license=licname, licenseUrl=licurl, reuse=reuse, accessed=ACC, levels=levels, notes=notes)
    s.update(extra)
    S.append(s)

DOCS_REUSE = "Cite and paraphrase. Write our own examples and run them."
# ---------------- Python module (levels 0-18; -1 = site-wide) ----------------
add("py-downloads","Download Python","Python Software Foundation","Python.org","n.d.","https://www.python.org/downloads/",("Python is open source; no page license shown",""),"Facts only (version number, date).",[1],notes="Shows Python 3.15.0 dated Oct. 9, 2026 as the latest release when read.")
add("py-devguide-versions","Status of Python versions","Python Software Foundation","Python Developer's Guide","n.d.","https://devguide.python.org/versions/",("No license shown",""),"Facts only (support table).",[1],notes="Table lists 3.9 end-of-life 2025-10-31 and 3.10 end-of-life 2026-10-01. The page's own chart and table disagree about 3.15, so only the 3.9 and 3.10 rows are used.")
add("py-docs-mac","Using Python on macOS","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/using/mac.html",PSF,DOCS_REUSE,[1])
add("py-docs-windows","Using Python on Windows","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/using/windows.html",PSF,DOCS_REUSE,[1])
add("py-docs-unix","Using Python on Unix platforms","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/using/unix.html",PSF,DOCS_REUSE,[1])
add("py-docs-tutorial-intro","An informal introduction to Python","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/introduction.html",PSF,DOCS_REUSE,[1,3,4,7])
add("py-docs-tutorial-controlflow","More control flow tools","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/controlflow.html",PSF,DOCS_REUSE,[5,6,9,12])
add("py-docs-tutorial-datastructures","Data structures","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/datastructures.html",PSF,DOCS_REUSE,[5,7,8,12])
add("py-docs-tutorial-errors","Errors and exceptions","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/errors.html",PSF,DOCS_REUSE,[10])
add("py-docs-tutorial-classes","Classes","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/classes.html",PSF,DOCS_REUSE,[3,14])
add("py-docs-tutorial-io","Input and output","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/inputoutput.html",PSF,DOCS_REUSE,[4,11,13])
add("py-docs-glossary","Glossary","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/glossary.html",PSF,DOCS_REUSE,[0,1,3,9,12,13])
add("py-docs-unicode-howto","Unicode HOWTO","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/howto/unicode.html",PSF,DOCS_REUSE,[2])
add("py-docs-functions","Built-in functions","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/functions.html",PSF,DOCS_REUSE,[2,3,4,6,7,12])
add("py39-docs-functions","Built-in functions (Python 3.9)","Python Software Foundation","Python 3.9 documentation","n.d.","https://docs.python.org/3.9/library/functions.html",PSF,DOCS_REUSE,[11])
add("py-docs-stdtypes","Built-in types","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/stdtypes.html",PSF,DOCS_REUSE,[4,11])
add("py-docs-csv","csv: CSV file reading and writing","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/csv.html",PSF,DOCS_REUSE,[11])
add("py-docs-math","math: Mathematical functions","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/math.html",PSF,DOCS_REUSE,[13])
add("py-docs-datetime","datetime: Basic date and time types","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/datetime.html",PSF,DOCS_REUSE,[13])
add("py-docs-unittest","unittest: Unit testing framework","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/unittest.html",PSF,DOCS_REUSE,[10])
add("py-docs-turtle","turtle: Turtle graphics","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/turtle.html",PSF,DOCS_REUSE,[6])
add("py-docs-venv","venv: Creation of virtual environments","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/venv.html",PSF,DOCS_REUSE,[13])
add("py-docs-random","random: Generate pseudo-random numbers","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/random.html",PSF,DOCS_REUSE,[13])
add("py-docs-timeit","timeit: Measure execution time of small code snippets","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/timeit.html",PSF,DOCS_REUSE,[15])
add("py-docs-history","History and license","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/license.html#history-of-the-software",PSF,DOCS_REUSE,[-1])
add("pep-668","PEP 668: Marking Python base environments as \"externally managed\"","Thomas, G., Klose, M., Laíns, F., Stufft, D., Chung, T., Rivera, S., Hashman, E., & Gedam, P.","Python Enhancement Proposals","2021","https://peps.python.org/pep-0668/",PD,"Public domain or CC0; may paraphrase freely.",[1,13])
add("pep-20","PEP 20: The Zen of Python","Peters, T.","Python Enhancement Proposals","2004","https://peps.python.org/pep-0020/",PD,"Public domain.",[-1])
add("pypa-venv-guide","Installing packages using pip and virtual environments","Python Packaging Authority","Python Packaging User Guide","n.d.","https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/",("No license shown on page",""),"Cite and paraphrase.",[13])
add("pytest-start","Get started","pytest development team","pytest documentation","n.d.","https://docs.pytest.org/en/stable/getting-started.html",("MIT (project license)","https://github.com/pytest-dev/pytest/blob/main/LICENSE"),"Cite and paraphrase.",[13])
add("brew-installation","Installation","Homebrew","Homebrew Documentation","n.d.","https://docs.brew.sh/Installation",("No license text on page",""),"Cite and paraphrase.",[1])
add("brew-homepage","Homebrew: The missing package manager for macOS (or Linux)","Homebrew","Homebrew","n.d.","https://brew.sh/",("No license text on page",""),"Command text only.",[1])
add("brew-python314","python@3.14 formula","Homebrew","Homebrew Formulae","n.d.","https://formulae.brew.sh/formula/python@3.14",("Python-2.0 (formula's stated license)",""),"Facts only.",[1,6])
add("brew-formula-python314","Formula source: python@3.14.rb","Homebrew","Homebrew/homebrew-core on GitHub","n.d.","https://raw.githubusercontent.com/Homebrew/homebrew-core/HEAD/Formula/p/python@3.14.rb",("BSD 2-Clause (homebrew-core repository license)","https://github.com/Homebrew/homebrew-core/blob/HEAD/LICENSE.txt"),"Cite the file; do not copy code.",[1,13],text=True,notes="Primary source for the EXTERNALLY-MANAGED marker. python@3.15.rb has the same lines.")
add("brew-pythontk314","python-tk@3.14 formula","Homebrew","Homebrew Formulae","n.d.","https://formulae.brew.sh/formula/python-tk@3.14",("Python-2.0 (formula's stated license)",""),"Facts only.",[6])
add("vscode-python","Getting started with Python in VS Code","Microsoft","Visual Studio Code Documentation","2026","https://code.visualstudio.com/docs/python/python-tutorial",("No license shown (Terms of Use link only)",""),"Cite and paraphrase.",[1])
add("apple-terminal-open","Open or quit Terminal on Mac","Apple Inc.","Terminal User Guide","2026","https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac",("© Apple Inc. All rights reserved",""),"Cite and paraphrase only.",[0])
add("missing-semester-shell","Course overview + the shell","Missing Semester course staff","The Missing Semester of Your CS Education","2020","https://missing.csail.mit.edu/2020/course-shell/",NCSA4,"ShareAlike and NonCommercial: cite and paraphrase, do not copy text.",[0],notes="Footer says CC BY-NC-SA; the version number (4.0) was not seen on the page and should be confirmed before the credits page lists it.")
add("cs50-notes-0","Lecture 0: Scratch (CS50x notes)","Malan, D. J.","CS50x 2026","2026","https://cs50.harvard.edu/x/notes/0/",NCSA4,"ShareAlike and NonCommercial: cite and paraphrase, do not copy text.",[2],notes="License verified on https://cs50.harvard.edu/x/license/")
add("cs50-notes-3","Lecture 3: Algorithms (CS50x notes)","Malan, D. J.","CS50x 2026","2026","https://cs50.harvard.edu/x/notes/3/",NCSA4,"ShareAlike and NonCommercial: cite and paraphrase, do not copy text.",[15,16])
add("thinkpython3-ch1","Think Python, 3rd edition: Chapter 1, Programming as a way of thinking","Downey, A. B.","Think Python","2024","https://allendowney.github.io/ThinkPython/chap01.html",("CC BY-NC-SA 4.0 (text); MIT (code)","https://creativecommons.org/licenses/by-nc-sa/4.0/"),"Cite and paraphrase.",[3,10])
add("thinkpython3-ch2","Think Python, 3rd edition: Chapter 2, Variables and statements","Downey, A. B.","Think Python","2024","https://allendowney.github.io/ThinkPython/chap02.html",("CC BY-NC-SA 4.0 (text); MIT (code)","https://creativecommons.org/licenses/by-nc-sa/4.0/"),"Cite and paraphrase.",[3,4,10])
add("thinkpython3-ch5","Think Python, 3rd edition: Chapter 5, Conditionals and recursion","Downey, A. B.","Think Python","2024","https://allendowney.github.io/ThinkPython/chap05.html",("CC BY-NC-SA 4.0 (text); MIT (code)","https://creativecommons.org/licenses/by-nc-sa/4.0/"),"Cite and paraphrase.",[5,16])
add("atbs3-ch5","Automate the Boring Stuff with Python, 3rd edition: Chapter 5, Debugging","Sweigart, A.","Automate the Boring Stuff with Python","2025","https://automatetheboringstuff.com/3e/chapter5.html",("CC BY-NC-SA 3.0 (book license per site; not shown on this chapter page)","https://creativecommons.org/licenses/by-nc-sa/3.0/"),"Cite and paraphrase.",[10],notes="Does not explain how to read a traceback, so do not cite it for that.")
add("progit-what-is-git","Pro Git: What is Git?","Chacon, S., & Straub, B.","Pro Git","2014","https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F",NCSA3,"License verified in https://github.com/progit/progit2/blob/main/LICENSE.asc. Cite and paraphrase.",[18])
add("progit-recording","Pro Git: Recording changes to the repository","Chacon, S., & Straub, B.","Pro Git","2014","https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository",NCSA3,"Cite and paraphrase.",[18])
add("numpy-beginners","NumPy: The absolute basics for beginners","NumPy Developers","NumPy v2.5 Manual","n.d.","https://numpy.org/doc/stable/user/absolute_beginners.html",("BSD 3-Clause (project LICENSE.txt)","https://github.com/numpy/numpy/blob/main/LICENSE.txt"),"Cite and paraphrase.",[102])
add("pandas-intro","What kind of data does pandas handle?","pandas development team","pandas documentation","n.d.","https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html",("BSD 3-Clause (project LICENSE)","https://github.com/pandas-dev/pandas/blob/main/LICENSE"),"Cite and paraphrase.",[102])
add("matplotlib-quick","Quick start guide","Matplotlib development team","Matplotlib documentation","n.d.","https://matplotlib.org/stable/users/explain/quick_start.html",("Matplotlib License (project LICENSE)","https://github.com/matplotlib/matplotlib/blob/main/LICENSE/LICENSE"),"Cite and paraphrase.",[103])

# ---------------- Machine learning module (levels 100+) ----------------
add("gfg-types-ml","Types of machine learning","GeeksforGeeks","GeeksforGeeks","2026","https://www.geeksforgeeks.org/machine-learning/types-of-machine-learning/",("© GeeksforGeeks, all rights reserved",""),"Cite and paraphrase only; cross-check with an independent source.",[100,114],notes="Page shows Last Updated 19 Jan, 2026 and no author.")
for n,t,lv in [(1,"Introduction",[115]),(3,"N-gram language models",[111]),(4,"Logistic regression and text classification",[106,107,108]),(5,"Embeddings",[113]),(6,"Neural networks",[112]),(7,"Transformers and pretraining",[113])]:
    add(f"jm3-ch{n}",f"Speech and language processing (3rd ed. draft), Chapter {n}: {t}","Jurafsky, D., & Martin, J. H.","Stanford University",f"2026",f"https://web.stanford.edu/~jurafsky/slp3/{n}.pdf",("© authors, all rights reserved; draft of Aug. 19, 2026 offered for class use",""),"Paraphrase only.",lv,pdf=True,notes="Draft of August 19, 2026. Site invites use of draft chapters in classes.")
MLCC = "https://developers.google.com/machine-learning/"
def mlcc(id,title,path,date,levels):
    add(id,title,"Google for Developers","Machine Learning Crash Course" if "crash" in path else "Google for Developers: Machine Learning",date,MLCC+path,CC4,"CC BY 4.0 (code samples Apache 2.0). Attribute Google; paraphrase freely.",levels)
mlcc("mlcc-what-is-ml","What is machine learning?","intro-to-ml/what-is-ml","2026-01-27",[100])
mlcc("mlcc-supervised","Supervised learning","intro-to-ml/supervised","2025-08-25",[100,102])
mlcc("mlcc-linear-regression","Linear regression","crash-course/linear-regression","2025-12-09",[104])
mlcc("mlcc-gradient-descent","Linear regression: Gradient descent","crash-course/linear-regression/gradient-descent","2026-02-03",[105])
mlcc("mlcc-sigmoid","Logistic regression: Calculating a probability with the sigmoid function","crash-course/logistic-regression/sigmoid-function","2026-01-12",[106])
mlcc("mlcc-metrics","Classification: Accuracy, recall, precision, and related metrics","crash-course/classification/accuracy-precision-recall","2026-01-12",[108])
mlcc("mlcc-overfitting","Datasets, generalization, and overfitting: Overfitting","crash-course/overfitting/overfitting","2025-12-03",[107])
mlcc("mlcc-splits","Datasets, generalization, and overfitting: Dividing the original dataset","crash-course/overfitting/dividing-datasets","2025-12-03",[107])
mlcc("mlcc-nn-nodes","Neural networks: Nodes and hidden layers","crash-course/neural-networks/nodes-hidden-layers","2025-12-03",[112])
mlcc("mlcc-bias","Fairness: Types of bias","crash-course/fairness/types-of-bias","2025-12-03",[115])
SK = "https://scikit-learn.org/stable/"
SKL = ("BSD 3-Clause (scikit-learn license)","https://github.com/scikit-learn/scikit-learn/blob/main/COPYING")
def sk(id,title,path,levels):
    add(id,title,"scikit-learn developers","scikit-learn 1.9.1 documentation","n.d.",SK+path,SKL,"Cite and paraphrase. Write our own examples and run them.",levels)
sk("sk-getting-started","Getting started","getting_started.html",[101,104])
sk("sk-install","Installing scikit-learn","install.html",[101])
sk("sk-cv","Cross-validation: evaluating estimator performance","modules/cross_validation.html",[107])
sk("sk-overfit-example","Underfitting vs. overfitting","auto_examples/model_selection/plot_underfitting_overfitting.html",[107])
sk("sk-clustering","Clustering","modules/clustering.html",[110])
sk("sk-neighbors","Nearest neighbors","modules/neighbors.html",[109])
sk("sk-tree","Decision trees","modules/tree.html",[109])
sk("sk-nb","Naive Bayes","modules/naive_bayes.html",[109,111])
sk("sk-metrics","Metrics and scoring: quantifying the quality of predictions","modules/model_evaluation.html",[108])
sk("sk-linear","Linear models","modules/linear_model.html",[104,106])
add("samuel-1959","Some studies in machine learning using the game of checkers","Samuel, A. L.","IBM Journal of Research and Development","1959","https://people.csail.mit.edu/brooks/idocs/Samuel.pdf",("© IBM (journal article); copy hosted at MIT CSAIL",""),"Cite only; short paraphrase.",[116],pdf=True,notes="Read the abstract from the PDF. DOI 10.1147/rd.33.0210 per a search listing (not opened).")
add("rosenblatt-1958","The perceptron: A probabilistic model for information storage and organization in the brain","Rosenblatt, F.","Psychological Review","1958","https://homepages.math.uic.edu/~lreyzin/papers/rosenblatt58.pdf",("© American Psychological Association (journal article); copy hosted at UIC",""),"Cite only; short paraphrase.",[116],pdf=True,notes="Read the first two pages. DOI 10.1037/h0042519 per a search listing (not opened).")
add("d2l","Dive into Deep Learning","Zhang, A., Lipton, Z. C., Li, M., & Smola, A. J.","d2l.ai","2023","https://d2l.ai/",("CC BY-SA 4.0 (verified in the repository LICENSE)","https://creativecommons.org/licenses/by-sa/4.0/"),"ShareAlike: cite and paraphrase only.",[112],status="unverified",notes="Only the landing page was read. Not cited for any fact yet.")
add("runestone-pythonds","Problem Solving with Algorithms and Data Structures using Python (Big-O page)","Miller, B., & Ranum, D.","Runestone Academy","n.d.","https://runestone.academy/ns/books/published/pythonds3/AlgorithmAnalysis/BigONotation.html",("unknown",""),"Not used.",[15],status="rejected",notes="Server returned HTTP 403 to every request, so the page could not be read. Use CS50 notes instead.")
add("ibm-fortran","FORTRAN","IBM","IBM History","n.d.","https://www.ibm.com/history/fortran",("© IBM",""),"Cite and paraphrase only.",[-1])
add("turing-1950","Computing machinery and intelligence","Turing, A. M.","Mind","1950","https://doi.org/10.1093/mind/LIX.236.433",("© Oxford University Press",""),"Not read.",[116],status="unverified",notes="No openly accessible full text was found. Do not cite the paper itself.")

out = pathlib.Path(__file__).with_name("registry.json")
out.write_text(json.dumps({"sources": S}, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"wrote {len(S)} sources to {out.name}")
