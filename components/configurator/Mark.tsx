import React from 'react'
import { BsExclamationCircleFill } from "react-icons/bs";

interface Props {
    value: string | null
}
export default function Mark({value}: Props) {
  
    if(value !== null) return null
    
    return (
    <div className='text-red-500 animate-bounce ms-2 text-2xl'><BsExclamationCircleFill /></div>
  )
}
