var c = document.getElementById("Can");
var ctx = c.getContext("2d");
var width = screen.width;
var height = screen.height;
var num = 1
var w = prompt("Width Of Noise (default 5):")

if (w == ""){
  w = 5
}

alert("To start, close this Popup and press Enter")

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    c.width = width
    c.height = height
    toggleFullScreen(c);
    num ++
  }
}, false);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleFullScreen(element) {
  // Supports most browsers and their versions.
   var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

   if (requestMethod) { // Native full screen.
       requestMethod.call(element);
   } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
       var wscript = new ActiveXObject("WScript.Shell");
       if (wscript !== null) {
           wscript.SendKeys("{F11}");
       }
   }
}

function draw(){
  if (num % 2 == 0){
    for (x=0;x<c.width / w ;x++){
      for (y=0;y<c.height / w ;y++){

        var wb = getRandomInt(0,10)
        if (wb >= 5){
          ctx.fillStyle = "Black"
        } else {
          ctx.fillStyle = "White"
        }

        ctx.fillRect(x * w, y * w, w, w);
        // console.log(r)
      }
    }
  }
}
var x = setInterval(draw, 50)
