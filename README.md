# ISRAAYA — React + TypeScript + Tailwind

Premium editorial e-commerce site for Israaya India, built with React 19,
TypeScript, Vite, Tailwind CSS v4, React Router, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
```

## Structure

```
src/
  components/   Nav, Footer, Cursor, ImageSlot, PageHero
  pages/        Home, Shop, Product, Lookbook, Stories, Story, About
  data/         products.ts, stories.ts — edit these to add/change products & journal entries
  lib/          textures.ts — placeholder art-direction gradients
  index.css     design tokens (colors, fonts) via Tailwind v4 @theme
```

## Design tokens

Colors and fonts are defined once in `src/index.css` under `@theme` and used
throughout via Tailwind classes (`bg-ivory`, `text-wine`, `font-display`, etc.):

| Token      | Hex       |
|------------|-----------|
| ivory      | #F5F1E8   |
| peach      | #E8B8A7   |
| rose       | #C9827A   |
| wine       | #7D1638   |
| maroon     | #570D26   |
| gold       | #B89A5B   |
| espresso   | #2C211D   |

## Imagery

Every image on the site comes from `src/lib/uploaded-links.json` (R2-hosted).
`src/lib/images.ts` turns that list into a pool (`PHOTOS`) and maps it to slots:

- `productGallery(n)` — four photos per product (product page gallery, shop grid, lookbook)
- `IMAGES.*` — named slots for Home, page heroes, About and Stories
- To change a slot, edit its index in `images.ts`; nothing else needs to move.

## Routes

- `/` — Home
- `/shop` — Shop / collection grid with filters
- `/product/:slug` — Product detail page
- `/lookbook` — Editorial masonry lookbook
- `/stories` — Journal listing
- `/stories/:slug` — Single journal entry
- `/about` — About / brand story

## Still to wire up

- Real cart/checkout logic (Add to Bag is currently UI-only)
- Search and account flows
- Real product photography in place of the random fabric-texture stand-ins
