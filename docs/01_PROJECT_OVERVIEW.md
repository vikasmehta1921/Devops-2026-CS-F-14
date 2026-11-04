# NestMate - Project Overview

## What is NestMate?

NestMate is a full-stack Smart Rental Platform that connects:
- Property Owners who want to list their properties for rent
- Tenants who are searching for rental properties
- Admins who manage and verify the platform

---

## Core Features

| Feature | Description |
|---------|-------------|
| Authentication | Register, Login, JWT-based sessions |
| Property Listings | List flats, apartments, PGs, hostels, rooms, houses |
| Search and Filter | Search by city, type, rent, furnishing, amenities |
| Bookings | Tenants can book properties, owners can approve/reject |
| Enquiries | Send enquiries to property owners |
| Wishlist/Favorites | Save properties you like |
| Reviews and Ratings | Leave reviews on properties |
| Roommate Finder | Find compatible roommates |
| Messages | In-app messaging system |
| Notifications | Real-time notifications for activity |
| Admin Dashboard | Verify properties, manage users |
| Owner Dashboard | Manage all your listings |
| Map Integration | Leaflet maps for property locations |
| Image Uploads | Cloudinary-based image storage |

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Leaflet + React-Leaflet | Interactive maps |
| Axios | HTTP client to call backend API |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | JSON Web Tokens for auth |
| bcryptjs | Password hashing |
| Cloudinary | Image upload service |
| Multer | File upload middleware |
| dotenv | Environment variables |
| CORS | Cross-Origin Resource Sharing |

### DevOps
| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |

---

## Database

- Type: MongoDB Atlas (cloud-hosted)
- Connection: via MONGO_URI in .env file
- Collections: users, properties, bookings, enquiries, favorites, reviews, messages, notifications, reports, histories

---

## Architecture

```
USER (Browser)
    |
    v
FRONTEND (React + Vite) -- http://localhost:5173
    |  (API calls via Axios)
    v
BACKEND (Express.js) -- http://localhost:5000
    |  (Mongoose queries)
    v
MongoDB Atlas (Cloud Database)
```

---

> Created by Vinay - NestMate Smart Rental Platform
