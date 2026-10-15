# codepix: py=3.10
# A time line of learning machines, sorted by year. Each event comes from a cited source.
events = [
    (2017, "transformer architecture"),
    (1959, "Samuel's checkers player"),
    (1986, "backpropagation becomes widespread"),
    (1958, "Rosenblatt's perceptron article"),
    (2019, "the rise of prompting"),
]

events.sort()
for year, what in events:
    print(year, what)

first, last = events[0][0], events[-1][0]
print("span:", last - first, "years")
