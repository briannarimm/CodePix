# codepix: py=3.10
# Does a gadget need a new part? A hand-made yes-or-no machine.
# The weights and the bias are our own guesses. Nothing is learned yet.
import math

bias = -3.0
w_age = 0.5      # for each year of age
w_rattle = 2.0   # rattles is 1 if it rattles, 0 if it does not

tickets = [("toaster", 2, 0), ("kettle", 4, 1), ("radio", 9, 1)]

for name, age, rattles in tickets:
    z = bias + w_age * age + w_rattle * rattles
    p = 1 / (1 + math.exp(-z))
    answer = "yes" if p >= 0.5 else "no"
    print(name, "z =", z, "p =", round(p, 2), "new part?", answer)
