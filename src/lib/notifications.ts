import type { Order } from "@/types";

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
    `🛒 *Нове замовлення #${order.created_at}*\n\n` +
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

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("[gsheets] failed:", e);
    return false;
  }
}
