"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart-context";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]);
  const [error, setError] = useState(false);

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0].url,
      price: product.price,
      size,
      color,
      quantity: 1,
    });
  }

  return (
    <div className="space-y-5">
      {/* Color */}
      <div>
        <p className="mb-2 text-sm font-medium text-ink">
          Colour: <span className="text-ink/60">{color}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                color === c
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-black/15 text-ink/70 hover:border-ink/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="mb-2 text-sm font-medium text-ink">
          Size {error && <span className="text-brand-600">— please select a size</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSize(s);
                setError(false);
              }}
              className={`h-11 min-w-11 rounded-lg border px-3 text-sm font-medium transition ${
                size === s
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-black/15 text-ink/80 hover:border-ink/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className="w-full rounded-full bg-brand-600 py-4 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-ink/30"
      >
        {product.inStock ? "Add to Bag" : "Out of Stock"}
      </button>
    </div>
  );
}
