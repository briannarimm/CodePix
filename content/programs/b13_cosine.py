# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy
# Cosine similarity: the cosine of the angle between two vectors.
# First with one-hot vectors, then with our invented map positions.
import numpy as np


def cosine(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


words = ["kettle", "teapot", "bolt"]
one_hot = np.eye(3)
print("one-hot vectors:")
print(one_hot)
print("kettle vs teapot:", f"{cosine(one_hot[0], one_hot[1]):.3f}")
print("kettle vs bolt:  ", f"{cosine(one_hot[0], one_hot[2]):.3f}")

map_points = np.array([[2.0, 8.0], [2.5, 7.0], [7.0, 1.0]])
print("map positions:")
print("kettle vs teapot:", f"{cosine(map_points[0], map_points[1]):.3f}")
print("kettle vs bolt:  ", f"{cosine(map_points[0], map_points[2]):.3f}")
