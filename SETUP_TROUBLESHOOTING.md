# DP Studio - Setup & Troubleshooting Guide

## System Requirements

- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher
- **MongoDB:** v4.4.0 or higher
- **RAM:** 2GB minimum
- **Disk Space:** 500MB minimum

---

## MongoDB Setup

### Option 1: Local MongoDB Installation

#### Windows

1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Use default settings
4. MongoDB will install and run as a service
5. Optional: Download MongoDB Compass (GUI) for visualization

**Verify Installation:**
```bash
mongod --version
```

**Start MongoDB Service:**
```bash
# Windows (if installed as service)
net start MongoDB

# Or run mongod directly
mongod
```

#### macOS

1. Using Homebrew (recommended):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

2. Or download from: https://www.mongodb.com/try/download/community

**Start MongoDB:**
```bash
brew services start mongodb-community
# or
mongod
```

#### Linux (Ubuntu)

```bash
# Update package lists
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Verify:**
```bash
mongo --version
```

---

### Option 2: MongoDB Atlas (Cloud)

**Recommended for beginners!**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (select M0 tier - free)
4. Wait for cluster to deploy (5-10 minutes)
5. Click "Connect"
6. Choose "Connect Your Application"
7. Copy the connection string
8. Replace `<username>` and `<password>` with your credentials
9. Add `/dp-studio` at the end before `?`

**Example Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/dp-studio
```

10. Update `.env` file with this connection string

**Whitelist Your IP:**
- Go to "Network Access"
- Click "Add IP Address"
- Add your current IP or "0.0.0.0/0" (allow all)

---

## Project Installation

### 1. Clone/Download Project

```bash
cd "d:\projects\dp studio"
```

### 2. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit .env with your MongoDB URI

# Seed database with sample data
node seed.js

# Start development server
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost
Server is running on port 5000
```

### 3. Client Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v4.3.9  ready in 250 ms
  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

---

## Common Issues & Solutions

### Issue 1: MongoDB Connection Error

**Error Message:**
```
Error connecting to MongoDB: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Local MongoDB not running:**
```bash
# Start MongoDB
mongod

# Or check service status
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

2. **Wrong connection string:**
```bash
# Check .env file
# For local: mongodb://localhost:27017/dp-studio
# For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/dp-studio
```

3. **MongoDB Atlas IP whitelist:**
   - Go to Network Access in MongoDB Atlas
   - Add your IP address
   - Wait a few minutes for changes to apply

4. **Port 27017 in use:**
```bash
# Find and kill process on port 27017
# Windows:
netstat -ano | findstr :27017
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :27017
kill -9 <PID>
```

---

### Issue 2: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE :::5000
```

**Solutions:**

1. **Kill process using port:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

2. **Use different port:**
   - Edit `server/.env`
   - Change `PORT=5000` to `PORT=5001`

---

### Issue 3: CORS Error

**Error Message:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**

1. **Ensure server is running:**
```bash
# Check if server is running on http://localhost:5000
curl http://localhost:5000/api/health
```

2. **Check Vite proxy config:**
```javascript
// client/vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

3. **Restart both servers:**
   - Stop both dev servers
   - Clear browser cache (Ctrl+Shift+Delete)
   - Start servers again

---

### Issue 4: Dependencies Installation Fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve dependency peer
```

**Solutions:**

1. **Use legacy peer deps:**
```bash
npm install --legacy-peer-deps
```

2. **Clear npm cache:**
```bash
npm cache clean --force
npm install
```

3. **Delete node_modules and package-lock.json:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 5: Image Upload Not Working

**Symptoms:**
- Image upload endpoint returns error
- No files in `server/uploads/` directory

**Solutions:**

1. **Ensure uploads directory exists:**
```bash
# Create if missing
mkdir -p server/uploads
```

2. **Check file size (max 5MB):**
   - Ensure image is under 5MB
   - Compress if needed

3. **Check file type:**
   - Allowed: jpg, jpeg, png, gif
   - Not allowed: bmp, webp (modify multer.js if needed)

4. **Check permissions:**
   - Ensure server has write permission to `uploads/` folder

5. **Browser console errors:**
   - Open DevTools (F12)
   - Check Network tab for failed requests
   - Check Console for errors

---

### Issue 6: Authentication Issues

**Error: "Invalid credentials" even with correct password**

**Solutions:**

1. **Seed database first:**
```bash
cd server
node seed.js
```

2. **Try demo credentials:**
   - Email: admin@dpstudio.com
   - Password: admin123

3. **Check password:**
   - Passwords are case-sensitive
   - No spaces before/after

4. **Clear localStorage:**
```javascript
// Browser console:
localStorage.clear()
// Refresh page
location.reload()
```

---

### Issue 7: Vite Hot Module Replacement Not Working

**Problem:** Changes to code don't reflect automatically

**Solutions:**

1. **Restart dev server:**
```bash
cd client
npm run dev
```

2. **Check vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  }
})
```

3. **Force refresh:** Ctrl+Shift+R (hard refresh)

---

### Issue 8: npm run dev Shows "Vue" Instead of "React"

**Problem:** Wrong framework detected

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Performance Tips

1. **Optimize Images:**
   - Use compressed images
   - Recommended size: max 2MB
   - Format: jpg or png

2. **Database Indexing:**
   - Ensure indexes on frequently queried fields
   - Example: `email` field in User model

3. **API Response:**
   - Limit results with pagination
   - Currently returns all records

4. **Client-Side:**
   - Use code splitting
   - Lazy load images
   - Minify on production build

---

## Production Deployment Checklist

- [ ] Change `JWT_SECRET` in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only
- [ ] Enable CORS for your domain only
- [ ] Setup rate limiting
- [ ] Add input validation
- [ ] Use environment variables for sensitive data
- [ ] Setup MongoDB backup
- [ ] Enable MongoDB authentication
- [ ] Use CDN for static files
- [ ] Setup error logging (Sentry, LogRocket, etc.)
- [ ] Setup monitoring (Datadog, New Relic, etc.)

---

## Useful Commands

### Server Commands
```bash
cd server

# Install dependencies
npm install

# Start development (with auto-reload)
npm run dev

# Start production
npm start

# Seed database
node seed.js

# Check Node version
node --version

# Clear npm cache
npm cache clean --force
```

### Client Commands
```bash
cd client

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### MongoDB Commands
```bash
# Connect to MongoDB shell
mongo

# Or newer version:
mongosh

# Common commands in shell:
use dp-studio              # Switch database
db.users.find()           # List all users
db.services.find()        # List all services
db.portfolioimages.find() # List all images
db.contactmessages.find() # List all messages
```

---

## Resources

- **Node.js Docs:** https://nodejs.org/docs/
- **Express.js Guide:** https://expressjs.com/
- **React Documentation:** https://react.dev/
- **MongoDB Docs:** https://docs.mongodb.com/
- **Mongoose Docs:** https://mongoosejs.com/
- **TailwindCSS:** https://tailwindcss.com/docs
- **Vite Guide:** https://vitejs.dev/guide/

---

## Getting Help

1. **Check error messages carefully** - they usually point to the problem
2. **Google the error message** - most issues are common
3. **Check GitHub Issues** - see if others faced similar problems
4. **Ask on Stack Overflow** - include full error message and code
5. **Check console logs** - browser console (F12) and terminal output

---

## Next Steps

✅ Setup complete? Now:
1. Register a new account
2. Login as admin (use demo credentials)
3. Upload some portfolio images
4. Add services
5. Test contact form
6. Send messages and review in dashboard

Happy coding! 🚀
