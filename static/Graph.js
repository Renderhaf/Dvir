var eqs = [document.getElementById("Eq")]
var errortext = document.getElementById("error")
var c = document.getElementById("myCan");
var ctx = c.getContext("2d");
var cleareqs = 0

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

  var Add = function(){
    var list = document.getElementById("EqList")
    var newli = document.createElement("li")
    var neweq = document.createElement("input")
    neweq.setAttribute("id", "eq" + (eqs.length + 1).toString())

    var newco = document.createElement("input")
    newco.setAttribute("id", "co" + (eqs.length).toString())
    newco.setAttribute("type", "color")

    newli.appendChild(neweq);
    newli.appendChild(newco);
    newli.appendChild(document.createElement("br"))

    list.appendChild(newli)

    eqs.push(document.getElementById("eq"+(eqs.length + 1).toString()))
  }

  var Main = function(){
    cleareqs = 0
    clearctx()

    try {
        for (h=0;h<eqs.length;h++){
          if (eqs[h].value != ""){

            ctx.beginPath();
            ctx.moveTo(map(-c.width / 2, -c.width / 2, c.width / 2,0, c.width), c.height / 2 - math.eval(eqs[h].value,{"X" : -c.width / 20, "x" :-c.width / 20}));

            for (i = -c.width / 2 + 1; i < c.width / 2 ; i++){

                var x = i / 10
                var val = math.eval(eqs[h].value,{"X" : x, "x" : x})

                ctx.strokeStyle = document.getElementById("co" + h).value
                ctx.lineWidth = 3
                ctx.lineTo(map(i, -c.width / 2, c.width / 2,0, c.width), c.height / 2 - val);
            }

            ctx.stroke()

          } else {

              cleareqs ++

          }


        }

        errortext.innerHTML = " "

        if (cleareqs == eqs.length){
          clearctx()
        }
    }

    catch(err) {
      errortext.innerHTML = err.toString()
    }
    CenterLines()
  }
  var time_ = setInterval(Main,100)
