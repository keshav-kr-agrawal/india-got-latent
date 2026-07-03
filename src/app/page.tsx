import { HeroSection } from "@/components/home/hero";
import { CreatorSpotlight } from "@/components/home/creator-spotlight";
import { YouTubeSection } from "@/components/home/youtube-section";
import {
  FeaturedGuests,
  TrailerSection,
  SocialProof,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from "@/components/home/sections";
import { NewsletterSignup } from "@/components/shared/newsletter";
import { MotionSection } from "@/components/motion";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <CreatorSpotlight />
      <FeaturedGuests />
      <YouTubeSection />
      <TrailerSection />
      <TestimonialsSection />
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <MotionSection>
            <NewsletterSignup />
          </MotionSection>
        </div>
      </section>
      <FAQSection />
      <CTASection />
    </>
  );
}
