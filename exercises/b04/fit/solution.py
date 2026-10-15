# Fit a straight line to twelve fictional tickets with scikit-learn.
from sklearn.linear_model import LinearRegression

hours = [0.5, 1.0, 1.5, 2.0, 0.5, 2.5, 1.0, 4.0, 3.0, 2.0, 3.5, 1.5]
costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]


def fit_line(hours, costs):
    """Return (b, w) for the best straight line through the tickets."""
    X = [[h] for h in hours]
    model = LinearRegression()
    model.fit(X, costs)
    return float(model.intercept_), float(model.coef_[0])


b, w = fit_line(hours, costs)
print(f"b = {b:.2f}  w = {w:.2f}")
