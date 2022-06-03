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
      checkboxInput.nextElementSibling.classList.toggle('strike');
      checkboxInput.parentNode.classList.toggle('clicked-on');
      const ellipsisIcon = checkboxInput.parentNode.childNodes[5];
      ellipsisIcon.classList.toggle('inactive-ellipsis');
      const trashIcon = checkboxInput.parentNode.childNodes[8];
      trashIcon.classList.toggle('active-trash');
      completeItem();
    });
  });
  //Create and send new item to local storage
  const newListItem = new ListItem(newDescription, false, checkbox.length - 1);
  itemArray.push(newListItem);
  const stringedItems = JSON.stringify(itemArray);
  localStorage.setItem('items', stringedItems);
  //Edit items
  const editItem = document.querySelectorAll('.fa-ellipsis-vertical');
  editItem.forEach((item) => { //editIcons, loop works half the time
    item.addEventListener("click", () => {
      console.log("it works");
      item.parentNode.classList.add('clicked-on'); //works half the time
      editItems(item.previousElementSibling, newItem); //works half the time
    });
  })
  //Remove items
  const removeItem = document.querySelectorAll('.active-trash');
  removeItem.forEach((item) => {
    item.addEventListener('click', () => {
      removeItems(item.parentNode);
    });
  })
}
//Add event listener to input field
mainInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && mainInput.value) {
    addNewItem(mainInput.value);
    mainInput.value = null;
  }
});

//Edit items
const editItems = (oldItem, editedContainer) => { //editTodo
  const newInput = document.createElement('input'); //editInput
  newInput.type = 'text';
  newInput.classList.add('new-input');
  newInput.value = oldItem.textContent;
  oldItem.replaceWith(newInput);
  // editedContainer.replaceChild(newInput, oldItem); //The node to be replaced is not a child of this node.
  newInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      console.log("enter?");
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
      newInput.parentNode.classList.remove('clicked-on');
      newInput.replaceWith(oldItem);
      oldItem.textContent = newInput.value;
    }
  })
}
//Remove items
const removeItems = (li) => {
  listOfItems.removeChild(li);
  let count = 0;
  const parsedItems = localStorage.getItem('items');
  const localData = JSON.parse(parsedItems);
  const arrayData = Array.from(localData);
  //Filter true elements
  arrayData.filter((item) => {
     item.completed === false;
  });
  //Update index of elements
  arrayData.map((item) => {
    item.index = count++;
  });
  localStorage.setItem('items', JSON.stringify(arrayData));
}

//get data from local storage
const getItemsLocal = () => {
  let localItems = localStorage.getItem('items');
  let items = JSON.parse(localItems);
  items.map((item) => {
    itemArray.push(item);
    const newItem = document.createElement('div');
    newItem.classList.add('new-item');
    newItem.innerHTML = `
  <input type="checkbox" class="checkbox">
  <span>${item.description}</span>
  <i class="fa-solid fa-ellipsis-vertical"></i>
  <i class="fa-solid fa-trash-can"></i>`
  listOfItems.appendChild(newItem);
  const editItem = document.querySelectorAll('.fa-ellipsis-vertical');
  editItem.forEach((item) => { //editIcons, loop works half the time
    item.addEventListener("click", () => {
      console.log("it works");
      item.parentNode.classList.add('clicked-on'); //works half the time
      editItems(item.previousElementSibling, newItem); //works half the time
    });
  })
});
  
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach(checkboxInput => {
    checkboxInput.addEventListener('click', () => {
      checkboxInput.nextElementSibling.classList.toggle('strike');
      checkboxInput.parentNode.classList.toggle('clicked-on');
      const ellipsisIcon = checkboxInput.parentNode.childNodes[5];
      ellipsisIcon.classList.toggle('inactive-ellipsis');
      const trashIcon = checkboxInput.parentNode.childNodes[8];
      trashIcon.classList.toggle('active-trash');
      completeItem();
    });
  });
  //Remove items
  const removeItem = document.querySelectorAll('.active-trash');
  removeItem.forEach((item) => {
    item.addEventListener('click', () => {
      removeItems(item.parentNode);
    });
  });
  localStorage.setItem('items', itemArray);
}
window.addEventListener("load", getItemsLocal);

const completeItem = () => {
  const localData = localStorage.getItem('items');
  const parsedData = JSON.parse(localData);
  const eachItem = document.querySelectorAll('span');
  for (let i = 0; i > eachItem.length; i += 1) {
    if (eachItem[i].classList.contains('strike')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
localStorage.getItem('items', JSON.stringify(parsedData));
}