import math

def example_function(x, y):
    # Example function with several PEP 8 style issues
    if(x == y):
        print("x and y are equal")
        return x**2
    else: print("x and y are not equal"); return y**2

# Excessive whitespace and a line that's too long below
def calculate_distance (x1,  y1, x2,  y2)     :
    return math.sqrt(  (x2 - x1)**2 + (y2 - y1)**2  )

# Unused variable
def compute_area(radius):
    pi = math.pi
    area = pi * radius ** 2
    return area

class MyClass():
  def method_a(self):
      pass

  def method_b(self):
    pass

# Incorrectly using == for checking boolean literals
some_value = True
if some_value == True:
    print("some_value is True")