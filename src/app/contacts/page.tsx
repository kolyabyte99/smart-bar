export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Контакти</h1>

      <div className="card p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Телефон</h3>
          <p className="text-text-muted">+380 XX XXX XX XX</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-text-muted">info@smartbar.ua</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Соцмережі</h3>
          <div className="flex gap-3">
            <a href="#" className="text-accent hover:underline">Instagram</a>
            <a href="#" className="text-accent hover:underline">Telegram</a>
            <a href="#" className="text-accent hover:underline">Facebook</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Графік роботи</h3>
          <p className="text-text-muted">Пн–Пт: 09:00 – 19:00</p>
          <p className="text-text-muted">Сб–Нд: 10:00 – 16:00</p>
        </div>
      </div>
    </div>
  );
}
