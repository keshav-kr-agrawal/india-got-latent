"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CountdownTimer } from "@/components/shared/countdown-timer";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0E0E0E]">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/assets/hero/hero-stage.jpg')`,
            filter: "brightness(0.55) contrast(1.1) saturate(1.15)",
          }}
        />
        {/* Dark Cinematic Vignette Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/55 to-transparent" />
        
        {/* Spotlight effect */}
        <div className="spotlight-gradient absolute inset-0 opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8 w-full flex flex-col justify-between min-h-[90vh]">
        <div className="max-w-4xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              Official Entertainment Platform
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          >
            India&apos;s Most{" "}
            <span className="text-crimson relative inline-block">
              Unfiltered
            </span>
            <br />
            Talent Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed font-sans font-normal"
          >
            The next generation entertainment ecosystem for creators, fans, and live experiences. Controlled chaos. Zero filter. Premium comedy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              href="/live-shows"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-crimson hover:bg-crimson/90 h-12 px-8 text-base font-semibold transition-all hover:scale-[1.02] border border-crimson"
              )}
            >
              Book Tickets
            </Link>
            <Link
              href="/auditions"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 text-base font-semibold border-border hover:bg-card hover:text-white transition-all hover:scale-[1.02]"
              )}
            >
              Audition Now
            </Link>
            <Link
              href="/membership"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 text-base font-semibold border-gold/40 text-gold hover:bg-gold/10 transition-all hover:scale-[1.02]"
              )}
            >
              Become Member
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="border-l border-gold/30 pl-4 py-1"
          >
            <p className="text-xs tracking-[0.15em] uppercase text-text-secondary mb-3">
              Season 2 Premiering Now · Mumbai Live
            </p>
            <CountdownTimer />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="self-center flex flex-col items-center cursor-pointer text-text-secondary hover:text-white transition-colors gap-1 pt-8"
          onClick={() => {
            window.scrollTo({
              top: typeof window !== "undefined" ? window.innerHeight : 800,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll to Explore</span>
          <ChevronDown className="h-4 w-4 text-gold" />
        </motion.div>
      </div>
    </section>
  );
}
