# Changelog

All notable changes to this project are recorded here.
Format: Semantic Versioning (MAJOR.MINOR.PATCH).

## [v1.1.0] — AI assistant + self-contained CMS
### Added
- AI assistant chat widget (js/assistant.js) on every page. Works now with smart scripted
  answers (services, pricing, tech, contact) and NO backend; upgrade to real Claude AI by
  setting ASSISTANT_ENDPOINT and deploying the proxy in /backend.
- backend/assistant-aspnet.cs — ASP.NET Core 8 proxy that calls Anthropic with a server-side
  key and a GetBytes system prompt (front-end posts {message,history}, gets {reply}).
- Self-contained CMS:
  - content/settings.json — editable company info, contact, socials, prices, integrations.
  - js/content.js — applies settings.json to pages (emails, social links, prices).
  - admin/ — password/token-protected editor that commits settings.json to the repo via the
    GitHub API (fine-grained token, Contents: read & write). No external OAuth service needed.
  - package.html prices tagged with data-price so the CMS controls them.
### Notes
- A live AI demo (Claude-powered) was shared separately; it requires the backend to run on
  the public site (an API key must never sit in client-side code).
## [v1.0.0] — Production launch (Terminal theme live at root)
### Changed
- Promoted the Terminal / Code-Editor theme to the production root. The live site at
  https://bhupendersharma931.github.io/getbytesitsolutions/ now serves this theme.
- All canonical/OG/sitemap URLs repointed to the root domain.
- Root shared assets updated: css/style.css, js/app.js, assets/ (logo, favicon, og-image),
  manifest.json, sw.js, robots.txt, sitemap.xml.
- Removed obsolete early-version files (css/styles.css, js/main.js).
### Site (13 pages)
- Home, Services (+ Web/Mobile/SEO/Hosting detail pages), Work (portfolio),
  Blog (+ post), Quote calculator, Packages, About, Contact.
### Features
- Dark/light (auto) theme, testimonials, FAQ, animated counters, WhatsApp button,
  SEO pack (OG/Twitter/JSON-LD), favicon + social image, PWA (installable/offline).
### Notes
- The alternative themes remain under /themes/ as archived options and can be deleted anytime.
- To personalise: set WHATSAPP_NUMBER and FORM_ENDPOINT in js/app.js; replace placeholder
  prices (package.html), portfolio items (work.html) and blog content.

## [v0.9.0] — New unique theme: Terminal / Code-Editor
### Added
- themes/terminal/ — a fresh, original developer/IDE aesthetic (not derived from any
  existing theme): syntax-highlighted code-editor hero, live terminal prompt,
  "// comment" section labels, monospace UI chrome. Outfit + JetBrains Mono.
- Dark (default) and light (VS Code-style) modes; brand red/blue used as syntax colors.
- Full 13-page site with the complete feature set (testimonials, FAQ, portfolio,
  blog, quote calculator, animated counters, WhatsApp, SEO pack, favicon/OG, PWA).
### Notes
- Six themes total now: Bento, Aurora, Editorial, Brutalist, Minimal, Terminal.

## [v0.8.0] — Minimal theme + functional pages (service pages, blog, quote calculator)
### Added
- New theme: themes/minimal/ — clean Swiss-style look (Manrope + Space Mono, lots of whitespace).
- Service detail pages on every theme: service-web, service-mobile, service-seo, service-hosting
  (linked from the Services page "Deep dive" section).
- Blog on every theme: blog.html (listing) + blog-post.html (sample article).
- Interactive quote calculator (quote.html): pick project type, size and add-ons for a live
  estimate; linked from the Packages page.
### Notes
- Every theme now has 13 pages and the full feature set (dark/light, testimonials, FAQ,
  portfolio, animated counters, WhatsApp, SEO pack, favicon/OG, PWA).
- Five themes total: Bento, Aurora, Editorial, Brutalist, Minimal.
- Blog posts, portfolio items and prices are placeholders to replace with real content.

## [v0.7.0] — New Brutalist theme + full feature set on all themes
### Added
- New theme: themes/brutalist/ — bold neo-brutalist look (Archivo + Space Mono,
  hard shadows, thick borders), full 6-page site.
- New page on every theme: work.html — filterable portfolio (Web / Mobile / ERP).
- Testimonials section + FAQ accordion on every homepage.
- Animated stat counters (count up on scroll).
- WhatsApp floating chat button (set WHATSAPP_NUMBER in js/app.js to enable).
- Auto theme mode: follows the visitor's device setting until they pick light/dark.
- SEO pack on every page: Open Graph + Twitter cards + JSON-LD LocalBusiness,
  plus per-theme robots.txt and sitemap.xml.
