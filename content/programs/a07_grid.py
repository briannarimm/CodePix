# A bin rack: a list of rows, and each row is a list.
rack = [
    ["gear", "spring"],
    ["bolt", "fuse"],
]
print(rack[1])
print(rack[1][0])
rack[0][1] = "coil"
print(rack)
