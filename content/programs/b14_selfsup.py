# codepix: py=3.10
# Raw text, no labels typed by anyone. The next word in the text becomes the label.
note = "the fan rattles when it spins"
words = note.split()

pairs = []
for i in range(1, len(words)):
    context = " ".join(words[:i])
    label = words[i]
    pairs.append((context, label))

for context, label in pairs:
    print(f"{context:22} -> {label}")
