# How to Check Backend Data - NestMate

This is the most important guide for testing and inspecting your backend.

---

## METHOD 1 - Browser (Quickest, No Tools Needed)

Open your browser and visit these URLs while backend is running:

```
http://localhost:5000/
http://localhost:5000/api/health
http://localhost:5000/api/properties
http://localhost:5000/api/auth/me  (needs token - wont work in browser directly)
```

What you will see:
- GET /api/properties returns a JSON list of all properties
- GET /api/health returns { "ok": true, "service": "smart-rental" }

---

## METHOD 2 - Postman (RECOMMENDED - Best Tool)

### Install Postman
Download from: https://www.postman.com/downloads/

### How to use:

STEP 1 - Check API is alive
```
Method: GET
URL: http://localhost:5000/api/health
```
Expected: { "ok": true }

STEP 2 - Register a test user
```
Method: POST
URL: http://localhost:5000/api/auth/register
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@123",
  "role": "tenant"
}
```

STEP 3 - Login to get your token
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "test@example.com",
  "password": "Test@123"
}
```
COPY the token from the response. It looks like: eyJhbGciOiJIUzI1NiIs...

STEP 4 - Use token for private routes
```
Method: GET
URL: http://localhost:5000/api/auth/me
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

STEP 5 - View all properties
```
Method: GET
URL: http://localhost:5000/api/properties
```
No auth needed!

STEP 6 - Admin login
```
Method: POST
URL: http://localhost:5000/api/auth/login
Body:
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```
Then use admin token to call:
```
GET http://localhost:5000/api/admin/dashboard
GET http://localhost:5000/api/admin/users
GET http://localhost:5000/api/admin/properties
```

---

## METHOD 3 - Thunder Client (VS Code Extension)

If you use VS Code, install the extension "Thunder Client"
It is just like Postman but inside VS Code.

1. Open VS Code
2. Press Ctrl+Shift+X (Extensions)
3. Search "Thunder Client"
4. Install it
5. Click the Thunder Client icon in the left sidebar
6. Use it exactly like Postman

---

## METHOD 4 - MongoDB Atlas (View Raw Database)

To see the actual data stored in your database:

1. Go to: https://cloud.mongodb.com
2. Login with the credentials used to create the cluster
   (The MONGO_URI in .env shows: utkarshsharmaa44_db_user)
3. Click your cluster: smart-rental
4. Click "Browse Collections"
5. You will see all collections:
   - users
   - properties
   - bookings
   - enquiries
   - favorites
   - reviews
   - messages
   - notifications
   - histories
   - reports

You can:
- View all documents
- Filter/search data
- Edit documents directly
- Delete documents
- Export data as JSON/CSV

---

## METHOD 5 - MongoDB Compass (Desktop App)

A desktop GUI to browse your database visually.

1. Download: https://www.mongodb.com/products/compass
2. Install and open it
3. Connect using your MONGO_URI:
```
mongodb+srv://utkarshsharmaa44_db_user:Utkarsh_pancholi_2005@smart-rental.h93j08g.mongodb.net/?appName=smart-rental
```
4. Paste this in the connection string field
5. Click Connect
6. Browse all collections visually

Features:
- Visual query builder
- Schema analysis
- Real-time performance stats
- Export/import data

---

## METHOD 6 - cURL (Command Line)

Open PowerShell and run:

Check health:
```
curl http://localhost:5000/api/health
```

Get all properties:
```
curl http://localhost:5000/api/properties
```

Login:
```
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"Admin@12345"}'
```

---

## Key API URLs to Test (Quick Reference)

| What | Method | URL | Auth? |
|------|--------|-----|-------|
| Is backend alive | GET | /api/health | No |
| All properties | GET | /api/properties | No |
| One property | GET | /api/properties/:id | No |
| Login | POST | /api/auth/login | No |
| My profile | GET | /api/auth/me | YES |
| My bookings | GET | /api/bookings | YES |
| My wishlist | GET | /api/favorites | YES |
| All users (admin) | GET | /api/admin/users | ADMIN |
| Dashboard stats | GET | /api/admin/dashboard | ADMIN |

---

## Check Backend Console Logs

When you run "npm run dev" in backend, watch the terminal.
Every API request prints there. If something fails, the error shows in the terminal.

To see more detailed logs, add this to server.js temporarily:
```
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

---

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Missing or wrong token | Re-login and copy token again |
| 403 Forbidden | Wrong role (e.g., tenant accessing /admin) | Use admin account |
| 404 Not Found | Wrong URL | Check the route table above |
| 500 Internal Server Error | Backend bug | Check terminal logs |
| Connection refused | Backend not running | Run npm run dev in backend folder |
