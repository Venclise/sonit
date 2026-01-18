
import CategoryFilter from '@/components/products/CategoryFilter'
import ProductCard from '@/components/products/ProductCard'

    
export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string ,search?:string}
}) {

  const {category,search} = await searchParams
  const query = new URLSearchParams()

  if (category) query.set("category",category)
    if(search) query.set("search",search)


  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/'

const res = await fetch(
  `${baseUrl}/api/products?${query.toString()}`,
  { cache: "no-store" }
)

  if (!res.ok) {
    return (
      <div className="w-full h-screen flex items-center text-sm justify-center ">
           <p>An error occured. Please check your internet connection.  </p>
      </div>
    )
  }
  const data = await res.json()
       

    return (
        <div className='w-full h-max p-5 lg:p-10 mt-24 '>
          <div className='p-5'>
          <CategoryFilter />
          </div>


{
category && (

  <h2 className='font-bold py-10 text-2xl lg:text-4xl'>
  <span className='font-light'>
    Shop
     
  </span> {" "}
   {category}</h2>
)
}



          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 gap-y-30 md:gap-y-23 w-full py-10">
 
{data.map((data:any) => {

  return (
    <ProductCard data={data} key={data._id}/>
  )
})
}
  </div>
        </div>
    )
    }
