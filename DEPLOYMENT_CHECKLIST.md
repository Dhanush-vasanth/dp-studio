# DP Studio - Deployment Checklist
## For Render Platform

---

## PRE-DEPLOYMENT VERIFICATION

### Code Quality
- [ ] All tests pass locally
- [ ] No console errors in dev mode (`npm run dev`)
- [ ] Production build completes successfully (`npm run build`)
- [ ] All new components tested
- [ ] No hardcoded API URLs
- [ ] Environment variables are properly configured
- [ ] Security headers are in place
- [ ] Error boundary is implemented

### Database
- [ ] MongoDB Atlas connection string is set
- [ ] Database user created with secure password
- [ ] IP whitelist includes Render IPs (0.0.0.0/0)
- [ ] Backup strategy documented
- [ ] Database indexes created on frequently queried fields

### Third-Party Services
- [ ] Cloudinary account created and configured
- [ ] Cloudinary API keys stored in environment variables
- [ ] JWT_SECRET generated and stored securely
- [ ] All API keys are strong and unique

### Files Changed
- [ ] All 15 fixes reviewed and tested
- [ ] No regression in existing functionality
- [ ] Performance not degraded
- [ ] Mobile responsive verified

---

## DEPLOYMENT STEPS - RENDER.COM

### Step 1: Prepare Render Environment Variables

Go to Render Dashboard → Your Service → Environment

**Backend (API) Service** - Add these variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dp-studio
JWT_SECRET=<generate_strong_random_key_>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

**Generate Strong JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Verify Render.yaml

Ensure `render.yaml` in root directory contains:
```yaml
services:
  - type: web
    name: dp-studio-api
    env: node
    region: oregon
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars: [MONGODB_URI, JWT_SECRET, etc.]

  - type: web
    name: dp-studio-web
    env: static
    region: oregon
    plan: free
    buildCommand: cd client && npm install && npm run build
    staticPublishPath: client/dist
    envVars:
      - key: VITE_API_URL
        value: https://dp-studio-api.onrender.com
```

**Note**: Replace `dp-studio-api.onrender.com` with your actual API service URL

### Step 3: Deploy Backend Service

1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect GitHub repository
3. Select branch (main)
4. Configure:
   - **Name**: `dp-studio-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click "Create Web Service"
6. Wait for build to complete (3-5 minutes)
7. Note the service URL (e.g., `https://dp-studio-api.onrender.com`)

### Step 4: Deploy Frontend Service

1. Go to Render Dashboard → "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `dp-studio-web`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://dp-studio-api.onrender.com` (from Step 3)
5. Click "Create Static Site"
6. Wait for build to complete (2-3 minutes)
7. Your frontend URL will be displayed (e.g., `https://dp-studio-web.onrender.com`)

### Step 5: Seed Database

After both services are deployed:

1. Go to Backend Service → "Shell"
2. Run:
   ```bash
   cd server && node seed.js
   ```
3. Output should show:
   ```
   Admin user created: admin@dpstudio.com
   Sample services created
   Database seeded successfully
   ```

### Step 6: Configure Custom Domain (Optional)

1. Go to Frontend Service Settings
2. "Custom Domain"
3. Add your domain (e.g., `dp-studio.com`)
4. Update DNS records as directed

### Step 7: Setup Auto-Deploys

1. Both services should auto-deploy on push to main
2. Verify in "Deploys" tab
3. Monitor first deployment for errors

---

## POST-DEPLOYMENT TESTING

### Immediate Checks (5 minutes)
- [ ] Frontend loads without errors
- [ ] Backend API responds (`/api/health`)
- [ ] No console errors on homepage
- [ ] 404 page appears for invalid routes
- [ ] Environment variables loaded correctly

### Functional Testing (15 minutes)
- [ ] Navigation works (all links clickable)
- [ ] Portfolio images load
- [ ] Services display
- [ ] Contact form submit works (check MongoDB)
- [ ] Login functionality works
- [ ] Admin panel accessible to admin users
- [ ] Image upload works (saves to Cloudinary)

