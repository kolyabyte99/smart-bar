import { NextResponse } from "next/server";
import type { Order } from "@/types";
import { sendTelegramNotification, sendToGoogleSheets } from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // базова валідація
    if (!body.name || !body.phone || !body.city || !body.np_branch) {
      return NextResponse.json(
        { error: "Заповніть обов'язкові поля" },
        { status: 400 },
      );
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Кошик порожній" }, { status: 400 });
    }

    const order: Order = {
      name: String(body.name).slice(0, 200),
      phone: String(body.phone).slice(0, 50),
      email: body.email ? String(body.email).slice(0, 200) : undefined,
      city: String(body.city).slice(0, 200),
      np_branch: String(body.np_branch).slice(0, 200),
      comment: body.comment ? String(body.comment).slice(0, 1000) : undefined,
      payment: "cod",
      items: body.items,
      total: Number(body.total) || 0,
      created_at: new Date().toISOString(),
      status: "new",
    };

    // паралельно: Telegram + Google Sheets
    const [tgOk, gsOk] = await Promise.all([
      sendTelegramNotification(order),
      sendToGoogleSheets(order),
    ]);

    return NextResponse.json({
      success: true,
      order_id: order.created_at,
      telegram_sent: tgOk,
      gsheets_sent: gsOk,
    });
  } catch (e) {
    console.error("[api/orders] error:", e);
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 },
    );
  }
}
