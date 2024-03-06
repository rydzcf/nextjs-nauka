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


  const data: Product[] = [
    {
        "name": "Z01",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z01-1-16S181"
      },
    {
        "name": "Z11",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z011-1-16S181"
      },
    {
        "name": "Z12",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z012-1-16S181"
      },
    {
        "name": "Z13",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z013-1-16S181"
      },
    {
        "name": "Z14",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z014-1-16S181"
      },
    {
        "name": "Z15",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z015-1-16S181"
      },
    {
        "name": "Z16",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z016-1-16S181"
      },
    {
        "name": "Z17",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z017-1-16S181"
      },
    {
        "name": "Z17",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z017-1-16S181"
      },
    {
        "name": "Z18",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z018-1-16S181"
      },
    {
        "name": "Z19",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z019-1-16S181"
      },
    {
        "name": "Z20",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z020-1-16S181"
      },
    {
        "name": "Z21",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z021-1-16S181"
      },
    {
        "name": "Z22",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 100,
        "size": 160,
        "height": 116,
        "index": "Z022-1-16S181"
      },
    {
        "name": "Z01",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 1,
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
        "price": 1,
        "size": 160,
        "index": "BOX1-1-1620",
        "addons": ["legs"]
      },
    {
        "name": "BOX1",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BOX1-2-1620",
        "addons": ["legs"]
      },
    {
        "name": "BTFK",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BTFK-1-1620",
        "addons": ["legs"]
      },
    {
        "name": "BOX2",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BOX2-1-1620",
        "addons": ["legs", "frame"]
      },
    {
        "name": "BOX3",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 140,
        "index": "BOX3y-1-1420",
      },
    {
        "name": "BOX3",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 140,
        "index": "BOX3-1-1420",
      },


    {
        "name": "noga do BOX3 i Box1",
        "category": "legs",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "INDEKS-NOG-1",
        "fit" : ["BOX3", "BOX1"]
      },
    {
        "name": "Nogi metalowe 18cm czarne",
        "category": "legs",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "ZNOG01-ZD-BTFK-H18-CZ",
        "fit" : ["BTFK"]
      },
    {
        "name": "Nogi metalowe 18cm srebrne",
        "category": "legs",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "ZNOG01-ZD-BTFK-H18-SR",
        "fit" : ["BTFK"]
      },
      {
        "name": "Nogi drewniane 12cm czarne",
        "category": "legs",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "[{\"id\":\"NOG-DRE-WAL-CZ-8x8x12\",\"qty\":6},{\"id\":\"NOG-WEW-12\",\"qty\":2}]",
        "fit" : ["BTFK"],
      },
    {
        "name": "noga do wszytkiego",
        "category": "legs",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "INDEKS-NOG do wszy",
        "fit" : []
      },
    {
        "name": "zestaw kilku nog",
        "category": "legs",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "[{\"id\":\"INDEX-ONE-LEG\",\"qty\":2},{\"id\":\"INDEX-2-LEG\",\"qty\":4}]",
        "fit" : ["BOX1"],
      },
      {
        "name": "Noga wewnętrzna 12cm",
        "category": "leg",
        "photo": "",
        "price": 1,
        "index": "NOG-WEW-12",
      },
      {
        "name": "Noga drewniana czarna 12cm",
        "category": "leg",
        "photo": "",
        "price": 10,
        "index": "NOG-DRE-WAL-CZ-8x8x12",
      },
      {
        "name": "noga 1 szt z kompletu",
        "category": "leg",
        "photo": "",
        "price": 1,
        "index": "INDEX-ONE-LEG",
      },
      {
        "name": "noga 1 szt z kompletu ale innego",
        "category": "leg",
        "photo": "",
        "price": 2,
        "index": "INDEX-2-LEG",
      },

    {
        "name": "Materac Cano",
        "category": "mattress",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "CANO-H2-1-213",
        "spring": "1000S",
        "build": "2S2"
      },
    {
        "name": "Materac Pinta",
        "category": "mattress",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "Pinta-H3-1-213",
        "spring": "TFK",
        "build": "2S2",
        "zone" : "1P"
      },
    {
        "name": "Materac Pinta",
        "category": "mattress",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "Pinta-H3-7P-1-213",
        "spring": "TFK",
        "build": "2S2",
        "zone" : "7P"
      },
    {
        "name": "Materac Pinta",
        "category": "mattress",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "Pinta-H3-1-213",
        "spring": "TFK",
        "h": "H3",
        "build": "2S4"
      },
    {
        "name": "Materac Pinta",
        "category": "mattress",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "Pinta-H3-1-213",
        "spring": "TFK",
        "build": "2S41"
      },
    {
        "name": "Materac Pinta",
        "category": "mattress",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "Pinta-H2-1-213",
        "spring": "TFK",
        "h": "H2"
      },


    {
        "name": "Orchila",
        "category": "pillowtop",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "ORCH-EXC-AV-A-160200",
        "cover": "Aloe Vera",
        "height": "Standard"
      },
    {
        "name": "Orchila",
        "category": "pillowtop",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "ORCH-EXC-AA-A-160200",
        "cover": "Alergik",
        "height": "Standard",
        "build" : "A"
      },
    {
        "name": "Orchila",
        "category": "pillowtop",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "ORCH-EXC-LN-A-160200",
        "cover": "Len",
        "height": "Standard"
      },
    {
        "name": "Orchila",
        "category": "pillowtop",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "ORCH-EXC-MAX-AV-A-160200",
        "cover": "Aloe Vera",
        "height": "Maxeror43"
      }
    ]

    if (queryParams.id) {
      const item = data.find(elem => elem.index === queryParams.id);
      return new Response(JSON.stringify(item ? item : null), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  
    // Filtrowanie danych na podstawie pozostałych parametrów
    const filteredData = data.filter(obj => 
      (!queryParams.size || obj.size === Number(queryParams.size)) &&
      (!queryParams.category || obj.category === queryParams.category) &&
      (!queryParams.cover || (obj.index.includes(`-${queryParams.cover}-`) || obj.cover?.includes(queryParams.cover)))
    );
  
    return new Response(JSON.stringify(filteredData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
