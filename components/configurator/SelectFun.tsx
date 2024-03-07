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
    handleFun: (product: Product) => void;
  }
export default function SelectFun({req, handleFun} : Props) {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      if (req.boxName === null || !("fun" in req)) return
      
      const dataFromFile: Product[] = (await getData(
        "fun",
        null,
        null
      )) as Product[];
      setData(dataFromFile);
    })();
  }, [req.boxName]);
  if (!data) return (<Loading />) 

  return (
    <>
         <H1>Wybierz fundament<Mark value={req.fun}></Mark></H1>
    <div className="flex flex-wrap justify-center">
        {data.filter(product => 
            (product.fit?.includes(req.boxName as string) || product.fit?.length === 0)
        ).map(product => {
            return(
                <Option
              key={product.index}
              product={product}
              visibleName={product.name}
              handleSelected={() => handleFun(product)}
              {...(req.fun === product.index && { active: true })}
            />
            )
        })}
    </div>
    </>
  )
}