- Favicon + social share image (assets/favicon.png, assets/og-image.png) from the logo.
- PWA on every theme: manifest.json + service worker (installable, works offline).
### Notes
- All four themes (Bento, Aurora, Editorial, Brutalist) now share this feature set.
- Portfolio items and package prices are placeholders — replace with real content.

## [v0.6.0] — Three complete theme websites (Bento / Aurora / Editorial)
### Added
- Full 5-page sites for each theme (index, services, package, about, contact):
  - themes/bento/    — light modern-SaaS bento look (Plus Jakarta Sans)
  - themes/aurora/   — animated red/blue gradient + glassmorphism (Sora)
  - themes/editorial/— bold editorial/Swiss, serif headlines (Fraunces + Hanken)
- Dark/light toggle on ALL three themes (remembers choice; sensible default per theme).
- Functional contact form (Formspree-ready): validation + honeypot + async submit
  with success/error status. Add your Formspree ID in each theme's js/app.js.
- Per-theme shared CSS (css/style.css) + JS (js/app.js) + logo; scroll-reveal animations.
### Notes
- Each theme is independent and live-testable at its own Pages sub-path.
- Package prices remain placeholders — update to real figures.
- Production root is unchanged; pick a theme and it will be promoted to root.

## [v0.5.0] — Alternative design directions (theme options)
### Added
- /themes/bento/ — Option A: light modern-SaaS look with a bento tile grid (Plus Jakarta Sans).
- /themes/aurora/ — Option B: dark theme with animated red/blue aurora gradients and glassmorphism (Sora).
- /themes/editorial/ — Option C: bold editorial/Swiss layout, oversized serif headlines (Fraunces + Hanken).
- Each is a self-contained, live-testable homepage demo at its own Pages sub-path.
### Purpose
- Design exploration. Once a direction is chosen, it will be built out across all pages.

## [v0.4.0] — Live staging folder + scroll animations
### Added
- /v0.4.0/ folder: a full, independent copy of the site for live testing on
  GitHub Pages at .../getbytesitsolutions/v0.4.0/ — production root stays stable.
- Scroll-reveal animations (IntersectionObserver) on below-the-fold sections;
  respects prefers-reduced-motion.
- Visible "STAGING · v0.4.0" badge so the test build is distinguishable from prod.
### Workflow
- Develop & test in the versioned folder; once approved, promote to root.

## [v0.3.1] — GitHub Pages support
### Added
- .nojekyll so GitHub Pages serves the static files as-is (no Jekyll processing).
### Notes
- All asset paths are relative, so the site works correctly when served from a
  project sub-path like https://<user>.github.io/getbytesitsolutions/.

## [v0.3.0] — Inner pages + shared design system
### Added
- New pages: services.html, package.html, about.html, contact.html.
- Services page: detailed service cards + 4-step process section.
- Packages page: 3-tier pricing (Starter / Business / Enterprise).
  NOTE: prices are placeholders — update to your real figures.
- About page: company story, why-us panel, stats.
- Contact page: contact form + contact info (email, webmail, location, socials).
### Changed
- Refactored shared CSS into css/styles.css and JS into js/main.js (no more
  duplicated code across pages); logo moved to assets/logo.png.
- index.html now uses the shared stylesheet/script and links to real pages.
- Global nav links to actual pages with an active-page indicator.

## [v0.2.0] — Brand colors + dark/light mode
### Added
- Embedded the official GetBytes logo (red/blue) in header and footer.
- Dark + Light theme with a toggle button; remembers choice (localStorage,
  falls back to OS preference); no flash of wrong theme on load.
### Changed
- Re-themed the entire palette around the logo: red (#D8261A) as the primary
  action color, light blue (#A8D8F0 / #3B9BD6) as the supporting accent.
- Red->blue gradient accents on headline, stats and card hover borders (echoes G->B).
- Logo shown on a white plate in dark mode for legibility.

## [v0.1.0] — Initial homepage redesign
### Added
- Brand-new, original responsive homepage (`index.html`).
- Dark "engineering" aesthetic: ink background, amber accent, blueprint-grid texture.
- Sections: hero (animated), services, technologies, about, contact form, footer.
- Mobile navigation toggle; staggered load animations; hover micro-interactions.
- Contact form with client-side validation + honeypot anti-spam field.

### Fixed (vs. old site)
- Corrected heading typos ("about usA", "TechnologiesT", "Trainning", etc.).
- Removed keyword-stuffed meta tags and competitor name from metadata.
- Replaced oversized SEO title with a concise, descriptive one.
- Removed end-of-life AngularJS from the tech list; added current stack.
- Replaced exposed raw-IP webmail link (https://103.108.220.91:2096/)
  with https://webmail.getbytesitsolutions.com.
- All external links now use rel="noopener noreferrer".
