"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  DiscordIcon,
  TelegramIcon,
} from "@/components/icons/social";

const footerLinks = {
  platform: [
    { href: "/live-shows", label: "Live Shows" },
    { href: "/auditions", label: "Auditions" },
    { href: "/membership", label: "Membership" },
    { href: "/community", label: "Community" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/merch", label: "Merch Store" },
    { href: "/admin", label: "Creator Dashboard" },
  ],
};

const socialLinks = [
  { href: "https://www.instagram.com/indiasgotlatent/", icon: InstagramIcon, label: "Official Instagram" },
  { href: "https://www.instagram.com/maisamayhoon/", icon: InstagramIcon, label: "Samay Instagram" },
  { href: "https://www.youtube.com/@SamayRainaOfficial", icon: YoutubeIcon, label: "YouTube" },
  { href: "https://x.com/isamaay", icon: TwitterIcon, label: "Twitter/X" },
  { href: "https://discord.gg/maisamayhoon", icon: DiscordIcon, label: "Discord" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center border border-gold/40 bg-card">
                <span className="font-heading text-sm font-bold text-gold">IGL</span>
              </div>
              <div>
                <p className="font-heading text-base font-semibold">India&apos;s Got Latent</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">
                  Official Platform
                </p>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              India&apos;s most unfiltered talent stage. Where chaos meets talent, and the internet comes alive.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-foreground transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-foreground transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-border text-text-secondary hover:text-gold hover:border-gold/30 transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-text-secondary">
              Join 2.4M+ fans across platforms
            </p>
          </div>
        </div>

        <div className="gold-line my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p className="text-xs text-text-secondary">&copy; 2026 India&apos;s Got Latent. All rights reserved. Crafted by <a href="https://hikity.xyz" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">Hikity</a>.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-opacity">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-opacity">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-opacity">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
