import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/api/lib/db";
import { Order } from "@/app/api/models/order";

export const dynamic = "force-dynamic"; 

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid order ID" },
        { status: 400 }
      );
    }

    const order = await Order.findById(params.id).lean();

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
