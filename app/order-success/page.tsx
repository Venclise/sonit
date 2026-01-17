import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<p className="mt-24 text-center">Loading order...</p>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
