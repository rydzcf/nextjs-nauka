"use client";
import React, { useState, useEffect } from "react";
import SelectSize from "@/components/configurator/SelectSize";
import SelectTex from "@/components/configurator/SelectTex";
import SelectHeaderHeight from "./SelectHeaderHeight";
import { Product } from "@/app/interfaces/api";
import { updateDependencies } from "@/app/utils/configurator";
import { Req } from "@/app/interfaces/req";
import SelectHeaderName from "./SelectHeaderName";
import SelectHeaderWidth from "./SelectHeaderWidth";
import SelectBoxName from "./SelectBoxName";
import SelectLegs from "./SelectLegs";
import Summary from "./Summary";
import SelectMat from "./SelectMat";
import SelectPillowtop from "./SelectPillowtop";
import { Switch } from "../ui/switch";
import H1 from "./H1";
import SelectFun from "./SelectFun";

export default function Configurator() {
  const [isMattrass, setIsMattrass] = useState(false)
  const [isPillowtop, setIsPillowtop] = useState(false)
  const [isSummary, setIsSummary] = useState(true)

  const [req, setReq] = useState<Req>({
    size: 160,
    gr: null,
    tex: null,
    headerName: null,
    headerWidth: null,
    headerHeight: null,
    headerHeightCustom: null,
    boxName: null,
    boxIndex: null,
    dependencies: [],
    prevDependencies: [],
  });
  //zerowanie wyborów przy zmianie size albo gr
  useEffect(() => {
    setReq((req) => ({
        tex: req.tex,
        size: req.size,
        gr: req.gr,
      headerName: null,
      headerWidth: null,
      headerHeight: null,
      headerHeightCustom: null,
      boxName: null,
      boxIndex: null,
      dependencies: [],
      prevDependencies: []
    }));
  }, [req.size, req.gr]);

  const handleSize = (size: number) => {
    setReq({
      ...req,
      size: size,
    });
  };

  const handleTex = (tex: string | null) => {
    if (tex !== null) {
      setReq({
        ...req,
        tex: tex,
        gr: tex.charAt(0),
      });
    }
  };

  const handleHeaderName = (headerName: string) => {
    setReq({
      ...req,
      headerHeight: null,
      headerWidth: null,
      headerName: headerName,
    });
  };

  const handleHeaderWidth = (
    headerWidth: string,
    headerHeight: number | null | undefined
  ) => {
    setReq({
      ...req,
      headerWidth,
      ...(headerHeight ? { headerHeight } : {}),
      ...(headerHeight && { headerHeightCustom: headerHeight }),
    });
  };

  const handleSetHeaderHeightCustom = (headerHeightCustom: number) => {
    setReq({
      ...req,
      headerHeightCustom: headerHeightCustom,
    });
  };

  const handleBoxName = (product: Product) => {
    const updatedReq = updateDependencies(req, product, "boxName");
    setReq({
      ...updatedReq,
      boxIndex: JSON.stringify(product),
    });
  };

  const handleLegs = (product: Product) => {
    setReq({
      ...req,
      legs: JSON.stringify(product),
    });
  };
  
  const handleFun = (product: Product) => {
    setReq({
      ...req,
      fun: product.index,
    });
  };

  const handleMatSpring = (matSpring: string | null) => {
    //dodaje do obiektu req klucz matH ale tylko wtedy kiedy wybierzemy sprezyne TFK, bo tylko ona ma wtwardosc
    if(matSpring === "TFK") {
        setReq({        
            ...req,
            matH: null,
            matBuild: null,
            matZone: null,
            matSpring
        })
    } else {
        const { matH, ...rest } = req;
        setReq({        
        ...rest,
        matBuild: null,
        matZone: null,
        matSpring
    })
    }
  }

  const handleMatZone = (matZone: Req['matZone'] ) => {
    setReq({
        ...req,
        matZone,
        matH: null,
        matBuild: null
    })
  }
  const handleMatH = (matH: Req['matH'] ) => {
    setReq({
        ...req,
        matH,
        matBuild: null

    })
  }

  const handleMatBuild = (matBuild: Req['matBuild'] ) => {
    setReq({
        ...req,
        matBuild
    })
}
    const handlePillCover = (pillCover: Req['pillCover']) => {
        setReq({
            ...req,
            pillCover,
            pillHeight: null,
            pillBuild: null
        })
    }
    const handlePillHeight = (pillHeight: Req['pillHeight']) => {
      setReq({
        ...req,
        pillHeight,
        pillBuild: null
    })
    }
    
    const handlePillBuild = (pillBuild: Req['pillBuild']) => {
      setReq({
        ...req,
        pillBuild
      })
    }


  return (
    <div className="container mx-auto py-5 flex flex-col items-center">
      <SelectSize handleSize={handleSize} selectedSize={req.size} />
      <SelectTex handleTex={handleTex} />
      <SelectBoxName req={req} handleBoxName={handleBoxName} />
     
      {('legs' in req) &&
  <SelectLegs req={req} handleLegs={handleLegs} />
}
      {('fun' in req) &&
  <SelectFun req={req} handleFun={handleFun} />
}
      
      <SelectHeaderName req={req} handleHeaderName={handleHeaderName} />
      <SelectHeaderWidth req={req} handleHeaderWidth={handleHeaderWidth} />
      <SelectHeaderHeight
        headerHeightCustom={req.headerHeightCustom}
        setHeaderHeightCustom={handleSetHeaderHeightCustom}
      />
      {req.gr ? 
       <>
       <H1>Pozostałe elementy kompletu</H1>
       <div className="flex space-x-6">
       <div className="flex items-center space-x-2 my-5">
        <Switch checked={isMattrass} onCheckedChange={() => {
          setIsMattrass(!isMattrass)
          if (!isMattrass){
          setReq({
            ...req,
            matSpring: null,
            matBuild: null,
            matZone: null,
          })} else {
            const {matSpring, matBuild, matH, matZone, ...newReq} = req;
            setReq(newReq);
          }
          }}/> 
        <label>materac</label>
      </div>
       <div className="flex items-center space-x-2 my-5">
        <Switch checked={isPillowtop} onCheckedChange={() => {
          setIsPillowtop(!isPillowtop)
          if (!isPillowtop){
            setReq({
              ...req,
              pillHeight: null,
            pillBuild: null,
            pillCover: null
          })} else {
            const {pillHeight, pillBuild, pillCover, ...newReq} = req;
            setReq(newReq);
             
            }
          }}/> 
        <label>przekładka</label>
      </div>
      </div>
      </>
: null}

      {isMattrass ?
      <SelectMat req={req} setMatSpring={handleMatSpring} setMatH={handleMatH} setMatBuild={handleMatBuild} setMatZone={handleMatZone}/>
      : null}
      {isPillowtop ?
      <SelectPillowtop req={req} setPillCover={handlePillCover} setPillHeight={handlePillHeight} setPillBuild={handlePillBuild}/>
      : null}
      {isSummary ? 
      <Summary req={req} />
      : null}
    </div>
  );
}
