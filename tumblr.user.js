// ==UserScript==
// @name        Tumblr
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.10
// @include     http://*.tumblr.com/*
// @include     https://*.tumblr.com/*
// @match       http://*.tumblr.com/*
// @match       https://*.tumblr.com/*
// @downloadURL https://gitlab.com/gigaSproule/user-scripts/raw/master/tumblr.user.js
// @updateURL   https://gitlab.com/gigaSproule/user-scripts/raw/master/tumblr.meta.js
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
    clickById('newer_posts');
}

function right() {
    'use strict';
    clickById('older_posts');
}
