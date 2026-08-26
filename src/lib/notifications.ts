import type { Order } from "@/types";

/**
 * Генерує короткий 6-цифровий ID типу 847291.
 * Унікальність: при рівномірному розподілі — близько 50% колізій
 * після 4000+ замовлень на день, але для малого/середнього
 * магазину цього достатньо. Якщо потрібна абсолютна
 * гарантія — додай nanoid або crypto.randomUUID().
 */
export function generateOrderId(): string {
  // 6 цифр, перша != 0 щоб не було ID типу 012345
  let id = "";
  id += Math.floor(Math.random() * 9) + 1; // 1-9
  for (let i = 0; i < 5; i++) {
    id += Math.floor(Math.random() * 10); // 0-9
  }
  return id;
}

export async function sendTelegramNotification(order: Order): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping");
    return false;
  }

  const itemsList = order.items
    .map((i) => `  • ${i.name} (${i.weight}) × ${i.quantity} = ${i.price * i.quantity} грн`)
    .join("\n");

  const delivery = order.delivery === "pickup" ? "🏪 Самовивіз" : "📦 Нова пошта";
  const deliveryDetails =
    order.delivery === "pickup"
      ? `📍 ${order.pickup_location}`
      : `� ${order.city}, відділення НП: ${order.np_branch}`;

  const text =
    `🛒 *Нове замовлення ${order.id}* (${delivery})\n\n` +
    `👤 ${order.name}\n` +
    `📞 ${order.phone}\n` +
    (order.email ? `📧 ${order.email}\n` : "") +
    `${deliveryDetails}\n` +
    `💳 Оплата: накладений платіж\n\n` +
    `📦 *Товари:*\n${itemsList}\n\n` +
    `💰 *Сума: ${order.total} грн*\n` +
    (order.comment ? `\n💬 Коментар: ${order.comment}` : "");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("[telegram] failed:", e);
    return false;
  }
}

export async function sendToGoogleSheets(order: Order): Promise<boolean> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!url) {
    console.warn("[gsheets] GOOGLE_APPS_SCRIPT_URL not set, skipping");
    return false;
  }

  const payload = {
    order_id: order.id,
    created_at: order.created_at,
    name: order.name,
    phone: order.phone,
    email: order.email || "",
    city: order.city || "",
    np_branch: order.np_branch || "",
    pickup_location: order.pickup_location || "",
    delivery: order.delivery === "pickup" ? "Самовивіз" : "Нова пошта",
    comment: order.comment || "",
    payment: "Накладений платіж",
    items: order.items
      .map((i) => `${i.name} (${i.weight}) × ${i.quantity}`)
      .join("; "),
    total: order.total,
    status: order.status,
  };

  console.log(`[gsheets] POST -> ${url.slice(0, 80)}...`);
  console.log(`[gsheets] payload:`, JSON.stringify(payload));

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    console.log(`[gsheets] status: ${res.status} | body: ${text.slice(0, 200)}`);
    return res.ok;
  } catch (e) {
    console.error(`[gsheets] fetch error:`, e);
    return false;
  }
}
