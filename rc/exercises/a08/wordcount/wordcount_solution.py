# Count how many times each word appears in the note.
note = "my kettle sings at night and my kettle hums at dawn so please fix the kettle"
counts = {}

for word in note.split():
    if word in counts:
        counts[word] = counts[word] + 1
    else:
        counts[word] = 1

print("kettle:", counts.get("kettle"))
