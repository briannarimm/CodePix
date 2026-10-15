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

# ---------------- Added 2026-10-15 (gap research) ----------------
# The research sandbox could reach only GitHub and PyPI with curl (other hosts: proxy 403). Every page below was
# opened in a browser-style fetch to confirm it loads and shows the passage; the check strings are then matched
# against the publisher's own source file ("mirror"). Sources with no mirror are "unverified" and their facts pending.
ACC2 = "2026-10-15"
GH = "https://raw.githubusercontent.com/"
CPY = GH + "python/cpython/3.15/Doc/"
SKG = GH + "scikit-learn/scikit-learn/1.9.X/"
def add2(*a, **k):
    k.setdefault("accessed", ACC2)
    add(*a, **k)
NCSA4_OS = ("CC BY-NC-SA 4.0", "https://creativecommons.org/licenses/by-nc-sa/4.0/")
SA4 = ("CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/")
NCSA_REUSE = "NonCommercial and ShareAlike: cite and paraphrase only; never copy text, figures or examples."
# Python docs
add2("py-docs-exceptions","Built-in exceptions","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/builtins/exceptions.html",PSF,DOCS_REUSE,[10,11,-1],mirror=CPY+"builtins/exceptions.rst",notes="In 3.15 the page lives under /3/builtins/ (the old /3/library/exceptions.html path still serves it).")
add2("py-docs-faq-general","General Python FAQ","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/faq/general.html#why-was-python-created-in-the-first-place",PSF,DOCS_REUSE,[-1],mirror=CPY+"faq/general.rst",notes="Guido van Rossum's own account of Python's start, quoted in the FAQ.")
add2("pypa-linux-tools","Installing pip/setuptools/wheel with Linux package managers","Python Packaging Authority","Python Packaging User Guide","2021","https://packaging.python.org/en/latest/guides/installing-using-linux-tools/",("No license named (footer: Copyright 2013-2020, PyPA)",""),"Cite and paraphrase.",[1,13],mirror=GH+"pypa/packaging.python.org/main/source/guides/installing-using-linux-tools.rst",notes="Page says Page Status: Incomplete, Last Reviewed: 2021-07-26. Use only for the distro package names, and say the page is old.")
# OpenStax Introduction to Python Programming (2024), CC BY-NC-SA 4.0
OSX = "https://openstax.org/books/introduction-python-programming/pages/"
OSG = GH + "openstax/osbooks-introduction-python-programming/main/modules/"
for sid, sec, page, mod, lv in [
    ("openstax-py-1-1","1.1 Background","1-1-background","m00002",[0,1,13]),
    ("openstax-py-1-5","1.5 Number basics","1-5-number-basics","m00006",[3,4]),
    ("openstax-py-1-6","1.6 Error messages","1-6-error-messages","m00007",[10]),
    ("openstax-py-1-8","1.8 Why Python?","1-8-why-python","m00009",[-1]),
    ("openstax-py-2-1","2.1 The Python shell","2-1-the-python-shell","m00011",[1]),
    ("openstax-py-3-1","3.1 Strings revisited","3-1-strings-revisited","m00021",[-1])]:
    add2(sid,f"Introduction to Python Programming, {sec}","Das, U., Lawson, A., Mayfield, C., & Norouzi, N.","OpenStax","2024",OSX+page,NCSA4_OS,NCSA_REUSE,lv,mirror=OSG+mod+"/index.cnxml",notes=f"OpenStax module {mod}. Book published Mar. 13, 2024. License from the page footer and the book's collection file. Some error messages in 1.6 come from older Python versions; show our own recorded tracebacks instead.")
add2("runestone-pythonds-cs","Problem Solving with Algorithms and Data Structures using Python, 1.3 What is computer science?","Miller, B. N., & Ranum, D. L.","Runestone Academy","2014","https://runestone.academy/ns/books/published/pythonds/Introduction/WhatIsComputerScience.html",NCSA4_OS,NCSA_REUSE,[0,15],mirror=GH+"RunestoneInteractive/pythonds/master/_sources/Introduction/WhatIsComputerScience.rst",notes="License stated in the book source (file header and index). The page itself shows only a copyright line. The separate Big-O page entry stays rejected.")
# Microsoft PowerShell docs (repository licensed CC BY 4.0)
MSLIC = ("CC BY 4.0 (MicrosoftDocs/PowerShell-Docs LICENSE.md); page footer shows (c) Microsoft","https://creativecommons.org/licenses/by/4.0/")
MSG = GH + "MicrosoftDocs/PowerShell-Docs/main/reference/docs-conceptual/learn/"
add2("ms-ps-aliases","Using aliases","Microsoft","PowerShell documentation, Microsoft Learn","2026","https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/using-aliases#compatibility-aliases-in-windows",MSLIC,"Attribute Microsoft; paraphrase.",[0],mirror=MSG+"shell/using-aliases.md",notes="Last updated 2026-01-13.")
add2("ms-ps101-ch1","PowerShell 101, Chapter 1: Getting started with PowerShell","Microsoft","PowerShell documentation, Microsoft Learn","2026","https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/01-getting-started",MSLIC,"Attribute Microsoft; paraphrase.",[0,1,13],mirror=MSG+"ps101/01-getting-started.md",notes="Page shows Last updated 2026-02-06 (file date 2024-08-02). Written for Windows PowerShell 5.1 on Windows 11.")
# Pro Git (CC BY-NC-SA 3.0)
PG = GH + "progit/progit2/main/book/"
for sid, title, path, src, lv in [
    ("progit-installing","Pro Git: Installing Git","Getting-Started-Installing-Git","01-introduction/sections/installing.asc",[18]),
    ("progit-first-time-setup","Pro Git: First-time Git setup","Getting-Started-First-Time-Git-Setup","01-introduction/sections/first-time-setup.asc",[18]),
    ("progit-getting-repo","Pro Git: Getting a Git repository","Git-Basics-Getting-a-Git-Repository","02-git-basics/sections/getting-a-repository.asc",[18]),
    ("progit-remotes","Pro Git: Working with remotes","Git-Basics-Working-with-Remotes","02-git-basics/sections/remotes.asc",[18]),
    ("progit-history","Pro Git: A short history of Git","Getting-Started-A-Short-History-of-Git","01-introduction/sections/history.asc",[-1,18])]:
    add2(sid,title,"Chacon, S., & Straub, B.","Pro Git","2014","https://git-scm.com/book/en/v2/"+path,NCSA3,"Cite and paraphrase.",lv,mirror=PG+src)
