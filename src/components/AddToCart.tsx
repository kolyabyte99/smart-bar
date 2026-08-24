"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types";

export function AddToCart({ product }: { product: Product }) {
  const [weight, setWeight] = useState(product.options.weight[0]);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    addItem(product, weight);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-sm text-[#737373] mb-2 font-medium">Фасування</div>
        <div className="flex gap-2 flex-wrap">
          {product.options.weight.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWeight(w)}
              aria-pressed={weight === w}
              className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
                weight === w
                  ? "bg-[#FACC15] border-[#FACC15] text-black"
                  : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#FACC15]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
        <span className="text-3xl font-bold text-[#0A0A0A]">
          {product.weight_prices[weight]} грн
        </span>
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#FACC15] hover:bg-[#EAB308] text-black font-medium py-3 rounded-lg transition active:scale-[0.98]"
        >
          {added ? "✓ Додано" : "У кошик"}
        </button>
      </div>
    </div>
  );
}
