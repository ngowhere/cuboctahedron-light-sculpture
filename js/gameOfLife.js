var DEAD =  0xFF0000
var ALIVE = 0xA020F0

function checkNeighbors(cell, cubo){
    let neighbors = Array.from(cell.neighbors)
    let result = []
    for (let i = 0; i < neighbors.length; i++){
        let testId = neighbors[i]
        if (cubo[testId].alive){
            result.push(neighbors[i])
        }
    }
    return result.length
}

function showNeighbors(cell, cubo){
    let neighbors = Array.from(cell.neighbors)
    let result = []
    for (let i = 0; i < neighbors.length; i++){
        let testId = neighbors[i]
        if (cubo[testId].alive){
            result.push(neighbors[i])
        }
    }
    return result.toString()
}

// Choose random cells to start alive
function setSeed(cubo){

    for (let i = 0; i < 15; i++){
        let index = Math.floor(Math.random()*cubo.length)
        cubo[index].alive = true;
        cubo[index].sphere.material.color.setHex(ALIVE);
    }
}

function updateCubo(cubo, newStatus){
    for (let i = 0; i < cubo.length; i++){
        cubo[i].alive = newStatus[i]
        if (cubo[i].alive){
            cubo[i].sphere.material.color.setHex(0xFFC0CB);
        }else{
            cubo[i].sphere.material.color.setHex(0xFF0000);
        }
    }
}

function playGame(cubo){
    // Array of booleans
    let newStatus = cubo.map(
        (cell) => {
            let count = checkNeighbors(cell, cubo);
            if (cell.alive){
                if (count < 2){
                    // return "underpop";
                    return false
                }else if (count > 3){
                    // return "overpop";
                    return false
                }else{
                    return true
                    // return "ok";
                }
            }else{
                // return ( count == 3 ?  "new" : "dead")
               return count == 3
            } 
        }
    )

    // console.log(newStatus)
    // x = game.map(cell => cell.alive);
    // console.log(x)

    // Update new status + colors of cubo
    for (let i = 0; i < cubo.length; i++){
        cubo[i].alive = newStatus[i]
        if (cubo[i].alive){
            cubo[i].sphere.material.color.setHex(ALIVE);
        }else{
            cubo[i].sphere.material.color.setHex(DEAD);
        }
    }

    statusReport(cubo)
}

function statusReport(cubo){
    console.log("STATUS REPORT")
    for (let i = 0; i < cubo.length; i++){
        if (cubo[i].alive){
            console.log(`Cell ${i} : ${showNeighbors(cubo[i], cubo)} :  ${Array.from(cubo[i].neighbors)}`)
        }
    }
}

function startScene(shells = 2){
    var start = generatePackedCuboctahedron(shells)
    var cellCubo = toCell(start)
    setSeed(cellCubo)
    return cellCubo
}

let game = startScene(2)

start = game.map(cell => cell.alive);
console.log(start)


const gameState = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};

gameState.clock.start();
let lastUpdate = 0;
const UPDATE_INTERVAL = 1
 
const gameLoop = function () {
    // USING THE GET DELTA METHOD FOR SECS
    // AND GET ELAPSED TIME DELTA FOR TOTAL SECS
    const seconds = gameState.clock.getDelta(),
    totalSeconds = gameState.clock.getElapsedTime();
    requestAnimationFrame(gameLoop);
    // rotating box on y by SECS
    gameState.per = gameState.frame / gameState.maxFrame;
    gameState.frame += gameState.fps * seconds;
    gameState.frame %= gameState.maxFrame;


    time = Math.round(totalSeconds)
    
    
    if (time - lastUpdate > UPDATE_INTERVAL){
        lastUpdate = time
        playGame(game)
    }
    console.log(time)

    renderer.render(scene, camera);
};

gameLoop()

const DELTA = Math.PI/12;
const RADIUS = 5;


var xAngle = 0;
var zAngle = 0;

console.log(camera.position)

function setupKeyControls() {
    document.onkeydown = function(e) {
        console.log(camera.position)
      switch (e.keyCode) {
        case 37:
            // Left Arrow
            xAngle -= DELTA
            camera.position.x = Math.cos(xAngle) * RADIUS;
            camera.position.y = Math.sin(xAngle) * RADIUS;
            camera.lookAt(new THREE.Vector3(0,0,0));

            // camera.position.x = camera.position.x - DELTA;
            camera.updateProjectionMatrix();
            break;

        case 38:
            // Up Arrow
            // camera.position.z = camera.position.z - DELTA;

            zAngle -= DELTA
            camera.position.y = Math.cos(zAngle) * RADIUS * 3;
            camera.position.z = Math.sin(zAngle) * RADIUS * 3;
            camera.lookAt(new THREE.Vector3(0,0,0));

            camera.updateProjectionMatrix();
            break;
      
        case 39:
            // Right Arrow
            xAngle += DELTA
            camera.position.x = Math.cos(xAngle) * RADIUS;
            camera.position.y = Math.sin(xAngle) * RADIUS;

            camera.lookAt(new THREE.Vector3(0,0,0));
            camera.updateProjectionMatrix();
            break;

        case 40:
            // Down Arrow
            zAngle += DELTA
            camera.position.y = Math.cos(zAngle) * RADIUS * 3;
            camera.position.z = Math.sin(zAngle) * RADIUS * 3;
            camera.lookAt(new THREE.Vector3(0,0,0));

            camera.updateProjectionMatrix();
            break;
      }
    };
    
}

setupKeyControls()