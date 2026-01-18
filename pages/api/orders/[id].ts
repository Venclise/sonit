import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/db";
import { Order } from "../models/order";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch order" });
  }
}
