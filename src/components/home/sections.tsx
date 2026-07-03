"use client";

import Link from "next/link";
import { useState } from "react";
import { Play, Eye } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { SectionHeader } from "@/components/shared/section-header";
import { featuredGuests, episodes, testimonials, faqs } from "@/lib/data";

export function FeaturedGuests() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Featured"
            title="The Faces Behind the Chaos"
            description="Creators, comedians, and cultural icons who define India's Got Latent."
          />
        </MotionSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredGuests.map((guest, i) => (
            <MotionSection key={guest.id} delay={i * 0.1}>
              <div className="group border border-[#2C2C2C] bg-[#1F1F1F] card-hover overflow-hidden relative aspect-[3/4]">
                {/* Background image of the guest */}
                <SafeImage
                  src={guest.image}
                  alt={guest.name}
                  fill
                  className="object-cover grayscale brightness-75 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  fallbackText={guest.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-[9px] tracking-wider uppercase text-gold border border-gold/30 bg-black/60 px-2 py-1">
                    {guest.role}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="font-heading text-lg font-bold text-white">{guest.name}</h3>
                  <p className="text-xs text-[#9E9E9E] mt-1 font-sans leading-snug">{guest.bio}</p>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EpisodesArchive() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Archive"
            title="Past Episodes"
            description="Relive the moments that broke the internet."
          />
        </MotionSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep, i) => (
            <MotionSection key={ep.id} delay={i * 0.08}>
              <div className="group border border-border bg-card card-hover overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-opacity" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center border border-white/20 bg-black/50 group-hover:scale-105 transition-transform">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 text-xs bg-black/70 px-2 py-1">
                    {ep.duration}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] tracking-wider uppercase text-gold mb-2">
                    {ep.guest} · {ep.date}
                  </p>
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-gold transition-colors">
                    {ep.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Eye className="h-3 w-3" />
                    {ep.views} views
                  </div>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrailerSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <MotionSection>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Season 2 Trailer
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Chaos Returns
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Season 2 brings bigger stages, wilder roasts, and the most unhinged
              talent India has ever seen. Shot across 6 cities with a live audience
              of over 15,000 fans.
            </p>
            <div className="flex gap-8 text-center">
              <div>
                <p className="font-heading text-3xl font-bold text-gold">6</p>
                <p className="text-xs text-text-secondary mt-1">Cities</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-gold">15K+</p>
                <p className="text-xs text-text-secondary mt-1">Live Audience</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-gold">24</p>
                <p className="text-xs text-text-secondary mt-1">Episodes</p>
              </div>
            </div>
          </MotionSection>

          <MotionSection delay={0.2}>
            <div className="aspect-video border border-border bg-card relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 to-transparent" />
              <div className="relative z-10 flex h-20 w-20 items-center justify-center border-2 border-gold/40 bg-black/60 group-hover:border-gold transition-colors">
                <Play className="h-8 w-8 text-gold ml-1" />
              </div>
              <p className="absolute bottom-4 left-4 text-xs tracking-wider uppercase text-text-secondary">
                Watch Now · 2:34
              </p>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}

export function SocialProof() {
  const stats = [
    { value: "4.2M+", label: "YouTube Subscribers" },
    { value: "2.4M+", label: "Instagram Followers" },
    { value: "180K+", label: "Live Show Attendees" },
    { value: "12K+", label: "Audition Submissions" },
  ];

  return (
    <section className="py-20 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <MotionSection key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            </MotionSection>
          ))}
        </div>

        {/* Small Sponsors Banner */}
        <div className="border-t border-[#2C2C2C] pt-10 text-center">
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#9E9E9E] mb-6 font-semibold">
            Corporate Partners & Title Sponsors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {["Spotify", "Swiggy", "CRED", "BoAt", "Zomato", "Myntra"].map((brand) => (
              <span
                key={brand}
                className="font-heading text-xs tracking-[0.2em] font-extrabold text-[#9E9E9E] hover:text-white transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Community"
            title="What Fans Are Saying"
          />
        </MotionSection>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <MotionSection key={t.id} delay={i * 0.1}>
              <div className="border border-border bg-card p-8 card-hover h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.location}</p>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader label="FAQ" title="Common Questions" />
        </MotionSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <MotionSection key={i} delay={i * 0.05}>
              <div className="border border-border bg-card">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <span className="text-gold text-xl shrink-0">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <div className="border border-border bg-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="spotlight-gradient absolute inset-0" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                Ready for the Chaos?
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto mb-8">
                Book your seat, submit your talent, or join the premium fan community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/live-shows"
                  className="inline-flex h-12 items-center bg-crimson px-8 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Book Tickets
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex h-12 items-center border border-gold/40 px-8 text-sm font-semibold text-gold hover:bg-gold/5 transition-colors"
                >
                  Join Membership
                </Link>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
