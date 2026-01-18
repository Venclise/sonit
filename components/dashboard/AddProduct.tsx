"use client"
import { Input } from '../ui/input'
import { Image, Trash } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { categories, SelectCat } from '@/lib/constants'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { Button } from '../ui/button'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper'
 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function AddProduct() {

    const [productInfo, setProductInfo] = useState<{
    title: string;
    price: string;
    description: string;
    category: string;
    cutprice: string
  }>({
    title: "",
    price: "",
    description: "",
    category: "",
    cutprice: ""
  });

    const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'


    

const [images, setImages] = useState<File[]>([])
const [previews, setPreviews] = useState<string[]>([])

  const [loading, setIsLoading] = useState(false);

 
const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productInfo.title || !productInfo.price || !productInfo.description || !productInfo.category || !productInfo.cutprice) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", productInfo.title);
    formData.append("price", productInfo.price);
    formData.append("cutprice", productInfo.cutprice);
    formData.append("description", productInfo.description);
    formData.append("category", productInfo.category);
images.forEach((img) => {
  formData.append("images", img)
})

    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Something went wrong");
        setIsLoading(false);
        return;
      }
      
      
      toast.success("Product has been added successfully!");
   

    
      setProductInfo({
        title: "",
        price: "",
        cutprice: "",
        description: "",
        category: "",
      });

      setPreviews([]); 
      router.refresh()
  
      const fileInput = document.getElementById("picture") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      toast.error("Failed to submit the product");
    } finally {
      setIsLoading(false);
      

    }
  };

  const removeImage = (index: number) => {
  setImages((prev) => prev.filter((_, i) => i !== index))
  setPreviews((prev) => prev.filter((_, i) => i !== index))


  setActiveIndex((prev) => {
    if (prev > index) return prev - 1
    if (prev === index) return Math.max(0, prev - 1)
    return prev
  })


  setTimeout(() => {
    swiperRef.current?.slideTo(Math.max(0, index - 1))
  }, 0)
}


    const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <div className='w-full h-max overflow-y-scroll flex flex-col gap-8'>
        <h2 className="text-black  text-xl text-left font-sem "> 
            Add a Product
         </h2>
<form className='flex flex-col lg:flex-row items-center justify-between p-5   lg:p-10 '   onSubmit={handleSubmit}>
  <div className='w-full h-[50vh] lg:w-[30%] lg:h-screen bg-gray-100   relative   '>

 
      
<div className="w-full h-full relative  "> 
     <Swiper
     className='w-full h-full  min-w-0'
      modules={[Navigation,Pagination]}
      spaceBetween={0}
      slidesPerView={1}
     
       onSwiper={(swiper) =>{ (swiperRef.current = swiper) ;}}
          onSlideChange={(swiper) => {setActiveIndex(swiper.activeIndex);}}
          
    >
  
    
  
  {previews.map((src, i) => (
    <SwiperSlide key={src} className="!w-full h-full flex items-center justify-center ">
  <img src={src} className="w-full h-full object-contain max-w-full max-h-full" />
</SwiperSlide>

  ))}
  </Swiper>
</div> 

<div className='flex items-center gap-4 mt-4'>


   {previews.map((src, i) => (
  <div
    key={src} 
onClick={() => {
  swiperRef.current?.slideTo(i)
}}
    className={`
      h-[5rem] w-[5rem] rounded-sm overflow-hidden cursor-pointer
      transition-all
      relative
      ${activeIndex === i ? "ring-2 ring-black scale-105" : "opacity-60 hover:opacity-100"}
    `}
  >
           <Button variant="ghost" className="cursor-pointer transition-all hover:bg-red-200 absolute top-0 right-0  text-red-500 hover:text-red-500 bg-transparent" onClick={(e) =>  {e.stopPropagation(); removeImage(i)}} >

  <Trash   className="text-red-500 w-5 h-5  "/> 
  
  </Button> 
    <img
      src={src}
      className="w-full h-full object-cover"
      alt=""
    />
  </div>
))}

  

    <label
    
    htmlFor="img-input" className='w-1/3 h-1/4 bg-gray-100  flex items-center justify-center gap-2 h-[5rem] w-[5rem]'> 
    <span className='font-bold text-4xl'>
      +
      </span> 
    </label>
    </div>

  </div>
 
   <Input
  className="hidden"
  id="img-input"
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    const files = Array.from(e.target.files || [])

      setImages((prev) => [...prev, ...files])
setPreviews((prev) => [
  ...prev,
  ...files.map(file => URL.createObjectURL(file))
])
  }}
/>

<div className='w-full lg:w-[60%] p-0 lg:p-5 flex flex-col gap-8 mt-28 lg:mt-0 ' >
  <div className='flex w-full items-center gap-2'>

  <label htmlFor="ProductName
  
  "    className='text-left'>
    <span className='text-sm'>
    Product name
    </span>
          <Input id="ProductName" placeholder='Enter the Product'
            value={productInfo.title}
          onChange={(e) =>
            setProductInfo({ ...productInfo, title: e.target.value })
          }
          required
          /> 
  </label>

    <label htmlFor="price
  "  className='text-left'>
      <span className='text-sm '>
    Price
    </span>
          <Input id="price" placeholder='Enter the Price' type='number'
             onChange={(e) =>
            setProductInfo({ ...productInfo, price: e.target.value })
          }
          required
          /> 

  </label>
      <label htmlFor="price
  "  className='text-left'>
      <span className='text-sm '>
  Cutted Price
    </span>
          <Input id="price" placeholder='Enter the cutted price' type='number'
             onChange={(e) =>
            setProductInfo({ ...productInfo, cutprice: e.target.value })
          }
          required
          /> 

  </label>
    </div>
          <label htmlFor="desc" className='text-left'>
             <span className='text-sm'>
       Description
    </span>
     <Textarea id="desc"
     placeholder='Enter description'
     name=""
       value={productInfo.description}
          onChange={(e) =>
            setProductInfo({ ...productInfo, description: e.target.value })
          }
          required
     />
            </label> 

<div className='flex flex-col gap-2'>
     <span className='text-sm text-left'>
       Category
    </span>

 <ToggleGroup type="single" className="w-full flex items-center flex-wrap gap-2  justify-center " aria-required variant="default">
       {SelectCat.map((cat) => (
         <ToggleGroupItem className="hover:rounded-full border  " key={cat} value={cat} onClick={(e) => setProductInfo({...productInfo,category:cat})}>
                   {cat.toUpperCase()}
                 </ToggleGroupItem>
               ))}  

</ToggleGroup>
               </div>

      <Button
        type="submit"
        className="mt-4 rounded-xs w-full mx-auto flex items-center gap-2"
        disabled={loading}
      >
        {loading && <Spinner className="mr-2" />}
        {loading ? "Please wait": "  Add "}
      
      </Button>
      </div>      
     
</form>
    </div>
  )
}
