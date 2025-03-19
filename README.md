<div align="center">

# Invoicipedia 📄

<p>A modern, full-stack invoicing platform built with Next.js, featuring secure authentication, real-time updates, and seamless payment processing with Stripe. Create, manage, and track invoices with an intuitive user interface.</p>

![Dashboard](/public/project-images/dashboard.png)

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![DrizzleORM](https://img.shields.io/badge/Drizzle-22C55E?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=minutemailer&logoColor=white)](https://resend.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

## ✨ Features

<div align="center">

| Feature                  | Description                                                                       |
| ------------------------ | --------------------------------------------------------------------------------- |
| 📑 Invoice Management    | Create, view, and manage your invoices with an intuitive dashboard                |
| 💳 Stripe Integration    | Process payments securely using Stripe's checkout system                          |
| 🔐 Secure Authentication | Protect user data with robust authentication via Clerk                            |
| 📧 Email Notifications   | Automated email notifications when invoices are created                           |
| 🏢 Organization Support  | Manage invoices for personal use or within organizations                          |
| 📊 Invoice Tracking      | Track invoice status (open, paid, overdue) with visual indicators                 |
| 👥 Customer Management   | Store and manage customer information for quick invoice creation                  |
| 📱 Responsive Design     | Enjoy a consistent experience across all devices with a modern, responsive design |

</div>

## 🌟 Tech Highlights

- Secure authentication and user management with Clerk
- Type-safe database interactions with Drizzle ORM and PostgreSQL
- Server-side rendering with Next.js App Router for improved SEO and performance
- Email notifications with Resend and React Email components
- Sleek, responsive UI built with modern Tailwind CSS components
- Secure payment processing with Stripe integration
- Edge-ready deployment for fast and reliable performance

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/invoicipedia.git

# Navigate into the project directory
cd invoicipedia

# Install dependencies
npm install
# or with pnpm
pnpm install

# Set up your environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the application.

## 🛠️ Tech Stack

<details>
  <summary>Click to expand tech stack details</summary>
  
### Core Frameworks

- **[Next.js](https://nextjs.org/)** - React framework with App Router for server-side rendering
- **[TypeScript](https://www.typescriptlang.org/)** - Enhances development experience with robust type safety
- **[React](https://reactjs.org/)** - Library for building interactive user interfaces

### Database & ORM

- **[PostgreSQL](https://www.postgresql.org/)** - Powerful, open-source relational database
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with strong type safety

### Authentication

- **[Clerk](https://clerk.com/)** - Complete authentication and user management solution

### Payments

- **[Stripe](https://stripe.com/)** - Secure payment processing infrastructure

### Email

- **[Resend](https://resend.com/)** - Email API for developers
- **[React Email](https://react.email/)** - Build and send emails using React components

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Shadcn UI](https://ui.shadcn.com/)** - Unstyled, accessible UI components
- **[Lucide Icons](https://lucide.dev/)** - Beautiful, consistent icon set

### Development & Deployment

- **[Vercel](https://vercel.com/)** - Deployment platform optimized for Next.js

</details>

## 📸 Screenshots

<div align="center">

### Invoice Creation

![Create Invoice](/public/project-images/create-invoice.png)

### Invoice Detail

![Invoice Details](/public/project-images/invoice-detail.png)

### Invoice Payment

![Invoice Payment](/public/project-images/invoice-payment.png)

### Stripe

![Stripe](/public/project-images/stripe.png)

### Organization

![Organization](/public/project-images/organization.png)

</div>

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                                          | Description                                     |
| ------------------------------------------------- | ----------------------------------------------- |
| `XATA_DATABASE_URL`                               | PostgreSQL connection string                    |
| `CLERK_SECRET_KEY`                                | Clerk secret key for server-side authentication |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`               | Clerk publishable key for client-side auth      |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`                   | URL for sign-in page                            |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Fallback redirect URL after sign-in             |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`                   | URL for sign-up page                            |
| `STRIPE_API_SECRET`                               | Stripe secret API key                           |
| `RESEND_API_KEY`                                  | API key for Resend email service                |
| `ME_ID`                                           | ME_ID variable                                  |

Example .env file:

```
XATA_DATABASE_URL=your_postgresql_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

STRIPE_API_SECRET=your_stripe_secret_key

RESEND_API_KEY=your_resend_api_key
```
