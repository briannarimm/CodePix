# codepix: py=3.12
import math


def sigmoid(z):
    return 1 / (1 + math.exp(-z))


for z in [-2, 0, 1, 2]:
    print(z, round(sigmoid(z), 3))
