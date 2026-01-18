"use client"
import { categories } from '@/lib/constants'
import Image from 'next/image'

import { A11y  } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from "swiper";
import Link from 'next/link';





export default function category() {
 const swiperRef = useRef<SwiperType | null >(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='flex flex-col w-full h-max relative py-5'>
      
              <h2 className='font-semibold text-3xl md:text-4xl p-5'><span className='text-xl md:text-2xl font-normal'> Explore
                    </span> <br /> Categories</h2>
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
  className='w-full h-full'
>
  


         {categories.map(({id,title,img}) => (

             <SwiperSlide key={id} className='flex text-center items-center flex-col justify-center gap-8 overflow-hidden  cursor-pointer  transition-all   '>
<Link href={`/products?category=${title}`}>
                 <div className='w-[14rem] h-[18rem] md:w-[15rem] md:h-[25rem] relative hover:opacity-50 transition-all '>
                     <Image src={img} alt={title} fill className='w-full h-full object-cover'/>
                      </div>
                      <span className='text-lg   text-black '>
                         {title}
                      </span>
</Link>
                  </SwiperSlide>
         ))}
</Swiper>

      <div className="flex items-end justify-end gap-4 mt-12">
        
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="
            h-15 w-15 rounded-full
            border border-neutral-200
            bg-neutral-100
            flex items-center justify-center
            hover:bg-neutral-200
            transition-all
           
          "
        >
          <ChevronLeft size={20} className="text-neutral-800"/>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="
            h-15 w-15  rounded-full
            border border-neutral-200
            bg-neutral-100
            flex items-center justify-center
            hover:bg-neutral-200
            transition-all
            
          "
        >
          <ChevronRight size={20} className="text-neutral-800" />
        </button>
      </div>  
     </div>
        
  )
}

