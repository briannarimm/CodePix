# Gradient descent in plain Python on four fictional tickets.
hours = [0.5, 1.0, 2.0, 4.0]
costs = [42, 48, 86, 172]


def mse(b, w, xs, ys):
    """The average of (actual - guess) squared."""
    total = 0
    for x, y in zip(xs, ys):
        total = total + (y - (b + w * x)) ** 2
    return total / len(xs)


def slope_b(b, w, xs, ys, tiny=0.001):
    return (mse(b + tiny, w, xs, ys) - mse(b - tiny, w, xs, ys)) / (2 * tiny)


def slope_w(b, w, xs, ys, tiny=0.001):
    return (mse(b, w + tiny, xs, ys) - mse(b, w - tiny, xs, ys)) / (2 * tiny)


def step(b, w, xs, ys, size):
    """Move b and w a small amount downhill. Return the new (b, w)."""
    sb = slope_b(b, w, xs, ys)
    sw = slope_w(b, w, xs, ys)
    return b - size * sb, w - size * sw


b, w = 0.0, 0.0
for i in range(200):
    b, w = step(b, w, hours, costs, 0.05)
print(f"b = {b:.2f}  w = {w:.2f}  loss = {mse(b, w, hours, costs):.2f}")
