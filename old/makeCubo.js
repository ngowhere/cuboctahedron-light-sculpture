function createCuboArr(numShells) {
    let numLayers = numShells * 2 + 1;
    let midPoint = numShells;
    let base = numShells + 1;
    let cubo = [];
    for (let layer = 0; layer < numLayers; layer++) { 
        let maxRow = layer;
        let numRows = base + layer;
        let currLayer = [];

        if (layer <= numShells) {
            for (let row = 0; row < numRows; row++) {
                if (row < maxRow) { 
                    var numCols = base + row;
                } else {
                    var numCols = numRows - (row-maxRow);
                }

                let currRow = Array(numCols).fill([0,0,0]);
                currLayer.push(currRow);
            }
            cubo.push(currLayer);
        } else { 
            let oppIndex = midPoint - (layer - midPoint); 
            let oppLayer = cubo[oppIndex];
            for (let i = oppLayer.length-1; i >= 0; i--) {
                let currRow = Array(oppLayer[i].length).fill([0,0,0]);
                currLayer.push(currRow); 
            }
            cubo.push(currLayer);
        }
    }
    return cubo;
}

function setCoordinates(cubo, start = [0, 0, 0], radius = 8, distance = 8) {
    // Sets Coordinates of the first half of cubo.
    let xStart = start[0], yStart = start[1], zStart = start[2];
    let dist = radius + distance;
    let height = (dist/2) * Math.sqrt(3);
    let z = 0;
    
    for (let layer = 0; layer < cubo.length; layer++) { 
        // needs to change on ascend and descend
        z = dist/2*layer;
        yStart -= height/2;  
        let dx = 0;

        for (let row = 0; row < cubo[layer].length; row++) { 
            let y = yStart + (row * height);
            
            if (row > 0) { 
                let prev = cubo[layer][row-1];
                if (layer < cubo.length / 2) { 
                    dx += dist/2 ? (prev.length > cubo[layer][row].length) : -dist/2;
                }
            }
            for (let col = 0; col < cubo[layer][row].length; col++) {
                if (row == 0 && col == 0) { 
                    cubo[layer][row][col] = [xStart + dx, y, z];
                } else { 
                    let x = xStart + dist*col + dx;
                    cubo[layer][row][col] = [x, y, z];
                }
            }
        }
    }
    // setSecondHalf(cubo);
}

function Cell(pos){
    this.position = pos;
    this.color = 0x808080;
}

function toCell(cubo){
    let cellCubo = cubo.map((pos) => new Cell(pos))
    return cellCubo
}

var cubo = createCuboArr(3)
setCoordinates(cubo)
console.log("START")
cubo.forEach(element => console.log(element));

cellCubo = toCell(cubo)
cubo.forEach(element => console.log(element));

