# DP Studio - Photography Portfolio Website

A complete MERN Stack Photography Portfolio Website built with MongoDB, Express.js, React.js, and Node.js.

## 🎯 Project Overview

DP Studio is a professional photography portfolio website that allows users to:
- View photography portfolio with category filtering
- Browse various photography services
- Contact the studio with inquiries
- Register and login to their accounts
- Admin dashboard for managing portfolio, services, and messages

## 📋 Tech Stack

**Frontend (Client):**
- React 18 with Vite
- React Router DOM for navigation
- Axios for API calls
- TailwindCSS for styling

**Backend (Server):**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Multer for image uploads
- CORS for cross-origin requests

## 📁 Project Structure

```
dp-studio/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── server/                 # Express Backend
│   ├── models/            # MongoDB schemas
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── config/            # Database & multer config
│   ├── uploads/           # Uploaded images directory
│   ├── server.js          # Main server file
│   ├── package.json
│   ├── .env               # Environment variables
│   └── .gitignore

└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Git

### Installation Steps

#### 1. Clone the Repository

```bash
cd "d:\projects\dp studio"
```

#### 2. Install Server Dependencies

```bash
cd server
npm install
```

#### 3. Configure Server Environment

Create/Edit `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017/dp-studio
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dp-studio
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

#### 4. Install Client Dependencies

```bash
cd ../client
npm install
```

#### 5. Create Initial Admin User (Optional)

To seed the database with an admin user and sample services, run:

```bash
# From server directory
node seed.js
```

## 🏃 Running the Application

### Start MongoDB

If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas, ensure connection string is correct in `.env`.

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Frontend

In a new terminal:
```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🔐 Authentication

### Demo Admin Credentials

- **Email:** admin@dpstudio.com
- **Password:** admin123

### Default User (created via seed)

- **Email:** user@dpstudio.com
- **Password:** user123

## 📄 Available Pages

### Public Pages
- **Home** (`/`) - Landing page with hero, services, portfolio preview
- **About** (`/about`) - Studio information and equipment details
- **Services** (`/services`) - All photography services
- **Portfolio** (`/portfolio`) - Gallery with category filtering
- **Contact** (`/contact`) - Contact form and information

### Authentication Pages
- **Register** (`/register`) - New user registration
- **Login** (`/login`) - User login

### Protected Pages
- **Dashboard** (`/dashboard`) - Admin panel (only for admin users)
  - Upload portfolio images
  - Manage portfolio images
  - Add/delete services
  - View contact messages

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Portfolio
- `GET /api/portfolio` - Get all portfolio images (supports ?category filter)
- `POST /api/portfolio` - Upload portfolio image (Admin only, multipart/form-data)
- `DELETE /api/portfolio/:id` - Delete portfolio image (Admin only)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all contact messages (Admin only)

## 📦 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/user),
  createdAt: Date
}
```

### PortfolioImage
```javascript
{
  title: String,
  imageUrl: String,
  category: String (Wedding/Events/Baby/Outdoor/Engagement/PreWedding),
  uploadedBy: ObjectId (ref: User),
  createdAt: Date
}
```

### Service
```javascript
{
  title: String,
  description: String,
  image: String,
  createdAt: Date
}
```

### ContactMessage
```javascript
{
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date
}
```

## 🎨 Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin/User)

✅ **Portfolio Management**
- Image gallery with category filtering
- Lightbox preview
- Image upload with file validation
- Responsive grid layout

✅ **Admin Dashboard**
- Upload and manage portfolio images
- Create and delete services
- View contact inquiries
- User management

✅ **Responsive Design**
- Mobile-friendly layout
- TailwindCSS styling
- Professional UI

✅ **Contact Management**
- Contact form submission
- Message storage in database
- Admin can view all messages

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
```bash
# Change PORT in .env file or kill existing process
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error
- Ensure server is running on correct port
- Check CORS configuration in server.js
- Verify API proxy in vite.config.js

### Image Upload Not Working
- Check `uploads/` directory exists and is writable
- Verify file size is under 5MB
- Check file type is image (jpeg, jpg, png, gif)

## 📚 API Usage Examples

### Register User
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

### Upload Portfolio Image
```bash
curl -X POST http://localhost:5000/api/portfolio \
  -H "Authorization: Bearer <token>" \
  -F "title=Wedding Ceremony" \
  -F "category=Wedding" \
  -F "image=@photo.jpg"
```

### Get Portfolio Images
```bash
curl http://localhost:5000/api/portfolio?category=Wedding
```

### Send Contact Message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane",
    "email":"jane@example.com",
    "phone":"+91987654321",
    "message":"Interested in wedding photography"
  }'
```

## 🔒 Security Considerations

1. **Change JWT Secret** - Update `JWT_SECRET` in production
2. **Use HTTPS** - Enable HTTPS in production
3. **Environment Variables** - Never commit .env file
4. **Rate Limiting** - Consider adding rate limiting middleware
5. **Input Validation** - All inputs are validated
6. **Password Security** - Passwords are hashed with bcrypt

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Push to platform

## 📞 Support

For issues or questions, please refer to the code comments or create an issue.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a college mini project for learning MERN Stack development.

---

**Happy Coding! 🎉**
