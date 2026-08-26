import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, getAllProducts } from "@/lib/products";
import { AddToCart } from "@/components/AddToCart";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        href="/#catalog"
        className="text-sm text-[#737373] hover:text-[#FACC15] transition inline-flex items-center gap-1"
      >
        ← Повернутись до магазину
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden border border-[#E5E5E5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#0A0A0A]">{product.name}</h1>
          <p className="text-[#737373] mb-6 leading-relaxed">{product.description}</p>

          <div className="space-y-3 mb-6 pb-6 border-b border-[#E5E5E5]">
            <div className="text-sm">
              <span className="text-[#737373]">Країна походження: </span>
              <span className="font-medium text-[#0A0A0A]">{product.origin}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.taste_notes.map((note) => (
                <span
                  key={note}
                  className="text-xs bg-[#FAFAFA] border border-[#E5E5E5] px-3 py-1 rounded-full text-[#0A0A0A]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {product.in_stock ? (
            <AddToCart product={product} />
          ) : (
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 text-[#737373] font-medium">
              Немає в наявності
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
