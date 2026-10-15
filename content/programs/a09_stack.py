def area(width, height):
    return width * height

def paint_cost(width, height, rate):
    size = area(width, height)
    return size * rate

total = paint_cost(3, 4, 2)
print("Paint costs", total)
