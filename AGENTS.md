# AGENTS.md

## Project Overview
- High-end personal portfolio site for Claudiu Angheloni.
- Stack: static multi-entry HTML, vanilla JS modules on `window`, page-specific CSS, custom client-side routing, and a Three.js home scene.
- Standard: Awwwards-level finish, premium motion/composition, strong performance discipline, and surgical changes instead of broad rewrites.

## Key Files And Folders
- `index.html`, `about.html`, `contact.html`, `project-*.html`: direct-entry documents with page-specific meta tags. The shared shell is duplicated here, so shared head/chrome changes must stay in sync.
- `main.js`: app bootstrap, module wiring, menu/focus handling, lazy home-visual loading.
- `js/site-content.js`: source of truth for home/about/contact route templates, translations, portfolio pins, and project panel seed data.
- `js/site-case-studies.js`: project route generator and case-study content. Add or update case studies here first.
- `js/site-router.js`: route rendering, history, loader timing, route-level setup.
- `js/site-home-visuals.js`: Three.js globe, stars, explore CTA, pin behavior, and project panel. Highest-risk file in the repo.
- `js/site-page-behaviors.js`: reveal blocks, custom scroll indicators, title intro states, contact form binding.
- `js/site-shell.js`, `js/site-utils.js`: menu, language, inert/focus handling, loader helpers, lazy script loading.
- `styles.css`: global shell, home scene, shared motion, loader, menu, project panel styling.
- `about.css`, `contact.css`, `project.css`: route-specific styling.
- `audio.js`: ambient + interaction audio. Treat audio as enhancement, not a dependency for core UX.
- `serve.js`: local server and route aliases.
- `scripts/build.js`: production copy/minify pipeline and asset collection. Update `entryNames` when adding routes.
- `assets/`, `images/`, `thumbnails/`: production media and optimized textures.
- `dist/`: generated output only. Never hand-edit.
- `_qa/`, root screenshots, `.chrome-*`, `.edge-*`: QA/debug artifacts, not source files.
- `data/production.json`: appears legacy/unwired in the current portfolio system. Ignore unless explicitly reviving old data.

## Coding And Styling Rules
- Stay inside the existing vanilla JS module pattern. Extend current modules before inventing new architecture.
- Prefer changing route/content data before duplicating hardcoded markup in entry HTML files.
- Keep `en` and `ro` translations aligned whenever copy changes.
- Scope styles by route/body class (`about-page`, `contact-page`, `project-page`) and avoid global bleed.
- Reuse the existing palette, typography, spacing logic, gradients, and glitch language. New visuals should feel authored, not generic.
- Keep runtime-critical ids/classes stable: `route-shell`, `page-root`, `page-style`, `stars`, `globe-root`, loader classes, menu classes, and home focus state classes.
- Performance is part of the design. Preserve lazy loading, reuse optimized assets, and avoid unnecessary layout thrash, listeners, or DOM churn.
- Preserve accessibility polish: keyboard flow, focus traps, `aria-*`, `prefers-reduced-motion`, and readable contrast.

## Design And UX Principles
- Think in strong visual theses, not feature lists. Each surface should have one dominant idea.
- Preserve the current page roles:
- Home = cinematic poster + globe interaction.
- About = editorial timeline with measured reveal rhythm.
- Contact = premium interaction desk, not a generic form page.
- Projects = proof-driven case studies with strong pacing and media framing.
- Favor fewer, sharper moves. Typography, composition, spacing, and motion should carry the experience.
- Glitch and FX are accents. If an effect gets louder than the content, pull it back.
- Mobile matters as much as desktop. Check cropping, sticky rails, spacing, CTA visibility, and scroll behavior.

## Workflow For Making Changes
- Find the real source of truth first:
- Content and route templates: `js/site-content.js` or `js/site-case-studies.js`
- Navigation/render lifecycle: `main.js` and `js/site-router.js`
- Shared interactions: `js/site-page-behaviors.js`
- Home scene and project panel: `js/site-home-visuals.js`
- Styling: `styles.css` or the relevant route CSS file
- Make the smallest change that fully solves the task.
- If you add a new route or case study, update all required touchpoints:
- route data/template
- direct-entry HTML file in the repo root
- `serve.js` aliases if friendly URLs are needed
- `scripts/build.js` `entryNames`
- Use `node serve.js` or `npm run serve` for local review.
- When behavior or structure changes, sanity-check:
- `/index.html`
- `/about.html`
- `/contact.html`
- `/project-shg-calgary.html`
- `/project-portfolio-system.html`
- menu open/close
- keyboard trap behavior
- language toggle
- home portfolio focus / project panel flow
- reduced-motion behavior
- Run `node scripts/build.js` or `npm run build` before finalizing changes that affect production output or asset inclusion.

## Guardrails
- Do not hand-edit `dist/`.
- Do not treat screenshots, debug HTML, or QA artifacts as the source of truth.
- Do not do broad rewrites in `js/site-home-visuals.js` unless the task truly requires it.
- Do not desync the duplicated entry HTML shells when changing shared head markup, loader markup, or global chrome.
- Do not add backend assumptions. The contact form is intentionally `mailto:` based.
- Do not remove or rename body state classes without tracing both CSS and JS dependencies.
- Do not add UI just because there is room. This repo rewards precision more than surface area.
- When unsure, preserve mood, pacing, and performance over novelty.
