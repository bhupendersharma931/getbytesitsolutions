/* GetBytes — theme app.js (shared) */

/* ====== CONFIG ====== */
/* Contact form: create a free form at https://formspree.io and paste its ID below. */
var FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";
/* WhatsApp: put your number in international format, digits only (e.g. 9198XXXXXXXX). */
var WHATSAPP_NUMBER = "919999999999";

(function () {
  var root = document.documentElement;
  var mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  // mobile menu
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () { menu.classList.toggle("open"); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("open"); }); });
  }

  // year
  var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  // theme: explicit light/dark pin, otherwise auto-follow system (live)
  function stored(){ try { return localStorage.getItem("gb-theme"); } catch (e) { return null; } }
  function applyAuto(){ if (!stored() && mql) root.setAttribute("data-theme", mql.matches ? "dark" : "light"); }
  if (mql) { (mql.addEventListener ? mql.addEventListener("change", applyAuto) : mql.addListener && mql.addListener(applyAuto)); }
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("gb-theme", next); } catch (e) {}
  });

  // scroll reveal
  var rev = document.querySelectorAll(".sec-head, .grid, .price-grid, .process, .split, .cta-band, .contact, .tech-grid, .stats, .bento, .svc, .glass, .tgrid, .faq, .work-grid");
  if ("IntersectionObserver" in window) {
    rev.forEach(function (el){ el.setAttribute("data-reveal",""); });
    var io = new IntersectionObserver(function (en){ en.forEach(function (e){ if (e.isIntersecting){ e.target.classList.add("in-view"); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    rev.forEach(function (el){ io.observe(el); });
  }

  // animated counters (.num[data-count])
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (en){
      en.forEach(function (e){
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix") || "";
        var dec = (target % 1 !== 0) ? 1 : 0, start = null, dur = 1200;
        function step(ts){ if (!start) start = ts; var p = Math.min((ts - start) / dur, 1);
          el.textContent = (target * (0.2 + 0.8 * p)).toFixed(dec) * 1 + suf;
          if (p < 1) requestAnimationFrame(step); else el.textContent = (dec ? target.toFixed(1) : target) + suf; }
        requestAnimationFrame(step); cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el){ cio.observe(el); });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(function (q){
    q.addEventListener("click", function (){ this.parentNode.classList.toggle("open"); });
  });

  // Portfolio filter
  var fbtns = document.querySelectorAll(".filterbar button");
  if (fbtns.length) {
    fbtns.forEach(function (b){
      b.addEventListener("click", function (){
        fbtns.forEach(function (x){ x.classList.remove("active"); }); this.classList.add("active");
        var f = this.getAttribute("data-filter");
        document.querySelectorAll(".work-card").forEach(function (c){
          c.classList.toggle("hide", !(f === "all" || c.getAttribute("data-cat") === f));
        });
      });
    });
  }

  // WhatsApp floating button
  if (WHATSAPP_NUMBER && WHATSAPP_NUMBER.indexOf("9999999999") === -1) {
    var wa = document.createElement("a");
    wa.className = "wa-fab"; wa.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hi GetBytes, I'd like to discuss a project.");
    wa.target = "_blank"; wa.rel = "noopener noreferrer"; wa.setAttribute("aria-label","Chat on WhatsApp");
    wa.innerHTML = '<svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
    document.body.appendChild(wa);
  }

  // contact form
  var form = document.getElementById("contactForm");
  if (form) {
    var status = form.querySelector(".form-status");
    function setStatus(m,c){ if (status){ status.textContent = m; status.className = "form-status full " + (c||""); } }
    form.addEventListener("submit", function (e){
      e.preventDefault();
      if (form.company_website && form.company_website.value) return;
      if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()){ setStatus("Please fill in your name, email and message.","err"); return; }
      if (FORM_ENDPOINT.indexOf("REPLACE_WITH_YOUR_FORM_ID") !== -1){ setStatus("Form is ready — add your Formspree ID in js/app.js to receive messages.","ok"); return; }
      setStatus("Sending…","");
      var btn = form.querySelector('button[type=submit]'); if (btn) btn.disabled = true;
      fetch(FORM_ENDPOINT, { method:"POST", headers:{Accept:"application/json"}, body:new FormData(form) })
        .then(function (r){ if (r.ok){ form.reset(); setStatus("Thanks! Your message has been sent.","ok"); } else setStatus("Something went wrong. Please email us directly.","err"); })
        .catch(function (){ setStatus("Network error. Please email us directly.","err"); })
        .finally(function (){ if (btn) btn.disabled = false; });
    });
  }

  // PWA
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function (){ navigator.serviceWorker.register("sw.js").catch(function (){}); });
  }
})();
