import { categories } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import { Globe, Instagram, Mail, MapPin, Phone, } from 'lucide-react'

export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <div className=' h-max  w-full bg-gray-50 border-t p-5 lg:p-10'>
            <Link href="/" className='font-semibold text-2xl '> 
         Sonit.
          </Link> 
<div className='flex  flex-wrap items-center justify-center lg:justify-start lg:flex-row gap-8'>

        

   <div className='flex flex-col gap-2'>
              <span className='font-semibold text-gray-800'>Shop by Categories</span>
              
              {
categories.map(({id,title}) => (

    
    <Link key={id} href={`/products?category=${title}`} className='text-sm underline'>
{title}
</Link>
                ))
}

          </div>

          
          <div className='flex flex-col gap-2'>
              <span className='font-semibold text-gray-800'>Support Center</span>
            
<a href="tel:+92123123123" className='text-sm underline'>
Call us 
</a>
<Link href="#" className='text-sm underline'>
Customer Support
</Link>
<Link href="#" className='text-sm underline'>
Email us
</Link>


          </div>
          <div className='flex flex-col gap-1'>
              <span className='font-semibold text-gray-800'>Ways to connect</span>

            <a href="tel:+92123123123" className='flex items-center gap-4 underline text-sm'>
            <Phone className='w-3 h-3' />
                <span>+92123123123</span>
            </a>
            <a href="mailto:"></a>

 <a href="mailto:zunnurainzahoor955@gmail.com" className='flex items-center gap-4 text-sm underline'>
            <Mail className='w-3 h-3' />
                <span>zunnurain</span>
            </a>

             <a href="#" className='flex items-center gap-4 text-sm underline'>
            <MapPin className='w-3 h-3' />
                <span>Shop no 1 Street no 1 City </span>
            </a>
          </div>
          <div className='ml-24 '>
            <h2 className='text-lg font-semibold mb-4 ml-2'>Subscribe to Sonit's News letter.</h2>
             <Input placeholder='Subscirbe to NewsLetter.' className='mb-4'/>
             <input type="checkbox" id='check' />
             <label htmlFor="check" className='text-sm ml-2'>Subscirbe to news Letter</label>
          </div>

</div>


<div className='w-full p-5  flex items-center justify-center border-y mt-12  flex-col'>
    <p className='text-xs md:text-sm   justify-center w-full gap-2 flex flex-col mt-12 items-center '>
Made with ❤️ by 
{" "}

Zunnurain

<strong>  
 <Link className='flex items-center gap-1 underline' href="https://zunnurain.vercel.app/">
<Globe   className='w-3 h-3'/> Visit my site
  </Link>
</strong >
or 
<strong  >

<Link className="flex underline items-center gap-2" href="https://www.instagram.com/zunnurain_za/">
 <Instagram className='w-3 h-3 '/>
 Visit my Instagram
 </Link>
</strong>
</p> 
    </div>

    </div>
  )
}
