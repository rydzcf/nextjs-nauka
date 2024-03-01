import React from 'react'

interface Props {
  handleSize: (size: number) => void,
  selectedSize: number
}

export default function SelectSize({handleSize, selectedSize} : Props) {
  const sizes = [80, 90, 100, 120, 140, 160, 180, 200]
    return (
    <div className='flex space-x-5'>
        {sizes.map(size => 
            <div key={size + `x200`} className={`cursor-pointer transition ${(size === selectedSize ? "opacity-100" : "opacity-40")}`} onClick={() => handleSize(size)}>
                {size + `x200`}
            </div>
            )}
    </div>
  )
}
