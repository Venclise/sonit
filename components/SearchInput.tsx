"use client"
import { useEffect, useState } from "react"

import { Search, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Spinner } from "./ui/spinner"

export default function LiveSearch() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [open,setIsOpen] = useState(false)

  useEffect(() => {
    if (search.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      const res = await fetch(`/api/products?search=${search}`)
      const data = await res.json()
      setResults(data)
      const highlight = (text: string) =>
  text.replace(
    new RegExp(search, "gi"),
    (match) => `<b>${match}</b>`
  )
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])
const router = useRouter()
  return (
    <div>
          <Button variant="ghost" size="icon-sm" className= 'cursor-pointer' onClick={() => setIsOpen(true)}>

        <Search />
      </Button> 
      {
        open && (
      <div className="absolute top-0 left-0 h-screen w-full bg-white z-100 py-20 p-10 lg:p-20 ">
         <Button variant="ghost" size="icon-sm"  className="absolute top-5 right-5" onClick={() => setIsOpen(false)}>
           <XIcon />
         </Button>
    <div className="relative w-full flex flex-col gap-4">
         <h2 className="text-2xl font-semibold ">
          Search 
         </h2>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products here"
        className="w-full border p-2"
        />

      {results.length > 0 && (
        <div className=" bg-white mt-12  z-50">
          <span className="text-sm font-semibold ">
          Related Searches
          </span>
          {results.map((item) => (
            <div
            key={item._id}
            className="p-2 hover:bg-gray-50 text-gray-600 rounded-r-full hover:text-black hover:underline  transition-all cursor-pointer flex items-center gap-2"
            onClick={() => {setIsOpen(false); router.push(`/products/${item._id}`)}}
            >
             <Search className="w-3 h-3"/>
              {item.title}
            </div>
          ))}
        </div>
      )}

      {loading && <p className="w-full flex items-center"><Spinner /></p>}
    </div>
      </div>
    )}
    </div>
    
  )
}
