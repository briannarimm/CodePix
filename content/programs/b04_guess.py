# codepix: py=3.10
# Two guessed lines for four fictional tickets. Which one makes smaller mistakes?
hours = [0.5, 1.0, 2.0, 4.0]
costs = [42, 48, 86, 172]


def predict(b, w, x):
    return b + w * x


def squared_error(b, w):
    total = 0
    for x, y in zip(hours, costs):
        error = y - predict(b, w, x)
        total = total + error * error
    return total


print("guess A (b=20, w=30):", squared_error(20, 30))
print("guess B (b=10, w=40):", squared_error(10, 40))
