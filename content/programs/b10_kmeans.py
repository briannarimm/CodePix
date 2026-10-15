# codepix: py=3.12
# Sort a mixed bin of screws into 2 piles by (length mm, width mm). Fictional screws.
import math

screws = [(10, 2), (12, 3), (11, 2), (30, 6), (32, 5), (29, 6)]
centroids = [(10, 2), (12, 3)]          # two starting guesses

for step in range(1, 4):
    piles = [[], []]
    for s in screws:                     # assign: each screw joins its nearest centroid
        d = [math.dist(s, c) for c in centroids]
        piles[d.index(min(d))].append(s)
    centroids = []                       # move: each centroid goes to its pile's average
    for pile in piles:
        xs = [x for x, y in pile]
        ys = [y for x, y in pile]
        centroids.append((round(sum(xs) / len(xs), 1), round(sum(ys) / len(ys), 1)))
    print("step", step, "centroids", centroids)
