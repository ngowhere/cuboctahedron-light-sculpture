import turtle
import math
screen = turtle.getscreen()
t = turtle.Turtle()

def createCuboArr(numShells):
    numLayers = numShells * 2 + 1
    midPoint = numShells 
    base = numShells + 1
    cubo = []
    for layer in range(numLayers): 
        maxRow = layer
        numRows = base + layer
        currLayer = []

        if layer <= numShells:
            for row in range(numRows):
                if row < maxRow: 
                    numCols = base + row
                else:
                    numCols = numRows - (row-maxRow)

                currRow = [0]*numCols
                currLayer.append(currRow)
            cubo.append(currLayer)
        else: 
            oppIndex = midPoint - (layer - midPoint) 
            oppLayer = cubo[oppIndex]
            for i in range(len(oppLayer)-1, -1, -1):
                currRow = [0]*len(oppLayer[i])
                currLayer.append(currRow) 
            cubo.append(currLayer)
    return cubo


def setLayerCoordinates(layer, cellRadius, cellDist, xStart = 100, yStart = 0, z = 0):
    #sets coordinates of cubo. 3D array
    dist = cellDist + cellRadius

    for row in range(len(layer)): 
        y = yStart + row * dist
        
        if row > 0: 
            prev = layer[row-1]
            if len(prev) > len(layer[row]):
                xStart += dist/2
            else: 
                xStart -= dist/2

    
        for col in range(len(layer[row])):
            if row == 0 and col == 0: 
                layer[row][col] = (xStart, yStart + y, z)
            else: 
                x = xStart + dist*col
                layer[row][col] = (x, y, z)
    return layer

def setCoordinates(cubo, start, radius, distance):
    '''
    Sets Coordinates of the first half of cubo.
    '''
    xStart, yStart, zStart = start
    dist = radius  + distance
    height = (dist/2) * math.sqrt(3)
    z = 0
    

    for layer in range(len(cubo)): 

        yStart -=height/2   
        dx = 0
        z = layer*dist/2
        print(z)

        for row in range(len(cubo[layer])): 
            y = yStart + (row * height)
            
            if row > 0: 
                prev = cubo[layer][row-1]
                if layer < len(cubo) / 2: 
                    dx += dist/2 if len(prev) > len(cubo[layer][row]) else -dist/2
        
            for col in range(len(cubo[layer][row])):
                if row == 0 and col == 0: 
                    cubo[layer][row][col] = (xStart + dx, y, z)
                else: 
                    x = xStart + dist*col + dx
                    cubo[layer][row][col] = (x, y, z)
    setSecondHalf(cubo)

def setSecondHalf(cubo):
    '''
    HELPER: Builds out second half of cubo. and sets coordinates excluding center hex by
    mirroring coordinates of each layer across center horizontal of
    each layer
    '''
    
    for layer in range(len(cubo)//2): 
        # TODO: Intert Layer  so that it matches structure of actual cubo

        #get center horizontal line of layer
        center = getLayerCenterHori(cubo[layer])  
        z = cubo[len(cubo) - layer -1][0][0][2]
        #Create new layer by from curr cubo layer
        mirroredLayer = [[mirrorCoords(val, center, z) for val in row] for row in cubo[layer]]
        # Set opposite of curr layer of cubo. to the mirrored layer
        cubo[len(cubo) - layer -1] = mirroredLayer

def getLayerCenterHori(layer):
    '''
    HELPER: Returns the horizontal middle of each layer of the cubo.
    Takes the average of the top row's Y val and bottom row's Y val
    '''
    topY = layer[0][0][1]
    botY = layer[-1][0][1]

    return (topY + botY)/2

def mirrorCoords(coordinates, center, zVal): 
    '''
    HELPER: Mirrors coordinates over horizontal middle of each layer
    Returns 3 part tuple of new mirrored coordinate
    '''
    x, y, z = coordinates
    return (x, center + center-y, zVal)

def drawLayer(layer):
    '''
    HELPER
    '''
    for row in layer: 
        for coord in row: 
            t.penup()
            t.goto(coord[0], coord[1])
            t.dot()

# method to draw y-axis lines
def drawAxis():
    # set position
    t.up()
    t.setpos(-500,0)
    t.down()

    # line
    t.setpos(500,0)
    t.up()

    # set position
    t.up()
    t.setpos(0,500)
    t.down()

    # line
    t.setpos(0,-500)
    t.up()


def test():
    colors = ['#00FFFF', '#89CFF0', '#0000FF', '#FF5F1F', '#CF9FFF', '#C0E4FF', '#27B502', '#7C60A8', '#CF95D7', '#145JKH']

    cubo = createCuboArr(2)
    setCoordinates(cubo, (0, 0, 0), 30, 30)

    # layer = cubo[0]
    # t.color(colors[0])
    # drawLayer(layer)

    # layer = cubo[-1]
    # t.color(colors[1])
    # drawLayer(layer)
    

    # for i in range(len(cubo)//2, len(cubo)): 
    for i in range(len(cubo)): 
        layer = cubo[i]
        t.color(colors[i])
        drawLayer(layer)
    
    screen.exitonclick()

# drawAxis()
test()



        # if layer > 0: 
        #     prevLayer = cubo[layer-1]
        #     if len(prevLayer) > len(cubo[layer]):
        #         yStart -= height/2
        #     else:
        #         yStart -=height/2