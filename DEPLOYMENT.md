# Deployment Guide for DP Studio

## Deploying to Render

### Prerequisites
- GitHub repository connected to Render
- MongoDB Atlas account (for cloud database)
- Cloudinary account (for image storage)

### Step 1: Set Up MongoDB Atlas
1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist all IP addresses (0.0.0.0/0) for Render access
5. Copy your connection string (it should look like):
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=Cluster0
   ```

### Step 2: Set Up Cloudinary
1. Create a free Cloudinary account at https://cloudinary.com
2. From your dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Deploy to Render

#### Option A: Using Dashboard (Recommended for beginners)

1. Go to https://render.com and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `dp-studio-api` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

5. Add Environment Variables (click "Advanced" then "Add Environment Variable"):
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-random-secret-key>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

6. Click "Create Web Service"

#### Option B: Using render.yaml (Automatic)

1. The `render.yaml` file is already configured in the repository
2. Go to Render Dashboard
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Render will detect the `render.yaml` file
6. Add the required environment variables when prompted
7. Click "Apply"

### Step 4: Seed the Database

After deployment, you need to seed the database with initial data:

1. Go to your Render service dashboard
2. Click on "Shell" tab
3. Run the following commands:
   ```bash
   cd server
   node seed.js
   ```

This will create:
- Admin user: admin@dpstudio.com / admin123
- Regular user: user@dpstudio.com / user123
- Sample services and portfolio images

### Step 5: Update Client Configuration

Update your client `.env` file with the Render API URL:

```env
VITE_API_URL=https://your-service-name.onrender.com
```

Replace `your-service-name` with your actual Render service name.

### Step 6: Deploy the Client

#### Option 1: Vercel (Recommended)
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-render-service.onrender.com
   ```
5. Deploy

#### Option 2: Netlify
1. Go to https://netlify.com
2. Import your GitHub repository
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-render-service.onrender.com
   ```
5. Deploy

## Troubleshooting

### Server Won't Start
- Check that all environment variables are set correctly in Render dashboard
- Verify MongoDB connection string is correct and IP whitelist includes 0.0.0.0/0
- Check Render logs for specific error messages

### Images Not Loading
- Verify Cloudinary credentials are correct
- Check that images are being uploaded to Cloudinary (check your Cloudinary dashboard)
- For local service images, ensure they're in `server/public/uploads/`

### CORS Errors
- Make sure your client URL is accessing the correct Render API URL
- Check that CORS is properly configured in `server.js` (it should allow all origins by default)

### Database Connection Issues
- Ensure MongoDB Atlas cluster is running
- Verify the connection string format
- Check that database user has proper permissions
- Confirm IP whitelist includes 0.0.0.0/0

## Important Notes

1. **Free Tier Limitations**:
   - Render free tier services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading to paid plan for production use

2. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Always use environment variables through Render dashboard
   - Generate strong, unique JWT secrets for production

3. **Database**:
   - MongoDB Atlas free tier (M0) has 512MB storage limit
   - Regularly backup your data
   - Monitor usage in MongoDB Atlas dashboard

4. **Images**:
   - Cloudinary free tier: 25GB storage, 25GB bandwidth/month
   - Images are automatically uploaded to Cloudinary in production
   - Local uploads folder only used in development

## Useful Commands

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Check Service Health
```bash
curl https://your-service.onrender.com/api/health
```

### Test Login Endpoint
```bash
curl -X POST https://your-service.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dpstudio.com","password":"admin123"}'
```

## Support

If you encounter issues:
1. Check Render logs in the dashboard
2. Verify all environment variables are set
3. Test endpoints using curl or Postman
4. Check MongoDB Atlas and Cloudinary dashboards for connectivity
