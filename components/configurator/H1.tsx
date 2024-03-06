import React from 'react'

interface H1Props {
    children: React.ReactNode;
    className?: string,
}
export default function H1({children, className}: H1Props) {
  return (
      <div className={`mt-14 mb-5 text-xl ${className}`}>{children}</div>
  )
}
