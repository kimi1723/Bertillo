const listItems = document.querySelectorAll('.offer-products-box__list-item-button');
const imageCarouselBtns = document.querySelectorAll('.offer-products-box-images__btn');
const image = document.querySelector('.offer-products-box-images__img');
let imageNumber, displaySrcPath;

class CreateOfferDisplay {
	constructor(offerType, itemNumber, displaySrcPath, numberOfImages) {
		(this.offerType = offerType),
			(this.itemNumber = itemNumber),
			(this.displaySrcPath = displaySrcPath),
			(this.numberOfImages = numberOfImages);
	}
}

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

	if (e.target.dataset.direction === 'right') {
		imageNumber++;
		image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
	} else if (e.target.dataset.direction === 'left') {
		imageNumber--;
		image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
	}
};

imageCarouselBtns.forEach(btn => btn.addEventListener('click', handleCarousel));

CreateOfferDisplay.prototype.handleOfferDisplay = function (e) {
	const image = document.querySelector('.offer-products-box-images__img');

	imageNumber = 1;
	image.setAttribute('src', `/dist/img/offer/${this.displaySrcPath}/${imageNumber}.webp`);

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
	const offerType = e.target.dataset.offerType;
	const itemNumber = e.target.dataset.item;
	const numberOfImages = e.target.dataset.images;
	const chosenOffer = new CreateOfferDisplay(offerType, itemNumber, displaySrcPath, numberOfImages);

	chosenOffer.handleOfferDisplay(e);
};

listItems.forEach(item => item.addEventListener('click', handleOfferType));
