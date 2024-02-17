import { Product } from "@/app/interfaces/api";
import React, { useEffect, useState } from "react";
import H1 from "./H1";
import Option from "./Option";

interface Props {
  data : Product[]
  handleSelected: (value: string) => void; //to musi byc tablica obiektów jakie wybrałem
}


export default function Select({ data, handleSelected }: Props) {

  const [names, setNames] = useState<string[]>([]);
  const [selectedHeders, setSelectedHeaders] = useState<Product[] | null>(null);


const handleOption = (product: Product, productKey: string) => {
  // setSelectedHeaders(data
  //   .filter(prod => prod[productKey] === productKey));
  console.log(product, productKey)
}


  useEffect(() => {
    setSelectedHeaders(null)
    console.log("useEffect z SelectHeader")
    const namesSet = Array.from(new Set(data
        .map((elem) => elem.name)));
    setNames(namesSet);
  },[data])


  return (
    <>
      <H1>Wybierz zagłówek</H1>
    <div className="flex space-x-1">
      {data.map((elem) => (
        <div key={elem.index}><Option product={elem} productKey="name" handleSelected={handleOption}/></div>
      ))}
    </div>
    <H1>Wybierz szerokość</H1>
    <div className="flex space-x-1">
    {/* {selectedHeders && selectedHeders.map((elem) => (
        <div key={elem.index}><Option value={elem.index} handleSelected={handleOption}/></div>
      ))} */}
    </div>
    </>
  );
}
