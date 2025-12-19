# How to Add More Photos to Your Gallery

## Where Your Photos Are Stored

Your photos are stored in **Cloudinary** in the `woodstock-renewal` folder.

**Cloudinary Dashboard:** https://console.cloudinary.com/console/media_library

## Method 1: Upload via Cloudinary Dashboard (Easiest)

1. Go to https://console.cloudinary.com/console/media_library
2. Navigate to the `woodstock-renewal` folder (or create it if it doesn't exist)
3. Click **Upload** button
4. Select your new photos
5. Wait for upload to complete
6. **That's it!** The photos will automatically appear on your website

The website automatically fetches all images from the `woodstock-renewal` folder, so new uploads will show up immediately (you may need to refresh the page).

## Method 2: Upload via Your Website

1. Place new photos in `public/deck_images/` folder
2. Visit `http://localhost:3000/upload-images-page`
3. Click "Upload All Images to Cloudinary"
4. This will upload any new images that aren't already in Cloudinary

## Filtering Out Stock Photos

The website automatically filters out stock images based on these patterns in the filename:
- `sample`
- `placeholder`
- `demo`
- `test`
- `stock`
- `example`

If you have stock photos with different names, you can add more patterns in:
`src/app/api/list-cloudinary-images/route.ts` (look for `stockImagePatterns`)

## Deleting Photos

1. Go to https://console.cloudinary.com/console/media_library
2. Navigate to `woodstock-renewal` folder
3. Find the photo you want to delete
4. Click on it and select **Delete**
5. The photo will automatically disappear from your website (no code changes needed)

## Photo Requirements

- **Formats:** JPG, JPEG, PNG
- **Recommended size:** Any size (Cloudinary automatically optimizes)
- **Naming:** Use descriptive names (spaces are automatically converted to underscores)

## Troubleshooting

**Photos not showing up?**
- Make sure they're in the `woodstock-renewal` folder in Cloudinary
- Check the browser console for errors
- Verify your Cloudinary credentials are set in `.env.local`

**Stock photos still showing?**
- Update the `stockImagePatterns` array in `src/app/api/list-cloudinary-images/route.ts`
- Add the pattern that matches your stock photo names

**Want to see what's in Cloudinary?**
- Visit: `http://localhost:3000/api/list-cloudinary-images`
- This shows all images in your Cloudinary folder (JSON format)

