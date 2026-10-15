import unittest

import tray


class TestTray(unittest.TestCase):
    def test_fresh_tray_each_call(self):
        self.assertEqual(tray.add_part("gear"), ["gear"])
        self.assertEqual(tray.add_part("fuse"), ["fuse"])

    def test_given_tray(self):
        mine = ["bolt"]
        self.assertEqual(tray.add_part("nut", mine), ["bolt", "nut"])
        self.assertEqual(mine, ["bolt", "nut"])


if __name__ == "__main__":
    unittest.main()
