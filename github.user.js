// ==UserScript==
// @version     1
// @grant       none
// ==/UserScript==
// ==UserScript==
// @name        Full width PR for GitHub
// @namespace   http://www.benjaminsproule.com
// @description Full width PR for GitHub
// @author      Benjamin Sproule
// @version     1.0.13
// @include     https://github.com/*/pull/*
// @match     https://github.com/*/pull/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/github.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/github.meta.js
// @grant       none
// @run-at      document-end
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
if (window.location.href.match('.*/pull/.*').length == 1) {
    document.getElementsByClassName('new-discussion-timeline')[0].style.width='100%'
}
