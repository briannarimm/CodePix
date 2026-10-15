# A next-word machine from counts.
# count_pairs(notes) returns a dictionary: for each word, how often each next word follows it.
#   Example: count_pairs(["the fan hums", "the fan rattles"])
#   gives {"the": {"fan": 2}, "fan": {"hums": 1, "rattles": 1}}
# most_likely(counts, word) returns the next word seen most often after word,
#   or None if word was never followed by anything.

NOTES = [
    "the fan hums",
    "the fan rattles",
    "the lamp flickers",
    "the fan rattles loudly",
]


def count_pairs(notes):
    counts = {}
    for note in notes:
        words = note.split()
        for first, second in zip(words, words[1:]):
            counts.setdefault(first, {})
            counts[first][second] = counts[first].get(second, 0) + 1
    return counts


def most_likely(counts, word):
    options = counts.get(word)
    if not options:
        return None
    return max(options, key=options.get)


if __name__ == "__main__":
    counts = count_pairs(NOTES)
    print("after 'the':", counts.get("the"))
    print("best guess after 'fan':", most_likely(counts, "fan"))
