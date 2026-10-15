# A gear with eight teeth, for the shop sign.
import turtle

turtle.color("orange")
for tooth in range(8):
    turtle.forward(30)
    turtle.left(90)
    turtle.forward(20)
    turtle.right(90)
    turtle.forward(20)
    turtle.right(90)
    turtle.forward(20)
    turtle.left(90)
    turtle.left(45)
turtle.done()
