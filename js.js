//opendoors functions

function myDoor() {
    document.getElementById("open1").style.width = "0px";
    document.getElementById("open2").style.width = "0px";
    document.getElementById("button").style.opacity = "0";
  }
//end opendoors functions

  function textColor() {
    var x = document.getElementsByTagName("span");
    if (x[0].style.color == "red") {
      for (i = 0; i < x.length; i++) {
        x[i].style.color = "white";
      }
    } else {
      for (i = 0; i < x.length; i++) {
        x[i].style.color = "red";
      }
    }
  }
