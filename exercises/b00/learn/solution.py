# Learn a sorting rule from examples (fictional tickets).
# Each example is (sound, size): the sound the gadget made, and how big the job was.
examples = [
    ("grinding", "big"), ("grinding", "big"), ("grinding", "quick"),
    ("quiet", "quick"), ("quiet", "quick"),
    ("humming", "big"), ("humming", "quick"), ("humming", "big"),
]


def learn(examples):
    """Return {sound: the size seen most often with that sound}."""
    counts = {}
    for sound, size in examples:
        if sound not in counts:
            counts[sound] = {"big": 0, "quick": 0}
        counts[sound][size] = counts[sound][size] + 1
    rule = {}
    for sound in counts:
        rule[sound] = max(counts[sound], key=counts[sound].get)
    return rule


print(learn(examples))
