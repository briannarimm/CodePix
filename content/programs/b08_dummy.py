# codepix: py=3.12
# codepix: output-only
# codepix: needs=numpy,sklearn
# A sanity check: the laziest machine scikit-learn can build.
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score

# 12 fictional tickets: [hours, parts], and 1 if the job was urgent
X = [[0.5, 1], [1.0, 0], [1.5, 2], [2.0, 1], [0.5, 0], [2.5, 3],
     [1.0, 1], [4.0, 2], [3.0, 1], [2.0, 0], [3.5, 2], [1.5, 1]]
actual = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]

lazy = DummyClassifier(strategy="most_frequent")
lazy.fit(X, actual)
print("lazy guesses:", lazy.predict(X).tolist())
print("lazy accuracy:", round(accuracy_score(actual, lazy.predict(X)), 2))
print("two new tickets:", lazy.predict([[9.0, 9], [0.1, 0]]).tolist())

# Byte's answers for the same 12 tickets, from b08_confusion
byte = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0]
print("Byte's accuracy:", round(accuracy_score(actual, byte), 2))