# GitHub Docs (CC BY 4.0)
GHD = GH + "github/docs/main/content/"
add2("gh-docs-account","Creating an account on GitHub","GitHub","GitHub Docs","n.d.","https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github",("CC BY 4.0 (github/docs LICENSE)","https://creativecommons.org/licenses/by/4.0/"),"Attribute GitHub; paraphrase.",[18],mirror=GHD+"account-and-profile/how-tos/account-management/creating-an-account-on-github.md",notes="Caution: the fetch tool's page summary listed sign-up steps that differ from the source file. Steps change often; link to the page and keep the book to the facts below.")
add2("gh-docs-repo-quickstart","Quickstart for repositories","GitHub","GitHub Docs","n.d.","https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories",("CC BY 4.0 (github/docs LICENSE)","https://creativecommons.org/licenses/by/4.0/"),"Attribute GitHub; paraphrase.",[18],mirror=GHD+"repositories/creating-and-managing-repositories/quickstart-for-repositories.md")
# PyPI project pages (read through PyPI's JSON API for the same release; the HTML page serves a bot challenge to scripts)
PYPI_LIC = ("Package metadata (facts only)","")
def pypi(sid, name, ver, lv, notes="", pkg_lic=None):
    add2(sid, f"{name} {ver}", "Python Package Index", "PyPI", "2026", f"https://pypi.org/project/{name}/{ver}/", pkg_lic or PYPI_LIC, "Facts only (version, date, requirements). Write our own examples and run them.", lv, mirror=f"https://pypi.org/pypi/{name}/{ver}/json", text=True, prefer_mirror=True, notes=notes)
pypi("pypi-texttable","texttable","1.7.1",[13],"A13 package pick: pure Python (py2.py3-none-any wheel, about 11 KB), MIT, no required dependencies, on PyPI since 2015. Tested by the scout on Python 3.9.25 and 3.15.0b4 with identical output (sanity check only; record book output with the exercise pipeline).",("MIT (package license)","https://opensource.org/license/mit"))
pypi("pypi-colorama","colorama","0.4.6",[13],"A13 backup pick: pure Python, BSD, no requirements beyond the standard library, unchanged since 2022. Its output is ANSI colour codes, which are awkward to record and display, so it is the backup.",("BSD 3-Clause (package license)","https://opensource.org/license/bsd-3-clause"))
pypi("pypi-scikit-learn","scikit-learn","1.9.1",[101])
pypi("pypi-numpy","numpy","2.5.4",[101])
pypi("pypi-pandas","pandas","3.0.6",[101])
pypi("pypi-matplotlib","matplotlib","3.11.2",[101,103])
# scikit-learn 1.9.1 pages
for sid, title, path, lv in [
    ("sk-ensemble","Ensembles: Gradient boosting, random forests, bagging, voting, stacking","modules/ensemble.html",[109]),
    ("sk-svm","Support vector machines","modules/svm.html",[109]),
    ("sk-semi-supervised","Semi-supervised learning","modules/semi_supervised.html",[114]),
    ("sk-glossary","Glossary of common terms and API elements","glossary.html",[100,104,106]),
    ("sk-grid-search","Tuning the hyper-parameters of an estimator","modules/grid_search.html",[105,107]),
    ("sk-sgd","Stochastic gradient descent","modules/sgd.html",[105]),
    ("sk-mlp","Neural network models (supervised)","modules/neural_networks_supervised.html",[112])]:
    add2(sid,title,"scikit-learn developers","scikit-learn 1.9.1 documentation","n.d.",SK+path,SKL,"Cite and paraphrase. Write our own examples and run them.",lv,mirror=SKG+"doc/"+path.replace(".html",".rst"))
