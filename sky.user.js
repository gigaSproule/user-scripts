// ==UserScript==
// @name        Sky
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.3
// @include     http://*.sky.com/*
// @include     https://*.sky.com/*
// @match       http://*.sky.com/*
// @match       https://*.sky.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/sky.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/sky.meta.js
// @grant       none
// @run-at      document-end
// @require     https://github.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
window.onload = function () {
    bindKey('37', left);
    bindKey('39', right);
};

function left() {
    clickByClassName('navigation-control left');
}

function right() {
    clickByClassName('navigation-control right');
}
