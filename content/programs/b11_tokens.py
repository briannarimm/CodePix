# codepix: py=3.10
# Turn one fictional repair note into word counts.
note = "Toaster sings off key. Toaster smells of toast, and the toast is burnt."

words = []
for raw in note.lower().split():
    words.append(raw.strip(".,!?"))
print(words)

counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)
