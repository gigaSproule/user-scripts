// ==UserScript==
// @name        Tumblr
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @include     http://*.tumblr.com/*
// @include     https://*.tumblr.com/*
// @match       http://*.tumblr.com/*
// @match       https://*.tumblr.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/tumblr.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/tumblr.meta.js
// @version     1.0.0
// @grant       none
// @run-at      document-end
// ==/UserScript==
document.onkeydown = function (event) {
    if (event.keyCode == '37') {
        document.getElementById('newer_posts').click();
    } else if (event.keyCode == '39') {
        document.getElementById('older_posts').click();
    }
};
