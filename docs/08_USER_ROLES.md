# User Roles - NestMate

NestMate has 3 roles. Each role has different permissions.

---

## Role Overview

| Role | Who is this? | What they can do |
|------|-------------|-----------------|
| tenant | Regular user searching for property | Browse, search, book, enquire, wishlist, reviews, messages, roommate finder |
| owner | Person who owns property and wants to rent it | Everything tenant can do + create/manage listings |
| admin | Platform administrator | Everything + manage all users, verify properties, see all data |

---

## Tenant (Default Role)

When you register without specifying role, you become a TENANT.

What a tenant CAN do:
- Browse and search all available properties
- View property details
- Book a property (request to visit)
- Send enquiries to property owners
- Add properties to wishlist/favorites
- Write reviews on properties they visited
- Send and receive messages
- View browsing history
- Set roommate preferences and find roommates
- Get notifications

What a tenant CANNOT do:
- Create or list properties
- Access admin dashboard
- Verify properties
- Manage other users

---

## Owner

To become an owner, register with role: "owner"

What an owner CAN do (everything a tenant can, plus):
- Create new property listings
- Edit their own properties
- Delete their own properties
- View enquiries for their properties
- Approve or reject booking requests
- View their properties' performance

What an owner CANNOT do:
- Access admin panel
- Manage other users
- Verify properties (only admin can)

---

## Admin

Admin is created via the seed script:
```
cd backend
npm run seed:admin
```

Credentials from .env:
  Email:    admin@example.com
  Password: Admin@12345

What an admin CAN do (everything, plus):
- View admin dashboard with stats
- See all properties (including unverified)
- Verify/unverify any property
- See all users
- Enable or disable any user account
- Access all protected routes

---

## How Roles Work Technically

When you login, the server returns a JWT token.
Inside the token, your role is encoded.

Every protected route checks:
1. Is there a valid token? (authMiddleware - protect)
2. Does the token have the right role? (authMiddleware - authorize)

Example in code:
```
r.post("/", protect, authorize("owner", "admin"), create);
```
This means: only owners and admins can create a property.

---

## Frontend Role-Based Navigation

| Route | Who Can Access |
|-------|---------------|
| / (Home) | Everyone |
| /search | Everyone |
| /login | Everyone (not logged in) |
| /register | Everyone (not logged in) |
| /properties/:id | Everyone |
| /roommates | Everyone |
| /roommate-profile | Any logged-in user |
| /wishlist | Any logged-in user |
| /history | Any logged-in user |
| /bookings | Any logged-in user |
| /owner | Owner only |
| /admin | Admin only |
