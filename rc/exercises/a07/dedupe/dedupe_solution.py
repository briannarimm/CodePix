# Keep each part once, in the order it first appears.
orders = ["gear", "fuse", "gear", "spring", "fuse", "bolt", "gear"]
unique = []

for part in orders:
    if part not in unique:
        unique.append(part)

print(unique)
