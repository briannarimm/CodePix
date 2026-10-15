# Gadget Gulch stock tracker (fictional shop, fictional parts).
# The stock book is a dict: part name -> how many are on the shelf.
# load_stock and save_stock already work. Finish add, remove and low_stock.
import json


def load_stock(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_stock(stock, path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(stock, f, indent=2, sort_keys=True)


def add(stock, name, count):
    # Put `count` more of `name` on the shelf. A new part starts at 0.
    if name in stock:
        stock[name] = stock[name] + count
    else:
        stock[name] = count


def remove(stock, name, count):
    # Take `count` of `name` off the shelf and return True.
    # If there are not enough (or the part is unknown), change nothing and return False.
    if name not in stock or stock[name] < count:
        return False
    stock[name] = stock[name] - count
    return True


def low_stock(stock, limit=5):
    # Return the names of parts with fewer than `limit` on the shelf, in alphabetical order.
    low = []
    for name in stock:
        if stock[name] < limit:
            low.append(name)
    return sorted(low)


# Run the report only when this file is started directly, so the tests can import it quietly.
if __name__ == "__main__":
    stock = load_stock("stock.json")
    add(stock, "gear", 10)
    remove(stock, "bolt", 5)
    print("Low stock:", ", ".join(low_stock(stock)))
    save_stock(stock, "stock.json")
