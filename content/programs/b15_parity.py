# codepix: py=3.12
# Two fairness checks on two fictional models that pick tickets for the rush queue.
# Each ticket: (group, urgent, model A's pick, model B's pick). 1 means yes, 0 means no.
tickets = [
    ("online", 1, 1, 1), ("online", 1, 1, 1), ("online", 1, 1, 1), ("online", 1, 1, 1),
    ("online", 0, 0, 0), ("online", 0, 0, 0), ("online", 0, 0, 0), ("online", 0, 0, 0),
    ("phone", 1, 1, 1), ("phone", 1, 0, 1), ("phone", 0, 1, 0), ("phone", 0, 1, 0),
    ("phone", 0, 1, 0), ("phone", 0, 0, 0), ("phone", 0, 0, 0), ("phone", 0, 0, 0),
]


def share(picks):
    return sum(picks) / len(picks)


for model, col in (("A", 2), ("B", 3)):
    print("model", model)
    for group in ("online", "phone"):
        mine = [t for t in tickets if t[0] == group]
        everyone = [t[col] for t in mine]
        urgent = [t[col] for t in mine if t[1] == 1]
        print(f"  {group:6} rush rate {share(everyone):.0%}, "
              f"urgent tickets rushed {share(urgent):.0%}")
