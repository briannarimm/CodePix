# Put the time machine's events in order.
# in_order(events) returns a NEW list sorted by year, oldest first. Do not change the original list.
# span(events) returns how many years lie between the oldest and the newest event.

EVENTS = [
    (2017, "transformer architecture"),
    (1959, "Samuel's checkers paper"),
    (1986, "backpropagation becomes widespread"),
    (1958, "Rosenblatt's perceptron article"),
]


def in_order(events):
    return sorted(events)


def span(events):
    years = [year for year, _ in events]
    return max(years) - min(years)


if __name__ == "__main__":
    for year, what in in_order(EVENTS):
        print(year, what)
    print("span:", span(EVENTS), "years")
