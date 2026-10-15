# Byte learns which shelf usually has a spare fuse, from rewards (1 = found one, 0 = nothing).
# new_average(average, tries, reward): the average after one more reward.
#   average is the average of the first `tries` rewards.
#   Example: new_average(0.5, 2, 1) is 0.6666... (rewards 1, 0, then 1)
# best_shelf(averages): the shelf name with the highest average. This is Byte's habit.

def new_average(average, tries, reward):
    # Your code goes here.
    return average


def best_shelf(averages):
    # Your code goes here.
    return None


if __name__ == "__main__":
    averages = {"top": 0.0, "middle": 0.0, "bottom": 0.0}
    tries = {"top": 0, "middle": 0, "bottom": 0}
    log = [("top", 0), ("middle", 1), ("bottom", 0), ("middle", 1), ("top", 1), ("middle", 0)]
    for shelf, reward in log:
        averages[shelf] = new_average(averages[shelf], tries[shelf], reward)
        tries[shelf] += 1
    for shelf in averages:
        print(shelf, round(averages[shelf], 2))
    print("habit:", best_shelf(averages))
