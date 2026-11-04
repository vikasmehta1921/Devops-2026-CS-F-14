# Database Models - NestMate

All models are stored in MongoDB Atlas.
Files are in: backend/models/

---

## User Model (users collection)

File: backend/models/User.js

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | YES | Full name |
| email | String | YES | Unique email address |
| phone | String | NO | Phone number |
| password | String | YES | Hashed password (bcryptjs) |
| role | String | YES | "tenant", "owner", or "admin" |
| avatar | String | NO | Profile picture URL |
| preferences.city | String | NO | Preferred city for search |
| preferences.propertyType | String | NO | Preferred property type |
| preferences.furnishing | String | NO | Preferred furnishing |
| preferences.minRent | Number | NO | Min rent budget |
| preferences.maxRent | Number | NO | Max rent budget |
| preferences.amenities | [String] | NO | List of preferred amenities |
| isActive | Boolean | NO | Is account active (default: true) |
| createdAt | Date | AUTO | Timestamp |
| updatedAt | Date | AUTO | Timestamp |

---

## Property Model (properties collection)

File: backend/models/Property.js

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| owner | ObjectId (ref: User) | YES | Who owns this property |
| title | String | YES | Property title |
| description | String | YES | Full description |
| propertyType | String | YES | flat/apartment/pg/hostel/room/house |
| furnishing | String | YES | furnished/semi-furnished/unfurnished |
| roomType | String | NO | single/double/etc (default: single) |
| rent | Number | YES | Monthly rent amount |
| deposit | Number | NO | Security deposit amount |
| bedrooms | Number | NO | Number of bedrooms |
| bathrooms | Number | NO | Number of bathrooms |
| city | String | YES | City (indexed) |
| state | String | YES | State |
| locality | String | NO | Area/locality |
| pincode | String | NO | Postal code |
| address | String | NO | Full address |
| location.lat | Number | NO | GPS latitude |
| location.lng | Number | NO | GPS longitude |
| amenities | [String] | NO | List of amenities |
| images | [String] | NO | Array of image URLs |
| availableFrom | Date | NO | When it becomes available |
| status | String | NO | available/pending/rented |
| views | Number | NO | View count |
| verified | Boolean | NO | Admin-verified (default: false) |
| ratingAvg | Number | NO | Average rating (0-5) |
| ratingCount | Number | NO | Number of ratings |

---

## Booking Model (bookings collection)

File: backend/models/Booking.js

| Field | Type | Description |
|-------|------|-------------|
| tenant | ObjectId (ref: User) | Who is booking |
| property | ObjectId (ref: Property) | Which property |
| status | String | pending/approved/rejected/cancelled |
| message | String | Booking message |
| visitDate | Date | Requested visit date |

---

## Enquiry Model (enquiries collection)

File: backend/models/Enquiry.js

| Field | Type | Description |
|-------|------|-------------|
| sender | ObjectId (ref: User) | Who sent the enquiry |
| property | ObjectId (ref: Property) | About which property |
| message | String | The enquiry message |

---

## Favorite Model (favorites collection)

File: backend/models/Favorite.js

| Field | Type | Description |
|-------|------|-------------|
| user | ObjectId (ref: User) | Who favorited |
| property | ObjectId (ref: Property) | Which property |

---

## Review Model (reviews collection)

File: backend/models/Review.js

| Field | Type | Description |
|-------|------|-------------|
| reviewer | ObjectId (ref: User) | Who wrote the review |
| property | ObjectId (ref: Property) | Which property |
| rating | Number | Star rating (1-5) |
| comment | String | Review text |

---

## Message Model (messages collection)

File: backend/models/Message.js

| Field | Type | Description |
|-------|------|-------------|
| sender | ObjectId (ref: User) | Sender |
| receiver | ObjectId (ref: User) | Receiver |
| property | ObjectId (ref: Property) | Related property (optional) |
| text | String | Message content |
| read | Boolean | Is message read |

---

## Notification Model (notifications collection)

File: backend/models/Notification.js

| Field | Type | Description |
|-------|------|-------------|
| user | ObjectId (ref: User) | Who gets notified |
| message | String | Notification text |
| read | Boolean | Is it read |

---

## History Model (histories collection)

File: backend/models/History.js

| Field | Type | Description |
|-------|------|-------------|
| user | ObjectId (ref: User) | Whose history |
| property | ObjectId (ref: Property) | Which property was viewed |

---

## Report Model (reports collection)

File: backend/models/Report.js

| Field | Type | Description |
|-------|------|-------------|
| reporter | ObjectId (ref: User) | Who reported |
| property | ObjectId (ref: Property) | Which property |
| reason | String | Reason for report |

---

## Database Name

Your MongoDB Atlas cluster is: smart-rental
Collection names follow Mongoose default pluralization (User -> users, Property -> properties, etc.)
