    /*
    //RENDER INDIVIDUAL SECTIONS OF THE WEATHER RESPONSE
    function renderCard(response, headerEl, TempEl, HumEl, WindEl, headerHtml) {
        headerEl.html(headerHtml);
        var imgPath = getImagePath(response);
        headerEl.append('<img id="currentImg" src="' + imgPath + '" height="42" width="42" />')
        TempEl.html("Temperature : " + response.main.temp + " F");
        HumEl.html("Humidity : " + response.main.humidity + " %");
        WindEl.html("Wind Speed : " + response.wind.speed + " mph");
    }

    //CLEAR WEATHER 
        function clearWeatherData() {
            currentWeatherHeaderEl.html("City/Date : Loading...");
            currentWeatherTempEl.html("Temperature : ");
            currentWeatherHumEl.html("Humidity : ");
            currentWeatherWindEl.html("Wind Speed : ");
            currentWeatherUVEl.html("UV : ");
        }
    */


   //LOAD PRIOR
   //if there's a Last Search use it and show the weather for that location, otherwise see if we can find the current location
   if (lastSearch != null) {
       console.log("last search: " + lastSearch);
       //remove the double quotes 
       //var lastSearchNoQuotes = lastSearch.replace(/['"]+/g, '');
       //console.log(lastSearchNoQuotes);
       //getWeather(lastSearchNoQuotes);
   }
   else {
       //if there's no Last Search in the storage, and if we can get the current location then show the weather for the current location.
       navigator.geolocation.getCurrentPosition(function (location) {
           console.log(location);
           console.log(location.coords.latitude);
           console.log(location.coords.longitude);
           //getWeatherByCoords(location.coords.longitude, location.coords.latitude);
           console.log(location.coords.accuracy);
       });
   }
   


   function loadWeatherSearches() {
    var value = localStorage.getItem("weatherSearches");
    if (value !== null) {
        console.log(value);
        var localWS = JSON.parse(value);
        if (localWS !== null) {
            weatherSearches = localWS;
        }
    }
    var value = localStorage.getItem("lastWeatherSearch");
    if (value !== null) {
        console.log(value);
        lastSearch = value;
    }
}
loadWeatherSearches();

lastSearch = txt;
                localStorage.setItem("lastWeatherSearch", JSON.stringify(lastSearch));
                if (!weatherSearchesInclude(txt)) {
                    weatherSearches.push(txt);
                    weatherSearches.sort();
                    localStorage.setItem("weatherSearches", JSON.stringify(weatherSearches));
                    renderButtons();
                }


                // BUILD BUTTON OF PREV
/*
var btnDiv = $("#recentSearches");
    //this function clears the Search buttons area and re load it per updated weatherSearches
    function renderButtons() {
        btnDiv.html("");
        weatherSearches.forEach(element => {
            var btn = $("<button>");
            btn.addClass("btn btn-info mx-3 btn-block");
            btn.html(element);
            btnDiv.append(btn);
            btn.click(function (event) {
                var city = $(this).html();
                console.log("Button Click: " + city);
                getWeather(city);
            });
        });
    }
    renderButtons();
*/


//ADD PREVIOUS CITIES TO SEARCH SIDEBAR
var newCityDiv = $("#recentCitySelect");

    function renderPrevSearches() {
        newCityDiv.html("");
        weatherSearches.forEach(element => {
            var btn = $("<button>");
            btn.html(element);
            btn.addClass("btn btn-info mx-3 btn-block");
            newCityDiv.append(btn);
        });
    }
    renderPrevSearches();