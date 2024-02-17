import { type NextRequest } from 'next/server';
import { Product } from "@/app/interfaces/api";

interface QueryParams {
  [key: string] : string
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Utworzenie obiektu do przechowywania wszystkich parametrów zapytania
  const queryParams: QueryParams = {};

  // Iteracja po wszystkich parametrach zapytania i dodanie ich do obiektu queryParams
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const data = [
    {
        "name": "Z01",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 116,
        "index": "Z01-1-16S181"
      },
    {
        "name": "Z01",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 116,
        "index": "Z01-1-16S161"
      },
    {
        "name": "Z02",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 126,
        "index": "Z02-2-16S181"
      },
    {
        "name": "Z02",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 126,
        "index": "Z02-2-16S161"
      },
    {
        "name": "Z03",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 136,
        "index": "Z03-1-16S161"
      },
    {
        "name": "Z03",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 140,
        "height": 136,
        "index": "Z03-1-14S141"
      },
    {
        "name": "BOX1",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BOX1-1-1620",
        "addons": ["leg"]
      }
    ]

    const filteredData = data
    .filter((obj: Product) => {
        return (!queryParams.size || obj.size === Number(queryParams.size)) && 
        (!queryParams.cover || obj.index.includes(`-${queryParams.cover}-`) &&
        (!queryParams.category || obj.category === queryParams.category))
    })

  

  return new Response(JSON.stringify(filteredData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
