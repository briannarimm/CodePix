# A kettle is a kind of gadget: it borrows what Gadget already knows.
class Gadget:
    def __init__(self, name):
        self.name = name
        print("Built", name)

    def label(self):
        return "Gadget: " + self.name


class Kettle(Gadget):
    def boil(self):
        return self.name + " goes WHEEE"


k = Kettle("Kettle K-2")
print(k.label())
print(k.boil())
