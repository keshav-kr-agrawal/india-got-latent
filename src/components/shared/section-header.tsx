interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-xl"}`}
    >
      {label && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-base leading-relaxed">{description}</p>
      )}
      <div className={`gold-line mt-6 ${align === "center" ? "mx-auto w-24" : "w-24"}`} />
    </div>
  );
}
