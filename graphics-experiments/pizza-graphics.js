
const sizeForm = document.querySelector('#size');
const sizeBtn = sizeForm.querySelectorAll('input[type=radio]');
const pizzaSize = document.querySelectorAll('.pizza-size');
const pizzaBg = document.querySelector('.pizza');
const sizeDimensions = ['300', '340', '375', '400'];

const crustForm = document.querySelector('#crust');
const crustBtn = crustForm.querySelectorAll('input[type=radio]');
const crust = document.querySelector('#pizza-crust');
const crustTypes = ['#e9cd96', '#d6ad5c', '#f7c96e', '#e98463', '#ffad33'];

const sauceForm = document.querySelector('#sauce');
const sauceBtn = sauceForm.querySelectorAll('input[type=radio]');
const sauce = document.querySelector('#pizza-sauce');
const sauceTypes = ['#d13f16', '#f2f2d9', '#4a783a', 'none'];

const cheeseForm = document.querySelector('#cheese');
const cheeseBtn = cheeseForm.querySelectorAll('input[type=radio]');
const cheese = document.querySelectorAll('.cheesePic');

const vegForm = document.querySelector('#veggies');
const vegBoxes = vegForm.querySelectorAll('input[type=checkbox]');
const vegToppings = document.querySelector('.veg-toppings');
const vegPics = vegToppings.querySelectorAll('img');


const meatForm = document.querySelector('#meats');
const meatBoxes = meatForm.querySelectorAll('input[type=checkbox]');
const meatToppings = document.querySelector('.meat-toppings');
const meatPics = meatToppings.querySelectorAll('img');


$(document).ready(function () {


	for (let i = 0; i < sizeBtn.length; i++) {

		sizeBtn[i].onclick = () => {
			$('.pizza-size').css('overflow', 'visible');
			$(pizzaSize[i]).css('overflow', 'hidden');
			$(pizzaBg).css({
				'width': sizeDimensions[i],
				'height': sizeDimensions[i],
				'margin': (400 - sizeDimensions[i]) / 2
			});
		}

	};

	for (let i = 0; i < crustBtn.length; i++) {
		crustBtn[i].onclick = () => {
			$(crust).css({
				'fill': crustTypes[i],
				'stroke-width': 1,
				'stroke': '#e0c285',
			});
			if (i === 4) {
				$(crust).css({
					'stroke-width': 3,
					'stroke': '#d6ad5c',
				});
			};
		}
	};

	for (let i = 0; i < sauceBtn.length; i++) {
		sauceBtn[i].onclick = () => {
			$(sauce).css('fill', sauceTypes[i]);
		}
	};

	for (let i = 0; i < cheeseBtn.length; i++) {
		cheeseBtn[i].onclick = () => {
			if (i === 0) {
				$(cheese).hide();
				$(cheese[i]).show();
			} else if (i === 1) {
				$(cheese).show();
			} else {
				$(cheese).hide();
			}
		}
	};

	for (let i = 0; i < vegBoxes.length; i++) {
		vegBoxes[i].onclick = () => {
			$(vegPics[i]).toggle();
		}
	};


	for (let i = 0; i < meatBoxes.length; i++) {
		meatBoxes[i].onclick = () => {
			$(meatPics[i]).toggle();
		}
	};

});