"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types";
import Link from "next/link";

/**
 * Каруселька фасування:
 * - Кава: стартова 100г, крок 100г → 100 → 200 → 300 → ...
 * - Чай:  стартова 50г,  крок 50г  → 50  → 100 → 150 → ...
 * Ціна за поточну вагу: пропорційно до базової (найменшої).
 */
function WeightCarousel({
  basePrice,
  category,
  value,
  onChange,
}: {
  basePrice: number;
  category: string;
  value: string;
  onChange: (w: string) => void;
}) {
  const startG = category === "tea" ? 50 : 100;
  const step = category === "tea" ? 50 : 100;
  const maxBound = 3000;

  const [currentG, setCurrentG] = useState<number>(parseInt(value || String(startG)));
  const currentWeight = currentG >= 1000 ? `${currentG / 1000}кг` : `${currentG}г`;

  const dec = () => {
    const next = Math.max(startG, currentG - step);
    setCurrentG(next);
    onChange(next >= 1000 ? `${next / 1000}кг` : `${next}г`);
  };
  const inc = () => {
    const next = Math.min(maxBound, currentG + step);
    setCurrentG(next);
    onChange(next >= 1000 ? `${next / 1000}кг` : `${next}г`);
  };

  // базова вага = 100г для кави, 50г для чаю
  // (на цій вазі ціна = basePrice, далі — пропорційно)
  const baseG = startG;
  const currentPrice = Math.round((basePrice * currentG) / baseG);
  const stepPrice = currentG > 0 ? Math.round((currentPrice * step) / currentG) : 0;

  return (
    <div>
      <div className="text-xs text-[#737373] mb-1.5">Фасування</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          disabled={currentG <= startG}
          className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white text-[#0A0A0A] text-lg font-bold hover:border-[#6B4423] disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Менше"
        >
          −
        </button>
        <div className="flex-1 text-center">
          <div className="text-base font-bold text-[#0A0A0A] font-mono">
            {currentWeight}
          </div>
          <div className="text-[10px] text-[#737373] uppercase tracking-wider">
            +{step}г = {stepPrice} грн
          </div>
        </div>
        <button
          type="button"
          onClick={inc}
          disabled={currentG >= maxBound}
          className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white text-[#0A0A0A] text-lg font-bold hover:border-[#6B4423] disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Більше"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState(() => {
    const startG = product.category === "tea" ? "50г" : "100г";
    return startG;
  });
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    if (!product.in_stock) return;
    addItem(product, weight);
  };

  // базова вага = 100г (кава) або 50г (чай)
  const baseG = product.category === "tea" ? 50 : 100;
  const currentG = parseInt(weight);
  const currentPrice = Math.round((product.price * currentG) / baseG);

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden">
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 z-10 bg-[#FAFAFA]/75 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-sm font-semibold text-[#0A0A0A] bg-white/90 px-3 py-1.5 rounded-lg border border-[#E5E5E5]">
              Немає в наявності
            </span>
          </div>
        )}
      </Link>

      <div className="pt-3 pb-2 flex flex-col gap-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold leading-tight text-[#0A0A0A] hover:text-[#6B4423] transition">
            {product.name}
          </h3>
        </Link>

        {product.taste_notes.length > 0 && (
          <p className="text-xs text-[#737373] leading-snug line-clamp-2 min-h-[2rem]">
            {product.taste_notes.join(" | ")}
          </p>
        )}

        <p className="text-lg font-bold text-[#0A0A0A] mt-1">{currentPrice} грн</p>

        {product.in_stock && (
          <>
            <WeightCarousel
              basePrice={product.price}
              category={product.category}
              value={weight}
              onChange={setWeight}
            />

            <button
              type="button"
              onClick={handleAdd}
              className="mt-2 w-full bg-[#FACC15] hover:bg-[#EAB308] text-black font-semibold py-2.5 rounded-lg transition active:scale-[0.98]"
            >
              У кошик
            </button>
          </>
        )}
      </div>
    </div>
  );
}
