// import '@fortawesome/fontawesome-free/js/all.js';
// import '@fortawesome/fontawesome-free/css/all.css';

// //add, remove and cross out items
// export function addAndDeleteItem() {
//     const inputField = document.getElementById('input-field');
//     inputField.addEventListener('keypress', function (e) {
//             if (e.key === 'Enter') {
//                 const newDescription = e.target.value;
//                 let body = document.querySelector('body');
//                 let listOfItems = document.querySelector('.list');
//                 body.appendChild(listOfItems);
//                 let mainHeader = document.querySelector('.main-header');
//                 let description = document.createElement('li');
//                 description.classList.add('description');
//                 description.contentEditable = 'true';
//                 let mainInput = document.querySelector('.main-input');
//                 let inputField = document.getElementById('input-field');
//                 mainInput.appendChild(inputField);
//                 listOfItems.appendChild(mainInput);
//                 const listItem = document.createElement('ul');
//                 listItem.classList.add('item');
//                 listItem.setAttribute('completed', 'false');
//                 //save to local storage
//                 // Get items from local storage
//                 function getItems() {
//                     const items = localStorage.getItem('item');
//                     if (items) {
//                         return JSON.parse(items);
//                     }
//                     return [];
//                 }
//                 getItems();
//                 // Store items in local storage
//                 function storeItems() {
//                     let itemList = getItems('???????');
//                     const stringedItems = JSON.stringify(itemList);
//                     localStorage.setItem('item', stringedItems);
//                 }
//                 storeItems();
//                 // Create new index for each item
//                 function createIndex() {
//                     let itemList = getItems();
//                     if (itemList.length > 0) {
//                         return itemList[itemList.length - 1].index;
//                     }
//                     return 0;
//                 }
//                 listItem.setAttribute('index', createIndex());
//                 listOfItems.appendChild(listItem);
//                 //main div
//                 const checkboxDesc = document.createElement('div');
//                 checkboxDesc.classList.add('checkbox-desc');
//                 //checkbox
//                 let inputLi = document.createElement('li');
//                 checkboxDesc.appendChild(inputLi);
//                 mainInput.appendChild(inputField);
//                 let checkbox = document.createElement('input');
//                 inputLi.appendChild(checkbox);
//                 checkbox.type = 'checkbox';
//                 //three dots
//                 const deleteCross = document.createElement('button');
//                 deleteCross.classList.add('three-dots');
//                 deleteCross.textContent = "X";
//                 //description
//                 description.innerHTML = `${newDescription}`;
//                 let clearAll = document.querySelector('.clear-all');
//                 clearAll.textContent = 'Clear all completed';
                
//                 checkboxDesc.appendChild(inputLi);
//                 description.after(clearAll); //X
//                 mainHeader.after(mainInput);
//                 checkboxDesc.appendChild(description);
//                 listItem.appendChild(checkboxDesc);
//                 listItem.appendChild(deleteCross);
//                 listOfItems.appendChild(listItem);
//                 //delete element
//                 const deleteCrosses = document.querySelectorAll('.three-dots');
//                 deleteCrosses.forEach((deleteCross) => {
//                     deleteCross.addEventListener('click', function (e) {
//                         let deletedItem = e.target.parentNode;
//                         deletedItem.style.display = 'none';
//                     })
//                 });
//                 //cross out text
//                 const descriptions = document.querySelectorAll('.checkbox-desc');
//                 descriptions.forEach((description) => {
//                     description.addEventListener('click', function (e) {
//                         if (e.target.type) { //checkbox
//                             let crossedText = e.target.parentNode.parentNode.childNodes[1];
//                             if (e.target.checked) {
//                                 crossedText.classList.add('strike');
//                             } else if (!e.target.checked) {
//                                 crossedText.classList.remove('strike');
//                             }

//                         }
//                     });

//                 });
//             };
//         }

//         // HTML DOM:
//         // <div class="checkbox-desc">
//         //   <li><input type="checkbox"></li>
//         //   <li class="description">${toDoList[i].description}</li>
//         // </div>
//         //   <li>
//         //     <button class="three-dots">...</button>
//         //   </li>
//     )
// };