# Arekta Store - Premium Digital Marketplace in Bangladesh

Arekta Store is a modern, full-stack digital marketplace built with Next.js 15, React 18, and Tailwind CSS. It specializes in selling PUBG UC, iTunes Gift Cards, iCloud storage, and other digital products with instant delivery and secure checkout, tailored for the Bangladesh market.

---

## Features

- **Product Catalog**: PUBG UC, iTunes Gift Cards, iCloud Storage, Free Fire Diamonds, and more.
- **Category Browsing**: Filter and browse by categories like PUBG, iTunes, iCloud, Gaming, etc.
- **Product Search**: Fast, client-side product search and filtering.
- **Single Product Pages**: Detailed product info, reviews, and related products.
- **Cart & Checkout**: Add to cart, order summary, multi-step secure checkout.
- **Payment Methods**: bKash, Nagad, Rocket, Bank Transfer, and more.
- **Promo Codes**: Apply promo codes for discounts.
- **Order Tracking**: Order confirmation, tracking, and admin approval flows.
- **Admin Dashboard**: Manage orders and users (demo/local only).
- **Authentication**: Email/password and Google login (NextAuth).
- **Responsive Design**: Mobile-first, accessible, and fast.
- **Instant Delivery**: Most products delivered within 5-15 minutes.
- **24/7 Support**: Contact and support info throughout the site.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Frontend**: [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management**: React Context (cart, user)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Email**: [Nodemailer](https://nodemailer.com/) (for order confirmations)
- **Icons**: [Lucide](https://lucide.dev/)
- **Forms**: [react-hook-form](https://react-hook-form.com/), [zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Other**: [date-fns](https://date-fns.org/), [clsx](https://github.com/lukeed/clsx), [vaul](https://vaul.dev/)

---

## Project Structure

```
.
├── app/                # Next.js app directory (pages, layouts, API routes)
│   ├── products/       # Product listing, single product, category pages
│   ├── cart/           # Cart page
│   ├── checkout/       # Checkout flow
│   ├── admin/          # Admin dashboard (orders, users)
│   ├── order-confirmation/ # Order confirmation page
│   ├── order-tracking/ # Order tracking page
│   ├── about/          # About page
│   ├── contact/        # Contact & support
│   └── ...             # Other routes
├── components/         # Reusable UI and feature components
│   ├── products/       # Product cards, filters, search, etc.
│   ├── home/           # Homepage sections
│   ├── layout/         # Navbar, Footer, etc.
│   └── ui/             # UI primitives (Button, Card, etc.)
├── contexts/           # React context providers (cart, user)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions, helpers
├── public/             # Static assets (images, icons)
├── styles/             # Additional CSS (if any)
├── utils/              # Utility modules
├── app/globals.css     # Tailwind CSS and global styles
├── tailwind.config.js  # Tailwind CSS config
├── components.json     # shadcn/ui config
├── package.json        # Project dependencies and scripts
└── ...
```

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/arekta-store.git
cd arekta-store
```

### 2. Install Dependencies

```sh
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root with the following (for NextAuth and email):

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=465
NEXTAUTH_SECRET=your-random-secret
```

### 4. Run the Development Server

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Customization

- **Products**: Edit or extend the product lists in [`app/products/page.tsx`](app/products/page.tsx) and [`app/products/category/[slug]/page.tsx`](app/products/category/[slug]/page.tsx).
- **Payment Methods**: Update the `paymentMethods` array in [`app/checkout/page.tsx`](app/checkout/page.tsx).
- **Branding**: Replace images in `/public` and update text in [`components/layout/footer.tsx`](components/layout/footer.tsx) and [`components/layout/navbar.tsx`](components/layout/navbar.tsx).
- **Admin Features**: Admin dashboard is demo/local only; for production, connect to a real database and authentication provider.

---

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase

---

## License

This project is for educational/demo purposes. For commercial use, please contact the author.

---

## Credits

- Built by [Mehedi Pathan](https://mehedipathan.online)
- Inspired by shadcn/ui, Next.js, and the Bangladesh gaming community.

---

## Screenshots

> Add screenshots of the homepage, product page, cart, checkout, and admin dashboard here.

---

## Contact & Support

- Email: [support@arekta.store](mailto:support@arekta.store)
- WhatsApp: [+880 1622-839616](https://wa.me/8801622839616)
- [Contact Page](/contact)

---

Enjoy shopping at Arekta