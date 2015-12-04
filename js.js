//event handlers
//NAV button handler
var button = document.getElementsByClassName("button");
button[1].addEventListener('click', buttonColor, false);
button[1].addEventListener('click', sidebarColor, false);
button[0].addEventListener('click', navB, false);
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
            hidden[1].style.display = "none";
        } else {
            hidden[1].style.display = "block";
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
