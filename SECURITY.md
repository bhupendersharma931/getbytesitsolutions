# Security Notes & Recommendations

This site is static HTML, so its attack surface is small. The items below keep it that way.

## Server-side headers (configure on host / IIS web.config / .htaccess)
- Content-Security-Policy (restrict scripts/styles/fonts to self + fonts.googleapis.com/gstatic.com)
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- X-Frame-Options: SAMEORIGIN  (clickjacking)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=()

## TLS / Mail
- Serve everything over HTTPS; redirect HTTP -> HTTPS.
- Do NOT expose the raw server IP + cPanel port (e.g. https://103.108.220.91:2096/).
  Use a hostname like https://webmail.getbytesitsolutions.com with a valid certificate.

## Contact form
- Client-side validation + honeypot are included, but are NOT a substitute for server checks.
- On the backend: validate/sanitize all input, add rate limiting, and a CAPTCHA or
  server-verified token if spam appears. Never trust client data.

## General
- Keep no secrets/API keys in client-side code.
- Keep server software, CMS and plugins patched.
- Enable automated backups.
