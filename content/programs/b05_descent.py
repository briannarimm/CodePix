# codepix: py=3.10
# codepix: output-only
# Gradient descent in plain Python on four fictional tickets.
hours = [0.5, 1.0, 2.0, 4.0]
costs = [42, 48, 86, 172]


def mse(b, w):
    total = 0
    for x, y in zip(hours, costs):
        total = total + (y - (b + w * x)) ** 2
    return total / len(hours)


def slope_b(b, w):  # feel the ground: nudge b a tiny bit each way
    tiny = 0.001
    return (mse(b + tiny, w) - mse(b - tiny, w)) / (2 * tiny)


def slope_w(b, w):  # the same for w
    tiny = 0.001
    return (mse(b, w + tiny) - mse(b, w - tiny)) / (2 * tiny)


b, w = 0.0, 0.0
learning_rate = 0.05
loss = mse(b, w)
print(f"start    b={b:6.2f}  w={w:6.2f}  loss={loss:9.2f}")
for i in range(1, 501):
    b, w = b - learning_rate * slope_b(b, w), w - learning_rate * slope_w(b, w)
    new_loss = mse(b, w)
    if loss - new_loss < 0.001:
        print(f"step {i:>3} b={b:6.2f}  w={w:6.2f}  loss={new_loss:9.2f}  (stopped improving)")
        break
    if i <= 4 or i % 5 == 0:
        print(f"step {i:>3} b={b:6.2f}  w={w:6.2f}  loss={new_loss:9.2f}")
    loss = new_loss
