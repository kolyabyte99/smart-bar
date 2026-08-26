# Smart Bar — повна документація проєкту

> **Що це:** нотатки для себе — щоб через рік відкрити і все згадати. Не для клієнтів чи README проєкту.

> **Проєкт:** інтернет-магазин кави та чаю Smart Bar (Градизьк, Україна)
> **GitHub:** https://github.com/kolyabyte99/smart-bar
> **Production URL:** ще не налаштований (домен купимо потім)
> **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, Google Apps Script, Telegram Bot API

---

## 1. Швидкий старт (для себе)

### Запустити локально

```bash
cd D:/work_hermes/projects/Smart_Bar
npm run dev
```

Відкрити: `http://localhost:3000/`

### Зупинити всі процеси (коли порти 3000-3002 зайняті)

```bash
powershell -Command "Get-NetTCPConnection -LocalPort 3000,3001,3002 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique | ForEach-Object { try { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } catch {} }; Start-Sleep 2; (Get-NetTCPConnection -LocalPort 3000,3001,3002 -State Listen -ErrorAction SilentlyContinue | Measure-Object).Count"
```

### Build для production

```bash
cd D:/work_hermes/projects/Smart_Bar
rm -rf .next        # важливо — інакше буде "webpack cache ENOENT"
npm run build
npm run dev         # тестуй production-style
```

### Структура файлів

```
D:/work_hermes/projects/Smart_Bar/
├── .env.local              ← СЕКРЕТИ (не комітиться)
├── .env.example            ← шаблон env для команди
├── data/
│   └── products.json       ← каталог товарів (правити руками)
├── docs/
│   ├── TZ.md               ← технічне завдання для клієнта
│   ├── google-apps-script.gs ← скрипт для Google Sheets
│   └── PROJECT_NOTES.md    ← цей файл (для себе)
├── public/
│   └── images/
│       ├── logo.svg                  ← логотип (тимчасовий, замінимо)
│       ├── coffee-montana-*.jpg     ← 3 фото кави Montana
│       ├── tea-{green,black,oolong}.jpg ← 3 фото чаю
│       ├── tea-puer-{shu,shen,jasmine}.jpg ← 3 фото пуеру
│       └── bg/                       ← фонові фото для hero/dilivery
├── src/
│   ├── app/                ← сторінки + API
│   │   ├── api/orders/     ← POST endpoint для замовлень
│   │   ├── cart/           ← кошик (Zustand persist)
│   │   ├── checkout/       ← форма + success
│   │   ├── contacts/       ← контакти + адреса самовивозу
│   │   ├── delivery/       ← умови доставки/оплати
│   │   ├── product/[id]/   ← SSG сторінка товару
│   │   ├── shop/           ← (видалено, каталог на головній)
│   │   ├── globals.css     ← основні стилі + Iceland font
│   │   ├── layout.tsx      ← root layout (Header + Footer)
│   │   └── page.tsx        ← ГОЛОВНИЙ лендинг
│   ├── components/         ← перевикористовувані компоненти
│   │   ├── AddToCart.tsx       ← каруселька фасування (на сторінці товару)
│   │   ├── Footer.tsx          ← футер з логотипом
│   │   ├── Header.tsx          ← шапка з логотипом + навігація + кошик
│   │   └── ProductCard.tsx     ← картка товару в каталозі
│   ├── lib/                ← бізнес-логіка
│   │   ├── cart.ts             ← Zustand store (з localStorage persist)
│   │   ├── notifications.ts   ← Telegram + Google Sheets + generateOrderId
│   │   └── products.ts        ← завантажувач JSON
│   └── types/
│       └── index.ts           ← TS типи (Product, CartItem, Order, DeliveryMethod)
├── tailwind.config.ts     ← кастомна палітра + font-iceland
├── next.config.js         ← стандартний
└── package.json
```

---

## 2. Дизайн-система

### Палітра кольорів (чорно-біло-жовтий сучасний)

```
--bg: #FAFAFA          (білий фон сторінки)
--surface: #FFFFFF     (білі картки, форми, кнопки)
--accent: #FACC15      (жовтий — для CTA кнопок, акцентів)
--accent-hover: #EAB308 (hover)
--accent-soft: #FEF9C3 (світло-жовтий, chips)
--text: #0A0A0A        (чорний — основний текст)
--text-muted: #737373   (сірий — другорядний)
--border: #E5E5E5      (світло-сірий — границі карток)
```

