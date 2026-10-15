# A tiny stock book for the shop: save it, load it, check what is running low.
import json

stock = {"spring": 14, "gear": 3, "bolt": 40}
stock["gear"] = stock["gear"] - 1

with open("stock.json", "w", encoding="utf-8") as f:
    json.dump(stock, f)

with open("stock.json", encoding="utf-8") as f:
    loaded = json.load(f)

low = [name for name in loaded if loaded[name] < 5]
print("Loaded:", loaded)
print("Running low:", low)
