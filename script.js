/**************************************
 * 1. Typed Text Effect in the Header *
 **************************************/
document.addEventListener("DOMContentLoaded", () => {
  const typedTextElement = document.getElementById('typed-text');
  if (!typedTextElement) {
    console.error("Element with id 'typed-text' not found!");
    return;
  }

  const texts = ["BCA Student", "Web Developer", "Tech Enthusiast"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 150; // milliseconds

  function type() {
    if (textIndex >= texts.length) {
      textIndex = 0;
    }
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex++;
        setTimeout(type, 500);
      } else {
        setTimeout(type, typingSpeed / 2);
      }
    }
  }
  console.log("Starting typed text effect...");
  type();
});

/******************************************
 * 2. Intersection Observer for Sections *
 ******************************************/
const sections = document.querySelectorAll('.section');
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

/******************************************
 * 3. Particle Animation on Canvas         *
 ******************************************/
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = 100;

// Set canvas dimensions to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Wrap around the edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = "rgba(255,153,0,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/******************************************
 * 4. Contact Form Submission (AJAX)      *
 ******************************************/
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      };
      try {
        const response = await fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById("contact-response").textContent = result.message;
        contactForm.reset();
      } catch (error) {
        console.error("Error submitting form", error);
        document.getElementById("contact-response").textContent = "There was an error. Please try again later.";
      }
    });
  }
});
