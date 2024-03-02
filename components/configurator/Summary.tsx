import { Req } from '@/app/interfaces/req'
import { Product } from '@/app/interfaces/api';
import { getLegsTable, isStringifyObject } from '@/app/utils/configurator'
import React, { useEffect, useState } from 'react'
import H1 from './H1'
import Loading from './Loading';

interface Props {
    req: Req
}
export default function Summary({req}: Props) {
  
  let box: Product | null = null
  let header: Product | null = null
  let legs: Product | null = null
  let mattress: Product | null = null
  
  const [legsTable, setLegsTable] = useState<Product[] | null>(null)
  useEffect(() => {
    (async () => {
      try {
        if(legs && isStringifyObject(legs.index)){
          const table = await getLegsTable(legs.index)
          setLegsTable(table)
        }
        else setLegsTable(null)
        
        
      } catch (error) {
        setLegsTable(null)
      console.log(error)
      }
    })()
  },[req.legs])

  if(isStringifyObject(req.boxIndex)){
    box = JSON.parse(req.boxIndex as string)
  }
  if(isStringifyObject(req.headerWidth)){
    header = JSON.parse(req.headerWidth as string)
  }
  if(req.legs && isStringifyObject(req.legs)){
    legs = JSON.parse(req.legs as string)
  }
  if(req.matBuild && isStringifyObject(req.matBuild)){
    mattress = JSON.parse(req.matBuild as string)
  }
  
  return (
    <div className='flex flex-col space-y-3 my-10 justify-start w-full'>
        <H1>Podsumowanie</H1>
        
        <div className="flex">
           <div className="flex-1">
           {header && header.name + " w materiale " + req.tex}
           </div>
           <div className="flex-1">
          {header && header.index}
           </div>
           <div className="w-20 text-right">
           {header && header.price}
           </div>
        </div>
        <div className="flex">
           <div className="flex-1">
           {box && box.name + " w materiale " + req.tex}
           </div>
           <div className="flex-1">
          {box && box.index} 
           </div>
           <div className="w-20 text-right">
           {box && box.price}
           </div>
        </div>

        {(legs && !isStringifyObject(legs.index)) ? (
        <div className="flex">
           <div className="flex-1">
           {legs && legs.name}
           </div>
           <div className="flex-1">
          {legs && legs.index}
           </div>
           <div className="w-20 text-right">
           {legs && legs.price}
           </div>
        </div>
        ) :
        ((legsTable && legs) ? (
          
            legsTable.map(row => {
             
              return (
             <div key={row.index} className="flex">
                <div className="flex-1">{row.name}</div>
                <div className="flex-1">{row.index}</div>
                <div className="w-20 text-right">{row.price}</div>
              </div>
            )}
            )): legs && <Loading /> )
          
        }

        <div className="flex">
           <div className="flex-1">
           {mattress && mattress.name}
           </div>
           <div className="flex-1">
          {mattress && mattress.index}
           </div>
           <div className="w-20 text-right">
           {mattress && mattress.price}
           </div>
        </div>
        
        
    </div>
  ) 
}
