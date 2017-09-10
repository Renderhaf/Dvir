var name = prompt("Please Enter your Username:")
var text = document.getElementById("myMessage")
var list = document.getElementById("messages")
var GruText = document.getElementById("gru")
var Noti = document.getElementById("notify")
var messages = []
var Group = "Main"
var start = false

window.addEventListener('keydown', function(event){
switch (event.keyCode) {
  case 13: // Enter
    Send()
  break;
}})

var Update = function(){
  $.post("/ChatRoom/",{"Send" : "False", "Group" : Group , "JC" : ""}, function(data, status){
      if (messages[messages.length - 1] != data[data.length - 1]){
        if (Notification.permission != "granted"){
          Notification.requestPermission()
        }
        if (Noti.checked == true && start == true && document.hasFocus() == false){
          if (Notification.permission == "granted"){
              var Not = new Notification("HTTP Chat Room",{
                body:"You Have New Messages",
                requireInteraction: false,
                Tag:"New"
              })
            }
          }

        messages = data
        list.innerHTML = ""
        for (i=0;i<data.length;i++){
          $("#messages").append('<li>'+data[i]+'</li>');
        }
      }
  });
  start = true
}
var inter = setInterval(Update, 1000)

var Send = function(){
  $.post("/ChatRoom/",{"Send" : "True", "Group": Group, "Text": name + " : " + text.value}, function(data, status){
      console.log(data)
      text.value = ""
  });
}

var Join = function(){
  $.post("/ChatRoom/",{"Send" : "False", "JC": "J", "Group": prompt("Group Name: ")}, function(data, status){
      if (data == "-1"){
        alert("Group does not exist!")
      } else {
        Group = data
        GruText.innerHTML = "Group: " + Group
        list.innerHTML = ""
      }
  });
}

var Create = function(){
  $.post("/ChatRoom/",{"Send" : "False", "JC": "C", "Group": prompt("Group Name: ")}, function(data, status){
      if (data == "-1"){
        alert("Group already exists!")
      } else {
        Group = data
        GruText.innerHTML = "Group: " + Group
        list.innerHTML = ""
      }
  });
}
