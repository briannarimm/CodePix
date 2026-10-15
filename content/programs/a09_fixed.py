def add_part(part, tray=None):
    if tray is None:
        tray = []
    tray.append(part)
    return tray

print(add_part("gear"))
print(add_part("fuse"))
print(add_part("bolt"))
