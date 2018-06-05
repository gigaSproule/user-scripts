// ==UserScript==
// @name        Blogspot
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.10
// @include     http://*.blogspot.co.uk/*
// @include     https://*.blogspot.co.uk/*
// @match       http://*.blogspot.co.uk/*
// @match       https://*.blogspot.co.uk/*
// @downloadURL https://gitlab.com/gigaSproule/user-scripts/raw/master/blogspot.user.js
// @updateURL   https://gitlab.com/gigaSproule/user-scripts/raw/master/blogspot.meta.js
// @grant       none
// @run-at      document-end
// @require     https://gitlab.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
window.onload = function () {
    'use strict';
    bindKey('37', 'Newer posts', left);
    bindKey('39', 'Older posts', right);
};

function left() {
    'use strict';
    clickById('Blog1_blog-pager-newer-link');
}

function right() {
    'use strict';
    clickById('Blog1_blog-pager-older-link');
}
