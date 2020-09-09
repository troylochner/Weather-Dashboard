//ICON REF : https://openweathermap.org/weather-conditions#How-to-get-icon-URL
//WEATHER API GLOBALS
var appKey = "&appid=a3aba25faf7e59594281cfb0824ca1d7"
var apiURL = "https://api.openweathermap.org/data/2.5/weather?"
var myweather;

//WEATHER API FUNCTIONS
//GET BY CITY
function getWeatherByCity(cityInput) {

    var settings = {
        "url": apiURL + "q=" + cityInput + appKey,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        //console.log(response);
        //myweather = response;
        return myweather;
    });

}

//GET BY ZIP
function getWeatherByZip(zipcode) {
    var settings = {
        "url": apiURL + "zip=" + zipcode + appKey,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        myweather = response;
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
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        myweather = response;
        //return response;
    })
};


//Parse result