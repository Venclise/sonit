import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/db";
import { Product } from "../models/product";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query; 


    if (req.method === "GET") {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(product);
    }

 
    if (req.method === "DELETE") {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res
        .status(200)
        .json({ message: "Product deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
