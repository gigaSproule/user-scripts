// ==UserScript==
// @name        GWR WiFi
// @namespace   http://www.benjaminsproule.com
// @author      Benjamin Sproule
// @version     1.0.0
// @include     http://*.passengerwifi.com/*
// @include     https://*.passengerwifi.com/*
// @match       http://*.passengerwifi.com/*
// @match       https://*.passengerwifi.com/*
// @downloadURL https://gitlab.com/gigaSproule/user-scripts/raw/master/gwr-wifi.user.js
// @updateURL   https://gitlab.com/gigaSproule/user-scripts/raw/master/gwr-wifi.meta.js
// @grant       none
// @run-at      document-end
// @require     https://gitlab.com/gigaSproule/user-scripts/raw/master/utils.js
// ==/UserScript==
/* jshint esversion:6 */
/* jshint strict:true */
window.onload = function () {
    'use strict';
    populateSelectField('title', 'Dr');
    populateTextField('firstname', 'email2');
    populateTextField('surname', 'email2');
    populateTextField('email', 'email2@email2.com');
    populateTextField('confirmemail', 'email2@email2.com');
    populateCheckboxField('terms-checkbox', true);
    populateCheckboxField('nonconsent', true);
    clickByQuerySelector('button.col-xs-8.col-xs-offset-2.col-sm-12.col-sm-offset-0.btn.btn-custom.btn-revenue-custom');
};
