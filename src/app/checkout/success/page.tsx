import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <div className="text-6xl mb-6">✓</div>
      <h1 className="text-3xl font-bold mb-4">Замовлення прийняте!</h1>
      <p className="text-text-muted mb-8">
        Дякуємо за замовлення. Наш менеджер зв&apos;яжеться з вами найближчим часом для підтвердження.
      </p>
      <Link href="/#catalog" className="btn-primary">Повернутись до магазину</Link>
    </div>
  );
}
