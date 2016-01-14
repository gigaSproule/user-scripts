// ==UserScript==
// @name        Tumblr
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.2
// @include     http://*.tumblr.com/*
// @include     https://*.tumblr.com/*
// @match       http://*.tumblr.com/*
// @match       https://*.tumblr.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/tumblr.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/tumblr.meta.js
// @grant       none
// @run-at      document-end
// @require     https://github.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
window.onload = function () {
    bindKey('37', left);
    bindKey('39', right);
};

function left() {
    clickById('newer_posts');
}

function right() {
    clickById('older_posts');
}
