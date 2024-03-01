import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '@/app/interfaces/api';
import { Req } from '@/app/interfaces/req';
import { getData } from '@/app/utils/configurator';
import H1 from './H1';
import Loading from './Loading';
import Option from "./Option";

interface Props {
  req: Req;
  setMatSpring: (value: string | null) => void;
}

export default function SelectMatSpring({ req, setMatSpring }: Props) {
  const [data, setData] = useState<Product[] | null>(null);
  
  useEffect(() => {
    if (req.gr === null) return;
    const fetchData = async () => {
      const dataFromFile = await getData("mattress", req.gr, req.size);
      setData(dataFromFile as Product[]);
    };
    fetchData();
  }, [req.size, req.gr]);

  const uniqueSprings = useMemo(() => {
    if (!data) return [];
    const springs = data.map((product) => product.spring);
    return Array.from(new Set(springs));
  }, [data]);

  if (req.gr === null) return null;
  if (!data) return <Loading />;

  return (
    <>
      <H1>Wybierz sprężynę</H1>
      <div className="flex space-x-1">
        {uniqueSprings.map((spring) => {
          const product = data.find((product) => product.spring === spring);
          return (
            <div key={spring}>
              {product && (
                <Option
                  product={product}
                  visibleName={spring ?? ""}
                  handleSelected={() => setMatSpring(spring ?? null)}
                  {...(req.matSpring === spring && { active: true })}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
