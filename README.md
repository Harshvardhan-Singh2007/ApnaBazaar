# ApnaBazaar — अपना बाज़ार

**Har Zaroorat, Ek Jagah.** A responsive Indian marketplace demo built with React. Browse thoughtful everyday finds across fashion, electronics, home and living, and footwear.

> This is a frontend portfolio project. It has no production backend, real user accounts, payment processing, or actual order fulfilment.

## Features

- Responsive home page, category links, product catalogue, details, cart, wishlist, demo checkout, order confirmation, and friendly 404 route.
- Search by product name, brand, or category; combined category, maximum price, and minimum rating filters; five sort orders.
- Cart and wishlist shared across pages, persisted to browser Local Storage.
- Cart quantities, line totals, shipping and final total update from current cart state.
- Accessible form labels and client-side checkout validation for email, Indian mobile numbers, and six-digit PIN codes.
- Product image fallback and meaningful image descriptions.

## Brand

ApnaBazaar (अपना बाज़ार) means “our own marketplace.” The design uses deep green, warm cream, restrained saffron accents, and editorial serif headings.

## Technology

React, Vite, JavaScript, Tailwind CSS 3 (PostCSS setup), React Router, Lucide React, Context API, and Local Storage.

## Screenshots

Add portfolio screenshots here, for example:

| Page | Screenshot |
| --- | --- |
| Home | `screenshots/home.png` |
| Shop | `screenshots/shop.png` |
| Mobile | `screenshots/mobile.png` |

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL (usually `http://localhost:5173`).

On Windows PowerShell, if its execution policy blocks `npm.ps1`, use `npm.cmd install`, `npm.cmd run dev`, and the matching `npm.cmd run ...` commands instead.

## Production build

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## Project structure

```text
src/
  components/   Shared layout, buttons, product cards, and empty states
  context/      Cart and wishlist state provider
  data/         Central catalogue of 24 sample products
  pages/        Route-level page components
  utils/        INR formatting and cart calculations
  App.jsx       React Router route table
  main.jsx      Application entry point and providers
```

## How it works

- **Shared state:** `StoreContext` provides cart and wishlist operations to the header and pages. This avoids passing the same state through every component. Product cards receive product data as props and reuse the same presentation and actions throughout the app.
- **Persistence:** the provider reads saved JSON from Local Storage on startup, with a safe fallback if data is missing or malformed. Effects save each updated cart and wishlist back to Local Storage.
- **Catalogue controls:** search, category, max-price and minimum-rating conditions filter the central product array together. A selected sort order then sorts the matching copy; it does not mutate the source catalogue.
- **Cart math:** helper functions sum numeric price × quantity values. Shipping is ₹79 below ₹1,499 and free at or above ₹1,499. A zero-value cart has no shipping fee.
- **Routing:** React Router maps URL paths to page components, and route parameters select product IDs. Unknown product IDs and unknown paths have friendly recovery views.
- **Checkout:** the form checks required fields and formats before creating a demo reference. Invalid data leaves the cart untouched. Successful submission stores a small order summary for the confirmation screen and clears the cart. It never asks for payment credentials.

## Manual smoke-test checklist

- [ ] Open `/`, use each category card, and follow the Shop Now button.
- [ ] Search for a brand and try combined category, price, and rating filters; reset filters.
- [ ] Try each sorting option and an empty search result.
- [ ] Open a product, change quantity, save it, and add it to the cart.
- [ ] Add the same product twice and verify it remains one row with increased quantity.
- [ ] Change cart quantities, remove an item, and verify subtotal and delivery totals.
- [ ] Refresh and verify cart and wishlist persistence.
- [ ] Submit invalid checkout details, then valid details; verify cart clears only after valid submission.
- [ ] Open an invalid product ID and an unknown route.
- [ ] Check mobile navigation and the shop filters at a narrow viewport.

## Deployment

For Vercel, import the repository, use `npm run build` as the build command, and `dist` as the output directory. Vite’s SPA fallback should serve `index.html` for client-side routes; if the host needs explicit rewrites, rewrite route requests to `/index.html`.

For GitHub readiness, commit the source, `package.json`, lockfile, and README; do not commit `node_modules/` or `dist/`.

## Limitations and future ideas

This version uses sample product data and third-party Unsplash images, so it needs an internet connection for those images and fonts. Cart and wishlist data live only in the current browser. Checkout is a simulation and does not submit to a server.

Possible next steps: replace sample imagery with licensed local assets, add automated component tests, improve product availability and variant selection, add a real API, and integrate a payment provider only in a secure production architecture.
