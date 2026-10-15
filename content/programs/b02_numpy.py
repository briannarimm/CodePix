# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy
# The same three fictional tickets as NumPy arrays.
import numpy as np

X = np.array([[0.5, 1], [1.5, 2], [4.0, 4]])
y = np.array([42, 78, 172])

print(X)
print("ndim:", X.ndim, " shape:", X.shape, " size:", X.size)
print("total:", y.sum(), " cheapest:", y.min(), " dearest:", y.max())
print("with a $5 call-out fee:", y + 5)
