"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MotionSection } from "@/components/motion";
import { useCartStore } from "@/lib/stores";
import { toast } from "sonner";
import { SafeImage } from "@/components/ui/safe-image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", email: "", address: "", pincode: "" });

  const cartTotal = total();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (step === "done") {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto max-w-md px-6">
          <h1 className="font-heading text-3xl font-bold mb-4">Order Confirmed</h1>
          <p className="text-text-secondary mb-8">
            Your merch is on its way. Expect delivery in 5-7 business days.
          </p>
          <Link
            href="/merch"
            className={cn(buttonVariants(), "bg-crimson hover:bg-crimson/90 font-semibold")}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === "checkout") {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-lg px-6">
          <button
            onClick={() => setStep("cart")}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </button>
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 bg-card border-border"
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 bg-card border-border"
                required
              />
            </div>
            <div>
              <Label>Delivery Address</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className="mt-1 bg-card border-border"
                required
              />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input
                value={form.pincode}
                onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                className="mt-1 bg-card border-border"
                required
              />
            </div>
            <div className="border border-border bg-card p-4 mt-6">
              <p className="font-semibold mb-1">Order Total</p>
              <p className="font-heading text-2xl font-bold text-gold">
                ₹{cartTotal.toLocaleString("en-IN")}
              </p>
            </div>
            <Button type="submit" className="w-full bg-crimson hover:bg-crimson/90 h-12 font-semibold">
              Place Order
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 border border-border bg-card">
            <p className="text-text-secondary mb-6">Your cart is empty</p>
            <Link
              href="/merch"
              className={cn(buttonVariants(), "bg-crimson hover:bg-crimson/90 font-semibold")}
            >
              Browse Merch
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <MotionSection key={`${item.productId}-${item.size}`}>
                  <div className="border border-border bg-card p-5 flex items-center gap-5">
                    <div className="h-20 w-20 border border-border shrink-0 overflow-hidden relative">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        fallbackText="Item"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{item.name}</p>
                      <p className="text-sm text-text-secondary">Size: {item.size}</p>
                      <p className="font-semibold mt-1">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center border border-border shrink-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.size, item.quantity - 1)
                        }
                        className="h-8 w-8 flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.size, item.quantity + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-text-secondary hover:text-crimson transition-colors shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </MotionSection>
              ))}
            </div>

            <div className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-heading text-2xl font-bold">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-6">
                Shipping calculated at checkout. Free shipping on orders above ₹3,000.
              </p>
              <Button
                onClick={() => setStep("checkout")}
                className="w-full bg-crimson hover:bg-crimson/90 h-12 font-semibold"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
