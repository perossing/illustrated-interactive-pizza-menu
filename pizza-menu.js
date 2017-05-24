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
    'addl topping': 1,
    'cheese-stuffed': 3,
    'extra cheese': 3,
    'no selections': 0
};

let thePrice = 0;

// gets a NodeList  -- can't use map on this without converting to array with slice...
const menuSections = document.querySelectorAll('form > section');

const orderTable = document.querySelector('#orderSummary');
let cartVisible = false;

// let menuArr = [];
let orderArr = [];
let meatToppings = 0;
let veggieToppings = 0;

const displayCheckedItems = () => {
    if (!cartVisible) {
        for (let i = 0; i < menuSections.length; i++) {
            createCategoryRows(i);
            const menuOptions = menuSections[i].querySelectorAll('input');

            for (let j = 0; j < menuOptions.length; j++) {
                let itemsOrdered = '';
                if (menuOptions[j].checked) {
                    itemsOrdered = menuOptions[j].value;

                    if (menuSections[i].id === "meats") {
                        meatToppings++;
                    }
                    if (menuSections[i].id === "veggies") {
                        veggieToppings++;
                    }

                    createItemRows(menuOptions, itemsOrdered, i);
                    // } else if (menuSections[i].id === "meats") {
                } else if ((menuSections[i].id === "meats" || menuSections[i].id === "veggies") && j < 1) {
                    itemsOrdered = 'no selections';
                    createItemRows(menuOptions, itemsOrdered, i);
                }
            }

        }


        getItemPrices();
    }

    cartVisible = true;
};

const createCategoryRows = (i) => {
    const rowCategory = orderTable.insertRow();
    rowCategory.setAttribute('class', 'orderCategory');
    const cellCategory = rowCategory.insertCell(0);
    cellCategory.setAttribute('class', 'itemColumn');
    const menuHeading = menuSections[i].id;
    cellCategory.innerHTML = menuHeading;
    orderArr[i] = [];
};

const createItemRows = (menuOptions, itemsOrdered, i) => {
    const rowItem = orderTable.insertRow();
    const cellItem = rowItem.insertCell(0);
    const cellPrice = rowItem.insertCell(1);
    cellItem.setAttribute('class', 'itemColumn');
    cellPrice.setAttribute('class', 'priceColumn itemPrice moneyFormat');
    cellItem.innerHTML = itemsOrdered;
    orderArr[i].push(itemsOrdered);
};



// priceCheck (needs better name) holds key to how many items have been selected in each category.

//need to get setting/ inserting of price values in the right place in the loop

// nest loops in other order?  track index of orderArr & priceArr without two loops?

const getItemPrices = () => {
    priceArr = document.querySelectorAll('.itemPrice');
    for (let i = 0; i < orderArr.length; i++) {
        console.log(i);
        let priceCheck = orderArr[i];
        console.log('priceCheck.length = ' + priceCheck.length);
        console.log(priceCheck);

        for (let n = 0; n < priceArr.length; n++) {
            if (pricing[priceCheck] !== undefined) {
                console.log(pricing[priceCheck]);
                thePrice = pricing[priceCheck];
            }
            // else if (n === 1 && meatToppings > 1) {
            //     // priceCheck = 'addl topping';
            //     thePrice = 1;
            // }
            console.log('around again');
            priceArr[n].innerHTML = '$ ' + thePrice + '.00';
        }

    }

}

const resetMenu = () => {
    orderTable.innerHTML = '';
    cartVisible = false;
    // uncheck all inputs
};