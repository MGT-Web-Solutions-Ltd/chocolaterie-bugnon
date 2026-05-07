(function () {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');

  // Sticky nav: add .scrolled class when page scrolls
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile burger toggle
  burger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.classList.toggle('nav__burger--open', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('nav__links--open');
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('nav__burger--open');
    }
  });
})();
