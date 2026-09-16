// AGM Productions website interactions
const header = document.getElementById("header");
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

/* ---------- EmailJS ---------- */
const EMAILJS_PUBLIC_KEY = "TQCOASXKPnbZoJhAq";
const SERVICE_ID = "service_ej0u1rv";
const TEMPLATE_ID = "template_z46vir9";

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const status = document.getElementById("formStatus");

if (typeof emailjs === "undefined") {
  console.error("EmailJS SDK load nahi hui. index.html mein CDN script check karein.");
} else {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // form.name form ka apna property hai, isliye elements[] use kar rahe hain
    const templateParams = {
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim(),
      phone: form.elements["phone"].value.trim(),
      message: form.elements["message"].value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.textContent = "";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        status.textContent = "Sorry, message send nahi hua. Please try again.";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Inquiry";
      });
  });
}