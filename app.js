/* ===========================================================
   Agustina Gondear — interactions
   =========================================================== */
(function () {
  'use strict';

  /* ---- Lucide icons ---- */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ---- Year ---- */
  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---- Nav: hairline border on scroll ---- */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Methodology stepper ---- */
  function initStepper() {
    var stepsWrap = document.getElementById('steps');
    if (!stepsWrap) return;
    var steps = Array.prototype.slice.call(stepsWrap.querySelectorAll('.step'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.method__panel .panel__view'));

    function activate(i) {
      steps.forEach(function (s, idx) {
        s.classList.toggle('is-active', idx === i);
        s.setAttribute('aria-selected', idx === i ? 'true' : 'false');
      });
      panels.forEach(function (p, idx) {
        if (idx === i) {
          p.hidden = false;
          p.classList.remove('panel__fade');
          // re-trigger animation
          void p.offsetWidth;
          p.classList.add('panel__fade');
        } else {
          p.hidden = true;
        }
      });
      initIcons();
    }

    steps.forEach(function (s, i) {
      s.addEventListener('click', function () { activate(i); });
      s.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(i); }
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
          ev.preventDefault();
          var n = Math.min(i + 1, steps.length - 1); activate(n); steps[n].focus();
        }
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
          ev.preventDefault();
          var p = Math.max(i - 1, 0); activate(p); steps[p].focus();
        }
      });
    });
  }

  /* ---- Accordion ---- */
  function initAccordion() {
    var acc = document.getElementById('acc');
    if (!acc) return;
    var items = Array.prototype.slice.call(acc.querySelectorAll('.acc__item'));

    function setHeight(item, open) {
      var panel = item.querySelector('.acc__panel');
      var inner = item.querySelector('.acc__inner');
      if (!panel || !inner) return;
      if (open) {
        panel.style.height = inner.offsetHeight + 'px';
      } else {
        panel.style.height = panel.offsetHeight + 'px';
        void panel.offsetWidth;
        panel.style.height = '0px';
      }
    }

    items.forEach(function (item) {
      var btn = item.querySelector('.acc__btn');
      // set initial state
      if (item.classList.contains('is-open')) {
        var inner = item.querySelector('.acc__inner');
        item.querySelector('.acc__panel').style.height = inner.offsetHeight + 'px';
      }
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) {
            other.classList.remove('is-open');
            other.querySelector('.acc__btn').setAttribute('aria-expanded', 'false');
            setHeight(other, false);
          }
        });
        item.classList.toggle('is-open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        setHeight(item, willOpen);
      });
    });

    // keep open panels sized on resize
    var resizeT;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () {
        items.forEach(function (item) {
          if (item.classList.contains('is-open')) {
            var inner = item.querySelector('.acc__inner');
            item.querySelector('.acc__panel').style.height = inner.offsetHeight + 'px';
          }
        });
      }, 120);
    });
  }

  /* ---- Hero rings subtle reveal ---- */
  function initHeroRings() {
    var rings = document.getElementById('heroRings');
    if (!rings) return;
    requestAnimationFrame(function () {
      rings.style.transition = 'opacity 1.2s var(--ease-out)';
      rings.style.opacity = '1';
    });
  }

  /* ---- Booking links (Calendly placeholder) ---- */
  function initBooking() {
    // Set window.CALENDLY_URL or replace below to wire real booking.
    var url = window.CALENDLY_URL || '';
    if (!url) return;
    document.querySelectorAll('[data-book]').forEach(function (a) {
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  function init() {
    initIcons();
    setYear();
    initNav();
    initReveal();
    initStepper();
    initAccordion();
    initHeroRings();
    initBooking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
