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

document.getElementById('btnForward').addEventListener('click', function (event) {
    moveWhereLooking(-1,0);
    event.preventDefault();
});

document.getElementById('btnBack').addEventListener('click', function (event) {
    moveWhereLooking(1.0);
    event.preventDefault();
});