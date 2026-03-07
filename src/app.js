/**
 * Author: Mitch Allen
 */

import {moveWhereLooking} from './move-where-looking.js'

console.log("[xrmitch]: running.")

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

        const btnForward = document.getElementById('btnForward');
        const btnBack = document.getElementById('btnBack');

        const onForwardDown = (e) => { this.movingForward = true; e.preventDefault(); };
        const onForwardUp = () => { this.movingForward = false; };
        const onBackDown = (e) => { this.movingBack = true; e.preventDefault(); };
        const onBackUp = () => { this.movingBack = false; };

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