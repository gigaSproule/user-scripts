// ==UserScript==
// @name        GitHub
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.0
// @include     https://github.com/*
// @match       https://github.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/github.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/github.meta.js
// @grant       none
// @run-at      document-end
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
if (window.location.href.match('.*/pull/.*').length == 1) {
    document.getElementsByClassName('new-discussion-timeline')[0].style.width='95%'
}