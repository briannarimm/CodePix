# Is any bin empty? Is every bin stocked?
stock = [12, 0, 7]
print(any([n == 0 for n in stock]))
print(all([n > 0 for n in stock]))
print(any([]), all([]))
