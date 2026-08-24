export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Доставка та оплата</h1>

      <section className="card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-3">🚚 Доставка</h2>
        <ul className="space-y-2 text-text">
          <li>• Новою поштою по всій Україні</li>
          <li>• Доставка у відділення або поштомат</li>
          <li>• Термін доставки: 1–3 робочих дні</li>
          <li>• Вартість доставки — за тарифами Нової пошти</li>
        </ul>
      </section>

      <section className="card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-3">💳 Оплата</h2>
        <p className="mb-2">
          <strong className="text-accent">Накладений платіж</strong> — оплата при
          отриманні у відділенні Нової пошти.
        </p>
        <p className="text-sm text-text-muted">
          Комісія за післяплату — 20 грн + 2% від суми (згідно з тарифами НП).
        </p>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-bold mb-3">📦 Як оформити</h2>
        <ol className="space-y-2 list-decimal list-inside text-text">
          <li>Додайте товари у кошик</li>
          <li>Перейдіть до оформлення замовлення</li>
          <li>Заповніть дані для доставки</li>
          <li>Підтвердіть замовлення — менеджер передзвонить для уточнення</li>
        </ol>
      </section>
    </div>
  );
}
