# Best Tea

**Poss Jonah’s guide to the best iced tea in the South.**

Nominate and upvote the best iced tea spots by Southern city. User-driven. Positivity only — no worst lists, no subscriptions, no paywalls. Ads later.

> Being from The South, iced tea is of the utmost importance… But in The South, the tea is the ultimate indicator of the business. If they have bad tea, well forget it, I'll never go back.
>
> What about you? Where have you found the best tea in town?

## Stack

- Vite + React + TypeScript
- react-router
- Simple custom CSS (cream / soft brown / iced-tea amber)
- Netlify static hosting (`netlify.toml` SPA redirects)
- v1 data: `localStorage` via a clean `PlaceStore` interface (Neon-ready)

## Run locally

```bash
cd best-tea
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Deploy on Netlify

1. Connect the GitHub repo `ashleyfarms/best-tea`.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. `netlify.toml` already sets SPA redirects (`/* → /index.html`).

Set `DATABASE_URL` (Neon) on the Netlify site for shared nominations.

## What’s in the MVP

| Page | Path | Notes |
|------|------|--------|
| Home | `/` | Opening Poss Jonah copy + CTAs |
| City picker | `/cities` | Seed Southern cities by state |
| City rankings | `/city/:cityId` | Places ranked by upvotes |
| Nominate | `/nominate` | Positive-only form |
| About | `/about` | Poss Jonah + Best Tea |

Also: header + in-feed **AdSense placeholder** slots, upvote with **localStorage vote lock** per place id, footer **More apps from Help-Pal** → https://help-pal-apps.com/our-app-collection

Memphis ships with 2–3 **example** places so the list isn’t empty on first load.

## Data layer (shared Neon)

- Types & contract: `src/data/types.ts` (`PlaceStore`)
- Cities: `src/data/cities.ts`
- Seed examples: `src/data/seed.ts` + SQL seed in `sql/001_best_tea_places.sql`
- Frontend store: `src/data/store.ts` (API-backed; localStorage **vote locks only**)
- API: Netlify Functions `netlify/functions/places.mjs` + `upvote.mjs`
- Tables: `best_tea_places`, optional `best_tea_vote_locks` (prefixed so other Neon apps stay safe)

```bash
# Apply schema (needs DATABASE_URL)
npm run migrate
```

Env on Netlify: `DATABASE_URL` (Neon). Places are shared across all visitors; one-cheer-per-browser still uses localStorage.

## Add a city

Edit `src/data/cities.ts` — add an object:

```ts
{ id: 'mobile-al', name: 'Mobile', state: 'Alabama', stateAbbr: 'AL' }
```

Use a stable slug `name-stateAbbr` lowercase.

## Plug in ads

`AdSlot` components are labeled and marked:

- `data-ad-slot="header"` / `data-ad-slot="in-feed"`
- `data-ad-ready="placeholder"`

Replace the placeholder markup with your AdSense (or other) unit when you have a publisher ID. Keep the wrapper for layout.

## Roadmap

- Food verticals (best biscuits, best BBQ sauce, etc.) under the Poss Jonah voice
- Physical plaques / window stickers for top spots
- Market-research B2B (anonymized popularity signals by city)
- Optional accounts for stronger vote sync
- Custom logo for Poss Jonah

## Domain ideas

- `besttea.south` / `bestteasouth.com`
- `posstea.com`
- `icedteasouth.com`
- `bestteaguide.com`

## License / credit

Built for Albert Jones (ashleyfarms). Part of the [Help-Pal](https://help-pal-apps.com/our-app-collection) app collection.
