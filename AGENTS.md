# Repository Guidelines

`CLAUDE.md` is the authoritative source for design system, content rules, and
intentional decisions. This file is the short version for any agent; read
`CLAUDE.md` before making visual or copy changes.

## Project Structure & Module Organization
Static GitHub Pages site for `www.DeyaAldeen.com` — a one-page marketing site
for a finance process automation consultant. Everything ships from the repo
root: `index.html` (entry point), `privacy.html` (linked from the footer),
`styles.css`, and `script.js`. `CNAME` holds the custom domain; `og.png`
(1200×630) is the social share card referenced by absolute URL in the head.
There is no `assets/`-based source path — `assets/` and `archive/` hold dead
files from previous design systems and are unreferenced.

Do not edit, deploy, or link scratch files: `DeyaAldeen PortfolioDeyaAldeen.jsx`,
`archive/`, `assets/`, and `preview*.bat`.

## Build, Test, and Development Commands
No package manager, no build pipeline, no framework, no CDN JS. Google Fonts is
the only external request. Serve locally with any static server:

```bash
python -m http.server 8000    # then open http://localhost:8000
```

Deployment is automatic on push to `main`:

```bash
git push origin main          # GitHub Pages auto-builds
```

## Coding Style & Naming Conventions
Two-space indentation for HTML, CSS, and JavaScript. CSS class names are
descriptive kebab-case (`.whatsapp-float`, `.spec-row`, `.tieout`). All design
tokens live in the `:root` block of `styles.css` (single source, 8px grid) —
change colors there, never inline. `script.js` is one vanilla-JS IIFE with
banner-commented sections (recon rotator, ledger-spine/tally observer, scrollspy
rAF, count-up, cost calculator, form state). Do not add a framework, bundler, or
CDN dependency without the owner's explicit approval.

Preserve the intentional decisions documented in `CLAUDE.md`: async Google Fonts
load (holds Lighthouse ≥95), no-JS visibility of `.reveal` elements, the
mobile scrollable nav (no hamburger), and calculator clamp-on-blur behavior.

## Content & Design Rules
- Every number/claim comes from the owner's Facts Registry. Never round up,
  extrapolate, or invent — ask the owner if new copy needs a number.
- The client stays anonymized as "a leading GCC retail group."
- No testimonials until real, permissioned quotes exist.
- Zero em-dashes in rendered copy (the `<title>` tag is the sole exception).
  No AI-slop phrasing. Short, client-facing lines only — no biography.
- Design system is full-dark Cobalt Ledger v3. Do not re-add glass blur,
  gradient text, glow blobs, or uniform card grids (the owner calls that AI slop).

## Testing Guidelines
No automated tests. Before publishing, manually check desktop and mobile
layouts, nav links and scrollspy, the recon panel animation, the cost
calculator, the contact form, all WhatsApp links, reduced-motion behavior, and
the browser console. Run a WCAG 2.1 AA contrast check on any palette change.

## Commit & Pull Request Guidelines
Recent history mixes Conventional Commits (`feat(ui): ...`, `fix: ...`) with
plain imperative summaries; keep messages short and scoped. PRs should include a
brief summary, screenshots for visual changes, manual test notes, and any config
changes (Formspree, DNS, GitHub Pages).

## Agent-Specific Instructions
The project owner is not a developer. Explain changes plainly, avoid jargon, and
flag any decision affecting deployment, the form, or domain behavior before
making it.
