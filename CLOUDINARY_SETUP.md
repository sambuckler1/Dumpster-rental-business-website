# Cloudinary Setup Guide

## Step 1: Create a Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. Verify your email

## Step 2: Get Your Cloudinary Credentials

1. Log into your Cloudinary dashboard
2. Go to **Settings** → **Security** (or find your account details)
3. Copy these values:
   - **Cloud Name** (e.g., `your-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

## Step 3: Add Environment Variables

### For Local Development:

Create or update `.env.local` in your project root:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

### For Railway Deployment:

1. Go to your Railway project dashboard
2. Click on your service
3. Go to **Variables** tab
4. Add these environment variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret

## Step 4: Upload Images to Cloudinary

You have two options:

### Option A: Upload via Cloudinary Dashboard (Easiest)

1. Go to https://console.cloudinary.com/console/media_library
2. Create a folder called `woodstock-renewal`
3. Upload all images from `public/deck_images/` to this folder
4. Make sure the image names match (or update the code to match your naming)

### Option B: Upload via API (Automated)

1. Make sure your `.env.local` has the Cloudinary credentials
2. Restart your dev server: `npm run dev`
3. Open your browser and go to: `http://localhost:3000/api/upload-images`
4. This will automatically upload all images from `public/deck_images/` to Cloudinary

**Note:** The API upload route uses the file names to create public IDs. Make sure your image names don't have special characters that might cause issues.

## Step 5: Verify It's Working

1. Restart your dev server
2. Visit the construction page
3. Open browser DevTools → Network tab
4. Check that images are loading from `res.cloudinary.com` instead of localhost
5. Images should load much faster!

## Troubleshooting

### Images still loading from localhost?
- Check that `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set correctly
- Make sure you've uploaded images to Cloudinary
- Verify the image names match between your code and Cloudinary

### Images not showing?
- Check the browser console for errors
- Verify your Cloudinary credentials are correct
- Make sure images are in the `woodstock-renewal` folder in Cloudinary

### Need to update image names?
- The code expects images in format: `woodstock-renewal/{filename}`
- If your Cloudinary folder structure is different, update the `getImageUrl` function in `src/app/construction/page.tsx`

## Benefits You'll Get

✅ **Instant Loading** - Images served from Cloudinary's global CDN
✅ **Automatic Optimization** - WebP/AVIF format conversion
✅ **Automatic Resizing** - Images optimized for each device
✅ **Better Performance** - Reduced bandwidth and faster page loads
✅ **Free Tier** - 25GB storage and bandwidth (plenty for most sites)

