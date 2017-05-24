const pricing = {
    'personal': 6,
    'medium': 10,
    'large': 14,
    'extra large': 16,
    'addl topping': 1,
    'cheese-stuffed': 3,
    'extra cheese': 3,
    'no selections': 0
};

const menuSections = document.querySelectorAll('form > section');
const orderTable = document.querySelector('#orderSummary');
const viewOrderButton = document.querySelector('#viewOrder');
const submitOrderButton = document.querySelector('#submitOrder');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.closeBtn');
let orderArr = [];
let cartVisible = false;

const displayCheckedItems = () => {
    viewOrderButton.disabled = true;
    submitOrderButton.disabled = false;
    if (!cartVisible) {
        for (let i = 0; i < menuSections.length; i++) {
            createCategoryRows(i);
            const menuOptions = menuSections[i].querySelectorAll('input');
            for (let j = 0; j < menuOptions.length; j++) {
                let customerSelections = '';
                if (menuOptions[j].checked) {
                    customerSelections = menuOptions[j].value;
                    createItemRows(menuOptions, customerSelections, i);
                } else if ((menuSections[i].id === "meats" || menuSections[i].id === "veggies") && j < 1) {
                    customerSelections = 'no selections';
                    createItemRows(menuOptions, customerSelections, i);
                }
            }
        }
        getitemPriceCells();
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

const createItemRows = (menuOptions, customerSelections, i) => {
    const rowItem = orderTable.insertRow();
    const cellItem = rowItem.insertCell(0);
    const cellPrice = rowItem.insertCell(1);
    cellItem.setAttribute('class', 'itemColumn');
    cellPrice.setAttribute('class', 'priceColumn itemPriceCell moneyFormat');
    // itemColumn and priceColumn classes are used to set column widths in CSS
    // itemPriceCell is used in JS to select table cells to display values
    cellItem.innerHTML = customerSelections;
    orderArr[i].push(customerSelections);
};

const getitemPriceCells = () => {
    let itemPrice = 0;
    const orderTotalCell = document.querySelector('.orderTotal');
    const priceArr = document.querySelectorAll('.itemPriceCell');
    let priceCellNumber = 0;
    let total = 0;
    for (let i = 0; i < orderArr.length; i++) {
        let priceCheck = orderArr[i];
        for (let j = 0; j < priceCheck.length; j++) {
            if (menuSections[i].id === 'meats' || menuSections[i].id === 'veggies') {
                if (j < 1) {
                    itemPrice = itemPrice = pricing['no selections'];
                } else
                    itemPrice = itemPrice = pricing['addl topping'];
            } else if (pricing[priceCheck] !== undefined) {
                itemPrice = pricing[priceCheck];
            } else {
                itemPrice = 0;
            }
            priceArr[priceCellNumber].innerHTML = '$ ' + itemPrice + '.00';
            priceCellNumber++;
            total += itemPrice;
        }
    }
    orderTotalCell.innerHTML = '$ ' + total + '.00';
};

const resetMenu = () => {
    viewOrderButton.disabled = false;
    orderTable.innerHTML = '';
    document.querySelector('form').reset();
    cartVisible = false;
    orderArr = [];
};

const confirmOrder = () => {
    resetMenu();
    modal.style.display = 'block';
    hideModal();
};

const hideModal = () => {
    closeModal.onclick = () => {
        modal.style.display = 'none';
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}