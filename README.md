# 🌐 Tarmeez Social Media Platform

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)
![React Query](https://img.shields.io/badge/React_Query-5.75.1-FF4154)
![Zod](https://img.shields.io/badge/Zod-3.24.3-blue)

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

- Authentication endpoints
- User data retrieval
- Posts CRUD operations
- Comments functionality
- Image uploads

## 🙏 Special Thanks

Special thanks to [Tarmeez Academy](https://tarmeezacademy.com) for providing the robust API that powers this application. Their well-documented API made it possible to create this comprehensive social media platform as a learning project.

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **State Management**: TanStack React Query 5.75.1
- **Data Fetching**: Axios 1.9.0
- **Data Validation**: Zod 3.24.3 for schema validation and type safety
- **Form Handling**: React hooks with validation
- **Styling**: TailwindCSS 4, CSS Variables, tailwind-merge, clsx
- **UI Components**: Custom components with Radix UI primitives
- **Authentication**: JWT token-based auth
- **Deployment**: Vercel
- **Development**: Turbopack for faster builds

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

- `/app`: Next.js app router pages and layouts
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks for data fetching and state
- `/lib`: Utility functions and type definitions
- `/public`: Static assets
- `/app/api`: API routes for secure backend communication

## 🔗 Links

- [GitHub Repository](https://github.com/Mo3bassia/tarmeez-next-app)
- [API Documentation](https://documenter.getpostman.com/view/4696539/2s83zjqN3F#d3ca0bfa-e458-4b4a-b16b-86c9e0dd932d)
- [Live Demo](https://tarmeez-social-media.vercel.app)
