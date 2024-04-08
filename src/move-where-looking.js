/**
 * Author: Mitch Allen
 */

export function moveWhereLooking(speed) {
    const direction = new THREE.Vector3;
    let camera = document.getElementById('camera')
    let rig = document.getElementById('rig')
    camera.object3D.getWorldDirection(direction);
    rig.object3D.position.addScaledVector(direction, speed);
  }