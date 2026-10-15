# Save an order card as JSON, then load it back.
import json

order = {"customer": "Toaster T-9", "parts": ["coil", "knob"], "paid": False}
with open("a11_order.json", "w", encoding="utf-8") as f:
    json.dump(order, f)
with open("a11_order.json", encoding="utf-8") as f:
    back = json.load(f)
print(back)
print(back == order)
