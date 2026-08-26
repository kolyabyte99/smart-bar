"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";

const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/#catalog", label: "Магазин" },
  { href: "/#about", label: "Про нас" },
  { href: "/#delivery", label: "Доставка" },
  { href: "/#contacts", label: "Контакти" },
];

export function Header() {
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur border-b border-[#E5E5E5]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/images/logo.png"
            alt="Smart Bar"
            className="h-12 w-12"
          />
          <span className="text-3xl font-iceland tracking-tight text-[#0A0A0A] leading-none">
            smart bar
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#0A0A0A] hover:text-[#FACC15] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 md:px-4 py-2 text-sm font-medium text-[#0A0A0A] hover:bg-[#FAFAFA] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="hidden sm:inline">Кошик</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FACC15] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E5E5E5] bg-white text-[#0A0A0A] hover:bg-[#FAFAFA] transition"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden border-t border-[#E5E5E5] bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-[#0A0A0A] hover:text-[#FACC15] hover:bg-[#FAFAFA] transition px-3 py-3 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
