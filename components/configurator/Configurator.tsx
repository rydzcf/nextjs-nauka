"use client"
import React, { useState, useEffect } from 'react'
import SelectSize from "@/components/configurator/SelectSize"
import SelectTex from "@/components/configurator/SelectTex"
import SelectHeight from './SelectHeight';
import Select from './Select';
import { Product } from '@/app/interfaces/api';
import { getData, updateDependencies } from '@/app/utils/configurator';
import { Req } from '@/app/interfaces/req';
import SelectHeaderName from './SelectHeaderName';
import SelectHeaderWidth from './SelectHeaderWidth';
import Loading from './Loading';
import SelectBoxName from './SelectBoxName';

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

const handleHeaderWidth =(headerWidth : string) => {
    setReq({
        ...req,
        headerWidth: headerWidth,
    })
}

const handleBoxName = (product: Product) => {
    const updatedReq = updateDependencies(req, product, "boxName");
    setReq(updatedReq);
  };

    return (
    <div>
        <SelectSize handleSize={handleSize}/>
        <SelectTex handleTex={handleTex} />
        {req.gr === null ? 
        <Loading /> :
        <SelectHeaderName req={req} handleHeaderName={handleHeaderName}/>}
        {req.headerName === null ?
        <Loading /> :
        <SelectHeaderWidth req={req} handleHeaderWidth={handleHeaderWidth}/>
        }
        <SelectBoxName req={req} handleBoxName={handleBoxName}/>
        {/* <Select data={data} handleSelected={handleSelected}/> */}
        {/* <SelectHeight headerHeight={req.} setHeaderHeight={setHeaderHeight} /> */}
    </div>
  )
}
