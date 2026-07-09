# DeyaAldeen.com

One-page marketing site for **DeyaAldeen AlSoub**, a finance process automation
consultant in the MENA region. Live at [www.DeyaAldeen.com](https://www.DeyaAldeen.com).

Plain HTML + CSS + vanilla JS — no build tools, no framework, no CDN JavaScript.
Google Fonts is the only external request. Hosted on GitHub Pages.

## Run locally

```bash
python -m http.server 8000    # then open http://localhost:8000
```

Test both `index.html` and `privacy.html`.

## Deploy

GitHub Pages auto-builds on push to `main`:

```bash
git push origin main
```

The custom domain is set by `CNAME` (`www.deyaaldeen.com`).

## Structure

```
index.html     Landing page (the whole site)
privacy.html   Privacy page, linked from the footer
styles.css     All styles + design tokens (:root)
script.js      All behavior (single vanilla-JS IIFE)
og.png         Social share card (1200×630)
CNAME          Custom domain
CLAUDE.md      Design system, content rules, and project decisions
AGENTS.md      Short contributor/agent guidelines
```

`assets/` and `archive/` are leftovers from earlier design systems and are not
used by the live site. Do not edit or link them.

## Design

Full-dark "Cobalt Ledger" system — the page presents delivered work as a
reconciliation ledger. Space Grotesk / Instrument Sans / JetBrains Mono type,
cobalt accent, status-semantic green (matched) and amber (exception). See
`CLAUDE.md` for the full rationale and the rules to preserve when editing.

## Notable behavior

- **Contact form** via Formspree (no backend).
- **WhatsApp** touchpoints throughout, plus a floating button.
- **Hero recon panel** cycles three sample reconciliation runs, each ending on a
  deliberate exception — catching exceptions is the value proposition.
- **Cost calculator** with live count-up outputs.
- **No analytics, no cookies** (reflected in `privacy.html`).
- Accessibility: WCAG 2.1 AA contrast, reduced-motion support, no-JS fallback,
  JSON-LD structured data.

## Notes

- Every number on the page is sourced from the owner's Facts Registry — do not
  change figures without confirming them with the owner.
- The client is intentionally anonymized as "a leading GCC retail group."
