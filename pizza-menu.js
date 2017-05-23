

/*
// functions referenced in HTML onclick captureEvents:
showCharges()
resetMenu()
confirmOrder()
*/

// possible way to referemce pricing...
const pricing = {
    personal: 6,
    medium: 10,
    large: 14,
    xLarge: 20,
    topping: 1,
    premium: 3
};


// gets a NodeList  -- can't use map on this without converting to array with slice...
const menuSections = document.querySelectorAll('form > section');

const orderTable = document.querySelector('#orderSummary');
let cartVisible = false;

const displayCheckedItems = () => {
    if (!cartVisible) {
        for (let i = 0; i < menuSections.length; i++) {
            createCategoryRows(i);
            let menuOptions = menuSections[i].querySelectorAll('input');

            for (let j = 0; j < menuOptions.length; j++) {
                let itemsOrdered = '';
                if (menuOptions[j].checked) {
                    itemsOrdered = menuOptions[j].value;
                    createItemRows(menuOptions, itemsOrdered);
                }
                else if ((menuSections[i].id === "meat" || menuSections[i].id === "veggies") && j === 0) {
                    itemsOrdered = 'no selections';
                    createItemRows(menuOptions, itemsOrdered);
                }
            }
        }
    }
    cartVisible = true;
};


const resetMenu = () => {
    orderTable.innerHTML = '';
    cartVisible = false;
};

const createCategoryRows = (i) => {
    let rowCategory = orderTable.insertRow();
    rowCategory.setAttribute('class', 'orderCategory');
    let cellCategory = rowCategory.insertCell(0);
    cellCategory.setAttribute('class', 'itemColumn');
    let menuHeading = menuSections[i].id;
    cellCategory.innerHTML = menuHeading;
};

const createItemRows = (menuOptions, itemsOrdered) => {
    let rowItem = orderTable.insertRow();
    let cellItem = rowItem.insertCell(0);
    let cellPrice = rowItem.insertCell(1);
    cellItem.setAttribute('class', 'itemColumn');
    cellPrice.setAttribute('class', 'priceColumn');
    cellItem.innerHTML = itemsOrdered;
};