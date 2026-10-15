# A tiny model of a .gitignore file, so you can see how its lines are read.
# This uses our own simplified rules. Real Git patterns can do much more.
#
# read_patterns(text): one pattern per line. Skip blank lines and lines that start with #.
# is_ignored(name, patterns): True if name equals a pattern exactly,
#   or if a pattern starts with "*" and name ends with the rest of it ("*.bak" matches "old.bak").


def read_patterns(text):
    # Your code goes here.
    return text.split("\n")


def is_ignored(name, patterns):
    # Your code goes here.
    return False


with open("gitignore_example.txt", encoding="utf-8") as f:
    patterns = read_patterns(f.read())
print(patterns)
for name in ["tracker.py", ".venv", "prices.bak", "scratch.txt"]:
    print(name, is_ignored(name, patterns))
