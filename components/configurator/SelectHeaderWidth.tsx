import { Product } from "@/app/interfaces/api";
import { Req } from "@/app/interfaces/req";
import { getData } from "@/app/utils/configurator";
import React, { useEffect, useState } from "react";
import H1 from "./H1";
import Option from "./Option";

interface Props {
  req: Req;
  handleHeaderWidth: (value: string) => void;
}

export default function SelectHeaderWidth({ req, handleHeaderWidth }: Props) {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      const dataFromFile: Product[] = (await getData(
        "header",
        req.gr,
        req.size
      )) as Product[];
      setData(dataFromFile.filter(product => product.name === req.headerName));
    })();
  }, [req.size, req.gr, req.headerName]);

  const handleOption = (product: Product, productKey: string) => {
    handleHeaderWidth(product[productKey as keyof Product] as string);
  };

  return (
    <div>
<H1>Wybierz szerokość</H1>
    
    <div className="flex space-x-1">
  {data && Array.from(new Set(data.map((product) => product.index))) // Tworzenie unikalnych nazw produktów
    .map((uniqueName) => {
      const product = data.find((product) => product.index === uniqueName); // Znalezienie pierwszego produktu z unikalną nazwą
      return (
        <div key={uniqueName}> {/* Klucz zmieniony na uniqueName dla unikalności */}
          {product && (
            <Option
              product={product}
              productKey="index"
              handleSelected={handleOption}
              {...(req.headerWidth === product.index && { active: true })}
            />
          )}
        </div>
      );
    })}
</div>
</div>
  );
}
