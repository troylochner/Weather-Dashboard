 //PLACING API KEY AND URL AT THE TOP
 var appKey = "&appid=a3aba25faf7e59594281cfb0824ca1d7";
 var apiURL = "https://api.openweathermap.org/data/2.5/";

 //GET OUR HISTORY FROM LOCAL STORAGE
 var locSearchHistory;
 var searchHistory;
 var locLastSearch;

 var cityInput;

 //CURRENT CONDITIONS
 var currentCityDiv = $("#currentCity")
 var currentConditionsDiv = $("#currentConditions")

 //DAILY DECK OF 5 DAY CARDS
 var dailyDeck = $("#dailyDeck");

 //LIST OF RECENTLY SEARCHED CITIES DIV
 var recentSearchDiv = $("#recentSearchDiv");

 //DOC READY
 $(document).ready(function () {
     console.log("Doc Ready")


     //INIT FUNCTION
     function init() {
         console.log("Run initialization")
         loadWeatherSearches();
         renderSearchHistory();
         getWeatherByCity(locLastSearch);
     };

     //ADD PREVIOUS CITIES TO SEARCH SIDEBAR
     function loadWeatherSearches() {
         locSearchHistory = localStorage.getItem("SearchHistory");
         if (localStorage.getItem("SearchHistory") === null || locSearchHistory.length < 1) {
             searchHistory = [];
         } else {
             searchHistory = JSON.parse(locSearchHistory);
         };
         locLastSearch = localStorage.getItem("LastSearch");
         if (localStorage.getItem("LastSearch") ===null) {
             locLastSearch = "London";
         }
     };

     //RUN INIT
     init();

     //SET LAST CITY SEARCHED FOR
     function setLastSearch(cityInput) {
         localStorage.setItem("LastSearch", cityInput);
         locLastSearch = cityInput;
         console.log("locLastSearch : ", locLastSearch)
         setSearchHistory(cityInput);
     }

     //ADD TO FULL SEARCH HISTORY
     function setSearchHistory(cityInput) {
         if (searchHistory === null) {
             searchHistory = [];
             searchHistory.push(cityInput)
         } else {
             if ( checkArray(searchHistory, cityInput) === false ) {
                 searchHistory.push(cityInput)
             }
         }

         //IF THE ITEM IS UNIQUE ADD IT TO OUR LOCAL STORAGE
         locSearchHistory = localStorage.setItem("SearchHistory", JSON.stringify(searchHistory));
         console.log(searchHistory);
         renderSearchHistory();
     }

     //SIMPLE ADD TO HISTORY
     function addToHistory(cityInput) {
         setLastSearch(cityInput);
     }

     //CLEAR HISTORY
     function clearHistory() {
         localStorage.setItem("SearchHistory", "");
         localStorage.setItem("LastSearch","");
         init();
     }

     //CHECK IF ITEM IS IN SEARCH HISTORY ARRAY
     function checkArray(array, value) {
         if (jQuery.inArray(value, array) != -1) {
             console.log("is in array");
             return true;
         } else {
             console.log("is NOT in array");
             return false;
         }
     }
     //RENDER SEARCH HISTORY
     function renderSearchHistory() {
         //DEFINE AND EMPTY THE DIV
         var recentSearchDiv = $("#recentSearchDiv");
         recentSearchDiv.empty();

         console.log("renderSearchHistory -> searchHistory", searchHistory)

         if (searchHistory !== null) {
             for (i = 0; i < searchHistory.length; i++) {
                 var btn = $("<button>");
                 btn.text(searchHistory[i]);
                 btn.addClass("cityButton btn btn-block btn-light");
                 //APPEND THE BUTTON TO THE DIV
                 recentSearchDiv.append(btn);

                 btn.click(function (event) {
                     var cityInput = $(this).text();
                     console.log("renderSearchHistory -> cityInput", cityInput)
                     getWeatherByCity(cityInput);
                 });

             }

             var clearBtn = $("<button>")
             clearBtn.addClass("btn btn-block btn-dark").text("Clear History")
             recentSearchDiv.append(clearBtn)
             clearBtn.click(function (event) {
                 console.log("Clear");
                 clearHistory();
             });
         };
     }

     function getWeatherByCity(cityInput) {
         //var cityID ; 
         var settings = {
             "url": apiURL + "weather?q=" + cityInput + appKey + '&units=imperial',
             "method": "GET",
             "timeout": 0,
             success: function (data) {
                cityID = data.id;
                getWeatherByID(data.id);
                renderCurrentHeader(cityInput);
                addToHistory(cityInput);
            },
            error: function (ex) {
                alert(cityInput + " was not found by this API");
            }
         };
         $.ajax(settings).done(function (response) {
         });
     }

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
         $.ajax(settings).done(function (response) {});
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
                 renderCurrentConditions(forecast);
                 parseDailyForecast(forecast);
             },
             error: function (ex) {
                 alert(ex.data);
             }
         };
         $.ajax(settings).done(function (response) {});
     };

     //RENDER THE CURRENT WEATHER CONDITIONS
     function renderCurrentConditions(forecast) {
         currentConditionsDiv.empty();
         var cityHeader = $("<H2>");
         var currentTemp = $("<p>");
         var currentHumid = $("<p>");
         var currentWind = $("<p>");
         var currentUV = $("<p>");

         var uvRating = forecast.current.uvi;
         var uvColorScale = uvColor(uvRating);
         currentUV.text("UV Index: " + forecast.current.uvi);
         currentUV.css("background-color", uvColorScale);

         currentTemp.text("Temperature: " + forecast.current.temp + ' F');
         currentHumid.text("Humidity: " + forecast.current.humidity + '%');
         currentWind.text("Wind Speed: " + forecast.current.wind_speed + ' MPH');

         //ADD SECTION FOR EXTENDED FORECAST
         var extForecast = $("<H3>")
         extForecast.text("Extended Forecast")

         currentConditionsDiv.append(cityHeader, currentTemp, currentHumid, currentWind, currentUV, extForecast)
     };

     //RENDER THE CURRENT WEATHER FOR THE INPUT CITY
     function renderCurrentHeader(cityInput) {
         var currentCityHeaderEl = $('<H3>');
         currentCityHeaderEl.text(cityInput);
         currentCityDiv.empty();
         currentCityDiv.append(currentCityHeaderEl);
     }

     //PARESE AND RENDER DAILY FORECAST
     function parseDailyForecast(forecast) {
         //CLEAR THE DECK ELEMENT
         dailyDeck.empty();
         for (i = 0; i < 5; i++) { //FOR THE FIRST FIVE DAYS IN THE FORECAST MAKE A CARD
             renderForecastCard(forecast.daily[i]) //RENDER FORECAST
         }
     };

     //DETERMINE UV LABEL COLORS
     function uvColor(uvRating) {
         if (uvRating > 7) {
             uvColorScale = '#ee5253'
         } else if (uvRating < 3) {
             uvColorScale = '#10ac84'
         } else {
             uvColorScale = '#feca57'
         }
         return uvColorScale
     };

     //RENDER EXTENDED FORECAST CARDS
     function renderForecastCard(x) {
         var card = $("<div>").addClass("card bg-dark text-white");
         var cardHeader = $("<div>").addClass("card-header");
         var dateString = moment.unix(x.dt).format("MM/DD/YYYY");
         cardHeader.text(dateString);
         var cardBody = $("<div>").addClass("card-body bg-secondary text-light")
         var iconSource = "http://openweathermap.org/img/wn/" + x.weather[0].icon + "@2x.png"
         var icon = $("<img>").css("float", "right").width("64px").height("64px").addClass("img-fluid").attr("src", iconSource);
         var temp = $("<p>").text("Temp: " + x.temp.max + " F");
         var humidity = $("<p>").text("Humiditiy: " + x.humidity + "%");
         card.append(cardHeader);
         cardBody.append(icon, temp, humidity);
         card.append(cardBody);
         dailyDeck.append(card);
     };

     //USER ACTIONS
     //ADD A CLICK TO SEARCH BY CITY NAME
     $(".cityButton").on("click", function () {
         //event.preventDefault();
         cityInput = $(this).text();
         console.log("setSearchHistory -> cityInput", cityInput)
         getWeatherByCity(cityInput);
         //console.log("cityID", cityID)
     });

     //SEARCH FOR CITY
     $("#cityInput").on("keypress", function (e) {
         if (e.which == 13) {
             event.preventDefault();
             var cityInput = $("#cityInput").val();
             $("#cityInput").val('');
             var cityID;
             cityID = getWeatherByCity(cityInput);
         }
     })

 }); //CLOSING FOR DOC READY