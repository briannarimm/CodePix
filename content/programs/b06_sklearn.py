# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# Learn the weights from fictional past tickets instead of guessing them.
import sklearn
from sklearn.linear_model import LogisticRegression

# Each row: [age in years, rattles (1 or 0)]. Each label: needed a new part (1) or not (0).
X = [[1, 0], [2, 0], [3, 1], [4, 0], [5, 1], [6, 0],
     [7, 1], [8, 0], [9, 1], [10, 1], [2, 1], [11, 0]]
y = [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1]

model = LogisticRegression()
model.fit(X, y)

print("scikit-learn", sklearn.__version__)
print("weights:", model.coef_.round(2), "bias:", model.intercept_.round(2))
new = [[3, 0], [8, 1]]
print("chance of yes:", model.predict_proba(new)[:, 1].round(2))
print("answers:", model.predict(new))
