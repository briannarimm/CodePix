# codepix: py=3.10
# codepix: output-only
# codepix: needs=sklearn
# scikit-learn's answer for the same four fictional tickets.
from sklearn.linear_model import LinearRegression

X = [[0.5], [1.0], [2.0], [4.0]]  # one row per ticket, one feature (hours)
y = [42, 48, 86, 172]

model = LinearRegression()
model.fit(X, y)
b = model.intercept_
w = model.coef_[0]

total = 0
for row, cost in zip(X, y):
    total = total + (cost - (b + w * row[0])) ** 2
print(f"scikit-learn  b={b:6.2f}  w={w:6.2f}  loss={total / len(y):9.2f}")
