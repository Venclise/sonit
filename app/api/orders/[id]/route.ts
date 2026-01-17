import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Order } from "../../models/order";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: any) {
  try {
    await connectDB();

    const id = params.id;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
