import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

/**
 * Horizontal, scroll-snapping row of products (no JS needed).
 * Used for New Arrivals / Best Sellers strips on the home page.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[65%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-[23%]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
