const nav = document.querySelector('.navbar');
const navIcon = document.querySelector('.navbar-hamburger');
const navLinks = document.querySelectorAll('.navbar__link');
const logos = document.querySelectorAll('.logo');

const listItems = document.querySelectorAll('.offer-products-box__list-item-button');
const imageCarouselBtns = document.querySelectorAll('.offer-products-box-images__btn');
const image = document.querySelector('.offer-products-box-images__img');
let imageNumber, displaySrcPath, numberOfImages;

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

const turnItemsArrowDown = () => {
	const itemsArrow = document.querySelectorAll(`i[data-item]`);

	itemsArrow.forEach(itemArrow => {
		itemArrow.classList.remove('fa-chevron-up');
		itemArrow.classList.add('fa-chevron-down');
	});
};

const handleItemVariables = itemNumber => {
	const itemDescriptions = document.querySelectorAll('[data-description]');
	const itemDescription = document.querySelector(`[data-description="${itemNumber}"]`);
	const itemArrow = document.querySelector(`i[data-item="${itemNumber}"`);

	if (itemDescription.classList.contains('offer-products-box__list-item-description--active')) {
		itemDescription.classList.remove('offer-products-box__list-item-description--active');

		image.setAttribute('src', `/dist/img/offer/main-image.webp`);
		image.setAttribute(
			'alt',
			`Opis standardowych rozwiązań obróbek blacharskich, które wykonujemy według potrzeb klienta. Standardowa długość obróbki wynosi 2m.`,
		);

		imageCarouselBtns.forEach(btn => {
			btn.classList.add('offer-products-box-images__btn--hidden');
		});

		turnItemsArrowDown();
	} else {
		itemDescriptions.forEach(itemDescription => {
			itemDescription.classList.remove('offer-products-box__list-item-description--active');
		});

		itemDescription.classList.add('offer-products-box__list-item-description--active');

		turnItemsArrowDown();
		itemArrow.classList.remove('fa-chevron-down');
		itemArrow.classList.add('fa-chevron-up');
	}
};

const handleCarousel = e => {
	const image = document.querySelector('.offer-products-box-images__img');

	if (e.target.dataset.direction === 'right' && imageNumber != numberOfImages) {
		imageNumber++;
		image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
	} else if (e.target.dataset.direction === 'left' && imageNumber !== 1) {
		imageNumber--;
		image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
	} else if (e.target.dataset.direction === 'left' && imageNumber === 1) {
		imageNumber = numberOfImages;
		image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${numberOfImages}.webp`);
	} else if (e.target.dataset.direction === 'right' && imageNumber == numberOfImages) {
		imageNumber = 1;
		image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
	}
};
class CreateOfferDisplay {
	constructor(offerType, itemNumber, displaySrcPath, numberOfImages) {
		(this.offerType = offerType),
			(this.itemNumber = itemNumber),
			(this.displaySrcPath = displaySrcPath),
			(this.numberOfImages = numberOfImages);
	}
}

CreateOfferDisplay.prototype.handleOfferDisplay = function (e) {
	const image = document.querySelector('.offer-products-box-images__img');

	imageNumber = 1;
	image.setAttribute('src', `/dist/img/offer/${this.displaySrcPath}/${imageNumber}.webp`);
	image.setAttribute('alt', `Wybrana obróbka blacharska`);

	if (this.offerType === 'carousel') {
		imageCarouselBtns.forEach(btn => {
			btn.classList.remove('offer-products-box-images__btn--hidden');
		});
	} else {
		imageCarouselBtns.forEach(btn => {
			btn.classList.add('offer-products-box-images__btn--hidden');
		});
	}
	handleItemVariables(this.itemNumber);
};

const handleOfferType = e => {
	displaySrcPath = e.target.dataset.displaySrcPath;
	numberOfImages = e.target.dataset.numberOfImages;

	const offerType = e.target.dataset.offerType;
	const itemNumber = e.target.dataset.item;

	const chosenOffer = new CreateOfferDisplay(offerType, itemNumber, displaySrcPath, numberOfImages);

	chosenOffer.handleOfferDisplay(e);
};

const handleCopyrightYear = () => {
	const actualYear = new Date().getFullYear();
	copyrightSpan.textContent = actualYear;
};

navIcon.addEventListener('click', handleNav);
navLinks.forEach(link => link.addEventListener('click', handleNav));
logos.forEach(logo => logo.addEventListener('click', handleNavByLogo));

imageCarouselBtns.forEach(btn => btn.addEventListener('click', handleCarousel));
listItems.forEach(item => item.addEventListener('click', handleOfferType));

handleCopyrightYear();
