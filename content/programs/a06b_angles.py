# How far must the turtle turn at each corner?
for sides in range(3, 7):
    turn = 360 // sides
    print(sides, "sides: turn", turn, "degrees at each corner")
