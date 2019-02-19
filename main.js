var yyy = document.getElementById('canvas');
var context = yyy.getContext('2d');
var lineWidth = 5

autosetcanvas(yyy)
litsentouser(yyy)

black.onclick = function(){
  context.strokeStyle = 'black'
  context.fillStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick = function(){
  context.strokeStyle = 'red'
  context.fillStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green'
  context.fillStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  context.fillStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
}

fine.onclick = function(){
  lineWidth = 2
}
crude.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 8
}
clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.target = '_blank'
  a.click()
}
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1)
  context.lineWidth = lineWidth
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}

var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

function autosetcanvas(canvas){
    setcanvasSize()
    window.onresize = function(){
    setcanvasSize()
}
}
function setcanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

function litsentouser(canvas){
var using = false
var lastPoint = {x:undefined,y:undefined}

if(document.body.ontouchstart !== undefined){
  canvas.ontouchstart = function(xxx){
    var x = xxx.touches[0].clientX
    var y = xxx.touches[0].clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {x:x,y:y}
      drawCircle(x,y,1)
    }
  }
  canvas.ontouchmove = function(xxx){
    var x = xxx.touches[0].clientX
    var y = xxx.touches[0].clientY
    if (!using){return}
    if (eraserEnabled) {
      context.clearRect(x-5,y-5,10,10)
   }else{
     var newPoint = {x:x,y:y}
     drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
     lastPoint = newPoint
   }
  }
  canvas.ontouchend = function(){
    using = false
  }
}else{
canvas.onmousedown = function(xxx){
    var x = xxx.clientX
    var y = xxx.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {x:x,y:y}
      drawCircle(x,y,1)
    }
}
canvas.onmousemove = function(xxx){
    var x = xxx.clientX
    var y = xxx.clientY
    if (!using){return}
    if (eraserEnabled) {
      context.clearRect(x-5,y-5,10,10)
   }else{
     var newPoint = {x:x,y:y}
     drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
     lastPoint = newPoint
   }   
}
canvas.onmouseup = function(xxx){
  using = false
}
}
}