export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-iceland font-bold mb-6 text-[#0A0A0A] tracking-wide">
        Доставка та оплата
      </h1>

      <section className="bg-white border border-[#E5E5E5] rounded-xl p-6 mb-4">
        <h2 className="text-2xl font-bold mb-3 text-[#0A0A0A]">📦 Нова пошта</h2>
        <ul className="text-[#0A0A0A] space-y-1">
          <li>• Доставка у відділення або поштомат по всій Україні</li>
          <li>• Термін доставки: 1–3 робочих дні</li>
          <li>• Вартість — за тарифами Нової пошти</li>
          <li>• Можна перевірити посилку при отриманні</li>
        </ul>
      </section>

      <section className="bg-[#FACC15]/10 border-2 border-[#FACC15] rounded-xl p-6 mb-4">
        <h2 className="text-2xl font-bold mb-3 text-[#0A0A0A]">🏪 Самовивіз</h2>
        <p className="text-[#0A0A0A] mb-2">
          Заберіть замовлення безпосередньо з нашої кав&apos;ярні:
        </p>
        <p className="text-[#0A0A0A] mb-2 font-semibold text-lg">
          � Градизьк, вул. Молодіжна 5
        </p>
        <ul className="text-[#0A0A0A] space-y-1">
          <li>• <strong>Безкоштовно</strong></li>
          <li>• Оплата готівкою при отриманні</li>
          <li>• Графік: Пн–Пт 09:00–19:00, Сб–Нд 10:00–16:00</li>
          <li>• Можна понюхати, подивитись і випити чашку на місці ☕</li>
        </ul>
      </section>

      <section className="bg-white border border-[#E5E5E5] rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-3 text-[#0A0A0A]">💳 Оплата</h2>
        <p className="text-[#0A0A0A]">
          Працюємо тільки з <strong>накладеним платежем</strong> — оплата при отриманні товару:
        </p>
        <ul className="text-[#0A0A0A] space-y-1 mt-2">
          <li>• У відділенні Нової пошти — готівкою або карткою через термінал НП</li>
          <li>• При самовивозі — готівкою в кав&apos;ярні</li>
          <li>• Без передоплати, без комісії для покупця (крім стандартної комісії НП)</li>
        </ul>
      </section>

      <p className="mt-8 text-sm text-[#737373]">
        Після оформлення замовлення наш менеджер передзвонить вам для підтвердження деталей.
      </p>
    </div>
  );
}
