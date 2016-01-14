// ==UserScript==
// @name        Reddit
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.1
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
window.onload = function () {
    bindKey('37', clickByQuerySelector('a[rel="nofollow prev"]'));
    bindKey('39', clickByQuerySelector('a[rel="nofollow next"]'));
};
