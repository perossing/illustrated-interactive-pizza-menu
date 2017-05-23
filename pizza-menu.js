/*
// functions referenced in HTML onclick captureEvents:
showCharges()
resetMenu()
confirmOrder()
*/

const pricing = {
    personal: 6,
    medium: 10,
    large: 14,
    xLarge: 20,
    topping: 1,
    premium: 3
};


const menuSections = document.querySelectorAll('form > section');


let getCheckedItems = () => {
    for (let i = 0; i < menuSections.length; i++) {

        // insert this into HTML...
        console.log(menuSections[i].id);

        let menuOptions = menuSections[i].querySelectorAll('input');

        for (let j = 0; j < menuOptions.length; j++) {
            if (menuOptions[j].checked) {

                //insert these into HTML....
                console.log('     ' + menuOptions[j].value);
            }
        }
    }
};