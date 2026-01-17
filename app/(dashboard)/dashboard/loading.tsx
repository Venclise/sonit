import { Spinner } from "@/components/ui/spinner"

export default function loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
        <p className="text-sm flex items-center justify-center">
         <Spinner />
         Please wait 
        </p>
    </div>
  )
}
