var yearHeader = document.getElementById('yearHeader');
var day = document.getElementsByClassName('day');
var dateSelectButton = document.getElementById('dateSelectButton');
var monthHeader = document.getElementById('monthHeader');
var dayHeader = document.getElementById('dayHeader');
var eventList = document.getElementById('eventList');
var eventInput = document.getElementById('eventInput');
var dateInput = document.getElementById('dateInput');
var eventInputWrap = document.getElementById('eventInputWrap');
var datePicker = document.getElementById('datePicker');
var listOfMonths = document.getElementById('listOfMonths');
var addEventBut = document.getElementById('addEventBut');
var eventStorage = []; //Local Storage use
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//***********objects and constructors********************************
function Event(dateObject, description) { //event object constructor
  this.dateObject = dateObject;
  this.description = description;
}
//Day Object******************************
var dayInterface = {
    events: [], //daily events go here

    dayFill: function(dateObject) { //sets day header and lists events
      var dayIndex = dateObject.getDay();
      var monthIndex = dateObject.getMonth();
      var date = dateObject.getDate();
      var year = dateObject.getFullYear();
      var eventsArray = dayInterface.events;

      dayHeader.innerHTML = dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + date + ' ' + year;
      if (eventsArray.length > 0) {
        eventList.innerHTML = "";
        for (var i = 0; i < eventsArray.length; i++) {
          eventList.innerHTML += "<li class='eventListItem'>" + eventsArray[i].description + "</li>";
        }
      } else {
        eventList.innerHTML = "No Events Today";
      }
    },

    filterEvents: function(day, monthIndex, year) { //filter eventstorage and push to daily events
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
    }
  }
  //Calender object****************************
var monthInterface = {

  monthFill: function(dateObject) { //fill month interface grid with dates
    var year = dateObject.getFullYear();
    var monthIndex = dateObject.getMonth();
    var startOfMonth = new Date(year, monthIndex, 1);
    var endOfMonth = new Date(year, (monthIndex + 1), 0);
    var lengthOfMonth = endOfMonth.getDate();
    var startingDay = startOfMonth.getDay();

    yearHeader.innerHTML = dateObject.getFullYear();
    monthHeader.innerHTML = monthNames[monthIndex];
    for (var i = 0; i < day.length; i++) {
      day[i].innerHTML = '';
      day[i].style.background = 'white';
      day[i].style.border = '1px solid black';
    }
    for (var i = 0; i < lengthOfMonth; i++) {
      day[i + startingDay].innerHTML = i + 1;
    }
    addColorToDays(monthIndex, year, startingDay); //styling
  }
}

//******************Button Event Listner************************************
function buttonEvents() {
  var currentYear = yearHeader.innerHTML;
  var monthIndex = monthNames.indexOf(monthHeader.innerHTML);
  var startingDay = new Date(currentYear, monthIndex, 1).getDay();
  var lengthOfMonth = new Date(currentYear, (monthIndex + 1), 0).getDate();

  addEventBut.onclick = function() {
    addEventButtonFunc();
    eventInputSliderButtonFunc();
  }
  eventInputSliderButton.onclick = function() {
    eventInputSliderButtonFunc();
  }
  for (var i = 0; i < day.length; i++) {
    day[i].onclick = function() {};
  }
  for (var i = 0; i < lengthOfMonth; i++) {
    day[i + startingDay].onclick = function() {
      dayButtonFunc(this);
      outlineSelectedDay(this);
    }
  }
  dateSelectButton.onclick = function() {
    dateSelectButtonfunc();
    dateHeaderWrapFunc();
  }
  topBarHeader.onclick = function() {
    topBarHeaderFunc();
  }
}
//******************Button Functions*********************************
function dateSelectButtonfunc() {
  var today = new Date();
  var year = pickYear.value || today.getFullYear();
  var monthIndex = monthNames.indexOf(pickMonth.value);
  var dateObject = new Date(year, monthIndex, 1);
  monthInterface.monthFill(dateObject);
  buttonEvents();
}

function dayButtonFunc(button) {
  var currentYear = yearHeader.innerHTML;
  var monthIndex = monthNames.indexOf(monthHeader.innerHTML);
  var dateObject = new Date(currentYear, monthIndex, button.innerHTML);
  dayInterface.filterEvents(button.innerHTML, monthIndex, currentYear);
  dayInterface.dayFill(dateObject);
}

function addEventButtonFunc() {
  var eventIput = eventInput.value || 'No Description Entered';
  var year = eventPickYear.value;
  var monthIndex = monthNames.indexOf(eventPickMonth.value);
  var day = eventPickDay.value;
  var dateObject = new Date(year, monthIndex, day);
  var x = new Event(dateObject, eventIput);
  eventStorage.push(x);
  var jasonfired = JSON.stringify(eventStorage);
  localStorage.setItem("jk1", jasonfired);
  dayInterface.filterEvents(day, monthIndex, year);
  dayInterface.dayFill(dateObject);
  monthInterface.monthFill(dateObject);
  eventInput.value = '';
}

function eventInputSliderButtonFunc() {
  if (eventInputWrap.style.height == '80px') {
    eventInputWrap.style.height = '0px';
  } else {
    eventInputWrap.style.height = '80px';
  }
}

function topBarHeaderFunc() {
  if (datePickerDropDown.style.display == 'block') {
    datePickerDropDown.style.display = 'none';
  } else {
    datePickerDropDown.style.display = 'block'
  }
}
//***************************************************
//onload

function initialize() {
  var today = new Date();
  var dayIndex = today.getDate();
  var monthIndex = today.getMonth();
  var year = today.getFullYear();
  monthInterface.monthFill(today);
  dayInterface.filterEvents(dayIndex, monthIndex, year);
  dayInterface.dayFill(today);
  buttonEvents();
  pickYear.innerHTML = ''; //set up date picker inputs
  eventPickYear.innerHTML = '';
  for (var i = 0; i < 10; i++) {
    pickYear.innerHTML += '<option value="' + (2016 + i) + '">' + (2016 + i) + '</option>';
    eventPickYear.innerHTML += '<option value="' + (2016 + i) + '">' + (2016 + i) + '</option>';
  }
  eventPickDay.innerHTML = '';
  for (var i = 1; i <= 31; i++) {
    eventPickDay.innerHTML += '<option value="' + (i) + '">' + (i) + '</option>';
  }
}

function loadEvents() {
  var parsedList = JSON.parse(localStorage.getItem('jk1')) || []; //load localstorage
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
  //*******************Styling and Animations********************************

function addColorToDays(monthIndex, year, startingDay) {
  var today = new Date();
  var passed = [];
  for (var i = 0; i < eventStorage.length; i++) { //filters events for month and year
    var TestMonth = eventStorage[i].dateObject.getMonth();
    var TestYear = eventStorage[i].dateObject.getFullYear();

    if (TestMonth === monthIndex && TestYear === year) {
      passed.push(eventStorage[i].dateObject.getDate());
    }
  }
  for (var i = 0; i < passed.length; i++) { //colors days with events
    day[(passed[i] + startingDay) - 1].style.background = '#00ffff';
  }
  if (monthIndex === today.getMonth() && year === today.getFullYear()) {
    day[(today.getDate() + startingDay) - 1].style.border = '3px solid black';
  }
}

function outlineSelectedDay(x) {
  for (var i = 0; i < day.length; i++) {
    day[i].style.border = '1px solid black';
  }
  x.style.border = '3px solid black';
}
//window.alert(parsedList[0].description);
