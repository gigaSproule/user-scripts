var keyBinds = {};
var altKeyBinds = {};
var metaKeyBinds = {};
var shiftKeyBinds = {};
var altMetaKeyBinds = {};
var shiftMetaKeyBinds = {};
var shouldCatchKeyCodes = false;
var caughtKeyCodes = [];

document.addEventListener('keydown', function (event) {
    var metaKey = navigator.platform.toLowerCase().contains('mac') ? event.metaKey : event.ctrlKey;
    if (shouldCatchKeyCodes) {
        caughtKeyCodes.push(event.keyCode);
        return;
    }
    if (!metaKey && !event.altKey && !event.shiftKey) {
        if (keyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of keyBinds[event.keyCode]) {
            key();
        }
    } else if (!metaKey && event.altKey && !event.shiftKey) {
        if (altKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of altKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (metaKey && !event.altKey && !event.shiftKey) {
        if (metaKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of metaKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (!metaKey && !event.altKey && event.shiftKey) {
        if (shiftKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of shiftKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (metaKey && event.shiftKey && !event.altKey) {
        if (shiftMetaKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of shiftMetaKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (metaKey && !event.shiftKey && event.altKey) {
        if (altMetaKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of altMetaKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    }
});

function bindKey(keyCode, func) {
    if (keyBinds[keyCode] == null) {
        keyBinds[keyCode] = [];
    }
    keyBinds[keyCode].push(func);
}

function bindAltKey(keyCode, func) {
    if (altKeyBinds[keyCode] == null) {
        altKeyBinds[keyCode] = [];
    }
    altKeyBinds[keyCode].push(func);
}

function bindMetaKey(keyCode, func) {
    if (metaKeyBinds[keyCode] == null) {
        metaKeyBinds[keyCode] = [];
    }
    metaKeyBinds[keyCode].push(func);
}

function bindShiftKey(keyCode, func) {
    if (shiftKeyBinds[keyCode] == null) {
        shiftKeyBinds[keyCode] = [];
    }
    shiftKeyBinds[keyCode].push(func);
}

function bindAltMetaKey(keyCode, func) {
    if (altMetaKeyBinds[keyCode] == null) {
        altMetaKeyBinds[keyCode] = [];
    }
    altMetaKeyBinds[keyCode].push(func);
}

function bindShiftMetaKey(keyCode, func) {
    if (shiftMetaKeyBinds[keyCode] == null) {
        shiftMetaKeyBinds[keyCode] = [];
    }
    shiftMetaKeyBinds[keyCode].push(func);
}

function catchKeyCodes(func, timeout) {
    shouldCatchKeyCodes = true;
    setTimeout(function () {
        caughtKeyCodes.shift();
        func(caughtKeyCodes);
        caughtKeyCodes = [];
        shouldCatchKeyCodes = false;
    }, timeout);
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

function updateSelectById(id, value) {
    document.getElementById(id).value = value;
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

function getWindowParameters() {
    return getParameters(window.location.href);
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
