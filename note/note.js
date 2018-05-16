/**
 * Declarations
 */
var menu = document.getElementById('menu');
var titleBox = document.getElementById('titleBox');
var noteBox = document.getElementById('noteBox');
//Array to hold note objects
var savedNotes = [];
//var to hold current note being viewed
var currentNote;

/**
 * Note class
 */
class note {
    constructor(name, content) {
        this.name = name || 'Note Name here';
        this.content = content;
    }
}

/**
 * Display contents of a give note on the note pane
 * @param {object} note - note object to display
 */
function displayNote(note) {
    titleBox.value = '';
    noteBox.value = '';
    titleBox.value = note.name;
    noteBox.value = note.content;
}

/**
 * Initializes a new note ,displays on note pane, and opens note pane
 */
function newNote() {
    currentNote = new note('', '');
    savedNotes[savedNotes.length] = currentNote;
    displayNote(currentNote);
    menu.style.width = '0%';
}

/**
 * Load notes from local storage into savedNotes array
 */
function loadNotes() {
    if (localStorage.getItem('notes')) {
        savedNotes = JSON.parse(localStorage.getItem('notes'));
    }
}

/**
 * Build menu from savedNotes array
 */
function buildMenu() {
    menu.innerHTML = '';
    for (var i = 0; i < savedNotes.length; i++) {
        menu.innerHTML += '<button class="menuItem" onclick="loadObject(this)">' +
            savedNotes[i].name +
            '</button>';
    }
    menu.innerHTML += '<button class="menuItem" onclick="newNote()">+New Note</button>';
}

/**
 * Loads notes into savedNotes array and builds the menu from the savedNotes array
 */
function displaySavesToMenu() {
    loadNotes();
    buildMenu();
    menu.style.width = '100%';
}

/**
 * loads the note object from the name of the element calling this function
 * @param {HTMLElement} obj - the html element that calls this function
 */
function loadObject(obj) {
    for (var i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].name === obj.innerHTML) {
            currentNote = savedNotes[i];
        }
    }
    displayNote(currentNote);
    menu.style.width = '0%';
}

/**
 * saves the current note and savedNotes array to local storage
 */
function autoSave() {
    var temp = new note(titleBox.value, noteBox.value);
    savedNotes[savedNotes.indexOf(currentNote)] = temp;
    currentNote = temp;
    localStorage.setItem('notes', JSON.stringify(savedNotes));
}

/**
 * Removes the current note from the savedNotes array and saves
 */
function removeNote() {
    var x = window.confirm('ARE YOU SURE YOU WANT TO DELETE');
    if (x) {
        savedNotes.splice(savedNotes.indexOf(currentNote), 1);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        displaySavesToMenu();
    } else {
        return;
    }
}

/**
 * when document ready, load saves to menu
 */
$(document).ready(function () {
    displaySavesToMenu();
});
