"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/types";

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

  const baseG = startG;
  const currentPrice = Math.round((basePrice * currentG) / baseG);
  const stepPrice = currentG > 0 ? Math.round((currentPrice * step) / currentG) : 0;

  return (
    <div>
      <div className="text-sm text-[#737373] mb-2 font-medium">Фасування</div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={dec}
          disabled={currentG <= startG}
          className="w-10 h-10 rounded-full border border-[#E5E5E5] bg-white text-[#0A0A0A] text-xl font-bold hover:border-[#6B4423] disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Менше"
        >
          −
        </button>
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-[#0A0A0A] font-mono">
            {currentWeight}
          </div>
          <div className="text-[10px] text-[#737373] uppercase tracking-wider mt-1">
            +{step}г = {stepPrice} грн
          </div>
        </div>
        <button
          type="button"
          onClick={inc}
          disabled={currentG >= maxBound}
          className="w-10 h-10 rounded-full border border-[#E5E5E5] bg-white text-[#0A0A0A] text-xl font-bold hover:border-[#6B4423] disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Більше"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const startG = product.category === "tea" ? "50г" : "100г";
  const [weight, setWeight] = useState(startG);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    addItem(product, weight);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const baseG = product.category === "tea" ? 50 : 100;
  const currentG = parseInt(weight);
  const currentPrice = Math.round((product.price * currentG) / baseG);

  return (
    <div className="space-y-5">
      <WeightCarousel
        basePrice={product.price}
        category={product.category}
        value={weight}
        onChange={setWeight}
      />

      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
        <span className="text-3xl font-bold text-[#0A0A0A]">{currentPrice} грн</span>
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#FACC15] hover:bg-[#EAB308] text-black font-semibold py-3 rounded-lg transition active:scale-[0.98]"
        >
          {added ? "✓ Додано" : "У кошик"}
        </button>
      </div>
    </div>
  );
}
