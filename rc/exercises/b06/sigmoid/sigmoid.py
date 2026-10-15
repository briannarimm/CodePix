# A yes-or-no machine for the Quote Machine.
# 1. sigmoid(z) squeezes any score z into a number between 0 and 1.
#    The formula is 1 / (1 + e to the power -z). math.exp(x) gives e to the power x.
# 2. decide(p, threshold) answers "yes" when p is at least the threshold, otherwise "no".
import math


def sigmoid(z):
    return 0  # replace this line


def decide(p, threshold=0.5):
    return "no"  # replace this line


if __name__ == "__main__":
    for z in [-2, 0, 2]:
        p = sigmoid(z)
        print(z, round(p, 3), decide(p))
