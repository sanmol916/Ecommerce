import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  ctaHref,
  ctaLabel,
}: {
  eyebrow?: string;
  title: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">{title}</h2>
      </div>
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="whitespace-nowrap text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
        >
          {ctaLabel} →
        </Link>
      )}
    </div>
  );
}
