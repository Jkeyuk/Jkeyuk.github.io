var yearHeader = document.getElementById('yearHeader');
var day = document.getElementsByClassName('day');
var monthButton = document.getElementsByClassName('month');
var monthHeader = document.getElementById('monthHeader');
var dayHeader = document.getElementById('dayHeader');
var eventList = document.getElementById('eventList');
var eventInput = document.getElementById('eventInput');
var addEventBut = document.getElementById('addEventBut');
var dateInput = document.getElementById('dateInput');
var eventStorage = [];
//***********objects and constructors********************************
//event object constructor
function Event(dateObject, description) {
  this.dateObject = dateObject;
  this.description = description;
}
//day interface div object*********************
var dayInterface = {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'
    ],
    events: [],
    //fill day interface with date and daily events
    dayFill: function(dateObject) {
      var dayNames = dayInterface.dayNames;
      var monthNames = yearInterface.monthNames;
      var dayIndex = dateObject.getDay();
      var monthIndex = dateObject.getMonth();
      var date = dateObject.getDate();
      var eventsArray = dayInterface.events;

      dayHeader.innerHTML = dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + date;
      eventList.innerHTML = "";
      for (var i = 0; i < eventsArray.length; i++) {
        eventList.innerHTML += "<li class='eventListItem'>" + eventsArray[i].description + "</li>";
      }
    },
    //filter eventstorage and push to daily events
    filterEvents: function(day, monthIndex, year) {
      var passed = [];
      for (var i = 0; i < eventStorage.length; i++) {
        var TestDay = eventStorage[i].dateObject.getDate();
        var TestMonth = eventStorage[i].dateObject.getMonth();
        var TestYear = eventStorage[i].dateObject.getFullYear();
        if (TestDay == day && TestMonth == monthIndex && TestYear == year) {
          passed.push(eventStorage[i]);
        }
      }
      dayInterface.events = passed;
    },
    //set add button
    setButtonEvents: function() {
      addEventBut.onclick = function() {
        addEventButtonFunc();
      }
    }
  }
  //month interface div object****************************
var monthInterface = {
    //fill month interface grid with dates
    monthFill: function(dateObject) {
      var year = dateObject.getFullYear();
      var monthIndex = dateObject.getMonth();
      var startOfMonth = new Date(year, monthIndex, 1);
      var endOfMonth = new Date(year, (monthIndex + 1), 0);
      var lengthOfMonth = endOfMonth.getDate();
      var startingDay = startOfMonth.getDay();
      monthHeader.innerHTML = yearInterface.monthNames[monthIndex];
      for (var i = 0; i < day.length; i++) {
        day[i].innerHTML = '';
      }
      for (var i = 0; i < lengthOfMonth; i++) {
        day[i + startingDay].innerHTML = i + 1;
      }
    },
    //set button events for month interface
    setButtonEvents: function() {
      var currentYear = yearHeader.innerHTML;
      var monthIndex = yearInterface.monthNames.indexOf(monthHeader.innerHTML);
      var startingDay = new Date(currentYear, monthIndex, 1).getDay();
      var lengthOfMonth = new Date(currentYear, (monthIndex + 1), 0).getDate();
      for (var i = 0; i < day.length; i++) {
        day[i].onclick = function() {};
      }
      for (var i = 0; i < lengthOfMonth; i++) {
        day[i + startingDay].onclick = function() {
          dayButtonFunc(this);
        }
      }
    }
  }
  //year interface div object**************************************
var yearInterface = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November',
      'December'
    ],
    //set year interface header 
    setCurretYear: function(dateObject) {
      yearHeader.innerHTML = dateObject.getFullYear();
    },
    //set year interface events to buttons
    setButtonEvents: function() {
      for (var i = 0; i < monthButton.length; i++) {
        monthButton[i].onclick = function() {
          monthButtonFunc(this);
        }
      }
    }
  }
  //******************Button Functions*********************************

function monthButtonFunc(button) {
  var currentYear = yearHeader.innerHTML;
  var monthIndex = yearInterface.monthNames.indexOf(button.innerHTML);
  var dateObject = new Date(currentYear, monthIndex, 1);
  monthInterface.monthFill(dateObject);
  monthInterface.setButtonEvents();
}

function dayButtonFunc(button) {
  var currentYear = yearHeader.innerHTML;
  var monthIndex = yearInterface.monthNames.indexOf(monthHeader.innerHTML);
  var dateObject = new Date(currentYear, monthIndex, button.innerHTML);
  dayInterface.filterEvents(button.innerHTML, monthIndex, currentYear);
  dayInterface.dayFill(dateObject);
}

function addEventButtonFunc() {
  var dateString = dateInput.value || Date();
  var eventIput = eventInput.value || 'No Description Entered';
  var dateObject = new Date(dateString + 'EST');
  var x = new Event(dateObject, eventIput);
  var dayIndex = dateObject.getDate();
  var monthIndex = dateObject.getMonth();
  var year = dateObject.getFullYear();
  eventStorage.push(x);
  var jasonfired = JSON.stringify(eventStorage);
  localStorage.setItem("jk1", jasonfired);
  dayInterface.filterEvents(dayIndex, monthIndex, year);
  dayInterface.dayFill(dateObject);
  dateInput.value = '';
  eventInput.value = '';
}
//***************************************************
//onload

function initialize() {
  var today = new Date();
  var dayIndex = today.getDate();
  var monthIndex = today.getMonth();
  var year = today.getFullYear();
  yearInterface.setCurretYear(today);
  yearInterface.setButtonEvents();
  monthInterface.monthFill(today);
  monthInterface.setButtonEvents();
  dayInterface.filterEvents(dayIndex, monthIndex, year);
  dayInterface.dayFill(today);
  dayInterface.setButtonEvents();
}

function loadEvents() {
  var parsedList = JSON.parse(localStorage.getItem('jk1')) || [];  
  for (var i = 0; i < parsedList.length; i++) {
    var dateObject = new Date(Date.parse(parsedList[i].dateObject));
    var description = parsedList[i].description;
    var newEvent = new Event(dateObject, description);
    eventStorage.push(newEvent);
  }
  

}
window.onload = function() {
    loadEvents();
    initialize();   
  }
  //***************************************************
  //localStorage.clear();
  //window.alert(parsedList[0].description);
