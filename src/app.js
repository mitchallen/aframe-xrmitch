/**
 * Author: Mitch Allen
 */

import {moveWhereLooking} from './move-where-looking.js'

console.log("[xrmitch]: running.")

document.getElementById('btnForward').addEventListener('click', function (event) {
    alert("DEBUG: FORWARD!")
    moveWhereLooking(-1,0);
    event.preventDefault();
});

document.getElementById('btnBack').addEventListener('click', function (event) {
    moveWhereLooking(1.0);
    event.preventDefault();
});