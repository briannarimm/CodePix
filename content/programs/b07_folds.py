# codepix: py=3.12
# 5-fold cross-validation by hand: which tickets sit out each round?
tickets = ["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08", "T09", "T10"]
k = 5
size = len(tickets) // k

for fold in range(k):
    start = fold * size
    held_out = tickets[start:start + size]
    used = tickets[:start] + tickets[start + size:]
    print("round", fold + 1, "validate on", held_out, "train on", len(used))
