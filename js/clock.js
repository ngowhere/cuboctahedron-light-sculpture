const state = {
    clock: new THREE.Clock(),
    frame: 0,
    maxFrame: 90,
    fps: 30,
    per: 0
};

state.clock.start();

const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
// scene.add(box);

const loop = function () {
    // USING THE GET DELTA METHOD FOR SECS
    // AND GET ELAPSED TIME DELTA FOR TOTAL SECS
    const secs = state.clock.getDelta(),
    totalSecs = state.clock.getElapsedTime();
    requestAnimationFrame(loop);
    // rotating box on y by SECS
    state.per = state.frame / state.maxFrame;
    state.frame += state.fps * secs;
    state.frame %= state.maxFrame;
    box.rotation.y = Math.PI * 2 * state.per;
    // rotating x by TOTAL SECS
    box.rotation.x = Math.PI / 180 * 45 * (1 / totalSecs);

    // flashColors(totalSecs)
    // console.log(time);
    renderer.render(scene, camera);
};
// loop();

function flashColors(time){
    time = Math.round(time)
    let evenMode = time %2 == 0

    
    for (let i = 0; i < objArr.length; i++){
        let curr = objArr[i]
        if (evenMode){
            if (i % 2 == 0){
                curr.material.color.setHex(0xFFC0CB);
            }else{
                curr.material.color.setHex(0xA020F0);
            }
        }else{
            if (i % 2 == 0){
                curr.material.color.setHex(0xA020F0);
            }else{                
                curr.material.color.setHex(0xFFC0CB);
            }
        }
        
    }
}

