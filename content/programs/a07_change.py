# A list can change in place. Each change keeps the same list.
parts = ["gear", "spring", "bolt"]
parts[1] = "coil"
parts.append("fuse")
parts.insert(0, "dial")
parts.remove("bolt")
print(parts)