**Правило:** ніколи не використовуй градієнти, ніколи не використовуй інші кольори. Тільки ці 8.

### Шрифт

- **Iceland** — основний (Google Fonts, безкоштовний дисплейний sans)
- Підключено в `globals.css` через `@import url("https://fonts.googleapis.com/css2?family=Iceland&display=swap")`
- В `tailwind.config.ts` `sans: ["Iceland", "Inter", ...]` — Iceland перший
- В `globals.css` `html, body { font-family: "Iceland", "Inter", ... }` — глобально
- Якщо хочеш ОКРЕМО sans — пиши `font-sans`. Для явного Iceland — `font-iceland`

### Типографіка (запам'ятай)

- `h1` — `text-5xl md:text-7xl font-iceland font-bold tracking-wide` (тільки hero)
- `h2` (секції) — `text-4xl md:text-5xl font-iceland font-bold tracking-wide`
- Body text — без font-класу (Iceland дефолт)
- Кнопки — `font-semibold` (Iceland semibold не існує, рендериться як regular bold)
- Ціни — `text-lg font-bold` або `text-3xl font-bold`

### Картка товару

Структура (НЕ міняй без потреби):
```
<div flex flex-col bg-white rounded-2xl>
  <Link> квадратне фото 1:1 (aspect-square bg-[#F5F5F5])
    <img object-cover group-hover:scale-105>
    {in_stock=false} overlay з "Немає в наявності"
  </Link>
  <div pt-3 flex flex-col gap-2>
    <h3 назва>
    <p смакові ноти>
    <p ціна (text-lg font-bold)>
    {in_stock} <WeightCarousel />  ← каруселька фасування
    {in_stock} <button У кошик bg-[#FACC15]>
  </div>
</div>
```

### Каруселька фасування (WeightCarousel)

- Кава: старт **100г**, крок **+100г** → 100 → 200 → 300 → ... → 3000г (max)
- Чай:  старт **50г**,  крок **+50г**  → 50  → 100 → 150 → ... → 3000г (max)
- Під вагою показує `+100г = X грн` (або `+50г = X грн`)
- Ціна = `Math.round((product.price * currentG) / baseG)` де baseG = 100 для кави, 50 для чаю

### Сторінки (один лендинг `/` + окремі `/about`, `/delivery`, `/contacts`, `/cart`, `/checkout`, `/checkout/success`, `/product/[id]`)

- `/` — головна, лендинг: Hero → Про нас → Наш асортимент (з фільтрами) → Переваги → Доставка/Оплата
- `/product/[id]` — SSG для кожного товару (9 штук)

### Кнопки — СТАНДАРТНІ класи

- CTA (жовтий): `bg-[#FACC15] hover:bg-[#EAB308] text-black font-semibold py-3 rounded-lg transition active:scale-[0.98]`
- Secondary (білий): `border border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#0A0A0A] font-medium py-2.5 rounded-lg`
- Icon (каруселька): `w-9 h-9 rounded-full border border-[#E5E5E5]`

**Чого НЕ робити:**
- ❌ Не додавай жовтий border/focus на не-CTA елементах (помилка з самовивозом — прибрали жовтий border)
- ❌ Не додавай іконки-емодзі в фільтри (Кава/Чай/Пуер — без ☕🍵🍂)
- ❌ Не додавай "Топ" бейджі (прибрали)
- � Не використовуй uppercase на навігації в Header (виглядало кричуще)
- ❌ Не використовуй градієнтний border/logo (прибрали)

---

## 3. Як додати новий товар

**Варіант А — є фото:**

1. Покласти фото в `public/images/` (назва: `category-name.jpg`, наприклад `coffee-montana-new.jpg`)
2. Додати об'єкт у `data/products.json`:

```json
{
  "id": "coffee-montana-new",
  "name": "Montana New Blend",
  "category": "coffee",  // або "tea"
  "price": 480,
  "image": "/images/coffee-montana-new.jpg",
  "description": "Короткий опис (1-2 речення).",
  "taste_notes": ["Нота1", "Нота2", "Нота3"],
  "origin": "Країна",
  "in_stock": true,
  "bestseller": false,  // не використовуємо, бейджі прибрали
  "options": {
    "weight": ["100г", "200г", "300г", "400г", "500г", "1000г"]  // для кави
    // або ["50г", "100г", "150г", "200г", "250г", "500г"] для чаю
  },
  "weight_prices": {
    "100г": 480,
    "200г": 900,
    "300г": 1280,
    "400г": 1640,
    "500г": 1980,
    "1000г": 3690
  }
}
```

