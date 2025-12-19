"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

type ConstructionFormValues = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
};

// Helper function to get optimized Cloudinary URL
function getCloudinaryUrl(publicId: string, forThumbnail: boolean = true, useTrim: boolean = true): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return "";
  
  const trimEffect = useTrim ? "e_trim:auto," : "";
  
  if (forThumbnail) {
    // For thumbnails: crop to fill, remove whitespace, ensure square aspect
    // e_trim:auto removes whitespace borders, g_auto centers on main subject
    return `https://res.cloudinary.com/${cloudName}/image/upload/${trimEffect}f_auto,q_auto,w_800,h_800,c_fill,g_auto/${publicId}`;
  } else {
    // For full-size modal: auto crop whitespace, maintain quality
    return `https://res.cloudinary.com/${cloudName}/image/upload/${trimEffect}f_auto,q_auto,c_limit,w_1920,g_auto/${publicId}`;
  }
}

// Fallback local images (used if Cloudinary fails or images are missing)
const fallbackLocalImages = [
  "deck_images/deckGoldfarb.png",
  "deck_images/fence1.png",
  "deck_images/fence2.png",
  "deck_images/fence3.png",
  "deck_images/fence4.png",
  "deck_images/IMG_4484.jpeg",
  "deck_images/IMG_4485.jpeg",
  "deck_images/IMG_4487.jpeg",
  "deck_images/IMG_4488.jpeg",
  "deck_images/IMG_4489.jpeg",
  "deck_images/IMG_4490.jpeg",
  "deck_images/IMG_6227 2.jpeg",
  "deck_images/IMG_6228 2.jpeg",
  "deck_images/IMG_6229 3.jpeg",
  "deck_images/IMG_6230 3.jpeg",
  "deck_images/IMG_6231 3.jpeg",
  "deck_images/IMG_6232 2.jpeg",
  "deck_images/IMG_6233 2.jpeg",
  "deck_images/IMG_6234 2.jpeg",
  "deck_images/IMG_6234.jpeg",
  "deck_images/IMG_6235 2.jpeg",
  "deck_images/IMG_6236 2.jpeg",
  "deck_images/IMG_6237 2.jpeg",
  "deck_images/IMG_6238 2.jpeg",
  "deck_images/IMG_6239 2.jpeg",
  "deck_images/IMG_6240 2.jpeg",
  "deck_images/IMG_6262 2.jpeg",
  "deck_images/IMG_6263 2.jpeg",
  "deck_images/IMG_6264 2.jpeg",
  "deck_images/IMG_6265 2.jpeg",
  "deck_images/IMG_6266 2.jpeg",
  "deck_images/IMG_6267 2.jpeg",
  "deck_images/IMG_6268 2.jpeg",
];

type CloudinaryImage = {
  publicId: string;
  shortId: string;
  url: string;
};

