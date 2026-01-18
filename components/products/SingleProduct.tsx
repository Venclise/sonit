"use client"

import Image from 'next/image'
import { Button } from '../ui/button'

import { toast } from 'sonner';

import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation';
import { clear } from 'console';
import { useCartStore } from '../cart/cartHook';
import Counter from '../cart/counter';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRef, useState } from 'react';




type Product = {
  _id: any,
  title: string,
  description: string,
  price: number,
  cutprice: number,
  image: string[] , 
  category: string,
}
export default  function SingleProduct({ product }: { product: Product }) {
      const addToCart = useCartStore(state => state.addToCart)
    const clearCart = useCartStore((s) => s.clearCart);
    const router = useRouter()
    const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
    const handleBuyNow = () => {
      clearCart(  )
         addToCart({
                               id: product._id,
                               title: product.title,
                               price: product.price,
                               img: product.image[0]
                        })

    

   
    router.push("/checkout");
    }



    
    return (
  <div className="w-full lg:mt-12 mt-24   h-max   flex items-center justify-between  flex-col lg:flex-row lg:p-10">
        


     {product.image && (
        <div className='w-full md:w-[50%] lg:w-[40%]  flex flex-col gap-1 '>

         <div className="w-full h-[25rem] lg:w-full lg:h-[30rem] relative  ">
          <Swiper
     className='w-full h-full  '
      modules={[Navigation,Pagination]}
      spaceBetween={5}
      slidesPerView={1}
     
       onSwiper={(swiper) =>{ (swiperRef.current = swiper) ;}}
          onSlideChange={(swiper) => {setActiveIndex(swiper.activeIndex);}}
          
    >
  
    
  
  {product.image.map((img, i) => (
    <SwiperSlide key={i} className="w-full h-full flex items-center justify-center">
  <img src={img} className="w-full h-full object-cover   max-w-full max-h-full" />
</SwiperSlide>

  ))}
  </Swiper>
          </div>

{product.image.length > 1 && (

    <div className='flex items-center  lg:justify-start justify-center w-full gap-4 p-10 lg:p-0'>
   {product.image.map((img, i) => (
       <div
    key={i}
    className="w-[6rem] h-[5rem] lg:w-[8rem] lg:h-[8rem] relative cursor-pointer overflow-hidden transition-all"
  >
    <Image
      src={img}
      onClick={() => {
        swiperRef.current?.slideTo(i)}}
      alt={`${product.title}-${i}`}
      fill
      className={`object-cover   ${activeIndex === i ? "ring ring-blue-300 opacity-100  scale-105" : "opacity-60 hover:opacity-100  "}` }
    />
  </div>
))}

</div>
)}

              </div>
        )}


        
<div className="flex items-center justify-center gap-4 flex-col flex-1 mt-8 p-5 md:p-20 lg:p-10">
    <div className='relative'>

<Badge variant="default" className='capitalize bg-gray-800 border'>{product.category}</Badge>
        <h2 className="text-5xl md:text-3xl lg:text-4xl text-center ">
          {product.title}
        </h2>
    </div>
    <div className='flex items-center gap-4 mt-8'>
        <p className="font-mono text-2xl">
          PKR.{product.price}
        </p>
        <p className="font-mono text-xl line-through text-neutral-500">
          PKR.{product.cutprice}
        </p>
    </div>

      


        <div className="flex flex-col items-center  gap-6 mt-6 w-full ">
        
        <Counter
  id={product._id}
  title={product.title}
  price={product.price}
  img={product.image[0]}
/>  
<div className='flex flex-col gap-4 w-full'>

          <Button
            variant="default" 
            className="px-9 py-5 w-full  text-white hover:bg-gray-900  cursor-pointer rounded-xs  bg-black "
            onClick={() => {addToCart({
              id: product._id,
              title: product.title,
              price: product.price,
              img: product.image[0]
            }), toast.success("Successfully added to cart") }}
            > 
            Add to cart
          </Button>
               <Button
             variant="outline"
                    className="px-9 py-5 w-full  text-black font-mono cursor-pointer rounded-xs "
            > 
            Ask a Question
          </Button>
            </div>
       <p className="text-gray-600 text-xs tracking-wide text-center ">
          {product.description}
        </p>
         

</div>

        </div> 

     
     
       
    </div>
  )
}
