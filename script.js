// ============================================
// COMPLETE WORKING PORTFOLIO JAVASCRIPT (FIXED)
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

// Mobile Navigation
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.classList.remove("open");
    navMenu?.classList.remove("open");
  });
});

// Smooth scroll
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
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

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 90;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((el) =>
        el.classList.remove("active-link")
      );

      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      active?.classList.add("active-link");
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

  function typeLoop() {
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
  typeLoop();
}

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));

// Skill bars
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
  { threshold: 0.4 }
);

document.querySelectorAll(".skill-bar span").forEach((span) => {
  skillObserver.observe(span);
});

// Contact form validation
const contactForm = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    successMsg && (successMsg.style.display = "none");

    const fields = [
      { id: "name", message: "Name is required" },
      { id: "email", message: "Valid email is required", type: "email" },
      { id: "message", message: "Please enter a message" },
    ];

    fields.forEach((field) => {
      const input = contactForm.querySelector(`#${field.id}`);
      if (!input) return;

      const error = input.closest(".input-group")?.querySelector(".error-msg");
      error && (error.textContent = "");

      if (!input.value.trim()) {
        error && (error.textContent = field.message);
        isValid = false;
      } else if (field.type === "email") {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(input.value.trim())) {
          error && (error.textContent = "Please enter a valid email address");
          isValid = false;
        }
      }
    });

    if (!isValid) return;

    contactForm.reset();
    if (successMsg) {
      successMsg.style.display = "block";
      successMsg.style.opacity = 0;
      successMsg.style.transform = "translateY(8px)";
      requestAnimationFrame(() => {
        successMsg.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        successMsg.style.opacity = 1;
        successMsg.style.transform = "translateY(0)";
      });
      setTimeout(() => (successMsg.style.opacity = 0), 2600);
    }
  });
}

// Ripple effect
document.querySelectorAll(".ripple").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.background = "rgba(255,255,255,0.6)";
    circle.style.transform = "scale(0)";
    circle.style.opacity = "1";
    circle.style.pointerEvents = "none";
    circle.style.transition = "transform 0.6s, opacity 0.6s";

    this.style.overflow = "hidden";
    this.style.position = "relative";
    this.appendChild(circle);

    requestAnimationFrame(() => {
      circle.style.transform = "scale(1)";
      circle.style.opacity = "0";
    });

    setTimeout(() => circle.remove(), 600);
  });
});

// Back to top
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
currentYearEl && (currentYearEl.textContent = new Date().getFullYear());

// Page loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 600);
    }, 800);
  }
});
