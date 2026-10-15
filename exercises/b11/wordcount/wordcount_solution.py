# Words as numbers.
# tokens(text) returns the words of text in lowercase, with . , ! ? stripped off the ends.
# bag(text) returns a dictionary from each word to how many times it appears.
# pairs(text) returns a dictionary from each pair of neighboring words to its count.


def tokens(text):
    return [raw.strip(".,!?") for raw in text.lower().split()]


def bag(text):
    counts = {}
    for w in tokens(text):
        counts[w] = counts.get(w, 0) + 1
    return counts


def pairs(text):
    counts = {}
    words = tokens(text)
    for first, second in zip(words, words[1:]):
        counts[(first, second)] = counts.get((first, second), 0) + 1
    return counts


if __name__ == "__main__":
    note = "The lamp flickers. The lamp hums!"
    print(tokens(note))
    print(bag(note))
    print(pairs(note))
