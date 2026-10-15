# The Quote Machine's report card. Counts come from a test set of fictional tickets.
# tp: big jobs the machine flagged   fp: small jobs it flagged by mistake
# fn: big jobs it missed             tn: small jobs it correctly left alone
# Write precision, recall and f1, then fill in the model card.

def precision(tp, fp):
    if tp + fp == 0:
        return 0.0
    return tp / (tp + fp)


def recall(tp, fn):
    if tp + fn == 0:
        return 0.0
    return tp / (tp + fn)


def f1(p, r):
    if p + r == 0:
        return 0.0
    return 2 * p * r / (p + r)


MODEL_CARD = {
    "data": "80 fictional repair tickets from Gadget Gulch; 32 held out for testing",
    "intended_use": "flag big jobs so a person double-checks the quote",
    "limits": "tiny made-up data; never tested on real customers; misses some big jobs",
}


if __name__ == "__main__":
    tp, fp, fn, tn = 4, 1, 2, 25
    p, r = precision(tp, fp), recall(tp, fn)
    print(f"precision {p:.2f}  recall {r:.2f}  f1 {f1(p, r):.2f}")
    for field, text in MODEL_CARD.items():
        print(f"{field}: {text}")
