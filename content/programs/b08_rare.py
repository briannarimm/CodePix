# codepix: py=3.10
# A lazy machine that always answers "no". How good does accuracy say it is?


def lazy_scores(positives, total):
    tp, fn = 0, positives          # it never says yes, so it misses every positive
    tn, fp = total - positives, 0
    accuracy = (tp + tn) / total
    recall = tp / (tp + fn)
    return accuracy, recall


print("1% positives:      ", lazy_scores(10, 1000))
print("100 in a million:  ", lazy_scores(100, 1_000_000))
