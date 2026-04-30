import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // 1. Custom Cursor Logic
  const cursor = document.querySelector('.cursor');
  const hoverTargets = document.querySelectorAll('.hover-target');
  
  // Follow mouse
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Smooth cursor follow
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      ease: "power2.out"
    });
  });

  // Cursor Hover Effects
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => cursor.classList.add('active'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  // 2. Menu Hover Image Reveal Logic
  const hoverRevealContainer = document.querySelector('.hover-reveal-img');
  const hoverImg = document.getElementById('hover-img');
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const imgSrc = item.getAttribute('data-img');
      hoverImg.src = imgSrc;
      hoverRevealContainer.classList.add('visible');
    });

    item.addEventListener('mousemove', (e) => {
      // Follow cursor with slight delay
      gsap.to(hoverRevealContainer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
    });

    item.addEventListener('mouseleave', () => {
      hoverRevealContainer.classList.remove('visible');
    });
  });

  // 3. Hero Text Reveal Animation
  const titleWords = document.querySelectorAll('.title-word');
  const subtitleP = document.querySelector('.hero-subtitle p');
  const heroBtn = document.querySelector('.hero-content .btn-primary');

  const tl = gsap.timeline();

  tl.to(titleWords, 
    { y: "0%", duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.2 }
  )
  .to(subtitleP,
    { y: "0%", opacity: 1, duration: 1.5, ease: "power3.out" },
    "-=1"
  )
  .fromTo(heroBtn,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "-=1"
  );

  // 4. Smooth Parallax Images
  gsap.utils.toArray('.parallax-img').forEach(img => {
    const speed = img.getAttribute('data-speed') || 1;
    
    gsap.to(img, {
      y: () => (window.innerHeight * (1 - speed)),
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // 5. Scroll Reveal for About Section Images
  gsap.utils.toArray('.reveal-img').forEach(imgWrapper => {
    gsap.fromTo(imgWrapper, 
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
        scrollTrigger: {
          trigger: imgWrapper,
          start: "top 80%"
        }
      }
    );
  });
}
