# Cross-validation by hand.
# folds(items, k) cuts items into k equal parts, in order.
# It returns a list of k rounds. Each round is a pair (validate, train):
#   validate is one part, and train is every other item, in the original order.
# You may assume len(items) divides evenly by k.


def folds(items, k):
    rounds = []
    size = len(items) // k
    # Your code goes here: one round for each part.
    return rounds


if __name__ == "__main__":
    tickets = ["T1", "T2", "T3", "T4", "T5", "T6"]
    for validate, train in folds(tickets, 3):
        print("validate", validate, "train", train)
