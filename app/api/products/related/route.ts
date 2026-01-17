import { connectDB } from "@/app/api/lib/db"
import { Product } from "@/app/api/models/product"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"; 
export async function GET(req: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const productId = searchParams.get("productId")

  if (!category || !productId) {
    return Response.json({ error: "Missing params" }, { status: 400 })
  }

  const products = await Product.find({
    category,
    _id: { $ne: productId }, // exclude current product
  })
    .limit(6)
    .sort({ sold: -1 }) // optional: show best ones first

  return Response.json(products)
}
