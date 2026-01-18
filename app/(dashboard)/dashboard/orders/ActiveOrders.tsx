"use client"
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Check } from "lucide-react";


export default function ActiveOrders() {

    const [orders, setOrders] = useState<any[]>([]);
    const [loading,setLoading] = useState(false)


    
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", {
          cache: "no-store",
        });
        const data = await res.json();
        setOrders(data);
    



      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

    const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  );


  return (
    <div className="flex items-center gap-4 overflow-x-scroll mt-5">
      
       {pendingOrders.map((item) => {
         return <div className=" w-[25rem] relative p-5 border" key={item._id}>
                      <Button
  onClick={async () => {
      await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item._id }),
    });
    
    setOrders((prev) =>
        prev.map((o) =>
            o._id === item._id
    ? { ...o, status: "delivered" }
    : o
)
);
}}
 className=" h-10 w-10 absolute top-3 right-3 rounded-full bg-green-700 hover:bg-green-700 text-white flex items-center justify-center cursor-pointer"
>
  

  <Check size={18} />
  
</Button>
          <div className="flex  justify-around mt-5">

         <div className="flex flex-col">
          <span  className="text-sm">Order id:</span>
              <span className="text-sm">Name:</span>
              <span className="text-sm">Phone:</span>
              <span className="text-sm">Address:</span>
         </div>

             <div className="flex flex-col">
              <span className="text-sm">

{item._id}
</span>
<span className="text-sm">

{item.customer.name}
</span>
<span className="text-sm">

{item.customer.phone}
</span>
<span className="text-sm">

{item.customer.address}
</span>
         </div>
          </div>
          <div className="p-5">
         <span className="font-semibold">Items</span>
         {item.items.map((orderItem:any) => (
          <div className="flex  flex-col">

<span className="font-bold text-sm">

            {orderItem.title} x {orderItem.qty}
</span>
<span className="text-sm">
   Total:
</span>
</div>
            
         ))}
<span className="p-5 font-bold text-sm" >{item.total}</span>
          </ div>
            </div>
       })}

    </div>
  )
}
