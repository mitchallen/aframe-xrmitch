/**
 * Author: Mitch Allen
 */

import {moveWhereLooking} from './move-where-looking.js'

document.getElementById('btnForward').addEventListener('click', function (event) {
    moveWhereLooking(-1,0);
    // event.preventDefault();
}, { passive: true });

document.getElementById('btnBack').addEventListener('click', function (event) {
    moveWhereLooking(1.0);
    // event.preventDefault();
}, { passive: true });