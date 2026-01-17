import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Order } from "../../models/order";


export const dynamic = "force-dynamic"; 

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Type the context as having a Promise
) {
  try {
    await connectDB();
    const { id } = await context.params; // Await the params



    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch order" }, { status: 500 });
  }
}
