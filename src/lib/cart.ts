"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, weight: string) => void;
  removeItem: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, weight) => {
        const price = product.weight_prices[weight] ?? product.price;
        const existing = get().items.find(
          (i) => i.productId === product.id && i.weight === weight,
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === product.id && i.weight === weight
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                productId: product.id,
                name: product.name,
                image: product.image,
                weight,
                price,
                quantity: 1,
              },
            ],
          });
        }
      },
      removeItem: (productId, weight) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.weight === weight),
          ),
        });
      },
      updateQuantity: (productId, weight, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, weight);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.weight === weight
              ? { ...i, quantity: qty }
              : i,
          ),
        });
      },
      clear: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "smart-bar-cart" },
  ),
);