3. Зберегти, рестартнути dev → товар з'явиться автоматично.

**Варіант Б — без фото:**

Використати SVG-плейсхолдер (подивись старі `coffee-X.svg` в git history — `git log --diff-filter=D --name-only`).

---

## 4. Самовивіз vs Нова пошта

### Логіка

`OrderForm.delivery` — enum:
- `"nova-poshta"` (default) → потребує `city` + `np_branch`
- `"pickup"` → `pickup_location` = `"Градизьк, вул. Молодіжна 5"` (hardcoded в API)

### API логіка

`/api/orders` валідує в залежності від delivery. Якщо pickup — city/np_branch ігноруються.

### Checkout UI

Дві radio-cardи:
- 📦 Нова пошта — поля міста і відділення
- 🏪 Самовивіз — інформаційний блок з адресою і графіком

**Важливо:** НЕ підсвічуй жовтим обрану опцію самовивозу (це дратує — раніше прибрали). Використовуй `border-[#0A0A0A]` для обраної і `border-[#E5E5E5]` для необраної.

### Telegram + Google Sheets

В payload додано `delivery` (текстом: "Нова пошта" / "Самовивіз") і `pickup_location`. В Telegram: 🏪 Самовивіз 📦 Нова пошта іконки.

### Головна сторінка

Секція "Доставка та оплата" — 3 картки (НП / Самовивіз / Оплата). Самовивіз — **нейтральна** (без жовтого border).

---

## 5. Інтеграції

### 5.1 Telegram Bot

**Як працює:**

Коли приходить нове замовлення → `/api/orders` викликає `sendTelegramNotification()` → POST на `https://api.telegram.org/bot<TOKEN>/sendMessage`.

**Формат повідомлення:**
```
🛒 *Нове замовлення 922571* (🏪 Самовивіз)

👤 Іван Петренко
📞 +380991234567
📧 ivan@example.com (якщо вказано)
📍 Градизьк, вул. Молодіжна 5 (або Місто, відділення НП)
💳 Оплата: накладений платіж

📦 *Товари:*
  • Montana Espresso Style (200г) × 1 = 900 грн

💰 *Сума: 900 грн*

💬 Коментар (якщо є)
```

**Як отримати токени:**

