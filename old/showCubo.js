
let radius = 0.5

const cuboSphere = new THREE.SphereGeometry( radius, 15, 15);
const cuboMaterial = new THREE.MeshBasicMaterial( { color: 0xA020F0 } );

var phongMaterial = new THREE.MeshPhongMaterial({
    color: 0xA020F0,
    transparent: true,
    opacity: 0.8
});

cuboMaterial.transparent = true;
cuboMaterial.opacity = 0.8;

var cubo = createCuboArr(2)

setCoordinates(cubo, [0, 0, 0], radius, radius*2)

function drawCubo(cubo){
    cubo.forEach(function(layer){
        layer.forEach(function(row){
            row.forEach(function(elem){
                let sphere = new THREE.Mesh( cuboSphere, phongMaterial );
                const [x, y, z] = elem;

                sphere.position.set(x, y, z);
                scene.add( sphere );
                
            });
        });
    });
     
}

function drawLayer(cubo, num){

    let layer = cubo[num]
    layer.forEach(function(row){
        row.forEach(function(elem){
            let sphere = new THREE.Mesh( cuboSphere, phongMaterial );
            const [x, y, z] = elem;

            sphere.position.set(x, y, z);
            scene.add( sphere );
            
        });
    });
 
}
