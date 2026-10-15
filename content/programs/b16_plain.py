# codepix: py=3.12
# codepix: output-only
# The Quote Machine in plain Python: is this ticket a big job (cost of 150 or more)?
import csv

with open("b16_tickets.csv", encoding="utf-8", newline="") as f:
    rows = [(float(r["hours"]), int(r["big_job"])) for r in csv.DictReader(f)]

train, test = rows[:60], rows[60:]     # the tickets are in random order already


def scores(cutoff, data):
    tp = sum(1 for h, real in data if h >= cutoff and real == 1)
    fp = sum(1 for h, real in data if h >= cutoff and real == 0)
    fn = sum(1 for h, real in data if h < cutoff and real == 1)
    tn = len(data) - tp - fp - fn
    return tp, fp, fn, tn


def accuracy(c):
    tp, fp, fn, tn = c
    return (tp + tn) / (tp + fp + fn + tn)


# "Training": try every cutoff and keep the one with the best accuracy on the training tickets.
cutoffs = sorted({h for h, _ in train})
best = max(cutoffs, key=lambda c: accuracy(scores(c, train)))
print("learned rule: big job if hours >=", best)

tp, fp, fn, tn = scores(best, test)
print("test tickets:", len(test), "| tp fp fn tn:", tp, fp, fn, tn)
print(f"accuracy {accuracy((tp, fp, fn, tn)):.2f}, precision {tp / (tp + fp):.2f}, recall {tp / (tp + fn):.2f}")

never = sum(1 for _, real in test if real == 0) / len(test)
print(f"baseline that always says 'not big': accuracy {never:.2f}, recall 0.00")
