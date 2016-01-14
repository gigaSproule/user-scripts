var keyBinds = {};
var metaKeyBinds = {};

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

function bindKey(keyCode, func) {
    if (keyBinds[keyCode] == null) {
        keyBinds[keyCode] = [];
    }
    keyBinds[keyCode].push(func);
}

function clickById(id) {
    document.getElementById(id).click();
}

function clickByClassName(className) {
    document.getElementsByClassName(className)[0].click();
}

function clickByQuerySelector(querySelector, text) {
    var link = document.querySelector(querySelector);
    if (text === undefined || link.text === text) {
        link.click();
    }
}

function getRequest(request) {
    request.method = "GET";
    httpRequest(request);
}

function postRequest(request) {
    request.method = "POST";
    httpRequest(request);
}

function httpRequest(details) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (request.status == 200) {
                details.success(request);
            } else {
                details.failure(request);
            }
        }
    };
    request.open(method, details.url, true);
    if (method == 'POST') {
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    request.send(details.data);
}
