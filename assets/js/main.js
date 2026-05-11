/**
 * DeyaAldeen Portfolio - Luxury Editorial JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
  
    // ============================================
    // Theme Toggle
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    
    function toggleTheme() {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  
    themeToggle?.addEventListener('click', toggleTheme);
  
    // ============================================
    // Fullscreen Menu
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
  
    function openMenu() {
      fullscreenMenu.classList.remove('opacity-0', 'pointer-events-none');
      fullscreenMenu.classList.add('opacity-100', 'pointer-events-auto');
    }
  
    function hideMenu() {
      fullscreenMenu.classList.remove('opacity-100', 'pointer-events-auto');
      fullscreenMenu.classList.add('opacity-0', 'pointer-events-none');
    }
  
    menuToggle?.addEventListener('click', openMenu);
    closeMenu?.addEventListener('click', hideMenu);
    
    menuLinks.forEach(link => {
        link.addEventListener('click', hideMenu);
    });
  
    // ============================================
    // Smooth Scroll
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
    // ROI Calculator
    // ============================================
    const hoursInput = document.getElementById('hours-wasted');
    const teamInput = document.getElementById('team-size');
    const hoursDisplay = document.getElementById('hours-display');
    const teamDisplay = document.getElementById('team-display');
    const savingsDisplay = document.getElementById('annual-savings');
    const hoursPerMonthDisplay = document.getElementById('hours-per-month');
  
    const HOURLY_RATE = 75; 
    const AUTOMATION_POTENTIAL = 0.80; 
  
    function updateROI() {
      const hours = parseInt(hoursInput?.value || 20);
      const team = parseInt(teamInput?.value || 15);
  
      const totalHoursPerYear = hours * team * 52;
      const automatableHours = totalHoursPerYear * AUTOMATION_POTENTIAL;
      const savings = automatableHours * HOURLY_RATE;
      const hoursPerMonth = Math.round((hours * team * 4) * AUTOMATION_POTENTIAL);
  
      if (hoursDisplay) hoursDisplay.textContent = hours;
      if (teamDisplay) teamDisplay.textContent = team;
      if (savingsDisplay) savingsDisplay.textContent = `$${Math.round(savings/1000)}k`;
      if (hoursPerMonthDisplay) hoursPerMonthDisplay.textContent = hoursPerMonth.toLocaleString();
    }
  
    hoursInput?.addEventListener('input', updateROI);
    teamInput?.addEventListener('input', updateROI);
    updateROI(); 
  
    // ============================================
    // Form Submission
    // ============================================
    const contactForm = document.getElementById('contact-form');
  
    contactForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const span = submitBtn.querySelector('span');
      const originalText = span.textContent;
  
      span.textContent = 'Transmitting...';
      submitBtn.disabled = true;
  
      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
  
        if (response.ok) {
          span.textContent = 'Request Received';
          contactForm.reset();
          setTimeout(() => { span.textContent = originalText; submitBtn.disabled = false; }, 3000);
        } else {
          throw new Error('Failed');
        }
      } catch (error) {
        span.textContent = 'Error. Try Again.';
        setTimeout(() => { span.textContent = originalText; submitBtn.disabled = false; }, 3000);
      }
    });
  
    // ============================================
    // Cinematic Scroll Reveal
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    });
  
    revealElements.forEach(el => revealObserver.observe(el));
  });
  