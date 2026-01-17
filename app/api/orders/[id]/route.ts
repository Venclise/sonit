// @ts-nocheck
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Order } from "../../../models/order";

export const dynamic = "force-dynamic";

export async function GET(_req: any, context: any) {
  try {
    await connectDB();

    // Turbopack sometimes wraps params in a Promise
    const params = await context.params; 
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { message: "Order ID is required" },
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

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
