// Handle contact form submission
const contactForm = document.querySelector("form"); // adjust selector if needed
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

// Impact counter animation
const counter = document.querySelector("#impact-counter");
if (counter) {
  let count = 0;
  const target = 10000;
  const speed = 50;

  const updateCounter = () => {
    if (count < target) {
      count += 100;
      counter.textContent = `Over ${count.toLocaleString()} tons recycled since 2010.`;
      setTimeout(updateCounter, speed);
    }
  };

  updateCounter();
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

anime({
  targets: 'h1',
  color: '#2e7d32',
  duration: 2000
});

gsap.from('h1', { duration: 1, opacity: 0, y: -50 });

// Pulse animation
gsap.to(".cta-quote", {
  scale: 1.1,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

