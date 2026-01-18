"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "./cartHook";
import Counter from "./counter";





export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart)

   const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,   0)

  

   
  return (
    <div>
      <Sheet >
        <SheetTrigger  className="relative bg-transparent hover:bg-gray-100 h-10 w-10 flex items-center justify-center rounded-lg text-sm cursor-pointer  ">
          { cart.length ? (
                  <div className="absolute top-0 right-0 text-white bg-black w-5 h-5 font-mono rounded-full  ">
                     {cart.length } 
                 </div>
          ) : ("")
          }
          

          <ShoppingCart  className="w-4 h-4 lg:w-5 lg:h-5 " strokeWidth={1.5} />
          
        </SheetTrigger>
        <SheetContent className="z-[100] overflow-y-scroll overflow-x-hidden ">
          <SheetHeader>
            <SheetTitle className="text-4xl tracking-wider">
              Cart
            </SheetTitle>

            { 
              cart.length < 1 &&
            <div className="h-screen w-full flex items-center justify-center">
              <p className="font-normal text-sm text-neutral-600 ">Cart is empty..</p>
              </div>
            }
              
              {cart.length&&cart?.map(({ title, img, id, price,qty }) => {
                return (
                <div className="mt-12 relative " key={id}>
              <Button
                           onClick={() => {removeItem(id); localStorage.removeItem("cart")}}
                           variant="secondary"

                            
                           className=" w-5 h-5 text-red-500 hover:bg-red-100 bg-red-100 cursor-pointer hover:text-red-600 absolute top-0 right-0 rounded-full "
                         >
                           <Minus className="w-1 h-1" />
                         </Button> 
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="p-3 rounded-md relative h-[3rem] w-[3rem]">
                        <Image src={img} alt={title} fill className="w-full h-full object-cover "  />
                      </div>
                      <div>

            <h2 className="font-semibold line-clamp-1">{title}</h2>
                      <span className="font-bold text-sm text-neutral-800  ">
                        ${price * qty}
                      </span>
                      </div>
                      
                    </div>
                    <div className="flex mt-8">
                    
                 
  <Counter
    key={id}
    id={id}
    title={title}
    price={price}
    img={img}
  />


                    </div>
                  </div>
                </div>
              );
            })}
           
            </SheetHeader>
            <SheetFooter className="w-full flex flex-col ">

{cart?.length && (
  <>
    <span className=" p-5 mb-5 w-full flex items-center justify-between font-semibold">Total:
      <span className="font-bold text-xl">

      PKR.{total} 
      </span>
      </span>

<Link href="/checkout">
<SheetClose className="w-full">
<Button className=" w-full rounded-xs">
      Checkout
</Button>
</SheetClose>
</Link>
  </>
)}
</SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
