# codepix: py=3.10
# Three fictional repair tickets: ticket id, hours of work, parts used, final cost.
tickets = [
    ["T01", 0.5, 1, 42],
    ["T03", 1.5, 2, 78],
    ["T08", 4.0, 4, 172],
]

X = []
y = []
for ticket in tickets:
    X.append([ticket[1], ticket[2]])  # features: hours, parts
    y.append(ticket[3])               # label: cost

print("X =", X)
print("y =", y)
print(len(X), "rows,", len(X[0]), "features each")
