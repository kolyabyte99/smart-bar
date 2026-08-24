export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Про Smart Bar</h1>
      <div className="prose prose-invert space-y-4 text-text">
        <p>
          <strong className="text-accent">Smart Bar</strong> — це кав&apos;ярня для тих, хто цінує
          свіжу каву та якісний чай.
        </p>
        <p>
          Працюємо тільки з перевіреними постачальниками зерна з Бразилії, Ефіопії, Колумбії
          та Індії — кожен сорт проходить ретельний відбір.
        </p>
        <p>
          Окрім кави пропонуємо листовий чай, японську матчу та китайський пуер —
          все натуральне, без ароматизаторів і барвників.
        </p>
        <p>
          Доставляємо Новою поштою по всій Україні. Оплата при отриманні.
        </p>
      </div>
    </div>
  );
}
