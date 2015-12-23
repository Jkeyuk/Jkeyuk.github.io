var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var newListButton = document.getElementById("newListButton");
var deleteAllSaves = document.getElementById("deleteAllSaves");
var input1 = document.getElementById("input1");
var title = document.getElementById("title");
var output1 = document.getElementById("output1");
var savedList = document.getElementById("savedList");

button1.addEventListener('click', addToList, false);
button2.addEventListener('click', deleteList, false);
button3.addEventListener('click', removeLast, false);
newListButton.addEventListener('click', newList, false);
input1.addEventListener('keydown', inputEnter, false);
deleteAllSaves.addEventListener('click', deleteSaves, false);
var obj = {};

//**************LIST CLASS CONSTRUCTOR****************************
var list = function(titleInput, listtContent) {
		this.title = titleInput;
		this.listContent = listtContent;
		//**************display object list****************************
		this.displayList = function() {
				var listLength = this.listContent.length;
				window.output1.innerHTML = "";
				window.title.innerHTML = this.title;
				for (var i = 0; i < listLength; i++) {
					window.output1.innerHTML += '<li>' + this.listContent[i] + '</li>';
				}
			}
			//******************PUSH INPUT VALUE TO LIST CONTENT************************
		this.addToListContent = function() {
				var value = window.input1.value;
				if (value == "" || value == " ") {
					window.alert("YOU DID NOT INPUT ANYTHING");
				} else {
					this.listContent.push(value);
				}
			}
			//*********************POP LAST ITEM FROM LIST CONTENT*********************
		this.removeLastItem = function() {
			this.listContent.pop();
		}
	}
	//**************MAKES NEW LIST****************************
function newList() {
	var x = window.prompt('NAME OF LIST?');
	var y = [];
	var z = obj.title;
	if (x == "" || x == " " || x == null) {
		window.alert("YOU DID NOT INPUT ANYTHING");
	} else if (x == z || localStorage.getItem(x) != null) {
		window.alert("THAT LIST ALREADY EXSITS");
	} else {
		obj = new list(x, y);
		obj.displayList();
		saveFile();
		displaySaves();
	}
}
//***********LIST EDITING*******************************
function addToList() {
	if (obj.title == undefined) {
		newList();

	} else {
		obj.addToListContent();
		obj.displayList();
		window.input1.value = "";
	}
	saveFile();
	displaySaves();
}

function removeLast() {
	obj.removeLastItem();
	obj.displayList();
	saveFile();
}
//********DELETE stuff**********************************
function deleteList() {
	var x = window.confirm('ARE YOU SURE?');
	if (x) {
		localStorage.removeItem(obj.title);
		obj = {};
		window.output1.innerHTML = "";
		window.title.innerHTML = "";
	} else {
		return;
	}
	displaySaves();
}

function deleteSaves() {
	var x = window.confirm('ARE YOU SURE??');
	if (x) {
		localStorage.clear();
	} else {
		return false;

	}
	displaySaves();
}
//*****SAVING AND LOADING**************
function saveFile() {
	if (obj.title == undefined) {
		return;
	} else {
		var saveDataAsJson = JSON.stringify(window.obj);
		localStorage.setItem(obj.title, saveDataAsJson);
	}
}

function displaySaves() {
	var numberOfSaves = localStorage.length;
	window.savedList.innerHTML = "";
	for (var i = 0; i < numberOfSaves; i++) {
		window.savedList.innerHTML += '<button class="savedListButtons">' + localStorage.key(i) + '</button>';
	}

	addSaveButtonEvent();
}

function loadFile() {
	var x = this.innerHTML;
	var loadDataFromJson = JSON.parse(localStorage.getItem(x));
	var tempObj = loadDataFromJson;
	obj = new list(tempObj.title, tempObj.listContent);
	obj.displayList();
}
//ADD EVENTS TO SAVED BUTTONS
function addSaveButtonEvent() {
	savedListButtons = document.getElementsByClassName("savedListButtons");
	var numberOfButtons = savedListButtons.length;
	for (var i = 0; i < numberOfButtons; i++) {
		savedListButtons[i].addEventListener('click', loadFile, false);
	}

}
//******************************************
function inputEnter() {
	if (event.keyCode == 13) {
		addToList();
	} else {
		return false;
	}
}
displaySaves();
//window.alert(2);
