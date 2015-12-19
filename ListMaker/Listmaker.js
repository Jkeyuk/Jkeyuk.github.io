var button1 = document.getElementById("button1");
button1.addEventListener('click', addAndDisplay, false);
var button2 = document.getElementById("button2");
button2.addEventListener('click', deleteList, false);
var button3 = document.getElementById("button3");
button3.addEventListener('click', removeLast, false);
var array = [];
window.onload = loadSession();

function addAndDisplay() {
    var output1 = document.getElementById("output1");
    var input1 = document.getElementById("input1");
    //checks for input***
    if (input1.value === "") {
        window.alert("You did not input anything");
        //push value to array***
    } else {
        var input1Value = input1.value;
        window.array.push(input1Value);
        displayList();
    }
    input1.value = "";
    saveSession();
}

function saveSession() {
    //convert array to JSON and save to session
    var dataAsJson = JSON.stringify(window.array);
    localStorage.savedFile = dataAsJson;
}

function loadSession() {
    window.array = JSON.parse(localStorage.savedFile);
    displayList();
}

function deleteList() {
    var x = window.confirm("ARE YOU SURE YOU WANT TO DELETE?");
    if (x) {
        window.array = [];
        delete localStorage.savedFile;
        output1.innerHTML = "";
    } else {
        return;
    }
}

function displayList() {
    //Display array list**
    output1.innerHTML = "";
    for (i = 0; i < window.array.length; i++) {
        output1.innerHTML += "<li>" + window.array[i] + "</li> ";
    }
}

function removeLast() {
    window.array.pop();
    saveSession();
    displayList();
}
