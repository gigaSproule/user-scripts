// ==UserScript==
// @name        Reddit
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.13
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
/* jshint esversion:6 */
/* jshint strict:true */
window.onload = function () {
    'use strict';
    bindKey('37', 'Previous page', left);
    bindKey('39', 'Next page', right);
};

function left() {
    'use strict';
    clickByQuerySelector('a[rel="nofollow prev"]');
}

function right() {
    'use strict';
    clickByQuerySelector('a[rel="nofollow next"]');
}
