"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function Header() {
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur border-b border-[#E5E5E5]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-[#FACC15] flex items-center justify-center text-black font-bold text-lg">
            SB
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#0A0A0A]">smart bar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href="/" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Головна</Link>
          <Link href="/#catalog" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Магазин</Link>
          <Link href="/about" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Про нас</Link>
          <Link href="/delivery" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Доставка</Link>
          <Link href="/contacts" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Контакти</Link>
        </nav>

        <Link
          href="/cart"
          className="relative inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-medium text-[#0A0A0A] hover:bg-[#FAFAFA] transition shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>Кошик</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FACC15] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
