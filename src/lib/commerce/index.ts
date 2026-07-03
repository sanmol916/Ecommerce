import type { Category, Collection, Product } from "@/lib/types";
import { products as mockProducts, categories as mockCategories } from "./mock-data";
import {
  isShopifyConfigured,
  getShopifyProducts,
  getShopifyProduct,
  getShopifyCategories,
} from "./shopify";

/**
 * The single commerce API used across the app.
 *
 * It transparently switches between two providers:
 *  - "shopify": live data from the Shopify Storefront API (headless), used when
 *    SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN are configured.
 *  - "mock": the bundled Bhama Vision sample catalogue, used otherwise.
 *
 * Every page/component imports from here and never talks to a provider
 * directly, so going live on Shopify requires zero component changes.
 */
export const activeProvider: "shopify" | "mock" = isShopifyConfigured()
  ? "shopify"
  : "mock";

export async function getProducts(): Promise<Product[]> {
  return activeProvider === "shopify" ? getShopifyProducts() : mockProducts;
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (activeProvider === "shopify") return getShopifyProduct(slug);
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return activeProvider === "shopify" ? getShopifyCategories() : mockCategories;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCollection(
  collection: Collection,
): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.collections.includes(collection));
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === category);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
