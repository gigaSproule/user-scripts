// ==UserScript==
// @name        Reddit
// @namespace   com.benjaminsproule
// @include     https://www.reddit.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/reddit.user.js
// @version     1
// @grant       none
// ==/UserScript==
document.onkeydown = function (event) {
  if (event.keyCode == '37') {
    document.querySelector('a[rel="nofollow prev"]').click();
  } else if (event.keyCode == '39') {
    document.querySelector('a[rel="nofollow next"]').click();
  }
}
