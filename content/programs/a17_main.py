# A recipe card, plus a "run me" block that only runs when this file is the program.
def low_stock(stock, limit=5):
    return sorted(name for name in stock if stock[name] < limit)

print("__name__ is", repr(__name__))

if __name__ == "__main__":
    shelf = {"spring": 14, "gear": 2, "bolt": 3}
    print("Running low:", low_stock(shelf))
