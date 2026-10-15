# A blueprint for gadgets, and two gadgets built from it.
class Gadget:
    def __init__(self, name, volts):
        self.name = name
        self.volts = volts
        self.fixed = False
        print("Built the", name)

    def repair(self):
        self.fixed = True
        return self.name + " is fixed"


toaster = Gadget("toaster", 120)
kettle = Gadget("kettle", 230)
print(toaster.repair())
print(toaster.fixed, kettle.fixed)
print(kettle.volts)
