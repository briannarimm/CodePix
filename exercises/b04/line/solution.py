# Score two guessed lines for four fictional tickets.
hours = [0.5, 1.0, 2.0, 4.0]
costs = [42, 48, 86, 172]


def predict(b, w, x):
    """The line's guess for x."""
    return b + w * x


def squared_error(b, w, xs, ys):
    """Add up (actual - guess) squared over every ticket."""
    total = 0
    for x, y in zip(xs, ys):
        error = y - predict(b, w, x)
        total = total + error * error
    return total


print("guess A:", float(squared_error(20, 30, hours, costs)))
print("guess B:", float(squared_error(10, 40, hours, costs)))
