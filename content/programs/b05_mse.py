# codepix: py=3.12
# codepix: output-only
# codepix: needs=sklearn
# Mean squared error by hand and with scikit-learn, on scikit-learn's own example numbers.
from sklearn.metrics import mean_squared_error

y_true = [3, -0.5, 2, 7]
y_pred = [2.5, 0.0, 2, 8]

total = 0
for real, guess in zip(y_true, y_pred):
    total = total + (real - guess) ** 2
print("by hand:     ", total / len(y_true))
print("scikit-learn:", mean_squared_error(y_true, y_pred))
