# codepix: py=3.10
# Ms. Gridlock's hand-written rules for sorting repair tickets (fictional).
tickets = [
    ("fridge", "humming", "big"),
    ("toaster", "grinding", "big"),
    ("kettle", "quiet", "quick"),
    ("fan", "grinding", "quick"),
    ("lamp", "quiet", "big"),
]


def rule(appliance, sound):
    if appliance == "fridge":
        return "big"
    if sound == "grinding":
        return "big"
    return "quick"


right = 0
for appliance, sound, actual in tickets:
    guess = rule(appliance, sound)
    if guess == actual:
        right = right + 1
    else:
        print("rule broke on:", appliance, sound)
print(right, "of", len(tickets), "right")
