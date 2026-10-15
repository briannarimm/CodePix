# codepix: py=3.12
# Three kinds of message reach the shop inbox (fictional counts).
# For each kind: how many the sorter labeled correctly (tp) and wrongly (fp).
kinds = {"urgent": (3, 7), "normal": (40, 10), "junk": (150, 15)}

precisions = []
all_tp = all_fp = 0
for kind, (tp, fp) in kinds.items():
    p = tp / (tp + fp)
    precisions.append(p)
    all_tp += tp
    all_fp += fp
    print(kind, "precision", round(p, 2))

macro = sum(precisions) / len(precisions)
micro = all_tp / (all_tp + all_fp)
print("macro average", round(macro, 2))
print("micro average", round(micro, 2))
