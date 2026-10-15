# Count how often each part shows up in the repair notes.
note = "gear fuse gear spring fuse gear"
counts = {}
for word in note.split():
    if word in counts:
        counts[word] = counts[word] + 1
    else:
        counts[word] = 1
print(counts)
