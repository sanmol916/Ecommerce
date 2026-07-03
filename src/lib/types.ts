export type Collection =
  | "new-arrivals"
  | "best-sellers"
  | "kurtis"
  | "co-ord-sets"
  | "dresses"
  | "kurta-sets";

export type ProductBadge = "New In" | "Best Seller" | "Most Wanted" | "Fast Mover";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Short marketing tagline shown on the product page. */
  tagline: string;
  description: string;
  /** Price in paise to avoid floating point issues (₹649 => 64900). */
  price: number;
  /** Optional strike-through "was" price in paise. */
  compareAtPrice?: number;
  currency: "INR";
  images: ProductImage[];
  sizes: string[];
  colors: string[];
  fabric: string;
  category: Category["slug"];
  collections: Collection[];
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface Category {
  slug: "kurtis" | "co-ord-sets" | "dresses" | "kurta-sets";
  name: string;
  description: string;
  image: string;
}

export interface CartLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}
