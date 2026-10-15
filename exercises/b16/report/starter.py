# The Quote Machine's report card. Counts come from a test set of fictional tickets.
# tp: big jobs the machine flagged   fp: small jobs it flagged by mistake
# fn: big jobs it missed             tn: small jobs it correctly left alone
# Write precision, recall and f1, then fill in the model card.

def precision(tp, fp):
    # Your code goes here. Return 0.0 if the machine flagged nothing.
    return 0.0


def recall(tp, fn):
    # Your code goes here. Return 0.0 if there were no big jobs.
    return 0.0


def f1(p, r):
    # Your code goes here. Return 0.0 if both are 0.
    return 0.0


MODEL_CARD = {
    "data": "",           # what the machine learned from
    "intended_use": "",   # what it is for, and who checks it
    "limits": "",         # where it should not be trusted
}


if __name__ == "__main__":
    tp, fp, fn, tn = 4, 1, 2, 25
    p, r = precision(tp, fp), recall(tp, fn)
    print(f"precision {p:.2f}  recall {r:.2f}  f1 {f1(p, r):.2f}")
    for field, text in MODEL_CARD.items():
        print(f"{field}: {text}")
