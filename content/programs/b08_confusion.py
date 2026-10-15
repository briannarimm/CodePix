# codepix: py=3.10
# Score a fictional "is it urgent?" machine on 12 tickets. 1 means urgent.
actual    = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]
predicted = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0]

tp = fp = fn = tn = 0
for a, p in zip(actual, predicted):
    if a == 1 and p == 1:
        tp += 1
    elif a == 0 and p == 1:
        fp += 1
    elif a == 1 and p == 0:
        fn += 1
    else:
        tn += 1

accuracy = (tp + tn) / (tp + tn + fp + fn)
precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * precision * recall / (precision + recall)
print("tp", tp, "fp", fp, "fn", fn, "tn", tn)
print("accuracy", round(accuracy, 2), "precision", round(precision, 2))
print("recall", round(recall, 2), "f1", round(f1, 2))
