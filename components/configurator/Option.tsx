import { Product } from '@/app/interfaces/api'
import React from 'react'

interface Props {
    product: Product,
    productKey: "name" | "index",
    active?: boolean,
    handleSelected : (product: Product, productKey: string) => void
}

export default function Option({product, active, productKey, handleSelected}: Props) {
  return (
    <div className={`flex justify-center items-center w-20 h-10 border rounded-md mr-1 text-sm cursor-pointer ${active && "bg-red-500"}`}
    onClick={() => handleSelected(product, productKey)}>
      {product[productKey]}
      </div>
  )
}
