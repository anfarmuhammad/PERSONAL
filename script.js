// ============================================
// COMPLETE WORKING PORTFOLIO JAVASCRIPT (RESPONSIVE)
// ============================================

(function () {
  // Theme toggle with localStorage and smooth transition
  const html = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  const userTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (userTheme) {
    html.setAttribute("data-theme", userTheme);
  } else {
    html.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
  }

  toggleBtn?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    html.classList.add("theme-transition");
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    setTimeout(() => {
      html.classList.remove("theme-transition");
    }, 400);
  });
})();

// Mobile Navigation with improved touch handling
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
    document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove("open");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      navToggle.classList.remove("open");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.classList.remove("open");
    navMenu?.classList.remove("open");
    document.body.style.overflow = "";
    
    // Smooth scroll to section
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  if (anchor.getAttribute("href") !== "#") {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  }
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  let current = "";

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
});

// Hero typing animation
const typedElement = document.getElementById("typed-text");
if (typedElement) {
  const roles = ["Frontend Developer", "MERN Developer", "UI-Focused Engineer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeLoop() {
    if (isPaused) return;
    
    const current = roles[roleIndex];
    const speed = isDeleting ? 60 : 120;

    if (!isDeleting) {
      typedElement.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      typedElement.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, speed);
  }
  
  // Pause typing when tab is not visible
  document.addEventListener("visibilitychange", () => {
    isPaused = document.hidden;
    if (!isPaused && !typedElement.textContent) {
      typeLoop();
    }
  });
  
  typeLoop();
}

// Scroll reveal with improved mobile performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));

// Skill bars animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.dataset.value || 80;
        bar.style.width = `${value}%`;
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-bar span").forEach((span) => {
  skillObserver.observe(span);
});

// Contact form validation with improved UX
const contactForm = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    if (successMsg) {
      successMsg.style.display = "none";
      successMsg.style.opacity = "0";
    }

    const fields = [
      { id: "name", message: "Name is required" },
      { id: "email", message: "Valid email is required", type: "email" },
      { id: "message", message: "Please enter a message" },
    ];

    fields.forEach((field) => {
      const input = contactForm.querySelector(`#${field.id}`);
      if (!input) return;

      const error = input.closest(".input-group")?.querySelector(".error-msg");
      if (error) error.textContent = "";

      if (!input.value.trim()) {
        if (error) error.textContent = field.message;
        isValid = false;
        input.style.borderColor = "#f97373";
      } else if (field.type === "email") {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(input.value.trim())) {
          if (error) error.textContent = "Please enter a valid email address";
          isValid = false;
          input.style.borderColor = "#f97373";
        } else {
          input.style.borderColor = "";
        }
      } else {
        input.style.borderColor = "";
      }
    });

    if (!isValid) return;

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    if (successMsg) {
      successMsg.style.display = "block";
      successMsg.style.opacity = "0";
      successMsg.style.transform = "translateY(8px)";
      
      requestAnimationFrame(() => {
        successMsg.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        successMsg.style.opacity = "1";
        successMsg.style.transform = "translateY(0)";
      });

      setTimeout(() => {
        successMsg.style.opacity = "0";
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 600);
      }, 3000);
    }
  });
}

// Ripple effect with touch support
document.querySelectorAll(".ripple").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Get click/touch position
    let clientX, clientY;
    if (e.type.includes("touch")) {
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = this.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${clientX - rect.left - radius}px`;
    circle.style.top = `${clientY - rect.top - radius}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.background = "rgba(255, 255, 255, 0.6)";
    circle.style.transform = "scale(0)";
    circle.style.opacity = "1";
    circle.style.pointerEvents = "none";
    circle.style.transition = "transform 0.6s, opacity 0.6s";
    circle.style.zIndex = "1";

    this.style.overflow = "hidden";
    this.style.position = "relative";
    this.appendChild(circle);

    requestAnimationFrame(() => {
      circle.style.transform = "scale(1)";
      circle.style.opacity = "0";
    });

    setTimeout(() => circle.remove(), 600);
  });

  // Add touch event for mobile
  btn.addEventListener("touchstart", function (e) {
    this.style.transform = "scale(0.98)";
  }, { passive: true });

  btn.addEventListener("touchend", function () {
    this.style.transform = "";
  }, { passive: true });
});

// Back to top with smooth scroll
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("visible", window.scrollY > 400);
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Current year
const currentYearEl = document.getElementById("current-year");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Page loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        document.body.style.overflow = "";
      }, 600);
    }, 800);
  }
});

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resizing");
  clearTimeout(resizeTimer);
  
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resizing");
    
    // Close mobile menu on large screens
    if (window.innerWidth > 992 && navMenu?.classList.contains("open")) {
      navToggle?.classList.remove("open");
      navMenu?.classList.remove("open");
      document.body.style.overflow = "";
    }
  }, 250);
});

// Add CSS for resizing state
const style = document.createElement('style');
style.textContent = `
  .resizing * {
    transition: none !important;
  }
`;
document.head.appendChild(style);
