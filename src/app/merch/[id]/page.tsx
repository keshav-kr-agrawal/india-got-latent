"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MotionSection } from "@/components/motion";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/stores";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/safe-image";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [size, setSize] = useState(product?.sizes?.[0] || "One Size");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return notFound();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      quantity,
      image: product.image,
    });
    toast.success("Added to cart");
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <MotionSection>
            <div className="aspect-square border border-border bg-[#1F1F1F] relative overflow-hidden group flex items-center justify-center">
              {product.limited && (
                <Badge className="absolute top-6 left-6 bg-crimson text-white border-0 text-[10px] tracking-wider uppercase z-10">
                  Limited Edition
                </Badge>
              )}
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackText={product.name}
              />
            </div>
          </MotionSection>

          <MotionSection delay={0.15}>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
              {product.category}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="font-heading text-3xl font-bold text-gold mb-6">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              {product.description}
            </p>

            {product.sizes && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-2">Size</p>
                <Select value={size} onValueChange={(v) => v && setSize(v)}>
                  <SelectTrigger className="w-40 bg-surface border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <p className="text-sm font-semibold">Quantity</p>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 flex items-center justify-center hover:bg-surface transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 flex items-center justify-center hover:bg-surface transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-crimson hover:bg-crimson/90 h-12 font-semibold"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Link
                href="/merch/cart"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 border-border font-semibold"
                )}
              >
                View Cart
              </Link>
            </div>
          </MotionSection>
        </div>
      </div>
    </div>
  );
}
