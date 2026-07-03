"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { membershipTiers } from "@/lib/data";
import { toast } from "sonner";

export default function MembershipPage() {
  const handleSubscribe = (tierName: string) => {
    toast.success(`Welcome to ${tierName}! Subscription activated.`);
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Membership"
            title="Join the Inner Circle"
            description="Premium fan membership with early access, exclusive content, and direct creator connection."
          />
        </MotionSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {membershipTiers.map((tier, i) => (
            <MotionSection key={tier.id} delay={i * 0.15}>
              <div
                className={`border bg-card p-8 h-full flex flex-col ${
                  tier.highlighted
                    ? "border-gold/40 relative"
                    : "border-border"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-black text-[10px] font-semibold tracking-wider uppercase px-4 py-1">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="font-heading text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold">
                      ₹{tier.price}
                    </span>
                    <span className="text-text-secondary text-sm">/{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(tier.name)}
                  className={`w-full h-12 font-semibold ${
                    tier.highlighted
                      ? "bg-gold text-black hover:bg-gold/90"
                      : "bg-crimson hover:bg-crimson/90"
                  }`}
                >
                  Subscribe Now
                </Button>
              </div>
            </MotionSection>
          ))}
        </div>

        <MotionSection delay={0.3}>
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-sm text-text-secondary">
              All memberships include a 7-day free trial. Cancel anytime.
              Billed monthly via UPI, card, or net banking.
            </p>
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
