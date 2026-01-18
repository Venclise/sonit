import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/product";
import cloudinary from "../../../lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

   const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const cutprice = Number(formData.get("cutprice"));
    const category = formData.get("category") as string;
    const files = formData.getAll("images").filter((f): f is File => f instanceof File);

    if (!title || !description || isNaN(price) || isNaN(cutprice) || !category || files.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "products" }, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }).end(buffer);
      });
      imageUrls.push(result.secure_url);
    }

    const product = await Product.create({ title, description, price, cutprice, category, image: imageUrls });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
