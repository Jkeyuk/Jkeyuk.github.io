var button1 = document.getElementById("button1");
button1.addEventListener('click', checkUnit, false);

function checkUnit() {
  var unitCheck1 = document.getElementById("unitCheck1");
  var unitCheck2 = document.getElementById("unitCheck2");

  if (unitCheck1.checked === false && unitCheck2.checked === false) {
    document.getElementById("output2").innerHTML = "select a unit conversion";
  } else if (unitCheck1.checked === true && unitCheck2.checked === true) {
    document.getElementById("output2").innerHTML = "Only select one unit conversion";
  } else if (unitCheck1.checked === true && unitCheck2.checked === false) {
    celciusToOther();
  } else {
    farenToOther();
  }
}

function celciusToOther() {

  var box = document.getElementById("input2");
  var x = box.value;
  var y = (x * (9 / 5)) + 32;
  var check = isNaN(x);
  if (check === true) {
    document.getElementById("output2").innerHTML = "Only input numbers";
  } else {
    document.getElementById("output2").innerHTML = y;
  }

}

function farenToOther() {

  var box = document.getElementById("input2");
  var x = box.value;
  var y = (x - 32) / (9 / 5);
  var check = isNaN(x);
  if (check === true) {
    document.getElementById("output2").innerHTML = "Only input numbers";
  } else {
    document.getElementById("output2").innerHTML = y;
  }

}
