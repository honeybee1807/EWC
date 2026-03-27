// Handle contact form submission
const contactForm = document.querySelector("form"); 
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for contacting Estcourt Waste Collectors!");
    contactForm.reset();
  });
}

// Impact slider functionality
const impactText = document.querySelector("#impact p");
const messages = [
  "We recycle thousands of tons annually, reducing landfill waste.",
  "Our salvaged goods program provides affordable items for families.",
  "Chicory and agricultural by-products are repurposed sustainably."
];

let currentIndex = 0;
const updateImpactText = () => {
  if (impactText) {
    impactText.textContent = messages[currentIndex];
  }
};

document.querySelectorAll("#impact .arrow").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    if (arrow.classList.contains("left")) {
      currentIndex = (currentIndex - 1 + messages.length) % messages.length;
    } else {
      currentIndex = (currentIndex + 1) % messages.length;
    }
    updateImpactText();
  });
});

// Impact counter animation (GSAP version)
const counter = document.querySelector("#impact-counter");
if (counter) {
  gsap.fromTo(counter, 
    { innerText: 0 }, 
    {
      innerText: 10000,
      duration: 3,
      ease: "power1.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        counter.textContent = `Over ${Math.floor(counter.innerText).toLocaleString()} tons recycled since 2010.`;
      },
      scrollTrigger: {
        trigger: "#impact-counter",
        start: "top 80%",
      }
    }
  );
}

// Call-to-action button
const ctaButton = document.querySelector("#cta button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    alert("Thank you for joining our mission! Together we can build a cleaner Estcourt.");
  });
}

// Smooth scroll for navigation links
document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// WhatsApp Help Center button
const whatsappBtn = document.querySelector(".whatsapp-btn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    window.open("https://wa.me/27828497869", "_blank"); 
  });
}

// Highlight seasonal stock dynamically
const seasonalSection = document.querySelector("#seasonal p");
if (seasonalSection) {
  const seasonalItems = ["Garden Tools", "Harvest Chicory", "Winter Clothing"];
  seasonalSection.textContent += ` Current highlights: ${seasonalItems.join(", ")}.`;
}

/* ============================
   GSAP Cinematic Animations
   ============================ */
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.from(".hero-text h1", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero-text p", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
gsap.from(".hero-buttons a", { opacity: 0, scale: 0.8, stagger: 0.2, duration: 0.8, delay: 1 });
gsap.from(".hero-image img", { opacity: 0, x: 100, duration: 1.2, delay: 0.8 });

// About section
gsap.from("#about .about-text", {
  scrollTrigger: "#about",
  opacity: 0,
  x: -100,
  duration: 1
});
gsap.from("#about .about-image img", {
  scrollTrigger: "#about",
  opacity: 0,
  x: 100,
  duration: 1
});

// Trust bar
gsap.from(".trust-bar li", {
  scrollTrigger: ".trust-bar",
  opacity: 0,
  y: 30,
  stagger: 0.2,
  duration: 0.8
});

// Why Choose section
gsap.from("#why-choose h2", {
  scrollTrigger: "#why-choose",
  opacity: 0,
  y: -50,
  duration: 1
});
gsap.from(".feature-card", {
  scrollTrigger: ".features-grid",
  opacity: 0,
  scale: 0.8,
  stagger: 0.2,
  duration: 0.8
});

// Testimonials section
gsap.from("#testimonials h2", {
  scrollTrigger: "#testimonials",
  opacity: 0,
  y: -50,
  duration: 1
});
gsap.from(".overall-rating", {
  scrollTrigger: "#testimonials",
  opacity: 0,
  scale: 0.9,
  duration: 1
});
gsap.from(".review-card", {
  scrollTrigger: ".reviews-grid",
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 0.8
});
gsap.from(".reviews-cta", {
  scrollTrigger: ".reviews-cta",
  opacity: 0,
  y: 30,
  duration: 1
});

// Footer
gsap.from("footer .footer-column", {
  scrollTrigger: "footer",
  opacity: 0,
  y: 50,
  stagger: 0.3,
  duration: 1
});
gsap.from("footer .footer-bottom", {
  scrollTrigger: "footer",
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5
});

// Pulse animation for CTA quote or button
gsap.to(".cta-quote, #cta button", {
  scale: 1.05,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});
