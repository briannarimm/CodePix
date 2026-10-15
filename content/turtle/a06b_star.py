# A five-point star, then a dashed line under it.
import turtle

turtle.color("red")
for point in range(5):
    turtle.forward(120)
    turtle.right(144)
turtle.penup()
turtle.right(90)
turtle.forward(95)
turtle.left(90)
for dash in range(6):
    turtle.pendown()
    turtle.forward(10)
    turtle.penup()
    turtle.forward(10)
turtle.done()
