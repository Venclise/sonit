
import RecommendProducts from '@/components/products/RecommendProducts'
import SingleProduct from '@/components/products/SingleProduct'



  
export default async function page({
    params,
}: {
  params: { id: string }
}) {
  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/'

  const {id} = await params
   
  const res = await fetch (  `${baseUrl}/api/products/${id}`,{cache:'no-store'})

    if (!res.ok) {
    throw new Error("Failed to fetch product")
  }

  const product = await res.json()

  
      const RecommendRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/related?category=${product.category}&productId=${product._id}`,{cache:'no-store'})

    if (!RecommendRes.ok) {
    return (
      <div className="w-full h-screen flex items-center text-sm justify-center ">
           <p>An error occured. Please check your internet connection.  </p>
      </div>
    )
  }

  const data = await RecommendRes.json()
  
  

  return (
    <div>
      <SingleProduct product={product}/>
      {
data.length &&
        <RecommendProducts data={data}/>
      }
    
    </div>
  )
}

