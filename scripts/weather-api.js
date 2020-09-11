//ICON REF : https://openweathermap.org/weather-conditions#How-to-get-icon-URL
//WEATHER API GLOBALS
var appKey = "&appid=a3aba25faf7e59594281cfb0824ca1d7"
var apiURL = "https://api.openweathermap.org/data/2.5/weather?"

//These may be a problem if left in this file?
var myWeather;
var myForecast;


//WEATHER API FUNCTIONS
//GET BY CITY
function getWeatherByCity(cityInput) {

    var settings = {
        "url": apiURL + "q=" + cityInput + appKey,
        "method": "GET",
        "timeout": 0,
        success: function (data) {
            myWeather = data;
            console.log("getWeatherByCity -> myWeather", myWeather)
             
        },
        error: function (ex) {
            alert(ex.data);
        }
    };
    $.ajax(settings).done(function (response) {

    });

}

//GET BY ZIP
function getWeatherByZip(zipcode) {
    var settings = {
        "url": apiURL + "zip=" + zipcode + appKey,
        "method": "GET",
        "timeout": 0,
        //Placed this into to code to get the variabout out of async response. 
        success: function (data) {
            myWeather = data;
            console.log("getWeatherByZip -> myWeather", myWeather)
             
        },
        error: function (ex) {
            alert(ex.data);
        }
    };
    $.ajax(settings).done(function (response) {    
    });

}

//GET FORCASE W/ ONECALL API
function getWeatherForecast(lon, lat) {
    var lon = "lon=" + lon;
    var lat = "&lat=" + lat;
    var exclude = "&exclude=current,minutely,hourly";
    apiURL = "https://api.openweathermap.org/data/2.5/onecall?";

    var settings = {

        "url": apiURL + lon + lat + exclude + appKey,
        "method": "GET",
        "timeout": 0,
        success: function (data) {
            myForecast = data;
            console.log("getWeatherForecast -> myForecast", myForecast)
        },
        error: function (ex) {
            alert(ex.data);
        }
    };
    $.ajax(settings).done(function (response) {
    })
};


//GET LAT LONG FROM MY WEATHER
function getForecast(myWeather) {
 var lat = myWeather.coord.lat;
 var lon = myWeather.coord.lon;;
 var myForecast = getWeatherForecast(lon,lat);;
 console.log("getForecast -> myForecast", myForecast);
 return myForecast;
}


//Parse result