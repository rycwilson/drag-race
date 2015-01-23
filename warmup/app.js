box = document.getElementById('box');

var start = 50;
var step = 10;
var count = 1;

window.addEventListener('keyup', function(event) {
  if (event.keyCode === 39) {
    // Alex's code:
    // box.style.left = parseInt(box.style.left, 10) + 1 + "px";
    box.style.left = start + (count * step) + "px";
    count += 1;
  }
});