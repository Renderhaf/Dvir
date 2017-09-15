var text = document.getElementById("text")
var fileInput = document.getElementById('fileInput');
var codenum = 1
var codingMode = ""

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
  responsiveVoice.speak(text.value);
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

fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;

    var reader = new FileReader();

    reader.onload = function(e) {
          text.value = reader.result;
    }

    reader.readAsText(file);

  });
