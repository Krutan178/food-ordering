# 🍕 Food Ordering App

A full-stack food ordering website for a restaurant — browse the pizza, burger and beverage menus, customise items with sizes and extra toppings, place cash-on-delivery or PayPal (sandbox) orders, and manage everything from a protected admin panel.

Built with the Next.js **Pages Router**.

## Features

- 🗂 Separate menus: **Pizzas**, **Burgers**, **Beverages** (each lives in its own MongoDB collection)
- 🛒 Cart with sizes, extra toppings, quantity and totals (Redux Toolkit)
- 💳 Checkout — Cash on Delivery **or** live PayPal checkout buttons (sandbox for testing)
- 🧾 Order tracking page (`/orders/[id]`) with status progression graphic
- 🔐 Admin panel (`/admin`) — protected page + API routes: create/delete products, advance order status
- 📸 Product images upload to Cloudinary straight from the admin "Add Item" modals
- 🗄️ MongoDB Atlas (free cluster) with an auto-cached connection across dev hot reloads

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend / Backend | Next.js 14 (Pages Router), React 18 |
| State | Redux Toolkit (+ react-redux 9) |
| Database | MongoDB Atlas via Mongoose 8 |
| Payments | `@paypal/react-paypal-js` (sandbox by default) |
| Image hosting | Cloudinary (unsigned upload preset) |
| Maps (contact page) | google-map-react |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 1. Environment variables (`.env`)

> ⚠️ `.env` is git-ignored — never commit it. Copy your own values:

```
MONGO_URL = mongodb+srv://<user>:<password>@<cluster>.mongodb.net/pizza?retryWrites=true&w=majority
ADMIN_USERNAME = admin
ADMIN_PASSWORD = <strong-password>
TOKEN = <random-string-used-as-admin-session-cookie-value>

# Optional — falls back to the demo tutorial account until you add your own:
# NEXT_PUBLIC_PAYPAL_CLIENT_ID = <your sandbox client id>
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = <your cloud name>
```

- **MongoDB URL:** MongoDB users must URL-encode special characters in their password (e.g. `@` → `%40`).
- **Cloudinary:** create an **unsigned** upload preset named `uploads` in your Cloudinary dashboard (Settings → Upload).
- **PayPal:** create an app under *Sandbox* at [developer.paypal.com](https://developer.paypal.com) and paste its Client ID.

### 2. Seed the menu (optional)

```bash
node scripts/seed.js
```

Loads 10 pizzas, 10 burgers and 10 beverages (with sample images, sizes and toppings). ⚠️ Re-running **replaces all products** in those collections — manage a real menu through the admin panel instead.

### 3. Review without a database

```bash
node scripts/review.js
```

Runs the site against a temporary in-memory MongoDB pre-seeded with sample products (nothing persists). Handy for demos — stop and restart anytime.

## Admin panel

| URL | Purpose |
|---|---|
| `/admin` | Product list (delete) + order list (advance status) |
| `/admin/login` | Login with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env` |

The login session lasts 1 hour (cookie with the `TOKEN` value).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` + `npm start` | Production build & serve |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `node scripts/seed.js` | Fill your Atlas collections with sample products |
| `node scripts/review.js` | Demo the site on a throwaway in-memory DB |

## Deployment (Vercel)

1. Push the repo to GitHub (`.env` stays local).
2. Import the project on [vercel.com](https://vercel.com) and add the environment variables from step 1 in the dashboard.
3. Ensure your Atlas **Network Access** allows external IPs (`0.0.0.0/0` while developing).
4. Before deploying: the hard-coded `http://localhost:3000` URLs in `getServerSideProps` / component calls should be moved to an environment-aware base URL.
5. PayPal: remember INR is not a PayPal-supported currency — checkout runs in USD unless a local Indian gateway (e.g. Razorpay) is added for live orders.

## Project Structure (short tour)

```
components/   # Navbar, menus, "Add item" modals (with Cloudinary upload)
models/       # Mongoose schemas: Product, Product1 (burger), Product2 (beverage), Order
pages/
  api/        # REST endpoints: products(×3 collections), orders, login
  admin/      # Admin dashboard + login
  product*    # Item detail pages (size + topping selection)
  orders/     # Order confirmation / tracking
redux/        # cartSlice + store (addProduct, reset)
scripts/      # seed.js, review.js
util/mongo.js # Cached Atlas connection
```

## Security Checklist

- ✅ `.env` git-ignored; rotate any credentials that were ever committed
- ✅ Admin APIs (`POST`/`PUT`/`DELETE`) verify the session token server-side
- ✅ Admin UI (Add Item button, panel) renders statically only for logged-in admins
- ⏳ Before production: move external secrets (DB user, admin login, token) to strong values; consider httpOnly + HTTPS-only cookie flags
