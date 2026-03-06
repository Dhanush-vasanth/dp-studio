# 🚀 DP Studio - Getting Started Checklist

## ✅ Pre-Flight Checklist

Before starting, ensure you have:

- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed (optional but recommended)
- [ ] VS Code or any code editor
- [ ] Latest browser for testing

---

## 🎯 Quick Start Workflow

### STEP 1: Navigate to Project
```bash
cd "d:\projects\dp studio"
```

### STEP 2: Server Setup (Terminal 1)
```bash
cd server
npm install                    # Install dependencies
code .                        # Open in VS Code (optional)
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/dp-studio
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

Then run:
```bash
node seed.js                  # Initialize database ⭐
npm run dev                   # Start server
```

✅ **Server Running:** http://localhost:5000

### STEP 3: Client Setup (Terminal 2)
```bash
cd client
npm install                   # Install dependencies
npm run dev                   # Start frontend
```

✅ **Frontend Running:** http://localhost:3000

### STEP 4: Open Browser
Go to: **http://localhost:3000**

### STEP 5: Login
Use credentials:
- Email: `admin@dpstudio.com`
- Password: `admin123`

✅ **You're In!**

---

## 📚 Documentation Map

```
START HERE ↓
README.md           ← Complete guide
     ↓
Choose your path:
     ├─ QUICKSTART.md                   (5-min setup)
     ├─ SETUP_TROUBLESHOOTING.md        (MongoDB help)
     ├─ API_DOCUMENTATION.md            (API reference)
     ├─ PROJECT_CHECKLIST.md            (Features list)
     ├─ INDEX.md                        (File structure)
     └─ DELIVERY_SUMMARY.md             (What's built)
```

---

## 🔥 Common First Steps

### After Login:
1. ✅ Go to `/dashboard` (visible in navbar)
2. ✅ Click "Upload Portfolio"
3. ✅ Enter image title: "Test Image"
4. ✅ Select category: "Wedding"
5. ✅ Choose an image file
6. ✅ Click "Upload Image"
7. ✅ Visit `/portfolio` to see your image
8. ✅ Click image to preview

### Test Other Features:
1. ✅ Visit `/contact` and send a message
2. ✅ In dashboard, view the message
3. ✅ Visit `/services` and check available services
4. ✅ Logout and login again to test auth
5. ✅ Register a new account

---

## 🆘 If Something Breaks

### Issue: "Cannot GET /api/*"
**Solution:** Backend not running
```bash
cd server
npm run dev
```

### Issue: "Failed to fetch"
**Solution:** Check backend URL in client
Edit: `client/src/services/api.js`

### Issue: "MongoDB connection failed"
**Solution:** MongoDB not running
```bash
mongod
# Or if on macOS:
brew services start mongodb-community
```

### Issue: "Port already in use"
**Solution:** Change PORT in `server/.env`
```env
PORT=5001
```

### Issue: Dependencies missing
**Solution:** Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

👉 **See SETUP_TROUBLESHOOTING.md for more solutions**

---

## 💡 Pro Tips

1. **Always run backend first** - Frontend depends on it
2. **Check both terminals** - Errors might be in either
3. **Use browser DevTools** - F12 for debugging
4. **Restart if stuck** - Stop and start servers again
5. **Clear cache** - Ctrl+Shift+Delete in browser

---

## 📂 Key Files Location

### Server Config
- `server/.env` - Database connection
- `server/server.js` - Main server

### Frontend Config
- `client/src/services/api.js` - API URL
- `client/src/App.jsx` - Routes

### Database
- `server/models/*.js` - Database schemas

### Auth
- `server/controllers/authController.js` - Login logic
- `client/src/context/AuthContext.jsx` - Auth state

---

## ✨ After Setup

### Try These:
- [ ] Login as admin
- [ ] Upload a portfolio image
- [ ] Delete the image
- [ ] Add a new service
- [ ] Send a contact message
- [ ] View message in dashboard
- [ ] Register new user
- [ ] Login as new user
- [ ] Browse portfolio
- [ ] Filter by category

### Then Customize:
- [ ] Change colors in `tailwind.config.js`
- [ ] Update company name in pages
- [ ] Add your own images
- [ ] Update contact information
- [ ] Modify hero section text

### Finally Deploy:
- [ ] Build frontend: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Deploy backend to Heroku
- [ ] Setup production MongoDB

---

## 🚨 Emergency Commands

```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Clear npm cache
npm cache clean --force

# Completely reinstall
rm -rf node_modules
npm install

# Check Node version
node --version

# Check npm version
npm --version

# View system processes
npm list -g
```

---

## 📞 Quick Reference

| Command | Terminal | Purpose |
|---------|----------|---------|
| `npm install` | Any | Install dependencies |
| `npm run dev` | Server | Start dev server |
| `npm run dev` | Client | Start dev server |
| `npm run build` | Client | Build for production |
| `node seed.js` | Server | Initialize database |
| `npm cache clean --force` | Any | Clear npm cache |

---

## ✅ Verification Checklist

After everything is running, verify:

- [ ] Backend shows "Server is running on port 5000"
- [ ] Frontend shows "Local: http://localhost:3000"
- [ ] Can open http://localhost:3000 in browser
- [ ] Login page loads
- [ ] Can login with admin@dpstudio.com / admin123
- [ ] Dashboard loads
- [ ] Can upload image
- [ ] Can view portfolio
- [ ] Can send contact message

---

## 🎯 Success Indicators

✅ **You're successful when:**
1. Both servers running without errors
2. Frontend loads at localhost:3000
3. Can login with demo credentials
4. Dashboard is accessible
5. Can upload and view images
6. All pages load without errors

---

## 📱 Testing Different Pages

| Page | URL | Status |
|------|-----|--------|
| Home | http://localhost:3000 | ✅ |
| About | http://localhost:3000/about | ✅ |
| Services | http://localhost:3000/services | ✅ |
| Portfolio | http://localhost:3000/portfolio | ✅ |
| Contact | http://localhost:3000/contact | ✅ |
| Login | http://localhost:3000/login | ✅ |
| Register | http://localhost:3000/register | ✅ |
| Dashboard | http://localhost:3000/dashboard | ✅ (admin only) |

---

## 🎓 Learning Path

1. **Beginner:** Just run it and explore
2. **Intermediate:** Modify colors and text
3. **Advanced:** Understand the code
4. **Expert:** Add new features

---

## 🔐 Remember

- ✅ Default admin: admin@dpstudio.com / admin123
- ✅ No passwords in source code
- ✅ Keep .env files private
- ✅ Use strong JWT_SECRET in production
- ✅ Never commit sensitive data

---

## 📞 Contact Info in Demo

- Email: info@dpstudio.com
- Phone: +91 98765 43210
- Address: 123 Photography Street, Chennai

(Update these in pages!)

---

## 🎉 You're Ready!

Everything is set up and ready to go!

Next: **Read README.md for complete guidance**

---

**Estimated Time to Full Setup:** 15-20 minutes  
**Difficulty Level:** Beginner-Friendly  
**Support Available:** All documentation included

---

Good luck with your DP Studio project! 🚀
