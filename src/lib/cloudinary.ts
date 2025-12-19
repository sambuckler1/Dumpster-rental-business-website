let cloudinary: any = null;

try {
  const cloudinaryModule = require("cloudinary");
  cloudinary = cloudinaryModule.v2;
  
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.warn("Cloudinary module not found. Install it with: npm install cloudinary");
}

export { cloudinary };

// Helper function to get optimized Cloudinary URL
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "jpg" | "png";
  } = {}
) {
  const {
    width,
    height,
    quality = "auto",
    format = "auto",
  } = options;

  const transformations: string[] = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformString = transformations.length > 0 
    ? transformations.join(",") + "/"
    : "";

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}${publicId}`;
}

