var URL = window.URL;
var c = document.getElementById('myCan');
var ctx = document.getElementById('myCan').getContext('2d');
document.getElementById("fileinput").addEventListener('change', input, false);


  function input(e){
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function() {
      c.style = ""
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 20, 20);
    }
    img.src = url;
  }

  function totext(){
    var data = c.width + "," + c.height + "|" +ctx.getImageData(0,0,c.width,c.height).data

    var blob = new Blob([data.toString()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "TextImage.txt");
  }

  function clickfile(){
    document.getElementById("textfileinput").click()
  }
  function clickImage(){
    document.getElementById("fileinput").click()
  }

  function toImage(){
    var file = document.getElementById("textfileinput").files[0];
    var textType = /text.*/;

    var reader = new FileReader();
    var text = ""

    reader.readAsText(file);
    reader.onload = function(e) {
          text = reader.result.toString();


          if (text.indexOf("|") != -1){

            var wh = text.substr(0,text.indexOf("|"))

            if (wh.indexOf(",") != -1){

              var w = wh.substr(0,wh.indexOf(","))
              var h = wh.substr(wh.indexOf(",") + 1, wh.length)

              c.style = ""
              c.width = w;
              c.height = h;

              text = "[" + text.substr(text.indexOf("|") + 1, text.length) + "]"
              imagedata = JSON.parse(text)


              for (i=0;i<imagedata.length / 4; i++){
                var x = i % w
                var y = (i - i % w) / w

                var r = imagedata[i * 4]
                var g = imagedata[i * 4 + 1]
                var b = imagedata[i * 4 + 2]
                var a = imagedata[i * 4 + 3]

                ctx.fillStyle = "rgba(" + r + "," + g + "," + b  + "," + a + ")"
                ctx.fillRect(x,y,1,1)

              }
              // var image = c.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
              // window.location.href=image;

            }
            else {
              alert("This is not a good string! Comma Missing!")
            }
          }
          else {
            alert("This is not a good string! | missing!")
          }
        }
  }
