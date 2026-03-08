/**
 * Author: Mitch Allen
 */

import {moveWhereLooking} from './move-where-looking.js'

console.log("[xrmitch]: running.")

AFRAME.registerComponent('grid-sky', {
    init: function () {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 64, 64);
        
        // Dot
        ctx.fillStyle = '#444'; // Light gray
        ctx.beginPath();
        ctx.arc(32, 32, 1, 0, Math.PI * 2);
        ctx.fill();

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // Increase repeat to make dots smaller and more frequent
        texture.repeat.set(128, 64);
        
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
        }
    }
});

AFRAME.registerComponent('thumbstick-logging',{
    init: function() {
        this.el.addEventListener('thumbstickmoved', this.logThumbstick);
    },
    logThumbstick: function(evt) {
        if( evt.detail.y > 0.95 ) { console.log("DOWN"); }
        if( evt.detail.y < -0.95 ) { console.log("UP"); }
        if( evt.detail.x > 0.95 ) { console.log("RIGHT"); }
        if( evt.detail.x < -0.95 ) { console.log("LEFT"); }
    }
});

AFRAME.registerComponent('thumbstick-move-where-looking',{
    init: function() {
        this.el.addEventListener('thumbstickmoved', this.logThumbstick);
    },
    logThumbstick: function(evt) {
        moveWhereLooking(evt.detail.y);
    }
});

AFRAME.registerComponent('button-movement', {
    schema: {
        speed: { type: 'number', default: 5.0 }
    },
    init: function () {
        this.movingForward = false;
        this.movingBack = false;

        const btnHome = document.getElementById('btnHome');
        const btnForward = document.getElementById('btnForward');
        const btnBack = document.getElementById('btnBack');

        const onHomeClick = (e) => {
            console.log("[xrmitch]: Home button clicked, resetting position.");
            const rig = document.getElementById('rig');
            if (rig) {
                rig.object3D.position.set(0, 0, 0);
                rig.object3D.rotation.set(0, 0, 0);
                console.log("[xrmitch]: Rig reset to 0,0,0");
            }
            const camera = document.getElementById('camera');
            if (camera) {
                camera.object3D.position.set(0, 1.6, 0); // Default A-Frame camera height
                camera.object3D.rotation.set(0, 0, 0);
                
                // Reset look-controls
                if (camera.components['look-controls']) {
                    camera.components['look-controls'].yawObject.rotation.set(0, 0, 0);
                    camera.components['look-controls'].pitchObject.rotation.set(0, 0, 0);
                }
                console.log("[xrmitch]: Camera reset to 0, 1.6, 0");
            }
            if (e) e.preventDefault();
        };

        const onForwardDown = (e) => { this.movingForward = true; e.preventDefault(); };
        const onForwardUp = () => { this.movingForward = false; };
        const onBackDown = (e) => { this.movingBack = true; e.preventDefault(); };
        const onBackUp = () => { this.movingBack = false; };

        btnHome.addEventListener('mousedown', onHomeClick);
        btnHome.addEventListener('touchstart', onHomeClick);
        btnHome.addEventListener('click', onHomeClick);

        btnForward.addEventListener('mousedown', onForwardDown);
        btnForward.addEventListener('touchstart', onForwardDown);
        btnForward.addEventListener('mouseup', onForwardUp);
        btnForward.addEventListener('mouseleave', onForwardUp);
        btnForward.addEventListener('touchend', onForwardUp);
        btnForward.addEventListener('touchcancel', onForwardUp);

        btnBack.addEventListener('mousedown', onBackDown);
        btnBack.addEventListener('touchstart', onBackDown);
        btnBack.addEventListener('mouseup', onBackUp);
        btnBack.addEventListener('mouseleave', onBackUp);
        btnBack.addEventListener('touchend', onBackUp);
        btnBack.addEventListener('touchcancel', onBackUp);
    },
    tick: function (time, timeDelta) {
        if (this.movingForward) {
            moveWhereLooking(-this.data.speed * (timeDelta / 1000));
        }
        if (this.movingBack) {
            moveWhereLooking(this.data.speed * (timeDelta / 1000));
        }
    }
});