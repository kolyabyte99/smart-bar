import { NextResponse } from "next/server";
import type { Order, OrderForm } from "@/types";
import {
  generateOrderId,
  sendTelegramNotification,
  sendToGoogleSheets,
} from "@/lib/notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // базова валідація
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Заповніть ПІБ і телефон" },
        { status: 400 },
      );
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Кошик порожній" }, { status: 400 });
    }

    const delivery: OrderForm["delivery"] = body.delivery === "pickup" ? "pickup" : "nova-poshta";
    const pickup_location = delivery === "pickup" ? "Градизьк, вул. Молодіжна 5" : undefined;

    if (delivery === "nova-poshta" && (!body.city || !body.np_branch)) {
      return NextResponse.json(
        { error: "Вкажіть місто і відділення Нової пошти" },
        { status: 400 },
      );
    }
    if (delivery === "pickup" && !pickup_location) {
      return NextResponse.json({ error: "Помилка самовивозу" }, { status: 400 });
    }

    const order: Order = {
      id: generateOrderId(),
      name: String(body.name).slice(0, 200),
      phone: String(body.phone).slice(0, 50),
      email: body.email ? String(body.email).slice(0, 200) : undefined,
      city: body.city ? String(body.city).slice(0, 200) : undefined,
      np_branch: body.np_branch ? String(body.np_branch).slice(0, 200) : undefined,
      pickup_location,
      comment: body.comment ? String(body.comment).slice(0, 1000) : undefined,
      payment: "cod",
      delivery,
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
      order_id: order.id,
      created_at: order.created_at,
      delivery: order.delivery,
      pickup_location: order.pickup_location,
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
