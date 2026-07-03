import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">404</p>
        <h1 className="font-heading text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-text-secondary mb-8 max-w-md">
          This page doesn&apos;t exist — or maybe it got roasted off the internet.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants(), "bg-crimson hover:bg-crimson/90 font-semibold")}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
