import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request. Use the upload page or make a POST request.",
    instructions: "Visit /upload-images-page to upload images, or use a tool like Postman/curl to POST to this endpoint.",
  });
}

export async function POST(request: Request) {
  if (!cloudinary) {
    return NextResponse.json(
      { success: false, error: "Cloudinary module not installed. Run: npm install cloudinary" },
      { status: 500 }
    );
  }

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { success: false, error: "Cloudinary credentials not configured. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your .env.local file." },
      { status: 500 }
    );
  }
  
  try {
    // This endpoint is for uploading images from the public folder to Cloudinary
    // You'll call this once to migrate your images
    
    const deckImagesDir = join(process.cwd(), "public", "deck_images");
    console.log("Reading directory:", deckImagesDir);
    const files = await readdir(deckImagesDir);
    console.log(`Found ${files.length} files in deck_images directory`);

    const uploadResults = [];
    let processed = 0;

    for (const file of files) {
      processed++;
      console.log(`Processing ${processed}/${files.length}: ${file}`);
      if (!file.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i)) continue;

      const filePath = join(deckImagesDir, file);
      
      // Clean up filename for Cloudinary public_id (remove extension, replace spaces)
      // This must match exactly what getImageUrl() does in construction/page.tsx
      const cleanName = file.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_");
      // Include folder in public_id to match the URL format
      const publicId = `woodstock-renewal/${cleanName}`;

      try {
        // Read file as buffer
        console.log(`Reading file: ${filePath}`);
        const fileBuffer = await readFile(filePath);
        console.log(`File size: ${fileBuffer.length} bytes`);
        
        // Get file extension for MIME type
        const ext = file.split('.').pop()?.toLowerCase();
        const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : ext || 'png';
        
        console.log(`Uploading to Cloudinary with public_id: ${publicId}`);
        // Upload to Cloudinary - public_id already includes folder
        const result = await cloudinary.uploader.upload(
          `data:image/${mimeType};base64,${fileBuffer.toString('base64')}`,
          {
            public_id: publicId,
            overwrite: true, // Allow overwriting if re-running
            resource_type: "image",
          }
        );

        console.log(`✅ Successfully uploaded ${file} -> ${result.public_id}`);
        uploadResults.push({
          file,
          publicId: result.public_id,
          url: result.secure_url,
          expectedUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_800,h_800,c_fill/${result.public_id}`,
          success: true,
        });
      } catch (error: any) {
        console.error(`❌ Failed to upload ${file}:`, error);
        console.error(`Error details:`, {
          message: error.message,
          http_code: error.http_code,
          name: error.name,
        });
        uploadResults.push({
          file,
          success: false,
          error: error.message || String(error),
          details: error.http_code || error.response?.body,
        });
      }
    }

    const successCount = uploadResults.filter((r) => r.success).length;
    console.log(`Upload complete: ${successCount}/${uploadResults.length} successful`);
    
    return NextResponse.json({
      success: true,
      uploaded: successCount,
      total: uploadResults.length,
      results: uploadResults,
    });
  } catch (error: any) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

