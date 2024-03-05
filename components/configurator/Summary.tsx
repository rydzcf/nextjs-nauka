import { Req } from "@/app/interfaces/req";
import { Product } from "@/app/interfaces/api";
import {
  getLegsTable,
  isStringifyObject,
  pricify,
} from "@/app/utils/configurator";
import React, { useEffect, useState } from "react";
import H1 from "./H1";
import Loading from "./Loading";

interface Props {
  req: Req;
}

export default function Summary({ req }: Props) {
  const [box, setBox] = useState<Product | null>(null);
  const [header, setHeader] = useState<Product | null>(null);
  const [mattrass, setMattrass] = useState<Product | null>(null);
  const [pillowtop, setPillowtop] = useState<Product | null>(null);
  let legs: Product | null = null;


  const [legsTable, setLegsTable] = useState<Product[] | null>(null);
  useEffect(() => {
    (async () => {
      try {
        if (legs && isStringifyObject(legs.index)) {
          const table = await getLegsTable(legs.index);
          setLegsTable(table);
        } else setLegsTable(null);
      } catch (error) {
        setLegsTable(null);
        console.log(error);
      }
    })();
  }, [req.legs]);

  useEffect(() => {
    if (isStringifyObject(req.boxIndex)) {
      setBox(JSON.parse(req.boxIndex as string));
    }
  }, [req.boxIndex]);

  useEffect(() => {
    if (isStringifyObject(req.headerWidth)) {
      setHeader(JSON.parse(req.headerWidth as string));
      let defaultPrice = 99999;
      if (header?.price) defaultPrice = header.price;
      let newPrice = 0;
      if (header && header.price && header?.height && req.headerHeightCustom)
        if (header.height > req.headerHeightCustom) {
          // zaglowek niższy doliczamy 10% za przeróbkę
          newPrice = defaultPrice * 1.1;
        } else {
          // doliczamy + 10% za przeróbkę i + 20% za każde rozczpoczęte 20cm
          newPrice =
            defaultPrice *
            1.1 *
            (1 +
              Math.ceil((req.headerHeightCustom - Number(header.height)) / 20) *
                0.2);
        }

      if (header && header?.height !== req.headerHeightCustom) {
        setHeader({
          ...header,
          index: header.index + "W" + req.headerHeightCustom,

          price: newPrice,
        });
      }
    }
  }, [req.headerWidth]);

  if (req.legs && isStringifyObject(req.legs)) {
    legs = JSON.parse(req.legs as string);
  }
  
  useEffect(()=> {
  if (req.matBuild && isStringifyObject(req.matBuild)) {
    setMattrass(JSON.parse(req.matBuild as string))
  }
},[req.matBuild])

useEffect(()=> {
  if (req.pillBuild && isStringifyObject(req.pillBuild)) {
    setPillowtop(JSON.parse(req.pillBuild as string))
  }
},[req.pillBuild])


  return (
    <div className="flex flex-col space-y-3 my-10 justify-start w-full">
      <H1>Podsumowanie</H1>

      <div className="flex">
        <div className="flex-1">
          {header && header.name + " w materiale " + req.tex}
        </div>
        <div className="flex-1">{header && header.index}</div>
        <div className="w-24 text-right">{header && pricify(header.price)}</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          {box && box.name + " w materiale " + req.tex}
        </div>
        <div className="flex-1">{box && box.index}</div>
        <div className="w-24 text-right">{box && pricify(box.price)}</div>
      </div>

      {legs && !isStringifyObject(legs.index) ? (
        <div className="flex">
          <div className="flex-1">{legs && legs.name}</div>
          <div className="flex-1">{legs && legs.index}</div>
          <div className="w-24 text-right">{legs && pricify(legs.price)}</div>
        </div>
      ) : legsTable && legs ? (
        legsTable.map((row) => {
          return (
            <div key={row.index} className="flex">
              <div className="flex-1">{row.name}</div>
              <div className="flex-1">{row.index}</div>
              <div className="w-24 text-right">{pricify(row.price)}</div>
            </div>
          );
        })
      ) : (
        legs && <Loading />
      )}

      <div className="flex">
        <div className="flex-1">{mattrass && mattrass.name}</div>
        <div className="flex-1">{mattrass && mattrass.index}</div>
        <div className="w-24 text-right">
          {mattrass && pricify(mattrass.price)}
        </div>
      </div>

      <div className="flex">
        <div className="flex-1">{pillowtop && pillowtop.name}</div>
        <div className="flex-1">{pillowtop && pillowtop.index}</div>
        <div className="w-24 text-right">
          {pillowtop && pricify(pillowtop.price)}
        </div>
      </div>

      <div className="flex border-t">
        <div className="flex-1 text-right">razem</div>
        <div className="w-24 text-right">{pricify(1)}</div>
      </div>
    </div>
  );
}
