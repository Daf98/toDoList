//Imports
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js'
import './style.css';

//Declare HTML elements
//section
const mainSection = document.getElementById('main-section');
//textInput
const mainInput = document.getElementById('main-input');
//todosMainContainer
const listOfItems = document.querySelector('.list');
//clearAllbtn
const ClearAll = document.querySelector('.clear-all');

//Make class for list Items
class ListItem {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

}
//Create array to store items
const itemArray = [];
//Add new item
const addNewItem = (newDescription) => {
const newItem = document.createElement('div');
newItem.classList.add('newItem');
newItem.innerHTML += `
<input type="checkbox" class="checkbox">
<span>${newDescription}</span>
<i class="fa-solid fa-ellipsis-vertical"></i>
<i class="fa-solid fa-trash-can"></i>
`
listOfItems.appendChild(newItem);
// make checkbox work
const checkbox = document.querySelectorAll('.checkbox');
checkbox.forEach(checkboxInput => {
checkboxInput.addEventListener('click', () => {
  checkboxInput.parentNode.classList.toggle('strike');
  const ellipsisIcon = checkboxInput.parentNode.childNodes[5];
  ellipsisIcon.classList.toggle('inactive-ellipsis');
  const trashIcon = checkboxInput.parentNode.childNodes[8];
  trashIcon.classList.toggle('active-trash');
});
//Create and send new item to local storage
const newListItem = new ListItem(newDescription, false, '0');
itemArray.push(newListItem);
console.log(itemArray);
const stringedItems = JSON.stringify(itemArray);
localStorage.setItem('items', stringedItems);
});

}

//Add event listener to input field
mainInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && mainInput.value) {
    e.preventDefault();
    addNewItem(mainInput.value);
    mainInput.value = '';
  }
});