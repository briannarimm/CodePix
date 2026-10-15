# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# Two more judges for the same fictional gadgets: a forest and a margin.
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

X = [[1, 2], [2, 3], [3, 2], [4, 4], [7, 8], [8, 6], [9, 9], [6, 9]]
y = ["fix", "fix", "fix", "fix", "replace", "replace", "replace", "replace"]
new = [[5, 6], [9, 4]]

forest = RandomForestClassifier(n_estimators=100, random_state=0)
forest.fit(X, y)
print("forest trees:", len(forest.estimators_))
print("forest says:", forest.predict(new).tolist())
print("forest odds", forest.classes_.tolist(), forest.predict_proba(new).round(2).tolist())

svm = SVC(kernel="linear")
svm.fit(X, y)
print("SVM says:", svm.predict(new).tolist())
print("support vectors:", svm.support_vectors_.tolist())
