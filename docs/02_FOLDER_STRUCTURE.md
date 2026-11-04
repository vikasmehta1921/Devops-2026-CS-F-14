# Folder Structure - NestMate

```
nestmate/
|
|-- backend/                      # Node.js + Express API server
|   |-- config/
|   |   +-- db.js                 # MongoDB connection setup
|   |-- controllers/              # Business logic for each feature
|   |   |-- adminController.js    # Admin dashboard logic
|   |   |-- authController.js     # Register, login, me, change-password
|   |   |-- bookingController.js  # Create/manage bookings
|   |   |-- enquiryController.js  # Property enquiries
|   |   |-- favoriteController.js # Add/remove favorites
|   |   |-- historyController.js  # Browsing history tracking
|   |   |-- messageController.js  # In-app messaging
|   |   |-- notificationController.js # Notifications
|   |   |-- propertyController.js # CRUD for properties
|   |   |-- reportController.js   # Report a property/user
|   |   |-- reviewController.js   # Reviews and ratings
|   |   |-- uploadController.js   # Cloudinary image uploads
|   |   +-- userController.js     # User profile management
|   |-- middleware/
|   |   |-- authMiddleware.js     # JWT protect + role authorize
|   |   +-- errorMiddleware.js    # Global error handler
|   |-- models/                   # Mongoose schemas (DB structure)
|   |   |-- Booking.js            # Booking schema
|   |   |-- Enquiry.js            # Enquiry schema
|   |   |-- Favorite.js           # Favorites schema
|   |   |-- History.js            # History schema
|   |   |-- Message.js            # Message schema
|   |   |-- Notification.js       # Notification schema
|   |   |-- Property.js           # Property schema (main listing)
|   |   |-- Report.js             # Report schema
|   |   |-- Review.js             # Review schema
|   |   +-- User.js               # User schema
|   |-- routes/                   # Express route definitions
|   |   |-- adminRoutes.js        # /api/admin/*
|   |   |-- authRoutes.js         # /api/auth/*
|   |   |-- bookingRoutes.js      # /api/bookings/*
|   |   |-- enquiryRoutes.js      # /api/enquiries/*
|   |   |-- favoriteRoutes.js     # /api/favorites/*
|   |   |-- historyRoutes.js      # /api/history/*
|   |   |-- messageRoutes.js      # /api/messages/*
|   |   |-- notificationRoutes.js # /api/notifications/*
|   |   |-- propertyRoutes.js     # /api/properties/*
|   |   |-- reportRoutes.js       # /api/reports/*
|   |   |-- reviewRoutes.js       # /api/reviews/*
|   |   |-- uploadRoutes.js       # /api/uploads/*
|   |   +-- userRoutes.js         # /api/users/*
|   |-- scripts/
|   |   +-- seedAdmin.js          # Script to create default admin user
|   |-- uploads/                  # Local file upload storage (fallback)
|   |-- utils/                    # Helper/utility functions
|   |-- .env                      # YOUR secret environment variables
|   |-- .env.example              # Template showing what .env needs
|   |-- Dockerfile                # Docker build config for backend
|   |-- package.json              # Dependencies + npm scripts
|   +-- server.js                 # MAIN ENTRY POINT - starts the server
|
|-- frontend/                     # React + Vite web application
|   |-- src/
|   |   |-- components/           # Reusable UI components (Navbar, Footer, etc.)
|   |   |-- context/
|   |   |   +-- AuthContext.jsx   # Global auth state (logged in user info)
|   |   |-- pages/                # Full page components
|   |   |   |-- AdminDashboard.jsx
|   |   |   |-- Bookings.jsx
|   |   |   |-- History.jsx
|   |   |   |-- Home.jsx
|   |   |   |-- Login.jsx
|   |   |   |-- OwnerDashboard.jsx
|   |   |   |-- PropertyDetails.jsx
|   |   |   |-- Register.jsx
|   |   |   |-- RoommateProfile.jsx
|   |   |   |-- Roommates.jsx
|   |   |   |-- SearchResults.jsx
|   |   |   +-- Wishlist.jsx
|   |   |-- services/             # Axios API call functions
|   |   |-- App.jsx               # Main app with all routes defined
|   |   |-- index.css             # Global styles
|   |   +-- main.jsx              # React entry point
|   |-- index.html                # HTML template
|   |-- package.json              # Frontend dependencies
|   |-- tailwind.config.js        # Tailwind CSS configuration
|   |-- vite.config.js            # Vite build configuration
|   +-- .env.example              # Template for frontend env
|
|-- devops/                       # Docker and deployment config
|   |-- .github/                  # GitHub Actions CI/CD
|   |-- backend/
|   |   +-- Dockerfile            # Backend Docker build
|   |-- frontend/
|   |   +-- Dockerfile            # Frontend Docker build (Nginx)
|   |-- docker-compose.yml        # Run both services together
|   +-- README.md                 # DevOps instructions
|
+-- docs/                         # YOU ARE HERE - Project documentation
    |-- README.md                 # Documentation index
    |-- 01_PROJECT_OVERVIEW.md
    |-- 02_FOLDER_STRUCTURE.md
    |-- 03_BACKEND_API.md
    |-- 04_DATABASE_MODELS.md
    |-- 05_HOW_TO_RUN.md
    |-- 06_CHECK_BACKEND_DATA.md
    |-- 07_ENV_VARIABLES.md
    |-- 08_USER_ROLES.md
    |-- 09_FRONTEND_PAGES.md
    +-- 10_NEXT_STEPS.md
```
