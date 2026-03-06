# Image Management Guide - DP Studio

## How to Upload and Manage Images

### Admin Dashboard Access
1. Navigate to **Login Page** at `/login`
2. Use admin credentials:
   - Email: `admin@dpstudio.com`
   - Password: `admin123`
3. Click **Admin Dashboard** button
4. You'll see the admin panel with multiple tabs

---

## 📤 Uploading Portfolio Images

### Via Upload Tab
1. Click the **"Upload Portfolio"** tab in the dashboard
2. Enter the **Image Title** (e.g., "Bride & Groom First Dance")
3. Select a **Category** from dropdown:
   - Wedding
   - PreWedding
   - Engagement
   - Baby
   - Outdoor
   - Events

### Two Ways to Upload:

**Method 1: Drag & Drop**
- Drag image file from your computer directly into the upload zone
- It will automatically preview the image

**Method 2: Click to Browse**
- Click the upload zone to open file picker
- Select an image file from your computer

### Upload Requirements
- **File Format**: JPG, PNG, GIF (image files only)
- **File Size**: Maximum 5MB
- **Recommended**: 600x500px or larger for best quality

### After Upload
- Click **"Upload Image"** button
- Wait for "Image uploaded successfully!" message
- Image appears instantly in Portfolio page and gallery

---

## 🖼️ Managing Uploaded Images

### View All Images
1. Click the **"Manage Images"** tab
2. See all uploaded portfolio images in a grid
3. Each image shows:
   - Image thumbnail
   - Title
   - Category badge
   - Upload date

### Delete Images
1. Find the image you want to remove
2. Click the **"Delete Image"** button
3. Confirm when prompted
4. Image is removed from database and portfolio

### Image Location
- **Server Storage**: `server/public/uploads/`
- **URL Access**: `/uploads/filename.jpg`
- **Displayed On**: Portfolio page, Home page, Gallery

---

## 🎨 Changing Images on Pages

### Home Page
- Portfolio preview shows 6 latest images
- Edit `client/src/pages/Home.jsx` to customize layout
- Images load dynamically from database

### Portfolio Page
- Full gallery with category filtering
- Click any image to see lightbox preview
- Images are fully responsive

### About Page
- Team member photos can be updated in code
- Update image URLs in `client/src/pages/About.jsx`
- Studio image URL can be changed directly

### Services Page
- Service cards display images
- Upload portfolio images linked to services
- Edit service descriptions in manage services tab

---

## 🔧 Manage Services Tab

### Add New Service
1. Click **"Manage Services"** tab
2. Fill in service details:
   - **Title**: Service name
   - **Description**: Service details
   - **Image URL**: Link to image (Unsplash URL or `/uploads/...`)
3. Click **"Add Service"**
4. Service appears on Services page

### Update Service Image
- Delete the service
- Add it again with new image URL
- Or edit directly in `server/models/Service.js`

### Delete Service
1. Find service in "Current Services" list
2. Click **"Delete"** button

---

## 📂 Image Storage Structure

```
server/
├── public/
│   ├── uploads/          ← All user-uploaded images
│   │   ├── 1704067200000-badge.png
│   │   ├── 1704067234567-wedding.jpg
│   │   └── ...
│   └── (other static files)
```

---

## 🌐 Using External Images

### Option 1: Unsplash URLs (Current)
- Images are served from Unsplash
- No storage needed
- Fast CDN delivery
- Perfect for demo/testing

### Option 2: Local Uploads (Recommended)
- Upload images via admin dashboard
- Stored in `server/public/uploads/`
- Access via `/uploads/filename.jpg`
- Full control over images

### Option 3: Mixed Approach
- Use external URLs for services
- Upload portfolio images locally
- Both methods work together

---

## 🚀 Tips & Best Practices

### Before Upload
- Optimize image size (compress JPG files)
- Use high-quality photos for best results
- Recommended: 600x500px for portfolio, 300x300px for thumbnails
- Use descriptive titles for easy management

### Naming Convention
- Use clear titles: "Bride & Groom First Dance"
- Avoid: "IMG001", "Photo", etc.
- Include category type in title if helpful

### File Organization
- Wedding images → Wedding category
- Event photos → Events category
- Baby photos → Baby category
- etc.

---

## 🔍 Troubleshooting

### "Image upload failed"
- Check file is an image (JPG, PNG, GIF)
- Ensure file size is under 5MB
- Try smaller image or lower quality

### Images not appearing
- Check admin is logged in
- Verify image URL is correct
- Check browser console for errors
- Try refreshing page

### Want to change existing images
1. Delete the old image via Manage Images tab
2. Upload new image with same title
3. Images update instantly across site

---

## 📝 Quick Commands

### Restart Backend (if needed)
```bash
cd server
node server.js
```

### Restart Frontend (if needed)
```bash
cd client
npm run dev
```

### Seed Database with Demo Images
```bash
cd server
node seed.js
```

---

## 💡 Next Steps

1. **Login** with admin credentials
2. **Upload portfolio images** via dashboard
3. **View changes** on portfolio page instantly
4. **Manage images** anytime from admin panel
5. **Delete** unwanted images

---

**Questions?** Check the main README.md for more documentation.
