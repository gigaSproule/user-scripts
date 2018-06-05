// ==UserScript==
// @name        gitlab
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.0
// @include     https://github.com/*
// @match       https://github.com/*
// @downloadURL https://gitlab.com/gigaSproule/user-scripts/raw/master/gitlab.user.js
// @updateURL   https://gitlab.com/gigaSproule/user-scripts/raw/master/gitlab.meta.js
// @grant       none
// @run-at      document-end
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
if (window.location.href.match('.*/pull/.*')) {
    document.getElementsByClassName('new-discussion-timeline')[0].style.width='95%'
}
