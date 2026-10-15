# codepix: py=3.12
# codepix: output-only
# codepix: needs=numpy
# Attention as a weighted sum, with tiny invented vectors.
# The note: "the kettle sat on the bench because it was leaking"
import numpy as np

words = ["kettle", "bench", "leaking"]
keys = np.array([[2.0, 0.5], [0.2, 1.0], [1.5, 0.0]])    # one key per word
values = np.array([[1.0, 0.0], [0.0, 1.0], [0.5, 0.5]])  # one value per word
query = np.array([1.0, 0.2])                              # the query for "it"

scores = keys @ query                             # one score per key (a dot product)
weights = np.exp(scores) / np.exp(scores).sum()   # softmax: positive, adds up to 1
for word, w in zip(words, weights):
    print(f"{word:8} weight {w:.2f}")
print("weights add up to", round(weights.sum(), 2))
print("weighted sum of the values:", np.round(weights @ values, 2))
