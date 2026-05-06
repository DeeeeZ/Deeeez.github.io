# Repository Guidelines

## Project Structure & Module Organization
This repository is a static GitHub Pages portfolio for `www.DeyaAldeen.com`. The production entry point is `index.html`; `privacy.html` is linked from the footer. Shared styles live in `assets/css/styles.css`, browser behavior in `assets/js/main.js`, and static assets in `assets/images/` and `assets/downloads/`. Design tokens live in `assets/css/styles.css` (`:root` + `.dark`); `assets/design-system.json` and `HOMEPAGE_BUILD.md` describe the archived Slate Authority v1 system and are not authoritative.

Do not edit or deploy scratch files at the repository root, including `experimental.html`, `experimental2.html`, `index copy.html`, `slate-authority-design-system-v1.html`, and `DeyaAldeen PortfolioDeyaAldeen.jsx`. Treat `archive/` as historical reference only.

## Build, Test, and Development Commands
There is no package manager or build pipeline. Use any static server for local review:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` and test `index.html` plus `privacy.html`. Deployment happens through GitHub Pages after pushing to `main`:

```bash
git push origin main
```

## Coding Style & Naming Conventions
Use 2-space indentation for HTML, CSS, and JavaScript. Keep CSS class names descriptive and kebab-case, for example `.whatsapp-float` or `.logo-text`. Prefer vanilla JavaScript in `assets/js/main.js`; do not introduce a framework or bundler unless the project owner explicitly approves it.

Preserve intentional UI decisions documented in `CLAUDE.md`, especially navigation order, logo hover layering, marquee overflow behavior, and dark-mode contrast tokens.

## Testing Guidelines
No automated test suite is configured. Before publishing, manually verify desktop and mobile layouts, navigation links, the contact form, WhatsApp links, dark mode, animations, and browser console errors. Run an accessibility/contrast check when changing colors, particularly dark-mode text.

## Commit & Pull Request Guidelines
Recent commits use Conventional Commits such as `feat(ui): ...`, `fix: ...`, and `style(ui): ...`. Keep messages short, imperative, and scoped when useful.

Pull requests should include a brief summary, screenshots for visual changes, manual test notes, and any configuration changes such as Formspree, GA4, Clarity, DNS, or GitHub Pages settings.

## Agent-Specific Instructions
The project owner is not a developer. Explain changes plainly, avoid unnecessary jargon, and call out any decision that affects deployment, tracking, forms, or domain behavior before making it.
