# Turn fictional tickets into feature rows (X) and labels (y).
tickets = [
    ["T01", 0.5, 1, 42],
    ["T02", 1.0, 0, 48],
    ["T03", 1.5, 2, 78],
]


def split_tickets(tickets):
    """Return X (a [hours, parts] row per ticket) and y (the costs)."""
    X = []
    y = []
    # Your code goes here.
    return X, y


X, y = split_tickets(tickets)
print("X =", X)
print("y =", y)
