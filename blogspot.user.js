// ==UserScript==
// @name        Blogspot
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.5
// @include     http://*.blogspot.co.uk/*
// @include     https://*.blogspot.co.uk/*
// @match       http://*.blogspot.co.uk/*
// @match       https://*.blogspot.co.uk/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/blogspot.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/blogspot.meta.js
// @grant       none
// @run-at      document-end
// @require     https://github.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
window.onload = function () {
    bindKey('37', left);
    bindKey('39', right);
};

function left() {
    clickById('Blog1_blog-pager-newer-link');
}

function right() {
    clickById('Blog1_blog-pager-older-link');
}
