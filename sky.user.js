// ==UserScript==
// @name        Sky
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @include     http://*.sky.com/*
// @include     https://*.sky.com/*
// @match       http://*.sky.com/*
// @match       https://*.sky.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/sky.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/sky.meta.js
// @version     1.0.0
// @run-at      document-end
// ==/UserScript==
document.onkeydown = function (event) {
    if (event.keyCode == '37') {
        document.getElementsByClassName('navigation-control left') [0].click();
    } else if (event.keyCode == '39') {
        document.getElementsByClassName('navigation-control right') [0].click();
    }
};
