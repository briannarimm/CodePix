# codepix: py=3.10
# A hand-wired network: two hidden units (ReLU) and one output unit. It computes XOR.
def relu(z):
    return max(z, 0)


def xor(x1, x2):
    h1 = relu(x1 + x2)        # hidden unit 1
    h2 = relu(x1 + x2 - 1)    # hidden unit 2
    return h1 - 2 * h2        # output unit


for x1 in (0, 1):
    for x2 in (0, 1):
        print(x1, x2, "->", xor(x1, x2))
