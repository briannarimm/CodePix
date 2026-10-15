# Bench check: import each tool and print its version.
import sys

import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sklearn

print("Python      ", sys.version.split()[0])
print("NumPy       ", np.__version__)
print("pandas      ", pd.__version__)
print("Matplotlib  ", matplotlib.__version__)
print("scikit-learn", sklearn.__version__)
