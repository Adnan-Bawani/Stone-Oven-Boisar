import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Loader ---
const initLoader = () => {
  const tl = gsap.timeline();

  tl.to('.loader-text', {
    opacity: 0,
    y: -20,
    duration: 1,
    delay: 0.5,
    ease: 'power3.inOut'
  })
    .to('#loader', {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut'
    })
    .from('.hero-title .line-reveal', {
      yPercent: 100,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
      clearProps: 'all'
    }, '-=0.5')
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8');
};

// --- Navbar Scroll ---
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  let isScrolled = false;
  window.addEventListener('scroll', () => {
    const shouldBeScrolled = window.scrollY > 50;
    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      if (isScrolled) {
        navbar.classList.add('scrolled-nav');
      } else {
        navbar.classList.remove('scrolled-nav');
      }
    }
  }, { passive: true });
};

// --- Menu Data & Logic ---
const menuData = [
  { id: 1, name: 'Truffle Mushroom Risotto', category: 'italian', price: '', desc: 'Arborio rice, wild mushrooms, parmesan crisp, truffle oil.' },
  { id: 2, name: 'Sizzling Fajitas', category: 'mexican', price: '', desc: 'Charred peppers, onions, guacamole, sour cream, warm tortillas.' },
  { id: 3, name: 'Kung Pao Lotus Stem', category: 'chinese', price: '', desc: 'Crispy lotus stem, roasted peanuts, fiery dry red chillies.' },
  { id: 4, name: 'Burrata Ravioli', category: 'italian', price: '', desc: 'Handmade ravioli, fresh burrata, sage butter, pine nuts.' },
  { id: 5, name: 'Chipotle Chicken Tacos', category: 'mexican', price: '', desc: 'Soft shell tacos, smoked chipotle chicken, pico de gallo.' },
  { id: 6, name: 'Dim Sum Platter', category: 'chinese', price: '', desc: 'Assorted steamed dumplings, chilli oil, soy dip.' }
];

const renderMenu = (filter = 'all') => {
  const menuGrid = document.querySelector('.menu-grid');
  menuGrid.innerHTML = '';

  const filteredData = filter === 'all' ? menuData : menuData.filter(item => item.category === filter);

  filteredData.forEach(item => {
    const el = document.createElement('div');
    el.className = 'menu-item group cursor-pointer border-b border-beige/10 pb-6 opacity-0 translate-y-4';
    el.innerHTML = `
      <div class="flex justify-between items-baseline mb-2">
        <h4 class="text-xl font-serif text-beige group-hover:text-gold transition-colors">${item.name}</h4>
        <span class="text-gold font-serif">${item.price}</span>
      </div>
      <p class="text-beige/50 text-sm font-sans w-3/4">${item.desc}</p>
    `;
    menuGrid.appendChild(el);
  });

  // Animate items in
  gsap.to('.menu-item', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    ScrollTrigger: {
      trigger: '.menu-grid',
      start: 'top 80%',
    }
  });
};

const initMenuFilters = () => {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      buttons.forEach(b => {
        b.classList.remove('text-gold', 'border-b', 'border-gold', 'pb-1');
        b.classList.add('text-beige/50');
      });
      e.target.classList.remove('text-beige/50');
      e.target.classList.add('text-gold', 'border-b', 'border-gold', 'pb-1');

      const filter = e.target.getAttribute('data-filter');

      // Fade out current, then render new
      gsap.to('.menu-item', {
        opacity: 0,
        y: 10,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          renderMenu(filter);
          ScrollTrigger.refresh();
        }
      });
    });
  });
};

// --- Scroll Animations ---
const initScrollAnimations = () => {
  // Hero Parallax
  gsap.to('.parallax-img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1 /* Smoother than true */
    }
  });

  // About Section Image Reveal
  gsap.from('.about-image img', {
    scale: 1.2,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
    }
  });

  gsap.from('.about-text > *', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%',
    }
  });


  // Reviews Reveal
  gsap.from('.review-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.reviews-container',
      start: 'top 80%',
    }
  });

  // Contact Section Reveal
  gsap.from('.contact form', {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%',
    }
  });
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  renderMenu('all');
  initMenuFilters();
  initScrollAnimations();
});
