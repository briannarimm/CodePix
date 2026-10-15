#!/usr/bin/env python3
"""Recompute every number that a lesson quotes from a source, using real Python.

Each check states the source's number and the recomputed value. Exit status 1 if any differ.
Run: python3 tools/check_numbers.py
"""
import math, sys

results = []
def check(name, quoted, actual, tol=0.0):
    ok = abs(quoted - actual) <= tol
    results.append(ok)
    print(("ok   " if ok else "FAIL ") + f"{name}: source says {quoted}, Python gives {actual}")

# Google linear regression example: bias 34, weight -4.6, 4,000 pounds (feature in thousands)
check("MLCC car mpg", 15.6, 34 + -4.6 * 4, 1e-9)
# Google sigmoid table and exercise
sig = lambda z: 1 / (1 + math.exp(-z))
check("MLCC sigmoid(-2)", 0.119, round(sig(-2), 3)); check("MLCC sigmoid(0)", 0.5, sig(0)); check("MLCC sigmoid(2)", 0.881, round(sig(2), 3))
z = 1 + 2 * 0 + -1 * 10 + 5 * 2
check("MLCC exercise z", 1, z); check("MLCC exercise probability", 0.731, round(sig(z), 3))
# J&M (3rd ed.), 6.1: neural unit
zz = .5 * .2 + .6 * .3 + .1 * .9 + .5
check("JM3 unit z", 0.87, round(zz, 2)); check("JM3 unit output", 0.70, round(sig(zz), 2))
# J&M (3rd ed.), 4.9: rare-class accuracy
check("JM3 99.99% accuracy", 99.99, 999_900 / 1_000_000 * 100, 1e-9)
# J&M (3rd ed.), 4.9.1: macro and micro precision
pu, pn, ps = 8 / (8 + 11), 60 / (60 + 55), 200 / (200 + 33)
check("JM3 precision urgent", 0.42, round(pu, 2)); check("JM3 precision normal", 0.52, round(pn, 2)); check("JM3 precision spam", 0.86, round(ps, 2))
check("JM3 macro precision", 0.60, round((round(pu, 2) + round(pn, 2) + round(ps, 2)) / 3, 2))
check("JM3 micro precision", 0.73, round((8 + 60 + 200) / ((8 + 60 + 200) + (11 + 55 + 33)), 2))
# Google metrics exercises
check("MLCC recall 5/7", 0.714, round(5 / 7, 3)); check("MLCC precision 3/5", 0.6, 3 / 5)
# scikit-learn metrics examples
tp, fp, fn = 1, 0, 1  # y_true=[0,1,0,1], y_pred=[0,1,0,0]
prec, rec = tp / (tp + fp), tp / (tp + fn)
check("sklearn precision", 1.0, prec); check("sklearn recall", 0.5, rec); f1 = 2 * prec * rec / (prec + rec)
check("sklearn f1 (page prints 0.66..., a truncated 2/3)", 0.667, round(f1, 3)); check("sklearn f1 truncated to two places", 0.66, math.floor(f1 * 100) / 100)
# J&M (3rd ed.), 3.5: Shakespeare vocabulary and possible bigrams
check("JM3 V^2 bigrams (book says 844,000,000, rounded)", 844_000_000, 29_066 ** 2, 1_000_000)
# CS50 and Python docs
check("bin(3)", int("11", 2), 3); check("int('01110011', 2)", 115, int("01110011", 2)); check("ord('A')", 65, ord("A"))
check("eight bits max", 255, 2 ** 8 - 1); check("three bits max", 7, 2 ** 3 - 1)
check("selection sort steps n=10 : n(n-1)/2", 45, sum(range(1, 10)))
check("round(0.5)", 0, round(0.5)); check("round(1.5)", 2, round(1.5))
check("17//3", 5, 17 // 3); check("17%3", 2, 17 % 3); check("-3**2", -9, -3 ** 2)
print(f"\n{sum(results)} of {len(results)} numbers confirmed")
sys.exit(0 if all(results) else 1)
