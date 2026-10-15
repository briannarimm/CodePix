# Packing plans for the shipping bench, with help from the math drawer.
import math


def boxes_needed(parts, per_box):
    # Divide, then round up: a partly full box still counts.
    return math.ceil(parts / per_box)


def tile_side(area):
    # The side of a square is the square root of its area.
    return math.sqrt(area)


print("Boxes for 50 springs, 12 per box:", boxes_needed(50, 12))
print("Side of a 49 square-inch tile:", tile_side(49))
