# Pick a prize from the raffle bin, with a fixed seed.
import random

random.seed(2026)
prizes = ["sticker", "keychain", "spare fuse", "coupon"]
print(random.choice(prizes))
print(random.randint(1, 6))
random.seed(2026)
print(random.choice(prizes))
