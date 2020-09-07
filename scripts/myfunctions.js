//CUSTOM FUNCTIONS
function convertToF(tempK){
    var y = ((tempK-273.15)*1.8)+32;
    return y.toFixed(2)
}

//FROM W3 - GET LOCATION
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
  }

  function getMyWeather(){

    getLocation();
    getWeatherForecast(lon, lat) ;


  }