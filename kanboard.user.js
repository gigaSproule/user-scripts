// ==UserScript==
// @name        Kanboard
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.30
// @include     http://*/kanboard*
// @include     https://*/kanboard*
// @match       http://*/kanboard*
// @match       https://*/kanboard*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/kanboard.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/kanboard.meta.js
// @grant       none
// @run-at      document-end
// @require     https://github.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
window.onload = function () {
    'use strict';
    document.addEventListener('click', colour); // Required due to AJAX calls to inner forms

    colour();
    addChangeAssigneeClickEvent();
    correctMarkdownSize();
    toggleSideBar();

    bindKey('27', 'Cancel', cancel);
    bindKey('46', 'Remove this task', removeTask);
    bindKey('65', 'Show activity stream', showActivityStream);
    bindShiftMetaKey('66', 'Go back to the board', backToBoard);
    bindKey('67', 'Add a comment', addComment);
    bindKey('68', 'Edit the description', editDescription);
    bindKey('69', 'Edit this task', editTask);
    bindKey('76', 'Add a link to this task', addLink);
    bindKey('83', 'Show summary', showSummary);
    bindKey('84', 'Show transitions', showTransitions);
    bindShiftMetaKey('84', 'Toggle the sidebar', toggleSideBar);
    bindKey('89', 'Yes', yes);
    if (getWindowParameters().controller === 'board') {
        bindMetaKey('69', 'Toggle column height', toggleColumns);
        bindMetaKey('79', 'Open a task', openTask);
    }
    if (getWindowParameters().controller === 'tasklink') {
        bindMetaKey('66', 'Set link to blocked by', blockedBy);
        bindMetaKey('67', 'Set link to child of', childOf);
        bindMetaKey('80', 'Set link to parent of', parentOf);
        bindMetaKey('82', 'Set link to related to', relatedTo);
        bindShiftMetaKey('66', 'Set link to blocks', blocks);
    }
    if (getWindowParameters().controller === 'taskmodification' || getWindowParameters().controller === 'taskcreation') {
        bindShiftMetaKey('65', 'Set type to analysis', analysis);
        bindShiftMetaKey('66', 'Set type to bug', bug);
        bindAltMetaKey('69', 'Set type to estimation', estimation);
        bindShiftMetaKey('69', 'Set type to epic', epic);
        bindShiftMetaKey('80', 'Set type to planning', planning);
        bindShiftMetaKey('83', 'Set type to spike', spike);
    }
};

function addComment() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(6) > a:nth-child(1)', 'Add a comment');
    }
}

function addChangeAssigneeClickEvent() {
    'use strict';
    for (let link of document.querySelectorAll('a[title="Change assignee"]')) {
        if (link !== 0) {
            link.addEventListener('click', changeAssignee);
        }
    }
}

function addLink() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(5) > a:nth-child(1)', 'Add a link');
    }
}

function analysis() {
    'use strict';
    updateCategory('17');
}

function backToBoard() {
    'use strict';
    clickByQuerySelector('#main > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(2)', 'Back to the board');
}

function blockedBy() {
    'use strict';
    updateLinkId('3');
}

function blocks() {
    'use strict';
    updateLinkId('2');
}

function bug() {
    'use strict';
    updateCategory('3');
}

function cancel() {
    'use strict';
    clickByQuerySelector('.form-actions > a:nth-child(2)', 'cancel');
}

function changeAssignee(event) {
    'use strict';
    var link = event.target;
    var parent = link.parentNode;

    while (parent.className.indexOf('draggable-item') < 0) {
        parent = parent.parentNode;
    }

    var parameters = getParameters(parent.getAttribute('data-task-url'));

    link.removeAttribute('href');
    getRequest({
        success: function (response) {
            var parser = new DOMParser();
            var html = parser.parseFromString(response.responseText, 'text/html');
            var csrfToken = html.getElementsByName('csrf_token')[0].value;
            var username = document.querySelector('.username > a:nth-child(1)').text;

            var ownerId = '0';
            if (link.text !== username) {
                for (let option of html.getElementById('form-owner_id').options) {
                    if (option.text === username) {
                        ownerId = option.value;
                    }
                }
            }

            var data = 'csrf_token=' + csrfToken + '&id=' + parameters.task_id + '&project_id=' + parameters.project_id + '&owner_id=' + ownerId;
            postRequest({
                success: function () {
                    location.reload();
                },
                failure: function () {
                    alert('An error has occured making the request');
                },
                url: 'http://10.92.71.48/kanboard/?controller=board&action=updateAssignee&task_id=' + parameters.task_id + '&project_id=' + parameters.project_id,
                data: data
            });
        },
        failure: function () {
            alert('An error has occured making the request');
        },
        url: 'http://10.92.71.48/kanboard/?controller=board&action=changeAssignee&task_id=' + parameters.task_id + '&project_id=' + parameters.project_id
    });
}

