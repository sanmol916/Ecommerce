import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { SectionHeading } from "@/components/section-heading";
import { ProductCarousel } from "@/components/product-carousel";
import { ShopByStyle } from "@/components/shop-by-style";
import { InstagramGallery } from "@/components/instagram-gallery";
import {
  getCategories,
  getProductsByCollection,
} from "@/lib/commerce";

export default async function HomePage() {
  const [newArrivals, bestSellers, categories] = await Promise.all([
    getProductsByCollection("new-arrivals"),
    getProductsByCollection("best-sellers"),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Fresh drops, every week"
          title="New Arrivals"
          ctaHref="/collections/new-arrivals"
          ctaLabel="View all"
        />
        <ProductCarousel products={newArrivals} />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Kurtis for every mood, every occasion"
            title="Shop by Style"
          />
          <ShopByStyle categories={categories} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Loved by thousands of women across India"
          title="Best Sellers"
          ctaHref="/collections/best-sellers"
          ctaLabel="View all"
        />
        <ProductCarousel products={bestSellers} />
      </section>

      <InstagramGallery />
    </>
  );
}
