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

type AppointmentFormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  dumpsterSize: string;
  date: string;
  notes: string;
};

type ContactFormValues = {
  name: string;
  phone: string;
  message: string;
};

export default function Home() {
  const appointmentForm = useForm<AppointmentFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      dumpsterSize: "",
      date: "",
      notes: "",
    },
  });

  const contactForm = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmitAppointment(values: AppointmentFormValues) {
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      alert("Thanks! Your dumpster appointment request has been emailed.");
      appointmentForm.reset();
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Sorry, something went wrong sending your request. Please try again or call/text.");
    }
  }

  async function onSubmitContact(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      alert("Thanks for reaching out! Your message has been emailed to the owner.");
      contactForm.reset();
    } catch (error) {
      console.error("Error submitting contact message:", error);
      alert("Sorry, something went wrong sending your message. Please try again or call/text.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-900">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src="/IMG_9800.jpg"
              alt="Dump trailer on job site"
              fill
              className="object-cover"
              unoptimized
              onError={(e) => {
                // Hide image if it fails to load, fallback gradient will show
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl space-y-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Local Dump Trailer Rental
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              On-Time Delivery & Pickup
              <span className="block bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent">
                No Job Delays
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-gray-100 sm:text-xl">
              Driveway-safe dump trailers for contractors and homeowners. 
              Same-week availability, transparent pricing, zero surprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-emerald-600 px-8 py-6 text-base font-semibold shadow-lg shadow-emerald-900/50 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-900/60 hover:scale-105"
                onClick={() =>
                  document
                    .getElementById("schedule")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Schedule a Dump Trailer
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white/80 bg-white/10 px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact the Owner
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-gray-200">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Same-week availability
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Driveway-safe equipment
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Licensed & insured
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
        {/* Social Proof Banner */}
        <section className="relative -mt-16 z-20 mb-16">
          <Card className="border-2 border-emerald-200/60 bg-gradient-to-r from-emerald-50 to-lime-50/50 shadow-xl dark:border-emerald-900/40 dark:from-emerald-950/50 dark:to-emerald-900/30">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    Trusted by Local Contractors & Homeowners
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Serving Woodstock and surrounding areas since 2025
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground">
                  <div>
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">100%</div>
                    <div className="text-xs text-muted-foreground">On-Time Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">0</div>
                    <div className="text-xs text-muted-foreground">Surprise Fees</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Common Projects Section */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Common Projects We Handle
            </h2>
            <p className="mt-3 text-muted-foreground">
              Driveway-safe drop-off & pickup for cleanouts and demolition debris
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Home & Estate Cleanouts", desc: "Furniture, household junk, storage cleanouts" },
              { title: "Renovation & Demolition Debris", desc: "Drywall, lumber, fixtures, flooring" },
              { title: "Contractor Job Sites", desc: "Remodels, tear-outs, ongoing projects" },
              { title: "Garage, Basement & Attic Cleanouts", desc: "Bulk waste, old materials, clutter" },
            ].map((job, idx) => (
              <Card key={idx} className="border border-border/80 bg-card shadow-sm transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{job.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Dump Trailer vs Roll-Off Section */}
        <section className="mb-20 rounded-2xl bg-muted/60 p-8 sm:p-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose a Dump Trailer Instead of a Roll-Off?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Better access, faster service, less damage
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: "Easier Driveway Access", 
                desc: "Lower profile fits tight spaces and steep driveways that roll-offs can't reach." 
              },
              { 
                title: "Lower Height for Hand Loading", 
                desc: "No climbing required. Load directly from ground level or small steps." 
              },
              { 
                title: "Faster Drop-Off & Pickup", 
                desc: "Quick hydraulic dump means less time blocking your driveway or job site." 
              },
              { 
                title: "Less Surface Damage", 
                desc: "Lighter weight distribution protects driveways and asphalt better than roll-offs." 
              },
            ].map((benefit, idx) => (
              <Card key={idx} className="border-2 border-emerald-200/40 bg-background shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-emerald-700 dark:text-emerald-400">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Schedule Appointment Section */}
        <section id="schedule" className="mb-20 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <Card className="border-2 border-border/80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Schedule a Dump Trailer</CardTitle>
              <p className="text-sm text-muted-foreground">
                On-time delivery and pickup — no job delays. Tell us what you need and we&apos;ll confirm details and pricing.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...appointmentForm}>
                <form
                  onSubmit={appointmentForm.handleSubmit(onSubmitAppointment)}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={appointmentForm.control}
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
                      control={appointmentForm.control}
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
                    control={appointmentForm.control}
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
                    control={appointmentForm.control}
                    name="address"
                    rules={{ required: "Drop-off address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drop-off Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street, city, ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={appointmentForm.control}
                      name="dumpsterSize"
                      rules={{ required: "Please choose a size" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trailer Size</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="10-yard">10 yard · Small cleanouts</SelectItem>
                              <SelectItem value="15-yard">15 yard · Remodel projects</SelectItem>
                              <SelectItem value="20-yard">20 yard · Construction & large jobs</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appointmentForm.control}
                      name="date"
                      rules={{ required: "Preferred date is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Drop-off Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={appointmentForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="What are you working on? Any access notes, tight driveways, overhead wires, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-emerald-600 font-semibold shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg"
                  >
                    Request Dump Trailer
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No payment due yet. We&apos;ll call or text to confirm availability, pricing, and your drop-off window.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Key info sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-dashed border-emerald-200/60 bg-emerald-50/40 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <CardHeader>
                <CardTitle className="text-base">How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">1.</span> Send your request with the form.
                </p>
                <p>
                  <span className="font-semibold text-foreground">2.</span> We&apos;ll call or text you to confirm the time, price, and placement.
                </p>
                <p>
                  <span className="font-semibold text-foreground">3.</span> We drop the trailer, you fill it, and we pick it up—no hassle, no delays.
                </p>
                <p className="pt-2 text-xs">
                  Need something sooner than the date picker shows? Use the contact form or call directly and we&apos;ll see what we can do.
                </p>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-border/60">
                <Image
                  src="/IMG_9801 2.jpg"
                  alt="Dump trailer on job site"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-border/60">
                <Image
                  src="/IMG_9802 2.jpg"
                  alt="Dump trailer equipment"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Owner Section */}
        <section id="contact" className="mb-20 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
          <Card className="border-2 border-border/80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Contact the Owner</CardTitle>
              <p className="text-sm text-muted-foreground">
                Questions about pricing, materials, timelines, or job sites? Reach out directly.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form
                  onSubmit={contactForm.handleSubmit(onSubmitContact)}
                  className="space-y-4"
                >
                  <FormField
                    control={contactForm.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
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
                  <FormField
                    control={contactForm.control}
                    name="message"
                    rules={{ required: "Please add a quick message" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Ask about pricing, materials, timelines, or anything else."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-emerald-600 font-semibold shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg"
                  >
                    Send Message
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Prefer a call? Dial{" "}
                    <span className="font-semibold text-foreground">(555) 123‑4567</span>.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="border-2 border-border/80 bg-background/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Why local contractors choose us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">•</span>
                <span>On-time drop-offs and pickups that keep your jobs moving—no delays, no excuses.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">•</span>
                <span>Clear communication, no surprise fees, and flexible scheduling that works around your timeline.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">•</span>
                <span>Respect for your property and your clients&apos; driveways—we know what matters on the job site.</span>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Service Area & Hours Card */}
        <section className="mb-20">
          <Card className="border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-lime-50/50 shadow-lg dark:border-emerald-900/40 dark:from-emerald-950/50 dark:to-emerald-900/30">
            <CardHeader>
              <CardTitle className="text-xl">Service Area & Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="font-semibold text-foreground">Woodstock & surrounding areas</p>
              <p className="text-muted-foreground">Mon–Sat · 7:00am – 6:00pm</p>
              <p className="text-muted-foreground">
                Call or text: <span className="font-semibold text-emerald-700 dark:text-emerald-400">(555) 123‑4567</span>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mb-8 flex flex-col items-center justify-between gap-3 border-t-2 border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Woodstock Dumpster Rentals. All rights reserved.</span>
          <span>Woodstock, GA · Licensed & Insured</span>
        </footer>
      </main>
    </div>
  );
}
