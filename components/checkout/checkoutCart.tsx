"use client";

import Image from "next/image";

import { Button } from "../ui/button";
import { Minus } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { useCartStore } from "../cart/cartHook";

export default function CheckoutCart() {
  const router = useRouter()
  const cart = useCartStore((s) => s.cart);
  const removeItem = useCartStore((s) => s.removeFromCart);

  const [loading, setLoading] = useState(false);


  const [info, setInfo] = useState({
    name: "",
    lastName: "",
    number: "",
    address: "",
    otherInfo: "",
  });

  if (!cart.length) return (
    <div className="w-full h-screen flex items-center justify-center">

  <p className="text-center text-sm">Cart is empty</p>
    </div>
  )
  ;

  const customerData = {
    name: info.name + " " + info.lastName,
    phone: info.number,
    address: info.address,
    otherInfo: info.otherInfo,
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

 

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };


  const handleClick = async () => {
    setLoading(true)
   
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: customerData,
        items: cart,
      }),
    });

    const data = await res.json();
if (res.ok) {
  toast.success("Your order has been placed!");
  router.push(`/order-success?orderId=${data.order._id}`);
  localStorage.removeItem("cart");  
  setLoading(false)
  
} else {
  toast.error("Failed to place order: " + data.message);
  setLoading(false)
}

  };

  return (
    <div className="h-max   w-full mt-24 flex lg:flex-row flex-col  gap-2  p-2  md:p-5 lg:p-10 ">
      <div className="w-full lg:w-[40%] p-10 border  lg:h-max rounded-2xl bg-white shadow-xl shadow-gray-200">
        <h1 className="font-bold text-xl text-gray-800 tracking-tight">
          Shopping Cart
        </h1>

        <p className="text-sm mt-2 text-gray-700 ">
          You have {cart.length} {cart.length > 1 ? "items" : "item"} in your
          cart
        </p>

        <div className="mt-8 border-t pt-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[7fr_1fr_1fr] justify-between items-center py-4 relative"
            >
              <div className="flex items-center  gap-3">
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="secondary"
                  size="icon-sm"
                  className="text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer hover:text-red-600 absolute top-0 right-0 rounded-full "
                >
                  <Minus className="w-1 h-1" />
                </Button>

                <Image
                  src={item.img}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="bg-gray-50 p-1 rounded-md"
                />
                <div className="flex flex-col items-start justify-start">
                  <h2 className="font-semibold">{item.title}</h2>
                  <div className="text-sm text-gray-600">
                    <span className="mr-1">Quantity:</span>
                    {item.qty}
                  </div>
                </div>
              </div>

              <div className="text-right font-semibold text-black text-sm md:text-md">
                ${item.qty * item.price}
              </div>
            </div>
          ))}
        </div>

        <div className=" text-right w-full flex justify-between border-t pt-4">
          <div className="flex flex-col gap-4 items-start justify-start">
            <span className="font-medium ">Subtotal: </span>
            <span className="font-medium ">Shipping Cost: </span>

            <span className="font-medium ">Total payable:</span>
          </div>
          <div className="flex flex-col gap-4 items-end justify-end  ">
            <span className="font-semibold">${total}</span>
            <span className="font-semibold">$5</span>

            <span className="font-semibold ">${total + 5}</span>
          </div>
        </div>
        <div className="w-full mt-6">
          <Button className="w-full" onClick={handleClick} disabled={!info.address || !info.name || !info.number}>
            {loading ? <span className="flex items-center gap-2"><Spinner />Loading</span> : "Place order"}
            
          </Button>
        </div>
      </div>

      <div className=" h-max lg:h-max bg-white w-full lg:w-1/1 border border-gray-200 rounded-2xl p-5 md:p-10 lg:p-10  shadow-xl shadow-gray-200">
        <form
          className="border p-5 rounded-2xl w-full lg:w-1/1 "
          onSubmit={handleClick}
        >
          <h1 className="font-bold  text-xl">Personal Information</h1>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4     ">
            <div className="flex-1  flex flex-col gap-4">
              <label htmlFor="name" className="font-semibold text-sm">
                First Name
              </label>
              <Input
                placeholder="First name"
                id="name"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <label htmlFor="lastname" className="font-semibold text-sm">
                Last Name
                <span className="ml-1 text-gray-500">(optional)</span>
              </label>
              <Input
                placeholder="Last name"
                id="lastname"
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 w-1/1  ">
            <div className="flex-1  flex flex-col gap-4">
              <label htmlFor="number" className="font-semibold text-sm">
                Phone
              </label>

              <PhoneInput
                defaultCountry="PK"
                countries={["PK"]}
                value={info.number}
                onChange={(value) => setInfo({ ...info, number: value ?? "" })}
                className="w-full h-[2.5rem] border border-gray-300 rounded-md px-3 py-2 outline-0 placeholder:text-xs "
                placeholder="03123123123"
                 id="number" 
                 required
              />

       
            </div>
          </div>
          <div className="mt-8 flex lg:flex-row  gap-4 w-1/1 flex-col lg:items-center  ">
            <div className="flex-1  flex flex-col gap-4">
              <label htmlFor="address" className="font-semibold text-sm">
                Address
              </label>
              <Input
                placeholder="Your address"
                id="address"
                name="address"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <label htmlFor="otherInfo" className="font-semibold text-sm">
                Other info
                <span className="ml-1 text-gray-500">(optional)</span>
              </label>
              <Input
                placeholder="e.g: Flat no 1"
                name="otherInfo"
                id="otherInfo"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" w-full flex items-end justify-end">
    
          </div>
        </form>
      </div>
    </div>
  );
}
