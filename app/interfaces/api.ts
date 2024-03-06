export interface Product {
    name: string;
    category: string;
    photo?: string;
    price: number;
    size?: number;
    height?: number | string;
    index: string;
    addons?: string[],
    fit?: string[],
    spring?: string | null,
    h?: string | null,
    build?: string | null
    cover?: string | null
    zone?: "1P" | "7P" | null
  }


  export interface LegsIndex {
    id: string,
    qty: number
  }