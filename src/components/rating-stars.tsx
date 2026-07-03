export function RatingStars({
  rating,
  reviewCount,
  className = "",
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  const full = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-1 text-sm ${className}`}>
      <span className="text-brand-500" aria-hidden>
        {"★★★★★".slice(0, full)}
        <span className="text-brand-200">{"★★★★★".slice(full)}</span>
      </span>
      <span className="text-ink/60">
        {rating.toFixed(1)}
        {typeof reviewCount === "number" && reviewCount > 0
          ? ` (${reviewCount})`
          : ""}
      </span>
    </span>
  );
}
