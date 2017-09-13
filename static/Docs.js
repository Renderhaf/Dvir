var text = document.getElementById("text")
var fileInput = document.getElementById('fileInput');

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

var Speak = function(){
  responsiveVoice.speak(text.value);
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
