# codepix: py=3.12
# Learn a sorting rule from examples instead of writing it by hand.
# Each example: the sound a gadget made, and how big the job turned out (fictional).
examples = [
    ("grinding", "big"), ("grinding", "big"), ("grinding", "quick"),
    ("quiet", "quick"), ("quiet", "quick"),
    ("humming", "big"), ("humming", "quick"), ("humming", "big"),
]

counts = {}
for sound, size in examples:
    if sound not in counts:
        counts[sound] = {"big": 0, "quick": 0}
    counts[sound][size] = counts[sound][size] + 1

for sound in counts:
    tally = counts[sound]
    best = max(tally, key=tally.get)
    print(sound, tally, "->", best)
