/* jshint esversion:6 */
/* jshint strict:true */
var keyBinds = {};
var altKeyBinds = {};
var metaKeyBinds = {};
var shiftKeyBinds = {};
var altMetaKeyBinds = {};
var shiftMetaKeyBinds = {};
var shouldCatchKeyCodes = false;
var caughtKeyCodes = [];
var keyMap = {
    '8': 'backspace',
    '9': 'tab',
    '13': 'enter',
    '16': 'shift',
    '17': 'ctrl',
    '18': 'alt',
    '19': 'pause/break',
    '20': 'caps lock',
    '27': 'escape',
    '33': 'page up',
    '34': 'page down',
    '35': 'end',
    '36': 'home',
    '37': 'left arrow',
    '38': 'right arrow',
    '39': 'down arrow',
    '45': 'insert',
    '46': 'delete',
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
    '90': 'z',
    '186': ';',
    '187': '=',
    '188': ',',
    '189': '-',
    '190': '.',
    '191': '/',
    '192': '`',
    '219': '(',
    '220': '\\',
    '221': ')',
    '222': '\''
};
var commandsDiv;
var lastTimeCreatedCommandsDiv;
var isMac = navigator.platform.toLowerCase().indexOf('mac') !== -1;

document.addEventListener('keydown', function (event) {
    'use strict';
    if (event.metaKey && event.altKey && event.ctrlKey) {
        showCommandsDiv();
    }

    var metaKey = isMac ? event.metaKey : event.ctrlKey;
    if (shouldCatchKeyCodes) {
        caughtKeyCodes.push(event.keyCode);
        return;
    }

    if (!metaKey && !event.altKey && !event.shiftKey) {
        executeKeyBinding(keyBinds, event.keyCode);
    } else if (!metaKey && event.altKey && !event.shiftKey) {
        executeKeyBinding(altKeyBinds, event.keyCode);
    } else if (metaKey && !event.altKey && !event.shiftKey) {
        executeKeyBinding(metaKeyBinds, event.keyCode);
    } else if (!metaKey && !event.altKey && event.shiftKey) {
        executeKeyBinding(shiftKeyBinds, event.keyCode);
    } else if (metaKey && event.shiftKey && !event.altKey) {
        executeKeyBinding(shiftMetaKeyBinds, event.keyCode);
    } else if (metaKey && !event.shiftKey && event.altKey) {
        executeKeyBinding(altMetaKeyBinds, event.keyCode);
    }
});

document.addEventListener('keyup', function (event) {
    'use strict';
    hideCommandsDiv();
});

function executeKeyBinding(keyBinding, keyCode) {
    'use strict';
    if (keyBinding[keyCode] === undefined) {
        return;
    }
    for (let key of keyBinding[keyCode]) {
        key.func();
    }
}

function bindKey(keyCode, description, func) {
    'use strict';
    addKeyBinding(keyBinds, keyCode, description, func);
}

function bindAltKey(keyCode, description, func) {
    'use strict';
    addKeyBinding(altKeyBinds, keyCode, description, func);
}

function bindMetaKey(keyCode, description, func) {
    'use strict';
    addKeyBinding(metaKeyBinds, keyCode, description, func);
}

function bindShiftKey(keyCode, description, func) {
    'use strict';
    addKeyBinding(shiftKeyBinds, keyCode, description, func);
}

function bindAltMetaKey(keyCode, description, func) {
    'use strict';
    addKeyBinding(altMetaKeyBinds, keyCode, description, func);
}

function bindShiftMetaKey(keyCode, description, func) {
    'use strict';
    addKeyBinding(shiftMetaKeyBinds, keyCode, description, func);
}

function addKeyBinding(keyBinding, keyCode, description, func) {
    'use strict';
    if (keyBinding === undefined) {
        alert('Key binding array not provided');
        return;
    }

    if (keyCode === undefined) {
        alert('Key code not provided');
        return;
    }

    if (description === undefined) {
        alert('Description not provided');
        return;
    }

    if (func === undefined) {
        alert('Function not provided');
        return;
    }

    if (keyBinding[keyCode] === undefined || keyBinding[keyCode] === null) {
        keyBinding[keyCode] = [];
    }
    keyBinding[keyCode].push({'description': description, 'func': func});
}

function catchKeyCodes(func, timeout) {
    'use strict';
    shouldCatchKeyCodes = true;
    setTimeout(function () {
        func(caughtKeyCodes);
        caughtKeyCodes = [];
        shouldCatchKeyCodes = false;
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

function createCommandsDiv(show) {
    'use strict';
    if (lastTimeCreatedCommandsDiv !== undefined && lastTimeCreatedCommandsDiv.getTime() < new Date().getTime() + 1000) {
        return;
    }
    lastTimeCreatedCommandsDiv = new Date();
    commandsDiv = document.createElement('div');

    commandsDiv.id = 'commands';
    commandsDiv.style.position = 'fixed';
    commandsDiv.style.top = '30px';
    commandsDiv.style.left = '30px';
    commandsDiv.style.background = 'black';
    commandsDiv.style.color = 'white';
    commandsDiv.style.fontSize = 'medium';
    commandsDiv.style.padding = '15px';
    commandsDiv.style.borderRadius = '15px 15px';
    commandsDiv.style.border = '2px solid #F5F5F7';
    commandsDiv.style.zIndex = '99999999';
    if (show) {
        commandsDiv.style.display = 'block';
        commandsDiv.style.visibility = 'visible';
    } else {
        commandsDiv.style.display = 'none';
        commandsDiv.style.visibility = 'hidden';
    }

    var commands = '<table style="border: none; margin-bottom: 0px">';

    var metaKey = isMac ? 'cmd' : 'ctrl';
    commands += getCommands(keyBinds);
    commands += getCommands(altKeyBinds, 'alt');
    commands += getCommands(metaKeyBinds, metaKey);
    commands += getCommands(shiftKeyBinds, 'shift');
    commands += getCommands(altMetaKeyBinds, 'alt + ' + metaKey);
    commands += getCommands(shiftMetaKeyBinds, 'shift + ' + metaKey);

    commands += '</table>';
    commandsDiv.innerHTML = commands;

    document.getElementsByTagName('body')[0].appendChild(commandsDiv);
}

function getCommands(keyBinding, specialCharacters) {
    'use strict';
    if (specialCharacters === undefined || specialCharacters === null) {
        specialCharacters = '';
    }

    var commands = '';
    for (let key in keyBinding) {
        for (let value of keyBinding[key]) {
            commands += '<tr style="border: none"><td style="border: none">' + specialCharacters + ' + ' + mapKey(key) + '</td><td style="padding-left: 15px; border: none">' + value.description + '</td></tr>';
        }
    }
    return commands;
}

function hideCommandsDiv() {
    'use strict';
    var commandsDivToDelete = document.getElementById('commands');
    if (commandsDivToDelete === null || commandsDivToDelete === undefined) {
        createCommandsDiv(false);
    } else {
        commandsDivToDelete.style.display = 'none';
        commandsDivToDelete.style.visibility = 'hidden';
    }
}

function mapKey(key) {
    'use strict';
    return keyMap[key];
}

function showCommandsDiv() {
    'use strict';
    var commandsDivToDelete = document.getElementById('commands');
    if (commandsDivToDelete === null || commandsDivToDelete === undefined) {
        createCommandsDiv(true);
    } else {
        commandsDivToDelete.style.display = 'block';
        commandsDivToDelete.style.visibility = 'visible';
    }
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
