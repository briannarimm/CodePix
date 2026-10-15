# codepix: py=3.12
# codepix: output-only
# Shop words as points on a map. We invented these numbers for the demo; no model made them.
import math

where = {
    "kettle": (2.0, 8.0),
    "teapot": (2.5, 7.0),
    "toaster": (3.5, 8.5),
    "spring": (8.0, 2.0),
    "bolt": (7.0, 1.0),
    "washer": (8.5, 3.0),
    "radio": (5.0, 5.0),
}


def nearest(word):
    others = [w for w in where if w != word]
    return sorted(others, key=lambda w: math.dist(where[word], where[w]))


for word in ("kettle", "spring"):
    close = nearest(word)
    print(f"{word}: nearest {close[0]} and {close[1]}, farthest {close[-1]}")
