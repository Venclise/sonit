"use client"


import React, { useRef, useState } from 'react'
import ProductCard from './ProductCard'


import { A11y  } from 'swiper/modules';
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';


export type Product = {
  _id: string
  title: string
  description: string
  price: number
  cutprice: number
  image: string[]
  category: string
}


export default  function RecommendProducts({data}:{data:[]}) {
       
 const swiperRef = useRef<SwiperType | null >(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='h-max'>
      {
data.length &&
        <h2 className='font-semibold text-xl px-5 mt-10 '>You might like:</h2>
      }
      <div className='flex items-center  w-full p-2 md:p-5 lg:p-10 gap-4 mt-12 lg:mt-0 relative'>
<Swiper
 
          modules={[A11y]}

  spaceBetween={20}
  slidesPerView={5}
  navigation
  breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
  className='w-full h-[30rem]'
>
  

{data.map((product: Product) => (
  <SwiperSlide className="w-[40rem]" key={product._id}>
    <ProductCard data={product} />
  </SwiperSlide>
))}

</Swiper>
      

  </div>
  {data.length > 1 &&

    <div className='w-full  flex items-end justify-end gap-4 p-5'>
  <Button className='opacity-100 rounded-full p-5 ' variant="secondary" onClick={ () =>  swiperRef?.current?.slidePrev()}>
        <ChevronLeft />
  </Button>
  <Button className='opacity-100 rounded-full p-5 ' variant="secondary" onClick={() => swiperRef?.current?.slideNext() }>

        <ChevronRight />
  </Button>
</ div>
}
    </div>
  )
}
