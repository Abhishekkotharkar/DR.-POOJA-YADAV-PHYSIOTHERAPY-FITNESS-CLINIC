const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll(".section-reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const form = document.querySelector("#appointment-form");
const status = document.querySelector(".form-status");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const honeypot = String(formData.get("website") || "");

    if (honeypot.trim()) {
      status.textContent = "Unable to submit this request.";
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete the required fields.";
      return;
    }

    const name = encodeURIComponent(String(formData.get("name") || ""));
    const phone = encodeURIComponent(String(formData.get("phone") || ""));
    const date = encodeURIComponent(String(formData.get("date") || ""));
    const time = encodeURIComponent(String(formData.get("time") || ""));
    const concern = encodeURIComponent(String(formData.get("concern") || ""));
    const message = encodeURIComponent(String(formData.get("message") || ""));
    const text = `Hello%2C%20I%20would%20like%20to%20request%20an%20appointment.%0AName%3A%20${name}%0APhone%3A%20${phone}%0APreferred%20Date%3A%20${date}%0APreferred%20Time%3A%20${time}%0AMain%20Concern%3A%20${concern}%0AMessage%3A%20${message}`;

    status.textContent = "Opening WhatsApp with your appointment request. The clinic will confirm availability.";
    window.open(`https://wa.me/919136390413?text=${text}`, "_blank", "noopener");
    form.reset();
  });
}
