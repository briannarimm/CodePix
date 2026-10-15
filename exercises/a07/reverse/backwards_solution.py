# Make a new list that holds the parts in the opposite order.
parts = ["gear", "spring", "bolt", "fuse"]
backwards = []

for part in parts:
    backwards.insert(0, part)

print(backwards)
