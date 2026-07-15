# 🛍️ Shop.co

A high-performance, fully responsive e-commerce application built with Next.js (App Router) and TypeScript. Shop.co delivers a seamless shopping experience across all device sizes, featuring Redux Toolkit for state management, DummyJSON API for dynamic data, and client-side form validation powered by React Hook Form and Yup.

🔗 **Live Demo:** [e-commerce-react-pi-sandy.vercel.app](https://e-commerce-react-pi-sandy.vercel.app/login)

## ✨ Features

### 🏠 Home Page

<img width="1920" height="1080" alt="products" src="https://github.com/user-attachments/assets/582acf89-d6bb-4606-8017-2ed21651651b" />

- Hero section with new arrivals and top selling products
- Scrollable product cards with slider navigation
- Browse by category section
- Customer reviews carousel
- Fully responsive layout

### 🗂️ Categories Page

<img width="1920" height="1080" alt="categories" src="https://github.com/user-attachments/assets/c07216e9-d741-4ba8-972a-01cc5db06dc8" />

- Browse all products or filter by category
- Filter by price (range slider), star rating, and title search
- Apply filters on demand via filter button
- Load more pagination
- Responsive aside filter panel with overlay on mobile

### 🔐 Authentication

<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/9c1e243b-b6dc-4d91-9f47-5a2ce2cb2f5b" />

- Login & Register pages
- Built with React Hook Form + Yup validation
- Remember me (localStorage) or session-only (sessionStorage)
- Password visibility toggle
- Login credentials: `emilys` / `emilyspass`

### 🛒 Shopping Cart

<img width="1920" height="1080" alt="cart" src="https://github.com/user-attachments/assets/9dc758f4-7323-4622-bd0c-fe2792d5c2d7" />

- Add / remove products
- Increase / decrease quantity (max 10)
- Discounted price calculation
- Order summary with total price

### 👤 Profile Page

<img width="1920" height="1080" alt="profile" src="https://github.com/user-attachments/assets/dd59e48f-c2b0-4ee7-a0ab-10de6155372f" />

- Fetches authenticated user data via JWT token
- Displays name, email, phone, gender and profile picture
- Log out functionality
- Redirects to login if not authenticated

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
│   │   ├── details/
│   │   ├── page.tsx
│   │   └── page.module.scss
│   ├── profile/
│   │   ├── page.tsx
│   │   └── page.module.scss
│   ├── favicon.ico
│   ├── globals.scss
│   ├── layout.module.scss
│   ├── layout.tsx
│   ├── page.tsx
│   └── StoreProvider.tsx
│
└── lib/
    ├── slices/
    ├── hook.tsx
    └── store.tsx
```

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

## 📝 Notes

- This project is frontend-only
- Authentication is handled via DummyJSON API
- JWT tokens are stored in localStorage or sessionStorage depending on "Remember me"
