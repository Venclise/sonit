import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import { Product } from "../../../models/product";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { category, productId } = req.query;

    if (!category || !productId) {
      return res
        .status(400)
        .json({ error: "Missing params: category or productId" });
    }

    const cat = Array.isArray(category) ? category[0] : category;
    const pid = Array.isArray(productId) ? productId[0] : productId;

    const products = await Product.find({
      category: cat,
      _id: { $ne: pid }, // exclude current product
    })
      .limit(6)
      .sort({ sold: -1 }); // optional: show best ones first

    return res.status(200).json(products);
  } catch (error) {
    console.error("Related products error:", error);
    return res.status(500).json({ error: "Failed to fetch related products" });
  }
}
