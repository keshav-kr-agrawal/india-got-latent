"use client";

import { useState } from "react";
import { Play, Eye, Calendar, ArrowRight } from "lucide-react";
import { YoutubeIcon } from "@/components/icons/social";
import { SafeImage } from "@/components/ui/safe-image";
import { MotionSection, MotionDiv } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { episodes, type Episode } from "@/lib/data";
import { toast } from "sonner";

export function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState<Episode>(episodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Channel stats
  const stats = [
    { label: "Subscribers", value: "5.12M+", sub: "Verified Creator" },
    { label: "Total Views", value: "824M+", sub: "Across all uploads" },
    { label: "Video Uploads", value: "940+", sub: "Updated weekly" }
  ];

  return (
    <section className="py-24 bg-[#0E0E0E]" id="youtube-section-anchor">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Live Feed"
            title="Official Broadcast Room"
            description="Watch full-length, high-production episodes of India's Got Latent, streaming directly from Samay Raina's channel."
          />
        </MotionSection>

        {/* Main Channel Stats and Main Player Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mt-12 items-start">
          {/* Left Column: responsive video player & description */}
          <div className="lg:col-span-8 space-y-6">
            <MotionDiv className="aspect-video bg-[#1F1F1F] border border-[#2C2C2C] relative overflow-hidden group flex items-center justify-center rounded-lg">
              {isPlaying && activeVideo.embeddable !== false ? (
                <div className="w-full h-full relative">
                  <iframe
                    key={activeVideo.id}
                    src={`https://www.youtube.com/embed/${activeVideo.id}`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0 absolute inset-0 z-10 rounded-lg"
                  />
                  {/* Failsafe Overlay Control (Rule 11 Failsafe System) */}
                  <div className="absolute bottom-3 left-3 z-20 flex gap-2">
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="bg-black/90 hover:bg-black/95 text-[10px] text-white border border-[#2C2C2C] px-3 py-1.5 font-semibold uppercase tracking-wider rounded-sm cursor-pointer transition-colors"
                    >
                      ← Close Player
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-crimson hover:bg-crimson/95 text-[10px] text-white px-3 py-1.5 font-semibold uppercase tracking-wider rounded-sm cursor-pointer transition-colors"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              ) : (
                /* Premium Video Card System (Rule 8 & Rule 11 Failsafe) */
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  {/* Background Thumbnail with blur */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center filter opacity-40 scale-100 group-hover:scale-105 transition-transform duration-700" 
                    style={{ backgroundImage: `url(${activeVideo.thumbnail})` }}
                  />
                  {/* Dark gradient mask overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                  
                  {/* Top bar info */}
                  <div className="relative z-10 flex justify-between items-start w-full">
                    <span className="text-[9px] font-heading font-semibold tracking-[0.2em] text-gold uppercase bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-sm">
                      Broadcast Card
                    </span>
                    <span className="text-[10px] text-[#9E9E9E] font-mono bg-black/50 px-2 py-0.5 rounded-sm">
                      {activeVideo.duration}
                    </span>
                  </div>

                  {/* Play Button Icon */}
                  <button 
                    onClick={() => {
                      if (activeVideo.embeddable !== false) {
                        setIsPlaying(true);
                      } else {
                        toast.error("This video has third-party embed restrictions.");
                      }
                    }}
                    className="relative z-10 mx-auto h-16 w-16 rounded-full bg-crimson/95 border border-crimson/40 hover:bg-crimson hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-300 text-white cursor-pointer"
                  >
                    <Play className="h-7 w-7 text-white fill-white ml-1" />
                  </button>
                  
                  {/* Bottom info */}
                  <div className="relative z-10 text-left w-full mt-auto">
                    <p className="text-[10px] text-[#B89B5E] font-semibold tracking-wider uppercase mb-1 font-sans">
                      Channel: {activeVideo.id === "5Y1LC7IoWxs" ? "India's Got Latent Clips" : "Samay Raina"}
                    </p>
                    <h4 className="font-heading text-lg md:text-xl font-bold text-white mb-2 leading-snug line-clamp-1">
                      {activeVideo.title}
                    </h4>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#2C2C2C]">
                      <div className="flex items-center gap-4 text-xs text-[#9E9E9E]">
                        <span>{activeVideo.views} views</span>
                        <span className="h-1 w-1 rounded-full bg-[#2C2C2C]" />
                        <span>{activeVideo.date}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        {activeVideo.embeddable !== false && (
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="h-8 bg-white/10 hover:bg-white/20 text-white font-semibold text-[10px] tracking-wider uppercase px-4 rounded-sm transition-all cursor-pointer"
                          >
                            Watch Inline
                          </button>
                        )}
                        <a
                          href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-8 inline-flex items-center bg-crimson hover:bg-crimson/95 text-white font-semibold text-[10px] tracking-wider uppercase px-4 rounded-sm transition-all cursor-pointer"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </MotionDiv>

            <MotionDiv delay={0.1} className="border border-[#2C2C2C] bg-[#1F1F1F] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold border border-gold/20 px-2.5 py-1">
                  Active Episode
                </span>
                <div className="flex items-center gap-4 text-xs text-[#9E9E9E]">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {activeVideo.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {activeVideo.date}
                  </span>
                </div>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 font-sans">
                Featuring guest roasters and unfiltered standup performances. Click on any video below to update the screen.
              </p>
              <a
                href="https://www.youtube.com/@SamayRainaOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-gold font-semibold hover:text-white transition-colors group"
              >
                Go to Samay Raina Official Channel
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </MotionDiv>
          </div>

          {/* Right Column: Channel Stats & Info */}
          <div className="lg:col-span-4 space-y-6">
            <MotionDiv delay={0.15} className="border border-[#2C2C2C] bg-[#1F1F1F] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-crimson/10 border border-crimson/20 flex items-center justify-center">
                  <YoutubeIcon className="h-5 w-5 text-crimson" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-white leading-none">Samay Raina</h4>
                  <p className="text-[10px] tracking-wider uppercase text-[#9E9E9E] mt-1">Official YouTube Stats</p>
                </div>
              </div>

              <div className="space-y-4">
                {stats.map((st) => (
                  <div key={st.label} className="bg-[#181818] border border-[#2C2C2C] p-4">
                    <p className="text-[10px] tracking-wider uppercase text-[#9E9E9E] mb-1">{st.label}</p>
                    <p className="font-heading text-2xl font-bold text-white">{st.value}</p>
                    <p className="text-[10px] text-gold mt-0.5">{st.sub}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://www.youtube.com/@SamayRainaOfficial?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex h-11 items-center justify-center bg-crimson hover:bg-crimson/95 text-white font-semibold text-xs tracking-wider uppercase transition-opacity"
              >
                Subscribe on YouTube
              </a>
            </MotionDiv>

            <MotionDiv delay={0.2} className="border border-[#2C2C2C] bg-[#1F1F1F] p-6">
              <h4 className="font-heading text-sm font-bold text-white mb-2">Dual Platform Simulcast</h4>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Watch ad-free on Netflix Premium or stream with the community live on YouTube. Season 2 episodes release simultaneously.
              </p>
              <a
                href="https://www.netflix.com/title/82988663"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-crimson hover:text-white font-bold transition-colors"
              >
                Stream on Netflix →
              </a>
            </MotionDiv>
          </div>
        </div>

        {/* Video Card Selector List below */}
        <div className="mt-16">
          <MotionSection delay={0.25}>
            <h4 className="font-heading text-xl font-bold text-white mb-6">Select Episode to Play</h4>
          </MotionSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((ep, i) => (
              <MotionDiv key={ep.id} delay={i * 0.08}>
                <div
                  className={`border bg-[#1F1F1F] p-4 cursor-pointer hover:border-gold/30 transition-all ${
                    activeVideo.id === ep.id ? "border-gold" : "border-[#2C2C2C]"
                  }`}
                  onClick={() => {
                    setActiveVideo(ep);
                    setIsPlaying(false);
                    // Scroll back to active video player smoothly
                    const elem = document.getElementById("youtube-section-anchor");
                    if (elem) {
                      elem.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <div className="aspect-video relative bg-[#181818] border border-[#2C2C2C] mb-4 group overflow-hidden">
                    <SafeImage
                      src={ep.thumbnail}
                      alt={ep.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fallbackText="Episode Media"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-12 w-12 border border-white/20 bg-black/60 flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/85 px-1.5 py-0.5 border border-white/10 text-white font-mono">
                      {ep.duration}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-gold mb-2">
                      {ep.guest} · {ep.date}
                    </p>
                    <h5 className="font-heading text-sm font-bold text-white line-clamp-2 hover:text-gold transition-colors leading-tight mb-4">
                      {ep.title}
                    </h5>
                    <div className="flex items-center justify-between border-t border-[#2C2C2C] pt-3">
                      <span className="text-[10px] text-[#9E9E9E]">{ep.views} views</span>
                      <a
                        href={`https://www.youtube.com/watch?v=${ep.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-gold hover:text-white font-semibold flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()} // Don't trigger player change
                      >
                        Watch on YouTube →
                      </a>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
