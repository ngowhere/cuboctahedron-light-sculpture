var radius = 0.5
// const cuboSphere = new THREE.SphereGeometry( radius, 15, 15);
const cuboMaterial = new THREE.MeshBasicMaterial( { color: 0xF0FFFF } );

var phongMaterial = new THREE.MeshPhongMaterial({
    color: 0xA020F0,
    transparent: true,
    opacity: 0.8
});



lucas = generatePackedCuboctahedron(2, 2)

// var objArr = drawLucas(lucas)

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(-10, 15, 50);
scene.add(light);

function drawLucas(cubo){
    var objArr = []
    cubo.forEach(function(cell){
        // Need to make new instance of material for ea. obj
        let mat = new THREE.MeshPhongMaterial({
            color: 0xA020F0,
            transparent: true,
            opacity: 0.8
        });
        let sphere = new THREE.Mesh( cuboSphere, mat );


        const [x, y, z] = cell;
        sphere.position.set(x, y, z);
        scene.add( sphere );

        objArr.push(sphere)
    });

    return objArr
}