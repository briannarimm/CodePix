import io
import math
import pathlib
import sys
import types
import unittest
from contextlib import redirect_stdout

FILE = "hexagon.py"


def record_moves():
    """Run hexagon.py with a stand-in turtle module that writes down each move instead of drawing."""
    moves = []
    fake = types.ModuleType("turtle")
    fake.forward = fake.fd = lambda d: moves.append(("forward", d))
    fake.back = fake.backward = fake.bk = lambda d: moves.append(("forward", -d))
    fake.left = fake.lt = lambda a: moves.append(("turn", a))
    fake.right = fake.rt = lambda a: moves.append(("turn", -a))
    for name in ("penup", "pu", "up", "pendown", "pd", "down", "color", "pencolor", "pensize", "width",
                 "speed", "shape", "hideturtle", "showturtle", "bgcolor", "done", "mainloop", "exitonclick"):
        setattr(fake, name, lambda *args, **kwargs: None)
    saved = sys.modules.get("turtle")
    sys.modules["turtle"] = fake
    try:
        source = pathlib.Path(FILE).read_text(encoding="utf-8")
        with redirect_stdout(io.StringIO()):
            exec(compile(source, FILE, "exec"), {"__name__": "__main__"})
    finally:
        if saved is None:
            del sys.modules["turtle"]
        else:
            sys.modules["turtle"] = saved
    return moves


class TestHexagon(unittest.TestCase):
    def test_six_sides_of_100(self):
        sides = [d for kind, d in record_moves() if kind == "forward"]
        self.assertEqual(sides, [100] * 6)

    def test_turns_once_around(self):
        turns = [a for kind, a in record_moves() if kind == "turn"]
        self.assertEqual(len(turns), 6)
        self.assertEqual(abs(sum(turns)), 360)

    def test_back_at_start(self):
        x = y = heading = 0.0
        for kind, amount in record_moves():
            if kind == "forward":
                x += amount * math.cos(math.radians(heading))
                y += amount * math.sin(math.radians(heading))
            else:
                heading += amount
        self.assertAlmostEqual(x, 0, places=6)
        self.assertAlmostEqual(y, 0, places=6)


if __name__ == "__main__":
    unittest.main()
