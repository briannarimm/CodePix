# codepix: output-only
import unittest


def repair_total(parts, hours):
    """Return the parts cost plus 30 per hour of labor."""
    return parts + hours * 30


class TestRepairTotal(unittest.TestCase):
    def test_parts_only(self):
        self.assertEqual(repair_total(12, 0), 12)

    def test_with_labor(self):
        self.assertEqual(repair_total(12, 2), 72)


if __name__ == "__main__":
    unittest.main()
