//DECLARE SOME GLOBALS
var appKey = "cba8b3aa91299eea7b191d7cd713c4d5"
var apiURL = "https://api.openweathermap.org/data/2.5/weather?"

function getWeatherByCity(cityName, stateabbr, countryCode) {

    var settings = {
        "url": apiURL + "q=" +cityName +',' +stateabbr +',' +countryCode + '&appid=' + appKey ,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function getWeatherByZip(zipcode){
    var settings = {
        "url": apiURL + "zip=" + zipcode + '&appid=' + appKey ,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}