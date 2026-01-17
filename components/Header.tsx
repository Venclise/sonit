
import Link from 'next/link'
import Sidebar from './Sidebar'
import { Search, ShoppingCart } from 'lucide-react'
import SearchInput from './SearchInput'
import { Button } from './ui/button'
import Cart from './cart/cart'


export default function Header() {
  return (
    <div className='w-full h-[3rem] z-10  flex items-center justify-between p-10 fixed top-0 left-0 bg-white '>
         <Link href="/" className='font-semibold text-2xl '> 
         Sonit.
          </Link> 

          <div className='flex items-center gap-2 justify-center '>
           

            <SearchInput />
            
          <Cart />
             <Sidebar />
          </div>
    </div>
  )
}
