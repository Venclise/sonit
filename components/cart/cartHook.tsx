import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  img: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQty: (id:number,qty:number) => void
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }

          return {
            cart: [...state.cart, { ...item, qty: 1 }],
          };
        }),

   updateQty: (id, qty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
    }
  )
);
    