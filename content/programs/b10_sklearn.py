# codepix: py=3.10
# codepix: output-only
# codepix: needs=numpy,sklearn
# The same idea with scikit-learn, on nine fictional screws and three piles.
from sklearn.cluster import KMeans

screws = [[10, 2], [12, 3], [11, 2], [30, 6], [32, 5], [29, 6], [20, 9], [21, 10], [19, 9]]

model = KMeans(n_clusters=3, init="k-means++", n_init=10, random_state=0)
model.fit(screws)
print("pile of each screw:", model.labels_)
print("centroids:")
print(model.cluster_centers_.round(1))
print("inertia:", round(model.inertia_, 1))

# One random start at a time can land somewhere worse.
for seed in range(4):
    once = KMeans(n_clusters=3, init="random", n_init=1, random_state=seed).fit(screws)
    print("random start", seed, "inertia:", round(once.inertia_, 1))
