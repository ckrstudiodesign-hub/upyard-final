/* ═══════════════════════════════════════════════
   TONIC RUSSIAN LOUNGE — MAIN SCRIPT
   Created by CKR STUDIOS
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const dot  = document.getElementById('cDot');
  const ring = document.getElementById('cRing');
  if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12);
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(tick);
    };
    tick();
    const interactables = document.querySelectorAll('a, button, .g-item, .menu-card, .rev-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='56px'; ring.style.height='56px'; ring.style.opacity='0.25'; });
      el.addEventListener('mouseleave', () => { ring.style.width='34px'; ring.style.height='34px'; ring.style.opacity='0.55'; });
    });
  }

  /* ── NAVBAR SOLID ON SCROLL ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE MENU ── */
  const burger = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');
  const toggleMob = () => {
    burger.classList.toggle('open');
    mobMenu.classList.toggle('open');
    document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
  };
  burger.addEventListener('click', toggleMob);
  document.querySelectorAll('.mob-link, .mob-reserve').forEach(el => {
    el.addEventListener('click', () => {
      burger.classList.remove('open');
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── EXPERIENCE TABS ── */
  document.querySelectorAll('.exp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('panel-' + tab.dataset.panel);
      if (target) target.classList.add('active');
    });
  });

  /* ── GALLERY LIGHTBOX ── */
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lbImg');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const gItems = document.querySelectorAll('.g-item');
  let currentIdx = 0;

  const openLb = (idx) => {
    currentIdx = idx;
    const src = gItems[idx].querySelector('img').src;
    lbImg.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  const prev = () => { currentIdx = (currentIdx - 1 + gItems.length) % gItems.length; openLb(currentIdx); };
  const next = () => { currentIdx = (currentIdx + 1) % gItems.length; openLb(currentIdx); };

  gItems.forEach((item, i) => item.addEventListener('click', () => openLb(i)));
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') closeLb();
  });

  /* ── RESERVATION MODAL ── */
  const modalBg = document.getElementById('resvModal');
  const form    = document.getElementById('resvForm');
  const success = document.getElementById('successBox');

  window.openModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    modalBg.classList.add('open');
    document.body.style.overflow = 'hidden';
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('rDate');
    if (dateInput) dateInput.min = today;
  };
  const closeModal = () => {
    modalBg.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); openModal(); });
  });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('rFirst').value + ' ' + document.getElementById('rLast').value;
      const phone   = document.getElementById('rPhone').value;
      const date    = document.getElementById('rDate').value;
      const time    = document.getElementById('rTime').value;
      const guests  = document.getElementById('rGuests').value;
      const occ     = document.getElementById('rOcc').value || 'N/A';
      const notes   = document.getElementById('rNotes').value || 'None';
      const msg = `Hello Tonic Russian Lounge!%0A%0A*Reservation Request*%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Date:* ${date}%0A*Time:* ${time}%0A*Guests:* ${guests}%0A*Occasion:* ${encodeURIComponent(occ)}%0A*Notes:* ${encodeURIComponent(notes)}`;
      window.open(`https://wa.me/971542347023?text=${msg}`, '_blank');
      form.style.display = 'none';
      success.classList.add('show');
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          form.style.display = 'block';
          success.classList.remove('show');
          form.reset();
        }, 500);
      }, 4000);
    });
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        ro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => ro.observe(el));

  /* ── PARALLAX HERO BG ── */
  const heroVid = document.querySelector('.hero-video-wrap');
  if (heroVid) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroVid.style.transform = `translateY(${y * 0.28}px)`;
      }
    }, { passive: true });
  }

  /* ── ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── YEAR in footer ── */
  const yr = document.getElementById('footerYear');
  if (yr) yr.textContent = new Date().getFullYear();

});
