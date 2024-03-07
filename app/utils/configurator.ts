import { LegsIndex, Product } from "../interfaces/api";
import { Dependency } from "../interfaces/req";
export async function getData(category: string, cover: string | null, size: number | null) {
  if(cover === null && size !== null) {
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
  
  } else if(cover === null && size === null) {
    try {
       const res = await fetch(
        `api/?category=${category}`
       );
       const data: Product[] = await res.json();
       return data
    } catch (error) {
      console.log(error)
      return null
    }
  }else {
  try {
    const res = await fetch(
      `api/?category=${category}&cover=${cover}&size=${size}`
    );
    const data: Product[] = await res.json();
    return data.sort((a: Product, b: Product) => a.name.localeCompare(b.name))
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

export async function getLegsTable(index: string) {
  const legs: LegsIndex[] = JSON.parse(index)
  let legsTable: Product[] = []
  let product: Product | null = null
  for (const leg of legs) {
    product = await getOne(leg.id)
    if(product) {
      product.index = product.index + " - " + leg.qty + " szt";
      product.price = product.price*leg.qty;
      legsTable.push(product)
    }
    else {
      const emptyProduct:Product = {
        name: "Brak produktu, zadzwoń i poinformuj nas o tym",
        category: "leg",
        price: 99999,
        index: leg.id,
        size: 0
      }

      legsTable.push(emptyProduct)
    }
  }
  return legsTable
}


export function pricify(number: number) {
  if (!isNaN(Number(number))) {
    return Math.ceil(number).toLocaleString("fr-FR").replace(/,/g, " ") + " PLN";
  }
  return "- PLN";
}

// export function finalPrice(cart) {
//   return cart.reduce((total, item) => {
//     // Konwersja ceny na liczbę i sprawdzenie, czy jest to poprawna liczba
//     if (!isNaN(Number(item.price))) {
//       // Dodawanie skonwertowanej wartości ceny do łącznej sumy
//       return total + Number(item.price);
//     }
//     // Jeśli cena nie jest liczbą, kontynuuj z dotychczasową sumą
//     return total;
//   }, 0); // Początkowa wartość sumy to 0
// }


export function updateDependencies(req: any, product: Product, name: string) {
  
  //podwojne klikniecie w ten sam wybor
  if(req[name] === product.name || req[name] === product.index) return {...req}
  
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
    [name]: product.name,
    prevDependencies: [...dependencies],
    dependencies: [...filteredDependencies, ...newDependencies]
  };
}


export function isStringifyObject(str: string | null) {
  try {
    // Próba sparsowania ciągu znaków jako JSON
    if (str === null) return false
    const obj = JSON.parse(str);
    // Sprawdzenie, czy wynik jest obiektem i nie jest nullem
    if (obj && typeof obj === "object") {
      return true;
    }
  } catch (e) {
    // Przechwycenie wyjątku, jeśli JSON.parse() zgłosi błąd
    return false;
  }
  return false;
}