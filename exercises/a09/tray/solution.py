def add_part(part, tray=None):
    """Put part on the tray and return the tray."""
    if tray is None:
        tray = []
    tray.append(part)
    return tray


if __name__ == "__main__":
    print(add_part("gear"))
    print(add_part("fuse"))
