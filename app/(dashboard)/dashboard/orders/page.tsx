import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';

export default async function  page() {

  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/'
       
        const res = await fetch( `${baseUrl}/api/orders`,
    { cache: "no-store" }
    )

        const data = await res.json();
       
     
     
    
        const deliveredOrders = data.filter(
    (order:any) => order.status === "delivered"
        )



  return (
    <div className='p-10 h-max w-full mt-24'>
        <h1 className='font-semibold text-3xl lg:text-4xl p-5'>Orders Histroy</h1>
               

          <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Name</TableHead>
      <TableHead>Number</TableHead>
      <TableHead>Order id</TableHead>
      <TableHead className="text-right">Total</TableHead> 
    </TableRow>
  </TableHeader>

  <TableBody>

          {deliveredOrders.map((order:any) => (
             

                    <TableRow 
                    
              key={order._id}
                     >
      <TableCell className="font-medium">{order.customer?.name}</TableCell>
      <TableCell>{order.customer?.phone}</TableCell>
      <TableCell>{order._id}</TableCell>
      <TableCell className="text-right">${order.total}</TableCell>
    </TableRow>
            
           
          ))}
            
          </TableBody>
          </Table>
          
            
    </div>
  )
}
