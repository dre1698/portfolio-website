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

// Füge diese Funktion zu deinem DOMContentLoaded-Event hinzu
document.addEventListener('DOMContentLoaded', function() {
  // ... dein bestehender Code
  observeProjects();
});

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
    { threshold: 0.1 } // Reaktiviert ursprüngliches Verhalten
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

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 300);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Animate logo and header based on scroll position
function setupHeaderAnimation() {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const header = document.querySelector("header h1");
    const navLogo = document.querySelector(".nav-logo");
    const subtitle = document.querySelector("header p");

    const maxScroll = 100;
    const scrollFactor = Math.min(scrollTop / maxScroll, 1);

    header.style.transform = `translate(${-300 * scrollFactor}px, ${-20 * scrollFactor}px) scale(${1 - 0.5 * scrollFactor})`;
    header.style.opacity = 1 - scrollFactor;

    subtitle.classList.toggle("scrolling-subtitle", scrollFactor > 0.25);
    navLogo.style.opacity = scrollFactor === 1 ? 1 : 0;
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

// Füge diese Funktion zu deinem DOMContentLoaded-Event hinzu
document.addEventListener('DOMContentLoaded', function() {
  // ... dein bestehender Code
  observeOffers();
});

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

// Initialization on DOM load
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initializeThemePreference();
  enableSmoothScrolling();
  setupProjectFilters();
  setupSectionFadeIn(); // ← WICHTIG: wurde wieder aktiviert!
  setupScrollSpy();
  setupScrollToTop();
  setupHeaderAnimation();
  setupThemeToggle();
  setupSkillsTabs();
  setupToolItemObserver();
  setupHoverIcons();
});

// Reset scroll on page reload
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// Clean up hash from skip link
if (window.location.hash === "#main") {
  history.replaceState(null, null, window.location.pathname);
}


