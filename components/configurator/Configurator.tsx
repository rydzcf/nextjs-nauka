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
import SelectMatSpring from "./SelectMatSpring";
import SelectMatBuild from "./SelectMatBuild";

export default function Configurator() {
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
    matSpring: null,
    matH: null,
    matBuild: null,
    pillHeight: null,
    pillBuild: null,
    pillCover: null,
    dependencies: [],
    prevDependencies: [],
  });
  //zerowanie wyborów przy zmianie size albo gr
  useEffect(() => {
    setReq((req) => ({
      ...req,
      headerName: null,
      headerWidth: null,
      headerHeight: null,
      headerHeightCustom: null,
      boxName: null,
      boxIndex: null,
      matSpring: null,
      matH: null,
      matBuild: null,
      pillHeight: null,
      pillBuild: null,
      pillCover: null,
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
    // setReq(updatedReq);
    setReq({
      ...updatedReq,
      boxIndex: product.index,
    });
  };

  const handleLegs = (product: Product) => {
    setReq({
      ...req,
      leg: product.index,
    });
  };

  const handleMatSpring = (matSpring: string | null) => {
    setReq({
        ...req,
        matSpring
    })
  }
  return (
    <div className="container mx-auto py-5">
      <SelectSize handleSize={handleSize} selectedSize={req.size} />
      <SelectTex handleTex={handleTex} />
      <SelectHeaderName req={req} handleHeaderName={handleHeaderName} />
      <SelectHeaderWidth req={req} handleHeaderWidth={handleHeaderWidth} />
      <SelectHeaderHeight
        headerHeightCustom={req.headerHeightCustom}
        setHeaderHeightCustom={handleSetHeaderHeightCustom}
      />
      <SelectBoxName req={req} handleBoxName={handleBoxName} />
      <SelectLegs req={req} handleLegs={handleLegs} />
      <SelectMatSpring req={req} setMatSpring={handleMatSpring}/>
      <SelectMatBuild />
      <Summary req={req} />
    </div>
  );
}
