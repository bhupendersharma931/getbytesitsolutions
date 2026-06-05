/* GetBytes — theme app.js (shared across theme builds) */

/* ====== CONTACT FORM ENDPOINT ======
   To make the contact form actually deliver messages:
   1) Create a free form at https://formspree.io
   2) Copy your form ID and paste it below (replace the placeholder).
   Until then, the form validates and shows a friendly setup message. */
var FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

(function () {
  var root = document.documentElement;

  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () { menu.classList.toggle("open"); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("open"); }); });
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("gb-theme", next); } catch (e) {}
  });

  // scroll reveal
  var els = document.querySelectorAll(".sec-head, .grid, .price-grid, .process, .split, .cta-band, .contact, .tech-grid, .stats, .bento, .svc, .glass");
  if ("IntersectionObserver" in window) {
    els.forEach(function (el) { el.setAttribute("data-reveal", ""); });
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  // contact form
  var form = document.getElementById("contactForm");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.company_website && form.company_website.value) return; // honeypot
      if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
        setStatus("Please fill in your name, email and message.", "err"); return;
      }
      if (FORM_ENDPOINT.indexOf("REPLACE_WITH_YOUR_FORM_ID") !== -1) {
        setStatus("Form is ready — add your Formspree ID in js/app.js to start receiving messages.", "ok");
        return;
      }
      setStatus("Sending…", "");
      var btn = form.querySelector('button[type=submit]'); if (btn) btn.disabled = true;
      fetch(FORM_ENDPOINT, {
        method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form)
      }).then(function (r) {
        if (r.ok) { form.reset(); setStatus("Thanks! Your message has been sent.", "ok"); }
        else { setStatus("Something went wrong. Please email us directly.", "err"); }
      }).catch(function () { setStatus("Network error. Please email us directly.", "err"); })
        .finally(function () { if (btn) btn.disabled = false; });
    });
    function setStatus(msg, cls) { if (status) { status.textContent = msg; status.className = "form-status full " + cls; } }
  }
})();
