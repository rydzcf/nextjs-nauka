import { Req } from '@/app/interfaces/req'
import { Product } from '@/app/interfaces/api';
import { getLegsTable, isStringifyObject, pricify } from '@/app/utils/configurator'
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
    let defaultPrice = 99999;
    if (header?.price) defaultPrice=header.price;
    let newPrice = 0
    if(header && header.price && header?.height && req.headerHeightCustom) 
    if(header.height > req.headerHeightCustom) {
      // zaglowek niższy doliczamy 10% za przeróbkę 
      newPrice = defaultPrice * 1.1
    } else {
      // doliczamy + 10% za przeróbkę i + 20% za każde rozczpoczęte 20cm
      newPrice = defaultPrice * 1.1 * (1+ Math.ceil((req.headerHeightCustom - Number(header.height))/20)*0.2)
    }
  

    if (header && header?.height !== req.headerHeightCustom)
    {
     header = {
      ...header,
      index: header.index + "W" + req.headerHeightCustom,

      price: newPrice
    }

    }
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
           <div className="w-24 text-right">
           {header && pricify(header.price)}
           </div>
        </div>
        <div className="flex">
           <div className="flex-1">
           {box && box.name + " w materiale " + req.tex}
           </div>
           <div className="flex-1">
          {box && box.index} 
           </div>
           <div className="w-24 text-right">
           {box && pricify(box.price)}
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
           <div className="w-24 text-right">
           {legs && pricify(legs.price)}
           </div>
        </div>
        ) :
        ((legsTable && legs) ? (
          
            legsTable.map(row => {
             
              return (
             <div key={row.index} className="flex">
                <div className="flex-1">{row.name}</div>
                <div className="flex-1">{row.index}</div>
                <div className="w-24 text-right">{pricify(row.price)}</div>
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
           <div className="w-24 text-right">
           {mattress && pricify(mattress.price)}
           </div>
        </div>
        
        
    </div>
  ) 
}
