"use client";

import { useState, useMemo } from "react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

type Filter = "all" | "coffee" | "tea" | "puer";
type SortKey = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const bgImg = (url: string): React.CSSProperties => ({
  backgroundImage: `url('${url}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export default function HomePage() {
  const all = getAllProducts();

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    let list: Product[] = all;

    if (filter === "coffee") {
      list = list.filter((p) => p.category === "coffee");
    } else if (filter === "tea") {
      list = list.filter((p) => p.category === "tea");
    } else if (filter === "puer") {
      list = list.filter(
        (p) => p.category === "tea" && p.name.toLowerCase().includes("пуер"),
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.taste_notes.some((n) => n.toLowerCase().includes(q)),
      );
    }

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, "uk"));
        break;
      case "name-desc":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name, "uk"));
        break;
    }
    return list;
  }, [all, filter, search, sort]);

  const filterBtn = (active: boolean) =>
    `px-5 py-2 rounded-full text-sm font-medium transition ${
      active
        ? "bg-[#FACC15] text-black border border-[#FACC15]"
        : "bg-white text-black border border-[#E5E5E5] hover:border-[#FACC15]"
    }`;

  return (
    <>
      {/* HERO — фон: латте-арт, темний overlay */}
      <section
        className="relative border-b border-[#E5E5E5] overflow-hidden min-h-[480px] flex items-center"
        style={bgImg("/images/bg/hero-latte-art.jpg")}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight text-white tracking-wide">
            Кава та <span className="text-[#FACC15]">чай</span>
            <br />
            з доставкою по Україні
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Свіжа зернова та мелена кава, листовий чай, матча та пуер. Доставка Новою поштою. Оплата при отриманні.
          </p>
          <a
            href="#catalog"
            className="inline-block bg-[#FACC15] hover:bg-[#EAB308] text-black font-semibold px-8 py-3 rounded-lg transition active:scale-[0.98]"
          >
            Обрати товар
          </a>
        </div>
      </section>

      {/* ABOUT — білий фон */}
      <section id="about" className="bg-white border-y border-[#E5E5E5] scroll-mt-20">
        <div className="container mx-auto px-4 py-14 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0A0A0A] text-center tracking-wide">
            Про нас
          </h2>
          <div className="space-y-4 text-[#0A0A0A] leading-relaxed text-center md:text-left">
            <p>
              <strong className="font-iceland font-bold text-lg text-[#0A0A0A] border-b-2 border-[#FACC15]">Smart Bar</strong> —
              це кав&apos;ярня для тих, хто цінує якісну каву та чай.
            </p>
            <p>
              Працюємо тільки з перевіреними постачальниками зерна з Бразилії, Ефіопії, Колумбії
              та Індії — кожен сорт проходить ретельний відбір.
            </p>
            <p>
              Окрім кави пропонуємо листовий чай, японську матчу та китайський пуер — все
              натуральне, без ароматизаторів і барвників.
            </p>
            <p>
              Доставляємо Новою поштою по всій Україні. Оплата при отриманні у відділенні.
            </p>
          </div>
        </div>
      </section>

      {/* CATALOG — чисто чорно-біло-жовтий */}
      <section
        id="catalog"
        className="relative scroll-mt-20 border-y-4 border-[#FACC15] bg-white"
      >
        <div className="container mx-auto px-4 py-14">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-[#0A0A0A] tracking-wide">
              Наш асортимент
            </h2>
            <p className="text-[#737373]">Кава, чай та пуер — на будь-який смак</p>
          </div>

          {/* 3 FILTERS + ALL — без емодзі */}
          <div className="flex gap-2 mb-5 flex-wrap justify-center">
            <button onClick={() => setFilter("all")} className={filterBtn(filter === "all")}>
              Усі
            </button>
            <button onClick={() => setFilter("coffee")} className={filterBtn(filter === "coffee")}>
              Кава
            </button>
            <button onClick={() => setFilter("tea")} className={filterBtn(filter === "tea")}>
              Чай
            </button>
            <button onClick={() => setFilter("puer")} className={filterBtn(filter === "puer")}>
              Пуер
            </button>
          </div>

          {/* SEARCH + SORT */}
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-3 mb-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Пошук товарів..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg outline-none focus:border-[#FACC15] text-sm transition text-[#0A0A0A]"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
                >
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="px-3 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg outline-none focus:border-[#FACC15] text-sm cursor-pointer text-[#0A0A0A]"
              >
                <option value="default">За замовчуванням</option>
                <option value="price-asc">Ціна: дешеві ↑</option>
                <option value="price-desc">Ціна: дорогі ↓</option>
                <option value="name-asc">Назва: А–Я</option>
                <option value="name-desc">Назва: Я–А</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-[#737373] mb-5 text-center">
            Знайдено товарів:{" "}
            <span className="font-semibold text-[#0A0A0A]">{filtered.length}</span>
          </p>

          {/* GRID */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#737373] mb-4">Нічого не знайдено</p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
                className="px-5 py-2 border border-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] transition text-[#0A0A0A]"
              >
                Скинути фільтри
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BENEFITS — білий фон */}
      <section id="delivery-info" className="bg-white border-y border-[#E5E5E5] scroll-mt-20">
        <div className="container mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🚚", t: "Доставка НП", d: "По всій Україні за 1–3 дні" },
            { icon: "🌱", t: "100% натурально", d: "Без ароматизаторів" },
            { icon: "💳", t: "Оплата при отриманні", d: "Накладений платіж" },
            { icon: "✨", t: "Гарантія якості", d: "Перевірені постачальники" },
          ].map((b) => (
            <div key={b.t} className="bg-white border border-[#E5E5E5] rounded-xl p-5 hover:border-[#FACC15] transition">
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="font-semibold mb-1 text-[#0A0A0A]">{b.t}</h3>
              <p className="text-sm text-[#737373]">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERY — білий фон */}
      <section id="delivery" className="bg-white border-t border-[#E5E5E5] scroll-mt-20">
        <div className="container mx-auto px-4 py-14 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A0A0A] text-center">
            Доставка та оплата
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
              <h3 className="font-semibold mb-2 text-[#0A0A0A]">📦 Нова пошта</h3>
              <ul className="text-sm text-[#0A0A0A] space-y-1">
                <li>• По всій Україні</li>
                <li>• У відділення або поштомат</li>
                <li>• 1–3 робочих дні</li>
              </ul>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
              <h3 className="font-semibold mb-2 text-[#0A0A0A]">🏪 Самовивіз</h3>
              <ul className="text-sm text-[#0A0A0A] space-y-1">
                <li>• Градизьк, вул. Молодіжна 5</li>
                <li>• Безкоштовно</li>
                <li>• Готівкою при отриманні</li>
              </ul>
            </div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
              <h3 className="font-semibold mb-2 text-[#0A0A0A]">💳 Оплата</h3>
              <ul className="text-sm text-[#0A0A0A] space-y-1">
                <li>• Накладений платіж</li>
                <li>• Без передоплати</li>
                <li>• Перевірка посилки на місці</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
