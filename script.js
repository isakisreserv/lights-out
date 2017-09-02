var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 5;
var y = 5;
var IDs = new Array(x*y);
var running = false;
var mouseDown = false;
var hard = true;
var latest;

var xWidth;
var yHeight;
var xVari;
var yVari;

window.onload = function() {
  
  for (var i = 0; i < x*y; i++) {
    
  }
  
  generate();
  scramble(x*y);
  //running = true;
}

window.addEventListener('resize', function(event){
  generate();
});

function generate() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  xWidth = canvas.width / x;
  yHeight = canvas.height / y;
  xVari = xWidth / 4;
  yVari = yHeight / 4;
  for (var i = 0; i < x; i++) {
    for (var ii = 0; ii < y; ii++) {
      if (IDs[x*ii + i] == 1) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(i*xWidth, ii*yHeight, xWidth, yHeight);
      } else {
        ctx.fillStyle = "white";
         ctx.fillRect(i*xWidth - 0, ii*yHeight - 0, xWidth + 0, yHeight + 0);
      }
    }
  }
}

/*function createDiv(id, xpx, zpx) {
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
}*/

function clickDiv(id, protection) {
  if (protection && latest==id) {
    return;
  }
  changeDiv(id);
  if (id % x != 0)
  changeDiv(id-1);
  if ((id+1) % x != 0)
  changeDiv(id+1);
  changeDiv(id-x);
  changeDiv(id+x);
  latest = id;
  
  winTest();
  
}

function changeDiv(id) {
  if (id < x*y) {
    if (IDs[id] != 1) {
      IDs[id] = 1;
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(getXById(id), getYById(id), xWidth, yHeight);
    }
    else {
      IDs[id] = 0;
      ctx.fillStyle = "white";
      if (hard) {
        ctx.fillRect(getXById(id) - xVari, getYById(id) - yVari, xWidth + xVari*2 , yHeight + yVari*2);
      } else {
        ctx.fillRect(getXById(id) - 1, getYById(id) - 1, xWidth + 2 , yHeight + 2);
      }
    }
    //confirm(ctx.fillStyle);
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
    clickDiv(Math.floor(Math.random()*(x*y-1)), false);
  }
}

function winTest() {
  for (var i = 0; i < x*y; i++) {
    if (IDs[i] == 1) {
      return false;
    }
  }
  mouseDown = false;
  confirm("grattis!!");
  return true;
}

function getXById(id) {
  return (id % x) * xWidth;
}

function getYById(id) {
  return Math.floor(id / x) * yHeight;
}

function getId(xLoc, yLoc) {
  x_ = Math.floor(xLoc / xWidth);
  y_ = Math.floor(yLoc / yHeight);
  return x*y_ + x_;
}

canvas.onmousedown = function(evt) {
  clickDiv(getId( getMouseLoc(evt).x, getMouseLoc(evt).y ), false);
  mouseDown = true;
}

canvas.onmouseup = function(evt) {
  mouseDown = false;
}

canvas.onmousemove = function(evt) {
  if (mouseDown) {
    clickDiv(getId( getMouseLoc(evt).x, getMouseLoc(evt).y ), true);
  }
}


function getMouseLoc(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {x:mouseX, y:mouseY}
}