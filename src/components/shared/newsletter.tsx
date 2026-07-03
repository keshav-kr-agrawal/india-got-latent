"use client";

import { useState } from "react";
import { Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotificationStore } from "@/lib/stores";
import { toast } from "sonner";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
}

export function NewsletterSignup({ variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const { setEmail: saveEmail, setPushEnabled, pushEnabled } = useNotificationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    saveEmail(email);
    toast.success("You're on the list. Welcome to the chaos.");
    setEmail("");
  };

  const handlePushToggle = () => {
    if (!pushEnabled && "Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          setPushEnabled(true);
          toast.success("Push notifications enabled.");
        }
      });
    } else {
      setPushEnabled(!pushEnabled);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-card border-border h-11"
          required
        />
        <Button type="submit" className="bg-crimson hover:bg-crimson/90 h-11 px-6 font-semibold shrink-0">
          Subscribe
        </Button>
      </form>
    );
  }

  return (
    <div className="border border-border bg-card p-8 md:p-12">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center border border-gold/30 bg-surface shrink-0">
          <Mail className="h-5 w-5 text-gold" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold mb-1">Stay in the Loop</h3>
          <p className="text-sm text-text-secondary">
            Get early access to tickets, exclusive drops, and behind-the-scenes content.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-surface border-border h-11 flex-1"
          required
        />
        <Button type="submit" className="bg-crimson hover:bg-crimson/90 h-11 px-8 font-semibold">
          Subscribe
        </Button>
      </form>
      <button
        onClick={handlePushToggle}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-opacity"
      >
        <Bell className={`h-4 w-4 ${pushEnabled ? "text-gold" : ""}`} />
        {pushEnabled ? "Push notifications enabled" : "Enable push notifications"}
      </button>
    </div>
  );
}
