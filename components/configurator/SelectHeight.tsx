import React from "react";

interface Prop {
  headerHeight: number;
  setHeaderHeight: (value: number) => void;
}

export default function SelectHeight({ headerHeight, setHeaderHeight }: Prop) {

  return (
    <label>
      Podaj wysokość zagłówka
      <input
        type="number"
        value={headerHeight}
        name="headerHeight"
        className={`text-black w-16 mx-1 py-1 px-2 border-2 rounded-md `}
        onChange={(e) => setHeaderHeight(Number(e.target.value))}
        min={60}
        max={160}></input>
    </label>
  );
}
