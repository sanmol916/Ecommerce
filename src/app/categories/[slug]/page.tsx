import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/commerce";
import { ProductGrid } from "@/components/product-grid";

type Params = { params: Promise<{ slug: string }> };

// Pre-render a static page for every category (required for static export).
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category?.name ?? "Shop" };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-ink/60">{category.description}</p>
        <p className="mt-1 text-sm text-ink/45">{products.length} products</p>
      </header>
      <ProductGrid products={products} />
    </div>
  );
}
