import Link from 'next/link'
import React from 'react'

interface Props {
    className? : string
}

export default function Nav({className = ""} : Props) {
  return (
    <div className={className}>
        <Link href="#">O nas</Link>
        <Link href="#">Portfolio</Link>
        <Link href="#">Reklama</Link>
        <Link href="#">Kontakt</Link>  
    </div>
  )
}
