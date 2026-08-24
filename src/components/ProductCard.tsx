"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState(product.options.weight[0]);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    if (!product.in_stock) return;
    addItem(product, weight);
  };

  const currentPrice = product.weight_prices[weight] ?? product.price;

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden">
      {/* Image with overlay */}
      <div className="relative aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden group">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </Link>

        {/* Top-left badge */}
        {product.bestseller && (
          <span className="absolute top-3 left-3 z-10 bg-[#FACC15] text-black text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
            Топ
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 z-10 bg-[#FAFAFA]/75 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-sm font-semibold text-[#0A0A0A] bg-white/90 px-3 py-1.5 rounded-lg border border-[#E5E5E5]">
              Немає в наявності
            </span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="pt-3 pb-2 flex flex-col gap-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold leading-tight text-[#0A0A0A] hover:text-[#FACC15] transition">
            {product.name}
          </h3>
        </Link>

        {product.taste_notes.length > 0 && (
          <p className="text-xs text-[#737373] leading-snug line-clamp-2 min-h-[2rem]">
            {product.taste_notes.join(" | ")}
          </p>
        )}

        <p className="text-lg font-bold text-[#0A0A0A] mt-1">
          {currentPrice} грн
        </p>

        {product.in_stock && (
          <>
            {/* Packaging buttons */}
            <div className="mt-1">
              <div className="text-xs text-[#737373] mb-1.5">Фасування</div>
              <div className="flex gap-1.5 flex-wrap">
                {product.options.weight.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeight(w)}
                    aria-pressed={weight === w}
                    className={`text-xs px-3 py-1.5 rounded-md border transition font-medium ${
                      weight === w
                        ? "bg-[#FACC15] border-[#FACC15] text-black"
                        : "bg-white border-[#E5E5E5] text-[#0A0A0A] hover:border-[#737373]"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-2 w-full bg-[#FACC15] hover:bg-[#EAB308] text-black font-medium py-2.5 rounded-lg transition active:scale-[0.98]"
            >
              У кошик
            </button>
          </>
        )}
      </div>
    </div>
  );
}
