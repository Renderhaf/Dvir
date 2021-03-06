window.AudioContext = window.AudioContext || window.webkitAudioContext;
var AudioCTX = new (window.AudioContext || window.webkitAudioContext)();
var oct = 3
var context = new AudioContext(),
            settings = {
                id: 'keyboard',
                width: 600,
                height: 150,
                startNote: 'C3',
                whiteNotesColour: '#fff',
                blackNotesColour: '#000',
                borderColour: '#000',
                activeColour: 'gray',
                octaves: 1.71,
                position: "absolute"
            },
            keyboard = new QwertyHancock(settings);

var changeoct = function(num){
  var k = document.getElementById("keyboard")
  k.removeChild(k.firstChild);
  var settings = {
      id: 'keyboard',
      width: 600,
      height: 150,
      startNote: 'C' + num,
      whiteNotesColour: '#fff',
      blackNotesColour: '#000',
      borderColour: '#000',
      activeColour: 'gray',
      octaves: 1.71
  }
  keyboard = new QwertyHancock(settings);
}

var Up = function(){
  if (oct < 8){
    changeoct(oct + 1)
    oct++
  }
}

var Down = function(){
  if (oct > 0){
    changeoct(oct - 1)
    oct--
  }
}

window.addEventListener('keydown', function(event){
switch (event.keyCode) {
  case 37: // Left
    Down()
  break;

  case 39: // Right
    Up()
  break;
}})

var oscs = {}

var playNote = function(freq){
  type = document.getElementById("select")
  oscs[freq] = AudioCTX.createOscillator();

  oscs[freq].type = type.value;
  oscs[freq].frequency.value = freq; // value in hertz
  oscs[freq].connect(AudioCTX.destination);
  oscs[freq].start();
}

var stopNote = function(freq){
  oscs[freq].stop()
}
keyboard.keyDown = function (note, frequency) {
    playNote(frequency)
};

keyboard.keyUp = function (note, frequency) {
    stopNote(frequency)
};
