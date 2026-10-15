# codepix: needs=texttable
# codepix: output-only
# A fictional parts table, drawn by the texttable package.
# Install it inside your virtual environment first: python3 -m pip install texttable
from texttable import Texttable

table = Texttable()
table.header(["Part", "Qty", "Shelf"])
table.add_row(["gear", 12, "A3"])
table.add_row(["spring", 50, "B1"])
table.add_row(["kettle lid", 3, "C2"])
print(table.draw())
