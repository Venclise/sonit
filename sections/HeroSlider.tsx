"use client"
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';


const SliderContent = [
  {
    id: 1,
    img: "/mirror-banner.jpg",
    title: "Mirrors",
    linkTitle: "Explore mirrors"
    
  },
   {
    id: 2,
    img: "/img-2.webp",
       title: "Geysers",
    linkTitle: "Explore geysers"
  },
   {
    id: 3,
    img: "/img-3.webp",
       title: "Taps & Faucets",
    linkTitle: "Explore Taps"
  },
]

const  HeroSlider = () => {
  return (
    <div className='w-full h-[50vh] md:h-[70vh] lg:h-[80vh] md:px-10'>

  <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      
      >
        {
          SliderContent.map(({id,img,title,linkTitle}) => (
      <SwiperSlide className='w-full relative h-full ' key={id}>
        <div className='w-full h-[90%] '>
        <Image src={img} alt="Sanitary Ware" fill className='w-full h-full object-fill  ' />
        </div>
          <div className='z-100  gap-4 w-max absolute bottom-[20] right-[10px] flex items-center flex-col justify-center '>
               <Button className='text-white  backdrop-blur-sm rounded-xs   cursor-pointer hover:backdrop-blur-sm' variant="default">
                  {linkTitle}
                  <ChevronRight />
               </Button>
                {/* <p className='text-gray-200 underline'>{linkTitle}</p> */}
          </div>
      </SwiperSlide>

          ))
        }
     
 
  
    </Swiper>
        </div>
  );
};

export default HeroSlider;