$(document).ready(function () {

    console.log("Doc Ready")

    //PLACING API KEY AND URL AT THE TOP
    var appKey = "&appid=a3aba25faf7e59594281cfb0824ca1d7";
    var apiURL = "https://api.openweathermap.org/data/2.5/";

    //These may be a problem if left in this file?
    var myWeather;
    var myForecast;

    //DECLARE DOCUMENT ELEMENT VARIABLES RIGHT HERE
    var prevSearchList = $("#prevSearchList");
    var currentCityHeaderEl = $('#cityHeader');
    var currentCityTempEl = $("#cityTemp");
    var currentCityUVEl = $("#cityUV");
    var currentCityWindEl= $("#cityWind"); 
    var currentCityHumidEl= $("#cityHumid") ; 

    //DEFINE SOME FUNCTIONS:


    $("#btnSearchCity").on("click", function () {
        event.preventDefault();
        var cityName = $("#cityInput").val();
        $("#cityInput").val('');

        getWeatherByCity(cityName);

        //Add to a recent items list
        console.log(cityName)

    })

    function getWeatherByCity(cityInput) {

        var cityName;
        var cityTemp;
        var cityHumid;
        var cityUV;
        var cityWindSpeed;
        var cityWindDirection ;
        var cityID ;
        var lat ;
        var lon ; 

        var settings = {
            "url": apiURL + "weather?q=" + cityInput + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                myWeather = data;
                cityName = data.name;
                console.log("getWeatherByCity -> cityName", cityName)
                cityTemp = data.main.temp ;
                console.log("getWeatherByCity -> cityTemp", cityTemp)
                cityHumid = data.main.humidity ; 
                console.log("getWeatherByCity -> cityHumid", cityHumid)
                //cityUV = data.  ;
                cityWindSpeed =data.wind.speed ; 
                console.log("getWeatherByCity -> cityWindSpeed", cityWindSpeed)
                cityWindDirection= data.wind.deg
                console.log("getWeatherByCity -> cityWindDirection", cityWindDirection)
                cityID = data.id;
                console.log("getWeatherByCity -> cityID", cityID);
                lat = data.coord.lat;
                lon = data.coord.lon;


                getForecast(lat,lon);
                

            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {
            console.log("getWeatherByCity -> myWeather", myWeather)
        });
    };

    function getForecast(lat,lon){
        var forecast ; 
        var settings = {
            "url": apiURL + "onecall/" + '&units=imperial' + appKey  ,
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                theForecast = data;             
                console.log("getForecast -> theForecast", theForecast)
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {
            
        });
    };



}); //CLOSING FOR DOC READY