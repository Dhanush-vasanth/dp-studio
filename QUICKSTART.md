# DP Studio - Quick Start Guide

## Prerequisites
- Node.js v14+ installed
- MongoDB (local or Atlas)
- npm or yarn

## 5-Minute Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Configure MongoDB
# Edit .env file with your MongoDB connection string

# Seed database with sample data
node seed.js

# Start server
npm run dev
```

Server runs on → http://localhost:5000

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on → http://localhost:3000

### 3. Open Browser

Visit http://localhost:3000 and start using DP Studio!

## Demo Credentials

**Admin Account:**
- Email: admin@dpstudio.com
- Password: admin123

**User Account:**
- Email: user@dpstudio.com
- Password: user123

## Using MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dp-studio
   ```
5. Whitelist your IP address in MongoDB Atlas

## Quick Commands

**Server:**
```bash
cd server
npm install      # Install dependencies
npm run dev      # Start development server
npm start        # Start production server
node seed.js     # Seed database with sample data
```

**Client:**
```bash
cd client
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

**Can't connect to MongoDB?**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify credentials if using Atlas

**Port 5000 or 3000 in use?**
- Change PORT in server/.env or use different port
- Kill the process using the port

**CORS Error?**
- Ensure server is running
- Check server URL in client vite.config.js

**Images not uploading?**
- Ensure server/uploads directory exists
- Check file is under 5MB
- Verify file format (jpg, png, gif)

## File Structure

```
dp-studio/
├── server/          ← Backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
├── client/          ← Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

## Next Steps

1. ✅ Setup and run the project
2. Register a new account
3. Admin login with demo credentials
4. Upload portfolio images
5. Add services
6. Send test contact messages

## Full Documentation

See [README.md](./README.md) for complete documentation.

Happy coding! 🚀
