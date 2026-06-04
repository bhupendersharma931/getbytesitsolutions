# Changelog

All notable changes to this project are recorded here.
Format: Semantic Versioning (MAJOR.MINOR.PATCH).

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
