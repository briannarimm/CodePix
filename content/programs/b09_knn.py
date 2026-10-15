# codepix: py=3.12
# Fix it or replace it? Ask the three most similar past gadgets (fictional).
import math

# (age in years, repair estimate in tens of dollars, what the shop decided)
past = [(1, 2, "fix"), (2, 3, "fix"), (3, 2, "fix"), (4, 4, "fix"),
        (7, 8, "replace"), (8, 6, "replace"), (9, 9, "replace"), (6, 9, "replace")]
new = (5, 6)
k = 3

ranked = sorted(past, key=lambda row: math.dist(new, row[:2]))
nearest = ranked[:k]
votes = {}
for age, cost, decision in nearest:
    votes[decision] = votes.get(decision, 0) + 1

print("nearest:", nearest)
print("votes:", votes)
print("answer:", max(votes, key=votes.get))
