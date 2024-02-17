import React, { useState } from "react";
import H1 from "./H1";

interface Prop {
  handleTex: (tex: string) => void;
}

export default function SelectTex({ handleTex }: Prop) {
  const [tex, setTex] = useState("");
  const [isValid, setisValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTex(value);
    if (
      value.length === 5 &&
      !isNaN(Number(value.charAt(0))) &&
      value.charAt(0) !== " " &&
      Number(value.charAt(0)) <= 7
    ) {
      handleTex(value);
      setisValid(true);
    } else {
      setisValid(false);
    }
  };

  return (
    <label>
      <H1>Wpisz numer tkaniny</H1>
      <input
        type="text"
        value={tex}
        name="tex"
        className={`text-black w-24 mx-1 py-1 px-2 border-2 rounded-md ${isValid ? "border-lime-700" : "border-red-700"}`}
        onChange={handleChange}
        maxLength={5}></input>
    </label>
  );
}
