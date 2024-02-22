import { Product } from "@/app/interfaces/api";
import { getOne } from "@/app/utils/configurator";
import React, { useEffect, useState } from "react";

interface Prop {
  headerHeight: number | null;
  setHeaderHeight: (value: number) => void;
}

export default function SelectHeight({ headerHeight, setHeaderHeight }: Prop) {
  
  if (!headerHeight) return null
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setHeaderHeight(newValue)
  }
  
  return (
    <label>
      Podaj wysokość zagłówka
      <input
        type="number"
        value={headerHeight? headerHeight : 0}
        name="headerHeight"
        className={`text-black w-16 mx-1 py-1 px-2 border-2 rounded-md `}
        onChange={handleChange}
        min={60}
        max={160}></input>
    </label>
  );
}
