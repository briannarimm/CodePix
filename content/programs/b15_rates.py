# codepix: py=3.12
# Twenty fictional tickets: how each customer booked, the real answer (1 = big job) and the model's guess.
tickets = [
    ("online", 1, 1), ("online", 0, 0), ("online", 0, 0), ("online", 1, 1),
    ("online", 0, 0), ("online", 1, 1), ("online", 0, 0), ("online", 0, 1),
    ("online", 1, 1), ("online", 0, 0), ("online", 0, 0), ("online", 1, 1),
    ("online", 0, 0), ("online", 1, 1), ("online", 0, 0), ("online", 0, 0),
    ("phone", 1, 0), ("phone", 0, 0), ("phone", 1, 0), ("phone", 1, 1),
]


def error_rate(rows):
    wrong = sum(1 for _, real, guess in rows if real != guess)
    return wrong / len(rows)


print(f"all tickets: {error_rate(tickets):.0%} wrong")
for group in ("online", "phone"):
    rows = [t for t in tickets if t[0] == group]
    print(f"{group:6} ({len(rows):2} tickets): {error_rate(rows):.0%} wrong")
