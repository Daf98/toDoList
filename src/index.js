// Imports
import ListItem from './listitem.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';

// Declare HTML elements
const mainInput = document.getElementById('main-input');
const listOfItems = document.querySelector('.list');
const clearAll = document.querySelector('.clear-all');

// Create array to store items
let itemArray = [] || JSON.parse(localStorage.getItem('items'));
const completeItem = () => {
  const localData = localStorage.getItem('items');
  const parsedData = JSON.parse(localData);
  const eachItem = document.querySelectorAll('.eachItem');
  for (let i = 0; i < eachItem.length; i += 1) {
    if (eachItem[i].classList.contains('strike')) {
      parsedData[i].completed = true;
    } else {
      parsedData[i].completed = false;
    }
    localStorage.setItem('items', JSON.stringify(parsedData));
  }
};

// Edit items
const editItems = (oldItem) => {
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.classList.add('new-input');
  newInput.value = oldItem.textContent;
  oldItem.replaceWith(newInput);
  const local = localStorage.getItem('items');
  const data = JSON.parse(local);
  newInput.addEventListener('keypress', (e) => {
    const newId = newInput.parentElement.id;
    if (e.key === 'Enter') {
      const oldItem = document.createElement('div');
      oldItem.textContent = newInput.value;
      newInput.replaceWith(oldItem);
      const editedContainers = document.querySelectorAll('.new-item');
      for (let i = 0; i < editedContainers.length; i += 1) {
        if ((editedContainers[i].id) === newId) {
          data[i].description = newInput.value;
          localStorage.setItem('items', JSON.stringify(data));
        }
      }
    }
  });
};

// Remove items
const removeItems = (li) => {
  listOfItems.removeChild(li);
  let count = 1;
  const parsedItems = localStorage.getItem('items');
  let localData = JSON.parse(parsedItems);
  // // Filter elements that are true
  // localData = localData.filter((item) => item.completed === false);
  itemArray = JSON.parse(localStorage.getItem('items')); // not working
  itemArray.splice((li.id) - 1, 1);
  localData = itemArray;
  // Update index of elements
  localData.map((item) => {
    item.index = count;
    count += 1;
    return null;
  });
  localStorage.setItem('items', JSON.stringify(localData));
};

// Add new item
const addNewItem = (newDescription) => {
  const newItem = document.createElement('div');
  newItem.classList.add('list');
  newItem.innerHTML += `
<input type="checkbox" class="checkbox">
<span>${newDescription}</span>
<span class="ellipsis">
<i class="fa-solid fa-ellipsis-vertical"></i>
</span>
<span class="trashcan">
<i class="fa-solid fa-trash-can"></i>
</span>
`;
  listOfItems.appendChild(newItem);
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((checkboxInput) => {
    checkboxInput.addEventListener('click', () => {
      checkboxInput.nextElementSibling.classList.toggle('strike');
      checkboxInput.parentNode.classList.toggle('clicked-on');
      const ellipsisIcon = checkboxInput.parentNode.childNodes[5];
      ellipsisIcon.classList.toggle('inactive-ellipsis');
      const trashIcon = checkboxInput.parentNode.childNodes[7].childNodes[1];
      trashIcon.classList.toggle('active-trash');
      completeItem();
    });
  });
  // Create and send new item to local storage
  const newListItem = new ListItem(newDescription, false, checkbox.length);
  itemArray.push(newListItem);
  const stringedItems = JSON.stringify(itemArray);
  localStorage.setItem('items', stringedItems);
  // Edit items
  const editItem = document.querySelectorAll('.ellipsis');
  editItem.forEach((item) => {
    item.addEventListener('click', () => {
      item.parentNode.classList.add('clicked-on');
      editItems(item.previousElementSibling);
    });
  });
  // Remove items
  const removeItem = document.querySelectorAll('.trashcan');
  removeItem.forEach((item) => {
    item.addEventListener('click', () => {
      removeItems(item.parentNode);
    });
  });
};
// Add event listener to input field
mainInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && mainInput.value) {
    addNewItem(mainInput.value);
    mainInput.value = null;
  }
});

// Get data from local storage
const getItemsLocal = () => {
  const localItems = localStorage.getItem('items');
  const items = JSON.parse(localItems);
  items.map((item) => {
    itemArray.push(item);
    const newItem = document.createElement('div');
    newItem.classList.add('new-item');
    const newId = item.index;
    newItem.setAttribute('id', newId);
    newItem.innerHTML = `
  <input type="checkbox" class="checkbox" id="${item.index}">
  <span class="eachItem" id="span${item.index}">${item.description}</span>
  <span id="ellipsis${item.index}" class="ellipsis">
  <i class="fa-solid fa-ellipsis-vertical"></i>
  </span>
  <span class="trashcan">
  <i id="trash${item.index}" class="fa-solid fa-trash-can"></i>
  </span>
  `;
    listOfItems.appendChild(newItem);
    const editItem = document.querySelectorAll('.ellipsis');
    editItem.forEach((item) => {
      item.addEventListener('click', () => {
        item.parentNode.classList.add('clicked-on');
        editItems(item.previousElementSibling, newItem);
      });
    });
    return null;
  });

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((checkboxInput) => {
    checkboxInput.addEventListener('click', () => {
      checkboxInput.nextElementSibling.classList.toggle('strike');
      checkboxInput.parentNode.classList.toggle('clicked-on');
      const ellipsisIcon = checkboxInput.parentNode.childNodes[5];
      ellipsisIcon.classList.toggle('inactive-ellipsis');
      const trashIcon = checkboxInput.parentNode.childNodes[7].childNodes[1];
      trashIcon.classList.toggle('active-trash');
      completeItem();
    });
  });
  // Remove items
  const removeItem = document.querySelectorAll('.trashcan');
  removeItem.forEach((item) => {
    item.addEventListener('click', () => {
      removeItems(item.children[0].parentNode.parentNode);
    });
  });
  clearAll.addEventListener('click', () => {
    const localItems = localStorage.getItem('items');
    const parsedData = JSON.parse(localItems);
    const checkDelete = parsedData.filter((item) => item.completed === false);
    for (let i = 0; i < checkDelete.length; i += 1) {
      checkDelete[i].index = i + 1;
    }
    localStorage.setItem('items', JSON.stringify(checkDelete));
    window.location.reload();
  });
  localStorage.setItem('items', JSON.stringify(itemArray));
};
window.addEventListener('load', getItemsLocal);
