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
  const [legs, setLegs] = useState<Product | null>(null);
  const [newLegsPrice, setNewLegsPrice] = useState<number>(0);

  const [legsTable, setLegsTable] = useState<Product[] | null>(null);

  useEffect(() => {
    if (isStringifyObject(req.boxIndex)) {
      setBox(JSON.parse(req.boxIndex as string));
    } else setBox(null);

    setLegs(null);
    setLegsTable(null);
  }, [req.boxIndex]);

  useEffect(() => {
    if (req.legs && isStringifyObject(req.legs)) {
      setLegs(JSON.parse(req.legs as string));
    } else setLegs(null);
  }, [req.legs]);

  useEffect(() => {
    (async () => {
      try {
        if (legs && isStringifyObject(legs.index)) {
          const table = await getLegsTable(legs.index);
          setNewLegsPrice(table.reduce((acc, cur) => acc + cur.price, 0));
          setLegsTable(table);
        } else {
          setLegsTable(null);
          setNewLegsPrice(0);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [legs]);

  useEffect(() => {
    if (req.headerWidth && isStringifyObject(req.headerWidth)) {
      setHeader(JSON.parse(req.headerWidth as string));
    } else setHeader(null);
  }, [req.headerWidth]);

  useEffect(() => {
    // Wczesne wyjście, jeśli brakuje wymaganych danych.
    if (!header || !header.price || !header.height || !req.headerHeightCustom) {
      return;
    }

    const { price, index } = JSON.parse(req.headerWidth as string);

    let newPrice = price;
    let newIndex = index;

    if (header.height !== req.headerHeightCustom) {
      newIndex += "W" + req.headerHeightCustom;

      if (Number(header.height) > Number(req.headerHeightCustom)) {
        // Zagłówek niższy, doliczamy 10% za przeróbkę.
        newPrice *= 1.1;
      } else {
        // Doliczamy +10% za przeróbkę i +20% za każde rozpoczęte 20cm.
        newPrice *=
          1.1 *
          (1 +
            Math.ceil((req.headerHeightCustom - Number(header.height)) / 20) *
              0.2);
      }
    }

    setHeader({
      ...header,
      price: newPrice,
      index: newIndex,
    });
  }, [req.headerHeightCustom]);

  useEffect(() => {
    if (req.matBuild && isStringifyObject(req.matBuild)) {
      setMattrass(JSON.parse(req.matBuild as string));
    } else setMattrass(null);
  }, [req.matBuild]);

  useEffect(() => {
    if (req.pillBuild && isStringifyObject(req.pillBuild)) {
      setPillowtop(JSON.parse(req.pillBuild as string));
    } else setPillowtop(null);
  }, [req.pillBuild]);

  return (
    <div className="flex flex-col space-y-3 my-10 justify-start w-full">
      <H1>Podsumowanie</H1>
      <div className="flex border-b"></div>

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
        <div className="flex-1">
          {header && header.name + " w materiale " + req.tex}
        </div>
        <div className="flex-1">{header && header.index}</div>
        <div className="w-24 text-right">{header && pricify(header.price)}</div>
      </div>

      

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
        <div className="flex-1 text-right">razem:</div>
        <div className="w-24 text-right">
          {pricify(
            (box ? box.price : 0) +
              (header ? header.price : 0) +
              (mattrass ? mattrass.price : 0) +
              (pillowtop ? pillowtop.price : 0) +
              (legs ? (newLegsPrice === 0 ? legs.price : newLegsPrice) : 0)
          )}
        </div>
      </div>
    </div>
  );
}
