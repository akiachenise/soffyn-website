/* ─────────────────────────────────────────────────────────
   soffyn — scripts
   ───────────────────────────────────────────────────────── */

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
          const navHeight = document.querySelector('nav')?.offsetHeight || 80;
          const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 24;
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

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initCategoryFilter();
  initFaqNav();
  initFaqScrollSpy();
});
