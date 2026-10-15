# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
from sklearn.metrics import confusion_matrix, f1_score, precision_score, recall_score

# scikit-learn's own small example
y_true = [0, 1, 0, 1]
y_pred = [0, 1, 0, 0]
print("precision", precision_score(y_true, y_pred))
print("recall", recall_score(y_true, y_pred))
print("f1", f1_score(y_true, y_pred))

# our 12 fictional tickets from the plain-Python program
actual    = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]
predicted = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0]
matrix = confusion_matrix(actual, predicted)
print(matrix)
tn, fp, fn, tp = matrix.ravel()
print("tn", tn, "fp", fp, "fn", fn, "tp", tp)
