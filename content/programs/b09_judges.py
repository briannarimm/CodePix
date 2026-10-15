# codepix: py=3.12
# codepix: output-only
# codepix: needs=numpy,sklearn
# Three judges, one set of fictional gadgets, two new tickets.
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

X = [[1, 2], [2, 3], [3, 2], [4, 4], [7, 8], [8, 6], [9, 9], [6, 9]]
y = ["fix", "fix", "fix", "fix", "replace", "replace", "replace", "replace"]
new = [[5, 6], [9, 4]]

judges = {
    "neighbors (k=3)": KNeighborsClassifier(n_neighbors=3),
    "tree (depth 2)": DecisionTreeClassifier(max_depth=2, random_state=0),
    "naive Bayes": GaussianNB(),
}
for name, model in judges.items():
    model.fit(X, y)
    print(f"{name:16}", model.predict(new))
