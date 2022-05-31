import './style.css';

// create array of objects
const toDoList = [{
  description: 'one',
  completed: false,
  index: 0,
},
{
  description: 'two',
  completed: false,
  index: 1,
}, {
  description: 'three',
  completed: false,
  index: 2,
}, {
  description: 'four',
  completed: false,
  index: 3,
},
];
// declare HTML elements
const body = document.querySelector('body');
// main ul 'listOfItems' class=list
const listOfItems = document.createElement('ul');
listOfItems.classList.add('list');
body.appendChild(listOfItems);
// header and input
listOfItems.innerHTML = `
<li class="main-header">Today's To Do<button type="submit">X</button></li>

<li class="main-input"><input type="text" placeholder="Add to your list...">
<button>O</button></li>
`;

// create dynamic HTML
for (let i = 0; i < toDoList.length; i += 1) {
  // smaller ul 'listItem' class=item
  const listItem = document.createElement('ul');
  listItem.classList.add('item');
  listOfItems.appendChild(listItem);
  listItem.innerHTML = `
  <div class="checkbox-desc">  <li><input type="checkbox"></li>
    <li class="description">${toDoList[i].description}</li></div>
    <li><button>...</button></li>
  `;
}
// clear all-completed button
const clearAll = document.createElement('li');
clearAll.classList.add('clear-all');
clearAll.textContent = 'Clear all completed';
listOfItems.appendChild(clearAll);