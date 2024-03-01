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
    <div className={`flex justify-center items-center w-28 text-center h-10 border rounded-md mr-1 text-sm cursor-pointer ${active && " bg-sky-600"}`}
    onClick={() => handleSelected(product)}>
      {visibleName}
      </div>
  )
}
