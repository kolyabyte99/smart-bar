import products from "@/../data/products.json";
import categories from "@/../data/categories.json";
import type { Product, Category } from "@/types";

const allProducts = products as unknown as Product[];
const allCategories = categories as unknown as { categories: Category[] };

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return allProducts.filter((p) => p.category === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getCategories(): Category[] {
  return allCategories.categories;
}

export function getCategoryById(id: string): Category | undefined {
  return allCategories.categories.find((c) => c.id === id);
}
