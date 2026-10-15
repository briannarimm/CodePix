# codepix: py=3.12
# codepix: output-only
# codepix: needs=pandas,sklearn
# The same line, fitted by scikit-learn.
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("b02_tickets.csv", encoding="utf-8")
X = df[["hours"]]
y = df["cost"]

model = LinearRegression()
model.fit(X, y)
print(f"w = {model.coef_[0]:.2f}   b = {model.intercept_:.2f}")

new = pd.DataFrame({"hours": [2.5]})
print(f"a 2.5-hour job: ${model.predict(new)[0]:.2f}")
