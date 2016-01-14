// ==UserScript==
// @name        Kanboard
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @include     http://*/kanboard*
// @include     https://*/kanboard*
// @match       http://*/kanboard*
// @match       https://*/kanboard*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/kanboard.user.js
// @updateURL   https://github.com/gigaSproule/user-scripts/raw/master/kanboard.meta.js
// @version     1.0.1
// @grant       none
// @run-at      document-end
// ==/UserScript==
var keyBinds = {};
var metaKeyBinds = {};
window.onload = function () {
    colour();
    bindKey('27', cancel);
    bindKey('65', showActivityStream);
    bindKey('67', addComment);
    bindKey('68', editDescription);
    bindKey('69', editTask);
    bindKey('76', addLink);
    bindKey('83', showSummary);
    bindKey('84', showTransitions);
};
document.addEventListener('click', colour); // Required due to AJAX calls to inner forms
for (let link of document.querySelectorAll('a[title="Change assignee"]')) {
    if (link != 0) {
        link.addEventListener('click', function (e) {
            changeAssignee(e.target);
            return false;
        });
    }
}
document.onkeydown = function (event) {
    var metaKey = navigator.platform.toLowerCase().contains('mac') ? event.metaKey : event.ctrlKey;
    if (!metaKey) {
        for (let key of keyBinds[event.keyCode]) {
            key();
        }
    } else if (metaKey) {
        for (let key of metaKeyBinds[event.keyCode]) {
            key();
        }
    }
};
for (let markdown of document.querySelectorAll('.markdown')) {
    markdown.style.fontSize = '100%';
}
function bindKey(keyCode, func) {
    if (keyBinds[keyCode] == null) {
        keyBinds[keyCode] = [];
    }
    keyBinds[keyCode].push(func);
}
function colour() {
    var select = document.getElementById('form-color_id');
    if (select == null) {
        return;
    }
    setColour(select);
    for (let option of select.options) {
        setColour(option);
    }
}
function setColour(element) {
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
function changeAssignee(link) {
    var href = link.href;
    var parent = link.parentNode;
    while (parent.className.indexOf('draggable-item') < 0) {
        parent = parent.parentNode;
    }
    var taskId = parent.getAttribute('data-task-id');
    var projectId = parent.getAttribute('data-category-id');
    link.removeAttribute('href');
    var getHttpRequest = new XMLHttpRequest();
    getHttpRequest.onreadystatechange = function () {
        if (getHttpRequest.readyState == 4) {
            if (getHttpRequest.status == 200) {
                var parser = new DOMParser();
                var html = parser.parseFromString(getHttpRequest.responseText, 'text/html');
                var csrfToken = html.getElementsByName('csrf_token') [0].value;
                var ownerId = '0';
                var username = document.querySelector('.username > a:nth-child(1)').text;
                if (link.text != username) {
                    for (let option of html.getElementById('form-owner_id').options) {
                        if (option.text === username) {
                            ownerId = option.value;
                        }
                    }
                }
                var requestParameters = 'csrf_token=' + csrfToken + '&id=' + taskId + '&project_id=' + projectId + '&owner_id=' + ownerId;
                var postHttpRequest = new XMLHttpRequest();
                postHttpRequest.onreadystatechange = function () {
                    if (postHttpRequest.readyState == 4) {
                        if (postHttpRequest.status == 200) {
                            location.reload();
                        } else {
                            alert('An error has occured making the request');
                        }
                    }
                };
                postHttpRequest.open('POST', 'http://10.92.71.48/kanboard/?controller=board&action=updateAssignee&task_id=' + taskId + '&project_id=' + projectId, true);
                postHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                postHttpRequest.send(requestParameters);
            } else {
                alert('An error has occured making the request');
            }
        }
    };
    getHttpRequest.open('GET', 'http://10.92.71.48/kanboard/?controller=board&action=changeAssignee&task_id=' + taskId + '&project_id=' + projectId, true);
    getHttpRequest.send();
}
function addComment() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(4) > li:nth-child(6) > a:nth-child(1)', 'Add a comment');
    }
}
function addLink() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(4) > li:nth-child(5) > a:nth-child(1)', 'Add a link');
    }
}
function cancel() {
    click('.form-actions > a:nth-child(2)', 'cancel');
}
function editTask() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(4) > li:nth-child(1) > a:nth-child(1)', 'Edit the task');
    }
}
function editDescription() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(4) > li:nth-child(2) > a:nth-child(1)', 'Edit the description');
    }
}
function showActivityStream() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)', 'Activity stream');
    }
}
function showSummary() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)', 'Summary');
    }
}
function showTransitions() {
    if (!textField()) {
        click('.sidebar > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)', 'Transitions');
    }
}
function textField() {
    var type = document.activeElement.type;
    return type === 'textarea' || type === 'text' || type === 'number' || type === 'select-one';
}
function click(querySelector, text) {
    var link = document.querySelector(querySelector);
    if (link.text === text) {
        link.click();
    }
}
