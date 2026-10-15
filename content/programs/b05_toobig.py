# codepix: py=3.10
# codepix: output-only
# The same descent with a learning rate that is too big.
hours = [0.5, 1.0, 2.0, 4.0]
costs = [42, 48, 86, 172]


def mse(b, w):
    total = 0
    for x, y in zip(hours, costs):
        total = total + (y - (b + w * x)) ** 2
    return total / len(hours)


def slope_b(b, w):
    tiny = 0.001
    return (mse(b + tiny, w) - mse(b - tiny, w)) / (2 * tiny)


def slope_w(b, w):
    tiny = 0.001
    return (mse(b, w + tiny) - mse(b, w - tiny)) / (2 * tiny)


b, w = 0.0, 0.0
learning_rate = 0.2
for i in range(1, 6):
    b, w = b - learning_rate * slope_b(b, w), w - learning_rate * slope_w(b, w)
    print(f"step {i}  w={w:10.1f}  loss={mse(b, w):14.1f}")
