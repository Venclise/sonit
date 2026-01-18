"use client"
import {
Sheet,
  SheetClose,
SheetContent,
SheetDescription,
SheetHeader,
SheetTitle,
SheetTrigger,
} from "@/components/ui/sheet"
import { DialogTitle } from '@radix-ui/react-dialog'
import { categories, navItems } from '@/lib/constants'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useState } from "react"

export default function Sidebar() {

      const [findid, setfindID] = useState<string | null | any>(null)


          const existing = navItems.find((i) => i.id === findid);

         
   
  return (

    <div>
        <Sheet>
  <SheetTrigger>
       <div className='w-[1.5rem] h-[2rem] flex items-center flex-col gap-2'> 
            <span className='w-full h-[3px] bg-black pointer-events-none'></span>
            <span className='w-full h-[3px] bg-black pointer-events-none'></span>

       </div>
  </SheetTrigger>

<SheetContent>
    <DialogTitle>
        
    </DialogTitle>

     <div className='w-full h-screen p-10 items-center justify-center'>
        <div className='flex flex-col gap-5 w-max h-max'>
          
          {
            categories.map(({id,title}) => (
              <Link href={`/products?category=${title}`} key={id} 
              className='text-lg w-full  uppercase font-semibold text-neutral-700 hover:text-black transition-all'
              >
                <SheetClose className="cursor-pointer">

                  {title}
                </SheetClose>
                 </Link>
            ))
          }
         
        </div>
     </div>
</SheetContent>

{/*   
  <SheetContent className='bg-white overflow-y-scroll   '>
    <DialogTitle className='border-b p-7 border-gray-200 '>
          
    </DialogTitle>
    <div className='w-full h-screen p-10 items-center justify-center'>

   <div className='flex flex-col gap-5'>
        {
            navItems.map(({items,id,link}) => ( 
                <div className="flex items-center justify-between cursor-pointer" key={id}>

                <Link href="#" className='text-lg w-full uppercase font-semibold text-neutral-700 hover:text-black transition-all'>
                    {link}
                   </Link>
                   <Sheet > 
  <SheetTrigger >
    
                    <ChevronRight className='w-5 h-5' strokeWidth={1} onClick={() => setfindID(id) }/>
    
  </SheetTrigger>
  <SheetContent className="bg-white overflow-y-scroll p-5">
    <SheetTitle className=" px-5 py-7 border-b border-gray-300 text-center">
        <span className="text-2xl font-normal tracking-wider " >
          {existing?.link}
        </span>
    </SheetTitle>

  <div className="flex flex-col gap-3">
       {existing?.items?.map((item) => (
          <Link href="#" key={item} className="text-md p-2  tranistion-all w-full text-neutral-700 font-semibold hover:text-black uppercase " >
            <span>
              {item}
            </span>
            </Link>
       ))}
  </div>
  </SheetContent> */}
{/* </Sheet> */}
                {/* </div>
            ))
        }
   </div>
        </div> */}
  {/* </SheetContent> */}
</Sheet>
    </div> 
  )
}
