
import { connectDB } from "../lib/db"
import { Product } from "../models/product"
import cloudinary from "../lib/cloudinary"

export async function GET(req: Request) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const search  = searchParams.get("search")

 const query:any = {}
 if (category) {
  query.category = category
 
}
if(search) {
  query.title = {$regex:search,$options: "i"}
}

  const products = await Product.find(query)

  return Response.json(products)
}


export async function POST(req: Request) {
  await connectDB()
try {

    const formData = await req.formData()
  
    
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = Number(formData.get("price"))
     const cutprice = Number(formData.get("cutprice"))
const files = formData.getAll("images").filter((f): f is File => f instanceof File)
    const category = formData.get("category") as string


   


 if (!title || !description || isNaN(price) || !category || isNaN(cutprice) || files.length === 0) {
    console.log("Validation failed:", { title, description, price, category, filesLength: files.length })
    return Response.json({ error: "Missing required fields" }, { status: 400 })
}

    
    const imageUrls: string[] = []
    
    for (const file of files) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const result: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                    if (error) reject(error)
                        resolve(result)
                }
            ).end(buffer)
        })
        
        imageUrls.push(result.secure_url)
    }

    console.log("CUT PRICE:", cutprice)

    
    const product = await Product.create({
        title,
        description,
        cutprice,
        price,
        image: imageUrls,
        category,
    })
    return Response.json(product, { status: 201 })
}
    catch (error) {
    console.error("POST /api/products error:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }


    
}
