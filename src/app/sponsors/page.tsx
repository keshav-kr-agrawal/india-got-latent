"use client";

import { useState } from "react";
import { Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { sponsors } from "@/lib/data";
import { toast } from "sonner";

const tierLabels = {
  title: "Title Sponsor",
  presenting: "Presenting Sponsor",
  associate: "Associate Sponsor",
  partner: "Partner",
};

const tierOrder = ["title", "presenting", "associate", "partner"] as const;

export default function SponsorsPage() {
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Partnership inquiry submitted. Our team will reach out within 48 hours.");
    setForm({ company: "", contact: "", email: "", message: "" });
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Partnerships"
            title="Our Sponsors"
            description="Brands that believe in unfiltered entertainment and Indian creator culture."
          />
        </MotionSection>

        {tierOrder.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier);
          if (tierSponsors.length === 0) return null;
          return (
            <MotionSection key={tier} className="mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-6 text-center">
                {tierLabels[tier]}
              </p>
              <div
                className={`flex flex-wrap justify-center gap-6 ${
                  tier === "title" ? "gap-8" : ""
                }`}
              >
                {tierSponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className={`border border-border bg-card flex items-center justify-center card-hover ${
                      tier === "title"
                        ? "h-24 w-48"
                        : tier === "presenting"
                        ? "h-20 w-40"
                        : "h-16 w-32"
                    }`}
                  >
                    <span
                      className={`font-heading tracking-[0.2em] font-black uppercase text-white ${
                        tier === "title" ? "text-xl" : tier === "presenting" ? "text-lg" : "text-sm"
                      }`}
                    >
                      {sponsor.logo}
                    </span>
                  </div>
                ))}
              </div>
            </MotionSection>
          );
        })}

        <div className="gold-line my-16" />

        <div className="grid lg:grid-cols-2 gap-12">
          <MotionSection>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Partner With IGL
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              India&apos;s Got Latent reaches 4.2M+ subscribers, 180K+ live attendees,
              and a deeply engaged fan community. Partner with us to connect with
              India&apos;s most passionate entertainment audience.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between border border-border bg-card p-4">
                <span className="text-sm">Monthly YouTube Views</span>
                <span className="font-semibold text-gold">12M+</span>
              </div>
              <div className="flex items-center justify-between border border-border bg-card p-4">
                <span className="text-sm">Live Show Attendance (Season 1)</span>
                <span className="font-semibold text-gold">180K+</span>
              </div>
              <div className="flex items-center justify-between border border-border bg-card p-4">
                <span className="text-sm">Social Media Reach</span>
                <span className="font-semibold text-gold">6.6M+</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/5 font-semibold"
              onClick={() => toast.success("Media kit download started")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Media Kit
            </Button>
          </MotionSection>

          <MotionSection delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="border border-border bg-card p-8 space-y-4"
            >
              <h3 className="font-heading text-xl font-bold mb-2">
                Advertising Inquiry
              </h3>
              <div>
                <Label>Company Name</Label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label>Contact Person</Label>
                <Input
                  value={form.contact}
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-1 bg-surface border-border min-h-[100px]"
                  placeholder="Tell us about your partnership goals..."
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-crimson hover:bg-crimson/90 font-semibold">
                <Send className="h-4 w-4 mr-2" />
                Submit Inquiry
              </Button>
            </form>
          </MotionSection>
        </div>
      </div>
    </div>
  );
}
