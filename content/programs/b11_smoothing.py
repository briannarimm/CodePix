# codepix: py=3.12
# A pair that never showed up gets a count of zero. Add-one smoothing fixes that.
# The repair notes are fictional.
notes = [
    "the kettle hums and the lid sticks",
    "the radio hums and the dial sticks",
    "the kettle leaks",
    "a toaster sparks",
]

pairs = {}
vocab = set()
for note in notes:
    words = note.split()
    vocab.update(words)
    for first, second in zip(words, words[1:]):
        pairs[(first, second)] = pairs.get((first, second), 0) + 1
print("different words:", len(vocab))


def chance(first, second, add=0):
    # add=0 uses the plain counts; add=1 adds one to every count.
    total = sum(n for (a, _), n in pairs.items() if a == first)
    n = pairs.get((first, second), 0)
    return (n + add) / (total + add * len(vocab))


for word in ["kettle", "toaster"]:
    print(f"the {word}: plain {chance('the', word):.2f}, add-one {chance('the', word, 1):.2f}")

plain = chance("the", "toaster") * chance("toaster", "sparks")
smooth = chance("the", "toaster", 1) * chance("toaster", "sparks", 1)
print(f"'the toaster sparks': plain {plain:.3f}, add-one {smooth:.3f}")
