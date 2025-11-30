/**
 * DeyaAldeen Portfolio - Main JavaScript
 * Vanilla JS implementation of React features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

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
  if (decryptElement) {
    decryptText(decryptElement, "DEYA ALDEEN");
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
      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(249, 115, 22, 0.15), transparent 40%)`;
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

  const HOURLY_RATE = 50; // $50/hour assumption

  function updateROI() {
    const hours = parseInt(hoursInput?.value || 10);
    const team = parseInt(teamInput?.value || 5);
    const savings = hours * team * HOURLY_RATE * 52;

    if (hoursDisplay) hoursDisplay.textContent = `${hours} hrs`;
    if (teamDisplay) teamDisplay.textContent = `${team} people`;
    if (savingsDisplay) savingsDisplay.textContent = `$${savings.toLocaleString()}`;
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

  console.log('DeyaAldeen Portfolio initialized');
});