add2("mpl-savefig","matplotlib.figure.Figure.savefig","Matplotlib development team","Matplotlib 3.11.2 documentation","n.d.","https://matplotlib.org/stable/api/_as_gen/matplotlib.figure.Figure.savefig.html",("Matplotlib License (project LICENSE)","https://github.com/matplotlib/matplotlib/blob/main/LICENSE/LICENSE"),"Cite and paraphrase.",[103],mirror=GH+"matplotlib/matplotlib/v3.11.2/lib/matplotlib/figure.py",text=True,notes="The API page is generated from the savefig docstring in figure.py at tag v3.11.2.")
# Dive into Deep Learning chapters (CC BY-SA 4.0). Site shows version 1.0.3; mirror is the master branch source.
D2L = GH + "d2l-ai/d2l-en/master/"
for sid, title, path, lv in [
    ("d2l-linreg","Dive into Deep Learning, 3.1 Linear regression","chapter_linear-regression/linear-regression",[104,105]),
    ("d2l-backprop","Dive into Deep Learning, 5.3 Forward propagation, backward propagation, and computational graphs","chapter_multilayer-perceptrons/backprop",[112]),
    ("d2l-word2vec","Dive into Deep Learning, 15.1 Word embedding (word2vec)","chapter_natural-language-processing-pretraining/word2vec",[113]),
    ("d2l-pretraining","Dive into Deep Learning, 11.9 Large-scale pretraining with transformers","chapter_attention-mechanisms-and-transformers/large-pretraining-transformers",[113])]:
    add2(sid,title,"Zhang, A., Lipton, Z. C., Li, M., & Smola, A. J.","Dive into Deep Learning","2023","https://d2l.ai/"+path+".html",("CC BY-SA 4.0 (verified in the repository LICENSE)","https://creativecommons.org/licenses/by-sa/4.0/"),"ShareAlike: cite and paraphrase only.",lv,mirror=D2L+path+".md")
# Read in a browser-style fetch only; raw text not reachable from the research sandbox. Facts from these are PENDING.
PEND = "Unverified: page opened with the fetch tool on 2026-10-15, but its raw text could not be downloaded from the research sandbox (proxy 403). Facts are pending until tools/verify_facts.py --pending passes on a networked machine."
for sid, title, path, date in [("mlcc-hyperparameters","Linear regression: Hyperparameters","crash-course/linear-regression/hyperparameters","2025-12-03"),
                               ("mlcc-embeddings","Embeddings","crash-course/embeddings","2025-08-25"),
                               ("mlcc-llm","Introduction to large language models","crash-course/llm","2026-01-09")]:
    add2(sid,title,"Google for Developers","Machine Learning Crash Course",date,MLCC+path,CC4,"CC BY 4.0 (code samples Apache 2.0). Attribute Google; paraphrase freely.",[105] if "hyper" in sid else [113],notes="Read with the fetch tool on 2026-10-15; the release-candidate research pass found the check strings verbatim on the live page and marked the source verified. Raw text is not reachable from the research sandbox (proxy 403); CI re-verifies with network access.")
