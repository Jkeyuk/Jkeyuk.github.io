var itemInput = document.getElementById('itemInput');
var priceInput = document.getElementById('priceInput');
var addButton = document.getElementById('addButton');

var output = document.getElementById('output');
var total = document.getElementById('total');

//list item class constructer******************************************
function ListItem(name, price) {
  this.name = name || 'NoName';
  this.price = price || 0;

  this.displayListItem = function() {
    output.innerHTML += "<div class='outputWrap'>" +
      "<input type='checkbox' class='checkBox'></input>" +
      "<p class='listItem'>" + this.name + "</p>" +
      "<button class='removeButton'>X</button>" +
      "<p class='itemPrice'>" + '$' + this.price + "</p>" +
      "</div>";
  }
}
//list object********************************
var list = {
    listItems: [],

    addListItem: function() {
      var itemName = itemInput.value;
      var itemPrice = priceInput.value;
      var newListItem = new ListItem(itemName, itemPrice);
      list.listItems.push(newListItem);
      itemInput.value = '';
      priceInput.value = '';
    },
    removeListItem: function(index) {
      if (window.confirm('DELETE ITEM??')) {
        this.listItems.splice(index, 1);
      } else {
        return;
      }
    },
    saveList: function() {
      var jsonfiedList = JSON.stringify(this);
      localStorage.setItem("listMaker", jsonfiedList);
    },
    loadList: function() {
      var parsedList = JSON.parse(localStorage.getItem('listMaker'));

      for (var i = 0; i < parsedList.listItems.length; i++) {
        var newListItem = new ListItem(parsedList.listItems[i].name,
          parsedList.listItems[i].price);
        list.listItems.push(newListItem);
      }

    },
    totalPrice: function() {
      var total = 0;
      for (var i = 0; i < this.listItems.length; i++) {
        total += parseFloat(this.listItems[i].price);
      }
      return total.toFixed(2);
    },
    displayList: function() {
      output.innerHTML = '';
      for (var i = 0; i < this.listItems.length; i++) {
        list.listItems[i].displayListItem();
      }
      total.innerHTML = '$' + list.totalPrice();
    },
    addEventsToButtons: function() {
      removeButton = document.getElementsByClassName('removeButton');
      checkBox = document.getElementsByClassName('checkBox');
      outputWrap = document.getElementsByClassName('outputWrap');
      var length = this.listItems.length;

      for (var i = 0; i < length; i++) {

        function inputIndex(index) {
          removeButton[i].onclick = function() {
            list.removeListItem(index);
            list.displayList();
            list.addEventsToButtons();
            list.saveList();
          }
          checkBox[i].onclick = function() {
            if (checkBox[index].checked) {
              outputWrap[index].style.background = 'cyan';
            } else {
              outputWrap[index].style.background = 'transparent';
            }
          }
        }
        inputIndex(i);
      }
    }
  }
  //add button event***************************
addButton.onclick = function() {
  list.addListItem();
  list.displayList();
  list.addEventsToButtons();
  list.saveList();
}
window.onload = function() {
  list.loadList();
  list.displayList();
  list.addEventsToButtons();
}