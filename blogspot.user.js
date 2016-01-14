// ==UserScript==
// @name        Blogspot
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.1
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
    bindKey('37', clickById('Blog1_blog-pager-newer-link'));
    bindKey('39', clickById('Blog1_blog-pager-older-link'));
};
