# How to Run NestMate Locally

---

## Prerequisites (Install These First)

| Tool | Download Link | Check if installed |
|------|--------------|-------------------|
| Node.js (v18+) | https://nodejs.org | Run: node --version |
| npm | Comes with Node.js | Run: npm --version |
| Git | https://git-scm.com | Run: git --version |

---

## Step 1 - Open the Project

Open VS Code and open the folder:
  C:\Users\vinay\OneDrive\Desktop\nestmate

---

## Step 2 - Setup Backend

Open a terminal (PowerShell or CMD) and run:

```
cd C:\Users\vinay\OneDrive\Desktop\nestmate\backend
npm install
```

Check your .env file exists at:  backend/.env

It should have these values:
```
PORT=5000
MONGO_URI=mongodb+srv://utkarshsharmaa44_db_user:Utkarsh_pancholi_2005@smart-rental.h93j08g.mongodb.net/?appName=smart-rental
JWT_SECRET=change_this_to_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
```

Start the backend:
```
npm run dev
```

You should see:
  Server running on http://localhost:5000

---

## Step 3 - Setup Frontend

Open a NEW terminal tab and run:

```
cd C:\Users\vinay\OneDrive\Desktop\nestmate\frontend
npm install
npm run dev
```

You should see:
  VITE v6.x  ready in X ms
  Local:   http://localhost:5173/

---

## Step 4 - Seed Admin User (Optional but Recommended)

If you need an admin account, run this in a new terminal:

```
cd C:\Users\vinay\OneDrive\Desktop\nestmate\backend
npm run seed:admin
```

This creates an admin user using the ADMIN_EMAIL and ADMIN_PASSWORD from your .env file.

Default admin credentials:
  Email:    admin@example.com
  Password: Admin@12345 (or whatever you set in .env)

---

## Step 4b - Seed Sample Properties (Optional)

To seed initial property listings from `properties.json`:

```
cd C:\Users\vinay\OneDrive\Desktop\nestmate\backend
npm run seed:properties
```

This attaches each property to a valid owner account and populates your database with sample rental properties.

---

## Step 5 - Open in Browser

Frontend: http://localhost:5173
Backend API: http://localhost:5000
Health Check: http://localhost:5000/api/health

---

## Run with Docker (Alternative)

If you have Docker Desktop installed:

```
cd C:\Users\vinay\OneDrive\Desktop\nestmate\devops
docker-compose up --build
```

This starts both frontend and backend in containers:
- Frontend: http://localhost:80
- Backend: http://localhost:5000

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 already in use | Change PORT in .env to 5001 |
| MongoDB connection error | Check your MONGO_URI is correct |
| npm install fails | Delete node_modules and try again |
| Frontend cant reach backend | Make sure backend is running on port 5000 |
