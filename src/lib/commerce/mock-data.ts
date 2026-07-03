import type { Category, Product } from "@/lib/types";

/** Deterministic sample imagery so the store looks real without a CMS. */
function img(seed: string, alt: string) {
  return { url: `https://picsum.photos/seed/${seed}/800/1000`, alt };
}

export const categories: Category[] = [
  {
    slug: "kurtis",
    name: "Kurtis",
    description: "Everyday elegance in breathable cotton, crafted for every mood.",
    image: "https://picsum.photos/seed/bhama-cat-kurtis/900/1100",
  },
  {
    slug: "kurta-sets",
    name: "Kurta Sets",
    description: "Coordinated kurta and bottom sets, ready for any occasion.",
    image: "https://picsum.photos/seed/bhama-cat-sets/900/1100",
  },
  {
    slug: "co-ord-sets",
    name: "Co-ord Sets",
    description: "Effortlessly styled two-pieces that do the thinking for you.",
    image: "https://picsum.photos/seed/bhama-cat-coord/900/1100",
  },
  {
    slug: "dresses",
    name: "Dresses",
    description: "Fusion silhouettes that move from desk to dinner.",
    image: "https://picsum.photos/seed/bhama-cat-dresses/900/1100",
  },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

type Seed = {
  slug: string;
  name: string;
  tagline: string;
  price: number; // rupees
  compareAt?: number; // rupees
  category: Product["category"];
  collections: Product["collections"];
  colors: string[];
  fabric: string;
  badge?: Product["badge"];
  rating: number;
  reviewCount: number;
};

const seeds: Seed[] = [
  {
    slug: "meera-floral-cotton-kurti",
    name: "Meera Floral Cotton Kurti",
    tagline: "Hand-block florals on breathable cotton.",
    price: 749,
    compareAt: 1299,
    category: "kurtis",
    collections: ["new-arrivals", "kurtis"],
    colors: ["Blush Pink", "Ivory", "Sage"],
    fabric: "100% Pure Cotton",
    badge: "New In",
    rating: 4.6,
    reviewCount: 128,
  },
  {
    slug: "aanya-anarkali-kurti",
    name: "Aanya Anarkali Kurti",
    tagline: "Flowing anarkali silhouette for festive days.",
    price: 999,
    compareAt: 1799,
    category: "kurtis",
    collections: ["best-sellers", "kurtis"],
    colors: ["Maroon", "Royal Blue"],
    fabric: "Rayon Blend",
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 342,
  },
  {
    slug: "riya-straight-cotton-kurti",
    name: "Riya Straight Cotton Kurti",
    tagline: "A crisp everyday straight-cut staple.",
    price: 649,
    compareAt: 1199,
    category: "kurtis",
    collections: ["new-arrivals", "kurtis"],
    colors: ["Mustard", "Teal", "White"],
    fabric: "100% Pure Cotton",
    badge: "Fast Mover",
    rating: 4.4,
    reviewCount: 89,
  },
  {
    slug: "saanvi-printed-kurta-set",
    name: "Saanvi Printed Kurta Set",
    tagline: "Kurta with matching pants and dupatta.",
    price: 1499,
    compareAt: 2499,
    category: "kurta-sets",
    collections: ["best-sellers", "kurta-sets"],
    colors: ["Emerald", "Rust"],
    fabric: "Cotton Cambric",
    badge: "Most Wanted",
    rating: 4.9,
    reviewCount: 511,
  },
  {
    slug: "ira-embroidered-kurta-set",
    name: "Ira Embroidered Kurta Set",
    tagline: "Delicate thread embroidery, festive-ready.",
    price: 1899,
    compareAt: 2999,
    category: "kurta-sets",
    collections: ["new-arrivals", "kurta-sets"],
    colors: ["Powder Blue", "Peach"],
    fabric: "Chanderi Silk",
    badge: "New In",
    rating: 4.7,
    reviewCount: 76,
  },
  {
    slug: "diya-cotton-coord-set",
    name: "Diya Cotton Co-ord Set",
    tagline: "Relaxed shirt and trouser co-ord.",
    price: 1299,
    compareAt: 1999,
    category: "co-ord-sets",
    collections: ["best-sellers", "co-ord-sets"],
    colors: ["Sky", "Olive"],
    fabric: "Cotton Linen",
    badge: "Best Seller",
    rating: 4.5,
    reviewCount: 203,
  },
  {
    slug: "tara-striped-coord-set",
    name: "Tara Striped Co-ord Set",
    tagline: "Breezy stripes for weekend brunches.",
    price: 1399,
    category: "co-ord-sets",
    collections: ["new-arrivals", "co-ord-sets"],
    colors: ["Terracotta", "Indigo"],
    fabric: "Cotton Linen",
    badge: "New In",
    rating: 4.3,
    reviewCount: 54,
  },
  {
    slug: "myra-fusion-midi-dress",
    name: "Myra Fusion Midi Dress",
    tagline: "Indo-western midi with a flattering fit.",
    price: 1599,
    compareAt: 2299,
    category: "dresses",
    collections: ["best-sellers", "dresses"],
    colors: ["Wine", "Black"],
    fabric: "Viscose Crepe",
    badge: "Most Wanted",
    rating: 4.8,
    reviewCount: 289,
  },
  {
    slug: "nisha-tiered-cotton-dress",
    name: "Nisha Tiered Cotton Dress",
    tagline: "Playful tiers in soft handloom cotton.",
    price: 1199,
    compareAt: 1899,
    category: "dresses",
    collections: ["new-arrivals", "dresses"],
    colors: ["Mint", "Coral"],
    fabric: "Handloom Cotton",
    badge: "New In",
    rating: 4.6,
    reviewCount: 61,
  },
  {
    slug: "kiara-angrakha-kurti",
    name: "Kiara Angrakha Kurti",
    tagline: "Classic angrakha wrap with tassels.",
    price: 899,
    compareAt: 1599,
    category: "kurtis",
    collections: ["best-sellers", "kurtis"],
    colors: ["Off White", "Lavender"],
    fabric: "Rayon Blend",
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 174,
  },
  {
    slug: "avni-a-line-kurti",
    name: "Avni A-line Kurti",
    tagline: "Flared A-line that flatters every frame.",
    price: 799,
    compareAt: 1399,
    category: "kurtis",
    collections: ["new-arrivals", "kurtis"],
    colors: ["Turmeric", "Grey"],
    fabric: "100% Pure Cotton",
    badge: "Fast Mover",
    rating: 4.5,
    reviewCount: 98,
  },
  {
    slug: "zoya-palazzo-kurta-set",
    name: "Zoya Palazzo Kurta Set",
    tagline: "Wide-leg palazzo set for all-day comfort.",
    price: 1699,
    compareAt: 2699,
    category: "kurta-sets",
    collections: ["best-sellers", "kurta-sets"],
    colors: ["Navy", "Bottle Green"],
    fabric: "Muslin Cotton",
    badge: "Most Wanted",
    rating: 4.9,
    reviewCount: 420,
  },
];

export const products: Product[] = seeds.map((s) => ({
  id: s.slug,
  slug: s.slug,
  name: s.name,
  tagline: s.tagline,
  description:
    `${s.tagline} The ${s.name} is crafted from ${s.fabric.toLowerCase()} for all-day comfort in Indian weather. ` +
    "Thoughtfully tailored with a true-to-size fit, reinforced stitching, and colours that stay vivid wash after wash. " +
    "Pair it with juttis for daywear or heels to dress it up.",
  price: s.price * 100,
  compareAtPrice: s.compareAt ? s.compareAt * 100 : undefined,
  currency: "INR",
  images: [
    img(`${s.slug}-1`, `${s.name} front view`),
    img(`${s.slug}-2`, `${s.name} detail view`),
    img(`${s.slug}-3`, `${s.name} styled look`),
  ],
  sizes: SIZES,
  colors: s.colors,
  fabric: s.fabric,
  category: s.category,
  collections: s.collections,
  badge: s.badge,
  rating: s.rating,
  reviewCount: s.reviewCount,
  inStock: true,
}));
