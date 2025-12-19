"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1">
          <Link href="/" className="text-xl font-bold text-foreground">
            Woodstock Renewal
          </Link>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant={pathname === "/construction" || pathname === "/" ? "default" : "ghost"}
            asChild
            className="rounded-full"
          >
            <Link href="/">Construction</Link>
          </Button>
          <Button
            variant={pathname === "/dumpster-rentals" ? "default" : "ghost"}
            asChild
            className="rounded-full"
          >
            <Link href="/dumpster-rentals">Dumpster Rentals</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

