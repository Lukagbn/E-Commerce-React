# 🛍️ Shop.co

A high-performance, fully responsive e-commerce application built with Next.js (App Router) and TypeScript. Shop.co delivers a seamless shopping experience across all device sizes, featuring Redux Toolkit for state management, DummyJSON API for dynamic data, and client-side form validation powered by React Hook Form and Yup.

🔗 **Live Demo:** [e-commerce-react-pi-sandy.vercel.app](https://e-commerce-react-pi-sandy.vercel.app/login)

## 🧰 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Redux Toolkit**
- **React Hook Form** + **Yup**
- **SCSS Modules**
- **DummyJSON API**

## 📦 Dependencies

```json
{
  "next": "^16.1.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@reduxjs/toolkit": "^2.x.x",
  "react-redux": "^9.2.0",
  "react-hook-form": "^7.x.x",
  "@hookform/resolvers": "^5.x.x",
  "yup": "^1.x.x"
}
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
public/
├── mainImage.webp
├── cart.svg
├── profile.svg
├── search.svg
└── ...

src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── form.module.scss
│   ├── cart/
│   │   ├── page.tsx
│   │   └── page.module.scss
│   ├── components/
│   │   ├── Card/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── ProductCard/
│   │   └── StarRate/
│   ├── fonts/
│   ├── products/
│   │   ├── categories/
│   │   └── details/
│   ├── profile/
│   │   ├── page.tsx
│   │   └── page.module.scss
│   ├── favicon.ico
│   ├── globals.scss
│   ├── layout.module.scss
│   ├── layout.tsx
│   ├── page.tsx
│   ├── page.module.scss
│   └── StoreProvider.tsx
│
└── lib/
    ├── slices/
    ├── hook.tsx
    └── store.tsx
```

## ✨ Pages

<img width="1920" height="1080" alt="products" src="https://github.com/user-attachments/assets/582acf89-d6bb-4606-8017-2ed21651651b" />

- **Home** (`/`) — hero section with new arrivals and top selling products, scrollable product cards with slider navigation, browse by category section, customer reviews carousel, fully responsive layout
- **Categories** — browse all products or filter by category, price range, star rating, and title search; load more pagination; responsive filter panel with overlay on mobile
- **Login / Register** — built with React Hook Form + Yup validation, "Remember me" (localStorage) or session-only (sessionStorage), password visibility toggle. Login credentials: `emilys` / `emilyspass`
- **Cart** — add/remove products, adjust quantity (max 10), discounted price calculation, order summary with total
- **Profile** — fetches authenticated user data via JWT token, displays name, email, phone, gender, and profile picture, log out functionality, redirects to login if not authenticated

## 🧠 State Management (Redux Toolkit)

**Cart Slice**

```
initialState: {
  cartProducts: []
}
```

Actions:

- `addToCart` – adds product or increases quantity (max 10)
- `deleteFromCart` – removes product by id
- `decreaseQuantity` – decreases quantity (minimum 1)

Selectors:

- `cartTotalPrice` – calculates total price across all cart items
- `cartTotalDiscount` – calculates total discount percentage

## 📝 Notes

- This project is frontend-only
- Authentication is handled via DummyJSON API
- JWT tokens are stored in localStorage or sessionStorage depending on "Remember me"
