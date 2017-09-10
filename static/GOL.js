var ssize = prompt("What is the canvas size? (default 50)")
  if (ssize == ""){
    ssize = 50
  }else{
    ssize = parseInt(ssize)
  }
  var c = document.getElementById("myCan");
  var ctx = c.getContext("2d");
  var onoff = true
  var play = false
  var boxes = new Array(ssize*ssize);
  var nboxes = new Array(boxes.length);
  var sc = 0
  var pixelsize = c.width/ssize

  for (g=0;g<boxes.length;g++){
    boxes[g] = false
    nboxes[g] = false
  }

  var One = function(){
    play = true
    main()
    play = false
  }

  var Start = function(){
    play = true
  }

  var Stop = function(){
    play = false
  }

  var Clear = function(){
    for (g=0;g<boxes.length;g++){
      boxes[g] = false
      nboxes[g] = false
    }
    Stop()
    One()
  }

  var findloc = function(x,y){
    var c = document.getElementById("myCan");
    var loc = 0
    loc += x/(pixelsize)
    loc += y/(pixelsize) * ssize
    // console.log(loc)
    return(loc)
  }

  var Draw = function(event){
    var x = event.x;
    var y = event.y;

    var c = document.getElementById("myCan");

    x -= c.offsetLeft;
    y -= c.offsetTop;

    x = parseInt(x/(pixelsize))
    x = x * pixelsize
    y = parseInt(y/(pixelsize))
    y = y * pixelsize

    if (onoff){
      ctx.fillStyle = "Black";
    }else{
      ctx.fillStyle = "White";
    }
    ctx.fillRect(x, y, pixelsize, pixelsize);

    boxes[findloc(x,y)] = onoff
  }

  var main = function(){
    var pm = document.getElementById("pm")
    if (onoff){
      pm.innerHTML = "+"
    } else {
      pm.innerHTML = "-"
    }

    if (play){
      for (i = 0;i < boxes.length;i++){
        var x = (i % ssize) * (pixelsize)
        var y = (parseInt(i/ssize)) * (pixelsize)

        if (boxes[i] == true){
          ctx.fillStyle = "Black";
          ctx.fillRect(x, y, pixelsize, pixelsize);
        } else {
          ctx.fillStyle = "White";
          ctx.fillRect(x, y, pixelsize, pixelsize);
        }
      }
      for (i = 0;i < boxes.length;i++){
        var nbrs = 0
        if (boxes[i-ssize-1] == true){
          nbrs++
        }
        if (boxes[i-ssize] == true){
          nbrs++
        }
        if (boxes[i-ssize+1] == true){
          nbrs++
        }
        if (boxes[i+1] == true){
          nbrs++
        }
        if (boxes[i+ssize+1] == true){
          nbrs++
        }
        if (boxes[i+ssize] == true){
          nbrs++
        }
        if (boxes[i+ssize-1] == true){
          nbrs++
        }
        if (boxes[i-1] == true){
          nbrs++
        }

        if (nbrs < 2 && boxes[i] == true){
          nboxes[i] = false
        }
        if (nbrs > 3 && boxes[i] == true){
          nboxes[i] = false
        }
        if (boxes[i] == true){
          if (nbrs == 2 || nbrs == 3){
            nboxes[i] = true
          }
        }
        if (boxes[i] == false && nbrs == 3){
          nboxes[i] = true
        }
      }
      for (h=0;h<boxes.length;h++){
        boxes[h] = nboxes[h]
      }
    }
  }

  var update = setInterval(main,100)

  window.addEventListener('keydown', function(event){
    switch (event.keyCode) {
      case 187: // +
        onoff = true
      break;

      case 189: // -
        onoff = false
      break;

      case 32: // space
        if (play){
          Stop()
        } else {
          Start()
        }
      break;
    }})

  c.addEventListener("mousedown", Draw, false);
