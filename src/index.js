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
  newItem.classList.add('new-item');
  newItem.innerHTML = `
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
  });
  //Create and send new item to local storage
  const newListItem = new ListItem(newDescription, false, checkbox.length - 1);
  itemArray.push(newListItem);
  const stringedItems = JSON.stringify(itemArray);
  localStorage.setItem('items', stringedItems);
  //Edit items
  const editItem = document.querySelectorAll('.fa-ellipsis-vertical');
  editItem.forEach((item) => { //editIcons
    item.addEventListener("click", () => {
      item.parentNode.classList.toggle('clicked-on');
      editItems(item.previousElementSibling, newItem); //editTodo
    });
  })

}
//Add event listener to input field
mainInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && mainInput.value) {
    e.preventDefault();
    addNewItem(mainInput.value);
    mainInput.value = '';
  }
});

//Edit items
const editItems = (newItem, editedContainer) => { //editTodo
  const newInput = document.createElement('input'); //editInput
  newInput.type = 'text';
  newInput.classList.add('new-input');
  newInput.value = newItem.textContent;
  editedContainer.replaceChild(newInput, newItem); //The node to be replaced is not a child of this node.
  newInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      const editedContainers = document.querySelectorAll('.new-item');
      const parsedItems = localStorage.getItem('items');
      const localData = JSON.parse(parsedItems);
      //fetch item based on class 'strike'
      for (let i = 0; i < editedContainers.length; i++) {
        if (editedContainers[i].classList.contains('clicked-on')) {
          localData[i].description = newInput.value;
          const stringedData = JSON.stringify(localData);
          localStorage.setItem('items', stringedData);
        }
      }
    }
  })
}