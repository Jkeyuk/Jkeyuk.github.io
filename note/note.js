var menu = document.getElementById('menu');
var titleBox = document.getElementById('titleBox');
var noteBox = document.getElementById('noteBox');
var notesMenuButton = document.getElementById('notesMenuButton');
var deleteNote = document.getElementById('deleteNote');
//NOTE OBJECT constructor**********************************
var note = function(name, content) {
        this.name = name;
        this.content = content;
        //display note data
        this.displayData = function() {
                titleBox.value = '';
                noteBox.value = '';
                titleBox.value = this.name;
                noteBox.value = this.content;
            }
            //store note data 
        this.storeData = function() {
            localStorage.removeItem(this.name);
            this.name = titleBox.value;
            this.content = noteBox.value;
            var objectAsJson = JSON.stringify(this);
            localStorage.setItem(this.name, objectAsJson);
        }
    }
    //********INITIALIZE*******************

function newNote() {
        noteObject = new note('', '');
        noteObject.displayData();
        menu.style.width = '0%';
    }
    //************Display Saves in Menu*******************
notesMenuButton.addEventListener('click', displaySavesToMenu, false);

function displaySavesToMenu() {
        var x = localStorage.length;
        var y = '<button class="menuItem">+New Note</button>';
        menu.innerHTML = '';
        for (var i = 0; i < x; i++) {
            menu.innerHTML += '<button class="menuItem">' + localStorage.key(i) +
                '</button>';
        }
        menu.innerHTML += y;
        //add events to menu buttons
        function events() {
            menuItem = document.getElementsByClassName("menuItem");
            var newbuttonspot = (menuItem.length - 1);
            var x = localStorage.length;
            menuItem[newbuttonspot].addEventListener('click', newNote,
                false);
            for (var i = 0; i < x; i++) {
                menuItem[i].addEventListener('click', loadObject, false);
            }
        }
        events();
        menu.style.width = '100%';
    }
    //load object***********************************

function loadObject() {
        var x = this.innerHTML;
        var tempObj = JSON.parse(localStorage.getItem(x));
        noteObject = new note(tempObj.name, tempObj.content);
        noteObject.displayData();
        menu.style.width = '0%';
    }
    //AUTO SAVE feature*************************not perfect
titleBox.addEventListener('input', stopOverWrite, false);
noteBox.addEventListener('input', autoSave, false);

function stopOverWrite() {
    var x = titleBox.value;
    if (localStorage.getItem(x) != null) {
        titleBox.value += ' ';
        autoSave();
    } else {
        autoSave();
    }
}

function autoSave() {
        noteObject.storeData();
    }
    //DELETE NOTE******************************************
deleteNote.addEventListener('click', removeNote, false);

function removeNote() {
        var x = window.confirm('ARE YOU SURE YOU WANT TO DELETE');
        if (x) {
            localStorage.removeItem(noteObject.name);
            displaySavesToMenu();
        } else {
            return;
        }
    }
    /////dev tools

function test() {
    window.alert(localStorage.length);
    window.alert(localStorage.key(0));
    window.alert(localStorage.getItem(localStorage.key(0)));
}
displaySavesToMenu();
//loadObject();
//test();
//localStorage.clear();
