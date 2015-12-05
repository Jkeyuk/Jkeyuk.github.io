//event handlers
//NAV button handler
var button = document.getElementsByClassName("button");
button[1].addEventListener('click', buttonColor, false);
button[1].addEventListener('click', sidebarColor, false);
button[0].addEventListener('click', navB, false);
button[2].addEventListener('click', backGround, false);
//opendoors event handler
var doors = document.getElementById("button");
doors.addEventListener('click', myDoor, false);
//END event handlers
//opendoors functions
function myDoor() {
    document.getElementById("open1").style.width = "0px";
    document.getElementById("open2").style.width = "0px";
    document.getElementById("button").style.opacity = "0";
}
//end opendoors functions
//NAV BUTTON FUNCTION
function navB() {
    var hidden = document.getElementsByTagName("li");
    if (hidden[1].style.display == "block") {
        for (var i = 1; i < hidden.length; i++) {
            hidden[i].style.display = "none";
        }
    } else {
        for (var i = 0; i < hidden.length; i++) {
            hidden[i].style.display = "block";
        }
    }
}
//text color section one change
function sidebarColor() {
    var x = document.getElementsByTagName("span");
    if (x[0].style.color == "red") {
        for (var i = 0; i < x.length; i++) {
            x[i].style.color = "white";
        }
    } else {
        for (var i = 0; i < x.length; i++) {
            x[i].style.color = "red";
        }
    }
}
//change button
function buttonColor() {
    var y = document.getElementsByClassName("button");
    if (y[0].style.color == "red") {
        for (var q = 0; q < y.length; q++) {
            y[q].style.color = "white";
        }
    } else {
        for (var q = 0; q < y.length; q++) {
            y[q].style.color = "red";
        }
    }
}
//end color section one change
//BACKGROUND PICTURE CHANGE FUNCTION
var w = 0;

function backGround() {
    var x = document.getElementById("section1");
    var pic1 =
        'url(https://cloud.githubusercontent.com/assets/15953484/11427347/17c2043a-9430-11e5-9d25-de80cee38858.jpg)';
    var pic2 =
        'url(https://cloud.githubusercontent.com/assets/15953484/11606230/d4814672-9ae7-11e5-8cba-0e7504037070.jpg)';
    if (w == 0) {
        x.style.backgroundImage = pic2;
        w = 1;
    } else {
        x.style.backgroundImage = pic1;
        w = 0;
    }
}
