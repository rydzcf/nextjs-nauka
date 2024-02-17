import { Product } from "../interfaces/api";
export async function getData(category: string, cover: string | null, size: number) {
  if(cover === null) return []
  try {
    const res = await fetch(
      `api/?category=${category}&size=${size}&cover=${cover}`
    );
    const data: Product[] = await res.json();
    return data
  } catch (error) {
    console.log(`Ferch error: ${error}`);
  }
}
