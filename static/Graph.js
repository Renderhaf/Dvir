var eq = document.getElementById("Eq")
var errortext = document.getElementById("error")
var c = document.getElementById("myCan");
var ctx = c.getContext("2d");


  var CenterLines = function(){
    ctx.fillStyle = "Gray"
    ctx.fillRect(0,c.height / 2, c.width ,1);

    ctx.fillStyle = "Gray"
    ctx.fillRect(c.width / 2, 0,1, c.height);
  }

  var map = function(n, start1, stop1, start2, stop2){
    return ((n-start1) / (stop1-start1)) * (stop2-start2) + start2
  }

  var clearctx = function(){
    ctx.fillStyle = "White"
    ctx.fillRect(0,0,c.width,c.height);
  }
  var Main = function(){

    clearctx()

    try {
      if (eq.value != ""){

        for (i= -c.width / 2 ; i < c.width / 2 ; i++){

          var x = i / 10
          var val = math.eval(eq.value,{"X" : x, "x" : x})

          ctx.fillStyle = "Blue"
          ctx.fillRect(map(i, -c.width / 2, c.width / 2,0, c.width), c.height / 2 - val, 3,3);

        }

      } else {

        clearctx()

      }

      errortext.innerHTML = " "

    }
    catch(err) {
      errortext.innerHTML = err.toString()
    }
    CenterLines()
  }
  var time_ = setInterval(Main,100)
