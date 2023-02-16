const nav = document.querySelector('.navbar');
const navIcon = document.querySelector('.navbar-hamburger');
const navLinks = document.querySelectorAll('.navbar__link');
const logo = document.querySelector('.navbar__logo');

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

navIcon.addEventListener('click', handleNav);
navLinks.forEach(link => link.addEventListener('click', handleNav));
logo.addEventListener('click', handleNavByLogo);
