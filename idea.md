# Babymart – E-commerce Platform for Baby Products

## 0. Project Metadata
#### Project Name: Babymart
#### Project Type: Full-Stack Web Application
#### Project By: Amanjeet (amanjeet.k@adypu.edu.in)
#### URN: 2024-B-31102004


## 1. Project Idea Overview
Babymart is a modern, full-stack e-commerce platform focused exclusively on baby and infant-related products. The platform is designed to provide parents and caregivers with a simple, trustworthy, and efficient online shopping experience, while giving administrators powerful tools to manage products, orders, and users.

The project aims to solve common problems in online baby product shopping such as poor product categorization, lack of trust in product quality, and inefficient admin workflows. Babymart emphasizes clean UI, performance, scalability, and maintainable architecture using modern web technologies.

This project is being developed in two clearly defined phases: a Minimum Viable Product (MVP) and a full production-ready release.

---

## 2. Project Scope

### In Scope (Before 1st May)
- Customer-facing web application
- Admin dashboard for platform management
- Backend REST API with authentication and core business logic
- Product, category, user, and order management
- Secure image handling and data storage

### Out of Scope (Planned After 1st May)
- Native mobile application (planned as a future extension)
- Advanced AI-based recommendations
- Multi-vendor marketplace functionality

---

## 3. MVP Definition

The MVP focuses on delivering a fully functional e-commerce workflow that proves the core idea and usability of the platform.

### MVP Features

**Client Website**
- Home page with featured baby products
- Product listing and product detail pages
- Category-based browsing
- User authentication (register, login, logout)
- Shopping cart functionality
- Basic checkout flow
- Order history for authenticated users
- Responsive design for desktop and mobile browsers

**Admin Dashboard**
- Secure admin authentication
- Product management (create, update, delete products)
- Category management
- Order viewing and status updates
- User listing and basic role control

**Backend API**
- JWT-based authentication
- RESTful API architecture
- Product, category, user, and order endpoints
- Image upload and storage integration
- Input validation and error handling

### MVP Deadline
- **MVP Completion Date: 28th February**

By this date, all MVP features must be functional, testable, and deployable in a local or staging environment.

---

## 4. Full Project Completion

After the MVP milestone, the project will move toward a production-ready release with enhanced features, improved performance, and better scalability.

### Full Version Enhancements
- Advanced admin analytics dashboard
- Improved search and filtering
- Wishlist functionality
- Product reviews and ratings
- Role-based access control improvements
- Better error handling, logging, and API documentation
- Deployment-ready configuration

### Final Completion Deadline
- **Full Project Completion Date: 1st May**

---

## 5. Technology Stack

### Frontend – Client Website
- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui and Radix UI
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form with Zod
- **Data Fetching:** Fetch API

**Why this stack:**
Next.js is used for its performance benefits, SEO optimization, and built-in routing. TypeScript ensures type safety and maintainability. Tailwind CSS and shadcn/ui provide a consistent and scalable design system. Zustand offers lightweight and predictable state management suitable for medium-scale applications.

---

### Frontend – Admin Dashboard
- **Framework:** React 18 with Vite and TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form with Zod
- **HTTP Client:** Axios

**Why this stack:**
Vite enables fast development and builds. React with TypeScript provides a robust structure for complex admin workflows. Axios is used for better control over API requests and interceptors in an admin environment.

---

### Backend Server
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **API Documentation:** Swagger / OpenAPI

**Why this stack:**
Node.js and Express allow rapid development of scalable REST APIs. MongoDB is well-suited for flexible product and order schemas. JWT provides stateless and secure authentication. Cloudinary is used for reliable and optimized image storage. Swagger ensures clear and maintainable API documentation.

---

## 6. Architecture Overview

The project follows a modular, scalable architecture with clear separation of concerns:

- Client and Admin applications consume a shared REST API
- Backend handles business logic, authentication, and data persistence
- Environment-based configuration for development and production
- Clean folder structure to support long-term maintainability

---

## 7. Future Roadmap

After 1st May, the project can be extended with:
- Native mobile application
- AI-powered product recommendations
- Multi-language support
- Advanced inventory and vendor management

---

## 8. Conclusion

Babymart is designed as a practical, scalable e-commerce platform with a clear development roadmap. The MVP delivers core functionality by 28th February, validating the idea and technical foundation. The full project completion by 1st May ensures a production-ready system that can be further expanded with advanced features in the future.

