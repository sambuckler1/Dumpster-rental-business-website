"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadImagesPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload() {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      console.log("Starting upload...");
      const response = await fetch("/api/upload-images", {
        method: "POST",
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setResult(data);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Upload Images to Cloudinary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will upload all images from <code className="bg-muted px-1 rounded">public/deck_images/</code> to Cloudinary.
            </p>

            {!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ Cloudinary not configured. Add <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> to your .env.local file.
                </p>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? "Uploading... (this may take a few minutes)" : "Upload All Images to Cloudinary"}
            </Button>

            {uploading && (
              <div className="text-sm text-muted-foreground">
                <p>⏳ Uploading images... Check your terminal/console for progress.</p>
                <p className="text-xs mt-1">This may take 2-5 minutes depending on the number of images.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-800 dark:text-red-200">
                  ❌ Error: {error}
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-2">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✅ Successfully uploaded {result.uploaded} of {result.total} images
                  </p>
                </div>

                {result.results && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-muted-foreground">
                      View upload details
                    </summary>
                    <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-96">
                      {JSON.stringify(result.results, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Make sure you have:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Installed cloudinary: <code className="bg-muted px-1 rounded">npm install cloudinary</code></li>
                  <li>Added Cloudinary credentials to .env.local</li>
                  <li>Images in the public/deck_images/ folder</li>
                </ul>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

