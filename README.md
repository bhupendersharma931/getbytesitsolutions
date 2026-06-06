# GetBytes IT Solutions — Website

Redeveloped marketing website for GetBytes IT Solutions (Delhi-based software, web & mobile development company).

## Stack
- Plain HTML5 + modern CSS + vanilla JavaScript
- No build step, no dependencies — deploys to any host (IIS, Apache, Nginx, static hosts)
- Fully responsive / device-adaptive, accessible, SEO-clean
- Original design (no third-party/copyrighted templates). Fonts via Google Fonts (Open Font License).

## Structure (production = Terminal theme)
- Pages: index, services, service-web/mobile/seo/hosting, work, blog, blog-post, quote, package, about, contact
- `css/style.css` — stylesheet
- `js/app.js` — scripts (theme toggle, menu, counters, FAQ, portfolio filter, WhatsApp, quote calc, PWA, contact form)
- `assets/` — logo, favicon, og-image
- `manifest.json`, `sw.js` — PWA;  `robots.txt`, `sitemap.xml` — SEO
- `CHANGELOG.md` — revision history / notes;  `SECURITY.md` — hardening notes

## Personalise before going public
- `js/app.js`: set `WHATSAPP_NUMBER` and `FORM_ENDPOINT` (Formspree)
- Replace placeholder prices (package.html), portfolio items (work.html), blog content

## Status
- Live: Terminal theme, single production version. Earlier theme options preserved in git tags v0.5.0–v0.9.0.

## Roadmap
- [x] Homepage design (v0.1.0–v0.2.0)
- [x] Services, Package, About, Contact pages (v0.3.0)
- [ ] Replace placeholder prices on package.html with real figures
- [ ] Wire contact form to backend / form service
- [ ] Apply security headers on the server
