// ==UserScript==
// @name        Reddit
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.6
// @include     http://*.reddit.com/*
// @include     https://*.reddit.com/*
// @match       http://*.reddit.com/*
// @match       https://*.reddit.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/reddit.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/reddit.meta.js
// @grant       none
// @run-at      document-end
// @require     https://github.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/*jshint esversion: 6 */
window.onload = function () {
    bindKey('37', left);
    bindKey('39', right);
};

function left() {
    clickByQuerySelector('a[rel="nofollow prev"]');
}

function right() {
    clickByQuerySelector('a[rel="nofollow next"]');
}
