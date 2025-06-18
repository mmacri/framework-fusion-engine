
// Simple smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
}

// Stats animation
function initStatsAnimation() {
  const statValues = document.querySelectorAll('.stat-value');
  
  const animateStats = () => {
    statValues.forEach(stat => {
      const finalValue = stat.textContent;
      const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
      const suffix = finalValue.replace(/[\d]/g, '');
      
      let current = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + suffix;
      }, 30);
    });
  };

  // Trigger animation when stats section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading static page components...');
  
  // Load all sections
  if (typeof createHeroSection !== 'undefined') {
    document.getElementById('hero-section').innerHTML = createHeroSection();
    console.log('Hero section loaded');
  }
  if (typeof createNavigationSection !== 'undefined') {
    document.getElementById('navigation-section').innerHTML = createNavigationSection();
    console.log('Navigation section loaded');
  }
  if (typeof createStatsSection !== 'undefined') {
    document.getElementById('stats-section').innerHTML = createStatsSection();
    console.log('Stats section loaded');
  }
  if (typeof createFeaturesSection !== 'undefined') {
    document.getElementById('features-section').innerHTML = createFeaturesSection();
    console.log('Features section loaded');
  }
  if (typeof createGettingStartedSection !== 'undefined') {
    document.getElementById('getting-started-section').innerHTML = createGettingStartedSection();
    console.log('Getting started section loaded');
  }
  if (typeof createFooterSection !== 'undefined') {
    document.getElementById('footer-section').innerHTML = createFooterSection();
    console.log('Footer section loaded');
  }

  // Initialize interactive features
  initSmoothScrolling();
  initStatsAnimation();
  
  console.log('Static page initialization complete');
});
