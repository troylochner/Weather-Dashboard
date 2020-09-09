

//CUSTOM FUNCTIONS
function convertToF(tempK) {
    var y = ((tempK - 273.15) * 1.8) + 32;
    return y.toFixed(2)
}

//FROM W3 - GET LOCATION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        return true
    } else {
        return false
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
}

function getMyWeather() {

    if (getLocation()) {

        getWeatherForecast(lon, lat);
    }
}


//Add onclick for the #GetCity Button. 
//When getting a city ; get the lat-long