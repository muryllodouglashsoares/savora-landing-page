import { Reveal, type RevealVariant } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: RevealVariant;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "cinematic",
}: SectionHeadingProps) {
  return (
    <Reveal
      variant={variant}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <div
        className={`mt-7 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </Reveal>
  );
}
