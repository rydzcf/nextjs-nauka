import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '@/app/interfaces/api';
import { Req } from '@/app/interfaces/req';
import { getData } from '@/app/utils/configurator';
import H1 from './H1';
import Loading from './Loading';
import Option from "./Option";

interface Props {
  req: Req;
  setPillCover: (value: Req['pillCover']) => void;
  setPillHeight: (value: Req['pillHeight']) => void;
  setPillBuild: (value: Req['pillBuild']) => void;
}

export default function SelectPillowtop({ req, setPillCover, setPillHeight, setPillBuild }: Props) {
  const [data, setData] = useState<Product[] | null>(null);
  
  
  useEffect(() => {
    const fetchData = async () => {
      const dataFromFile = await getData("pillowtop", req.pillCover ?? null, req.size);
      setData(dataFromFile as Product[]);
    };
    fetchData();
  }, [req.size]);




  const uniqueCovers = useMemo(() => {
    if (!data) return [];
    const covers: (string | undefined)[] = data
    .map((product: Product) => product.cover)
      .filter((cover): cover is string => cover !== null && cover !== undefined) // Filtracja undefined i null
      .sort((a: string, b: string) => a.localeCompare(b));
    return Array.from(new Set(covers));
  }, [data]);


  const uniqueHeights = useMemo(() => {
  
    if (!data || !req.pillCover) return [];
    const heights: (string | undefined)[] = data
      .filter(product => product.cover === req.pillCover)
      .map((product: Product) => product.height)
      .filter((height): height is string => height !== null && height !== undefined) // Filtracja undefined i null
      .sort((a: string, b: string) => a.localeCompare(b));
  
    return Array.from(new Set(heights));
  }, [data, req.pillCover]);
  
  

  if (!data) return <Loading />;
  return (
    <>
      <H1>Wybierz pokrowiec przekładki</H1>
      <div className="flex space-x-1">
        {uniqueCovers
        .map((cover) => {
          const product = data.find((product) => product.cover === cover);
          return (
            <div key={cover}>
              {product && (
                <Option
                  product={product}
                  visibleName={cover ?? ""}
                  handleSelected={() => setPillCover(cover ?? null)}
                  {...(req.pillCover === cover && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
        {req.pillCover ? (
          <>
      <H1>Wybierz wysokość przekładki</H1>
      <div className="flex space-x-1">
        {uniqueHeights
        .map((height) => {
          const product = data.find((product) => product.height === height);
          return (
            <div key={height}>
              {product && (
                <Option
                  product={product}
                  visibleName={height ?? ""}
                  handleSelected={() => setPillHeight(height ?? null)}
                  {...(req.pillHeight === height && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
      </>
      ): null}
      
      {req.pillCover && req.pillHeight ? (
        <>
      <H1>Wybierz budowę przekładki</H1>
      <div className="flex space-x-1">
        {data
        .filter(product => (product.cover === req.pillCover && product.height === req.pillHeight))
        .map((product, index) => {
          return (
            <div key={product.build + " " + index}>
              {(product && product.build) && (
                <Option
                  product={product}
                  visibleName={product.build ?? ""}
                  handleSelected={() => setPillBuild(JSON.stringify(product) ?? null)}
                  {...(req.pillBuild === JSON.stringify(product) && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
   </>):null}
    </>
  );
}
