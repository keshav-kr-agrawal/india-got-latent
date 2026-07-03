"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { Award, Flame, Users, Calendar } from "lucide-react";

import { SafeImage } from "@/components/ui/safe-image";

export function CreatorSpotlight() {
  const highlights = [
    { icon: Users, label: "Community", value: "Built India's most active chess & comedy community of 5M+ fans." },
    { icon: Flame, label: "Ecosystem", value: "Pioneered a new comedy entertainment format that gets 10M+ views per episode." },
    { icon: Award, label: "Accolades", value: "Ranked among India's top creative minds & digital entertainment pioneers." },
    { icon: Calendar, label: "Live Impact", value: "Fills stadium tours and sets records for live-audience comedy show attendance." }
  ];

  return (
    <section className="py-24 bg-[#181818] border-y border-[#2C2C2C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Spotlight"
            title="The Creative Director"
            description="Meet Samay Raina, the mastermind driving India's most disruptive and unfiltered media-tech ecosystem."
          />
        </MotionSection>

        <div className="grid lg:grid-cols-12 gap-12 items-center mt-12">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative aspect-[4/5] border border-[#2C2C2C] bg-[#1F1F1F] group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <SafeImage
              src="/assets/founders/samay-raina-stage.jpg"
              alt="Samay Raina performing"
              fill
              className="object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              fallbackText="Samay Raina"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-1">Host & Showrunner</p>
              <h3 className="font-heading text-2xl font-bold text-white">Samay Raina</h3>
              <p className="text-xs text-text-secondary mt-1">Creator of India&apos;s Got Latent</p>
            </div>
          </div>

          {/* Description & Highlights Column */}
          <div className="lg:col-span-7 space-y-8">
            <MotionSection delay={0.1}>
              <h4 className="font-heading text-3xl font-bold text-white mb-4">
                Redefining Indian Digital Entertainment
              </h4>
              <p className="text-text-secondary leading-relaxed text-base font-sans">
                From pioneering chess streaming in India during the lockdown to launching the country's most viewed live comedy show, Samay Raina has consistently disrupted traditional entertainment models. 
              </p>
              <p className="text-text-secondary leading-relaxed text-base mt-4 font-sans">
                India&apos;s Got Latent represents the pinnacle of this journey — a fully independent, raw, and unscripted entertainment ecosystem where creators, fans, and brands participate in defining what is truly latent.
              </p>
            </MotionSection>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((hl, i) => (
                <MotionSection key={hl.label} delay={0.15 + i * 0.05} className="border border-[#2C2C2C] bg-[#1F1F1F] p-6 hover:border-gold/30 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center bg-crimson/10 border border-crimson/20 mb-4">
                    <hl.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h5 className="font-heading text-base font-bold text-white mb-2">{hl.label}</h5>
                  <p className="text-xs text-text-secondary leading-relaxed">{hl.value}</p>
                </MotionSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
