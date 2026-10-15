# codepix: py=3.10
# One unit with a step: it answers 1 when z is above 0, and 0 otherwise.
def unit(w1, w2, b, x1, x2):
    z = w1 * x1 + w2 * x2 + b
    return 1 if z > 0 else 0


print("x1 x2 | AND OR")
for x1 in (0, 1):
    for x2 in (0, 1):
        both = unit(1, 1, -1.5, x1, x2)
        either = unit(1, 1, -0.5, x1, x2)
        print(x1, " ", x2, "|", both, "  ", either)
