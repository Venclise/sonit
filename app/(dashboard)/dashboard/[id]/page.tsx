import EditForm from '@/components/dashboard/EditForm'


export default async function page( { params }: {params: { id: string }}) {
    const {id } = await params
      const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/'

    const res = await fetch(`${baseUrl}/api/products/${id}`,{cache:'no-store'})

    if(!res.ok) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <p className='text-sm'>Failed to load the page.Please try again later.</p>
        </div>
    }

    const product = await res.json()
    
return (
 <div className="h-max w-full items-center justify-center mt-24 p-5 md:p-10">
        <h2 className="font-semibold text-2xl text-gray-600">
           Edit 
           <span className="text-black ml-2">

           {product.title} 
           </span>
            </h2> 

            <div className="w-full lg:w-[50%] ">

            <EditForm product={product}/> 
            </div>
    </div>
  )
}
