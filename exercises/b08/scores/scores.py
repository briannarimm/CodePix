# Scorekeeping for a yes-or-no machine. 1 means yes (urgent), 0 means no.
# 1. count(actual, predicted) returns the four counts (tp, fp, fn, tn).
# 2. precision(tp, fp) and recall(tp, fn) return a share between 0 and 1.
#    If the bottom of the fraction is 0, return 0.0 instead of crashing.
# 3. baseline(actual) is the accuracy of a lazy machine that always gives
#    the most common answer in actual.


def count(actual, predicted):
    tp = fp = fn = tn = 0
    # Your code goes here.
    return tp, fp, fn, tn


def precision(tp, fp):
    return 0.0  # replace this line


def recall(tp, fn):
    return 0.0  # replace this line


def baseline(actual):
    return 0.0  # replace this line


if __name__ == "__main__":
    actual = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]
    predicted = [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0]
    tp, fp, fn, tn = count(actual, predicted)
    print("tp", tp, "fp", fp, "fn", fn, "tn", tn)
    print("precision", round(precision(tp, fp), 2), "recall", round(recall(tp, fn), 2))
    print("lazy baseline accuracy", round(baseline(actual), 2))
