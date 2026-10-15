# Packing plans for the shipping bench, with help from the math drawer.
import math


def boxes_needed(parts, per_box):
    # A box that is only partly full still counts as a box.
    # Right now this answer is too small when there are leftovers. Fix it with a math tool.
    return parts // per_box


def tile_side(area):
    # A square floor tile covers this much area. How long is one side?
    return 0


print("Boxes for 50 springs, 12 per box:", boxes_needed(50, 12))
print("Side of a 49 square-inch tile:", tile_side(49))
