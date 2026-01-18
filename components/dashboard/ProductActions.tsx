"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { EllipsisVertical, ExternalLink, SquarePen, Trash } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ProductActions({ id }: { id: string }) {

    const router = useRouter()
   

    

  const handleDelete = async () => {
   
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      toast.error("Failed to delete product")
      return
    }

    toast.success("Product deleted")
    
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute right-2 top-2 cursor-pointer opacity-100">
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        
          <DropdownMenuItem className="cursor-pointer" onClick={(e) =>{  router.push(`/products/${id}`);
          e.stopPropagation()
  }}>
            <ExternalLink  className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={(e) =>{  router.push(`/dashboard/${id}`);
          e.stopPropagation()
  }}>

          <SquarePen className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>


        <AlertDialog>
          <AlertDialogTrigger className="w-full p-2 hover:bg-red-100 text-red-400 flex items-center text-sm rounded-sm mt-1 cursor-pointer">
            
              <Trash className="mr-2 h-4 w-4" />
              Delete
            
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-400"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
