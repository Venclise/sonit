import AddProduct from "@/components/dashboard/AddProduct"
import ActiveOrders from "@/app/(dashboard)/dashboard/orders/ActiveOrders"
import ProductCard from "@/components/products/ProductCard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"
import Link from "next/link"




    export default async function page() {
    
        const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/'

    const res = await fetch(
    `${baseUrl}/api/products`,
    { cache: "no-store" }
    )

    if (!res.ok) {
        console.error("Failed to fetch products:", res.status, res.statusText)

        return (
        <div className="w-full h-screen flex items-center text-sm justify-center ">
            <p>An error occured. Please check your internet connection.  </p>
        </div>
        )
    }
    const data = await res.json()


  return (
    <div className='mt-24 p-5 lg:p-10 w-full h-max'>
      <h2 className="text-black font-semibold text-2xl lg:text-4xl"> 
            Dashboard
         </h2>

         <div className='p-10 lg:p-15'>
          <div className="w-full flex items-center justify-between">

            <span className='text-lg lg:text-xl flex items-center gap-2 animate-pulse text-green-500'>
                <div className='w-[10px] h-[10px] bg-green-500 rounded-full ' > </div>
              active orders
            </span> 
            <Link href="/dashboard/orders" className="flex items-center">
            <span className="flex items-center text-md underline">View all ordes <ChevronRight /></span>
              </Link>
          </div>

    <ActiveOrders />

         </div>
              
         <div>
            


<Dialog >
  <DialogTrigger className='h-[10rem] w-[10rem]  bg-gray-100 hover:bg-gray-50 cursor-pointer border border-gray-200 transition-all flex items-center justify-center'>
     <span className='font-bold text-4xl'>
+
</span>
  </DialogTrigger>
  <DialogContent className="bg-white h-screen " >
    <DialogHeader className="w-full">
      <div className="w-full">
            <AddProduct />
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-20 mt-12 py-10">


{data.map((data:any) => {
  
  return (
    <ProductCard data={data} key={data._id}/>
  )
})
}
</div>
         </div>
    </div>
  )
}
