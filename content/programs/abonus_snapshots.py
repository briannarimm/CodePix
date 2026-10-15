# A Python model of a logbook of snapshots. (A model of the idea, not Git itself.)
files = {"tracker.py": "v1", "stock.json": "v1"}
logbook = []

logbook.append(dict(files))   # page 1: a full copy of every file's version
files["tracker.py"] = "v2"    # edit one file
logbook.append(dict(files))   # page 2: another full copy

print(len(logbook), "pages")
print("page 1:", logbook[0])
print("page 2:", logbook[1])
