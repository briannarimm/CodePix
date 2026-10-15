# Swap the contents of two boxes.
# Ms. Gridlock put the springs in the left bin and the gears in the right bin.
# Make left hold "gears" and right hold "springs".
# Do not type the words "gears" or "springs" again below this line.
left = "springs"
right = "gears"

# A third box holds one value while we move the other.
spare = left
left = right
right = spare

print("left:", left)
print("right:", right)
