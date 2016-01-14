// ==UserScript==
// @name        Blogspot
// @namespace   com.benjaminsproule
// @include     http://*.blogspot.co.uk/*
// @downloadURL https://github.com/gigaSproule/user-scripts/raw/master/blogspot.user.js
// @version     1
// @grant       none
// ==/UserScript==
document.onkeydown = function(event) {
  if(event.keyCode == '37') {
    document.getElementById('Blog1_blog-pager-newer-link').click();
  } else  if(event.keyCode == '39') {
    document.getElementById('Blog1_blog-pager-older-link').click();
  }
}
