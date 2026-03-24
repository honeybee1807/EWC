// Handle contact form submission
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for contacting Estcourt Waste Collectors!");
    contactForm.reset(); // optional: clears the form after submission
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
