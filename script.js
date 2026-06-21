/* ─────────────────────────────────────────────────────────
   soffyn — scripts
   ───────────────────────────────────────────────────────── */

// ── DARK MODE ──
function setMode(dark) {
  document.body.classList.toggle('dark', dark);
  document.body.classList.toggle('light', !dark);
  localStorage.setItem('soffyn-theme', dark ? 'dark' : 'light');
  document.querySelectorAll('.mode-toggle').forEach(function(t) {
    t.setAttribute('aria-checked', String(dark));
    t.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  });
  document.querySelectorAll('.mode-label').forEach(function(l) {
    l.textContent = dark ? '☾ Dark' : '☀ Light';
  });
}

var saved = localStorage.getItem('soffyn-theme');
var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setMode(saved === 'dark');

document.querySelectorAll('.mode-toggle').forEach(function(t) {
  t.addEventListener('click', function() {
    setMode(!document.body.classList.contains('dark'));
  });
});

// ── HAMBURGER ──
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    var open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    });
  });
}

// ── STICKY NAV ──
var nav = document.getElementById('nav') || document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── SCROLL REVEAL ──
var revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.in)'));
      var idx = siblings.indexOf(entry.target);
      setTimeout(function() { entry.target.classList.add('in'); }, Math.min(idx, 4) * 90);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealEls.forEach(function(el) { revealObserver.observe(el); });
}

/* ── Accordion ─────────────────────────────────────────────
   Works for:
   - Neurodivergent explainer on homepage
   - Homepage FAQ (5 questions)
   - Full FAQ page (all category sections)
   ───────────────────────────────────────────────────────── */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    // Set initial ARIA state
    trigger.setAttribute('aria-expanded', 'false');

    const body = trigger.nextElementSibling;
    if (body && body.classList.contains('accordion-body')) {
      body.style.maxHeight = '0';
    }

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const body   = trigger.nextElementSibling;

      // Close all siblings in the same accordion group
      const group = trigger.closest('.accordion');
      if (group) {
        group.querySelectorAll('.accordion-trigger').forEach(t => {
          if (t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            const b = t.nextElementSibling;
            if (b) b.style.maxHeight = '0';
          }
        });
      }

      // Toggle this one
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        if (body) body.style.maxHeight = '0';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ── Category filter (blog) ────────────────────────────────
   Pills filter .blog-card elements by [data-category].
   "All" shows everything.
   ───────────────────────────────────────────────────────── */
function initCategoryFilter() {
  const pills = document.querySelectorAll('.category-pill');
  const cards = document.querySelectorAll('.blog-card');

  if (!pills.length || !cards.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active pill
      pills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const selected = pill.dataset.category;

      cards.forEach(card => {
        if (selected === 'all' || card.dataset.category === selected) {
          card.style.display = '';
          // Small fade-in
          card.style.opacity = '0';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.25s ease';
            card.style.opacity = '1';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Activate "All" on load
  const allPill = document.querySelector('.category-pill[data-category="all"]');
  if (allPill) allPill.classList.add('is-active');
}

/* ── FAQ category jump links ───────────────────────────────
   Clicking a .faq-category-pill scrolls to the matching
   [id] section and updates active state.
   ───────────────────────────────────────────────────────── */
function initFaqNav() {
  const pills = document.querySelectorAll('.faq-category-pill');

  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();

      pills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const target = pill.getAttribute('href');
      if (target && target.startsWith('#')) {
        const section = document.querySelector(target);
        if (section) {
          const navHeight = document.querySelector('nav#nav')?.offsetHeight || 72;
          const barHeight = document.querySelector('.announce-bar')?.offsetHeight || 38;
          const top = section.getBoundingClientRect().top + window.scrollY - navHeight - barHeight - 24;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

/* ── Scroll spy: highlight active FAQ category pill ────────
   As the user scrolls, updates the active pill to match
   whichever .faq-category-section is in view.
   ───────────────────────────────────────────────────────── */
function initFaqScrollSpy() {
  const sections = document.querySelectorAll('.faq-category-section');
  const pills    = document.querySelectorAll('.faq-category-pill');

  if (!sections.length || !pills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        pills.forEach(p => {
          p.classList.toggle('is-active', p.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(s => observer.observe(s));
}

/* ── Feature carousel / tabs ───────────────────────────────
   Drives the #feature-carousel on the homepage.
   Tab clicks show the matching .fc-panel.
   Prev/Next arrows cycle through panels.
   Counter shows "N / total".
   ───────────────────────────────────────────────────────── */
function initFeatureCarousel() {
  const tabs    = document.querySelectorAll('.fc-tab');
  const panels  = document.querySelectorAll('.fc-panel');
  const prevBtn = document.querySelector('.fc-btn--prev');
  const nextBtn = document.querySelector('.fc-btn--next');
  const counter = document.querySelector('.fc-counter');

  if (!tabs.length || !panels.length) return;

  let idx = 0;
  const total = tabs.length;

  function show(n) {
    idx = Math.max(0, Math.min(n, total - 1));

    tabs.forEach((t, i) => {
      t.classList.toggle('is-active', i === idx);
      t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
    panels.forEach((p, i) => p.classList.toggle('is-active', i === idx));
    if (counter) counter.textContent = `${idx + 1} / ${total}`;
    if (prevBtn) prevBtn.disabled = (idx === 0);
    if (nextBtn) nextBtn.disabled = (idx === total - 1);
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => show(i)));
  prevBtn?.addEventListener('click', () => show(idx - 1));
  nextBtn?.addEventListener('click', () => show(idx + 1));

  show(0);
}

/* ── Testimonial carousel ──────────────────────────────────
   Drives the #problem survey-quote carousel.
   Shows 2 cards on desktop, 1 on mobile.
   Prev / Next buttons update transform on .testimonial-track.
   ───────────────────────────────────────────────────────── */
function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;

  const track   = carousel.querySelector('.testimonial-track');
  const cards   = Array.from(carousel.querySelectorAll('.testimonial-card'));
  const prevBtn = carousel.closest('#problem').querySelector('.carousel-btn--prev');
  const nextBtn = carousel.closest('#problem').querySelector('.carousel-btn--next');

  if (!track || !cards.length) return;

  let idx = 0;
  const GAP = 24; // matches CSS gap

  function getVisible() {
    return window.innerWidth >= 768 ? 2 : 1;
  }

  function maxIdx() {
    return Math.max(0, cards.length - getVisible());
  }

  function update() {
    const cardW = cards[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${idx * (cardW + GAP)}px)`;
    if (prevBtn) prevBtn.disabled = (idx === 0);
    if (nextBtn) nextBtn.disabled = (idx >= maxIdx());
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (idx > 0) { idx--; update(); }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (idx < maxIdx()) { idx++; update(); }
    });
  }

  // Re-clamp on resize (e.g. desktop ↔ mobile switch)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      idx = Math.min(idx, maxIdx());
      update();
    }, 100);
  });

  update();
}

/* ── Mobile nav toggle ─────────────────────────────────────
   Toggles .is-open on <nav> when the hamburger is clicked.
   Closes on outside click or Escape key.
   ───────────────────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = toggle?.closest('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAccordions();
  initCategoryFilter();
  initFaqNav();
  initFaqScrollSpy();
  initFeatureCarousel();
  initTestimonialCarousel();
});
