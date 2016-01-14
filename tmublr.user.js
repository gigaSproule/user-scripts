// ==UserScript==
// @name        Tumblr
// @namespace   com.benjaminsproule
// @include     http://*.tumblr.com/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/tumblr.user.js
// @version     1
// @grant       none
// ==/UserScript==
document.onkeydown = function(event) {
  if(event.keyCode == '37') {
    document.getElementById('newer_posts').click();
  } else if(event.keyCode == '39') {
    document.getElementById('older_posts').click();
  }
}