export default function ConstructionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [usingCloudinary, setUsingCloudinary] = useState(false);
  const form = useForm<ConstructionFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      projectType: "",
      timeline: "",
      budget: "",
      message: "",
    },
  });

  // Fetch images from Cloudinary on component mount
  useEffect(() => {
    async function fetchCloudinaryImages() {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        setLoadingImages(false);
        return;
      }

      try {
        const response = await fetch("/api/list-cloudinary-images");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.images && data.images.length > 0) {
          setCloudinaryImages(data.images);
          setUsingCloudinary(true);
          console.log(`✅ Loaded ${data.images.length} images from Cloudinary`);
        } else {
          console.log("ℹ️ No images found in Cloudinary, using local fallback");
        }
      } catch (error) {
        console.error("❌ Failed to fetch Cloudinary images:", error);
        // Fall back to local images on error
      } finally {
        setLoadingImages(false);
      }
    }

    fetchCloudinaryImages();
  }, []);

  async function onSubmit(values: ConstructionFormValues) {
    try {
      const res = await fetch("/api/construction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      alert("Thanks! Your project inquiry has been sent. We'll contact you shortly.");
      form.reset();
    } catch (error) {
      console.error("Error submitting construction inquiry:", error);
      alert("Sorry, something went wrong sending your inquiry. Please try again or call/text.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/deck_images/deckGoldfarb.png"
            alt="Custom deck construction"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12">
          <div className="max-w-3xl space-y-4 sm:space-y-6 text-white">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">
              Woodstock Renewal Contracting
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight lg:text-6xl xl:text-7xl">
              Custom Deck Building
              <span className="block bg-gradient-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent">
                & Construction Services
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-gray-100 sm:text-lg sm:leading-relaxed md:text-xl">
              Professional deck building, renovations, and construction services in Woodstock and surrounding areas. 
              Quality craftsmanship, transparent pricing, on-time completion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-teal-600 px-6 py-5 text-sm sm:text-base font-semibold shadow-lg shadow-teal-900/50 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-900/60 hover:scale-105 sm:px-8 sm:py-6"
                onClick={() =>
                  document
                    .getElementById("inquiry")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Services Section */}
        <section className="mb-12 sm:mb-16 md:mb-20 pt-12 sm:pt-16">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Our Services
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground px-4">
              Expert construction and renovation services
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Custom Deck Building", desc: "Design and build custom decks tailored to your home and lifestyle" },
              { title: "Deck Repairs & Renovations", desc: "Restore and upgrade existing decks to like-new condition" },
              { title: "Fence Installation", desc: "Privacy, security, and aesthetic fencing solutions" },
              { title: "General Construction", desc: "Home renovations, additions, and construction projects" },
              { title: "Consultation & Design", desc: "Expert advice and custom design services" },
              { title: "Maintenance & Repairs", desc: "Ongoing maintenance and repair services" },
            ].map((service, idx) => (
              <Card key={idx} className="border border-border/80 bg-card shadow-sm transition-all hover:shadow-md">
                <CardContent className="p-4 sm:p-5">
                  <h3 className="font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Project Inquiry Form */}
        <section id="inquiry" className="mb-12 sm:mb-16 md:mb-20">
          <Card className="border-2 border-border/80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Project Inquiry</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Tell us about your project and we&apos;ll provide a detailed quote and timeline.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: "Phone is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Best number to reach you" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectType"
                    rules={{ required: "Project type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="custom-deck">Custom Deck Building</SelectItem>
                            <SelectItem value="deck-repair">Deck Repair/Renovation</SelectItem>
                            <SelectItem value="fence-installation">Fence Installation</SelectItem>
                            <SelectItem value="general-construction">General Construction</SelectItem>
                            <SelectItem value="consultation">Consultation & Design</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline (optional)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="When do you need this?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-2-months">1-2 months</SelectItem>
                              <SelectItem value="3-6-months">3-6 months</SelectItem>
                              <SelectItem value="6-plus-months">6+ months</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range (optional)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-5k">Under $5,000</SelectItem>
                              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50k-plus">$50,000+</SelectItem>
                              <SelectItem value="discuss">Prefer to discuss</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    rules={{ required: "Please describe your project" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="Tell us about your project: size, materials, special requirements, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-teal-600 font-semibold shadow-md transition-all hover:bg-teal-700 hover:shadow-lg"
                  >
                    Submit Project Inquiry
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll review your inquiry and contact you within 24-48 hours with a detailed quote.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Gallery Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Our Work
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground px-4">
              Recent deck building and construction projects
            </p>
          </div>
          
          {loadingImages ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {usingCloudinary && cloudinaryImages.length > 0 ? (
                // Use Cloudinary images - only show images that exist
                cloudinaryImages.map((img, idx) => (
                  <div
                    key={img.publicId}
                    className="relative aspect-square overflow-hidden rounded-lg border-2 border-border/60 cursor-pointer hover:border-teal-400 transition-colors bg-black/5"
                    onClick={() => setSelectedImage(getCloudinaryUrl(img.publicId, false))}
                  >
                    <Image
                      src={getCloudinaryUrl(img.publicId, true)}
                      alt={`Construction project ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                      loading={idx < 12 ? "eager" : "lazy"}
                      decoding={idx < 12 ? "sync" : "async"}
                    />
                  </div>
                ))
              ) : (
                // Fallback to local images
                fallbackLocalImages.map((imagePath, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-lg border-2 border-border/60 cursor-pointer hover:border-teal-400 transition-colors bg-black/5"
                    onClick={() => setSelectedImage(`/${imagePath}`)}
                  >
                    <Image
                      src={`/${imagePath}`}
                      alt={`Construction project ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                      loading={idx < 12 ? "eager" : "lazy"}
                      decoding={idx < 12 ? "sync" : "async"}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <Image
                src={selectedImage}
                alt="Selected project image"
                fill
                className="object-contain"
                unoptimized={selectedImage.startsWith("https://")}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mb-8 flex flex-col items-center justify-between gap-3 border-t-2 border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Woodstock Renewal Contracting. All rights reserved.</span>
          <span>Woodstock, GA · Licensed & Insured</span>
        </footer>
      </main>
    </div>
  );
}

