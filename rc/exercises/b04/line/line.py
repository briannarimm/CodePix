# Score two guessed lines for four fictional tickets.
hours = [0.5, 1.0, 2.0, 4.0]
costs = [42, 48, 86, 172]


def predict(b, w, x):
    """The line's guess for x."""
    return 0  # fix me


def squared_error(b, w, xs, ys):
    """Add up (actual - guess) squared over every ticket."""
    total = 0
    # Your code goes here.
    return total


print("guess A:", float(squared_error(20, 30, hours, costs)))
print("guess B:", float(squared_error(10, 40, hours, costs)))
