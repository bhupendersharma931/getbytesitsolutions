/* GetBytes IT Solutions — shared scripts */
(function () {
  var root = document.documentElement;

  // Mobile menu
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () { menu.classList.toggle("open"); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  // Footer year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Theme toggle (persists; safe if storage blocked)
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      var meta = document.querySelector('meta[name=theme-color]');
      if (meta) meta.setAttribute("content", next === "light" ? "#F5F8FC" : "#0B0E13");
      try { localStorage.setItem("gb-theme", next); } catch (e) {}
    });
  }

  // Contact form (front-end demo + honeypot; wire to a backend/service to receive)
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (this.company_website && this.company_website.value) return; // honeypot
      if (!this.name.value.trim() || !this.email.value.trim() || !this.message.value.trim()) {
        alert("Please fill in your name, email and message.");
        return;
      }
      alert("Thanks! Your message is ready to send. Connect this form to your backend or a service like Formspree to receive submissions.");
      this.reset();
    });
  }
})();

/* ===== v0.4.0 staging additions ===== */
(function () {
  // Staging badge
  var b = document.createElement("div");
  b.className = "staging-badge";
  b.innerHTML = '<span class="pulse"></span> STAGING · v0.4.0';
  document.body.appendChild(b);

  // Scroll-reveal on below-the-fold blocks
  var sel = ".sec-head, .grid, .grid.two, .price-grid, .process, .split, .cta-band, .contact, .tech-grid, .stats";
  var els = document.querySelectorAll(sel);
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }
  els.forEach(function (el) { el.setAttribute("data-reveal", ""); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (el) { io.observe(el); });
})();