1. **TELEGRAM_BOT_TOKEN** — у Telegram знайти `@BotFather`, `/newbot`, дати ім'я + username → отримаєш токен `1234567890:ABCdef...`
2. **TELEGRAM_CHAT_ID** — створити групу, додати бота як учасника, написати в групі будь-яке повідомлення. Потім відкрити `https://api.telegram.org/bot<TOKEN>/getUpdates` — знайти `"chat":{"id":-1001234567890` (від'ємне число для групи).

**Куди вписати:** `D:/work_hermes/projects/Smart_Bar/.env.local`

```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHI...
TELEGRAM_CHAT_ID=-1001234567890
```

Після зміни `.env.local` — **рестарт dev** (`Ctrl+C` → `npm run dev`), без рестарту Next.js не побачить нових змінних.

### 5.2 Google Sheets

**Як працює:**

`/api/orders` → `sendToGoogleSheets()` → POST на `https://script.google.com/macros/s/<DEPLOY_ID>/exec` → Apps Script `doPost(e)` → записує рядок у Google Таблицю.

**Налаштування (одноразово):**

1. Створи Google Таблицю: https://sheets.google.com
2. **Розширення → Apps Script** (НЕ через script.google.com — буде прив'язано до таблиці)
3. Видали весь код, встав код з `docs/google-apps-script.gs` (там є коментарі)
4. **Ctrl+S** збережи
5. У випадному списку оберіть `setupSheet` → натисни **▶ Run**
6. Дай дозволи: **Review Permissions** → свій Google → **Advanced** → **Go to Smart Bar Orders (unsafe)** → **Allow**
7. **Manage deployments** → **New deployment** → шестерня ⚙ → **Web app**
   - **Execute as:** **Me**
   - **Who has access:** **Anyone** ← критично, інакше POST поверне 401!
8. **Deploy** → **ОДРАЗУ** скопіюй URL (показується один раз!)
9. URL виглядає як: `https://script.google.com/macros/s/AKfycbxxxxxx/exec`
10. Встав у `.env.local`:
    ```
    GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxxxxxx/exec
    ```

**Headers таблиці (12 колонок, перший рядок):**

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| order_id | created_at | name | phone | email | city | np_branch | comment | payment | items | total | status |

- `status` — dropdown зі списком: `new`, `shipped`, `delivered`, `cancelled` (без `processing` — прибрали як непотрібний)
- Кольорові фони по статусу через conditional formatting (в `setupSheet`):
  - `new` — світло-жовтий
  - `shipped` — зелений
  - `delivered` — темно-зелений
  - `cancelled` — червоний

**Якщо замовлення НЕ пишуться — діагностика:**

1. Перевір URL — відкрий у браузері, має показати текст "Smart Bar webhook is alive"
2. Якщо показує Google сторінку "не вдалося відкрити файл" → deployment мертвий, створи новий
3. Якщо повертає 401 — `Who has access` не `Anyone`
4. Якщо 200 але не пише — проблема в коді скрипта (дивись Executions в Apps Script)
5. У `notifications.ts` є детальне логування (`[gsheets] status: 200 | body: {...}`) — допоможе знайти проблему

### 5.3 Order ID

- Формат: **6 цифр** (наприклад `922571`), перша цифра ≠ 0
- Генерується в `notifications.ts:generateOrderId()`
- Причина: простіше продиктувати по телефону
- Якщо колись знадобиться абсолютна унікальність (>4000 замовлень/день) — замінити на `nanoid` або `crypto.randomUUID()`

---

## 6. Каталог товарів (поточний стан)

**9 товарів**, всі `in_stock: true`, `bestseller: false` (бейджі відключені):

### Кава (Montana, Бразилія)
| ID | Назва | Ціна за 100г |
|----|-------|--------------|
| `coffee-montana-espresso` | Montana Espresso Style | 480 грн |
| `coffee-montana-classic` | Montana Classic Blend | 420 грн |
| `coffee-montana-strong` | Montana Strong Roast | 460 грн |

Опції: 100г / 200г / 300г / 400г / 500г / 1000г (крок +100г)

### Чай (розсипний)
| ID | Назва | Ціна за 50г |
|----|-------|-------------|
| `tea-green` | Зелений чай Сенча (Японія) | 280 грн |
| `tea-black` | Чорний чай Асам (Індія) | 220 грн |
| `tea-oolong` | Улун Молочний (Тайвань) | 320 грн |

Опції: 50г / 100г / 150г / 200г / 250г / 500г (крок +50г)

### Пуер (пресований, Китай Юньнань)
| ID | Назва | Ціна за 50г |
|----|-------|-------------|
| `tea-puer-shu` | Пуер Шу (пресований) | 380 грн |
| `tea-puer-shen` | Пуер Шен (пресований) | 420 грн |
| `tea-puer-jasmine` | Пуер з жасмином | 460 грн |

Опції: ті ж 50г → 500г (крок +50г)

---

## 7. Кавовий фільтр на головній (3 chips)

`<button>` в `src/app/page.tsx`:
- **Усі** (default)
- **Кава** — `category === "coffee"`
- **Чай** — `category === "tea"`
- **Пуер** — `category === "tea"` AND `name.toLowerCase().includes("пуер")`

Логіка фільтрації в `useMemo` всередині компонента — переглядай там якщо треба додати нову категорію.

---

## 8. Git workflow

### Поточний стан
- Branch: `main`
- Remote: `https://github.com/kolyabyte99/smart-bar.git`
- Токени: зберігати локально, НЕ комітити

### Команди
```bash
git status                                    # що змінено
git add -A                                     # додати все
git commit -m "message"                        # локальний коміт
git push                                       # на GitHub
git log --oneline                              # історія комітів
```

### Як додати новий товар без коміта
Якщо хочеш додати товар локально без коміта — просто правиш `data/products.json` і рестартуєш dev. Потім `git add data/products.json && git commit -m "Add: новий товар"`.

---

## 9. Deploy на production (майбутнє)

Коли будемо купувати домен і запускати production:

1. **Vercel** (рекомендовано для Next.js):
   - Підключити GitHub repo → auto-deploy на кожен push в main
   - Додати env vars в Settings: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_APPS_SCRIPT_URL`
   - Custom domain: `smart-bar.com.ua` (або подібний)

2. **Альтернатива — власний хостинг:**
   - `npm run build` → `npm start`
   - Nginx reverse proxy + Let's Encrypt SSL
   - Process manager (PM2 / systemd)

3. **Перед production:**
   - Перевірити `.env.local` НЕ комітиться (✅ в `.gitignore`)
   - Додати analytics (GA4 / Plausible)
   - SEO: meta tags, OpenGraph, sitemap.xml, robots.txt
   - Додати реальний логотип (зараз — тимчасовий SVG)

---

## 10. Відомі проблеми / TODO

### Технічні
- ⚠️ `<img>` замість `<next/image>` — 5 попереджень ESLint (не блокують). Для SVG-плейсхолдерів не критично. Для JPG-фото товарів — виправити коли буде час (дасть кращу оптимізацію).
- ⚠️ Тимчасовий SVG-логотип (коло "SB" + Iceland "smart bar"). **Замінити на справжній PDF-логотип** (файл `logo_smartBar.pdf` — PDF з шифрованим текстом, не вдалося витягнути через pdfjs+canvas). Заміна: `public/images/logo.svg` → новий SVG або PNG.
- ⚠️ Order ID — 6 цифр, не абсолютно унікальні при >4000 замовлень/день. Поки що не проблема.

### Контент
- 📝 Відсутні: реальний логотип, реальні фони для hero/dilivery (є тільки 1 фото hero-latte-art.jpg)
- 📝 Тексти на сторінках — базові (потрібно переписати коли будуть реальні тексти від клієнта)
- 📝 Домен не куплений

### Дизайн
- 🎨 Картка товару — базова (працює, але можна додати badge "Новинка", "Акція", або ефекти)
- 🎨 Мобайл — працює, але не тестував детально (треба перевірити на різних viewport)

---

## 11. Деплой на production (TODO)

Коли все буде готово до production:

1. **Домен:** купити через Ukrainian registrar (наприклад `dreamhosting.ua`). Ціни: `.com.ua` ≈ 200 грн/рік, `.ua` ≈ 350 грн/рік. Рекомендую `smartbar.com.ua`.

2. **Хостинг:** Vercel (безкоштовно для Next.js, auto-deploy з GitHub). Налаштування:
   - Підключити GitHub repo
   - Додати env vars в Vercel Dashboard
   - Custom domain: додати DNS записи

3. **SSL:** автоматично від Let's Encrypt через Vercel.

4. **Backup:** Google Sheets автоматично зберігає всі замовлення — це і є наша база даних.

---

## 12. Корисні команди (cheat sheet)

```bash
# Dev
cd D:/work_hermes/projects/Smart_Bar
npm run dev                                      # запустити dev
npm run build                                    # production build
npm run lint                                     # ESLint перевірка

# Git
git status
git log --oneline -5
git add -A && git commit -m "msg"
git push

# Очистка
rm -rf .next && npm run dev                       # якщо webpack cache ENOENT помилки

# Коли порти зайняті
powershell -Command "Get-NetTCPConnection -LocalPort 3000,3001,3002 -State Listen | Select-Object -ExpandProperty OwningProcess | %{Stop-Process -Id $_ -Force}"

# Додати новий товар
# 1. Покласти фото в public/images/
# 2. Додати об'єкт в data/products.json
# 3. Restart dev

# Додати нову сторінку (наприклад /blog):
# 1. Створи src/app/blog/page.tsx
# 2. Next.js автоматично створить /blog маршрут
```

---

## 13. Контакти / контекст

- **Замовник:** Kolya (тобто я сам)
- **Кав'ярня:** Smart Bar, Градизьк, Кіровоградська область
- **Телефон:** +380 XX XXX XX XX (placeholder, замінити)
- **Email:** info@smartbar.ua (placeholder)
- **Instagram:** @smartbar (placeholder)
- **Telegram:** @smartbar (placeholder)

---

> **Останнє оновлення:** 2026-08-26 (після запушу на GitHub)
> **Версія коду:** commit `43b83e9`
