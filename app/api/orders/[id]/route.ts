// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Order } from "../../models/order";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Extract the ID directly from the URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/"); // ["", "api", "orders", "id_value"]
    const id = segments[segments.length - 1]; // get last segment

    if (!id) {
      return NextResponse.json(
        { message: "Order ID not provided" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
