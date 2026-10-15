# codepix: py=3.12
# codepix: output-only
# Same counts, but now the next word is drawn at random, weighted by its count.
import random

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

random.seed(10)
for attempt in range(4):
    word = "the"
    sentence = [word]
    for _ in range(5):
        options = counts.get(word)
        if not options:
            break
        word = random.choices(list(options), weights=list(options.values()))[0]
        sentence.append(word)
    print(" ".join(sentence))
