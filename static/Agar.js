class Player {
  constructor(x, y, color, name, speed, Health, Class) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.name = name;
    this.health = Health;
    this.class = Class;
    this.mult = speed
  }
  Move(x,y){
    this.x += x * this.mult
    this.y += y * this.mult
  }
}
class Bullet {
  constructor(x,y,speed,damage){
    this.x = x
    this.y = y
    this.speed = speed
    this.damage = damage
  }
}

var c = document.getElementById("myCan");
var ctx = c.getContext("2d");

var glojson

// var name0 = "Renderhaf"
var name0 = prompt("Name?")
var Self =  new Player(c.width/2,c.height/2,"Black",name0,7,100,"")

window.addEventListener('keydown', function(event){
switch (event.keyCode) {
  case 37: // Left
    Self.Move(-1,0)
  break;

  case 38: // Up
    Self.Move(0,-1)
  break;

  case 39: // Right
    Self.Move(1,0)
  break;

  case 40: // Down
    Self.Move(0,1)
  break;
}})

//   function Draw(){
//     ctx.fillStyle = "White"
//     ctx.fillRect(0,0,c.width,c.height)
//
//     ctx.fillStyle = Self.color
//     ctx.fillRect(Self.x,Self.y,25,25)
//     ctx.fill()
//     ctx.font = "15px Arial";
//     ctx.fillStyle = "Gray"
//     ctx.fillText(Self.name,Self.x - Self.name.length * 2, Self.y + 40);
// }

function Update(){
  $.post("/Agar/",{
    "x":Self.x,
    "y":Self.y,
    "name":Self.name,
    "health":Self.health
  }, function(data, status){

        ctx.fillStyle = "White"
        ctx.fillRect(0,0,c.width,c.height)

        ctx.fillStyle = Self.color
        ctx.fillRect(Self.x,Self.y,25,25)
        ctx.fill()
        ctx.font = "15px Arial";
        ctx.fillStyle = "Gray"
        ctx.fillText(Self.name,Self.x - Self.name.length * 2, Self.y + 40);

      for (i=0;i<Object.keys(data).length ;i++){

        dat = data[Object.keys(data)[i]]

        if (dat["name"] != name0){

        ctx.fillStyle = "Black"
        ctx.fillRect(dat["x"],dat["y"],25,25)
        ctx.fill()
        ctx.font = "15px Arial";
        ctx.fillStyle = "Gray"
        ctx.fillText("Hello",dat["x"] + 50, dat["y"] + 50);
        // console.log(dat["name"])
        console.log(dat["x"], dat["y"])
        // ctx.fillText(dat["name"],100, 200);
      }
      }
  });
}

// window.onbeforeunload = function (event) {
//     var message = 'Important: Please click on \'Save\' button to leave this page.';
//     if (typeof event == 'undefined') {
//         alert("test")
//         event = window.event;
//     }
//     if (event) {
//         event.returnValue = message;
//     }
//     return message;
// };

// var main = setInterval(Draw,10)
var update = setInterval(Update,75)
