import { Product } from "../interfaces/api";
import { Dependency } from "../interfaces/req";
export async function getData(category: string, cover: string | null, size: number) {
  


  if(cover === null) {
    try {
       const res = await fetch(
        `api/?category=${category}&size=${size}`
       );
       const data: Product[] = await res.json();
       return data
    } catch (error) {
      console.log(error)
      return null
    }
  
  
  
  
  } else {
  try {
    const res = await fetch(
      `api/?category=${category}&size=${size}&cover=${cover}`
    );
    const data: Product[] = await res.json();
    return data
  } catch (error) {
    console.log(`Fetch error: ${error}`);
    return null
  }}
}
export async function getOne(index: string) {
  try {
    const res = await fetch(
      `api/?id=${index}`
    );
    const data: Product | null = await res.json();
    return data
  } catch (error) {
    console.log(`Ferch error: ${error}`);
    return null
  }
}


export function updateDependencies(req: any, product: Product, name: string) {
  const { dependencies } = req;
  const filteredDependencies = dependencies.filter((dep: Dependency) => dep.parent !== name);
  const newDependencies = product.addons ? product.addons.map(addon => ({ parent: name, child: addon })) : [];

  // Usuwamy właściwości dla poprzednich dzieci 'boxName'
  dependencies.filter((dep: Dependency) => dep.parent === name).forEach((dep: Dependency) => delete req[dep.child]);

  // Ustawiamy 'null' dla nowych dzieci 'boxName'
  newDependencies.forEach(({ child }) => req[child] = null);

  // Aktualizujemy 'req' z nową nazwą, poprzednimi i aktualnymi zależnościami
  return {
    ...req,
    boxName: product.name,
    prevDependencies: [...dependencies],
    dependencies: [...filteredDependencies, ...newDependencies]
  };
}