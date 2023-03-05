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

const submitFormBtn = document.querySelector('.contact-box-form__submit-button');

const sendEmail = (userName, userEmail, userTel, userMsg) => {
	Email.send({
		SecureToken: 'f92e3f5f-f024-4385-8998-1d6a74ce63ad',
		// Host: 'smtp.elasticemail.com',
		// Username: 'patrykskontakt@gmail.com',
		// Password: 'C1FED554B7A98FE1B9DA05D889B9109DBDB2',
		To: 'asdasdq391@gmail.com',
		From: 'patrykskontakt@gmail.com',
		Subject: `Wiadomość kontaktowa od ${userEmail.value}`,
		Body: `<b> Imię: </b> ${userName.value} <br>
			<b> E-mail: </b> ${userEmail.value}		<br>
			<b> Numer tel.: </b> ${userTel.value} <br>
			<b> Treść wiadomości: </b> ${userMsg.value}`,
	}).then(message => alert('wiadomosc wyslana'));
};

const resetForm = (userName, userEmail, userTel, userMsg) => {
	userName.value = '';
	userEmail.value = '';
	userTel.value = '';
	userMsg.value = '';
};

const handleEmail = e => {
	e.preventDefault();

	const userName = document.querySelector('#name');
	const userEmail = document.querySelector('#email');
	const userTel = document.querySelector('#tel');
	const userMsg = document.querySelector('#message');

	const nameValidation = /^[a-z\s]*$/gi;
	const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
	const telValidation =
		/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

	if (
		userName.value.length >= 3 &&
		userName.value.match(nameValidation) &&
		userEmail.value.match(emailValidation) &&
		userTel.value.length >= 9 &&
		userTel.value.match(telValidation) &&
		userMsg.value.length >= 3
	) {
		const messageSentBox = document.querySelector('.contact-box-form-message-sent');
		const confirmButton = document.querySelector('.contact-box-form-message-sent-content__confirm-button');

		messageSentBox.classList.remove('contact-box-form-message-sent--hidden');
		confirmButton.addEventListener('click', e => {
			e.preventDefault();
			messageSentBox.classList.add('contact-box-form-message-sent--hidden');
		});

		// sendEmail(userName, userEmail, userTel, userMsg);
		// resetForm(userName, userEmail, userTel, userMsg);
	} else {
		console.log('err');
	}
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

submitFormBtn.addEventListener('click', handleEmail);

handleCopyrightYear();
