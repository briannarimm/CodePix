# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# Cross-validation with scikit-learn on 20 fictional tickets.
# The scaler sits inside the pipeline, so each round learns it from that round's training part only.
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_validate
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

# [age in years, price paid in dollars]; label: needed a new part (1) or not (0)
X = [[1, 20], [2, 35], [3, 15], [4, 60], [5, 25], [6, 80], [7, 30], [8, 90], [9, 40], [10, 75],
     [2, 70], [3, 85], [4, 10], [5, 95], [6, 20], [7, 65], [8, 15], [9, 55], [10, 30], [11, 45]]
y = [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1]

model = make_pipeline(StandardScaler(), LogisticRegression())
result = cross_validate(model, X, y, scoring="accuracy")

print("rounds:", len(result["test_score"]))
print("score each round:", result["test_score"].round(2))
print("average:", round(result["test_score"].mean(), 2))
