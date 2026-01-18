import Image from 'next/image'
import React from 'react'
import { Button } from '../components/ui/button'
import Link from 'next/link'



export default function Hero() {


  return (
<div className='h-[70vh] mt-12 md:mt-0 md:h-screen w-full relative'>
        <Image src="/hero.webp" alt="Image" className='w-full h-full object-cover' fill/>
        <div className='opacity-100 absolute bottom-3 left-3 flex items-center justify-center w-full h-full lg:h-max flex-col gap-4 p-5'>
              <h1 className='text-6xl md:text-8xl text-center'>Your Getaway
                </h1>
                <span className='text-md md:text-lg ml-5'>
                    
Luxurious sanitaries redefined
                </span>
                <Button className='rounded-xs '>
                      <Link href="/products"  >
                      View all Products
                      </Link>
                </Button>
        </div>
    </div>
  )
}
