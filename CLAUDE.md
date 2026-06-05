# The Kitchen — meal-prep PWA

Personal meal-prep app for Sara. Astro + `@vite-pwa/astro`, static output, installable & offline. Deploy: **GitHub Pages** via `.github/workflows/deploy.yml`.

## Deploy (GitHub Pages)
1. In `astro.config.mjs` set `site: 'https://YOUR-USERNAME.github.io'` and `base: '/meal-app'` (match the repo name; use `'/'` for a user repo or custom domain).
2. Push to `main`. Repo → Settings → Pages → Source = **GitHub Actions**.
3. Paths are base-aware (`import.meta.env.BASE_URL`) and the manifest uses relative paths, so it works under a subpath. The service worker is registered with `scope: base`.

## Dietary rule (HARD — apply to all recipes/shopping data)
**No garlic in any form — not even garlic powder. No fresh onion; onion only as powder, sparingly.** Avoid all other alliums (spring onion, leek, shallot, chives). Build aromatics with ginger, smoked/sweet paprika, cumin, herbs, and a little onion powder.

## Structure
- `src/data/recipes.json` — recipes: `{ id, title, category, portions, store, ingredients:[{item,qty,aisle}], steps:[], macros?, tip? }`
- `src/data/weeks.json` — rotation: `[{ name, subtitle, meals:[{role, recipeId, note?}] }]`
- `src/data/categories.json` — category label + colour
- `src/layouts/Base.astro` — styling (Fraunces + Karla), head, SW registration
- `src/pages/index.astro` — single page, tab nav (This Week / Recipes / Shopping / Prep), client logic via `define:vars`
- `public/manifest.webmanifest`, `public/icon.svg` — PWA assets

## How it works
- The **Shopping** list auto-derives from the current week's recipe ingredients, grouped by aisle, expanding `→ (see Basics)` cross-references into real ingredients. Checkboxes + manually-added items persist in `localStorage` per week. Each recipe has “add ingredients to shopping list”.
- Add a recipe: append to `recipes.json`. Add it to a week in `weeks.json` by `recipeId`. Rebuild.

## Commands
- `npm run dev` — local dev
- `npm run build` — output to `dist/`
- `npm run preview` — preview the build
