class Color:
    def __init__(self, r = 0 , g = 0, b = 0):
        self.r = r
        self.g = g
        self.b = b

class Cell:
    def __init__(self, number):
        self.number = number
        self.color = Color()
        self.coordinate = (0,0,0)


        