/* ============================================
   BRIAN JASON TRAN — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Auto-update copyright year ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Navigation scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll reveal (IntersectionObserver) ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // --- Back to top button ---
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Lazy load videos ---
  const videos = document.querySelectorAll('video[data-src]');
  if (videos.length && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src;
          video.load();
          videoObserver.unobserve(video);
        }
      });
    }, { rootMargin: '200px' });

    videos.forEach(v => videoObserver.observe(v));
  }

});
