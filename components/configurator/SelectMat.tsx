import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '@/app/interfaces/api';
import { Req } from '@/app/interfaces/req';
import { getData } from '@/app/utils/configurator';
import H1 from './H1';
import Loading from './Loading';
import Option from "./Option";

interface Props {
  req: Req;
  setMatSpring: (value: string | null) => void;
  setMatH: (value: Req['matH']) => void;
  setMatBuild: (value: Req['matBuild']) => void;
}

export default function SelectMat({ req, setMatSpring, setMatH, setMatBuild }: Props) {
  const [data, setData] = useState<Product[] | null>(null);
  
  useEffect(() => {
    if (req.gr === null) return;
    const fetchData = async () => {
      const dataFromFile = await getData("mattress", req.gr, req.size);
      setData(dataFromFile as Product[]);
    };
    fetchData();
  }, [req.size, req.gr]);

  const uniqueSprings = useMemo(() => {
    if (!data) return [];
    const springs = data
    // .sort((a: Product, b: Product) => (a.spring).localeCompare(b.spring))
    .map((product) => product.spring);
    return Array.from(new Set(springs));
  }, [data]);

  //trzeba sprawdzac, czy wszsytkie produkty z TFK maja przypisana twardosc
  const uniqueH = useMemo(() => {
    if (!data || !req.matSpring) return [];
    const hs = data
    .filter(product => product.spring === req.matSpring)
    .map((product) => product.h)
    .filter((value) => value !== null && value !== undefined);
    return Array.from(new Set(hs as string[])).sort((a:string, b:string) => a.localeCompare(b));
  }, [data, req.matSpring]);
  

  const uniqueBuild = useMemo(() => {
    if (!data || !req.matSpring) return [];
    const builds = data
    .filter(product => product.spring === req.matSpring && product.h === req.matH)
    .map((product) => product.build)
    .filter((value) => value !== null && value !== undefined);
    return Array.from(new Set(builds as string[])).sort((a:string, b:string) => a.localeCompare(b));
  }, [data, req.matSpring, req.matH]);



  if (req.gr === null) return null;
  if (!data) return <Loading />;
  return (
    <>
      <H1>Wybierz sprężynę materaca</H1>
      <div className="flex">
        {uniqueSprings
        .map((spring) => {
          const product = data.find((product) => product.spring === spring);
          return (
            <div key={spring}>
              {product && (
                <Option
                  product={product}
                  visibleName={spring ?? ""}
                  handleSelected={() => setMatSpring(spring ?? null)}
                  {...(req.matSpring === spring && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
    {req.matSpring === "TFK" && (
        <>
        <H1>Wybierz twardość sprężyny</H1>
        <div className="flex space-x-1">
        {uniqueH.
        map((h) => {
          const product = data.find((product) => (product.h === h && product.spring === req.matSpring));
          return (
            <div key={h + ""}>
              {product && (
                <Option
                  product={product}
                  visibleName={h ?? ""}
                  handleSelected={() => setMatH(h as Req['matH'] ?? null)}
                  {...(req.matH === h && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
        
        </>
    )}

{req.matSpring && (
        <>
        <H1>Wybierz budowę</H1>
        <div className="flex space-x-1">
        {uniqueBuild.
        map((build) => {
          const product = data.find((product) => (product.h === req.matH 
            && product.spring === req.matSpring
            && product.build === build));
          return (
            <div key={build + ""}>
              {product && (
                <Option
                  product={product}
                  visibleName={build ?? ""}
                  handleSelected={() => setMatBuild(JSON.stringify(product) as Req['matBuild'] ?? null)}
                  {...(req.matBuild === JSON.stringify(product) && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
        
        </>
    )}

    </>
  );
}
