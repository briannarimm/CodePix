# codepix: py=3.12
# codepix: output-only
# codepix: needs=pandas
# Twelve fictional repair tickets as a pandas table.
import pandas as pd

df = pd.read_csv("b02_tickets.csv", encoding="utf-8")
print(df.head(3))
print()
print(df.describe().round(1))
print()
X = df[["hours", "parts"]]
y = df["cost"]
print("X:", type(X).__name__, X.shape)
print("y:", type(y).__name__, y.shape)
