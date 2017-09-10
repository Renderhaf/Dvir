var Color = "Black"
var c = document.getElementById("myCan");
var ctx = c.getContext("2d");
var v = ""
var changes = []
function Draw(event) {
  var x = event.x;
  var y = event.y;
  var ca = document.getElementById("myCan");
  var bs = 5
  x -= ca.offsetLeft;
  y -= ca.offsetTop;
  x = parseInt(x/bs)
  x = x * bs
  y = parseInt(y/bs)
  y = y * bs
  ctx.fillStyle = Color;
  ctx.fillRect(x, y, bs, bs);
  sendData(x,y,Color);
}
function DrawC(x,y,color){
  var ca = document.getElementById("myCan");
  var bs = 5
  ctx.fillStyle = color;
  ctx.fillRect(x, y, bs, bs);
}
function sendData(x,y,color){
 $.post("/Spot/",{
    x : x,
    y : y,
    color : color,
    v : v
 },
 function(data, status){
   if (data === ""){
     console.log("Server pinged")
   }
   else{alert("Data: " + data + "\nStatus: " + status);}
 });
}
function sendOne(){
  $.post("/Spot/",{
    "v":"one"
  }, function(data, status){
      changes = data
      return data;
  });
}

var time = setInterval(refresh,1000)

function refresh(){
  sendOne()
  console.log(changes)
  if (changes == []){
    ctx.fillstyle = "White"
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = Color;
  }
  for (i = 0; i < changes.length; i++){
    console.log(changes[i]["x"])
    DrawC(changes[i]["x"],changes[i]["y"],changes[i]["color"])
  }
}

function zoom(event) {
ctx.fillStyle = "White";
ctx.fillRect(0,0,200,200);
ctx.fillStyle = Color;
var x = event.layerX + 57;
var y = event.layerY + 17;
ctx.drawImage(c,Math.abs(x),Math.abs(y),20, 20,0, 0, 200, 200)
}
c.addEventListener('mousemove', zoom);
c.addEventListener("mousedown", Draw);

function Red(){
  Color = "Red"
}
function Blue(){
  Color = "Blue"
}
function Green(){
  Color = "LightGreen"
}
function Yellow(){
  Color = "Yellow"
}
function Black(){
  Color = "Black"
}
function White(){
  Color = "White"
}
function Orange(){
  Color = "Orange"
}
function Pink(){
  Color = "Pink"
}
