const nav = document.querySelector('.navbar');
const navIcon = document.querySelector('.navbar-hamburger');
const navLinks = document.querySelectorAll('.navbar__link');
const logos = document.querySelectorAll('.logo');

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

const handleImage = itemNumber => {
	const image = document.querySelector('.offer-products-box__img');

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
		itemArrow.classList.contains('fa-chevron-up')
	) {
		removeItemDescriptions();
		turnDownItemArrow();
		handleImage('-basic');
	} else {
		removeItemDescriptions();
		addItemDescription(e, itemNumber, itemDescription);
		turnDownItemArrow();
		turnUpItemArrow(itemArrow);
		handleImage(itemNumber);
	}
};

const handleCopyrightYear = () => {
	const actualYear = new Date().getFullYear();
	copyrightSpan.textContent = actualYear;
};

navIcon.addEventListener('click', handleNav);
navLinks.forEach(link => link.addEventListener('click', handleNav));
logos.forEach(logo => logo.addEventListener('click', handleNavByLogo));

listItems.forEach(item => item.addEventListener('click', handleItem));

handleCopyrightYear();
