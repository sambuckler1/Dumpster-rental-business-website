import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function GET() {
  if (!cloudinary) {
    return NextResponse.json(
      { success: false, error: "Cloudinary module not installed" },
      { status: 500 }
    );
  }

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { success: false, error: "Cloudinary credentials not configured" },
      { status: 500 }
    );
  }

  try {
    // List all images in the woodstock-renewal folder using resources API
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "woodstock-renewal",
      max_results: 500,
    });

    if (!result.resources || result.resources.length === 0) {
      return NextResponse.json({
        success: true,
        total: 0,
        filtered: 0,
        images: [],
        message: "No images found in woodstock-renewal folder",
      });
    }

    // Filter out stock images (you can customize this filter)
    const stockImagePatterns = [
      /sample/i,
      /placeholder/i,
      /demo/i,
      /test/i,
      /stock/i,
      /example/i,
    ];

    const filteredImages = result.resources.filter((img: any) => {
      const publicId = img.public_id.toLowerCase();
      return !stockImagePatterns.some((pattern) => pattern.test(publicId));
    });

    // Extract image info
    const imageList = filteredImages.map((img: any) => {
      return {
        publicId: img.public_id, // Full public_id with folder
        url: img.secure_url,
        format: img.format,
        width: img.width,
        height: img.height,
      };
    });

    return NextResponse.json({
      success: true,
      total: result.resources.length,
      filtered: filteredImages.length,
      images: imageList,
    });
  } catch (error: any) {
    console.error("Error listing Cloudinary images:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || String(error),
        details: error.http_code || error.name,
      },
      { status: 500 }
    );
  }
}

