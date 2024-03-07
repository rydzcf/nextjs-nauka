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

  function findY(index: string): boolean {
    let indexMinus = index.indexOf("-");

    if (indexMinus === -1) return false

    if ((index.charAt(indexMinus - 1)).toLocaleUpperCase() === "Y") return true
    else return false
  }


  let filteredData = null;
  
  if (data && req.boxName) {
    filteredData = data.filter(product => product.name === req.boxName)
  }


  const handleOption = (product: Product) => {
      handleBoxName(product)
  }


  return (
    <>
        <H1>Wybierz box</H1>
    <div className="flex flex-wrap justify-center">
  {data && Array.from(new Set(data.map((product) => product.name))) // Tworzenie unikalnych nazw produktów
    .map((uniqueName) => {
      const product = data.find((product) => product.name === uniqueName); // Znalezienie pierwszego produktu z unikalną nazwą
      return (
        <div key={uniqueName}> {/* Klucz zmieniony na uniqueName dla unikalności */}
          {product && (
            <Option
              product={product}
              visibleName={product.name}
              handleSelected={handleOption}
              {...(req.boxName === product.name && { active: true })}
            />
          )}
        </div>    
      );
    })}

</div>



    {filteredData && (req.boxName && filteredData?.length > 1) && (
      <>
    <H1>Z ilu elementów ma składać się box</H1>
    <div className="flex space-x-1">
    {filteredData?.sort((a: Product, b: Product) => a.index.localeCompare(b.index)).map(product => (
      <div key={product.index}>
      <Option
      product={product}
      visibleName={(findY(product.index) ? "2" : "1")}
      handleSelected={handleOption}
      {...(req.boxIndex === JSON.stringify(product) && { active: true })}
      />
      </div>
    ))}
    </div>
    </>
)}
</>
  );
}