add2("chm-lovelace","Ada Lovelace","Computer History Museum","The Babbage Engine","n.d.","https://www.computerhistory.org/babbage/adalovelace/",("(c) Computer History Museum; no license shown",""),"Cite and paraphrase only.",[-1],notes="Read with WebFetch on 2026-10-15; the check strings of its facts were confirmed verbatim in the fetched text (raw text not downloadable from the sandbox).")
add2("mactutor-lovelace","Ada Lovelace (1815-1852), biography","O'Connor, J. J., & Robertson, E. F.","MacTutor History of Mathematics, University of St Andrews","2002","https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/",("unknown (site Copyright information page not read)",""),"Cite and paraphrase only.",[-1],notes="Read with WebFetch on 2026-10-15; the check strings of its facts were confirmed verbatim in the fetched text (raw text not downloadable from the sandbox)."+" Page says Last Update August 2002.")
add2("ethw-eniac","Milestones: Electronic Numerical Integrator and Computer, 1946","IEEE History Center","Engineering and Technology History Wiki","n.d.","https://ethw.org/Milestones:Electronic_Numerical_Integrator_and_Computer,_1946",("unknown (no license in footer)",""),"Cite and paraphrase only.",[-1],notes="Read with WebFetch on 2026-10-15; the check strings of its facts were confirmed verbatim in the fetched text (raw text not downloadable from the sandbox)."+" Plaque dedicated by the IEEE Philadelphia Section in September 1987.",status="unverified",note_ci="The GitHub source check could not read this page (2026-10-15: bot block or unreadable PDF). Checked only through WebFetch, so its facts stay pending.")
add2("yale-hopper","Biography of Grace Murray Hopper","Yale University, Office of the President","Yale University","n.d.","https://president.yale.edu/biography-grace-murray-hopper",("(c) Yale University, all rights reserved",""),"Cite and paraphrase only.",[-1],notes="Read with WebFetch on 2026-10-15; the check strings of its facts were confirmed verbatim in the fetched text (raw text not downloadable from the sandbox).")
add2("gutenberg-menabrea-1843","Sketch of the Analytical Engine invented by Charles Babbage, Esq. (with notes by the translator)","Menabrea, L. F.","Project Gutenberg (eBook 75107)","1843","https://gutenberg.org/files/75107/75107-h/75107-h.htm",("Public domain in the USA (Project Gutenberg); terms section not read",""),"Not used yet.",[-1],status="unverified",notes="Primary source for Lovelace's notes. The fetch tool read only the first 100,000 characters and did not reach Note G. No facts taken.")
# ---------------- Added 2026-10-15 (release candidate: Module A research) ----------------
# Pages read with WebFetch on 2026-10-15. Where a mirror is given, every check string was also matched against
# the publisher's own source file with tools/verify_facts.py (read via mirror). Sources marked WFV have no
# downloadable source file: their check strings were confirmed verbatim in the WebFetch text only.
WFV = "Read with WebFetch on 2026-10-15; check strings confirmed verbatim in the fetched text. Raw text not downloadable from the research sandbox (proxy), so the CI link and fact checks are the first raw-text check."
VSC = ("CC BY 3.0 US (microsoft/vscode-docs LICENSE.md; code MIT)", "https://creativecommons.org/licenses/by/3.0/us/")
GHDOCS = ("CC BY 4.0 (github/docs LICENSE)", "https://creativecommons.org/licenses/by/4.0/")
VSG = GH + "microsoft/vscode-docs/main/docs/"
add2("py-docs-tutorial-interpreter","Using the Python interpreter","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/tutorial/interpreter.html",PSF,DOCS_REUSE,[1],mirror=CPY+"tutorial/interpreter.rst")
add2("py-docs-lexical","Lexical analysis","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/reference/lexical_analysis.html#indentation",PSF,DOCS_REUSE,[5],mirror=CPY+"reference/lexical_analysis.rst")
add2("py-docs-main","__main__: Top-level code environment","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/__main__.html",PSF,DOCS_REUSE,[17],mirror=CPY+"library/__main__.rst")
add2("py-docs-library-intro","Introduction (The Python standard library)","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/intro.html",PSF,DOCS_REUSE,[13],mirror=CPY+"library/intro.rst")
add2("py-docs-traceback","traceback: Print or retrieve a stack traceback","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/traceback.html#traceback.print_exception",PSF,DOCS_REUSE,[10],mirror=CPY+"library/traceback.rst")
add2("py-docs-tkinter","tkinter: Python interface to Tcl/Tk","Python Software Foundation","Python 3.15.0 documentation","n.d.","https://docs.python.org/3/library/tkinter.html",PSF,DOCS_REUSE,[6],mirror=CPY+"library/tkinter.rst")
add2("thinkpython3-ch3","Think Python, 3rd edition: Chapter 3, Functions","Downey, A. B.","Think Python","2024","https://allendowney.github.io/ThinkPython/chap03.html",("CC BY-NC-SA 4.0 (text); MIT (code)","https://creativecommons.org/licenses/by-nc-sa/4.0/"),NCSA_REUSE,[10],mirror=GH+"AllenDowney/ThinkPython/v3/chapters/chap03.ipynb",notes="License from the page: text CC BY-NC-SA 4.0, code MIT.")
add2("runestone-pythonds-insertion","Problem Solving with Algorithms and Data Structures using Python: The insertion sort","Miller, B. N., & Ranum, D. L.","Runestone Academy","2014","https://runestone.academy/ns/books/published/pythonds/SortSearch/TheInsertionSort.html",NCSA4_OS,NCSA_REUSE,[15],mirror=GH+"RunestoneInteractive/pythonds/master/_sources/SortSearch/TheInsertionSort.rst",notes="License CC BY-NC-SA 4.0 from the header of the book's source file; the page footer shows (c) 2014 Brad Miller, David Ranum.")
add2("vscode-setup-mac","Visual Studio Code on macOS","Microsoft","Visual Studio Code Documentation","2026","https://code.visualstudio.com/docs/setup/mac",VSC,"Attribute Microsoft; paraphrase.",[1,-1],mirror=VSG+"setup/mac.md",notes="DateApproved 10/14/2026 in the source file.")
add2("vscode-python-envs","Python environments in VS Code","Microsoft","Visual Studio Code Documentation","2026","https://code.visualstudio.com/docs/python/environments#_select-an-environment",VSC,"Attribute Microsoft; paraphrase.",[1,-1],mirror=VSG+"python/environments.md",notes="DateApproved 02/04/2026 in the source file.")
add2("brew-faq","FAQ (Frequently Asked Questions)","Homebrew","Homebrew Documentation","n.d.","https://docs.brew.sh/FAQ#why-should-i-install-homebrew-in-the-default-location",("BSD 2-Clause (Homebrew/brew LICENSE.txt)","https://opensource.org/license/bsd-2-clause"),"Cite and paraphrase.",[1],mirror=GH+"Homebrew/brew/main/docs/FAQ.md")
add2("brew-install-script","install.sh (the Homebrew installer)","Homebrew","GitHub: Homebrew/install","2026","https://github.com/Homebrew/install/blob/main/install.sh",("BSD 2-Clause (Homebrew/install LICENSE.txt)","https://opensource.org/license/bsd-2-clause"),"Facts only (which file the installer names).",[1],mirror=GH+"Homebrew/install/main/install.sh",text=True,prefer_mirror=True,notes="The installer's own source, read as raw text: its Next steps message names the shell file to edit.")
add2("apple-mac-folders","Folders that come with your Mac","Apple Inc.","macOS User Guide","2026","https://support.apple.com/guide/mac-help/folders-that-come-with-your-mac-mchlp1143/mac",("(c) Apple Inc. All rights reserved",""),"Cite and paraphrase only.",[0],notes=WFV)
add2("apple-rename-home","Change the name of your macOS user account and home folder","Apple Inc.","Apple Support","2026","https://support.apple.com/en-us/102547",("(c) Apple Inc. All rights reserved",""),"Cite and paraphrase only.",[0],notes=WFV+" Published Date: May 12, 2026.")
add2("ubuntu-python-setup","How to set up a development environment for Python on Ubuntu","Canonical","Ubuntu for Developers documentation","2026","https://ubuntu.com/developers/docs/howto/python-setup/",("CC BY-SA 4.0 (canonical/ubuntu-for-developers-docs LICENCE)","https://creativecommons.org/licenses/by-sa/4.0/"),"ShareAlike: cite and paraphrase only.",[1],mirror=GH+"canonical/ubuntu-for-developers-docs/main/docs/howto/python-setup.md",notes="Page shows Last updated Aug 21, 2026; footer shows only a copyright line, the repository licence is CC BY-SA 4.0.")
add2("fedora-python","Python in Fedora","Fedora Project","Fedora Developer Portal","n.d.","https://developer.fedoraproject.org/tech/languages/python/python-installation.html",("GPL-2.0 (developer-portal/content repository LICENSE); footer (c) Red Hat, Inc. and others",""),"Cite and paraphrase only.",[1],mirror=GH+"developer-portal/content/master/tech/languages/python/python-installation.md")
add2("progit-viewing-history","Pro Git: Viewing the commit history","Chacon, S., & Straub, B.","Pro Git","2014","https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History",NCSA3,"Cite and paraphrase.",[18],mirror=PG+"02-git-basics/sections/viewing-history.asc")
add2("gh-docs-remote-repos","About remote repositories","GitHub","GitHub Docs","n.d.","https://docs.github.com/en/get-started/git-basics/about-remote-repositories",GHDOCS,"Attribute GitHub; paraphrase.",[18],mirror=GHD+"get-started/git-basics/about-remote-repositories.md")
add2("gh-docs-pat","Managing your personal access tokens","GitHub","GitHub Docs","n.d.","https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",GHDOCS,"Attribute GitHub; paraphrase.",[18],mirror=GHD+"authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens.md")
add2("gh-docs-credentials","Caching your GitHub credentials in Git","GitHub","GitHub Docs","n.d.","https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git",GHDOCS,"Attribute GitHub; paraphrase.",[18],mirror=GHD+"get-started/git-basics/caching-your-github-credentials-in-git.md")
add2("gh-docs-branches","Branches (About the default branch)","GitHub","GitHub Docs","n.d.","https://docs.github.com/en/pull-requests/reference/branches#about-the-default-branch",GHDOCS,"Attribute GitHub; paraphrase.",[18],mirror=GHD+"pull-requests/reference/branches.md")
# CS education research for the About page (leads from Brianna's CSV). Open full texts, read as PDFs with WebFetch.
add2("gomes-2026-intro-programming","Teaching introductory programming in top universities: A global study of languages, paradigms, assessment, and AI","Gomes, J. P., Monteiro, R., Moreira, A. S., Mendonca, V., Pinho, A., & Cunha, C. R.","Journal of Computer Languages, 86, 101384","2026","https://bibliotecadigital.ipb.pt/bitstreams/7805506c-08dc-4242-a583-7643c53562bf/download",CC4,"CC BY 4.0: attribute; paraphrase.",[-1],pdf=True,doi="https://doi.org/10.1016/j.cola.2025.101384",notes=WFV+" Open copy of the published article in the IPB repository (Biblioteca Digital do IPB); the PDF states it is an open access article under the CC BY license. DOI: https://doi.org/10.1016/j.cola.2025.101384 (doi.org rate-limited the fetch tool).",status="unverified",note_ci="The GitHub source check could not read this page (2026-10-15: bot block or unreadable PDF). Checked only through WebFetch, so its facts stay pending.")
add2("newhall-2025-cs31","An introductory-level undergraduate CS course that introduces parallel computing","Newhall, T., Webb, K. C., Chaganti, V., & Danner, A.","Journal of Parallel and Distributed Computing, 199, 105044","2025","https://works.swarthmore.edu/cgi/viewcontent.cgi?article=1136&context=fac-comp-sci",("CC BY-NC-ND 4.0","https://creativecommons.org/licenses/by-nc-nd/4.0/"),"NonCommercial and NoDerivatives: cite and paraphrase only; never copy text or figures.",[-1],pdf=True,doi="https://doi.org/10.1016/j.jpdc.2025.105044",notes=WFV+" Open copy in Swarthmore Works (landing page https://works.swarthmore.edu/fac-comp-sci/137). DOI: https://doi.org/10.1016/j.jpdc.2025.105044.",status="unverified",note_ci="The GitHub source check could not read this page (2026-10-15: bot block or unreadable PDF). Checked only through WebFetch, so its facts stay pending.")
add2("tsc-2024-unplugged","How can unplugged approach facilitate novice students' understanding of computational thinking? An exploratory study from a Nigerian university","unknown","Thinking Skills and Creativity","2024","https://doi.org/10.1016/j.tsc.2023.101458",("unknown",""),"Not used.",[-1],status="unverified",notes="Full text not read: ScienceDirect (https://www.sciencedirect.com/science/article/pii/S1871187123002250) refuses the fetch tool (robots), ResearchGate failed, and doi.org rate-limited it. No open repository copy found. Do not cite until someone reads the full text.")
add2("mactutor-lovelace","Ada Lovelace (1815-1852), biography","O'Connor, J. J., & Robertson, E. F.","MacTutor History of Mathematics, University of St Andrews","2002","https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/",("unknown (site Copyright information page not read)",""),"Cite and paraphrase only.",[-1],status="unverified",notes=PEND+" Page says Last Update August 2002.")
add2("ethw-eniac","Milestones: Electronic Numerical Integrator and Computer, 1946","IEEE History Center","Engineering and Technology History Wiki","n.d.","https://ethw.org/Milestones:Electronic_Numerical_Integrator_and_Computer,_1946",("unknown (no license in footer)",""),"Cite and paraphrase only.",[-1],status="unverified",notes=PEND+" Plaque dedicated by the IEEE Philadelphia Section in September 1987.")
add2("yale-hopper","Biography of Grace Murray Hopper","Yale University, Office of the President","Yale University","n.d.","https://president.yale.edu/biography-grace-murray-hopper",("(c) Yale University, all rights reserved",""),"Cite and paraphrase only.",[-1],status="unverified",notes=PEND)
add2("gutenberg-menabrea-1843","Sketch of the Analytical Engine invented by Charles Babbage, Esq. (with notes by the translator)","Menabrea, L. F.","Project Gutenberg (eBook 75107)","1843","https://gutenberg.org/files/75107/75107-h/75107-h.htm",("Public domain in the USA (Project Gutenberg); terms section not read",""),"Not used yet.",[-1],status="unverified",notes="Primary source for Lovelace's notes. The fetch tool read only the first 100,000 characters and did not reach Note G. No facts taken.")
# ---------------- Added 2026-10-15 (release candidate: Module B research) ----------------
# Each page was opened with the fetch tool on 2026-10-15 and the check strings were found verbatim. Where a mirror is
# named, the sandbox also matched them against the publisher's source file (tag or branch of the documented release).
WF = "Read with the fetch tool on 2026-10-15 (check strings found verbatim); raw page not reachable from the research sandbox, so CI re-verifies with network access."
NPG = GH + "numpy/numpy.org/main/content/en/"
PDG = GH + "pandas-dev/pandas/v3.0.6/doc/source/"
add2("numpy-install","Installing NumPy","NumPy Developers","NumPy","n.d.","https://numpy.org/install/",("BSD 3-Clause (numpy/numpy.org LICENSE)","https://github.com/numpy/numpy.org/blob/main/LICENSE"),"Cite and paraphrase.",[101],mirror=NPG+"install.md")
add2("pandas-install","Installation","pandas development team","pandas 3.0.6 documentation","n.d.","https://pandas.pydata.org/docs/getting_started/install.html#installing-with-pip",("BSD 3-Clause (project LICENSE)","https://github.com/pandas-dev/pandas/blob/main/LICENSE"),"Cite and paraphrase.",[101],mirror=PDG+"getting_started/install.rst")
add2("mpl-install","Installation","Matplotlib development team","Matplotlib 3.11.2 documentation","n.d.","https://matplotlib.org/stable/install/index.html#install-an-official-release",("Matplotlib License (project LICENSE)","https://github.com/matplotlib/matplotlib/blob/main/LICENSE/LICENSE"),"Cite and paraphrase.",[101],mirror=GH+"matplotlib/matplotlib/v3.11.2/doc/install/index.rst")
add2("pandas-read-write","How do I read and write tabular data?","pandas development team","pandas 3.0.6 documentation","n.d.","https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html",("BSD 3-Clause (project LICENSE)","https://github.com/pandas-dev/pandas/blob/main/LICENSE"),"Cite and paraphrase.",[102],mirror=PDG+"getting_started/intro_tutorials/02_read_write.rst")
add2("sk-linreg-api","sklearn.linear_model.LinearRegression","scikit-learn developers","scikit-learn 1.9.1 documentation","n.d.",SK+"modules/generated/sklearn.linear_model.LinearRegression.html",SKL,"Cite and paraphrase. Write our own examples and run them.",[104],mirror=SKG+"sklearn/linear_model/_base.py",text=True,notes="The API page is generated from the LinearRegression docstring in _base.py on the 1.9.X branch.")
add2("sk-train-test-split","sklearn.model_selection.train_test_split","scikit-learn developers","scikit-learn 1.9.1 documentation","n.d.",SK+"modules/generated/sklearn.model_selection.train_test_split.html",SKL,"Cite and paraphrase. Write our own examples and run them.",[107,116],mirror=SKG+"sklearn/model_selection/_split.py",text=True,notes="The API page is generated from the train_test_split docstring in _split.py on the 1.9.X branch.")
add2("sk-text-features","Feature extraction: Text feature extraction","scikit-learn developers","scikit-learn 1.9.1 documentation","n.d.",SK+"modules/feature_extraction.html#text-feature-extraction",SKL,"Cite and paraphrase. Write our own examples and run them.",[111],mirror=SKG+"doc/modules/feature_extraction.rst")
add2("openstax-stats-12-3","Introductory Statistics 2e, 12.3 The regression equation","Illowsky, B., & Dean, S.","OpenStax","2023","https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation",NCSA4_OS,NCSA_REUSE,[104],mirror=GH+"openstax/osbooks-introductory-statistics-bundle/main/modules/m47117/index.cnxml",notes="OpenStax module m47117 (book published Dec. 13, 2023). License from the page footer and the bundle README. The slope formula is MathML; the check string is its plain-text reading.")
for sid, title, path, lv in [
    ("d2l-text-sequence","Dive into Deep Learning, 9.2 Converting raw text into sequence data","chapter_recurrent-neural-networks/text-sequence",[111,113]),
    ("d2l-language-model","Dive into Deep Learning, 9.3 Language models","chapter_recurrent-neural-networks/language-model",[111]),
    ("d2l-qkv","Dive into Deep Learning, 11.1 Queries, keys, and values","chapter_attention-mechanisms-and-transformers/queries-keys-values",[113])]:
    add2(sid,title,"Zhang, A., Lipton, Z. C., Li, M., & Smola, A. J.","Dive into Deep Learning","2023","https://d2l.ai/"+path+".html",("CC BY-SA 4.0 (verified in the repository LICENSE)","https://creativecommons.org/licenses/by-sa/4.0/"),"ShareAlike: cite and paraphrase only.",lv,mirror=D2L+path+".md")
