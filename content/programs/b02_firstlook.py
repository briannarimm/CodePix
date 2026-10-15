# codepix: py=3.12
# codepix: output-only
# codepix: needs=pandas
# A first check of the fictional tickets right after reading them in.
import pandas as pd

df = pd.read_csv("b02_tickets.csv", encoding="utf-8")
print(df.tail(2))
print()
print(df.dtypes)
