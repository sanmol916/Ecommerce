import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatINR, discountPercent } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.compareAtPrice);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:shadow-lg hover:ring-brand-200"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-50">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
        {off && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-semibold text-white">
            {off}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-sm font-medium text-ink">
          {product.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink/55">
          {product.fabric}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-ink">
            {formatINR(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatINR(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
