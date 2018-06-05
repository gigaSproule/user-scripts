// ==UserScript==
// @name        Sky
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.10
// @include     http://*.sky.com/*
// @include     https://*.sky.com/*
// @match       http://*.sky.com/*
// @match       https://*.sky.com/*
// @downloadURL https://gitlab.com/gigaSproule/user-scripts/raw/master/sky.user.js
// @updateURL   https://gitlab.com/gigaSproule/user-scripts/raw/master/sky.meta.js
// @grant       none
// @run-at      document-end
// @require     https://gitlab.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
window.onload = function () {
    'use strict';
    bindKey('37', 'Previous', left);
    bindKey('39', 'Next', right);
};

function left() {
    'use strict';
    clickByClassName('navigation-control left');
}

function right() {
    'use strict';
    clickByClassName('navigation-control right');
}
