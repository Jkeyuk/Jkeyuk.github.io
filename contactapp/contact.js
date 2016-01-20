//*******class constructors and objects***********************************
//Contact Class
var Contact = function(firstName, lastName, phone, address, email, bDay, notes) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.phone = phone || "";
    this.address = address || "";
    this.email = email || "";
    this.bDay = bDay || "";
    this.notes = notes || "";
  }
  //Contact List Object
var contactList = {
    contacts: [],
    //display contacts in table
    displayList: function() {
      var contacts = contactList.contacts;
      contactListTable.innerHTML = '';
      for (var i = 0; i < contacts.length; i++) {
        contactListTable.innerHTML += "<tr>" + "<td class='contactCell'>" +
          contacts[i].firstName + " " + contacts[i].lastName + "</td>" +
          "</tr>" + "</table>";
      }
    },
    //add new contact to array
    addContact: function() {
      var firstName = inputFirstName.value;
      var lastName = inputLastName.value;
      var phone = inputPhone.value;
      var address = inputAddress.value;
      var email = inputEmail.value;
      var bDay = inputbDay.value;
      var notes = inputNotes.value;

      var newContact = new Contact(firstName, lastName, phone, address, email, bDay, notes);
      contactList.contacts.push(newContact);
    },
    //remove contact function
    removeContact: function() {
      var index = 0;
      for (var i = 0; i < contactList.contacts.length; i++) {
        if (contactList.contacts[i].firstName == firstNameDisplay.innerHTML) {
          index = i;
        }
      }
      contactList.contacts.splice(index, 1);
    },
    //save contacts to local storage
    saveToLocalStorage: function() {
      var objectAsJson = JSON.stringify(contactList.contacts);
      localStorage.setItem('ContactApp', objectAsJson);
    },
    //load contacts from local storage
    loadFromLocalStorage: function() {
      if (localStorage.getItem('ContactApp')) {
        var noteData = JSON.parse(localStorage.getItem('ContactApp'));
        contactList.contacts = noteData;
      }
    }
  }
  //contact profile object
var contactProfile = {
    displayProfile: function(index) {
      firstNameDisplay.innerHTML = contactList.contacts[index].firstName;
      lastNameDisplay.innerHTML = contactList.contacts[index].lastName;
      phoneDisplay.innerHTML = contactList.contacts[index].phone;
      addressDisplay.innerHTML = contactList.contacts[index].address;
      emailDisplay.innerHTML = contactList.contacts[index].email;
      bDayDisplay.innerHTML = contactList.contacts[index].bDay;
      notesDisplay.innerHTML = contactList.contacts[index].notes;
    }
  }
  //Contact Input Object
var contactInputMenu = {
    clearInputValues: function() {
      inputFirstName.value = '';
      inputLastName.value = '';
      inputPhone.value = '';
      inputAddress.value = '';
      inputEmail.value = '';
      inputbDay.value = '';
      inputNotes.value = '';
    }
  }
  //**************************button functions and event listener********************
function buttonEvents() {
  var contactCell = document.getElementsByClassName('contactCell');
  var menuButton = document.getElementsByClassName('menuButton');
  //add contact button
  addContactButton.onclick = function() {
      contactList.addContact();
      contactList.displayList();
      contactList.saveToLocalStorage();
      contactInputMenu.clearInputValues();
      buttonEvents();
      animations.backToMenu();
    }
    //Contact List items as buttons
  for (var i = 0; i < contactCell.length; i++) {
    function contactCellFunc(index) {
      contactCell[index].onclick = function() {
        animations.openProfile();
        contactProfile.displayProfile(index);
      }
    }
    contactCellFunc(i);
  }
  //slides contact list to reveal input screen
  contactInputBut.onclick = function() {
      animations.openInputMenu();
    }
    //back to menu 
  for (var i = 0; i < menuButton.length; i++) {
    menuButton[i].onclick = function() {
      animations.backToMenu();
    }
  }
  //remove contact button
  removeContactBut.onclick = function() {
    if (window.confirm('ARE YOU SURE YOU WANT TO REMOVE CONTACT?')) {
      contactList.removeContact();
      contactList.displayList();
      contactList.saveToLocalStorage();
      buttonEvents();
      animations.backToMenu();
    }
  }
}
//**************************animations********************
var animations = {
    backToMenu: function() {
      contactListWrap.style.width = '100%'
      contactInputWrap.style.width = '0%'
      contactProfileWrap.style.width = '0%'
    },
    openInputMenu: function() {
      contactListWrap.style.width = '0%'
      contactInputWrap.style.width = '100%'
    },
    openProfile: function() {
      contactListWrap.style.width = '0%'
      contactProfileWrap.style.width = '100%'
    }
  }
  //dev tools
contactList.loadFromLocalStorage();
contactList.displayList();
buttonEvents();
