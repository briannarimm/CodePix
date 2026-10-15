# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# Fictional data. Online bookings and phone bookings follow different patterns,
# and the training data holds far more online bookings than phone bookings.
import numpy as np
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(0)


def make(n, cutoff):
    hours = rng.uniform(0, 8, n)              # estimated hours on the job
    big = (hours > cutoff).astype(int)        # 1 = big job
    return hours.reshape(-1, 1), big


X_online, y_online = make(180, cutoff=5)
X_phone, y_phone = make(20, cutoff=2)
X_train = np.vstack([X_online, X_phone])
y_train = np.concatenate([y_online, y_phone])

model = LogisticRegression().fit(X_train, y_train)

for name, cutoff in (("online", 5), ("phone", 2)):
    X_new, y_new = make(100, cutoff)          # fresh tickets the model never saw
    print(f"{name:6} accuracy on new tickets: {model.score(X_new, y_new):.2f}")
