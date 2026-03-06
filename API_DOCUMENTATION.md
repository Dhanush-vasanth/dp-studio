# DP Studio - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

JWT Token is required for protected endpoints. Include it in the header:

```
Authorization: Bearer <token>
```

---

## 🔐 Auth Endpoints

### Register User

**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login User

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Logout

**GET** `/auth/logout`

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 📸 Portfolio Endpoints

### Get All Portfolio Images

**GET** `/portfolio`

**Query Parameters:**
- `category` (optional): Filter by category (Wedding, Events, Baby, Outdoor, Engagement, PreWedding)

**Example:**
```
GET /portfolio?category=Wedding
```

**Success Response (200):**
```json
[
  {
    "_id": "image_id",
    "title": "Wedding Ceremony",
    "imageUrl": "/uploads/image.jpg",
    "category": "Wedding",
    "uploadedBy": {
      "_id": "user_id",
      "name": "Admin"
    },
    "createdAt": "2024-03-05T10:00:00Z"
  }
]
```

---

### Upload Portfolio Image

**POST** `/portfolio`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (string, required): Image title
- `category` (string, required): Category
- `image` (file, required): Image file (max 5MB)

**Success Response (201):**
```json
{
  "message": "Portfolio image uploaded successfully",
  "image": {
    "_id": "image_id",
    "title": "Wedding Ceremony",
    "imageUrl": "/uploads/image_123.jpg",
    "category": "Wedding",
    "uploadedBy": "user_id",
    "createdAt": "2024-03-05T10:00:00Z"
  }
}
```

---

### Delete Portfolio Image

**DELETE** `/portfolio/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Portfolio image deleted successfully"
}
```

---

## 🎨 Services Endpoints

### Get All Services

**GET** `/services`

**Success Response (200):**
```json
[
  {
    "_id": "service_id",
    "title": "Wedding Photography",
    "description": "Complete wedding coverage...",
    "image": "https://example.com/image.jpg",
    "createdAt": "2024-03-05T10:00:00Z"
  }
]
```

---

### Create Service

**POST** `/services`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Wedding Photography",
  "description": "Complete wedding coverage from ceremony to reception",
  "image": "https://example.com/image.jpg"
}
```

**Success Response (201):**
```json
{
  "message": "Service created successfully",
  "service": {
    "_id": "service_id",
    "title": "Wedding Photography",
    "description": "Complete wedding coverage...",
    "image": "https://example.com/image.jpg",
    "createdAt": "2024-03-05T10:00:00Z"
  }
}
```

---

### Delete Service

**DELETE** `/services/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Service deleted successfully"
}
```

---

## 💬 Contact Endpoints

### Send Contact Message

**POST** `/contact`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "message": "Interested in wedding photography services"
}
```

**Success Response (201):**
```json
{
  "message": "Message sent successfully",
  "contact": {
    "_id": "message_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 98765 43210",
    "message": "Interested in wedding photography services",
    "createdAt": "2024-03-05T10:00:00Z"
  }
}
```

---

### Get All Contact Messages

**GET** `/contact`

**Headers:**
```
Authorization: Bearer <token>
```

(Admin only)

**Success Response (200):**
```json
[
  {
    "_id": "message_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 98765 43210",
    "message": "Interested in wedding photography services",
    "createdAt": "2024-03-05T10:00:00Z"
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Portfolio image not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Something went wrong"
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Get Services
```bash
curl http://localhost:5000/api/services
```

### Upload Portfolio Image
```bash
curl -X POST http://localhost:5000/api/portfolio \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Wedding Ceremony" \
  -F "category=Wedding" \
  -F "image=@/path/to/image.jpg"
```

### Send Contact Message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane",
    "email":"jane@example.com",
    "phone":"+91987654321",
    "message":"Interested in services"
  }'
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Rate Limiting

Currently no rate limiting. Consider implementing in production!

## CORS

Allow origins:
- http://localhost:3000 (dev)
- https://yourdomain.com (production)
