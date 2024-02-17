"use client"

import React, { useState } from 'react'
import { GrMenu, GrClose } from "react-icons/gr";

interface Props {
    toggle : boolean,
    
}

export default function Toggle({toggle} : Props) {
  
  const [isOpen, setIsOpen] = useState(false);
 const handleClick = () => {
    setIsOpen(prev => {
      toggle = !prev;
      return !prev
    })
 }

  return (
     <div className='cursor-pointer' onClick={handleClick}>
      {isOpen ? 
      <GrClose /> :
      <GrMenu />
      }
    </div>
  )
}
