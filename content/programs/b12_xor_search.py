# codepix: py=3.12
# codepix: output-only
# Try 729 different settings for ONE step unit and keep the best score on XOR.
def unit(w1, w2, b, x1, x2):
    z = w1 * x1 + w2 * x2 + b
    return 1 if z > 0 else 0


xor_table = [(0, 0, 0), (0, 1, 1), (1, 0, 1), (1, 1, 0)]
grid = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]

best = 0
tried = 0
for w1 in grid:
    for w2 in grid:
        for b in grid:
            tried += 1
            right = 0
            for x1, x2, want in xor_table:
                if unit(w1, w2, b, x1, x2) == want:
                    right += 1
            best = max(best, right)

print("settings tried:", tried)
print("best score:", best, "out of 4")
