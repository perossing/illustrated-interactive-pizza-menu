
const pricing = {
    'personal': 6,
    'medium': 10,
    'large': 14,
    'extra large': 16,
    'addl topping': 1,
    'cheese-stuffed': 3,
    'extra cheese': 3
};

const menuSections = document.querySelectorAll('section');
const orderTable = document.querySelector('.orderSummary');
const viewOrderButton = document.querySelector('.viewOrder');
const submitOrderButton = document.querySelector('.submitBtn');
const cartModal = document.querySelector('.cartModal');
const confirmationModal = document.querySelector('.confModal');
const cancelBtn = document.querySelector('.cancelBtn');
const closeModalBtn = document.querySelector('.closeBtn');

let orderArr = [];

// Need preventDefault on viewOrderButton so browsers retain display settings for cartModal
viewOrderButton.addEventListener('click', function(event){
    event.preventDefault()
});

const displayCheckedItems = () => {
    for (let i = 0; i < menuSections.length; i++) {
        createCategoryRows(i);
        const menuOptions = menuSections[i].querySelectorAll('input');
        let uncheckedItems = 0;
        for (let j = 0; j < menuOptions.length; j++) {
            let customerSelections = '';
            if (menuOptions[j].checked) {
                customerSelections = menuOptions[j].value;
                createItemRows(menuOptions, customerSelections, i);
            } else if (((menuSections[i].id === "meats" || menuSections[i].id === "veggies")) && (!menuOptions[j].checked)) {
                uncheckedItems++;
                if (uncheckedItems === menuOptions.length) {
                    customerSelections = 'no selections';
                    createItemRows(menuOptions, customerSelections, i);
                }
            }
        }
    }
    getitemPriceCells();
    cartModal.style.display = 'block';
};

const createCategoryRows = (i) => {
    const rowCategory = orderTable.insertRow();
    const cellCategory = rowCategory.insertCell(0);
    cellCategory.setAttribute('class', 'itemColumn categoryCell');
    const menuHeading = menuSections[i].id;
    cellCategory.innerHTML = menuHeading;
    orderArr[i] = [];
};

const createItemRows = (menuOptions, customerSelections, i) => {
    const rowItem = orderTable.insertRow();
    const cellItem = rowItem.insertCell(0);
    const cellPrice = rowItem.insertCell(1);
    cellItem.setAttribute('class', 'itemColumn itemCell');
    cellPrice.setAttribute('class', 'priceColumn itemPriceCell moneyFormat');
    // itemColumn and priceColumn classes are used to set column widths in CSS
    // categoryCell and itemCell used for styling in CSS
    // itemPriceCell is used in JS to select table cells to display values
    cellItem.innerHTML = customerSelections;
    orderArr[i].push(customerSelections);
};

const getitemPriceCells = () => {
    let itemPrice = 0;
    const orderTotalCell = document.querySelector('#orderTotal');
    const priceArr = document.querySelectorAll('.itemPriceCell');
    let priceCellNumber = 0;
    let total = 0;
    for (let i = 0; i < orderArr.length; i++) {
        let priceCheck = orderArr[i];
        for (let j = 0; j < priceCheck.length; j++) {
            if (menuSections[i].id === 'meats' || menuSections[i].id === 'veggies') {
                if (j < 1) {
                    itemPrice = 0;
                } else {
                    itemPrice = pricing['addl topping'];
                }
            } else if (pricing[priceCheck] !== undefined) {
                itemPrice = pricing[priceCheck];
            } else {
                itemPrice = 0;
            }
            if (itemPrice !== 0) {
                priceArr[priceCellNumber].innerHTML = '$ ' + itemPrice + '.00';
            } else {
                priceArr[priceCellNumber].innerHTML = '&ndash;';
            }
            priceCellNumber++;
            total += itemPrice;
        }
    }
    orderTotalCell.innerHTML = '$ ' + total + '.00';
};

const resetMenu = () => {
    orderTable.innerHTML = '';
    document.querySelector('form').reset();
    orderArr = [];
};

const confirmOrder = () => {
    resetMenu();
    confirmationModal.style.display = 'block';
    cartModal.style.display = 'none';
    hideConfModal();
};

const hideConfModal = () => {
    closeModalBtn.onclick = () => {
        confirmationModal.style.display = 'none';
    };
    window.onclick = (event) => {
        if (event.target == confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    };
};

const hideCartModal = () => {
    cartModal.style.display = 'none';
    resetMenu();
};