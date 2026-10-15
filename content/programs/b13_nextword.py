# codepix: py=3.12
# Count which word follows which in four fictional repair notes, then guess the next word.
notes = [
    "the kettle needs a new switch",
    "the toaster needs a new spring",
    "the kettle hums and the lid sticks",
    "the radio needs a new knob",
]

counts = {}
for note in notes:
    words = note.split()
    for first, second in zip(words, words[1:]):
        counts.setdefault(first, {})
        counts[first][second] = counts[first].get(second, 0) + 1

print("after 'the':", counts["the"])
print("after 'new':", counts["new"])

word = "the"
sentence = [word]
for _ in range(5):
    options = counts.get(word)
    if not options:
        break
    word = max(options, key=options.get)
    sentence.append(word)
print(" ".join(sentence))
