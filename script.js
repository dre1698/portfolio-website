// Initialization on DOM load
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
  
  initializeThemePreference();
  enableSmoothScrolling();
  setupProjectFilters();
  setupSectionFadeIn();
  setupScrollSpy();
  setupScrollToTop();
  initHeaderAnimation();;
  setupThemeToggle();
  setupHoverIcons();
  setupTouchTooltips()
  observeProjects();
  observeOffers();
  setupFloatingElements();
  
  // Es gibt einen Aufruf zu setupSkillsTabs() und setupToolItemObserver(),
  // aber diese Funktionen sind nicht definiert. Ich habe sie entfernt.
});



// Ensure dark mode persists across sessions
function initializeThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Enable smooth scrolling for internal navigation links
function enableSmoothScrolling() {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Animation für die Projektkarten beim Scrollen
const observeProjects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  projectCards.forEach(card => observer.observe(card));
};

// Filter projects by category
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        card.style.display =
          filter === "all" || card.classList.contains(filter) ? "block" : "none";
      });
    });
  });
}

// Fade in sections on scroll
function setupSectionFadeIn() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in-section").forEach((el) => {
    observer.observe(el);
  });
}

// Update active nav link while scrolling
function setupScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      if (sectionTop <= window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Scroll to top button visibility and action
function setupScrollToTop() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 300);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Header-Animation beim Scrollen
function initHeaderAnimation() {
  const header = document.querySelector('header');
  const navLogo = document.querySelector('.nav-logo');
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      document.body.classList.add('scrolled');
      if (navLogo) navLogo.classList.add('visible');
    } else {
      document.body.classList.remove('scrolled');
      if (navLogo) navLogo.classList.remove('visible');
    }
  });
}

// Handle theme toggle and save preference
function setupThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  });
}

// Animation für die Offer-Items beim Scrollen
const observeOffers = () => {
  const offerItems = document.querySelectorAll('.offer-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  offerItems.forEach(item => observer.observe(item));
};

// Swap SVG icons on hover
function setupHoverIcons() {
  document.querySelectorAll('.tool-item').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    const originalSrc = img.getAttribute("src");
    const hoverSrc = img.getAttribute("data-hover");

    if (hoverSrc) {
      item.addEventListener("mouseenter", () => img.src = hoverSrc);
      item.addEventListener("mouseleave", () => img.src = originalSrc);
    }
  });
}

function setupTouchTooltips() {
  const capsules = document.querySelectorAll('.tool-capsule');

  capsules.forEach((capsule) => {
    capsule.addEventListener('touchstart', () => {
      capsule.classList.add('tooltip-visible');

      // Nach 1 Sekunde Tooltip wieder ausblenden
      setTimeout(() => {
        capsule.classList.remove('tooltip-visible');
      }, 1000);
    }, { passive: true }); // verhindert Scroll-Blockierung
  });
}

// Ensure floating elements are visible
function setupFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach(element => {
    element.style.opacity = 1;
  });
}


// Reset scroll on page reload
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// Clean up hash from skip link
if (window.location.hash === "#main") {
  history.replaceState(null, null, window.location.pathname);
}


// Burger Toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});