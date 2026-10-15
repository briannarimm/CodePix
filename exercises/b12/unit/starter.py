# One neural unit by hand.
# weighted_sum multiplies each weight by its input, adds them up, then adds the bias.
# relu gives back z when z is above 0, and 0 otherwise.


def weighted_sum(weights, inputs, bias):
    # Your code goes here.
    return 0


def relu(z):
    # Your code goes here.
    return 0


if __name__ == "__main__":
    z = weighted_sum([0.2, 0.3, 0.9], [0.5, 0.6, 0.1], 0.5)
    print("z =", round(z, 2))
    print("relu(z) =", round(relu(z), 2))
    print("relu(-3) =", relu(-3))
