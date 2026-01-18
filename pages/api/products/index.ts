import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/db";

import { uploadToCloudinary } from "../../../lib/cloudinary"; 
import { Product } from "../../../models/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();


    if (req.method === "GET") {
      const { category, search } = req.query;

      const query: any = {};
      if (category) query.category = Array.isArray(category) ? category[0] : category;
      if (search) query.title = { $regex: Array.isArray(search) ? search[0] : search, $options: "i" };

      const products = await Product.find(query);
      return res.status(200).json(products);
    }


    if (req.method === "POST") {
      const { title, description, price, cutprice, category, images } = req.body;

    
      if (
        !title ||
        !description ||
        isNaN(Number(price)) ||
        !category ||
        isNaN(Number(cutprice)) ||
        !images ||
        !Array.isArray(images) ||
        images.length === 0
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

   
      const imageUrls: string[] = [];
      for (const file of images) {
      
        const url = await uploadToCloudinary(Buffer.from(file, "base64"));
        imageUrls.push(url);
      }

      const product = await Product.create({
        title,
        description,
        price: Number(price),
        cutprice: Number(cutprice),
        category,
        image: imageUrls,
      });

      return res.status(201).json(product);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
