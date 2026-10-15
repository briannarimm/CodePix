# The Overfit Lab on your own machine. Needs numpy and scikit-learn in your venv.
# Run it as it is first. Then try the experiments in the comments at the bottom.
import numpy as np
import sklearn
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures

data = np.loadtxt("repair_times.csv", delimiter=",", skiprows=1)
wear, minutes = data[:, :1], data[:, 1]

held_out = np.arange(len(data)) % 2 == 1          # every second ticket waits for the test
X_train, y_train = wear[~held_out], minutes[~held_out]
X_test, y_test = wear[held_out], minutes[held_out]

print("scikit-learn", sklearn.__version__)
print("degree  train_error  test_error")
for degree in range(1, 10):
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(X_train, y_train)
    train_err = mean_squared_error(y_train, model.predict(X_train))
    test_err = mean_squared_error(y_test, model.predict(X_test))
    print(f"{degree:6}  {train_err:11.1f}  {test_err:10.1f}")

# Experiments:
# 1. Which degree has the lowest test error? Write it here: ...
# 2. Change "% 2 == 1" to "% 4 == 1" so fewer tickets wait for the test. What changes?
# 3. Swap the roles: train on the held-out tickets instead. Does the best degree move?
