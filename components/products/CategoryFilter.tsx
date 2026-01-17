"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { PageCat } from "@/lib/constants"

 import { A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { useRef } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") ?? "all"

  const swiperRef = useRef<SwiperType | null>(null)

  const handleChange = (value: string) => {
    if (value === "all") {
      router.push("/products")
    } else {
      router.push(`/products?category=${value}`)
    }
  }

  return (
    <div className="w-full flex items-center p-1 lg:p-5 gap-4">
         <Button className=' rounded-full p-5 border w-max  ' variant="secondary" onClick={ () =>  swiperRef?.current?.slidePrev()}>
        <ChevronLeft />
  </Button> 
      <Swiper
        modules={[ A11y]}  
        spaceBetween={12}
        slidesPerView="auto"
        
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full"
      >
        {PageCat.map((cat) => {
          const isActive = activeCategory === cat

          return (
            <SwiperSlide
              key={cat}
              className="!w-auto"
            >
              <button
                onClick={() => handleChange(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm 
                  transition-all
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {cat.toUpperCase()}
              </button>
            </SwiperSlide>
          )
        })}
      </Swiper>
       <Button className='opacity-100 rounded-full p-5 border ' variant="secondary" onClick={() => swiperRef?.current?.slideNext() }>

        <ChevronRight />
  </Button>
    </div>
  )
}
