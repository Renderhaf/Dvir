var text = document.getElementById("text")
var fileInput = document.getElementById('fileInput');
var codenum = 1
var codingMode = ""

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var Save = function(){
  var blob = new Blob([text.value], {type: "text/plain;charset=utf-8"});

  var name = prompt("File Name:")
  if (name == "") {
    name = "NewFile.txt"
  } else {
    if (name.search(".") == -1){
      name = name + ".txt"
    } else {
      name = name
    }
  }
    saveAs(blob, name);
}

var New = function(){
  text.value = ""
}

var Open = function(){
  $('#fileInput').click();
}

var Speak = function(){
  responsiveVoice.speak(text.value,document.getElementById("Voice").value);
}

var Code = function(){
  if (codenum % 2 != 0){
    codingMode = new Behave({
      textarea: text
    });

    document.getElementById("codebutton").value = "Coding Mode (ON)"

  } else {

    codingMode.destroy()
    document.getElementById("codebutton").value = "Coding Mode (OFF)"

  }
  codenum ++
}

var Encrypt = function(num){
  var AsciiVar = 5

  if (num == 0){
    var sha256 = new jsSHA('SHA-256', 'TEXT');
    sha256.update(text.value);
    var hash = sha256.getHash("HEX");
    text.value = hash
  }

  if (num == 1){
    var a = text.value.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    text.value =  a.join("");
  }

  if (num == 2){
    var newstr = ""
    for (i=0;i<text.value.length;i++){
      var char = text.value[i]
      var charASCII = char.charCodeAt(0)
      // var newASCII = parseInt(charASCII / 2)
      var newASCII = charASCII + AsciiVar

      newstr += String.fromCharCode(newASCII)
    }
    text.value = newstr
  }

  if (num == 3){
    var newstr = ""
    for (i=0;i<text.value.length;i++){
      var char = text.value[i]
      var charASCII = char.charCodeAt(0)
      // var newASCII = parseInt(charASCII / 2)
      var newASCII = charASCII - AsciiVar
      newstr += String.fromCharCode(newASCII)
    }
    text.value = newstr
  }
}

fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;

    var reader = new FileReader();

    reader.onload = function(e) {
          text.value = reader.result;
    }

    reader.readAsText(file);

  });
