# Each line: a character, its code point, and how many UTF-8 bytes it takes.
print("A", ord("A"), len("A".encode("utf-8")))
print("é", ord("é"), len("é".encode("utf-8")))
print("€", ord("€"), len("€".encode("utf-8")))
print("🔧", ord("🔧"), len("🔧".encode("utf-8")))
