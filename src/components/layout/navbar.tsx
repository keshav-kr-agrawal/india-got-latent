"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/stores";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/live-shows", label: "Live Shows" },
  { href: "/auditions", label: "Auditions" },
  { href: "/community", label: "Community" },
  { href: "/membership", label: "Membership" },
  { href: "/merch", label: "Merch" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center border border-gold/40 bg-card">
            <span className="font-heading text-sm font-bold text-gold">IGL</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-heading text-sm font-semibold tracking-wide text-foreground leading-none">
              India&apos;s Got Latent
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">
              Official Platform
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80",
                pathname === link.href
                  ? "text-gold"
                  : "text-text-secondary hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/merch/cart"
            className="relative flex h-9 w-9 items-center justify-center border border-border transition-opacity hover:opacity-70"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-crimson text-[10px] font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/live-shows"
            className="hidden sm:inline-flex h-9 items-center bg-crimson px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book Tickets
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center border border-border"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-3 text-sm font-medium border-b border-border last:border-0",
                pathname === link.href ? "text-gold" : "text-text-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
