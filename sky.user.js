// ==UserScript==
// @name        Sky
// @namespace   com.benjaminsproule
// @include     http://www.sky.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/sky.user.js
// @version     1
// @grant       none
// ==/UserScript==
document.onkeydown = function (event) {
  if (event.keyCode == '37') {
    document.getElementsByClassName('navigation-control left') [0].click();
  } else if (event.keyCode == '39') {
    document.getElementsByClassName('navigation-control right') [0].click();
  }
}
