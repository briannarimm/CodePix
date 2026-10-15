# Look for a part one bin at a time, and count the looks.
def linear_search(bins, target):
    looks = 0
    for i in range(len(bins)):
        looks = looks + 1
        if bins[i] == target:
            return i, looks
    return -1, looks


bins = ["cog", "spring", "bolt", "washer", "gear", "nut"]
print(linear_search(bins, "gear"))
print(linear_search(bins, "zipper"))
