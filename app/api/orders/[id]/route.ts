import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Order } from "../../models/order";

export const dynamic = "force-dynamic";

// Note: GET signature is fixed with proper typing
export async function GET(
  _req: Request,
  { params }: { params: { id: string } } // ✅ correct typing
) {
  try {
    await connectDB();

    const { id } = params; // no await needed

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
