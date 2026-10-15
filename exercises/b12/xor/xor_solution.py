# Wire a tiny network that computes XOR: 1 when exactly one input is 1.
# Use two hidden units and one output unit. Each unit is a weighted sum plus a bias.
# The hidden units pass their sum through relu. The output unit uses no activation.
# Do not use ^, != or if in xor(). Units only!


def relu(z):
    return max(z, 0)


def xor(x1, x2):
    h1 = relu(1 * x1 + 1 * x2 + 0)    # counts how many inputs are on
    h2 = relu(1 * x1 + 1 * x2 - 1)    # wakes up only when both are on
    return 1 * h1 - 2 * h2 + 0        # take two away when both are on


if __name__ == "__main__":
    for x1 in (0, 1):
        for x2 in (0, 1):
            print(x1, x2, "->", xor(x1, x2))
