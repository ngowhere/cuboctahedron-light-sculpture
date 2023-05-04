console.log("buildCubo.js loaded")

const cuboSphere = new THREE.SphereGeometry( 0.5, 15, 15);

function generatePackedCuboctahedron(n, spacing = 2){
    let l = [];
    // Top 
    for (let z = 0; z < n+1; z++){
        l.push(...generateCuboctahedronLayer(z,n,spacing));
    }
    // Bottom
    for (let z = 1; z < n+1; z++){
        // l.push(...generateCuboctahedronLayer(z, n, spacing).map(i => flip(...i)));
        let newLayer = generateCuboctahedronLayer(z,n,spacing);
        let flippedArr = newLayer.map(flip);
        l.push(...flippedArr);
    }
    return l
}

// Helper: makes layer of cubo
function generateCuboctahedronLayer(z, n, spacing = 2){
    let temp = []

    const vec1 = [1,   0,         0]
    const vec2 = [1/2, Math.sqrt(3)/2, 0]
    const vec3 = [1/2, -Math.sqrt(3)/6, Math.sqrt(6)/3]

    for (let y = -(n-z); y < n+1; y++){

        let start = 0
        let end  = 0

        // start = 0 ? y > 0 : -y
    
        if (y >0) {
            start = 0
            end  = 2*n+1-z-y
        }else{
            start = -y
            end  = 2*n+1-z
        }


        // let end  = 2*n+1-z-(y ? y > 0 : 0)
        // console.log("\t", start, end, end-start)
        
        for (let x = start; x < end; x++){

            let xPos = spacing*((x*vec1[0] + y*vec2[0] + z*vec3[0]) - n)
            let yPos = spacing*(x*vec1[1] + y*vec2[1] + z*vec3[1])
            let zPos = spacing*(x*vec1[2] + y*vec2[2] + z*vec3[2])

            temp.push([xPos,yPos,zPos])

        } 
    }
    return temp
}

// Helper:mirrors coordinates across y and z axis
function flip(coords){
    [x, y, z] = coords
    return [x, -y, -z]
}

let c1 = [1, 2, 3]
console.log(flip(c1))

// Creates Cell Object
function Cell(id, pos){
    this.id  = id
    this.position = pos;
    this.neighbors = new Set();
    this.alive = false;

    let mat = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        transparent: true,
        opacity: 0.8
    });

    this.sphere = new THREE.Mesh( cuboSphere, mat );
    const [x, y, z] = this.position;
    this.sphere.position.set(x,y,z);

    scene.add( this.sphere );
}

// Helper: Used to help find neighbors
function distance(pos1, pos2){
    let [x1, y1, z1] = pos1
    let [x2, y2, z2] = pos2

    let a = x1 - x2;
    let b = y1 - y2;
    let c = z1 - z2;
    
    return Math.sqrt(a * a + b * b + c * c);
}

// Converts arr of positions into Cell objects and sets neighbors of each cell 
function toCell(cubo){
    cells = cubo.map((pos, index) => new Cell(index, pos))
    cells.map((cell) => findNeighbors(cell, cells))
    return cells
}

// https://github.com/oguzeroglu/Nearby - Neighbor detection 
// Floating point error - give room for error
function findNeighbors(cell, cubo, spacing = 2){
    for (let i = 0; i < cubo.length; i++){
        let other = cubo[i]
        let dist = distance(cell.position, other.position)
        // console.log(dist)
        if (dist <= spacing && dist > 0){
            cell.neighbors.add(other.id)
        }
    }
}

function makeLayers(positions){
    let layers = {};

    for (let i = 0; i < positions.length; i++) {
      let p = positions[i];
      let currZ = p[2];
    
      if (currZ in layers) {
        layers[currZ].push(p);
      } else {
        layers[currZ] = [p];
      }
    }

    // Prints Layers
    for (let layer in layers) {
        console.log(`\nZ: ${layer} ${layers[layer].length}`);
        console.log(...layers[layer], "\n");
    }
}

var positions = generatePackedCuboctahedron(2, 2)
// positions.forEach(e => console.log(e));







var cellCubo = toCell(positions)
// console.log(cellCubo)

cellCubo.forEach(e => console.log(e.id, e.neighbors));
// console.log(cellCubo)
