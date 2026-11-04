# Environment Variables - NestMate

---

## Backend (.env) - Located at: backend/.env

| Variable | Example Value | Description |
|----------|--------------|-------------|
| PORT | 5000 | Port the backend server runs on |
| MONGO_URI | mongodb+srv://... | MongoDB Atlas connection string |
| JWT_SECRET | some_random_string | Secret key to sign JWT tokens. CHANGE THIS! |
| JWT_EXPIRES_IN | 7d | How long login sessions last (7 days) |
| CLIENT_URL | http://localhost:5173 | Frontend URL (for CORS) |
| ADMIN_EMAIL | admin@example.com | Email for the default admin account |
| ADMIN_PASSWORD | Admin@12345 | Password for the default admin account |
| CLOUDINARY_CLOUD_NAME | your_cloud_name | Cloudinary account name (for images) |
| CLOUDINARY_API_KEY | 123456789 | Cloudinary API key |
| CLOUDINARY_API_SECRET | abc123... | Cloudinary API secret |

---

## Frontend (.env) - Located at: frontend/.env (if it exists)

| Variable | Example Value | Description |
|----------|--------------|-------------|
| VITE_API_URL | http://localhost:5000/api | Backend API base URL |

---

## Important Notes

1. NEVER commit .env to Git (it is in .gitignore already)

2. JWT_SECRET should be a long random string in production.
   To generate one, open PowerShell and run:
   ```
   [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   ```

3. Cloudinary is needed for image uploads.
   Sign up free at: https://cloudinary.com
   Then fill in CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

4. If CLOUDINARY values are empty, image upload will fail but everything else works fine.

5. CLIENT_URL must match your frontend URL exactly.
   Locally: http://localhost:5173
   In production: https://yourwebsite.com

6. The MONGO_URI already has real credentials for the Atlas cluster.
   Keep it secret.

---

## Current .env Values (backend)

PORT=5000
MONGO_URI=mongodb+srv://utkarshsharmaa44_db_user:...@smart-rental.h93j08g.mongodb.net/
JWT_SECRET=change_this_to_a_long_random_secret  <-- CHANGE THIS!
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
CLOUDINARY_CLOUD_NAME=(empty - images wont upload)
CLOUDINARY_API_KEY=(empty)
CLOUDINARY_API_SECRET=(empty)

---

## What You MUST Change Before Going Live (Production)

1. JWT_SECRET - Change to a long random secure string
2. ADMIN_PASSWORD - Change to something strong and secret
3. CLIENT_URL - Change to your real domain
4. Add real Cloudinary credentials for image uploads
