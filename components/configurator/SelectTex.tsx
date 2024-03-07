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
    <label className="flex items-baseline mt-10">
    <H1 className="flex mt-0 mb-0">Wpisz numer tkaniny</H1>
    <input
      type="text"
      value={tex}
      name="tex"
      className={`flex ml-2 bg-transparent rounded-none w-20 border-white outline-none py-1 px-2 border-b text-xl ${isValid ? 'text-green-700' : 'text-red-700'} focus:outline-none`}
      onChange={handleChange}
      maxLength={5} />
</label>
  );
}
