# A trap: one list on the blueprint is shared by every robot.
class Robot:
    tricks = []

    def __init__(self, name):
        self.name = name
        print("Built", name)

    def learn(self, trick):
        self.tricks.append(trick)
        print(self.name, "learned", trick)


mop = Robot("Mop-3")
sweep = Robot("Sweepy")
mop.learn("spin")
sweep.learn("beep")
mop_list = mop.tricks
sweep_list = sweep.tricks
print(mop_list)
print(sweep_list)
