# codepix: py=3.12
# Give every word in the fictional repair notes a number. Unknown words get <unk>.
notes = [
    "the kettle hums",
    "the lid sticks",
    "the kettle leaks",
]

vocab = {"<unk>": 0}
for note in notes:
    for word in note.split():
        if word not in vocab:
            vocab[word] = len(vocab)
print(vocab)

new_note = "the toaster hums"
ids = [vocab.get(word, vocab["<unk>"]) for word in new_note.split()]
print(new_note, "->", ids)

print("as characters:", list("kettle"))
