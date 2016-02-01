// ==UserScript==
// @name        Kanboard
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.23
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
window.onload = function () {
    document.addEventListener('click', colour); // Required due to AJAX calls to inner forms

    colour();
    addChangeAssigneeClickEvent();
    correctMarkdownSize();
    toggleSideBar();

    bindKey('27', cancel);
    bindKey('46', removeTask);
    bindKey('65', showActivityStream);
    bindShiftMetaKey('66', backToBoard);
    bindKey('67', addComment);
    bindKey('68', editDescription);
    bindKey('69', editTask);
    bindKey('76', addLink);
    bindKey('83', showSummary);
    bindKey('84', showTransitions);
    bindShiftMetaKey('84', toggleSideBar);
    bindKey('89', yes);
    if (getWindowParameters().controller === 'board') {
        bindMetaKey('69', toggleColumns);
        bindMetaKey('79', openTask);
    }
    if (getWindowParameters().controller === 'tasklink') {
        bindMetaKey('66', blockedBy);
        bindMetaKey('67', childOf);
        bindMetaKey('80', parentOf);
        bindMetaKey('82', relatedTo);
        bindShiftMetaKey('66', blocks);
    }
    if (getWindowParameters().controller === 'taskmodification' || getWindowParameters().controller === 'taskcreation') {
        bindMetaKey('65', analysis);
        bindMetaKey('66', bug);
        bindMetaKey('69', epic);
        bindShiftMetaKey('69', estimation);
        bindMetaKey('80', planning);
        bindMetaKey('83', spike);
    }
};

function addComment() {
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(6) > a:nth-child(1)', 'Add a comment');
    }
}

function addChangeAssigneeClickEvent() {
    for (let link of document.querySelectorAll('a[title="Change assignee"]')) {
        if (link !== 0) {
            link.addEventListener('click', changeAssignee);
        }
    }
}

function addLink() {
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(5) > a:nth-child(1)', 'Add a link');
    }
}

function analysis() {
    updateCategory('17');
}

function backToBoard() {
    clickByQuerySelector('#main > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(2)', 'Back to the board');
}

function blockedBy() {
    updateLinkId('3');
}

function blocks() {
    updateLinkId('2');
}

function bug() {
    updateCategory('3');
}

function cancel() {
    clickByQuerySelector('.form-actions > a:nth-child(2)', 'cancel');
}

function changeAssignee(event) {
    var parent = event.link.parentNode;

    while (parent.className.indexOf('draggable-item') < 0) {
        parent = parent.parentNode;
    }

    var parameters = getParameters(parent.getAttribute('data-task-url'));

    event.link.removeAttribute('href');
    getRequest({
        success: function (response) {
            var parser = new DOMParser();
            var html = parser.parseFromString(response.responseText, 'text/html');
            var csrfToken = html.getElementsByName('csrf_token')[0].value;
            var username = document.querySelector('.username > a:nth-child(1)').text;

            var ownerId = '0';
            if (event.link.text !== username) {
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
    updateLinkId('6');
}

function colour() {
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
    for (let markdown of document.querySelectorAll('.markdown')) {
        markdown.style.fontSize = '100%';
    }
}

function editTask() {
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(1) > a:nth-child(1)', 'Edit the task');
    }
}

function editDescription() {
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(4) > li:nth-child(2) > a:nth-child(1)', 'Edit the description');
    }
}

function estimation() {
    updateCategory('23');
}

function epic() {
    updateCategory('1');
}

function openTask() {
    catchKeyCodes(function (keyCodes) {
        var taskId = '';
        for (let key of keyCodes) {
            taskId += mapKey(key);
        }
        clickByQuerySelector('div[data-task-id="' + taskId + '"]');
    }, 1000);
}

function parentOf() {
    updateLinkId('7');
}

function planning() {
    updateCategory('22');
}

function relatedTo() {
    updateLinkId('1');
}

function removeTask() {
    if (!textField()) {
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
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)', 'Activity stream');
    }
}

function showSummary() {
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)', 'Summary');
    }
}

function showTransitions() {
    if (!textField()) {
        clickByQuerySelector('.sidebar > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)', 'Transitions');
    }
}

function spike() {
    updateCategory('4');
}

function textField() {
    var type = document.activeElement.type;
    return type === 'textarea' || type === 'text' || type === 'number' || type === 'select-one';
}

function toggleColumns() {
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
    updateSelect('form-link_id', value);
    document.getElementById('form-title').focus();
}

function updateCategory(value) {
    updateSelect('form-category_id', value);
}

function updateSelect(id, value) {
    updateSelectById(id, value);
}

function yes() {
    clickByQuerySelector('.btn', 'Yes');
}
