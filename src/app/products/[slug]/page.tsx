import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, getRelatedProducts } from "@/lib/commerce";
import { formatINR, discountPercent } from "@/lib/format";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/add-to-cart";
import { RatingStars } from "@/components/rating-stars";
import { ProductCarousel } from "@/components/product-carousel";
import { SectionHeading } from "@/components/section-heading";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const off = discountPercent(product.price, product.compareAtPrice);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-ink/50">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${product.category}`} className="hover:text-ink capitalize">
          {product.category.replace(/-/g, " ")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />

        <div>
          {product.badge && (
            <span className="mb-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {product.badge}
            </span>
          )}
          <h1 className="font-serif text-3xl text-ink">{product.name}</h1>
          <p className="mt-1 text-ink/60">{product.tagline}</p>

          <div className="mt-3">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-ink">
              {formatINR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-ink/40 line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
            {off && (
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
                {off}% OFF
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink/50">Inclusive of all taxes</p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <div className="mt-8 space-y-3 border-t border-black/5 pt-6 text-sm text-ink/70">
            <p><span className="font-medium text-ink">Fabric:</span> {product.fabric}</p>
            <p>{product.description}</p>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-xs text-ink/70">
            <li className="rounded-lg bg-white p-3 ring-1 ring-black/5">🚚 Free shipping over ₹1299</li>
            <li className="rounded-lg bg-white p-3 ring-1 ring-black/5">↩️ 7-day easy returns</li>
            <li className="rounded-lg bg-white p-3 ring-1 ring-black/5">💵 COD available</li>
            <li className="rounded-lg bg-white p-3 ring-1 ring-black/5">🌿 100% quality checked</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="You may also like" />
          <ProductCarousel products={related} />
        </section>
      )}
    </div>
  );
}
