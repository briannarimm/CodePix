# Check a model's mistakes group by group. All tickets are fictional.
# Each ticket is (group, real_answer, model_guess). 1 means big job, 0 means not big.
# error_rate(rows): the share of rows where the guess differs from the real answer.
# rates_by_group(rows): a dictionary {group: error rate for that group's rows}.

TICKETS = [
    ("online", 1, 1), ("online", 0, 0), ("online", 0, 0), ("online", 1, 1),
    ("online", 0, 0), ("online", 1, 0), ("online", 0, 0), ("online", 1, 1),
    ("phone", 1, 0), ("phone", 0, 0), ("phone", 1, 0), ("phone", 0, 1),
]


def error_rate(rows):
    # Your code goes here.
    return 0.0


def rates_by_group(rows):
    # Your code goes here.
    return {}


if __name__ == "__main__":
    print(f"all: {error_rate(TICKETS):.0%} wrong")
    for group, rate in rates_by_group(TICKETS).items():
        print(f"{group}: {rate:.0%} wrong")
