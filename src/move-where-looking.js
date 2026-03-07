/**
 * Author: Mitch Allen
 */

const direction = new THREE.Vector3();

export function moveWhereLooking(speed) {
    let camera = document.getElementById('camera')
    let rig = document.getElementById('rig')
    if (!camera || !rig) return;
    camera.object3D.getWorldDirection(direction);
    rig.object3D.position.addScaledVector(direction, speed);
}