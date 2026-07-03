import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { NewsletterSignup } from "@/components/shared/newsletter";

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="About"
            title="India's Got Latent"
            description="The official digital home of India's most unfiltered talent stage."
          />
        </MotionSection>

        <MotionSection delay={0.1}>
          <div className="prose prose-invert max-w-none space-y-6 text-text-secondary leading-relaxed">
            <p className="text-lg text-foreground">
              Born from the chaos of Indian internet culture, India&apos;s Got Latent is
              a premium live entertainment platform that brings together stand-up comedy,
              talent discovery, creator participation, and unfiltered audience engagement.
            </p>
            <p>
              What started as a viral YouTube phenomenon has evolved into a full-scale
              entertainment brand — with live shows across 6 cities, a professional audition
              pipeline, premium fan membership, and a merchandise line that rivals luxury
              streetwear.
            </p>
            <p>
              We&apos;re not a comedy club. We&apos;re not a talent show. We&apos;re the
              stage where India&apos;s most unhinged performers meet the most engaged
              audience in the country. Controlled chaos. Premium production. Zero filter.
            </p>
          </div>
        </MotionSection>

        <MotionSection delay={0.2}>
          <div className="grid sm:grid-cols-3 gap-6 my-16">
            {[
              { label: "Founded", value: "2025" },
              { label: "Headquarters", value: "Mumbai" },
              { label: "Team Size", value: "45+" },
            ].map((item) => (
              <div key={item.label} className="border border-border bg-card p-6 text-center">
                <p className="text-xs tracking-wider uppercase text-gold mb-2">{item.label}</p>
                <p className="font-heading text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection delay={0.3}>
          <NewsletterSignup />
        </MotionSection>
      </div>
    </div>
  );
}
