# 🌐 Tarmeez Social Media Platform

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)
![React Query](https://img.shields.io/badge/React_Query-5.75.1-FF4154)
![Zod](https://img.shields.io/badge/Zod-3.24.3-blue)

> A modern social media platform built with Next.js and TypeScript, featuring user authentication, posts management, comments, and infinite scrolling powered by Tarmeez Academy API.

## 🚀 Live Demo

Experience the application live: [tarmeez-social-media.vercel.app](https://tarmeez-social-media.vercel.app)

## 📋 Project Overview

This is a comprehensive social media platform built with Next.js, showcasing advanced frontend development skills using a real-world API provided by Tarmeez Academy. The application demonstrates modern web development practices including responsive design, state management, API integration, and user authentication.

## ✨ Features Implemented

### 👤 User Management

- User authentication (login & registration)
- User profiles with activity statistics
- Profile image display
- User listing with infinite scroll

### 📝 Post Management

- View all posts with infinite scrolling
- Create new posts with image uploads
- Edit existing posts
- Delete user's own posts
- Detailed post view with comments

### 💬 Comments System

- View comments on posts
- Add new comments to posts
- Comments count display

### 🛠️ Technical Implementation

- **Next.js App Router**: For efficient page routing and navigation
- **React Query**: For effective data fetching, caching and state management
- **TypeScript**: For type-safe code and better developer experience
- **Zod Schema Validation**: For runtime type checking and data validation
- **API Integration**: Custom API routes to securely communicate with backend
- **Responsive Design**: Mobile-first approach for all screen sizes
- **TailwindCSS**: For modern, utility-first styling
- **Dark Mode**: Toggle between light and dark themes using next-themes
- **Component Library**: Custom UI components with Radix UI primitives
- **Form Handling**: Client-side validation and form submission
- **Error Handling**: Comprehensive error states and user feedback

## 🔄 API Integration

This project integrates with the [Tarmeez Academy Social Media API](https://documenter.getpostman.com/view/4696539/2s83zjqN3F#d3ca0bfa-e458-4b4a-b16b-86c9e0dd932d), implementing:

- Authentication endpoints (login, register, logout)
- User data retrieval with profile details and statistics
- Posts CRUD operations (create, read, update, delete)
- Comments functionality with real-time updates
- Image uploads for both posts and profile pictures
- Infinite scrolling pagination for optimized performance
- Error handling with meaningful user feedback

## 🙏 Special Thanks

Special thanks to [Tarmeez Academy](https://tarmeezacademy.com) for providing the robust API that powers this application. Their well-documented API made it possible to create this comprehensive social media platform as a learning project. The academy's commitment to providing real-world learning resources has been invaluable for developing practical frontend skills with actual backend integration.

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **State Management**: TanStack React Query 5.75.1 for server state
- **Data Fetching**: Axios 1.9.0 with custom hooks pattern
- **Data Validation**: Zod 3.24.3 for schema validation and type safety
- **Form Handling**: React hooks with client-side validation
- **Styling**: TailwindCSS 4, CSS Variables, tailwind-merge, clsx
- **UI Components**: Custom components with Radix UI primitives (Dialog, Dropdown, Avatar)
- **Authentication**: JWT token-based auth with secure HTTP-only cookies
- **Image Handling**: Next.js Image component with optimizations
- **Routing**: Next.js App Router with dynamic routes
- **Deployment**: Vercel with continuous deployment
- **Development**: Turbopack for faster builds and enhanced DX

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```txt
/app                             # Next.js App Router
├── favicon.ico
├── globals.css
├── layout.tsx                   # Root layout component
├── loading.tsx                  # Global loading UI
├── page.tsx                     # Homepage
├── api/                         # API route handlers
│   ├── add-post/
│   ├── check-login/
│   ├── add-comment/
│   ├── delete-post/
│   ├── edit-post/
│   ├── login/
│   ├── logout/
│   └── register/
├── posts/                       # Posts pages
│   ├── error.tsx
│   ├── page.tsx
│   └── [id]/                    # Dynamic route
│       └── page.tsx
└── users/                       # Users pages
    ├── page.tsx
    └── [id]/                    # Dynamic route
        └── page.tsx

/components                      # Reusable UI components
├── back-button.tsx
├── container.tsx
├── react-query-provider.tsx
├── theme-provider.tsx
├── common/                      # Shared components
│   ├── image-post.tsx
│   ├── profile-avatar.tsx
│   ├── skeleton-post.tsx
│   └── table-pagination.tsx
├── post/                        # Post components
│   ├── post-comments.tsx
│   ├── post-error.tsx
│   └── post.tsx
├── posts/                       # Posts components
│   ├── add-post.tsx
│   ├── edit-post-dialog.tsx
│   ├── post.tsx
│   ├── posts-error.tsx
│   └── posts.tsx
├── ui/                          # UI library components
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── breadcrumb.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   └── textarea.tsx
├── user/                        # User components
│   ├── skeleton-user.tsx
│   ├── user-error.tsx
│   └── user.tsx
├── navbar/                      # Navigation components
│   ├── dropdown-toggle-menu.tsx
│   ├── logo.tsx
│   ├── navbar.tsx
│   └── button/
│       ├── login-buttons.tsx
│       ├── login.tsx
│       ├── logout.tsx
│       ├── navbar-buttons.tsx
│       └── register.tsx
└── users/                       # Users components
    ├── skeleton-user.tsx
    ├── user.tsx
    ├── users-error.tsx
    └── users.tsx

/hooks                           # Custom React hooks
├── use-add-comment.ts
├── use-add-post.ts
├── use-check-login.ts
├── use-delete-post.ts
├── use-edit-post.ts
├── use-login.ts
├── use-logout.ts
├── use-post.ts
├── use-posts.ts
├── use-register.ts
├── use-user.ts
├── use-users.ts
└── useLocalStorage.js

/lib                             # Utility functions
├── utils.ts                     # Helper functions
└── schemas/                     # Zod schemas for validation
    ├── login.ts
    ├── post.ts
    ├── posts.ts
    ├── user.ts
    └── users.ts

/public                          # Static assets
```

## 🔗 Links

- [GitHub Repository](https://github.com/Mo3bassia/tarmeez-next-app)
- [API Documentation](https://documenter.getpostman.com/view/4696539/2s83zjqN3F#d3ca0bfa-e458-4b4a-b16b-86c9e0dd932d)
- [Live Demo](https://tarmeez-social-media.vercel.app)
