/**
 * DeyaAldeen Portfolio - Main JavaScript
 * Vanilla JS implementation of React features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Respect OS-level reduced-motion preference
  const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-motion-reduce: reduce)').matches
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // Theme Toggle
  // ============================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  function updateThemeAriaState() {
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle?.setAttribute('aria-pressed', isDark.toString());
    themeToggleMobile?.setAttribute('aria-pressed', isDark.toString());
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeAriaState();
  }

  // Check for saved theme or system preference
  if (localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  updateThemeAriaState();

  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  // ============================================
  // Mobile Menu
  // ============================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      mobileMenuBtn?.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn?.contains(e.target)) {
      mobileMenu.classList.remove('open');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      mobileMenuBtn?.setAttribute('aria-label', 'Open navigation menu');
    }
  });

  // ============================================
  // Scroll Detection for Nav
  // ============================================
  const nav = document.getElementById('nav');

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ============================================
  // Decrypt Text Animation
  // ============================================
  function decryptText(element, targetText) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    let iteration = 0;

    const interval = setInterval(() => {
      element.textContent = targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          if (letter === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1/3;
    }, 30);
  }

  // Run decrypt animation on page load
  const decryptElement = document.getElementById('decrypt-text');
  if (decryptElement && !PREFERS_REDUCED_MOTION) {
    decryptText(decryptElement, "DEYA ALDEEN");
  }

  // ============================================
  // Hero number count-up (IntersectionObserver)
  // ============================================
  const heroCount = document.getElementById('hero-count');
  if (heroCount) {
    const target = parseInt(heroCount.dataset.countTarget || heroCount.textContent, 10);
    const duration = parseInt(heroCount.dataset.countDuration || '1400', 10);

    const runCount = () => {
      if (PREFERS_REDUCED_MOTION) {
        heroCount.textContent = target.toLocaleString();
        return;
      }
      const startTs = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTs) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        heroCount.textContent = Math.round(target * eased).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else heroCount.textContent = target.toLocaleString();
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runCount();
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      io.observe(heroCount);
    } else {
      runCount();
    }
  }

  // ============================================
  // Spotlight Card Effect
  // ============================================
  document.querySelectorAll('.spotlight-card').forEach(card => {
    const spotlight = card.querySelector('.spotlight-effect');
    if (!spotlight) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 165, 116, 0.18), transparent 40%)`;
    });

    card.addEventListener('mouseenter', () => {
      spotlight.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  });

  // ============================================
  // ROI Calculator
  // ============================================
  const hoursInput = document.getElementById('hours-wasted');
  const teamInput = document.getElementById('team-size');
  const hoursDisplay = document.getElementById('hours-display');
  const teamDisplay = document.getElementById('team-display');
  const savingsDisplay = document.getElementById('annual-savings');
  const hoursPerMonthDisplay = document.getElementById('hours-per-month');

  const HOURLY_RATE = 75; // $75/hour fully-loaded cost for enterprise finance
  const AUTOMATION_POTENTIAL = 0.80; // 80% of manual work is automatable

  function updateROI() {
    const hours = parseInt(hoursInput?.value || 20);
    const team = parseInt(teamInput?.value || 15);

    // Formula: Hours/week × Team size × $75/hr × 52 weeks × 80%
    const totalHoursPerYear = hours * team * 52;
    const automatableHours = totalHoursPerYear * AUTOMATION_POTENTIAL;
    const savings = automatableHours * HOURLY_RATE;
    const hoursPerMonth = Math.round((hours * team * 4) * AUTOMATION_POTENTIAL);

    if (hoursDisplay) hoursDisplay.textContent = `${hours} hrs`;
    if (teamDisplay) teamDisplay.textContent = `${team} people`;
    if (savingsDisplay) savingsDisplay.textContent = `$${Math.round(savings).toLocaleString()}`;
    if (hoursPerMonthDisplay) hoursPerMonthDisplay.textContent = hoursPerMonth.toLocaleString();
  }

  hoursInput?.addEventListener('input', updateROI);
  teamInput?.addEventListener('input', updateROI);
  updateROI(); // Initial calculation

  // ============================================
  // Accordion
  // ============================================
  let activeAccordion = 0;

  document.querySelectorAll('.accordion-button').forEach((button) => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.accordion);
      const content = button.nextElementSibling;
      const minusIcon = button.querySelector('.accordion-icon-minus');
      const plusIcon = button.querySelector('.accordion-icon-plus');

      // Close all accordions
      document.querySelectorAll('.accordion-content').forEach((c, i) => {
        const btn = document.querySelector(`[data-accordion="${i}"]`);
        const minus = btn?.querySelector('.accordion-icon-minus');
        const plus = btn?.querySelector('.accordion-icon-plus');

        if (i === index && activeAccordion !== index) {
          // Open this one
          c.classList.add('open');
          minus?.classList.remove('hidden');
          plus?.classList.add('hidden');
          activeAccordion = index;
        } else if (i === index && activeAccordion === index) {
          // Toggle off
          c.classList.remove('open');
          minus?.classList.add('hidden');
          plus?.classList.remove('hidden');
          activeAccordion = -1;
        } else {
          // Close others
          c.classList.remove('open');
          minus?.classList.add('hidden');
          plus?.classList.remove('hidden');
        }
      });
    });
  });

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // Form Submission Handling
  // ============================================
  const contactForm = document.getElementById('contact-form');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span>Transmitting...</span><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
    submitBtn.disabled = true;
    lucide.createIcons();

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        submitBtn.innerHTML = '<span>Request Transmitted</span><i data-lucide="check" class="w-4 h-4"></i>';
        submitBtn.classList.add('bg-green-600');
        lucide.createIcons();
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('bg-green-600');
          submitBtn.disabled = false;
          lucide.createIcons();
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error
      submitBtn.innerHTML = '<span>Error - Try Again</span><i data-lucide="alert-circle" class="w-4 h-4"></i>';
      submitBtn.classList.add('bg-red-600');
      lucide.createIcons();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('bg-red-600');
        submitBtn.disabled = false;
        lucide.createIcons();
      }, 3000);
    }
  });

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  document.querySelectorAll('.fade-on-scroll').forEach(el => {
    fadeObserver.observe(el);
  });

  // ============================================
  // Pause Marquee on Hover (CSS handles this, but adding JS backup)
  // ============================================
  document.querySelectorAll('.group').forEach(group => {
    const marquees = group.querySelectorAll('.animate-marquee, .animate-marquee-reverse');

    group.addEventListener('mouseenter', () => {
      marquees.forEach(m => m.style.animationPlayState = 'paused');
    });

    group.addEventListener('mouseleave', () => {
      marquees.forEach(m => m.style.animationPlayState = 'running');
    });
  });

  // ============================================
  // FAQ Accordion
  // ============================================
  document.querySelectorAll('.faq-button').forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const plusIcon = button.querySelector('.faq-icon-plus');
      const minusIcon = button.querySelector('.faq-icon-minus');
      const isOpen = content.classList.contains('open');

      // Close all FAQ items first
      document.querySelectorAll('.faq-content').forEach(c => {
        c.classList.remove('open');
      });
      document.querySelectorAll('.faq-icon-plus').forEach(icon => {
        icon.classList.remove('hidden');
      });
      document.querySelectorAll('.faq-icon-minus').forEach(icon => {
        icon.classList.add('hidden');
      });

      // Toggle current item if it wasn't open
      if (!isOpen) {
        content.classList.add('open');
        plusIcon?.classList.add('hidden');
        minusIcon?.classList.remove('hidden');
      }
    });
  });

  // ============================================
  // ROI Calculator Formula Toggle
  // ============================================
  const showFormulaBtn = document.getElementById('show-formula-btn');
  const formulaDetails = document.getElementById('formula-details');

  showFormulaBtn?.addEventListener('click', () => {
    const isHidden = formulaDetails.classList.contains('hidden');
    formulaDetails.classList.toggle('hidden');
    showFormulaBtn.querySelector('span').textContent = isHidden ? 'Hide calculation' : 'Show calculation';
  });

  // ============================================
  // Wire Clock — Amman live time
  // ============================================
  (function wireClock() {
    const el = document.getElementById('wire-clock-time');
    if (!el) return;
    const fmt = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const now = new Date();
      // Amman is UTC+3 (no DST since 2022)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const amman = new Date(utc + 3 * 3600000);
      el.textContent = `AMM · ${fmt(amman.getHours())}:${fmt(amman.getMinutes())}:${fmt(amman.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  })();

  // ============================================
  // Reading Progress
  // ============================================
  (function readingProgress() {
    const bar = document.getElementById('read-progress');
    if (!bar) return;
    let raf = null;
    const update = () => {
      raf = null;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', () => {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  // ============================================
  // Section Indicator — current section glow
  // ============================================
  (function sectionIndicator() {
    const links = document.querySelectorAll('.section-indicator a');
    if (!links.length) return;
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute('data-section-link');
      const el = document.getElementById(id);
      if (el) map.set(el, a);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('is-current'));
          const a = map.get(entry.target);
          if (a) a.classList.add('is-current');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    map.forEach((_, el) => io.observe(el));
  })();

  // ============================================
  // Reveal-on-scroll observer (.reveal, .reveal-stagger)
  // ============================================
  (function revealOnScroll() {
    if (PREFERS_REDUCED_MOTION) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
  })();

  // ============================================
  // Process plate — animate "live" path on scroll-into-view
  // ============================================
  (function processPlate() {
    const path = document.getElementById('rail-live-path');
    if (!path) return;
    const plate = path.closest('.process-plate');
    if (!plate) return;
    const animate = () => {
      if (PREFERS_REDUCED_MOTION) {
        path.style.strokeDashoffset = '0';
        return;
      }
      const dur = 2200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        path.style.strokeDashoffset = (100 - eased * 100).toString();
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate();
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(plate);
  })();

  // ============================================
  // Engagement row — click to toggle expanded info on touch
  // ============================================
  (function engagementToggle() {
    document.querySelectorAll('.engagement-row').forEach(row => {
      row.addEventListener('click', (e) => {
        // Only toggle on touch / coarse pointer; desktop uses hover
        if (window.matchMedia('(pointer: coarse)').matches) {
          row.classList.toggle('is-open');
        }
      });
    });
  })();

  console.log('DeyaAldeen Portfolio initialized');
});
