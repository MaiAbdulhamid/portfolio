// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(10, 10, 26, 0.95)";
  } else {
    nav.style.background = "rgba(10, 10, 26, 0.9)";
  }
});

// Tech stack hover effects
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Project card interactions
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px)";
    this.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.4)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });
});

// Form submission handler using Web3Forms
document.querySelector("#contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const button = this.querySelector("button[type='submit']");
  const originalHTML = button.innerHTML;

  // Show loading state
  button.innerHTML = "Sending... ⏳";
  button.disabled = true;

  // Get form data
  const formData = new FormData(this);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();

    if (result.success) {
      // Show success message
      button.innerHTML = "✅ Message Sent!";
      button.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

      // Reset form after delay
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = "";
        button.disabled = false;
        this.reset();
      }, 3000);
    } else {
      throw new Error(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Error:", error);

    // Show error message
    button.innerHTML = "❌ Failed to send";
    button.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";

    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = "";
      button.disabled = false;
    }, 3000);
  }
});

// Typing animation for code window
const codeLines = document.querySelectorAll(".code-line");
let currentLine = 0;

function typeNextLine() {
  if (currentLine < codeLines.length) {
    codeLines[currentLine].style.opacity = "1";
    currentLine++;
    setTimeout(typeNextLine, 500);
  } else {
    // Restart animation after delay
    setTimeout(() => {
      codeLines.forEach((line) => (line.style.opacity = "0"));
      currentLine = 0;
      setTimeout(typeNextLine, 1000);
    }, 3000);
  }
}

// Start typing animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(typeNextLine, 1000);
      heroObserver.unobserve(entry.target);
    }
  });
});

heroObserver.observe(document.querySelector(".hero"));

// Parallax effect for background shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add dynamic glow effect to buttons
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
  btn.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.style.setProperty("--mouse-x", x + "px");
    this.style.setProperty("--mouse-y", y + "px");
  });
});

// Add particle effect on tech stack items
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Create sparkle effect
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement("div");
      sparkle.style.cssText = `
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: var(--primary);
                        border-radius: 50%;
                        pointer-events: none;
                        animation: sparkle 1s ease-out forwards;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                    `;

      this.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  });
});

// Add sparkle animation
const style = document.createElement("style");
style.textContent = `
            @keyframes sparkle {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(1) rotate(180deg) translateY(-20px);
                }
            }
        `;
document.head.appendChild(style);

// Mobile menu toggle (for responsive design)
const createMobileMenu = () => {
  if (window.innerWidth <= 768) {
    const navLinks = document.querySelector(".nav-links");
    const menuBtn = document.createElement("button");
    menuBtn.innerHTML = "☰";
    menuBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: var(--text-light);
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;

    document.querySelector(".nav-container").appendChild(menuBtn);

    menuBtn.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.backgroundColor = "var(--bg-dark)";
      navLinks.style.flexDirection = "column";
      navLinks.style.padding = "1rem";
      navLinks.style.borderRadius = "0 0 12px 12px";
    });
  }
};

// Initialize mobile menu on load and resize
createMobileMenu();
window.addEventListener("resize", createMobileMenu);

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

console.log(
  "%c👋 Hello! Thanks for checking out my portfolio!",
  "color: #6366f1; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cBuilt with HTML, CSS, and JavaScript",
  "color: #61dafb; font-size: 14px;"
);
console.log(
  "%cFeel free to reach out: mai.abdelhameed95@gmail.com",
  "color: #ec4899; font-size: 14px;"
);