for sid, title, path, date, lv in [
    ("mlcc-loss","Linear regression: Loss","crash-course/linear-regression/loss","2026-01-05",[105]),
    ("mlcc-evaluating-bias","Fairness: Evaluating for bias","crash-course/fairness/evaluating-for-bias","2025-08-25",[115]),
    ("mlcc-demographic-parity","Fairness: Demographic parity","crash-course/fairness/demographic-parity","2025-08-25",[115]),
    ("mlcc-equal-opportunity","Fairness: Equality of opportunity","crash-course/fairness/equality-of-opportunity","2025-12-03",[115]),
    ("mlcc-transformers","LLMs: What's a large language model? (Transformers)","crash-course/llm/transformers","2026-01-02",[113]),
    ("mlcc-obtaining-embeddings","Embeddings: Obtaining embeddings","crash-course/embeddings/obtaining-embeddings","2026-02-17",[113])]:
    add2(sid,title,"Google for Developers","Machine Learning Crash Course",date,MLCC+path,CC4,"CC BY 4.0 (code samples Apache 2.0). Attribute Google; paraphrase freely.",lv,notes=WF)
add2("turing-archive-amt-b-19","AMT/B/19: Off-print, 'Computing machinery and intelligence' from Mind","Turing, A. M.","The Turing Digital Archive, King's College, Cambridge","1950","https://turingarchive.kings.cam.ac.uk/amt-b-19",("Images copyrighted; reproduced from Mind with the permission of Oxford University Press; archive terms of use apply",""),"Cite only; link for reading. Do not copy page images.",[116],notes=WF+" The archive item offers a PDF of the 1950 off-print under its terms of use; the publisher's page (academic.oup.com) is subscriber-only, so this is the free copy to link. Only the catalogue entry was read, not the scanned paper.")
# CSV research leads (Brianna, 2026-10-15). Open access, but the full text could not be read from the research sandbox.
add2("nyamawe-2025-pml","Practical machine learning: A beginner's guide with ethical insights","Nyamawe, A. S., Mjahidi, M. M., Nnko, N. E., Diwani, S. A., Minja, G. G., & Malyango, K.","Chapman and Hall/CRC (Taylor & Francis)","2025","https://doi.org/10.1201/9781003486817",("CC BY-NC-ND 4.0","https://creativecommons.org/licenses/by-nc-nd/4.0/"),"NonCommercial, NoDerivatives: cite and paraphrase only; never copy text or figures.",[115,-1],status="unverified",notes="Open access monograph (OAPEN handle 20.500.12657/98246; published Feb. 7, 2025). Only the book description and the chapter 6 learning objectives on taylorfrancis.com could be read: the OAPEN PDF is robots-disallowed for the fetch tool and the Taylor & Francis PDF endpoint returned an error. Re-read the full text on a networked machine before citing.")
add2("zhao-2025-procs","Teaching reform of machine learning courses based on a multi-stage cognitive advancement framework","Zhao, Y., Hu, Z., Wang, J., & Li, X.","Procedia Computer Science, 259, 1249-1258","2025","https://doi.org/10.1016/j.procs.2025.04.080",("CC BY-NC-ND 4.0 (per Crossref metadata)","https://creativecommons.org/licenses/by-nc-nd/4.0/"),"Not read; no facts.",[-1],status="unverified",notes="Bibliographic data from Crossref. ScienceDirect (PII S1877050925011810) is robots-disallowed for the fetch tool, the Elsevier API returned an error and doi.org rate-limited the sandbox, so the paper was not read. No claims taken.")
add2("imavis-2012-cv-core","Computer vision needs a core and foundations","(authors not confirmed)","Image and Vision Computing","2012","https://doi.org/10.1016/j.imavis.2011.12.013",("unknown",""),"Not read; no facts.",[-1],status="unverified",notes="doi.org and Crossref rate-limited the sandbox and ScienceDirect is robots-disallowed, so neither the paper nor its access status could be read. No claims taken.")

