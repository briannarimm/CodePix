# codepix: py=3.10
# Shuffle ten fictional tickets, then deal them into three piles.
import random

tickets = ["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08", "T09", "T10"]

random.seed(7)
random.shuffle(tickets)

train = tickets[:6]
validate = tickets[6:8]
test = tickets[8:]

print("train:   ", train)
print("validate:", validate)
print("test:    ", test)
