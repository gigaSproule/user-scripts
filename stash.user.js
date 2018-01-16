// ==UserScript==
// @name        Stash
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.0
// @include     /^https?://stash.*/pull-requests/.*/
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/stash.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/stash.meta.js
// @grant       none
// @run-at      document-end
// @require     https://github.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
window.onload = function () {
    'use strict';

    var cancelStandardCopy = false;

    document.addEventListener('copy', function (e) {
        console.log('Cancel standard copy: ' + cancelStandardCopy);
        if (cancelStandardCopy) {
            e.clipboardData.setData('text/plain', 'git checkout ' + document.querySelector('div.ref-name:nth-child(1) > span:nth-child(1)').innerHTML);
            e.preventDefault();
            cancelStandardCopy = false;
        }
        console.log('Cancel standard copy: ' + cancelStandardCopy);
    });

    var button = document.createElement('button');
    button.className = 'aui-button aui-button-link';
    button.setAttribute('role', 'menuitem');
    button.setAttribute('data-action', 'copy-checkout-command');
    button.tabIndex = -1;
    button.innerText = 'Copy checkout command';
    button.addEventListener('click', function () {
        document.execCommand('copy');
    });

    var item = document.createElement('li');
    item.appendChild(button);
    document.querySelector('#pull-request-header-more > div:nth-child(1) > ul:nth-child(1)').appendChild(item);

    bindAltKey('67', 'Copy checkout command', function () {
        cancelStandardCopy = true;
        document.execCommand('copy');
    });
};
