import unittest

from sale import sale_price


class TestSalePrice(unittest.TestCase):
    def test_no_sale(self):
        self.assertEqual(sale_price(80, 0), 80)

    def test_quarter_off(self):
        self.assertEqual(sale_price(80, 25), 60)

    def test_half_off(self):
        self.assertEqual(sale_price(30, 50), 15)


if __name__ == "__main__":
    unittest.main()
