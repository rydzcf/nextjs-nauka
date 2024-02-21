"use client"
import React, { useState, useEffect } from 'react'
import SelectSize from "@/components/configurator/SelectSize"
import SelectTex from "@/components/configurator/SelectTex"
import SelectHeight from './SelectHeight';
import { Product } from '@/app/interfaces/api';
import { updateDependencies } from '@/app/utils/configurator';
import { Req } from '@/app/interfaces/req';
import SelectHeaderName from './SelectHeaderName';
import SelectHeaderWidth from './SelectHeaderWidth';
import SelectBoxName from './SelectBoxName';
import SelectLegs from './SelectLegs';

interface Props {
    category: string
}

export default function Configurator({category} : Props) {

const [req, setReq] = useState<Req>(
    {
        size: 160,
        gr: null,
        tex: null,
        headerName: null,
        headerWidth: null,
        headerHeight: null,
        boxName: null,
        boxElem: null,
        dependencies: [],
        prevDependencies: [],
    }
)
//zerowanie wyborów przy zmianie size albo gr
useEffect(() => {
    setReq(req => ({
       ...req,
        headerName: null,
        headerWidth: null,
        headerHeight: null,
        boxName: null,
    }));
}, [req.size, req.gr]);


const handleSize = (size: number) => {
    setReq({
        ...req,
        size: size,
    });

}

const handleTex = (tex: string | null) => {
    if(tex !== null) {
    setReq({
        ...req,
        tex: tex,
        gr: tex.charAt(0)
    })
    }
}

const handleHeaderName =(headerName : string) => {
    setReq({
        ...req,
        headerName: headerName,
    })
}

const handleHeaderWidth = (headerWidth: string, headerHeight: number | null | undefined) => {
    setReq({
        ...req,
        headerWidth,
        ...(headerHeight ? { headerHeight } : {}),
    });
};

const handleSetHeaderHeight = (headerHeight : number) => {
    setReq({
        ...req,
        headerHeight: headerHeight,
    })
}

const handleBoxName = (product: Product) => {
    const updatedReq = updateDependencies(req, product, "boxName");
    setReq(updatedReq);
  };

const handleLegs = (product: Product) => {
    setReq({
        ...req,
        leg : product.index,
    })
}  
    return (
    <div>
        <SelectSize handleSize={handleSize}/>
        <SelectTex handleTex={handleTex} />
        <SelectHeaderName req={req} handleHeaderName={handleHeaderName}/>
        <SelectHeaderWidth req={req} handleHeaderWidth={handleHeaderWidth}/>
        <SelectHeight headerHeight={req.headerHeight} setHeaderHeight={handleSetHeaderHeight}/>
        <SelectBoxName req={req} handleBoxName={handleBoxName}/>
        <SelectLegs req={req} handleLegs={handleLegs}/>
        {/* <Select data={data} handleSelected={handleSelected}/> */}
        {/* <SelectHeight headerHeight={req.} setHeaderHeight={setHeaderHeight} /> */}
    </div>
  )
}
