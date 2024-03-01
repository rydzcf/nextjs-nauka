import H1 from "./H1";

interface Prop {
  headerHeightCustom: number | null;
  setHeaderHeightCustom: (value: number) => void;
}

export default function SelectHeaderHeight({ headerHeightCustom, setHeaderHeightCustom }: Prop) {
  
  if (!headerHeightCustom) return null
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setHeaderHeightCustom(newValue)
  }
  

  return (
    <div className="flex items-center mt-10">
    <H1 className="flex mt-0 mb-0">Podaj wysokość zagłówka</H1>
    <label className="flex items-center">
    <input
      type="number"
      value={headerHeightCustom? headerHeightCustom : 0}
      name="headerHeightCustom"
      className={`flex ml-2 bg-transparent w-18 border-white py-1 px-2 border-b text-xl focus:outline-none`}
      onChange={handleChange}
      min={60}
      max={160} />
    </label>
    </div>
  );
}
