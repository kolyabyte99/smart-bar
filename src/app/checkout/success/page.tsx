"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("id");

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <div className="text-6xl mb-6">✓</div>
      <h1 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Замовлення прийняте!</h1>
      <p className="text-[#737373] mb-3">
        Дякуємо за замовлення. Наш менеджер зв&apos;яжеться з вами найближчим часом для
        підтвердження.
      </p>
      {orderId && (
        <div className="bg-[#FACC15] border border-[#FACC15] rounded-xl px-5 py-3 mb-8 inline-block">
          <div className="text-xs uppercase tracking-wider text-black/70 font-medium">
            Номер замовлення
          </div>
          <div className="text-2xl font-bold text-black font-mono mt-1">{orderId}</div>
        </div>
      )}
      <div>
        <Link
          href="/#catalog"
          className="inline-block bg-[#FACC15] hover:bg-[#EAB308] text-black font-semibold px-7 py-3 rounded-lg transition active:scale-[0.98]"
        >
          Повернутись до магазину
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-[#737373]">Завантаження...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
