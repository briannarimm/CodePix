# codepix: py=3.12
# codepix: output-only
# codepix: needs=numpy,sklearn
# Ten fictional repair tickets: minutes of work and parts used.
# Only two have a label. The rest are marked -1, which means "no label".
import numpy as np
import sklearn
from sklearn.semi_supervised import LabelSpreading

X = np.array([
    [20, 1], [25, 1], [30, 2], [15, 0], [35, 2],
    [140, 6], [160, 7], [120, 5], [180, 8], [150, 6],
])
y = np.array([0, -1, -1, -1, -1, 1, -1, -1, -1, -1])   # 0 = small job, 1 = big job

model = LabelSpreading(kernel="knn", n_neighbors=3)
model.fit(X, y)

print("scikit-learn", sklearn.__version__)
print("labels given:  ", y.tolist())
print("labels it made:", model.transduction_.tolist())
print("new ticket [28, 1]  ->", model.predict([[28, 1]])[0])
print("new ticket [170, 7] ->", model.predict([[170, 7]])[0])
