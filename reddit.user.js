// ==UserScript==
// @name        Reddit
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @include     http://*.reddit.com/*
// @include     https://*.reddit.com/*
// @match       http://*.reddit.com/*
// @match       https://*.reddit.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/reddit.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/reddit.meta.js
// @version     1.0.0
// @run-at      document-end
// ==/UserScript==
document.onkeydown = function (event) {
    if (event.keyCode == '37') {
        document.querySelector('a[rel="nofollow prev"]').click();
    } else if (event.keyCode == '39') {
        document.querySelector('a[rel="nofollow next"]').click();
    }
};
