"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Кошик порожній</h1>
        <p className="text-[#737373] mb-6">Додайте товари з нашого магазину</p>
        <Link
          href="/#catalog"
          className="inline-block bg-[#FACC15] hover:bg-[#EAB308] text-black font-medium px-7 py-3 rounded-lg transition active:scale-[0.98]"
        >
          Перейти до магазину
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#0A0A0A]">Кошик</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.weight}`}
              className="bg-white border border-[#E5E5E5] rounded-xl p-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover bg-[#F5F5F5] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0A0A0A] truncate">{item.name}</h3>
                <p className="text-sm text-[#737373]">{item.weight}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.productId, item.weight, item.quantity - 1)
                  }
                  className="w-8 h-8 rounded border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#0A0A0A]"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium text-[#0A0A0A]">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(item.productId, item.weight, item.quantity + 1)
                  }
                  className="w-8 h-8 rounded border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#0A0A0A]"
                >
                  +
                </button>
              </div>
              <div className="font-bold w-28 text-right text-[#0A0A0A]">
                {item.price * item.quantity} грн
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.productId, item.weight)}
                className="text-[#737373] hover:text-[#FACC15] text-sm transition"
              >
                Видалити
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4 text-[#0A0A0A]">Підсумок</h2>
          <div className="space-y-2 text-sm mb-4 text-[#0A0A0A]">
            {items.map((i) => (
              <div key={`${i.productId}-${i.weight}`} className="flex justify-between gap-2">
                <span className="text-[#737373] truncate">
                  {i.name} ({i.weight}) × {i.quantity}
                </span>
                <span className="font-medium shrink-0">{i.price * i.quantity} грн</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E5E5E5] pt-3 mb-6">
            <div className="flex justify-between font-bold text-lg text-[#0A0A0A]">
              <span>Усього:</span>
              <span>{total} грн</span>
            </div>
            <p className="text-xs text-[#737373] mt-1">
              + доставка Новою поштою за тарифами перевізника
            </p>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center bg-[#FACC15] hover:bg-[#EAB308] text-black font-medium py-3 rounded-lg transition active:scale-[0.98]"
          >
            Оформити замовлення
          </Link>
        </div>
      </div>
    </div>
  );
}
