import type { Order } from "@/types";

/**
 * Генерує короткий читабельний ID типу SB-20260824-A1B2C3
 * - Префікс SB (Smart Bar)
 * - Дата YYYYMMDD
 * - 6-char random base36 (A-Z + 0-9)
 * Унікальність достатня для тисяч замовлень на день.
 */
export function generateOrderId(): string {
  const now = new Date();
  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase().replace(/[^A-Z0-9]/g, "0");
  // pad якщо випало коротше 6
  const suffix = (random + "000000").slice(0, 6);
  return `SB-${date}-${suffix}`;
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

  const text =
    `🛒 *Нове замовлення ${order.id}*\n\n` +
    `👤 ${order.name}\n` +
    `📞 ${order.phone}\n` +
    (order.email ? `📧 ${order.email}\n` : "") +
    `📍 ${order.city}, відділення НП: ${order.np_branch}\n` +
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
    city: order.city,
    np_branch: order.np_branch,
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
