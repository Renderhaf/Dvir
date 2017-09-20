var coinasks = ["btc","eth","ltc","xrp"]

var getHTTP = function(url,type){
  $.post("/Crypto/",{"url":url},function back(data){
    document.getElementById(type).innerHTML = "Price: " + data["ask"]

    var pre = parseInt(( ( (data["ask"] - data["open"]) / data["open"]) * 100 ) * 100) / 100
    document.getElementById(type + "p").innerHTML = "% Change: " + pre
    if (pre > 0){
      document.getElementById(type + "p").style = "color:green"
    } else {
      document.getElementById(type + "p").style = "color:red"
    }
  });
}

var getData = function(){


  for (i=0;i<coinasks.length;i++){
    getHTTP("https://www.bitstamp.net/api/v2/ticker/" + coinasks[i] + "usd/",coinasks[i])
  }

}

getData()
