"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { products } from "@/lib/data";
import { SafeImage } from "@/components/ui/safe-image";

export default function MerchPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Merch Store"
            title="Wear the Chaos"
            description="Premium merchandise for the culture. Limited drops, signature collections."
          />
        </MotionSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <MotionSection key={product.id} delay={i * 0.08}>
              <Link href={`/merch/${product.id}`} className="group block">
                <div className="border border-border bg-card card-hover overflow-hidden">
                  <div className="aspect-square bg-[#1F1F1F] relative overflow-hidden group flex items-center justify-center border-b border-border">
                    {product.limited && (
                      <Badge className="absolute top-4 left-4 bg-crimson text-white border-0 text-[10px] tracking-wider uppercase z-10">
                        Limited
                      </Badge>
                    )}
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackText="Merchandise"
                    />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <span className="font-heading text-xl font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-text-secondary group-hover:text-gold transition-colors">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            </MotionSection>
          ))}
        </div>
      </div>
    </div>
  );
}
