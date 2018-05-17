// var to hold list object
var listObject;

/**
 * list item class
 */
class listItem {
  constructor(name, price) {
    this.name = name || 'NoName';
    this.price = price || 0;
  }
}

/**
 * list class
 */
class list {
  constructor(listItems) {
    this.listItems = listItems || [];
  }

  // adds a list item with a given name and price
  addListItem(itemName, itemPrice) {
    this.listItems.push(new listItem(itemName, itemPrice));
  }

  // removes a list item at a given index
  removeListItem(index) {
    this.listItems.splice(index, 1);
  }

  // saves the list to local storage
  saveList() {
    localStorage.setItem("listMaker", JSON.stringify(this));
  }

  // returns the total price of the list items
  totalPrice() {
    var total = 0;
    for (var i = 0; i < this.listItems.length; i++) {
      total += parseFloat(this.listItems[i].price);
    }
    return total.toFixed(2);
  }
}

/**
 * builds the html for each given list item and displays
 * them on the page
 * @param {Array} listItems list items to build
 */
function buildList(listItems) {
  var output = document.getElementById('output');
  var total = document.getElementById('total');
  output.innerHTML = '';
  for (var i = 0; i < listItems.length; i++) {
    output.innerHTML += "<div class='outputWrap'>" +
      "<input type='checkbox' class='checkBox'></input>" +
      "<p class='listItem'>" + listItems[i].name + "</p>" +
      "<button class='removeButton' onclick='removeItem(" + i + ")'>X</button>" +
      "<p class='itemPrice'>" + '$' + listItems[i].price + "</p>" +
      "</div>";
  }
  total.innerHTML = '$' + listObject.totalPrice();
}

/**
 * removes a list item at a given index, saves the list and
 * rebuilds the list to display
 * @param {number} index index of the list item to remove
 */
function removeItem(index) {
  if (window.confirm('DELETE ITEM??')) {
    listObject.removeListItem(index);
    listObject.saveList();
    buildList(listObject.listItems);
  } else {
    return;
  }
}

/**
 * Adds a new list item to the list from the input boxes. rebuilds the
 * list to display, and saves the list.
 */
function addListItem() {
  var itemInput = document.getElementById('itemInput');
  var priceInput = document.getElementById('priceInput');
  listObject.addListItem(itemInput.value, priceInput.value);
  itemInput.value = '';
  priceInput.value = '';
  buildList(listObject.listItems);
  listObject.saveList();
}

/**
 * on load: loads the list from local storage or initializes an empty list
 */
window.onload = function () {
  var parsedList = JSON.parse(localStorage.getItem('listMaker'));
  if (parsedList) {
    listObject = new list(parsedList.listItems);
    buildList(listObject.listItems);
  } else {
    listObject = new list();
  }
}