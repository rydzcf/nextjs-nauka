import { Product } from "@/app/interfaces/api";
import { Req } from "@/app/interfaces/req";
import { getData } from "@/app/utils/configurator";
import React, { useEffect, useState } from "react";
import H1 from "./H1";
import Loading from "./Loading";
import Option from "./Option";

interface Props {
  req: Req;
  handleHeaderWidth: (value: string, height: number | null | undefined) => void;
}

export default function SelectHeaderWidth({ req, handleHeaderWidth }: Props) {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      if (req.gr === null || req.headerName === null) return
      const dataFromFile: Product[] = (await getData(
        "header",
        req.gr,
        req.size
      )) as Product[];
      setData(dataFromFile.filter(product => product.name === req.headerName));
    })();
  }, [req.size, req.gr, req.headerName]);

  if (req.gr === null || req.headerName === null) return null
  if (!data) return (<Loading />) 
  
  
  // const handleOption = (product: Product, productKey: string) => {
  //   handleHeaderWidth(product[productKey as keyof Product] as string, product.height);
  // };
  const handleOption = (product: Product) => {
    // handleHeaderWidth(product.index, Number(product.height));
     handleHeaderWidth(JSON.stringify(product), Number(product.height));

  };

  return (
    <>
<H1>Ile zagłówek ma wystawać poza korpus?</H1>
    
    <div className="flex flex-wrap justify-center">
  {data && Array.from(new Set(data.map((product) => product.index))) // Tworzenie unikalnych nazw produktów
    .sort((a: string, b: string) => a.localeCompare(b))
    .map((uniqueName) => {
      const product = data.find((product) => product.index === uniqueName); // Znalezienie pierwszego produktu z unikalną nazwą
      return (
        <div key={uniqueName}> {/* Klucz zmieniony na uniqueName dla unikalności */}
          {product && (
            <Option
              product={product}
              visibleName={(Number(product.index.slice(-3))-1-req.size)/2 + " cm"}
              handleSelected={handleOption}
              {...(req.headerWidth === JSON.stringify(product) && { active: true })}
            />
          )}
        </div>
      );
    })}
</div>
</>
  );
}
