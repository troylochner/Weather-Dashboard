$(document).ready(function () {

    console.log("Doc Ready")

    //PLACING API KEY AND URL AT THE TOP
    var appKey = "&appid=a3aba25faf7e59594281cfb0824ca1d7";
    var apiURL = "https://api.openweathermap.org/data/2.5/";

    //These may be a problem if left in this file?
    var myWeather;
    var myForecast;
    var cityID;
    var lat;
    var lon;
    var test;

    //STORAGE
    var prevCities = [];
    var lastCity;

    //DECLARE DOCUMENT ELEMENT VARIABLES RIGHT HERE
    var prevSearchList = $("#prevSearchList");
    var currentCityHeaderEl = $('#cityHeader');
    var currentCityTempEl = $("#cityTemp");
    var currentCityUVEl = $("#cityUV");
    var currentCityWindEl = $("#cityWind");
    var currentCityHumidEl = $("#cityHumid");


    //load previus searches.
    function loadWeatherSearches() {
        
        var myValue = localStorage.getItem("prevCities");
        if (myValue !== null) {
            var savedSearchCities = JSON.parse(myValue);
            if (savedSearchCities !== null) {
                weatherSearches = savedSearchCities;
            }
        }
        //LAST CITY SEARCHED FOR
        var myValue = localStorage.getItem("lastSearch");
        if (myValue !== null) {
            lastCity = myValue;
        }
    }
    loadWeatherSearches();



    //DEFINE SOME FUNCTIONS:
    function getWeatherByCity(cityInput) {
        //clear data
        var settings = {
            "url": apiURL + "weather?q=" + cityInput + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                cityID = data.id;
                //I DO NOT LIKE GETTING THE WEATHER BY THE CITY NAME ; SO IF POSSIBLE - PASS INTO ANOTHER FUNCTION TO GET THE WEATHER BY THE ID INSTEAD. DO THE WORK HERE.
                //PASS THIS TO THE GET WEATHER BY ID

               //SAVE PREVIOUS SEARCH
                lastSearch = cityInput;
                localStorage.setItem("lastWeatherSearch", JSON.stringify(lastSearch));
                prevCities.push(cityInput);
                prevCities.sort();
                localStorage.setItem("prevCities", JSON.stringify(prevCities));
                //ADD A CITY LISTING TO THE BUTTON ARRAY
                
                
                
                getWeatherByID(cityID);
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {
            //console.log("getWeatherByCity -> myWeather", myWeather)
        });
    };

    function getWeatherByID(cityID) {
        var settings = {
            "url": apiURL + "weather?id=" + cityID + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {

                //RENDER CURRENT WEATHER DATA
                //renderCurrentWeather()
                console.log("Get Current")
                lat = data.coord.lat;
                lon = data.coord.lon;
                getForecast(lat, lon);
                //getUVForecast(lat, lon);
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {
            //console.log("getWeatherByCity -> myWeather", myWeather)
        });
    };

    /*REMOVING - EXISTS IN SINGLE CALL API
    function getUVForecast(lat, lon) {
        //var uviforecast ; 
        var settings = {
            "url": apiURL + "uvi/forecast?" + "lat=" + lat + "&lon=" + lon + appKey,
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                uviForecast = data;
                console.log("Get UV")

                //RENDER UV DATA
                //renderUV();
                //console.log("UV FORCAST", uviForecast)
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {

        });
    };
    */

    function getForecast(lat, lon) {
        var forecast;
        var settings = {
            "url": apiURL + "onecall?" + "lat=" + lat + "&lon=" + lon + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                console.log("Get Forecast")
                forecast = data;
                renderForecast(forecast.current);
                parseDailyForecast(forecast);
                console.log("getForecast -> theForecast", forecast)
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {

        });
    };

    function parseDailyForecast(forecast) {
       if (forecast.daily.length > 0){
           for (i=0;i<5;i++){
               //console.log(forecast.daily[i]);
               renderForecast(forecast.daily[i]) //RENDER FORECAST
           }

       }
    };

    function renderForecast(x){
        var currentTemp = x.temp;
        console.log("renderForecast -> currentTemp", currentTemp)
        var highTemp = x.temp.max + " F"
        console.log("renderForecast -> highTemp", highTemp);
        var lowTemp = x.temp.min + " F";
        var humidity = x.humidity + "%";
        console.log("renderForecast -> humidity", humidity)


    };

    $(".cityButton").on("click", function () {
        var cityID;
        cityID = $(this).attr("data-id");
        getWeatherByID(cityID);
    });

    $("#cityInput").on("keypress", function (e) {
        if (e.which == 13) {
            event.preventDefault();
            var cityName = $("#cityInput").val();
            $("#cityInput").val('');

            getWeatherByCity(cityName);

            //Add to a recent items list
            console.log(cityName)
            return false;
        }

    })
}); //CLOSING FOR DOC READY