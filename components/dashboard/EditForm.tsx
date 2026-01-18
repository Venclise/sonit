  "use client"

  import { useState } from "react"
  import { Input } from "../ui/input"
  import { Button } from "../ui/button"
  import { toast } from "sonner"
  import { useRouter } from "next/navigation"
  import { categories } from "@/lib/constants"
  import { Product } from "@/models/product"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
  import { Textarea } from "../ui/textarea"

  type Product = {
    _id: string
    title: string
    price: string
    description: string,
    category: string,
    cutprice:string,
  }

  export default function EditForm({ product }: { product: Product }) {
    const router = useRouter()

    const [form, setForm] = useState({
      title: product.title,
      price: product.price,
      cutprice: product.cutprice,
      description: product.description,
      category: product.category,
    })

  


     

        


    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

  



  const res = await fetch(`/api/products/${product._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: form.title,
      price: Number(form.price),
       cutprice: Number(form.cutprice),
      description: form.description,
      category: form.category,
    }),
  })


      if (!res.ok) {
        toast.error("Edit failed. Try again.")
        console.log("err ouccred")
        setLoading(false)
        return
      }
  const data = await res.json()
  console.log("UPDATED PRODUCT FROM SERVER:", data)

      toast.success("Product updated successfully")
      router.refresh()
      router.push("/dashboard")
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full  mt-12 "
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-start gap-1 flex-col">

          <label htmlFor="title" className="text-sm text-gray-700">
            Title
          </label>
          <Input
            name="title"
            id="title"
            placeholder="Product title"
            value={form.title}
            onChange={handleChange}
            />
            </div>

            <div className="flex items-start gap-1 flex-col">

          <label htmlFor="price" className="text-sm text-gray-700">
            Price
  </label>
          <Input
            name="price"
            id="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            />
            </div>

            
            <div className="flex items-start gap-1 flex-col">

          <label htmlFor="cutprice" className="text-sm text-gray-700">
            Cutted Price
  </label>
          <Input
            name="cutprice"
            id="cutprice"
            placeholder="Enter the Cutted Price"
            type="number"
            value={form.cutprice}
            onChange={handleChange}
            />
            </div>
          
        
        </div>

    <div className="flex items-start gap-1 flex-col">
        

        <label htmlFor="cat"  className="text-sm text-gray-700">Category</label>
        
      
      

        <Select   onValueChange={(e) => setForm({...form,category:e})} value={form.category}  >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.title} value={cat.title}>
              {cat.title.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
                      </div>

  <div className="flex items-start gap-1 flex-col">
  <label htmlFor="description" className="text-sm text-gray-700">
    Description
  </label>
        <Textarea
          name="description"
          id="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          />
          </div>

        

        <Button disabled={loading}>
          {loading ? "Updating..." : "Update product"}
        </Button>
      </form>
    )
  }
