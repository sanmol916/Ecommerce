import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export function ShopByStyle({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categories/${cat.slug}`}
          className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
        >
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-serif text-lg text-white">{cat.name}</h3>
            <span className="text-xs text-white/80 underline-offset-4 group-hover:underline">
              Shop now →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
