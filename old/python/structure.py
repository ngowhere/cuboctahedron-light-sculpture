print("START")

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


def displayShape(arr):
    print("\n")
    for layer in arr: 
        for row in layer: 
            print(row)
        print("--")

def test():
    temp = createCuboArr(1)
    displayShape(temp)

    temp2 = createCuboArr(2)
    displayShape(temp2)

    temp3 = createCuboArr(3)
    displayShape(temp3)
test()
print("END")