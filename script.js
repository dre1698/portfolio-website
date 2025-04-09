// Smooth Scrolling for Navigation Links
// --------------------------------------
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Run scripts after DOM is fully loaded
  // --------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    const faders = document.querySelectorAll('.fade-in-section');
    lucide.createIcons();
  
    // Fade-in animation for sections using IntersectionObserver
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  
    // Highlight active navigation link while scrolling
    window.addEventListener("scroll", () => {
      let current = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
  
        if (pageYOffset >= sectionTop - 120) {
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
  
    // Toggle visibility of Scroll-to-Top Button
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    });
  
    // Scroll to top when button is clicked
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    let lastScrollTop = 0;
    let isScrolling;
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const header = document.querySelector("header h1");
        const navLogo = document.querySelector(".nav-logo");
        const subtitle = document.querySelector("header p");
      
        // Logo transition based on scroll distance (0–100px)
        const maxScroll = 100;
        const scrollFactor = Math.min(scrollTop / maxScroll, 1); // clamps to 0–1
      
        const translateX = -300 * scrollFactor;
        const translateY = -20 * scrollFactor;
        const scale = 1 - 0.5 * scrollFactor;
        const opacity = 1 - scrollFactor;
      
        // Apply transform to big logo
        header.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        header.style.opacity = opacity;
        subtitle.classList.toggle("scrolling-subtitle", scrollFactor > 0.25);
      
        // Show nav logo when fully scrolled
        navLogo.style.opacity = scrollFactor === 1 ? 1 : 0;
      });

      const themeToggle = document.querySelector('.theme-toggle');

// Check saved theme preference on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

// Toggle theme + save preference
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem("theme", currentTheme);
});

// Tab functionality for skills section
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    // Toggle active button
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Toggle active content
    tabContents.forEach(content => {
      content.classList.remove("active");
      if (content.id === tabId) {
        content.classList.add("active");
      }
    });
  });
});
  });

// Always reset scroll on page refresh (even if #main is present)
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// Optional: clean up the URL if user used the skip link
if (window.location.hash === "#main") {
  history.replaceState(null, null, window.location.pathname);
}