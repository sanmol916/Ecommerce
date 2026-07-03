import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Collection } from "@/lib/types";
import { getProductsByCollection } from "@/lib/commerce";
import { ProductGrid } from "@/components/product-grid";

const COLLECTIONS: Record<string, { title: string; blurb: string }> = {
  "new-arrivals": {
    title: "New Arrivals",
    blurb: "Fresh drops, added every week. Be the first to style them.",
  },
  "best-sellers": {
    title: "Best Sellers",
    blurb: "The styles thousands of women keep coming back for.",
  },
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const meta = COLLECTIONS[slug];
  return { title: meta?.title ?? "Collection" };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const meta = COLLECTIONS[slug];
  if (!meta) notFound();

  const products = await getProductsByCollection(slug as Collection);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">{meta.title}</h1>
        <p className="mt-2 max-w-2xl text-ink/60">{meta.blurb}</p>
        <p className="mt-1 text-sm text-ink/45">{products.length} products</p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