# Mirrors: the publisher's own source file for the same page, read by tools/verify_facts.py only when
# the page itself cannot be fetched. Python docs: branch 3.15 matches docs.python.org/3/ (3.15.0).
GH = "https://raw.githubusercontent.com/"
CPY = GH + "python/cpython/3.15/Doc/"
SKG = GH + "scikit-learn/scikit-learn/1.9.X/"
MIRRORS = {
 "py-docs-mac": CPY+"using/mac.rst", "py-docs-windows": CPY+"using/windows.rst", "py-docs-unix": CPY+"using/unix.rst",
 "py-docs-tutorial-intro": CPY+"tutorial/introduction.rst", "py-docs-tutorial-controlflow": CPY+"tutorial/controlflow.rst",
 "py-docs-tutorial-datastructures": CPY+"tutorial/datastructures.rst", "py-docs-tutorial-errors": CPY+"tutorial/errors.rst",
 "py-docs-tutorial-classes": CPY+"tutorial/classes.rst", "py-docs-tutorial-io": CPY+"tutorial/inputoutput.rst",
 "py-docs-glossary": CPY+"glossary.rst", "py-docs-unicode-howto": CPY+"howto/unicode.rst",
 "py-docs-functions": CPY+"builtins/functions.rst", "py-docs-stdtypes": CPY+"builtins/stdtypes.rst",
 "py39-docs-functions": GH+"python/cpython/3.9/Doc/library/functions.rst",
 "py-docs-csv": CPY+"library/csv.rst", "py-docs-math": CPY+"library/math.rst", "py-docs-datetime": CPY+"library/datetime.rst",
 "py-docs-unittest": CPY+"library/unittest.rst", "py-docs-turtle": CPY+"library/turtle.rst", "py-docs-venv": CPY+"library/venv.rst",
 "py-docs-random": CPY+"library/random.rst", "py-docs-timeit": CPY+"library/timeit.rst", "py-docs-history": CPY+"license.rst",
 "pep-668": GH+"python/peps/main/peps/pep-0668.rst", "pep-20": GH+"python/peps/main/peps/pep-0020.rst",
 "pypa-venv-guide": GH+"pypa/packaging.python.org/main/source/guides/installing-using-pip-and-virtual-environments.rst",
 "pytest-start": GH+"pytest-dev/pytest/main/doc/en/getting-started.rst",
 "brew-installation": GH+"Homebrew/brew/main/docs/Installation.md", "brew-homepage": GH+"Homebrew/brew.sh/main/index.html",
 "vscode-python": GH+"microsoft/vscode-docs/main/docs/python/python-tutorial.md",
 "missing-semester-shell": GH+"missing-semester/missing-semester/master/_2020/course-shell.md",
 "thinkpython3-ch1": GH+"AllenDowney/ThinkPython/v3/chapters/chap01.ipynb", "thinkpython3-ch2": GH+"AllenDowney/ThinkPython/v3/chapters/chap02.ipynb",
 "thinkpython3-ch5": GH+"AllenDowney/ThinkPython/v3/chapters/chap05.ipynb",
 "progit-what-is-git": GH+"progit/progit2/main/book/01-introduction/sections/what-is-git.asc",
 "progit-recording": GH+"progit/progit2/main/book/02-git-basics/sections/recording-changes.asc",
 "numpy-beginners": GH+"numpy/numpy/main/doc/source/user/absolute_beginners.rst",
 "pandas-intro": GH+"pandas-dev/pandas/main/doc/source/getting_started/intro_tutorials/01_table_oriented.rst",
 "matplotlib-quick": GH+"matplotlib/matplotlib/main/galleries/users_explain/quick_start.py",
 "sk-getting-started": SKG+"doc/getting_started.rst", "sk-install": SKG+"doc/install.rst", "sk-cv": SKG+"doc/modules/cross_validation.rst",
 "sk-overfit-example": SKG+"examples/model_selection/plot_underfitting_overfitting.py", "sk-clustering": SKG+"doc/modules/clustering.rst",
 "sk-neighbors": SKG+"doc/modules/neighbors.rst", "sk-tree": SKG+"doc/modules/tree.rst", "sk-nb": SKG+"doc/modules/naive_bayes.rst",
 "sk-metrics": SKG+"doc/modules/model_evaluation.rst", "sk-linear": SKG+"doc/modules/linear_model.rst",
}
for s in S:
    if s["id"] in MIRRORS and "mirror" not in s:
        s["mirror"] = MIRRORS[s["id"]]

out = pathlib.Path(__file__).with_name("registry.json")
out.write_text(json.dumps({"sources": S}, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"wrote {len(S)} sources to {out.name}")
