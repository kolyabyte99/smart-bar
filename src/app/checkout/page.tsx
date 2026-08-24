"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    np_branch: "",
    comment: "",
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#0A0A0A]">
          Спочатку додайте товари у кошик
        </h1>
        <button
          onClick={() => router.push("/#catalog")}
          className="bg-[#FACC15] hover:bg-[#EAB308] text-black font-medium px-7 py-3 rounded-lg transition"
        >
          До магазину
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, total }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Помилка при оформленні");
        return;
      }
      clear();
      router.push(`/checkout/success?id=${encodeURIComponent(data.order_id)}`);
    } catch {
      setError("Не вдалося зв'язатися з сервером");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-white border border-[#E5E5E5] px-4 py-3 outline-none focus:border-[#FACC15] transition text-[#0A0A0A] placeholder:text-[#A8978A]";

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#0A0A0A]">Оформлення замовлення</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-xl mb-4 text-[#0A0A0A]">Дані для доставки</h2>

          <div>
            <label className="text-sm text-[#737373] mb-1 block font-medium">
              ПІБ <span className="text-[#FACC15]">*</span>
            </label>
            <input
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#737373] mb-1 block font-medium">
                Телефон <span className="text-[#FACC15]">*</span>
              </label>
              <input
                required
                type="tel"
                placeholder="+380..."
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-[#737373] mb-1 block font-medium">Email</label>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#737373] mb-1 block font-medium">
                Місто <span className="text-[#FACC15]">*</span>
              </label>
              <input
                required
                className={inputClass}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-[#737373] mb-1 block font-medium">
                Відділення НП <span className="text-[#FACC15]">*</span>
              </label>
              <input
                required
                placeholder="Наприклад: №25"
                className={inputClass}
                value={form.np_branch}
                onChange={(e) => setForm({ ...form, np_branch: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#737373] mb-1 block font-medium">Коментар</label>
            <textarea
              rows={3}
              className={inputClass}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-[#0A0A0A]">Спосіб оплати</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked readOnly className="accent-[#FACC15]" />
              <div>
                <div className="font-medium text-[#0A0A0A]">Накладений платіж</div>
                <div className="text-xs text-[#737373]">
                  Оплата при отриманні у відділенні Нової пошти
                </div>
              </div>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4 text-[#0A0A0A]">Ваше замовлення</h2>
          <div className="space-y-2 text-sm mb-4">
            {items.map((i) => (
              <div key={`${i.productId}-${i.weight}`} className="flex justify-between gap-2">
                <span className="text-[#737373] truncate">
                  {i.name} ({i.weight}) × {i.quantity}
                </span>
                <span className="text-[#0A0A0A] font-medium shrink-0">
                  {i.price * i.quantity} грн
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E5E5E5] pt-3 mb-4">
            <div className="flex justify-between font-bold text-lg text-[#0A0A0A]">
              <span>Усього:</span>
              <span>{total} грн</span>
            </div>
            <p className="text-xs text-[#737373] mt-1">+ доставка Новою поштою</p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#FACC15] hover:bg-[#EAB308] disabled:opacity-50 text-black font-medium py-3 rounded-lg transition active:scale-[0.98]"
          >
            {submitting ? "Оформлення..." : "Підтвердити замовлення"}
          </button>
        </div>
      </form>
    </div>
  );
}
