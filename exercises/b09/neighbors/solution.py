# Fix it or replace it? Ask the k most similar past gadgets.
# past is a list of (age, estimate, decision) rows. new is an (age, estimate) pair.
# vote(past, new, k) returns the decision that most of the k nearest rows share.
# math.dist(a, b) gives the straight-line distance between two points.
import math


def vote(past, new, k):
    ranked = sorted(past, key=lambda row: math.dist(new, row[:2]))
    nearest = ranked[:k]
    votes = {}
    for age, estimate, decision in nearest:
        votes[decision] = votes.get(decision, 0) + 1
    return max(votes, key=votes.get) if votes else None


if __name__ == "__main__":
    past = [(1, 2, "fix"), (2, 3, "fix"), (3, 2, "fix"), (4, 4, "fix"),
            (7, 8, "replace"), (8, 6, "replace"), (9, 9, "replace"), (6, 9, "replace")]
    print(vote(past, (5, 6), 3))
    print(vote(past, (2, 2), 3))
