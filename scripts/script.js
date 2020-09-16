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

    //DAILY DECK OF 5 DAY CARDS
    var dailyDeck = $("#dailyDeck");


    //load previus searches.
    function loadWeatherSearches() {
        
        //BUILD PREVIOUS CITIES LIST
        var prevCities = localStorage.getItem("prevCities");
        if (prevCities !== null) {
            var savedSearchCities = JSON.parse(prevCities);
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

                //ADD THE CITY TO THE LIST OF PREV CITIES SEARCHED
                prevCities.push(cityInput);
                prevCities.sort();
                localStorage.setItem("prevCities", JSON.stringify(prevCities));
                //ADD A CITY LISTING TO THE BUTTON ARRAY
                renderPrevSearches();            
                
                //NOW THAT EVERYTHING IS SAVED --> GO GET A PROPER FORECAST
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
                console.log("Get Forecast BY LAT LON")
               
                forecast = data; 
                console.log("getForecast -> theForecast", forecast)
                parseDailyForecast(forecast);
                
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {

        });
    };

    function parseDailyForecast(forecast) {
        //CLEAR THE DECK ELEMENT
        dailyDeck.empty();
        for (i = 0; i < 5; i++) {
            //FOR THE FIRST FIVE DAYS IN THE FORECAST MAKE A CARD
            renderForecastCard(forecast.daily[i]) //RENDER FORECAST
        }    
    };

    function renderForecastCard(x){
        var card = $("<div>").addClass("card");
        var cardHeader = $("<div>").addClass("card-header");
        var cardBody = $("<div>").addClass("card-body")
        var dateString = moment.unix(x.dt).format("MM/DD/YYYY");
        cardHeader.text(dateString);
        cardBody.text();
        card.append(cardHeader);
        card.append(cardBody);
        dailyDeck.append(card);
   
        /*
        var currentTemp = x.temp;
        console.log("renderForecast -> currentTemp", currentTemp)
        var highTemp = x.temp.max + " F"
        console.log("renderForecast -> highTemp", highTemp);
        var lowTemp = x.temp.min + " F";
        var humidity = x.humidity + "%";
        console.log("renderForecast -> humidity", humidity)*/


    };

    //ADD PREVIOUS CITIES TO SEARCH SIDEBAR
var searchedCityDiv = $("#recentCitySelect");

function renderPrevSearches() {
    searchedCityDiv.html("");
    weatherSearches.forEach(element => {
        var btn = $("<button>");
        btn.html(element);
        btn.addClass("btn cityButton btn-block btn-light");
        searchedCityDiv.append(btn);
    });
}
loadWeatherSearches();
//END ADD

    $(".cityButton").on("click", function () {
        var cityName;
        cityName = $(this).html();
        getWeatherByCity(cityName);
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

/*
//DECLARE A CARD
//$("<div>") --card
card header --> date
card body -->
define children ---
card icon
card temp
card humid
---append to card body
--append header + body to card
--- add card to card deck

*/

