# codepix: py=3.12
# Which word tends to follow "the" in the shop's (fictional) repair notes?
notes = [
    "the kettle hums and the lid sticks",
    "the radio hums and the dial sticks",
    "the kettle leaks",
]

pairs = {}
after_the = 0
for note in notes:
    words = note.split()
    for first, second in zip(words, words[1:]):
        pairs[(first, second)] = pairs.get((first, second), 0) + 1
        if first == "the":
            after_the += 1

for (first, second), n in sorted(pairs.items()):
    if first == "the":
        print("the", second, n, "of", after_the, "=", round(n / after_the, 2))
