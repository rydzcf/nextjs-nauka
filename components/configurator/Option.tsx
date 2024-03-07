import { Product } from '@/app/interfaces/api'
import React from 'react'

interface Props {
    product: Product,
    visibleName: string
    active?: boolean,
    handleSelected : (product: Product) => void
}

export default function Option({product, active, visibleName, handleSelected}: Props) {
  return (
    <div className={`flex flex-col items-center mx-2 my-4 shadow-md cursor-pointer transition hover:opacity-100 ${active ?  "opacity-100" : "opacity-60"}`}
    onClick={() => handleSelected(product)}>
      <div className="w-20 h-20 rounded-full overflow-hidden">
      <img src={`https://placehold.co/100x100?text=${visibleName}`} 
      alt={`photo ${product.name}`}
      style={{objectFit: "cover", width: "100%", height: "100%"}}
      />
      </div>
      <div className={`flex text-xs mt-2 text-wrap max-w-20 text-center transition ${active ? "underline underline-offset-4" : ""}`}>
      {visibleName}
        </div>
      </div>
    // <div className={`flex justify-center items-center w-28 text-center h-10 border rounded-md mr-1 text-sm cursor-pointer ${active ?  "bg-sky-600" : ""}`}
    // onClick={() => handleSelected(product)}>
    //   {visibleName}
    //   </div>
  )
}
