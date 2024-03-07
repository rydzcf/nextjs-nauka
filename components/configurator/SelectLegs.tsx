import { LegsIndex, Product } from '@/app/interfaces/api';
import { Req } from '@/app/interfaces/req';
import { getData } from '@/app/utils/configurator';
import React, { useEffect, useState } from 'react'
import H1 from './H1';
import Loading from './Loading';
import Mark from './Mark';
import Option from "./Option";

interface Props {
    req: Req;
    handleLegs: (product: Product) => void;
  }
export default function SelectLegs({req, handleLegs} : Props) {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      if (req.boxName === null || !("legs" in req)) return
      
      const dataFromFile: Product[] = (await getData(
        "legs",
        null,
        req.size
      )) as Product[];
      setData(dataFromFile);
    })();
  }, [req.size, req.boxName]);
  if (req.boxName === null || !("legs" in req)) return null
  if (!data) return (<Loading />) 

  



  const handleOption = (product: Product) => {
    handleLegs(product)
}


  return (
    <>
         <H1>Wybierz nogi<Mark value={req.legs ?? null}></Mark></H1>
    <div className="flex flex-wrap justify-center">
        {data.filter(product => 
            (product.fit?.includes(req.boxName as string) || product.fit?.length === 0)
        ).map(product => {
            return(
                <Option
            key={product.index}
              product={product}
              visibleName={product.name}
              handleSelected={handleOption}
              {...(req.legs === JSON.stringify(product) && { active: true })}
            />
            )
        })}
    </div>
    </>
  )
}
