# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# Fit curves of rising degree to 20 fictional repair tickets.
# Score each curve on the tickets it trained on and on tickets it never saw.
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures

data = np.loadtxt("b07_repair_times.csv", delimiter=",", skiprows=1)
wear, minutes = data[:, :1], data[:, 1]

held_out = np.arange(len(data)) % 2 == 1          # every second ticket waits for the test
X_train, y_train = wear[~held_out], minutes[~held_out]
X_test, y_test = wear[held_out], minutes[held_out]

print("degree  train_error  test_error")
for degree in range(1, 10):
    model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
    model.fit(X_train, y_train)
    train_err = mean_squared_error(y_train, model.predict(X_train))
    test_err = mean_squared_error(y_test, model.predict(X_test))
    print(f"{degree:6}  {train_err:11.1f}  {test_err:10.1f}")
