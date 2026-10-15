# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy
# The same invented map as a NumPy array: one row per word, one column per direction.
import numpy as np

words = ["kettle", "teapot", "toaster", "spring", "bolt", "washer", "radio"]
points = np.array([
    [2.0, 8.0], [2.5, 7.0], [3.5, 8.5],
    [8.0, 2.0], [7.0, 1.0], [8.5, 3.0],
    [5.0, 5.0],
])
print("shape:", points.shape)

kettle = points[0]
distances = np.linalg.norm(points - kettle, axis=1)
for i in np.argsort(distances):
    print(f"{words[i]:8} {distances[i]:.2f}")
