var screen = document.getElementById("screen");
var x = 5;
var y = 5;
var running = false;

var xWidth = window.innerWidth / x;
var yHeight = window.innerHeight / y;

window.onload = function() {
	for (var i = 0; i < x; i++) {
		for (var ii = 0; ii < y; ii++) {
			screen.appendChild(createDiv(x*ii + i, i*xWidth, ii*yHeight));
		}
	}
	scramble(x*y);
	running = true;
}

function createDiv(id, xpx, zpx) {
	var div = document.createElement("div");
	div.style.width = xWidth + "px";
	div.style.height = yHeight + "px";
	div.className = "square";
	div.id = id;
	div.onmousedown = function(){clickDiv(id)};
	div.onmouseover = function(){if (mouseDown==true) {clickDiv(id)}};
	div.style.left = xpx + "px";
	div.style.top = zpx + "px";
	div.style.backgroundColor = "white";
	//div.innerHTML = id;
	return div;
}

function clickDiv(id) {
	changeDiv(id);
	if (id % x != 0)
	changeDiv(id-1);
	if ((id+1) % x != 0)
	changeDiv(id+1);
	changeDiv(id-x);
	changeDiv(id+x);
	if (running)
		winTest();
}

function changeDiv(id) {
	if (document.getElementById(id) != null) {
		var div = document.getElementById(id);
		if (div.on != 1) {
			div.on = 1;
			div.style.backgroundColor = getRandomColor();
		}
		else {
			div.on = 0;
			div.style.backgroundColor = "white";
		}
	}

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function scramble(clicks) {
	for (var i = 0; i < x*y; i++) {
		clickDiv(Math.floor(Math.random()*(x*y-1)));
	}
}

function winTest() {
	for (var i = 0; i < x*y; i++) {
		var div = document.getElementById(i);
		if (div.on == 1) {
			return false;
		}
	}
	confirm("ja!");
	return true;
}

var mouseDown = false;
document.body.onmousedown = function() {
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}
