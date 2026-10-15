# codepix: py=3.10
# codepix: output-only
# codepix: needs=sklearn
# The same XOR job, learned by scikit-learn's small neural network from four examples.
import sklearn
from sklearn.neural_network import MLPClassifier

X = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 1, 1, 0]

net = MLPClassifier(hidden_layer_sizes=(4,), activation="relu", solver="lbfgs", random_state=1, max_iter=1000)
net.fit(X, y)

print("scikit-learn", sklearn.__version__)
print("predictions:", [int(p) for p in net.predict(X)])
print("answers:    ", y)
print("hidden-layer weights (rows, columns):", net.coefs_[0].shape)
