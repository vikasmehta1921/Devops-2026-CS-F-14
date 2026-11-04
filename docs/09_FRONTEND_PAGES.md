# Frontend Pages - NestMate

Frontend runs at: http://localhost:5173
Files are in: frontend/src/pages/

---

## All Pages and Routes

| Page File | URL Route | Who Can Access | Description |
|-----------|-----------|----------------|-------------|
| Home.jsx | / | Everyone | Landing page with featured properties and search |
| SearchResults.jsx | /search | Everyone | Filtered property listings |
| Login.jsx | /login | Everyone | Login form |
| Register.jsx | /register | Everyone | Registration form (choose role) |
| PropertyDetails.jsx | /properties/:id | Everyone | Full detail of one property |
| Roommates.jsx | /roommates | Everyone | Browse roommate profiles |
| RoommateProfile.jsx | /roommate-profile | Logged-in users | Set your roommate preferences |
| Wishlist.jsx | /wishlist | Logged-in users | Your saved/favorited properties |
| History.jsx | /history | Logged-in users | Your recently viewed properties |
| Bookings.jsx | /bookings | Logged-in users | Your booking requests |
| OwnerDashboard.jsx | /owner | Owner only | Manage your property listings |
| AdminDashboard.jsx | /admin | Admin only | Platform management |

---

## Page Descriptions

### Home (/home)
- Hero section with search bar
- Featured/recent property listings
- Search by city, type, rent range
- Shows map with property pins (Leaflet)

### SearchResults (/search)
- Filtered grid of properties
- Filter sidebar (type, furnishing, price, amenities)
- Search query from URL params

### Login (/login)
- Email + password form
- On success: saves JWT token to localStorage
- Redirects to home or previous page

### Register (/register)
- Name, email, phone, password
- Role selector: tenant or owner
- On success: auto-login

### PropertyDetails (/properties/:id)
- Full property info (photos, description, amenities)
- Map showing location
- Book / Enquire buttons
- Reviews section
- Similar properties
- Add to wishlist button

### Roommates (/roommates)
- Browse people looking for roommates
- Filter by city, preferences
- View roommate profile

### RoommateProfile (/roommate-profile) [PRIVATE]
- Set your own roommate preferences
- City, budget, lifestyle preferences

### Wishlist (/wishlist) [PRIVATE]
- All properties you saved to favorites
- Remove from wishlist

### History (/history) [PRIVATE]
- Properties you recently viewed
- Clear history

### Bookings (/bookings) [PRIVATE]
- All your booking requests
- Status: pending / approved / rejected / cancelled
- Cancel a booking

### OwnerDashboard (/owner) [OWNER ONLY]
- Add new property listing (form)
- View all your properties
- Edit property details
- Delete property
- See booking requests for your properties
- Approve or reject bookings
- View enquiries received

### AdminDashboard (/admin) [ADMIN ONLY]
- Platform statistics (total users, properties, bookings)
- List of all users (enable/disable)
- List of all properties (verify/unverify)

---

## Key Components (in frontend/src/components/)

| Component | Purpose |
|-----------|---------|
| Navbar | Top navigation bar, shows login/logout based on auth state |
| Footer | Bottom footer |
| (others) | Various reusable UI components |

---

## Auth Context (frontend/src/context/AuthContext.jsx)

This is the global state manager for authentication.
It provides:
- user - the currently logged-in user object (or null)
- loading - true while checking auth status
- login(token) - saves token and loads user
- logout() - clears token

All pages can access this via: useAuth() hook

---

## Tech: How Frontend Calls Backend

Files in frontend/src/services/ contain Axios functions.
Example:
```
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```
