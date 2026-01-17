"use client";

import { Button } from "../ui/button";
import { useCartStore } from "./cartHook";


type CounterProps = {
  id: number;
  title?: string;
  price?: number;
  img?: string;
};

export default function Counter({
  id,
  title = "",
  price = 0,
  img = "",
}: CounterProps) {
  const item = useCartStore((state) =>
    state.cart.find((i) => i.id === id)
  );

  const addToCart = useCartStore((state) => state.addToCart);
  const updateQty = useCartStore((state) => state.updateQty)

  const qty = item?.qty ?? 1;

  const increment = () => {
    if (item) {
      updateQty(id, item.qty + 1);
    } else {
    
      addToCart({
        id,
        title,
        price,
        img,
      });
    }
  };

  const decrement = () => {
    if (!item) return;
    updateQty(id, Math.max(1, item.qty - 1));
  };

  return (
    <div className="flex items-center h-max w-max border border-gray-200 rounded-xs overflow-hidden">

      <Button
        variant="ghost"
        size="sm"

        className="rounded-none border-gray-100 text-xl"
        onClick={decrement}
        disabled={qty <= 1}
      >
        -
      </Button>
      <span className="font-mono w-[1.5rem] text-center text-sm">
        {qty}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none  text-sm"
        onClick={increment}
      >
        +
      </Button>

    </div>
  );
}
