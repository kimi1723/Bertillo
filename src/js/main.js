const nav = document.querySelector('.navbar');
const navIcon = document.querySelector('.navbar-hamburger');
const navLinks = document.querySelectorAll('.navbar__link');
const logos = document.querySelectorAll('.logo');

const image = document.querySelector('.offer-products-box-images__img');
const imageCarouselBtns = document.querySelectorAll('.offer-products-box-images__btn');
let imageNumber = 0;

const listItems = document.querySelectorAll('.offer-products-box__list-item-button');
const itemArrowsToRemove = document.querySelectorAll('.fa-chevron-down');

const copyrightSpan = document.querySelector('.footer-box__copyright-year');

const handleNav = () => {
	nav.classList.toggle('navbar-links--active');
	navIcon.classList.toggle('navbar-hamburger--active');
};

const handleNavByLogo = () => {
	if (nav.classList.contains('navbar-links--active') && navIcon.classList.contains('navbar-hamburger--active')) {
		nav.classList.remove('navbar-links--active');
		navIcon.classList.remove('navbar-hamburger--active');
	}
};

const changeImage = e => {
	if (e.target.dataset.direction === 'right' && imageNumber !== 3) {
		imageNumber++;
		image.setAttribute('src', `/dist/img/mobile/img${imageNumber}.jpg`);
	} else if (e.target.dataset.direction === 'left' && imageNumber !== 0) {
		imageNumber--;
		image.setAttribute('src', `/dist/img/mobile/img${imageNumber}.jpg`);
	} else if (e.target.dataset.direction === 'left' && imageNumber === 0) {
		imageNumber = 3;
		image.setAttribute('src', `/dist/img/mobile/img${imageNumber}.jpg`);
	} else if (e.target.dataset.direction === 'right' && imageNumber === 3) {
		imageNumber = 0;
		image.setAttribute('src', `/dist/img/mobile/img${imageNumber}.jpg`);
	}
};

const handleImage = itemNumber => {
	image.setAttribute('src', `/dist/img/mobile/img${itemNumber}.jpg`);
};

const turnDownItemArrow = () => {
	itemArrowsToRemove.forEach(itemArrow => {
		itemArrow.classList.remove('fa-chevron-up');
		itemArrow.classList.add('fa-chevron-down');
	});
};

const turnUpItemArrow = itemArrow => {
	itemArrow.classList.remove('fa-chevron-down');
	itemArrow.classList.add('fa-chevron-up');
};

const removeItemDescriptions = () => {
	const itemDescriptions = document.querySelectorAll('.offer-products-box__list-item-description');

	itemDescriptions.forEach(desc => desc.classList.remove('offer-products-box__list-item-description--active'));
};

const addItemDescription = (e, itemNumber, itemDescription) => {
	if (itemDescription.classList.contains('offer-products-box__list-item-description--active')) {
	} else {
		itemDescription.classList.add('offer-products-box__list-item-description--active');
	}
};

const handleItem = e => {
	const itemNumber = e.target.dataset.item;
	const itemDescription = document.querySelector(`[data-description="${itemNumber}"]`);
	const itemArrow = document.querySelector(`i[data-item="${itemNumber}"`);

	if (
		itemDescription.classList.contains('offer-products-box__list-item-description--active') &&
		itemArrow.classList.contains('fa-chevron-up') &&
		e.target.dataset.item != 3
	) {
		removeItemDescriptions();
		turnDownItemArrow();
		handleImage('0');
	} else if (
		itemDescription.classList.contains('offer-products-box__list-item-description--active') &&
		itemArrow.classList.contains('fa-chevron-up') &&
		e.target.dataset.item == 3
	) {
		removeItemDescriptions();
		turnDownItemArrow();
		handleImage('0');

		imageCarouselBtns.forEach(btn => {
			btn.classList.add('offer-products-box-images__btn--hidden');
		});
	} else if (e.target.dataset.item == 3) {
		removeItemDescriptions();
		addItemDescription(e, itemNumber, itemDescription);
		turnDownItemArrow();
		turnUpItemArrow(itemArrow);
		handleImage(itemNumber);

		imageCarouselBtns.forEach(btn => {
			btn.classList.remove('offer-products-box-images__btn--hidden');
		});
	} else {
		removeItemDescriptions();
		addItemDescription(e, itemNumber, itemDescription);
		turnDownItemArrow();
		turnUpItemArrow(itemArrow);
		handleImage(itemNumber);

		imageCarouselBtns.forEach(btn => {
			btn.classList.add('offer-products-box-images__btn--hidden');
		});
	}
};

const handleCopyrightYear = () => {
	const actualYear = new Date().getFullYear();
	copyrightSpan.textContent = actualYear;
};

navIcon.addEventListener('click', handleNav);
navLinks.forEach(link => link.addEventListener('click', handleNav));
logos.forEach(logo => logo.addEventListener('click', handleNavByLogo));

imageCarouselBtns.forEach(btn => btn.addEventListener('click', changeImage));

listItems.forEach(item => item.addEventListener('click', handleItem));

handleCopyrightYear();
