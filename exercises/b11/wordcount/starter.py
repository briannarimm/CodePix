# Words as numbers.
# tokens(text) returns the words of text in lowercase, with . , ! ? stripped off the ends.
# bag(text) returns a dictionary from each word to how many times it appears.
# pairs(text) returns a dictionary from each pair of neighboring words to its count.


def tokens(text):
    return text.split()  # lowercase and strip punctuation too


def bag(text):
    counts = {}
    # Your code goes here.
    return counts


def pairs(text):
    counts = {}
    # Your code goes here.
    return counts


if __name__ == "__main__":
    note = "The lamp flickers. The lamp hums!"
    print(tokens(note))
    print(bag(note))
    print(pairs(note))
