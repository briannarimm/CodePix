# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# Let scikit-learn find if-then rules for the same fictional gadgets.
from sklearn.tree import DecisionTreeClassifier, export_text

X = [[1, 2], [2, 3], [3, 2], [4, 4], [7, 8], [8, 6], [9, 9], [6, 9]]
y = ["fix", "fix", "fix", "fix", "replace", "replace", "replace", "replace"]

tree = DecisionTreeClassifier(max_depth=2, random_state=0)
tree.fit(X, y)
print(export_text(tree, feature_names=["age", "estimate"]))
print("new gadget [5, 6]:", tree.predict([[5, 6]]))
