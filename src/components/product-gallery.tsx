"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-3 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => setActive(i)}
            className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg ring-1 transition ${
              active === i ? "ring-2 ring-brand-600" : "ring-black/10"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={img.url} alt={img.alt} fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-white">
        <Image
          src={images[active].url}
          alt={images[active].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
