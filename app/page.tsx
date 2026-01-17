import Hero from '@/sections/Hero'
import Category from '@/sections/category'


export default function page() {
  return (
    <div className='w-full h-max  '>
      <Hero />
     <div className='mt-12 p-2 lg:p-5'>
      <Category />
     </div>
    </div>
  )
}
