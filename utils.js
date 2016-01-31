/* jshint esversion:6 */
/* jshint strict:true */
var utils = {
    keyBinds: {},
    altKeyBinds: {},
    metaKeyBinds: {},
    shiftKeyBinds: {},
    altMetaKeyBinds: {},
    shiftMetaKeyBinds: {},
    shouldCatchKeyCodes: false,
    caughtKeyCodes: [],
    keyMap: {
        '48': 0,
        '49': 1,
        '50': 2,
        '51': 3,
        '52': 4,
        '53': 5,
        '54': 6,
        '55': 7,
        '56': 8,
        '57': 9,
        '65': 'a',
        '66': 'b',
        '67': 'c',
        '68': 'd',
        '69': 'e',
        '70': 'f',
        '71': 'g',
        '72': 'h',
        '73': 'i',
        '74': 'j',
        '75': 'k',
        '76': 'l',
        '77': 'm',
        '78': 'n',
        '79': 'o',
        '80': 'p',
        '81': 'q',
        '82': 'r',
        '83': 's',
        '84': 't',
        '85': 'u',
        '86': 'v',
        '87': 'w',
        '88': 'x',
        '89': 'y',
        '90': 'z'
    }
};

document.addEventListener('keydown', function (event) {
    'use strict';
    var metaKey = navigator.platform.toLowerCase().contains('mac') ? event.metaKey : event.ctrlKey;
    if (utils.shouldCatchKeyCodes) {
        utils.caughtKeyCodes.push(event.keyCode);
        return;
    }
    if (!metaKey && !event.altKey && !event.shiftKey) {
        if (utils.keyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of utils.keyBinds[event.keyCode]) {
            key();
        }
    } else if (!metaKey && event.altKey && !event.shiftKey) {
        if (utils.altKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of utils.altKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (metaKey && !event.altKey && !event.shiftKey) {
        if (utils.metaKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of utils.metaKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (!metaKey && !event.altKey && event.shiftKey) {
        if (utils.shiftKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of utils.shiftKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (metaKey && event.shiftKey && !event.altKey) {
        if (utils.shiftMetaKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of utils.shiftMetaKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    } else if (metaKey && !event.shiftKey && event.altKey) {
        if (utils.altMetaKeyBinds[event.keyCode] === undefined) {
            return;
        }
        for (let key of utils.altMetaKeyBinds[event.keyCode]) {
            event.preventDefault();
            key();
        }
    }
});

function bindKey(keyCode, func) {
    'use strict';
    if (utils.keyBinds[keyCode] === null) {
        utils.keyBinds[keyCode] = [];
    }
    utils.keyBinds[keyCode].push(func);
}

function bindAltKey(keyCode, func) {
    'use strict';
    if (utils.altKeyBinds[keyCode] === null) {
        utils.altKeyBinds[keyCode] = [];
    }
    utils.altKeyBinds[keyCode].push(func);
}

function bindMetaKey(keyCode, func) {
    'use strict';
    if (utils.metaKeyBinds[keyCode] === null) {
        utils.metaKeyBinds[keyCode] = [];
    }
    utils.metaKeyBinds[keyCode].push(func);
}

function bindShiftKey(keyCode, func) {
    'use strict';
    if (utils.shiftKeyBinds[keyCode] === null) {
        utils.shiftKeyBinds[keyCode] = [];
    }
    utils.shiftKeyBinds[keyCode].push(func);
}

function bindAltMetaKey(keyCode, func) {
    'use strict';
    if (utils.altMetaKeyBinds[keyCode] === null) {
        utils.altMetaKeyBinds[keyCode] = [];
    }
    utils.altMetaKeyBinds[keyCode].push(func);
}

function bindShiftMetaKey(keyCode, func) {
    'use strict';
    if (utils.shiftMetaKeyBinds[keyCode] === null) {
        utils.shiftMetaKeyBinds[keyCode] = [];
    }
    utils.shiftMetaKeyBinds[keyCode].push(func);
}

function catchKeyCodes(func, timeout) {
    'use strict';
    utils.shouldCatchKeyCodes = true;
    setTimeout(function () {
        utils.caughtKeyCodes.shift();
        func(utils.caughtKeyCodes);
        utils.caughtKeyCodes = [];
        utils.shouldCatchKeyCodes = false;
    }, timeout);
}

function clickById(id) {
    'use strict';
    if (id === undefined) {
        return;
    }

    document.getElementById(id).click();
}

function clickByClassName(className) {
    'use strict';
    if (className === undefined) {
        return;
    }

    document.getElementsByClassName(className)[0].click();
}

function clickByQuerySelector(querySelector, text) {
    'use strict';
    if (querySelector === undefined) {
        return;
    }

    var link = document.querySelector(querySelector);
    if (text === undefined || link.text === text) {
        link.click();
    }
}

function mapKey(key) {
    'use strict';
    return utils.keyMap[key];
}

function updateSelectById(id, value) {
    'use strict';
    document.getElementById(id).value = value;
}

function getRequest(details) {
    'use strict';
    if (details === undefined) {
        return;
    }

    details.method = "GET";
    httpRequest(details);
}

function postRequest(details) {
    'use strict';
    if (details === undefined) {
        return;
    }

    details.method = "POST";
    if (details.headers === undefined) {
        details.headers = {};
    }
    details.headers['Content-type'] = 'application/x-www-form-urlencoded';
    httpRequest(details);
}

function httpRequest(details) {
    'use strict';
    if (details === undefined) {
        return;
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                details.success(request);
            } else {
                details.failure(request);
            }
        }
    };
    request.open(details.method, details.url, true);
    if (details.headers !== undefined) {
        Object.keys(details.headers).forEach(function (header) {
            request.setRequestHeader(header, details.headers[header]);
        });
    }
    request.send(details.data);
}

function getWindowParameters() {
    'use strict';
    return getParameters(window.location.href);
}

function getParameters(url) {
    'use strict';
    var parameters = {};
    var urlParameters = url.split('?')[1].split('&');
    for (let param of urlParameters) {
        var splitParam = param.split('=');
        parameters[splitParam[0]] = splitParam[1];
    }
    return parameters;
}
