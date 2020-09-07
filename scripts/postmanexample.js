
var settings = {
    "url": "https://api.openweathermap.org/data/2.5/weather?q=norwalk,ct,usa&appid=cba8b3aa91299eea7b191d7cd713c4d5",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });