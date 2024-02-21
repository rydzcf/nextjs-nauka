import { Product } from "@/app/interfaces/api";
import { Req } from "@/app/interfaces/req";
import { getData } from "@/app/utils/configurator";
import React, { useEffect, useState } from "react";
import H1 from "./H1";
import Loading from "./Loading";
import Option from "./Option";

interface Props {
  req: Req;
  handleBoxName: (product: Product) => void;
}

export default function SelectHeaderName({ req, handleBoxName }: Props) {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      if (req.gr === null) return
      const dataFromFile: Product[] = (await getData(
        "bed",
        req.gr,
        req.size
      )) as Product[];
      setData(dataFromFile);
    })();
  }, [req.size, req.gr]);

  if (req.gr === null) return null
  if (!data) return (<Loading />) 

  const handleOption = (product: Product, productKey:  string) => {
      handleBoxName(product)
  }

  return (
    <div>
        <H1>Wybierz box</H1>
    <div className="flex space-x-1">
  {data && Array.from(new Set(data.map((product) => product.name))) // Tworzenie unikalnych nazw produktów
    .map((uniqueName) => {
      const product = data.find((product) => product.name === uniqueName); // Znalezienie pierwszego produktu z unikalną nazwą
      return (
        <div key={uniqueName}> {/* Klucz zmieniony na uniqueName dla unikalności */}
          {product && (
            <Option
              product={product}
              productKey="name"
              handleSelected={handleOption}
              {...(req.boxName === product.name && { active: true })}
            />
          )}
        </div>
        
      );
    })}
</div>
</div>
  );
}
