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

    var copyCheckoutCommand = false;
    var copyCloneCommand = false;

    document.addEventListener('copy', function (e) {
        if (copyCheckoutCommand) {
            e.clipboardData.setData('text/plain', 'git checkout ' + document.querySelector('div.ref-name:nth-child(1) > span:nth-child(1)').innerHTML);
            e.preventDefault();
            copyCheckoutCommand = false;
        } else if (copyCloneCommand) {
            e.clipboardData.setData('text/plain', 'git clone ' + document.querySelector('.quick-copy-text').value);
            e.preventDefault();
            copyCloneCommand = false;
        }
    });

    var checkoutCommandButton = document.createElement('button');
    checkoutCommandButton.className = 'aui-button aui-button-link';
    checkoutCommandButton.setAttribute('role', 'menuitem');
    checkoutCommandButton.setAttribute('data-action', 'copy-checkout-command');
    checkoutCommandButton.tabIndex = -1;
    checkoutCommandButton.innerText = 'Copy checkout command';
    checkoutCommandButton.addEventListener('click', function () {
        document.execCommand('copy');
    });

    var checkoutCommandItem = document.createElement('li');
    checkoutCommandItem.appendChild(checkoutCommandButton);
    document.querySelector('#pull-request-header-more > div:nth-child(1) > ul:nth-child(1)').appendChild(checkoutCommandButton);

    var cloneCommandButton = document.createElement('button');
    cloneCommandButton.className = 'aui-button aui-button-link';
    cloneCommandButton.setAttribute('role', 'menuitem');
    cloneCommandButton.setAttribute('data-action', 'copy-clone-command');
    cloneCommandButton.tabIndex = -1;
    cloneCommandButton.innerText = 'Copy clone command';
    cloneCommandButton.addEventListener('click', function () {
        document.execCommand('copy');
    });

    var cloneCommandItem = document.createElement('li');
    cloneCommandItem.appendChild(cloneCommandButton);
    document.querySelector('#pull-request-header-more > div:nth-child(1) > ul:nth-child(1)').appendChild(cloneCommandItem);

    bindAltKey('67', 'Copy checkout command', function () {
        copyCheckoutCommand = true;
        document.execCommand('copy');
    });

    bindAltKey('78', 'Copy clone command', function () {
        copyCloneCommand = true;
        document.execCommand('copy');
    });
};
