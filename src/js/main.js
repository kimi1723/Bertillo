const nav = document.querySelector('.navbar');
const navIcon = document.querySelector('.navbar-hamburger');
const navLinks = document.querySelectorAll('.navbar__link');
const logos = document.querySelectorAll('.logo');

const body = document.querySelector('[data-page="main"]');
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

const handleCopyrightYear = () => {
	const actualYear = new Date().getFullYear();
	copyrightSpan.textContent = actualYear;
};

if (body) {
	const aboutusBoxesToAnimate = ['first', 'second', 'third'];

	const listItems = document.querySelectorAll('.offer-products-box > ul > li > button');
	const imageCarouselBtns = document.querySelectorAll('.offer-products-box-images__btn');
	const imageContainers = document.querySelectorAll('.offer-products-box-images');

	let imageNumber = 1,
		displaySrcPath = 'nasady-kominowe',
		numberOfImages = undefined,
		carouselInterval,
		imageBoxCarouselButtons;

	const btnsInLiDescription = document.querySelectorAll('.offer-products-box__list-item-description-list-item-button');

	const submitFormBtn = document.querySelector('.contact-box-form__submit-button');

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('scale-in-center');
			}
		});
	});

	aboutusBoxesToAnimate.forEach(box => {
		const boxToAnimate = document.querySelector(`.scale-in-center--aboutus-${box}`);
		observer.observe(boxToAnimate);
	});

	const turnItemsArrowDown = () => {
		const itemsArrow = document.querySelectorAll(`.offer-products-box__arrow-icon`);

		itemsArrow.forEach(itemArrow => {
			itemArrow.classList.remove('fa-chevron-up');
			itemArrow.classList.add('fa-chevron-down');
		});
	};

	const setCarouselInterval = () => {
		clearCarouselInterval();
		carouselInterval = setInterval(autoOfferCarousel, 2000);
	};

	const clearCarouselInterval = () => {
		clearInterval(carouselInterval);
	};

	const autoOfferCarousel = () => {
		const image = document.querySelector(`img[src="/dist/img/offer/${displaySrcPath}/${imageNumber}.webp"]`);

		if (imageNumber != numberOfImages && numberOfImages != undefined) {
			imageNumber++;
			image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
		} else if (imageNumber == numberOfImages) {
			image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/1.webp`);
			imageNumber = 1;
		}
	};

	const handleCarousel = e => {
		const image = document.querySelector(`img[src="/dist/img/offer/${displaySrcPath}/${imageNumber}.webp"]`);

		clearCarouselInterval();

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
		constructor(itemNumber, itemType, displaySrcPath) {
			(this.itemNumber = itemNumber), (this.itemType = itemType), (this.displaySrcPath = displaySrcPath);
		}
	}

	CreateOfferDisplay.prototype.handleOfferDisplay = function () {
		const images = document.querySelectorAll('.offer-products-box-images__img');

		const itemDescription = document.querySelector(`[data-description="${this.itemNumber}"]`);
		const listItemButton = document.querySelector(
			`[data-item="${this.itemNumber}"][data-item-type="${this.itemType}"]`,
		);

		const otherItemType = this.itemType == '' ? 'desktop-' : '';
		const otherListItemButton = document.querySelector(
			`[data-item="${this.itemNumber}"][data-item-type="${otherItemType}"]`,
		);
		const activeBtnInLiDescription = document.querySelector(
			'.offer-products-box__list-item-description-list-item-description--active',
		);
		imageNumber = 1;

		images.forEach(img => {
			const imgSrcPath = img.dataset.displaySrcPath;

			img.setAttribute('src', `/dist/img/offer/${imgSrcPath}/1.webp`);
		});

		if (
			this.itemType == 'desktop-' &&
			itemDescription.classList.contains(`offer-products-box__list-item-description--active`) === false
		) {
			itemDescription.classList.add('fade-in');
		} else if (itemDescription.classList.contains('fade-in')) {
			itemDescription.classList.remove('fade-in');
		}

		if (
			itemDescription.classList.contains(`offer-products-box__list-item-description--active`) &&
			this.itemType !== 'desktop-'
		) {
			itemDescription.classList.remove(`offer-products-box__${this.itemType}list-item-description--active`);

			listItemButton.classList.remove(`offer-products-box__${this.itemType}list-item-button--active`);
			otherListItemButton.classList.remove(`offer-products-box__${otherItemType}list-item-button--active`);

			turnItemsArrowDown();
		} else {
			const listItem = document.querySelector(`.offer-products-box__list-item[data-item="${this.itemNumber}"]`);
			const activeItemDescription = document.querySelector(`.offer-products-box__list-item-description--active`);

			const activeButton = document.querySelector(`.offer-products-box__${this.itemType}list-item-button--active`);
			const otherActiveButton = document.querySelector(`.offer-products-box__${otherItemType}list-item-button--active`);

			const listItems = document.querySelectorAll('.offer-products-box__list-item');

			listItems.forEach(item => {
				item.classList.add('offer-products-box__list-item--hidden');
			});

			if (activeItemDescription !== null) {
				activeItemDescription.classList.remove(`offer-products-box__list-item-description--active`);
			}

			if (activeButton !== null) {
				activeButton.classList.remove(`offer-products-box__${this.itemType}list-item-button--active`);
				otherActiveButton.classList.remove(`offer-products-box__${otherItemType}list-item-button--active`);
			}

			listItem.classList.remove('offer-products-box__list-item--hidden');

			listItemButton.classList.add(`offer-products-box__${this.itemType}list-item-button--active`);
			otherListItemButton.classList.add(`offer-products-box__${otherItemType}list-item-button--active`);

			itemDescription.classList.add(`offer-products-box__list-item-description--active`);

			const itemArrow = document.querySelector(`[data-item="${this.itemNumber}"][data-item-type=""] > i`);

			turnItemsArrowDown();
			itemArrow.classList.remove('fa-chevron-down');
			itemArrow.classList.add('fa-chevron-up');
		}

		if (activeBtnInLiDescription != null) {
			const activeBtnInLi = document.querySelector(
				'.offer-products-box__list-item-description-list-item-button--active',
			);
			const activeBtnInLiArrow = document.querySelector(
				`.offer-products-box__list-item-description-list-item-button > .fa-chevron-up`,
			);

			activeBtnInLiDescription.classList.remove(
				'offer-products-box__list-item-description-list-item-description--active',
			);
			activeBtnInLi.classList.remove('offer-products-box__list-item-description-list-item-button--active');
			activeBtnInLiArrow.classList.remove('fa-chevron-up');
			activeBtnInLiArrow.classList.add('fa-chevron-down');

			imageBoxCarouselButtons.forEach(btn => {
				btn.classList.add('offer-products-box-images__btn--hidden');
			});
		}
	};

	const handleOffer = e => {
		displaySrcPath = e.currentTarget.dataset.displaySrcPath;

		const itemNumber = e.currentTarget.dataset.item;
		const itemType = e.currentTarget.dataset.itemType;

		const chosenOffer = new CreateOfferDisplay(itemNumber, itemType, displaySrcPath);

		numberOfImages = e.currentTarget.dataset.numberOfImages;

		clearCarouselInterval();
		setCarouselInterval();

		chosenOffer.handleOfferDisplay();
	};

	const handleNullOffer = () => {
		const activeItemDescription = document.querySelector('.offer-products-box__list-item-description--active');

		if (window.innerWidth >= 992 && activeItemDescription === null) {
			const itemDescription = document.querySelector(`[data-description="1"]`);
			const mobileListItemButton = document.querySelector(`[data-item="1"][data-item-type=""]`);
			const mobileListItemButtonArrow = document.querySelector(`[data-item="1"][data-item-type=""] > i`);
			const desktopListItemButton = document.querySelector(`[data-item="1"][data-item-type="desktop-"]`);

			mobileListItemButtonArrow.classList.remove('fa-chevron-down');
			mobileListItemButtonArrow.classList.add('fa-chevron-up');
			mobileListItemButton.classList.add(`offer-products-box__list-item-button--active`);
			desktopListItemButton.classList.add(`offer-products-box__desktop-list-item-button--active`);
			itemDescription.classList.add('offer-products-box__list-item-description--active');
		}
	};

	const handleListInDescription = e => {
		const btn = e.currentTarget;
		const itemNumber = btn.dataset.inLiItem;
		const btnDescription = document.querySelector(
			`.offer-products-box__list-item-description-list-item-description[data-in-li-item="${itemNumber}"]`,
		);
		const activeBtnDescription = document.querySelector(
			'.offer-products-box__list-item-description-list-item-description--active',
		);
		const activeBtn = document.querySelector('.offer-products-box__list-item-description-list-item-button--active');
		const btnArrow = document.querySelector(`[data-in-li-item="${itemNumber}"] > i`);
		const activeBtnArrow = document.querySelector(
			`.offer-products-box__list-item-description-list-item-button > .fa-chevron-up`,
		);
		const image = document.querySelector(`img[src="/dist/img/offer/${displaySrcPath}/${imageNumber}.webp"]`);
		const mainDisplaySrcPath = e.currentTarget.dataset.mainDisplaySrcPath;
		imageBoxCarouselButtons = document.querySelectorAll(`[data-image-box-name="${mainDisplaySrcPath}"] > button`);

		numberOfImages = e.currentTarget.dataset.numberOfImages;

		if (activeBtnDescription === btnDescription) {
			numberOfImages = undefined;
		}

		if (activeBtnDescription != null) {
			activeBtnDescription.classList.remove('offer-products-box__list-item-description-list-item-description--active');
			activeBtn.classList.remove('offer-products-box__list-item-description-list-item-button--active');
			activeBtnArrow.classList.remove('fa-chevron-up');
			activeBtnArrow.classList.add('fa-chevron-down');

			displaySrcPath = mainDisplaySrcPath;
			imageNumber = 1;

			image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);

			clearCarouselInterval();
		}

		if (activeBtnDescription != btnDescription) {
			btnDescription.classList.add('offer-products-box__list-item-description-list-item-description--active');
			btn.classList.add('offer-products-box__list-item-description-list-item-button--active');
			btnArrow.classList.remove('fa-chevron-down');
			btnArrow.classList.add('fa-chevron-up');

			displaySrcPath = e.currentTarget.dataset.displaySrcPath;
			imageNumber = 1;
			image.setAttribute('src', `/dist/img/offer/${displaySrcPath}/${imageNumber}.webp`);
			clearCarouselInterval();
		}

		if (numberOfImages != undefined) {
			imageBoxCarouselButtons.forEach(btn => {
				btn.classList.remove('offer-products-box-images__btn--hidden');
			});
			setCarouselInterval();
		} else {
			imageBoxCarouselButtons.forEach(btn => {
				btn.classList.add('offer-products-box-images__btn--hidden');
			});
		}
	};

	const sendEmail = async (userName, userEmail, userTel, userMsg) => {
		const baseUrl = 'send-email.php';

		const res = await fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: userName.value,
				userEmail: userEmail.value,
				userTel: userTel.value,
				userMsg: userMsg.value,
			}),
		});
	};

	const resetForm = (userName, userEmail, userTel, userMsg, dataProcessingCheckbox) => {
		userName.value = '';
		userEmail.value = '';
		userTel.value = '';
		userMsg.value = '';
		dataProcessingCheckbox.checked = false;
	};

	const checkName = () => {
		const userName = document.querySelector('#name');
		const nameValidation = /^[a-z\s]\p{L}*$/giu;

		const nameError = document.querySelector('.contact-box-form__error-message--name');

		if (userName.value.length >= 3 && userName.value.match(nameValidation)) {
			nameError.classList.remove('contact-box-form__error-message--visible');
			return userName;
		} else {
			nameError.classList.add('contact-box-form__error-message--visible');
			return undefined;
		}
	};

	const checkEmail = () => {
		const userEmail = document.querySelector('#email');
		const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
		const emailError = document.querySelector('.contact-box-form__error-message--email');

		if (userEmail.value.match(emailValidation)) {
			emailError.classList.remove('contact-box-form__error-message--visible');
			return userEmail;
		} else {
			emailError.classList.add('contact-box-form__error-message--visible');
			return undefined;
		}
	};

	const checkTel = () => {
		const userTel = document.querySelector('#tel');
		const telError = document.querySelector('.contact-box-form__error-message--tel');
		const telValidation =
			/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

		if (userTel.value.length >= 9 && userTel.value.match(telValidation)) {
			telError.classList.remove('contact-box-form__error-message--visible');
			return userTel;
		} else {
			telError.classList.add('contact-box-form__error-message--visible');
			return undefined;
		}
	};

	const checkMsg = () => {
		const userMsg = document.querySelector('#message');
		const messageError = document.querySelector('.contact-box-form__error-message--message');

		if (userMsg.value.length >= 3) {
			messageError.classList.remove('contact-box-form__error-message--visible');
			return userMsg;
		} else {
			messageError.classList.add('contact-box-form__error-message--visible');
			return undefined;
		}
	};

	const checkDataProcessing = dataProcessingCheckbox => {
		const dataProcessingError = document.querySelector('.contact-box-form__error-message--data-processing');

		if (dataProcessingCheckbox.checked) {
			dataProcessingError.classList.remove('contact-box-form__error-message--visible');
			return true;
		} else {
			dataProcessingError.classList.add('contact-box-form__error-message--visible');
			return undefined;
		}
	};

	const handleForm = e => {
		e.preventDefault();

		const dataProcessingCheckbox = document.querySelector('#data-processing');

		const userName = checkName();
		const userEmail = checkEmail();
		const userTel = checkTel();
		const userMsg = checkMsg();
		const dataProcessing = checkDataProcessing(dataProcessingCheckbox);

		const variablesToValidate = [userName, userEmail, userTel, userMsg, dataProcessing];

		let validationsPassed = 0;

		variablesToValidate.forEach(variable => {
			if (variable != undefined) {
				validationsPassed++;
			}
		});

		if (validationsPassed === 5) {
			const messageSentBackground = document.querySelector('.contact-box-form-message-sent-bg');
			const messageSentContent = document.querySelector('.contact-box-form-message-sent-content');
			const confirmButton = document.querySelector('.contact-box-form-message-sent-content__confirm-button');
			const eventListenersArray = [confirmButton, messageSentBackground];

			eventListenersArray.forEach(listener => {
				listener.addEventListener('click', e => {
					e.preventDefault();
					messageSentBackground.classList.add('contact-box-form-message-sent-bg--hidden');
					messageSentContent.classList.add('contact-box-form-message-sent-content--hidden');
				});
			});

			messageSentBackground.classList.remove('contact-box-form-message-sent-bg--hidden');
			messageSentContent.classList.remove('contact-box-form-message-sent-content--hidden');

			sendEmail(userName, userEmail, userTel, userMsg);
			resetForm(userName, userEmail, userTel, userMsg, dataProcessingCheckbox);
		}
	};

	imageCarouselBtns.forEach(btn => btn.addEventListener('click', handleCarousel));
	listItems.forEach(item => item.addEventListener('click', handleOffer));
	imageContainers.forEach(container => {
		container.addEventListener('mouseover', clearCarouselInterval);
		container.addEventListener('mouseleave', setCarouselInterval);
	});
	btnsInLiDescription.forEach(item => {
		item.addEventListener('click', handleListInDescription);
	});

	window.onresize = handleNullOffer;

	submitFormBtn.addEventListener('click', handleForm);
}

navIcon.addEventListener('click', handleNav);
navLinks.forEach(link => link.addEventListener('click', handleNav));

logos.forEach(logo => logo.addEventListener('click', handleNavByLogo));

handleCopyrightYear();
