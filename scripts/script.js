//init the page
//load anything stored in the local storage.
//when document is ready - the user can do things. 

$(document).ready(function(){
    //SAVE DATA
    $("#btnSearchCity").on("click", function () {
        event.preventDefault()
        var cityName = $("#cityInput").val();
        
        console.log(cityName)
        
        getWeatherByCity(cityName); 
        //console.log(myResult);
        var row = $("<div>").css("width", "100%").text('Weather for ' + cityName.toUpperCase() + myWeather);
        //row.JSONParse(myResult);
        $('#maincontent').append(row);


    })
   
    });
    


/*
function getDate() {
    var rightNow = moment().format('LLL')
    return rightNow;
}


//INITIALIZE THE CALENDAR
function initCal() {
    theDate = getDate();
    $("#currentDay").empty();
    $('#calendar').empty();
    $("#currentDay").append(theDate);

    //FOR EACH HOUR IN THE DAY - MAKE A ROW
    //ADJUSTED TIME - DOING 7 TO 7
    for (i = 7; i < 20; i++) {
        var displayTime = moment().hour(i).minute(0).second(0) //THIS CAN ACT AS A GOOD UUID-TYPE INDEX - THIS IS OUR EPOCH DATE
        var nextTime = moment().hour(i + 1).minute(0).second(0)

        //MAKE TABLE ROW ELEMENT
        var row = $("<div>").addClass("row").attr("data-id",i).css("width", "100%");

        //MAKE THE TABLE DATA ELEMENT - DISPLAY TIME OF DAY
        var blockTime = $("<div>").attr("data-id",i).addClass("col-md-2 hour").text(moment(displayTime).format("LT"));

        //MAKE TABLE DATA - DISPLAY WHAT IS HAPPENING AT THAT TIME
        var blockContent = $("<input>").addClass("col-md-8 description");
        blockContent.attr("id", i, "placeholder", "Enter an event here...")

        //CONDITIONAL IF THE TIME IS IN THE PAST / PRESENT / FUTURE
        if (moment().isBetween(displayTime, nextTime) === true) {
            blockContent.addClass("present")
        } else if (moment().isBefore(displayTime)) {
            blockContent.addClass("future")
        } else {
            blockContent.addClass("past")
        }

        //SEE IF WE HAVE AN ITEM SAVED FOR THIS TIME
        var foundEvent = findEvent(i);
        
        if (foundEvent !== null){
           var title = foundEvent.Title
           blockContent.val(title);
        } 
        //MAKE BUTTON FOR THE ROW
        var saveButton = $("<button>").addClass("col-md-2 saveBtn").attr("data-id",i).text("Save");
        //PUT THE ROW TOGETHER AND APPEND TO THE CALENDAR ELEMENT
        row.append(blockTime).append(blockContent).append(saveButton);
        $('#calendar').append(row);
    };
}

function findEvent(id) {
    x = JSON.parse(localStorage.getItem("storedEvents["+ id + "]"));
    //console.log(x);
    return x;
 }


$(document).ready(function(){
    //SAVE DATA
    $(".saveBtn").on("click", function () {
        //eventTitle = $(this).siblings(".description").val().trim();
        //eventID = $(this).siblings(".description").attr("id");
        //newEvent = { 'eventID' : eventID, 'Title' : eventTitle };
        //newEvent = JSON.stringify(newEvent);
        //localStorage.setItem("storedEvents[" +eventID+']', newEvent );
    })
    //HOVER FUNCTION
    $(".saveBtn").hover(function(){
       // $(this).addClass("saveBtnHover");
        //}, function(){
       // $(this).removeClass("saveBtnHover");
      });
      
      
    $("#clearAll").on("click", function () {
        //localStorage.clear();
        //initCal();
    })
    });
    
*/