### Performance Testing (5 minutes)
- [ ] Homepage load time < 3 seconds
- [ ] Gallery images lazy load
- [ ] No memory leaks on dev tools
- [ ] Bundle size gzipped < 100kB

### Security Testing (5 minutes)
- [ ] HTTPS enforced (Strict-Transport-Security header)
- [ ] X-Frame-Options header present
- [ ] CORS properly configured
- [ ] JWT tokens expire properly
- [ ] Sensitive data not exposed in console

---

## MONITORING SETUP

### Render Dashboard Monitoring
- [ ] Setup email alerts for service crashes
- [ ] Monitor CPU/Memory usage
- [ ] Check deployment logs for errors

### Uptime Monitoring (Recommended)
- [ ] Add external uptime monitor (e.g., UptimeRobot)
- [ ] Monitor `/api/health` endpoint every 5 minutes
- [ ] Setup alerts for downtime

### Log Monitoring
- [ ] Check Render logs regularly
- [ ] Monitor error rates in MongoDB
- [ ] Review contact form submissions

---

## ROLLBACK PROCEDURE

If deployment has critical issues:

1. **Stop new service**: Go to Service → Settings → Suspend
2. **Revert code**: Push previous commit to main branch
3. **Update environment variables** if needed
4. **Resume service**: Service will auto-redeploy
5. **Verify functionality**: Run post-deployment tests

---

## MAINTENANCE TASKS

### Daily
- [ ] Monitor error logs in Render
- [ ] Check database connection health
- [ ] Verify contact form submissions received

### Weekly
- [ ] Review analytics and uptime
- [ ] Check for failed API requests
- [ ] Backup database (if enabled)
- [ ] Review error logs

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Performance review
- [ ] Analyze user metrics

### Quarterly
- [ ] Full security audit
- [ ] Database optimization
- [ ] Performance benchmarking
- [ ] Plan feature updates

---

## TROUBLESHOOTING

### "Cannot GET /portfolio" on Frontend
**Problem**: Frontend deployed but routes not working
**Solution**: 
1. Check VITE_API_URL is set correctly in static site
2. Ensure render.yaml has correct frontend config
3. Verify `dist` folder was built successfully

### API Requests Failing
**Problem**: Frontend loads but API calls fail
**Solution**:
1. Check Backend service is running (Render Dashboard)
2. Verify VITE_API_URL matches actual API service URL
3. Check CORS is enabled in server.js
4. Check MongoDB connection string in environment variables

### 502 Bad Gateway Error
**Problem**: Service returns 502 error
**Solution**:
1. Check service logs in Render Dashboard
2. Verify environment variables are set correctly
3. Check database connection
4. Restart or redeploy service

### Cloudinary Upload Failing
**Problem**: Image upload doesn't work
**Solution**:
1. Verify Cloudinary credentials in environment
2. Check upload quota in Cloudinary dashboard
3. Verify file size limits

---

## SUCCESS CRITERIA

✅ **Deployment is successful when:**
- Frontend and backend both running on Render
- All routes accessible without errors
- Database seeded with initial data
- Contact form submissions saved to MongoDB
- Admin login works
- Portfolio images load and display
- No console errors on any page
- Mobile responsive layout works
- Page titles and meta tags correct
- Security headers present in responses

---

## SUPPORT & RESOURCES

- **Render Docs**: https://render.com/docs
- **React Vite Docs**: https://vitejs.dev
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

## DEPLOYMENT SIGN-OFF

- **Deployer**: ________________
- **Date**: ________________
- **Branch**: ________________
- **Render API URL**: ________________
- **Render Frontend URL**: ________________
- **Status**: ✅ LIVE / ❌ ISSUES FOUND (specify):
  
---

**Thank you for a clean production deployment!**
