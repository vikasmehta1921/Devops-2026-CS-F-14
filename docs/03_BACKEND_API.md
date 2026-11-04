# Backend API Reference - NestMate

Base URL: http://localhost:5000/api

Legend:
  [PUBLIC]  = No login required
  [PRIVATE] = Must be logged in (JWT token required)
  [OWNER]   = Must be logged in as owner or admin
  [ADMIN]   = Must be logged in as admin only

---

## Health Check

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | / | PUBLIC | Check if API is running |
| GET | /api/health | PUBLIC | Health check endpoint |

---

## Auth Routes  (/api/auth)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | PUBLIC | Create new account |
| POST | /api/auth/login | PUBLIC | Login, get JWT token |
| GET | /api/auth/me | PRIVATE | Get current logged-in user |
| PUT | /api/auth/change-password | PRIVATE | Change your password |

### Example: Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
Response: returns JWT token + user info

---

## Property Routes  (/api/properties)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/properties | PUBLIC | List/search all properties |
| GET | /api/properties/:id | PUBLIC | Get one property by ID |
| GET | /api/properties/mine | OWNER | Get properties owned by me |
| GET | /api/properties/recommended | PRIVATE | Get recommended properties |
| POST | /api/properties | OWNER | Create/list new property |
| PUT | /api/properties/:id | OWNER | Update your property |
| DELETE | /api/properties/:id | OWNER | Delete your property |

### Query Params for GET /api/properties
```
?city=Mumbai
?propertyType=flat
?minRent=5000&maxRent=20000
?furnishing=furnished
?search=2bhk
```

---

## Booking Routes  (/api/bookings)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/bookings | PRIVATE | Get your bookings |
| POST | /api/bookings | PRIVATE | Book a property |
| PUT | /api/bookings/:id | PRIVATE | Update booking status |
| DELETE | /api/bookings/:id | PRIVATE | Cancel a booking |

---

## Enquiry Routes  (/api/enquiries)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/enquiries | PRIVATE | Get your enquiries |
| POST | /api/enquiries | PRIVATE | Send an enquiry |
| DELETE | /api/enquiries/:id | PRIVATE | Delete an enquiry |

---

## Favorites Routes  (/api/favorites)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/favorites | PRIVATE | Get your saved properties |
| POST | /api/favorites | PRIVATE | Add to favorites |
| DELETE | /api/favorites/:id | PRIVATE | Remove from favorites |

---

## Review Routes  (/api/reviews)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/reviews | PUBLIC | Get reviews |
| POST | /api/reviews | PRIVATE | Write a review |
| DELETE | /api/reviews/:id | PRIVATE | Delete a review |

---

## Message Routes  (/api/messages)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/messages | PRIVATE | Get your messages |
| POST | /api/messages | PRIVATE | Send a message |

---

## Notification Routes  (/api/notifications)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/notifications | PRIVATE | Get your notifications |

---

## History Routes  (/api/history)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/history | PRIVATE | Get your browsing history |

---

## Report Routes  (/api/reports)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/reports | PRIVATE | Get reports |
| POST | /api/reports | PRIVATE | Submit a report |

---

## Upload Routes  (/api/uploads)

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/uploads | PRIVATE | Upload an image to Cloudinary |

---

## Admin Routes  (/api/admin) -- ADMIN ONLY

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/admin/dashboard | ADMIN | Get dashboard stats |
| GET | /api/admin/properties | ADMIN | List all properties |
| PUT | /api/admin/properties/:id/verify | ADMIN | Verify a property |
| GET | /api/admin/users | ADMIN | List all users |
| PUT | /api/admin/users/:id/status | ADMIN | Enable/disable a user |

---

## How to Send Auth Token

After login, you get a token. Send it in every private request:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```
