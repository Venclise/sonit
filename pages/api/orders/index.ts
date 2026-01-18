import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/db";
import { Order } from "../../../models/order";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    // ✅ CREATE ORDER
    if (req.method === "POST") {
      const { customer, items } = req.body;

      if (!customer || !items || !items.length) {
        return res
          .status(400)
          .json({ message: "Missing customer or items" });
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

      return res
        .status(201)
        .json({ message: "Order created successfully", order });
    }

    // ✅ GET ALL ORDERS
    if (req.method === "GET") {
      const orders = await Order.find().sort({
        status: 1,
        createdAt: -1,
      });

      return res.status(200).json(orders);
    }

    // ✅ UPDATE ORDER STATUS
    if (req.method === "PATCH") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Order id is required" });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status: "delivered" },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(updatedOrder);
    }

    // ❌ METHOD NOT ALLOWED
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Orders API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
