# codepix: py=3.12
# One neural unit, worked by hand with the numbers from Jurafsky and Martin's example.
import math

weights = [0.2, 0.3, 0.9]
inputs = [0.5, 0.6, 0.1]
bias = 0.5

z = bias
for w, x in zip(weights, inputs):
    z = z + w * x

print("z =", round(z, 2))
print("sigmoid(z) =", round(1 / (1 + math.exp(-z)), 2))
print("relu(z) =", round(max(z, 0), 2))
