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
    if (id === undefined) {
        return;
    }

    document.getElementById(id).click();
}

function clickByClassName(className) {
    if (className === undefined) {
        return;
    }

    document.getElementsByClassName(className)[0].click();
}

function clickByQuerySelector(querySelector, text) {
    if (querySelector === undefined) {
        return;
    }

    var link = document.querySelector(querySelector);
    if (text === undefined || link.text === text) {
        link.click();
    }
}

function getRequest(details) {
    if (details === undefined) {
        return;
    }

    details.method = "GET";
    httpRequest(details);
}

function postRequest(details) {
    if (details === undefined) {
        return;
    }

    details.method = "POST";
    if (details.headers == undefined) {
        details.headers = {};
    }
    details.headers['Content-type'] = 'application/x-www-form-urlencoded';
    httpRequest(details);
}

function httpRequest(details) {
    if (details === undefined) {
        return;
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status == 200) {
                details.success(request);
            } else {
                details.failure(request);
            }
        }
    };
    request.open(details.method, details.url, true);
    if (details.headers != undefined) {
        Object.keys(details.headers).forEach(function (header) {
            request.setRequestHeader(header, details.headers[header]);
        });
    }
    request.send(details.data);
}

function getParameters(url) {
    var parameters = {};
    var urlParameters = url.split('?')[1].split('&');
    for (let param of urlParameters) {
        var splitParam = param.split('=');
        parameters[splitParam[0]] = splitParam[1];
    }
    return parameters;
}
