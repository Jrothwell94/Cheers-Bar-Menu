# Cheers Bar — Digital Menu

Mobile-first digital menu for Cheers Bar, Alykes, Zakynthos. Built with Next.js
+ Tailwind. Deployed to Vercel, auto-deploying on every push to `master`.

Live site: https://cheers-bar-menu-blond.vercel.app

## Where things live

- `src/data/menu.ts` — every drink: cocktails, Greek favourites, spirits,
  beers, wine, soft drinks. Cocktails are grouped by base spirit via the
  `group` field; Spirits are split into browsable subcategories via
  `subcategory`.
- `src/data/whats-on.ts` — the weekly live music / football listings.
- `src/data/about.ts` — About page copy, address, hours, phone.
- `src/data/tags.ts` — the flavour-profile icons (fruity, refreshing, etc.)
  shown on cocktails.
- `public/logo.png` / `src/app/icon.png` — the bar's logo and favicon. Using
  the PNG, not the original SVG — the Illustrator-exported SVG rendered with
  wrong colours (red instead of gold) in some mobile browsers due to gradient
  support differences.

## Running locally

```bash
npm install
npm run dev
```

## Deploying

Just commit and push to `master` — Vercel is connected via GitHub and
auto-deploys. No manual `vercel` command needed.

## Status / outstanding items

- **Spirits**: only Rums are populated. Whiskeys, Gins and Vodkas show
  "Coming soon" — waiting on the bar's actual lineup for each.
- **Rum prices** are placeholder estimates — need real prices from the bar.
- **Cocktail photos**: none yet, owner is sending these separately. The
  detail page and list rows already support an `image` field per item in
  `menu.ts` — once photos arrive, add the file to `public/` and set
  `image: "/whatever.jpg"` on the item.
- **Cocktail base-spirit groupings** (Vodka/Rum/Gin/Tequila/Whiskey
  Based/Other/Mocktails) were assigned by best guess — worth a sanity check
  from the bar.
- **"Cheers Sunset" mocktail** was invented as a placeholder so the
  Mocktails group wasn't empty — replace with a real one, or remove.
- **Contact phone number** on the About page is still a placeholder.
- **What's On** events are still example/placeholder content.
