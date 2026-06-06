/* GetBytes content loader — reads content/settings.json and applies editable values.
   Pages stay fully static if this file or the JSON is absent (graceful). */
(function () {
  fetch("content/settings.json", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (s) {
      if (!s) return;

      // email — update all mailto links + their visible text if it is an email
      if (s.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
          a.href = "mailto:" + s.email;
          if (/@/.test(a.textContent)) a.textContent = s.email;
        });
      }
      // social links by aria-label
      if (s.social) {
        var map = { linkedin: "LinkedIn", facebook: "Facebook", twitter: "Twitter" };
        Object.keys(map).forEach(function (key) {
          if (!s.social[key]) return;
          document.querySelectorAll('a[aria-label="' + map[key] + '"]').forEach(function (a) { a.href = s.social[key]; });
        });
      }
      // prices by data-price attribute
      if (s.prices) {
        document.querySelectorAll("[data-price]").forEach(function (el) {
          var key = el.getAttribute("data-price");
          if (s.prices[key]) {
            // preserve any trailing <small> markup
            var small = el.querySelector("small");
            el.firstChild ? (el.childNodes[0].nodeValue = s.prices[key]) : (el.textContent = s.prices[key]);
            if (small) el.appendChild(small);
          }
        });
      }
      // expose for assistant/whatsapp if needed
      window.GB_SETTINGS = s;
    })
    .catch(function () { /* stay static */ });
})();
