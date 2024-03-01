import { Req } from '@/app/interfaces/req'
import React from 'react'
import H1 from './H1'

interface Props {
    req: Req
}
export default function Summary({req}: Props) {
  return (
    <div className='flex flex-col space-y-3 my-10'>
        <H1>Podsumowanie</H1>
        <div className="flex space-x-2">
           <p>box index:</p>
           {req.boxIndex}
        </div>
        <div className="flex space-x-2">
           <div>zagłówek:</div>
           <div>{req.headerWidth}{(req.headerHeightCustom !== req.headerHeight) ? "W"+req.headerHeightCustom : ""}</div>
        </div>
    </div>
  )
}
