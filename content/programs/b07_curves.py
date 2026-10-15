# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# The Overfit Lab draws these curves. Same tickets and split as b07_overfit.py.
# Each "curve" line lists the fitted minutes at 25 evenly spaced wear values.
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures

data = np.loadtxt("b07_repair_times.csv", delimiter=",", skiprows=1)
wear, minutes = data[:, :1], data[:, 1]
held_out = np.arange(len(data)) % 2 == 1

for (w,), m, h in zip(wear, minutes, held_out):
    print("ticket", w, m, "test" if h else "train")

grid = np.linspace(-0.95, 0.95, 25)[:, None]
for degree in range(1, 10):
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(wear[~held_out], minutes[~held_out])
    print("curve", degree, " ".join(f"{v:.1f}" for v in model.predict(grid)))
