const mobileNavButton = document.querySelector('.mobile-nav-button');
const mobileNav = document.querySelector('.mobile-nav');

function toggleMobileNav() {
  mobileNav.classList.toggle('active');
}

mobileNavButton.addEventListener('click', toggleMobileNav);