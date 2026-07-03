import type { Metadata } from "next";
import { Inter, Playfair_Display, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "India's Got Latent — Official Platform",
  description:
    "India's most unfiltered talent stage. Live shows, auditions, premium membership, and the chaos you love.",
  keywords: ["India's Got Latent", "comedy", "live shows", "talent", "entertainment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${manrope.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
