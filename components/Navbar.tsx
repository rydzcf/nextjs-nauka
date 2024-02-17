import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
import { GrMenu, GrClose } from "react-icons/gr";

export default function Navbar() {
  return (
    <>
    <div className='flex items-center justify-between'>
        <div className="relative w-40 h-20">
        <Logo />
        </div>
        <Nav className='space-x-5 hidden lg:flex'/>
        <div className="text-3xl">
            <GrMenu />
        </div>
        </div>
        <div className='h-dvh w-screen bg-red-600'>
            <Nav className="flex flex-col space-y-5 text-4xl justify-center items-center h-full w-full" />
        </div>
</>
  )
}
