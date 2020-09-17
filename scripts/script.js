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
    var cityInput;

    //STORAGE
    var weatherSearchHistory = [];
    var savedSearchCities =[];
    var lastCity ;

    //DECLARE DOCUMENT ELEMENT VARIABLES RIGHT HERE
    var prevSearchList = $("#prevSearchList");
    var currentCityTempEl = $("#cityTemp");
    var currentCityUVEl = $("#cityUV");
    var currentCityWindEl = $("#cityWind");
    var currentCityHumidEl = $("#cityHumid");

    //CURRENT CONDITIONS
    var currentCityDiv = $("#currentCity")
    var currentConditionsDiv = $("#currentConditions")

    //DAILY DECK OF 5 DAY CARDS
    var dailyDeck = $("#dailyDeck");

    //LIST OF RECENTLY SEARCHED CITIES DIV
    var recentSearchDiv = $("#recentSearchDiv");

    //FUNCTION TO GRAB PREVIOUS SEARCHES FROM LOCAL STORAGE
    function init(){
        console.log("Run initialization")
        loadWeatherSearches();
        renderSearchHistory();
    };

    init();

    //ADD PREVIOUS CITIES TO SEARCH SIDEBAR
    function loadWeatherSearches() {
        console.log("loadWeatherSearches -> loadWeatherSearches")
            
            //GET PREVIOUS SEARCHES FROM LOCAL STORAGE
            weatherSearchHistory = localStorage.getItem("weatherSearchHistory");
    
            //IF NOTHING IS HERE - SET THIS TO NEW YORK AS A STARTING POINT
            if (weatherSearchHistory !== null) {
                var savedSearchCities = JSON.parse(weatherSearchHistory)
            } else {
                var savedSearchCities = [];
                savedSearchCities.push('New York','Chicago','Los Angeles');
                
                //PUT THIS INTO LOCAL STORAGE
                localStorage.setItem("weatherSearchHistory", JSON.stringify(savedSearchCities));
            };
            renderSearchHistory();
      
        };
    
        //RENDER THE SEARCH HISTORY INTO THE SIDE NAVE BAR
        function renderSearchHistory() {
            //CLEAR OUR DIV
            var recentSearchDiv = $("#recentSearchDiv");
            recentSearchDiv.empty();  
            //GET THE SEARCH HISTORY FROM COLD STORAGE
            console.log("renderSearchHistory -> weatherSearchHistory", weatherSearchHistory)
            // FOR EACH ITEM IN THE ARRAY MAKE A DAMN BUTTON
            x = localStorage.getItem("weatherSearchHistory") ;
            x = JSON.parse(x);
            console.log("renderSearchHistory -> x", x)
            for (i = 0; i < x.length; i++) {
                var btn = $("<button>");
                btn.html(x[i]);
                console.log("Added button :" + x[i]);
               btn.addClass("btn cityButton btn-block btn-light");
                //APPEND THE BUTTON TO THE DIV
                recentSearchDiv.append(btn);
            }
        };

    //GET OUR LOCAL STORAGE AND RENDER THE BUTTONS
    //START BY GIVING THE WEATHER IN NY
    //getWeatherByCity('New York');

    //ADD SUCCESSFULLY FOUND CITIES TO THE WEATHER SEARCH HISTORY OBJECT
    function addToHistory(cityInput){
        savedSearchCities.push(cityInput);
        localStorage.setItem("weatherSearchHistory", JSON.stringify(weatherSearches));
        console.log("Add " + cityInput);
        console.log("Existing " + weatherSearchHistory);
        renderSearchHistory();
        return;
    }

    //GET THE WEATHER BY THE CITY NAME -> RETURN THE ID FROM THIS INPUT - USE TO GET PRIMARY PARTS OF THE FORECAST
    function getWeatherByCity(cityInput) {
        //clear data
        var settings = {
            "url": apiURL + "weather?q=" + cityInput + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                cityID = data.id;

            //APPEND CITY NAME INTO SEARCH
            var currentCityHeaderEl = $('<H3>');
            currentCityHeaderEl.text(cityInput); 
            currentCityDiv.empty();
            currentCityDiv.append(currentCityHeaderEl);         
            //ADD THE SEARCHED FOR CITY TO OUR HISTORY
            //addToHistory(cityInput);
            //RENDER PREVIOUS BUTTONS
            getWeatherByID(cityID);
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {  
        });
    };

    //GET THE WEATHER BY THE CITY ID
    function getWeatherByID(cityID) {
        var settings = {
            "url": apiURL + "weather?id=" + cityID + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                lat = data.coord.lat;
                lon = data.coord.lon;
                getForecast(lat, lon);
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {
        });
    };

    //GET FORCARST USING LAT / LON
    function getForecast(lat, lon) {
        var forecast;
        var settings = {
            "url": apiURL + "onecall?" + "lat=" + lat + "&lon=" + lon + appKey + '&units=imperial',
            "method": "GET",
            "timeout": 0,
            success: function (data) {
                console.log("Getting the forecast")      
                forecast = data; 
                console.log("Forecast Data: " + forecast );
                renderCurrentConditions(forecast);
                parseDailyForecast(forecast);            
            },
            error: function (ex) {
                alert(ex.data);
            }
        };
        $.ajax(settings).done(function (response) {
        });
    };

    //RENDER THE CURRENT WEATHER CONDITIONS
    function renderCurrentConditions(forecast){
        currentConditionsDiv.empty();
        var cityHeader = $("<H2>");
        var currentTemp = $("<p>");
        var currentHumid = $("<p>");
        var currentWind = $("<p>");
        var currentUV = $("<p>");

        var uvRating = forecast.current.uvi;
        var uvColorScale = uvColor(uvRating);
        currentUV.text("UV Index: " + forecast.current.uvi);
        currentUV.css("background-color",uvColorScale);

        currentTemp.text("Temperature: " + forecast.current.temp + ' F');
        currentHumid.text("Humidity: " + forecast.current.humidity + '%');
        currentWind.text("Wind Speed: " + forecast.current.wind_speed + ' MPH');

        //ADD SECTION FOR EXTENDED FORECAST
        var extForecast = $("<H3>")
        extForecast.text("Extended Forecast")
        
        currentConditionsDiv.append(cityHeader,currentTemp,currentHumid,currentWind,currentUV,extForecast) 
    };

    //PARSE THE DAILY FORCASTS
    function parseDailyForecast(forecast) {
        //CLEAR THE DECK ELEMENT
        dailyDeck.empty();
        for (i = 0; i < 5; i++) { //FOR THE FIRST FIVE DAYS IN THE FORECAST MAKE A CARD
            renderForecastCard(forecast.daily[i]) //RENDER FORECAST
        }    
    };

    //FUNCTION TO DETERMIN UV COLOR LABELS
    function uvColor(uvRating) {
        if (uvRating > 7) {
            uvColorScale = '#ee5253'
        } else if (uvRating < 3) {
            uvColorScale = '#10ac84'
        } else {
            uvColorScale = '#feca57'
        }
        console.log(uvColorScale);
        return uvColorScale
    };

    //RENDER EXTENDED FORECAST CARDS
    function renderForecastCard(x){
        var card = $("<div>").addClass("card bg-dark text-white");
        var cardHeader = $("<div>").addClass("card-header");
        var dateString = moment.unix(x.dt).format("MM/DD/YYYY");
        cardHeader.text(dateString);
        var cardBody = $("<div>").addClass("card-body bg-secondary text-light")
        var iconSource = "http://openweathermap.org/img/wn/" + x.weather[0].icon + "@2x.png"
        var icon = $("<img>").css("float","right").width("64px").height("64px").addClass("img-fluid").attr("src",iconSource);
        var temp = $("<p>").text("Temp: " + x.temp.max + " F");
        var humidity = $("<p>").text("Humiditiy: " + x.humidity + "%");
        card.append(cardHeader);
        cardBody.append(icon,temp,humidity);
        card.append(cardBody);
        dailyDeck.append(card);
    };

    //ADD A CLICK TO SEARCH BY CITY NAME
    $(".cityButton").on("click", function () {
        var cityName;
        cityName = $(this).html();
        getWeatherByCity(cityName);
    });

    //ONLY SELECT INPUT ON ENTER
    $("#cityInput").on("keypress", function (e) {
        if (e.which == 13) {
            event.preventDefault();
            var cityName = $("#cityInput").val();
            $("#cityInput").val('');

            getWeatherByCity(cityName);
            //Add to a recent items list
            //console.log(cityName)
            //return false;
        }
    })

}); //CLOSING FOR DOC READY