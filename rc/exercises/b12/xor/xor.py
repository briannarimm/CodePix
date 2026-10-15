# Wire a tiny network that computes XOR: 1 when exactly one input is 1.
# Use two hidden units and one output unit. Each unit is a weighted sum plus a bias.
# The hidden units pass their sum through relu. The output unit uses no activation.
# Do not use ^, != or if in xor(). Units only!


def relu(z):
    return max(z, 0)


def xor(x1, x2):
    h1 = relu(0 * x1 + 0 * x2 + 0)   # hidden unit 1: change the weights and bias
    h2 = relu(0 * x1 + 0 * x2 + 0)   # hidden unit 2: change the weights and bias
    return 0 * h1 + 0 * h2 + 0       # output unit: change the weights and bias


if __name__ == "__main__":
    for x1 in (0, 1):
        for x2 in (0, 1):
            print(x1, x2, "->", xor(x1, x2))
