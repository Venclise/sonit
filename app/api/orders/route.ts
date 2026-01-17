import { NextResponse } from "next/server";
import { connectDB } from "../lib/db";
import { Order } from "../models/order";

export const dynamic = "force-dynamic"; // ensures no build-time execution

// POST new order
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { customer, items } = body;

    if (!customer || !items || !items.length) {
      return NextResponse.json(
        { message: "Missing customer or items" },
        { status: 400 }
      );
    }

    const mappedItems = items.map((item: any) => ({
      title: item.title,
      price: item.price,
      qty: item.qty,
      image: item.img,
    }));

    const total = mappedItems.reduce(
      (sum: number, item: any) => sum + item.price * item.qty,
      0
    );

    const order = await Order.create({
      customer: {
        name: customer.name,
        lastName: customer.lastName || "",
        phone: customer.phone,
        address: customer.address,
        otherInfo: customer.otherInfo || "",
      },
      items: mappedItems,
      total,
    });

    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}

// GET all orders
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      status: 1, // pending first
      createdAt: -1, // newest first
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch the orders" },
      { status: 500 }
    );
  }
}

// PATCH update order status to delivered
export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Order id is required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: "delivered" },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}
