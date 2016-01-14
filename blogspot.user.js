// ==UserScript==
// @name        Blogspot
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @include     http://*.blogspot.co.uk/*
// @include     https://*.blogspot.co.uk/*
// @match       http://*.blogspot.co.uk/*
// @match       https://*.blogspot.co.uk/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/blogspot.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/blogspot.meta.js
// @version     1.0.0
// @run-at      document-end
// ==/UserScript==
document.onkeydown = function (event) {
    if (event.keyCode == '37') {
        document.getElementById('Blog1_blog-pager-newer-link').click();
    } else if (event.keyCode == '39') {
        document.getElementById('Blog1_blog-pager-older-link').click();
    }
};
