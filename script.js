// Hauptinitialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  // Icons initialisieren (sofern Lucide verfügbar)
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
  
  // Theme & Benutzeroberfläche
  initializeThemePreference();
  setupThemeToggle();
  setupScrollToTop();
  
  // Navigation & Scrolling
  initHeaderAnimation();
  enableSmoothScrolling();
  setupScrollSpy();
  setupMobileNavigation(); // Neue Funktion für das Burger-Menü
  
  // Animationen & Effekte
  setupSectionFadeIn();
  setupFloatingElements();
  observeProjects();
  observeOffers();
  
  // Interaktionen
  setupProjectFilters();
  setupHoverIcons();
  setupTouchTooltips();
});

// =======================================
// THEME & BENUTZEROBERFLÄCHE
// =======================================

// Dark Mode Einstellungen laden
function initializeThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Theme-Toggle Funktionalität
function setupThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  });
}

// Scroll-to-Top Button
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

// =======================================
// NAVIGATION & SCROLLING
// =======================================

// Header-Animation beim Scrollen
function initHeaderAnimation() {
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

// Smooth Scrolling für interne Links
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

// Aktiven Navigationslink beim Scrollen aktualisieren
function setupScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
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

// Mobile Navigation (Burger Menu)
function setupMobileNavigation() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('nav ul');
  
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Menü schließen, wenn ein Link geklickt wird
    document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Menü schließen, wenn außerhalb geklickt wird
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
}

// =======================================
// ANIMATIONEN & EFFEKTE
// =======================================

// Fade-In-Effekt für Sektionen
function setupSectionFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in-section").forEach((el) => {
    observer.observe(el);
  });
}

// Floating-Elemente sichtbar machen
function setupFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach(element => {
    element.style.opacity = 1;
  });
}

// Projekt-Karten animieren
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

// Angebots-Elemente animieren
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

// =======================================
// INTERAKTIONEN
// =======================================

// Projekt-Filter
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

// SVG-Icons bei Hover wechseln
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

// Touch-Tooltips für mobile Geräte
function setupTouchTooltips() {
  const capsules = document.querySelectorAll('.tool-capsule');
  
  // Vorhandenen Tooltip-Overlay erstellen
  const overlay = document.createElement('div');
  overlay.classList.add('tooltip-overlay');
  document.body.appendChild(overlay);

  capsules.forEach((capsule) => {
    capsule.addEventListener('click', () => {
      // Alle anderen Tooltips schließen
      capsules.forEach(otherCapsule => {
        if (otherCapsule !== capsule) {
          otherCapsule.classList.remove('tapped');
        }
      });
      
      // Aktuellen Tooltip umschalten
      capsule.classList.toggle('tapped');
      overlay.classList.toggle('active');
    });
  });
  
  // Overlay zum Schließen aller Tooltips
  overlay.addEventListener('click', () => {
    capsules.forEach(capsule => capsule.classList.remove('tapped'));
    overlay.classList.remove('active');
  });
}

// =======================================
// HILFSFUNKTIONEN
// =======================================

// Scroll zurücksetzen beim Neuladen
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// Hash von Skip-Link bereinigen
if (window.location.hash === "#main") {
  history.replaceState(null, null, window.location.pathname);
}