function childOf() {
    'use strict';
    updateLinkId('6');
}

function colour() {
    'use strict';
    var select = document.getElementById('form-color_id');
    if (select === null) {
        return;
    }
    setColour(select);
    for (let option of select.options) {
        setColour(option);
    }
}

function setColour(element) {
    'use strict';
    switch (element.value) {
        case 'yellow':
            element.style.background = '#F5F7C4';
            break;
        case 'blue':
            element.style.background = '#DBEBFF';
            break;
        case 'green':
            element.style.background = '#BDF4CB';
            break;
        case 'purple':
            element.style.background = '#DFB0FF';
            break;
        case 'red':
            element.style.background = '#FFBBBB';
            break;
        case 'orange':
            element.style.background = '#FFD7B3';
            break;
        case 'grey':
            element.style.background = '#EEEEEE';
            break;
        case 'brown':
            element.style.background = '#D7CCC8';
            break;
        case 'deep_orange':
            element.style.background = '#FFAB91';
            break;
        case 'dark_grey':
            element.style.background = '#CFD8DC';
            break;
        case 'pink':
            element.style.background = '#F48FB1';
            break;
        case 'teal':
            element.style.background = '#80CBC4';
            break;
        case 'cyan':
            element.style.background = '#B2EBF2';
            break;
        case 'lime':
            element.style.background = '#E6EE9C';
            break;
        case 'light_green':
            element.style.background = '#DCEDC8';
            break;
        case 'amber':
            element.style.background = '#FFE082';
            break;
    }
}

function correctMarkdownSize() {
    'use strict';
    for (let markdown of document.querySelectorAll('.markdown')) {
        markdown.style.fontSize = '100%';
    }
}

function editTask() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(1) > a:nth-child(1)', 'Edit the task');
    }
}

function editDescription() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(2) > a:nth-child(1)', 'Edit the description');
    }
}

function estimation() {
    'use strict';
    updateCategory('23');
}

function epic() {
    'use strict';
    updateCategory('1');
}

function openTask() {
    'use strict';
    catchKeyCodes(function (keyCodes) {
        var taskId = '';
        for (let key of keyCodes) {
            taskId += mapKey(key);
        }
        clickByQuerySelector('div[data-task-id="' + taskId + '"]');
    }, 1000);
}

function parentOf() {
    'use strict';
    updateLinkId('7');
}

function planning() {
    'use strict';
    updateCategory('22');
}

function relatedTo() {
    'use strict';
    updateLinkId('1');
}

function removeTask() {
    'use strict';
    if (!inputFieldActive()) {
        var parameters = getWindowParameters();
        if (parameters.task_id === undefined || parameters.project_id === undefined) {
            return;
        }
        getRequest({
            url: 'http://10.92.71.48/kanboard/?controller=task&action=remove&task_id=' + parameters.task_id + '&project_id=' + parameters.project_id,
            success: function (response) {
                if (confirm('Are you sure you want to delete task ' + parameters.task_id)) {
                    var parser = new DOMParser();
                    var html = parser.parseFromString(response.responseText, 'text/html');
                    var url = html.querySelector('.btn').href;
                    getRequest({
                        url: url,
                        success: function () {
                            window.location.href = 'http://10.92.71.48/kanboard/?controller=board&action=show&project_id=1';
                        },
                        failure: function () {
                            alert('Failed to remove task ' + parameters.task_id);
                        }
                    });
                }
            }
        });
    }
}

function showActivityStream() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)', 'Activity stream');
    }
}

function showSummary() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)', 'Summary');
    }
}

function showTransitions() {
    'use strict';
    if (!inputFieldActive()) {
        clickByQuerySelector('.sidebar > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)', 'Transitions');
    }
}

function spike() {
    'use strict';
    updateCategory('4');
}

function toggleColumns() {
    'use strict';
    for (let column of document.getElementsByClassName('board-task-list board-column-expanded ui-sortable')) {
        console.log(column.style.height);
        if (column.style.height === '100%') {
            column.style.height = '500px';
        } else {
            column.style.height = '100%';
        }
    }
}

function toggleSideBar() {
    'use strict';
    var expandedSideBar = document.querySelector('.sidebar-expand');
    if (expandedSideBar === null) {
        return;
    }

    if (expandedSideBar.style.display === 'none') {
        clickByQuerySelector('.sidebar-collapse > a');
    } else {
        clickByQuerySelector('.sidebar-expand > a');
    }
}

function updateLinkId(value) {
    'use strict';
    updateSelect('form-link_id', value);
    document.getElementById('form-title').focus();
}

function updateCategory(value) {
    'use strict';
    updateSelect('form-category_id', value);
}

function updateSelect(id, value) {
    'use strict';
    updateSelectById(id, value);
}

function yes() {
    'use strict';
    clickByQuerySelector('.btn', 'Yes');
}
