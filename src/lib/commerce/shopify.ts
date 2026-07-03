import type { Product, Category, Collection, ProductBadge } from "@/lib/types";

/**
 * Shopify Storefront API provider (headless).
 *
 * This activates automatically when SHOPIFY_STORE_DOMAIN and
 * SHOPIFY_STOREFRONT_ACCESS_TOKEN are set (see .env.example). Until then the
 * app uses the local mock catalogue, so nothing here needs to run to develop.
 */

const API_VERSION = "2024-10";

function endpoint(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
}

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
}

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    // Cache product data at the edge; revalidate periodically.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// ---- GraphQL fragments & queries ------------------------------------------

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    options { name values }
    images(first: 6) {
      edges { node { url altText } }
    }
    collections(first: 10) {
      edges { node { handle title } }
    }
  }
`;

const PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) {
    products(first: $first) {
      edges { node { ...ProductFields } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

// ---- Mapping Shopify shapes -> our normalized types -----------------------

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}
interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  options: { name: string; values: string[] }[];
  images: { edges: { node: { url: string; altText: string | null } }[] };
  collections: { edges: { node: { handle: string; title: string } }[] };
}

/** Convert Shopify decimal money strings ("649.00") to integer paise. */
function toPaise(money: ShopifyMoney): number {
  return Math.round(parseFloat(money.amount) * 100);
}

const KNOWN_COLLECTIONS: Collection[] = [
  "new-arrivals",
  "best-sellers",
  "kurtis",
  "co-ord-sets",
  "dresses",
  "kurta-sets",
];

function mapBadge(tags: string[]): ProductBadge | undefined {
  const t = tags.map((x) => x.toLowerCase());
  if (t.includes("best-seller")) return "Best Seller";
  if (t.includes("most-wanted")) return "Most Wanted";
  if (t.includes("fast-mover")) return "Fast Mover";
  if (t.includes("new")) return "New In";
  return undefined;
}

function mapProduct(node: ShopifyProduct): Product {
  const collectionHandles = node.collections.edges
    .map((e) => e.node.handle)
    .filter((h): h is Collection =>
      KNOWN_COLLECTIONS.includes(h as Collection),
    );

  const category =
    (collectionHandles.find((c) =>
      ["kurtis", "co-ord-sets", "dresses", "kurta-sets"].includes(c),
    ) as Product["category"]) ?? "kurtis";

  const colorOption = node.options.find(
    (o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour",
  );
  const sizeOption = node.options.find((o) => o.name.toLowerCase() === "size");

  const price = toPaise(node.priceRange.minVariantPrice);
  const compareAt = toPaise(node.compareAtPriceRange.minVariantPrice);

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    tagline: node.description.split(". ")[0] ?? node.title,
    description: node.description,
    price,
    compareAtPrice: compareAt > price ? compareAt : undefined,
    currency: "INR",
    images: node.images.edges.map((e) => ({
      url: e.node.url,
      alt: e.node.altText ?? node.title,
    })),
    sizes: sizeOption?.values ?? ["S", "M", "L", "XL"],
    colors: colorOption?.values ?? ["Default"],
    fabric: node.productType || "Cotton",
    category,
    collections: collectionHandles,
    badge: mapBadge(node.tags),
    rating: 4.6,
    reviewCount: 0,
    inStock: node.availableForSale,
  };
}

// ---- Public provider functions --------------------------------------------

export async function getShopifyProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(PRODUCTS_QUERY, { first: 100 });
  return data.products.edges.map((e) => mapProduct(e.node));
}

export async function getShopifyProduct(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  return data.product ? mapProduct(data.product) : null;
}

/**
 * Categories are not first-class in the Storefront API the same way, so we
 * derive them from the products we fetch. Kept simple for the MVP.
 */
export async function getShopifyCategories(): Promise<Category[]> {
  // In a full build this would query Shopify collections directly.
  const { categories } = await import("./mock-data");
  return categories;
}
