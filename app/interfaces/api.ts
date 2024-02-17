export interface Product {
    name: string;
    category: string;
    photo?: string;
    price: number;
    size: number;
    height?: number;
    index: string;
    addons?: string[],
    fit?: string[],
  }