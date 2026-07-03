# Bhama Vision — Headless Storefront

A custom women's-wear e-commerce storefront (kurtis, kurta sets, co-ords, dresses)
built with **Next.js + TypeScript + Tailwind CSS**, designed to run **headless on
Shopify**.

It ships with a bundled **sample catalogue** so it runs instantly, and switches to
**live Shopify data** the moment you add your API credentials — no code changes.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, RSC) + TypeScript |
| Styling | Tailwind CSS v4 |
| Commerce backend | Shopify Storefront API (GraphQL) — *optional, headless* |
| State | React Context + `localStorage` (cart) |
| Images | `next/image` (sample images via picsum, Shopify CDN in prod) |
| Deploy target | Vercel |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

By default the app uses the **mock provider** (sample Bhama Vision products in
`src/lib/commerce/mock-data.ts`).

## Going headless with Shopify

1. Copy the env template and fill in your store credentials:
   ```bash
   cp .env.example .env.local
   ```
2. Set `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   (instructions are in `.env.example`).
3. Restart the dev server. That's it — every page now reads live products,
   prices, and inventory from Shopify.

The switch happens in `src/lib/commerce/index.ts`, which picks the provider based
on whether the env vars are present. Components never talk to a provider directly.

## Architecture

```
src/
  app/                    # routes (home, collections, categories, product, cart)
  components/             # UI (header, cart drawer, product card, gallery, ...)
  context/cart-context.tsx# client cart state + localStorage
  lib/
    commerce/
      index.ts            # provider selector + public commerce API
      mock-data.ts        # bundled sample catalogue
      shopify.ts          # Shopify Storefront API GraphQL client + mappers
    types.ts              # normalized Product / Category / Cart types
    format.ts             # INR currency helpers (prices stored in paise)
```

## Roadmap (next steps for a real store)

- [ ] Connect the live Shopify store + real product photography
- [ ] Wire the cart to Shopify's Cart API and hand off to Shopify Checkout
- [ ] Payments: Shopify Payments / Razorpay (UPI, cards, COD)
- [ ] Customer accounts, order history, wishlist
- [ ] Search + filters (size, price, colour, fabric)
- [ ] Product reviews, SEO metadata, sitemap, analytics
```


## Hosting on Hostinger at `bhamavision.com/demo` (static files)

Hostinger's file hosting serves static files, so we ship a pre-built static
export of the site configured for the `/demo` sub-path.

### Rebuild the static bundle (only if you change the code)

```bash
npm install
npm run build:static      # BUILD_TARGET=static NEXT_PUBLIC_BASE_PATH=/demo
```

This writes a plain HTML/CSS/JS site to `out/`. A ready-to-upload
`bhamavision-demo.zip` (containing a top-level `demo/` folder) is committed at
the repo root for convenience.

### Upload steps (hPanel File Manager)

1. Download **`bhamavision-demo.zip`** from this repo.
2. In Hostinger **hPanel → Files → File Manager**, open `public_html`.
3. **Upload** `bhamavision-demo.zip` into `public_html`.
4. Right-click the zip → **Extract**. This creates `public_html/demo/`.
5. Delete the zip (optional) and visit **https://bhamavision.com/demo**.

> The site is prefixed with `basePath: /demo`, so all assets resolve correctly
> under the sub-path. To host at the domain root instead, rebuild with
> `NEXT_PUBLIC_BASE_PATH=""` and upload the files to `public_html` directly.

### Notes / limitations of the static build

- Runs on the bundled sample catalogue. The live **Shopify Storefront API**
  needs a Node server (Vercel), so headless data is not available in the static
  export — it's ideal for a **demo/preview**.
- Cart works (client-side, `localStorage`); "Checkout" is a placeholder until
  Shopify checkout is wired on a server deployment.
- Product images load from `picsum.photos` (external), so they render anywhere.
