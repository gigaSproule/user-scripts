// ==UserScript==
// @name        Stash
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.0
// @include     /^https?://stash.*/
// @downloadURL https://gitlab.com/gigaSproule/user-scripts/raw/master/stash.user.js
// @updateURL   https://gitlab.com/gigaSproule/user-scripts/raw/master/stash.meta.js
// @grant       none
// @run-at      document-end
// @require     https://gitlab.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
let getCopyCheckoutCommand = false;
let getCopyCloneCommand = false;

const PULL_REQUEST = 'pull-request';
const BROWSE = 'browse';
const OTHER = 'other';

function getPage() {
    'use strict';
    if (window.location.href.match('.*/pull-requests/.*')) {
        return PULL_REQUEST;
    } else if (window.location.href.match('.*/browse.*')) {
        return BROWSE;
    } else {
        return OTHER;
    }
}

function copyCloneCommand(event) {
    'use strict';
    event.clipboardData.setData('text/plain', 'git clone ' + document.querySelector('.quick-copy-text').value);
    event.preventDefault();
    getCopyCloneCommand = false;
}

function copyCheckoutCommand(event, branch) {
    'use strict';
    event.clipboardData.setData('text/plain', 'git checkout ' + branch);
    event.preventDefault();
    getCopyCheckoutCommand = false;
}

function appendCheckoutCommandButton(parentElement) {
    'use strict';
    const checkoutCommandButton = document.createElement('button');
    checkoutCommandButton.className = 'aui-button aui-button-link';
    checkoutCommandButton.setAttribute('role', 'menuitem');
    checkoutCommandButton.setAttribute('data-action', 'copy-checkout-command');
    checkoutCommandButton.tabIndex = -1;
    checkoutCommandButton.innerText = 'Copy checkout command';
    checkoutCommandButton.addEventListener('click', function () {
        document.execCommand('copy');
    });

    const checkoutCommandItem = document.createElement('li');
    checkoutCommandItem.appendChild(checkoutCommandButton);
    parentElement.appendChild(checkoutCommandButton);
}

function appendCloneCommandButton(parentElement) {
    'use strict';
    const cloneCommandButton = document.createElement('button');
    cloneCommandButton.className = 'aui-button aui-button-link';
    cloneCommandButton.setAttribute('role', 'menuitem');
    cloneCommandButton.setAttribute('data-action', 'copy-clone-command');
    cloneCommandButton.tabIndex = -1;
    cloneCommandButton.innerText = 'Copy clone command';
    cloneCommandButton.addEventListener('click', function () {
        document.execCommand('copy');
    });

    const cloneCommandItem = document.createElement('li');
    cloneCommandItem.appendChild(cloneCommandButton);
    parentElement.appendChild(cloneCommandItem);
}

window.onload = function () {
    'use strict';

    const page = getPage();
    document.addEventListener('copy', function (event) {
            if (getCopyCheckoutCommand) {
                let branch;
                if (page === PULL_REQUEST) {
                    branch = document.querySelector('div.ref-name:nth-child(1) > span:nth-child(1)').innerHTML;
                    copyCheckoutCommand(event, branch);
                } else if (page === BROWSE) {
                    branch = document.querySelector('#repository-layout-revision-selector > span:nth-child(2)').innerHTML;
                } else {
                    return;
                }
                copyCheckoutCommand(event, branch);
            } else if (getCopyCloneCommand) {
                copyCloneCommand(event)
            }
        }
    );

    if (page === PULL_REQUEST) {
        const parent = document.querySelector('#pull-request-header-more > div:nth-child(1) > ul:nth-child(1)');
        appendCheckoutCommandButton(parent);
        appendCloneCommandButton(parent);
    }

    bindAltKey('67', 'Copy checkout command', function () {
        getCopyCheckoutCommand = true;
        document.execCommand('copy');
    });

    bindAltKey('78', 'Copy clone command', function () {
        getCopyCloneCommand = true;
        document.execCommand('copy');
    });
};
