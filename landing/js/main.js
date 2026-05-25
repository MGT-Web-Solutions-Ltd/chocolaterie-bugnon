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

(function () {
  var GALLERY_IMAGES = {
    chocolats: [
      'images/new_images/chocolat/c8.jpg',
      'images/new_images/chocolat/c1.jpg',
      'images/new_images/chocolat/c2.jpg',
      'images/new_images/chocolat/c3.jpg',
      'images/new_images/chocolat/c4.jpg',
      'images/new_images/chocolat/c5.jpg',
      'images/new_images/chocolat/c6.jpg',
      'images/new_images/chocolat/c7.jpg',
      'images/new_images/chocolat/c8.jpg',
      'images/new_images/chocolat/1000004848.jpg'
    ],
    confiseries: [
      'images/new_images/confisserie/co1.jpg',
      'images/new_images/confisserie/co2.jpg',
      'images/new_images/confisserie/co3.jpg',
      'images/new_images/confisserie/co4.jpg',
      'images/new_images/confisserie/boite-20-pces.jpg',
      'images/new_images/confisserie/boite-chocolats.jpg'
    ],
    'glaces-sorbets': [
      'images/new_images/glace_Et_sorbet/g1.jpg',
      'images/new_images/glace_Et_sorbet/g2.jpg',
      'images/new_images/glace_Et_sorbet/g3.jpg',
      'images/new_images/glace_Et_sorbet/g4.jpg',
      'images/new_images/glace_Et_sorbet/g5.jpg',
      'images/new_images/glace_Et_sorbet/g6.jpg',
      'images/new_images/glace_Et_sorbet/g7.jpg'
    ],
    saison: [
      'images/new_images/season/s1.jpg',
      'images/new_images/season/s2.jpg',
      'images/new_images/season/s3.jpg',
      'images/new_images/season/s4.jpg',
      'images/new_images/season/s5.jpg',
      'images/new_images/season/s6.jpg',
      'images/new_images/season/s7.jpg',
      'images/new_images/season/s8.jpg'
    ],
    art: [
      'images/new_images/art/a1.jpg',
      'images/new_images/art/a2.jpg',
      'images/new_images/art/a3.jpg',
      'images/new_images/art/a4.jpg',
      'images/new_images/art/a5.jpg',
      'images/new_images/art/a6.jpg',
      'images/new_images/art/a7.jpg',
      'images/new_images/art/a8.jpg'
    ]
  };

  var lightbox = {
    overlay: null,
    img: null,
    counter: null,
    images: [],
    currentIndex: 0,

    init: function () {
      var el = document.createElement('div');
      el.id = 'lightbox';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      el.setAttribute('aria-label', 'Galerie photos');
      el.innerHTML =
        '<div class="lb-backdrop"></div>' +
        '<button class="lb-close" aria-label="Fermer">&#x2715;</button>' +
        '<button class="lb-prev" aria-label="Photo précédente">&#x2039;</button>' +
        '<button class="lb-next" aria-label="Photo suivante">&#x203A;</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""></div>' +
        '<div class="lb-counter"></div>';
      document.body.appendChild(el);

      this.overlay = el;
      this.img     = el.querySelector('.lb-img');
      this.counter = el.querySelector('.lb-counter');

      el.querySelector('.lb-close').addEventListener('click', this.close.bind(this));
      el.querySelector('.lb-backdrop').addEventListener('click', this.close.bind(this));
      el.querySelector('.lb-prev').addEventListener('click', this.prev.bind(this));
      el.querySelector('.lb-next').addEventListener('click', this.next.bind(this));

      document.addEventListener('keydown', function (e) {
        if (!this.overlay.classList.contains('lb-active')) return;
        if (e.key === 'Escape')     this.close();
        if (e.key === 'ArrowLeft')  this.prev();
        if (e.key === 'ArrowRight') this.next();
      }.bind(this));

      // Wire up product tiles
      document.querySelectorAll('.produit-tile').forEach(function (tile) {
        tile.addEventListener('click', function () {
          var category = tile.dataset.category;
          var imgs = GALLERY_IMAGES[category];
          if (!imgs || !imgs.length) return;
          var entries = imgs.map(function (src) {
            return { src: src, alt: category };
          });
          this.open(entries, 0);
        }.bind(this));
      }.bind(this));
    },

    open: function (images, index) {
      this.images = images;
      this.currentIndex = index;
      this._show();
      this.overlay.classList.add('lb-active');
      document.body.style.overflow = 'hidden';
      this.overlay.querySelector('.lb-close').focus();
    },

    close: function () {
      this.overlay.classList.remove('lb-active');
      document.body.style.overflow = '';
    },

    prev: function () {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this._show();
    },

    next: function () {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this._show();
    },

    _show: function () {
      var entry = this.images[this.currentIndex];
      this.img.src = entry.src;
      this.img.alt = entry.alt;
      this.counter.textContent = (this.currentIndex + 1) + ' / ' + this.images.length;
    }
  };

  lightbox.init();
})();
