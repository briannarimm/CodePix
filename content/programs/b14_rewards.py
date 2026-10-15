# codepix: py=3.12
# codepix: output-only
# Byte looks for a spare fuse on one of three shelves. Finding one earns a reward of 1.
# Byte keeps an average reward per shelf and usually picks the best one so far.
import random

random.seed(12)
chance = {"top": 0.2, "middle": 0.7, "bottom": 0.4}   # hidden from Byte (fictional)
total = {"top": 0.0, "middle": 0.0, "bottom": 0.0}
tries = {"top": 0, "middle": 0, "bottom": 0}


def average(shelf):
    return total[shelf] / tries[shelf] if tries[shelf] else 0.0


for step in range(200):
    if step < 3:
        shelf = list(chance)[step]              # try each shelf once
    elif random.random() < 0.1:
        shelf = random.choice(list(chance))     # sometimes explore
    else:
        shelf = max(chance, key=average)        # usually use the best so far
    reward = 1 if random.random() < chance[shelf] else 0
    total[shelf] += reward
    tries[shelf] += 1

for shelf in chance:
    print(f"{shelf:7} tried {tries[shelf]:3} times, average reward {average(shelf):.2f}")
print("Byte's habit now: look on the", max(chance, key=average), "shelf first")
