# The two moves of k-means, by hand.
# assign(points, centroids) returns, for each point, the index of its nearest centroid.
# move(points, labels, k) returns k new centroids: the average (x, y) of each pile.
#   You may assume every pile has at least one point.
import math


def assign(points, centroids):
    labels = []
    # Your code goes here.
    return labels


def move(points, labels, k):
    centroids = []
    # Your code goes here.
    return centroids


if __name__ == "__main__":
    screws = [(10, 2), (12, 3), (11, 2), (30, 6), (32, 5), (29, 6)]
    centroids = [(10, 2), (12, 3)]
    for step in range(3):
        labels = assign(screws, centroids)
        centroids = move(screws, labels, 2)
        print(labels, centroids)
