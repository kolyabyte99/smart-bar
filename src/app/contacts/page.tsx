export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-iceland font-bold mb-6 text-[#0A0A0A] tracking-wide">
        Контакти
      </h1>

      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 space-y-5">
        <div>
          <h3 className="font-semibold mb-1 text-[#0A0A0A]">� Адреса кав&apos;ярні</h3>
          <p className="text-[#0A0A0A]">
            Україна, Кіровоградська область,
            <br />
            смт Градизьк, вул. Молодіжна 5
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-1 text-[#0A0A0A]">🕐 Графік роботи</h3>
          <p className="text-[#0A0A0A]">
            Пн–Пт: 09:00 — 19:00
            <br />
            Сб–Нд: 10:00 — 16:00
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-1 text-[#0A0A0A]">📞 Телефон</h3>
          <p className="text-[#0A0A0A]">+380 XX XXX XX XX</p>
        </div>

        <div>
          <h3 className="font-semibold mb-1 text-[#0A0A0A]">📧 Email</h3>
          <p className="text-[#0A0A0A]">info@smartbar.ua</p>
        </div>

        <div>
          <h3 className="font-semibold mb-1 text-[#0A0A0A]">💬 Соцмережі</h3>
          <div className="flex gap-4">
            <a href="#" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Instagram</a>
            <a href="#" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Telegram</a>
            <a href="#" className="text-[#0A0A0A] hover:text-[#FACC15] transition">Facebook</a>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-[#FACC15]/10 border border-[#FACC15] rounded-xl p-5 text-center">
        <p className="text-sm text-[#0A0A0A]">
          💡 Хочете забрати замовлення самовивозом?
          <br />
          Оберіть опцію <strong>&quot;Самовивіз&quot;</strong> при оформленні.
        </p>
      </div>
    </div>
  );
}
