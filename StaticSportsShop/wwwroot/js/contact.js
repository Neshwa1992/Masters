(function () {
  if (window.emailjs) emailjs.init("K--dGGiWWGc6Rykkk");
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  const btn = form.querySelector("button[type=submit]");
  const show = (ok, text) => {
    status.className = "alert alert-" + (ok ? "success" : "danger");
    status.textContent = text;
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = form.elements;
    if (f.website.value) { show(true, "Thank you! Your message has been sent."); form.reset(); return; } // honeypot
    btn.disabled = true;
    btn.textContent = "Sending...";
    emailjs.send("service_7y0o8vc", "template_sms12t3", {
      name: f.name.value, email: f.email.value, phone: f.phone.value, message: f.message.value
    })
      .then(() => { show(true, "Thank you! Your message has been sent. We will get back to you soon."); form.reset(); })
      .catch(err => { console.error("EmailJS error:", err); show(false, "Sorry, we could not send your message. Please call or WhatsApp us instead."); })
      .finally(() => { btn.disabled = false; btn.textContent = "Send message"; });
  });
})();
