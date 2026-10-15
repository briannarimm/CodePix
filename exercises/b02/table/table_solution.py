# Load the fictional ticket table and split it into X and y.
import pandas as pd


def load(path):
    """Return X (the hours and parts columns) and y (the cost column)."""
    df = pd.read_csv(path, encoding="utf-8")
    X = df[["hours", "parts"]]
    y = df["cost"]
    return X, y


X, y = load("b02_tickets.csv")
print("X shape:", X.shape)
print("y shape:", y.shape)
