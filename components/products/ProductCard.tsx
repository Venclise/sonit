"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { usePathname } from "next/navigation"
import ProductActions from "../dashboard/ProductActions"

type ProductData = {
  _id: string
  title: string
  price: number
  cutprice: number
  description: string
  category: string
  image: string[]
}

export default function ProductCard({ data }: { data: ProductData }) {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  return (
    <Link
      href={`${isDashboard ? "#" : `/products/${data._id}`}`}
      className="h-[20rem] md:h-[25rem]  group block relative"
    >
      <div className="h-[90%] w-full relative overflow-hidden">
      
        <Image
          src={data.image[0]}
          alt={data.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            !isDashboard && data.image.length > 1
              ? "group-hover:opacity-0"
              : ""
          }`}
        />

      
        {!isDashboard && data.image.length > 1 && (
          <Image
            src={data.image[1]}
            alt={data.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        
        {!isDashboard && (
          <Badge className="absolute text-xs top-3 left-3 rounded-xs bg-neutral-100 text-black uppercase">
            Save {data.cutprice - data.price}
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 px-5 mt-4">
        {
          isDashboard && (
            <ProductActions id={data._id}/>
          )
        }
        <h2 className="text-xl md:text-2xl  text-center line-clamp-2">{data.title}</h2>


        <div className="flex items-center gap-2">
          <p className="text-xs lg:text-sm flex items-center gap-1">
            {data.price}
            <span className="font-semibold text-sm">PKR</span>
          </p>

          <div className="flex items-center gap-1">
            <p className="text-xs lg:text-sm line-through text-neutral-700">
              {data.cutprice}
            </p>
            <span className="font-semibold text-xs lg:text-sm">PKR</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
