# Smart Bar — Сайт кав'ярні

Сучасний сайт-вітрина для продажу кави та чаю з доставкою Новою поштою по Україні.

## Технології

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — стилізація
- **Zustand** — кошик (localStorage)
- **Telegram Bot API** — сповіщення менеджеру про нові замовлення
- **Google Apps Script** — запис замовлень у Google Таблицю

## Запуск локально

```bash
npm install
npm run dev
```

Сайт буде доступний на http://localhost:3000

## Структура

```
smart-bar/
├── data/
│   ├── products.json      # Каталог товарів (легко редагувати)
│   └── categories.json    # Категорії
├── public/images/         # Зображення товарів (SVG-плейсхолдери)
├── src/
│   ├── app/
│   │   ├── api/orders/    # POST endpoint для замовлень
│   │   ├── about/         # Сторінка "Про нас"
│   │   ├── cart/          # Кошик
│   │   ├── checkout/      # Оформлення замовлення
│   │   │   └── success/   # Сторінка "Дякуємо"
│   │   ├── contacts/      # Контакти
│   │   ├── delivery/      # Доставка та оплата
│   │   ├── product/[id]/  # Сторінка товару
│   │   ├── shop/          # Каталог з фільтрами
│   │   ├── globals.css    # Глобальні стилі
│   │   ├── layout.tsx     # Root layout (Header + Footer)
│   │   └── page.tsx       # Головна
│   ├── components/
│   │   ├── AddToCart.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ProductCard.tsx
│   ├── lib/
│   │   ├── cart.ts        # Zustand стор
│   │   ├── notifications.ts # Telegram + Google Sheets
│   │   └── products.ts    # Робота з даними
│   └── types/
│       └── index.ts       # TypeScript типи
├── docs/
│   └── TZ.md              # Технічне завдання
├── .env.example           # Шаблон env-змінних
└── README.md
```

## Як додати новий товар

Відкрий `data/products.json` і додай новий об'єкт у масив:

```json
{
  "id": "coffee-new",
  "name": "Назва товару",
  "category": "coffee",  // або "tea"
  "price": 300,
  "image": "/images/coffee-new.svg",
  "description": "Опис товару",
  "taste_notes": ["Нота1", "Нота2"],
  "origin": "Країна",
  "in_stock": true,
  "bestseller": false,
  "options": {
    "weight": ["250г", "500г", "1000г"]
  },
  "weight_prices": {
    "250г": 300,
    "500г": 550,
    "1000г": 1000
  }
}
```

Поклади зображення в `public/images/`. Готово — товар одразу з'явиться на сайті.

## Налаштування Telegram-бота

1. Створи бота через [@BotFather](https://t.me/BotFather), отримай `TELEGRAM_BOT_TOKEN`
2. Додай бота в чат з менеджером, отримай `TELEGRAM_CHAT_ID` (можна через [@userinfobot](https://t.me/userinfobot))
3. Заповни `.env.local`:

```env
TELEGRAM_BOT_TOKEN=1234567890:ABC...
TELEGRAM_CHAT_ID=-1001234567890
```

## Налаштування Google Sheets

1. Створи нову Google Таблицю
2. Відкрий **Розширення → Apps Script**
3. Встав код (див. `docs/google-apps-script.js` — створити під час інтеграції)
4. Опублікуй як Web App (доступ: "Усі"), скопіюй URL у `GOOGLE_APPS_SCRIPT_URL`

## Деплой на Vercel

```bash
npm i -g vercel
vercel
```

Або через Git: підключи репозиторій до Vercel — деплой автоматичний.

## Кольори бренду (тимчасова палітра)

- Фон: `#1B1410` (темно-кавовий)
- Поверхня: `#2A1F18`
- Акцент: `#C8956D` (теплий кавовий)
- Текст: `#F5EFE7`
- Другорядний: `#A8978A`

Фінальний логотип і кольори будуть оновлені після отримання від замовника.

## Ліцензія

Приватний проєкт.
