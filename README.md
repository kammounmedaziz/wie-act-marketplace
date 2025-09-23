# Marketplace Platform

A simplified marketplace platform built with Next.js and Nest.js.

## Structure

```
marketplace-platform/
├── frontend/          # Next.js + TailwindCSS
│   ├── pages/        # App pages (auth, dashboard, marketplace)
│   ├── components/   # Reusable UI components
│   └── styles/       # Tailwind CSS styles
├── backend/          # Nest.js API
│   └── src/          # Source code
│       ├── auth/     # Authentication
│       ├── users/    # User management
│       ├── products/ # Product CRUD
│       └── orders/   # Order management
└── docs/             # Documentation
```

## Quick Start

1. Install dependencies in both frontend and backend folders
2. Set up MongoDB connection
3. Run frontend: `npm run dev` (port 3000)
4. Run backend: `npm run start:dev` (port 3001)

## Features

- User authentication (Admin, Vendor, Buyer roles)
- Product management
- Order processing
- Marketplace interface
- Admin dashboard